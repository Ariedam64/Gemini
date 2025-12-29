// src/modules/achievements/manager.ts
// Achievement Manager - Core achievement tracking system

import type {
  Achievement,
  AchievementData,
  AchievementProgress,
  AchievementCheckResult,
  UnlockedAchievement,
  AchievementEventCallback,
  ProgressEventCallback,
  AchievementCategory,
  AchievementRarity,
} from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Achievement Manager Class
// ─────────────────────────────────────────────────────────────────────────────

export class AchievementManager {
  private achievements = new Map<string, Achievement>();
  private data: AchievementData;
  private storageKey = 'gemini_achievements';
  private onUnlockCallbacks: AchievementEventCallback[] = [];
  private onProgressCallbacks: ProgressEventCallback[] = [];

  constructor() {
    this.data = this.loadData();
  }

  /**
   * Load achievement data from localStorage
   */
  private loadData(): AchievementData {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('[Achievements] Failed to load data:', err);
    }

    return {
      unlocked: {},
      progress: {},
    };
  }

  /**
   * Save achievement data to localStorage
   */
  private saveData(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (err) {
      console.warn('[Achievements] Failed to save data:', err);
    }
  }

  /**
   * Register a new achievement
   */
  register(achievement: Achievement): void {
    this.achievements.set(achievement.id, achievement);

    // Initialize progress if not exists
    if (!this.data.progress[achievement.id]) {
      this.data.progress[achievement.id] = {
        current: 0,
        target: achievement.target,
        percentage: 0,
      };
    }
  }

  /**
   * Register multiple achievements
   */
  registerMany(achievements: Achievement[]): void {
    for (const achievement of achievements) {
      this.register(achievement);
    }
  }

  /**
   * Check progress for a specific achievement
   */
  async checkAchievement(achievementId: string): Promise<AchievementCheckResult> {
    const achievement = this.achievements.get(achievementId);
    if (!achievement) {
      throw new Error(`Achievement not found: ${achievementId}`);
    }

    const wasUnlocked = this.isUnlocked(achievementId);

    // Get current progress
    const current = await achievement.checkProgress();
    const progress: AchievementProgress = {
      current,
      target: achievement.target,
      percentage: Math.min(100, Math.floor((current / achievement.target) * 100)),
    };

    // Store previous progress
    const previousProgress = this.data.progress[achievementId];

    // Update progress
    this.data.progress[achievementId] = progress;

    // Check if unlocked
    const isUnlocked = current >= achievement.target;

    // Trigger unlock if newly unlocked
    if (!wasUnlocked && isUnlocked) {
      this.unlock(achievementId, progress);
    } else if (!isUnlocked) {
      // Trigger progress event
      this.triggerProgressCallbacks({
        achievement,
        progress,
        previousProgress,
      });
    }

    this.saveData();

    return {
      id: achievementId,
      wasUnlocked,
      isUnlocked,
      progress,
    };
  }

  /**
   * Check progress for all achievements
   */
  async checkAllAchievements(): Promise<AchievementCheckResult[]> {
    const results: AchievementCheckResult[] = [];

    for (const achievementId of this.achievements.keys()) {
      const result = await this.checkAchievement(achievementId);
      results.push(result);
    }

    return results;
  }

  /**
   * Unlock an achievement
   */
  private unlock(achievementId: string, progress: AchievementProgress): void {
    const achievement = this.achievements.get(achievementId);
    if (!achievement) return;

    const unlocked: UnlockedAchievement = {
      achievementId,
      unlockedAt: Date.now(),
      progress,
    };

    this.data.unlocked[achievementId] = unlocked;
    this.saveData();

    // Trigger callbacks
    this.triggerUnlockCallbacks({
      achievement,
      unlockedAt: unlocked.unlockedAt,
      progress,
    });
  }

  /**
   * Check if an achievement is unlocked
   */
  isUnlocked(achievementId: string): boolean {
    return !!this.data.unlocked[achievementId];
  }

  /**
   * Get achievement by ID
   */
  getAchievement(achievementId: string): Achievement | null {
    return this.achievements.get(achievementId) || null;
  }

  /**
   * Get all achievements
   */
  getAllAchievements(): Achievement[] {
    return Array.from(this.achievements.values());
  }

  /**
   * Get achievements by category
   */
  getAchievementsByCategory(category: AchievementCategory): Achievement[] {
    return Array.from(this.achievements.values()).filter(
      a => a.category === category
    );
  }

  /**
   * Get achievements by rarity
   */
  getAchievementsByRarity(rarity: AchievementRarity): Achievement[] {
    return Array.from(this.achievements.values()).filter(
      a => a.rarity === rarity
    );
  }

  /**
   * Get unlocked achievements
   */
  getUnlockedAchievements(): UnlockedAchievement[] {
    return Object.values(this.data.unlocked);
  }

  /**
   * Get locked achievements
   */
  getLockedAchievements(): Achievement[] {
    return Array.from(this.achievements.values()).filter(
      a => !this.isUnlocked(a.id) && !a.hidden
    );
  }

  /**
   * Get achievement progress
   */
  getProgress(achievementId: string): AchievementProgress | null {
    return this.data.progress[achievementId] || null;
  }

  /**
   * Get completion percentage
   */
  getCompletionPercentage(): number {
    const total = this.achievements.size;
    const unlocked = Object.keys(this.data.unlocked).length;
    return total > 0 ? Math.floor((unlocked / total) * 100) : 0;
  }

  /**
   * Get completion stats
   */
  getCompletionStats(): {
    total: number;
    unlocked: number;
    locked: number;
    percentage: number;
  } {
    const total = this.achievements.size;
    const unlocked = Object.keys(this.data.unlocked).length;
    const locked = total - unlocked;
    const percentage = this.getCompletionPercentage();

    return { total, unlocked, locked, percentage };
  }

  /**
   * Subscribe to achievement unlocks
   */
  onUnlock(callback: AchievementEventCallback): () => void {
    this.onUnlockCallbacks.push(callback);
    return () => {
      const index = this.onUnlockCallbacks.indexOf(callback);
      if (index !== -1) {
        this.onUnlockCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Subscribe to achievement progress updates
   */
  onProgress(callback: ProgressEventCallback): () => void {
    this.onProgressCallbacks.push(callback);
    return () => {
      const index = this.onProgressCallbacks.indexOf(callback);
      if (index !== -1) {
        this.onProgressCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Trigger unlock callbacks
   */
  private triggerUnlockCallbacks(event: Parameters<AchievementEventCallback>[0]): void {
    for (const callback of this.onUnlockCallbacks) {
      try {
        callback(event);
      } catch (err) {
        console.warn('[Achievements] Unlock callback error:', err);
      }
    }
  }

  /**
   * Trigger progress callbacks
   */
  private triggerProgressCallbacks(event: Parameters<ProgressEventCallback>[0]): void {
    for (const callback of this.onProgressCallbacks) {
      try {
        callback(event);
      } catch (err) {
        console.warn('[Achievements] Progress callback error:', err);
      }
    }
  }

  /**
   * Reset all achievement progress
   */
  reset(): void {
    this.data = {
      unlocked: {},
      progress: {},
    };

    // Reinitialize progress for all registered achievements
    for (const achievement of this.achievements.values()) {
      this.data.progress[achievement.id] = {
        current: 0,
        target: achievement.target,
        percentage: 0,
      };
    }

    this.saveData();
  }

  /**
   * Export achievement data
   */
  exportData(): string {
    return JSON.stringify(this.data, null, 2);
  }

  /**
   * Import achievement data
   */
  importData(json: string): boolean {
    try {
      const imported = JSON.parse(json);
      this.data = imported;
      this.saveData();
      return true;
    } catch (err) {
      console.warn('[Achievements] Failed to import data:', err);
      return false;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Singleton instance
// ─────────────────────────────────────────────────────────────────────────────

let instance: AchievementManager | null = null;

/**
 * Get the singleton AchievementManager instance
 */
export function getAchievementManager(): AchievementManager {
  if (!instance) {
    instance = new AchievementManager();
  }
  return instance;
}

/**
 * Destroy the singleton instance
 */
export function destroyAchievementManager(): void {
  if (instance) {
    instance = null;
  }
}