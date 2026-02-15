import React, { useEffect, useState, useRef } from 'react';
import { CreditCard, Trash2, X, Plus, Minus, Scan, Save, Banknote, Smartphone, Printer } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { db } from '../lib/db';
import { printService } from '../services/print.service';
import { auditService } from '../services/audit.service';

import { useLocation } from 'react-router-dom';

export const POS: React.FC = () => {
    const location = useLocation();
    const [shopSettings, setShopSettings] = useState<any>(null);

    // Component State
    const [barcode, setBarcode] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [billNo, setBillNo] = useState(1);
    const [paidAmount, setPaidAmount] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Post-Sale Edit State
    const [currentSaleId, setCurrentSaleId] = useState<string | null>(null);
    const [originalPaidAmount, setOriginalPaidAmount] = useState(0);

    // Split Payment States
    const [splitAmounts, setSplitAmounts] = useState({ CASH: 0, CARD: 0, UPI: 0 });

    // New State for Header
    const [customerName, setCustomerName] = useState('Walk-in Customer');
    const [billDate, setBillDate] = useState(new Date().toLocaleDateString('en-CA'));

    const barcodeInputRef = useRef<HTMLInputElement>(null);
    const discountInputRef = useRef<HTMLInputElement>(null);
    const paidAmountInputRef = useRef<HTMLInputElement>(null);

    const user = useAuthStore((state) => state.user);
    const canBackDate = user?.role === 'ADMIN' || (user as any)?.permBackDateSale;

    const {
        items,
        paymentMethod,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getSubtotal,
        getTaxAmount,
        getGrandTotal,
        setPaymentMethod,
    } = useCartStore();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        // Check for sale in location state (Edit/Exchange mode)
        const saleToEdit = location.state?.sale;
        if (saleToEdit) {
            setBillNo(saleToEdit.billNo);
            setCurrentSaleId(saleToEdit.id);
            setCustomerName(saleToEdit.customerName || 'Walk-in Customer');
            if (saleToEdit.createdAt) {
                setBillDate(new Date(saleToEdit.createdAt).toISOString().split('T')[0]);
            }
            setPaymentMethod(saleToEdit.paymentMethod || 'CASH');
            setPaidAmount(saleToEdit.paidAmount?.toString() || '');
            setDiscountAmount(saleToEdit.discount?.toString() || '');
            setOriginalPaidAmount(saleToEdit.paidAmount || 0);
        } else {
            await loadNextBillNo();
            setBillDate(new Date().toLocaleDateString('en-CA'));
        }

        await loadProducts();
        await loadShopSettings();
    };

    const loadShopSettings = async () => {
        // Refresh User Permissions on Mount
        if (user?.id) {
            try {
                const res = await window.electronAPI.db.query({
                    model: 'user',
                    method: 'findUnique',
                    args: {
                        where: { id: user.id },
                        select: {
                            id: true,
                            username: true,
                            password: true,
                            name: true,
                            role: true,
                            isActive: true,
                            permPrintSticker: true,
                            permAddItem: true,
                            permDeleteProduct: true,
                            permVoidSale: true,
                            permViewReports: true,
                            permViewSales: true,
                            permViewGstReports: true,
                            permEditSettings: true,
                            permManageProducts: true,
                            permEditSales: true,
                            permManageInventory: true,
                            permManageUsers: true,
                            permViewCostPrice: true,
                            permChangePayment: true,
                            permDeleteAudit: true,
                            permBulkUpdate: true,
                            permBackDateSale: true,
                            permViewInsights: true,
                            maxDiscount: true,
                        }
                    }
                });
                if (res.success && res.data) {
                    const { password, ...safeUser } = res.data;
                    useAuthStore.getState().login(safeUser);
                }
            } catch (e) {
                console.error("Failed to refresh user permissions", e);
            }
        }

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

    const loadNextBillNo = async () => {
        try {
            const result = await window.electronAPI.sales.getNextBillNo();
            if (result.success) {
                setBillNo(result.data);
            }
        } catch (error) {
            console.error('Failed to load bill number:', error);
        }
    };

    const loadProducts = async () => {
        try {
            const variants = await db.productVariants.findMany({
                where: { isActive: true },
                include: {
                    product: {
                        include: { category: true }
                    }
                },
            });
            setProducts(variants);
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    };

    const handleBarcodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // If barcode is empty and we have items, go to checkout
        if (!barcode.trim()) {
            if (items.length > 0) {
                handleCheckout();
            }
            return;
        }

        try {
            const trimmedBarcode = barcode.trim();
            const variant = products.find((p) => p.barcode === trimmedBarcode || p.sku === trimmedBarcode);

            if (variant) {
                if (user?.role !== 'ADMIN' && !user?.permAddItem) {
                    alert('Permission Denied: You are not allowed to add items to sales.');
                    return;
                }
                addItem({
                    variantId: variant.id,
                    productName: variant.product?.name || 'Unknown Item',
                    variantInfo: `${variant.size || ''} ${variant.color || ''}`.trim(),
                    barcode: variant.barcode,
                    quantity: 1,
                    mrp: variant.mrp,
                    sellingPrice: variant.sellingPrice,
                    discount: 0,
                    taxRate: variant.product?.taxRate || 0,
                });
                setBarcode('');
            } else {
                alert(`Product not found! Scanned: "${barcode}"`);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleProductClick = (variant: any) => {
        if (user?.role !== 'ADMIN' && !user?.permAddItem) {
            alert('Permission Denied: You are not allowed to add items to sales.');
            return;
        }
        addItem({
            variantId: variant.id,
            productName: variant.product.name,
            variantInfo: `${variant.size || ''} ${variant.color || ''}`.trim(),
            barcode: variant.barcode,
            quantity: 1,
            mrp: variant.mrp,
            sellingPrice: variant.sellingPrice,
            discount: 0,
            taxRate: variant.product.taxRate,
        });
    };

    const handleCheckout = () => {
        if (items.length === 0) {
            alert('Cart is empty!');
            return;
        }
        setPaidAmount(getGrandTotal().toFixed(2));
        setDiscountAmount('');
        setShowPayment(true);
        // Focus Discount for everyone
        setTimeout(() => {
            discountInputRef.current?.focus();
        }, 100);
    };

    // Calculate Totals helper
    const calculateTotals = () => {
        const subtotal = getSubtotal();
        const tax = getTaxAmount();
        const discount = parseFloat(discountAmount) || 0;
        const total = getGrandTotal();
        const finalTotal = Math.max(0, total - discount); // Ensure no negative total

        const paid = paymentMethod === 'SPLIT'
            ? Object.values(splitAmounts).reduce((a, b) => a + b, 0)
            : (parseFloat(paidAmount) || 0);

        const change = paid - finalTotal;
        const balanceDue = finalTotal - originalPaidAmount;

        return { subtotal, tax, discount, finalTotal, paid, change, balanceDue };
    };


    // const handlePrintDraft = async () => {
    //     const { subtotal, tax, discount, finalTotal, paid, change } = calculateTotals();

    //     try {
    //         // Prepare Receipt Data (Mock Sale Object)
    //         const receiptData = {
    //             billNo: 'DRAFT', // Indicator
    //             date: new Date(),
    //             shopName: 'ZAIN GENTS PALACE',
    //             shopAddress: 'CHIRAMMAL TOWER, BEHIND CANARA BANK\nRAJA ROAD, NILESHWAR',
    //             shopPhone: '9037106449, 7907026827',
    //             gstin: '32PVGPS0686J1ZV',
    //             customerName: customerName || 'Walk-in Customer (Draft)',
    //             items: items.map((item: any) => ({
    //                 name: item.productName,
    //                 variantInfo: item.variantInfo,
    //                 quantity: item.quantity,
    //                 mrp: item.mrp,
    //                 rate: item.sellingPrice,
    //                 total: item.sellingPrice * item.quantity - item.discount,
    //             })),
    //             subtotal,
    //             discount, // Global discount
    //             cgst: tax / 2,
    //             sgst: tax / 2,
    //             grandTotal: finalTotal,
    //             paymentMethod: 'CASH',
    //             paidAmount: paid,
    //             changeAmount: change,
    //             userName: user!.name,
    //         };

    //         await printService.printReceipt(receiptData);
    //     } catch (error) {
    //         console.error("Draft print failed", error);
    //         alert("Draft print failed");
    //     }
    // };

    const handleNewSale = () => {
        clearCart();
        setPaidAmount('');
        setDiscountAmount('');
        setShowPayment(false);
        setCurrentSaleId(null);
        setOriginalPaidAmount(0);
        setCustomerName('Walk-in Customer');
        setBillDate(new Date().toLocaleDateString('en-CA'));
        loadNextBillNo();
        loadProducts(); // Refresh stock
        // Focus barcode
        setTimeout(() => barcodeInputRef.current?.focus(), 100);
    };

    const handleCompleteSale = async (shouldPrint = true) => {
        if (items.length === 0) return;

        const { tax, discount, finalTotal, paid, change } = calculateTotals();

        // Permission: Max Discount Check
        if (user?.role !== 'ADMIN' && discount > (user?.maxDiscount || 0)) {
            alert(`Permission Denied: Your maximum allowed discount is ₹${user?.maxDiscount || 0}. You tried to give ₹${discount}.`);
            return;
        }

        if (paid < finalTotal) {
            alert('Paid amount is less than total!');
            return;
        }

        setProcessing(true);

        try {
            const subtotal = getSubtotal();
            const cgst = tax / 2;
            const sgst = tax / 2;

            if (currentSaleId) {
                // If Sale ID is present, we are in UPDATE mode
                // Step 1: Check Permissions
                if (user?.role !== 'ADMIN' && !(user as any)?.permChangePayment) {
                    alert("Unauthorized: You do not have permission to change payment modes for finalized invoices.");
                    setProcessing(false);
                    return;
                }

                // Step 2: Prepare Payment Update Data
                const paymentData = {
                    paymentMethod: paymentMethod === 'SPLIT' ? 'SPLIT' : paymentMethod,
                    paidAmount: paymentMethod === 'SPLIT'
                        ? Object.values(splitAmounts).reduce((a, b) => a + b, 0)
                        : paid,
                    changeAmount: change,
                    payments: paymentMethod === 'SPLIT'
                        ? Object.entries(splitAmounts)
                            .filter(([_, amt]) => amt > 0)
                            .map(([mode, amt]) => ({ paymentMode: mode, amount: amt }))
                        : [{
                            paymentMode: paymentMethod,
                            amount: finalTotal
                        }]
                };

                const updateResult = await (window.electronAPI as any).sales.updatePayment({
                    saleId: currentSaleId,
                    paymentData,
                    userId: user!.id
                });

                if (updateResult.success) {
                    const sale = updateResult.data;
                    if (shouldPrint) {
                        await printReceipt(sale);
                    }
                    alert("Payment Information Updated Successfully!");
                    setProcessing(false);
                    return;
                } else {
                    throw new Error(updateResult.error);
                }
            }

            // Prepare Checkout Data (New Sale)
            const checkoutData = {
                billNo,
                userId: user!.id,
                customerName: customerName || 'Walk-in Customer',
                subtotal,
                discount,
                taxAmount: tax,
                cgst,
                sgst,
                grandTotal: finalTotal,
                paymentMethod: paymentMethod === 'SPLIT' ? 'SPLIT' : paymentMethod,
                paidAmount: paymentMethod === 'SPLIT'
                    ? Object.values(splitAmounts).reduce((a, b) => a + b, 0)
                    : paid,
                changeAmount: change,
                createdAt: billDate === new Date().toLocaleDateString('en-CA') ? undefined : new Date(billDate),
                items: items.map((item: any) => ({
                    variantId: item.variantId,
                    productName: item.productName,
                    variantInfo: item.variantInfo,
                    quantity: item.quantity,
                    mrp: item.mrp,
                    sellingPrice: item.sellingPrice,
                    discount: item.discount,
                    taxRate: item.taxRate,
                    taxAmount: (item.sellingPrice * item.quantity * item.taxRate) / (100 + item.taxRate),
                    total: item.sellingPrice * item.quantity - item.discount,
                })),
                payments: paymentMethod === 'SPLIT'
                    ? Object.entries(splitAmounts)
                        .filter(([_, amt]) => amt > 0)
                        .map(([mode, amt]) => ({ paymentMode: mode, amount: amt }))
                    : [{
                        paymentMode: paymentMethod,
                        amount: finalTotal
                    }]
            };

            const result = await window.electronAPI.sales.checkout(checkoutData);

            if (result.success) {
                const sale = result.data;
                // Print receipt
                if (shouldPrint) {
                    await printReceipt(sale);
                }

                // Set Current Sale ID to allow Review
                setCurrentSaleId(sale.id);
                alert("Sale Completed Successfully!");
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            console.error('Failed to complete sale:', error);
            alert(`Failed to complete sale: ${error.message || error}`);
        } finally {
            setProcessing(false);
        }
    };

    const printReceipt = async (sale: any) => {
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
                    total: item.total || 0,
                })),
                subtotal: sale.subtotal,
                discount: sale.discount,
                cgst: sale.cgst,
                sgst: sale.sgst,
                grandTotal: sale.grandTotal,
                paymentMethod: sale.paymentMethod,
                paidAmount: sale.paidAmount,
                changeAmount: sale.changeAmount,
                payments: sale.payments,
                userName: user?.name || 'Staff',
            };

            await printService.printReceipt(receiptData);
        } catch (error) {
            console.error('Failed to print receipt:', error);
            // Don't alert here to avoid blocking UI if print fails silently
        }
    };

    const filteredProducts = products.filter((p) => {
        // Search Filter
        if (!searchQuery) return true;
        // Normalize: remove all spaces and convert to lowercase
        const normalize = (str: string) => (str || '').toLowerCase().replace(/\s+/g, '');
        const query = normalize(searchQuery);

        return (
            normalize(p.product?.name || '').includes(query) ||
            normalize(p.barcode || '').includes(query) ||
            (p.sku && normalize(p.sku || '').includes(query))
        );
    });

    // Display helpers for Footer
    // Display helpers for Footer
    const { subtotal, tax, finalTotal, change } = calculateTotals();

    return (
        <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900" >
            {/* 1. TOP HEADER: Invoice Details */}
            < div className="bg-white dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4 text-sm shadow-sm" >
                <div className="flex flex-col">
                    <label className="text-gray-500 font-bold text-xs uppercase">Bill No</label>
                    <div className="font-mono font-bold text-lg bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded border border-gray-300">
                        {billNo}
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-500 font-bold text-xs uppercase">Date</label>
                    <input
                        type="date"
                        value={billDate}
                        onChange={(e) => setBillDate(e.target.value)}
                        readOnly={!canBackDate}
                        className={`input h-9 py-1 ${canBackDate ? 'bg-white' : 'bg-gray-100 text-gray-500 cursor-not-allowed'} focus:ring-0`}
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label className="text-gray-500 font-bold text-xs uppercase">Customer Name</label>
                    <Input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Walk-in Customer"
                        className="h-9"
                    />
                </div>
                {/* Barcode Scanner Input - Always Visible & Focused */}
                <div className="flex flex-col w-64" >
                    <label className="text-primary-600 font-bold text-xs uppercase flex items-center gap-1">
                        <Scan className="w-3 h-3" /> Scan Barcode (F1)
                    </label>
                    <form onSubmit={handleBarcodeSubmit} className="flex">
                        <input
                            ref={barcodeInputRef}
                            type="text"
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            placeholder="Scan..."
                            className="input h-9 text-lg font-mono border-primary-500 ring-1 ring-primary-200"
                            autoFocus
                        />
                    </form>
                </div >
            </div >

            {/* 2. MAIN CONTENT SPLIT */}
            <div className="flex-1 flex overflow-hidden min-h-0">

                {/* LEFT: Billing Table (75%) */}
                <div className="flex-[3] flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-0">

                    {/* Table Header */}
                    <div className="grid grid-cols-[40px_150px_1fr_80px_100px_60px_100px_40px] gap-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 text-xs font-bold uppercase text-gray-600 dark:text-gray-400 py-2 px-2">
                        <div className="text-center">#</div>
                        <div className="">Barcode</div>
                        <div className="">Item Name</div>
                        <div className="text-right">Rate</div>
                        <div className="text-center">Qty</div>
                        <div className="text-right">Tax%</div>
                        <div className="text-right">Total</div>
                        <div className="text-center"></div>
                    </div>

                    {/* Table Body (Scrollable) */}
                    <div className="flex-1 overflow-y-auto content-start">
                        {
                            items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-300">
                                    <Scan className="w-16 h-16 mb-4" />
                                    <p className="text-lg">No items in cart</p>
                                    <p className="text-sm">Scan barcode or search products</p>
                                </div>
                            ) : (
                                items.map((item: any, index: number) => (
                                    <div key={item.variantId} className="grid grid-cols-[40px_150px_1fr_80px_100px_60px_100px_40px] gap-2 border-b border-gray-100 dark:border-gray-700 text-sm py-1 px-2 hover:bg-blue-50 dark:hover:bg-gray-700 items-center group">
                                        <div className="text-center text-gray-500">{index + 1}</div>
                                        <div className="font-mono text-xs text-gray-500 truncate" title={item.barcode}>{item.barcode}</div>
                                        <div className="font-medium truncate" title={`${item.productName} ${item.variantInfo}`}>
                                            {item.productName}
                                            <span className="text-xs text-gray-400 ml-1">{item.variantInfo}</span>
                                        </div>
                                        <div className="text-right">₹{item.sellingPrice}</div>

                                        {/* Qty Controls */}
                                        <div className="flex items-center justify-center gap-1">
                                            <button onClick={() => updateQuantity(item.variantId, Math.max(1, item.quantity - 1))} className="p-0.5 hover:bg-gray-200 rounded text-gray-500">
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="font-bold w-6 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="p-0.5 hover:bg-gray-200 rounded text-gray-500">
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <div className="text-right text-xs text-gray-500">{item.taxRate}%</div>
                                        <div className="text-right font-bold text-gray-800 dark:text-gray-200">
                                            ₹{(item.sellingPrice * item.quantity).toFixed(2)}
                                        </div>

                                        {/* Delete Button */}
                                        <div className="text-center">
                                            <button
                                                onClick={() => removeItem(item.variantId)}
                                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>

                    {/* Footer Totals */}
                    < div className="bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 p-2 shadow-inner" >
                        {!showPayment ? (
                            // DEFAULT FOOTER VIEW
                            <div className="flex justify-between items-end h-full">
                                <div className="flex gap-6 text-sm text-gray-500 font-medium pb-4">
                                    <div>Items: <span className="font-bold text-gray-800 dark:text-white">{items.length}</span></div>
                                    <div>Qty: <span className="font-bold text-gray-800 dark:text-white">{items.reduce((s: number, i: any) => s + i.quantity, 0)}</span></div>
                                    <div>Tax: <span className="font-bold text-gray-800 dark:text-white">₹{tax.toFixed(2)}</span></div>
                                </div>

                                <div className="flex gap-4 items-end">
                                    <div className="text-right mb-4">
                                        <div className="text-xs uppercase text-gray-500">Grand Total</div>
                                        <div className="text-4xl font-bold text-primary-600 leading-none">
                                            ₹{finalTotal.toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="flex gap-2 h-14">
                                        <Button variant="danger" className="h-full px-6 flex items-center justify-center font-bold" onClick={clearCart} disabled={items.length === 0}>
                                            Clear (F4)
                                        </Button>
                                        <Button
                                            variant="success"
                                            className="h-full px-8 text-xl font-bold flex items-center justify-center tracking-wide"
                                            onClick={handleCheckout}
                                            disabled={items.length === 0}
                                        >
                                            <CreditCard className="w-6 h-6" /> Pay & Print
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // PAYMENT MODE FOOTER (REDESIGNED)
                            <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-2 p-1">
                                {/* Row 1: Unified Summary Bar (Premium Design) */}
                                <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg p-2 px-4 shadow-sm border border-gray-200 dark:border-gray-700">
                                    <div className="flex gap-6 items-center">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-gray-400">Subtotal</span>
                                            <span className="font-bold text-gray-700 dark:text-gray-200">₹{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-gray-400">Total Tax</span>
                                            <span className="font-bold text-gray-700 dark:text-gray-200">₹{tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-gray-400">Discount Applied</span>
                                            <span className="font-bold text-orange-600">₹{parseFloat(discountAmount || '0').toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {currentSaleId && originalPaidAmount > 0 && (
                                            <div className="flex flex-col items-end pr-4 border-r border-gray-200">
                                                <span className="text-[10px] uppercase font-bold text-gray-400">Previously Paid</span>
                                                <span className="font-bold text-gray-600">₹{originalPaidAmount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] uppercase font-bold text-primary-500">Net Payable</span>
                                            <span className="text-3xl font-black text-primary-600 tracking-tight leading-none">₹{finalTotal.toFixed(0)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2: Interaction Controls */}
                                <div className="flex flex-wrap lg:flex-nowrap gap-3 items-end">

                                    {/* Left: Settings (Discount & Payment Method) */}
                                    <div className="flex gap-2 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-inner">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[10px] uppercase font-bold text-gray-500 pl-1">Discount</label>
                                            <Input
                                                ref={discountInputRef}
                                                type="number"
                                                value={discountAmount}
                                                onChange={(e) => setDiscountAmount(e.target.value)}
                                                className="w-24 h-11 font-bold border-orange-200 focus:border-orange-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                placeholder="0"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[10px] uppercase font-bold text-gray-500 pl-1">Payment Method</label>
                                            <div className="flex bg-white dark:bg-gray-700 rounded-md p-1 gap-1 border border-gray-200 dark:border-gray-600 ring-1 ring-gray-100">
                                                {['CASH', 'UPI', 'CARD', 'SPLIT'].map((m) => {
                                                    const isActive = paymentMethod === m;
                                                    const colorClasses = {
                                                        CASH: isActive ? 'bg-green-600 text-white shadow-md ring-2 ring-green-100' : 'text-green-600 hover:bg-green-50',
                                                        UPI: isActive ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-100' : 'text-purple-600 hover:bg-purple-50',
                                                        CARD: isActive ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-100' : 'text-blue-600 hover:bg-blue-50',
                                                        SPLIT: isActive ? 'bg-orange-600 text-white shadow-md ring-2 ring-orange-100' : 'text-orange-600 hover:bg-orange-50'
                                                    } as any;

                                                    return (
                                                        <button
                                                            key={m}
                                                            onClick={() => {
                                                                setPaymentMethod(m as any);
                                                                if (m === 'SPLIT') setSplitAmounts({ CASH: 0, CARD: 0, UPI: 0 });
                                                            }}
                                                            className={`px-3 py-1 rounded text-[11px] font-bold uppercase transition-all ${colorClasses[m]}`}
                                                        >
                                                            {m === 'SPLIT' ? 'Split' : m}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle: Active Payment Inputs */}
                                    <div className="flex-1 min-w-[340px] h-18 flex items-end">
                                        {paymentMethod === 'SPLIT' ? (
                                            <div className="w-full flex gap-2 h-full items-end pb-1">
                                                {['CASH', 'CARD', 'UPI'].map((mode) => (
                                                    <div key={mode} className="flex-1 flex flex-col gap-1">
                                                        <label className="text-[9px] uppercase font-bold text-orange-500 pl-1">{mode}</label>
                                                        <Input
                                                            type="number"
                                                            value={(splitAmounts as any)[mode] || ''}
                                                            onChange={(e) => setSplitAmounts(prev => ({ ...prev, [mode]: parseFloat(e.target.value) || 0 }))}
                                                            className="h-11 text-center font-bold border-orange-300 bg-orange-50/30 px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                ))}
                                                <div className="flex flex-col gap-1 items-center px-1 pb-1">
                                                    <span className="text-[9px] uppercase font-bold text-gray-400">
                                                        {Object.values(splitAmounts).reduce((a, b) => a + b, 0) < finalTotal ? 'Need' : 'Status'}
                                                    </span>
                                                    <div className={`text-sm font-black p-1.5 rounded-md border min-w-[70px] text-center ${Object.values(splitAmounts).reduce((a, b) => a + b, 0) >= finalTotal
                                                        ? 'text-green-600 bg-green-50 border-green-200'
                                                        : 'text-red-600 bg-red-50 border-red-200 shadow-sm'
                                                        }`}>
                                                        {Object.values(splitAmounts).reduce((a, b) => a + b, 0) < finalTotal
                                                            ? `₹${(finalTotal - Object.values(splitAmounts).reduce((a, b) => a + b, 0)).toFixed(0)}`
                                                            : `₹${Object.values(splitAmounts).reduce((a, b) => a + b, 0).toFixed(0)}`
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full flex gap-3 h-full items-end pb-1">
                                                <div className="flex-1 flex flex-col gap-1">
                                                    <label className="text-[10px] uppercase font-bold text-primary-500 pl-1">Amount Paid ({paymentMethod})</label>
                                                    <Input
                                                        ref={paidAmountInputRef}
                                                        type="number"
                                                        value={paidAmount}
                                                        onChange={(e) => setPaidAmount(e.target.value)}
                                                        className="h-12 text-2xl font-black border-2 border-primary-500 px-3 selection:bg-primary-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div className={`flex flex-col gap-1 items-end min-w-[130px] p-2 rounded-lg border-2 ${change >= 0 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-300'}`}>
                                                    <span className="text-[10px] uppercase font-bold text-gray-500">{change >= 0 ? 'Change Due' : 'Need Amount'}</span>
                                                    <span className={`text-2xl font-black ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}>₹{Math.abs(change).toFixed(0)}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Actions */}
                                    <div className="flex gap-3 pb-1 h-15 items-stretch">
                                        {currentSaleId && (
                                            <Button
                                                variant="outline"
                                                className="h-full px-4 flex flex-col items-center justify-center font-bold border-2 border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-300 transition-all rounded-xl"
                                                onClick={handleNewSale}
                                            >
                                                <Plus className="w-5 h-5 mb-1" />
                                                <span className="text-[10px] uppercase tracking-wider">New Sale</span>
                                            </Button>
                                        )}

                                        <Button
                                            variant="outline"
                                            className="h-full px-6 flex flex-col items-center justify-center font-bold border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md transition-all active:scale-[0.98] rounded-xl group"
                                            onClick={() => handleCompleteSale(false)}
                                            disabled={processing}
                                        >
                                            <Save className="w-6 h-6 mb-1 text-gray-400 group-hover:text-primary-500 transition-colors" />
                                            <span className="text-[11px] uppercase tracking-wide">Save Sale</span>
                                        </Button>

                                        <Button
                                            variant="success"
                                            className="h-full px-10 flex items-center justify-center min-w-[260px] shadow-xl shadow-green-100 dark:shadow-none bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white transition-all active:scale-[0.98] rounded-xl relative overflow-hidden group border-0"
                                            onClick={() => handleCompleteSale(true)}
                                            disabled={processing}
                                        >
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <Printer className="w-7 h-7 mr-4 drop-shadow-md" />
                                            <div className="flex flex-col items-start leading-tight">
                                                <span className="text-[11px] uppercase font-bold opacity-90 tracking-widest mb-0.5">Finalize Order</span>
                                                <span className="text-2xl font-black tracking-tight uppercase">
                                                    {processing ? '...' : (currentSaleId ? 'UPDATE & PRINT' : 'COMPLETE SALE')}
                                                </span>
                                            </div>
                                        </Button>

                                        <button
                                            onClick={() => setShowPayment(false)}
                                            className="h-full px-4 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all ml-1 border-2 border-transparent hover:border-red-100 dark:hover:border-red-900/30"
                                            disabled={processing}
                                        >
                                            <X className="w-7 h-7" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div >
                </div >

                {/* RIGHT: Product Sidebar (Fixed Width to prevent overflow) - Only show when NOT in payment mode */}
                {!showPayment && (
                    <div className="w-72 bg-gray-50 dark:bg-gray-900 flex flex-col border-l border-gray-200 dark:border-gray-700 min-h-0 flex-shrink-0">
                        <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Item (F3)..."
                                className="h-10 text-sm"
                                autoFocus={false}
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto p-2 space-y-2">
                            {filteredProducts.map((variant) => (
                                <button
                                    key={variant.id}
                                    onClick={() => handleProductClick(variant)}
                                    className="w-full text-left p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm hover:border-primary-500 flex justify-between items-center group"
                                >
                                    <div className="min-w-0">
                                        <div className="font-medium text-sm truncate">{variant.product.name}</div>
                                        <div className="text-xs text-gray-500">{variant.sku || variant.barcode}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-primary-600">₹{variant.sellingPrice}</div>
                                        <div className={`text-[10px] ${variant.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                            Stock: {variant.stock}
                                        </div>
                                    </div>
                                </button>
                            ))}
                            {filteredProducts.length === 0 && (
                                <div className="text-center text-gray-400 text-sm mt-10">No items found</div>
                            )}
                        </div>
                    </div>
                )}
            </div >
        </div >
    );
};
