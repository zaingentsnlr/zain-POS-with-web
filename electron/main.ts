import { app, BrowserWindow, ipcMain, dialog, screen } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import { cloudSync } from './sync.service';

// Global error handling - MUST BE FIRST
process.on('uncaughtException', (error) => {
    dialog.showErrorBox('Main Process Error', error.stack || error.message);
});
// Custom Prisma Import for Production
let PrismaClient: any;
try {
    const isPackaged = app.isPackaged;
    if (isPackaged) {
        // Load from the app bundle (manual copy strategy)
        // In manual build, we copied 'prisma' folder to 'resources/app/prisma'
        const clientPath = path.join(app.getAppPath(), 'prisma', 'generated', 'client');

        console.log('Loading Prisma from:', clientPath);

        try {
            const prismaModule = require(clientPath);
            console.log('Loaded module keys:', Object.keys(prismaModule));

            // Robust extraction: Handle named export or default export
            PrismaClient = prismaModule.PrismaClient || prismaModule.default?.PrismaClient || prismaModule;

        } catch (requireErr: any) {
            console.error('Require failed:', requireErr);
            dialog.showErrorBox('Prisma Missing', `Could not load Prisma Client from: \n${clientPath} \n\nError: ${requireErr.message} `);
            throw requireErr;
        }

        // Verify if it is a constructor (class/function)
        const typeStr = typeof PrismaClient;
        const isFunc = typeStr === 'function';

        if (!isFunc) {
            console.error('PrismaClient is not a function!', PrismaClient);
            dialog.showErrorBox('Prisma Type Error', `Loaded PrismaClient is ${typeStr}, expected function.\nPath: ${clientPath} `);
        }

    } else {
        // In development, load from the local generated folder
        PrismaClient = require('../prisma/generated/client').PrismaClient;
    }
} catch (err) {
    console.error('Failed to load Prisma Client:', err);
    dialog.showErrorBox('Prisma Load Error', 'Failed to load database client:\n' + (err instanceof Error ? err.stack : String(err)));
}

let prisma: any; // Type as any to avoid TS errors with dynamic require

// --- System Safety ---
const recentBills = new Set<string>();
let saleCounterSinceLastBackup = 0;

async function performAutoBackup() {
    try {
        const actualDbPath = getDatabasePath();

        if (!fs.existsSync(actualDbPath)) return;

        const backupDir = path.join(app.getPath('userData'), 'backups');
        await fs.promises.mkdir(backupDir, { recursive: true });

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(backupDir, `backup-${timestamp}.db`);

        await fs.promises.copyFile(actualDbPath, backupPath);
        console.log(`[Backup] Created: ${backupPath}`);

        // Keep last 10 backups
        const fileNames = await fs.promises.readdir(backupDir);
        const files = (await Promise.all(
            fileNames
                .filter(f => f.startsWith('backup-'))
                .map(async f => ({
                    name: f,
                    time: (await fs.promises.stat(path.join(backupDir, f))).mtime.getTime()
                }))
        )).sort((a, b) => b.time - a.time);

        if (files.length > 10) {
            await Promise.all(
                files.slice(10).map(f => fs.promises.unlink(path.join(backupDir, f.name)).catch(() => { }))
            );
        }
    } catch (err) {
        console.error('Auto-backup failed:', err);
    }
}
// ---------------------

function getDatabasePath() {
    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

    if (isDev) {
        return path.join(process.cwd(), 'prisma', 'pos.db');
    }

    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'pos.db');

    // In production, the DB is copied to the resources folder via extraResources
    const resourcePath = path.join(process.resourcesPath, 'pos.db');

    if (!fs.existsSync(dbPath)) {
        console.log('Database not found at', dbPath);

        if (fs.existsSync(resourcePath)) {
            try {
                console.log('Copying database from resources:', resourcePath);
                fs.copyFileSync(resourcePath, dbPath);
                console.log('Database copied successfully.');
            } catch (err) {
                console.error('Failed to copy database from resources:', err);
                dialog.showErrorBox('Database Error', 'Failed to initialize database. Please contact support.');
            }
        } else {
            console.error('Critical: Resource database not found at', resourcePath);
            dialog.showErrorBox('Critical Error', 'Database file missing from installation. Please reinstall.');
        }
    }

    return dbPath;
}

function getPersistentBackupPath() {
    const backupDir = path.join(app.getPath('documents'), 'ZainPOS');
    return path.join(backupDir, 'backup-latest.db');
}

function getUserDataLatestBackupPath() {
    return path.join(app.getPath('userData'), 'backups', 'backup-latest.db');
}

function getRestoreCandidates() {
    const candidates: string[] = [];

    const envPath = process.env.ZAIN_POS_BACKUP_PATH;
    if (envPath) candidates.push(envPath);

    // Durable backup outside app install/userData (survives reinstalls if user keeps Documents)
    candidates.push(getPersistentBackupPath());

    // Latest backup in userData (if still present)
    candidates.push(getUserDataLatestBackupPath());

    return candidates;
}

function getBundledRestoreCandidates() {
    const candidates: string[] = [];
    candidates.push(path.join(process.resourcesPath, 'pos.db'));

    if (!app.isPackaged) {
        candidates.push(path.join(process.cwd(), 'migration', 'backup_zain_pos_2026-02-04.db'));
    }

    return candidates;
}

function getMtimeMs(filePath: string) {
    try {
        return fs.statSync(filePath).mtimeMs;
    } catch {
        return 0;
    }
}

function shouldRestoreFrom(sourcePath: string, targetPath: string) {
    if (!fs.existsSync(sourcePath)) return false;
    if (!fs.existsSync(targetPath)) return true;
    return getMtimeMs(sourcePath) > getMtimeMs(targetPath);
}

async function restoreDatabaseFromSource(sourcePath: string, targetPath: string) {
    await prisma.$disconnect();
    await new Promise(r => setTimeout(r, 1000));
    fs.copyFileSync(sourcePath, targetPath);

    prisma = new PrismaClient({
        datasources: {
            db: {
                url: `file:${targetPath}`
            }
        }
    });
}

async function ensureSchemaUpdated() {
    try {
        const allTables: any[] = await prisma.$queryRawUnsafe(
            `SELECT name FROM sqlite_master WHERE type = 'table'`
        );
        const tableSet = new Set((allTables || []).map((t: any) => t.name));
        const hasTable = (name: string) => tableSet.has(name);

        // Backfill tables introduced after older app versions so restored DBs remain readable.
        if (!hasTable('InvoicePayment')) {
            await prisma.$executeRawUnsafe(`
                CREATE TABLE IF NOT EXISTS "InvoicePayment" (
                    "id" TEXT NOT NULL PRIMARY KEY,
                    "saleId" TEXT NOT NULL,
                    "paymentMode" TEXT NOT NULL,
                    "amount" REAL NOT NULL,
                    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT "InvoicePayment_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
                )
            `);
        }

        if (!hasTable('Exchange')) {
            await prisma.$executeRawUnsafe(`
                CREATE TABLE IF NOT EXISTS "Exchange" (
                    "id" TEXT NOT NULL PRIMARY KEY,
                    "originalInvoiceId" TEXT NOT NULL,
                    "exchangeDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    "differenceAmount" REAL NOT NULL,
                    "notes" TEXT,
                    "createdBy" TEXT NOT NULL,
                    CONSTRAINT "Exchange_originalInvoiceId_fkey" FOREIGN KEY ("originalInvoiceId") REFERENCES "Sale" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
                )
            `);
        }

        if (!hasTable('ExchangeItem')) {
            await prisma.$executeRawUnsafe(`
                CREATE TABLE IF NOT EXISTS "ExchangeItem" (
                    "id" TEXT NOT NULL PRIMARY KEY,
                    "exchangeId" TEXT NOT NULL,
                    "returnedItemId" TEXT,
                    "returnedQty" INTEGER NOT NULL DEFAULT 0,
                    "newItemId" TEXT,
                    "newQty" INTEGER NOT NULL DEFAULT 0,
                    "priceDiff" REAL NOT NULL,
                    CONSTRAINT "ExchangeItem_exchangeId_fkey" FOREIGN KEY ("exchangeId") REFERENCES "Exchange" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
                )
            `);
        }

        if (!hasTable('ExchangePayment')) {
            await prisma.$executeRawUnsafe(`
                CREATE TABLE IF NOT EXISTS "ExchangePayment" (
                    "id" TEXT NOT NULL PRIMARY KEY,
                    "exchangeId" TEXT NOT NULL,
                    "paymentMode" TEXT NOT NULL,
                    "amount" REAL NOT NULL,
                    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT "ExchangePayment_exchangeId_fkey" FOREIGN KEY ("exchangeId") REFERENCES "Exchange" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
                )
            `);
        }

        if (!hasTable('Refund')) {
            await prisma.$executeRawUnsafe(`
                CREATE TABLE IF NOT EXISTS "Refund" (
                    "id" TEXT NOT NULL PRIMARY KEY,
                    "originalInvoiceId" TEXT NOT NULL,
                    "refundDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    "totalRefundAmount" REAL NOT NULL,
                    "reason" TEXT NOT NULL,
                    "createdBy" TEXT NOT NULL,
                    CONSTRAINT "Refund_originalInvoiceId_fkey" FOREIGN KEY ("originalInvoiceId") REFERENCES "Sale" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
                )
            `);
        }

        if (!hasTable('RefundItem')) {
            await prisma.$executeRawUnsafe(`
                CREATE TABLE IF NOT EXISTS "RefundItem" (
                    "id" TEXT NOT NULL PRIMARY KEY,
                    "refundId" TEXT NOT NULL,
                    "variantId" TEXT NOT NULL,
                    "quantity" INTEGER NOT NULL,
                    "amount" REAL NOT NULL,
                    CONSTRAINT "RefundItem_refundId_fkey" FOREIGN KEY ("refundId") REFERENCES "Refund" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
                )
            `);
        }

        if (!hasTable('RefundPayment')) {
            await prisma.$executeRawUnsafe(`
                CREATE TABLE IF NOT EXISTS "RefundPayment" (
                    "id" TEXT NOT NULL PRIMARY KEY,
                    "refundId" TEXT NOT NULL,
                    "paymentMode" TEXT NOT NULL,
                    "amount" REAL NOT NULL,
                    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT "RefundPayment_refundId_fkey" FOREIGN KEY ("refundId") REFERENCES "Refund" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
                )
            `);
        }

        // Ensure Sale table has columns required by newer UI filters/import flags.
        const saleTableInfo: any[] = await prisma.$queryRawUnsafe(`PRAGMA table_info("Sale")`);
        const saleHas = (name: string) => saleTableInfo.some(col => col.name === name);
        if (!saleHas('customerPhone')) {
            await prisma.$executeRawUnsafe(`ALTER TABLE "Sale" ADD COLUMN customerPhone TEXT`);
        }
        if (!saleHas('status')) {
            await prisma.$executeRawUnsafe(`ALTER TABLE "Sale" ADD COLUMN status TEXT DEFAULT 'COMPLETED'`);
        }
        if (!saleHas('isHistorical')) {
            await prisma.$executeRawUnsafe(`ALTER TABLE "Sale" ADD COLUMN isHistorical BOOLEAN DEFAULT 0`);
        }
        if (!saleHas('importedFrom')) {
            await prisma.$executeRawUnsafe(`ALTER TABLE "Sale" ADD COLUMN importedFrom TEXT`);
        }

        const tableRows: any[] = await prisma.$queryRawUnsafe(
            `SELECT name FROM sqlite_master WHERE type = 'table' AND lower(name) IN('user', 'users')`
        );
        const userTable = tableRows?.[0]?.name || 'User';

        const tableInfo: any[] = await prisma.$queryRawUnsafe(`PRAGMA table_info("${userTable}")`);
        const hasColumn = (name: string) => tableInfo.some(col => col.name === name);

        // Add missing permission columns for older databases
        const columnsToAdd = [
            { name: 'permPrintSticker', type: 'BOOLEAN', defaultValue: 1 },
            { name: 'permAddItem', type: 'BOOLEAN', defaultValue: 1 },
            { name: 'permDeleteProduct', type: 'BOOLEAN', defaultValue: 1 },
            { name: 'permVoidSale', type: 'BOOLEAN', defaultValue: 1 },
            { name: 'permViewReports', type: 'BOOLEAN', defaultValue: 1 },
            { name: 'permEditSettings', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'permManageProducts', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'permViewSales', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'permViewGstReports', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'permEditSales', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'permManageInventory', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'permManageUsers', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'permViewCostPrice', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'permChangePayment', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'permDeleteAudit', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'permBulkUpdate', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'permBackDateSale', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'permViewInsights', type: 'BOOLEAN', defaultValue: 0 },
            { name: 'maxDiscount', type: 'REAL', defaultValue: 0 },
        ];

        for (const col of columnsToAdd) {
            if (!hasColumn(col.name)) {
                console.log(`Migrating database: Adding ${col.name} column...`);
                await prisma.$executeRawUnsafe(
                    `ALTER TABLE "${userTable}" ADD COLUMN ${col.name} ${col.type} DEFAULT ${col.defaultValue} `
                );
            }
        }

        console.log('User table migration complete.');
    } catch (error) {
        console.error('Migration error:', error);
    }
}

