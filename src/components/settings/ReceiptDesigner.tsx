
import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Type, Image as ImageIcon, Layout, AlignLeft, AlignCenter, AlignRight, Bold, RotateCcw, CreditCard, Menu, DollarSign, Percent, Hash } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { db } from '../../lib/db';
import { DEFAULT_RECEIPT_PRINTER_CONFIG, generateReceiptHtml, type ReceiptData, type ReceiptPrinterConfig } from '../../services/print.service';

// --- Types ---

export interface ReceiptBlock {
    id: string;
    type: 'logo' | 'text' | 'header' | 'bill_info' | 'divider' | 'items_table' | 'totals' | 'footer' | 'spacer' |
    'header_row_1' | 'shop_title' | 'section_shop_title' | 'shop_details' | 'user_line' | 'grand_total' | 'item_count' | 'amount_words' | 'tax_breakdown' | 'totals';
    content?: string;
    styles: {
        align?: 'left' | 'center' | 'right';
        fontSize?: number;
        bold?: boolean;
        marginTop?: number;
        marginBottom?: number;
        showVariantInfo?: boolean;
        tableHeaderBold?: boolean;
        tableRowBold?: boolean;
    };
    visible: boolean;
}

const DEFAULT_LAYOUT: ReceiptBlock[] = [
    { id: '1', type: 'header', content: 'TAX INVOICE', visible: true, styles: { align: 'center', fontSize: 14, bold: true, marginBottom: 5 } },
    { id: '2', type: 'section_shop_title', content: '{{shopName}}', visible: true, styles: { align: 'center', fontSize: 16, bold: true } },
    { id: '3', type: 'text', content: '{{address}}\nPh: {{phone}}\nGSTIN: {{gstin}}', visible: true, styles: { align: 'center', fontSize: 11 } },
    { id: '4', type: 'divider', visible: true, styles: { marginTop: 5, marginBottom: 5 } },
    { id: '5', type: 'bill_info', visible: true, styles: { fontSize: 11, bold: true } },
    { id: '6', type: 'divider', visible: true, styles: { marginTop: 5, marginBottom: 5 } },
    { id: '7', type: 'items_table', visible: true, styles: { fontSize: 11, showVariantInfo: false, tableHeaderBold: true, tableRowBold: false } },
    { id: '8', type: 'divider', visible: true, styles: { marginTop: 5, marginBottom: 5 } },
    { id: '9', type: 'totals', visible: true, styles: { align: 'right', fontSize: 11 } },
    { id: '10', type: 'divider', visible: true, styles: { marginTop: 5, marginBottom: 5 } },
    { id: '11', type: 'footer', content: 'Thank You! Visit Again', visible: true, styles: { align: 'center', fontSize: 11, marginBottom: 10 } },
    { id: '12', type: 'text', content: 'Authorised Signatory', visible: true, styles: { align: 'right', fontSize: 11, marginTop: 20 } }
];

// --- Sortable Item Component ---
const SortableBlock = ({ block, onRemove, onEdit, isSelected }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className={`bg-white dark:bg-gray-800 border p-3 rounded mb-2 flex items-center gap-3 ${isSelected ? 'border-primary-500 ring-1 ring-primary-500' : 'border-gray-200 dark:border-gray-700'}`}>
            <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
                <GripVertical className="w-5 h-5" />
            </div>

            <div className="flex-1 cursor-pointer" onClick={() => onEdit(block)}>
                <div className="flex items-center gap-2 mb-1">
                    {getBlockIcon(block.type)}
                    <span className="font-bold text-sm capitalize">{block.type.replace('_', ' ')}</span>
                    {!block.visible && <span className="text-xs bg-gray-100 text-gray-500 px-1 rounded">Hidden</span>}
                </div>
                {block.content && <div className="text-xs text-gray-500 truncate font-mono">{block.content}</div>}
            </div>

            <button onClick={() => onRemove(block.id)} className="text-gray-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
};

