/**
 * HarvestLocker state management
 */

import { storageGet, storageSet, KEYS } from '../../utils/storage';
import type { HarvestLockerConfig, HarvestRule, LegacyHarvestLockerConfig } from './types';
import { DEFAULT_CONFIG } from './types';

/**
 * Generate unique rule ID
 */
function generateRuleId(): string {
    return `rule-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Migrate legacy config to new rule-based format
 */
function migrateLegacyConfig(legacy: LegacyHarvestLockerConfig): HarvestLockerConfig {
    const config: HarvestLockerConfig = {
        enabled: legacy.enabled,
        manualLocks: legacy.manualLocks || [],
        overallRules: [],
        speciesRules: {},
    };

    // Migrate global criteria to overall rules
    const hasScaleLock = legacy.globalCriteria?.lockByScale?.enabled;
    const hasMutationLock = (legacy.globalCriteria?.lockedMutations?.length ?? 0) > 0;

    if (hasScaleLock || hasMutationLock) {
        const rule: HarvestRule = {
            id: generateRuleId(),
            name: 'Migrated Global Rule',
            enabled: true,
            mode: 'lock', // Legacy was always lock mode
            sizeCondition: hasScaleLock ? {
                enabled: true,
                minPercentage: legacy.globalCriteria.lockByScale.minPercentage,
            } : undefined,
            mutationCondition: hasMutationLock ? {
                enabled: true,
                mutations: legacy.globalCriteria.lockedMutations,
                matchMode: 'any', // Default to 'any' for legacy
            } : undefined,
        };
        config.overallRules.push(rule);
    }

    // Migrate species overrides to species rules
    if (legacy.speciesOverrides) {
        for (const [species, criteria] of Object.entries(legacy.speciesOverrides)) {
            const hasScale = criteria.lockByScale?.enabled;
            const hasMutations = (criteria.lockedMutations?.length ?? 0) > 0;

            if (hasScale || hasMutations) {
                const rule: HarvestRule = {
                    id: generateRuleId(),
                    name: `Migrated ${species} Rule`,
                    enabled: true,
                    mode: 'lock',
                    sizeCondition: hasScale ? {
                        enabled: true,
                        minPercentage: criteria.lockByScale!.minPercentage,
                    } : undefined,
                    mutationCondition: hasMutations ? {
                        enabled: true,
                        mutations: criteria.lockedMutations!,
                        matchMode: 'any',
                    } : undefined,
                };
                config.speciesRules[species] = [rule];
            }
        }
    }

    console.log('[HarvestLocker] Migrated legacy config to new format');
    return config;
}

/**
 * Check if config is legacy format
 */
function isLegacyConfig(config: unknown): config is LegacyHarvestLockerConfig {
    const c = config as LegacyHarvestLockerConfig;
    return (
        c !== null &&
        typeof c === 'object' &&
        'globalCriteria' in c &&
        !('overallRules' in c)
    );
}

/**
 * Load configuration from storage
 */
export function loadConfig(): HarvestLockerConfig {
    const stored = storageGet<HarvestLockerConfig | LegacyHarvestLockerConfig>(
        KEYS.FEATURE.HARVEST_LOCKER,
        DEFAULT_CONFIG
    );

    // Migrate legacy config if needed
    if (isLegacyConfig(stored)) {
        const migrated = migrateLegacyConfig(stored);
        saveConfig(migrated); // Save migrated config
        return migrated;
    }

    // Merge with defaults to handle missing properties
    return {
        ...DEFAULT_CONFIG,
        ...stored,
        manualLocks: stored.manualLocks || [],
        overallRules: stored.overallRules || [],
        speciesRules: stored.speciesRules || {},
    };
}

/**
 * Save configuration to storage
 */
export function saveConfig(config: HarvestLockerConfig): void {
    storageSet(KEYS.FEATURE.HARVEST_LOCKER, config);
}

/**
 * Update configuration (partial update + save)
 */
export function updateConfig(updates: Partial<HarvestLockerConfig>): HarvestLockerConfig {
    const current = loadConfig();
    const updated = { ...current, ...updates };
    saveConfig(updated);
    return updated;
}

/**
 * Create a new rule with unique ID
 */
export function createRule(
    name: string,
    mode: 'allow' | 'lock',
    sizeCondition?: { enabled: boolean; minPercentage: number; sizeMode?: "min" | "max" },
    mutationCondition?: { enabled: boolean; mutations: string[]; matchMode: 'any' | 'all' }
): HarvestRule {
    return {
        id: generateRuleId(),
        name,
        enabled: true,
        mode,
        sizeCondition,
        mutationCondition,
    };
}

/**
 * Add rule to overall rules
 */
export function addOverallRule(rule: HarvestRule): void {
    const config = loadConfig();
    config.overallRules.push(rule);
    saveConfig(config);
}

/**
 * Add rule to species rules
 */
export function addSpeciesRule(species: string, rule: HarvestRule): void {
    const config = loadConfig();
    if (!config.speciesRules[species]) {
        config.speciesRules[species] = [];
    }
    config.speciesRules[species].push(rule);
    saveConfig(config);
}

/**
 * Update a rule (overall or species)
 */
export function updateRule(ruleId: string, updates: Partial<HarvestRule>): void {
    const config = loadConfig();

    // Find and update in overall rules
    const overallIndex = config.overallRules.findIndex(r => r.id === ruleId);
    if (overallIndex !== -1) {
        config.overallRules[overallIndex] = {
            ...config.overallRules[overallIndex],
            ...updates,
        };
        saveConfig(config);
        return;
    }

    // Find and update in species rules
    for (const species of Object.keys(config.speciesRules)) {
        const speciesIndex = config.speciesRules[species].findIndex(r => r.id === ruleId);
        if (speciesIndex !== -1) {
            config.speciesRules[species][speciesIndex] = {
                ...config.speciesRules[species][speciesIndex],
                ...updates,
            };
            saveConfig(config);
            return;
        }
    }

    console.warn(`[HarvestLocker] Rule ${ruleId} not found`);
}

/**
 * Delete a rule (overall or species)
 */
export function deleteRule(ruleId: string): void {
    const config = loadConfig();

    // Remove from overall rules
    const overallIndex = config.overallRules.findIndex(r => r.id === ruleId);
    if (overallIndex !== -1) {
        config.overallRules.splice(overallIndex, 1);
        saveConfig(config);
        return;
    }

    // Remove from species rules
    for (const species of Object.keys(config.speciesRules)) {
        const speciesIndex = config.speciesRules[species].findIndex(r => r.id === ruleId);
        if (speciesIndex !== -1) {
            config.speciesRules[species].splice(speciesIndex, 1);
            // Clean up empty species arrays
            if (config.speciesRules[species].length === 0) {
                delete config.speciesRules[species];
            }
            saveConfig(config);
            return;
        }
    }

    console.warn(`[HarvestLocker] Rule ${ruleId} not found`);
}

/**
 * Clone an existing rule and add it to species rules
 */
export function cloneRuleToSpecies(ruleId: string, species: string): void {
    const config = loadConfig();

    // Find the rule in overall rules
    const originalRule = config.overallRules.find((r) => r.id === ruleId);
    if (!originalRule) {
        console.warn(`[HarvestLocker] Rule ${ruleId} not found`);
        return;
    }

    // Clone with new ID
    const clonedRule: HarvestRule = {
        ...originalRule,
        id: generateRuleId(),
        name: `${originalRule.name} (${species})`,
    };

    // Add to species rules
    if (!config.speciesRules[species]) {
        config.speciesRules[species] = [];
    }
    config.speciesRules[species].push(clonedRule);
    saveConfig(config);
}
