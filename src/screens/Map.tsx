import React, { useState } from 'react';
import { MapPin, Info, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MapScreen: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const zones = [
    { id: 'accueil', name: 'Accueil', x: '50%', y: '80%', color: 'bg-green-500', desc: "Vous êtes ici. Renseignements et inscriptions." },
    { id: 'salles', name: 'Salles de cours', x: '20%', y: '40%', color: 'bg-blue-500', desc: "Salles 101 à 108. Formation théorique." },
    { id: 'simu', name: 'Simulateurs', x: '80%', y: '40%', color: 'bg-orange-500', desc: "Simulateurs de conduite Poids Lourds." },
    { id: 'wh', name: 'Entrepôt École', x: '50%', y: '20%', color: 'bg-purple-500', desc: "Zone pratique Cariste et Logistique." },
  ];

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-6 flex justify-between items-end">
        <div>
            <h1 className="text-kiosk-xl font-bold text-gray-900">Plan du Centre</h1>
            <p className="text-kiosk-base text-gray-500">Touchez une zone pour voir les détails.</p>
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-bold text-gray-700">Vous êtes ici (Accueil)</span>
        </div>
      </div>
      
      <div className="flex-1 relative bg-gray-50 rounded-3xl border-2 border-gray-200 overflow-hidden shadow-inner">
        {/* Placeholder for Dynamic Floor Plan Image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="grid grid-cols-4 gap-4 w-full h-full p-8">
                <div className="col-span-4 border-4 border-gray-300 rounded-xl h-32 mb-auto"></div>
                <div className="col-span-1 border-4 border-gray-300 rounded-xl h-full"></div>
                <div className="col-span-2 border-4 border-gray-300 rounded-xl h-full mx-8"></div>
                <div className="col-span-1 border-4 border-gray-300 rounded-xl h-full"></div>
            </div>
        </div>

        {/* Interactive Zones */}
        {zones.map(zone => (
            <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`absolute w-32 h-32 -ml-16 -mt-16 rounded-full flex flex-col items-center justify-center transition-all duration-300 z-10 
                    ${selectedZone === zone.id ? 'scale-125 shadow-xl z-20' : 'scale-100 hover:scale-110 shadow-md'}
                    ${zone.color} text-white
                `}
                style={{ left: zone.x, top: zone.y }}
            >
                <MapPin size={32} className="mb-1" />
                <span className="font-bold text-sm text-center px-2 leading-tight">{zone.name}</span>
                {zone.id === 'accueil' && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">Moi</span>}
            </button>
        ))}

        {/* Connecting Lines (Stylized) */}
        <svg className="absolute inset-0 pointer-events-none opacity-20" width="100%" height="100%">
            <path d="M 50% 80% L 20% 40%" stroke="black" strokeWidth="4" strokeDasharray="10,10" />
            <path d="M 50% 80% L 80% 40%" stroke="black" strokeWidth="4" strokeDasharray="10,10" />
            <path d="M 50% 80% L 50% 20%" stroke="black" strokeWidth="4" strokeDasharray="10,10" />
        </svg>

        {/* Detail Modal / Overlay */}
        <AnimatePresence>
            {selectedZone && (
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 z-30 flex items-center gap-6"
                >
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${zones.find(z => z.id === selectedZone)?.color} text-white`}>
                        <Info size={32} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{zones.find(z => z.id === selectedZone)?.name}</h3>
                        <p className="text-gray-600 text-lg">{zones.find(z => z.id === selectedZone)?.desc}</p>
                    </div>
                    <button 
                        onClick={() => setSelectedZone(null)}
                        className="bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-colors"
                    >
                        Fermer
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};
