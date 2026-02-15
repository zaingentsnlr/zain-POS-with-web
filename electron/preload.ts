import { contextBridge, ipcRenderer } from 'electron';

const api = {
    // Database operations
    db: {
        query: (args: { model: string, method: string, args?: any }) =>
            ipcRenderer.invoke('db:query', args),
        backup: () => ipcRenderer.invoke('db:backup'),
        restore: () => ipcRenderer.invoke('db:restore'),
        configureBackup: (config: any) => ipcRenderer.invoke('backup:configure', config),
        syncNow: () => ipcRenderer.invoke('cloud:syncNow'),
        configureSync: (config: { intervalMinutes: number }) => ipcRenderer.invoke('cloud:configure', config),
    },

    // Settings
    settings: {
        get: (key: string) => ipcRenderer.invoke('settings:get', key),
        set: (key: string, value: string) => ipcRenderer.invoke('settings:set', key, value),
    },

    // Data Management (Import/Export)
    data: {
        downloadProductTemplate: () => ipcRenderer.invoke('products:importTemplate'),
        importProducts: () => ipcRenderer.invoke('products:import'),
        importAll: () => ipcRenderer.invoke('products:import'), // Maps to existing handler
        exportAll: () => ipcRenderer.invoke('data:exportAll'),
    },

    // Sales
    sales: {
        getNextBillNo: () => ipcRenderer.invoke('sales:getNextBillNo'),
        checkout: (data: any) => ipcRenderer.invoke('sales:checkout', data),
        updatePayment: (data: { saleId: string, paymentData: any, userId: string }) =>
            ipcRenderer.invoke('sales:updatePayment', data),
        exchange: (data: any) => ipcRenderer.invoke('sales:exchange', data),
        refund: (data: any) => ipcRenderer.invoke('sales:refund', data),
    },

    // Printing
    print: {
        receipt: (data: any) => ipcRenderer.invoke('print:receipt', data),
        label: (data: any) => ipcRenderer.invoke('print:label', data),
    },

    // Users
    users: {
        list: () => ipcRenderer.invoke('users:list'),
        create: (data: any) => ipcRenderer.invoke('users:create', data),
        update: (id: string, data: any) => ipcRenderer.invoke('users:update', { id, data }),
        changePassword: (id: string, password: string) => ipcRenderer.invoke('users:changePassword', { id, password }),
        delete: (id: string) => ipcRenderer.invoke('users:delete', id),
    },

    // Devices
    devices: {
        list: () => ipcRenderer.invoke('devices:list'),
    },

    // App
    app: {
        quit: () => ipcRenderer.invoke('app:quit'),
    },
};

contextBridge.exposeInMainWorld('electronAPI', api);

export type ElectronAPI = typeof api;
