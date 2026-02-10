
const { PrismaClient } = require('../prisma/generated/client');
const axios = require('axios');
const dotenv = require('dotenv');

// Load env if present
dotenv.config();

const prisma = new PrismaClient();

async function syncAllSales() {
    console.log('--- STARTING FULL SALES HISTORY SYNC ---');

    // 1. Get Settings
    const setting = await prisma.setting.findUnique({ where: { key: 'CLOUD_API_URL' } });
    const apiUrl = setting?.value;
    const targetUrl = apiUrl || 'https://zain-pos-desktop.onrender.com';

    console.log(`Target Cloud URL: ${targetUrl}`);

    // 2. Count Total Sales
    const totalCount = await prisma.sale.count({ where: { status: 'COMPLETED' } });
    console.log(`Total Completed Sales in Local DB: ${totalCount}`);

    if (totalCount === 0) {
        console.log('No sales to sync.');
        return;
    }

    // 3. Sync in Chunks of 10 to avoid payload limits
    const CHUNK_SIZE = 10;
    const chunks = Math.ceil(totalCount / CHUNK_SIZE);

    console.log(`Syncing in ${chunks} batches of ${CHUNK_SIZE}...`);

    for (let i = 0; i < chunks; i++) {
        console.log(`\nProcessing Batch ${i + 1}/${chunks}...`);

        const sales = await prisma.sale.findMany({
            where: { status: 'COMPLETED' },
            include: { items: true, user: true },
            orderBy: { createdAt: 'desc' },
            skip: i * CHUNK_SIZE,
            take: CHUNK_SIZE
        });

        console.log(`  > Sending ${sales.length} records...`);

        try {
            await axios.post(`${targetUrl}/api/sync/sales`, { sales }, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('  ✅ Batch Success');
        } catch (error) {
            console.error('  ❌ Batch Failed');
            if (error.response) {
                console.error(`  Status: ${error.response.status}`);
                console.error('  Data:', error.response.data);
            } else {
                console.error('  Error:', error.message);
            }
        }

        // Small delay to be nice to the server
        await new Promise(r => setTimeout(r, 500));
    }

    console.log('\n--- FULL SYNC COMPLETE ---');
}

syncAllSales()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
