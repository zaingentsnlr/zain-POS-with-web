import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

// Get all products with variants and stock levels
router.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                variants: true
            },
            where: { isActive: true },
            orderBy: { name: 'asc' }
        });

        // Flatten products and variants for simpler dashboard view
        const flattened = products.flatMap(product =>
            product.variants.filter(v => v.isActive).map(variant => ({
                id: `${product.id}-${variant.id}`,
                name: product.name + (variant.size ? ` (${variant.size}${variant.color ? ` ${variant.color}` : ''})` : ''),
                price: variant.sellingPrice,
                stock: variant.stock,
                category: product.category
            }))
        );

        res.json(flattened);
    } catch (error) {
        console.error('Products error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get low stock product variants
router.get('/low-stock', async (req, res) => {
    try {
        const threshold = parseInt(req.query.threshold as string) || 5;

        const variants = await prisma.productVariant.findMany({
            where: {
                stock: { lte: threshold },
                isActive: true
            },
            include: {
                product: {
                    include: { category: true }
                }
            },
            orderBy: { stock: 'asc' }
        });

        const lowStock = variants.map(v => ({
            id: `${v.product.id}-${v.id}`,
            name: v.product.name + (v.size ? ` (${v.size})` : ''),
            price: v.sellingPrice,
            stock: v.stock,
            category: v.product.category
        }));

        res.json(lowStock);
    } catch (error) {
        console.error('Low stock error:', error);
        res.status(500).json({ error: 'Failed to fetch low stock products' });
    }
});

// Get product categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true }
                }
            },
            orderBy: { name: 'asc' }
        });

        res.json(categories);
    } catch (error) {
        console.error('Categories error:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

export default router;
