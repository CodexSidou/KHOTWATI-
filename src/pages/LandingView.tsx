import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  RotateCcw,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { navigateTo, t, isRtl, loginAnonymous } = useApp();

  const handleStart = async () => {
    await loginAnonymous();
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', paddingTop: '1.5rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(6, 182, 212, 0.1)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          padding: '0.4rem 1rem',
          borderRadius: 999,
          color: 'var(--accent-cyan)',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '1.25rem'
        }}>
          <Sparkles size={14} />
          <span>{t.tagline}</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          lineHeight: 1.25,
          color: 'var(--text-primary)',
          marginBottom: '1.25rem'
        }}>
          {t.landingHeroTitle}
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          color: 'var(--text-secondary)',
          maxWidth: 680,
          margin: '0 auto 2.5rem',
          lineHeight: 1.6
        }}>
          {t.landingHeroSubtitle}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleStart}
            className="btn btn-primary"
            style={{ padding: '0.9rem 2rem', fontSize: '1.1rem', borderRadius: 'var(--radius-lg)' }}
          >
            <span>{t.landingStartJourney}</span>
            <ArrowIcon size={20} />
          </button>

          <button
            onClick={() => navigateTo('recovery')}
            className="btn btn-secondary"
            style={{ padding: '0.9rem 1.6rem', fontSize: '1rem', borderRadius: 'var(--radius-lg)' }}
          >
            <KeyRound size={18} color="var(--accent-cyan)" />
            <span>{t.landingSignInRecovery}</span>
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
        marginBottom: '3.5rem'
      }}>
        <div className="card">
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(6, 182, 212, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-cyan)',
            marginBottom: '1rem'
          }}>
            <Shield size={24} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {t.landingFeature1Title}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {t.landingFeature1Desc}
          </p>
        </div>

        <div className="card">
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(139, 92, 246, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-violet)',
            marginBottom: '1rem'
          }}>
            <RotateCcw size={24} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {t.landingFeature2Title}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {t.landingFeature2Desc}
          </p>
        </div>

        <div className="card">
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(14, 165, 233, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-blue)',
            marginBottom: '1rem'
          }}>
            <Sparkles size={24} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {t.landingFeature3Title}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {t.landingFeature3Desc}
          </p>
        </div>

        <div className="card">
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(16, 185, 129, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-green)',
            marginBottom: '1rem'
          }}>
            <Users size={24} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {t.landingFeature4Title}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {t.landingFeature4Desc}
          </p>
        </div>
      </div>

      {/* Compassionate Statement Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(139, 92, 246, 0.08))',
        border: '1px solid rgba(14, 165, 233, 0.25)',
        textAlign: 'center',
        padding: '2.5rem 1.5rem',
        marginBottom: '2rem'
      }}>
        <Compass size={36} color="var(--accent-cyan)" style={{ margin: '0 auto 1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          {t.landingNoShameTitle}
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 620, margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
          {t.landingNoShameDesc}
        </p>
        <button
          onClick={handleStart}
          className="btn btn-primary"
        >
          <span>{t.landingStartJourney}</span>
          <ArrowIcon size={18} />
        </button>
      </div>
    </div>
  );
};
