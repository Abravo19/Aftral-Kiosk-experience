import { createContext, useContext, useState, FC, ReactNode } from 'react';

interface AdminContextType {
    isAdmin: boolean;
    login: (pin: string) => boolean;
    logout: () => void;
    getStoredPin: () => string;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const DEFAULT_PIN = '0000';

export const AdminProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const getStoredPin = (): string => {
        try {
            const settings = localStorage.getItem('aftral_admin_settings');
            if (settings) {
                const parsed = JSON.parse(settings);
                return parsed.pinCode || DEFAULT_PIN;
            }
        } catch (_e) { }
        return DEFAULT_PIN;
    };

    const login = (pin: string): boolean => {
        const storedPin = getStoredPin();
        if (pin === storedPin) {
            setIsAdmin(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
    };

    return (
        <AdminContext.Provider value={{ isAdmin, login, logout, getStoredPin }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};
