import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TrainingProgram, EventItem, QuizQuestion, JobProfile, NewsItem, AdminSettings } from '../types/types';

interface AppData {
  trainingCatalog: TrainingProgram[];
  events: EventItem[];
  quizQuestions: QuizQuestion[];
  jobProfiles: JobProfile[];
  newsItems: NewsItem[];
}

const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  pinCode: '0000',
  screensaverTimeout: 90000,
};

interface DataContextType {
  data: AppData | null;
  loading: boolean;
  error: string | null;
  adminSettings: AdminSettings;
  addNewsItem: (item: NewsItem) => void;
  updateNewsItem: (id: string, item: Partial<NewsItem>) => void;
  deleteNewsItem: (id: string) => void;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY_DATA = 'aftral_kiosk_data';
const STORAGE_KEY_SETTINGS = 'aftral_admin_settings';

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData | null>(null);
  const [originalData, setOriginalData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(DEFAULT_ADMIN_SETTINGS);

  // Load settings from localStorage
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (storedSettings) {
        setAdminSettings({ ...DEFAULT_ADMIN_SETTINGS, ...JSON.parse(storedSettings) });
      }
    } catch (_e) { }
  }, []);

  // Fetch data.json then merge with localStorage overrides
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData: AppData = await response.json();
        setOriginalData(jsonData);

        // Check localStorage for overrides
        const storedData = localStorage.getItem(STORAGE_KEY_DATA);
        if (storedData) {
          try {
            const parsed = JSON.parse(storedData) as Partial<AppData>;
            setData({ ...jsonData, ...parsed });
          } catch (_e) {
            setData(jsonData);
          }
        } else {
          setData(jsonData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Persist data overrides to localStorage
  const persistData = (newData: AppData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(newData));
    } catch (_e) { }
  };

  const persistSettings = (newSettings: AdminSettings) => {
    setAdminSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newSettings));
    } catch (_e) { }
  };

  // News CRUD
  const addNewsItem = (item: NewsItem) => {
    if (!data) return;
    const newData = { ...data, newsItems: [...data.newsItems, item] };
    persistData(newData);
  };

  const updateNewsItem = (id: string, updates: Partial<NewsItem>) => {
    if (!data) return;
    const newData = {
      ...data,
      newsItems: data.newsItems.map(n => n.id === id ? { ...n, ...updates } : n),
    };
    persistData(newData);
  };

  const deleteNewsItem = (id: string) => {
    if (!data) return;
    const newData = { ...data, newsItems: data.newsItems.filter(n => n.id !== id) };
    persistData(newData);
  };

  // Settings
  const updateAdminSettings = (updates: Partial<AdminSettings>) => {
    const newSettings = { ...adminSettings, ...updates };
    persistSettings(newSettings);
  };

  // Reset
  const resetToDefaults = () => {
    if (originalData) {
      setData(originalData);
    }
    setAdminSettings(DEFAULT_ADMIN_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY_DATA);
      localStorage.removeItem(STORAGE_KEY_SETTINGS);
    } catch (_e) { }
  };

  return (
    <DataContext.Provider value={{
      data, loading, error, adminSettings,
      addNewsItem, updateNewsItem, deleteNewsItem,
      updateAdminSettings, resetToDefaults
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
