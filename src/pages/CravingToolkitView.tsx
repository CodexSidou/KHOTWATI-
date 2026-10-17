import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BreathingExercise } from '../components/BreathingExercise';
import { DelayTimer } from '../components/DelayTimer';
import { GroundingTool } from '../components/GroundingTool';
import {
  ShieldAlert,
  AlertOctagon,
  PhoneCall,
  Activity,
  ListChecks,
  CheckCircle2,
  Clock,
  Wind,
  Sparkles
} from 'lucide-react';

export const CravingToolkitView: React.FC = () => {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<'breathing' | 'timer' | 'grounding' | 'distractions'>('breathing');

  const healthyDistractions = [
    t.distraction1,
    t.distraction2,
    t.distraction3,
    t.distraction4,
    t.distraction5
  ];

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          padding: '0.35rem 0.9rem',
          borderRadius: 999,
          color: 'var(--accent-rose)',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '0.75rem'
        }}>
          <ShieldAlert size={14} />
          <span>{t.toolkitTitle}</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          {t.toolkitSubtitle}
        </h2>
      </div>

      {/* Mandatory Medical Safety Disclaimer */}
      <div style={{
        background: 'rgba(245, 158, 11, 0.08)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        marginBottom: '1.75rem',
        display: 'flex',
        gap: '0.9rem'
      }}>
        <AlertOctagon size={24} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '0.35rem' }}>
            {t.medicalDisclaimerTitle}
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {t.medicalDisclaimerText}
          </p>
        </div>
      </div>

      {/* Tool Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('breathing')}
          className={`btn btn-sm ${activeTab === 'breathing' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 999 }}
        >
          <Wind size={16} />
          <span>{t.boxBreathingTitle}</span>
        </button>

        <button
          onClick={() => setActiveTab('timer')}
          className={`btn btn-sm ${activeTab === 'timer' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 999 }}
        >
          <Clock size={16} />
          <span>{t.delayTimerTitle}</span>
        </button>

        <button
          onClick={() => setActiveTab('grounding')}
          className={`btn btn-sm ${activeTab === 'grounding' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 999 }}
        >
          <Sparkles size={16} />
          <span>{t.groundingTitle}</span>
        </button>

        <button
          onClick={() => setActiveTab('distractions')}
          className={`btn btn-sm ${activeTab === 'distractions' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 999 }}
        >
          <ListChecks size={16} />
          <span>{t.distractionTitle}</span>
        </button>
      </div>

      {/* Active Tool View */}
      <div style={{ marginBottom: '2rem' }}>
        {activeTab === 'breathing' && <BreathingExercise />}
        {activeTab === 'timer' && <DelayTimer />}
        {activeTab === 'grounding' && <GroundingTool />}
        {activeTab === 'distractions' && (
          <div className="card">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
              {t.distractionTitle}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {healthyDistractions.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <CheckCircle2 size={18} color="var(--accent-cyan)" />
                  <span style={{ fontSize: '0.95rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Professional Helplines */}
      <div className="card" style={{ border: '1px solid var(--border-active)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <PhoneCall size={20} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{t.emergencyHelplinesTitle}</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          {t.emergencyHelplinesDesc}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          <div style={{ padding: '0.8rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>National Emergency Services</div>
            <div style={{ color: 'var(--accent-cyan)', fontWeight: 800, fontSize: '1.1rem' }}>911 / 112 / 14</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Urgent medical & ambulance assistance</div>
          </div>
          <div style={{ padding: '0.8rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Addiction Support Helpline</div>
            <div style={{ color: 'var(--accent-green)', fontWeight: 800, fontSize: '1.1rem' }}>Local Health Ministry</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Confidential substance counseling</div>
          </div>
          <div style={{ padding: '0.8rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Mental Health & Crisis Hotline</div>
            <div style={{ color: 'var(--accent-violet)', fontWeight: 800, fontSize: '1.1rem' }}>988 / Free Hotline</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>24/7 Emotional crisis support</div>
          </div>
        </div>
      </div>
    </div>
  );
};
