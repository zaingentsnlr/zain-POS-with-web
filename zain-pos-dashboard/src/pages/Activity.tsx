import { useEffect, useState } from 'react';
import { Activity, Search, AlertTriangle, Trash2, ShoppingCart, User } from 'lucide-react';
import api from '../lib/api';

interface AuditLog {
    id: string;
    action: string;
    details: string;
    userId: string;
    createdAt: string;
    user?: {
        name: string;
        role: string;
    };
}

export default function ActivityPage() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await api.get('/activity');
            setLogs(response.data);
        } catch (error) {
            console.error('Failed to fetch activity logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (action: string) => {
        if (action.includes('DELETE') || action.includes('VOID')) return <Trash2 className="text-red-500" />;
        if (action.includes('SALE')) return <ShoppingCart className="text-green-500" />;
        if (action.includes('USER')) return <User className="text-blue-500" />;
        return <Activity className="text-gray-500" />;
    };

    const filteredLogs = logs.filter(log =>
        log.details.toLowerCase().includes(filter.toLowerCase()) ||
        log.action.toLowerCase().includes(filter.toLowerCase()) ||
        log.user?.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center text-gray-500">Loading activity...</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
                <p className="text-gray-600 mt-1">Real-time view of system actions and alerts</p>
            </div>

            {/* Search */}
            <div className="card">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                {filteredLogs.map((log) => (
                    <div key={log.id} className="card flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            {getIcon(log.action)}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-gray-900">{log.action.replace(/_/g, ' ')}</h3>
                                <span className="text-xs text-gray-500">
                                    {new Date(log.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-gray-600 mt-1 text-sm">{log.details}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                <User size={12} />
                                <span>{log.user?.name || 'Unknown User'} ({log.user?.role || 'System'})</span>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredLogs.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No logs found matching your filter.
                    </div>
                )}
            </div>
        </div>
    );
}
