import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Moon,
  Sun,
  Globe,
  Wifi,
  WifiOff,
  RefreshCw,
  Users,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Language } from '../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    syncStatus,
    onlineUsersCount,
    user,
    navigateTo,
    t,
    currentView
  } = useApp();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const getSyncBadge = () => {
    if (syncStatus === 'online') {
      return (
        <span className="badge badge-green" title={t.statusOnline}>
          <Wifi size={12} />
          <span style={{ fontSize: '0.75rem' }}>{t.statusOnline}</span>
        </span>
      );
    }
    if (syncStatus === 'syncing') {
      return (
        <span className="badge badge-amber" title={t.statusSyncing}>
          <RefreshCw size={12} className="animate-spin" />
          <span style={{ fontSize: '0.75rem' }}>{t.statusSyncing}</span>
        </span>
      );
    }
    return (
      <span className="badge badge-cyan" title={t.statusLocalOnly}>
        <WifiOff size={12} />
        <span style={{ fontSize: '0.75rem' }}>{t.statusLocalOnly}</span>
      </span>
    );
  };

  return (
    <header style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.75rem 1.25rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Logo and Tagline */}
        <div
          onClick={() => navigateTo(user ? 'dashboard' : 'landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
            width: 38,
            height: 38,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: 'var(--shadow-glow-cyan)'
          }}>
            <Compass size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              {t.appName}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              {t.tagline}
            </div>
          </div>
        </div>

        {/* Status Indicators & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          {/* Sync Badge */}
          {getSyncBadge()}

          {/* Real-time online member count in community */}
          <button
            onClick={() => navigateTo('public_chat')}
            className="badge badge-cyan"
            style={{ cursor: 'pointer', border: '1px solid var(--border-active)' }}
            title={t.chatOnlineUsers}
          >
            <Users size={12} />
            <span>{onlineUsersCount} {t.navCommunity}</span>
          </button>

          {/* Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Globe size={16} color="var(--text-secondary)" />
            <select
              value={language}
              onChange={handleLanguageChange}
              className="select btn-sm"
              style={{ width: 'auto', padding: '0.3rem 0.5rem', background: 'var(--bg-card)' }}
              aria-label={t.languageSelect}
            >
              <option value="ar">العربية (RTL)</option>
              <option value="fr">Français (LTR)</option>
              <option value="en">English (LTR)</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.4rem', borderRadius: '8px' }}
            title={theme === 'dark' ? t.themeLight : t.themeDark}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} color="var(--accent-amber)" /> : <Moon size={16} color="var(--accent-blue)" />}
          </button>

          {/* User Pseudonym / Profile Button */}
          {user ? (
            <button
              onClick={() => navigateTo('profile')}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <UserCheck size={14} color="var(--accent-cyan)" />
              <span style={{ maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.username}
              </span>
            </button>
          ) : (
            currentView !== 'landing' && (
              <button
                onClick={() => navigateTo('landing')}
                className="btn btn-primary btn-sm"
              >
                {t.landingStartJourney}
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
};
