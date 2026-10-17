import React from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Award, DollarSign, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { activeChallenge, journalEntries, t } = useApp();

  if (!activeChallenge) {
    return <div className="card">{t.noActiveChallenge}</div>;
  }

  const completedTasks = activeChallenge.tasks.filter(t => t.isCompleted).length;
  const totalTasks = activeChallenge.tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const estimatedSavings = ((activeChallenge.costEstimate || 0) * (activeChallenge.currentStreak || 0)).toFixed(2);
  const totalJournalNotes = journalEntries.length;

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.navAnalytics}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Real progress computed from your saved records.
        </p>
      </div>

      {/* Analytics Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.4rem' }}>
            {t.currentStreak}
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
            {activeChallenge.currentStreak} {t.days}
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.4rem' }}>
            {t.bestStreak}
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-green)' }}>
            {activeChallenge.bestStreak} {t.days}
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.4rem' }}>
            {t.tasksCompletedToday}
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
            {completedTasks} / {totalTasks}
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.4rem' }}>
            {t.moneySaved}
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-blue)' }}>
            ${estimatedSavings}
          </div>
        </div>
      </div>

      {/* Progress Chart / Bar Visualization */}
      <div className="card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{t.progressPercent}</h3>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
            {completionRate}%
          </span>
        </div>

        <div style={{ height: 12, background: 'var(--bg-secondary)', borderRadius: 999, overflow: 'hidden', marginBottom: '1.5rem' }}>
          <div style={{
            height: '100%',
            width: `${completionRate}%`,
            background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))',
            transition: 'width 0.5s ease'
          }} />
        </div>

        {/* Day-by-Day Grid of Progress */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(24px, 1fr))',
          gap: 6
        }}>
          {activeChallenge.tasks.map((task) => (
            <div
              key={task.id}
              title={`Day ${task.day}: ${task.isCompleted ? 'Completed' : 'Pending'}`}
              style={{
                height: 24,
                borderRadius: 4,
                background: task.isCompleted
                  ? 'var(--accent-green)'
                  : task.day <= activeChallenge.activeDay
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(255, 255, 255, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                color: task.isCompleted ? '#fff' : 'var(--text-muted)',
                fontWeight: 700
              }}
            >
              {task.day}
            </div>
          ))}
        </div>
      </div>

      {/* Past Challenge Attempts History */}
      {activeChallenge.history && activeChallenge.history.length > 0 && (
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Historical Challenge Attempts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {activeChallenge.history.map((hist, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{hist.goal}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Streak Achieved: {hist.daysCompleted} days • Started: {new Date(hist.startDate).toLocaleDateString()}
                  </div>
                </div>
                <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                  Archived
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
