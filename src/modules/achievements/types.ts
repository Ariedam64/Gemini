// src/modules/core/achievements/types.ts
// Achievement System Types

// ─────────────────────────────────────────────────────────────────────────────
// Core Types
// ─────────────────────────────────────────────────────────────────────────────

export type AchievementCategory =
  | 'crops'
  | 'pets'
  | 'coins'
  | 'social'
  | 'collection'
  | 'special';

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface AchievementProgress {
  current: number;
  target: number;
  percentage: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  icon?: string;
  hidden?: boolean; // Hidden until unlocked

  // Progress tracking
  target: number;
  checkProgress: () => Promise<number>;

  // Rewards
  coinReward?: number;
  itemReward?: { itemId: string; quantity: number };
}

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: number;
  progress: AchievementProgress;
}

export interface AchievementData {
  unlocked: Record<string, UnlockedAchievement>;
  progress: Record<string, AchievementProgress>;
}

export interface AchievementCheckResult {
  id: string;
  wasUnlocked: boolean;
  isUnlocked: boolean;
  progress: AchievementProgress;
}

// ─────────────────────────────────────────────────────────────────────────────
// Event Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AchievementUnlockedEvent {
  achievement: Achievement;
  unlockedAt: number;
  progress: AchievementProgress;
}

export interface AchievementProgressEvent {
  achievement: Achievement;
  progress: AchievementProgress;
  previousProgress: AchievementProgress;
}

export type AchievementEventCallback = (event: AchievementUnlockedEvent) => void;
export type ProgressEventCallback = (event: AchievementProgressEvent) => void;