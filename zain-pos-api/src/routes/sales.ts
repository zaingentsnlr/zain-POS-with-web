import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// Get paginated sales list
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 50;
        const skip = (page - 1) * limit;

        const startDate = req.query.startDate ? new Date(req.query.startDate as string) : null;
        const endDate = req.query.endDate ? new Date(req.query.endDate as string) : null;

        // Build filter
        const where: any = {
            status: 'COMPLETED'
        };

        if (startDate && endDate) {
            where.createdAt = {
                gte: startDate,
                lte: endDate
            };
        }

        const [sales, total] = await Promise.all([
            prisma.sale.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: { name: true }
                    },
                    items: true
                }
            }),
            prisma.sale.count({ where })
        ]);

        res.json({
            data: sales,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Failed to fetch sales list:', error);
        res.status(500).json({ error: 'Failed to fetch sales list' });
    }
});

// Get sales summary (flexible date range)
router.get('/summary', async (req, res) => {
    try {
        const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date();
        const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();

        // If no time specified, set to start/end of day
        if (!req.query.startDate) startDate.setHours(0, 0, 0, 0);
        if (!req.query.endDate) endDate.setHours(23, 59, 59, 999);

        const sales = await prisma.sale.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                },
                status: 'COMPLETED'
            }
        });

        const totalSales = sales.reduce((sum, s) => sum + s.grandTotal, 0);
        const totalOrders = sales.length;

        res.json({
            totalSales,
            totalOrders,
            averageOrderValue: totalOrders > 0 ? totalSales / totalOrders : 0,
            range: { start: startDate, end: endDate }
        });
    } catch (error) {
        console.error('Sales summary error:', error);
        res.status(500).json({ error: 'Failed to fetch sales summary' });
    }
});

// Get daily sales trend
router.get('/daily', async (req, res) => {
    try {
        // Default to last 30 days if not provided
        const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();
        const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date(new Date().setDate(endDate.getDate() - 30));

        const sales = await prisma.sale.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                },
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

        // Fill gaps if needed (optional, keeping simple for now)
        res.json(Object.values(dailySales));
    } catch (error) {
        console.error('Daily sales error:', error);
        res.status(500).json({ error: 'Failed to fetch daily sales' });
    }
});

// Get hourly sales (single day)
router.get('/hourly', async (req, res) => {
    try {
        const date = req.query.date ? new Date(req.query.date as string) : new Date();
        const startOfDay = new Date(date); startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date); endOfDay.setHours(23, 59, 59, 999);

        const sales = await prisma.sale.findMany({
            where: {
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay
                },
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
