import { Package, AlertTriangle, CheckCircle } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    stock: number;
    price: number;
    category: { name: string };
    minStock: number;
}

interface MobileInventoryCardProps {
    product: Product;
}

export function MobileInventoryCard({ product }: MobileInventoryCardProps) {
    const isLowStock = product.stock <= product.minStock;

    return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {product.name}
                    </h3>
                    <p className="text-xs text-gray-500">{product.category.name}</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${isLowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                    {isLowStock ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                    <span>{isLowStock ? 'Low Stock' : 'In Stock'}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">{product.stock} Units</span>
                </div>
                <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    ₹{product.price.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
