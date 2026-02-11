import { useEffect, useState } from 'react';
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();

        // Real-time update
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
            const [summaryRes, hourlyRes] = await Promise.all([
                api.get('/sales/summary'),
                api.get('/sales/hourly'),
            ]);

            setSummary(summaryRes.data);
            setHourlySales(hourlyRes.data);
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
                    title="Customers"
                    value="--"
                    icon={Users}
                    color="orange"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hourly Sales Chart */}
                <div className="card">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Hourly Sales</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={hourlySales}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="hour"
                                tickFormatter={(hour) => `${hour}:00`}
                            />
                            <YAxis />
                            <Tooltip
                                formatter={(value: number) => [`₹${value}`, 'Sales']}
                                labelFormatter={(hour) => `${hour}:00`}
                            />
                            <Line
                                type="monotone"
                                dataKey="sales"
                                stroke="#0ea5e9"
                                strokeWidth={2}
                                dot={{ fill: '#0ea5e9' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Orders Chart */}
                <div className="card">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Orders by Hour</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={hourlySales}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="hour"
                                tickFormatter={(hour) => `${hour}:00`}
                            />
                            <YAxis />
                            <Tooltip
                                formatter={(value: number) => [value, 'Orders']}
                                labelFormatter={(hour) => `${hour}:00`}
                            />
                            <Bar dataKey="orders" fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{summary?.totalOrders || 0}</p>
                        <p className="text-sm text-gray-600 mt-1">Total Orders</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">
                            ₹{summary?.totalSales.toLocaleString() || 0}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Revenue</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">
                            ₹{summary?.averageOrderValue.toFixed(0) || 0}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Avg Value</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">
                            {hourlySales.filter(h => h.orders > 0).length}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Active Hours</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
