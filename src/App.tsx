/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AppView, BitspendUser } from './types';
import { DEMO_TEAM_USER } from './data/wallets';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { WalletsSection } from './components/WalletsSection';
import { CardDesignBand } from './components/CardDesignBand';
import { ConversionFooter } from './components/ConversionFooter';
import { AuthFlow } from './components/AuthFlow';
import { Dashboard } from './components/Dashboard';

const USERS_STORAGE_KEY = 'bitspend_team_users_v1';
const SESSION_STORAGE_KEY = 'bitspend_team_session_v1';

function loadInitialUsers(): BitspendUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as BitspendUser[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Fallback to default seed user
  }
  return [DEMO_TEAM_USER];
}

function loadActiveUser(users: BitspendUser[]): BitspendUser | null {
  try {
    const activeId = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (activeId) {
      return users.find((u) => u.id === activeId) || null;
    }
  } catch {
    // Ignore storage error
  }
  return null;
}

export default function App() {
  const [users, setUsers] = useState<BitspendUser[]>(() => loadInitialUsers());
  const [activeUser, setActiveUser] = useState<BitspendUser | null>(() =>
    loadActiveUser(loadInitialUsers())
  );
  const [view, setView] = useState<AppView>('landing');
  const [preselectedWalletId, setPreselectedWalletId] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch {
      // Ignore quota errors
    }
  }, [users]);

  useEffect(() => {
    try {
      if (activeUser) {
        window.localStorage.setItem(SESSION_STORAGE_KEY, activeUser.id);
      } else {
        window.localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [activeUser]);

  const handleNavigate = (nextView: AppView, sectionId?: string) => {
    setView(nextView);
    if (nextView === 'landing' && sectionId) {
      window.requestAnimationFrame(() => {
        if (sectionId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartWithWallet = (walletId: string) => {
    if (activeUser) {
      handleUpdateUser({ ...activeUser, connectedWalletId: walletId });
      setView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setPreselectedWalletId(walletId);
    setView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteAuth = (user: BitspendUser, isNewUser: boolean) => {
    if (isNewUser) {
      setUsers((prev) => [user, ...prev]);
    } else {
      setUsers((prev) =>
        prev.some((u) => u.id === user.id) ? prev : [user, ...prev]
      );
    }
    setActiveUser(user);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateUser = (updated: BitspendUser) => {
    setActiveUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const handleSignOut = () => {
    setActiveUser(null);
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoogleQuickStart = () => {
    handleCompleteAuth(DEMO_TEAM_USER, false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A2540]">
      <Header
        currentView={view}
        user={activeUser}
        onNavigate={handleNavigate}
        onSignOut={handleSignOut}
      />

      <main className="flex-1">
        {view === 'landing' && (
          <>
            <HeroSection
              onGetStarted={() => handleNavigate(activeUser ? 'dashboard' : 'register')}
              onGoogleQuickStart={handleGoogleQuickStart}
              onSelectWallet={handleStartWithWallet}
            />
            <FeaturesShowcase
              onGetStarted={() => handleNavigate(activeUser ? 'dashboard' : 'register')}
            />
            <WalletsSection onConnectWallet={handleStartWithWallet} />
            <CardDesignBand
              onGetStarted={() => handleNavigate(activeUser ? 'dashboard' : 'register')}
            />
            <ConversionFooter
              onGetStarted={() => handleNavigate(activeUser ? 'dashboard' : 'register')}
              onNavigate={handleNavigate}
            />
          </>
        )}

        {(view === 'login' || view === 'register') && (
          <AuthFlow
            mode={view}
            preselectedWalletId={preselectedWalletId}
            existingUsers={users}
            onSwitchMode={(nextMode) => setView(nextMode)}
            onCompleteAuth={handleCompleteAuth}
            onBackToSite={() => handleNavigate('landing', 'top')}
          />
        )}

        {view === 'dashboard' && activeUser && (
          <Dashboard
            user={activeUser}
            onUpdateUser={handleUpdateUser}
            onBackToWebsite={() => handleNavigate('landing', 'top')}
          />
        )}
      </main>
    </div>
  );
}
