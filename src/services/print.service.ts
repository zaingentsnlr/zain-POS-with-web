import { format } from 'date-fns';
import { barcodeService } from './barcode.service';
import type { ReceiptBlock } from '../components/settings/ReceiptDesigner';
import { LabelBlock } from '../components/settings/LabelDesigner';

export interface ReceiptData {
  billNo: number | string;
  date: Date;
  shopName: string;
  shopAddress: string;
  shopPhone: string;
  gstin: string;
  logo?: string; // Add optional logo
  customerName?: string;
  items: Array<{
    name: string;
    variantInfo?: string;
    quantity: number;
    mrp: number;
    rate: number;
    discount?: number;
    taxRate?: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  cgst: number;
  sgst: number;
  grandTotal: number;
  paymentMethod: string;
  paidAmount: number;
  changeAmount: number;
  payments?: Array<{
    paymentMode: string;
    amount: number;
  }>;
  userName: string;
}

export interface ReceiptPrinterConfig {
  pageSize: string;
  contentWidth: number;
  fontFamily: string;
  isBold: boolean;
  showMRP: boolean;
  showRate: boolean;
  showItemDiscount: boolean;
  showPaidLine: boolean;
  showChangeLine: boolean;
}

export const DEFAULT_RECEIPT_PRINTER_CONFIG: ReceiptPrinterConfig = {
  pageSize: '80mm',
  contentWidth: 72,
  fontFamily: 'sans-serif',
  isBold: false,
  showMRP: false,
  showRate: false,
  showItemDiscount: false,
  showPaidLine: false,
  showChangeLine: false,
};

export const DEFAULT_RECEIPT_LAYOUT: ReceiptBlock[] = [
  { id: '1', type: 'header', content: 'TAX INVOICE', styles: { align: 'center', fontSize: 14, bold: true, marginBottom: 5 }, visible: true },
  { id: '2', type: 'text', content: '{{shopName}}', styles: { align: 'center', fontSize: 16, bold: true }, visible: true },
  { id: '3', type: 'text', content: '{{address}}\nPh: {{phone}}\nGSTIN: {{gstin}}', styles: { align: 'center', fontSize: 10 }, visible: true },
  { id: '4', type: 'divider', styles: {}, visible: true },
  { id: '5', type: 'bill_info', styles: {}, visible: true },
  { id: '6', type: 'divider', styles: {}, visible: true },
  { id: '7', type: 'items_table', styles: { showVariantInfo: false, tableHeaderBold: true, tableRowBold: false }, visible: true },
  { id: '8', type: 'divider', styles: {}, visible: true },
  { id: '9', type: 'totals', styles: { align: 'right' }, visible: true },
  { id: '10', type: 'divider', styles: {}, visible: true },
  { id: '11', type: 'footer', content: 'Thank You! Visit Again', styles: { align: 'center', fontSize: 10, marginBottom: 10 }, visible: true },
  { id: '12', type: 'text', content: 'Authorised Signatory', styles: { align: 'right', fontSize: 10, marginTop: 20 }, visible: true },
];

export function generateReceiptHtml(
  data: ReceiptData,
  blocks: ReceiptBlock[],
  cfg?: Partial<ReceiptPrinterConfig>,
  opts?: { interactive?: boolean; selectedBlockId?: string }
) {
  const printerConfig: ReceiptPrinterConfig = { ...DEFAULT_RECEIPT_PRINTER_CONFIG, ...(cfg || {}) };
  let htmlContent = '';
  const interactive = opts?.interactive === true;
  const selectedBlockId = opts?.selectedBlockId || '';

  const processText = (text: string) => {
    let processed = text || '';
    const replacements: Record<string, string> = {
      '{{shopName}}': data.shopName || '',
      '{{address}}': data.shopAddress || '',
      '{{phone}}': data.shopPhone || '',
      '{{gstin}}': data.gstin || '',
      '{{billNo}}': data.billNo?.toString() || '',
      '{{date}}': data.date ? format(new Date(data.date), 'dd/MM/yyyy hh:mm a') : format(new Date(), 'dd/MM/yyyy hh:mm a'),
      '{{userName}}': data.userName || '',
    };
    for (const [key, value] of Object.entries(replacements)) {
      processed = processed.replace(new RegExp(key, 'g'), value);
    }
    return processed.replace(/\n/g, '<br>');
  };

  for (const block of blocks) {
    if (!block.visible) continue;

    const styleStr = `
      text-align: ${block.styles.align || 'left'};
      font-size: ${block.styles.fontSize || 12}px;
      font-weight: ${block.styles.bold ? 'bold' : 'normal'};
      margin-top: ${block.styles.marginTop || 0}px;
      margin-bottom: ${block.styles.marginBottom || 0}px;
      width: 100%;
    `;

    const isSelected = interactive && selectedBlockId === block.id;
    const blockOpen = interactive
      ? `<div data-block-id="${block.id}" style="position: relative; outline: ${isSelected ? '2px solid #3b82f6' : '1px dashed transparent'}; outline-offset: 1px; cursor: pointer;">`
      : '';
    const blockClose = interactive ? `</div>` : '';

    switch (block.type) {
      case 'logo':
        if (data.logo) {
          htmlContent += `${blockOpen}<div style="${styleStr}"><img src="${data.logo}" style="max-width: 60%; height: auto;" /></div>${blockClose}`;
        }
        break;
      case 'text':
      case 'header':
      case 'footer':
      case 'section_shop_title':
      case 'shop_title':
      case 'shop_details':
        htmlContent += `${blockOpen}<div style="${styleStr}">${processText(block.content || '')}</div>${blockClose}`;
        break;
      case 'divider':
        htmlContent += `${blockOpen}<div style="${styleStr} border-top: 1px dashed #000; margin: 10px 0;"></div>${blockClose}`;
        break;
      case 'spacer':
        htmlContent += `${blockOpen}<div style="height: 20px; ${styleStr}"></div>${blockClose}`;
        break;
      case 'bill_info':
        htmlContent += `${blockOpen}
          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 11px; margin-bottom: 5px; ${styleStr}">
            <div style="text-align: left;">
              <div>Bill No: ${data.billNo}</div>
              <div>Date: ${format(new Date(data.date), 'dd/MM/yyyy')}</div>
            </div>
            <div style="text-align: right;">
              <div>Customer: ${data.customerName || 'Walk-in'}</div>
            </div>
          </div>
        ${blockClose}`;
        break;
      case 'items_table': {
        const showItemDiscount = printerConfig.showItemDiscount === true;
        const showVariantInfo = block.styles.showVariantInfo === true;
        const tableHeaderBold = block.styles.tableHeaderBold !== false;
        const tableRowBold = block.styles.tableRowBold === true;
        const rows = data.items.map((item: any, index: number) => `
          <tr>
            <td style="text-align: center; padding: 4px 2px; font-weight: ${tableRowBold ? 'bold' : 'normal'};">${index + 1}</td>
            <td style="text-align: left; padding: 4px 2px; font-weight: ${tableRowBold ? 'bold' : 'normal'};">
              ${item.name}
              ${showVariantInfo && item.variantInfo ? `<div style="font-size: 9px; color: #555; font-weight: ${tableRowBold ? 'bold' : 'normal'};">${item.variantInfo}</div>` : ''}
            </td>
            <td style="text-align: center; padding: 4px 2px; font-weight: ${tableRowBold ? 'bold' : 'normal'};">${item.quantity}</td>
            ${printerConfig.showMRP ? `<td style="text-align: right; padding: 4px 2px; font-weight: ${tableRowBold ? 'bold' : 'normal'};">${item.mrp?.toFixed(2)}</td>` : ''}
            ${printerConfig.showRate ? `<td style="text-align: right; padding: 4px 2px; font-weight: ${tableRowBold ? 'bold' : 'normal'};">${item.rate?.toFixed(2)}</td>` : ''}
            ${showItemDiscount ? `<td style="text-align: right; padding: 4px 2px; font-weight: ${tableRowBold ? 'bold' : 'normal'};">${item.discount?.toFixed(2) || '0.00'}</td>` : ''}
            <td style="text-align: right; padding: 4px 2px; font-weight: ${tableRowBold ? 'bold' : 'normal'};">${item.total.toFixed(2)}</td>
          </tr>
        `).join('');
        htmlContent += `${blockOpen}
          <table style="width: 100%; border-collapse: collapse; font-family: inherit; font-size: 11px;">
            <thead>
              <tr style="border-bottom: 1px dashed #000;">
                <th align="center" style="width: 5%; padding: 4px 2px; font-weight: ${tableHeaderBold ? 'bold' : 'normal'};">#</th>
                <th align="left" style="width: auto; padding: 4px 2px; font-weight: ${tableHeaderBold ? 'bold' : 'normal'};">Item</th>
                <th align="center" style="width: 10%; padding: 4px 2px; font-weight: ${tableHeaderBold ? 'bold' : 'normal'};">Qty</th>
                ${printerConfig.showMRP ? `<th align="right" style="width: 15%; padding: 4px 2px; font-weight: ${tableHeaderBold ? 'bold' : 'normal'};">MRP</th>` : ''}
                ${printerConfig.showRate ? `<th align="right" style="width: 15%; padding: 4px 2px; font-weight: ${tableHeaderBold ? 'bold' : 'normal'};">Rate</th>` : ''}
                ${showItemDiscount ? `<th align="right" style="width: 10%; padding: 4px 2px; font-weight: ${tableHeaderBold ? 'bold' : 'normal'};">Dis</th>` : ''}
                <th align="right" style="width: 20%; padding: 4px 2px; font-weight: ${tableHeaderBold ? 'bold' : 'normal'};">Amt</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        ${blockClose}`;
        break;
      }
      case 'totals': {
        const totalTax = (data.cgst || 0) + (data.sgst || 0);
        const basicAmt = (data.subtotal || 0) - totalTax;
        htmlContent += `${blockOpen}
          <div style="${styleStr}; font-size: 11px;">
            <table style="width: 100%; font-size: inherit;">
              <tr><td align="right">Total Items:</td><td align="right" width="80">${data.items.length}</td></tr>
              <tr><td align="right">Basic Amt:</td><td align="right" width="80">${basicAmt.toFixed(2)}</td></tr>
              <tr><td align="right">Less Discount:</td><td align="right" width="80">${data.discount.toFixed(2)}</td></tr>
              <tr><td align="right">CGST:</td><td align="right" width="80">${(data.cgst || 0).toFixed(2)}</td></tr>
              <tr><td align="right">SGST:</td><td align="right" width="80">${(data.sgst || 0).toFixed(2)}</td></tr>
              <tr style="font-weight: bold; font-size: 14px; border-top: 1px dashed #000; border-bottom: 1px dashed #000;">
                <td align="right" style="padding: 5px 0;">NET AMOUNT:</td>
                <td align="right" style="padding: 5px 0;">₹${data.grandTotal.toFixed(2)}</td>
              </tr>
              ${printerConfig.showPaidLine
                ? (data.payments && data.payments.length > 1
                  ? data.payments.map(p => `<tr><td align="right">${p.paymentMode}:</td><td align="right">${p.amount.toFixed(2)}</td></tr>`).join('')
                  : `<tr><td align="right" style="padding-top: 5px;">Paid (${data.paymentMethod}):</td><td align="right" style="padding-top: 5px;">${data.paidAmount?.toFixed(2) || '0.00'}</td></tr>`)
                : ''}
              ${printerConfig.showChangeLine ? `<tr><td align="right">Change:</td><td align="right">${data.changeAmount?.toFixed(2) || '0.00'}</td></tr>` : ''}
            </table>
          </div>
        ${blockClose}`;
        break;
      }
      default:
        break;
    }
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page { margin: 0; size: auto; }
        body {
          font-family: ${printerConfig.fontFamily || 'sans-serif'};
          width: 70mm;
          margin: 0 0 0 5mm;
          padding: 0;
          font-size: 13px;
          font-weight: ${printerConfig.isBold ? 'bold' : 'normal'};
          color: #000 !important;
          overflow-x: hidden;
        }
        * { box-sizing: border-box; }
        div, span, td, th, p { color: #000 !important; }
        table { width: 100% !important; border-collapse: collapse; }
        td, th { padding: 2px 0; }
      </style>
    </head>
    <body>
      ${htmlContent}
      ${interactive ? `
      <script>
        document.addEventListener('click', function (e) {
          var node = e.target && e.target.closest ? e.target.closest('[data-block-id]') : null;
          if (!node) return;
          e.preventDefault();
          e.stopPropagation();
          var blockId = node.getAttribute('data-block-id');
          if (blockId && window.parent) {
            window.parent.postMessage({ type: 'receipt-preview-select', blockId: blockId }, '*');
          }
        }, true);
      </script>` : ''}
    </body>
    </html>
  `;
}

interface LabelData {
  shopName: string;
  productName: string;
  barcode: string;
  productCode: string;
  price: number;
}

export const printService = {
  async printReceipt(data: ReceiptData) {
    try {
      // 1. Fetch Layout JSON
      const layoutResult = await window.electronAPI.db.query({
        model: 'setting',
        method: 'findUnique',
        args: { where: { key: 'RECEIPT_LAYOUT' } }
      });

      const printerConfigResult = await window.electronAPI.db.query({
        model: 'setting',
        method: 'findUnique',
        args: { where: { key: 'PRINTER_CONFIG' } }
      });

      const printerConfig: ReceiptPrinterConfig = printerConfigResult.success && printerConfigResult.data && printerConfigResult.data.value
        ? { ...DEFAULT_RECEIPT_PRINTER_CONFIG, ...JSON.parse(printerConfigResult.data.value) }
        : { ...DEFAULT_RECEIPT_PRINTER_CONFIG };

      const blocks: ReceiptBlock[] = layoutResult.success && layoutResult.data && layoutResult.data.value
        ? JSON.parse(layoutResult.data.value)
        : DEFAULT_RECEIPT_LAYOUT;

      const finalHtml = generateReceiptHtml(data, blocks, printerConfig);

      const receiptPrinterName =
        printerConfigResult.success &&
        printerConfigResult.data &&
        printerConfigResult.data.value
          ? (() => {
              try {
                const parsed = JSON.parse(printerConfigResult.data.value);
                return typeof parsed?.receiptPrinter === 'string'
                  ? parsed.receiptPrinter.trim()
                  : undefined;
              } catch {
                return undefined;
              }
            })()
          : undefined;

      const result = await window.electronAPI.print.receipt({
        html: finalHtml,
        options: { deviceName: receiptPrinterName }
      });

      if (!result?.success) {
        throw new Error(result?.error || 'Receipt print failed');
      }

    } catch (error) {
      console.error('Print service error:', error);
      // Fallback or error reporting
      console.error('Printing failed:', error);
    }
  },

  async printLabel(data: LabelData, copies: number = 1): Promise<void> {
    try {
      // 1. Fetch Layout JSON
      const result = await window.electronAPI.db.query({
        model: 'setting',
        method: 'findUnique',
        args: { where: { key: 'LABEL_LAYOUT' } }
      });
      const printerConfigResult = await window.electronAPI.db.query({
        model: 'setting',
        method: 'findUnique',
        args: { where: { key: 'PRINTER_CONFIG' } }
      });

      // Parse layout or use default
      let blocks: LabelBlock[] = [];
      if (result.success && result.data && result.data.value) {
        blocks = JSON.parse(result.data.value);
      } else {
        blocks = [
          { id: '1', type: 'shop_name', styles: { align: 'left', fontSize: 10, bold: true, marginBottom: 0 }, visible: true },
          { id: '2', type: 'product_name', styles: { align: 'left', fontSize: 8, marginBottom: 2 }, visible: true },
          { id: '3', type: 'barcode', styles: { align: 'left', height: 40, marginBottom: 0 }, visible: true },
          { id: '4', type: 'text', content: '4649350', styles: { align: 'left', fontSize: 8, marginBottom: 0 }, visible: true },
          { id: '5', type: 'price', styles: { align: 'left', fontSize: 12, bold: true, marginBottom: 0 }, visible: true },
        ];
      }

      const barcodeImage = barcodeService.generateBarcodeImage(data.barcode);

      let htmlContent = '';
      for (const block of blocks) {
        if (!block.visible) continue;

        const styleStr = `
                    text-align: ${block.styles.align || 'center'};
                    font-size: ${block.styles.fontSize || 10}pt;
                    font-weight: ${block.styles.bold ? 'bold' : 'normal'};
                    margin-top: ${block.styles.marginTop || 0}px;
                    margin-bottom: ${block.styles.marginBottom || 0}px;
                    line-height: 1.1;
                `;

        switch (block.type) {
          case 'shop_name':
            htmlContent += `<div style="${styleStr}">${block.content || data.shopName}</div>`;
            break;
          case 'product_name':
            htmlContent += `<div style="${styleStr}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${block.content || data.productName}</div>`;
            break;
          case 'price':
            htmlContent += `<div style="${styleStr}">Rs. ${data.price}</div>`;
            break;
          case 'product_code':
            htmlContent += `<div style="${styleStr}">${data.productCode}</div>`;
            break;
          case 'text':
            htmlContent += `<div style="${styleStr}">${block.content || ''}</div>`;
            break;
          case 'barcode':
            htmlContent += `<div style="${styleStr}"><img src="${barcodeImage}" style="height: ${block.styles.height || 30}px; max-width: 100%;"></div>`;
            break;
          case 'meta_row':
            htmlContent += `
                            <div style="display: flex; justify-content: space-between; ${styleStr}">
                                <span>${data.productCode}</span>
                                <span>Rs. ${data.price}</span>
                            </div>
                         `;
            break;
          case 'divider':
            htmlContent += `<div style="border-top: 1px dashed black; margin: 2px 0;"></div>`;
            break;
          case 'spacer':
            htmlContent += `<div style="height: ${block.styles.height || 5}px;"></div>`;
            break;
        }
      }

      let html = `
                <html>
                <body style="font-family: Arial, sans-serif; width: 50mm; height: 25mm; margin: 0; padding: 1mm; box-sizing: border-box; overflow: hidden;">
                    ${htmlContent}
                </body>
                </html>`;
      let labelPrinterName: string | undefined;
      if (printerConfigResult.success && printerConfigResult.data && printerConfigResult.data.value) {
        const parsed = JSON.parse(printerConfigResult.data.value);
        if (parsed?.labelPrinter && typeof parsed.labelPrinter === 'string') {
          labelPrinterName = parsed.labelPrinter.trim();
        }
      }

      for (let i = 0; i < copies; i++) {
        const labelResult = await window.electronAPI.print.label({
          html,
          options: { deviceName: labelPrinterName }
        });
        if (!labelResult?.success) {
          throw new Error(labelResult?.error || 'Label print failed');
        }
        if (copies > 1) await new Promise(r => setTimeout(r, 500));
      }
    } catch (error) {
      console.error('Print label error:', error);
      throw error;
    }
  }
};
