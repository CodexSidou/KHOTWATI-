import React from 'react';
import { useApp } from '../context/AppContext';
import { Language, Theme } from '../types';
import {
  Settings,
  Moon,
  Sun,
  Globe,
  Database,
  KeyRound,
  Shield,
  FileText,
  HardDrive
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    navigateTo,
    syncStatus,
    t
  } = useApp();

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.settingsTitle}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Customize your experience, appearance, and security preferences.
        </p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Language Selection */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Globe size={20} color="var(--accent-cyan)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{t.languageSelect}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sets interface language and text orientation (RTL/LTR).</div>
            </div>
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="select"
            style={{ width: 'auto', minWidth: 160 }}
          >
            <option value="ar">العربية (RTL - الافتراضية)</option>
            <option value="fr">Français (LTR)</option>
            <option value="en">English (LTR)</option>
          </select>
        </div>

        <div style={{ height: 1, background: 'var(--border-color)' }} />

        {/* Theme Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {theme === 'dark' ? <Moon size={20} color="var(--accent-blue)" /> : <Sun size={20} color="var(--accent-amber)" />}
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{t.themeToggle}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Choose between dark or light visual contrast.</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setTheme('dark')}
              className={`btn btn-sm ${theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 999 }}
            >
              <Moon size={14} />
              <span>{t.themeDark}</span>
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`btn btn-sm ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 999 }}
            >
              <Sun size={14} />
              <span>{t.themeLight}</span>
            </button>
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border-color)' }} />

        {/* Local Storage & Sync Diagnostics */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <HardDrive size={20} color="var(--accent-green)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Local-First Storage Engine</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status: {syncStatus.toUpperCase()}</div>
            </div>
          </div>

          <span className="badge badge-green" style={{ fontSize: '0.8rem' }}>
            Active & Cached Locally
          </span>
        </div>
      </div>

      {/* Quick Links to Security & Data */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div
          onClick={() => navigateTo('recovery')}
          className="card"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <KeyRound size={22} color="var(--accent-cyan)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.accountRecoveryTitle}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Generate secret recovery key</div>
          </div>
        </div>

        <div
          onClick={() => navigateTo('data_export')}
          className="card"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <Database size={22} color="var(--accent-blue)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.navExportDelete}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JSON Export & Deletion</div>
          </div>
        </div>

        <div
          onClick={() => navigateTo('community_rules')}
          className="card"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <FileText size={22} color="var(--accent-violet)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.navRules}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Community safety standards</div>
          </div>
        </div>
      </div>
    </div>
  );
};
