import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { UserCheck, ShieldCheck, Check, Sparkles } from 'lucide-react';

const AVATAR_LIST = [
  'avatar-step',
  'avatar-path',
  'avatar-sunrise',
  'avatar-mountain',
  'avatar-seed',
  'avatar-leaf',
  'avatar-wave',
  'avatar-star'
];

export const ProfileView: React.FC = () => {
  const { user, t, showToast } = useApp();
  const [username, setUsername] = useState(user?.username || '');
  const [avatar, setAvatar] = useState(user?.avatar || 'avatar-step');
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    return <div className="card">{t.loading}</div>;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length < 2 || username.trim().length > 30) {
      showToast('Username must be between 2 and 30 characters.');
      return;
    }

    setIsSaving(true);
    try {
      // In local mode or server mode, update profile
      user.username = username.trim();
      user.avatar = avatar;
      localStorage.setItem('khotwati_user_profile', JSON.stringify(user));
      showToast(t.success);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.navProfile}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Your pseudonymous public identity in the support community.
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSave}>
          {/* Avatar Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              Choose Recovery Avatar:
            </label>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {AVATAR_LIST.map((av) => {
                const isSelected = avatar === av;
                return (
                  <button
                    type="button"
                    key={av}
                    onClick={() => setAvatar(av)}
                    style={{
                      padding: '0.6rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(6, 182, 212, 0.2)' : 'var(--bg-secondary)',
                      border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                      color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <span>{av.replace('avatar-', '')}</span>
                    {isSelected && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pseudonym Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
              Pseudonymous Username (2-30 characters):
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={30}
              className="input"
              required
            />
          </div>

          {/* User Role & ID */}
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Role: </span>
              <span className="badge badge-cyan">{user.role}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Member Since: </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
            >
              <span>{isSaving ? t.loading : t.save}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
