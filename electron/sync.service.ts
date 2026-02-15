import axios from 'axios';
import { PrismaClient } from '@prisma/client';

// We need a local prisma client instance here since we're in the electron process
// Using 'any' to avoid strict type checks against the generated client if paths differ
// In a real app, we'd import the generated client properly
let prisma: any;

// Initializer to inject prisma instance from main.ts
export const setPrismaInstance = (p: any) => {
    prisma = p;
};

class CloudSyncService {
    private apiUrl: string = '';
    private isSyncing: boolean = false;

    setApiUrl(url: string) {
        this.apiUrl = url;
    }

    setPrismaInstance(p: any) {
        setPrismaInstance(p);
    }

    // Queue a sale for sync
    async queueSale(sale: any) {
        if (!prisma) return;
        try {
            await prisma.syncQueue.create({
                data: {
                    action: 'CREATE',
                    model: 'Sale',
                    data: JSON.stringify(sale),
                    status: 'PENDING'
                }
            });
            // Trigger immediate sync attempt
            this.processQueue();
        } catch (error) {
            console.error('Failed to queue sale:', error);
        }
    }

    // Process the Sync Queue
    async processQueue() {
        if (this.isSyncing || !this.apiUrl || !prisma) return;

        this.isSyncing = true;

        try {
            // 1. Fetch sales pending sync
            const pendingSales = await prisma.syncQueue.findMany({
                where: {
                    status: 'PENDING',
                    model: 'Sale'
                },
                take: 10
            });

            if (pendingSales.length === 0) {
                this.isSyncing = false;
                return;
            }

            console.log(`Processing ${pendingSales.length} queued sales...`);

            // 2. Prepare payload
            const sales = pendingSales.map((item: any) => JSON.parse(item.data));

            // 3. Send to Cloud
            await axios.post(`${this.apiUrl}/api/sync/sales`, { sales }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // 4. Mark as Synced (Delete from queue)
            const ids = pendingSales.map((p: any) => p.id);
            await prisma.syncQueue.deleteMany({
                where: { id: { in: ids } }
            });

            console.log(`✅ Successfully synced ${ids.length} sales.`);

            // 5. Check if more items exist
            const remaining = await prisma.syncQueue.count({ where: { status: 'PENDING' } });
            if (remaining > 0) {
                setTimeout(() => {
                    this.isSyncing = false;
                    this.processQueue();
                }, 1000); // Process next batch after 1s
                return;
            }

        } catch (error: any) {
            console.error('Queue sync failed:', error.message);

            // Optional: Increment retry count
            // await prisma.syncQueue.updateMany({ ... })
        } finally {
            this.isSyncing = false;
        }
    }

    // Legacy/Manual Sync methods
    async syncSales(sales: any[]) {
        if (!this.apiUrl) return;
        try {
            console.log(`Bulk syncing ${sales.length} sales...`);
            await axios.post(`${this.apiUrl}/api/sync/sales`, { sales }, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async syncInventory(products: any[]) {
        if (!this.apiUrl) return;
        try {
            await axios.post(`${this.apiUrl}/api/sync/inventory`, { products }, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    async syncSettings(settings: any[]) {
        if (!this.apiUrl) return;
        try {
            console.log(`Syncing ${settings.length} settings to cloud...`);
            await axios.post(`${this.apiUrl}/api/sync/settings`, { settings }, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { success: true };
        } catch (error: any) {
            console.error('Settings sync failed:', error.message);
            return { success: false, error: error.message };
        }
    }

    async syncUsers(users: any[]) {
        if (!this.apiUrl) return;
        try {
            console.log(`Syncing ${users.length} users to cloud...`);
            await axios.post(`${this.apiUrl}/api/sync/users`, { users }, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { success: true };
        } catch (error: any) {
            console.error('Users sync failed:', error.message);
            return { success: false, error: error.message };
        }
    }

    async syncAuditLogs(logs: any[]) {
        if (!this.apiUrl) return;
        try {
            await axios.post(`${this.apiUrl}/api/sync/audit`, { logs }, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
}

export const cloudSync = new CloudSyncService();
