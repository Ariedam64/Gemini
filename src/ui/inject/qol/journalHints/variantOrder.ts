/**
 * Journal Variant Order - Dynamic variant derivation from MGData
 *
 * Provides the correct journal variant order by deriving it from MGData:
 *   - Weather/composite mutations sorted by tileRef.index (spritesheet order = journal order)
 *   - Growth mutations (Gold, Rainbow) sorted by baseChance descending
 *   - Charged mutations sorted by tileRef.index
 *
 * Display names are resolved from MGData.get('mutations')[id].name,
 * eliminating all hardcoded name overrides.
 */

import { MGData } from '../../../../modules';

// ─────────────────────────────────────────────────────────────────────────────
// Cache
// ─────────────────────────────────────────────────────────────────────────────

let cropOrder: string[] | null = null;
let petOrder: string[] | null = null;
let displayNameMap: Map<string, string> | null = null;  // internal ID → display name
let idFromDisplayMap: Map<string, string> | null = null; // display name → internal ID
let lastMutationCount = -1;

function mutationCount(): number {
    const mutations = MGData.get('mutations') as Record<string, any> | null;
    return mutations ? Object.keys(mutations).length : 0;
}

/** Invalidate caches if mutation data changed (e.g. game update) */
function checkStale(): void {
    const count = mutationCount();
    if (count !== lastMutationCount) {
        cropOrder = null;
        petOrder = null;
        displayNameMap = null;
        idFromDisplayMap = null;
        lastMutationCount = count;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Display Name Resolution (from MGData, no hardcoded overrides)
// ─────────────────────────────────────────────────────────────────────────────

function ensureDisplayMaps(): void {
    checkStale();
    if (displayNameMap) return;

    displayNameMap = new Map();
    idFromDisplayMap = new Map();

    const mutations = MGData.get('mutations') as Record<string, any> | null;
    if (mutations) {
        for (const [id, data] of Object.entries(mutations)) {
            const name: string = data?.name ?? id;
            displayNameMap.set(id, name);
            idFromDisplayMap.set(name, id);
        }
    }

    // Non-mutation variants (identity mapping)
    displayNameMap.set('Normal', 'Normal');
    displayNameMap.set('Max Weight', 'Max Weight');
    idFromDisplayMap.set('Normal', 'Normal');
    idFromDisplayMap.set('Max Weight', 'Max Weight');
}

/** Get display name for an internal variant ID */
export function getVariantDisplayName(variantId: string): string {
    ensureDisplayMaps();
    return displayNameMap?.get(variantId) ?? variantId;
}

/** Get internal ID from a display name shown in the DOM */
export function getVariantId(displayName: string): string | null {
    ensureDisplayMaps();
    return idFromDisplayMap?.get(displayName) ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Crop Journal Order
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derive crop journal variant order from MGData.
 *
 * Strategy:
 *   1. Categorise each mutation:
 *      - "charged" → internal ID ends with "charged"
 *      - "growth"  → baseChance > 0 AND no tileRef (Gold, Rainbow)
 *      - "weather" → everything else (direct weather mutations + composites like Frozen)
 *   2. Sort weather mutations by tileRef.index ascending
 *      (spritesheet indices match the game's journal display order)
 *   3. Sort growth mutations by baseChance descending (Gold before Rainbow)
 *   4. Sort charged mutations by tileRef.index ascending
 *   5. Assemble: Normal → weather → growth → charged → Max Weight
 */
function deriveFromMGData(): string[] {
    const mutations = MGData.get('mutations') as Record<string, any> | null;
    if (!mutations) return ['Normal', 'Max Weight'];

    const weatherLike: Array<{ id: string; index: number }> = [];
    const growthMuts: Array<{ id: string; chance: number }> = [];
    const chargedMuts: Array<{ id: string; index: number }> = [];

    for (const [id, data] of Object.entries(mutations)) {
        const isCharged = id.toLowerCase().endsWith('charged');
        const isGrowth = (data?.baseChance ?? 0) > 0 && !data?.tileRef;
        const tileIndex: number = data?.tileRef?.index ?? Infinity;

        if (isCharged) {
            chargedMuts.push({ id, index: tileIndex });
        } else if (isGrowth) {
            growthMuts.push({ id, chance: data.baseChance });
        } else {
            weatherLike.push({ id, index: tileIndex });
        }
    }

    weatherLike.sort((a, b) => a.index - b.index);
    chargedMuts.sort((a, b) => a.index - b.index);
    growthMuts.sort((a, b) => b.chance - a.chance);

    return [
        'Normal',
        ...weatherLike.map(m => m.id),
        ...growthMuts.map(m => m.id),
        ...chargedMuts.map(m => m.id),
        'Max Weight',
    ];
}

/**
 * Get the crop journal variant order (internal IDs).
 * Derived from MGData on first call, cached thereafter.
 */
export function getCropJournalOrder(): string[] {
    checkStale();
    if (!cropOrder) cropOrder = deriveFromMGData();
    return cropOrder;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pet Journal Order
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the pet journal variant order (internal IDs).
 * Pets only have Normal + growth mutations + Max Weight.
 */
export function getPetJournalOrder(): string[] {
    checkStale();
    if (petOrder) return petOrder;

    const mutations = MGData.get('mutations') as Record<string, any> | null;
    const growthMuts: Array<{ id: string; chance: number }> = [];

    if (mutations) {
        for (const [id, data] of Object.entries(mutations)) {
            if ((data?.baseChance ?? 0) > 0 && !data?.tileRef) {
                growthMuts.push({ id, chance: data.baseChance });
            }
        }
    }

    growthMuts.sort((a, b) => b.chance - a.chance);
    petOrder = ['Normal', ...growthMuts.map(m => m.id), 'Max Weight'];
    return petOrder;
}

// ─────────────────────────────────────────────────────────────────────────────
// Counts
// ─────────────────────────────────────────────────────────────────────────────

export function getCropVariantCount(): number {
    return getCropJournalOrder().length;
}

export function getPetVariantCount(): number {
    return getPetJournalOrder().length;
}

// ─────────────────────────────────────────────────────────────────────────────
// Cache control
// ─────────────────────────────────────────────────────────────────────────────

export function invalidateOrder(): void {
    cropOrder = null;
    petOrder = null;
    displayNameMap = null;
    idFromDisplayMap = null;
    lastMutationCount = -1;
}
