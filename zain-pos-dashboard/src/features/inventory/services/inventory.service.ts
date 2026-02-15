import api from '@/lib/api';

export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    minStock: number;
    barcode: string;
    category?: {
        name: string;
    };
    updatedAt: string;
}

export const inventoryService = {
    getProducts: async () => {
        const response = await api.get('/inventory/products');
        return response.data;
    },

    getLowStock: async () => {
        const response = await api.get('/inventory/low-stock');
        return response.data;
    },

    // Mocking analytics endpoints if they don't exist yet, 
    // or transforming data on client side if needed.
    // Ideally these would be real endpoints.
    getInventoryAnalytics: async () => {
        // fetching full product list to analyze on client for now
        const products = await api.get('/inventory/products');
        return products.data;
    }
};
