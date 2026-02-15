import api from '@/lib/api';
import { differenceInDays } from 'date-fns';

export interface DashboardStats {
    summary: {
        totalSales: number;
        totalOrders: number;
        averageOrderValue: number;
        range?: { start: string; end: string };
    };
    salesTrend: {
        label: string;
        sales: number;
        orders: number;
        original?: any; // To store hour or full date if needed
    }[];
    paymentAudit: {
        CASH: any[];
        UPI: any[];
        CARD: any[];
    };
    topProducts: any[];
    lowStock: any[];
}

export const dashboardService = {
    getStats: async (startDate?: Date, endDate?: Date): Promise<DashboardStats> => {
        const startStr = startDate ? startDate.toISOString() : undefined;
        const endStr = endDate ? endDate.toISOString() : undefined;

        const isSingleDay = startDate && endDate && differenceInDays(endDate, startDate) < 1;

        // Determine which chart endpoint to use
        const chartEndpoint = isSingleDay ? '/sales/hourly' : '/sales/daily';
        const chartParams = isSingleDay
            ? { date: startStr }
            : { startDate: startStr, endDate: endStr };

        const [summary, trend, audit, top, stock] = await Promise.all([
            api.get('/sales/summary', { params: { startDate: startStr, endDate: endStr } }),
            api.get(chartEndpoint, { params: chartParams }),
            api.get('/sales/audit-payment-modes'), // This might need date filtering too? Assuming generic for now or updated later
            api.get('/reports/top-products?limit=5'),
            api.get('/inventory/low-stock?threshold=5')
        ]);

        // Standardize Trend Data
        let salesTrend = [];
        if (isSingleDay) {
            salesTrend = trend.data.map((item: any) => ({
                label: `${item.hour}:00`,
                sales: item.sales,
                orders: item.orders,
                original: item.hour
            }));
        } else {
            salesTrend = trend.data.map((item: any) => ({
                label: new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
                sales: item.sales,
                orders: item.orders,
                original: item.date
            }));
        }

        return {
            summary: summary.data,
            salesTrend,
            paymentAudit: audit.data,
            topProducts: top.data,
            lowStock: stock.data
        };
    }
};
