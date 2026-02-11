
import axios from 'axios';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

// Configuration
const API_URL = process.env.API_URL || 'https://zain-pos-api.onrender.com'; // Default to Prod or Local
const MAINTENANCE_SECRET = process.env.MAINTENANCE_SECRET || 'zain-pos-maintenance-secret';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const resetCloudData = async () => {
    console.log(`\n⚠️  DANGER ZONE: CLOUD DATA RESET ⚠️`);
    console.log(`Target API: ${API_URL}`);
    console.log(`\nThis will PERMANENTLY DELETE:`);
    console.log(`- All Sales & Invoices`);
    console.log(`- All Products & Variants`);
    console.log(`- All Inventory Movements`);
    console.log(`- All Customers`);
    console.log(`\n(Users will be PRESERVED)`);

    rl.question('\nAre you sure you want to proceed? Type "DELETE" to confirm: ', async (answer) => {
        if (answer !== 'DELETE') {
            console.log('❌ Operation cancelled.');
            rl.close();
            return;
        }

        try {
            console.log('\n⏳ Initiating reset...');
            const response = await axios.post(`${API_URL}/api/maintenance/reset`, {
                secret: MAINTENANCE_SECRET,
                confirm: true
            });

            if (response.data.success) {
                console.log(`\n✅ SUCCESS: ${response.data.message}`);
                console.log(`\nNext Steps:`);
                console.log(`1. Open Desktop App`);
                console.log(`2. Go to Settings > Cloud Backup`);
                console.log(`3. Click "Sync Now" to push fresh data.`);
            } else {
                console.error(`\n❌ FAILED: ${JSON.stringify(response.data)}`);
            }
        } catch (error: any) {
            console.error(`\n❌ ERROR: ${error.message}`);
            if (error.response) {
                console.error(`Server Response: ${JSON.stringify(error.response.data)}`);
            }
        } finally {
            rl.close();
        }
    });
};

resetCloudData();
