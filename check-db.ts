import { PrismaClient } from './prisma/generated/client';

async function main() {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: 'file:./prisma/pos.db'
            }
        }
    });
    try {
        const count = await prisma.sale.count();
        const latest = await prisma.sale.findFirst({
            orderBy: { createdAt: 'desc' }
        });
        console.log('Total Sales:', count);
        console.log('Latest Sale:', latest ? JSON.stringify(latest, null, 2) : 'None');
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
