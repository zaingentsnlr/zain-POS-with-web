import React, { useState, useEffect } from 'react';
import {
    Save,
    Trash2,
    Download,
    Upload,
    FileSpreadsheet,
    Cloud,
    RefreshCw,
    Monitor,
    Printer,
    Database,
    Package,
    Globe,
    Info
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ReceiptDesigner } from '../components/settings/ReceiptDesigner';
import { LabelDesigner } from '../components/settings/LabelDesigner';

type SettingsTab = 'general' | 'sync' | 'print' | 'data';

export const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('general');
    const [shopSettings, setShopSettings] = useState({
        shopName: 'ZAIN GENTS PALACE',
        address: 'CHIRAMMAL TOWER, BEHIND CANARA BANK\nRAJA ROAD, NILESHWAR',
        phone: '9037106449, 7907026827',
        gstin: '32PVGPS0686J1ZV',
        email: '',
        logo: '',
    });

    const [printerSettings, setPrinterSettings] = useState({
        receiptPrinter: 'Epson TM-T82',
        labelPrinter: 'TSC TTP-244 Plus',
        pageSize: '80mm',
        contentWidth: 72,
        fontFamily: 'sans-serif',
        fontSize: 12,
        isBold: false,
        showMRP: false,
        showRate: false,
    });

    const [backupConfig, setBackupConfig] = useState({
        enabled: true,
        intervalMinutes: 0
    });

    const [syncConfig, setSyncConfig] = useState({
        apiUrl: '',
        intervalMinutes: 0
    });

    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const shopResult = await window.electronAPI.db.query({
                model: 'setting',
                method: 'findUnique',
                args: { where: { key: 'SHOP_SETTINGS' } }
            });
            if (shopResult.success && shopResult.data && shopResult.data.value) {
                setShopSettings({ ...shopSettings, ...JSON.parse(shopResult.data.value) });
            }

            const printerResult = await window.electronAPI.db.query({
                model: 'setting',
                method: 'findUnique',
                args: { where: { key: 'PRINTER_CONFIG' } }
            });
            if (printerResult.success && printerResult.data && printerResult.data.value) {
                setPrinterSettings({ ...printerSettings, ...JSON.parse(printerResult.data.value) });
            }

            const apiResult = await window.electronAPI.db.query({
                model: 'setting',
                method: 'findUnique',
                args: { where: { key: 'CLOUD_API_URL' } }
            });
            const configResult = await window.electronAPI.db.query({
                model: 'setting',
                method: 'findUnique',
                args: { where: { key: 'CLOUD_SYNC_CONFIG' } }
            });

            const interval = configResult.success && configResult.data ? JSON.parse(configResult.data.value).intervalMinutes : 0;
            const apiUrl = apiResult.success && apiResult.data ? apiResult.data.value : '';

            setSyncConfig({ apiUrl, intervalMinutes: interval });

            const backupResult = await window.electronAPI.db.query({
                model: 'setting',
                method: 'findUnique',
                args: { where: { key: 'BACKUP_CONFIG' } }
            });
            if (backupResult.success && backupResult.data && backupResult.data.value) {
                setBackupConfig(JSON.parse(backupResult.data.value));
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
    };

    const handleSaveShopSettings = async () => {
        try {
            await window.electronAPI.db.query({
                model: 'setting',
                method: 'upsert',
                args: {
                    where: { key: 'SHOP_SETTINGS' },
                    update: { value: JSON.stringify(shopSettings) },
                    create: { key: 'SHOP_SETTINGS', value: JSON.stringify(shopSettings) }
                }
            });
            alert('Shop settings saved!');
        } catch (error) {
            alert('Failed to save shop settings');
        }
    };

    const handleSavePrinterSettings = async () => {
        try {
            await window.electronAPI.db.query({
                model: 'setting',
                method: 'upsert',
                args: {
                    where: { key: 'PRINTER_CONFIG' },
                    update: { value: JSON.stringify(printerSettings) },
                    create: { key: 'PRINTER_CONFIG', value: JSON.stringify(printerSettings) }
                }
            });
            alert('Printer settings saved!');
        } catch (error) {
            alert('Failed to save printer settings');
        }
    };

    const handleSaveSyncSettings = async () => {
        try {
            setSyncing(true);
            await window.electronAPI.db.query({
                model: 'setting',
                method: 'upsert',
                args: {
                    where: { key: 'CLOUD_API_URL' },
                    update: { value: syncConfig.apiUrl },
                    create: { key: 'CLOUD_API_URL', value: syncConfig.apiUrl }
                }
            });
            await window.electronAPI.db.configureSync({ intervalMinutes: syncConfig.intervalMinutes });
            alert('Cloud Sync configured successfully!');
        } catch (error) {
            alert('Failed to save sync settings');
        } finally {
            setSyncing(false);
        }
    };

    const handleSaveBackupConfig = async () => {
        try {
            const res = await window.electronAPI.db.configureBackup(backupConfig);
            if (res.success) alert('Backup configuration updated!');
            else alert('Failed to update backup config');
        } catch (e) {
            alert('Error saving backup config');
        }
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setShopSettings({ ...shopSettings, logo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const TabButton: React.FC<{ id: SettingsTab; label: string; icon: any }> = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all border-b-2 ${activeTab === id
                ? 'border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-900/10'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Settings</h1>
                <div className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">v3.0.4</div>
            </div>

            <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                {/* Tabs Header */}
                <div className="flex border-b border-gray-200 dark:border-dark-border overflow-x-auto no-scrollbar">
                    <TabButton id="general" label="Shop Info" icon={Monitor} />
                    <TabButton id="sync" label="Cloud & Backup" icon={Globe} />
                    <TabButton id="print" label="Printer & Design" icon={Printer} />
                    <TabButton id="data" label="Data Tools" icon={Package} />
                </div>

                {/* Tab Content */}
                <div className="p-8">
                    {activeTab === 'general' && (
                        <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div>
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-blue-500" />
                                    Business Identity
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                                        <div className="relative group">
                                            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
                                                {shopSettings.logo ? (
                                                    <img src={shopSettings.logo} alt="Logo" className="w-full h-full object-contain" />
                                                ) : (
                                                    <Monitor className="w-8 h-8 text-gray-300" />
                                                )}
                                            </div>
                                            <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity rounded-lg text-xs font-bold text-center p-1">
                                                Change Logo
                                                <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                                            </label>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="font-bold">Official Shop Logo</p>
                                            <p className="text-sm text-gray-500">This logo will appear on all your digital and printed receipts.</p>
                                            {shopSettings.logo && (
                                                <button onClick={() => setShopSettings({ ...shopSettings, logo: '' })} className="text-xs text-red-500 hover:underline">Remove Logo</button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input label="Shop Name" value={shopSettings.shopName} onChange={(e) => setShopSettings({ ...shopSettings, shopName: e.target.value })} />
                                        <Input label="Email Address" type="email" value={shopSettings.email} onChange={(e) => setShopSettings({ ...shopSettings, email: e.target.value })} />
                                    </div>

                                    <Input label="Phone Numbers" value={shopSettings.phone} onChange={(e) => setShopSettings({ ...shopSettings, phone: e.target.value })} />
                                    <Input label="GSTIN" value={shopSettings.gstin} onChange={(e) => setShopSettings({ ...shopSettings, gstin: e.target.value })} />

                                    <div>
                                        <label className="label">Full Address</label>
                                        <textarea
                                            value={shopSettings.address}
                                            onChange={(e) => setShopSettings({ ...shopSettings, address: e.target.value })}
                                            className="input min-h-[100px] py-2"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <Button variant="primary" onClick={handleSaveShopSettings} className="w-full md:w-auto px-8">
                                            <Save className="w-4 h-4" />
                                            Save General Settings
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'sync' && (
                        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Cloud Sync Section */}
                                <div className="space-y-6 p-6 bg-blue-50/30 dark:bg-blue-900/5 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200 dark:shadow-none">
                                            <Cloud className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Cloud Sync</h3>
                                            <p className="text-sm text-gray-500 italic">Connected Dashboard</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Input
                                            label="Cloud API URL"
                                            value={syncConfig.apiUrl}
                                            placeholder="https://your-api.railway.app"
                                            onChange={(e) => setSyncConfig({ ...syncConfig, apiUrl: e.target.value })}
                                        />
                                        <div>
                                            <label className="label">Background Sync Interval</label>
                                            <select
                                                className="input"
                                                value={syncConfig.intervalMinutes}
                                                onChange={(e) => setSyncConfig({ ...syncConfig, intervalMinutes: parseInt(e.target.value) })}
                                            >
                                                <option value="0">Real-time Only (On Sales)</option>
                                                <option value="5">Every 5 Minutes</option>
                                                <option value="15">Every 15 Minutes</option>
                                                <option value="60">Every 1 hour</option>
                                            </select>
                                        </div>
                                        <Button variant="primary" onClick={handleSaveSyncSettings} disabled={syncing} className="w-full">
                                            {syncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                                            {syncing ? 'Connecting...' : 'Update Cloud Settings'}
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            onClick={async () => {
                                                const res = await window.electronAPI.db.syncNow();
                                                if (res.success) alert('Cloud Sync Started!');
                                                else alert('Sync failed: ' + res.error);
                                            }}
                                            className="w-full"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                            Sync Now (Manual)
                                        </Button>
                                    </div>
                                </div>

                                {/* Backup Section */}
                                <div className="space-y-6 p-6 bg-purple-50/30 dark:bg-purple-900/5 rounded-xl border border-purple-100 dark:border-purple-900/30">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-600 rounded-lg shadow-lg shadow-purple-200 dark:shadow-none">
                                            <Database className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Auto Backup</h3>
                                            <p className="text-sm text-gray-500 italic">Local Safety Net</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="label">Frequency</label>
                                            <select
                                                className="input"
                                                value={backupConfig.intervalMinutes}
                                                onChange={(e) => setBackupConfig({ ...backupConfig, intervalMinutes: parseInt(e.target.value) })}
                                            >
                                                <option value="0">Only on Application Close</option>
                                                <option value="60">Hourly</option>
                                                <option value="1440">Daily (24 Hours)</option>
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Button variant="secondary" onClick={handleSaveBackupConfig} className="w-full">
                                                Update
                                            </Button>
                                            <Button variant="outline" onClick={async () => {
                                                const res = await window.electronAPI.db.backup();
                                                if (res.success) alert('Manual Backup Created!');
                                            }} className="w-full">
                                                Run Now
                                            </Button>
                                        </div>
                                        <Button variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50 transition-colors" onClick={async () => {
                                            if (confirm('CRITICAL: This will overwrite ALL your current shop data with a backup file. Continue?')) {
                                                await window.electronAPI.db.restore();
                                            }
                                        }}>
                                            <RefreshCw className="w-4 h-4" />
                                            Restore from Backup
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'print' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Receipt Printer Name" value={printerSettings.receiptPrinter} onChange={(e) => setPrinterSettings({ ...printerSettings, receiptPrinter: e.target.value })} />
                                <Input label="Label Printer Name" value={printerSettings.labelPrinter} onChange={(e) => setPrinterSettings({ ...printerSettings, labelPrinter: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                                <div>
                                    <label className="label">Paper Size</label>
                                    <select
                                        className="input"
                                        value={printerSettings.pageSize}
                                        onChange={(e) => setPrinterSettings({ ...printerSettings, pageSize: e.target.value, contentWidth: e.target.value === '80mm' ? 72 : 48 })}
                                    >
                                        <option value="80mm">Thermal 80mm (3 Inch)</option>
                                        <option value="58mm">Thermal 58mm (2 Inch)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label">Receipt Font</label>
                                    <select
                                        className="input"
                                        value={printerSettings.fontFamily}
                                        onChange={(e) => setPrinterSettings({ ...printerSettings, fontFamily: e.target.value })}
                                    >
                                        <option value="sans-serif">Modern Sans-Serif</option>
                                        <option value="monospace">Classic Mono (Speedy)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 max-w-2xl">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600" checked={printerSettings.showMRP} onChange={(e) => setPrinterSettings({ ...printerSettings, showMRP: e.target.checked })} />
                                    <span className="text-sm font-medium">Show MRP on Receipt</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600" checked={printerSettings.showRate} onChange={(e) => setPrinterSettings({ ...printerSettings, showRate: e.target.checked })} />
                                    <span className="text-sm font-medium">Show Rate Column</span>
                                </label>
                            </div>

                            <Button variant="primary" onClick={handleSavePrinterSettings}>
                                <Save className="w-4 h-4" />
                                Save Print Configuration
                            </Button>

                            <div className="grid grid-cols-1 gap-12 pt-8 border-t border-gray-200 dark:border-dark-border">
                                <div className="space-y-4">
                                    <h4 className="font-bold flex items-center gap-2">
                                        <FileSpreadsheet className="w-4 h-4 text-green-500" />
                                        Invoice Template
                                    </h4>
                                    <ReceiptDesigner />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold flex items-center gap-2">
                                        <Package className="w-4 h-4 text-orange-500" />
                                        Sticker/Barcode Template
                                    </h4>
                                    <LabelDesigner />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'data' && (
                        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 border border-gray-200 dark:border-dark-border rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center gap-4">
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full">
                                        <FileSpreadsheet className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Excel Template</h4>
                                        <p className="text-sm text-gray-500">Download the ready-to-fill product spreadsheet.</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full mt-auto"
                                        onClick={async () => {
                                            try {
                                                const res = await window.electronAPI.data.downloadProductTemplate();
                                                if (!res?.success) {
                                                    alert(res?.error || 'Failed to download template.');
                                                } else if (res?.path) {
                                                    alert(`Template saved:\n${res.path}`);
                                                }
                                            } catch (e: any) {
                                                alert(e?.message || 'Failed to download template.');
                                            }
                                        }}
                                    >
                                        Download
                                    </Button>
                                </div>

                                <div className="p-6 border border-gray-200 dark:border-dark-border rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full">
                                        <Upload className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Bulk Import</h4>
                                        <p className="text-sm text-gray-500">Upload your filled Excel template to bulk add products.</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full mt-auto"
                                        onClick={async () => {
                                            try {
                                                const res = await window.electronAPI.data.importAll();
                                                if (res?.success === false) {
                                                    alert(res?.error || 'Import failed.');
                                                }
                                            } catch (e: any) {
                                                alert(e?.message || 'Import failed.');
                                            }
                                        }}
                                    >
                                        Import Data
                                    </Button>
                                </div>

                                <div className="p-6 border border-gray-200 dark:border-dark-border rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center gap-4">
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full">
                                        <Download className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Full Export</h4>
                                        <p className="text-sm text-gray-500">Export all Sales, Products, and Customer data to Excel.</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full mt-auto"
                                        onClick={async () => {
                                            try {
                                                const res = await window.electronAPI.data.exportAll();
                                                if (!res?.success) {
                                                    alert(res?.error || 'Export failed.');
                                                } else if (res?.path) {
                                                    alert(`Export saved:\n${res.path}`);
                                                }
                                            } catch (e: any) {
                                                alert(e?.message || 'Export failed.');
                                            }
                                        }}
                                    >
                                        Export Everything
                                    </Button>
                                </div>

                                <div className="p-6 border border-gray-200 dark:border-dark-border rounded-xl hover:shadow-md transition-shadow flex flex-col items-center text-center gap-4 bg-orange-50/30 dark:bg-orange-900/10">
                                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-full">
                                        <Database className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Bulk Apply 5% GST</h4>
                                        <p className="text-sm text-gray-500">Update ALL existing products to 5% tax rate.</p>
                                    </div>
                                    <Button
                                        variant="danger"
                                        className="w-full mt-auto"
                                        onClick={async () => {
                                            if (confirm('Are you sure you want to set 5% tax to ALL products? This cannot be undone.')) {
                                                try {
                                                    const res = await window.electronAPI.db.query({
                                                        model: 'product',
                                                        method: 'updateMany',
                                                        args: {
                                                            data: { taxRate: 5.0 }
                                                        }
                                                    });
                                                    if (res.success) alert(`Successfully updated ${res.data.count} products to 5% GST!`);
                                                    else alert('Failed to update: ' + res.error);
                                                } catch (e) {
                                                    alert('Error performing bulk update');
                                                }
                                            }
                                        }}
                                    >
                                        Apply 5% Tax to All
                                    </Button>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 text-sm list-disc pl-8 space-y-2">
                                <p className="font-bold -ml-4 mb-1">Import/Export Tips:</p>
                                <li>Ensure barcode field is unique for every product during import.</li>
                                <li>The importer supports .xlsx and .xls formats.</li>
                                <li>Exported files can be used as backups or for custom reporting in Excel.</li>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
