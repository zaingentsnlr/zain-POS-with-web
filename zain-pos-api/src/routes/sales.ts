import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// Get today's sales summary
router.get('/summary', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sales = await prisma.sale.findMany({
            where: {
                createdAt: { gte: today },
                status: 'COMPLETED'
            }
        });

        const totalSales = sales.reduce((sum, s) => sum + s.grandTotal, 0);
        const totalOrders = sales.length;

        res.json({
            totalSales,
            totalOrders,
            averageOrderValue: totalOrders > 0 ? totalSales / totalOrders : 0,
            date: today.toISOString()
        });
    } catch (error) {
        console.error('Sales summary error:', error);
        res.status(500).json({ error: 'Failed to fetch sales summary' });
    }
});

// Get daily sales for last 30 days
router.get('/daily', async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const sales = await prisma.sale.findMany({
            where: {
                createdAt: { gte: thirtyDaysAgo },
                status: 'COMPLETED'
            },
            orderBy: { createdAt: 'asc' }
        });

        const dailySales: Record<string, { date: string; sales: number; orders: number }> = {};

        sales.forEach(sale => {
            const date = sale.createdAt.toISOString().split('T')[0];
            if (!dailySales[date]) {
                dailySales[date] = { date, sales: 0, orders: 0 };
            }
            dailySales[date].sales += sale.grandTotal;
            dailySales[date].orders += 1;
        });

        res.json(Object.values(dailySales));
    } catch (error) {
        console.error('Daily sales error:', error);
        res.status(500).json({ error: 'Failed to fetch daily sales' });
    }
});

// Get hourly sales for today
router.get('/hourly', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sales = await prisma.sale.findMany({
            where: {
                createdAt: { gte: today },
                status: 'COMPLETED'
            }
        });

        const hourlySales: Record<number, { hour: number; sales: number; orders: number }> = {};

        for (let i = 0; i < 24; i++) {
            hourlySales[i] = { hour: i, sales: 0, orders: 0 };
        }

        sales.forEach(sale => {
            const hour = sale.createdAt.getHours();
            hourlySales[hour].sales += sale.grandTotal;
            hourlySales[hour].orders += 1;
        });

        res.json(Object.values(hourlySales));
    } catch (error) {
        console.error('Hourly sales error:', error);
        res.status(500).json({ error: 'Failed to fetch hourly sales' });
    }
});

// Get payment mode audit for today
router.get('/audit-payment-modes', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sales = await prisma.sale.findMany({
            where: {
                createdAt: { gte: today },
                status: 'COMPLETED'
            },
            select: {
                id: true,
                billNo: true,
                grandTotal: true,
                paymentMethod: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });

        // Group by payment mode
        const audit: Record<string, any[]> = {
            'CASH': [],
            'UPI': [],
            'CARD': []
        };

        sales.forEach(sale => {
            const mode = sale.paymentMethod || 'CASH';
            if (!audit[mode]) audit[mode] = [];
            audit[mode].push(sale);
        });

        res.json(audit);
    } catch (error) {
        console.error('Audit error:', error);
        res.status(500).json({ error: 'Failed to fetch payment audit' });
    }
});

export default router;
