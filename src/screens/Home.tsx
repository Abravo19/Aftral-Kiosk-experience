import React, { useMemo } from 'react';
import { UserProfile, Screen } from '../types/types';
import { GraduationCap, Users, Briefcase, Building2, Lightbulb, FileText, ChevronRight, Megaphone, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useNavigation } from '../context/NavigationContext';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const { navigate } = useNavigation();
  const { setUserProfile } = useUser();
  const { data } = useData();

  const handleSelectProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    navigate(Screen.CATALOG);
  };

  const profiles = [
    { type: UserProfile.STUDENT, icon: GraduationCap, color: 'bg-blue-600', label: "Étudiant / Alternant", desc: "Je cherche une formation" },
    { type: UserProfile.PARENT, icon: Users, color: 'bg-teal-600', label: "Parent", desc: "Pour l'avenir de mon enfant" },
    { type: UserProfile.EMPLOYEE, icon: Briefcase, color: 'bg-orange-600', label: "Salarié / Reconversion", desc: "Je veux évoluer" },
    { type: UserProfile.COMPANY, icon: Building2, color: 'bg-slate-700', label: "Entreprise", desc: "Former mes équipes" },
  ];

  const featuredNews = useMemo(() => {
      if (!data) return undefined;
      return data.newsItems.find(n => n.priority === 1)
  }, [data]);

  return (
    <div className="h-full flex flex-col gap-8">
      
      {/* Welcome Header */}
      <div className="text-center py-6">
        <h1 className="text-kiosk-xl font-bold text-aftral-dark leading-tight mb-2">
          Bienvenue chez <span className="text-aftral-red">AFTRAL</span>
        </h1>
        <p className="text-kiosk-base text-gray-500 max-w-2xl mx-auto">
          Touchez votre profil pour commencer l'expérience
        </p>
      </div>

      {/* Main Kiosk Grid - Profile Selection */}
      <div className="grid grid-cols-2 gap-6 flex-1 px-4">
        {profiles.map((profile, index) => (
          <motion.button
            key={profile.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelectProfile(profile.type)}
            className="relative overflow-hidden bg-white rounded-3xl shadow-kiosk border border-gray-100 p-8 text-left flex flex-col justify-between group active:scale-95 transition-all duration-300"
          >
            {/* Color Accent Bar */}
            <div className={`absolute top-0 left-0 w-full h-3 ${profile.color}`} />

            <div className={`w-20 h-20 rounded-2xl ${profile.color} flex items-center justify-center text-white mb-6 shadow-md`}>
              <profile.icon size={48} />
            </div>

            <div>
              <h3 className="text-kiosk-lg font-bold text-gray-900 mb-2 group-hover:text-aftral-red transition-colors">
                {profile.label}
              </h3>
              <p className="text-kiosk-xs text-gray-500 leading-snug">
                {profile.desc}
              </p>
            </div>
            
            <div className="absolute bottom-8 right-8 text-gray-300 group-hover:text-aftral-red transition-colors">
              <ArrowRight size={40} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Featured News Teaser - Bottom Card */}
      {/* Featured News Teaser - Bottom Card */}
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
