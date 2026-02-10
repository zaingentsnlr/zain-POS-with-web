
const axios = require('axios');
const dotenv = require('dotenv');

// Load env if present
dotenv.config();

async function triggerCleanup() {
    console.log('--- TRIGGERING CLOUD CLEANUP ---');

    // Hardcoded URL fallback since we might run without DB connection
    const targetUrl = process.env.CLOUD_API_URL || 'https://zain-pos-desktop.onrender.com';

    console.log(`Target: ${targetUrl}/api/sync/cleanup-placeholders`);

    try {
        const response = await axios.post(`${targetUrl}/api/sync/cleanup-placeholders`);
        console.log('✅ CLEANUP SUCCESS!');
        console.log('Result:', response.data);
    } catch (error) {
        console.log('❌ CLEANUP FAILED');
        if (error.response) {
            console.log(`Status: ${error.response.status}`);
            console.log('Data:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }
}

triggerCleanup().catch(console.error);
