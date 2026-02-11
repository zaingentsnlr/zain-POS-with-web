
const { PrismaClient } = require('../prisma/generated/client');
const axios = require('axios');
const dotenv = require('dotenv');

// Load env if present
dotenv.config();

const prisma = new PrismaClient();
const TARGET_URL = 'https://zain-pos-api.onrender.com';

async function syncAllInventory() {
    console.log('--- STARTING FULL INVENTORY SYNC ---');

    console.log(`Target Cloud URL: ${TARGET_URL}`);

    // 1. Fetch All Products
    // We send ALL of them because the Cloud DB is empty.
    const products = await prisma.product.findMany({
        include: {
            category: true,
            variants: true
        }
    });

    console.log(`Found ${products.length} products to sync.`);

    if (products.length === 0) {
        console.log('No products to sync.');
        return;
    }

    // 2. Send in one big batch (or chunks if too large, but usually fine for inventory)
    // 50 products per chunk is safer.
    const CHUNK_SIZE = 50;
    const chunks = Math.ceil(products.length / CHUNK_SIZE);

    for (let i = 0; i < chunks; i++) {
        console.log(`\nProcessing Batch ${i + 1}/${chunks}...`);
        const chunk = products.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);

        console.log(`  > Sending ${chunk.length} products...`);

        try {
            await axios.post(`${TARGET_URL}/api/sync/inventory`, { products: chunk }, {
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
        await new Promise(r => setTimeout(r, 500));
    }

    console.log('\n--- FULL INVENTORY SYNC COMPLETE ---');
}

syncAllInventory()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
