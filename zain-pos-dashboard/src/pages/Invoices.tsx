import { useEffect, useState, useCallback } from 'react';
import { Search, Eye, Download, Calendar } from 'lucide-react';
import { invoiceService, type Invoice, type InvoiceParams } from '@/features/invoices/services/invoice.service';
import { PaginatedTable } from '@/components/shared/PaginatedTable';
import { Button } from '@/components/ui/button';
import { useDateFilter } from '@/contexts/DateFilterContext';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function Invoices() {
    // State
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    // Global Date Filter
    const { dateRange } = useDateFilter();

    // Pagination & Filters
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [exporting, setExporting] = useState(false);

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(timer);
    }, [search]);

    // Fetch Data
    const fetchInvoices = useCallback(async () => {
        try {
            setLoading(true);
            const params: InvoiceParams = {
                page,
                limit,
                search: debouncedSearch,
                startDate: dateRange.startDate?.toISOString(),
                endDate: dateRange.endDate?.toISOString()
            };

            const data = await invoiceService.getInvoices(params);

            setInvoices(data.invoices);
            setTotalPages(data.pagination.pages);
            setTotalItems(data.pagination.total);
        } catch (error) {
            console.error('Failed to load invoices', error);
            toast.error('Failed to load invoices');
        } finally {
            setLoading(false);
        }
    }, [page, limit, debouncedSearch, dateRange]);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, dateRange, limit]);

    // Handle Export
    const handleExport = async () => {
        setExporting(true);
        const toastId = toast.loading('Exporting invoices...');
        try {
            const params = {
                search: debouncedSearch,
                startDate: dateRange.startDate?.toISOString(),
                endDate: dateRange.endDate?.toISOString()
            };

            // Trigger download
            const response = await api.get('/invoices/export', {
                params,
                responseType: 'blob'
            });

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoices_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('Export completed!', { id: toastId });
        } catch (error) {
            console.error('Export failed:', error);
            toast.error('Export failed', { id: toastId });
        } finally {
            setExporting(false);
        }
    };

    // Columns Definition
    const columns = [
        {
            header: 'Invoice #',
            render: (inv: Invoice) => <span className="font-mono font-medium">#{inv.billNo}</span>
        },
        {
            header: 'Customer',
            render: (inv: Invoice) => (
                <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{inv.customer.name}</p>
                    <p className="text-xs text-gray-500">{inv.customer.phone}</p>
                </div>
            )
        },
        {
            header: 'Date',
            render: (inv: Invoice) => new Date(inv.createdAt).toLocaleDateString('en-IN', {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })
        },
        {
            header: 'Items',
            render: (inv: Invoice) => <span className="text-gray-600 dark:text-gray-400">{inv.items.length} items</span>,
            className: "text-center"
        },
        {
            header: 'Total',
            render: (inv: Invoice) => <span className="font-bold">₹{inv.total.toLocaleString()}</span>,
            className: "text-right"
        },
        {
            header: 'Action',
            render: (inv: Invoice) => (
                <div className="flex justify-center">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedInvoice(inv)}>
                        <Eye size={18} />
                    </Button>
                </div>
            ),
            className: "text-center"
        }
    ];

    return (
        <div className="space-y-6 pb-20 lg:pb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">Invoices</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        View transactions for {dateRange.label}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExport} disabled={exporting}>
                        <Download className="w-4 h-4 mr-2" />
                        {exporting ? 'Exporting...' : 'Export CSV'}
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search invoice #, customer name or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    />
                </div>

                {/* 
                   Date Filters are now handled globally in the Header.
                   We show a message or just leave empty space/other filters here.
                */}
            </div>

            {/* Paginated Table */}
            <PaginatedTable
                data={invoices}
                columns={columns}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                loading={loading}
                itemsPerPage={limit}
                onLimitChange={setLimit}
                totalItems={totalItems}
                emptyMessage="No invoices found matching your criteria."
            />

            {/* Invoice Detail Modal */}
            {selectedInvoice && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">Invoice #{selectedInvoice.billNo}</h2>
                                <button
                                    onClick={() => setSelectedInvoice(null)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Customer Details</p>
                                        <p className="text-lg font-medium">{selectedInvoice.customer.name}</p>
                                        <p className="text-gray-600 dark:text-gray-300">{selectedInvoice.customer.phone}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date</p>
                                        <p className="text-lg font-medium">
                                            {new Date(selectedInvoice.createdAt).toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                                                <th className="pb-2">Item</th>
                                                <th className="pb-2 text-right">Qty</th>
                                                <th className="pb-2 text-right">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedInvoice.items.map((item, idx) => (
                                                <tr key={idx} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                                                    <td className="py-2">{item.product.name}</td>
                                                    <td className="py-2 text-right">{item.quantity}</td>
                                                    {/* We assume price is total / qty roughly or needs item price from backend. Invoice type usually has this. */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <div className="text-right space-y-1">
                                        <div className="flex justify-between w-48 text-sm">
                                            <span className="text-gray-500">Total</span>
                                            <span className="font-bold text-lg">₹{selectedInvoice.total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setSelectedInvoice(null)}>Close</Button>
                                <Button onClick={() => window.print()}>Print Invoice</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
