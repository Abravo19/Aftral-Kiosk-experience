import { BookOpen, Calendar, Newspaper, Briefcase, TrendingUp, ArrowRight, BarChart3, Users, QrCode, MousePointerClick, RotateCcw, HelpCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAnalytics } from '../context/AnalyticsContext';
import { useNavigation } from '../context/NavigationContext';
import { Screen } from '../types/types';

export const AdminDashboard = () => {
    const { data, adminSettings } = useData();
    const { analytics, resetAnalytics } = useAnalytics();
    const { navigate } = useNavigation();

    if (!data) return null;

    const stats = [
        { label: 'Formations', value: data.trainingCatalog.length, icon: BookOpen, color: 'from-blue-500 to-blue-700', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        { label: 'Événements', value: data.events.length, icon: Calendar, color: 'from-emerald-500 to-emerald-700', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        { label: 'Actualités', value: data.newsItems.length, icon: Newspaper, color: 'from-orange-500 to-orange-700', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
        { label: 'Fiches Métiers', value: data.jobProfiles.length, icon: Briefcase, color: 'from-purple-500 to-purple-700', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    ];

    const quickActions = [
        { label: 'Gérer les actualités', screen: Screen.ADMIN_NEWS, desc: 'Ajouter, modifier ou supprimer des news' },
        { label: 'Configuration', screen: Screen.ADMIN_SETTINGS, desc: 'PIN, timeout, réinitialisation' },
    ];

    // Screen view rankings
    const screenViewEntries = Object.entries(analytics.screenViews)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    const totalViews = Object.values(analytics.screenViews).reduce((a, b) => a + b, 0);

    // Profile selection rankings
    const profileEntries = Object.entries(analytics.profileSelections)
        .sort(([, a], [, b]) => b - a);

    const totalProfiles = Object.values(analytics.profileSelections).reduce((a, b) => a + b, 0);

    const screenLabels: Record<string, string> = {
        HOME: 'Accueil', CATALOG: 'Formations', MAP: 'Plan', QUIZ: 'Quiz',
        EVENTS: 'Agenda', CONTACT: 'Contact', JOB_SHEETS: 'Fiches Métiers', NEWS: 'Actualités'
    };

    return (
        <div className="max-w-6xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">Vue d'ensemble du contenu et de l'utilisation du kiosque</p>
            </div>

            {/* Content Stats Grid */}
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

            {/* Analytics Section */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <BarChart3 size={24} className="text-cyan-400" />
                        <h2 className="text-xl font-bold text-white">Statistiques d'utilisation</h2>
                    </div>
                    <button
                        onClick={resetAnalytics}
                        className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm font-medium transition-colors"
                    >
                        <RotateCcw size={14} />
                        Réinitialiser
                    </button>
                </div>

                {/* Usage Summary Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <MousePointerClick size={16} className="text-cyan-400" />
                            <span className="text-gray-400 text-xs font-medium">Sessions</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{analytics.sessionCount}</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart3 size={16} className="text-emerald-400" />
                            <span className="text-gray-400 text-xs font-medium">Pages vues</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{totalViews}</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <QrCode size={16} className="text-purple-400" />
                            <span className="text-gray-400 text-xs font-medium">QR Scans</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{analytics.qrScans}</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <HelpCircle size={16} className="text-amber-400" />
                            <span className="text-gray-400 text-xs font-medium">Appels aide</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{analytics.helpRequests}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Most Visited Pages */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Pages les plus visitées</h3>
                        {screenViewEntries.length === 0 ? (
                            <p className="text-gray-600 text-sm">Aucune donnée</p>
                        ) : (
                            <div className="space-y-3">
                                {screenViewEntries.map(([screen, count], i) => {
                                    const pct = totalViews > 0 ? Math.round((count / totalViews) * 100) : 0;
                                    return (
                                        <div key={screen}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-gray-300 text-sm font-medium">{screenLabels[screen] || screen}</span>
                                                <span className="text-gray-500 text-xs">{count} ({pct}%)</span>
                                            </div>
                                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Profile Distribution */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Profils sélectionnés</h3>
                        {profileEntries.length === 0 ? (
                            <p className="text-gray-600 text-sm">Aucune donnée</p>
                        ) : (
                            <div className="space-y-3">
                                {profileEntries.map(([profile, count]) => {
                                    const pct = totalProfiles > 0 ? Math.round((count / totalProfiles) * 100) : 0;
                                    return (
                                        <div key={profile}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-gray-300 text-sm font-medium">{profile}</span>
                                                <span className="text-gray-500 text-xs">{count} ({pct}%)</span>
                                            </div>
                                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {analytics.lastReset && (
                    <p className="text-gray-600 text-xs mt-3">
                        Dernière remise à zéro : {new Date(analytics.lastReset).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                )}
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
