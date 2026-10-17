import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

export const DelayTimer: React.FC = () => {
  const { t } = useApp();
  const [durationMinutes, setDurationMinutes] = useState<number>(10);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(10 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      setIsRunning(false);
      // Play a soft completion tone using Web Audio API
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
      } catch (e) {
        // AudioContext not allowed or not supported
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsRemaining]);

  const selectDuration = (mins: number) => {
    setIsRunning(false);
    setDurationMinutes(mins);
    setSecondsRemaining(mins * 60);
  };

  const reset = () => {
    setIsRunning(false);
    setSecondsRemaining(durationMinutes * 60);
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = 1 - (secondsRemaining / (durationMinutes * 60));

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <Clock size={22} color="var(--accent-blue)" />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{t.delayTimerTitle}</h3>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 460, margin: '0 auto 1.25rem' }}>
        {t.delayTimerDesc}
      </p>

      {/* Preset Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[5, 10, 15].map((mins) => (
          <button
            key={mins}
            onClick={() => selectDuration(mins)}
            className={`btn btn-sm ${durationMinutes === mins ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '999px', padding: '0.3rem 0.9rem' }}
          >
            {mins} {t.days.replace('أيام', 'دقائق').replace('jours', 'min').replace('days', 'min')}
          </button>
        ))}
      </div>

      {/* Digital Timer Display */}
      <div style={{
        fontSize: '3.5rem',
        fontWeight: 800,
        letterSpacing: '2px',
        color: secondsRemaining === 0 ? 'var(--accent-green)' : 'var(--text-primary)',
        fontVariantNumeric: 'tabular-nums',
        marginBottom: '1rem'
      }}>
        {formatTime(secondsRemaining)}
      </div>

      {/* Progress bar */}
      <div style={{
        height: 6,
        background: 'var(--bg-secondary)',
        borderRadius: 999,
        maxWidth: 320,
        margin: '0 auto 1.5rem',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-green))',
          transition: 'width 1s linear'
        }} />
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`btn ${isRunning ? 'btn-secondary' : 'btn-primary'}`}
        >
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
          <span>{isRunning ? t.pauseTimer : t.startTimer}</span>
        </button>

        <button
          onClick={reset}
          className="btn btn-secondary"
          title={t.resetTimer}
        >
          <RotateCcw size={16} />
          <span>{t.resetTimer}</span>
        </button>
      </div>
    </div>
  );
};
