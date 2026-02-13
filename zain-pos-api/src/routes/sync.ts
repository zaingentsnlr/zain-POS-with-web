import express from 'express';
import { PrismaClient } from '@prisma/client';

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

            const existingVariantIds = new Set(existingVariants.map((v: any) => v.id));
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
                            id: sale.user.id, // Try to force ID
                            username: sale.user.username,
                            password: sale.user.password,
                            name: sale.user.name,
                            role: sale.user.role,
                            isActive: sale.user.isActive
                        }
                    });
                    finalUserId = syncedUser.id;
                } catch (e) {
                    console.warn(`Failed to sync user ${sale.user.username} for sale ${sale.billNo}, trying fallback...`);
                }
            } else {
                console.warn(`Warning: Sale ${sale.billNo} has no user data attached.`);
            }

            // Verify if finalUserId exists, if not, fallback to any Admin
            const userExists = await prisma.user.findUnique({ where: { id: finalUserId } });
            if (!userExists) {
                console.warn(`User ID ${finalUserId} not found for sale ${sale.billNo}. Assigning to fallback Admin.`);
                let admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
                if (!admin) {
                    // Create a default admin if absolutely no users exist
                    admin = await prisma.user.create({
                        data: {
                            username: 'admin',
                            password: 'admin123',
                            name: 'System Admin',
                            role: 'ADMIN',
                            isActive: true
                        }
                    });
                }
                finalUserId = admin.id;
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

        // BROADCAST TO DASHBOARD
        try {
            const { getIO } = require('../socket');
            const io = getIO();
            io.emit('sale:created', { count: sales.length, timestamp: new Date() });
            console.log(`📢 Emitted 'sale:created' for ${sales.length} sales.`);
        } catch (e) {
            console.error("Socket warning:", e);
        }

        res.json({ success: true, count: sales.length });
    } catch (error: any) {
        console.error('Sync error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Sync Users from Desktop
router.post('/users', async (req, res) => {
    try {
        const { users } = req.body;
        if (!Array.isArray(users)) return res.status(400).json({ error: 'Invalid data' });

        console.log(`📡 Cloud receiving ${users.length} users...`);

        for (const user of users) {
            await prisma.user.upsert({
                where: { username: user.username },
                update: {
                    name: user.name,
                    role: user.role,
                    password: user.password, // Syncing hashed password
                    isActive: user.isActive
                },
                create: {
                    username: user.username,
                    name: user.name,
                    role: user.role,
                    password: user.password,
                    isActive: user.isActive
                }
            });
        }
        console.log('✅ Users synced.');
        res.json({ success: true });
    } catch (error) {
        console.error('User Sync Error:', error);
        res.status(500).json({ error: 'Sync failed' });
    }
});

// Sync Inventory from Desktop
router.post('/inventory', async (req, res) => {
    try {
        const { products } = req.body;
        if (!Array.isArray(products)) return res.status(400).json({ error: 'Invalid data' });

        console.log(`📦 Syncing ${products.length} products...`);
        const receivedVariantIds: string[] = [];

        for (const p of products) {
            // 1. Sync Category
            const category = await prisma.category.upsert({
                where: { name: p.category.name },
                update: {},
                create: { name: p.category.name }
            });

            // 2. Sync Product
            // Use ID if provided and matches, otherwise fallback to name mapping (careful of ID shifts)
            // Ideally we should sync Product IDs too if they match UUID format.
            // But for now, we trust the name+category uniqueness or try to match.

            let product = await prisma.product.findFirst({
                where: { name: p.name, categoryId: category.id }
            });

            if (product) {
                product = await prisma.product.update({
                    where: { id: product.id },
                    data: {
                        taxRate: p.taxRate,
                        hsn: p.hsn,
                        isActive: p.isActive // Respect Desktop status
                    }
                });
            } else {
                product = await prisma.product.create({
                    data: {
                        name: p.name,
                        categoryId: category.id,
                        taxRate: p.taxRate,
                        hsn: p.hsn,
                        isActive: p.isActive ?? true
                    }
                });
            }

            // 3. Sync Variants
            for (const v of p.variants) {
                receivedVariantIds.push(v.id);

                await prisma.productVariant.upsert({
                    where: { id: v.id },
                    update: {
                        productId: product.id,
                        stock: v.stock,
                        sellingPrice: v.sellingPrice,
                        mrp: v.mrp,
                        barcode: v.barcode,
                        sku: v.sku,
                        size: v.size,
                        color: v.color,
                        costPrice: v.costPrice,
                        isActive: v.isActive // Respect Desktop status
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
                        costPrice: v.costPrice || 0,
                        stock: v.stock,
                        isActive: v.isActive ?? true
                    }
                });
            }
        }

        // 4. SOFT DELETE Missing Items (Pruning)
        // If a variant is NOT in the received list, it means it was deleted on Desktop.
        if (receivedVariantIds.length > 0) {
            const result = await prisma.productVariant.updateMany({
                where: {
                    id: { notIn: receivedVariantIds },
                    isActive: true
                },
                data: { isActive: false, stock: 0 }
            });
            console.log(`🧹 Archived ${result.count} stale variants.`);
        }

        res.json({ success: true, count: products.length });
    } catch (error: any) {
        console.error('Inventory sync error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Cleanup Empty Placeholders
router.post('/cleanup-placeholders', async (req, res) => {
    try {
        console.log('🧹 Cleanup: checking for empty placeholders...');

        // 1. Find all Placeholder Products
        const placeholders = await prisma.product.findMany({
            where: {
                name: { contains: '(Sync Placeholder)' }
            },
            include: {
                variants: true
            }
        });

        let deletedCount = 0;

        for (const p of placeholders) {
            if (p.variants.length === 0) {
                await prisma.product.delete({ where: { id: p.id } });
                deletedCount++;
            }
        }

        console.log(`✅ Cleanup complete. Deleted ${deletedCount} placeholders.`);
        res.json({ success: true, deleted: deletedCount, totalChecked: placeholders.length });

    } catch (error: any) {
        console.error('Cleanup error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Sync Settings from Desktop
router.post('/settings', async (req, res) => {
    try {
        const { settings } = req.body;
        if (!Array.isArray(settings)) return res.status(400).json({ error: 'Invalid data' });

        console.log(`📡 Cloud receiving ${settings.length} settings...`);

        for (const setting of settings) {
            await prisma.setting.upsert({
                where: { key: setting.key },
                update: {
                    value: setting.value
                },
                create: {
                    key: setting.key,
                    value: setting.value
                }
            });
        }

        res.json({ success: true, count: settings.length });
    } catch (error: any) {
        console.error('Settings sync error:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
