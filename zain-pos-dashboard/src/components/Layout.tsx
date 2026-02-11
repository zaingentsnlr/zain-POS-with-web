import { type ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    LayoutDashboard,
    TrendingUp,
    Package,
    FileText,
    BarChart3,
    LogOut,
    Menu,
    X,
    Sun,
    Moon
} from 'lucide-react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Dark Mode Effect
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const navigation = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Sales', href: '/sales', icon: TrendingUp },
        { name: 'Inventory', href: '/inventory', icon: Package },
        { name: 'Invoices', href: '/invoices', icon: FileText },
        { name: 'Reports', href: '/reports', icon: BarChart3 },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-dark-bg">
            {/* Desktop Sidebar (Collapsible) */}
            <aside
                className={`hidden lg:flex ${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border transition-all duration-300 flex-col fixed inset-y-0 z-20`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-dark-border">
                    {sidebarOpen && (
                        <h1 className="text-xl font-bold gradient-primary bg-clip-text text-transparent truncate">
                            Zain POS
                        </h1>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mx-auto lg:mx-0"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={isActive ? 'sidebar-link-active' : 'sidebar-link'}
                                title={!sidebarOpen ? item.name : ''}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                {sidebarOpen && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info & Logout */}
                <div className="p-4 border-t border-gray-200 dark:border-dark-border">
                    {sidebarOpen && (
                        <div className="mb-3">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                {user?.name || user?.username}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                                {user?.role}
                            </p>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="sidebar-link w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        title={!sidebarOpen ? 'Logout' : ''}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>

                {/* Mobile Header (Only visible on small screens) */}
                <div className="lg:hidden bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border h-16 flex items-center justify-between px-4 sticky top-0 z-30">
                    <h1 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">Zain POS</h1>
                    <button onClick={() => setDarkMode(!darkMode)} className="p-2">
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Desktop Header */}
                <header className="hidden lg:flex h-16 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border items-center justify-between px-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {navigation.find((item) => item.href === location.pathname)?.name || 'Dashboard'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                                {user?.username?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50 dark:bg-dark-bg pb-20 lg:pb-8">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Navigation (Sticky) */}
            <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border z-30 pb-safe">
                <nav className="flex justify-around p-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="text-[10px] font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                    <button onClick={handleLogout} className="flex flex-col items-center gap-1 px-3 py-2 text-gray-500">
                        <LogOut size={20} />
                        <span className="text-[10px] font-medium">Exit</span>
                    </button>
                </nav>
            </div>
        </div>
    );
}
