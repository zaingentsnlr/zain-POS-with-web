
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

        // HASH PASSWORDS IF NEEDED
        // The desktop app uses cleartext, but Cloud API expects Hash.
        const bcrypt = require('bcryptjs');

        const usersToSync = await Promise.all(users.map(async (u) => {
            let password = u.password;
            // If it doesn't look like a bcrypt hash, hash it.
            if (!password.startsWith('$2')) {
                console.log(`Hashing password for ${u.username}...`);
                password = await bcrypt.hash(password, 10);
            }
            return {
                ...u,
                password: password
            };
        }));

        await axios.post(`${TARGET_URL}/api/sync/users`, { users: usersToSync }, {
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
