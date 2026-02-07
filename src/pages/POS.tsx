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

    // New State for Header
    const [customerName, setCustomerName] = useState('Walk-in Customer');
    const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]);

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
            setBillDate(new Date().toISOString().split('T')[0]);
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
                    productName: variant.product.name,
                    variantInfo: `${variant.size || ''} ${variant.color || ''}`.trim(),
                    barcode: variant.barcode,
                    quantity: 1,
                    mrp: variant.mrp,
                    sellingPrice: variant.sellingPrice,
                    discount: 0,
                    taxRate: variant.product.taxRate,
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
        const paid = parseFloat(paidAmount) || 0;
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
        setBillDate(new Date().toISOString().split('T')[0]);
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

            let sale;

            if (currentSaleId) {
                // UPDATE EXISTING SALE
                const updateData: any = {
                    customerName: customerName || 'Walk-in Customer',
                    subtotal,
                    discount,
                    taxAmount: tax,
                    cgst,
                    sgst,
                    grandTotal: finalTotal,
                    paymentMethod,
                    paidAmount: paid,
                    changeAmount: change,
                    // For simplicity, we aren't diffing items exhaustively here, 
                    // but ideally we should reconcile items. 
                    // Given complexity, we'll log the generic update.
                };

                if (canBackDate && billDate) {
                    updateData.createdAt = new Date(billDate);
                }

                sale = await db.sales.update({
                    where: { id: currentSaleId },
                    data: updateData,
                });

                // Log Activity
                // Log Activity with Before/After details
                const detail = `Sale #${billNo} Updated (EXCHANGE). BEFORE: ₹${originalPaidAmount.toFixed(2)} | AFTER: ₹${finalTotal.toFixed(2)} | DIFF: ₹${(finalTotal - originalPaidAmount).toFixed(2)}. Customer: ${customerName}`;
                await auditService.log('SALE_UPDATE', detail);

                // Re-print
                if (shouldPrint) {
                    await printReceipt(sale);
                }
                alert("Sale Updated!");

            } else {
                // CREATE NEW SALE
                sale = await db.sales.create({
                    data: {
                        billNo,
                        userId: user!.id,
                        customerName: customerName || 'Walk-in Customer',
                        createdAt: new Date(billDate),
                        subtotal,
                        discount: discount, // Global discount amount
                        discountPercent: 0,
                        taxAmount: tax,
                        cgst,
                        sgst,
                        grandTotal: finalTotal,
                        paymentMethod,
                        paidAmount: paid,
                        changeAmount: change,
                        items: {
                            create: items.map((item: any) => ({
                                variantId: item.variantId,
                                productName: item.productName,
                                variantInfo: item.variantInfo,
                                quantity: item.quantity,
                                mrp: item.mrp,
                                sellingPrice: item.sellingPrice,
                                discount: item.discount, // This is item level
                                taxRate: item.taxRate,
                                taxAmount: (item.sellingPrice * item.quantity * item.taxRate) / (100 + item.taxRate),
                                total: item.sellingPrice * item.quantity - item.discount,
                            })),
                        },
                    },
                    include: {
                        items: true,
                    },
                });

                // Update stock
                for (const item of items) {
                    await db.productVariants.update({
                        where: { id: item.variantId },
                        data: {
                            stock: {
                                decrement: item.quantity,
                            },
                        },
                    });

                    // Create inventory movement
                    await db.inventoryMovements.create({
                        data: {
                            variantId: item.variantId,
                            type: 'OUT',
                            quantity: -item.quantity,
                            reason: 'Sale',
                            reference: sale.id,
                            createdBy: user!.id,
                        },
                    });
                }

                // Print receipt
                if (shouldPrint) {
                    await printReceipt(sale);
                }

                // Log
                // Log
                await auditService.log('SALE_CREATE', `New Sale #${billNo} Created. Total: ₹${finalTotal.toFixed(2)}. Customer: ${customerName}`);

                // Set Current Sale ID to allow "Editing"
                setCurrentSaleId(sale.id);

                // Trigger Cloud Sync (Real-time)
                db.syncNow().catch(err => console.error('Auto-sync failed:', err));
            }

            // DO NOT CLEAR CART - Keep state for review/edit
            // User can click "New Sale" to reset

        } catch (error) {
            console.error('Failed to complete sale:', error);
            alert('Failed to complete sale. Please try again.');
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
            normalize(p.product.name).includes(query) ||
            normalize(p.barcode).includes(query) ||
            (p.sku && normalize(p.sku).includes(query))
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
            < div className="flex-1 flex overflow-hidden" >

                {/* LEFT: Billing Table (75%) */}
                < div className="flex-[3] flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" >

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
                            // PAYMENT MODE FOOTER
                            <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-2">
                                {/* Row 1: Totals & Discount */}
                                <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2 mb-1">
                                    <div className="flex gap-4">
                                        <div className="font-bold text-gray-500">Subtotal: ₹{subtotal.toFixed(2)}</div>
                                        <div className="font-bold text-gray-500">Tax: ₹{tax.toFixed(2)}</div>
                                    </div>
                                    {currentSaleId && (
                                        <div className="flex flex-col items-end border-r pr-4 border-gray-300">
                                            <div className="text-[10px] uppercase font-bold text-gray-400">Original Paid</div>
                                            <div className="font-bold text-gray-500">₹{originalPaidAmount.toFixed(2)}</div>
                                        </div>
                                    )}
                                    <div className="flex flex-col items-end">
                                        <div className="text-[10px] uppercase font-bold text-gray-400">Grand Total</div>
                                        <div className="font-bold text-xl text-primary-600">₹{finalTotal.toFixed(2)}</div>
                                    </div>
                                    {currentSaleId && (
                                        <div className="flex flex-col items-end pl-4 border-l border-gray-300">
                                            <div className="text-[10px] uppercase font-bold text-gray-400">Balance Due</div>
                                            <div className={`font-bold text-xl ${finalTotal - originalPaidAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                ₹{(finalTotal - originalPaidAmount).toFixed(2)}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Row 2: Inputs & Actions */}
                                <div className="flex gap-2 h-14 items-center">

                                    {/* Discount Input */}
                                    <div className="relative w-32 h-full">
                                        <div className="absolute top-1 left-2 text-[10px] text-gray-400 uppercase font-bold tracking-wider">Discount (₹)</div>
                                        <Input
                                            ref={discountInputRef}
                                            type="number"
                                            value={discountAmount}
                                            onChange={(e) => setDiscountAmount(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    paidAmountInputRef.current?.focus();
                                                }
                                            }}
                                            className="w-full h-full text-xl font-bold text-right pt-4 px-2 border-2 border-orange-300 focus:border-orange-500 rounded-md disabled:bg-gray-100 disabled:text-gray-400"
                                            placeholder="0"
                                        />
                                    </div>

                                    {/* Payment Method Selector */}
                                    <div className="h-full flex flex-col justify-end pb-1 px-2">
                                        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 gap-1 h-10 border border-gray-200 dark:border-gray-600">
                                            <button
                                                onClick={() => setPaymentMethod('CASH')}
                                                className={`flex items-center justify-center w-12 rounded transition-all ${paymentMethod === 'CASH'
                                                    ? 'bg-green-100 text-green-700 shadow-sm border border-green-200 ring-1 ring-green-400 font-bold'
                                                    : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                    }`}
                                                title="Cash"
                                            >
                                                <Banknote className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setPaymentMethod('UPI')}
                                                className={`flex items-center justify-center w-12 rounded transition-all ${paymentMethod === 'UPI'
                                                    ? 'bg-purple-100 text-purple-700 shadow-sm border border-purple-200 ring-1 ring-purple-400 font-bold'
                                                    : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                    }`}
                                                title="UPI"
                                            >
                                                <Smartphone className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setPaymentMethod('CARD')}
                                                className={`flex items-center justify-center w-12 rounded transition-all ${paymentMethod === 'CARD'
                                                    ? 'bg-blue-100 text-blue-700 shadow-sm border border-blue-200 ring-1 ring-blue-400 font-bold'
                                                    : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                    }`}
                                                title="Card"
                                            >
                                                <CreditCard className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Paid Amount Input */}
                                    <div className="relative w-40 h-full">
                                        <div className="absolute top-1 left-2 text-[10px] text-gray-400 uppercase font-bold tracking-wider">Paid Amount</div>
                                        <Input
                                            ref={paidAmountInputRef}
                                            type="number"
                                            value={paidAmount}
                                            onChange={(e) => setPaidAmount(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (currentSaleId) {
                                                        handleNewSale();
                                                    } else {
                                                        // Default to Save & Print on Enter
                                                        handleCompleteSale(true);
                                                    }
                                                }
                                            }}
                                            className="w-full h-full text-2xl font-bold text-right pt-4 px-2 border-2 border-blue-500 focus:ring-0 rounded-md"
                                            placeholder="0"
                                        />
                                    </div>

                                    {/* Change Display (Static) */}
                                    <div className={`h-full min-w-[120px] px-4 rounded-md flex flex-col items-end justify-center border-2 ${change >= 0 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-300'}`}>
                                        <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Change</div>
                                        <div className={`text-2xl font-bold ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                            ₹{change.toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="flex-1"></div>

                                    {/* New Sale Button (Only if Sale Completed) */}
                                    {currentSaleId && (
                                        <Button
                                            variant="primary"
                                            className="h-full px-4 flex flex-col items-center justify-center border-2 border-blue-600 bg-blue-50 text-blue-700"
                                            onClick={handleNewSale}
                                        >
                                            <span className="text-xs uppercase font-bold">New Sale</span>
                                        </Button>
                                    )}

                                    {/* Complete Button */}
                                    <div className="flex gap-2 h-full">
                                        {/* Save Only Button */}
                                        <Button
                                            variant="primary"
                                            className="h-full px-4 text-lg font-bold flex flex-col items-center justify-center min-w-[100px]"
                                            onClick={() => handleCompleteSale(false)}
                                            disabled={processing}
                                        >
                                            <Save className="w-6 h-6" />
                                            <span className="text-xs uppercase mt-1">Save</span>
                                        </Button>

                                        {/* Save & Print Button */}
                                        <Button
                                            variant="success"
                                            className="h-full px-8 text-xl font-bold flex items-center justify-center min-w-[180px]"
                                            onClick={() => handleCompleteSale(true)}
                                            disabled={processing}
                                        >
                                            <Printer className="w-6 h-6 mr-2" />
                                            {processing ? 'Saving...' : (currentSaleId ? 'UPDATE & PRINT' : 'PAY & PRINT')}
                                        </Button>
                                    </div>

                                    {/* Cancel Button */}
                                    <Button
                                        variant="secondary"
                                        className="h-full px-4 flex items-center justify-center"
                                        onClick={() => setShowPayment(false)}
                                        disabled={processing}
                                    >
                                        <X className="w-6 h-6" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div >
                </div >

                {/* RIGHT: Product Sidebar (25%) */}
                < div className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col border-l border-gray-200 dark:border-gray-700" >

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
                </div >
            </div >
        </div >
    );
};
