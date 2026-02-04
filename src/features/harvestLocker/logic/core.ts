/**
 * HarvestLocker core logic
 * Rule-based harvest prevention system
 */

import { getMyGarden } from '../../../globals/variables/myGarden';
import { MGData } from '../../../modules/data';
import { EVENTS } from '../../../utils/storage';
import type { HarvestLockerConfig, HarvestRule } from '../types';

/**
 * Set of currently locked slot IDs (format: "slot-slotsIndex")
 */
const lockedSlots = new Set<string>();

/**
 * Current configuration
 */
let currentConfig: HarvestLockerConfig | null = null;

/**
 * Cleanup functions
 */
const cleanups: (() => void)[] = [];

/**
 * Start the HarvestLocker logic
 */
export function start(config: HarvestLockerConfig): void {
    if (cleanups.length > 0) {
        console.warn('[HarvestLocker] Already started');
        return;
    }

    currentConfig = config;

    // Subscribe to myGarden changes
    const unsub = getMyGarden().subscribeStable((garden) => {
        if (!garden) {
            lockedSlots.clear();
            return;
        }

        evaluateLocks(garden);
    });

    cleanups.push(unsub);
}

/**
 * Stop the HarvestLocker logic
 */
export function stop(): void {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
    lockedSlots.clear();
    currentConfig = null;
    console.log('[HarvestLocker] Stopped');
}

/**
 * Update configuration and re-evaluate locks
 */
export function updateLockConfig(config: HarvestLockerConfig): void {
    currentConfig = config;

    // Re-evaluate with new config
    const garden = getMyGarden().get();
    if (garden) {
        evaluateLocks(garden);
    }
}

/**
 * Check if a slot is locked
 */
export function isSlotLocked(slot: string, slotsIndex: number): boolean {
    const slotId = `${slot}-${slotsIndex}`;
    return lockedSlots.has(slotId);
}

/**
 * Get all locked slot IDs
 */
export function getLockedSlots(): string[] {
    return Array.from(lockedSlots);
}

/**
 * Evaluate and update locked slots based on current config and garden state
 */
function evaluateLocks(garden: unknown): void {
    if (!currentConfig) return;

    lockedSlots.clear();

    // Add manual locks
    currentConfig.manualLocks.forEach((id) => lockedSlots.add(id));

    // Type guard for garden structure
    if (!isValidGarden(garden)) {
        console.warn('[HarvestLocker] Invalid garden structure');
        window.dispatchEvent(new CustomEvent(EVENTS.HARVEST_LOCKER_LOCKS_UPDATED));
        return;
    }

    // Evaluate rule-based locks for each plant slot
    garden.plants.all.forEach((plant) => {
        plant.slots.forEach((slot, slotIndex) => {
            const slotId = `${plant.tileIndex}-${slotIndex}`;

            // Get applicable rules (species rules override overall)
            const rules = getRulesForSpecies(slot.species);

            // Evaluate rules to determine lock state
            const shouldLock = evaluateRules(slot, rules);

            if (shouldLock) {
                lockedSlots.add(slotId);
            }
        });
    });

    window.dispatchEvent(new CustomEvent(EVENTS.HARVEST_LOCKER_LOCKS_UPDATED));
}

/**
 * Get applicable rules for a species (species rules override overall)
 */
function getRulesForSpecies(species: string): HarvestRule[] {
    if (!currentConfig) return [];

    // Species rules override overall rules
    if (currentConfig.speciesRules[species]) {
        return currentConfig.speciesRules[species].filter(r => r.enabled);
    }

    // Fallback to overall rules
    return currentConfig.overallRules.filter(r => r.enabled);
}

/**
 * Evaluate rules to determine if slot should be locked
 *
 * Logic:
 * - If ANY 'lock' rule matches → LOCK
 * - If ANY 'allow' rule exists and NO 'allow' rule matches → LOCK
 * - Otherwise → ALLOW (not locked)
 */
