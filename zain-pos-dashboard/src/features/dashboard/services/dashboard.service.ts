import api from '@/lib/api';

export interface DashboardStats {
    summary: {
        totalSales: number;
        totalOrders: number;
        averageOrderValue: number;
    };
    hourlySales: {
        hour: number;
        sales: number;
        orders: number;
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
    getStats: async (): Promise<DashboardStats> => {
        const [summary, hourly, audit, top, stock] = await Promise.all([
            api.get('/sales/summary'),
            api.get('/sales/hourly'),
            api.get('/sales/audit-payment-modes'),
            api.get('/reports/top-products?limit=5'),
            api.get('/inventory/low-stock?threshold=5')
        ]);

        return {
            summary: summary.data,
            hourlySales: hourly.data,
            paymentAudit: audit.data,
            topProducts: top.data,
            lowStock: stock.data
        };
    }
};
