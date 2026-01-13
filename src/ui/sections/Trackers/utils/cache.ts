/**
 * Performance Utilities - Caching
 *
 * Provides TTL-based caching to reduce expensive recalculations.
 * Used for purpose detection, XP calculations, and other hot-path operations.
 *
 * Per .claude/rules/core.md:
 * - No external dependencies
 * - Performance-conscious
 * - Clean abstractions
 *
 * @module cache
 */

import type { TeamPurposeAnalysis } from '../../../../features/petTeam/logic/purpose';
import { detectTeamPurpose } from '../../../../features/petTeam/logic/purpose';
import type { PetTeam } from '../../../../features/petTeam/types';

// ─────────────────────────────────────────────────────────────────────────────
// Purpose Detection Cache
// ─────────────────────────────────────────────────────────────────────────────

interface CachedPurpose {
    result: TeamPurposeAnalysis;
    timestamp: number;
}

const PURPOSE_CACHE = new Map<string, CachedPurpose>();
const PURPOSE_CACHE_TTL = 5000; // 5 seconds (team composition doesn't change rapidly)

/**
 * Get team purpose with caching
 *
 * PERFORMANCE: Caches purpose detection results for 5 seconds.
 * Purpose detection involves analyzing all pets, their abilities, and mutations,
 * which is expensive when called repeatedly for the same team.
 *
 * @param team - Team to analyze
 * @returns Cached or freshly calculated purpose analysis
 *
 * @example
 * const purpose = getCachedTeamPurpose(team);
 * // Subsequent calls within 5s return cached result
 */
export function getCachedTeamPurpose(team: PetTeam): TeamPurposeAnalysis {
    const now = Date.now();
    const cached = PURPOSE_CACHE.get(team.id);

    // Return cached result if still valid
    if (cached && (now - cached.timestamp) < PURPOSE_CACHE_TTL) {
        return cached.result;
    }

    // Calculate and cache
    const result = detectTeamPurpose(team);
    PURPOSE_CACHE.set(team.id, {
        result,
        timestamp: now,
    });

    return result;
}

/**
 * Invalidate purpose cache for a specific team
 *
 * Call this when team composition changes (pets added/removed/swapped).
 *
 * @param teamId - Team ID to invalidate
 *
 * @example
 * // After modifying team
 * MGPetTeam.addPetToTeam(team.id, pet);
 * invalidatePurposeCache(team.id);
 */
export function invalidatePurposeCache(teamId: string): void {
    PURPOSE_CACHE.delete(teamId);
}

/**
 * Clear entire purpose cache
 *
 * Useful for testing or when global state changes.
 */
export function clearPurposeCache(): void {
    PURPOSE_CACHE.clear();
}

/**
 * Get cache statistics (for debugging)
 */
export function getPurposeCacheStats(): {
    size: number;
    entries: Array<{ teamId: string; age: number }>;
} {
    const now = Date.now();
    const entries = Array.from(PURPOSE_CACHE.entries()).map(([teamId, cached]) => ({
        teamId,
        age: now - cached.timestamp,
    }));

    return {
        size: PURPOSE_CACHE.size,
        entries,
    };
}
