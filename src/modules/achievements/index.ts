/**
 * Achievements Module - Public API
 * 
 * Provides achievement tracking and unlocking system.
 * 
 * @module MGAchievements
 */

// Types
export * from './types';

// Internal
import { AchievementManager, getAchievementManager, destroyAchievementManager } from './manager';

// ─────────────────────────────────────────────────────────────────────────────
// Module State
// ─────────────────────────────────────────────────────────────────────────────

let initialized = false;

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Achievements Module
 * @module MGAchievements
 */
export const MGAchievements = {
    // ─── Required Module API ───

    /**
     * Initialize the Achievements module
     * Idempotent: safe to call multiple times
     */
    init(): void {
        if (initialized) return;
        // Manager is lazily instantiated via getAchievementManager()
        getAchievementManager();
        initialized = true;
        console.log('✅ [MGAchievements] Initialized');
    },

    /**
     * Check if module is ready/initialized
     */
    isReady(): boolean {
        return initialized;
    },

    // ─── Manager Access ───

    /**
     * Get the AchievementManager instance
     */
    getManager(): AchievementManager {
        return getAchievementManager();
    },

    // ─── Convenience Methods (delegate to manager) ───

    /**
     * Register a new achievement
     */
    register: (...args: Parameters<AchievementManager['register']>) =>
        getAchievementManager().register(...args),

    /**
     * Register multiple achievements
     */
    registerMany: (...args: Parameters<AchievementManager['registerMany']>) =>
        getAchievementManager().registerMany(...args),

    /**
     * Check if an achievement is unlocked
     */
    isUnlocked: (...args: Parameters<AchievementManager['isUnlocked']>) =>
        getAchievementManager().isUnlocked(...args),

    /**
     * Get all achievements
     */
    getAll: () => getAchievementManager().getAllAchievements(),

    /**
     * Get unlocked achievements
     */
    getUnlocked: () => getAchievementManager().getUnlockedAchievements(),

    /**
     * Get completion stats
     */
    getStats: () => getAchievementManager().getCompletionStats(),

    /**
     * Check progress for all achievements
     */
    checkAll: () => getAchievementManager().checkAllAchievements(),

    /**
     * Subscribe to achievement unlocks
     */
    onUnlock: (...args: Parameters<AchievementManager['onUnlock']>) =>
        getAchievementManager().onUnlock(...args),

    /**
     * Subscribe to achievement progress
     */
    onProgress: (...args: Parameters<AchievementManager['onProgress']>) =>
        getAchievementManager().onProgress(...args),

    /**
     * Cleanup module resources
     */
    destroy(): void {
        destroyAchievementManager();
        initialized = false;
    },
} as const;

// ─── Backward Compatibility ───

/**
 * @deprecated Use MGAchievements instead
 */
export { AchievementManager, getAchievementManager, destroyAchievementManager };