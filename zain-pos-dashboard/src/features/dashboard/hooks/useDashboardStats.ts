import { useState, useEffect } from 'react';
import { dashboardService, type DashboardStats } from '../services/dashboard.service';
import { socket } from '@/lib/socket';
import { toast } from 'react-hot-toast';

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        try {
            const data = await dashboardService.getStats();
            setStats(data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch dashboard stats', err);
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();

        function onSaleCreated(data: any) {
            // Optimistic update or refetch
            // For accurate data, refetching is safer for totals
            fetchStats();
            toast.success(`New Sale! ₹${data.grandTotal}`, {
                id: 'new-sale',
                duration: 3000,
                icon: '💰'
            });
        }

        socket.on('sale:created', onSaleCreated);
        return () => {
            socket.off('sale:created', onSaleCreated);
        };
    }, []);

    return { stats, loading, error, refetch: fetchStats };
}