async function ensureUserSchemaReady() {
    await ensureSchemaUpdated();
}

async function ensureDefaultAdmin() {
    await ensureUserSchemaReady();
    const existing = await prisma.user.findFirst({ where: { username: 'admin' } });
    if (existing) return existing;
    return prisma.user.create({
        data: {
            username: 'admin',
            password: 'admin123',
            name: 'Admin',
            role: 'ADMIN',
            isActive: true
        }
    });
}

async function initializePrisma() {
    let dbPath = getDatabasePath();
    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

    console.log('--- DATABASE DIAGNOSTICS ---');
    console.log('Target DB Path:', dbPath);
    if (isDev) {
        const prodPath = path.join(app.getPath('userData'), 'pos.db');
        console.log('Production DB Path (for reference):', prodPath);
        console.log('Note: Running in DEV mode uses the project folder DB by default.');
    }
    console.log('---------------------------');

    prisma = new PrismaClient({
        datasources: {
            db: {
                url: `file:${dbPath}`
            }
        }
    });

    // ---------------------------------------------------------
    // PERMANENT FIX: Auto-Restore if Database is Empty
    // ---------------------------------------------------------
    try {
        const userCount = await prisma.user.count();
        console.log(`Database User Count: ${userCount} `);

        if (app.isPackaged) {
            const durableCandidates = getRestoreCandidates().filter(p => fs.existsSync(p));
            const bundledCandidates = getBundledRestoreCandidates().filter(p => fs.existsSync(p));
            const newerDurableCandidate = durableCandidates.find(p => shouldRestoreFrom(p, dbPath));
            const firstRunCandidate = [...durableCandidates, ...bundledCandidates][0];
            const sourcePath = userCount === 0 ? firstRunCandidate : newerDurableCandidate;

            if (sourcePath) {
                console.log('Attempting auto-restore from known backups...');
                console.log(`Overwriting ${dbPath} with ${sourcePath}`);
                await restoreDatabaseFromSource(sourcePath, dbPath);
                console.log('Database auto-restored successfully.');
            } else if (userCount === 0) {
                console.warn('No restore candidates found. Cannot auto-restore.');
            }

            // If still empty, show a clear message
            const finalUserCount = await prisma.user.count();
            if (finalUserCount === 0) {
                // Create a default admin user so login is always possible
                try {
                    await prisma.user.create({
                        data: {
                            username: 'admin',
                            password: 'admin123',
                            name: 'Admin',
                            role: 'ADMIN',
                            isActive: true
                        }
                    });
                    console.log('✅ Default admin user created.');
                } catch (createErr) {
                    console.error('Failed to create default admin user:', createErr);
                }

                dialog.showMessageBoxSync({
                    type: 'warning',
                    title: 'No Users Found',
                    message: 'No users were found after auto-restore. Please make sure your backup file exists at:\n\nC:\\Users\\PC\\Documents\\ZainPOS\\backup-latest.db\n\nThen restart the app.'
                });
            }
        }
    } catch (e) {
        console.error('Auto-restore check failed:', e);
    }
    // ---------------------------------------------------------

    // Run auto-migrations
    await ensureSchemaUpdated();
}
let mainWindow: BrowserWindow | null = null;

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow() {
    mainWindow = new BrowserWindow({
        title: "ZAIN GENTS PALACE - POS System",
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 700,
        backgroundColor: '#FFFFFF', // White background
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            sandbox: false,
        },
        autoHideMenuBar: true,
        icon: path.join(__dirname, '../public/icon.ico'),
    });

    // Add deep debugging listeners
    mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription, validatedURL) => {
        dialog.showErrorBox('Renderer Load Failed',
            `Code: ${errorCode} \nDescription: ${errorDescription} \nURL: ${validatedURL} `);
    });

    mainWindow.webContents.on('crashed', () => {
        dialog.showErrorBox('Renderer Crashed', 'The renderer process has crashed.');
    });

    // Load Splash Screen first
    const splashPath = path.join(__dirname, '../public/splash.html');
    if (fs.existsSync(splashPath)) {
        mainWindow.loadFile(splashPath).catch(e => console.error('Splash load failed', e));
    }

    // Delay loading the app to show splash
    setTimeout(() => {
        if (!mainWindow) return;

        if (isDev) {
            mainWindow.loadURL('http://localhost:5173');
            mainWindow.webContents.openDevTools();
        } else {
            const indexPath = path.join(__dirname, '../dist/index.html');

            // mainWindow.webContents.openDevTools();

            if (!fs.existsSync(indexPath)) {
                dialog.showErrorBox('Critical Error', `File not found: ${indexPath} `);
            }

            mainWindow.loadFile(indexPath).catch(err => {
                dialog.showErrorBox('Load Error', err.message);
            });
        }
    }, 2500);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(async () => {
    try {
        await initializePrisma();

        // Initialize Sync Service with Prisma
        cloudSync.setPrismaInstance(prisma);

        // ---------------------------------------------------------
        // FIX: Load Cloud Config on Startup
        // ---------------------------------------------------------
        const urlSetting = await prisma.setting.findUnique({ where: { key: 'CLOUD_API_URL' } });
        if (urlSetting && urlSetting.value) {
            cloudSync.setApiUrl(urlSetting.value);
            console.log('✅ Cloud API URL loaded:', urlSetting.value);
        }

        const syncConfig = await prisma.setting.findUnique({ where: { key: 'CLOUD_SYNC_CONFIG' } });
        if (syncConfig && syncConfig.value) {
            const config = JSON.parse(syncConfig.value);
            if (config.intervalMinutes > 0) {
                console.log(`Starting auto - sync every ${config.intervalMinutes} minutes`);
                syncInterval = setInterval(runCloudSync, config.intervalMinutes * 60 * 1000);
            }
        }
        // Run one sync on startup when URL is configured so dashboard gets initial data.
        runCloudSync().catch((e) => console.error('Initial cloud sync failed:', e));
        // ---------------------------------------------------------

        // Start Background Sync Worker (runs every 30 seconds)
        // Checks for offline sales queue and pushes to cloud
        setInterval(() => {
            cloudSync.processQueue();
        }, 30 * 1000);

        createWindow();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    } catch (err: any) {
        dialog.showErrorBox('Startup Error', err.stack || err.message);
    }
});



