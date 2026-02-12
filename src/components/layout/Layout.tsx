import React, { useState } from 'react';
import { Home, ArrowLeft, MapPin, Calendar, BookOpen, Phone, Megaphone, User, Mail } from 'lucide-react';
import { Screen } from '../../types/types';
import { useNavigation } from '../../context/NavigationContext';
import { useUser } from '../../context/UserContext';
import { EmailModal } from '../common/EmailModal';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentScreen, navigate, goBack, resetNavigation } = useNavigation();
  const { setUserProfile, userProfile } = useUser();
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleReset = () => {
    resetNavigation();
    setUserProfile(null);
  };

  const isActive = (screen: Screen) => currentScreen === screen;

  return (
    <div className="flex flex-col h-screen w-full bg-aftral-gray overflow-hidden">
      {/* Kiosk Header: Branding Only - Moved interactive elements to safe zones if needed */}
      <header className="h-24 bg-white shadow-sm flex items-center justify-between px-8 z-10 shrink-0">
        <div className="flex items-center gap-6" onClick={handleReset}>
          {/* Logo */}
          <div className="bg-aftral-red text-white font-bold text-3xl px-6 py-3 rounded-lg shadow-sm">AFTRAL</div>
          <span className="text-gray-400 text-xl border-l-2 pl-6 border-gray-200 font-light">Kiosque Interactif</span>
        </div>
        
        {/* User Status Indicator (Non-interactive or simple display) */}
        {userProfile && (
           <div className="flex items-center gap-3 bg-gray-100 px-6 py-3 rounded-full">
              <User className="text-aftral-dark" size={24} />
              <span className="text-lg font-medium text-aftral-dark">Mode: {userProfile}</span>
           </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative p-8 scrollbar-hide">
        {children}
      </main>

      {/* Kiosk Bottom Dock Navigation */}
      <nav className="h-dock bg-white border-t border-gray-200 flex items-center justify-around shrink-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-50 px-4 pb-4">

        {/* Back Button - Always visible except Home */}
        <div className="w-32 flex justify-center">
            {currentScreen !== Screen.HOME && (
            <button
                onClick={goBack}
                className="flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-gray-50 text-gray-600 active:bg-gray-200 active:scale-95 transition-all shadow-sm border border-gray-100"
            >
                <ArrowLeft size={40} />
                <span className="text-sm font-bold uppercase mt-2">Retour</span>
            </button>
            )}
        </div>

        {/* Main Navigation Items */}
        <div className="flex gap-4">
            <NavButton 
                active={isActive(Screen.HOME)} 
                onClick={() => navigate(Screen.HOME)} 
                icon={Home} 
                label="Accueil" 
            />
            <NavButton 
                active={isActive(Screen.CATALOG)} 
                onClick={() => navigate(Screen.CATALOG)} 
                icon={BookOpen} 
                label="Formation" 
            />
            <NavButton 
                active={isActive(Screen.NEWS)} 
                onClick={() => navigate(Screen.NEWS)} 
                icon={Megaphone} 
                label="Actus" 
            />
            <NavButton 
                active={isActive(Screen.EVENTS)} 
                onClick={() => navigate(Screen.EVENTS)} 
                icon={Calendar} 
                label="Agenda" 
            />
        </div>

        {/* Call to Action - Right Side */}
        <div className="w-48 flex justify-center gap-3">
             <button
                onClick={() => setShowEmailModal(true)}
                className="flex flex-col items-center justify-center w-20 h-28 rounded-2xl bg-white text-aftral-red border-2 border-aftral-red active:bg-red-50 active:scale-95 transition-all shadow-sm"
            >
                <Mail size={32} />
                <span className="text-[10px] font-bold uppercase mt-2 text-center leading-tight px-1">Recevoir<br/>Infos</span>
            </button>
            <button
                onClick={() => navigate(Screen.CONTACT)}
                className="flex flex-col items-center justify-center w-24 h-28 rounded-2xl bg-aftral-dark text-white active:bg-black active:scale-95 transition-all shadow-lg"
            >
                <Phone size={36} />
                <span className="text-sm font-bold uppercase mt-2">Contact</span>
            </button>
        </div>
      </nav>
      
      {/* Global Modals */}
      <EmailModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </div>
  );
};

// Helper Component for consistent Kiosk Buttons
interface NavButtonProps {
    active: boolean;
    onClick: () => void;
    icon: React.ElementType;
    label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`
            flex flex-col items-center justify-center w-28 h-28 rounded-2xl transition-all duration-300
            ${active 
                ? 'bg-aftral-red text-white shadow-glow scale-110 -translate-y-2' 
                : 'bg-white text-gray-400 hover:bg-gray-50'
            }
        `}
    >
        <Icon size={active ? 42 : 36} strokeWidth={active ? 2.5 : 2} />
        <span className={`text-sm font-bold uppercase mt-2 ${active ? 'opacity-100' : 'opacity-70'}`}>
            {label}
        </span>
    </button>
);