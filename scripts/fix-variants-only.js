
const { PrismaClient } = require('../prisma/generated/client');
const dotenv = require('dotenv');
dotenv.config();

// Override DATABASE_URL to point to PRODUCTION DB
const prodDbPath = 'file:C:/Users/PC/AppData/Roaming/zain-pos-v3/pos.db';
console.log(`Using PRODUCTION DB: ${prodDbPath}`);

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: prodDbPath
        }
    }
});

async function cleanupVariantsOnly() {
    console.log('--- CLEANING UP ONLY VARIANTS WITH PRICE 100 (No Product Deletion) ---');

    // 1. Find Variants with Price 100 created on Feb 3rd
    // Note: Variant doesn't have createdAt, so we check parent product's createdAt

    const targetVariants = await prisma.productVariant.findMany({
        where: {
            isActive: true,
            sellingPrice: 100,
            product: {
                createdAt: {
                    gte: new Date('2026-02-03T00:00:00.000Z'),
                    lt: new Date('2026-02-04T00:00:00.000Z')
                }
            }
        },
        include: {
            product: true
        }
    });

    console.log(`Found ${targetVariants.length} BAD VARIANTS (Price 100, Feb 3rd).`);

    if (targetVariants.length === 0) {
        console.log('No cleanup needed.');
        return;
    }

    // Double check sample
    console.log('Sample to delete:');
    targetVariants.slice(0, 3).forEach(v => {
        console.log(` - ${v.product.name} (ID: ${v.product.id}) -> Variant Price: ${v.sellingPrice}`);
    });

    console.log('Starting deletion...');
    let deletedCount = 0;

    for (const v of targetVariants) {
        try {
            // Soft Delete ONLY the Variant
            await prisma.productVariant.update({
                where: { id: v.id },
                data: { isActive: false }
            });

            console.log(`Soft Deleted Variant for: ${v.product.name}`);
            deletedCount++;
        } catch (e) {
            console.error(`Failed to hide variant for ${v.product.name}:`, e.message);
        }
    }

    console.log(`\n✅ Successfully hidden ${deletedCount} bad variants.`);

    // Optional: Check if any products have NO active variants left?
    // User wants "restore everything else", so maybe keeping empty products is okay for now?
    // Let's stick to variants only to be safe.
}

cleanupVariantsOnly()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
