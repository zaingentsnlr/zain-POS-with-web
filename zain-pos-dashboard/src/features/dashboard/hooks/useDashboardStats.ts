import { useState, useEffect } from 'react';
import { dashboardService, type DashboardStats } from '../services/dashboard.service';
import { useSocket } from '@/hooks/useSocket';
import { useDateFilter } from '@/contexts/DateFilterContext';
import { socket } from '@/lib/socket';
import { toast } from 'react-hot-toast';

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get global date filter
    const { dateRange } = useDateFilter();

    // Connect to socket via hook
    const { isConnected } = useSocket('main');

    const fetchStats = async () => {
        setLoading(true);
        try {
            const data = await dashboardService.getStats(dateRange.startDate!, dateRange.endDate!);
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
        if (dateRange.startDate && dateRange.endDate) {
            fetchStats();
        }
    }, [dateRange]);

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
