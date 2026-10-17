import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Lock, CheckCircle2, Flame, Heart, Compass, Shield, Sparkles } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { activeChallenge, journalEntries, t } = useApp();

  const streak = activeChallenge?.bestStreak || 0;
  const journalCount = journalEntries.length;
  const hasRestarted = Boolean(activeChallenge?.history && activeChallenge.history.length > 0);

  const badges = [
    {
      id: 'first_step',
      title: 'First Step | الخطوة الأولى',
      desc: 'Completed Day 1 of your recovery journey.',
      icon: <Compass size={24} />,
      unlocked: streak >= 1
    },
    {
      id: 'focus_3',
      title: '3-Day Focus | ثبات الأيام الثلاثة',
      desc: 'Maintained your streak for 3 consecutive days.',
      icon: <Flame size={24} />,
      unlocked: streak >= 3
    },
    {
      id: 'one_week',
      title: 'One Week Solid | أسبوع من الصمود',
      desc: 'Overcame the initial acute neurochemical adaptation curve.',
      icon: <Award size={24} />,
      unlocked: streak >= 7
    },
    {
      id: 'resilient_restart',
      title: 'Reset Resilient | شجاعة البداية',
      desc: 'Restarted your challenge with courage and compassion.',
      icon: <Heart size={24} />,
      unlocked: hasRestarted
    },
    {
      id: 'mindful_journal',
      title: 'Mindful Journaler | التدوين الواعي',
      desc: 'Logged 3 or more private reflections to understand your triggers.',
      icon: <Sparkles size={24} />,
      unlocked: journalCount >= 3
    },
    {
      id: 'two_weeks',
      title: 'Two Weeks Clear | نصف شهر من الحرية',
      desc: 'Reached 14 full days on your recovery path.',
      icon: <Shield size={24} />,
      unlocked: streak >= 14
    },
    {
      id: 'month_master',
      title: '30-Day Rewire | تحول المسار',
      desc: 'Completed a full 30-day challenge and formed new neural pathways.',
      icon: <Award size={24} />,
      unlocked: streak >= 30
    }
  ];

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.navAchievements}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Real milestone badges awarded as you progress through your saved records.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1rem'
      }}>
        {badges.map((badge) => {
          return (
            <div
              key={badge.id}
              className="card"
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                opacity: badge.unlocked ? 1 : 0.6,
                border: badge.unlocked ? '1px solid rgba(14, 165, 233, 0.4)' : '1px solid var(--border-color)',
                background: badge.unlocked ? 'var(--bg-card)' : 'var(--bg-secondary)'
              }}
            >
              <div style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: badge.unlocked
                  ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))'
                  : 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: badge.unlocked ? '#fff' : 'var(--text-muted)',
                boxShadow: badge.unlocked ? 'var(--shadow-glow-cyan)' : 'none',
                flexShrink: 0
              }}>
                {badge.unlocked ? badge.icon : <Lock size={20} />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: badge.unlocked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {badge.title}
                  </h4>
                  {badge.unlocked && <CheckCircle2 size={16} color="var(--accent-green)" />}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {badge.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
