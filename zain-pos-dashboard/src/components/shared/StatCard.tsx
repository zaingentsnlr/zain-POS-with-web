import { type ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: number; // percentage change
    trendLabel?: string; // "vs yesterday"
    icon: ReactNode;
    loading?: boolean;
    className?: string;
}

export function StatCard({ title, value, trend, trendLabel, icon, loading, className }: StatCardProps) {
    if (loading) return <Skeleton className="h-32 w-full rounded-xl" />;

    const isPositive = trend && trend >= 0;

    return (
        <Card className={cn("hover:shadow-md transition-shadow", className)}>
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                        <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-gray-100">{value}</h3>
                    </div>
                    <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-600 dark:text-primary-400">
                        {icon}
                    </div>
                </div>

                {trend !== undefined && (
                    <div className="mt-4 flex items-center text-xs">
                        <span className={cn(
                            "flex items-center font-medium",
                            isPositive ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
                        )}>
                            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            {Math.abs(trend)}%
                        </span>
                        <span className="text-gray-400 ml-2">{trendLabel}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
