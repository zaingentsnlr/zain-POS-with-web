import { Badge } from '@/components/ui/badge';

interface StockHealthBadgeProps {
    stock: number;
    minStock: number;
}

export function StockHealthBadge({ stock, minStock }: StockHealthBadgeProps) {
    if (stock <= 0) {
        return <Badge variant="destructive">Out of Stock</Badge>;
    }

    if (stock <= minStock) {
        return <Badge variant="warning">Low Stock</Badge>;
    }

    if (stock <= minStock * 2) {
        return <Badge variant="outline" className="text-yellow-600 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800">OK</Badge>;
    }

    return <Badge variant="success">Healthy</Badge>;
}
