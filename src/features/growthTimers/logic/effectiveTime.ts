/**
 * Effective Growth Time Calculator
 *
 * Calculates boosted growth times and progress percentages
 * based on pet ability contributions.
 *
 * Per .claude/rules/core.md:
 * - No hardcoded game data
 * - Pure functions for testability
 * - No side effects
 *
 * @module effectiveTime
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface EffectiveGrowthResult {
    /** Boosted remaining time in milliseconds */
    effectiveTimeMs: number;
    /** Boosted progress percentage (0-99) */
    effectiveProgressPercent: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/** Proc interval in minutes (game standard: 10 minutes between procs) */
const PROC_INTERVAL_MINUTES = 10;
const PROC_INTERVAL_MS = PROC_INTERVAL_MINUTES * 60 * 1000;

// ─────────────────────────────────────────────────────────────────────────────
// Core Calculation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate effective growth time and progress with boost applied
 *
 * Game mechanics:
 * - Every 10 minutes (proc interval), the item progresses by 10 minutes
 * - If pet has +X min/proc boost, each proc adds EXTRA X minutes of progress
 * - So each proc effectively advances by (10 + X) minutes instead of 10
 *
 * Formula:
 * - progressPerProc = 10 + boostMinPerProc (e.g., 10+5=15 for Peacock)
 * - speedMultiplier = progressPerProc / 10 (e.g., 15/10 = 1.5x faster)
 * - effectiveTimeMs = rawRemainingMs / speedMultiplier
 * - effectiveProgress = time elapsed as percent of effective total
 *
 * @param rawRemainingMs - Raw remaining time from game (endTime - now)
 * @param totalGrowthMs - Total growth time for this item type
 * @param boostMinPerProc - Minutes added per proc (e.g., 5 for Peacock)
 * @returns Effective time and progress with boost applied
 */
export function calculateEffectiveGrowth(
    rawRemainingMs: number,
    totalGrowthMs: number,
    boostMinPerProc: number
): EffectiveGrowthResult {
    // No boost case - return raw values
    if (boostMinPerProc <= 0 || totalGrowthMs <= 0) {
        const rawElapsed = totalGrowthMs - rawRemainingMs;
        const rawProgress = Math.max(0, Math.min(99,
            Math.round((rawElapsed / totalGrowthMs) * 100)
        ));
        return {
            effectiveTimeMs: rawRemainingMs,
            effectiveProgressPercent: rawProgress
        };
    }

    // Calculate speed multiplier from boost
    // With +5min/proc boost, each 10min proc gives 15min progress = 1.5x speed
    const baseProgressPerProc = PROC_INTERVAL_MINUTES; // 10 min
    const boostedProgressPerProc = baseProgressPerProc + boostMinPerProc;
    const speedMultiplier = boostedProgressPerProc / baseProgressPerProc;

    // Effective remaining time = raw time / speed multiplier
    const effectiveTimeMs = Math.max(0, Math.round(rawRemainingMs / speedMultiplier));

    // Calculate effective progress
    // Effective total time = raw total / speed multiplier
    const effectiveTotalMs = Math.max(1, totalGrowthMs / speedMultiplier);
    const effectiveElapsedMs = effectiveTotalMs - effectiveTimeMs;
    const effectiveProgressPercent = Math.max(0, Math.min(99,
        Math.round((effectiveElapsedMs / effectiveTotalMs) * 100)
    ));

    return {
        effectiveTimeMs,
        effectiveProgressPercent
    };
}

/**
 * Calculate effective growth for a single item with simple params
 *
 * @param startTime - When the item started growing (timestamp)
 * @param endTime - When the item will be ready (timestamp)
 * @param now - Current timestamp
 * @param boostMinPerProc - Minutes reduced per proc
 * @returns Effective time and progress
 */
export function calculateItemEffectiveGrowth(
    startTime: number,
    endTime: number,
    now: number,
    boostMinPerProc: number
): EffectiveGrowthResult {
    const totalGrowthMs = endTime - startTime;
    const rawRemainingMs = Math.max(0, endTime - now);

    return calculateEffectiveGrowth(rawRemainingMs, totalGrowthMs, boostMinPerProc);
}

/**
 * Calculate average effective progress for multiple items
 *
 * @param items - Array of items with start/end times
 * @param now - Current timestamp
 * @param boostMinPerProc - Minutes reduced per proc
 * @returns Average effective progress percentage
 */
export function calculateAverageEffectiveProgress(
    items: Array<{ startTime: number; endTime: number }>,
    now: number,
    boostMinPerProc: number
): number {
    if (items.length === 0) return 0;

    const totalProgress = items.reduce((sum, item) => {
        const result = calculateItemEffectiveGrowth(
            item.startTime,
            item.endTime,
            now,
            boostMinPerProc
        );
        return sum + result.effectiveProgressPercent;
    }, 0);

    return Math.round(totalProgress / items.length);
}

/**
 * Calculate average effective progress for eggs (uses plantedAt/maturedAt)
 *
 * @param eggs - Array of eggs with plantedAt/maturedAt
 * @param now - Current timestamp
 * @param boostMinPerProc - Minutes reduced per proc
 * @returns Average effective progress percentage
 */
export function calculateAverageEffectiveProgressEggs(
    eggs: Array<{ plantedAt: number; maturedAt: number }>,
    now: number,
    boostMinPerProc: number
): number {
    if (eggs.length === 0) return 0;

    const totalProgress = eggs.reduce((sum, egg) => {
        const result = calculateItemEffectiveGrowth(
            egg.plantedAt,
            egg.maturedAt,
            now,
            boostMinPerProc
        );
        return sum + result.effectiveProgressPercent;
    }, 0);

    return Math.round(totalProgress / eggs.length);
}
