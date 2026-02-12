import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Events: React.FC = () => {
    const { data } = useData();

    if (!data) return null;

    // Group events could go here, but for now we'll just map them nicely
    const sortedEvents = [...data.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-kiosk-xl font-bold text-gray-900">Agenda</h1>
        <p className="text-kiosk-base text-gray-500">Prochains événements et job datings</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 pl-4 border-l-4 border-gray-200 ml-4 space-y-12">
        {sortedEvents.map((evt, index) => {
            const dateObj = new Date(evt.date);
            const dayName = dateObj.toLocaleDateString('fr-FR', { weekday: 'long' });
            const dayNum = dateObj.getDate();
            const month = dateObj.toLocaleDateString('fr-FR', { month: 'long' });

            return (
                <div key={evt.id} className="relative pl-8 group">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[2.15rem] top-0 w-8 h-8 rounded-full bg-white border-4 border-aftral-red shadow-sm group-hover:scale-125 transition-transform" />
                    
                    {/* Date Badge */}
                    <div className="bg-aftral-red text-white inline-block px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-sm mb-3">
                        {dayName} {dayNum} {month}
                    </div>

                    {/* Event Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                        <h3 className="text-kiosk-lg font-bold text-gray-900 mb-4">{evt.title}</h3>
                        
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Clock size={32} className="text-aftral-red" />
                                <span className="text-xl font-medium">{evt.time || '14:00 - 17:00'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <MapPin size={32} className="text-aftral-red" />
                                <span className="text-xl font-medium">{evt.location}</span>
                            </div>
                        </div>

                        <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                            {evt.description}
                        </p>

                        <button className="w-full bg-gray-50 hover:bg-aftral-dark hover:text-white text-gray-900 font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-colors text-xl">
                            S'inscrire <ArrowRight size={28} />
                        </button>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};
