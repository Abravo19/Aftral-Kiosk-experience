import React, { useMemo } from 'react';
import { UserProfile, Screen } from '../types/types';
import { GraduationCap, Users, Briefcase, Building2, Lightbulb, FileText, ChevronRight, Megaphone } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { useUser } from '../context/UserContext';

export const Home: React.FC = () => {
  const { navigate } = useNavigation();
  const { setUserProfile } = useUser();
  const { data } = useData();

  const handleSelectProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    navigate(Screen.CATALOG);
  };

  const profiles = [
    { type: UserProfile.STUDENT, icon: GraduationCap, color: 'bg-blue-600', desc: "Je cherche une formation ou une alternance" },
    { type: UserProfile.PARENT, icon: Users, color: 'bg-teal-600', desc: "Je m'informe pour l'avenir de mon enfant" },
    { type: UserProfile.EMPLOYEE, icon: Briefcase, color: 'bg-orange-600', desc: "Je veux évoluer ou me reconvertir" },
    { type: UserProfile.COMPANY, icon: Building2, color: 'bg-slate-700', desc: "Je souhaite former mes équipes ou recruter" },
  ];

  // Get the highest priority news item
  const featuredNews = useMemo(() => {
      if (!data) return undefined;
      return data.newsItems.find(n => n.priority === 1)
  }, [data]);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Bienvenue chez AFTRAL</h1>
        <p className="text-xl text-gray-600">Pour mieux vous guider, dites-nous qui vous êtes :</p>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        {profiles.map((p) => (
          <button
            key={p.type}
            onClick={() => handleSelectProfile(p.type)}
            className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all duration-300 text-left bg-white border-l-8"
            style={{ borderLeftColor: p.color.replace('bg-', '') }}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 ${p.color} transition-opacity`}></div>
            <div className="p-5 flex items-center gap-5">
              <div className={`w-14 h-14 rounded-full ${p.color} flex items-center justify-center text-white shrink-0`}>
                <p.icon size={28} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-0.5">{p.type}</h2>
                <p className="text-gray-500 text-sm">{p.desc}</p>
              </div>
              <div className="ml-auto">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Embedded News Teaser */}
      {featuredNews && (
        <button
          onClick={() => navigate(Screen.NEWS)}
          className="mb-4 w-full bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 shadow-md active:scale-95 transition-all flex items-center gap-4 text-left group border border-gray-700"
        >
          <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-700">
            {featuredNews.image && <img src={featuredNews.image} className="w-full h-full object-cover opacity-80" alt="" />}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Megaphone className="text-white" size={24} />
            </div>
          </div>
          <div className="flex-1">
            <span className="text-aftral-red text-xs font-bold uppercase tracking-wider mb-1 block">
              {featuredNews.type === 'PROMOTION' ? 'Offre Spéciale' : 'À la une'}
            </span>
            <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">{featuredNews.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-1">{featuredNews.summary}</p>
          </div>
          <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
            <ChevronRight className="text-white" size={20} />
          </div>
        </button>
      )}

      {/* Bottom Action Grid */}
      <div className="grid grid-cols-2 gap-4 h-40">

        {/* Job Sheets Button */}
        <button
          onClick={() => navigate(Screen.JOB_SHEETS)}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col justify-between hover:border-aftral-red hover:shadow-md active:scale-95 transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 text-gray-700 p-2.5 rounded-xl group-hover:bg-aftral-red group-hover:text-white transition-colors">
              <FileText size={22} />
            </div>
            <h3 className="text-base font-bold text-gray-900">Fiches Métiers</h3>
          </div>
          <p className="text-gray-500 text-xs">Missions et salaires du secteur.</p>
          <div className="text-aftral-red font-bold uppercase text-xs tracking-wide flex items-center gap-1">
            Découvrir <ChevronRight size={14} />
          </div>
        </button>

        {/* Quiz Button */}
        <button
          onClick={() => navigate(Screen.QUIZ)}
          className="bg-blue-50 rounded-2xl p-5 shadow-sm border border-blue-100 flex flex-col justify-between hover:shadow-md active:scale-95 transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-200 text-blue-800 p-2.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Lightbulb size={22} />
            </div>
            <h3 className="text-base font-bold text-blue-900">Quiz Orientation</h3>
          </div>
          <p className="text-blue-800/70 text-xs">Faites le test en 2 min.</p>
          <div className="text-blue-700 font-bold uppercase text-xs tracking-wide flex items-center gap-1">
            Commencer <ChevronRight size={14} />
          </div>
        </button>
      </div>
    </div>
  );
};
