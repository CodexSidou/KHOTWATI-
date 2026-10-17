import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Database, Download, Trash2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const DataExportView: React.FC = () => {
  const { exportData, deleteAccount, t } = useApp();
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportData();
    } finally {
      setIsExporting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(t.deleteAccountConfirm)) {
      setIsDeleting(true);
      try {
        await deleteAccount();
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.navExportDelete}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Full data sovereignty. Export your records or permanently purge your account at any time.
        </p>
      </div>

      {/* Export Section */}
      <div className="card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <Download size={22} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Data Export (JSON Archive)</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          Download an unencrypted, machine-readable JSON backup containing your user profile, all active and past challenges, streaks, and all private journal reflections.
        </p>
        <button
          onClick={handleExport}
          className="btn btn-primary"
          disabled={isExporting}
        >
          <Download size={16} />
          <span>{isExporting ? t.loading : t.dataExportBtn}</span>
        </button>
      </div>

      {/* Delete Account Section */}
      <div className="card" style={{ border: '1px solid rgba(244, 63, 94, 0.35)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <AlertTriangle size={22} color="var(--accent-rose)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
            Permanent Account Deletion
          </h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          {t.deleteAccountWarning} Once deleted, your account cannot be recovered even if you possess a secret key.
        </p>
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          disabled={isDeleting}
        >
          <Trash2 size={16} />
          <span>{isDeleting ? t.loading : t.deleteAccountBtn}</span>
        </button>
      </div>
    </div>
  );
};
