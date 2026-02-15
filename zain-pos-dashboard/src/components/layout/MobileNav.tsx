import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    TrendingUp,
    Package,
    FileText,
    Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNav() {
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Sales', href: '/sales', icon: TrendingUp },
        { name: 'Inventory', href: '/inventory', icon: Package },
        { name: 'Invoices', href: '/invoices', icon: FileText },
        // { name: 'Reports', href: '/reports', icon: BarChart3 }, // Hidden on mobile to save space if needed
        { name: 'Activity', href: '/activity', icon: Activity },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-30 pb-safe">
            <nav className="flex justify-around p-2">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                                isActive
                                    ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/10"
                                    : "text-gray-500 dark:text-gray-400"
                            )}
                        >
                            <Icon size={20} />
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
