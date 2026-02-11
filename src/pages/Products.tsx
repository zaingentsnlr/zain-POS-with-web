import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Printer, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Select } from '../components/ui/Select';
import { db } from '../lib/db';
import { barcodeService } from '../services/barcode.service';
import { useAuthStore } from '../store/authStore';

import { StickerPrintModal } from '../components/ui/StickerPrintModal';
import { Skeleton } from '../components/ui/Skeleton';

export const Products: React.FC = () => {
    const { user } = useAuthStore();
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [showStickerModal, setShowStickerModal] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        hsn: '',
        taxRate: 5,
        barcode: '',
        variants: [
            {
                sku: '',
                size: '',
                color: '',
                mrp: 0,
                sellingPrice: 0,
                costPrice: 0,
                stock: 0,
                minStock: 5,
                barcode: '',
            },
        ],
    });

    useEffect(() => {
        loadData();
    }, [searchQuery]);

    const getNextSequentialBarcode = async (index: number) => {
        try {
            const variants = await db.productVariants.findMany({
                select: { barcode: true }
            });

            // Filter for numeric-only barcodes and find the max
            // We ignore EAN-13 style barcodes (13 digits) to keep sequential codes short
            const numericBarcodes = variants
                .map((v: any) => parseInt(v.barcode))
                .filter((n: number) => !isNaN(n) && n < 1000000000);

            let next = "1001";
            if (numericBarcodes.length > 0) {
                next = (Math.max(...numericBarcodes) + 1).toString();
            }

            const newVariants = [...formData.variants];
            (newVariants[index] as any).barcode = next;
            setFormData({ ...formData, variants: newVariants });
        } catch (error) {
            console.error('Failed to get sequential barcode:', error);
        }
    };

    const loadData = async () => {
        try {
            setLoading(true);

            let where: any = { isActive: true };
            if (searchQuery) {
                where = {
                    isActive: true,
                    OR: [
                        { name: { contains: searchQuery } },
                        { variants: { some: { barcode: { contains: searchQuery }, isActive: true } } },
                        { variants: { some: { sku: { contains: searchQuery }, isActive: true } } }
                    ]
                };
            }

            const [productsData, categoriesData] = await Promise.all([
                db.products.findMany({
                    where,
                    include: {
                        category: true,
                        variants: { where: { isActive: true } },
                    },
                    orderBy: { updatedAt: 'desc' }
                }),
                db.categories.findMany({}),
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // 1. Check for duplicates within the current form
            const formBarcodes = formData.variants.map(v => v.barcode).filter(Boolean);
            const hasDraftDuplicates = new Set(formBarcodes).size !== formBarcodes.length;
            if (hasDraftDuplicates) {
                alert('Duplicate barcodes found within your new item variants. Each variant must have a unique code.');
                return;
            }

            // 2. Cross-check against the entire database
            for (const variant of formData.variants) {
                if (variant.barcode) {
                    const existing = await db.productVariants.findFirst({
                        where: {
                            barcode: variant.barcode,
                            ...(editingProduct ? { productId: { not: editingProduct.id } } : {})
                        },
                        include: { product: true }
                    });

                    if (existing) {
                        alert(`CRITICAL ERROR: The code "${variant.barcode}" is already assigned to "${existing.product.name}". \n\nPlease use a different code to avoid merging items accidentally.`);
                        return;
                    }
                }
            }

            // 3. Cross-check for duplicate product name
            const existingName = await db.products.findFirst({
                where: {
                    name: { equals: formData.name },
                    ...(editingProduct ? { id: { not: editingProduct.id } } : {})
                }
            });

            if (existingName) {
                if (!confirm(`An item named "${formData.name}" already exists in your inventory. \n\nAre you sure you want to create a duplicate entry? It is recommended to use unique names for better reporting.`)) {
                    return;
                }
            }

            if (editingProduct) {
                // Update existing product
                await db.products.update({
                    where: { id: editingProduct.id },
                    data: {
                        name: formData.name,
                        categoryId: formData.categoryId,
                        hsn: formData.hsn,
                        taxRate: formData.taxRate,
                    },
                });

                // Update barcode of first variant if provided
                if (formData.barcode && editingProduct.variants.length > 0) {
                    await db.productVariants.update({
                        where: { id: editingProduct.variants[0].id },
                        data: { barcode: formData.barcode },
                    });
                }
            } else {
                // Create new product with variants
                await db.products.create({
                    data: {
                        name: formData.name,
                        categoryId: formData.categoryId,
                        hsn: formData.hsn,
                        taxRate: formData.taxRate,
                        variants: {
                            create: formData.variants.map((v) => ({
                                sku: v.sku || `SKU-${Date.now()}`,
                                barcode: v.barcode || barcodeService.generateBarcode(),
                                size: v.size,
                                color: v.color,
                                mrp: v.mrp,
                                sellingPrice: v.sellingPrice,
                                costPrice: v.costPrice,
                                stock: v.stock,
                                minStock: v.minStock,
                            })),
                        },
                    },
                });
            }

            setShowModal(false);
            resetForm();
            loadData();
        } catch (error) {
            console.error('Failed to save product:', error);
            alert('Failed to save product');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            categoryId: '',
            hsn: '',
            taxRate: 5,
            barcode: '',
            variants: [
                {
                    sku: '',
                    size: '',
                    color: '',
                    mrp: 0,
                    sellingPrice: 0,
                    costPrice: 0,
                    stock: 0,
                    minStock: 5,
                    barcode: '',
                },
            ],
        });
        setEditingProduct(null);
    };

    const handleDeleteProduct = async (product: any) => {
        if (!confirm(`Are you sure you want to delete "${product.name}"? This will also delete all variants and cannot be undone.`)) {
            return;
        }

        try {
            // Soft delete to avoid breaking sales history
            await db.productVariants.updateMany({
                where: { productId: product.id },
                data: { isActive: false }
            });

            await db.products.update({
                where: { id: product.id },
                data: { isActive: false }
            });

            loadData();
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product. Error: ' + (error as Error).message);
        }
    };

    const handlePrintLabel = (variant: any, product: any) => {
        setSelectedVariant(variant);
        setSelectedProduct(product);
        setShowStickerModal(true);
    };

    // Searching is now handled server-side in loadData for better performance
    const filteredProducts = products;

    if (!user) return <div className="p-8 text-center text-gray-500">Authenticating...</div>;

    if (user.role !== 'ADMIN' && !user.permManageProducts) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full">
                    <Plus className="w-12 h-12" />
                </div>
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-gray-500 max-w-md">
                    You do not have permission to manage products.
                    Please contact your administrator to request access.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="pl-10"
                        />
                    </div>
                </div>
                {(user?.role === 'ADMIN' || user?.permManageProducts) && (
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        <Plus className="w-5 h-5" />
                        Add Product
                    </Button>
                )}
            </div>

            {/* Products Table */}
            <div className="card overflow-x-auto">
                <table className="table">
                    <thead>
                        <th>Sl No</th>
                        <th>Item Code</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Variants</th>
                        <th>Stock</th>
                        <th>Tax %</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                                <td><Skeleton className="h-4 w-8" /></td>
                                <td><Skeleton className="h-4 w-24" /></td>
                                <td><Skeleton className="h-4 w-48" /></td>
                                <td><Skeleton className="h-4 w-24" /></td>
                                <td><Skeleton className="h-4 w-12" /></td>
                                <td><Skeleton className="h-4 w-12" /></td>
                                <td><Skeleton className="h-8 w-24" /></td>
                            </tr>
                        ))
                    ) : (
                        filteredProducts.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td className="font-mono text-xs">{product.variants[0]?.barcode || '-'}</td>
                                <td className="font-medium">{product.name}</td>
                                <td>{product.category.name}</td>
                                <td>{product.variants.length}</td>
                                <td>
                                    {product.variants.reduce((sum: number, v: any) => sum + v.stock, 0)}
                                </td>
                                <td className="font-mono text-xs">{product.taxRate}%</td>
                                <td>
                                    <div className="flex gap-2">
                                        {(user?.role === 'ADMIN' || user?.permManageProducts) && (
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => {
                                                    setEditingProduct(product);
                                                    setFormData({
                                                        name: product.name,
                                                        categoryId: product.categoryId,
                                                        hsn: product.hsn || '',
                                                        taxRate: product.taxRate,
                                                        barcode: product.variants[0]?.barcode || '',
                                                        variants: product.variants,
                                                    });
                                                    setShowModal(true);
                                                }}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        )}
                                        {product.variants.length > 0 && (user?.role === 'ADMIN' || user?.permPrintSticker) && (
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => handlePrintLabel(product.variants[0], product)}
                                            >
                                                <Printer className="w-4 h-4" />
                                            </Button>
                                        )}
                                        {(user?.role === 'ADMIN' || user?.permDeleteProduct) && (
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDeleteProduct(product)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>

            {/* Add/Edit Modal */ }
    <Modal
        isOpen={showModal}
        onClose={() => {
            setShowModal(false);
            resetForm();
        }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
    >
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />

            <Select
                label="Category"
                value={formData.categoryId}
                onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                }
                options={[
                    { value: '', label: 'Select Category' },
                    ...categories.map((c) => ({ value: c.id, label: c.name })),
                ]}
                required
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="HSN Code"
                    value={formData.hsn}
                    onChange={(e) => setFormData({ ...formData, hsn: e.target.value })}
                />
                <Input
                    label="Tax Rate (%)"
                    type="number"
                    value={formData.taxRate}
                    onChange={(e) =>
                        setFormData({ ...formData, taxRate: parseFloat(e.target.value) })
                    }
                    step="0.01"
                    required
                />
            </div>

            {editingProduct && (
                <Input
                    label="Item Code / Barcode"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    placeholder="Scan or enter barcode"
                />
            )}

            {!editingProduct && (
                <>
                    <h3 className="font-semibold mt-6">Variant Details</h3>
                    {formData.variants.map((variant, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-dark-border rounded-lg space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="Size"
                                    value={variant.size}
                                    onChange={(e) => {
                                        const newVariants = [...formData.variants];
                                        newVariants[index].size = e.target.value;
                                        setFormData({ ...formData, variants: newVariants });
                                    }}
                                />
                                <Input
                                    label="Color"
                                    value={variant.color}
                                    onChange={(e) => {
                                        const newVariants = [...formData.variants];
                                        newVariants[index].color = e.target.value;
                                        setFormData({ ...formData, variants: newVariants });
                                    }}
                                />
                                <div className="relative">
                                    <Input
                                        label="Barcode / Item Code"
                                        value={variant.barcode || ''}
                                        onChange={(e) => {
                                            const newVariants = [...formData.variants];
                                            (newVariants[index] as any).barcode = e.target.value;
                                            setFormData({ ...formData, variants: newVariants });
                                        }}
                                        placeholder="Enter or Generate"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => getNextSequentialBarcode(index)}
                                        className="absolute right-2 top-[34px] p-1 text-xs bg-primary-50 text-primary-600 rounded border border-primary-200 hover:bg-primary-100"
                                    >
                                        Next Seq
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <Input
                                    label="MRP"
                                    type="number"
                                    value={variant.mrp}
                                    onChange={(e) => {
                                        const newVariants = [...formData.variants];
                                        newVariants[index].mrp = parseFloat(e.target.value);
                                        setFormData({ ...formData, variants: newVariants });
                                    }}
                                    step="0.01"
                                    required
                                />
                                <Input
                                    label="Selling Price"
                                    type="number"
                                    value={variant.sellingPrice}
                                    onChange={(e) => {
                                        const newVariants = [...formData.variants];
                                        newVariants[index].sellingPrice = parseFloat(e.target.value);
                                        setFormData({ ...formData, variants: newVariants });
                                    }}
                                    step="0.01"
                                    required
                                />
                                <Input
                                    label="Cost Price"
                                    type="number"
                                    value={variant.costPrice}
                                    onChange={(e) => {
                                        const newVariants = [...formData.variants];
                                        newVariants[index].costPrice = parseFloat(e.target.value);
                                        setFormData({ ...formData, variants: newVariants });
                                    }}
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="Initial Stock"
                                    type="number"
                                    value={variant.stock}
                                    onChange={(e) => {
                                        const newVariants = [...formData.variants];
                                        newVariants[index].stock = parseInt(e.target.value);
                                        setFormData({ ...formData, variants: newVariants });
                                    }}
                                    required
                                />
                                <Input
                                    label="Min Stock"
                                    type="number"
                                    value={variant.minStock}
                                    onChange={(e) => {
                                        const newVariants = [...formData.variants];
                                        newVariants[index].minStock = parseInt(e.target.value);
                                        setFormData({ ...formData, variants: newVariants });
                                    }}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </>
            )}

            <div className="flex gap-2 pt-4">
                <Button type="submit" variant="primary" className="flex-1">
                    {editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                        setShowModal(false);
                        resetForm();
                    }}
                >
                    Cancel
                </Button>
            </div>
        </form>
    </Modal>

    {/* Sticker Print Modal */ }
    <StickerPrintModal
        isOpen={showStickerModal}
        onClose={() => {
            setShowStickerModal(false);
            setSelectedVariant(null);
            setSelectedProduct(null);
        }}
        product={selectedProduct}
        variant={selectedVariant}
    />
        </div >
    );
};
