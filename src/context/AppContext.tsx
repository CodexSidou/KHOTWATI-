import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  Theme,
  ViewType,
  UserProfile,
  Challenge,
  JournalEntry,
  ChatMessage,
  SyncStatus,
  HabitCategory
} from '../types';
import { translations, Translations } from '../i18n/translations';
import { api, getStoredToken } from '../services/api';
import { chatSocket } from '../services/chatSocket';

interface AppContextType {
  language: Language;
  theme: Theme;
  currentView: ViewType;
  user: UserProfile | null;
  activeChallenge: Challenge | null;
  journalEntries: JournalEntry[];
  chatMessages: ChatMessage[];
  onlineUsersCount: number;
  syncStatus: SyncStatus;
  toastMessage: string | null;
  t: Translations;
  isRtl: boolean;

  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  navigateTo: (view: ViewType) => void;
  showToast: (msg: string) => void;

  loginAnonymous: (username?: string, avatar?: string) => Promise<void>;
  recoverAccount: (recoveryKey: string) => Promise<void>;
  createChallenge: (params: {
    habitCategory: HabitCategory;
    goal: string;
    durationDays: number;
    dailyBaseline?: number;
    quitGoal?: number;
    costEstimate?: number;
  }) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
  restartChallenge: (reason?: string) => Promise<void>;
  addJournal: (entry: {
    title: string;
    content: string;
    mood: JournalEntry['mood'];
    cravingsIntensity: number;
    triggers: string[];
  }) => Promise<void>;
  deleteJournal: (id: string) => Promise<void>;
  sendChat: (content: string) => void;
  reportChat: (messageId: string, reason: string, reportedUserId?: string) => Promise<void>;
  exportData: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  refreshActiveChallenge: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('khotwati_lang') as Language) || 'ar';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('khotwati_theme') as Theme) || 'dark';
  });

  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [onlineUsersCount, setOnlineUsersCount] = useState<number>(1);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('local_only');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = translations[language];
  const isRtl = language === 'ar';

  // Apply HTML direction and lang attribute dynamically
  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('khotwati_lang', language);
  }, [language, isRtl]);

  // Apply Dark/Light mode class
  useEffect(() => {
    document.documentElement.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('khotwati_theme', theme);
  }, [theme]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTheme = (thm: Theme) => {
    setThemeState(thm);
  };

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initial load
  useEffect(() => {
    const initializeApp = async () => {
      const isServerUp = await api.checkHealth();
      setSyncStatus(isServerUp ? 'online' : 'local_only');

      const token = getStoredToken();
      if (token) {
        const me = await api.getMe();
        if (me?.user) {
          setUser(me.user);
          setCurrentView('dashboard');

          // Load user challenge and journal
          const chal = await api.getActiveChallenge();
          setActiveChallenge(chal);

          const entries = await api.getJournalEntries();
          setJournalEntries(entries);

          // Connect real-time chat socket if online
          if (isServerUp) {
            chatSocket.connect();
          }
        }
      }
    };

    initializeApp();

    // Subscribe to chat events
    const unsubscribeChat = chatSocket.subscribe((type, payload) => {
      if (type === 'INIT') {
        if (payload.recentMessages) setChatMessages(payload.recentMessages);
        if (payload.onlineCount) setOnlineUsersCount(payload.onlineCount);
      } else if (type === 'NEW_MESSAGE') {
        setChatMessages(prev => [...prev.slice(-99), payload]);
      } else if (type === 'ONLINE_COUNT') {
        setOnlineUsersCount(payload.count);
      } else if (type === 'MESSAGE_DELETED') {
        setChatMessages(prev => prev.filter(m => m.id !== payload.messageId));
      } else if (type === 'RATE_LIMITED') {
        showToast(t.chatRateLimitWarning);
      } else if (type === 'BANNED') {
        showToast(payload.reason || 'Account suspended');
      } else if (type === 'CONNECTION_CHANGE') {
        setSyncStatus(payload.isConnected ? 'online' : 'offline');
      }
    });

    return () => {
      unsubscribeChat();
      chatSocket.disconnect();
    };
  }, []);

  const loginAnonymous = async (username?: string, avatar?: string) => {
    try {
      setSyncStatus('syncing');
      const res = await api.createAnonymous(username, avatar);
      setUser(res.user);
      setSyncStatus('online');
      chatSocket.connect();
      navigateTo('onboarding');
      showToast(t.success);
    } catch (err: any) {
      showToast(err.message || t.error);
    }
  };

  const recoverAccount = async (recoveryKey: string) => {
    try {
      setSyncStatus('syncing');
      const res = await api.recoverAccount(recoveryKey);
      setUser(res.user);
      const chal = await api.getActiveChallenge();
      setActiveChallenge(chal);
      const entries = await api.getJournalEntries();
      setJournalEntries(entries);
      chatSocket.connect();
      setSyncStatus('online');
      navigateTo('dashboard');
      showToast(t.success);
    } catch (err: any) {
      showToast(err.message || t.error);
      throw err;
    }
  };

  const createChallenge = async (params: {
    habitCategory: HabitCategory;
    goal: string;
    durationDays: number;
    dailyBaseline?: number;
    quitGoal?: number;
    costEstimate?: number;
  }) => {
    try {
      setSyncStatus('syncing');
      const chal = await api.createChallenge(params);
      setActiveChallenge(chal);
      setSyncStatus('online');
      navigateTo('dashboard');
      showToast(t.taskCompletedSuccess);
    } catch (err: any) {
      showToast(err.message || t.error);
    }
  };

  const toggleTask = async (taskId: string) => {
    try {
      const updated = await api.toggleTask(taskId);
      setActiveChallenge(updated);
      showToast(t.taskCompletedSuccess);
    } catch (err: any) {
      showToast(err.message || t.error);
    }
  };

  const restartChallenge = async (reason?: string) => {
    try {
      setSyncStatus('syncing');
      const refreshed = await api.restartChallenge(reason);
      setActiveChallenge(refreshed);
      setSyncStatus('online');
      showToast(t.success);
    } catch (err: any) {
      showToast(err.message || t.error);
    }
  };

  const addJournal = async (entry: {
    title: string;
    content: string;
    mood: JournalEntry['mood'];
    cravingsIntensity: number;
    triggers: string[];
  }) => {
    try {
      const newEntry = await api.createJournalEntry(entry);
      setJournalEntries(prev => [newEntry, ...prev]);
      showToast(t.success);
    } catch (err: any) {
      showToast(err.message || t.error);
    }
  };

  const deleteJournal = async (id: string) => {
    try {
      await api.deleteJournalEntry(id);
      setJournalEntries(prev => prev.filter(j => j.id !== id));
      showToast(t.success);
    } catch (err: any) {
      showToast(err.message || t.error);
    }
  };

  const sendChat = (content: string) => {
    try {
      chatSocket.sendMessage(content);
    } catch (err: any) {
      showToast(err.message || t.error);
    }
  };

  const reportChat = async (messageId: string, reason: string, reportedUserId?: string) => {
    try {
      await api.reportMessage(messageId, reason, reportedUserId);
      showToast(t.modReportSuccess);
    } catch (err: any) {
      showToast(err.message || t.error);
    }
  };

  const exportData = async () => {
    try {
      const data = await api.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `khotwati-recovery-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast(t.success);
    } catch (err: any) {
      showToast(err.message || t.error);
    }
  };

  const deleteAccount = async () => {
    try {
      await api.deleteAccount();
      setUser(null);
      setActiveChallenge(null);
      setJournalEntries([]);
      chatSocket.disconnect();
      navigateTo('landing');
      showToast(t.success);
    } catch (err: any) {
      showToast(err.message || t.error);
    }
  };

  const refreshActiveChallenge = async () => {
    const chal = await api.getActiveChallenge();
    setActiveChallenge(chal);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        theme,
        currentView,
        user,
        activeChallenge,
        journalEntries,
        chatMessages,
        onlineUsersCount,
        syncStatus,
        toastMessage,
        t,
        isRtl,
        setLanguage,
        setTheme,
        navigateTo,
        showToast,
        loginAnonymous,
        recoverAccount,
        createChallenge,
        toggleTask,
        restartChallenge,
        addJournal,
        deleteJournal,
        sendChat,
        reportChat,
        exportData,
        deleteAccount,
        refreshActiveChallenge
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
