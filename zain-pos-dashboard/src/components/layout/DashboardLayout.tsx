import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileHeader } from './MobileHeader';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';
import { Toaster } from 'react-hot-toast';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const location = useLocation();

    // Dark Mode Effect
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Determine Title
    const getTitle = () => {
        switch (location.pathname) {
            case '/': return 'Dashboard';
            case '/sales': return 'Sales';
            case '/inventory': return 'Inventory';
            case '/invoices': return 'Invoices';
            case '/reports': return 'Reports';
            case '/activity': return 'Activity';
            default: return 'Dashboard';
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100">
            {/* Desktop Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <div className={cn(
                "flex-1 flex flex-col overflow-hidden transition-all duration-300",
                sidebarOpen ? "lg:ml-64" : "lg:ml-16"
            )}>
                <MobileHeader darkMode={darkMode} setDarkMode={setDarkMode} />
                <Header title={getTitle()} darkMode={darkMode} setDarkMode={setDarkMode} />

                <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Nav */}
            <MobileNav />

            <Toaster position="top-right" />
        </div>
    );
}
