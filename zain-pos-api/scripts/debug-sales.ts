import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("--- DEBUGGING SALES STATS ---");

    // 1. Total Count
    const totalSales = await prisma.sale.count();
    console.log(`Total Sales in DB: ${totalSales}`);

    // 2. Breakdown by Payment Mode
    const stats = await prisma.sale.groupBy({
        by: ['paymentMode'],
        _count: {
            id: true
        },
        _sum: {
            grandTotal: true
        }
    });
    console.log("Stats by Payment Mode:");
    console.table(stats);

    // 3. Recent Sales (to check timestamps)
    const recentSales = await prisma.sale.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            billNo: true,
            grandTotal: true,
            paymentMode: true,
            createdAt: true,
            synced: true
        }
    });
    console.log("5 Most Recent Sales:");
    console.table(recentSales);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
