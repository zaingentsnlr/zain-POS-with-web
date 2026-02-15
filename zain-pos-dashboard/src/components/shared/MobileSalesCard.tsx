import { format } from 'date-fns';
import { User, Package, Calendar } from 'lucide-react';

interface MobileSalesCardProps {
    sale: any;
}

export function MobileSalesCard({ sale }: MobileSalesCardProps) {
    return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <span className="font-mono text-xs text-gray-500">#{sale.billNo}</span>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mt-1">
                        {sale.customerName || 'Walk-in Customer'}
                    </h3>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${sale.status === 'COMPLETED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800'
                    }`}>
                    {sale.status}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(sale.createdAt), 'dd MMM, hh:mm a')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 justify-end">
                    <Package className="w-4 h-4" />
                    <span>{sale.items?.length || 0} Items</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="w-3 h-3" />
                    <span>{sale.user?.name || 'Unknown'}</span>
                </div>
                <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    ₹{sale.grandTotal.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