function evaluateRules(
    slot: { species: string; targetScale: number; mutations: string[] },
    rules: HarvestRule[]
): boolean {
    const lockRules = rules.filter(r => r.mode === 'lock');
    const allowRules = rules.filter(r => r.mode === 'allow');

    // Check lock rules first
    for (const rule of lockRules) {
        if (ruleMatches(slot, rule)) {
            return true; // Lock this slot
        }
    }

    // If there are allow rules, check if any match
    if (allowRules.length > 0) {
        const anyAllowMatches = allowRules.some(rule => ruleMatches(slot, rule));
        if (!anyAllowMatches) {
            return true; // Lock because no allow rule matched
        }
    }

    return false; // Don't lock
}

/**
 * Check if a slot matches a rule's conditions
 */
function ruleMatches(
    slot: { species: string; targetScale: number; mutations: string[] },
    rule: HarvestRule
): boolean {
    const conditions: boolean[] = [];

    // Check size condition
    if (rule.sizeCondition?.enabled) {
        const scalePercent = calculateScalePercentage(slot);
        conditions.push(scalePercent >= rule.sizeCondition.minPercentage);
    }

    // Check mutation condition
    if (rule.mutationCondition?.enabled && rule.mutationCondition.mutations.length > 0) {
        const mutationMatch = evaluateMutationCondition(
            slot.mutations,
            rule.mutationCondition.mutations,
            rule.mutationCondition.matchMode
        );
        conditions.push(mutationMatch);
    }

    // All enabled conditions must match
    return conditions.length > 0 && conditions.every(c => c);
}

/**
 * Evaluate mutation condition with 'any' or 'all' logic
 *
 * "none" is a sentinel meaning "no mutations" — it matches when slotMutations is empty.
 * It is never literally present in a plant's mutation array.
 */
function evaluateMutationCondition(
    slotMutations: string[],
    requiredMutations: string[],
    matchMode: 'any' | 'all'
): boolean {
    const hasNone = requiredMutations.includes("none");
    const actualRequired = requiredMutations.filter(m => m !== "none");
    const noneMatches = hasNone && slotMutations.length === 0;

    if (matchMode === 'any') {
        // Match if plant has no mutations (and "none" was selected)
        // OR has any of the specified actual mutations
        if (noneMatches) return true;
        return actualRequired.some(mutation => slotMutations.includes(mutation));
    } else {
        // "all" mode: plant must have ALL actual mutations
        // If "none" is also required, plant must additionally have no mutations
        // (contradictory with actual mutations — gracefully returns false)
        if (hasNone && slotMutations.length > 0) return false;
        if (actualRequired.length === 0) return noneMatches;
        return actualRequired.every(mutation => slotMutations.includes(mutation));
    }
}

/**
 * Calculate scale percentage (0-100) relative to baseTileScale and maxScale
 */
function calculateScalePercentage(slot: { species: string; targetScale: number }): number {
    const plantsData = MGData.get('plants') as Record<string, unknown> | null;
    const plantData = plantsData?.[slot.species];

    if (!plantData || typeof plantData !== 'object' || !('crop' in plantData)) {
        return 0;
    }

    const crop = (plantData as { crop: unknown }).crop;
    if (typeof crop !== 'object' || !crop) {
        return 0;
    }

    const { baseTileScale, maxScale } = crop as { baseTileScale: number; maxScale: number };
    const range = maxScale - baseTileScale;

    if (range === 0) {
        return 100;
    }

    const scaleAboveBase = slot.targetScale - baseTileScale;
    return (scaleAboveBase / range) * 100;
}

/**
 * Type guard for garden structure
 */
function isValidGarden(garden: unknown): garden is {
    plants: {
        all: Array<{
            tileIndex: string;
            slots: Array<{
                species: string;
                targetScale: number;
                mutations: string[];
            }>;
        }>;
    };
} {
    return (
        typeof garden === 'object' &&
        garden !== null &&
        'plants' in garden &&
        typeof (garden as { plants: unknown }).plants === 'object' &&
        (garden as { plants: unknown }).plants !== null &&
        'all' in (garden as { plants: { all: unknown } }).plants &&
        Array.isArray((garden as { plants: { all: unknown } }).plants.all)
    );
}
