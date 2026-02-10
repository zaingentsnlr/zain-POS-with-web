import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                password: true, // Useful to see if they are hashed or plain for now
                role: true,
                isActive: true
            }
        });
        console.log('Current Users in Database:');
        console.table(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
