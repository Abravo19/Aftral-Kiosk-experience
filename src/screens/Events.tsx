import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Events: React.FC = () => {
    const { data } = useData();

    if (!data) return null;

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Agenda</h1>
      <p className="text-gray-500 mb-8 text-lg">Ne manquez pas nos prochains événements recrutement et découverte.</p>

      <div className="space-y-4 overflow-y-auto pb-20">
        {data.events.map(evt => (
            <div key={evt.id} className="bg-white rounded-xl p-0 flex shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-aftral-dark text-white w-24 flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-2xl font-bold">{evt.date.split(' ')[0]}</span>
                    <span className="text-xs uppercase tracking-wide">{evt.date.split(' ')[1].substring(0,3)}</span>
                </div>
                <div className="p-5 flex-1">
                    <div className="flex justify-between items-start mb-2">
                         <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">{evt.type}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{evt.title}</h3>
                    <div className="flex items-center gap-2 text-gray-500">
                        <MapPin size={16} />
                        <span>{evt.location}</span>
                    </div>
                </div>
            </div>
        ))}
      </div>

      <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl mt-4">
        <h3 className="font-bold text-orange-800 text-lg mb-1">Besoin d'aide pour votre dossier ?</h3>
        <p className="text-orange-700 mb-4">Participez à nos ateliers "CV & Entretien" tous les mercredis.</p>
        <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-bold shadow-sm border border-orange-200">
            M'inscrire au prochain atelier
        </button>
      </div>
    </div>
  );
};
