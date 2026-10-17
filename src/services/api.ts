import { UserProfile, Challenge, JournalEntry, ChatMessage, HabitCategory } from '../types';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000/api';

const TOKEN_KEY = 'khotwati_auth_token';
const USER_KEY = 'khotwati_user_profile';
const CHALLENGE_KEY = 'khotwati_active_challenge';
const JOURNAL_KEY = 'khotwati_journal_entries';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({ error: 'Network error or invalid server response' }));
    throw new Error(errorJson.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Check backend health
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(3000) });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Auth: Anonymous creation
  async createAnonymous(username?: string, avatar?: string): Promise<{ user: UserProfile; token: string }> {
    try {
      const res = await request<{ user: UserProfile; token: string }>('/auth/anonymous', {
        method: 'POST',
        body: JSON.stringify({ username, avatar })
      });
      setStoredToken(res.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      return res;
    } catch (err) {
      console.warn('[API] Backend unavailable, running in local-first mode:', err);
      // Fallback local-first user
      const localUser: UserProfile = {
        id: `local-${Date.now()}`,
        username: username || `Amal-${Math.floor(100 + Math.random() * 900)}`,
        avatar: avatar || 'avatar-step',
        role: 'user',
        hasRecoveryKey: false,
        createdAt: new Date().toISOString()
      };
      const localToken = `local-token-${Date.now()}`;
      setStoredToken(localToken);
      localStorage.setItem(USER_KEY, JSON.stringify(localUser));
      return { user: localUser, token: localToken };
    }
  },

  // Auth: Current user info
  async getMe(): Promise<{ user: UserProfile } | null> {
    try {
      const res = await request<{ user: UserProfile }>('/auth/me');
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      return res;
    } catch (err) {
      // Local fallback
      const cached = localStorage.getItem(USER_KEY);
      if (cached) {
        return { user: JSON.parse(cached) };
      }
      return null;
    }
  },

  // Auth: Generate recovery key
  async generateRecoveryKey(): Promise<{ recoveryKey: string }> {
    try {
      return await request<{ recoveryKey: string }>('/auth/generate-recovery-key', { method: 'POST' });
    } catch {
      // Fallback mock key for local-first mode
      const localKey = 'KHOT-WATI-RECO-VERY';
      return { recoveryKey: localKey };
    }
  },

  // Auth: Recover account
  async recoverAccount(recoveryKey: string): Promise<{ user: UserProfile; token: string }> {
    const res = await request<{ user: UserProfile; token: string }>('/auth/recover', {
      method: 'POST',
      body: JSON.stringify({ recoveryKey })
    });
    setStoredToken(res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    return res;
  },

  // Auth: Export data
  async exportData(): Promise<any> {
    try {
      return await request<any>('/auth/export-data');
    } catch {
      // Local-first export
      const user = JSON.parse(localStorage.getItem(USER_KEY) || 'null');
      const challenge = JSON.parse(localStorage.getItem(CHALLENGE_KEY) || 'null');
      const journals = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
      return {
        exportedAt: new Date().toISOString(),
        isLocalExport: true,
        user,
        challenges: challenge ? [challenge] : [],
        journalEntries: journals
      };
    }
  },

  // Auth: Delete account
  async deleteAccount(): Promise<void> {
    try {
      await request('/auth/delete-account', { method: 'DELETE' });
    } catch (err) {
      console.warn('[API] Server delete failed, clearing local storage:', err);
    }
    clearStoredToken();
    localStorage.removeItem(CHALLENGE_KEY);
    localStorage.removeItem(JOURNAL_KEY);
  },

  // Challenges: Get active
  async getActiveChallenge(): Promise<Challenge | null> {
    try {
      const res = await request<{ challenge: Challenge | null }>('/challenges/active');
      if (res.challenge) {
        localStorage.setItem(CHALLENGE_KEY, JSON.stringify(res.challenge));
      }
      return res.challenge;
    } catch {
      const cached = localStorage.getItem(CHALLENGE_KEY);
      return cached ? JSON.parse(cached) : null;
    }
  },

  // Challenges: Create
  async createChallenge(params: {
    habitCategory: HabitCategory;
    goal: string;
    durationDays: number;
    dailyBaseline?: number;
    quitGoal?: number;
    costEstimate?: number;
  }): Promise<Challenge> {
    try {
      const res = await request<{ challenge: Challenge }>('/challenges/create', {
        method: 'POST',
        body: JSON.stringify(params)
      });
      localStorage.setItem(CHALLENGE_KEY, JSON.stringify(res.challenge));
      return res.challenge;
    } catch {
      // Local-first fallback challenge
      const now = new Date().toISOString();
      const localChal: Challenge = {
        id: `chal-local-${Date.now()}`,
        userId: 'local-user',
        habitCategory: params.habitCategory,
        goal: params.goal,
        durationDays: params.durationDays,
        startDate: now,
        activeDay: 1,
        status: 'active',
        currentStreak: 0,
        bestStreak: 0,
        dailyBaseline: params.dailyBaseline || 0,
        quitGoal: params.quitGoal || 0,
        costEstimate: params.costEstimate || 0,
        currency: 'USD',
        tasks: Array.from({ length: params.durationDays }, (_, i) => ({
          id: `task-local-${i + 1}`,
          day: i + 1,
          titleKey: 'task_smoke_triggers',
          descKey: 'task_smoke_triggers_desc',
          category: params.habitCategory,
          isCompleted: false
        })),
        history: [],
        isArchived: false,
        createdAt: now,
        updatedAt: now
      };
      localStorage.setItem(CHALLENGE_KEY, JSON.stringify(localChal));
      return localChal;
    }
  },

  // Challenges: Toggle Task
  async toggleTask(taskId: string): Promise<Challenge> {
    try {
      const res = await request<{ challenge: Challenge }>(`/challenges/tasks/${taskId}/toggle`, {
        method: 'POST'
      });
      localStorage.setItem(CHALLENGE_KEY, JSON.stringify(res.challenge));
      return res.challenge;
    } catch {
      // Local-first toggle
      const cached = localStorage.getItem(CHALLENGE_KEY);
      if (cached) {
        const chal: Challenge = JSON.parse(cached);
        const task = chal.tasks.find(t => t.id === taskId);
        if (task) {
          task.isCompleted = !task.isCompleted;
          task.completedAt = task.isCompleted ? new Date().toISOString() : undefined;
          const completedCount = chal.tasks.filter(t => t.isCompleted).length;
          chal.currentStreak = completedCount;
          if (chal.currentStreak > chal.bestStreak) chal.bestStreak = chal.currentStreak;
          localStorage.setItem(CHALLENGE_KEY, JSON.stringify(chal));
          return chal;
        }
      }
      throw new Error('Task not found in local challenge');
    }
  },

  // Challenges: Restart
  async restartChallenge(restartReason?: string): Promise<Challenge> {
    try {
      const res = await request<{ challenge: Challenge }>('/challenges/restart', {
        method: 'POST',
        body: JSON.stringify({ restartReason })
      });
      localStorage.setItem(CHALLENGE_KEY, JSON.stringify(res.challenge));
      return res.challenge;
    } catch {
      const cached = localStorage.getItem(CHALLENGE_KEY);
      if (cached) {
        const chal: Challenge = JSON.parse(cached);
        const historyEntry = {
          challengeId: chal.id,
          startDate: chal.startDate,
          endDate: new Date().toISOString(),
          goal: chal.goal,
          daysCompleted: chal.currentStreak,
          totalDays: chal.durationDays,
          restartReason: restartReason || 'User restarted'
        };
        chal.history = [...(chal.history || []), historyEntry];
        chal.startDate = new Date().toISOString();
        chal.activeDay = 1;
        chal.currentStreak = 0;
        chal.tasks.forEach(t => { t.isCompleted = false; t.completedAt = undefined; });
        localStorage.setItem(CHALLENGE_KEY, JSON.stringify(chal));
        return chal;
      }
      throw new Error('No challenge to restart');
    }
  },

  // Journal: Get entries
  async getJournalEntries(): Promise<JournalEntry[]> {
    try {
      const res = await request<{ entries: JournalEntry[] }>('/journal');
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(res.entries));
      return res.entries;
    } catch {
      const cached = localStorage.getItem(JOURNAL_KEY);
      return cached ? JSON.parse(cached) : [];
    }
  },

  // Journal: Create entry
  async createJournalEntry(entry: {
    title: string;
    content: string;
    mood: JournalEntry['mood'];
    cravingsIntensity: number;
    triggers: string[];
  }): Promise<JournalEntry> {
    try {
      const res = await request<{ entry: JournalEntry }>('/journal', {
        method: 'POST',
        body: JSON.stringify(entry)
      });
      const current = await this.getJournalEntries();
      localStorage.setItem(JOURNAL_KEY, JSON.stringify([res.entry, ...current]));
      return res.entry;
    } catch {
      const now = new Date().toISOString();
      const localEntry: JournalEntry = {
        id: `jnl-local-${Date.now()}`,
        userId: 'local-user',
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        cravingsIntensity: entry.cravingsIntensity,
        triggers: entry.triggers,
        createdAt: now,
        updatedAt: now
      };
      const current = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
      const updated = [localEntry, ...current];
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
      return localEntry;
    }
  },

  // Journal: Delete entry
  async deleteJournalEntry(id: string): Promise<void> {
    try {
      await request(`/journal/${id}`, { method: 'DELETE' });
    } catch {
      // Local delete
    }
    const current = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
    const updated = current.filter((j: JournalEntry) => j.id !== id);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
  },

  // Chat: Get recent messages
  async getChatMessages(): Promise<{ messages: ChatMessage[]; onlineCount: number }> {
    return request<{ messages: ChatMessage[]; onlineCount: number }>('/chat/messages');
  },

  // Chat: Report message
  async reportMessage(messageId: string, reason: string, reportedUserId?: string): Promise<void> {
    await request('/chat/report', {
      method: 'POST',
      body: JSON.stringify({ messageId, reason, reportedUserId })
    });
  },

  // Moderation: Delete message
  async deleteChatMessage(messageId: string, reason?: string): Promise<void> {
    await request('/chat/moderate/delete', {
      method: 'POST',
      body: JSON.stringify({ messageId, reason })
    });
  },

  // Moderation: Ban user
  async banUser(targetUserId: string, reason?: string): Promise<void> {
    await request('/chat/moderate/ban', {
      method: 'POST',
      body: JSON.stringify({ targetUserId, reason })
    });
  }
};
