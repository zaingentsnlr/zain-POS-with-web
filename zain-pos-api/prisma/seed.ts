import { PrismaClient } from './generated/client/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting database seed...');

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: hashedPassword,
            name: 'Administrator',
            role: 'ADMIN',
            isActive: true,
        },
    });

    console.log('Created admin user:', admin.username);

    // Create cashier user
    const cashierPassword = await bcrypt.hash('cashier123', 10);

    const cashier = await prisma.user.upsert({
        where: { username: 'cashier' },
        update: {},
        create: {
            username: 'cashier',
            password: cashierPassword,
            name: 'Cashier',
            role: 'CASHIER',
            isActive: true,
        },
    });

    console.log('Created cashier user:', cashier.username);

    // Create shop settings (Defaults)
    await prisma.setting.upsert({
        where: { key: 'shop_name' },
        update: {},
        create: { key: 'shop_name', value: 'ZAIN POS SHOP' },
    });

    console.log('Database seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
