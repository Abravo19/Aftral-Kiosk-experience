import { useState } from 'react';
import { MapPin, Info, Coffee, Car, Bath, Sofa, ArrowRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface Zone {
    id: string;
    name: string;
    x: string;
    y: string;
    color: string;
    desc: string;
    walkTime?: string;
    icon?: React.ElementType;
}

export const MapScreen = () => {
    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const { t } = useLanguage();

    const zones: Zone[] = [
        { id: 'accueil', name: 'Accueil', x: '50%', y: '82%', color: 'bg-green-500', desc: "Vous êtes ici. Renseignements et inscriptions.", icon: MapPin },
        { id: 'salles', name: 'Salles de cours', x: '18%', y: '38%', color: 'bg-blue-500', desc: "Salles 101 à 108. Formation théorique.", walkTime: '3', icon: MapPin },
        { id: 'simu', name: 'Simulateurs', x: '82%', y: '38%', color: 'bg-orange-500', desc: "Simulateurs de conduite Poids Lourds.", walkTime: '4', icon: MapPin },
        { id: 'wh', name: 'Entrepôt École', x: '50%', y: '15%', color: 'bg-purple-500', desc: "Zone pratique Cariste et Logistique.", walkTime: '5', icon: MapPin },
        { id: 'cafe', name: 'Cafétéria', x: '75%', y: '70%', color: 'bg-amber-500', desc: "Espace repas et détente. Distributeurs disponibles.", walkTime: '1', icon: Coffee },
        { id: 'parking', name: 'Parking', x: '15%', y: '75%', color: 'bg-slate-500', desc: "Parking visiteurs. 50 places disponibles.", walkTime: '2', icon: Car },
        { id: 'toilettes', name: 'Toilettes', x: '35%', y: '55%', color: 'bg-cyan-500', desc: "W.C. accessibles PMR au RDC.", walkTime: '1', icon: Bath },
        { id: 'repos', name: 'Salle de repos', x: '65%', y: '55%', color: 'bg-rose-500', desc: "Espace détente stagiaires avec micro-ondes.", walkTime: '2', icon: Sofa },
    ];

    const selectedData = zones.find(z => z.id === selectedZone);

    return (
        <div className="h-full flex flex-col p-4">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-kiosk-xl font-bold text-gray-900">{t('map.title')}</h1>
                    <p className="text-kiosk-base text-gray-500">{t('map.subtitle')}</p>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="font-bold text-gray-700">{t('map.you_are_here')}</span>
                </div>
            </div>

            <div className="flex-1 relative bg-gray-50 rounded-3xl border-2 border-gray-200 overflow-hidden shadow-inner">
                {/* Floor Plan Background */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
                    <div className="absolute top-[8%] left-[8%] right-[8%] h-[35%] border-4 border-gray-900 rounded-xl" />
                    <div className="absolute top-[50%] left-[8%] w-[36%] h-[25%] border-4 border-gray-900 rounded-xl" />
                    <div className="absolute top-[50%] right-[8%] w-[36%] h-[25%] border-4 border-gray-900 rounded-xl" />
                    <div className="absolute bottom-[8%] left-[25%] right-[25%] h-[18%] border-4 border-gray-900 rounded-xl" />
                    {/* Hallway lines */}
                    <div className="absolute top-[43%] left-[46%] right-[46%] h-[7%] bg-gray-900/30" />
                    <div className="absolute top-[43%] left-[46%] w-[8%] h-[35%] bg-gray-900/30" />
                </div>

                {/* Zones */}
                {zones.map(zone => {
                    const ZoneIcon = zone.icon || MapPin;
                    return (
                        <button
                            key={zone.id}
                            onClick={() => setSelectedZone(zone.id)}
                            className={`absolute -ml-14 -mt-14 rounded-full flex flex-col items-center justify-center transition-all duration-300 z-10
                                ${selectedZone === zone.id ? 'w-32 h-32 scale-110 shadow-xl z-20' : 'w-28 h-28 scale-100 hover:scale-105 shadow-md'}
                                ${zone.color} text-white
                            `}
                            style={{ left: zone.x, top: zone.y }}
                        >
                            <ZoneIcon size={zone.id === selectedZone ? 30 : 26} className="mb-0.5" />
                            <span className="font-bold text-[11px] text-center px-1 leading-tight">{zone.name}</span>
                            {zone.walkTime && zone.id !== 'accueil' && (
                                <span className="text-[9px] opacity-80 mt-0.5 flex items-center gap-0.5">
                                    <Clock size={8} /> {zone.walkTime} min
                                </span>
                            )}
                            {zone.id === 'accueil' && (
                                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce shadow-sm">Moi</span>
                            )}
                        </button>
                    );
                })}

                {/* Connecting Lines */}
                <svg className="absolute inset-0 pointer-events-none opacity-15" width="100%" height="100%">
                    <line x1="50%" y1="82%" x2="18%" y2="38%" stroke="#374151" strokeWidth="3" strokeDasharray="8,6" />
                    <line x1="50%" y1="82%" x2="82%" y2="38%" stroke="#374151" strokeWidth="3" strokeDasharray="8,6" />
                    <line x1="50%" y1="82%" x2="50%" y2="15%" stroke="#374151" strokeWidth="3" strokeDasharray="8,6" />
                    <line x1="50%" y1="82%" x2="75%" y2="70%" stroke="#374151" strokeWidth="3" strokeDasharray="8,6" />
                    <line x1="50%" y1="82%" x2="15%" y2="75%" stroke="#374151" strokeWidth="3" strokeDasharray="8,6" />
                    <line x1="50%" y1="82%" x2="35%" y2="55%" stroke="#374151" strokeWidth="3" strokeDasharray="8,6" />
                    <line x1="50%" y1="82%" x2="65%" y2="55%" stroke="#374151" strokeWidth="3" strokeDasharray="8,6" />
                </svg>

                {/* Detail Overlay */}
                <AnimatePresence>
                    {selectedData && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 z-30 flex items-center gap-6"
                        >
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${selectedData.color} text-white`}>
                                {selectedData.icon ? <selectedData.icon size={32} /> : <Info size={32} />}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedData.name}</h3>
                                <p className="text-gray-600 text-lg">{selectedData.desc}</p>
                                {selectedData.walkTime && selectedData.id !== 'accueil' && (
                                    <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                                        <Clock size={14} /> {selectedData.walkTime} {t('map.walking_time')}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => setSelectedZone(null)}
                                className="bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-colors"
                            >
                                {t('map.close')}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
