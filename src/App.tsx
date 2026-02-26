import React, { useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { POS } from './pages/POS';
import { Products } from './pages/Products';
import { Customers } from './pages/Customers';
import { Sales } from './pages/Sales';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { ActivityPage } from './pages/Activity';
import { Users } from './pages/Users';
import { Permissions } from './pages/Permissions';
import { Forecasting } from './pages/Forecasting';
import { MainLayout } from './components/Layout/MainLayout';
import { useAuthStore } from './store/authStore';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const InsightsRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const user = useAuthStore((state) => state.user);
    const allowed = !!user && (user.role === 'ADMIN' || user.permViewInsights);
    return allowed ? <>{children}</> : <Navigate to="/pos" replace />;
};

function App() {
    const lastEditableRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const isEditable = (el: EventTarget | null): el is HTMLElement => {
            if (!(el instanceof HTMLElement)) return false;
            const tag = el.tagName;
            return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
        };

        const tryFocus = (el: HTMLElement | null) => {
            if (!el) return;
            if (el.hasAttribute('disabled')) return;
            if (el.getAttribute('aria-disabled') === 'true') return;
            if (!document.contains(el)) return;
            requestAnimationFrame(() => {
                try {
                    el.focus();
                } catch {
                    // no-op
                }
            });
        };

        const onPointerDownCapture = (e: PointerEvent) => {
            if (!isEditable(e.target)) return;
            lastEditableRef.current = e.target;
            tryFocus(e.target);
        };

        const onWindowFocus = () => {
            const active = document.activeElement;
            if (active && active !== document.body) return;
            tryFocus(lastEditableRef.current);
        };

        window.addEventListener('pointerdown', onPointerDownCapture, true);
        window.addEventListener('focus', onWindowFocus);
        document.addEventListener('visibilitychange', onWindowFocus);
        return () => {
            window.removeEventListener('pointerdown', onPointerDownCapture, true);
            window.removeEventListener('focus', onWindowFocus);
            document.removeEventListener('visibilitychange', onWindowFocus);
        };
    }, []);

    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="pos" element={<POS />} />
                    <Route path="products" element={<Products />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="sales" element={<Sales />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="users" element={<Users />} />
                    <Route path="permissions" element={<Permissions />} />
                    <Route path="activity" element={<ActivityPage />} />
                    <Route
                        path="forecasting"
                        element={
                            <InsightsRoute>
                                <Forecasting />
                            </InsightsRoute>
                        }
                    />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
