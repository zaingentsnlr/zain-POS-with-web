import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { notificationService } from '../services/notificationService';

const router = Router();
const prisma = new PrismaClient();

// Get recent notifications for the authenticated user's shop
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
    try {
        const userId = req.userId;
        // Assuming user acts as shop owner or is linked to the shop.
        const rawShopId = req.query.shopId;
        const shopId = (typeof rawShopId === 'string' ? rawShopId : process.env.SHOP_ID) || 'default-shop';

        const notifications = await prisma.notification.findMany({
            where: { shopId: String(shopId) },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

// Subscribe for Web Push
router.post('/subscribe', authMiddleware, async (req: AuthRequest, res) => {
    try {
        const subscription = req.body;
        if (req.userId) {
            await notificationService.subscribe(req.userId, subscription);
            res.status(201).json({ message: 'Subscribed successfully' });
        } else {
            res.status(401).json({ error: 'User ID missing' });
        }
    } catch (error) {
        console.error('Error subscribing:', error);
        res.status(500).json({ error: 'Failed to subscribe' });
    }
});

// Mark single notification as read
router.patch('/:id/read', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        await prisma.notification.update({
            where: { id: String(id) },
            data: { read: true }
        });
        res.json({ message: 'Marked as read' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update notification' });
    }
});

// Mark all as read
router.patch('/read-all', authMiddleware, async (req: AuthRequest, res) => {
    try {
        const rawShopId = req.query.shopId;
        const shopId = (typeof rawShopId === 'string' ? rawShopId : process.env.SHOP_ID) || 'default-shop';
        await prisma.notification.updateMany({
            where: {
                shopId,
                read: false
            },
            data: { read: true }
        });
        res.json({ message: 'All marked as read' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark all read' });
    }
});

export default router;
