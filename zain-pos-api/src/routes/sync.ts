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

        // ---------------------------------------------------------
        // PRE-PROCESS: Ensure all referenced Products exist
        // ---------------------------------------------------------
        const allVariantIds = new Set<string>();
        sales.forEach(sale => {
            sale.items?.forEach((item: any) => {
                if (item.variantId) allVariantIds.add(item.variantId);
            });
        });

        if (allVariantIds.size > 0) {
            const existingVariants = await prisma.productVariant.findMany({
                where: { id: { in: Array.from(allVariantIds) } },
                select: { id: true }
            });

            const existingVariantIds = new Set(existingVariants.map(v => v.id));
            const missingVariantIds = Array.from(allVariantIds).filter(id => !existingVariantIds.has(id));

            if (missingVariantIds.length > 0) {
                console.log(`⚠️ Found ${missingVariantIds.length} missing variants. Creating placeholders...`);

                // 1. Ensure a fallback category exists
                const fallbackCategory = await prisma.category.upsert({
                    where: { name: 'Unsynced Inventory' },
                    update: {},
                    create: { name: 'Unsynced Inventory' }
                });

                // 2. Create Placeholder Products & Variants
                for (const variantId of missingVariantIds) {
                    // Find the item details from the payload to make the placeholder meaningful
                    let itemInfo: any = null;
                    for (const s of sales) {
                        itemInfo = s.items?.find((i: any) => i.variantId === variantId);
                        if (itemInfo) break;
                    }

                    if (!itemInfo) continue; // Should not happen

                    // Create/Find a placeholder product
                    const productName = itemInfo.productName || 'Unknown Product';

                    // We try to find a product by name first to avoid duplicates if possible, 
                    // but since we don't have the original productId, we might create a duplicate if names match.
                    // Ideally we should assume it's a new placeholder product relative to this variant.

                    const product = await prisma.product.create({
                        data: {
                            name: productName + ' (Sync Placeholder)',
                            categoryId: fallbackCategory.id,
                            taxRate: itemInfo.taxRate || 0,
                            description: 'Created automatically during sales sync'
                        }
                    });

                    await prisma.productVariant.create({
                        data: {
                            id: variantId, // CRITICAL: Use the exact ID from desktop
                            productId: product.id,
                            sku: `SYNC-${variantId.substring(0, 8)}`,
                            barcode: `SYNC-${variantId.substring(0, 8)}`, // Temporary barcode
                            mrp: itemInfo.mrp || 0,
                            sellingPrice: itemInfo.sellingPrice || 0,
                            costPrice: 0,
                            stock: 0
                        }
                    });
                }
                console.log('✅ Placeholders created.');
            }
        }
        // ---------------------------------------------------------

        for (const sale of sales) {
            // 1. Sync User first (to satisfy FK)
            let finalUserId = sale.userId;

            if (sale.user) {
                try {
                    // Start by trying to ensure the user exists with the SAME ID as desktop
                    const syncedUser = await prisma.user.upsert({
                        where: { username: sale.user.username },
                        update: {
                            name: sale.user.name,
                            role: sale.user.role,
                            isActive: sale.user.isActive
                        },
                        create: {
                            id: sale.user.id, // KEEP ID CONSISTENT
                            username: sale.user.username,
                            password: sale.user.password || 'default123',
                            name: sale.user.name,
                            role: sale.user.role,
                            isActive: sale.user.isActive
                        }
                    });
                    finalUserId = syncedUser.id;
                } catch (e: any) {
                    console.error('CRITICAL: User sync failed for:', sale.user.username, e);
                    // If we can't sync the user, we can't sync the sale. Return specific error.
                    throw new Error(`User Sync Failed for ${sale.user.username}: ${e.message}`);
                }
            } else {
                console.warn(`Warning: Sale ${sale.billNo} has no user data attached.`);
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
                        productId: product.id, // CRITICAL: Move variant to the Real Product (detach from placeholder)
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
