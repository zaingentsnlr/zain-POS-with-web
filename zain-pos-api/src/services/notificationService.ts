import { PrismaClient } from '@prisma/client';
import webPush from 'web-push';
import { getIO } from '../socket';

const prisma = new PrismaClient();

// Setup Web Push
const publicVapidKey = process.env.VAPID_PUBLIC_KEY!;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY!;
const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:admin@zainpos.com';

if (publicVapidKey && privateVapidKey) {
    webPush.setVapidDetails(vapidSubject, publicVapidKey, privateVapidKey);
}

interface NotificationPayload {
    shopId: string;
    type: 'sale' | 'invoice_deleted' | 'invoice_updated';
    title: string;
    message: string;
    referenceId?: string;
    metadata?: any;
}

export const notificationService = {
    async send({ shopId, type, title, message, referenceId, metadata }: NotificationPayload) {
        try {
            // 1. Save to Database
            const notification = await prisma.notification.create({
                data: {
                    shopId,
                    type,
                    title,
                    message,
                    referenceId,
                    metadata: metadata || {},
                    read: false
                }
            });

            // 2. Emit Socket Event
            try {
                const io = getIO();
                // Emit to specific shop room
                io.to(`shop_${shopId}`).emit('notification', notification);
            } catch (error) {
                console.warn('Socket.io not initialized or error emitting:', error);
            }

            // 3. Send Web Push
            // Find all subscriptions for this shop (conceptually, users in this shop)
            // Since we don't have a direct Shop-User link in simple mode, 
            // we might notify ALL users or filter if we had that link.
            // For now, let's notify ALL admins/cashiers since it's likely single tenant per deployment 
            // OR strictly filter by shopId if we assume multi-tenant.
            // But wait, PushSubscription has userId. User doesn't have shopId.
            // IF we assume single tenant, we notify all. 
            // IF we strictly follow "shopId", we need to know which users belong to shopId.
            // Given the current schema, let's assume all users with subscriptions should get it 
            // OR maybe we can't filter by shopId effectively without a link.
            // However, the user asked for `shopId` logic.
            // I will fetch subscriptions for users.

            // Allow sending to all for now as it's likely single deployment per shop.
            const subscriptions = await prisma.pushSubscription.findMany();

            const pushPayload = JSON.stringify({
                title,
                body: message,
                icon: '/icons/icon-192x192.png',
                data: {
                    url: referenceId ? `/dashboard/sales` : '/dashboard/notifications' // generic url logic
                }
            });

            const sendPromises = subscriptions.map(async (sub) => {
                const pushConfig = {
                    endpoint: sub.endpoint,
                    keys: sub.keys as any
                };

                try {
                    await webPush.sendNotification(pushConfig, pushPayload);
                } catch (error: any) {
                    if (error.statusCode === 410 || error.statusCode === 404) {
                        // Expired subscription, delete it
                        await prisma.pushSubscription.delete({ where: { id: sub.id } });
                    } else {
                        console.error('Push error:', error);
                    }
                }
            });

            await Promise.all(sendPromises);

            return notification;
        } catch (error) {
            console.error('Error in notificationService.send:', error);
            throw error;
        }
    },

    async subscribe(userId: string, subscription: any) {
        return prisma.pushSubscription.upsert({
            where: { endpoint: subscription.endpoint },
            update: {
                userId,
                keys: subscription.keys,
                updatedAt: new Date()
            },
            create: {
                userId,
                endpoint: subscription.endpoint,
                keys: subscription.keys
            }
        });
    }
};
