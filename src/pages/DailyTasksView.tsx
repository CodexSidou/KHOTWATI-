import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Circle,
  Plus,
  Calendar,
  Filter,
  Check,
  RotateCcw
} from 'lucide-react';

export const DailyTasksView: React.FC = () => {
  const { activeChallenge, toggleTask, t } = useApp();
  const [selectedDay, setSelectedDay] = useState<number>(activeChallenge?.activeDay || 1);
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'completed'>('all');
  const [customTaskTitle, setCustomTaskTitle] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  if (!activeChallenge) {
    return <div className="card">{t.noActiveChallenge}</div>;
  }

  const tasksForDay = activeChallenge.tasks.filter(t => t.day === selectedDay);
  const filteredTasks = tasksForDay.filter(task => {
    if (filterMode === 'completed') return task.isCompleted;
    if (filterMode === 'pending') return !task.isCompleted;
    return true;
  });

  const handleAddCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTaskTitle.trim()) return;

    // Add locally to activeChallenge tasks
    const newTask = {
      id: `task-custom-${Date.now()}`,
      day: selectedDay,
      titleKey: 'task_custom_title',
      descKey: 'task_custom_desc',
      customTitle: customTaskTitle.trim(),
      category: activeChallenge.habitCategory,
      isCompleted: false,
      isCustom: true
    };
    activeChallenge.tasks.push(newTask);
    setCustomTaskTitle('');
    setShowAddModal(false);
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.dailyTasksTitle}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {t.challengeDay} {selectedDay} / {activeChallenge.durationDays}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm"
          style={{ borderRadius: 999 }}
        >
          <Plus size={16} />
          <span>{t.addPersonalTask}</span>
        </button>
      </div>

      {/* Days Scroller */}
      <div style={{
        display: 'flex',
        gap: '0.4rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        marginBottom: '1.25rem',
        whiteSpace: 'nowrap'
      }}>
        {Array.from({ length: activeChallenge.durationDays }, (_, i) => i + 1).map((dayNum) => {
          const isCurrentActiveDay = dayNum === activeChallenge.activeDay;
          const isSelected = dayNum === selectedDay;
          const dayTasks = activeChallenge.tasks.filter(t => t.day === dayNum);
          const allDone = dayTasks.length > 0 && dayTasks.every(t => t.isCompleted);

          return (
            <button
              key={dayNum}
              onClick={() => setSelectedDay(dayNum)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'var(--accent-cyan)' : 'var(--bg-card)',
                color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                border: isCurrentActiveDay && !isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                fontWeight: isSelected ? 700 : 500,
                minWidth: 54,
                position: 'relative',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{t.challengeDay}</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>{dayNum}</span>
              {allDone && (
                <div style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: isSelected ? '#FFFFFF' : 'var(--accent-green)'
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setFilterMode('all')}
          className={`btn btn-sm ${filterMode === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 999 }}
        >
          {t.appName.split(' ')[0]} ({tasksForDay.length})
        </button>
        <button
          onClick={() => setFilterMode('pending')}
          className={`btn btn-sm ${filterMode === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 999 }}
        >
          {t.dailyTasksTitle} ({tasksForDay.filter(t => !t.isCompleted).length})
        </button>
        <button
          onClick={() => setFilterMode('completed')}
          className={`btn btn-sm ${filterMode === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 999 }}
        >
          {t.success} ({tasksForDay.filter(t => t.isCompleted).length})
        </button>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filteredTasks.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            {t.success}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: task.isCompleted ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card)',
                border: task.isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ color: task.isCompleted ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                {task.isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: task.isCompleted ? 'var(--text-secondary)' : 'var(--text-primary)',
                  textDecoration: task.isCompleted ? 'line-through' : 'none'
                }}>
                  {task.customTitle || task.titleKey.replace(/_/g, ' ')}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  {task.descKey.replace(/_/g, ' ')}
                </div>
              </div>

              <button
                className={`btn btn-sm ${task.isCompleted ? 'btn-secondary' : 'btn-primary'}`}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTask(task.id);
                }}
              >
                {task.isCompleted ? t.undoComplete : t.markComplete}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Custom Task Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
              {t.addPersonalTask} ({t.challengeDay} {selectedDay})
            </h3>
            <form onSubmit={handleAddCustomTask}>
              <input
                type="text"
                value={customTaskTitle}
                onChange={(e) => setCustomTaskTitle(e.target.value)}
                placeholder="e.g. Drink 2L water, 15 min walk, read 5 pages..."
                className="input"
                autoFocus
                required
                style={{ marginBottom: '1.25rem' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!customTaskTitle.trim()}
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
