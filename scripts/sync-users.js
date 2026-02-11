
const { PrismaClient } = require('../prisma/generated/client');
const axios = require('axios');
const dotenv = require('dotenv');

// Load env if present
dotenv.config();

const prisma = new PrismaClient();
const TARGET_URL = 'https://zain-pos-desktop.onrender.com';

async function syncUsers() {
    console.log('--- STARTING USER SYNC ---');
    console.log(`Target Cloud URL: ${TARGET_URL}`);

    // 1. Fetch All Users
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users to sync.`);

    if (users.length === 0) {
        console.log('No users found? This is weird.');
        return;
    }

    // 2. Send to Cloud
    try {
        console.log(`Sending ${users.length} users...`);
        await axios.post(`${TARGET_URL}/api/sync/users`, { users }, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('✅ User Sync Success!');
    } catch (error) {
        console.error('❌ User Sync Failed');
        if (error.response) {
            console.error(`  Status: ${error.response.status}`);
            console.error('  Data:', error.response.data);
        } else {
            console.error('  Error:', error.message);
        }
    }

    console.log('\n--- SYNC COMPLETE ---');
}

syncUsers()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
