import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Wind, Play, Square, RefreshCw } from 'lucide-react';

type BreathingPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export const BreathingExercise: React.FC = () => {
  const { t } = useApp();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Switch to next phase (each phase is 4 seconds)
        setPhase((currentPhase) => {
          if (currentPhase === 'inhale') return 'hold1';
          if (currentPhase === 'hold1') return 'exhale';
          if (currentPhase === 'exhale') return 'hold2';
          // End of one full cycle (16 seconds)
          setCompletedCycles(c => c + 1);
          return 'inhale';
        });

        return 4;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return t.breathingInhale;
      case 'hold1':
      case 'hold2':
        return t.breathingHold;
      case 'exhale':
        return t.breathingExhale;
    }
  };

  const getCircleScale = () => {
    if (!isActive) return 1;
    if (phase === 'inhale') return 1.35;
    if (phase === 'hold1') return 1.35;
    if (phase === 'exhale') return 0.9;
    return 0.9;
  };

  return (
    <div className="card" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <Wind size={22} color="var(--accent-cyan)" />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{t.boxBreathingTitle}</h3>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 480, margin: '0 auto 1.5rem' }}>
        {t.boxBreathingDesc}
      </p>

      {/* Visual Pulsing Breathing Ring */}
      <div
        className={`breathing-circle ${isActive ? 'breathing-active' : ''}`}
        style={{
          transform: `scale(${getCircleScale()})`,
          transition: 'transform 4s ease-in-out',
          flexDirection: 'column'
        }}
      >
        <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
          {isActive ? secondsLeft : '4'}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
          {isActive ? phase.toUpperCase() : '4-4-4-4'}
        </span>
      </div>

      <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', minHeight: 28, marginBottom: '1.25rem' }}>
        {isActive ? getPhaseInstruction() : t.boxBreathingDesc}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => {
            setIsActive(!isActive);
            if (!isActive) {
              setPhase('inhale');
              setSecondsLeft(4);
            }
          }}
          className={`btn ${isActive ? 'btn-danger' : 'btn-primary'}`}
        >
          {isActive ? <Square size={16} /> : <Play size={16} />}
          <span>{isActive ? t.stopBreathing : t.startBreathing}</span>
        </button>

        {completedCycles > 0 && (
          <span className="badge badge-green" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
            {completedCycles} {t.success}
          </span>
        )}
      </div>
    </div>
  );
};
