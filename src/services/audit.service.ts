// import { db } from '../lib/db'; // Unused in renderer
export type AuditAction =
    | 'SALE_VOID'
    | 'SALE_CREATE'
    | 'SALE_UPDATE'
    | 'PAYMENT_UPDATE'
    | 'STOCK_ADD'
    | 'STOCK_ADJUST'
    | 'PRODUCT_DELETE'
    | 'PRODUCT_UPDATE'
    | 'USER_LOGIN';

export const auditService = {
    async log(action: AuditAction, details: string, userId?: string) {
        try {
            await window.electronAPI.db.query({
                model: 'auditLog',
                method: 'create',
                args: {
                    data: {
                        action,
                        details,
                        userId
                    }
                }
            });
        } catch (error) {
            console.error('Failed to create audit log:', error);
        }
    },

    async getLogs(limit = 50) {
        try {
            const result = await window.electronAPI.db.query({
                model: 'auditLog',
                method: 'findMany',
                args: {
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                    include: { user: true }
                }
            });
            return result.success ? result.data : [];
        } catch (error) {
            console.error('Failed to fetch logs:', error);
            return [];
        }
    }
};
