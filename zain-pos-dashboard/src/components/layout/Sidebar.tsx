import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    TrendingUp,
    Package,
    FileText,
    BarChart3,
    LogOut,
    Menu,
    X,
    Activity
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Sales', href: '/sales', icon: TrendingUp },
        { name: 'Inventory', href: '/inventory', icon: Package },
        { name: 'Invoices', href: '/invoices', icon: FileText },
        { name: 'Reports', href: '/reports', icon: BarChart3 },
        { name: 'Activity', href: '/activity', icon: Activity },
    ];

    return (
        <aside
            className={cn(
                "hidden lg:flex bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 flex-col fixed inset-y-0 z-20",
                isOpen ? "w-64" : "w-16"
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-3 border-b border-gray-200 dark:border-gray-800">
                {isOpen && (
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent truncate ml-1">
                        Zain POS
                    </h1>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                    className="ml-auto"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/10 dark:text-primary-400"
                                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                            )}
                            title={!isOpen ? item.name : ''}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {isOpen && <span>{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* User Info & Logout */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                {isOpen && (
                    <div className="mb-3 px-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {user?.name || user?.username}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                            {user?.role}
                        </p>
                    </div>
                )}
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 gap-3",
                        !isOpen && "justify-center px-0"
                    )}
                    onClick={() => { logout(); window.location.href = '/login'; }}
                    title={!isOpen ? 'Logout' : ''}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {isOpen && <span>Logout</span>}
                </Button>
            </div>
        </aside>
    );
}
