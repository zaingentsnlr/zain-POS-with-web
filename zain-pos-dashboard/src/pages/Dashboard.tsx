import { useEffect, useState } from 'react';
import { DollarSign, ShoppingCart, TrendingUp, AlertTriangle, Package } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../lib/api';
import StatCard from '../components/StatCard';
import { socket } from '../lib/socket';

interface SalesSummary {
    totalSales: number;
    totalOrders: number;
    averageOrderValue: number;
}

interface HourlySales {
    hour: number;
    sales: number;
    orders: number;
}

export default function Dashboard() {
    const [summary, setSummary] = useState<SalesSummary | null>(null);
    const [hourlySales, setHourlySales] = useState<HourlySales[]>([]);
    const [paymentAudit, setPaymentAudit] = useState<any>({ CASH: [], UPI: [], CARD: [] });
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [lowStock, setLowStock] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();

        function onSaleCreated() {
            fetchData();
        }

        socket.on('sale:created', onSaleCreated);
        return () => {
            socket.off('sale:created', onSaleCreated);
        };
    }, []);

    const fetchData = async () => {
        try {
            const [summaryRes, hourlyRes, auditRes, topRes, stockRes] = await Promise.all([
                api.get('/sales/summary'),
                api.get('/sales/hourly'),
                api.get('/sales/audit-payment-modes'),
                api.get('/reports/top-products?limit=5'),
                api.get('/inventory/low-stock?threshold=5')
            ]);

            setSummary(summaryRes.data);
            setHourlySales(hourlyRes.data);
            setPaymentAudit(auditRes.data);
            setTopProducts(topRes.data);
            setLowStock(stockRes.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20 lg:pb-6">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Today's Sales"
                    value={`₹${summary?.totalSales.toLocaleString() || 0}`}
                    icon={DollarSign}
                    color="green"
                />
                <StatCard
                    title="Orders"
                    value={summary?.totalOrders || 0}
                    icon={ShoppingCart}
                    color="blue"
                />
                <StatCard
                    title="Avg Order Value"
                    value={`₹${summary?.averageOrderValue.toFixed(0) || 0}`}
                    icon={TrendingUp}
                    color="purple"
                />
                <StatCard
                    title="Low Stock Items"
                    value={lowStock.length}
                    icon={AlertTriangle}
                    color="orange"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Hourly Sales</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={hourlySales}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hour" tickFormatter={(hour) => `${hour}:00`} />
                            <YAxis />
                            <Tooltip formatter={(value: number) => [`₹${value}`, 'Sales']} labelFormatter={(hour) => `${hour}:00`} />
                            <Line type="monotone" dataKey="sales" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="card">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h2>
                    <div className="space-y-4">
                        {topProducts.length > 0 ? (
                            topProducts.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white p-2 rounded shadow-sm">
                                            <Package size={20} className="text-primary-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{item.product.name}</p>
                                            <p className="text-xs text-gray-500">{item.totalQuantity} units sold</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-gray-900">₹{item.totalRevenue.toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">No sales data yet</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Audit */}
            <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Audit by Payment Mode</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['CASH', 'UPI', 'CARD'].map((mode) => {
                        const transactions = paymentAudit[mode] || [];
                        const total = transactions.reduce((sum: number, t: any) => sum + t.grandTotal, 0);

                        return (
                            <div key={mode} className="border rounded-xl overflow-hidden">
                                <div className={`p-4 flex justify-between items-center ${mode === 'CASH' ? 'bg-green-50 text-green-700' :
                                    mode === 'UPI' ? 'bg-blue-50 text-blue-700' :
                                        'bg-purple-50 text-purple-700'
                                    }`}>
                                    <span className="font-bold">{mode}</span>
                                    <span className="font-bold text-lg">₹{total.toLocaleString()}</span>
                                </div>
                                <div className="max-h-60 overflow-y-auto bg-white">
                                    {transactions.length > 0 ? (
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-gray-50 sticky top-0">
                                                <tr>
                                                    <th className="px-4 py-2">Bill</th>
                                                    <th className="px-4 py-2 text-right">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {transactions.map((t: any) => (
                                                    <tr key={t.id}>
                                                        <td className="px-4 py-2 font-mono">#{t.billNo}</td>
                                                        <td className="px-4 py-2 text-right font-medium">₹{t.grandTotal}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-center py-4 text-gray-400 text-sm">No transactions</p>
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
