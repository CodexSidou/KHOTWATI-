import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, Send } from 'lucide-react';

interface Props {
  messageId: string | null;
  reportedUserId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<Props> = ({ messageId, reportedUserId, isOpen, onClose }) => {
  const { reportChat, t } = useApp();
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !messageId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    setIsSubmitting(true);
    try {
      await reportChat(messageId, reason, reportedUserId);
      setReason('');
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
            background: 'rgba(244, 63, 94, 0.15)',
            padding: '0.5rem',
            borderRadius: '50%',
            color: 'var(--accent-rose)'
          }}>
            <AlertTriangle size={20} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{t.chatReportBtn}</h3>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          {t.modReportReason}
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Harassment, trigger promotion, unsolicited advice, spam..."
            className="textarea"
            rows={3}
            required
            style={{ marginBottom: '1.25rem' }}
          />

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              disabled={isSubmitting || !reason.trim()}
            >
              <Send size={15} />
              <span>{isSubmitting ? t.loading : t.modReportSubmit}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
