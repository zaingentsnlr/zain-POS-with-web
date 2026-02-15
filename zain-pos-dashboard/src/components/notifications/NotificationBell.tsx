import { useState, useRef, useEffect } from 'react';
import { Bell, Check, ExternalLink } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import type { Notification } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export function NotificationBell() {
    const { notifications, unreadCount, markAsRead, markAllAsRead, subscribePush, isPushEnabled } = useNotifications();


    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNotificationClick = async (notification: Notification) => {
        if (!notification.read) {
            await markAsRead(notification.id);
        }
        // If it has a link or action, handle it?
        // Usually clicking notification navigates.
        // For now, if referencing an invoice, maybe link to invoices?
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-500 hover:text-primary-600"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-900/50">
                        <h3 className="font-semibold text-sm">Notifications</h3>
                        <div className="flex gap-2">
                            {!isPushEnabled && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={subscribePush}
                                    className="h-7 text-xs px-2 text-primary-600"
                                >
                                    Enable Push
                                </Button>
                            )}
                            {unreadCount > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={markAllAsRead}
                                    className="h-7 text-xs px-2 text-gray-500 hover:text-primary-600"
                                >
                                    Mark all read
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="max-h-[70vh] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 text-sm">
                                No notifications yet
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${!notification.read ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''
                                            }`}
                                        onClick={() => handleNotificationClick(notification)}
                                    >
                                        <div className="flex gap-3 items-start">
                                            <div className={`mt-1 min-w-2 min-h-2 rounded-full ${!notification.read ? 'bg-blue-500' : 'bg-transparent'
                                                }`} />
                                            <div className="flex-1 space-y-1">
                                                <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                                                    {notification.title}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center justify-between pt-1">
                                                    <span className="text-[10px] text-gray-400">
                                                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                                    </span>
                                                    {notification.referenceId && (
                                                        <Link
                                                            to={`/invoices`} // Simplification: generic link, ideally filter by ID
                                                            className="text-[10px] flex items-center gap-1 text-primary-600 hover:underline"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            View <ExternalLink className="w-3 h-3" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                            {!notification.read && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-gray-400 hover:text-primary-600 -mr-2 -mt-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        markAsRead(notification.id);
                                                    }}
                                                >
                                                    <Check className="w-3 h-3" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Mobile Notification Page Link/Icon (simpler version for mobile header if needed)
export function MobileNotificationBell() {
    // const { unreadCount } = useNotifications();

    // On mobile, maybe we just navigate to a page or open a drawer?
    // User requested "Red dot on bell icon".
    // Let's reuse the dropdown logic but maybe full screen or just same logic.
    // For now, same component works.
    return <NotificationBell />;

    // Alternatively, if we wanted a link to /notifications page:
    /*
    return (
        <Link to="/notifications" className="relative p-2">
            <Bell className="w-6 h-6 text-gray-600" />
            {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
        </Link>
    );
    */
}
