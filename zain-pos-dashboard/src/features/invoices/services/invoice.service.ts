import api from '@/lib/api';

export interface Invoice {
    id: string;
    billNo: number;
    total: number;
    createdAt: string;
    customer: {
        name: string;
        phone: string;
    };
    items: Array<{
        quantity: number;
        product: {
            name: string;
        };
    }>;
}

export interface InvoiceParams {
    page?: number;
    limit?: number;
    search?: string;
    startDate?: string; // ISO string
    endDate?: string;   // ISO string
}

export interface PaginatedResponse<T> {
    invoices: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export const invoiceService = {
    getInvoices: async (params: InvoiceParams): Promise<PaginatedResponse<Invoice>> => {
        const response = await api.get('/invoices', { params });
        return response.data;
    },

    getInvoiceById: async (id: string): Promise<Invoice> => {
        const response = await api.get(`/invoices/${id}`);
        return response.data;
    }
};
