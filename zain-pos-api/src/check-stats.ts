import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const counts = await Promise.all([
            prisma.user.count(),
            prisma.product.count(),
            prisma.sale.count(),
            prisma.category.count(),
            prisma.productVariant.count(),
            prisma.customer.count().catch(() => 0),
        ]);

        console.log('--- Database Stats ---');
        console.log('Users:', counts[0]);
        console.log('Products:', counts[1]);
        console.log('Product Variants:', counts[4]);
        console.log('Sales:', counts[2]);
        console.log('Categories:', counts[3]);
        console.log('Customers:', counts[5]);

        if (counts[1] > 0) {
            const topProducts = await prisma.product.findMany({
                take: 5,
                include: { category: true }
            });
            console.log('\nSample Products:');
            console.table(topProducts.map(p => ({
                name: p.name,
                category: p.category.name
            })));
        } else {
            console.log('\n⚠️ No products found in database.');
        }

        if (counts[2] > 0) {
            const recentSales = await prisma.sale.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' }
            });
            console.log('\nRecent Sales:');
            console.table(recentSales.map(s => ({
                id: s.id,
                total: (s as any).grandTotal || (s as any).totalAmount || 'N/A',
                created: s.createdAt
            })));
        }

    } catch (error) {
        console.error('Error checking stats:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
