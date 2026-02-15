import React, { useEffect, useState } from 'react';
import { auditService } from '../services/audit.service';
import { useAuthStore } from '../store/authStore';
import { format } from 'date-fns';
import { Activity, Search, RefreshCw, User, ShieldAlert, ArrowRight, DollarSign, Clock, Tag, Undo2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Skeleton } from '../components/ui/Skeleton';
import { formatIndianCurrency } from '../lib/format';

interface AuditLog {
    id: string;
    action: string;
    details: string;
    userId: string | null;
    user?: {
        name: string;
        role: string;
    };
    createdAt: string;
}

export const ActivityPage: React.FC = () => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useAuthStore();

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const data = await auditService.getLogs(100);
            setLogs(data);
        } catch (error) {
            console.error('Failed to load logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const actionStyles: Record<string, { color: string, icon: any }> = {
        'SALE_CREATE': { color: 'bg-green-100 text-green-700 border-green-200', icon: DollarSign },
        'SALE_UPDATE': { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: RefreshCw },
        'SALE_VOID': { color: 'bg-red-100 text-red-700 border-red-200', icon: ShieldAlert },
        'EXCHANGE': { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: ArrowRight },
        'REFUND': { color: 'bg-rose-100 text-rose-700 border-rose-200', icon: Undo2 },
        'STOCK_ADD': { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Tag },
        'STOCK_ADJUST': { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: Tag },
        'PRODUCT_DELETE': { color: 'bg-red-100 text-red-700 border-red-200', icon: Activity },
        'USER_LOGIN': { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: User },
    };

    const filteredLogs = logs.filter(log =>
        (log.details?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (log.user?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (log.action?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    // Simple parser for detailed logs (like the new Exchange log)
    const renderParsedDetails = (details: string, action: string) => {
        if (action === 'EXCHANGE') {
            // Exchange processed for Invoice ID ... Diff: ₹...
            return (
                <div className="mt-2 p-3 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800 rounded-xl">
                    <p className="text-sm font-bold text-orange-800 dark:text-orange-400 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" /> Professional Exchange
                    </p>
                    <p className="text-xs text-orange-700 dark:text-orange-500 mt-1">{details}</p>
                </div>
            );
        }

        if (action === 'REFUND') {
            return (
                <div className="mt-2 p-3 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800 rounded-xl">
                    <p className="text-sm font-bold text-rose-800 dark:text-rose-400 flex items-center gap-2">
                        <Undo2 className="w-4 h-4" /> Professional Refund
                    </p>
                    <p className="text-xs text-rose-700 dark:text-rose-500 mt-1">{details}</p>
                </div>
            );
        }

        return <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{details}</p>;
    };

    if (user?.role !== 'ADMIN') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-red-50 p-6 rounded-full mb-4">
                    <ShieldAlert className="w-16 h-16 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                <p className="text-gray-500 max-w-sm">
                    Only administrators can view the system activity logs.
                    Please contact your manager if you need access.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <div className="bg-primary-600 p-2 rounded-xl text-white shadow-lg shadow-primary-200">
                            <Activity className="w-6 h-6" />
                        </div>
                        Activity Tracker
                    </h1>
                    <p className="text-gray-500 mt-1 ml-11">Monitor all system actions and transaction updates</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by action, user, or bill..."
                            className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none w-full md:w-80 shadow-sm transition-all"
                        />
                    </div>
                    <Button
                        variant="secondary"
                        onClick={loadLogs}
                        className="bg-white hover:bg-gray-50 dark:bg-gray-800 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                        <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>
            </div>

            {/* List Header */}
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 px-2">
                <span>Timeline of Events</span>
                <span>Latest First</span>
            </div>

            {/* Logs List */}
            <div className="space-y-3 relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-800 -z-10 hidden sm:block"></div>

                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-4 animate-pulse">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-100 w-1/4 rounded" />
                                <div className="h-3 bg-gray-50 w-2/3 rounded" />
                            </div>
                        </div>
                    ))
                ) : filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => {
                        const style = actionStyles[log.action] || { color: 'bg-gray-50 text-gray-600 border-gray-200', icon: Activity };
                        const Icon = style.icon;

                        return (
                            <div key={log.id} className="group bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-primary-100 dark:hover:border-primary-900 transition-all">
                                <div className="flex items-start gap-4">
                                    {/* Action Icon */}
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl border ${style.color} flex items-center justify-center shadow-inner`}>
                                        <Icon className="w-6 h-6" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-gray-900 dark:text-gray-100 capitalize">
                                                    {log.action.toLowerCase().replace(/_/g, ' ')}
                                                </h3>
                                                <span className="hidden sm:inline text-gray-300">•</span>
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                                                    <User className="w-3 h-3" />
                                                    {log.user?.name || 'System'}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                                                <Clock className="w-3 h-3" />
                                                {format(new Date(log.createdAt), 'dd MMM, hh:mm:ss a')}
                                            </div>
                                        </div>

                                        {/* Parsed Details Area */}
                                        <div className="bg-white dark:bg-gray-800">
                                            {renderParsedDetails(log.details, log.action)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400">
                        <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p className="text-lg font-medium">No activity to show</p>
                        <p className="text-sm">Try adjusting your search query</p>
                    </div>
                )}
            </div>
        </div>
    );
};
