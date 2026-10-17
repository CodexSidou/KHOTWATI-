import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Eye, Hand, Volume2, Sparkles, Heart, CheckCircle2 } from 'lucide-react';

export const GroundingTool: React.FC = () => {
  const { t } = useApp();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const steps = [
    { num: 5, icon: <Eye size={18} color="var(--accent-cyan)" />, text: t.grounding5 },
    { num: 4, icon: <Hand size={18} color="var(--accent-blue)" />, text: t.grounding4 },
    { num: 3, icon: <Volume2 size={18} color="var(--accent-violet)" />, text: t.grounding3 },
    { num: 2, icon: <Sparkles size={18} color="var(--accent-amber)" />, text: t.grounding2 },
    { num: 1, icon: <Heart size={18} color="var(--accent-rose)" />, text: t.grounding1 }
  ];

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
        <Sparkles size={22} color="var(--accent-violet)" />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{t.groundingTitle}</h3>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
        {t.groundingDesc}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {steps.map((step, idx) => {
          const isDone = Boolean(checkedItems[idx]);
          return (
            <div
              key={step.num}
              onClick={() => toggleCheck(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: isDone ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-secondary)',
                border: isDone ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: isDone ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDone ? '#fff' : 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                {isDone ? <CheckCircle2 size={16} /> : step.num}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                {step.icon}
                <span style={{
                  fontSize: '0.95rem',
                  color: isDone ? 'var(--text-secondary)' : 'var(--text-primary)',
                  textDecoration: isDone ? 'line-through' : 'none'
                }}>
                  {step.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
