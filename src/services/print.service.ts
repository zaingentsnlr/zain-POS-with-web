import { format } from 'date-fns';
import { barcodeService } from './barcode.service';
import { ReceiptBlock } from '../components/settings/ReceiptDesigner';
import { LabelBlock } from '../components/settings/LabelDesigner';

interface ReceiptData {
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

      let printerConfig = {
        pageSize: '80mm',
        contentWidth: 72,
        fontFamily: 'sans-serif',
        isBold: false,
        showMRP: false,
        showRate: false,
      };

      if (printerConfigResult.success && printerConfigResult.data && printerConfigResult.data.value) {
        printerConfig = { ...printerConfig, ...JSON.parse(printerConfigResult.data.value) };
      }

      // Parse layout or use default
      let blocks: ReceiptBlock[] = [];
      if (layoutResult.success && layoutResult.data && layoutResult.data.value) {
        blocks = JSON.parse(layoutResult.data.value);
      } else {
        // Default Layout Fallback (Tax Invoice Standard)
        blocks = [
          { id: '1', type: 'header', content: 'TAX INVOICE', styles: { align: 'center', fontSize: 14, bold: true, marginBottom: 5 }, visible: true },
          { id: '2', type: 'text', content: '{{shopName}}', styles: { align: 'center', fontSize: 16, bold: true }, visible: true },
          { id: '3', type: 'text', content: '{{address}}\nPh: {{phone}}\nGSTIN: {{gstin}}', styles: { align: 'center', fontSize: 10 }, visible: true },
          { id: '4', type: 'divider', styles: {}, visible: true },
          { id: '5', type: 'bill_info', styles: {}, visible: true },
          { id: '6', type: 'divider', styles: {}, visible: true },
          { id: '7', type: 'items_table', styles: {}, visible: true },
          { id: '8', type: 'divider', styles: {}, visible: true },
          { id: '9', type: 'totals', styles: { align: 'right' }, visible: true },
          { id: '10', type: 'divider', styles: {}, visible: true },
          { id: '11', type: 'footer', content: 'Thank You! Visit Again', styles: { align: 'center', fontSize: 10, marginBottom: 10 }, visible: true },
          { id: '12', type: 'text', content: 'Authorised Signatory', styles: { align: 'right', fontSize: 10, marginTop: 20 }, visible: true },
        ];
      }

      // 2. Generate HTML from Blocks
      let htmlContent = '';

      // Helper to parsing placeholders
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

