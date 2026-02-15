import { format } from 'date-fns';
import { User, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import type { Invoice } from '@/features/invoices/services/invoice.service';

interface MobileInvoiceCardProps {
    invoice: Invoice;
    onView: (invoice: Invoice) => void;
}

export function MobileInvoiceCard({ invoice, onView }: MobileInvoiceCardProps) {
    return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <span className="font-mono text-xs text-gray-500">#{invoice.billNo}</span>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mt-1">
                        {invoice.customer.name}
                    </h3>
                    <p className="text-xs text-gray-500">{invoice.customer.phone}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onView(invoice)} className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4 text-gray-500" />
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(invoice.createdAt), 'dd MMM, hh:mm a')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 justify-end">
                    <FileText className="w-4 h-4" />
                    <span>{invoice.items.length} Items</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="w-3 h-3" />
                    <span>Customer</span>
                </div>
                <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    ₹{invoice.total.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
