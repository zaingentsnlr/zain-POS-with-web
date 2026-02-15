const { PrismaClient } = require('./prisma/generated/client');
const path = require('path');
const fs = require('fs');

async function main() {
    const dbPath = path.join(__dirname, 'prisma', 'pos.db');
    console.log('Checking Dev DB at:', dbPath);
    console.log('Exists:', fs.existsSync(dbPath));

    if (!fs.existsSync(dbPath)) return;

    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: `file:${dbPath}`
            }
        }
    });

    try {
        const count = await prisma.sale.count();
        const latest = await prisma.sale.findFirst({
            orderBy: { createdAt: 'desc' }
        });
        console.log('Total Sales:', count);
        if (latest) {
            console.log('Latest Sale Date:', latest.createdAt);
            console.log('Latest Bill No:', latest.billNo);
        }
    } catch (e) {
        console.error('Error querying DB:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
