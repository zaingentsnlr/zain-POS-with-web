
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Secret key for maintenance operations (simple protection)
const MAINTENANCE_SECRET = process.env.MAINTENANCE_SECRET || 'zain-pos-maintenance-secret';

// WIPE ALL DATA (Except Users)
router.post('/reset', async (req, res) => {
    try {
        const { secret, confirm } = req.body;

        if (secret !== MAINTENANCE_SECRET) {
            return res.status(403).json({ error: 'Unauthorized: Invalid maintenance secret' });
        }

        if (confirm !== true) {
            return res.status(400).json({ error: 'Confirmation required (confirm: true)' });
        }

        console.log('⚠️ STARTING FULL DATA WIPE (Preserving Users) ⚠️');

        // Delete in order of dependency (Child -> Parent)

        // 1. Transactional Data
        await prisma.saleItem.deleteMany({});
        await prisma.sale.deleteMany({});
        // await prisma.invoice.deleteMany({}); // Model does not exist
        await prisma.inventoryMovement.deleteMany({});
        await prisma.auditLog.deleteMany({});

        // 2. Product Data
        await prisma.productVariant.deleteMany({});
        await prisma.product.deleteMany({});

        // 3. Master Data
        await prisma.category.deleteMany({});
        await prisma.customer.deleteMany({});
        await prisma.setting.deleteMany({}); // If requested to clear settings too

        console.log('✅ DATA WIPE COMPLETED');

        res.json({
            success: true,
            message: 'All application data (Sales, Inventory, Customers) has been erased. Users were preserved.'
        });

    } catch (error: any) {
        console.error('Data reset failed:', error);
        res.status(500).json({ error: 'Reset failed', details: error.message });
    }
});

export default router;
