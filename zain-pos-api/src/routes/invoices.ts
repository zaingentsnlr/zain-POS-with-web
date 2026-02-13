import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// Get recent sales (invoices)
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 500;
        const page = parseInt(req.query.page as string) || 1;
        const skip = (page - 1) * limit;

        const [sales, total] = await Promise.all([
            prisma.sale.findMany({
                include: {
                    items: true
                },
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip
            }),
            prisma.sale.count()
        ]);

        // Map to a format expected by the frontend
        const invoices = sales.map(s => ({
            id: s.id,
            billNo: s.billNo,
            total: s.grandTotal,
            createdAt: s.createdAt,
            customer: {
                name: s.customerName || 'Walk-in Customer',
                phone: s.customerPhone || 'N/A'
            },
            items: s.items.map(i => ({
                quantity: i.quantity,
                product: {
                    name: i.productName + (i.variantInfo ? ` (${i.variantInfo})` : '')
                }
            }))
        }));

        res.json({
            invoices,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Invoices error:', error);
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
});

// Get sales by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const sale = await prisma.sale.findUnique({
            where: { id },
            include: {
                items: true
            }
        });

        if (!sale) {
            return res.status(404).json({ error: 'Sale record not found' });
        }

        const invoice = {
            id: sale.id,
            billNo: sale.billNo,
            total: sale.grandTotal,
            createdAt: sale.createdAt,
            customer: {
                name: sale.customerName || 'Walk-in Customer',
                phone: sale.customerPhone || 'N/A'
            },
            items: sale.items.map(i => ({
                quantity: i.quantity,
                product: {
                    name: i.productName + (i.variantInfo ? ` (${i.variantInfo})` : '')
                }
            }))
        };

        res.json(invoice);
    } catch (error) {
        console.error('Invoice detail error:', error);
        res.status(500).json({ error: 'Failed to fetch invoice' });
    }
});

// Search sales
router.get('/search/:query', async (req, res) => {
    try {
        const query = req.params.query;

        const sales = await prisma.sale.findMany({
            where: {
                OR: [
                    { customerName: { contains: query } },
                    { customerPhone: { contains: query } }
                ]
            },
            include: {
                items: true
            },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        const invoices = sales.map(s => ({
            id: s.id,
            billNo: s.billNo,
            total: s.grandTotal,
            createdAt: s.createdAt,
            customer: {
                name: s.customerName || 'Walk-in Customer',
                phone: s.customerPhone || 'N/A'
            },
            items: s.items.map(i => ({
                quantity: i.quantity,
                product: {
                    name: i.productName + (i.variantInfo ? ` (${i.variantInfo})` : '')
                }
            }))
        }));

        res.json(invoices);
    } catch (error) {
        console.error('Invoice search error:', error);
        res.status(500).json({ error: 'Failed to search invoices' });
    }
});

export default router;
