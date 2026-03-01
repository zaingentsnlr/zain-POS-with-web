import React, { useEffect, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { Modal } from './Modal';
import { Button } from './Button';
import { formatIndianCurrency } from '../../lib/format';
import { db } from '../../lib/db';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';

// Copied from LabelDesigner.tsx to avoid complex imports
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

interface StickerPrintModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: any;
    variant: any;
}

export const StickerPrintModal: React.FC<StickerPrintModalProps> = ({
    isOpen,
    onClose,
    product,
    variant,
}) => {
    // Barcode rendering tuned for thermal label scanners:
    // add quiet zone and avoid ultra-thin bars that fail intermittently.
    const BARCODE_MODULE_WIDTH = 1.4;
    const BARCODE_QUIET_MARGIN = 6;

    const [quantity, setQuantity] = useState<number | ''>(1);
    const [layout, setLayout] = useState<LabelBlock[]>(DEFAULT_LABEL_LAYOUT);
    const [shopSettings, setShopSettings] = useState<any>({ shopName: 'Zain POS' });
    const [showConfig, setShowConfig] = useState(false);

    // Print Configuration State (Defaults updated to match user's physical configuration)
    const [config, setConfig] = useState({
        width: 32,      // mm
        height: 18,     // mm
        perRow: 2,
        gapX: 2,        // mm
        gapY: 1,         // mm
        marginLeft: 2,
        marginTop: 0,
        contentScale: 75, // Percentage
        rowDelayMs: 1200
    });




    useEffect(() => {
        if (isOpen) {
            loadSettings();
        }
    }, [isOpen]);

    // Load saved settings
    const loadSettings = async () => {
        try {
            const [layoutResult, shopResult, configResult] = await Promise.all([
                db.settings.findUnique({ where: { key: 'LABEL_LAYOUT' } }),
                db.settings.findUnique({ where: { key: 'SHOP_SETTINGS' } }),
                db.settings.findUnique({ where: { key: 'STICKER_PRINT_CONFIG' } })
            ]);

            if (layoutResult && layoutResult.value) {
                setLayout(JSON.parse(layoutResult.value));
            }

            if (shopResult && shopResult.value) {
                setShopSettings(JSON.parse(shopResult.value));
            }

            if (configResult && configResult.value) {
                setConfig(prev => ({ ...prev, ...JSON.parse(configResult.value) }));
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
    };

    // Render barcode for preview
    useEffect(() => {
        if (isOpen && (variant?.barcode || variant?.sku) && layout.some(b => b.type === 'barcode' && b.visible)) {
            // Use setTimeout to ensure DOM is updated
            setTimeout(() => {
                try {
                    document.querySelectorAll('.preview-barcode').forEach((element) => {
                        JsBarcode(element, variant.barcode || variant.sku, {
                            format: 'CODE128',
                            width: BARCODE_MODULE_WIDTH,
                            height: 40,
                            displayValue: false,
                            fontSize: 10,
                            margin: BARCODE_QUIET_MARGIN,
                            lineColor: '#000000',
                            background: '#ffffff'
                        });
                    });
                } catch (error) {
                    console.error('Failed to generate barcode:', error);
                }
            }, 100);
        }
    }, [isOpen, variant, layout, config]);

    const renderBlockOnScreen = (block: LabelBlock) => {
        if (!block.visible) return null;

        const style: React.CSSProperties = {
            textAlign: block.styles.align,
            fontSize: `${block.styles.fontSize || 10}pt`, // Use pt to match print output
            fontWeight: block.styles.bold ? 'bold' : 'normal',
            marginTop: `${(block.styles.marginTop || 0)}px`,
            marginBottom: `${(block.styles.marginBottom || 0)}px`,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        };

        switch (block.type) {
            case 'shop_name':
                return <div key={block.id} style={style}>{block.content || shopSettings.shopName}</div>;
            case 'product_name':
                return <div key={block.id} style={style}>{block.content || product.name}</div>;
            case 'price':
                return <div key={block.id} style={style}>{formatIndianCurrency(variant.mrp)}</div>;
            case 'barcode':
                return (
                    <div key={block.id} style={{ ...style, display: 'flex', justifyContent: block.styles.align || 'center' }}>
                        <svg className="preview-barcode" style={{ height: block.styles.height ? `${block.styles.height}px` : '40px', maxWidth: '100%' }}></svg>
                    </div>
                );
            case 'text':
                return <div key={block.id} style={style}>{block.content}</div>;
            case 'product_code':
                return <div key={block.id} style={style}>{variant.barcode || variant.sku}</div>;
            case 'meta_row':
                return (
                    <div key={block.id} style={{ ...style, display: 'flex', justifyContent: 'space-between' }}>
                        <span>{variant.barcode || variant.sku}</span>
                        <span>{formatIndianCurrency(variant.sellingPrice)}</span>
                    </div>
                );
            case 'divider':
                return <div key={block.id} className="border-t border-black my-1" />;
            case 'spacer':
                return <div key={block.id} style={{ height: (block.styles.height || 10) }}></div>;
            default:
                return null;
        }
    };

    const escapeHtml = (value: string) =>
        value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

    const createBarcodeSvgMarkup = (code: string, height: number) => {
        try {
            const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            JsBarcode(svgEl, code, {
                format: 'CODE128',
                width: BARCODE_MODULE_WIDTH,
                height,
                displayValue: false,
                margin: BARCODE_QUIET_MARGIN,
                lineColor: '#000000',
                background: '#ffffff'
            });
            return new XMLSerializer().serializeToString(svgEl);
        } catch (error) {
            console.error('Failed to build barcode markup:', error);
            return '';
        }
    };

    const handlePrint = async () => {
        let labelPrinterName: string | undefined;
        try {
            const printerSetting = await db.settings.findUnique({ where: { key: 'PRINTER_CONFIG' } });
            if (printerSetting?.value) {
                const parsed = JSON.parse(printerSetting.value);
                if (parsed?.labelPrinter && typeof parsed.labelPrinter === 'string') {
                    labelPrinterName = parsed.labelPrinter.trim();
                }
            }
        } catch (error) {
            console.error('Failed to load printer config for label print:', error);
        }

        const safeQuantity = Math.max(1, Number(quantity) || 1);
        const safeMarginLeft = Math.max(0, Number(config.marginLeft) || 0);
        const safeMarginTop = Math.max(0, Number(config.marginTop) || 0);
        const rowDelayMs = Math.max(300, Number((config as any).rowDelayMs) || 1200);
        const rowCount = Math.ceil(safeQuantity / config.perRow);
        const rowPitchMm = config.height;
        const sheetWidthMm = (config.width * config.perRow) + (config.gapX * (config.perRow - 1));
        const pageWidthMm = sheetWidthMm + safeMarginLeft;
        const pageHeightMm = rowPitchMm + safeMarginTop;

        const buildStickerHtml = () => {
            const blocksHTML = layout.map(block => {
                if (!block.visible) return '';

                const style = `
                    text-align: ${block.styles.align || 'center'};
                    font-size: ${block.styles.fontSize || 10}pt;
                    font-weight: ${block.styles.bold ? 'bold' : 'normal'};
                    margin-top: ${block.styles.marginTop || 0}px;
                    margin-bottom: ${block.styles.marginBottom || 0}px;
                    line-height: 1.1;
                    white-space: nowrap;
                    overflow: hidden;
                `;

                switch (block.type) {
                    case 'shop_name':
                        return `<div style="${style}">${block.content || shopSettings.shopName}</div>`;
                    case 'product_name':
                        return `<div style="${style}">${block.content || product.name}</div>`;
                    case 'price':
                        return `<div style="${style}">MRP: ${formatIndianCurrency(variant.mrp)}</div>`;
                    case 'barcode':
                        const barcodeMarkup = createBarcodeSvgMarkup(
                            String(variant.barcode || variant.sku || ''),
                            block.styles.height || 30
                        );
                        return `<div style="${style} display: flex; justify-content: ${block.styles.align || 'center'};">
                                    ${barcodeMarkup || `<div style="font-size:8pt;">${escapeHtml(String(variant.barcode || variant.sku || ''))}</div>`}
                                </div>`;
                    case 'text':
                        return `<div style="${style}">${escapeHtml(block.content || '')}</div>`;
                    case 'product_code':
                        return `<div style="${style}">SKU: ${escapeHtml(String(variant.sku || ''))}</div>`;
                    case 'meta_row':
                        return `<div style="${style} display: flex; justify-content: space-between;">
                                    <span>${escapeHtml(String(variant.sku || ''))}</span>
                                    <span>${formatIndianCurrency(variant.sellingPrice)}</span>
                                </div>`;
                    case 'divider':
                        return `<div style="border-top: 1px solid black; margin: 2px 0;"></div>`;
                    case 'spacer':
                        return `<div style="height: ${block.styles.height || 10}px"></div>`;
                    default: return '';
                }
            }).join('');

            return `<div class="sticker">
                        <div class="content-wrapper">
                            ${blocksHTML}
                        </div>
                    </div>`;
        };

        try {
            for (let row = 0; row < rowCount; row++) {
                const stickersInThisRow = Math.min(config.perRow, safeQuantity - (row * config.perRow));
                const rowStickers = Array(stickersInThisRow).fill(null).map(() => buildStickerHtml());
                const emptySlots = Math.max(0, config.perRow - stickersInThisRow);
                for (let i = 0; i < emptySlots; i++) {
                    rowStickers.push(`<div class="sticker blank"></div>`);
                }

                const html = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Print Stickers - ${product.name}</title>
                        <style>
                            @media print {
                                @page {
                                    size: ${pageWidthMm}mm ${pageHeightMm}mm;
                                    margin: 0mm;
                                }
                                body {
                                    margin: 0;
                                    padding: 0;
                                }
                            }
                            html, body {
                                width: ${pageWidthMm}mm;
                                height: ${pageHeightMm}mm;
                                margin: 0;
                                padding: 0;
                                overflow: hidden;
                                background: #fff;
                            }
                            body {
                                font-family: Arial, sans-serif;
                                box-sizing: border-box;
                            }
                            .sheet {
                                width: ${sheetWidthMm}mm;
                                height: ${rowPitchMm}mm;
                                display: grid;
                                grid-template-columns: repeat(${config.perRow}, ${config.width}mm);
                                grid-auto-rows: ${config.height}mm;
                                column-gap: ${config.gapX}mm;
                                transform: translate(${safeMarginLeft}mm, ${safeMarginTop}mm);
                                transform-origin: top left;
                            }
                            .sticker {
                                width: ${config.width}mm;
                                height: ${config.height}mm;
                                padding: 1mm;
                                box-sizing: border-box;
                                display: block;
                                overflow: hidden;
                                flex-direction: column;
                            }
                            .sticker.blank {
                                visibility: hidden;
                            }
                            .sticker > div {
                                font-size: 10pt;
                            }
                            .content-wrapper {
                                transform: scale(${config.contentScale / 100});
                                transform-origin: top left;
                                width: ${100 * (100 / config.contentScale)}%;
                                height: ${100 * (100 / config.contentScale)}%;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="sheet">${rowStickers.join('')}</div>
                    </body>
                    </html>
                `;

                const result = await window.electronAPI.print.label({
                    html,
                    options: {
                        pageWidthMm,
                        pageHeightMm,
                        deviceName: labelPrinterName
                    }
                });
                if (!result?.success) {
                    alert(`Label print failed on row ${row + 1}: ${result?.error || 'Unknown error'}`);
                    return;
                }

                // Strong pacing delay prevents spooler batching/feed drift on some thermal drivers.
                if (row < rowCount - 1) {
                    await new Promise((resolve) => setTimeout(resolve, rowDelayMs));
                }
            }
        } catch (error: any) {
            alert(`Label print failed: ${error?.message || error}`);
        }
    };

    if (!product || !variant) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Print Product Sticker">
            <div className="space-y-4">

                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <Settings className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700 uppercase">Printer Calibration: {config.width}x{config.height}mm</span>
                </div>

                {/* Preview */}
                <div className="flex justify-center bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-hidden">
                    <div className="flex flex-wrap" style={{ width: `${(config.width + config.gapX) * config.perRow}mm`, maxWidth: '100%' }}>
                        {/* Show just enough stickers to visualize the row and gap */}
                        {Array.from({ length: Math.min(config.perRow * 2, 4) }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-white border border-dashed border-gray-400 overflow-hidden flex flex-col relative"
                                style={{
                                    width: `${config.width}mm`,
                                    height: `${config.height}mm`,
                                    marginRight: (i + 1) % config.perRow === 0 ? 0 : `${config.gapX}mm`,
                                    marginBottom: `${config.gapY}mm`,
                                    padding: '2mm',
                                    transform: 'scale(1)', // render 1:1 roughly
                                }}
                            >
                                <div className="absolute top-0 right-0 bg-gray-200 text-[8px] px-1 opacity-50">#{i + 1}</div>
                                {layout.map(block => renderBlockOnScreen(block))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quantity */}
                <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Number of Stickers</label>
                    <input
                        type="number"
                        inputMode="numeric"
                        max="100"
                        value={quantity}
                        onChange={(e) => {
                            const raw = e.target.value;
                            if (raw === '') {
                                setQuantity('');
                                return;
                            }
                            const parsed = parseInt(raw, 10);
                            if (Number.isFinite(parsed)) {
                                setQuantity(parsed);
                            }
                        }}
                        onBlur={() => {
                            if (quantity === '' || Number(quantity) < 1) {
                                setQuantity(1);
                            }
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>

                {/* Info */}
                <div className="text-xs text-gray-500">
                    <p>Total Print Width: ~{Math.ceil((config.width + config.gapX) * config.perRow)}mm</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-end">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handlePrint}>
                        <PrinterIcon className="w-4 h-4 mr-2" />
                        Print {Math.max(1, Number(quantity) || 1)} Sticker{Math.max(1, Number(quantity) || 1) > 1 ? 's' : ''}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

function PrinterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2-2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
        </svg>
    );
}
