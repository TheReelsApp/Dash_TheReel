import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Signup } from './components/Signup';

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'dashboard'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  return (
    <AppProvider>
      {isAuthenticated && currentView === 'dashboard' ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-r from-[#67c50a]/10 via-[#7cd7c2]/10 to-[#ffd900]/10 opacity-50"></div>
          
          {currentView === 'login' && (
            <Login
              onLogin={handleLogin}
              onSwitchToSignup={() => setCurrentView('signup')}
            />
          )}
          
          {currentView === 'signup' && (
            <Signup
              onSignup={handleSignup}
              onSwitchToLogin={() => setCurrentView('login')}
            />
          )}
        </div>
      )}
    </AppProvider>
  );
}

export default App;