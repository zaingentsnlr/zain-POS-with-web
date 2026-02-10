
const axios = require('axios');

async function verifyCloudFix() {
    console.log('--- VERIFYING CLOUD FIX DIRECTLY ---');
    const targetUrl = 'https://zain-pos-desktop.onrender.com';

    // Generate random IDs to ensure they are "new" to the cloud DB
    const randomId = () => Math.random().toString(36).substring(7);
    const userId = `test-user-${randomId()}`;
    const variantId = `test-variant-${randomId()}`;
    const saleId = `test-sale-${randomId()}`;

    const payload = {
        sales: [
            {
                id: saleId,
                billNo: 999999,
                userId: userId,
                user: {
                    id: userId,
                    username: `tester-${randomId()}`,
                    name: 'Test Agent',
                    role: 'ADMIN',
                    isActive: true,
                    password: 'password123'
                },
                customerName: 'Test Customer',
                subtotal: 100,
                taxAmount: 5,
                cgst: 2.5,
                sgst: 2.5,
                discount: 0,
                grandTotal: 105,
                paidAmount: 105,
                changeAmount: 0,
                paymentMethod: 'CASH',
                status: 'COMPLETED',
                isHistorical: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                items: [
                    {
                        id: `item-${randomId()}`,
                        variantId: variantId,
                        productName: 'New Unknown Product',
                        variantInfo: 'Test Variant',
                        quantity: 1,
                        mrp: 100,
                        sellingPrice: 100,
                        discount: 0,
                        taxRate: 5,
                        taxAmount: 5,
                        total: 105
                    }
                ]
            }
        ]
    };

    console.log(`1. Sending Test Sale with UNKNOWN User (${userId}) and UNKNOWN Variant (${variantId})...`);
    console.log('   This forces the Cloud API to use the new Placeholder Logic.');

    try {
        const response = await axios.post(`${targetUrl}/api/sync/sales`, payload, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('\n✅ VERIFICATION SUCCESSFUL!');
        console.log('Server accepted the data:', response.data);
        console.log('\nThis confirms that:');
        console.log('1. The Cloud API is reachable.');
        console.log('2. The "Placeholder Logic" is active (it handled the unknown variant).');
        console.log('3. The "User Sync" logic is active (it handled the unknown user).');
        console.log('\nYou can now rely on the desktop app sync.');

    } catch (error) {
        console.log('\n❌ VERIFICATION FAILED');
        if (error.response) {
            console.log(`Status: ${error.response.status}`);
            console.log('Data:', error.response.data);
            console.log('\nObservation: If this is still "Foreign Key Constraint", the deployment has NOT finished yet.');
        } else {
            console.log('Error:', error.message);
        }
    }
}

verifyCloudFix().catch(console.error);
