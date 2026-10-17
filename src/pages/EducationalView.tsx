import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Brain, Zap, ShieldAlert, Heart, Activity } from 'lucide-react';

export const EducationalView: React.FC = () => {
  const { t } = useApp();

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.navHelp}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Evidence-based psychological and biological principles for lasting behavioral recovery.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* The Habit Loop */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <Brain size={22} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>1. The Habit Loop: Cue, Routine, Reward</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            Every habitual compulsion consists of three elements: a <strong>Cue</strong> (trigger such as stress, boredom, or a specific place), a <strong>Routine</strong> (smoking, vaping, scrolling), and a <strong>Reward</strong> (temporary dopamine release or emotional numbing).
          </p>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.88rem',
            lineHeight: 1.5
          }}>
            <strong>Key Insight:</strong> You cannot simply delete a cue; instead, you replace the <em>routine</em> with a non-destructive action (e.g. cold water, deep breathing, a quick walk) while still delivering relief.
          </div>
        </div>

        {/* The Craving Curve */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <Zap size={22} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>2. Riding the Craving Wave (Urge Surfing)</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            Cravings feel permanent when they strike, but in reality they follow a bell curve: they rise in intensity, peak around 3 to 7 minutes, and naturally begin to subside within 15 minutes as adrenaline drops.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
            By using the <strong>Delay Timer</strong> or <strong>Box Breathing</strong>, you don't fight the urge—you surf on top of it until the wave runs out of momentum.
          </p>
        </div>

        {/* Medical Withdrawal Safety */}
        <div className="card" style={{ border: '1px solid rgba(245, 158, 11, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <ShieldAlert size={22} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
              3. Critical Health Notice: Safe Withdrawal
            </h3>
          </div>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            While nicotine and behavioral addictions cause psychological distress, abrupt withdrawal from severe alcohol dependence or certain sedatives can cause dangerous autonomic instability, delirium, or seizures.
          </p>
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.88rem',
            color: 'var(--text-primary)',
            lineHeight: 1.5
          }}>
            Always consult a qualified medical professional prior to stopping alcohol or prescription sedatives if you have a history of heavy daily consumption. In an emergency, call your local emergency services (911/112/14) immediately.
          </div>
        </div>

        {/* Self-Compassion */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <Heart size={22} color="var(--accent-rose)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>4. The Psychology of Self-Compassion</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
            Shame and guilt are the primary fuel of addiction relapses (known as the "Abstinence Violation Effect"). Treating yourself with the same kindness you would offer a suffering friend reduces cortisol levels and restores the prefrontal cortex's capacity for self-regulation.
          </p>
        </div>
      </div>
    </div>
  );
};
