import {
    DollarSign,
    ShoppingCart,
    TrendingUp,
    AlertTriangle,
    Package
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';
import { StatCard } from '@/components/shared/StatCard';
import { ChartWidget } from '@/components/shared/ChartWidget';
import { useDashboardStats } from '@/features/dashboard/hooks/useDashboardStats';
import { useSmartAlerts } from '@/hooks/useSmartAlerts';
import { AlertBanner } from '@/components/shared/AlertBanner';
import { cn } from '@/lib/utils';

export default function Dashboard() {
    const { stats, loading } = useDashboardStats();
    const { alerts } = useSmartAlerts();

    // Safe accessors with defaults
    const summary = stats?.summary || { totalSales: 0, totalOrders: 0, averageOrderValue: 0 };
    const hourlySales = stats?.hourlySales || [];
    const topProducts = stats?.topProducts || [];
    const paymentAudit = stats?.paymentAudit || { CASH: [], UPI: [], CARD: [] };
    const lowStockCount = stats?.lowStock?.length || 0;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Welcome back! Here's what's happening today.
                </p>
            </div>

            <AlertBanner alerts={alerts} />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Today's Sales"
                    value={`₹${summary.totalSales.toLocaleString()}`}
                    icon={<DollarSign className="w-6 h-6" />}
                    loading={loading}
                    className="border-l-4 border-l-green-500"
                />
                <StatCard
                    title="Orders"
                    value={summary.totalOrders}
                    icon={<ShoppingCart className="w-6 h-6" />}
                    loading={loading}
                    className="border-l-4 border-l-blue-500"
                />
                <StatCard
                    title="Avg Order Value"
                    value={`₹${summary.averageOrderValue.toFixed(0)}`}
                    icon={<TrendingUp className="w-6 h-6" />}
                    loading={loading}
                    className="border-l-4 border-l-purple-500"
                />
                <StatCard
                    title="Low Stock"
                    value={lowStockCount}
                    icon={<AlertTriangle className="w-6 h-6" />}
                    loading={loading}
                    className="border-l-4 border-l-orange-500"
                />
            </div>

            {/* Charts & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartWidget title="Hourly Sales" loading={loading}>
                    <LineChart data={hourlySales}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis
                            dataKey="hour"
                            tickFormatter={(hour) => `${hour}:00`}
                            stroke="#888888"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickFormatter={(value) => `₹${value}`}
                        />
                        <Tooltip
                            formatter={(value: number) => [`₹${value}`, 'Sales']}
                            labelFormatter={(hour) => `${hour}:00`}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#0ea5e9"
                            strokeWidth={3}
                            dot={{ fill: '#0ea5e9', strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ChartWidget>

                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col h-[380px]">
                    <div className="p-6 pb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Top Selling Products</h3>
                    </div>
                    <div className="p-6 pt-2 overflow-y-auto flex-1 space-y-4">
                        {loading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />)
                        ) : topProducts.length > 0 ? (
                            topProducts.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white dark:bg-gray-700 p-2 rounded shadow-sm text-primary-600 dark:text-primary-400">
                                            <Package size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{item.product.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.totalQuantity} units sold</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">₹{item.totalRevenue.toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <Package size={48} className="mb-2 opacity-20" />
                                <p>No sales data yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Audit */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Audit by Payment Mode</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['CASH', 'UPI', 'CARD'].map((mode) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const transactions = (paymentAudit as any)[mode] || [];
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const total = transactions.reduce((sum: number, t: any) => sum + t.grandTotal, 0);

                        return (
                            <div key={mode} className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-gray-800/20">
                                <div className={cn(
                                    "p-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-700",
                                    mode === 'CASH' ? "bg-green-50/80 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                                        mode === 'UPI' ? "bg-blue-50/80 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" :
                                            "bg-purple-50/80 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                                )}>
                                    <span className="font-bold">{mode}</span>
                                    <span className="font-bold text-lg">₹{total.toLocaleString()}</span>
                                </div>
                                <div className="max-h-60 overflow-y-auto bg-white dark:bg-gray-900/50">
                                    {transactions.length > 0 ? (
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 text-gray-500 dark:text-gray-400">
                                                <tr>
                                                    <th className="px-4 py-2 font-medium">Bill</th>
                                                    <th className="px-4 py-2 text-right font-medium">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                {transactions.map((t: any) => (
                                                    <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                        <td className="px-4 py-2 font-mono text-gray-600 dark:text-gray-300">#{t.billNo}</td>
                                                        <td className="px-4 py-2 text-right font-medium text-gray-900 dark:text-gray-100">₹{t.grandTotal}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500 text-sm">
                                            <p>No transactions</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
