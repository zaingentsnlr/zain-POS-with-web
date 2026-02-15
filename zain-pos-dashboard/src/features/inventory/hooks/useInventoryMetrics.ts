import { useState, useEffect } from 'react';
import { inventoryService, Product } from '../services/inventory.service';

export function useInventoryMetrics() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Derived state
    const [metrics, setMetrics] = useState({
        totalValue: 0,
        lowStockCount: 0,
        outOfStockCount: 0,
        totalItems: 0,
        healthyStockCount: 0
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await inventoryService.getProducts();

            // Calculate metrics
            const totalValue = data.reduce((sum: number, p: Product) => sum + (p.price * p.stock), 0);
            const lowStockCount = data.filter((p: Product) => p.stock > 0 && p.stock <= p.minStock).length;
            const outOfStockCount = data.filter((p: Product) => p.stock <= 0).length;
            const healthyStockCount = data.length - lowStockCount - outOfStockCount;

            setProducts(data);
            setMetrics({
                totalValue,
                lowStockCount,
                outOfStockCount,
                totalItems: data.length,
                healthyStockCount
            });
        } catch (error) {
            console.error('Failed to load inventory', error);
        } finally {
            setLoading(false);
        }
    };

    return { products, metrics, loading, refresh: loadData };
}
