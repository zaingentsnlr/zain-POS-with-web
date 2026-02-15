import { useEffect, useState } from 'react';
import { useDateFilter } from '@/contexts/DateFilterContext';
import { PaginatedTable } from '@/components/shared/PaginatedTable';
import { TrendingUp, Calendar, ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';
import api from '@/lib/api';

export default function Sales() {
    const { dateRange } = useDateFilter();
    const [sales, setSales] = useState<any[]>([]);
    const [summary, setSummary] = useState({ totalSales: 0, totalOrders: 0, averageOrderValue: 0 });

    // Pagination state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSales();
        fetchSummary();
    }, [dateRange, page, limit]);

    const fetchSales = async () => {
        setLoading(true);
        try {
            const params = {
                page,
                limit,
                startDate: dateRange.startDate?.toISOString(),
                endDate: dateRange.endDate?.toISOString()
            };
            const response = await api.get('/sales', { params });
            setSales(response.data.data);
            setTotalItems(response.data.pagination.total);
        } catch (error) {
            console.error('Failed to fetch sales:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSummary = async () => {
        try {
            const params = {
                startDate: dateRange.startDate?.toISOString(),
                endDate: dateRange.endDate?.toISOString()
            };
            const response = await api.get('/sales/summary', { params });
            setSummary(response.data);
        } catch (error) {
            console.error('Failed to fetch summary:', error);
        }
    };

    const columns = [
        {
            header: 'Bill No',
            accessor: 'billNo' as keyof any,
            className: 'font-medium'
        },
        {
            header: 'Date',
            render: (sale: any) => format(new Date(sale.createdAt), 'dd MMM yyyy, hh:mm a')
        },
        {
            header: 'Customer',
            render: (sale: any) => (
                <div>
                    <div className="font-medium text-gray-900">{sale.customerName || 'Walk-in'}</div>
                    {sale.customerPhone && <div className="text-xs text-gray-500">{sale.customerPhone}</div>}
                </div>
            )
        },
        {
            header: 'Items',
            render: (sale: any) => sale.items?.length || 0,
            className: 'text-right'
        },
        {
            header: 'Amount',
            render: (sale: any) => `₹${sale.grandTotal.toLocaleString()}`,
            className: 'text-right font-medium'
        },
        {
            header: 'Status',
            render: (sale: any) => (
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${sale.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {sale.status}
                </span>
            ),
            className: 'text-center'
        },
        {
            header: 'Cashier',
            accessor: 'user.name' as keyof any,
            render: (sale: any) => sale.user?.name || '-'
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">Sales History</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    View matching sales for {dateRange.label}
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <TrendingUp className="text-green-600 dark:text-green-400 w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                ₹{summary.totalSales.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <ShoppingCart className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{summary.totalOrders}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <TrendingUp className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Average Order</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                ₹{summary.averageOrderValue.toFixed(0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sales Table */}
            <div>
                <PaginatedTable
                    data={sales}
                    columns={columns}
                    page={page}
                    totalPages={Math.ceil(totalItems / limit)}
                    onPageChange={setPage}
                    loading={loading}
                    itemsPerPage={limit}
                    totalItems={totalItems}
                    onLimitChange={setLimit}
                    emptyMessage="No sales found for the selected period."
                />
            </div>
        </div>
    );
}
