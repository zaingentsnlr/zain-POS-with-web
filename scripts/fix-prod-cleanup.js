
const { PrismaClient } = require('../prisma/generated/client');
const dotenv = require('dotenv');
const fs = require('fs');
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

async function cleanupProd() {
    console.log('--- CLEANING UP PRODUCTION DATA ---');

    // 1. Find Bad Products (Missing Category or Created on Feb 3rd with Price 100)
    const allProducts = await prisma.product.findMany({
        where: {
            isActive: true
        },
        include: {
            category: true,
            variants: true
        }
    });

    const badProducts = allProducts.filter(p => {
        // Condition 1: Missing Category (Corrupt)
        if (!p.category) return true;

        // Condition 2: Created on Feb 3rd (The Incident) AND Price 100
        const date = new Date(p.createdAt).toISOString().split('T')[0];
        const hasPrice100 = p.variants.some(v => v.sellingPrice === 100);

        if (date === '2026-02-03' && hasPrice100) return true;

        return false;
    });

    console.log(`Found ${badProducts.length} CORRUPT/DUPLICATE products.`);

    if (badProducts.length === 0) {
        console.log('No cleanup needed.');
        return;
    }

    console.log('Starting deletion...');
    let deletedCount = 0;

    for (const p of badProducts) {
        try {
            // Soft Delete Variants
            await prisma.productVariant.updateMany({
                where: { productId: p.id },
                data: { isActive: false }
            });

            // Soft Delete Product
            await prisma.product.update({
                where: { id: p.id },
                data: { isActive: false }
            });

            console.log(`Soft Deleted (Hidden): ${p.name}`);
            deletedCount++;
        } catch (e) {
            console.error(`Failed to hide ${p.name}:`, e.message);
        }
    }

    console.log(`\n✅ Successfully hidden ${deletedCount} bad products from PRODUCTION POS.`);
}

cleanupProd()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