const getBlockIcon = (type: string) => {
    switch (type) {
        case 'logo': return <ImageIcon className="w-4 h-4 text-blue-500" />;
        case 'text': return <Type className="w-4 h-4 text-gray-500" />;
        case 'header_row_1': return <CreditCard className="w-4 h-4 text-purple-500" />;
        case 'shop_title':
        case 'shop_details': return <Type className="w-4 h-4 text-blue-600" />;
        case 'items_table': return <Menu className="w-4 h-4 text-orange-500" />;
        case 'grand_total': return <DollarSign className="w-4 h-4 text-green-600" />;
        case 'tax_breakdown': return <Percent className="w-4 h-4 text-red-500" />;
        case 'item_count': return <Hash className="w-4 h-4 text-gray-600" />;
        case 'amount_words': return <Type className="w-4 h-4 text-indigo-500" />;
        case 'divider': return <div className="w-4 border-b border-dashed border-gray-400" />;
        default: return <Layout className="w-4 h-4 text-gray-400" />;
    }
};

// --- Main Designer Component ---
export const ReceiptDesigner: React.FC = () => {
    const [blocks, setBlocks] = useState<ReceiptBlock[]>(DEFAULT_LAYOUT);
    const [selectedBlock, setSelectedBlock] = useState<ReceiptBlock | null>(null);
    const [saving, setSaving] = useState(false);
    const [previewHtml, setPreviewHtml] = useState('');
    const [printerConfig, setPrinterConfig] = useState<ReceiptPrinterConfig>(DEFAULT_RECEIPT_PRINTER_CONFIG);
    const [shopDetails, setShopDetails] = useState({
        shopName: 'YOUR SHOP NAME',
        address: '123 Business Street, City',
        phone: '0000000000',
        gstin: 'GSTINPlaceholder'
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    useEffect(() => {
        loadLayout();
        loadShopDetails();
        loadPrinterConfig();
    }, []);

    useEffect(() => {
        const previewData: ReceiptData = {
            billNo: 1172,
            date: new Date(),
            shopName: shopDetails.shopName || 'YOUR SHOP NAME',
            shopAddress: shopDetails.address || '',
            shopPhone: shopDetails.phone || '',
            gstin: shopDetails.gstin || '',
            customerName: 'Walk-in',
            items: [
                { name: 'Sample Item', variantInfo: 'Size M', quantity: 1, mrp: 140, rate: 135, discount: 0, taxRate: 5, total: 135 },
            ],
            subtotal: 135,
            discount: 0,
            cgst: 3.21,
            sgst: 3.21,
            grandTotal: 135,
            paymentMethod: 'CASH',
            paidAmount: 135,
            changeAmount: 0,
            payments: [{ paymentMode: 'CASH', amount: 135 }],
            userName: 'Admin',
            logo: (shopDetails as any).logo || '',
        };

        setPreviewHtml(generateReceiptHtml(previewData, blocks, printerConfig, { interactive: true, selectedBlockId: selectedBlock?.id || undefined }));
    }, [blocks, shopDetails, printerConfig, selectedBlock]);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            const payload: any = event.data;
            if (!payload || payload.type !== 'receipt-preview-select' || !payload.blockId) return;
            const match = blocks.find((b) => b.id === payload.blockId);
            if (match) setSelectedBlock(match);
        };
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, [blocks]);

    const loadShopDetails = async () => {
        try {
            const result = await db.settings.findUnique({ where: { key: 'SHOP_SETTINGS' } });
            if (result && result.value) {
                const data = JSON.parse(result.value);
                setShopDetails(data);
            }
        } catch (error) {
            console.error("Failed to load shop settings", error);
        }
    };

    const loadLayout = async () => {
        try {
            const result = await db.settings.findUnique({ where: { key: 'RECEIPT_LAYOUT' } });
            if (result && result.value) {
                setBlocks(JSON.parse(result.value));
            }
        } catch (error) {
            console.error("Failed to load layout", error);
        }
    };

    const loadPrinterConfig = async () => {
        try {
            const result = await db.settings.findUnique({ where: { key: 'PRINTER_CONFIG' } });
            if (result && result.value) {
                setPrinterConfig({ ...DEFAULT_RECEIPT_PRINTER_CONFIG, ...JSON.parse(result.value) });
            }
        } catch (error) {
            console.error("Failed to load printer config", error);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await db.settings.upsert({
                where: { key: 'RECEIPT_LAYOUT' },
                create: { key: 'RECEIPT_LAYOUT', value: JSON.stringify(blocks) },
                update: { value: JSON.stringify(blocks) }
            });
            alert('Layout saved successfully!');
        } catch (error) {
            console.error('Failed to save layout:', error);
            alert('Failed to save layout');
        } finally {
            setSaving(false);
        }
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setBlocks((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset to the default layout?')) {
            setBlocks(DEFAULT_LAYOUT);
            setSelectedBlock(null);
        }
    };

    const addBlock = (type: ReceiptBlock['type']) => {
        const newBlock: ReceiptBlock = {
            id: Date.now().toString(),
            type,
            content: type === 'text' ? 'New Text' : '',
            styles: { align: 'center', fontSize: 10, bold: false },
            visible: true
        };
        setBlocks([...blocks, newBlock]);
        setSelectedBlock(newBlock);
    };

    const updateSelectedBlock = (updates: Partial<ReceiptBlock> | Partial<ReceiptBlock['styles']>) => {
        if (!selectedBlock) return;
        let updatedBlock;
        if (
            'align' in updates ||
            'fontSize' in updates ||
            'bold' in updates ||
            'marginTop' in updates ||
            'marginBottom' in updates ||
            'showVariantInfo' in updates ||
            'tableHeaderBold' in updates ||
            'tableRowBold' in updates
        ) {
            updatedBlock = { ...selectedBlock, styles: { ...selectedBlock.styles, ...updates } };
        } else {
            updatedBlock = { ...selectedBlock, ...updates };
        }
        setSelectedBlock(updatedBlock);
        setBlocks(blocks.map(b => b.id === selectedBlock.id ? updatedBlock : b));
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
        if (selectedBlock?.id === id) setSelectedBlock(null);
    };

    // --- Unified Render Function to Prevent Doubling ---
    const renderBlockContent = (block: ReceiptBlock) => {
        switch (block.type) {
            case 'logo':
                return <div className="bg-gray-200 h-16 flex items-center justify-center text-xs text-gray-500 font-mono border border-dashed border-gray-400 mb-2">[LOGO]</div>;

            case 'header_row_1':
                return (
                    <div className="flex justify-between font-bold text-[10px] mb-1">
                        <span>Date: {new Date().toLocaleDateString('en-GB')} {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>Bill No: 1172</span>
                    </div>
                );

            case 'shop_title':
            case 'section_shop_title': // Handle the new type from default layout
            case 'shop_details':
            case 'text':
            case 'header': // Added header support
                return (
                    <div className="whitespace-pre-line">
                        {block.content
                            ?.replace(/{{shopName}}/g, shopDetails.shopName || 'Shop Name')
                            .replace(/{{address}}/g, shopDetails.address || 'Address')
                            .replace(/{{phone}}/g, shopDetails.phone || 'Phone')
                            .replace(/{{gstin}}/g, shopDetails.gstin || 'GSTIN')}
                    </div>
                );

            case 'bill_info':
                return (
                    <div className="flex justify-between font-bold text-[10px]">
                        <div className="text-left">
                            <div>Bill No: 1172</div>
                            <div>Date: {new Date().toLocaleDateString('en-GB')}</div>
                        </div>
                        <div className="text-right">
                            <div>Customer: Walk-in</div>
                        </div>
                    </div>
                );

            case 'totals':
                return (
                    <div className="text-[10px]" style={{ textAlign: 'right' }}>
                        <table className="w-full text-right" style={{ fontSize: 'inherit' }}>
                            <tbody>
                                <tr><td>Total Items:</td><td>2</td></tr>
                                <tr><td>Basic Amt:</td><td>128.57</td></tr>
                                <tr><td>Less Discount:</td><td>0.00</td></tr>
                                <tr><td>CGST:</td><td>3.21</td></tr>
                                <tr><td>SGST:</td><td>3.21</td></tr>
                                <tr className="font-bold border-t border-b border-dashed border-black">
                                    <td className="py-1">NET AMOUNT:</td>
                                    <td className="py-1">₹135.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );

            case 'user_line':
                return <div className="text-[10px]">User : Administrator</div>;

            case 'divider':
                return <div className="border-t border-dashed border-black"></div>;

            case 'items_table':
                return (
                    <table className="w-full text-left text-[9px] border-collapse">
                        <thead className="border-b border-dashed border-black">
                            <tr>
                                <th className="text-center w-[5%] py-1">#</th>
                                <th className="text-left w-auto py-1">Item</th>
                                <th className="text-center w-[10%] py-1">Qty</th>
                                <th className="text-right w-[15%] py-1">MRP</th>
                                <th className="text-right w-[15%] py-1">Rate</th>
                                <th className="text-right w-[10%] py-1">Dis</th>
                                <th className="text-right w-[20%] py-1">Amt</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center py-1">1</td>
                                <td className="font-bold py-1">S K C Baniyan 135</td>
                                <td className="text-center py-1">1</td>
                                <td className="text-right py-1">140.00</td>
                                <td className="text-right py-1">135.00</td>
                                <td className="text-right py-1">0.00</td>
                                <td className="text-right font-bold py-1">135.00</td>
                            </tr>
                        </tbody>
                    </table>
                );

            case 'grand_total':
                return (
                    <div className="flex justify-between items-center py-1 border-t border-b border-dashed border-black">
                        <div className="font-bold text-sm">Grand Total</div>
                        <div className="font-bold text-lg">135.00</div>
                    </div>
                );

            case 'item_count':
                return <div className="text-center text-[10px]">Items : 1</div>;

            case 'amount_words':
                return <div className="font-medium text-[9px] italic">Rupees One Hundred Thirty Five only</div>;

            case 'tax_breakdown':
                return (
                    <div className="text-[8px]">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="border-t border-black">
                                    <th className="text-left">Tax Slab</th>
                                    <th>Basic</th>
                                    <th>CGST</th>
                                    <th>SGST</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody className="border-t border-black border-dashed">
                                <tr>
                                    <td className="text-left">GST @ 5.00%</td>
                                    <td>128.57</td>
                                    <td>3.21</td>
                                    <td>3.21</td>
                                    <td>135.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );

            case 'footer':
                return <div className="whitespace-pre-line text-[10px]">{block.content || 'Footer Text'}</div>;

            case 'spacer':
                return <div style={{ height: block.styles.marginTop || 20 }}></div>;

            default:
                return null;
        }
    };

    return (
        <div className="flex h-[calc(100vh-140px)] gap-4">
            {/* LEFT: Tools & Layers */}
            <div className="w-80 flex flex-col gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                    <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">Add Elements</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="secondary" size="sm" onClick={() => addBlock('header')} className="justify-start"><Type className="w-4 h-4 mr-2" /> Header</Button>
                        <Button variant="secondary" size="sm" onClick={() => addBlock('section_shop_title')} className="justify-start"><Type className="w-4 h-4 mr-2" /> Shop Title</Button>
                        <Button variant="secondary" size="sm" onClick={() => addBlock('bill_info')} className="justify-start"><CreditCard className="w-4 h-4 mr-2" /> Bill Info</Button>
                        <Button variant="secondary" size="sm" onClick={() => addBlock('items_table')} className="justify-start"><Menu className="w-4 h-4 mr-2" /> Items Table</Button>
                        <Button variant="secondary" size="sm" onClick={() => addBlock('totals')} className="justify-start"><DollarSign className="w-4 h-4 mr-2" /> Totals</Button>
                        <Button variant="secondary" size="sm" onClick={() => addBlock('text')} className="justify-start"><Type className="w-4 h-4 mr-2" /> Text</Button>
                        <Button variant="secondary" size="sm" onClick={() => addBlock('divider')} className="justify-start"><div className="w-4 border-b border-dashed border-gray-500 mr-2"></div> Divider</Button>
                        <Button variant="secondary" size="sm" onClick={() => addBlock('logo')} className="justify-start"><ImageIcon className="w-4 h-4 mr-2" /> Logo</Button>
                        <Button variant="secondary" size="sm" onClick={() => addBlock('spacer')} className="justify-start"><div className="w-4 h-4 mr-2 border border-dashed border-gray-400"></div> Spacer</Button>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col">
                    <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">Layers (Drag to Reorder)</h3>
                    <div className="flex-1 overflow-y-auto pr-2">
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                                {blocks.map((block) => (
                                    <SortableBlock key={block.id} block={block} onRemove={removeBlock} onEdit={setSelectedBlock} isSelected={selectedBlock?.id === block.id} />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>
            </div>

            {/* MIDDLE: Preview Canvas */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 flex justify-center p-8 overflow-y-auto">
                <div className="bg-white text-black shadow-lg w-[320px] min-h-[400px] overflow-hidden border border-gray-200">
                    <iframe
                        title="Receipt Preview"
                        srcDoc={previewHtml}
                        className="w-full h-[760px] border-0 bg-white"
                        sandbox="allow-scripts"
                    />
                </div>
            </div>

            {/* RIGHT: Properties Panel */}
            <div className="w-72 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Properties</h3>
                    <div className="flex gap-1">
                        <Button size="sm" variant="secondary" onClick={handleReset} title="Reset to Default"><RotateCcw className="w-4 h-4" /></Button>
                        <Button size="sm" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                    </div>
                </div>

                {selectedBlock ? (
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Type: {selectedBlock.type}</label>
                        </div>

                        {(selectedBlock.type === 'text' || selectedBlock.type === 'header' || selectedBlock.type === 'footer' || selectedBlock.type === 'shop_title' || selectedBlock.type === 'section_shop_title' || selectedBlock.type === 'shop_details') && (
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Content</label>
                                <textarea className="input w-full h-20 text-sm" value={selectedBlock.content} onChange={(e) => updateSelectedBlock({ content: e.target.value })} />
                                <p className="text-[10px] text-gray-400 mt-1">Shortcodes: {"{{shopName}}"}, {"{{address}}"}, {"{{phone}}"}, {"{{gstin}}"}</p>
                            </div>
                        )}

                        {selectedBlock.type === 'items_table' && (
                            <div className="space-y-2 p-3 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                                <label className="text-xs font-bold text-gray-500 uppercase">Items Table Options</label>
                                <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
                                    <input
                                        type="checkbox"
                                        checked={selectedBlock.styles.showVariantInfo === true}
                                        onChange={(e) => updateSelectedBlock({ showVariantInfo: e.target.checked })}
                                    />
                                    <span>Show Item Size / Variant</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
                                    <input
                                        type="checkbox"
                                        checked={selectedBlock.styles.tableHeaderBold !== false}
                                        onChange={(e) => updateSelectedBlock({ tableHeaderBold: e.target.checked })}
                                    />
                                    <span>Header Bold</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
                                    <input
                                        type="checkbox"
                                        checked={selectedBlock.styles.tableRowBold === true}
                                        onChange={(e) => updateSelectedBlock({ tableRowBold: e.target.checked })}
                                    />
                                    <span>Item Rows Bold</span>
                                </label>
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Align & Style</label>
                            <div className="flex bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 p-1">
                                <button onClick={() => updateSelectedBlock({ align: 'left' })} className={`flex-1 p-1 rounded ${selectedBlock.styles.align === 'left' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}><AlignLeft className="w-4 h-4 mx-auto" /></button>
                                <button onClick={() => updateSelectedBlock({ align: 'center' })} className={`flex-1 p-1 rounded ${selectedBlock.styles.align === 'center' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}><AlignCenter className="w-4 h-4 mx-auto" /></button>
                                <button onClick={() => updateSelectedBlock({ align: 'right' })} className={`flex-1 p-1 rounded ${selectedBlock.styles.align === 'right' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}><AlignRight className="w-4 h-4 mx-auto" /></button>
                                <button onClick={() => updateSelectedBlock({ bold: !selectedBlock.styles.bold })} className={`flex-1 p-1 rounded border-l ${selectedBlock.styles.bold ? 'bg-gray-200 dark:bg-gray-700' : ''}`}><Bold className="w-4 h-4 mx-auto" /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Size</label>
                                <Input type="number" value={selectedBlock.styles.fontSize} onChange={(e) => updateSelectedBlock({ fontSize: parseInt(e.target.value) })} />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Visible</label>
                                <div className="h-10 flex items-center"><input type="checkbox" checked={selectedBlock.visible} onChange={(e) => updateSelectedBlock({ visible: e.target.checked })} /></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Margin T</label>
                                <Input type="number" value={selectedBlock.styles.marginTop || 0} onChange={(e) => updateSelectedBlock({ marginTop: parseInt(e.target.value) })} />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Margin B</label>
                                <Input type="number" value={selectedBlock.styles.marginBottom || 0} onChange={(e) => updateSelectedBlock({ marginBottom: parseInt(e.target.value) })} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-400 mt-10 italic text-sm">Select a block to edit</div>
                )}
            </div>
        </div>
    );
};
