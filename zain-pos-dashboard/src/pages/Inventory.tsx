import { Package, AlertTriangle, TrendingDown, DollarSign, Search } from 'lucide-react';
import { useInventoryMetrics } from '@/features/inventory/hooks/useInventoryMetrics';
import { StockHealthBadge } from '@/features/inventory/components/StockHealthBadge';
import { StatCard } from '@/components/shared/StatCard';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Product } from '@/features/inventory/services/inventory.service';

export default function Inventory() {
    const { products, metrics, loading } = useInventoryMetrics();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.barcode?.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Inventory Intelligence</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage stock, track value, and prevent stockouts.</p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Inventory Value"
                    value={`₹${metrics.totalValue.toLocaleString()}`}
                    icon={<DollarSign className="w-5 h-5" />}
                    loading={loading}
                    className="border-t-4 border-t-green-500"
                />
                <StatCard
                    title="Low Stock Items"
                    value={metrics.lowStockCount}
                    icon={<AlertTriangle className="w-5 h-5" />}
                    loading={loading}
                    className="border-t-4 border-t-yellow-500"
                />
                <StatCard
                    title="Out of Stock"
                    value={metrics.outOfStockCount}
                    icon={<TrendingDown className="w-5 h-5" />}
                    loading={loading}
                    className="border-t-4 border-t-red-500"
                />
                <StatCard
                    title="Total Products"
                    value={metrics.totalItems}
                    icon={<Package className="w-5 h-5" />}
                    loading={loading}
                    className="border-t-4 border-t-blue-500"
                />
            </div>

            {/* Product Table */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
                    <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Stock Report</h2>
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or barcode..."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Product Name</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3 text-right">Price</th>
                                <th className="px-6 py-3 text-center">Stock</th>
                                <th className="px-6 py-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {loading ? (
                                [1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto"></div></td>
                                        <td className="px-6 py-4"><div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 mx-auto"></div></td>
                                    </tr>
                                ))
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {product.name}
                                            <div className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">{product.barcode || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            {product.category?.name || 'Uncategorized'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            ₹{product.price.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-center font-medium">
                                            {product.stock}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <StockHealthBadge stock={product.stock} minStock={product.minStock} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No products found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
