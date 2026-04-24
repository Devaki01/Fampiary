import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HiveScreen from './screens/HiveScreen';
import SearchScreen from './screens/SearchScreen';
import SwarmScreen from './screens/SwarmScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/Signupscreen';
import TreeScreen from './screens/TreeScreen';
import { useStore } from './store/useStore';

function App() {
  const currentUser = useStore((state) => state.currentUser);
  const [activeTab, setActiveTab] = useState('hive');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const renderScreen = () => {
    switch (activeTab) {
      case 'hive':
        return <HiveScreen />;
      case 'search':
        return <SearchScreen />;
      case 'swarm':
        return <SwarmScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'tree':
        return <TreeScreen />;
      default:
        return <HiveScreen />;
    }
  };

  // Not logged in — show login or signup based on authMode
  if (!currentUser) {
    if (authMode === 'signup') {
      return (
        <SignUpScreen
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
    return (
      <LoginScreen
        onSwitchToSignUp={() => setAuthMode('signup')}
      />
    );
  }

  return (
    <div className="app-container">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;