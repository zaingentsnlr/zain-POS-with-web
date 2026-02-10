
const { PrismaClient } = require('../prisma/generated/client');
const dotenv = require('dotenv');
dotenv.config();

const prisma = new PrismaClient();

async function inspect() {
    console.log('--- INSPECTING "Babasuit 650" ---');

    // Find ALL variants related to this name, regardless of status
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
        console.log(`Stock: ${v.stock}`);
        console.log(`IsActive: ${v.isActive}`);
        console.log(`Product Name: ${v.product.name}`);
        console.log(`Product ID: ${v.product.id}`);
        console.log(`Product IsActive: ${v.product.isActive}`);
        console.log(`Product CreatedAt: ${v.product.createdAt}`);
    });

    console.log('\n--- CHECKING ALL ACTIVE VARIANTS WITH PRICE 100 ---');
    const active100 = await prisma.productVariant.count({
        where: {
            isActive: true,
            sellingPrice: 100
        }
    });
    console.log(`Total Active Price 100 Variants remaining: ${active100}`);

}

inspect()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
