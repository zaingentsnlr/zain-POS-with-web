import express from 'express';
import { PrismaClient } from '../../prisma/generated/client/index.js';

const router = express.Router();
const prisma = new PrismaClient();

// Sync Sales from Desktop
router.post('/sales', async (req, res) => {
    try {
        const { sales } = req.body;
        if (!Array.isArray(sales)) return res.status(400).json({ error: 'Invalid data' });

        console.log(`📡 Cloud receiving ${sales.length} sales...`);

        for (const sale of sales) {
            // 1. Sync User first (to satisfy FK)
            let finalUserId = sale.userId;

            if (sale.user) {
                try {
                    const syncedUser = await prisma.user.upsert({
                        where: { username: sale.user.username },
                        update: {
                            name: sale.user.name,
                            role: sale.user.role,
                            isActive: sale.user.isActive
                            // We don't update password/audit logs to keep cloud secure/clean
                        },
                        create: {
                            username: sale.user.username,
                            password: sale.user.password || 'default123', // Fallback
                            name: sale.user.name,
                            role: sale.user.role,
                            isActive: sale.user.isActive
                        }
                    });
                    finalUserId = syncedUser.id;
                } catch (e) {
                    console.error('User sync failed for:', sale.user.username, e);
                    // Fallback to default admin if user sync fails
                    const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
                    if (admin) finalUserId = admin.id;
                }
            }

            // 2. Sync Sale
            await prisma.sale.upsert({
                where: { id: sale.id },
                update: {
                    userId: finalUserId, // Use resolved ID
                    status: sale.status,
                    grandTotal: sale.grandTotal,
                    updatedAt: new Date(sale.updatedAt)
                },
                create: {
                    id: sale.id,
                    billNo: sale.billNo,
                    userId: finalUserId, // Use resolved ID
                    customerName: sale.customerName,
                    subtotal: sale.subtotal,
                    taxAmount: sale.taxAmount,
                    cgst: sale.cgst,
                    sgst: sale.sgst,
                    discount: sale.discount,
                    grandTotal: sale.grandTotal,
                    paidAmount: sale.paidAmount,
                    changeAmount: sale.changeAmount,
                    paymentMethod: sale.paymentMethod,
                    status: sale.status,
                    isHistorical: true,
                    createdAt: new Date(sale.createdAt),
                    updatedAt: new Date(sale.updatedAt),
                    items: {
                        create: sale.items?.map((item: any) => ({
                            id: item.id,
                            variantId: item.variantId,
                            productName: item.productName,
                            variantInfo: item.variantInfo,
                            quantity: item.quantity,
                            mrp: item.mrp,
                            sellingPrice: item.sellingPrice,
                            discount: item.discount,
                            taxRate: item.taxRate,
                            taxAmount: item.taxAmount,
                            total: item.total
                        }))
                    }
                }
            });
        }

        res.json({ success: true, count: sales.length });
    } catch (error: any) {
        console.error('Sync error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Sync Inventory from Desktop
router.post('/inventory', async (req, res) => {
    try {
        const { products } = req.body;
        if (!Array.isArray(products)) return res.status(400).json({ error: 'Invalid data' });

        for (const p of products) {
            // 1. Sync Category
            const category = await prisma.category.upsert({
                where: { name: p.category.name },
                update: {},
                create: { name: p.category.name }
            });

            // 2. Sync Product (Prisma doesn't have @unique on name, so we use findFirst + create/update)
            let product = await prisma.product.findFirst({
                where: { name: p.name, categoryId: category.id }
            });

            if (product) {
                product = await prisma.product.update({
                    where: { id: product.id },
                    data: {
                        taxRate: p.taxRate,
                        hsn: p.hsn
                    }
                });
            } else {
                product = await prisma.product.create({
                    data: {
                        name: p.name,
                        categoryId: category.id,
                        taxRate: p.taxRate,
                        hsn: p.hsn
                    }
                });
            }

            // 3. Sync Variants
            for (const v of p.variants) {
                await prisma.productVariant.upsert({
                    where: { id: v.id },
                    update: {
                        stock: v.stock,
                        sellingPrice: v.sellingPrice,
                        mrp: v.mrp,
                        barcode: v.barcode,
                        sku: v.sku
                    },
                    create: {
                        id: v.id,
                        productId: product.id,
                        sku: v.sku,
                        barcode: v.barcode,
                        size: v.size,
                        color: v.color,
                        mrp: v.mrp,
                        sellingPrice: v.sellingPrice,
                        costPrice: v.costPrice,
                        stock: v.stock
                    }
                });
            }
        }

        res.json({ success: true });
    } catch (error: any) {
        console.error('Inventory sync error:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
