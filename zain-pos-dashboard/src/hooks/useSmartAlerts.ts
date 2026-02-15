import { useState, useEffect } from 'react';
import { dashboardService } from '@/features/dashboard/services/dashboard.service';

export interface Alert {
    id: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    action?: string;
    link?: string;
}

export function useSmartAlerts() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAlerts();
        // Poll every 5 minutes
        const interval = setInterval(checkAlerts, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const checkAlerts = async () => {
        try {
            const stats = await dashboardService.getStats();
            const newAlerts: Alert[] = [];

            // Check 1: Low Stock
            if (stats.lowStock && stats.lowStock.length > 0) {
                newAlerts.push({
                    id: 'low-stock',
                    type: 'warning',
                    message: `${stats.lowStock.length} items are running low on stock.`,
                    action: 'View Inventory',
                    link: '/inventory'
                });
            }

            // Check 2: No Sales Today (if it's past 11 AM)
            const hour = new Date().getHours();
            if (hour >= 11 && stats.summary.totalOrders === 0) {
                newAlerts.push({
                    id: 'no-sales',
                    type: 'critical',
                    message: 'No sales recorded yet today. Check if POS is online.',
                    action: 'Check System',
                    link: '/activity'
                });
            }

            // Check 3: High Audit Failure (Mock logic)
            // In a real app, we'd check sync logs or error rates.

            setAlerts(newAlerts);
        } catch (error) {
            console.error('Failed to check alerts', error);
        } finally {
            setLoading(false);
        }
    };

    return { alerts, loading, refresh: checkAlerts };
}
