import React from 'react';
import { LayoutDashboard, Newspaper, Settings, LogOut, Shield } from 'lucide-react';
import { Screen } from '../types/types';
import { useNavigation } from '../context/NavigationContext';
import { useAdmin } from '../context/AdminContext';

interface AdminLayoutProps {
    children: React.ReactNode;
    currentAdminScreen: Screen;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentAdminScreen }) => {
    const { navigate } = useNavigation();
    const { logout } = useAdmin();

    const handleExit = () => {
        logout();
        navigate(Screen.HOME);
    };

    const navItems = [
        { screen: Screen.ADMIN_DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
        { screen: Screen.ADMIN_NEWS, icon: Newspaper, label: 'Actualités' },
        { screen: Screen.ADMIN_SETTINGS, icon: Settings, label: 'Configuration' },
    ];

    return (
        <div className="flex h-screen w-full bg-gray-950 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
                {/* Admin Header */}
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-aftral-red p-2.5 rounded-xl">
                            <Shield size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-lg">AFTRAL</h1>
                            <span className="text-xs text-aftral-red font-semibold uppercase tracking-wider">Mode Admin</span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map(item => {
                        const isActive = currentAdminScreen === item.screen;
                        return (
                            <button
                                key={item.screen}
                                onClick={() => navigate(item.screen)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${isActive
                                        ? 'bg-aftral-red text-white shadow-lg shadow-red-900/30'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                            >
                                <item.icon size={22} />
                                <span className="font-medium text-base">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Exit Button */}
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleExit}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                    >
                        <LogOut size={22} />
                        <span className="font-medium">Quitter l'admin</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
};
