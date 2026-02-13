import { createContext, useContext, useState, useCallback, FC, ReactNode } from 'react';
import { translations, Locale, TranslationKey } from '../i18n/i18n';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'aftral_language';

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [locale, setLocaleState] = useState<Locale>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'en' || stored === 'fr') return stored;
        } catch (_e) { }
        return 'fr';
    });

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        try { localStorage.setItem(STORAGE_KEY, newLocale); } catch (_e) { }
    }, []);

    const t = useCallback((key: TranslationKey): string => {
        return translations[locale][key] || key;
    }, [locale]);

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