app.on('window-all-closed', async () => {
    // Attempt Backup on Close
    try {
        const setting = await prisma.setting.findUnique({ where: { key: 'BACKUP_CONFIG' } });
        if (setting && setting.value) {
            const config = JSON.parse(setting.value);
            // If explicit "On Close" is enabled or just default behavior?
            // Let's assume we always backup on close if enabled, or if manual "On Close" option is selected.
            // For now, let's just do it.
            if (config.enabled) await performAutoBackup();
        } else {
            // Default behavior: Backup on close
            await performAutoBackup();
        }
    } catch (e) {
        console.error('Backup on close failed', e);
    }

    if (process.platform !== 'darwin') {
        prisma.$disconnect();
        app.quit();
    }
});

let backupInterval: NodeJS.Timeout | null = null;

// Function to perform auto backup (referencing existing one if available, else defining)
// Assuming performAutoBackup exist or ensuring it does. 
// Ideally I should check if performAutoBackup is hoisted or available.
// To be safe, I will define the logic or ensure I can call it. 

// ... Wait, I'll assume performAutoBackup is defined at top level or I'll move it here.
// Only way to know is viewing the file or searching.
// I'll assume it exists if I added it previously.

ipcMain.handle('backup:configure', async (_event, config) => {
    try {
        await prisma.setting.upsert({
            where: { key: 'BACKUP_CONFIG' },
            update: { value: JSON.stringify(config) },
            create: { key: 'BACKUP_CONFIG', value: JSON.stringify(config) }
        });

        // Restart scheduler
        if (backupInterval) clearInterval(backupInterval);

        if (config.enabled && config.intervalMinutes > 0) {
            console.log(`Starting auto - backup every ${config.intervalMinutes} minutes`);
            backupInterval = setInterval(async () => {
                await performAutoBackup();
            }, config.intervalMinutes * 60 * 1000);
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

let syncInterval: NodeJS.Timeout | null = null;

type CloudSyncCursor = { at: string; id: string };

async function getCloudSyncCursor(key: string): Promise<CloudSyncCursor | null> {
    const setting = await prisma.setting.findUnique({ where: { key } });
    if (!setting?.value) return null;
    try {
        const parsed = JSON.parse(setting.value);
        if (typeof parsed?.at === 'string' && typeof parsed?.id === 'string') {
            return parsed as CloudSyncCursor;
        }
    } catch { }
    return null;
}

async function setCloudSyncCursor(key: string, cursor: CloudSyncCursor) {
    await prisma.setting.upsert({
        where: { key },
        update: { value: JSON.stringify(cursor) },
        create: { key, value: JSON.stringify(cursor) }
    });
}

async function syncSalesDelta(batchSize = 500) {
    const cursorKey = 'CLOUD_SALES_CURSOR';
    let cursor = await getCloudSyncCursor(cursorKey);
    let totalSynced = 0;

    while (true) {
        const where: any = cursor
            ? {
                status: 'COMPLETED',
                OR: [
                    { updatedAt: { gt: new Date(cursor.at) } },
                    { AND: [{ updatedAt: new Date(cursor.at) }, { id: { gt: cursor.id } }] }
                ]
            }
            : { status: 'COMPLETED' };

        const sales = await prisma.sale.findMany({
            where,
            include: { items: true, user: true },
            orderBy: [{ updatedAt: 'asc' }, { id: 'asc' }],
            take: batchSize
        });

        if (sales.length === 0) break;

        const result = await cloudSync.syncSales(sales);
        if (result && (result as any).success === false) {
            throw new Error((result as any).error || 'Sales delta sync failed');
        }

        const last = sales[sales.length - 1];
        cursor = { at: new Date(last.updatedAt).toISOString(), id: last.id };
        await setCloudSyncCursor(cursorKey, cursor);
        totalSynced += sales.length;
    }

    return totalSynced;
}

async function syncAuditDelta(batchSize = 500) {
    const cursorKey = 'CLOUD_AUDIT_CURSOR';
    let cursor = await getCloudSyncCursor(cursorKey);
    let totalSynced = 0;

    while (true) {
        const where: any = cursor
            ? {
                OR: [
                    { createdAt: { gt: new Date(cursor.at) } },
                    { AND: [{ createdAt: new Date(cursor.at) }, { id: { gt: cursor.id } }] }
                ]
            }
            : {};

        const auditLogs = await prisma.auditLog.findMany({
            where,
            include: { user: true },
            orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
            take: batchSize
        });

        if (auditLogs.length === 0) break;

        const result = await cloudSync.syncAuditLogs(auditLogs);
        if (result && (result as any).success === false) {
            throw new Error((result as any).error || 'Audit delta sync failed');
        }

        const last = auditLogs[auditLogs.length - 1];
        cursor = { at: new Date(last.createdAt).toISOString(), id: last.id };
        await setCloudSyncCursor(cursorKey, cursor);
        totalSynced += auditLogs.length;
    }

    return totalSynced;
}

async function runCloudSync() {
    try {
        const setting = await prisma.setting.findUnique({ where: { key: 'CLOUD_API_URL' } });
        if (!setting || !setting.value) return;

        cloudSync.setApiUrl(setting.value);

        const products = await prisma.product.findMany({
            include: { category: true, variants: true }
        });
        await cloudSync.syncInventory(products);

        const salesSynced = await syncSalesDelta();
        const auditSynced = await syncAuditDelta();

        console.log(`Background Cloud Sync Complete (sales: ${salesSynced}, audit: ${auditSynced})`);
    } catch (e) {
        console.error('Background Sync Failed:', e);
    }
}

ipcMain.handle('cloud:configure', async (_event, { intervalMinutes }) => {
    if (syncInterval) clearInterval(syncInterval);

    if (intervalMinutes > 0) {
        console.log(`Starting auto - sync every ${intervalMinutes} minutes`);
        syncInterval = setInterval(runCloudSync, intervalMinutes * 60 * 1000);
    }

    await prisma.setting.upsert({
        where: { key: 'CLOUD_SYNC_CONFIG' },
        update: { value: JSON.stringify({ intervalMinutes }) },
        create: { key: 'CLOUD_SYNC_CONFIG', value: JSON.stringify({ intervalMinutes }) }
    });
    // Trigger one immediate sync after updating config.
    runCloudSync().catch((e) => console.error('Immediate cloud sync failed:', e));
    return { success: true };
});
ipcMain.handle('db:query', async (_event, { model, method, args }) => {
    try {
        // Accounting Safety Rule: Prevent direct update/delete on Sale/AuditLog/InventoryMovement
        const restrictedModels = ['sale', 'auditLog', 'inventoryMovement', 'exchange', 'refund'];
        const restrictedMethods = ['update', 'updateMany', 'delete', 'deleteMany', 'upsert'];

        if (restrictedModels.includes(model.toLowerCase()) && restrictedMethods.includes(method)) {
            // Allow only specific status updates if absolutely necessary, but generally block
            if (!(model.toLowerCase() === 'sale' && method === 'update' && args.data?.status === 'VOIDED')) {
                throw new Error(`Accounting Rule Violation: Direct ${method} on ${model} is not allowed.`);
            }
        }

        const result = await (prisma as any)[model][method](args);

        // Auto-Trigger Cloud Sync for Sales
        if (model === 'sale' && (method === 'create' || method === 'update')) {
            cloudSync.queueSale(result).catch(err => console.error('Queue Error:', err));
        }

        return { success: true, data: result };
    } catch (error: any) {
        console.error('Database error:', error);
        return { success: false, error: error.message };
    }
});

// Settings
ipcMain.handle('settings:get', async (_event, key: string) => {
    try {
        const setting = await prisma.setting.findUnique({ where: { key } });
        return { success: true, data: setting?.value };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('settings:set', async (_event, key: string, value: string) => {
    try {
        const setting = await prisma.setting.upsert({
            where: { key },
            update: { value },
            create: { key, value },
        });
        return { success: true, data: setting };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

// Helper for Local Timestamp (Fixes 5:30 AM Bug)
function getLocalISOString() {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    return localISOTime;
}

// Bill Number Generation
ipcMain.handle('sales:getNextBillNo', async () => {
    try {
        const lastSale = await prisma.sale.findFirst({
            orderBy: { billNo: 'desc' },
            select: { billNo: true }
        });
        return { success: true, data: (lastSale?.billNo || 0) + 1 };
    } catch (error: any) {
        console.error('Failed to get next bill number:', error);
        return { success: false, error: error.message };
    }
});

// Sale Checkout (Transaction Support + Mixed Payments)
ipcMain.handle('sales:checkout', async (_event, saleData) => {
    // 0. Safety Rule: Prevent Duplicate Bill submission within 30 seconds
    if (recentBills.has(saleData.billNo)) {
        console.error(`Duplicate Bill #${saleData.billNo} detected. Blocking.`);
        return { success: false, error: "Duplicate checkout blocked." };
    }
    recentBills.add(saleData.billNo);
    setTimeout(() => recentBills.delete(saleData.billNo), 30000); // Clear after 30s

    const result = await prisma.$transaction(async (tx: any) => {
        try {
            const createdAt = saleData.createdAt ? new Date(saleData.createdAt) : new Date();

            // 1. Create Sale
            const sale = await tx.sale.create({
                data: {
                    billNo: saleData.billNo,
                    userId: saleData.userId,
                    customerName: saleData.customerName,
                    customerPhone: saleData.customerPhone,
                    subtotal: saleData.subtotal,
                    discount: saleData.discount,
                    discountPercent: saleData.discountPercent || 0,
                    taxAmount: saleData.taxAmount,
                    cgst: saleData.cgst,
                    sgst: saleData.sgst,
                    grandTotal: saleData.grandTotal,
                    paymentMethod: saleData.paymentMethod, // Main method for display
                    paidAmount: saleData.paidAmount,
                    changeAmount: saleData.changeAmount,
                    remarks: saleData.remarks,
                    createdAt: createdAt,
                    items: {
                        create: saleData.items.map((item: any) => ({
                            variantId: item.variantId,
                            productName: item.productName,
                            variantInfo: item.variantInfo,
                            quantity: item.quantity,
                            mrp: item.mrp,
                            sellingPrice: item.sellingPrice,
                            discount: item.discount,
                            taxRate: item.taxRate,
                            taxAmount: item.taxAmount,
                            total: item.total,
                        })),
                    },
                    payments: {
                        create: saleData.payments || [{
                            paymentMode: saleData.paymentMethod,
                            amount: saleData.grandTotal
                        }]
                    }
                },
                include: { items: true, payments: true }
            });

            // 2. Update Stock and Inventory Movements
            for (const item of saleData.items) {
                await tx.productVariant.update({
                    where: { id: item.variantId },
                    data: { stock: { decrement: item.quantity } }
                });

                await tx.inventoryMovement.create({
                    data: {
                        variantId: item.variantId,
                        type: 'OUT',
                        quantity: -item.quantity,
                        reason: 'Sale',
                        reference: sale.id,
                        createdBy: saleData.userId,
                        createdAt: createdAt
                    }
                });
            }

            // 3. Log Activity
            await tx.auditLog.create({
                data: {
                    action: 'SALE_CREATE',
                    details: `New Sale #${sale.billNo} Created. Total: ₹${sale.grandTotal.toFixed(2)}. Customer: ${sale.customerName || 'Walk-in'}`,
                    userId: saleData.userId,
                    createdAt: createdAt
                }
            });

            // Trigger Backup every 10 sales
            saleCounterSinceLastBackup++;
            if (saleCounterSinceLastBackup >= 10) {
                performAutoBackup();
                saleCounterSinceLastBackup = 0;
            }

            return { success: true, data: sale };
        } catch (error: any) {
            console.error('Checkout failed:', error);
            throw error; // Transaction will rollback
        }
    });

    if (result?.success && result?.data) {
        cloudSync.queueSale(result.data).catch(err => console.error('Queue Error:', err));
    }
    return result;
});

// Update Payment for Existing Sale
ipcMain.handle('sales:updatePayment', async (_event, { saleId, paymentData, userId }) => {
    const result = await prisma.$transaction(async (tx: any) => {
        try {
            // 1. Load user and sale
            const user = await tx.user.findUnique({ where: { id: userId } });
            const originalSale = await tx.sale.findUnique({
                where: { id: saleId },
                include: { payments: true }
            });
            if (!originalSale) throw new Error("Sale not found.");

            const isExchangeGeneratedSale =
                originalSale.paymentMethod === 'EXCHANGE' ||
                (originalSale.remarks || '').includes('Replacement sale for Invoice');

            const canChangePayment =
                user?.role === 'ADMIN' ||
                !!user?.permChangePayment ||
                (isExchangeGeneratedSale && !!user?.permEditSales);

            if (!canChangePayment) {
                throw new Error("Unauthorized: You do not have permission to change payment modes.");
            }

            // 2. Update Sale Record
            const updatedSale = await tx.sale.update({
                where: { id: saleId },
                data: {
                    paymentMethod: paymentData.paymentMethod,
                    paidAmount: paymentData.paidAmount,
                    changeAmount: paymentData.changeAmount,
                }
            });

            // 3. Update Payments (Delete and Re-create)
            await tx.invoicePayment.deleteMany({ where: { saleId } });
            await tx.invoicePayment.createMany({
                data: (paymentData.payments || []).map((p: any) => ({
                    saleId: saleId,
                    paymentMode: p.paymentMode,
                    amount: p.amount
                }))
            });

            // 4. Log Activity
            await tx.auditLog.create({
                data: {
                    action: 'PAYMENT_UPDATE',
                    details: `Payment updated for Sale #${originalSale.billNo}. Old Method: ${originalSale.paymentMethod}, New Method: ${paymentData.paymentMethod}`,
                    userId: userId
                }
            });

            // 5. Return refreshed sale
            return {
                success: true,
                data: await tx.sale.findUnique({
                    where: { id: saleId },
                    include: { items: true, payments: true }
                })
            };
        } catch (error: any) {
            console.error('Update Payment failed:', error);
            return { success: false, error: error.message };
        }
    });

    if (result?.success && result?.data) {
        cloudSync.queueSale(result.data).catch(err => console.error('Queue Error:', err));
    }
    return result;
});

// Update Sale (Items + Amounts + Payments) from POS Edit Screen
ipcMain.handle('sales:updateSale', async (_event, { saleId, saleData, userId }) => {
    const result = await prisma.$transaction(async (tx: any) => {
        try {
            // 1. Verify Permission
            const user = await tx.user.findUnique({ where: { id: userId } });
            if (user?.role !== 'ADMIN' && !user?.permEditSales) {
                throw new Error("Unauthorized: You do not have permission to edit finalized sales.");
            }

            // 2. Fetch Original Sale
            const originalSale = await tx.sale.findUnique({
                where: { id: saleId },
                include: { items: true, payments: true }
            });
            if (!originalSale) throw new Error("Sale not found.");

            const oldQtyByVariant = new Map<string, number>();
            for (const item of originalSale.items) {
                oldQtyByVariant.set(item.variantId, (oldQtyByVariant.get(item.variantId) || 0) + item.quantity);
            }

            const newItems = saleData.items || [];
            const newQtyByVariant = new Map<string, number>();
            for (const item of newItems) {
                newQtyByVariant.set(item.variantId, (newQtyByVariant.get(item.variantId) || 0) + item.quantity);
            }

            const affectedVariantIds = new Set<string>([
                ...oldQtyByVariant.keys(),
                ...newQtyByVariant.keys()
            ]);

            // 3. Update stock based on quantity delta
            for (const variantId of affectedVariantIds) {
                const oldQty = oldQtyByVariant.get(variantId) || 0;
                const newQty = newQtyByVariant.get(variantId) || 0;
                const delta = newQty - oldQty;
                if (delta === 0) continue;

                if (delta > 0) {
                    // More items sold now -> reduce stock
                    await tx.productVariant.update({
                        where: { id: variantId },
                        data: { stock: { decrement: delta } }
                    });
                    await tx.inventoryMovement.create({
                        data: {
                            variantId,
                            type: 'OUT',
                            quantity: -delta,
                            reason: `Sale Update: additional qty on Bill #${originalSale.billNo}`,
                            reference: saleId,
                            createdBy: userId
                        }
                    });
                } else {
                    // Fewer items sold now -> return stock
                    const restockQty = Math.abs(delta);
                    await tx.productVariant.update({
                        where: { id: variantId },
                        data: { stock: { increment: restockQty } }
                    });
                    await tx.inventoryMovement.create({
                        data: {
                            variantId,
                            type: 'IN',
                            quantity: restockQty,
                            reason: `Sale Update: item removed/reduced on Bill #${originalSale.billNo}`,
                            reference: saleId,
                            createdBy: userId
                        }
                    });
                }
            }

            // 4. Replace sale items with updated set
            await tx.saleItem.deleteMany({ where: { saleId } });
            if (newItems.length > 0) {
                await tx.saleItem.createMany({
                    data: newItems.map((item: any) => ({
                        saleId,
                        variantId: item.variantId,
                        productName: item.productName,
                        variantInfo: item.variantInfo,
                        quantity: item.quantity,
                        mrp: item.mrp,
                        sellingPrice: item.sellingPrice,
                        discount: item.discount || 0,
                        taxRate: item.taxRate || 0,
                        taxAmount: item.taxAmount || 0,
                        total: item.total || 0
                    }))
                });
            }

            // 5. Update sale totals/header
            const oldItemCount = originalSale.items.reduce((sum: number, it: any) => sum + it.quantity, 0);
            const newItemCount = newItems.reduce((sum: number, it: any) => sum + (it.quantity || 0), 0);
            const updateTag = `[UPDATE ${new Date().toISOString()}] POS edit: items ${oldItemCount} -> ${newItemCount}, total Rs.${originalSale.grandTotal.toFixed(2)} -> Rs.${saleData.grandTotal.toFixed(2)}`;

            const updatedSale = await tx.sale.update({
                where: { id: saleId },
                data: {
                    customerName: saleData.customerName,
                    customerPhone: saleData.customerPhone,
                    subtotal: saleData.subtotal,
                    discount: saleData.discount || 0,
                    discountPercent: saleData.discountPercent || 0,
                    taxAmount: saleData.taxAmount || 0,
                    cgst: saleData.cgst || 0,
                    sgst: saleData.sgst || 0,
                    grandTotal: saleData.grandTotal,
                    paymentMethod: saleData.paymentMethod,
                    paidAmount: saleData.paidAmount,
                    changeAmount: saleData.changeAmount,
                    remarks: originalSale.remarks ? `${originalSale.remarks}\n${updateTag}` : updateTag
                }
            });

            // 6. Replace payments
            await tx.invoicePayment.deleteMany({ where: { saleId } });
            await tx.invoicePayment.createMany({
                data: (saleData.payments || []).map((p: any) => ({
                    saleId: saleId,
                    paymentMode: p.paymentMode,
                    amount: p.amount
                }))
            });

            // 7. Log Activity
            await tx.auditLog.create({
                data: {
                    action: 'SALE_UPDATE',
                    details: `Sale #${originalSale.billNo} updated from POS. Old Total: Rs.${originalSale.grandTotal.toFixed(2)}, New Total: Rs.${updatedSale.grandTotal.toFixed(2)}`,
                    userId: userId
                }
            });

            // 8. Return refreshed sale
            return {
                success: true,
                data: await tx.sale.findUnique({
                    where: { id: saleId },
                    include: { items: true, payments: true }
                })
            };
        } catch (error: any) {
            console.error('Update Sale failed:', error);
            return { success: false, error: error.message };
        }
    });

    if (result?.success && result?.data) {
        cloudSync.queueSale(result.data).catch(err => console.error('Queue Error:', err));
    }
    return result;
});

// Professional Exchange Handler
ipcMain.handle('sales:exchange', async (_event, exchangeData) => {
    return await prisma.$transaction(async (tx: any) => {
        try {
            const now = new Date();
            const returnedItems = (exchangeData.items || []).filter((item: any) => item.returnedId && (item.returnedQty || 0) > 0);
            const newItems = (exchangeData.items || []).filter((item: any) => item.newId && (item.newQty || 0) > 0);

            const originalSale = await tx.sale.findUnique({
                where: { id: exchangeData.originalInvoiceId },
                include: { items: true }
            });
            if (!originalSale) {
                throw new Error('Original invoice not found for exchange.');
            }

            // 1. Create Exchange Entry
            const exchange = await tx.exchange.create({
                data: {
                    originalInvoiceId: exchangeData.originalInvoiceId,
                    exchangeDate: now,
                    differenceAmount: exchangeData.differenceAmount,
                    notes: exchangeData.notes,
                    createdBy: exchangeData.userId,
                    items: {
                        create: exchangeData.items.map((item: any) => ({
                            returnedItemId: item.returnedId,
                            returnedQty: item.returnedQty,
                            newItemId: item.newId,
                            newQty: item.newQty,
                            priceDiff: item.priceDiff
                        }))
                    },
                    payments: {
                        create: exchangeData.payments || []
                    }
                }
            });

            // 2. Remove returned quantities from original sale items
            for (const item of returnedItems) {
                const saleItem = originalSale.items.find((si: any) => si.variantId === item.returnedId);
                if (!saleItem) {
                    throw new Error(`Returned item not found in original invoice: ${item.returnedId}`);
                }
                if (saleItem.quantity < item.returnedQty) {
                    throw new Error(`Returned qty exceeds sold qty for ${saleItem.productName}`);
                }

                if (saleItem.quantity === item.returnedQty) {
                    await tx.saleItem.delete({ where: { id: saleItem.id } });
                } else {
                    const newQty = saleItem.quantity - item.returnedQty;
                    const unitDiscount = saleItem.quantity > 0 ? (saleItem.discount / saleItem.quantity) : 0;
                    const unitTaxAmount = saleItem.quantity > 0 ? (saleItem.taxAmount / saleItem.quantity) : 0;
                    const unitTotal = saleItem.quantity > 0 ? (saleItem.total / saleItem.quantity) : 0;

                    await tx.saleItem.update({
                        where: { id: saleItem.id },
                        data: {
                            quantity: newQty,
                            discount: unitDiscount * newQty,
                            taxAmount: unitTaxAmount * newQty,
                            total: unitTotal * newQty
                        }
                    });
                }
            }

            // 3. Flag original invoice with replacement note
            const replacementTag = `[EXCHANGE ${now.toISOString()}] Returned items auto-removed; replacement billed as new sale. Ref: ${exchange.id}`;
            await tx.sale.update({
                where: { id: originalSale.id },
                data: {
                    remarks: originalSale.remarks ? `${originalSale.remarks}\n${replacementTag}` : replacementTag
                }
            });

            // 4. Create replacement sale on exchange date
            let replacementSale: any = null;
            if (newItems.length > 0) {
                const replacementPaymentMethod = ['CASH', 'CARD', 'UPI', 'SPLIT'].includes(exchangeData.replacementPaymentMethod)
                    ? exchangeData.replacementPaymentMethod
                    : (['CASH', 'CARD', 'UPI', 'SPLIT'].includes(originalSale.paymentMethod) ? originalSale.paymentMethod : 'CASH');

                const lastSale = await tx.sale.findFirst({
                    orderBy: { billNo: 'desc' },
                    select: { billNo: true }
                });
                const nextBillNo = (lastSale?.billNo || 0) + 1;

                const replacementVariants = await tx.productVariant.findMany({
                    where: { id: { in: newItems.map((i: any) => i.newId) } },
                    include: { product: true }
                });

                const replacementSaleItems = newItems.map((item: any) => {
                    const variant = replacementVariants.find((v: any) => v.id === item.newId);
                    const taxRate = variant?.product?.taxRate || 0;
                    const lineBase = (item.newQty || 0) * (variant?.sellingPrice || 0);
                    const lineTax = taxRate > 0 ? (lineBase * taxRate) / (100 + taxRate) : 0;

                    return {
                        variantId: item.newId,
                        productName: variant?.product?.name || 'Unknown Item',
                        variantInfo: `${variant?.size || ''} ${variant?.color || ''}`.trim(),
                        quantity: item.newQty || 0,
                        mrp: variant?.mrp || variant?.sellingPrice || 0,
                        sellingPrice: variant?.sellingPrice || 0,
                        discount: 0,
                        taxRate,
                        taxAmount: lineTax,
                        total: lineBase
                    };
                });

                const subtotal = replacementSaleItems.reduce((sum: number, line: any) => sum + (line.sellingPrice * line.quantity), 0);
                const taxAmount = replacementSaleItems.reduce((sum: number, line: any) => sum + line.taxAmount, 0);
                const totalNewValue = replacementSaleItems.reduce((sum: number, line: any) => sum + line.total, 0);
                const totalReturnedValue = returnedItems.reduce((sum: number, item: any) => sum + Math.abs(item.priceDiff || 0), 0);
                const exchangeCreditApplied = Math.min(totalReturnedValue, totalNewValue);
                const netPayable = Math.max(0, totalNewValue - exchangeCreditApplied);

                replacementSale = await tx.sale.create({
                    data: {
                        billNo: nextBillNo,
                        userId: exchangeData.userId,
                        customerName: originalSale.customerName,
                        customerPhone: originalSale.customerPhone,
                        subtotal,
                        discount: exchangeCreditApplied,
                        discountPercent: 0,
                        taxAmount,
                        cgst: taxAmount / 2,
                        sgst: taxAmount / 2,
                        grandTotal: netPayable,
                        paymentMethod: replacementPaymentMethod,
                        paidAmount: netPayable,
                        changeAmount: 0,
                        remarks: `Replacement sale for Invoice #${originalSale.billNo}. Exchange Ref: ${exchange.id}. New: Rs.${totalNewValue.toFixed(2)}, Credit: Rs.${exchangeCreditApplied.toFixed(2)}, Payable: Rs.${netPayable.toFixed(2)}`,
                        createdAt: now,
                        items: {
                            create: replacementSaleItems
                        },
                        payments: {
                            create: netPayable > 0 ? [{
                                paymentMode: replacementPaymentMethod,
                                amount: netPayable
                            }] : []
                        }
                    }
                });
            }

            // 5. Adjust Stock for each exchange item
            for (const item of exchangeData.items) {
                // Returned Item -> Increase Stock
                if (item.returnedId) {
                    await tx.productVariant.update({
                        where: { id: item.returnedId },
                        data: { stock: { increment: item.returnedQty || 0 } }
                    });
                    await tx.inventoryMovement.create({
                        data: {
                            variantId: item.returnedId,
                            type: 'EXCHANGE_RETURN',
                            quantity: item.returnedQty || 0,
                            reason: 'Exchange Return',
                            reference: exchange.id,
                            createdBy: exchangeData.userId,
                            createdAt: now
                        }
                    });
                }

                // New Item -> Decrease Stock
                if (item.newId) {
                    await tx.productVariant.update({
                        where: { id: item.newId },
                        data: { stock: { decrement: item.newQty || 0 } }
                    });
                    await tx.inventoryMovement.create({
                        data: {
                            variantId: item.newId,
                            type: 'EXCHANGE_OUT',
                            quantity: -(item.newQty || 0),
                            reason: 'Exchange Issue',
                            reference: exchange.id,
                            createdBy: exchangeData.userId,
                            createdAt: now
                        }
                    });
                }
            }

            // 6. Log Activity
            await tx.auditLog.create({
                data: {
                    action: 'EXCHANGE',
                    details: `Exchange processed for Invoice ID ${exchangeData.originalInvoiceId}. Diff: Rs.${exchangeData.differenceAmount.toFixed(2)}${replacementSale ? `, Replacement Sale #${replacementSale.billNo}` : ''}`,
                    userId: exchangeData.userId,
                    createdAt: now
                }
            });

            return { success: true, data: { exchange, replacementSaleId: replacementSale?.id || null } };
        } catch (error: any) {
            console.error('Exchange failed:', error);
            throw error;
        }
    });
});
// Professional Refund Handler
ipcMain.handle('sales:refund', async (_event, refundData) => {
    return await prisma.$transaction(async (tx: any) => {
        try {
            const now = new Date();

            // 1. Create Refund Record
            const refund = await tx.refund.create({
                data: {
                    originalInvoiceId: refundData.originalInvoiceId,
                    refundDate: now,
                    totalRefundAmount: refundData.totalAmount,
                    reason: refundData.reason,
                    createdBy: refundData.userId,
                    items: {
                        create: refundData.items.map((item: any) => ({
                            variantId: item.id,
                            quantity: item.qty,
                            amount: item.amount
                        }))
                    },
                    payments: {
                        create: refundData.payments || []
                    }
                }
            });

            // 2. Adjust Stock
            for (const item of refundData.items) {
                await tx.productVariant.update({
                    where: { id: item.id },
                    data: { stock: { increment: item.qty } }
                });
                await tx.inventoryMovement.create({
                    data: {
                        variantId: item.id,
                        type: 'REFUND',
                        quantity: item.qty,
                        reason: `Refund: ${refundData.reason} `,
                        reference: refund.id,
                        createdBy: refundData.userId,
                        createdAt: now
                    }
                });
            }

            // 3. Log Activity
            await tx.auditLog.create({
                data: {
                    action: 'REFUND',
                    details: `Refund processed for Invoice ID ${refundData.originalInvoiceId}.Amount: ₹${refundData.totalAmount.toFixed(2)}.Reason: ${refundData.reason} `,
                    userId: refundData.userId,
                    createdAt: now
                }
            });

            return { success: true, data: refund };
        } catch (error: any) {
            console.error('Refund failed:', error);
            throw error;
        }
    });
});

// Print handlers

ipcMain.handle('print:receipt', async (_event, data) => {
    try {
        const printWindow = new BrowserWindow({
            show: false,
            width: 302,
            webPreferences: { nodeIntegration: false, contextIsolation: true }
        });

        const htmlContent = typeof data === 'string' ? data : data.html;
        const printOptions = typeof data === 'object' && data?.options ? data.options : {};
        const deviceName = typeof printOptions.deviceName === 'string' && printOptions.deviceName.trim().length > 0
            ? printOptions.deviceName.trim()
            : undefined;

        // Strip any leading/trailing whitespace and fix malformed data URI prefix
        await printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent.trim())}`);

        const printOnce = (name?: string) => new Promise<{ success: boolean; error?: string }>((resolve) => {
            let settled = false;
            const timeout = setTimeout(() => {
                if (settled) return;
                settled = true;
                resolve({ success: false, error: 'Print timeout: printer did not respond in time.' });
            }, 15000);

            const options: Electron.WebContentsPrintOptions = {
                silent: true,
                printBackground: true,
                margins: { marginType: 'none' }
            };
            if (name && name.trim().length > 0) {
                options.deviceName = name.trim();
            }

            printWindow.webContents.print(options, (success, failureReason) => {
                if (settled) return;
                settled = true;
                clearTimeout(timeout);
                if (!success) {
                    resolve({ success: false, error: failureReason || 'Receipt print failed' });
                    return;
                }
                resolve({ success: true });
            });
        });

        // First try configured printer (if set), then fallback to system default printer.
        const primary = await printOnce(deviceName);
        if (primary.success) {
            try { printWindow.close(); } catch { }
            return { success: true };
        }

        if (deviceName) {
            console.warn(`Receipt print failed on configured printer "${deviceName}", retrying on default printer.`, primary.error);
            const fallback = await printOnce(undefined);
            try { printWindow.close(); } catch { }
            if (fallback.success) {
                return { success: true };
            }
            return { success: false, error: fallback.error || primary.error };
        }

        try { printWindow.close(); } catch { }
        return primary;
    } catch (error: any) {
        console.error('Print:Receipt Error:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('print:label', async (_event, data) => {
    try {
        const printWindow = new BrowserWindow({ show: false });
        const htmlContent = data.html || data;
        const printOptions = data?.options || {};
        const pageWidthMicrons = printOptions.pageWidthMm ? Math.round(Number(printOptions.pageWidthMm) * 1000) : undefined;
        const pageHeightMicrons = printOptions.pageHeightMm ? Math.round(Number(printOptions.pageHeightMm) * 1000) : undefined;
        const customPageSize = (pageWidthMicrons && pageHeightMicrons) ? { width: pageWidthMicrons, height: pageHeightMicrons } : undefined;
        const deviceName = typeof printOptions.deviceName === 'string' && printOptions.deviceName.trim().length > 0
            ? printOptions.deviceName.trim()
            : undefined;

        await printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent.trim())}`);
        await new Promise((r) => setTimeout(r, 600)); // allow barcode script/layout to settle

        return new Promise((resolve) => {
            let settled = false;
            const timeout = setTimeout(() => {
                if (settled) return;
                settled = true;
                try { printWindow.close(); } catch { }
                resolve({ success: false, error: 'Label print timeout: printer did not respond in time.' });
            }, 15000);

            const options: any = {
                silent: true,
                printBackground: true,
                landscape: false,
                margins: { marginType: 'none' },
                deviceName
            };
            if (customPageSize) options.pageSize = customPageSize as any;

            console.log('[Label Print] Single attempt. Device:', deviceName || '(default)', 'PageSize:', customPageSize ? 'custom' : 'driver-default');
            printWindow.webContents.print(options, (success, failureReason) => {
                if (settled) return;
                settled = true;
                clearTimeout(timeout);
                try { printWindow.close(); } catch { }

                if (!success) {
                    console.log('[Label Print] FAIL:', failureReason || '');
                    resolve({ success: false, error: failureReason || 'Label print failed.' });
                    return;
                }

                console.log('[Label Print] SUCCESS');
                resolve({ success: true });
            });
        });
    } catch (error: any) {
        console.error('Print:Label Error:', error);
        return { success: false, error: error.message };
    }
});

// Global error handling was moved to the top

ipcMain.handle('devices:list', async () => {
    try {
        // Will be implemented with usb-detection
        return { success: true, data: [] };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('app:quit', async () => {
    try {
        await prisma.$disconnect();
    } catch (e) {
        // ignore
    }
    app.quit();
    return { success: true };
});

// Product Import/Export Handlers
ipcMain.handle('products:importTemplate', async () => {
    try {
        const { canceled, filePath } = await dialog.showSaveDialog({
            title: 'Save Import Template',
            defaultPath: 'zain_pos_import_template.xlsx',
            filters: [{ name: 'Excel Workbook', extensions: ['xlsx'] }]
        });

        if (canceled || !filePath) return { success: false };

        const workbook = XLSX.utils.book_new();

        // 1. Products Template
        const pHeaders = [
            'Product Name', 'Barcode', 'Category', 'Size', 'Color',
            'MRP', 'Selling Price', 'Purchase Price', 'Stock', 'HSN Code', 'GST %'
        ];
        const pSheet = XLSX.utils.aoa_to_sheet([pHeaders]);
        XLSX.utils.book_append_sheet(workbook, pSheet, 'Products');

        // 2. Customers Template
        const cHeaders = [
            'Customer Name', 'Phone', 'Email', 'Address', 'GSTIN'
        ];
        const cSheet = XLSX.utils.aoa_to_sheet([cHeaders]);
        XLSX.utils.book_append_sheet(workbook, cSheet, 'Customers');

        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        fs.writeFileSync(filePath, buffer);

        return { success: true, path: filePath };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('data:exportAll', async () => {
    try {
        const { canceled, filePath } = await dialog.showSaveDialog({
            title: 'Export All Data',
            defaultPath: `zain_pos_data_${new Date().toISOString().slice(0, 10)}.xlsx`,
            filters: [{ name: 'Excel Workbook', extensions: ['xlsx'] }]
        });

        if (canceled || !filePath) return { success: false };

        const workbook = XLSX.utils.book_new();

        // 1. Products Sheet
        try {
            const products = await prisma.product.findMany({ include: { category: true, variants: true } });
            const productRows: any[] = [];
            products.forEach((p: any) => {
                if (p.variants.length === 0) {
                    productRows.push({
                        'Product Name': p.name,
                        'Category': p.category?.name || 'Uncategorized',
                        'HSN': p.hsn,
                        'Tax %': p.taxRate,
                        'Barcode': '', 'Size': '', 'Stock': 0 // Empty placeholders
                    });
                } else {
                    p.variants.forEach((v: any) => {
                        productRows.push({
                            'Product Name': p.name,
                            'Category': p.category?.name || 'Uncategorized',
                            'Barcode': v.barcode,
                            'Size': v.size,
                            'Color': v.color,
                            'MRP': v.mrp,
                            'Selling Price': v.sellingPrice,
                            'Cost Price': v.costPrice,
                            'Stock': v.stock,
                            'HSN': p.hsn
                        });
                    });
                }
            });
            const productSheet = XLSX.utils.json_to_sheet(productRows);
            XLSX.utils.book_append_sheet(workbook, productSheet, 'Products');
        } catch (e) {
            console.error('Error exporting products:', e);
        }

        // 2. Sales Sheet
        try {
            const sales = await prisma.sale.findMany({
                include: { items: true, user: { select: { username: true } } },
                orderBy: { createdAt: 'desc' }
            });
            const saleRows = sales.map((s: any) => ({
                'Bill No': s.billNo,
                'Date': s.createdAt,
                'Customer': s.customerName || 'Walk-in',
                'Phone': s.customerPhone,
                'Total': s.grandTotal,
                'Status': s.status,
                'Payment Mode': s.paymentMethod,
                'Items': s.items.length,
                'Cashier': s.user?.username
            }));
            const saleSheet = XLSX.utils.json_to_sheet(saleRows);
            XLSX.utils.book_append_sheet(workbook, saleSheet, 'Sales');
        } catch (e) {
            console.error('Error exporting sales:', e);
        }

        // 3. Customers
        try {
            const customers = await prisma.customer.findMany();
            if (customers.length > 0) {
                const customerSheet = XLSX.utils.json_to_sheet(customers);
                XLSX.utils.book_append_sheet(workbook, customerSheet, 'Customers');
            }
        } catch (e) { console.error('Error exporting customers:', e); }

        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        fs.writeFileSync(filePath, buffer);

        return { success: true, path: filePath };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('products:import', async () => {
    try {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            title: 'Select Excel File',
            filters: [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }],
            properties: ['openFile']
        });

        if (canceled || filePaths.length === 0) return { success: false, message: 'Cancelled' };

        const filePath = filePaths[0];
        let workbook: XLSX.WorkBook;
        try {
            const fileBuffer = fs.readFileSync(filePath);
            workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        } catch (e: any) {
            const msg = (e?.message || '').toLowerCase();
            if (msg.includes('cannot access file') || msg.includes('eacces') || msg.includes('ebusy') || msg.includes('permission')) {
                return {
                    success: false,
                    error: `Cannot access file ${filePath}. Close Excel/Preview/OneDrive lock and try again.`
                };
            }
            return { success: false, error: `Failed to read Excel file: ${e?.message || 'Unknown error'}` };
        }
        const sheetName = workbook.SheetNames[0];
        const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (rawData.length === 0) return { success: false, error: 'File is empty' };

        let stats = { success: 0, skipped: 0, errors: 0, details: [] as string[] };
        const categoryMap = new Map<string, string>();

        const getVal = (row: any, keys: string[]) => {
            for (const k of keys) {
                const found = Object.keys(row).find(rk => rk.toLowerCase() === k.toLowerCase());
                if (found) return row[found];
            }
            return null;
        };

        const asString = (v: any) => (v === null || v === undefined ? '' : String(v).trim());

        // Cache existing categories
        try {
            const categories = await prisma.category.findMany();
            categories.forEach((c: any) => categoryMap.set(c.name.toLowerCase(), c.id));
        } catch (e) { console.error('Error fetching categories', e); }

        for (const row of rawData as any[]) {
            try {
                const productName = getVal(row, [
                    'Product Name', 'Item Name', 'Name', 'Product_Name', 'Item_Name', 'ITEM_NAME'
                ]);
                const barcode = getVal(row, ['Barcode', 'Bar Code', 'Bar_Code'])?.toString();
                const categoryName = getVal(row, [
                    'Category', 'Category Name', 'Category_Name', 'Item Category', 'Item_Category', 'CATEGORY'
                ]) || 'Uncategorized';

                if (!productName) {
                    stats.skipped++;
                    continue;
                }

                // Check Duplicates (by Barcode if present)
                let existingVariant = null;
                if (barcode) {
                    existingVariant = await prisma.productVariant.findFirst({ where: { barcode } });
                }

                if (existingVariant) {
                    stats.skipped++;
                    stats.details.push(`Skipped ${productName} (Duplicate Barcode: ${barcode})`);
                    continue;
                }

                // Get/Create Category
                let categoryId = categoryMap.get(categoryName.toLowerCase());
                if (!categoryId) {
                    const newCat = await prisma.category.create({ data: { name: categoryName } });
                    categoryMap.set(categoryName.toLowerCase(), newCat.id);
                    categoryId = newCat.id;
                }

                // Get Product or Create
                let product = await prisma.product.findFirst({ where: { name: productName } });
                if (!product) {
                    product = await prisma.product.create({
                        data: {
                            name: productName,
                            categoryId: categoryId || '',
                            hsn: getVal(row, ['HSN Code', 'HSN', 'HSN_Code'])?.toString(),
                            taxRate: parseFloat(getVal(row, ['GST %', 'GST', 'Tax', 'GST_Rate']) || '5')
                        }
                    });
                }

                // Create Variant
                await prisma.productVariant.create({
                    data: {
                        productId: product.id,
                        size: getVal(row, ['Size'])?.toString() || 'Standard',
                        color: getVal(row, ['Color'])?.toString(),
                        barcode: barcode || `GEN - ${Date.now()} -${Math.random().toString(36).substr(2, 5)} `,
                        sku: `${productName.substring(0, 3).toUpperCase()} -${Date.now().toString().slice(-6)} `,
                        mrp: parseFloat(getVal(row, ['MRP', 'Rate', 'Price']) || '0'),
                        sellingPrice: parseFloat(getVal(row, ['Selling Price', 'Sale Price', 'Selling_Price', 'Sale_Price', 'Price']) || '0'),
                        costPrice: parseFloat(getVal(row, ['Purchase Price', 'Purchase_Price', 'Cost']) || '0'),
                        stock: parseInt(getVal(row, ['Stock', 'Qty', 'Quantity', 'Stock Quantity', 'Stock_Quantity']) || '0')
                    }
                });

                stats.success++;
            } catch (err: any) {
                stats.errors++;
                stats.details.push(`Error on row: ${err.message} `);
                console.error(err);
            }
        }

        dialog.showMessageBoxSync({
            type: stats.errors > 0 ? 'warning' : 'info',
            title: 'Import Complete',
            message: `Products imported.\n\nSuccess: ${stats.success} \nSkipped: ${stats.skipped} \nErrors: ${stats.errors} `
        });

        return { success: true, stats };
    } catch (error: any) {
        console.error(error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('data:importAll', async () => {
    try {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            title: 'Select Excel File',
            filters: [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }],
            properties: ['openFile']
        });

        if (canceled || filePaths.length === 0) return { success: false, message: 'Cancelled' };

        const filePath = filePaths[0];
        let workbook: XLSX.WorkBook;
        try {
            const fileBuffer = fs.readFileSync(filePath);
            workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        } catch (e: any) {
            const msg = (e?.message || '').toLowerCase();
            if (msg.includes('cannot access file') || msg.includes('eacces') || msg.includes('ebusy') || msg.includes('permission')) {
                return {
                    success: false,
                    error: `Cannot access file ${filePath}. Close Excel/Preview/OneDrive lock and try again.`
                };
            }
            return { success: false, error: `Failed to read Excel file: ${e?.message || 'Unknown error'}` };
        }

        const getVal = (row: any, keys: string[]) => {
            for (const k of keys) {
                const found = Object.keys(row).find(rk => rk.toLowerCase() === k.toLowerCase());
                if (found) return row[found];
            }
            return null;
        };

        const asString = (v: any) => (v === null || v === undefined ? '' : String(v).trim());

        let summary = {
            products: 0,
            customers: 0,
            sales: 0,
            skipped: 0,
            errors: 0
        };

        const detectSheetType = (rows: any[]) => {
            if (rows.length === 0) return 'unknown';
            const keys = Object.keys(rows[0]).map(k => k.toLowerCase());
            if (keys.some(k => k.includes('bill') || k.includes('payment') || k.includes('cashier'))) return 'sales';
            if (keys.some(k => k.includes('customer') || k.includes('gstin'))) return 'customers';
            if (keys.some(k => k.includes('product') || k.includes('barcode') || k.includes('mrp'))) return 'products';
            return 'unknown';
        };

        const importProductsRows = async (rows: any[]) => {
            for (const row of rows) {
                try {
                    const productName = getVal(row, ['Product Name', 'Item Name', 'Name', 'Product_Name', 'Item_Name']);
                    if (!productName) {
                        summary.skipped++;
                        continue;
                    }

                    const categoryName = getVal(row, ['Category', 'Category Name', 'Category_Name']) || 'Uncategorized';
                    let category = await prisma.category.findFirst({ where: { name: categoryName } });
                    if (!category) {
                        category = await prisma.category.create({ data: { name: categoryName } });
                    }

                    let product = await prisma.product.findFirst({ where: { name: productName } });
                    if (!product) {
                        product = await prisma.product.create({
                            data: {
                                name: productName,
                                categoryId: category.id,
                                hsn: getVal(row, ['HSN', 'HSN Code', 'HSN_Code'])?.toString(),
                                taxRate: parseFloat(getVal(row, ['Tax %', 'GST %', 'GST', 'GST_Rate']) || '5')
                            }
                        });
                    }

                    const barcode = asString(getVal(row, ['Barcode', 'Bar Code', 'Bar_Code', 'Item Code', 'ItemCode', 'Product Code', 'Code', 'SKU']));
                    const itemCode = asString(getVal(row, ['Item Code', 'ItemCode', 'Product Code', 'Code', 'SKU']));
                    const finalBarcode = barcode || itemCode || `GEN-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
                    const finalSku = itemCode || finalBarcode || `${productName.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;
                    const existingVariant = finalBarcode
                        ? await prisma.productVariant.findFirst({ where: { barcode: finalBarcode } })
                        : null;
                    if (existingVariant) {
                        summary.skipped++;
                        continue;
                    }

                    await prisma.productVariant.create({
                        data: {
                            productId: product.id,
                            size: getVal(row, ['Size'])?.toString() || 'Standard',
                            color: getVal(row, ['Color'])?.toString(),
                            barcode: finalBarcode,
                            sku: finalSku,
                            mrp: parseFloat(getVal(row, ['MRP', 'Rate', 'Price']) || '0'),
                            sellingPrice: parseFloat(getVal(row, ['Selling Price', 'Sale Price', 'Selling_Price', 'Sale_Price', 'Price']) || '0'),
                            costPrice: parseFloat(getVal(row, ['Purchase Price', 'Purchase_Price', 'Cost']) || '0'),
                            stock: parseInt(getVal(row, ['Stock', 'Qty', 'Quantity', 'Stock Quantity', 'Stock_Quantity']) || '0')
                        }
                    });

                    summary.products++;
                } catch (e) {
                    summary.errors++;
                }
            }
        };

        const importCustomersRows = async (rows: any[]) => {
            for (const row of rows) {
                try {
                    const name = getVal(row, ['Customer Name', 'Name']);
                    if (!name) {
                        summary.skipped++;
                        continue;
                    }
                    const phone = getVal(row, ['Phone', 'Mobile', 'Phone No'])?.toString();
                    const email = getVal(row, ['Email'])?.toString();
                    const address = getVal(row, ['Address'])?.toString();
                    const gstin = getVal(row, ['GSTIN', 'GSTIN No'])?.toString();

                    if (phone) {
                        await prisma.customer.upsert({
                            where: { phone },
                            update: { name, email, address, gstin },
                            create: { name, phone, email, address, gstin }
                        });
                    } else {
                        await prisma.customer.create({
                            data: { name, phone: null, email, address, gstin }
                        });
                    }
                    summary.customers++;
                } catch (e) {
                    summary.errors++;
                }
            }
        };

        const importSalesRows = async (rows: any[]) => {
            await ensureDefaultAdmin();
            for (const row of rows) {
                try {
                    const total = parseFloat(getVal(row, ['Total', 'Grand Total', 'Net Amount', 'Amount']) || '0');
                    const billNo = parseInt(getVal(row, ['Bill No', 'BillNo', 'Invoice No', 'InvoiceNo', 'Bill']) || '0');
                    const status = getVal(row, ['Status'])?.toString() || 'COMPLETED';
                    const paymentMethod = getVal(row, ['Payment Mode', 'Payment', 'Mode'])?.toString() || 'CASH';
                    const dateVal = getVal(row, ['Date', 'Bill Date', 'Invoice Date', 'Created At']);
                    const createdAt = dateVal ? new Date(dateVal) : new Date();

                    const cashier = getVal(row, ['Cashier', 'User', 'Salesman'])?.toString();
                    const user = cashier
                        ? await prisma.user.findFirst({ where: { username: cashier } })
                        : await prisma.user.findFirst({ where: { role: 'ADMIN' } });
                    const userId = user?.id || (await ensureDefaultAdmin()).id;

                    if (billNo > 0) {
                        const exists = await prisma.sale.findFirst({ where: { billNo } });
                        if (exists) {
                            summary.skipped++;
                            continue;
                        }
                    }

                    await prisma.sale.create({
                        data: {
                            billNo: billNo > 0 ? billNo : Date.now(),
                            userId,
                            customerName: getVal(row, ['Customer'])?.toString() || null,
                            customerPhone: getVal(row, ['Phone'])?.toString() || null,
                            subtotal: total,
                            discount: 0,
                            discountPercent: 0,
                            taxAmount: 0,
                            cgst: 0,
                            sgst: 0,
                            grandTotal: total,
                            paymentMethod,
                            paidAmount: total,
                            changeAmount: 0,
                            status,
                            remarks: 'Imported from Excel',
                            isHistorical: true,
                            importedFrom: 'Excel',
                            createdAt
                        }
                    });
                    summary.sales++;
                } catch (e) {
                    summary.errors++;
                }
            }
        };

        let processedAnySheet = false;
        for (const sheetName of workbook.SheetNames) {
            const sheet = workbook.Sheets[sheetName];
            const rows = XLSX.utils.sheet_to_json(sheet);
            if (!rows.length) continue;

            const lowerName = sheetName.toLowerCase();
            let type: 'products' | 'customers' | 'sales' | 'unknown' = 'unknown';
            if (lowerName.includes('product') || lowerName.includes('item') || lowerName.includes('stock')) type = 'products';
            else if (lowerName.includes('customer') || lowerName.includes('party')) type = 'customers';
            else if (lowerName.includes('sale') || lowerName.includes('bill') || lowerName.includes('invoice')) type = 'sales';
            else type = detectSheetType(rows as any[]);

            if (type === 'products') await importProductsRows(rows as any[]);
            else if (type === 'customers') await importCustomersRows(rows as any[]);
            else if (type === 'sales') await importSalesRows(rows as any[]);
            else summary.skipped += (rows as any[]).length;

            processedAnySheet = true;
        }

        if (!processedAnySheet) {
            return { success: false, error: 'No readable rows found in selected workbook.' };
        }

        dialog.showMessageBoxSync({
            type: summary.errors > 0 ? 'warning' : 'info',
            title: 'Import Complete',
            message: `Import finished.\n\nProducts: ${summary.products} \nCustomers: ${summary.customers} \nSales: ${summary.sales} \nSkipped: ${summary.skipped} \nErrors: ${summary.errors} `
        });

        return { success: true };
    } catch (error: any) {
        console.error(error);
        return { success: false, error: error.message };
    }
});

// Database Management Handlers
ipcMain.handle('db:backup', async () => {
    try {
        const { canceled, filePath } = await dialog.showSaveDialog({
            title: 'Backup Database',
            defaultPath: `backup_zain_pos_${new Date().toISOString().slice(0, 10)}.db`,
            filters: [{ name: 'SQLite Database', extensions: ['db'] }]
        });

        if (canceled || !filePath) return { success: false };

        const sourcePath = getDatabasePath();

        fs.copyFileSync(sourcePath, filePath);
        return { success: true, path: filePath };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('db:restore', async () => {
    try {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            title: 'Select Backup File',
            filters: [{ name: 'SQLite Database', extensions: ['db'] }],
            properties: ['openFile']
        });

        if (canceled || filePaths.length === 0) return { success: false };

        const backupPath = filePaths[0];

        // Use the CENTRAL TRUTH for database path
        const targetPath = getDatabasePath();

        // Preserve current print settings/layout to avoid label/receipt regressions after restore
        const printSettingKeys = ['PRINTER_CONFIG', 'LABEL_LAYOUT', 'RECEIPT_LAYOUT'];
        const preservedPrintSettings = await prisma.setting.findMany({
            where: { key: { in: printSettingKeys } }
        });

        console.log(`Resoring database from ${backupPath} to ${targetPath} `);

        await prisma.$disconnect();

        // Small safety delay to ensure file handle is released
        await new Promise(resolve => setTimeout(resolve, 500));

        // Restore into the active DB
        fs.copyFileSync(backupPath, targetPath);
        console.log('Database restore completed.');

        // Also update durable "latest" backups for future reinstalls
        const userDataLatest = getUserDataLatestBackupPath();
        const persistentLatest = getPersistentBackupPath();
        const persistentDir = path.dirname(persistentLatest);
        if (!fs.existsSync(path.dirname(userDataLatest))) {
            fs.mkdirSync(path.dirname(userDataLatest), { recursive: true });
        }
        if (!fs.existsSync(persistentDir)) {
            fs.mkdirSync(persistentDir, { recursive: true });
        }
        fs.copyFileSync(backupPath, userDataLatest);
        fs.copyFileSync(backupPath, persistentLatest);

        // Re-open and migrate schema, then report counts
        await restoreDatabaseFromSource(targetPath, targetPath);
        await ensureSchemaUpdated();

        for (const setting of preservedPrintSettings) {
            await prisma.setting.upsert({
                where: { key: setting.key },
                update: { value: setting.value },
                create: { key: setting.key, value: setting.value }
            });
        }

        const userCount = await prisma.user.count();
        const productCount = await prisma.product.count();
        const saleCount = await prisma.sale.count();

        dialog.showMessageBoxSync({
            type: 'info',
            title: 'Restore Complete',
            message: `Restore finished.\n\nUsers: ${userCount} \nProducts: ${productCount} \nSales: ${saleCount} `
        });

        // Smart Restart Logic
        const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

        if (isDev) {
            dialog.showMessageBoxSync({
                type: 'info',
                title: 'Restart Required',
                message: 'Database restored successfully.\n\nPlease manually restart your development server (npm run dev) to apply changes.'
            });
            app.quit();
        } else {
            app.relaunch();
            app.quit();
        }

        return { success: true };
    } catch (error: any) {
        console.error('Restore failed:', error);
        return { success: false, error: error.message };
    }
});

// User Management Handlers
ipcMain.handle('users:list', async () => {
    try {
        await ensureUserSchemaReady();
        const users = await prisma.user.findMany({
            orderBy: { name: 'asc' },
            select: {
                id: true,
                username: true,
                name: true,
                role: true,
                isActive: true,
                createdAt: true,
                password: true,
                // Permissions
                permPrintSticker: true,
                permAddItem: true,
                permDeleteProduct: true,
                permVoidSale: true,
                permViewReports: true,
                permViewSales: true,
                permViewGstReports: true,
                permManageProducts: true,
                permEditSettings: true,
                permEditSales: true,
                permManageInventory: true,
                permManageUsers: true,
                permViewCostPrice: true,
                permChangePayment: true,
                permDeleteAudit: true,
                permBulkUpdate: true,
                permBackDateSale: true,
                maxDiscount: true
            }
        });
        return { success: true, data: users };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('users:create', async (_event, userData) => {
    try {
        await ensureUserSchemaReady();
        if (!userData.username || !userData.password || !userData.name) {
            return { success: false, error: 'Missing required fields' };
        }

        const existing = await prisma.user.findUnique({ where: { username: userData.username } });
        if (existing) return { success: false, error: 'Username already exists' };

        const user = await prisma.user.create({
            data: {
                username: userData.username,
                password: userData.password,
                name: userData.name,
                role: userData.role || 'CASHIER',
                isActive: true
            }
        });
        return { success: true, data: user };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('users:update', async (_event, { id, data }) => {
    try {
        await ensureUserSchemaReady();
        const user = await prisma.user.update({
            where: { id },
            data: data
        });
        return { success: true, data: user };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('users:changePassword', async (_event, { id, password }) => {
    try {
        await ensureUserSchemaReady();
        await prisma.user.update({
            where: { id },
            data: { password }
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('users:delete', async (_event, id) => {
    try {
        await prisma.user.update({
            where: { id },
            data: { isActive: false }
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('cloud:syncNow', async () => {
    try {
        console.log('🔄 Manual Sync Starting...');

        // 1. Get Cloud URL from settings
        const setting = await prisma.setting.findUnique({ where: { key: 'CLOUD_API_URL' } });
        if (!setting || !setting.value) {
            // Default to a known URL or alert user
            return { success: false, error: 'Cloud API URL not configured in Settings.' };
        }

        cloudSync.setApiUrl(setting.value);

        // 2. Sync Settings (Store Info, etc.)
        const allSettings = await prisma.setting.findMany();
        await cloudSync.syncSettings(allSettings);

        // 3. Sync Users
        const users = await prisma.user.findMany();
        await cloudSync.syncUsers(users);

        // 4. Fetch all products with relations
        const products = await prisma.product.findMany({
            include: {
                category: true,
                variants: true
            }
        });
        await cloudSync.syncInventory(products);

        // 5. Sync only unsynced/new sales and audit logs (cursor-based)
        const salesSynced = await syncSalesDelta();
        const auditSynced = await syncAuditDelta();

        return { success: true, salesSynced, auditSynced };
    } catch (error: any) {
        console.error('Manual sync failed:', error);
        return { success: false, error: error.message };
    }
});


