import { useEffect, useState } from 'react';
import { FileText, Search, Eye } from 'lucide-react';
import api from '../lib/api';

interface Invoice {
    id: string;
    billNo: number;
    total: number;
    createdAt: string;
    customer: {
        name: string;
        phone: string;
    };
    items: Array<{
        quantity: number;
        product: {
            name: string;
        };
    }>;
}

export default function Invoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const response = await api.get('/invoices');
            setInvoices(response.data.invoices);
        } catch (error) {
            console.error('Failed to fetch invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredInvoices = invoices.filter(invoice =>
        invoice.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.customer.phone.includes(searchQuery)
    );

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
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Invoices</h1>
                <p className="text-gray-600 mt-1">View and search customer invoices</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FileText className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Invoices</p>
                            <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <FileText className="text-green-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Value</p>
                            <p className="text-2xl font-bold text-gray-900">
                                ₹{invoices.reduce((sum, inv) => sum + inv.total, 0).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <FileText className="text-purple-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Average Invoice</p>
                            <p className="text-2xl font-bold text-gray-900">
                                ₹{invoices.length > 0 ? (invoices.reduce((sum, inv) => sum + inv.total, 0) / invoices.length).toFixed(0) : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="card">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by customer name or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Invoices List */}
            <div className="card overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Invoice #</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Items</th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((invoice) => (
                            <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm font-medium text-gray-900">#{invoice.billNo}</td>
                                <td className="py-3 px-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{invoice.customer.name}</p>
                                        <p className="text-xs text-gray-600">{invoice.customer.phone}</p>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                    {new Date(invoice.createdAt).toLocaleDateString('en-IN', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-900 text-right">{invoice.items.length}</td>
                                <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                                    ₹{invoice.total.toLocaleString()}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => setSelectedInvoice(invoice)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <Eye size={18} className="text-gray-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredInvoices.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="mx-auto text-gray-400" size={48} />
                        <p className="text-gray-600 mt-4">No invoices found</p>
                    </div>
                )}
            </div>

            {/* Invoice Detail Modal */}
            {selectedInvoice && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Invoice #{selectedInvoice.billNo}</h2>
                                <button
                                    onClick={() => setSelectedInvoice(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600">Customer</p>
                                    <p className="text-lg font-medium text-gray-900">{selectedInvoice.customer.name}</p>
                                    <p className="text-sm text-gray-600">{selectedInvoice.customer.phone}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Date</p>
                                    <p className="text-lg font-medium text-gray-900">
                                        {new Date(selectedInvoice.createdAt).toLocaleString('en-IN')}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Items</p>
                                    <div className="space-y-2">
                                        {selectedInvoice.items.map((item, index) => (
                                            <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-gray-900">{item.product.name}</span>
                                                <span className="text-gray-600">x{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-gray-900">
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
