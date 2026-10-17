import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { KeyRound, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';

export const AccountRecoveryView: React.FC = () => {
  const { user, recoverAccount, t, showToast } = useApp();
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerate = async () => {
    try {
      const res = await api.generateRecoveryKey();
      setGeneratedKey(res.recoveryKey);
      showToast(t.recoveryKeySavedNotice);
    } catch (err: any) {
      showToast(err.message || t.error);
    }
  };

  const handleCopy = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    showToast('Key copied to clipboard');
  };

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    setIsSubmitting(true);
    try {
      await recoverAccount(inputKey.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.accountRecoveryTitle}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Secure, zero-knowledge account recovery without requiring email or phone numbers.
        </p>
      </div>

      {/* Generate Recovery Key Box (If Logged In) */}
      {user && (
        <div className="card" style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {t.generateRecoveryKeyBtn}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Generate a 16-character cryptographic recovery key. If you ever switch devices or clear browser storage, this key restores your active challenge, journal entries, and history.
          </p>

          {generatedKey ? (
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--accent-cyan)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Your Secret Key (Shown Once)
                </span>
                <div style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  color: 'var(--text-primary)',
                  fontFamily: 'monospace'
                }}>
                  {generatedKey}
                </div>
              </div>

              <button onClick={handleCopy} className="btn btn-primary btn-sm">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy Key'}</span>
              </button>
            </div>
          ) : (
            <button onClick={handleGenerate} className="btn btn-primary">
              <KeyRound size={16} />
              <span>{t.generateRecoveryKeyBtn}</span>
            </button>
          )}
        </div>
      )}

      {/* Recover Existing Account Box */}
      <div className="card">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          {t.landingSignInRecovery}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          {t.enterRecoveryKeyPlaceholder}
        </p>

        <form onSubmit={handleRecover}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="e.g. 4B8F-99E1-C34A-7281"
              className="input"
              style={{ flex: 1, minWidth: 260, textTransform: 'uppercase', fontFamily: 'monospace' }}
              required
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !inputKey.trim()}
            >
              <span>{isSubmitting ? t.loading : t.recoverAccountBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
