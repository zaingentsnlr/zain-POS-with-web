import { useState, useEffect } from 'react';
import { dashboardService, type DashboardStats } from '../services/dashboard.service';
import { useSocket } from '@/hooks/useSocket';
import { socket } from '@/lib/socket';
import { toast } from 'react-hot-toast';

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Connect to socket via hook
    const { isConnected } = useSocket('main');

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
    }, []);

    // Listen for realtime updates
    useEffect(() => {
        if (!isConnected) return;

        function onSaleEvent(data: any) {
            console.log('Stats: Realtime update received', data);
            fetchStats(); // Refetch stats

            // Show toast only for single sales, not batch unless we want to
            if (data.billNo) {
                toast.success(`New Sale! ₹${data.grandTotal}`, {
                    id: 'new-sale',
                    duration: 3000,
                    icon: '💰'
                });
            } else if (data.count) {
                toast.success(`Synced ${data.count} new sales`, {
                    id: 'sync-batch',
                    icon: '🔄'
                });
            }
        }

        socket.on('new-sale', onSaleEvent);
        socket.on('sale:batch', onSaleEvent);

        return () => {
            socket.off('new-sale', onSaleEvent);
            socket.off('sale:batch', onSaleEvent);
        };
    }, [isConnected]);

    return { stats, loading, error, refetch: fetchStats };
}
