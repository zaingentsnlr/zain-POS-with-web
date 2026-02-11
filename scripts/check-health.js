
const axios = require('axios');

const API_URL = 'https://zain-pos-desktop.onrender.com';

async function checkHealth() {
    console.log(`Checking ${API_URL}...`);
    try {
        const res = await axios.get(API_URL);
        console.log('✅ Root Status:', res.status);
        console.log('Response:', res.data);
    } catch (error) {
        console.error('❌ Root Check Failed:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }

    console.log(`\nChecking ${API_URL}/health...`);
    try {
        const res = await axios.get(`${API_URL}/health`);
        console.log('✅ Health Status:', res.status);
        console.log('Response:', res.data);
    } catch (error) {
        console.error('❌ Health Check Failed:', error.message);
    }
}

checkHealth();
