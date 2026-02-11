
const axios = require('axios');

const TARGET_URL = 'https://zain-pos-desktop.onrender.com';

async function testLogin() {
    console.log(`Testing Login against: ${TARGET_URL}`);

    try {
        const response = await axios.post(`${TARGET_URL}/api/auth/login`, {
            username: 'admin',
            password: 'admin123'
        });

        console.log('✅ LOGIN SUCCESS!');
        console.log('Token:', response.data.token ? 'Received' : 'Missing');
        console.log('User:', response.data.user);

    } catch (error) {
        console.log('❌ LOGIN FAILED');
        if (error.response) {
            console.log(`Status: ${error.response.status}`);
            console.log('Data:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }
}

testLogin();
