import React, { useEffect, useState } from 'react';
import { Printer, Search, Trash2, Filter, Calendar as CalendarIcon, ChevronDown, ChevronUp, Tag, Banknote, CreditCard, QrCode } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { db } from '../lib/db';
import { auditService } from '../services/audit.service';
import { printService } from '../services/print.service';
import { format, isSameDay, isSameWeek, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, addDays, addWeeks, addMonths, addYears } from 'date-fns';
import { formatIndianCurrency } from '../lib/format';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeftRight, History, Minus, Plus, Undo2 } from 'lucide-react';

type TimePeriod = 'day' | 'week' | 'month' | 'year' | 'all';

export const Sales: React.FC = () => {
    const [sales, setSales] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('day');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [paymentFilter, setPaymentFilter] = useState<string>('all');
    const [staffFilter, setStaffFilter] = useState<string>('all');
    const [staffOptions, setStaffOptions] = useState<Array<{ id: string; name: string }>>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [totalRecords, setTotalRecords] = useState(0);
    const [expandedSaleId, setExpandedSaleId] = useState<string | null>(null);
    const [shopSettings, setShopSettings] = useState<any>(null);
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { addItem, clearCart } = useCartStore();

    // Void Modal State
    const [voidSaleId, setVoidSaleId] = useState<string | null>(null);
    const [voidReason, setVoidReason] = useState('');
    const [isVoiding, setIsVoiding] = useState(false);
    const [updatingPayment, setUpdatingPayment] = useState<string | null>(null);

    // New Professional Redesign State
    const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
    const [selectedSaleForAction, setSelectedSaleForAction] = useState<any>(null);
    const [returnItems, setReturnItems] = useState<any[]>([]); // Items being returned
    const [exchangeNewItems, setExchangeNewItems] = useState<any[]>([]); // New items being taken
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [refundReason, setRefundReason] = useState('');
    const [replacementPaymentMethod, setReplacementPaymentMethod] = useState<'CASH' | 'CARD' | 'UPI'>('CASH');
    const [diffAmount, setDiffAmount] = useState(0);

    // New stats states for entire filtered range
    const [totalMatchedRevenue, setTotalMatchedRevenue] = useState(0);
    const [totalMatchedBills, setTotalMatchedBills] = useState(0);

    // Payment Update Modal State
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedSaleForPaymentUpdate, setSelectedSaleForPaymentUpdate] = useState<any>(null);
    const [paymentEditData, setPaymentEditData] = useState({
        method: 'CASH' as 'CASH' | 'CARD' | 'UPI' | 'SPLIT',
        cashAmount: '',
        upiAmount: '',
        cardAmount: ''
    });
    const [isSavingPayment, setIsSavingPayment] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadSales();
        }, 250);
        return () => clearTimeout(timer);
    }, [timePeriod, selectedDate, searchQuery, paymentFilter, staffFilter, page, pageSize]);

    useEffect(() => {
        loadShopSettings();
        loadStaffOptions();
    }, []);

    useEffect(() => {
        setPage(1);
    }, [timePeriod, selectedDate, searchQuery, paymentFilter, staffFilter, pageSize]);

    const loadShopSettings = async () => {
        try {
            const result = await window.electronAPI.db.query({
                model: 'setting',
                method: 'findUnique',
                args: { where: { key: 'SHOP_SETTINGS' } }
            });
            if (result.success && result.data && result.data.value) {
                setShopSettings(JSON.parse(result.data.value));
            }
        } catch (error) {
            console.error('Failed to load shop settings:', error);
        }
    };

    const loadStaffOptions = async () => {
        try {
            const users = await db.users.findMany({
                where: { isActive: true },
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            });
            setStaffOptions(users || []);
        } catch (error) {
            console.error('Failed to load staff options:', error);
        }
    };

    const loadSales = async () => {
        try {
            setLoading(true);

            let where: any = {};

            const baseDate = new Date(selectedDate);
            const now = new Date();

            if (timePeriod === 'day') {
                const start = startOfDay(baseDate);
                const end = endOfDay(baseDate);
                where.createdAt = { gte: start.toISOString(), lte: end.toISOString() };
            } else if (timePeriod === 'week') {
                where.createdAt = { gte: startOfWeek(baseDate).toISOString(), lte: endOfWeek(baseDate).toISOString() };
            } else if (timePeriod === 'month') {
                where.createdAt = { gte: startOfMonth(baseDate).toISOString(), lte: endOfMonth(baseDate).toISOString() };
            } else if (timePeriod === 'year') {
                where.createdAt = { gte: startOfYear(baseDate).toISOString(), lte: endOfYear(baseDate).toISOString() };
            }

            // Add payment filter
            if (paymentFilter !== 'all') {
                where.paymentMethod = paymentFilter;
            }

            if (staffFilter !== 'all') {
                where.userId = staffFilter;
            }

            // Add search filter
            if (searchQuery) {
                where.OR = [
                    { billNo: { contains: searchQuery } },
                    { customerName: { contains: searchQuery } },
                    { customerPhone: { contains: searchQuery } },
                    { items: { some: { productName: { contains: searchQuery } } } },
                    { user: { name: { contains: searchQuery } } }
                ];
            }

            const [data, totalStats, totalCount] = await Promise.all([
                db.sales.findMany({
                    where,
                    include: {
                        items: true,
                        payments: true,
                        user: { select: { name: true } },
                        exchanges: { include: { items: true } },
                        refunds: { include: { items: true } }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: pageSize,
                    skip: (page - 1) * pageSize,
                }),
                db.sales.aggregate({
                    where: { ...where, status: { not: 'VOIDED' } },
                    _sum: { grandTotal: true },
                    _count: { id: true }
                }),
                db.sales.aggregate({
                    where,
                    _count: { id: true }
                })
            ]);

            setTotalMatchedRevenue(totalStats._sum.grandTotal || 0);
            setTotalMatchedBills(totalStats._count.id || 0);
            setTotalRecords(totalCount._count.id || 0);
            setSales(data);
        } catch (error) {
            console.error('Failed to load sales:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="p-8 text-center text-gray-500">Authenticating...</div>;

    if (user.role !== 'ADMIN' && !user.permViewSales) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full">
                    <Trash2 className="w-12 h-12" />
                </div>
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-gray-500 max-w-md">
                    You do not have permission to view sales history.
                    Please contact your administrator to request access.
                </p>
            </div>
        );
    }

    const handleVoidClick = (id: string) => {
        setVoidSaleId(id);
        setVoidReason('');
    };

    const handleExchangeClick = async (sale: any) => {
        const preparedReturnItems = sale.items
            .map((item: any) => {
                const returnedQty = (sale.exchanges || []).reduce((sum: number, ex: any) =>
                    sum + (ex.items || [])
                        .filter((ei: any) => ei.returnedItemId === item.variantId)
                        .reduce((s: number, ei: any) => s + (ei.returnedQty || 0), 0), 0);
                const refundedQty = (sale.refunds || []).reduce((sum: number, ref: any) =>
                    sum + (ref.items || [])
                        .filter((ri: any) => ri.variantId === item.variantId)
                        .reduce((s: number, ri: any) => s + (ri.quantity || 0), 0), 0);
                const availableQty = Math.max(0, item.quantity - returnedQty - refundedQty);
                return { ...item, quantity: availableQty, returnQty: 0 };
            })
            .filter((item: any) => item.quantity > 0);

        if (preparedReturnItems.length === 0) {
            alert('No returnable items left for this bill.');
            return;
        }

        if (preparedReturnItems.length === 1) {
            preparedReturnItems[0].returnQty = preparedReturnItems[0].quantity;
        }

        setSelectedSaleForAction(sale);
        setReturnItems(preparedReturnItems);
        setExchangeNewItems([]);
        setReplacementPaymentMethod((sale.paymentMethod === 'CARD' || sale.paymentMethod === 'UPI') ? sale.paymentMethod : 'CASH');
        setDiffAmount(0);
        setIsExchangeModalOpen(true);

        // Load products for exchange selection
        try {
            const variants = await db.productVariants.findMany({
                where: { isActive: true },
                include: { product: true }
            });
            setAllProducts(variants);
        } catch (e) {
            console.error("Failed to load products for exchange", e);
        }
    };

    const handleRefundClick = (sale: any) => {
        const preparedReturnItems = sale.items
            .map((item: any) => {
                const returnedQty = (sale.exchanges || []).reduce((sum: number, ex: any) =>
                    sum + (ex.items || [])
                        .filter((ei: any) => ei.returnedItemId === item.variantId)
                        .reduce((s: number, ei: any) => s + (ei.returnedQty || 0), 0), 0);
                const refundedQty = (sale.refunds || []).reduce((sum: number, ref: any) =>
                    sum + (ref.items || [])
                        .filter((ri: any) => ri.variantId === item.variantId)
                        .reduce((s: number, ri: any) => s + (ri.quantity || 0), 0), 0);
                const availableQty = Math.max(0, item.quantity - returnedQty - refundedQty);
                return { ...item, quantity: availableQty, refundQty: 0 };
            })
            .filter((item: any) => item.quantity > 0);

        if (preparedReturnItems.length === 0) {
            alert('No refundable items left for this bill.');
            return;
        }

        if (preparedReturnItems.length === 1) {
            preparedReturnItems[0].refundQty = preparedReturnItems[0].quantity;
        }

        setSelectedSaleForAction(sale);
        setReturnItems(preparedReturnItems);
        setRefundReason('');
        setIsRefundModalOpen(true);
    };

    const submitExchange = async () => {
        if (!selectedSaleForAction) return;

        const totalReturnedValue = returnItems.reduce((sum, it) => sum + (it.sellingPrice * it.returnQty), 0);
        const totalNewValue = exchangeNewItems.reduce((sum, it) => sum + (it.sellingPrice * it.quantity), 0);
        const difference = totalNewValue - totalReturnedValue;

        try {
            const returns = returnItems.filter(ri => ri.returnQty > 0).map(ri => ({
                returnedId: ri.variantId,
                returnedQty: ri.returnQty,
                newId: null,
                newQty: 0,
                priceDiff: -(ri.sellingPrice * ri.returnQty)
            }));

            const news = exchangeNewItems.map(ni => ({
                returnedId: null,
                returnedQty: 0,
                newId: ni.variantId,
                newQty: ni.quantity,
                priceDiff: ni.sellingPrice * ni.quantity
            }));

            const exchangeData = {
                originalInvoiceId: selectedSaleForAction.id,
                userId: user?.id,
                differenceAmount: difference,
                notes: `Exchange for Bill #${selectedSaleForAction.billNo}`,
                replacementPaymentMethod,
                items: [...returns, ...news],
                payments: [{
                    paymentMode: replacementPaymentMethod,
                    amount: difference
                }]
            };

            const result = await window.electronAPI.sales.exchange(exchangeData);
            if (result.success) {
                alert("Exchange Processed Successfully!");
                setIsExchangeModalOpen(false);
                loadSales();
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            alert(`Exchange Failed: ${error.message}`);
        }
    };

    const submitRefund = async () => {
        if (!selectedSaleForAction || !refundReason.trim()) {
            alert("Reason is mandatory for refunds.");
            return;
        }

        const itemsToRefund = returnItems.filter(it => it.refundQty > 0);
        if (itemsToRefund.length === 0) {
            alert("Select at least one item to refund.");
            return;
        }

        try {
            const refundData = {
                originalInvoiceId: selectedSaleForAction.id,
                userId: user?.id,
                totalAmount: itemsToRefund.reduce((sum, it) => sum + (it.sellingPrice * it.refundQty), 0),
                reason: refundReason,
                items: itemsToRefund.map(it => ({
                    id: it.variantId,
                    qty: it.refundQty,
                    amount: it.sellingPrice * it.refundQty
                })),
                payments: [{
                    paymentMode: 'CASH', // Default refund mode
                    amount: itemsToRefund.reduce((sum, it) => sum + (it.sellingPrice * it.refundQty), 0)
                }]
            };

            const result = await window.electronAPI.sales.refund(refundData);
            if (result.success) {
                alert("Refund Processed!");
                setIsRefundModalOpen(false);
                loadSales();
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            alert(`Refund Failed: ${error.message}`);
        }
    };

    const isSingleReturnItem = returnItems.length === 1;

    const confirmVoid = async () => {
        if (!voidSaleId || !voidReason.trim()) return;

        setIsVoiding(true);
        try {
            // Find sale to get billNo for log
            const sale = sales.find(s => s.id === voidSaleId);

            await db.sales.update({
                where: { id: voidSaleId },
                data: { status: 'VOIDED' }
            });

            await auditService.log(
                'SALE_VOID',
                JSON.stringify({ billNo: sale?.billNo || 'Unknown', reason: voidReason }),
                user?.id
            );

            loadSales();
            setVoidSaleId(null);
        } catch (error: any) {
            console.error('Failed to void sale:', error);
            alert(`Failed to void sale: ${error.message || error}`);
        } finally {
            setIsVoiding(false);
        }
    };

    const handleUpdatePayment = async (saleId: string, currentMethod: string) => {
        const sale = sales.find(s => s.id === saleId);
        if (!sale) return;

        setSelectedSaleForPaymentUpdate(sale);

        // Pre-fill modal based on current state
        if (currentMethod === 'SPLIT') {
            const cash = sale.payments?.find((p: any) => p.paymentMode === 'CASH')?.amount || 0;
            const upi = sale.payments?.find((p: any) => p.paymentMode === 'UPI')?.amount || 0;
            const card = sale.payments?.find((p: any) => p.paymentMode === 'CARD')?.amount || 0;
            setPaymentEditData({
                method: 'SPLIT',
                cashAmount: cash > 0 ? cash.toString() : '',
                upiAmount: upi > 0 ? upi.toString() : '',
                cardAmount: card > 0 ? card.toString() : ''
            });
        } else {
            const preferredMode = ['CASH', 'UPI', 'CARD'].includes(currentMethod)
                ? currentMethod
                : (['CASH', 'UPI', 'CARD'].includes(sale.payments?.[0]?.paymentMode) ? sale.payments[0].paymentMode : 'CASH');
            setPaymentEditData({
                method: preferredMode as any,
                cashAmount: '',
                upiAmount: '',
                cardAmount: ''
            });
        }

        setIsPaymentModalOpen(true);
    };

    const submitPaymentUpdate = async () => {
        if (!selectedSaleForPaymentUpdate) return;

        const { method, cashAmount, upiAmount, cardAmount } = paymentEditData;
        const totalAmount = selectedSaleForPaymentUpdate.grandTotal;

        let finalPayments = [];
        if (method === 'SPLIT') {
            const sum = (parseFloat(cashAmount) || 0) + (parseFloat(upiAmount) || 0) + (parseFloat(cardAmount) || 0);
            if (Math.abs(sum - totalAmount) > 0.01) {
                alert(`Total must equal ${formatIndianCurrency(totalAmount)}. Current sum: ${formatIndianCurrency(sum)}`);
                return;
            }
            if (parseFloat(cashAmount) > 0) finalPayments.push({ paymentMode: 'CASH', amount: parseFloat(cashAmount) });
            if (parseFloat(upiAmount) > 0) finalPayments.push({ paymentMode: 'UPI', amount: parseFloat(upiAmount) });
            if (parseFloat(cardAmount) > 0) finalPayments.push({ paymentMode: 'CARD', amount: parseFloat(cardAmount) });
        } else {
            finalPayments = [{ paymentMode: method, amount: totalAmount }];
        }

        try {
            setIsSavingPayment(true);
            const result = await window.electronAPI.sales.updatePayment({
                saleId: selectedSaleForPaymentUpdate.id,
                userId: user?.id,
                paymentData: {
                    paymentMethod: method,
                    paidAmount: selectedSaleForPaymentUpdate.paidAmount,
                    changeAmount: selectedSaleForPaymentUpdate.changeAmount,
                    payments: finalPayments
                }
            });

            if (!result.success) throw new Error(result.error);

            await auditService.log(
                'PAYMENT_UPDATE',
                `Updated payment for Bill #${selectedSaleForPaymentUpdate.billNo} to ${method}.`,
                user?.id
            );

            setSales(prev => prev.map(s => s.id === selectedSaleForPaymentUpdate.id ? { ...s, paymentMethod: method, payments: result.data.payments } : s));
            setIsPaymentModalOpen(false);
        } catch (error: any) {
            alert(`Failed: ${error.message}`);
        } finally {
            setIsSavingPayment(false);
        }
    };

    const handlePrintReceipt = async (sale: any) => {
        try {
            const receiptData = {
                billNo: sale.billNo,
                date: new Date(sale.createdAt),
                shopName: shopSettings?.shopName || 'ZAIN GENTS PALACE',
                shopAddress: shopSettings?.address || 'CHIRAMMAL TOWER, BEHIND CANARA BANK\nRAJA ROAD, NILESHWAR',
                shopPhone: shopSettings?.phone || '9037106449, 7907026827',
                gstin: shopSettings?.gstin || '32PVGPS0686J1ZV',
                logo: shopSettings?.logo,
                customerName: sale.customerName,
                items: sale.items.map((item: any) => ({
                    name: item.productName,
                    variantInfo: item.variantInfo,
                    quantity: item.quantity,
                    mrp: item.mrp || 0,
                    rate: item.sellingPrice,
                    discount: item.discount || 0,
                    taxRate: item.taxRate || 0,
                    total: item.total || (item.sellingPrice * item.quantity - (item.discount || 0)),
                })),
                subtotal: sale.subtotal,
                discount: sale.discount,
                cgst: sale.cgst || (sale.taxAmount / 2),
                sgst: sale.sgst || (sale.taxAmount / 2),
                grandTotal: sale.grandTotal,
                paymentMethod: sale.paymentMethod,
                paidAmount: sale.paidAmount,
                changeAmount: sale.changeAmount,
                userName: sale.user?.name || 'Staff',
            };

            await printService.printReceipt(receiptData);
        } catch (error) {
            console.error('Failed to print receipt:', error);
            alert('Failed to print receipt');
        }
    };

    const shiftPeriod = (direction: -1 | 1) => {
        const current = new Date(selectedDate);
        let next = current;
        if (timePeriod === 'day') next = addDays(current, direction);
        else if (timePeriod === 'week') next = addWeeks(current, direction);
        else if (timePeriod === 'month') next = addMonths(current, direction);
        else if (timePeriod === 'year') next = addYears(current, direction);
        setSelectedDate(next.toISOString().split('T')[0]);
    };

    const getRangeLabel = () => {
        const base = new Date(selectedDate);
        if (timePeriod === 'day') return format(base, 'dd MMM yyyy');
        if (timePeriod === 'week') return `${format(startOfWeek(base), 'dd MMM yyyy')} - ${format(endOfWeek(base), 'dd MMM yyyy')}`;
        if (timePeriod === 'month') return format(base, 'MMMM yyyy');
        if (timePeriod === 'year') return format(base, 'yyyy');
        return 'All Time';
    };

    const filteredSales = sales;
    const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
    const showingFrom = totalRecords === 0 ? 0 : (page - 1) * pageSize + 1;
    const showingTo = Math.min(page * pageSize, totalRecords);

    // Summary display logic
    const totalRevenue = totalMatchedRevenue;
    const totalBillsCountSnapshot = totalMatchedBills;
    const averageBill = totalBillsCountSnapshot > 0 ? totalRevenue / totalBillsCountSnapshot : 0;

    return (
        <div className="space-y-6">
            {/* Header with Search and Filters */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2 flex-1 max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by Bill No, Customer, Items..."
                                className="pl-10"
                            />
                        </div>

                        {timePeriod !== 'all' && (
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-lg px-3 py-1.5 shadow-sm">
                                <CalendarIcon className="w-5 h-5 text-primary-500" />
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="bg-transparent border-none outline-none text-sm font-medium"
                                />
                                <span className="text-xs text-gray-500">| {getRangeLabel()}</span>
                            </div>
                        )}
                    </div>
                    <Button
                        variant="secondary"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </Button>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                    <div className="card p-4">
                        <div className="flex flex-wrap gap-4 items-center">
                            <label className="text-sm font-medium">Payment Method:</label>
                            <select
                                value={paymentFilter}
                                onChange={(e) => setPaymentFilter(e.target.value)}
                                className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                            >
                                <option value="all">All Methods</option>
                                <option value="CASH">Cash</option>
                                <option value="CARD">Card</option>
                                <option value="UPI">UPI</option>
                            </select>
                            <label className="text-sm font-medium">Staff:</label>
                            <select
                                value={staffFilter}
                                onChange={(e) => setStaffFilter(e.target.value)}
                                className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                            >
                                <option value="all">All Staff</option>
                                {staffOptions.map((s) => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setSearchQuery('');
                                    setPaymentFilter('all');
                                    setStaffFilter('all');
                                    setSelectedDate(new Date().toISOString().split('T')[0]);
                                    setTimePeriod('day');
                                    setPage(1);
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Time Period Tabs */}
            <div className="flex gap-2">
                <button
                    onClick={() => setTimePeriod('day')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${timePeriod === 'day' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white dark:bg-gray-800 text-gray-600 hover:bg-gray-50 border border-gray-100 dark:border-gray-700'}`}
                >
                    Day
                </button>
                <button
                    onClick={() => setTimePeriod('week')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${timePeriod === 'week' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white dark:bg-gray-800 text-gray-600 hover:bg-gray-50 border border-gray-100 dark:border-gray-700'}`}
                >
                    Week
                </button>
                <button
                    onClick={() => setTimePeriod('month')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${timePeriod === 'month' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white dark:bg-gray-800 text-gray-600 hover:bg-gray-50 border border-gray-100 dark:border-gray-700'}`}
                >
                    Month
                </button>
                <button
                    onClick={() => setTimePeriod('year')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${timePeriod === 'year' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white dark:bg-gray-800 text-gray-600 hover:bg-gray-50 border border-gray-100 dark:border-gray-700'}`}
                >
                    Year
                </button>
                <button
                    onClick={() => {
                        setTimePeriod('all');
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${timePeriod === 'all' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white dark:bg-gray-800 text-gray-600 hover:bg-gray-50 border border-gray-100 dark:border-gray-700'}`}
                >
                    All Time
                </button>
                {timePeriod !== 'all' && (
                    <>
                        <button
                            onClick={() => shiftPeriod(-1)}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-600 hover:bg-gray-50 border border-gray-100 dark:border-gray-700"
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-600 hover:bg-gray-50 border border-gray-100 dark:border-gray-700"
                        >
                            Current
                        </button>
                        <button
                            onClick={() => shiftPeriod(1)}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-600 hover:bg-gray-50 border border-gray-100 dark:border-gray-700"
                        >
                            Next
                        </button>
                    </>
                )}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Bills</p>
                    <p className="text-2xl font-bold mt-1">{totalBillsCountSnapshot}</p>
                </div>
                <div className="card">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                    <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
                        {formatIndianCurrency(totalRevenue)}
                    </p>
                </div>
                <div className="card">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Bill</p>
                    <p className="text-2xl font-bold mt-1">
                        {formatIndianCurrency(averageBill)}
                    </p>
                </div>
            </div>

            {/* Sales Table */}
            <div className="card overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Show</th>
                            <th>Bill No</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Staff</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index}>
                                    <td><Skeleton className="h-4 w-24" /></td>
                                    <td><Skeleton className="h-4 w-32" /></td>
                                    <td><Skeleton className="h-4 w-32" /></td>
                                    <td><Skeleton className="h-4 w-12" /></td>
                                    <td><Skeleton className="h-4 w-20" /></td>
                                    <td><Skeleton className="h-6 w-16" /></td>
                                    <td><Skeleton className="h-4 w-24" /></td>
                                    <td><Skeleton className="h-8 w-24" /></td>
                                </tr>
                            ))
                        ) : filteredSales.length > 0 ? (
                            filteredSales.map((sale, index) => {
                                const prevSale = index > 0 ? filteredSales[index - 1] : null;
                                const currDate = new Date(sale.createdAt);
                                const prevDate = prevSale ? new Date(prevSale.createdAt) : null;

                                let showDivider = false;
                                let dividerLabel = "";
                                let dividerColor = "";

                                if (prevDate) {
                                    // Year Change
                                    if (currDate.getFullYear() !== prevDate.getFullYear()) {
                                        showDivider = true;
                                        dividerLabel = `Start of ${currDate.getFullYear()}`;
                                        dividerColor = "bg-rose-500";
                                    }
                                    // Month Change (same year)
                                    else if (currDate.getMonth() !== prevDate.getMonth()) {
                                        showDivider = true;
                                        dividerLabel = format(currDate, 'MMMM yyyy');
                                        dividerColor = "bg-amber-500";
                                    }
                                    // Week Change (same month)
                                    else if (!isSameWeek(currDate, prevDate, { weekStartsOn: 1 })) {
                                        showDivider = true;
                                        const startOfCurrWeek = startOfWeek(currDate, { weekStartsOn: 1 });
                                        const endOfCurrWeek = endOfWeek(currDate, { weekStartsOn: 1 });
                                        dividerLabel = `Week: ${format(startOfCurrWeek, 'dd MMM')} - ${format(endOfCurrWeek, 'dd MMM')}`;
                                        dividerColor = "bg-emerald-500";
                                    }
                                }

                                return (
                                    <React.Fragment key={sale.id}>
                                        {showDivider && (
                                            <tr>
                                                <td colSpan={7} className="p-0">
                                                    <div className="flex items-center gap-4 py-3 px-4 bg-gray-50/50 dark:bg-gray-800/50">
                                                        <div className={`h-1 w-12 rounded-full ${dividerColor}`}></div>
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                                            Time Horizon: {dividerLabel}
                                                        </span>
                                                        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        <tr className={`group ${sale.status === 'VOIDED' ? 'bg-red-50 dark:bg-red-900/10' : ''} ${expandedSaleId === sale.id ? 'bg-primary-50/30' : ''}`}>
                                            <td>
                                                <button
                                                    onClick={() => setExpandedSaleId(expandedSaleId === sale.id ? null : sale.id)}
                                                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    {expandedSaleId === sale.id ? (
                                                        <ChevronUp className="w-4 h-4 text-primary-600" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                                    )}
                                                </button>
                                            </td>
                                            <td className="font-bold whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-primary-600">#{sale.billNo}</span>
                                                    {sale.status === 'VOIDED' && (
                                                        <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded border border-red-200 font-black uppercase">
                                                            VOID
                                                        </span>
                                                    )}
                                                    {sale.exchanges?.length > 0 && (
                                                        <span className="text-[10px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded border border-orange-200 font-black uppercase">
                                                            Exchanged
                                                        </span>
                                                    )}
                                                    {sale.refunds?.length > 0 && (
                                                        <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200 font-black uppercase">
                                                            Refunded
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className={`whitespace-nowrap text-xs ${sale.status === 'VOIDED' ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                                                {format(new Date(sale.createdAt), 'dd MMM yyyy, HH:mm')}
                                            </td>
                                            <td className={`font-medium ${sale.status === 'VOIDED' ? 'line-through text-gray-400' : ''}`}>
                                                {sale.customerName || <span className="text-gray-300 italic text-xs">Walk-in</span>}
                                            </td>
                                            <td>
                                                <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs font-bold">
                                                    {sale.items.length}
                                                </span>
                                            </td>
                                            <td className={`font-black text-gray-900 dark:text-gray-100 ${sale.status === 'VOIDED' ? 'line-through text-gray-400' : ''}`}>
                                                {formatIndianCurrency(sale.grandTotal)}
                                            </td>
                                            <td>
                                                {(() => {
                                                    const isExchangeGeneratedSale = sale.paymentMethod === 'EXCHANGE' || (sale.remarks || '').includes('Replacement sale for Invoice');
                                                    const canUpdatePayment =
                                                        sale.status !== 'VOIDED' && (
                                                            user?.role === 'ADMIN' ||
                                                            user?.permChangePayment ||
                                                            (isExchangeGeneratedSale && user?.permEditSales)
                                                        );

                                                    return (
                                                        <button
                                                            onClick={() => canUpdatePayment && handleUpdatePayment(sale.id, sale.paymentMethod)}
                                                            disabled={updatingPayment === sale.id || !canUpdatePayment}
                                                            className={`transition-all ${canUpdatePayment ? 'cursor-pointer hover:scale-110 active:scale-90' : 'cursor-not-allowed opacity-70'}`}
                                                            title={canUpdatePayment ? 'Click to update payment method' : 'No permission to update payment method'}
                                                        >
                                                            <span className={`badge py-1 px-3 ${sale.status === 'VOIDED' ? 'bg-red-100 text-red-800' : 'badge-info shadow-sm'} ${updatingPayment === sale.id ? 'opacity-50' : ''}`}>
                                                                {updatingPayment === sale.id ? '...' : (sale.status === 'VOIDED' ? 'VOIDED' : sale.paymentMethod)}
                                                            </span>
                                                        </button>
                                                    );
                                                })()}
                                            </td>
                                            <td className="text-sm text-gray-500 whitespace-nowrap">{sale.user?.name || 'Staff'}</td>
                                            <td>
                                                <div className="flex gap-2 justify-end">
                                                    <Button variant="secondary" size="sm" onClick={() => handlePrintReceipt(sale)} className="shadow-sm">
                                                        <Printer className="w-4 h-4" />
                                                    </Button>

                                                    {(user?.role === 'ADMIN' || user?.permEditSales) && sale.status !== 'VOIDED' && (
                                                        <div className="flex gap-1">
                                                            <Button
                                                                variant="secondary"
                                                                size="sm"
                                                                title="Process Exchange"
                                                                onClick={() => handleExchangeClick(sale)}
                                                                className="shadow-sm bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100"
                                                            >
                                                                <ArrowLeftRight className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="secondary"
                                                                size="sm"
                                                                title="Process Refund"
                                                                onClick={() => handleRefundClick(sale)}
                                                                className="shadow-sm bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                                            >
                                                                <Undo2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    )}
                                                    {(user?.role === 'ADMIN' || user?.permVoidSale) && sale.status !== 'VOIDED' && (
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            title="Void Bill (Legacy)"
                                                            onClick={() => handleVoidClick(sale.id)}
                                                            className="shadow-sm"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Expanded Detail Row */}
                                        {expandedSaleId === sale.id && (
                                            <tr className="bg-gray-50/50 dark:bg-gray-900/20 animate-in fade-in slide-in-from-top-2 duration-200">
                                                <td colSpan={9} className="p-0 border-b border-gray-200 dark:border-gray-700">
                                                    <div className="px-14 py-4 bg-white dark:bg-gray-800/40 m-2 rounded-xl border border-gray-100 dark:border-gray-700 shadow-inner">
                                                        <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest flex items-center gap-2">
                                                            <Tag className="w-3 h-3" />
                                                            Items Purchased
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                            {sale.items.map((item: any, idx: number) => {
                                                                const returnedQty = (sale.exchanges || []).reduce((sum: number, ex: any) =>
                                                                    sum + (ex.items || []).filter((ei: any) => ei.returnedItemId === item.variantId).reduce((s: number, ei: any) => s + ei.returnedQty, 0), 0);
                                                                const refundedQty = (sale.refunds || []).reduce((sum: number, ref: any) =>
                                                                    sum + (ref.items || []).filter((ri: any) => ri.variantId === item.variantId).reduce((s: number, ri: any) => s + ri.quantity, 0), 0);
                                                                const activeQty = item.quantity - returnedQty - refundedQty;

                                                                return (
                                                                    <div key={idx} className={`flex justify-between items-center p-3 rounded-lg border ${activeQty <= 0 ? 'bg-gray-100 dark:bg-gray-800 opacity-50 border-dashed' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}>
                                                                        <div className="min-w-0">
                                                                            <div className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate flex items-center gap-2">
                                                                                {item.productName}
                                                                                {activeQty <= 0 && <span className="text-[8px] bg-gray-200 text-gray-600 px-1 rounded">REMOVED</span>}
                                                                            </div>
                                                                            <div className="text-[10px] text-gray-500 font-medium">
                                                                                {item.variantInfo}
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-right flex-shrink-0 ml-4">
                                                                            <div className={`text-xs font-black ${activeQty <= 0 ? 'text-gray-400' : 'text-primary-600'}`}>
                                                                                {activeQty} / {item.quantity} × {formatIndianCurrency(item.sellingPrice)}
                                                                            </div>
                                                                            {(returnedQty > 0 || refundedQty > 0) && (
                                                                                <div className="text-[9px] text-red-500 font-bold uppercase">
                                                                                    {returnedQty > 0 ? `${returnedQty} Returned ` : ''}
                                                                                    {refundedQty > 0 ? `${refundedQty} Refunded` : ''}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}

                                                            {/* Show items added via exchange */}
                                                            {(sale.exchanges || []).flatMap((ex: any) => ex.items || []).filter((ei: any) => ei.newItemId).map((newItem: any, idx: number) => (
                                                                <div key={`new-${idx}`} className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/30">
                                                                    <div className="min-w-0">
                                                                        <div className="font-bold text-sm text-green-800 dark:text-green-400 truncate flex items-center gap-2">
                                                                            Added Item
                                                                            <span className="text-[8px] bg-green-200 text-green-700 px-1 rounded">EXCHANGE</span>
                                                                        </div>
                                                                        <div className="text-[10px] text-green-600/70 font-medium">
                                                                            Qty: {newItem.newQty} | Price: {formatIndianCurrency(newItem.priceDiff / newItem.newQty)}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right flex-shrink-0 ml-4">
                                                                        <div className="text-xs font-black text-green-600">
                                                                            + {formatIndianCurrency(newItem.priceDiff)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {sale.remarks && (
                                                            <div className="mt-4 p-3 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800">
                                                                <div className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">
                                                                    Invoice Flag
                                                                </div>
                                                                <div className="mt-1 text-xs text-amber-800 dark:text-amber-300 whitespace-pre-line">
                                                                    {sale.remarks}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Payment Breakdown (Especially for SPLIT) */}
                                                        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                                                            <h5 className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest flex items-center gap-2">
                                                                <CreditCard className="w-3 h-3" />
                                                                Payment Breakdown
                                                            </h5>
                                                            <div className="flex flex-wrap gap-3">
                                                                {(sale.payments && sale.payments.length > 0 ? sale.payments : [
                                                                    { paymentMode: sale.paymentMethod, amount: sale.grandTotal }
                                                                ]).map((p: any, i: number) => {
                                                                    let Icon = Banknote;
                                                                    let colorClass = "bg-green-50 text-green-700 border-green-200";

                                                                    if (p.paymentMode === 'CARD') {
                                                                        Icon = CreditCard;
                                                                        colorClass = "bg-blue-50 text-blue-700 border-blue-200";
                                                                    } else if (p.paymentMode === 'UPI') {
                                                                        Icon = QrCode;
                                                                        colorClass = "bg-purple-50 text-purple-700 border-purple-200";
                                                                    }

                                                                    return (
                                                                        <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border shadow-sm ${colorClass}`}>
                                                                            <Icon className="w-3.5 h-3.5" />
                                                                            <span className="text-xs font-black uppercase tracking-wider">{p.paymentMode}</span>
                                                                            <span className="text-sm font-black text-gray-900 dark:text-gray-100">{formatIndianCurrency(p.amount)}</span>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>

                                                        {/* Transaction History Timeline */}
                                                        {((sale.exchanges || []).length > 0 || (sale.refunds || []).length > 0 || (sale.remarks || '').split('\n').some((line: string) => line.startsWith('[UPDATE '))) && (
                                                            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                                                                <h5 className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest flex items-center gap-2">
                                                                    <History className="w-3 h-3" />
                                                                    Adjustment History
                                                                </h5>
                                                                <div className="space-y-2">
                                                                    {(sale.exchanges || []).map((ex: any, i: number) => (
                                                                        <div key={i} className="flex items-center gap-3 text-xs">
                                                                            <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]"></div>
                                                                            <span className="text-gray-500 font-medium">{format(new Date(ex.exchangeDate), 'dd MMM, HH:mm')}:</span>
                                                                            <span className="font-bold text-orange-600">Exchange Processed</span>
                                                                            <span className="text-gray-400">({ex.notes})</span>
                                                                            <span className="ml-auto font-black">{ex.differenceAmount > 0 ? '+' : ''}{formatIndianCurrency(ex.differenceAmount)}</span>
                                                                        </div>
                                                                    ))}
                                                                    {(sale.refunds || []).map((ref: any, i: number) => (
                                                                        <div key={i} className="flex items-center gap-3 text-xs">
                                                                            <div className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]"></div>
                                                                            <span className="text-gray-500 font-medium">{format(new Date(ref.refundDate), 'dd MMM, HH:mm')}:</span>
                                                                            <span className="font-bold text-red-600">Refunded</span>
                                                                            <span className="text-gray-400">({ref.reason})</span>
                                                                            <span className="ml-auto font-black">-{formatIndianCurrency(ref.totalRefundAmount)}</span>
                                                                        </div>
                                                                    ))}
                                                                    {(sale.remarks || '')
                                                                        .split('\n')
                                                                        .filter((line: string) => line.startsWith('[UPDATE '))
                                                                        .map((line: string, i: number) => {
                                                                            const closeBracket = line.indexOf(']');
                                                                            const rawDate = closeBracket > 8 ? line.slice(8, closeBracket) : '';
                                                                            const message = closeBracket >= 0 ? line.slice(closeBracket + 1).trim() : line;
                                                                            const parsedDate = rawDate ? new Date(rawDate) : null;
                                                                            const isValidDate = parsedDate && !Number.isNaN(parsedDate.getTime());

                                                                            return (
                                                                                <div key={`upd-${i}`} className="flex items-center gap-3 text-xs">
                                                                                    <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
                                                                                    <span className="text-gray-500 font-medium">{isValidDate ? format(parsedDate as Date, 'dd MMM, HH:mm') : 'Updated'}:</span>
                                                                                    <span className="font-bold text-blue-600">Invoice Updated</span>
                                                                                    <span className="text-gray-400">({message})</span>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="mt-4 pt-3 border-t border-dashed border-gray-200 dark:border-gray-700 flex justify-end items-center gap-8">
                                                            <div className="text-right">
                                                                <div className="text-[10px] font-bold text-gray-400 uppercase">Subtotal</div>
                                                                <div className="text-sm font-bold">{formatIndianCurrency(sale.subtotal)}</div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-[10px] font-bold text-gray-400 uppercase">Discount</div>
                                                                <div className="text-sm font-bold text-orange-600">{formatIndianCurrency(sale.discount)}</div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-[10px] font-bold text-gray-400 uppercase text-primary-600">Total Paid</div>
                                                                <div className="text-lg font-black text-primary-600">{formatIndianCurrency(sale.grandTotal)}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center py-12 text-gray-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <Search className="w-8 h-8 opacity-20" />
                                        <span className="text-lg font-medium">No transactions match your filters</span>
                                        <span className="text-xs">Try selecting a different date or search term</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-6 mb-8">
                <div className="text-sm text-gray-500">
                    Showing {showingFrom}-{showingTo} of {totalRecords} invoices
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500">Rows:</label>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
                        className="px-2 py-1 border rounded-md bg-white dark:bg-gray-800 text-sm"
                    >
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <Button
                        variant="secondary"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1 || loading}
                    >
                        Prev
                    </Button>
                    <span className="text-sm px-2">Page {page} of {totalPages}</span>
                    <Button
                        variant="secondary"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages || loading}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Void Modal */}
            <Modal
                isOpen={!!voidSaleId}
                onClose={() => setVoidSaleId(null)}
                title="Void Sale"
                size="sm"
            >
                <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400">
                        Are you sure you want to void this sale? This action cannot be undone.
                    </p>
                    <Input
                        label="Reason"
                        value={voidReason}
                        onChange={(e) => setVoidReason(e.target.value)}
                        placeholder="Enter reason for cancellation"
                        autoFocus
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            variant="secondary"
                            onClick={() => setVoidSaleId(null)}
                            disabled={isVoiding}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={confirmVoid}
                            disabled={isVoiding || !voidReason.trim()}
                        >
                            {isVoiding ? 'Voiding...' : 'Confirm Void'}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Professional Refund Modal */}
            <Modal
                isOpen={isRefundModalOpen}
                onClose={() => setIsRefundModalOpen(false)}
                title={`Process Refund - Bill #${selectedSaleForAction?.billNo}`}
                size="lg"
            >
                <div className="space-y-6">
                    <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg flex gap-3 items-start border border-red-100 dark:border-red-900/30">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-red-800 dark:text-red-400 uppercase">Refund Protocol</p>
                            <p className="text-xs text-red-700 dark:text-red-500">
                                {isSingleReturnItem
                                    ? 'Returned item is auto-selected for this bill. Stock will be automatically adjusted. Refund reason is mandatory for accounting logs.'
                                    : 'Select items and quantities for return. Stock will be automatically adjusted. Refund reason is mandatory for accounting logs.'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {returnItems.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl hover:border-red-200 transition-colors">
                                <div className="flex-1">
                                    <div className="font-bold text-sm">{item.productName}</div>
                                    <div className="text-[10px] text-gray-400 uppercase font-black">{item.variantInfo}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-xs font-bold text-gray-400">Price: {formatIndianCurrency(item.sellingPrice)}</div>
                                        <div className="text-[10px] text-gray-500">Max Qty: {item.quantity}</div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <button
                                            onClick={() => setReturnItems(prev => prev.map((it, i) => i === idx ? { ...it, refundQty: Math.max(0, it.refundQty - 1) } : it))}
                                            className="p-1 hover:bg-white rounded transition-colors"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-6 text-center font-black text-sm">{item.refundQty}</span>
                                        <button
                                            onClick={() => setReturnItems(prev => prev.map((it, i) => i === idx ? { ...it, refundQty: Math.min(it.quantity, it.refundQty + 1) } : it))}
                                            className="p-1 hover:bg-white rounded transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
                        <Input
                            label="Reason for Refund"
                            placeholder="e.g. Size mismatch, defective product..."
                            value={refundReason}
                            onChange={(e) => setRefundReason(e.target.value)}
                            required
                        />
                        <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 shadow-inner">
                            <div className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Total Refund Amount</div>
                            <div className="text-2xl font-black text-red-600">
                                {formatIndianCurrency(returnItems.reduce((sum, it) => sum + (it.sellingPrice * it.refundQty), 0))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="secondary" onClick={() => setIsRefundModalOpen(false)}>Cancel</Button>
                        <Button
                            variant="danger"
                            className="px-8 font-black uppercase tracking-widest text-xs"
                            disabled={!refundReason.trim() || returnItems.every(it => it.refundQty === 0)}
                            onClick={submitRefund}
                        >
                            Confirm Refund & Restock
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Professional Exchange Modal */}
            <Modal
                isOpen={isExchangeModalOpen}
                onClose={() => setIsExchangeModalOpen(false)}
                title={`Professional Exchange - Bill #${selectedSaleForAction?.billNo}`}
                size="lg"
            >
                <div className="space-y-6">
                    <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg flex gap-3 items-start border border-orange-100 dark:border-orange-900/30">
                        <ArrowLeftRight className="w-5 h-5 text-orange-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-orange-800 dark:text-orange-400 uppercase">Exchange Workflow</p>
                            <p className="text-xs text-orange-700 dark:text-orange-500">
                                {isSingleReturnItem
                                    ? '1. Returned item is auto-selected. 2. Select replacement items. 3. System calculates price difference.'
                                    : '1. Select items being returned. 2. Select replacement items. 3. System calculates price difference.'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Section A: Returns */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                <Undo2 className="w-3 h-3" /> {isSingleReturnItem ? 'Step 1: Returned Item (Auto-Selected)' : 'Step 1: Returned Items'}
                            </h4>
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                                {returnItems.map((item, idx) => (
                                    <div key={idx} className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-orange-300">
                                        <div className="font-bold text-sm truncate">{item.productName}</div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">{item.variantInfo}</span>
                                            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-md border border-gray-100">
                                                <button onClick={() => setReturnItems(prev => prev.map((it, i) => i === idx ? { ...it, returnQty: Math.max(0, it.returnQty - 1) } : it))} className="p-0.5 hover:bg-white rounded"><Minus className="w-3 h-3" /></button>
                                                <span className="w-4 text-center text-xs font-bold">{item.returnQty}</span>
                                                <button onClick={() => setReturnItems(prev => prev.map((it, i) => i === idx ? { ...it, returnQty: Math.min(it.quantity, it.returnQty + 1) } : it))} className="p-0.5 hover:bg-white rounded"><Plus className="w-3 h-3" /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section B: New Items Selector */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                <Plus className="w-3 h-3" /> Step 2: Replacement Items
                            </h4>
                            <div className="space-y-2">
                                <select
                                    className="w-full p-2 text-sm border-2 border-gray-100 rounded-lg outline-none focus:border-orange-400 h-10"
                                    onChange={(e) => {
                                        const variant = allProducts.find(p => p.id === e.target.value);
                                        if (variant && !exchangeNewItems.find(ni => ni.variantId === variant.id)) {
                                            setExchangeNewItems(prev => [...prev, {
                                                variantId: variant.id,
                                                productName: variant.product.name,
                                                variantInfo: `${variant.size || ''} ${variant.color || ''}`.trim(),
                                                sellingPrice: variant.sellingPrice,
                                                quantity: 1
                                            }]);
                                        }
                                    }}
                                >
                                    <option value="">Search & Select Product...</option>
                                    {allProducts.filter(p => p.stock > 0).map(p => (
                                        <option key={p.id} value={p.id}>{p.product.name} ({p.size} {p.color}) - ₹{p.sellingPrice}</option>
                                    ))}
                                </select>
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                    {exchangeNewItems.map((item, idx) => (
                                        <div key={idx} className="p-2 bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-lg flex justify-between items-center group">
                                            <div className="min-w-0 flex-1">
                                                <div className="text-xs font-bold truncate">{item.productName}</div>
                                                <div className="text-[9px] text-gray-500 uppercase">{item.variantInfo}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1 bg-white p-1 rounded-md border border-orange-200">
                                                    <button onClick={() => setExchangeNewItems(prev => prev.map((it, i) => i === idx ? { ...it, quantity: Math.max(1, it.quantity - 1) } : it))} className="p-0.5 hover:bg-gray-100 rounded"><Minus className="w-2.5 h-2.5" /></button>
                                                    <span className="w-4 text-center text-xs font-bold">{item.quantity}</span>
                                                    <button onClick={() => setExchangeNewItems(prev => prev.map((it, i) => i === idx ? { ...it, quantity: it.quantity + 1 } : it))} className="p-0.5 hover:bg-gray-100 rounded"><Plus className="w-2.5 h-2.5" /></button>
                                                </div>
                                                <button onClick={() => setExchangeNewItems(prev => prev.filter((_, i) => i !== idx))} className="p-1 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary Footer */}
                    <div className="pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="text-[10px] font-bold text-gray-400 uppercase">Returned Value</div>
                                <div className="text-sm font-black text-gray-700">
                                    {formatIndianCurrency(returnItems.reduce((sum, it) => sum + (it.sellingPrice * it.returnQty), 0))}
                                </div>
                            </div>
                            <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="text-[10px] font-bold text-gray-400 uppercase">New Item Total</div>
                                <div className="text-sm font-black text-gray-700">
                                    {formatIndianCurrency(exchangeNewItems.reduce((sum, it) => sum + (it.sellingPrice * it.quantity), 0))}
                                </div>
                            </div>
                            <div className="text-center p-3 rounded-xl bg-blue-50 border border-blue-100">
                                <div className="text-[10px] font-bold text-blue-400 uppercase">Final Difference</div>
                                <div className={`text-lg font-black ${exchangeNewItems.reduce((sum, it) => sum + (it.sellingPrice * it.quantity), 0) - returnItems.reduce((sum, it) => sum + (it.sellingPrice * it.returnQty), 0) > 0 ? 'text-blue-700' : 'text-green-700'}`}>
                                    {formatIndianCurrency(exchangeNewItems.reduce((sum, it) => sum + (it.sellingPrice * it.quantity), 0) - returnItems.reduce((sum, it) => sum + (it.sellingPrice * it.returnQty), 0))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-end gap-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                Replacement Payment
                            </label>
                            <select
                                value={replacementPaymentMethod}
                                onChange={(e) => setReplacementPaymentMethod(e.target.value as 'CASH' | 'CARD' | 'UPI')}
                                className="h-9 px-3 border-2 border-gray-200 rounded-lg text-sm font-bold bg-white dark:bg-gray-800"
                            >
                                <option value="CASH">CASH</option>
                                <option value="CARD">CARD</option>
                                <option value="UPI">UPI</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="secondary" onClick={() => setIsExchangeModalOpen(false)}>Cancel Workflow</Button>
                        <Button
                            variant="primary"
                            className="px-10 font-bold bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-100"
                            disabled={exchangeNewItems.length === 0 && returnItems.every(it => it.returnQty === 0)}
                            onClick={submitExchange}
                        >
                            Finalize Exchange
                        </Button>
                    </div>
                </div>
            </Modal>
            {/* Payment Mode Update Modal */}
            <Modal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                title={`Update Payment Mode - Bill #${selectedSaleForPaymentUpdate?.billNo}`}
                size="sm"
            >
                <div className="space-y-6">
                    <div className="bg-primary-50 dark:bg-primary-900/10 p-4 rounded-lg flex gap-3 items-start border border-primary-100 dark:border-primary-900/30">
                        <CreditCard className="w-5 h-5 text-primary-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-primary-800 dark:text-primary-400 uppercase">Change Payment Method</p>
                            <p className="text-xs text-primary-700 dark:text-primary-500">
                                Total Bill Amount: <span className="font-bold">{formatIndianCurrency(selectedSaleForPaymentUpdate?.grandTotal || 0)}</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {['CASH', 'UPI', 'CARD', 'SPLIT'].map((m) => (
                            <button
                                key={m}
                                onClick={() => setPaymentEditData({ ...paymentEditData, method: m as any })}
                                className={`py-3 px-4 rounded-xl border-2 font-black transition-all ${paymentEditData.method === m
                                    ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-200'
                                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-300'}`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>

                    {paymentEditData.method === 'SPLIT' && (
                        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-inner">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Cash Amount</label>
                                    <Input
                                        type="number"
                                        value={paymentEditData.cashAmount}
                                        onChange={(e) => setPaymentEditData({ ...paymentEditData, cashAmount: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">UPI Amount</label>
                                    <Input
                                        type="number"
                                        value={paymentEditData.upiAmount}
                                        onChange={(e) => setPaymentEditData({ ...paymentEditData, upiAmount: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Card Amount</label>
                                    <Input
                                        type="number"
                                        value={paymentEditData.cardAmount}
                                        onChange={(e) => setPaymentEditData({ ...paymentEditData, cardAmount: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className={`mt-4 pt-3 border-t border-dashed flex justify-between items-center ${Math.abs(((parseFloat(paymentEditData.cashAmount) || 0) + (parseFloat(paymentEditData.upiAmount) || 0) + (parseFloat(paymentEditData.cardAmount) || 0)) - (selectedSaleForPaymentUpdate?.grandTotal || 0)) < 0.01
                                ? 'border-green-200 text-green-600' : 'border-red-200 text-red-600'
                                }`}>
                                <span className="text-xs font-bold uppercase">Current Sum:</span>
                                <span className="text-lg font-black">
                                    {formatIndianCurrency((parseFloat(paymentEditData.cashAmount) || 0) + (parseFloat(paymentEditData.upiAmount) || 0) + (parseFloat(paymentEditData.cardAmount) || 0))}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsPaymentModalOpen(false)}>Cancel</Button>
                        <Button
                            variant="primary"
                            className="px-8 font-black uppercase"
                            disabled={isSavingPayment || (paymentEditData.method === 'SPLIT' && Math.abs(((parseFloat(paymentEditData.cashAmount) || 0) + (parseFloat(paymentEditData.upiAmount) || 0) + (parseFloat(paymentEditData.cardAmount) || 0)) - (selectedSaleForPaymentUpdate?.grandTotal || 0)) > 0.01)}
                            onClick={submitPaymentUpdate}
                        >
                            {isSavingPayment ? 'Updating...' : 'Confirm Update'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div >
    );
};
