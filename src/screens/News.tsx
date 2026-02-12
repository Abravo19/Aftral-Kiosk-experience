import React, { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, Megaphone, Info, Tag, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { NewsItem, Screen, NewsType } from '../types/types';
import { useNavigation } from '../context/NavigationContext';

export const NewsScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { data } = useData();
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [filter, setFilter] = useState<'ALL' | NewsType>('ALL');

  const filteredNews = useMemo(() => {
    if (!data) return [];
    if (filter === 'ALL') return data.newsItems;
    return data.newsItems.filter(item => item.type === filter);
  }, [filter, data]);

    if (!data) return null;

  if (selectedItem) {
    return (
      <div className="h-full flex flex-col animate-fadeIn bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        {/* Detail Header Image */}
        <div className="relative h-64 bg-gray-200">
          <img
            src={selectedItem.image}
            alt={selectedItem.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur text-gray-800 p-3 rounded-full shadow-lg font-bold flex items-center gap-2"
          >
            <ArrowLeft size={24} /> Retour
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider shadow-sm ${selectedItem.type === 'PROMOTION' ? 'bg-aftral-red text-white' : 'bg-aftral-dark text-white'}`}>
              {selectedItem.type === 'PROMOTION' ? 'Offre Spéciale' : 'Actualité'}
            </span>
          </div>
        </div>

        {/* Detail Content */}
        <div className="flex-1 p-8 flex flex-col overflow-y-auto">
          <div className="flex items-center gap-2 text-gray-500 mb-4 font-medium">
            <Calendar size={20} />
            <span>Publié le {selectedItem.startDate}</span>
            {selectedItem.endDate && <span className="text-aftral-red font-bold"> • Fin le {selectedItem.endDate}</span>}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {selectedItem.title}
          </h1>

          <div className="text-xl text-gray-700 leading-relaxed space-y-4 mb-8">
            <p className="font-semibold">{selectedItem.summary}</p>
            <p>{selectedItem.body}</p>
          </div>

          {/* Bottom CTA */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            <button
              onClick={() => selectedItem.ctaTarget && navigate(selectedItem.ctaTarget)}
              className="w-full bg-aftral-red text-white text-2xl font-bold py-5 rounded-xl shadow-lg hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {selectedItem.ctaLabel} <ArrowRight size={28} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Actualités & Promotions</h1>
          <p className="text-xl text-gray-500">Restez informé de la vie du réseau AFTRAL.</p>
        </div>

        {/* Filters */}
        <div className="flex bg-gray-200 p-1 rounded-xl">
          {(['ALL', 'NEWS', 'PROMOTION'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {f === 'ALL' ? 'Tout' : f === 'NEWS' ? 'Actualités' : 'Offres'}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-20 pr-2">
        {filteredNews.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row gap-6 hover:shadow-md transition-all text-left group overflow-hidden"
          >
            {/* Thumbnail */}
            <div className="w-full md:w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
              <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className={`absolute top-0 left-0 right-0 h-1 ${item.type === 'PROMOTION' ? 'bg-aftral-red' : 'bg-aftral-dark'}`}></div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${item.type === 'PROMOTION' ? 'bg-red-50 text-aftral-red' : 'bg-gray-100 text-gray-600'}`}>
                  {item.type === 'PROMOTION' ? 'Promotion' : 'News'}
                </span>
                {item.endDate && (
                  <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                    <ClockIcon /> Fin le {item.endDate}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-aftral-red transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-base line-clamp-2 leading-snug mb-3">
                {item.summary}
              </p>

              {/* Explicit CTA Button */}
              <div className="mt-auto self-start">
                <span className="text-aftral-red font-bold text-sm uppercase tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
                  En savoir plus <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
