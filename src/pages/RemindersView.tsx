import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Clock, Moon, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { ReminderConfig } from '../types';

export const RemindersView: React.FC = () => {
  const { t, showToast } = useApp();

  const [config, setConfig] = useState<ReminderConfig>(() => {
    const saved = localStorage.getItem('khotwati_reminders');
    return saved ? JSON.parse(saved) : {
      dailyTaskReminder: true,
      dailyTaskTime: '09:00',
      eveningCheckIn: true,
      eveningCheckInTime: '21:00',
      quietHoursEnabled: true,
      quietHoursStart: '22:00',
      quietHoursEnd: '07:00',
      browserPushGranted: false
    };
  });

  const saveConfig = (newConfig: ReminderConfig) => {
    setConfig(newConfig);
    localStorage.setItem('khotwati_reminders', JSON.stringify(newConfig));
    showToast(t.success);
  };

  const handleRequestPush = async () => {
    if (!('Notification' in window)) {
      showToast('Notifications are not supported in this browser.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        saveConfig({ ...config, browserPushGranted: true });
        new Notification(t.appName, {
          body: 'Reminders enabled! You are taking control one step at a time.',
          icon: '/favicon.ico'
        });
        showToast('Browser notifications successfully enabled.');
      } else {
        showToast('Notification permission was denied.');
      }
    } catch (e) {
      showToast('Could not request notification permission.');
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.navReminders}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Configure compassionate check-ins to stay anchored throughout the day.
        </p>
      </div>

      {/* Honest Technical Notice */}
      <div style={{
        background: 'rgba(14, 165, 233, 0.08)',
        border: '1px solid rgba(14, 165, 233, 0.25)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        marginBottom: '1.5rem',
        display: 'flex',
        gap: '0.75rem'
      }}>
        <AlertCircle size={20} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
          <strong>PWA & Browser Notice:</strong> Notifications rely on browser permissions and operating system battery-saver settings. On iPhone (iOS), please tap <em>Share → Add to Home Screen</em> to enable push notifications.
        </div>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Morning Task Reminder */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Morning Habit Reflection</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sets intentions and reviews today's challenge tasks.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input
              type="time"
              value={config.dailyTaskTime}
              onChange={(e) => saveConfig({ ...config, dailyTaskTime: e.target.value })}
              className="input btn-sm"
              style={{ width: 'auto' }}
            />
            <input
              type="checkbox"
              checked={config.dailyTaskReminder}
              onChange={(e) => saveConfig({ ...config, dailyTaskReminder: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: 'var(--accent-cyan)' }}
            />
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border-color)' }} />

        {/* Evening Check-in */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Evening Progress Check-in</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reflects on triggers handled and celebrates today's streak.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input
              type="time"
              value={config.eveningCheckInTime}
              onChange={(e) => saveConfig({ ...config, eveningCheckInTime: e.target.value })}
              className="input btn-sm"
              style={{ width: 'auto' }}
            />
            <input
              type="checkbox"
              checked={config.eveningCheckIn}
              onChange={(e) => saveConfig({ ...config, eveningCheckIn: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: 'var(--accent-cyan)' }}
            />
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border-color)' }} />

        {/* Quiet Hours */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Quiet Hours (No Disturb)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mutes all non-emergency check-in reminders.</div>
            </div>
            <input
              type="checkbox"
              checked={config.quietHoursEnabled}
              onChange={(e) => saveConfig({ ...config, quietHoursEnabled: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: 'var(--accent-cyan)' }}
            />
          </div>

          {config.quietHoursEnabled && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>From</span>
              <input
                type="time"
                value={config.quietHoursStart}
                onChange={(e) => saveConfig({ ...config, quietHoursStart: e.target.value })}
                className="input btn-sm"
                style={{ width: 'auto' }}
              />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>To</span>
              <input
                type="time"
                value={config.quietHoursEnd}
                onChange={(e) => saveConfig({ ...config, quietHoursEnd: e.target.value })}
                className="input btn-sm"
                style={{ width: 'auto' }}
              />
            </div>
          )}
        </div>

        <div style={{ height: 1, background: 'var(--border-color)' }} />

        {/* Browser Permission Action */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Browser Push Permission</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {config.browserPushGranted ? 'Permission is currently active.' : 'Permission has not been requested yet.'}
            </div>
          </div>
          <button
            onClick={handleRequestPush}
            className="btn btn-secondary btn-sm"
          >
            <Bell size={16} />
            <span>Enable Push Notifications</span>
          </button>
        </div>
      </div>
    </div>
  );
};
