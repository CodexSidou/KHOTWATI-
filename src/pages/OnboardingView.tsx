import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HabitCategory } from '../types';
import {
  Cigarette,
  Flame,
  Wine,
  Leaf,
  Pill,
  Gamepad2,
  Smartphone,
  Repeat,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';

export const OnboardingView: React.FC = () => {
  const { createChallenge, t, isRtl } = useApp();

  const [category, setCategory] = useState<HabitCategory>('smoking');
  const [goal, setGoal] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [dailyBaseline, setDailyBaseline] = useState<string>('');
  const [costEstimate, setCostEstimate] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const categories: { id: HabitCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'smoking', label: t.habitSmoking, icon: <Cigarette size={22} /> },
    { id: 'nicotine_vaping', label: t.habitVaping, icon: <Flame size={22} /> },
    { id: 'alcohol', label: t.habitAlcohol, icon: <Wine size={22} /> },
    { id: 'cannabis', label: t.habitCannabis, icon: <Leaf size={22} /> },
    { id: 'other_substances', label: t.habitOtherSubstances, icon: <Pill size={22} /> },
    { id: 'excessive_gaming', label: t.habitGaming, icon: <Gamepad2 size={22} /> },
    { id: 'social_media', label: t.habitSocialMedia, icon: <Smartphone size={22} /> },
    { id: 'repetitive_habits', label: t.habitRepetitive, icon: <Repeat size={22} /> },
    { id: 'custom', label: t.habitCustom, icon: <Sparkles size={22} /> }
  ];

  const durations = [
    { days: 7, label: t.duration7Days },
    { days: 14, label: t.duration14Days },
    { days: 30, label: t.duration30Days },
    { days: 60, label: t.duration60Days },
    { days: 90, label: t.duration90Days }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createChallenge({
        habitCategory: category,
        goal: goal.trim() || `Overcoming ${category} one step at a time`,
        durationDays: duration,
        dailyBaseline: Number(dailyBaseline) || 0,
        costEstimate: Number(costEstimate) || 0
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', paddingTop: '1rem' }}>
      <div className="card">
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          {t.onboardingTitle}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
          {t.onboardingSubtitle}
        </p>

        <form onSubmit={handleSubmit}>
          {/* Habit Categories Grid */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1rem' }}>
              {t.selectHabitCategory}
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '0.75rem'
            }}>
              {categories.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-secondary)',
                      border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                      color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      textAlign: 'start',
                      fontWeight: isSelected ? 700 : 500,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat.icon}
                    <span style={{ fontSize: '0.9rem', flex: 1 }}>{cat.label}</span>
                    {isSelected && <Check size={16} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Goal Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              {t.goalLabel}
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder={t.goalPlaceholder}
              className="input"
            />
          </div>

          {/* Duration Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              {t.durationLabel}
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {durations.map((d) => (
                <button
                  type="button"
                  key={d.days}
                  onClick={() => setDuration(d.days)}
                  className={`btn btn-sm ${duration === d.days ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem' }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Baseline & Cost */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                {t.dailyBaselineLabel}
              </label>
              <input
                type="number"
                min="0"
                value={dailyBaseline}
                onChange={(e) => setDailyBaseline(e.target.value)}
                placeholder="e.g. 15"
                className="input"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {t.dailyBaselineHelp}
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                {t.costEstimateLabel}
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={costEstimate}
                onChange={(e) => setCostEstimate(e.target.value)}
                placeholder="e.g. 7.50"
                className="input"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {t.costEstimateHelp}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ padding: '0.85rem 2rem', fontSize: '1.05rem', borderRadius: 'var(--radius-md)' }}
            >
              <span>{isSubmitting ? t.loading : t.onboardingStartBtn}</span>
              <ArrowIcon size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
