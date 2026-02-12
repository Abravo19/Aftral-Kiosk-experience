import React from 'react';
import { Home, ArrowLeft, MapPin, Calendar, BookOpen, Phone, Megaphone } from 'lucide-react';
import { Screen } from '../../types/types';
import { useNavigation } from '../../context/NavigationContext';
import { useUser } from '../../context/UserContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentScreen, navigate, goBack, resetNavigation } = useNavigation();
  const { setUserProfile } = useUser();

  const handleReset = () => {
    resetNavigation();
    setUserProfile(null);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 overflow-hidden">
      {/* Top Header */}
      <header className="h-24 bg-white shadow-sm flex items-center justify-between px-8 z-10 shrink-0">
        <div className="flex items-center gap-4" onClick={handleReset}>
          {/* Logo Placeholder */}
          <div className="bg-aftral-red text-white font-bold text-2xl px-4 py-2 rounded">AFTRAL</div>
          <span className="text-gray-500 text-lg border-l pl-4 border-gray-300">Formation Transport & Logistique</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(Screen.CONTACT)}
            className="bg-aftral-dark text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 active:scale-95 transition-transform"
          >
            <Phone size={20} />
            <span>Être rappelé</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative p-8">
        {children}
      </main>

      {/* Bottom Navigation Bar (Persistent) */}
      <nav className="h-28 bg-white border-t border-gray-200 flex items-center justify-around shrink-0 pb-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20 px-2">

        {currentScreen !== Screen.HOME && (
          <button
            onClick={goBack}
            className="flex flex-col items-center justify-center w-20 h-24 text-gray-600 active:text-aftral-red active:scale-95 transition-all"
          >
            <div className="bg-gray-100 p-3 rounded-full mb-1">
              <ArrowLeft size={28} />
            </div>
            <span className="text-xs font-bold uppercase mt-1">Retour</span>
          </button>
        )}

        <button
          onClick={() => navigate(Screen.HOME)}
          className={`flex flex-col items-center justify-center w-20 h-24 ${ currentScreen === Screen.HOME ? 'text-aftral-red' : 'text-gray-600' } active:scale-95 transition-all`}
        >
          <Home size={32} />
          <span className="text-xs font-bold uppercase mt-1">Accueil</span>
        </button>

        <button
          onClick={() => navigate(Screen.CATALOG)}
          className={`flex flex-col items-center justify-center w-20 h-24 ${ currentScreen === Screen.CATALOG ? 'text-aftral-red' : 'text-gray-600' } active:scale-95 transition-all`}
        >
          <BookOpen size={32} />
          <span className="text-xs font-bold uppercase mt-1">Formation</span>
        </button>

        <button
          onClick={() => navigate(Screen.NEWS)}
          className={`flex flex-col items-center justify-center w-20 h-24 ${ currentScreen === Screen.NEWS ? 'text-aftral-red' : 'text-gray-600' } active:scale-95 transition-all`}
        >
          <Megaphone size={32} />
          <span className="text-xs font-bold uppercase mt-1">Actus</span>
        </button>

        <button
          onClick={() => navigate(Screen.EVENTS)}
          className={`flex flex-col items-center justify-center w-20 h-24 ${ currentScreen === Screen.EVENTS ? 'text-aftral-red' : 'text-gray-600' } active:scale-95 transition-all`}
        >
          <Calendar size={32} />
          <span className="text-xs font-bold uppercase mt-1">Agenda</span>
        </button>
      </nav>
    </div>
  );
};