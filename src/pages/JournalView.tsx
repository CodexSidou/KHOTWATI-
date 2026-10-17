import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JournalEntry } from '../types';
import {
  Lock,
  Plus,
  Trash2,
  Smile,
  Frown,
  Meh,
  Flame,
  Search,
  Sparkles,
  Calendar,
  ShieldCheck
} from 'lucide-react';

export const JournalView: React.FC = () => {
  const { journalEntries, addJournal, deleteJournal, t } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<JournalEntry['mood']>('calm');
  const [cravingsIntensity, setCravingsIntensity] = useState<number>(3);
  const [triggersInput, setTriggersInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods: { id: JournalEntry['mood']; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'peaceful', label: t.journalMoodPeaceful, icon: <Sparkles size={16} />, color: 'var(--accent-cyan)' },
    { id: 'calm', label: t.journalMoodCalm, icon: <Smile size={16} />, color: 'var(--accent-green)' },
    { id: 'anxious', label: t.journalMoodAnxious, icon: <Meh size={16} />, color: 'var(--accent-amber)' },
    { id: 'struggling', label: t.journalMoodStruggling, icon: <Frown size={16} />, color: 'var(--accent-rose)' },
    { id: 'determined', label: t.journalMoodDetermined, icon: <Flame size={16} />, color: 'var(--accent-blue)' }
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const triggers = triggersInput
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      await addJournal({
        title: title.trim(),
        content: content.trim(),
        mood,
        cravingsIntensity,
        triggers
      });

      setTitle('');
      setContent('');
      setTriggersInput('');
      setCravingsIntensity(3);
      setShowNewEntryForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredEntries = journalEntries.filter(entry => {
    const q = searchQuery.toLowerCase();
    return (
      entry.title.toLowerCase().includes(q) ||
      entry.content.toLowerCase().includes(q) ||
      entry.triggers.some(trig => trig.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      {/* Header and Strict Privacy Notice */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Lock size={20} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.journalTitle}</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {t.journalSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowNewEntryForm(!showNewEntryForm)}
          className="btn btn-primary btn-sm"
          style={{ borderRadius: 999 }}
        >
          <Plus size={16} />
          <span>{t.journalNewEntry}</span>
        </button>
      </div>

      {/* Privacy Guarantee Banner */}
      <div style={{
        background: 'rgba(6, 182, 212, 0.08)',
        border: '1px solid rgba(6, 182, 212, 0.25)',
        borderRadius: 'var(--radius-md)',
        padding: '0.75rem 1rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        fontSize: '0.85rem',
        color: 'var(--text-primary)'
      }}>
        <ShieldCheck size={18} color="var(--accent-cyan)" />
        <span>{t.journalPrivateNotice}</span>
      </div>

      {/* New Journal Form Modal / Accordion */}
      {showNewEntryForm && (
        <div className="card" style={{ marginBottom: '1.75rem', border: '1px solid var(--border-active)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
            {t.journalNewEntry}
          </h3>

          <form onSubmit={handleSave}>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.journalTitleInput}
                className="input"
                required
              />
            </div>

            {/* Mood selector */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                {t.journalMoodLabel}
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {moods.map((m) => {
                  const isSelected = mood === m.id;
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setMood(m.id)}
                      className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ borderRadius: 999 }}
                    >
                      {m.icon}
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Craving Intensity Slider (1-10) */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                <span>{t.journalIntensityLabel}</span>
                <span style={{ color: 'var(--accent-rose)', fontWeight: 800 }}>{cravingsIntensity} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={cravingsIntensity}
                onChange={(e) => setCravingsIntensity(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-rose)' }}
              />
            </div>

            {/* Triggers */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                {t.journalTriggersLabel}
              </label>
              <input
                type="text"
                value={triggersInput}
                onChange={(e) => setTriggersInput(e.target.value)}
                placeholder={t.journalTriggersPlaceholder}
                className="input"
              />
            </div>

            {/* Content Body */}
            <div style={{ marginBottom: '1.25rem' }}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t.journalContentInput}
                className="textarea"
                rows={5}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowNewEntryForm(false)}
                className="btn btn-secondary"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !title.trim() || !content.trim()}
              >
                <Lock size={15} />
                <span>{isSubmitting ? t.loading : t.journalSaveBtn}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      {journalEntries.length > 0 && (
        <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entries or triggers..."
            className="input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
      )}

      {/* Entries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredEntries.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-secondary)' }}>
            <p>{t.journalEmpty}</p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                      {entry.mood.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Craving: {entry.cravingsIntensity}/10
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                    {entry.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={13} />
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => {
                      if (window.confirm(t.journalDeleteConfirm)) {
                        deleteJournal(entry.id);
                      }
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.3rem', color: 'var(--accent-rose)' }}
                    title={t.journalDeleteBtn}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', whiteSpace: 'pre-wrap', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                {entry.content}
              </p>

              {entry.triggers && entry.triggers.length > 0 && (
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {entry.triggers.map((trig, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      #{trig}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
