import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  CheckSquare,
  ShieldAlert,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Award,
  Settings,
  HelpCircle,
  FileText,
  Sliders,
  Database
} from 'lucide-react';
import { ViewType } from '../types';

export const NavigationTabs: React.FC = () => {
  const { currentView, navigateTo, user, t } = useApp();

  if (!user && (currentView === 'landing' || currentView === 'onboarding')) {
    return null;
  }

  const primaryTabs: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: t.navDashboard, icon: <LayoutDashboard size={18} /> },
    { id: 'daily_tasks', label: t.navTasks, icon: <CheckSquare size={18} /> },
    { id: 'craving_toolkit', label: t.navToolkit, icon: <ShieldAlert size={18} /> },
    { id: 'journal', label: t.navJournal, icon: <BookOpen size={18} /> },
    { id: 'public_chat', label: t.navCommunity, icon: <MessageSquare size={18} /> },
    { id: 'analytics', label: t.navAnalytics, icon: <TrendingUp size={18} /> },
    { id: 'achievements', label: t.navAchievements, icon: <Award size={18} /> }
  ];

  const secondaryTabs: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    { id: 'educational', label: t.navHelp, icon: <HelpCircle size={16} /> },
    { id: 'community_rules', label: t.navRules, icon: <FileText size={16} /> },
    { id: 'settings', label: t.navSettings, icon: <Settings size={16} /> },
    { id: 'data_export', label: t.navExportDelete, icon: <Database size={16} /> }
  ];

  if (user?.role === 'moderator' || user?.role === 'admin') {
    secondaryTabs.push({
      id: 'moderation',
      label: t.navModeration,
      icon: <Sliders size={16} />
    });
  }

  return (
    <nav style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.4rem 1rem',
      marginBottom: '1.5rem',
      overflowX: 'auto',
      whiteSpace: 'nowrap'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        {/* Primary Tabs */}
        {primaryTabs.map((tab) => {
          const isActive = currentView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: '999px',
                padding: '0.45rem 0.9rem',
                fontSize: '0.88rem',
                border: isActive ? 'none' : '1px solid var(--border-color)'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}

        <div style={{ width: 1, height: 24, background: 'var(--border-color)', margin: '0 0.25rem' }} />

        {/* Secondary Auxiliary Tabs */}
        {secondaryTabs.map((tab) => {
          const isActive = currentView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: '999px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.8rem',
                opacity: isActive ? 1 : 0.8
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
