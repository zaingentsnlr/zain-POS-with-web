import webpush from 'web-push';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configure VAPID keys
// In production, these should be environment variables
const publicVapidKey = process.env.VAPID_PUBLIC_KEY || 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';
const privateVapidKey = process.env.VAPID_PRIVATE_KEY || 'your-private-key-should-be-in-env';

webpush.setVapidDetails(
    'mailto:zain@example.com',
    publicVapidKey,
    privateVapidKey
);

export interface PushPayload {
    title: string;
    body: string;
    url?: string;
    icon?: string;
}

export const pushService = {
    // Send notification to all users of a shop
    sendToShop: async (shopId: string, payload: PushPayload) => {
        try {
            // Fetch all subscriptions for this shop
            // For now, assuming we might store this in a 'PushSubscription' model
            // If model doesn't exist yet, we'll need to create it or skip
            // Let's assume a 'PushSubscription' table exists or we use a related structure

            // Checking if PushSubscription model exists in schema is needed first.
            // For now, I will write the placeholder logic.

            console.log(`Sending push to shop ${shopId}:`, payload);

            // Mock implementation until Schema is updated
            // const subscriptions = await prisma.pushSubscription.findMany({ where: { shopId } });
            // Promise.all(subscriptions.map(sub => webpush.sendNotification(JSON.parse(sub.data), JSON.stringify(payload))));

        } catch (error) {
            console.error('Push notification failed:', error);
        }
    },

    // Helper to send to a specific subscription (used for testing)
    sendToSubscription: async (subscription: any, payload: PushPayload) => {
        try {
            await webpush.sendNotification(subscription, JSON.stringify(payload));
            return { success: true };
        } catch (error) {
            console.error('Individual push failed:', error);
            return { success: false, error };
        }
    }
};
