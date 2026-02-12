import React, { useState, useCallback } from 'react';
import { Layout } from './components/layout/Layout';
import { Home } from './screens/Home';
import { Catalog } from './screens/Catalog';
import { MapScreen } from './screens/Map';
import { Quiz } from './screens/Quiz';
import { Events } from './screens/Events';
import { Contact } from './screens/Contact';
import { JobSheets } from './screens/JobSheets';
import { NewsScreen } from './screens/News';
import { Screen, UserProfile } from './types/types';

import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { UserProvider, useUser } from './context/UserContext';
import { AnimatePresence, motion } from 'framer-motion';

import { useIdleTimer } from './hooks/useIdleTimer';

import { DataProvider, useData } from './context/DataContext';

const AppContent: React.FC = () => {
  const { currentScreen, navigate, resetNavigation } = useNavigation();
  const { userProfile, setUserProfile } = useUser();
  const { loading, error } = useData();

  useIdleTimer(90000, () => {
    resetNavigation();
    setUserProfile(null);
  });

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-aftral-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 text-red-600">
        <p>Error loading application data: {error}</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentScreen) {
      case Screen.HOME:
        return <Home />;
      case Screen.CATALOG:
        return <Catalog />;
      case Screen.MAP:
        return <MapScreen />;
      case Screen.QUIZ:
        return <Quiz />;
      case Screen.EVENTS:
        return <Events />;
      case Screen.CONTACT:
        return <Contact />;
      case Screen.JOB_SHEETS:
        return <JobSheets />;
      case Screen.NEWS:
        return <NewsScreen />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentScreen}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <NavigationProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </NavigationProvider>
    </UserProvider>
  );
};

export default App;