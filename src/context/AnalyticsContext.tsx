import { createContext, useContext, useState, useEffect, FC, ReactNode, useCallback } from 'react';
import { Screen, UserProfile } from '../types/types';

interface AnalyticsData {
    screenViews: Record<string, number>;
    profileSelections: Record<string, number>;
    qrScans: number;
    sessionCount: number;
    helpRequests: number;
    lastReset: string;
}

interface AnalyticsContextType {
    analytics: AnalyticsData;
    trackScreenView: (screen: Screen) => void;
    trackProfileSelect: (profile: UserProfile) => void;
    trackQrScan: () => void;
    trackHelpRequest: () => void;
    resetAnalytics: () => void;
}

const STORAGE_KEY = 'aftral_analytics';

const defaultAnalytics: AnalyticsData = {
    screenViews: {},
    profileSelections: {},
    qrScans: 0,
    sessionCount: 0,
    helpRequests: 0,
    lastReset: new Date().toISOString(),
};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [analytics, setAnalytics] = useState<AnalyticsData>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Increment session count on load
                const updated = { ...defaultAnalytics, ...parsed, sessionCount: (parsed.sessionCount || 0) + 1 };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                return updated;
            }
        } catch (_e) { }
        const initial = { ...defaultAnalytics, sessionCount: 1 };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        return initial;
    });

    const persist = useCallback((data: AnalyticsData) => {
        setAnalytics(data);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_e) { }
    }, []);

    const trackScreenView = useCallback((screen: Screen) => {
        setAnalytics(prev => {
            const updated = {
                ...prev,
                screenViews: { ...prev.screenViews, [screen]: (prev.screenViews[screen] || 0) + 1 }
            };
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch (_e) { }
            return updated;
        });
    }, []);

    const trackProfileSelect = useCallback((profile: UserProfile) => {
        setAnalytics(prev => {
            const updated = {
                ...prev,
                profileSelections: { ...prev.profileSelections, [profile]: (prev.profileSelections[profile] || 0) + 1 }
            };
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch (_e) { }
            return updated;
        });
    }, []);

    const trackQrScan = useCallback(() => {
        setAnalytics(prev => {
            const updated = { ...prev, qrScans: prev.qrScans + 1 };
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch (_e) { }
            return updated;
        });
    }, []);

    const trackHelpRequest = useCallback(() => {
        setAnalytics(prev => {
            const updated = { ...prev, helpRequests: prev.helpRequests + 1 };
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch (_e) { }
            return updated;
        });
    }, []);

    const resetAnalytics = useCallback(() => {
        const fresh = { ...defaultAnalytics, lastReset: new Date().toISOString() };
        persist(fresh);
    }, [persist]);

    return (
        <AnalyticsContext.Provider value={{ analytics, trackScreenView, trackProfileSelect, trackQrScan, trackHelpRequest, resetAnalytics }}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within an AnalyticsProvider');
    }
    return context;
};
