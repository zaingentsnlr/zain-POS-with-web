
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

async function undoCleanup() {
    console.log('--- UNDOING CLEANUP (RESTORING PRODUCTS) ---');

    // We want to restore products created on 2026-02-03 that are currently inactive
    // Use a broad search to ensure we catch everything

    // 1. Restore Products
    const { count: prodCount } = await prisma.product.updateMany({
        where: {
            isActive: false,
            createdAt: {
                gte: new Date('2026-02-03T00:00:00.000Z'),
                lt: new Date('2026-02-04T00:00:00.000Z')
            }
        },
        data: {
            isActive: true
        }
    });

    // 2. Restore Variants
    const { count: varCount } = await prisma.productVariant.updateMany({
        where: {
            isActive: false,
            product: {
                createdAt: {
                    gte: new Date('2026-02-03T00:00:00.000Z'),
                    lt: new Date('2026-02-04T00:00:00.000Z')
                }
            }
        },
        data: {
            isActive: true
        }
    });

    console.log(`\n✅ Restored ${prodCount} products and ${varCount} variants.`);
}

undoCleanup()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