        switch (block.type) {
          case 'logo':
            if (data.logo) {
              htmlContent += `<div style="${styleStr}"><img src="${data.logo}" style="max-width: 60%; height: auto;" /></div>`;
            }
            break;

          case 'text':
          case 'header':
          case 'footer':
            htmlContent += `<div style="${styleStr}">${processText(block.content || '')}</div>`;
            break;

          case 'divider':
            htmlContent += `<div style="${styleStr} border-top: 1px dashed #000; margin: 10px 0;"></div>`; // Margin after styleStr to override 0px default
            break;

          case 'spacer':
            htmlContent += `<div style="height: 20px; ${styleStr}"></div>`;
            break;

          case 'bill_info':
            htmlContent += `
                            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 11px; margin-bottom: 5px; ${styleStr}">
                                <div style="text-align: left;">
                                    <div>Bill No: ${data.billNo}</div>
                                    <div>Date: ${format(new Date(data.date), 'dd/MM/yyyy')}</div>
                                </div>
                                <div style="text-align: right;">
                                    <div>Customer: ${data.customerName || 'Walk-in'}</div>
                                </div>
                            </div>
                        `;
            break;

          case 'items_table':
            // Generate detailed table rows
            // const showMRP = (printerConfig as any).showMRP !== false; // Duplicate var in loop? No, it's inside switch. Local scope.

            const rows = data.items.map((item: any, index: number) => `
                            <tr>
                                <td style="text-align: center; padding: 4px 2px;">${index + 1}</td>
                                <td style="text-align: left; padding: 4px 2px;">
                                    ${item.name}
                                    ${item.variantInfo ? `<div style="font-size: 9px; color: #555;">${item.variantInfo}</div>` : ''}
                                </td>
                                <td style="text-align: center; padding: 4px 2px;">${item.quantity}</td>
                                ${(printerConfig as any).showMRP ? `<td style="text-align: right; padding: 4px 2px;">${item.mrp?.toFixed(2)}</td>` : ''}
                                ${(printerConfig as any).showRate ? `<td style="text-align: right; padding: 4px 2px;">${item.rate?.toFixed(2)}</td>` : ''}
                                <td style="text-align: right; padding: 4px 2px;">${item.discount?.toFixed(2) || '0.00'}</td>
                                <td style="text-align: right; font-weight: bold; padding: 4px 2px;">${item.total.toFixed(2)}</td>
                            </tr>
                        `).join('');

            htmlContent += `
                            <table style="width: 100%; border-collapse: collapse; font-family: monospace; font-size: 11px;">
                                <thead>
                                    <tr style="border-bottom: 1px dashed #000;">
                                        <th align="center" style="width: 5%; padding: 4px 2px;">#</th>
                                        <th align="left" style="width: auto; padding: 4px 2px;">Item</th>
                                        <th align="center" style="width: 10%; padding: 4px 2px;">Qty</th>
                                        ${(printerConfig as any).showMRP ? `<th align="right" style="width: 15%; padding: 4px 2px;">MRP</th>` : ''}
                                        ${(printerConfig as any).showRate ? `<th align="right" style="width: 15%; padding: 4px 2px;">Rate</th>` : ''}
                                        <th align="right" style="width: 10%; padding: 4px 2px;">Dis</th>
                                        <th align="right" style="width: 20%; padding: 4px 2px;">Amt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rows}
                                </tbody>
                            </table>
                        `;
            break;

          case 'totals':
            // Tax Breakdown Calculation
            // Assuming simple split for now if not provided, basically 50/50 of total tax
            const totalTax = (data.cgst || 0) + (data.sgst || 0);
            const basicAmt = (data.subtotal || 0) - totalTax; // Roughly approximate if not passed explicitly, but subtotal usually excludes tax in some systems, includes in others. Based on POS.tsx, subtotal is gross.
            // Actually POS.tsx: subtotal = getSubtotal() -> usually sum of prices.
            // tax = getTaxAmount() -> separate line.
            // Let's stick to what data we have.
            // The user asked for "Basic Amt", "CGST", "SGST", "Cess", "Total Amt".

            // Let's build a small summary block
            htmlContent += `
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
                                    ${data.payments && data.payments.length > 1
                ? data.payments.map(p => `<tr><td align="right">${p.paymentMode}:</td><td align="right">${p.amount.toFixed(2)}</td></tr>`).join('')
                : `<tr><td align="right" style="padding-top: 5px;">Paid (${data.paymentMethod}):</td><td align="right" style="padding-top: 5px;">${data.paidAmount?.toFixed(2) || '0.00'}</td></tr>`
              }
                                    <tr><td align="right">Change:</td><td align="right">${data.changeAmount?.toFixed(2) || '0.00'}</td></tr>
                                </table>
                            </div>
                        `;
            break;
        }
      }

      // Reverted to safe static defaults as per user request
      const finalHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        @page { margin: 0; size: auto; }
                        body { 
                            font-family: sans-serif;
                            width: 70mm; /* Wider for 3 inch (76mm) paper */
                            margin: 0 0 0 5mm; /* 5mm LEFT margin to prevent cutoff */
                            padding: 0;
                            font-size: 13px; 
                            font-weight: bold; 
                            color: #000 !important; 
                            overflow-x: hidden;
                        }
                        * { box-sizing: border-box; }
                        
                        /* Force black text everywhere */
                        div, span, td, th, p { color: #000 !important; }
                        
                        /* Table tweaks */
                        table { width: 100% !important; border-collapse: collapse; }
                        td, th { padding: 2px 0; }
                    </style>
                </head>
                <body>${htmlContent}</body>
                </html>
            `;

      await window.electronAPI.print.receipt({ html: finalHtml });

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

      for (let i = 0; i < copies; i++) {
        await window.electronAPI.print.label({ html });
        if (copies > 1) await new Promise(r => setTimeout(r, 500));
      }
    } catch (error) {
      console.error('Print label error:', error);
    }
  }
};
