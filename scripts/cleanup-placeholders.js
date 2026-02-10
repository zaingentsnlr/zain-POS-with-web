
const { PrismaClient } = require('../prisma/generated/client');
const dotenv = require('dotenv');

// Load env if present
dotenv.config();

const prisma = new PrismaClient();

async function cleanupPlaceholders() {
    console.log('--- CLEANUP: REMOVING EMPTY PLACEHOLDER PRODUCTS ---');

    // 1. Find all Placeholder Products
    const placeholders = await prisma.product.findMany({
        where: {
            name: { contains: '(Sync Placeholder)' }
        },
        include: {
            variants: true
        }
    });

    console.log(`Found ${placeholders.length} placeholder products.`);

    let deletedCount = 0;

    for (const p of placeholders) {
        // Only delete if it has NO variants (meaning they were moved to real products)
        if (p.variants.length === 0) {
            console.log(`Deleting empty placeholder: ${p.name} (${p.id})`);
            await prisma.product.delete({ where: { id: p.id } });
            deletedCount++;
        } else {
            console.log(`Skipping active placeholder: ${p.name} (Has ${p.variants.length} variants)`);
        }
    }

    console.log(`\n✅ Validated ${placeholders.length} placeholders.`);
    console.log(`🗑️ Deleted ${deletedCount} empty placeholders.`);

    if (placeholders.length - deletedCount > 0) {
        console.log('\nNOTE: Some placeholders were not deleted because they still have variants.');
        console.log('This means those products have not been synced from the Desktop Inventory yet.');
        console.log('Please run "Sync Inventory" from the Desktop App first, then run this script again.');
    }
}

cleanupPlaceholders()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
