import React from 'react';
import { BookOpen, Calendar, Newspaper, Briefcase, TrendingUp, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { Screen } from '../types/types';

export const AdminDashboard: React.FC = () => {
    const { data, adminSettings } = useData();
    const { navigate } = useNavigation();

    if (!data) return null;

    const stats = [
        {
            label: 'Formations',
            value: data.trainingCatalog.length,
            icon: BookOpen,
            color: 'from-blue-500 to-blue-700',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
        },
        {
            label: 'Événements',
            value: data.events.length,
            icon: Calendar,
            color: 'from-emerald-500 to-emerald-700',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
        },
        {
            label: 'Actualités',
            value: data.newsItems.length,
            icon: Newspaper,
            color: 'from-orange-500 to-orange-700',
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
        },
        {
            label: 'Fiches Métiers',
            value: data.jobProfiles.length,
            icon: Briefcase,
            color: 'from-purple-500 to-purple-700',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
        },
    ];

    const quickActions = [
        { label: 'Gérer les actualités', screen: Screen.ADMIN_NEWS, desc: 'Ajouter, modifier ou supprimer des news' },
        { label: 'Configuration', screen: Screen.ADMIN_SETTINGS, desc: 'PIN, timeout, réinitialisation' },
    ];

    return (
        <div className="max-w-6xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">Vue d'ensemble du contenu de votre kiosque</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {stats.map(stat => (
                    <div key={stat.label} className={`${stat.bg} border ${stat.border} rounded-2xl p-6`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl shadow-lg`}>
                                <stat.icon size={24} className="text-white" />
                            </div>
                            <TrendingUp size={18} className="text-gray-600" />
                        </div>
                        <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-white mb-4">Actions rapides</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickActions.map(action => (
                        <button
                            key={action.screen}
                            onClick={() => navigate(action.screen)}
                            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left hover:border-gray-600 hover:bg-gray-800/50 transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">{action.label}</h3>
                                    <p className="text-gray-500 text-sm">{action.desc}</p>
                                </div>
                                <ArrowRight size={24} className="text-gray-600 group-hover:text-aftral-red group-hover:translate-x-1 transition-all" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Current Settings Summary */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Configuration actuelle</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-xl p-4">
                        <p className="text-gray-400 text-sm mb-1">Timeout écran de veille</p>
                        <p className="text-white font-bold text-lg">{adminSettings.screensaverTimeout / 1000}s</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                        <p className="text-gray-400 text-sm mb-1">PIN Admin</p>
                        <p className="text-white font-bold text-lg">••••</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
