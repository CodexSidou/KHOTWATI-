import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Award,
  CheckCircle2,
  Circle,
  ShieldAlert,
  RotateCcw,
  MessageSquare,
  DollarSign,
  TrendingUp,
  PlusCircle,
  Calendar
} from 'lucide-react';
import { RestartChallengeModal } from '../components/RestartChallengeModal';

export const DashboardView: React.FC = () => {
  const { activeChallenge, toggleTask, navigateTo, t } = useApp();
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);

  if (!activeChallenge) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', maxWidth: 600, margin: '2rem auto' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          {t.noActiveChallenge}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
          {t.onboardingSubtitle}
        </p>
        <button onClick={() => navigateTo('onboarding')} className="btn btn-primary">
          <PlusCircle size={18} />
          <span>{t.startNewChallenge}</span>
        </button>
      </div>
    );
  }

  // Calculate actual progress based on real completed tasks
  const totalTasks = activeChallenge.tasks.length;
  const completedTasks = activeChallenge.tasks.filter(t => t.isCompleted).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Today's tasks (activeDay)
  const todayTasks = activeChallenge.tasks.filter(t => t.day === activeChallenge.activeDay);

  // Financial savings calculation based on actual completed streak
  const estimatedSavings = ((activeChallenge.costEstimate || 0) * (activeChallenge.currentStreak || 0)).toFixed(2);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      {/* Quick Action Emergency Alert Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.12), rgba(245, 158, 11, 0.12))',
        border: '1px solid rgba(244, 63, 94, 0.35)',
        borderRadius: 'var(--radius-lg)',
        padding: '0.9rem 1.25rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <ShieldAlert size={22} color="var(--accent-rose)" />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            {t.quickToolkitBtn}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigateTo('craving_toolkit')}
            className="btn btn-danger btn-sm"
            style={{ borderRadius: 999 }}
          >
            <ShieldAlert size={15} />
            <span>{t.navToolkit}</span>
          </button>
          <button
            onClick={() => navigateTo('public_chat')}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 999 }}
          >
            <MessageSquare size={15} color="var(--accent-cyan)" />
            <span>{t.quickCommunityBtn}</span>
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Current Streak */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(245, 158, 11, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-amber)'
          }}>
            <Flame size={26} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {t.currentStreak}
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {activeChallenge.currentStreak} {t.days}
            </div>
          </div>
        </div>

        {/* Best Streak */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-green)'
          }}>
            <Award size={26} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {t.bestStreak}
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {activeChallenge.bestStreak} {t.days}
            </div>
          </div>
        </div>

        {/* Current Day / Total */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(14, 165, 233, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-blue)'
          }}>
            <Calendar size={26} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {t.challengeDay}
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {activeChallenge.activeDay} / {activeChallenge.durationDays}
            </div>
          </div>
        </div>

        {/* Money Saved */}
        {activeChallenge.costEstimate ? (
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(6, 182, 212, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)'
            }}>
              <DollarSign size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                {t.moneySaved}
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                ${estimatedSavings}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Active Challenge Card & Overall Progress */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>
              {activeChallenge.habitCategory.toUpperCase().replace('_', ' ')}
            </span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              {activeChallenge.goal}
            </h2>
          </div>

          <button
            onClick={() => setIsRestartModalOpen(true)}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 999 }}
            title={t.restartChallengeBtn}
          >
            <RotateCcw size={15} color="var(--accent-cyan)" />
            <span>{t.restartChallengeBtn}</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
            <span>{t.progressPercent}</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{progressPercent}%</span>
          </div>
          <div style={{ height: 8, background: 'var(--bg-secondary)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Today's Tasks Section */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              {t.dailyTasksTitle} ({t.challengeDay} {activeChallenge.activeDay})
            </h3>
          </div>
          <button
            onClick={() => navigateTo('daily_tasks')}
            className="btn btn-secondary btn-sm"
          >
            <span>{t.navTasks}</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {todayTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                padding: '0.9rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: task.isCompleted ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-secondary)',
                border: task.isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ color: task.isCompleted ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                {task.isCompleted ? <CheckCircle2 size={22} /> : <Circle size={22} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: task.isCompleted ? 'var(--text-secondary)' : 'var(--text-primary)',
                  textDecoration: task.isCompleted ? 'line-through' : 'none'
                }}>
                  {task.customTitle || task.titleKey.replace(/_/g, ' ')}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  {task.descKey.replace(/_/g, ' ')}
                </div>
              </div>
              <button
                className={`btn btn-sm ${task.isCompleted ? 'btn-secondary' : 'btn-primary'}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTask(task.id);
                }}
              >
                {task.isCompleted ? t.undoComplete : t.markComplete}
              </button>
            </div>
          ))}
        </div>
      </div>

      <RestartChallengeModal
        isOpen={isRestartModalOpen}
        onClose={() => setIsRestartModalOpen(false)}
      />
    </div>
  );
};
