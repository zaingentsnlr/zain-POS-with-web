const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log("--- DEBUGGING SALES STATS (JS) ---");

    // 1. Total Count
    const totalSales = await prisma.sale.count();
    console.log(`Total Sales in DB: ${totalSales}`);

    // 2. Breakdown by Payment Mode
    const stats = await prisma.sale.groupBy({
        by: ['paymentMethod'],
        _count: {
            id: true
        },
        _sum: {
            grandTotal: true
        }
    });

    console.log("Stats by Payment Mode:");
    console.log(JSON.stringify(stats, null, 2));

    // 3. Recent Sales (to check timestamps)
    const recentSales = await prisma.sale.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            billNo: true,
            grandTotal: true,
            paymentMethod: true,
            createdAt: true
        }
    });
    console.log("5 Most Recent Sales:");
    console.log(JSON.stringify(recentSales, null, 2));

    // 4. Sales from Today (User's Local Date: 2026-02-15)
    // Assuming server runs in comparable timezone or we query by UTC range matching user's day
    const startOfDay = new Date('2026-02-15T00:00:00.000Z'); // UTC start
    // Actually, let's just grab last 24h
    const statsToday = await prisma.sale.aggregate({
        _count: { id: true },
        _sum: { grandTotal: true },
        where: {
            createdAt: { gte: new Date('2026-02-14T18:30:00.000Z') } // 00:00 IST is 18:30 UTC Prev Day
        }
    });
    console.log("Sales since 2026-02-15 00:00 IST:", statsToday);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
