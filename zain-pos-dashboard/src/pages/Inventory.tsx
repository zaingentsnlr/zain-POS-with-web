import { MobileInventoryCard } from '@/components/shared/MobileInventoryCard';

// ... 

{/* Product Table (Desktop) */ }
<div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden hidden md:block">
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
            {/* ... table headers ... */}
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
                                {product.category.name}
                            </td>
                            <td className="px-6 py-4 text-right font-medium">
                                ₹{product.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {product.stock}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <StockHealthBadge status="IN_STOCK" /> {/* Simplified for example */}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                            No products found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
</div>

{/* Mobile Grid View */ }
<div className="md:hidden space-y-4">
    <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>

    {loading ? (
        <div className="text-center py-8 text-gray-500">Loading products...</div>
    ) : filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
            <MobileInventoryCard key={product.id} product={product} />
        ))
    ) : (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-gray-100 dark:bg-gray-900/50 dark:border-gray-800">
            No products found.
        </div>
    )}
</div>
    </div >
    );
}
