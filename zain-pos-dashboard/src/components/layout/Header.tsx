import { Link } from 'react-router-dom';
import { Bell, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/shared/DateRangePicker';

interface HeaderProps {
    title: string;
    darkMode: boolean;
    setDarkMode: (dark: boolean) => void;
}

export function Header({ title, darkMode, setDarkMode }: HeaderProps) {
    const { user } = useAuth();

    return (
        <header className="hidden lg:flex h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 items-center justify-between px-6 sticky top-0 z-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
            </h2>
            <div className="flex items-center gap-4">
                <DateRangePicker />

                <Link to="/activity">
                    <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-primary-600">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </Button>
                </Link>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDarkMode(!darkMode)}
                    className="text-gray-500"
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>

                <div className="flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-gray-700 h-8">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-sm border border-primary-200 dark:border-primary-800">
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>
        </header>
    );
}
