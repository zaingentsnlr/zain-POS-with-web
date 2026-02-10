
const { PrismaClient } = require('../prisma/generated/client');
const dotenv = require('dotenv');
dotenv.config();

const prisma = new PrismaClient();

async function cleanupFull() {
    console.log('--- CLEANING UP CORRUPT LOCAL DATA ---');

    // 1. Find Bad Products (Missing Category or Created on Feb 3rd with Price 100)
    // Since Prisma relation filtering for "missing" is tricky if FK is valid string but record missing,
    // we'll fetch all and filter in JS for safety.

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
        // Condition 1: Missing Category
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

            // Note: We CANNOT hard delete because these items might be referenced in Sales/InventoryMovements.
            // Soft deleting hides them from the POS, which solves the user's problem safely.

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

    console.log(`\n✅ Successfully hidden ${deletedCount} bad products from POS.`);
}

cleanupFull()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
