import { useState, useRef, useCallback } from 'react';
import { Home, ArrowLeft, Calendar, BookOpen, Phone, Megaphone, User, Mail, Globe, Type, Contrast, HelpCircle, X, BellRing } from 'lucide-react';
import { Screen } from '../../types/types';
import { useNavigation } from '../../context/NavigationContext';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAnalytics } from '../../context/AnalyticsContext';
import { EmailModal } from '../common/EmailModal';
import { AdminPinModal } from '../../admin/AdminPinModal';
import { AnimatePresence, motion } from 'framer-motion';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { currentScreen, navigate, goBack, resetNavigation } = useNavigation();
    const { setUserProfile, userProfile } = useUser();
    const { locale, setLocale, t } = useLanguage();
    const { fontSize, cycleFontSize, highContrast, toggleHighContrast } = useAccessibility();
    const { trackHelpRequest } = useAnalytics();
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPinModal, setShowPinModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleReset = () => {
        resetNavigation();
        setUserProfile(null);
    };

    const isActive = (screen: Screen) => currentScreen === screen;

    const handleLogoPointerDown = useCallback(() => {
        longPressTimer.current = setTimeout(() => {
            setShowPinModal(true);
        }, 5000);
    }, []);

    const handleLogoPointerUp = useCallback(() => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
    }, []);

    const handleLogoClick = () => handleReset();

    const handleAdminSuccess = () => {
        setShowPinModal(false);
        navigate(Screen.ADMIN_DASHBOARD);
    };

    const handleHelpRequest = () => {
        setShowHelpModal(true);
        trackHelpRequest();
        setTimeout(() => setShowHelpModal(false), 10000);
    };

    const fontLabel = fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++';

    return (
        <div className="flex flex-col h-screen w-full bg-aftral-gray overflow-hidden">
            {/* Header */}
            <header className="h-24 bg-white shadow-sm flex items-center justify-between px-8 z-10 shrink-0">
                <div
                    className="flex items-center gap-6 cursor-pointer select-none"
                    onClick={handleLogoClick}
                    onPointerDown={handleLogoPointerDown}
                    onPointerUp={handleLogoPointerUp}
                    onPointerLeave={handleLogoPointerUp}
                    onPointerCancel={handleLogoPointerUp}
                >
                    <div className="bg-aftral-red text-white font-bold text-3xl px-6 py-3 rounded-lg shadow-sm">AFTRAL</div>
                    <span className="text-gray-400 text-xl border-l-2 pl-6 border-gray-200 font-light">Kiosque Interactif</span>
                </div>

                <div className="flex items-center gap-3">
                    {/* Accessibility: Font Size */}
                    <button
                        onClick={cycleFontSize}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${fontSize !== 'normal' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        title={t('a11y.font_size')}
                    >
                        <Type size={18} />
                        <span className="text-xs">{fontLabel}</span>
                    </button>

                    {/* Accessibility: High Contrast */}
                    <button
                        onClick={toggleHighContrast}
                        className={`p-2 rounded-lg transition-colors ${highContrast ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        title={t('a11y.high_contrast')}
                    >
                        <Contrast size={18} />
                    </button>

                    {/* Language Toggle */}
                    <button
                        onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
                        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm font-bold text-gray-700 transition-colors"
                    >
                        <Globe size={18} />
                        <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
                    </button>

                    {/* Profile */}
                    {userProfile && (
                        <div className="flex items-center gap-3 bg-gray-100 px-6 py-3 rounded-full ml-2">
                            <User className="text-aftral-dark" size={24} />
                            <span className="text-lg font-medium text-aftral-dark">Mode: {userProfile}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 overflow-y-auto relative p-8 scrollbar-hide">
                {children}
            </main>

            {/* Bottom Dock Navigation */}
            <nav className="h-dock bg-white border-t border-gray-200 flex items-center justify-around shrink-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-50 px-4 pb-4">
                {/* Back Button */}
                <div className="w-32 flex justify-center">
                    {currentScreen !== Screen.HOME && (
                        <button
                            onClick={goBack}
                            className="flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-gray-50 text-gray-600 active:bg-gray-200 active:scale-95 transition-all shadow-sm border border-gray-100"
                        >
                            <ArrowLeft size={40} />
                            <span className="text-sm font-bold uppercase mt-2">{t('nav.back')}</span>
                        </button>
                    )}
                </div>

                {/* Main Nav */}
                <div className="flex gap-4">
                    <NavButton active={isActive(Screen.HOME)} onClick={() => navigate(Screen.HOME)} icon={Home} label={t('nav.home')} />
                    <NavButton active={isActive(Screen.CATALOG)} onClick={() => navigate(Screen.CATALOG)} icon={BookOpen} label={t('nav.training')} />
                    <NavButton active={isActive(Screen.NEWS)} onClick={() => navigate(Screen.NEWS)} icon={Megaphone} label={t('nav.news')} />
                    <NavButton active={isActive(Screen.EVENTS)} onClick={() => navigate(Screen.EVENTS)} icon={Calendar} label={t('nav.agenda')} />
                </div>

                {/* Right Side */}
                <div className="w-56 flex justify-center gap-3">
                    {/* Help Button */}
                    <button
                        onClick={handleHelpRequest}
                        className="flex flex-col items-center justify-center w-20 h-28 rounded-2xl bg-amber-50 text-amber-600 border-2 border-amber-200 active:bg-amber-100 active:scale-95 transition-all shadow-sm"
                    >
                        <HelpCircle size={30} />
                        <span className="text-[9px] font-bold uppercase mt-1.5 text-center leading-tight px-1">{t('help.need_help')}</span>
                    </button>

                    <button
                        onClick={() => setShowEmailModal(true)}
                        className="flex flex-col items-center justify-center w-20 h-28 rounded-2xl bg-white text-aftral-red border-2 border-aftral-red active:bg-red-50 active:scale-95 transition-all shadow-sm"
                    >
                        <Mail size={30} />
                        <span className="text-[9px] font-bold uppercase mt-1.5 text-center leading-tight px-1">{t('nav.receive_info')}</span>
                    </button>

                    <button
                        onClick={() => navigate(Screen.CONTACT)}
                        className="flex flex-col items-center justify-center w-24 h-28 rounded-2xl bg-aftral-dark text-white active:bg-black active:scale-95 transition-all shadow-lg"
                    >
                        <Phone size={36} />
                        <span className="text-sm font-bold uppercase mt-2">{t('nav.contact')}</span>
                    </button>
                </div>
            </nav>

            {/* Help Modal */}
            <AnimatePresence>
                {showHelpModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowHelpModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-white rounded-3xl p-12 max-w-lg w-full mx-6 shadow-2xl text-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BellRing size={48} className="text-amber-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('help.agent_notified')}</h2>
                            <p className="text-xl text-gray-500 mb-8">{t('help.agent_coming')}</p>
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full animate-[progress_10s_linear_forwards]" />
                            </div>
                            <button
                                onClick={() => setShowHelpModal(false)}
                                className="mt-6 text-gray-400 hover:text-gray-700 transition-colors"
                            >
                                <X size={28} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Modals */}
            <EmailModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
            <AdminPinModal isOpen={showPinModal} onClose={() => setShowPinModal(false)} onSuccess={handleAdminSuccess} />
        </div>
    );
};

// Nav Button Component
interface NavButtonProps {
    active: boolean;
    onClick: () => void;
    icon: React.ElementType;
    label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-28 h-28 rounded-2xl transition-all duration-300
            ${active ? 'bg-aftral-red text-white shadow-glow scale-110 -translate-y-2' : 'bg-white text-gray-400 hover:bg-gray-50'}
        `}
    >
        <Icon size={active ? 42 : 36} strokeWidth={active ? 2.5 : 2} />
        <span className={`text-sm font-bold uppercase mt-2 ${active ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
    </button>
);