import axios from 'axios';

class CloudSyncService {
    private apiUrl: string = '';
    private lastSyncTime: number = 0;

    setApiUrl(url: string) {
        this.apiUrl = url;
    }

    async syncSales(sales: any[]) {
        if (!this.apiUrl) return;
        try {
            console.log(`Syncing ${sales.length} sales to cloud...`);
            await axios.post(`${this.apiUrl}/api/sync/sales`, { sales }, {
                headers: { 'Content-Type': 'application/json' }
            });
            this.lastSyncTime = Date.now();
            return { success: true };
        } catch (error: any) {
            console.error('Cloud sync failed:', error.message);
            return { success: false, error: error.message };
        }
    }

    async syncInventory(products: any[]) {
        if (!this.apiUrl) return;
        try {
            console.log(`Syncing ${products.length} products to cloud...`);
            await axios.post(`${this.apiUrl}/api/sync/inventory`, { products }, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { success: true };
        } catch (error: any) {
            console.error('Inventory sync failed:', error.message);
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
            console.log(`Syncing ${logs.length} audit logs to cloud...`);
            await axios.post(`${this.apiUrl}/api/sync/audit`, { logs }, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { success: true };
        } catch (error: any) {
            console.error('Audit Log sync failed:', error.message);
            return { success: false, error: error.message };
        }
    }
}

export const cloudSync = new CloudSyncService();
