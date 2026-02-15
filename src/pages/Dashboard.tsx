import React, { useEffect, useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingBag,
    AlertTriangle,
    Package,
    Calendar,
    Cloud,
    RefreshCw
} from 'lucide-react';
import { reportsService } from '../services/reports.service';
import { db } from '../lib/db';
import { Loading } from '../components/ui/Loading';
import { formatIndianCurrency, calculatePercentageChange } from '../lib/format';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { startOfMonth, endOfMonth, eachDayOfInterval, format as formatDate } from 'date-fns';

type FilterPeriod = 'today' | 'week' | 'month' | 'year' | 'all';

export const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [todayStats, setTodayStats] = useState<any>(null);
    const [yesterdayStats, setYesterdayStats] = useState<any>(null);
    const [allTimeStats, setAllTimeStats] = useState<any>(null);
    const [lowStockItems, setLowStockItems] = useState<any[]>([]);
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('today');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        loadDashboardData();
    }, [selectedDate]);

    useEffect(() => {
        loadChartData();
    }, [filterPeriod, selectedYear, selectedDate]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const targetDate = new Date(selectedDate);
            const [dailyReport, yesterdayReport, lowStock, topSelling] = await Promise.all([
                reportsService.getDailySalesReport(targetDate),
                reportsService.getYesterdaySalesReport(),
                reportsService.getLowStockItems(),
                reportsService.getTopSellingProducts(5),
            ]);

            setTodayStats(dailyReport);
            setYesterdayStats(yesterdayReport);
            setLowStockItems(lowStock);
            setTopProducts(topSelling);

            // Get all-time stats (Optimized)
            const [salesAgg, itemsAgg] = await Promise.all([
                db.sales.aggregate({
                    where: { status: 'COMPLETED' },
                    _sum: { grandTotal: true },
                    _count: { id: true }
                }),
                db.saleItems.aggregate({
                    where: { sale: { status: 'COMPLETED' } },
                    _sum: { quantity: true }
                })
            ]);

            setAllTimeStats({
                totalRevenue: salesAgg._sum.grandTotal || 0,
                totalItems: itemsAgg._sum.quantity || 0,
                totalSales: salesAgg._count.id || 0,
            });
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadChartData = async () => {
        try {
            if (filterPeriod === 'today') {
                // Show hourly breakdown for the selected date
                const targetDate = new Date(selectedDate);
                const todayReport = await reportsService.getDailySalesReport(targetDate);
                const hours = Array.from({ length: 24 }, (_, i) => i);

                const hourlyData = hours.map(hour => {
                    const hourSales = (todayReport?.sales || []).filter((sale: any) => {
                        const saleHour = new Date(sale.createdAt).getHours();
                        return saleHour === hour;
                    });

                    return {
                        date: `${hour}:00`,
                        sales: hourSales.reduce((sum: number, sale: any) => sum + (sale.grandTotal || 0), 0),
                        bills: hourSales.length,
                    };
                });

                setChartData(hourlyData);
            } else if (filterPeriod === 'week') {
                // Show last 7 days
                const days = Array.from({ length: 7 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (6 - i));
                    return date;
                });

                const weekData = await Promise.all(
                    days.map(async (day) => {
                        const report = await reportsService.getDailySalesReport(day);
                        return {
                            date: formatDate(day, 'EEE dd'),
                            sales: report.totalSales,
                            bills: report.numberOfBills,
                        };
                    })
                );

                setChartData(weekData);
            } else if (filterPeriod === 'month') {
                const monthlyReport = await reportsService.getMonthlySalesReport();
                const days = eachDayOfInterval({
                    start: startOfMonth(new Date()),
                    end: endOfMonth(new Date()),
                });

                const data = days.map(day => {
                    const dayNum = day.getDate();
                    const dayData = monthlyReport.dailyBreakdown[dayNum] || { sales: 0, count: 0 };
                    return {
                        date: formatDate(day, 'dd MMM'),
                        sales: dayData.sales,
                        bills: dayData.count,
                    };
                });

                setChartData(data);
            } else if (filterPeriod === 'year') {
                // Show monthly breakdown for specific year
                const months = Array.from({ length: 12 }, (_, i) => {
                    const date = new Date(selectedYear, i, 1);
                    return date;
                });

                const yearData = await Promise.all(
                    months.map(async (month) => {
                        const report = await reportsService.getMonthlySalesReport(month);
                        return {
                            date: formatDate(month, 'MMM'),
                            sales: report.totalSales,
                            bills: report.numberOfBills,
                        };
                    })
                );

                setChartData(yearData);
            } else if (filterPeriod === 'all') {
                // Show all-time data grouped by month
                const allSales = await db.sales.findMany({
                    where: { status: 'COMPLETED' },
                    select: {
                        createdAt: true,
                        grandTotal: true,
                    },
                    orderBy: {
                        createdAt: 'asc',
                    },
                });

                // Group by month-year
                const monthlyMap = new Map<string, { sales: number; count: number }>();

                allSales.forEach((sale: any) => {
                    const date = new Date(sale.createdAt);
                    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                    const existing = monthlyMap.get(key) || { sales: 0, count: 0 };
                    existing.sales += sale.grandTotal;
                    existing.count += 1;
                    monthlyMap.set(key, existing);
                });

                const allTimeData = Array.from(monthlyMap.entries())
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([key, data]) => {
                        const [year, month] = key.split('-');
                        const date = new Date(parseInt(year), parseInt(month) - 1);
                        return {
                            date: formatDate(date, 'MMM yyyy'),
                            sales: data.sales,
                            bills: data.count,
                        };
                    });

                setChartData(allTimeData);
            }
        } catch (error) {
            console.error('Failed to load chart data:', error);
        }
    };

    const handleSync = async () => {
        try {
            setSyncing(true);
            const result = await db.syncNow();
            if (result.success) {
                alert('🚀 Data synced with cloud successfully!');
            } else {
                alert('❌ Sync failed: ' + result.error);
            }
        } catch (error) {
            console.error('Manual sync failed:', error);
            alert('❌ Sync error: ' + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
            setSyncing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loading size="lg" text="Loading dashboard..." />
            </div>
        );
    }

    // Calculate comparisons
    const salesChange = calculatePercentageChange(
        todayStats?.totalSales || 0,
        yesterdayStats?.totalSales || 0
    );
    const billsChange = calculatePercentageChange(
        todayStats?.numberOfBills || 0,
        yesterdayStats?.numberOfBills || 0
    );
    const taxChange = calculatePercentageChange(
        todayStats?.totalTax || 0,
        yesterdayStats?.totalTax || 0
    );

    const stats = [
        {
            label: "Today's Sales",
            value: formatIndianCurrency(todayStats?.totalSales || 0),
            icon: DollarSign,
            color: 'bg-green-500',
            change: salesChange,
        },
        {
            label: 'All-Time Revenue',
            value: formatIndianCurrency(allTimeStats?.totalRevenue || 0),
            icon: TrendingUp,
            color: 'bg-indigo-500',
            subtext: `${allTimeStats?.totalSales || 0} invoices`,
        },
        {
            label: 'Total Bills (Today)',
            value: todayStats?.numberOfBills || 0,
            icon: ShoppingBag,
            color: 'bg-blue-500',
            change: billsChange,
        },
        {
            label: 'Tax Collected (Today)',
            value: formatIndianCurrency(todayStats?.totalTax || 0),
            icon: Package,
            color: 'bg-purple-500',
            change: taxChange,
        },
        {
            label: 'Low Stock Items',
            value: lowStockItems.length,
            icon: AlertTriangle,
            color: 'bg-orange-500',
            alert: lowStockItems.length > 0,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="card gradient-primary text-white flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Welcome to Zain POS</h1>
                    <p className="text-white/90">
                        Here's what's happening with your store today.
                    </p>
                </div>
                <button
                    onClick={handleSync}
                    disabled={syncing}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/30 transition-all active:scale-95 disabled:opacity-50"
                >
                    {syncing ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                        <Cloud className="w-5 h-5" />
                    )}
                    <span className="font-semibold">{syncing ? 'Syncing...' : 'Sync Cloud'}</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="stat-card">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="stat-label truncate">{stat.label}</p>
                                    <p className="stat-value mt-2 truncate text-xl lg:text-2xl" title={String(stat.value)}>{stat.value}</p>
                                    {stat.change && (
                                        <div className="flex items-center gap-1 mt-1">
                                            {stat.change.isIncrease ? (
                                                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                                            )}
                                            <p className={`text-sm ${stat.change.isIncrease ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {stat.change.display} from yesterday
                                            </p>
                                        </div>
                                    )}
                                    {stat.subtext && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {stat.subtext}
                                        </p>
                                    )}
                                    {stat.alert && (
                                        <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                                            Needs attention
                                        </p>
                                    )}
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Sales Chart */}
            <div className="card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Sales Overview
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterPeriod('today')}
                            className={`px-3 py-1 text-sm rounded transition-colors ${filterPeriod === 'today' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setFilterPeriod('week')}
                            className={`px-3 py-1 text-sm rounded transition-colors ${filterPeriod === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => setFilterPeriod('month')}
                            className={`px-3 py-1 text-sm rounded transition-colors ${filterPeriod === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                        >
                            Month
                        </button>
                        <button
                            onClick={() => setFilterPeriod('year')}
                            className={`px-3 py-1 text-sm rounded transition-colors ${filterPeriod === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                        >
                            Year
                        </button>

                        {filterPeriod === 'year' && (
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                className="px-2 py-1 text-sm rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        )}

                        <button
                            onClick={() => setFilterPeriod('all')}
                            className={`px-3 py-1 text-sm rounded transition-colors ${filterPeriod === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                        >
                            All Time
                        </button>

                        <div className="flex items-center gap-2 border-l pl-2 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-2 border border-gray-200 dark:border-gray-600 focus-within:ring-1 focus-within:ring-blue-500">
                            <Calendar
                                className="w-4 h-4 text-gray-400 cursor-pointer"
                                onClick={() => {
                                    const input = document.getElementById('dashboard-date-picker') as HTMLInputElement;
                                    if (input) input.showPicker();
                                }}
                            />
                            <input
                                id="dashboard-date-picker"
                                type="date"
                                value={selectedDate}
                                onChange={(e) => {
                                    setSelectedDate(e.target.value);
                                    setFilterPeriod('today');
                                }}
                                className="bg-transparent border-none text-sm focus:ring-0 outline-none p-1 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            formatter={(value: any, name: string) => {
                                if (name === 'sales') return [formatIndianCurrency(value), 'Revenue'];
                                if (name === 'bills') return [value, 'Bills'];
                                return [value, name];
                            }}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                            }}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            formatter={(value) => {
                                if (value === 'sales') return 'Revenue (₹)';
                                if (value === 'bills') return 'Number of Bills';
                                return value;
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            name="sales"
                        />
                        <Line
                            type="monotone"
                            dataKey="bills"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            name="bills"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Charts and Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Selling Products */}
                <div className="card">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Top Selling Products
                    </h3>
                    {topProducts.length > 0 ? (
                        <div className="space-y-3">
                            {topProducts.map((product, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium">{product.productName}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {product.totalQuantity} units sold
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-green-600 dark:text-green-400">
                                            {formatIndianCurrency(product.totalRevenue)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No sales data yet</p>
                    )}
                </div>

                {/* Low Stock Alerts */}
                <div className="card">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        Low Stock Alerts
                    </h3>
                    {lowStockItems.length > 0 ? (
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {lowStockItems.map((item: any, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium">{item.product.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {item.size && `Size: ${item.size}`}
                                            {item.color && ` | Color: ${item.color}`}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-orange-600 dark:text-orange-400">
                                            {item.stock} left
                                        </p>
                                        <p className="text-xs text-gray-500">Min: {item.minStock}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">
                            All products are well stocked
                        </p>
                    )}
                </div>
            </div>

            {/* Separated Transaction Audit by Payment Mode */}
            {todayStats?.sales && (
                <div className="space-y-6 mt-8">
                    <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Audit by Payment Mode</h3>
                        <div className="text-sm font-bold text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full border border-primary-200">
                            Date: {formatDate(new Date(selectedDate), 'dd MMM yyyy')}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {['CASH', 'UPI', 'CARD'].map((mode) => {
                            const modeSales = todayStats.sales.filter((s: any) => s.paymentMethod === mode);
                            const modeTotal = modeSales.reduce((sum: number, s: any) => sum + s.grandTotal, 0);

                            return (
                                <div key={mode} className="flex flex-col h-full overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card shadow-sm">
                                    <div className={`p-4 flex justify-between items-center ${mode === 'CASH' ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700' :
                                        mode === 'UPI' ? 'bg-sky-50 dark:bg-sky-900/10 text-sky-700' :
                                            'bg-violet-50 dark:bg-violet-900/10 text-violet-700'
                                        }`}>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${mode === 'CASH' ? 'bg-emerald-500' :
                                                mode === 'UPI' ? 'bg-sky-500' :
                                                    'bg-violet-500'
                                                }`} />
                                            <span className="font-black text-xs uppercase tracking-widest">{mode} TRANSACTIONS</span>
                                        </div>
                                        <span className="font-black text-lg">{formatIndianCurrency(modeTotal)}</span>
                                    </div>

                                    <div className="flex-1 overflow-y-auto max-h-[400px]">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50/50 dark:bg-gray-800/50 sticky top-0 backdrop-blur-sm">
                                                <tr className="text-[10px] font-bold text-gray-400 uppercase">
                                                    <th className="px-4 py-3">Bill</th>
                                                    <th className="px-4 py-3">Time</th>
                                                    <th className="px-4 py-3 text-right">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                                {modeSales.length > 0 ? (
                                                    modeSales.map((sale: any) => (
                                                        <tr key={sale.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                                            <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">#{sale.billNo}</td>
                                                            <td className="px-4 py-3 text-xs text-gray-500 text-nowrap">{formatDate(new Date(sale.createdAt), 'hh:mm a')}</td>
                                                            <td className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">{formatIndianCurrency(sale.grandTotal)}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={3} className="px-4 py-12 text-center text-xs text-gray-400 italic">No {mode} sales</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="p-3 bg-gray-50/50 dark:bg-gray-800/50 text-[10px] font-bold text-gray-400 text-center uppercase border-t border-gray-100 dark:border-gray-800">
                                        Count: {modeSales.length} Invoices
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
