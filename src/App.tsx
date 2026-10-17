import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { NavigationTabs } from './components/NavigationTabs';
import { LandingView } from './pages/LandingView';
import { OnboardingView } from './pages/OnboardingView';
import { DashboardView } from './pages/DashboardView';
import { DailyTasksView } from './pages/DailyTasksView';
import { CravingToolkitView } from './pages/CravingToolkitView';
import { JournalView } from './pages/JournalView';
import { PublicChatView } from './pages/PublicChatView';
import { AnalyticsView } from './pages/AnalyticsView';
import { AchievementsView } from './pages/AchievementsView';
import { RemindersView } from './pages/RemindersView';
import { ProfileView } from './pages/ProfileView';
import { AccountRecoveryView } from './pages/AccountRecoveryView';
import { SettingsView } from './pages/SettingsView';
import { EducationalView } from './pages/EducationalView';
import { CommunityRulesView } from './pages/CommunityRulesView';
import { ModerationView } from './pages/ModerationView';
import { DataExportView } from './pages/DataExportView';
import { OfflineFallbackView } from './pages/OfflineFallbackView';
import { NotFoundView } from './pages/NotFoundView';
import { Compass, Heart, Shield } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, toastMessage, t } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView />;
      case 'onboarding':
        return <OnboardingView />;
      case 'dashboard':
      case 'challenge_select':
      case 'challenge_detail':
        return <DashboardView />;
      case 'daily_tasks':
        return <DailyTasksView />;
      case 'craving_toolkit':
        return <CravingToolkitView />;
      case 'journal':
        return <JournalView />;
      case 'public_chat':
        return <PublicChatView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'achievements':
        return <AchievementsView />;
      case 'reminders':
        return <RemindersView />;
      case 'profile':
        return <ProfileView />;
      case 'recovery':
      case 'auth':
        return <AccountRecoveryView />;
      case 'settings':
      case 'privacy':
        return <SettingsView />;
      case 'educational':
        return <EducationalView />;
      case 'community_rules':
        return <CommunityRulesView />;
      case 'moderation':
        return <ModerationView />;
      case 'data_export':
        return <DataExportView />;
      case 'offline_fallback':
        return <OfflineFallbackView />;
      case 'not_found':
      default:
        return <NotFoundView />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <NavigationTabs />

      <main className="app-container" style={{ flex: 1 }}>
        {renderCurrentView()}
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-banner">
          <Shield size={16} color="var(--accent-cyan)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '1.5rem',
        textAlign: 'center',
        fontSize: '0.82rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
          <Compass size={16} color="var(--accent-cyan)" />
          <strong style={{ color: 'var(--text-primary)' }}>{t.appName}</strong>
          <span>— {t.oneStepAtATime}</span>
        </div>
        <p style={{ maxWidth: 600, margin: '0 auto', lineHeight: 1.5 }}>
          A privacy-preserving, anonymous habit recovery and community support platform. Not a substitute for licensed medical evaluation.
        </p>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
