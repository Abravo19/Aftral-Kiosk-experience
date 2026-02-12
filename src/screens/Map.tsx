import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export const MapScreen: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('Grand Est');

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Nos centres de formation</h1>
      
      <div className="flex gap-4 overflow-x-auto pb-4 mb-4">
        {['Grand Est', 'Île-de-France', 'Hauts-de-France', 'Auvergne-Rhône-Alpes'].map(region => (
            <button 
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-lg font-medium shadow-sm transition-all ${selectedRegion === region ? 'bg-aftral-red text-white' : 'bg-white text-gray-600'}`}
            >
                {region}
            </button>
        ))}
      </div>

      <div className="flex-1 bg-gray-200 rounded-2xl overflow-hidden relative mb-6">
        {/* Mock Map View */}
        <img 
            src="https://picsum.photos/seed/mapview/800/1000" 
            alt="Carte de France" 
            className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center gap-3">
                <Navigation className="text-aftral-red animate-pulse" />
                <span className="font-semibold text-gray-800">Toucher un point pour voir le centre</span>
            </div>
        </div>
        
        {/* Mock Pin */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
            <MapPin size={48} className="text-aftral-red drop-shadow-xl" fill="currentColor" />
        </div>
      </div>

      {/* Center Details Card (Static Mock for selected pin) */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AFTRAL Nancy / Tomblaine</h2>
        <p className="text-gray-500 mb-4">13 Rue Jean Moulin, 54510 Tomblaine</p>
        
        <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Phone className="text-aftral-red" size={20} />
                <span className="font-medium">03 83 18 48 48</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Clock className="text-aftral-red" size={20} />
                <span className="font-medium">08:00 - 17:30</span>
            </div>
        </div>
      </div>
    </div>
  );
};
