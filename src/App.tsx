import React, { useState } from 'react';
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
import { Screensaver } from './components/layout/Screensaver';

import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { UserProvider, useUser } from './context/UserContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { AnimatePresence, motion } from 'framer-motion';

import { useIdleTimer } from './hooks/useIdleTimer';

import { DataProvider, useData } from './context/DataContext';

// Admin components
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminNews } from './admin/AdminNews';
import { AdminSettings } from './admin/AdminSettings';

const AppContent: React.FC = () => {
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  const { currentScreen, navigate, resetNavigation } = useNavigation();
  const { userProfile, setUserProfile } = useUser();
  const { loading, error, adminSettings } = useData();
  const { isAdmin, logout } = useAdmin();

  useIdleTimer(adminSettings.screensaverTimeout, () => {
    // Don't activate screensaver if in admin mode
    if (isAdmin) return;
    resetNavigation();
    setUserProfile(null);
    setIsScreensaverActive(true);
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

  // Check if current screen is an admin screen
  const isAdminScreen = [Screen.ADMIN_DASHBOARD, Screen.ADMIN_NEWS, Screen.ADMIN_SETTINGS].includes(currentScreen);

  // If on admin screen but not authenticated, redirect to home
  if (isAdminScreen && !isAdmin) {
    resetNavigation();
    return null;
  }

  // Render admin content
  if (isAdminScreen && isAdmin) {
    const renderAdminContent = () => {
      switch (currentScreen) {
        case Screen.ADMIN_DASHBOARD:
          return <AdminDashboard />;
        case Screen.ADMIN_NEWS:
          return <AdminNews />;
        case Screen.ADMIN_SETTINGS:
          return <AdminSettings />;
        default:
          return <AdminDashboard />;
      }
    };

    return (
      <AdminLayout currentAdminScreen={currentScreen}>
        {renderAdminContent()}
      </AdminLayout>
    );
  }

  // Public kiosk content
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
        {isScreensaverActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <Screensaver onWake={() => setIsScreensaverActive(false)} />
          </motion.div>
        )}
      </AnimatePresence>

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
    <AdminProvider>
      <UserProvider>
        <NavigationProvider>
          <DataProvider>
            <AppContent />
          </DataProvider>
        </NavigationProvider>
      </UserProvider>
    </AdminProvider>
  );
};

export default App;