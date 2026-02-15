
import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Type, Image as ImageIcon, Layout, AlignLeft, AlignCenter, AlignRight, Bold, Columns, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { db } from '../../lib/db';

// --- Types ---
export interface LabelBlock {
    id: string;
    type: 'shop_name' | 'product_name' | 'price' | 'barcode' | 'product_code' | 'meta_row' | 'text' | 'divider' | 'spacer';
    content?: string;
    styles: {
        align?: 'left' | 'center' | 'right';
        fontSize?: number;
        bold?: boolean;
        marginTop?: number;
        marginBottom?: number;
        height?: number; // for barcode height or spacer
    };
    visible: boolean;
}

const DEFAULT_LABEL_LAYOUT: LabelBlock[] = [
    { id: '1', type: 'shop_name', styles: { align: 'left', fontSize: 10, bold: true, marginBottom: 0 }, visible: true },
    { id: '2', type: 'product_name', styles: { align: 'left', fontSize: 8, bold: false, marginBottom: 2 }, visible: true },
    { id: '3', type: 'barcode', styles: { align: 'left', height: 45, marginBottom: 0 }, visible: true },
    { id: '4', type: 'text', content: '4649350', styles: { align: 'left', fontSize: 8, bold: false, marginBottom: 0 }, visible: true },
    { id: '5', type: 'price', styles: { align: 'left', fontSize: 12, bold: true, marginBottom: 0 }, visible: true },
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
            </div>

            <button onClick={() => onRemove(block.id)} className="text-gray-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
};

const getBlockIcon = (type: string) => {
    switch (type) {
        case 'barcode': return <ImageIcon className="w-4 h-4 text-blue-500" />;
        case 'text':
        case 'shop_name':
        case 'product_name': return <Type className="w-4 h-4 text-gray-500" />;
        case 'meta_row': return <Columns className="w-4 h-4 text-green-500" />;
        default: return <Layout className="w-4 h-4 text-gray-400" />;
    }
};

