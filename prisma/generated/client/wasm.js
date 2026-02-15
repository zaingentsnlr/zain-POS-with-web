
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  password: 'password',
  name: 'name',
  role: 'role',
  isActive: 'isActive',
  permPrintSticker: 'permPrintSticker',
  permAddItem: 'permAddItem',
  permDeleteProduct: 'permDeleteProduct',
  permVoidSale: 'permVoidSale',
  permViewReports: 'permViewReports',
  permEditSettings: 'permEditSettings',
  permManageProducts: 'permManageProducts',
  permViewSales: 'permViewSales',
  permViewGstReports: 'permViewGstReports',
  permEditSales: 'permEditSales',
  permManageInventory: 'permManageInventory',
  permManageUsers: 'permManageUsers',
  permViewCostPrice: 'permViewCostPrice',
  permChangePayment: 'permChangePayment',
  permDeleteAudit: 'permDeleteAudit',
  permBulkUpdate: 'permBulkUpdate',
  permBackDateSale: 'permBackDateSale',
  permViewInsights: 'permViewInsights',
  maxDiscount: 'maxDiscount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  categoryId: 'categoryId',
  hsn: 'hsn',
  taxRate: 'taxRate',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductVariantScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  sku: 'sku',
  barcode: 'barcode',
  size: 'size',
  color: 'color',
  mrp: 'mrp',
  sellingPrice: 'sellingPrice',
  costPrice: 'costPrice',
  stock: 'stock',
  minStock: 'minStock',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CustomerScalarFieldEnum = {
  id: 'id',
  name: 'name',
  phone: 'phone',
  email: 'email',
  address: 'address',
  gstin: 'gstin',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SaleScalarFieldEnum = {
  id: 'id',
  billNo: 'billNo',
  userId: 'userId',
  customerName: 'customerName',
  customerPhone: 'customerPhone',
  subtotal: 'subtotal',
  discount: 'discount',
  discountPercent: 'discountPercent',
  taxAmount: 'taxAmount',
  cgst: 'cgst',
  sgst: 'sgst',
  grandTotal: 'grandTotal',
  paymentMethod: 'paymentMethod',
  paidAmount: 'paidAmount',
  changeAmount: 'changeAmount',
  status: 'status',
  remarks: 'remarks',
  isHistorical: 'isHistorical',
  importedFrom: 'importedFrom',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InvoicePaymentScalarFieldEnum = {
  id: 'id',
  saleId: 'saleId',
  paymentMode: 'paymentMode',
  amount: 'amount',
  createdAt: 'createdAt'
};

exports.Prisma.ExchangeScalarFieldEnum = {
  id: 'id',
  originalInvoiceId: 'originalInvoiceId',
  exchangeDate: 'exchangeDate',
  differenceAmount: 'differenceAmount',
  notes: 'notes',
  createdBy: 'createdBy'
};

exports.Prisma.ExchangeItemScalarFieldEnum = {
  id: 'id',
  exchangeId: 'exchangeId',
  returnedItemId: 'returnedItemId',
  returnedQty: 'returnedQty',
  newItemId: 'newItemId',
  newQty: 'newQty',
  priceDiff: 'priceDiff'
};

exports.Prisma.ExchangePaymentScalarFieldEnum = {
  id: 'id',
  exchangeId: 'exchangeId',
  paymentMode: 'paymentMode',
  amount: 'amount',
  createdAt: 'createdAt'
};

exports.Prisma.RefundScalarFieldEnum = {
  id: 'id',
  originalInvoiceId: 'originalInvoiceId',
  refundDate: 'refundDate',
  totalRefundAmount: 'totalRefundAmount',
  reason: 'reason',
  createdBy: 'createdBy'
};

exports.Prisma.RefundItemScalarFieldEnum = {
  id: 'id',
  refundId: 'refundId',
  variantId: 'variantId',
  quantity: 'quantity',
  amount: 'amount'
};

exports.Prisma.RefundPaymentScalarFieldEnum = {
  id: 'id',
  refundId: 'refundId',
  paymentMode: 'paymentMode',
  amount: 'amount',
  createdAt: 'createdAt'
};

exports.Prisma.SaleItemScalarFieldEnum = {
  id: 'id',
  saleId: 'saleId',
  variantId: 'variantId',
  productName: 'productName',
  variantInfo: 'variantInfo',
  quantity: 'quantity',
  mrp: 'mrp',
  sellingPrice: 'sellingPrice',
  discount: 'discount',
  taxRate: 'taxRate',
  taxAmount: 'taxAmount',
  total: 'total',
  createdAt: 'createdAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  action: 'action',
  details: 'details',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.InventoryMovementScalarFieldEnum = {
  id: 'id',
  variantId: 'variantId',
  type: 'type',
  quantity: 'quantity',
  reason: 'reason',
  reference: 'reference',
  createdBy: 'createdBy',
  createdAt: 'createdAt'
};

exports.Prisma.SettingScalarFieldEnum = {
  id: 'id',
  key: 'key',
  value: 'value',
  updatedAt: 'updatedAt'
};

exports.Prisma.PrinterConfigScalarFieldEnum = {
  id: 'id',
  type: 'type',
  printerName: 'printerName',
  port: 'port',
  width: 'width',
  settings: 'settings',
  isActive: 'isActive',
  updatedAt: 'updatedAt'
};

exports.Prisma.SyncQueueScalarFieldEnum = {
  id: 'id',
  action: 'action',
  model: 'model',
  data: 'data',
  status: 'status',
  retryCount: 'retryCount',
  error: 'error',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Category: 'Category',
  Product: 'Product',
  ProductVariant: 'ProductVariant',
  Customer: 'Customer',
  Sale: 'Sale',
  InvoicePayment: 'InvoicePayment',
  Exchange: 'Exchange',
  ExchangeItem: 'ExchangeItem',
  ExchangePayment: 'ExchangePayment',
  Refund: 'Refund',
  RefundItem: 'RefundItem',
  RefundPayment: 'RefundPayment',
  SaleItem: 'SaleItem',
  AuditLog: 'AuditLog',
  InventoryMovement: 'InventoryMovement',
  Setting: 'Setting',
  PrinterConfig: 'PrinterConfig',
  SyncQueue: 'SyncQueue'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
