
const { PrismaClient } = require('../prisma/generated/client');
const axios = require('axios');
const dotenv = require('dotenv');

// Load env if present
dotenv.config();

const prisma = new PrismaClient();

async function testSync() {
    console.log('--- DIAGNOSTIC: CLOUD SYNC TEST ---');

    // 1. Get Settings
    const setting = await prisma.setting.findUnique({ where: { key: 'CLOUD_API_URL' } });
    const apiUrl = setting?.value;

    console.log('1. Cloud API URL:', apiUrl || 'NOT SET (Checking "https://zain-pos-desktop.onrender.com" as fallback)');

    const targetUrl = apiUrl || 'https://zain-pos-desktop.onrender.com';

    // 2. Fetch Sales
    console.log('\n2. Fetching Local Sales...');
    const sales = await prisma.sale.findMany({
        where: { status: 'COMPLETED' },
        include: { items: true, user: true },
        orderBy: { createdAt: 'desc' },
        take: 5 // Just take 5 for testing
    });

    console.log(`Found ${sales.length} sales to sync.`);
    if (sales.length === 0) {
        console.log('⚠ No sales found in local database. Nothing to sync.');
        return;
    }

    console.log('Sample Sale Data (User):', sales[0].user);

    // 3. Attempt Sync
    console.log(`\n3. Sending to ${targetUrl}/api/sync/sales ...`);

    try {
        const response = await axios.post(`${targetUrl}/api/sync/sales`, { sales }, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('✅ SYNC SUCCESS!');
        console.log('Response:', response.data);
    } catch (error) {
        console.log('❌ SYNC FAILED');
        if (error.response) {
            console.log(`Status: ${error.response.status}`);
            console.log('Data:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }
}

testSync()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
