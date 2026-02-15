import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

export interface Notification {
    id: string;
    type: 'sale' | 'invoice_deleted' | 'invoice_updated';
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    referenceId?: string;
    metadata?: any;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    subscribePush: () => Promise<void>;
    isPushEnabled: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const { user, token } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isPushEnabled, setIsPushEnabled] = useState(false);

    // API URL from env or default
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

    // 1. Setup Socket & Initial Fetch
    useEffect(() => {
        if (!user || !token) return;

        setLoading(true);

        // Fetch Notifications
        fetch(`${API_URL}/api/notifications`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setNotifications(data);
                    setUnreadCount(data.filter((n: Notification) => !n.read).length);
                }
            })
            .catch(err => console.error('Failed to fetch notifications', err))
            .finally(() => setLoading(false));

        // Connect Socket
        const newSocket = io(API_URL, {
            auth: { token },
            query: { shopId: 'default-shop' },
            reconnection: true,
            reconnectionAttempts: 5
        });

        newSocket.on('connect', () => {
            console.log('🔔 Connected to Notification Socket');
        });

        newSocket.on('notification', (notification: Notification) => {
            // Play sound?
            const audio = new Audio('/sounds/notification.mp3');
            audio.play().catch(() => { });

            toast(`${notification.title}: ${notification.message}`, {
                icon: '🔔',
                duration: 5000
            });

            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
        });

        // Check Push Permission
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then(registration => {
                registration.pushManager.getSubscription().then(sub => {
                    setIsPushEnabled(!!sub);
                });
            });
        }

        return () => {
            newSocket.disconnect();
        };
    }, [user, token, API_URL]);

    // 2. Actions
    const markAsRead = async (id: string) => {
        try {
            // Optimistic update
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));

            await fetch(`${API_URL}/api/notifications/${id}/read`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Failed to mark as read', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0);

            await fetch(`${API_URL}/api/notifications/read-all`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Failed to mark all as read', error);
        }
    };

    const subscribePush = async () => {
        if (!user || !token) return;

        try {
            const registration = await navigator.serviceWorker.ready;
            const VAPID_PUBLIC_KEY = 'BFA13J-YDOluaD0tWBD6bTXPWmuMWCXcki4yDRbFCKjoTo_YOaI1MmJJQjKBZ4KKh-aqeOvzOLboU8Hke0_3FeA';

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            });

            await fetch(`${API_URL}/api/notifications/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(subscription)
            });

            setIsPushEnabled(true);
            toast.success('Push notifications enabled!');
        } catch (error) {
            console.error('Push subscription failed:', error);
            toast.error('Failed to enable push notifications');
        }
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            loading,
            markAsRead,
            markAllAsRead,
            subscribePush,
            isPushEnabled
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

// Utility
function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
