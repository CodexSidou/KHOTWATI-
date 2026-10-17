import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Home } from 'lucide-react';

export const NotFoundView: React.FC = () => {
  const { navigateTo, user, t } = useApp();

  return (
    <div style={{ maxWidth: 540, margin: '4rem auto', textAlign: 'center' }}>
      <div className="card" style={{ padding: '3rem 1.5rem' }}>
        <Compass size={48} color="var(--accent-cyan)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>404</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          This page does not exist or has been moved.
        </p>
        <button
          onClick={() => navigateTo(user ? 'dashboard' : 'landing')}
          className="btn btn-primary"
        >
          <Home size={16} />
          <span>Return Home</span>
        </button>
      </div>
    </div>
  );
};
