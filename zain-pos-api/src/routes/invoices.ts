import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { Parser } from 'json2csv';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// Get recent sales (invoices)
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 20; // Default lower limit for better performance
        const page = parseInt(req.query.page as string) || 1;
        const search = req.query.search as string;
        const startDate = req.query.startDate as string;
        const endDate = req.query.endDate as string;
        const skip = (page - 1) * limit;

        const where: any = {};

        // Search filter
        if (search) {
            const isBillNo = !isNaN(Number(search));
            where.OR = [
                { customerName: { contains: search, mode: 'insensitive' } },
                { customerPhone: { contains: search } },
                ...(isBillNo ? [{ billNo: Number(search) }] : [])
            ];
        }

        // Date range filter
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) where.createdAt.gte = new Date(startDate);
            if (endDate) where.createdAt.lte = new Date(endDate);
        }

        const [sales, total] = await Promise.all([
            prisma.sale.findMany({
                where,
                include: {
                    items: true
                },
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip
            }),
            prisma.sale.count({ where })
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

// Export Invoices (CSV)
router.get('/export', async (req, res) => {
    try {
        const search = req.query.search as string;
        const startDate = req.query.startDate as string;
        const endDate = req.query.endDate as string;
        const paymentMethod = req.query.paymentMethod as string;

        const where: any = {};

        if (search) {
            const isBillNo = !isNaN(Number(search));
            where.OR = [
                { customerName: { contains: search, mode: 'insensitive' } },
                { customerPhone: { contains: search } },
                ...(isBillNo ? [{ billNo: Number(search) }] : [])
            ];
        }

        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) where.createdAt.gte = new Date(startDate);
            if (endDate) where.createdAt.lte = new Date(endDate);
        }

        if (paymentMethod && paymentMethod !== 'ALL') {
            where.paymentMethod = paymentMethod;
        }

        const sales = await prisma.sale.findMany({
            where,
            include: {
                items: true,
                user: { select: { name: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        const invoices = sales.map((s: any) => ({
            'Bill No': s.billNo,
            'Customer Name': s.customerName || 'Walk-in',
            'Phone': s.customerPhone || 'N/A',
            'Date': s.createdAt.toISOString().split('T')[0],
            'Time': s.createdAt.toLocaleTimeString(),
            'Subtotal': s.subtotal,
            'Discount': s.discount,
            'Tax': s.taxAmount,
            'Grand Total': s.grandTotal,
            'Payment Method': s.paymentMethod,
            'Status': s.status,
            'Cashier': s.user?.name || 'Unknown',
            'Items': s.items.map((i: any) => `${i.quantity}x ${i.productName}`).join(', ')
        }));

        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(invoices);

        res.header('Content-Type', 'text/csv');
        res.attachment(`invoices-${new Date().toISOString().split('T')[0]}.csv`);
        res.send(csv);

    } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({ error: 'Failed to export invoices' });
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