// --- Main Designer Component ---
export const LabelDesigner: React.FC = () => {
    const [blocks, setBlocks] = useState<LabelBlock[]>(DEFAULT_LABEL_LAYOUT);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [shopDetails, setShopDetails] = useState({
        shopName: 'Zain POS',
    });
    const [stickConfig, setStickConfig] = useState({
        width: 32,
        height: 18,
        perRow: 2,
        gapX: 8,
        gapY: 9,
        marginLeft: 15,
        marginTop: 20,
        contentScale: 75
    });

    const selectedBlock = blocks.find(b => b.id === selectedId) || null;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    useEffect(() => {
        loadLayout();
        loadShopDetails();
        loadStickerConfig();
    }, []);

    const loadStickerConfig = async () => {
        try {
            const res = await db.settings.findUnique({ where: { key: 'STICKER_PRINT_CONFIG' } });
            if (res && res.value) {
                setStickConfig(JSON.parse(res.value));
            }
        } catch (e) { console.error(e); }
    };

    const loadShopDetails = async () => {
        try {
            const result = await db.settings.findUnique({ where: { key: 'SHOP_SETTINGS' } });
            if (result && result.value) {
                setShopDetails(JSON.parse(result.value));
            }
        } catch (error) {
            console.error("Failed to load shop settings", error);
        }
    };

    const loadLayout = async () => {
        try {
            const result = await db.settings.findUnique({ where: { key: 'LABEL_LAYOUT' } });
            if (result && result.value) {
                setBlocks(JSON.parse(result.value));
            }
        } catch (error) {
            console.error("Failed to load layout", error);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await Promise.all([
                db.settings.upsert({
                    where: { key: 'LABEL_LAYOUT' },
                    create: { key: 'LABEL_LAYOUT', value: JSON.stringify(blocks) },
                    update: { value: JSON.stringify(blocks) }
                }),
                db.settings.upsert({
                    where: { key: 'STICKER_PRINT_CONFIG' },
                    create: { key: 'STICKER_PRINT_CONFIG', value: JSON.stringify(stickConfig) },
                    update: { value: JSON.stringify(stickConfig) }
                })
            ]);
            alert('Label layout and printer calibration saved!');
        } catch (error) {
            console.error('Failed to save settings:', error);
            alert('Failed to save settings');
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
        if (confirm('Are you sure you want to reset to the default layout? All changes will be lost.')) {
            setBlocks(DEFAULT_LABEL_LAYOUT);
            setSelectedId(null);
        }
    };

    const addBlock = (type: LabelBlock['type']) => {
        const newBlock: LabelBlock = {
            id: Date.now().toString(),
            type,
            content: '',
            styles: { align: 'center', fontSize: 10, bold: false, marginTop: 0, marginBottom: 0 },
            visible: true
        };
        setBlocks([...blocks, newBlock]);
        setSelectedId(newBlock.id);
    };

    const updateSelectedBlock = (updates: Partial<LabelBlock> | Partial<LabelBlock['styles']>) => {
        if (!selectedId) return;

        setBlocks(prev => prev.map(b => {
            if (b.id !== selectedId) return b;

            if ('align' in updates || 'fontSize' in updates || 'bold' in updates || 'marginTop' in updates || 'marginBottom' in updates || 'height' in updates) {
                return { ...b, styles: { ...b.styles, ...updates } };
            }
            return { ...b, ...updates };
        }));
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
        if (selectedId === id) setSelectedId(null);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Main Designer Area */}
            <div className="flex h-[calc(100vh-320px)] min-h-[500px] gap-4">
                {/* LEFT: Tools */}
                <div className="w-80 flex flex-col gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div>
                        <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">Add Elements</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="secondary" size="sm" onClick={() => addBlock('shop_name')} className="justify-start text-xs">Shop Name</Button>
                            <Button variant="secondary" size="sm" onClick={() => addBlock('product_name')} className="justify-start text-xs">Product Name</Button>
                            <Button variant="secondary" size="sm" onClick={() => addBlock('price')} className="justify-start text-xs">Price</Button>
                            <Button variant="secondary" size="sm" onClick={() => addBlock('barcode')} className="justify-start text-xs">Barcode</Button>
                            <Button variant="secondary" size="sm" onClick={() => addBlock('meta_row')} className="justify-start text-xs">Code | Price</Button>
                            <Button variant="secondary" size="sm" onClick={() => addBlock('text')} className="justify-start text-xs">Custom Text</Button>
                            <Button variant="secondary" size="sm" onClick={() => addBlock('divider')} className="justify-start text-xs">Divider</Button>
                            <Button variant="secondary" size="sm" onClick={() => addBlock('spacer')} className="justify-start text-xs">Spacer</Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden flex flex-col">
                        <h3 className="text-xs font-bold uppercase text-gray-500 mb-2">Layers</h3>
                        <div className="flex-1 overflow-y-auto pr-2">
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                                    {blocks.map((block) => (
                                        <SortableBlock
                                            key={block.id}
                                            block={block}
                                            onRemove={removeBlock}
                                            onEdit={(b: any) => setSelectedId(b.id)}
                                            isSelected={selectedId === block.id}
                                        />
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </div>
                    </div>
                </div>

                {/* MIDDLE: Preview Canvas */}
                <div className="flex-1 bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-8 overflow-y-auto">
                    <div
                        className="bg-white text-black shadow-lg relative overflow-hidden flex flex-col"
                        style={{
                            width: '380px',
                            height: '190px',
                            padding: '10px',
                            fontFamily: 'Arial, sans-serif'
                        }}
                    >
                        {blocks.map(block => (
                            <div
                                key={block.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedId(block.id);
                                }}
                                className={`cursor-pointer hover:bg-blue-500/10 ${selectedId === block.id ? 'ring-1 ring-blue-500' : ''}`}
                                style={{
                                    textAlign: block.styles.align,
                                    fontSize: `${(block.styles.fontSize || 10) * 2}px`,
                                    fontWeight: block.styles.bold ? 'bold' : 'normal',
                                    marginTop: `${(block.styles.marginTop || 0) * 2}px`,
                                    marginBottom: `${(block.styles.marginBottom || 0) * 2}px`,
                                    display: block.visible ? 'block' : 'none',
                                    lineHeight: 1.1
                                }}
                            >
                                {block.type === 'shop_name' && (block.content || shopDetails.shopName || "ZAIN GENTS PALACE")}
                                {block.type === 'product_name' && (block.content || "Shirt 750")}
                                {block.type === 'price' && "Rs.750.00"}
                                {block.type === 'product_code' && "ABC-1234"}
                                {block.type === 'text' && (block.content || '4649350')}
                                {block.type === 'barcode' && <div className="bg-gray-200 w-full flex items-center justify-center text-[10px]" style={{ height: (block.styles.height || 30) * 1.5 }}>|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||</div>}
                                {block.type === 'meta_row' && (
                                    <div className="flex justify-between w-full">
                                        <span>4649350</span>
                                        <span>Rs.750.00</span>
                                    </div>
                                )}
                                {block.type === 'divider' && <div className="border-t border-black my-1"></div>}
                                {block.type === 'spacer' && <div style={{ height: (block.styles.height || 10) }}></div>}
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-4 text-xs text-gray-400">Preview Scaled 2x</div>
                </div>

                {/* RIGHT: Properties */}
                <div className="w-72 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Properties</h3>
                        <div className="flex gap-1">
                            <Button size="sm" variant="secondary" onClick={handleReset} title="Reset to Default"><RotateCcw className="w-4 h-4" /></Button>
                            <Button size="sm" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Layout'}</Button>
                        </div>
                    </div>

                    {selectedId && selectedBlock ? (
                        <div className="space-y-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30 mb-4">
                                <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Editing Element</p>
                                <div className="font-mono text-sm font-bold capitalize">{selectedBlock.type.replace('_', ' ')}</div>
                            </div>

                            {/* Alignment */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Alignment</label>
                                <div className="flex bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 p-1">
                                    <button onClick={() => updateSelectedBlock({ align: 'left' })} className={`flex-1 p-1 rounded hover:bg-gray-100 ${selectedBlock.styles.align === 'left' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}><AlignLeft className="w-4 h-4 mx-auto" /></button>
                                    <button onClick={() => updateSelectedBlock({ align: 'center' })} className={`flex-1 p-1 rounded hover:bg-gray-100 ${selectedBlock.styles.align === 'center' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}><AlignCenter className="w-4 h-4 mx-auto" /></button>
                                    <button onClick={() => updateSelectedBlock({ align: 'right' })} className={`flex-1 p-1 rounded hover:bg-gray-100 ${selectedBlock.styles.align === 'right' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}><AlignRight className="w-4 h-4 mx-auto" /></button>
                                </div>
                            </div>

                            {/* Typography */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Size (pt)</label>
                                    <Input type="number" value={selectedBlock.styles.fontSize} onChange={(e) => updateSelectedBlock({ fontSize: parseInt(e.target.value) })} />
                                </div>
                                <div className="flex items-end">
                                    <button
                                        onClick={() => updateSelectedBlock({ bold: !selectedBlock.styles.bold })}
                                        className={`w-full h-10 border border-gray-300 rounded flex items-center justify-center ${selectedBlock.styles.bold ? 'bg-gray-200 font-bold' : 'bg-white'}`}
                                    >
                                        <Bold className="w-4 h-4" /> Bold
                                    </button>
                                </div>
                            </div>

                            {/* Custom Text Content */}
                            {(selectedBlock.type === 'text' || selectedBlock.type === 'shop_name' || selectedBlock.type === 'product_name') && (
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Content</label>
                                    <Input
                                        value={selectedBlock.content || ''}
                                        placeholder={selectedBlock.type === 'shop_name' ? shopDetails.shopName : ''}
                                        onChange={(e) => updateSelectedBlock({ content: e.target.value })}
                                    />
                                </div>
                            )}

                            {/* Barcode Height */}
                            {selectedBlock.type === 'barcode' && (
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Height</label>
                                    <Input type="number" value={selectedBlock.styles.height || 30} onChange={(e) => updateSelectedBlock({ height: parseInt(e.target.value) })} />
                                </div>
                            )}

                            {/* Margins */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Top</label>
                                    <Input type="number" value={selectedBlock.styles.marginTop || 0} onChange={(e) => updateSelectedBlock({ marginTop: parseInt(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Bottom</label>
                                    <Input type="number" value={selectedBlock.styles.marginBottom || 0} onChange={(e) => updateSelectedBlock({ marginBottom: parseInt(e.target.value) })} />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={selectedBlock.visible} onChange={(e) => updateSelectedBlock({ visible: e.target.checked })} />
                                    <span className="text-sm">Visible</span>
                                </label>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-20 bg-gray-50/50 dark:bg-gray-900/20 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-800">
                            <p className="text-sm">Select an element in the preview to edit its properties.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Calibration Panel */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-none">
                        <h4 className="text-sm font-black text-gray-400 uppercase mb-1 flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Printer Calibration
                        </h4>
                        <p className="text-xs text-gray-500 max-w-[200px]">These settings align the printed output to your physical labels (32x18mm).</p>
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        <Input label="Width (mm)" type="number" value={stickConfig.width} onChange={e => setStickConfig({ ...stickConfig, width: Number(e.target.value) })} />
                        <Input label="Height (mm)" type="number" value={stickConfig.height} onChange={e => setStickConfig({ ...stickConfig, height: Number(e.target.value) })} />
                        <Input label="Per Row" type="number" value={stickConfig.perRow} onChange={e => setStickConfig({ ...stickConfig, perRow: Number(e.target.value) })} />
                        <Input label="Zoom (%)" type="number" value={stickConfig.contentScale} onChange={e => setStickConfig({ ...stickConfig, contentScale: Number(e.target.value) })} />
                        <Input label="Gap X" type="number" value={stickConfig.gapX} onChange={e => setStickConfig({ ...stickConfig, gapX: Number(e.target.value) })} />
                        <Input label="Gap Y" type="number" value={stickConfig.gapY} onChange={e => setStickConfig({ ...stickConfig, gapY: Number(e.target.value) })} />
                        <Input label="Margin L" type="number" value={stickConfig.marginLeft} onChange={e => setStickConfig({ ...stickConfig, marginLeft: Number(e.target.value) })} />
                        <Input label="Margin T" type="number" value={stickConfig.marginTop} onChange={e => setStickConfig({ ...stickConfig, marginTop: Number(e.target.value) })} />
                    </div>
                </div>
            </div>
        </div>
    );
};

function Settings(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
    )
}
