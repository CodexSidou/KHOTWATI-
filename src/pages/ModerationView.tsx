import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Sliders, Trash2, Ban, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ModerationView: React.FC = () => {
  const { user, t, showToast } = useApp();
  const [targetUserId, setTargetUserId] = useState('');
  const [banReason, setBanReason] = useState('');
  const [targetMessageId, setTargetMessageId] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBanUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUserId.trim()) return;

    setIsProcessing(true);
    try {
      await api.banUser(targetUserId.trim(), banReason.trim());
      showToast(`User ${targetUserId} has been banned.`);
      setTargetUserId('');
      setBanReason('');
    } catch (err: any) {
      showToast(err.message || t.error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetMessageId.trim()) return;

    setIsProcessing(true);
    try {
      await api.deleteChatMessage(targetMessageId.trim(), deleteReason.trim());
      showToast('Message was removed from public chat.');
      setTargetMessageId('');
      setDeleteReason('');
    } catch (err: any) {
      showToast(err.message || t.error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sliders size={22} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.modDashboardTitle}</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Enforce community safety standards, delete abusive messages, and suspend bad actors.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Remove Message */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Trash2 size={20} color="var(--accent-rose)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Remove Inappropriate Message</h3>
          </div>

          <form onSubmit={handleDeleteMessage}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Message ID:
              </label>
              <input
                type="text"
                value={targetMessageId}
                onChange={(e) => setTargetMessageId(e.target.value)}
                placeholder="msg-xxxxxxxx-xxxx"
                className="input"
                required
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Reason for Removal:
              </label>
              <input
                type="text"
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                placeholder="Violation of safety rules..."
                className="input"
              />
            </div>

            <button
              type="submit"
              className="btn btn-danger"
              disabled={isProcessing || !targetMessageId.trim()}
              style={{ width: '100%' }}
            >
              <span>{isProcessing ? t.loading : t.modDeleteMessageBtn}</span>
            </button>
          </form>
        </div>

        {/* Ban User */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Ban size={20} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Suspend User Account</h3>
          </div>

          <form onSubmit={handleBanUser}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Target User ID:
              </label>
              <input
                type="text"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                placeholder="user-xxxxxxxx-xxxx"
                className="input"
                required
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Suspension Reason:
              </label>
              <input
                type="text"
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                placeholder="Repetitive spam / substance promotion"
                className="input"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isProcessing || !targetUserId.trim()}
              style={{ width: '100%', background: 'var(--accent-rose)' }}
            >
              <span>{isProcessing ? t.loading : t.modBanUserBtn}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
