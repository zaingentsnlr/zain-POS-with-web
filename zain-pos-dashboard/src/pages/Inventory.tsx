import { useEffect, useState } from 'react';
import { Package, AlertTriangle, Search, Filter } from 'lucide-react';
import api from '../lib/api';

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: {
        name: string;
    };
}

export default function Inventory() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/inventory/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const lowStockCount = products.filter(p => p.stock <= 10).length;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20 lg:pb-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {products.length} Products • {lowStockCount} Low Stock
                    </p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input pl-10"
                    />
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th className="text-center">Stock</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                                    </td>
                                    <td>
                                        <span className="badge badge-info bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                            {product.category.name}
                                        </span>
                                    </td>
                                    <td className="font-semibold">₹{product.price}</td>
                                    <td className="text-center">
                                        <div className={`font-bold ${product.stock <= 10 ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                                            {product.stock}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        {product.stock <= 0 ? (
                                            <span className="badge badge-danger">Out of Stock</span>
                                        ) : product.stock <= 10 ? (
                                            <span className="badge badge-warning">Low Stock</span>
                                        ) : (
                                            <span className="badge badge-success">In Stock</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-gray-500">
                                        No products found
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
