import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/auth.service';

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                // @ts-ignore
                const res = await window.electronAPI.users.list();
                if (res.success) {
                    setUsers(res.data);
                    if (res.data.length > 0) setUsername(res.data[0].username);
                }
            } catch (e) {
                console.error("Failed to load users", e);
            }
        };
        loadUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = await authService.login(username, password);
            login(user);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.15) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }}></div>

            {/* Soft Gradient Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-blue-500/20 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
                    {/* Logo & Branding */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
                            <LogIn className="w-8 h-8 text-white" strokeWidth={2} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">
                            ZAIN GENTS PALACE
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                            Point of Sale System
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Select User
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" strokeWidth={2} />
                                <select
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none text-gray-900 dark:text-white font-medium"
                                    required
                                >
                                    <option value="" disabled>Select a user</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.username} className="bg-white dark:bg-gray-800">
                                            {u.name} ({u.role})
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-11 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 font-medium"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" strokeWidth={2} /> : <Eye className="w-5 h-5" strokeWidth={2} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-center text-xs text-gray-600 dark:text-gray-400">
                            <p className="mb-1 font-medium">Default credentials</p>
                            <p className="font-mono text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">admin</span> <span className="text-gray-400 mx-1">•</span> <span className="font-semibold">admin123</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
                    <p>© 2026 Zain Gents Palace. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};
