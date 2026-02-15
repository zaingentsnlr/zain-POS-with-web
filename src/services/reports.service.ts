import { db } from '../lib/db';
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';

export const reportsService = {
    // Get daily sales report
    async getDailySalesReport(date: Date = new Date()) {
        const start = startOfDay(date);
        const end = endOfDay(date);

        const sales = await db.sales.findMany({
            where: {
                status: 'COMPLETED',
                createdAt: {
                    gte: start.toISOString(),
                    lte: end.toISOString(),
                },
            },
            include: {
                items: true,
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const totalSales = sales.reduce((sum: number, sale: any) => sum + sale.grandTotal, 0);
        const totalTax = sales.reduce((sum: number, sale: any) => sum + sale.taxAmount, 0);
        const totalDiscount = sales.reduce((sum: number, sale: any) => sum + sale.discount, 0);

        const paymentBreakdown = sales.reduce((acc: any, sale: any) => {
            acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + sale.grandTotal;
            return acc;
        }, {} as Record<string, number>);

        return {
            date,
            totalSales,
            totalTax,
            totalDiscount,
            numberOfBills: sales.length,
            paymentBreakdown,
            sales,
        };
    },

    // Get yesterday's sales for comparison
    async getYesterdaySalesReport() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return this.getDailySalesReport(yesterday);
    },

    // Get monthly sales report
    async getMonthlySalesReport(date: Date = new Date()) {
        const start = startOfMonth(date);
        const end = endOfMonth(date);

        const sales = await db.sales.findMany({
            where: {
                status: 'COMPLETED',
                createdAt: {
                    gte: start.toISOString(),
                    lte: end.toISOString(),
                },
            },
            include: {
                items: true,
            },
        });

        const totalSales = sales.reduce((sum: number, sale: any) => sum + sale.grandTotal, 0);
        const totalTax = sales.reduce((sum: number, sale: any) => sum + sale.taxAmount, 0);
        const totalDiscount = sales.reduce((sum: number, sale: any) => sum + sale.discount, 0);

        // Daily breakdown
        const dailyBreakdown = sales.reduce((acc: any, sale: any) => {
            const day = new Date(sale.createdAt).getDate();
            if (!acc[day]) {
                acc[day] = { sales: 0, count: 0 };
            }
            acc[day].sales += sale.grandTotal;
            acc[day].count += 1;
            return acc;
        }, {} as Record<number, { sales: number; count: number }>);

        return {
            month: date,
            totalSales,
            totalTax,
            totalDiscount,
            numberOfBills: sales.length,
            dailyBreakdown,
            sales,
        };
    },

    // Get top selling products
    async getTopSellingProducts(limit: number = 10, startDate?: Date, endDate?: Date) {
        const whereClause: any = {
            sale: { status: 'COMPLETED' }
        };

        if (startDate && endDate) {
            whereClause.createdAt = {
                gte: startDate.toISOString(),
                lte: endDate.toISOString(),
            };
        }

        const saleItems = await db.query('saleItem', 'findMany', {
            where: whereClause,
            include: {
                variant: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        // Aggregate by product
        const productMap = new Map<string, {
            productId: string;
            productName: string;
            totalQuantity: number;
            totalRevenue: number;
        }>();

        saleItems.forEach((item: any) => {
            const key = item.variant?.productId || 'UNKNOWN';
            const existing = productMap.get(key);

            if (existing) {
                existing.totalQuantity += (item.quantity || 0);
                existing.totalRevenue += (item.total || 0);
            } else {
                productMap.set(key, {
                    productId: key,
                    productName: item.productName || 'Unknown Product',
                    totalQuantity: item.quantity || 0,
                    totalRevenue: item.total || 0,
                });
            }
        });

        return Array.from(productMap.values())
            .sort((a, b) => b.totalRevenue - a.totalRevenue)
            .slice(0, limit);
    },

    // Get low stock items
    async getLowStockItems() {
        const variants = await db.productVariants.findMany({
            where: {
                isActive: true,
            },
            include: {
                product: true,
            },
        });

        return variants.filter((v: any) => v.stock <= v.minStock);
    },

    // Get inventory value
    async getInventoryValue() {
        const variants = await db.productVariants.findMany({
            where: {
                isActive: true,
            },
        });

        const totalCostValue = variants.reduce((sum: number, v: any) =>
            sum + (v.costPrice * v.stock), 0
        );

        const totalSellingValue = variants.reduce((sum: number, v: any) =>
            sum + (v.sellingPrice * v.stock), 0
        );

        return {
            totalCostValue,
            totalSellingValue,
            potentialProfit: totalSellingValue - totalCostValue,
            totalItems: variants.reduce((sum: number, v: any) => sum + v.stock, 0),
        };
    },
};
