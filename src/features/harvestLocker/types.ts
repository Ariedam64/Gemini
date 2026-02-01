/**
 * HarvestLocker types and configuration
 */

/**
 * Rule mode: allow (whitelist) or lock (blacklist)
 * - allow: Only harvest plants matching conditions
 * - lock: Never harvest plants matching conditions
 */
export type RuleMode = 'allow' | 'lock';

/**
 * Mutation matching mode
 * - any: Match if plant has ANY of the mutations (OR logic)
 * - all: Match if plant has ALL of the mutations (AND logic)
 */
export type MutationMatchMode = 'any' | 'all';

/**
 * Size condition for harvest rules
 */
export interface SizeCondition {
    enabled: boolean;
    minPercentage: number; // 0-100 (e.g., 50 = match if >= 50% of maxScale)
}

/**
 * Mutation condition for harvest rules
 */
export interface MutationCondition {
    enabled: boolean;
    mutations: string[]; // Mutation names (e.g., ["Dawncharged", "Frozen"])
    matchMode: MutationMatchMode; // 'any' or 'all'
}

/**
 * Harvest rule definition
 */
export interface HarvestRule {
    id: string; // Unique rule ID (UUID)
    name: string; // User-friendly name
    enabled: boolean; // Quick toggle
    mode: RuleMode; // 'allow' or 'lock'

    // Conditions (at least one should be enabled)
    sizeCondition?: SizeCondition;
    mutationCondition?: MutationCondition;
}

/**
 * HarvestLocker feature configuration
 */
export interface HarvestLockerConfig {
    enabled: boolean;

    // Manual locks (format: "slot-slotsIndex", e.g., "173-5")
    // Kept for backward compatibility and manual override
    manualLocks: string[];

    // Overall rules (apply to all species unless overridden)
    overallRules: HarvestRule[];

    // Per-species rules (override overall rules for that species)
    speciesRules: {
        [species: string]: HarvestRule[];
    };
}

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: HarvestLockerConfig = {
    enabled: true,
    manualLocks: [],
    overallRules: [],
    speciesRules: {},
};

/* ────────────────── Legacy Types (Deprecated) ────────────────── */
// Kept for migration only

/**
 * @deprecated Use HarvestRule instead
 */
export interface ScaleLockCriteria {
    enabled: boolean;
    minPercentage: number;
}

/**
 * @deprecated Use HarvestRule instead
 */
export interface LockCriteria {
    lockByScale?: ScaleLockCriteria;
    lockedMutations?: string[];
}

/**
 * @deprecated Old config format - will be migrated automatically
 */
export interface LegacyHarvestLockerConfig {
    enabled: boolean;
    manualLocks: string[];
    globalCriteria: {
        lockByScale: ScaleLockCriteria;
        lockedMutations: string[];
    };
    speciesOverrides: {
        [species: string]: LockCriteria;
    };
}
