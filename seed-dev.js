const { PrismaClient } = require('./prisma/generated/client');
const path = require('path');

async function main() {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: `file:${path.join(__dirname, 'prisma', 'pos.db')}`
            }
        }
    });

    console.log('🌱 Seeding development data...');

    try {
        // 1. Clear existing data (optional, but good for fresh test)
        // await prisma.saleItem.deleteMany();
        // await prisma.sale.deleteMany();
        // await prisma.productVariant.deleteMany();
        // await prisma.product.deleteMany();
        // await prisma.category.deleteMany();

        // 2. Create Categories
        const catShirts = await prisma.category.upsert({
            where: { name: 'Shirts' },
            update: {},
            create: { name: 'Shirts' }
        });

        const catPants = await prisma.category.upsert({
            where: { name: 'Pants' },
            update: {},
            create: { name: 'Pants' }
        });

        // 3. Create Products and Variants
        const product1 = await prisma.product.create({
            data: {
                name: 'Formal White Shirt',
                hsn: '6205',
                taxRate: 5,
                categoryId: catShirts.id,
                variants: {
                    create: [
                        { sku: 'SHRT-WHT-M', barcode: '1001', size: 'M', color: 'White', mrp: 1200, sellingPrice: 999, costPrice: 600, stock: 50 },
                        { sku: 'SHRT-WHT-L', barcode: '1002', size: 'L', color: 'White', mrp: 1200, sellingPrice: 999, costPrice: 600, stock: 50 }
                    ]
                }
            }
        });

        const product2 = await prisma.product.create({
            data: {
                name: 'Blue Denim Jeans',
                hsn: '6203',
                taxRate: 12,
                categoryId: catPants.id,
                variants: {
                    create: [
                        { sku: 'PANT-BLU-32', barcode: '2001', size: '32', color: 'Blue', mrp: 2500, sellingPrice: 1999, costPrice: 1000, stock: 30 },
                        { sku: 'PANT-BLU-34', barcode: '2002', size: '34', color: 'Blue', mrp: 2500, sellingPrice: 1999, costPrice: 1000, stock: 30 }
                    ]
                }
            }
        });

        // 4. Create some Historical Sales
        const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
        if (!admin) throw new Error('Admin user not found. Please run the app once first.');

        // Sale from last week
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        await prisma.sale.create({
            data: {
                billNo: 5001,
                userId: admin.id,
                customerName: 'Test Customer 1',
                subtotal: 999,
                discount: 0,
                taxAmount: 47.57,
                cgst: 23.78,
                sgst: 23.78,
                grandTotal: 999,
                paymentMethod: 'CASH',
                paidAmount: 1000,
                changeAmount: 1,
                status: 'COMPLETED',
                createdAt: lastWeek,
                items: {
                    create: [{
                        variantId: (await prisma.productVariant.findFirst({ where: { barcode: '1001' } })).id,
                        productName: 'Formal White Shirt',
                        variantInfo: 'M White',
                        quantity: 1,
                        mrp: 1200,
                        sellingPrice: 999,
                        taxRate: 5,
                        taxAmount: 47.57,
                        total: 999
                    }]
                }
            }
        });

        // Sale from today
        await prisma.sale.create({
            data: {
                billNo: 5002,
                userId: admin.id,
                customerName: 'Test Customer 2',
                subtotal: 1999,
                discount: 100,
                taxAmount: 214.18,
                cgst: 107.09,
                sgst: 107.09,
                grandTotal: 1899,
                paymentMethod: 'UPI',
                paidAmount: 1899,
                changeAmount: 0,
                status: 'COMPLETED',
                createdAt: new Date(),
                items: {
                    create: [{
                        variantId: (await prisma.productVariant.findFirst({ where: { barcode: '2001' } })).id,
                        productName: 'Blue Denim Jeans',
                        variantInfo: '32 Blue',
                        quantity: 1,
                        mrp: 2500,
                        sellingPrice: 1999,
                        taxRate: 12,
                        taxAmount: 214.18,
                        total: 1899
                    }]
                }
            }
        });

        console.log('✅ Seeding complete! 2 products, 4 variants, and 2 sales created.');
    } catch (e) {
        console.error('❌ Seeding failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
