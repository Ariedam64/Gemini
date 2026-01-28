/**
 * HarvestLocker types and configuration
 */

/**
 * Scale lock criteria configuration
 */
export interface ScaleLockCriteria {
    enabled: boolean;
    minPercentage: number; // 0-100 (e.g., 50 = lock if >= 50% of maxScale)
}

/**
 * Criteria for locking crops (global or per-species)
 */
export interface LockCriteria {
    lockByScale?: ScaleLockCriteria;
    lockedMutations?: string[]; // Mutation names to lock (e.g., ["Dawncharged", "Frozen"])
}

/**
 * HarvestLocker feature configuration
 */
export interface HarvestLockerConfig {
    enabled: boolean;

    // Manual locks (format: "slot-slotsIndex", e.g., "173-5")
    manualLocks: string[];

    // Global criteria applied to all species
    globalCriteria: {
        lockByScale: ScaleLockCriteria;
        lockedMutations: string[];
    };

    // Per-species overrides (takes precedence over global criteria)
    speciesOverrides: {
        [species: string]: LockCriteria;
    };
}

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: HarvestLockerConfig = {
    enabled: true,
    manualLocks: [],
    globalCriteria: {
        lockByScale: {
            enabled: false,
            minPercentage: 50,
        },
        lockedMutations: [],
    },
    speciesOverrides: {},
};
