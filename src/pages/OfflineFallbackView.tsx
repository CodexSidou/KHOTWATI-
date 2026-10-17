import React from 'react';
import { useApp } from '../context/AppContext';
import { WifiOff, HardDrive, ArrowRight, ArrowLeft } from 'lucide-react';

export const OfflineFallbackView: React.FC = () => {
  const { navigateTo, t, isRtl } = useApp();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div style={{ maxWidth: 640, margin: '3rem auto', textAlign: 'center' }}>
      <div className="card" style={{ padding: '3rem 1.5rem' }}>
        <div style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(6, 182, 212, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-cyan)',
          margin: '0 auto 1.25rem'
        }}>
          <WifiOff size={30} />
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          {t.statusOffline}
        </h2>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          {t.localFirstNotice}
        </p>

        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textAlign: 'start'
        }}>
          <HardDrive size={22} color="var(--accent-green)" />
          <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
            All task completions, streaks, and journal entries are securely cached on your device. Once connection resumes, everything will synchronize automatically.
          </div>
        </div>

        <button onClick={() => navigateTo('dashboard')} className="btn btn-primary">
          <span>{t.navDashboard}</span>
          <ArrowIcon size={16} />
        </button>
      </div>
    </div>
  );
};
