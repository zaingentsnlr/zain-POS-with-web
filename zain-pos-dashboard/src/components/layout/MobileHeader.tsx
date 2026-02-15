import { Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/shared/DateRangePicker';
import { NotificationBell } from '@/components/notifications/NotificationBell';

interface MobileHeaderProps {
    darkMode: boolean;
    setDarkMode: (dark: boolean) => void;
}

export function MobileHeader({ darkMode, setDarkMode }: MobileHeaderProps) {
    const { logout } = useAuth();

    return (
        <div className="lg:hidden flex flex-col bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
            <div className="h-16 flex items-center justify-between px-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                    Zain POS
                </h1>
                <div className="flex items-center gap-1">
                    <NotificationBell />

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDarkMode(!darkMode)}
                        className="text-gray-500"
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => { logout(); window.location.href = '/login'; }}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        <LogOut className="w-5 h-5" />
                    </Button>
                </div>
            </div>
            {/* Mobile Date Filter Bar */}
            <div className="px-4 pb-3">
                <DateRangePicker />
            </div>
        </div>
    );
}
