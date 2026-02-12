import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Screen } from '../types/types';

interface NavigationContextType {
    currentScreen: Screen;
    navigate: (screen: Screen) => void;
    goBack: () => void;
    resetNavigation: () => void;
    history: Screen[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
    const [history, setHistory] = useState<Screen[]>([]);

    const navigate = (screen: Screen) => {
        if (screen === currentScreen) return;
        setHistory(prev => [...prev, currentScreen]);
        setCurrentScreen(screen);
    };

    const goBack = () => {
        if (history.length === 0) {
            setCurrentScreen(Screen.HOME);
            return;
        }
        const newHistory = [...history];
        const prevScreen = newHistory.pop();
        setHistory(newHistory);
        setCurrentScreen(prevScreen || Screen.HOME);
    };

    const resetNavigation = () => {
        setCurrentScreen(Screen.HOME);
        setHistory([]);
    };

    return (
        <NavigationContext.Provider value={{ currentScreen, navigate, goBack, resetNavigation, history }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};
