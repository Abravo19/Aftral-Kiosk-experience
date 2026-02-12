import React, { useState, useMemo } from 'react';
import { Clock, MapPin, Award, Megaphone, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

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

    const featuredPromo = useMemo(() => {
        if (!data) return undefined;
        return data.newsItems.find(n => n.type === 'PROMOTION' && n.priority === 1);
    }, [data]);

    if (!data) return null;

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
