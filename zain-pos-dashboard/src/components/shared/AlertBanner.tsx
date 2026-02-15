import { AlertTriangle, Info, XCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert } from '@/hooks/useSmartAlerts';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface AlertBannerProps {
    alerts: Alert[];
}

export function AlertBanner({ alerts }: AlertBannerProps) {
    const [dismissed, setDismissed] = useState<string[]>([]);

    const activeAlerts = alerts.filter(a => !dismissed.includes(a.id));

    if (activeAlerts.length === 0) return null;

    return (
        <div className="flex flex-col gap-2 mb-6">
            {activeAlerts.map(alert => (
                <div
                    key={alert.id}
                    className={cn(
                        "p-4 rounded-lg flex items-center justify-between shadow-sm border",
                        alert.type === 'critical' ? "bg-red-50 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/50" :
                            alert.type === 'warning' ? "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-900/50" :
                                "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/50"
                    )}
                >
                    <div className="flex items-center gap-3">
                        {alert.type === 'critical' ? <XCircle className="w-5 h-5" /> :
                            alert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                                <Info className="w-5 h-5" />}
                        <div>
                            <span className="font-medium mr-2">{alert.message}</span>
                            {alert.link && (
                                <Link to={alert.link} className="inline-flex items-center text-sm underline hover:no-underline font-semibold opacity-80 hover:opacity-100">
                                    {alert.action || 'View'} <ArrowRight className="w-3 h-3 ml-1" />
                                </Link>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => setDismissed(prev => [...prev, alert.id])}
                        className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded"
                    >
                        <span className="sr-only">Dismiss</span>
                        <XCircle className="w-4 h-4 opacity-50" />
                    </button>
                </div>
            ))}
        </div>
    );
}
