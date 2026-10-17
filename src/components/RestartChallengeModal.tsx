import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RotateCcw, Heart, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RestartChallengeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { restartChallenge, t } = useApp();
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await restartChallenge(reason);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <div style={{
            background: 'rgba(6, 182, 212, 0.15)',
            padding: '0.5rem',
            borderRadius: '50%',
            color: 'var(--accent-cyan)'
          }}>
            <RotateCcw size={22} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{t.restartModalTitle}</h3>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          {t.restartModalSubtitle}
        </p>

        {/* Compassionate Assurance Box */}
        <div style={{
          background: 'rgba(139, 92, 246, 0.08)',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '0.9rem 1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          gap: '0.6rem'
        }}>
          <ShieldCheck size={20} color="var(--accent-violet)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
            {t.restartNotice}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            {t.restartReasonLabel}
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t.restartReasonPlaceholder}
            className="textarea"
            rows={3}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            {t.restartCancelBtn}
          </button>
          <button
            onClick={handleConfirm}
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            <Heart size={16} />
            <span>{isSubmitting ? t.loading : t.restartConfirmBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
