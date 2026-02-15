import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DateFilterProvider } from './contexts/DateFilterContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Inventory from './pages/Inventory';
import Invoices from './pages/Invoices';
import Reports from './pages/Reports';
import ActivityPage from './pages/Activity';
import './index.css';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/sales"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Sales />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Inventory />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/invoices"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Invoices />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/activity"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ActivityPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DateFilterProvider>
          <AppRoutes />
        </DateFilterProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


import { Toaster, toast } from 'react-hot-toast';
import { socket } from './lib/socket';
import { useEffect } from 'react';

// Global Socket Listener Component
function SocketListener() {
  useEffect(() => {
    function onSaleCreated(data: any) {
      console.log('socket event:', data);
      toast.success(`New Sale! (Items: ${data.count || 1})`, {
        position: 'top-right',
        duration: 4000,
        icon: '💰'
      });
    }

    socket.on('sale:created', onSaleCreated);

    return () => {
      socket.off('sale:created', onSaleCreated);
    };
  }, []);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <SocketListener />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
