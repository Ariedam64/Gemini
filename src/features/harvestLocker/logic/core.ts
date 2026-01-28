/**
 * HarvestLocker core logic
 */

import { getMyGarden } from '../../../globals/variables/myGarden';
import { MGData } from '../../../modules/data';
import type { HarvestLockerConfig, LockCriteria } from '../types';

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
        return;
    }

    // Evaluate auto-locks for each plant slot
    garden.plants.all.forEach((plant) => {
        plant.slots.forEach((slot, slotIndex) => {
            const slotId = `${plant.tileIndex}-${slotIndex}`;

            // Get criteria (species override or global)
            const criteria = getCriteriaForSpecies(slot.species);

            // Check scale lock
            if (criteria.lockByScale?.enabled) {
                const scalePercent = calculateScalePercentage(slot);
                if (scalePercent >= criteria.lockByScale.minPercentage) {
                    lockedSlots.add(slotId);
                    return;
                }
            }

            // Check mutation lock
            if (criteria.lockedMutations && criteria.lockedMutations.length > 0) {
                const hasLockedMutation = slot.mutations.some((mutation) =>
                    criteria.lockedMutations!.includes(mutation)
                );
                if (hasLockedMutation) {
                    lockedSlots.add(slotId);
                }
            }
        });
    });
}

/**
 * Get lock criteria for a species (override or global)
 */
function getCriteriaForSpecies(species: string): LockCriteria {
    if (!currentConfig) {
        return {
            lockByScale: { enabled: false, minPercentage: 50 },
            lockedMutations: [],
        };
    }

    // Check for species override
    if (currentConfig.speciesOverrides[species]) {
        return currentConfig.speciesOverrides[species];
    }

    // Fallback to global criteria
    return {
        lockByScale: currentConfig.globalCriteria.lockByScale,
        lockedMutations: currentConfig.globalCriteria.lockedMutations,
    };
}

/**
 * Calculate scale percentage (0-100) relative to baseTileScale and maxScale
 */
function calculateScalePercentage(slot: { species: string; targetScale: number }): number {
    const plantsData = MGData.get('plants') as Record<string, any> | null;
    const plantData = plantsData?.[slot.species];

    if (!plantData?.crop) {
        return 0;
    }

    const { baseTileScale, maxScale } = plantData.crop as { baseTileScale: number; maxScale: number };
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
