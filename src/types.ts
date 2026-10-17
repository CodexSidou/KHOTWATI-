export type Language = 'ar' | 'fr' | 'en';
export type Theme = 'dark' | 'light';

export type ViewType =
  | 'landing'
  | 'onboarding'
  | 'auth'
  | 'dashboard'
  | 'challenge_select'
  | 'challenge_detail'
  | 'daily_tasks'
  | 'analytics'
  | 'achievements'
  | 'craving_toolkit'
  | 'journal'
  | 'public_chat'
  | 'reminders'
  | 'profile'
  | 'privacy'
  | 'recovery'
  | 'settings'
  | 'educational'
  | 'community_rules'
  | 'moderation'
  | 'data_export'
  | 'offline_fallback'
  | 'not_found';

export type UserRole = 'user' | 'moderator' | 'admin';

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  role: UserRole;
  hasRecoveryKey?: boolean;
  createdAt: string;
  lastActiveAt?: string;
}

export type HabitCategory =
  | 'smoking'
  | 'nicotine_vaping'
  | 'alcohol'
  | 'cannabis'
  | 'other_substances'
  | 'excessive_gaming'
  | 'social_media'
  | 'repetitive_habits'
  | 'custom';

export interface DailyTask {
  id: string;
  day: number;
  titleKey: string;
  descKey: string;
  customTitle?: string;
  category: HabitCategory;
  isCompleted: boolean;
  completedAt?: string;
  isSkipped?: boolean;
  skipReason?: string;
  isCustom?: boolean;
}

export interface ChallengeHistoryEntry {
  challengeId: string;
  startDate: string;
  endDate?: string;
  goal: string;
  daysCompleted: number;
  totalDays: number;
  restartReason?: string;
  notes?: string;
}

export interface Challenge {
  id: string;
  userId: string;
  habitCategory: HabitCategory;
  goal: string;
  durationDays: number;
  startDate: string;
  activeDay: number;
  status: 'active' | 'completed' | 'abandoned' | 'restarted';
  currentStreak: number;
  bestStreak: number;
  dailyBaseline?: number;
  quitGoal?: number;
  costEstimate?: number;
  currency?: string;
  tasks: DailyTask[];
  history: ChallengeHistoryEntry[];
  notes?: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: 'peaceful' | 'calm' | 'anxious' | 'struggling' | 'determined';
  cravingsIntensity: number; // 1-10
  triggers: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  createdAt: string;
  isDeleted: boolean;
  reportsCount: number;
}

export interface ReminderConfig {
  dailyTaskReminder: boolean;
  dailyTaskTime: string; // e.g. "09:00"
  eveningCheckIn: boolean;
  eveningCheckInTime: string; // e.g. "21:00"
  quietHoursEnabled: boolean;
  quietHoursStart: string; // "22:00"
  quietHoursEnd: string; // "07:00"
  browserPushGranted: boolean;
}

export type SyncStatus = 'online' | 'syncing' | 'offline' | 'local_only';
