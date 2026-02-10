
const { PrismaClient } = require('../prisma/generated/client');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

// Override DATABASE_URL to point to PRODUCTION DB
const prodDbPath = 'file:C:/Users/PC/AppData/Roaming/zain-pos-v3/pos.db';
console.log(`Using DB: ${prodDbPath}`);

process.env.DATABASE_URL = prodDbPath;

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: prodDbPath
        }
    }
});

async function inspectProd() {
    console.log('--- INSPECTING PRODUCTION DB (zain-pos-v3/pos.db) ---');

    // Check for "Babasuit 650" again
    const variants = await prisma.productVariant.findMany({
        where: {
            product: {
                name: { contains: 'Babasuit 650' }
            }
        },
        include: {
            product: true
        }
    });

    console.log(`Found ${variants.length} total variants for "Babasuit 650"`);

    variants.forEach(v => {
        console.log(`\n--- Variant ID: ${v.id} ---`);
        console.log(`Price: ${v.sellingPrice}`);
        console.log(`IsActive: ${v.isActive}`);
        console.log(`Product Name: ${v.product.name}`);
        console.log(`Product CreatedAt: ${v.product.createdAt}`);
    });

    // Count Active Price 100
    const active100 = await prisma.productVariant.count({
        where: {
            isActive: true,
            sellingPrice: 100
        }
    });
    console.log(`\nTotal Active Price 100 Variants: ${active100}`);
}

inspectProd()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
