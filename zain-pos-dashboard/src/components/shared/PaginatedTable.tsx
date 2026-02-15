import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface PaginatedTableProps<T> {
    data: T[];
    columns: {
        header: string;
        accessor?: keyof T;
        render?: (item: T) => ReactNode;
        className?: string;
    }[];
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    loading?: boolean;
    emptyMessage?: string;
    itemsPerPage?: number;
    totalItems?: number;
    onLimitChange?: (limit: number) => void;
}

export function PaginatedTable<T extends { id: string | number }>({
    data,
    columns,
    page,
    totalPages,
    onPageChange,
    loading = false,
    emptyMessage = "No data found",
    itemsPerPage = 20,
    totalItems,
    onLimitChange
}: PaginatedTableProps<T>) {

    // Helper to generate page numbers to show
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="w-full">
            <div className="rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-gray-800">
                            <tr>
                                {columns.map((col, idx) => (
                                    <th key={idx} className={cn("px-4 py-3", col.className)}>
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse">
                                        {columns.map((_, colIdx) => (
                                            <td key={colIdx} className="px-4 py-4">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full opacity-60"></div>
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : data.length > 0 ? (
                                data.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        {columns.map((col, colIdx) => (
                                            <td key={colIdx} className={cn("px-4 py-3", col.className)}>
                                                {col.render ? col.render(row) : (col.accessor ? String(row[col.accessor]) : null)}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                                        {emptyMessage}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>Rows per page:</span>
                        <select
                            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            value={itemsPerPage}
                            onChange={(e) => onLimitChange?.(Number(e.target.value))}
                            disabled={loading || !onLimitChange}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        {totalItems !== undefined && (
                            <span className="hidden sm:inline-block ml-2">
                                Showing {data.length} of {totalItems}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page <= 1 || loading}
                            onClick={() => onPageChange(page - 1)}
                            className="px-2"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        <div className="flex items-center gap-1 mx-2">
                            {getPageNumbers().map((p, idx) => (
                                typeof p === 'number' ? (
                                    <Button
                                        key={idx}
                                        variant={p === page ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => onPageChange(p)}
                                        disabled={loading}
                                        className={p === page ? "bg-primary-600 hover:bg-primary-700" : ""}
                                    >
                                        {p}
                                    </Button>
                                ) : (
                                    <span key={idx} className="px-2 text-gray-400">...</span>
                                )
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages || loading}
                            onClick={() => onPageChange(page + 1)}
                            className="px-2"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
