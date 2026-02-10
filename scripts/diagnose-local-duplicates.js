
const { PrismaClient } = require('../prisma/generated/client');
const dotenv = require('dotenv');
dotenv.config();

const prisma = new PrismaClient();

async function diagnose() {
    console.log('--- DIAGNOSING LOCAL DB DISCREPANCIES ---');

    // 1. Count Total Active Variants
    const activeVariants = await prisma.productVariant.count({ where: { isActive: true } });
    console.log(`Total Active Variants: ${activeVariants}`);

    // 2. Count Active Variants with Inactive Parent Product
    const zombies = await prisma.productVariant.findMany({
        where: {
            isActive: true,
            product: {
                isActive: false
            }
        },
        include: { product: true }
    });

    console.log(`\nFound ${zombies.length} "Zombie" Variants (Active but Parent is Inactive).`);
    if (zombies.length > 0) {
        console.log('Sample Zombies:');
        zombies.slice(0, 5).forEach(v => {
            console.log(` - Variant ID: ${v.id}, SKU: ${v.sku}, Price: ${v.sellingPrice}, Parent: ${v.product?.name} (Active: ${v.product?.isActive})`);
        });
    }

    // 3. Count Active Variants with NO Parent (Orphans)
    // Prisma normally enforces FK, but let's check if checking by null product
    // Actually standard prisma findMany already filters if relation matches.
    // Let's do a raw query or loop.

    // Check for "Duplicate" names with price 100
    const suspects = await prisma.productVariant.findMany({
        where: {
            isActive: true,
            sellingPrice: 100
        },
        include: { product: true }
    });

    console.log(`\nFound ${suspects.length} variants with Price 100.`);
    const activeParent100 = suspects.filter(v => v.product?.isActive === true);

    // Analyze these "Suspects"
    console.log('\n--- ANALYSIS OF ACTIVE PRODUCTS WITH PRICE 100 ---');
    if (activeParent100.length > 0) {
        // Group by Category
        const byCategory = {};
        activeParent100.forEach(v => {
            const cat = v.product?.category?.name || 'Unknown';
            if (!byCategory[cat]) byCategory[cat] = 0;
            byCategory[cat]++;
        });
        console.log('By Category:', byCategory);

        // Group by Date (YYYY-MM-DD)
        const byDate = {};
        activeParent100.forEach(v => {
            const date = new Date(v.product?.createdAt).toISOString().split('T')[0];
            if (!byDate[date]) byDate[date] = 0;
            byDate[date]++;
        });
        console.log('By Creation Date:', byDate);

        console.log('\nSample Items:');
        activeParent100.slice(0, 10).forEach(v => {
            const p = v.product;
            console.log(` - [${p.category?.name}] ${p.name} (Created: ${p.createdAt.toISOString()})`);
        });

        // Write to file for user review
        const fs = require('fs');
        const report = activeParent100.map(v => `${v.product.name} | ${v.product.category?.name} | ${v.product.createdAt}`).join('\n');
        fs.writeFileSync('suspect_products.csv', 'Name | Category | CreatedAt\n' + report);
        console.log('\nSaved full list to suspect_products.csv');
    }
}

diagnose()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
