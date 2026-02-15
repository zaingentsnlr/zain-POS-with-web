import { type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface ChartWidgetProps {
    title: string;
    children: ReactNode;
    height?: number;
    className?: string;
    loading?: boolean;
}

export function ChartWidget({ title, children, height = 300, className, loading }: ChartWidgetProps) {
    if (loading) {
        return <Skeleton className={cn("w-full rounded-xl", className)} style={{ height: height + 80 }} />;
    }

    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div style={{ width: '100%', height: height }}>
                    <ResponsiveContainer>
                        {children as any}
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
