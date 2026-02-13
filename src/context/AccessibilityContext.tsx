import { createContext, useContext, useState, useCallback, useEffect, FC, ReactNode } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
    fontSize: FontSize;
    highContrast: boolean;
    setFontSize: (size: FontSize) => void;
    toggleHighContrast: () => void;
    cycleFontSize: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const STORAGE_KEY = 'aftral_accessibility';
const FONT_SCALE: Record<FontSize, string> = {
    normal: '1',
    large: '1.15',
    xlarge: '1.3',
};

export const AccessibilityProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [fontSize, setFontSizeState] = useState<FontSize>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) return JSON.parse(stored).fontSize || 'normal';
        } catch (_e) { }
        return 'normal';
    });

    const [highContrast, setHighContrast] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) return JSON.parse(stored).highContrast || false;
        } catch (_e) { }
        return false;
    });

    const persist = useCallback((fs: FontSize, hc: boolean) => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ fontSize: fs, highContrast: hc })); } catch (_e) { }
    }, []);

    // Apply CSS custom property and class to root
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--font-scale', FONT_SCALE[fontSize]);
        if (highContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }
    }, [fontSize, highContrast]);

    const setFontSize = useCallback((size: FontSize) => {
        setFontSizeState(size);
        persist(size, highContrast);
    }, [highContrast, persist]);

    const toggleHighContrast = useCallback(() => {
        setHighContrast((prev: boolean) => {
            const next = !prev;
            persist(fontSize, next);
            return next;
        });
    }, [fontSize, persist]);

    const cycleFontSize = useCallback(() => {
        setFontSizeState(prev => {
            const order: FontSize[] = ['normal', 'large', 'xlarge'];
            const idx = order.indexOf(prev);
            const next = order[(idx + 1) % order.length];
            persist(next, highContrast);
            return next;
        });
    }, [highContrast, persist]);

    return (
        <AccessibilityContext.Provider value={{ fontSize, highContrast, setFontSize, toggleHighContrast, cycleFontSize }}>
            {children}
        </AccessibilityContext.Provider>
    );
};

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider');
    }
    return context;
};
