
const { PrismaClient } = require('../prisma/generated/client');
const path = require('path');

async function main() {
    // Force SQLite path usage
    const dbPath = path.join(process.cwd(), 'prisma', 'pos.db');
    console.log("Checking DB at:", dbPath);

    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: `file:${dbPath}`
            }
        }
    });

    try {
        const userCount = await prisma.user.count();
        console.log(`User Count: ${userCount}`);

        const users = await prisma.user.findMany();
        console.log("Users:", users);

    } catch (e) {
        console.error("Error querying DB:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
