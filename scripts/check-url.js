
const axios = require('axios');

const urls = [
    'https://zain-pos-api.onrender.com',
    'https://zain-pos-desktop.onrender.com',
    'https://zain-pos.onrender.com'
];

async function check() {
    console.log('Checking URLs...');
    for (const url of urls) {
        try {
            console.log(`Pinging ${url}/health ...`);
            const res = await axios.get(`${url}/health`, { timeout: 5000 });
            console.log(`✅ SUCCESS: ${url}`);
            console.log('Response:', res.data);
            return; // Found it
        } catch (e) {
            console.log(`❌ FAILED: ${url} - ${e.message}`);
        }
    }
    console.log('Could not find a working URL.');
}

check();
