import React, { useState, useMemo } from 'react';
import { Search, Filter, Clock, MapPin, Award, Megaphone, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { UserProfile } from '../types/types';
import { useUser } from '../context/UserContext';

export const Catalog: React.FC = () => {
    const { userProfile } = useUser();
    const { data } = useData();
    const [filter, setFilter] = useState<'All' | 'Transport' | 'Logistique'>('All');

    const filteredData = useMemo(() => {
        if (!data) return [];
        return data.trainingCatalog.filter(item => {
            if (filter !== 'All' && item.category !== filter) return false;
            return true;
        });
    }, [filter, data]);

    // Find a high priority promotion to display
    const featuredPromo = useMemo(() => {
        if (!data) return undefined;
        return data.newsItems.find(n => n.type === 'PROMOTION' && n.priority === 1);
    }, [data]);

    if (!data) return null;

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Catalogue des formations</h1>
                    {userProfile && <p className="text-gray-500 mt-1">Recommandations pour : <span className="font-semibold text-aftral-red">{userProfile}</span></p>}
                </div>
                <div className="flex gap-2">
                    {['All', 'Transport', 'Logistique'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat as any)}
                            className={`px-5 py-2 rounded-full font-medium active:scale-95 transition-all ${filter === cat ? 'bg-aftral-dark text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {cat === 'All' ? 'Tout' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Bar Placeholder */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Rechercher une formation, un métier..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-aftral-red"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-20">
                {filteredData.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${item.category === 'Transport' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {item.category}
                                </span>
                                <h3 className="text-xl font-bold text-gray-800 leading-tight">{item.title}</h3>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-lg text-center min-w-[80px]">
                                <span className="block text-sm text-gray-500">Niveau</span>
                                <span className="font-bold text-gray-900">{item.level}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-gray-600 text-sm">
                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                <span>{item.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award size={18} />
                                <span>{item.type}</span>
                            </div>
                        </div>

                        <button className="w-full mt-2 py-3 border-2 border-aftral-red text-aftral-red font-bold rounded-lg hover:bg-aftral-red hover:text-white active:scale-95 transition-all">
                            Voir le détail
                        </button>
                    </div>
                ))}

                {/* Dynamic Promo Block */}
                {featuredPromo ? (
                    <div className="bg-gradient-to-r from-aftral-red to-red-800 rounded-xl p-8 text-white mt-8 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Megaphone size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                Offre Spéciale
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{featuredPromo.title}</h3>
                            <p className="opacity-90 mb-6 text-lg max-w-lg">{featuredPromo.summary}</p>
                            <button className="bg-white text-aftral-red px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-50 active:scale-95 transition-all">
                                {featuredPromo.ctaLabel} <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white mt-8">
                        <h3 className="text-2xl font-bold mb-2">L'alternance avec AFTRAL</h3>
                        <p className="opacity-90 mb-6 text-lg">Une formation gratuite, rémunérée et un emploi à la clé. Découvrez nos 8000 entreprises partenaires.</p>
                        <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-bold active:scale-95 transition-transform">En savoir plus sur l'alternance</button>
                    </div>
                )}
            </div>
        </div>
    );
};
