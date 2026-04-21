import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { AppLayout } from './AppLayout';
import { Dashboard } from './Dashboard';
import { SplashScreen } from './components/onboarding/SplashScreen';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { useUser } from './context/UserContext';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const { isConnected, profile, isLoading } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800); // Cinematic duration
    return () => clearTimeout(timer);
  }, []);

  if (showSplash || isLoading) {
    return (
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>
    );
  }

  // Simplified auth wall checking mock isConnected and profile
  if (!isConnected || !profile) {
    return (
      <AnimatePresence mode="wait">
        <OnboardingFlow />
      </AnimatePresence>
    );
  }

  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
