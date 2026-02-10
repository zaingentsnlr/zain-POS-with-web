import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// Get revenue trends
router.get('/revenue', async (req, res) => {
    try {
        const days = parseInt(req.query.days as string) || 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const sales = await prisma.sale.findMany({
            where: {
                createdAt: { gte: startDate },
                status: 'COMPLETED'
            }
        });

        const totalRevenue = sales.reduce((sum, s) => sum + s.grandTotal, 0);
        const averageRevenue = sales.length > 0 ? totalRevenue / sales.length : 0;

        res.json({
            totalRevenue,
            averageRevenue,
            totalOrders: sales.length,
            period: `Last ${days} days`
        });
    } catch (error) {
        console.error('Revenue error:', error);
        res.status(500).json({ error: 'Failed to fetch revenue data' });
    }
});

// Get top selling products
router.get('/top-products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;

        const items = await prisma.saleItem.groupBy({
            by: ['variantId', 'productName'],
            _sum: {
                quantity: true,
                total: true
            },
            orderBy: {
                _sum: {
                    quantity: 'desc'
                }
            },
            take: limit
        });

        const topProducts = items.map(item => ({
            product: {
                id: item.variantId,
                name: item.productName,
                category: { name: 'N/A' } // Schema doesn't easily allow category name from saleItem group by
            },
            totalQuantity: item._sum.quantity || 0,
            totalRevenue: item._sum.total || 0
        }));

        res.json(topProducts);
    } catch (error) {
        console.error('Top products error:', error);
        res.status(500).json({ error: 'Failed to fetch top products' });
    }
});

// Get overall performance analytics
router.get('/performance', async (req, res) => {
    try {
        const totalSales = await prisma.sale.count({ where: { status: 'COMPLETED' } });
        const totalProducts = await prisma.product.count({ where: { isActive: true } });
        const totalInStock = await prisma.productVariant.aggregate({
            where: { isActive: true },
            _sum: { stock: true }
        });

        res.json({
            totalSales,
            totalProducts,
            totalInventoryStock: totalInStock._sum.stock || 0
        });
    } catch (error) {
        console.error('Performance error:', error);
        res.status(500).json({ error: 'Failed to fetch performance analytics' });
    }
});

export default router;
