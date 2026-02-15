import { useEffect, useState, useCallback } from 'react';
import { FileText, Search, Eye, Filter, Download, Calendar } from 'lucide-react';
import { invoiceService, Invoice, InvoiceParams } from '@/features/invoices/services/invoice.service';
import { PaginatedTable } from '@/components/shared/PaginatedTable';
import { Button } from '@/components/ui/button';
// import { DateRangePicker } from '@/components/ui/date-range-picker'; // Future enhancement

export default function Invoices() {
    // State
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, totalValue: 0, avgValue: 0 }); // Note: API needs to return these or we calculate from page (imperfect) or separate endpoint

    // Pagination & Filters
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

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
                startDate: startDate || undefined,
                endDate: endDate || undefined
            };

            const data = await invoiceService.getInvoices(params);

            setInvoices(data.invoices);
            setTotalPages(data.pagination.pages);
            setTotalItems(data.pagination.total);

            // Note: For accurate stats across ALL pages, we'd need a separate API endpoint
            // For now, we can show stats for the current view or fetch a summary
        } catch (error) {
            console.error('Failed to load invoices', error);
        } finally {
            setLoading(false);
        }
    }, [page, limit, debouncedSearch, startDate, endDate]);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, startDate, endDate, limit]);

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
            accessor: 'items' as keyof Invoice, // identifying for types, but render overrides
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
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and view customer billing history</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" /> Export
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

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                    {/* Basic Date Inputs for now */}
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
                        <Calendar size={16} className="ml-2 text-gray-500" />
                        <input
                            type="date"
                            className="bg-transparent border-none text-sm p-1 focus:ring-0"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="date"
                            className="bg-transparent border-none text-sm p-1 focus:ring-0"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
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

            {/* Invoice Detail Modal (Kept largely the same, just styling updates) */}
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

                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Items Purchased</p>
                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden">
                                        {selectedInvoice.items.map((item, index) => (
                                            <div key={index} className="flex justify-between p-3 border-b last:border-0 border-gray-100 dark:border-gray-700">
                                                <span className="font-medium">{item.product.name}</span>
                                                <span className="text-gray-500">x{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">Total Amount</span>
                                        <span className="text-2xl font-bold text-primary-600">
                                            ₹{selectedInvoice.total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
