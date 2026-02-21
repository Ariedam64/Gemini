/**
 * Journal Guide - Weather & Mutation Registry
 *
 * Central module that dynamically maps weather types to mutations,
 * provides color/display-name lookups, and classifies mutations.
 * All data is derived from MGData at runtime so the extension
 * auto-adapts when the game adds new weather or mutations.
 */

import { MGData } from '../../../../modules';

// ─────────────────────────────────────────────────────────────────────────────
// Known Static Data (fallbacks for offline / pre-load)
// ─────────────────────────────────────────────────────────────────────────────

/** Known mutation colors from game source (constants/colors.ts) */
const KNOWN_MUTATION_COLORS: Record<string, string> = {
    Wet: 'rgba(95, 255, 255, 1)',
    Chilled: 'rgba(180, 230, 255, 1)',
    Frozen: 'rgb(185, 200, 255)',
    Dawnlit: 'rgb(245, 155, 225)',
    Dawncharged: 'rgb(200, 150, 255)',
    Ambershine: 'rgb(255, 180, 120)',
    Ambercharged: 'rgb(250, 140, 75)',
    Thunderstruck: 'rgb(255, 230, 50)',
    Gold: 'rgb(235, 200, 0)',
    Rainbow: 'linear-gradient(45deg, rgba(200,0,0,0.9), rgba(200,120,0,0.9), rgba(160,170,30,0.9), rgba(60,170,60,0.9), rgba(50,170,170,0.9), rgba(40,150,180,0.9), rgba(20,90,180,0.9), rgba(70,30,150,0.9))',
};

// Display names are now resolved dynamically from MGData.get('mutations')[id].name
// See getVariantDisplayName() in journalHints/variantOrder.ts for shared resolution

/** Known growth mutations fallback (obtained via pet abilities, not weather) */
const FALLBACK_GROWTH_MUTATIONS = new Set(['Gold', 'Rainbow']);

// ─────────────────────────────────────────────────────────────────────────────
// Cache
// ─────────────────────────────────────────────────────────────────────────────

let weatherMutationMap: Map<string, string> | null = null; // weatherId -> mutationId
let mutationWeatherMap: Map<string, string> | null = null; // mutationId -> weatherId
let weatherGroupMap: Map<string, string> | null = null;    // weatherId -> groupId

function ensureCache(): void {
    if (weatherMutationMap) return;
    weatherMutationMap = new Map();
    mutationWeatherMap = new Map();
    weatherGroupMap = new Map();

    const weather = MGData.get('weather') as Record<string, any> | null;
    if (!weather) return;

    for (const [weatherId, data] of Object.entries(weather)) {
        if (!data || typeof data !== 'object') continue;

        // Cache groupId (e.g., "Hydro", "Lunar")
        if (typeof data.groupId === 'string') {
            weatherGroupMap.set(weatherId, data.groupId);
        }

        const mutationId = data.mutator?.mutation;
        if (typeof mutationId === 'string') {
            weatherMutationMap.set(weatherId, mutationId);
            mutationWeatherMap.set(mutationId, weatherId);
        }
    }
}

export function invalidateCache(): void {
    weatherMutationMap = null;
    mutationWeatherMap = null;
    weatherGroupMap = null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Weather ↔ Mutation Mapping
// ─────────────────────────────────────────────────────────────────────────────

/** Returns map of weatherId → mutationId from weather catalog mutator fields */
export function getWeatherMutations(): Map<string, string> {
    ensureCache();
    return new Map(weatherMutationMap!);
}

/** Reverse lookup: mutation → weather that causes it, or null */
export function getWeatherForMutation(mutId: string): string | null {
    ensureCache();
    return mutationWeatherMap!.get(mutId) ?? null;
}

/** Get the weather icon name for a weather ID (convention: {WeatherId}Icon) */
export function getWeatherIcon(weatherId: string): string {
    const weather = MGData.get('weather') as Record<string, any> | null;
    const spriteId = weather?.[weatherId]?.spriteId;
    if (typeof spriteId === 'string') {
        // Extract icon name from "sprite/ui/RainIcon" -> "RainIcon"
        const lastSlash = spriteId.lastIndexOf('/');
        return lastSlash >= 0 ? spriteId.substring(lastSlash + 1) : spriteId;
    }
    return `${weatherId}Icon`;
}

/** Get the display name for a weather type */
export function getWeatherName(weatherId: string): string {
    const weather = MGData.get('weather') as Record<string, any> | null;
    return weather?.[weatherId]?.name ?? weatherId;
}

/**
 * Get the groupId for a weather type (internal categorization).
 * Returns "Hydro", "Lunar", or null if ungrouped.
 * Used for scoring difficulty and badge ordering.
 */
export function getWeatherGroupId(weatherId: string): string | null {
    ensureCache();
    return weatherGroupMap!.get(weatherId) ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mutation Classification
// ─────────────────────────────────────────────────────────────────────────────

/** Is this mutation caused by weather? */
export function isWeatherMutation(mutId: string): boolean {
    ensureCache();
    return mutationWeatherMap!.has(mutId);
}

/** Is this a growth mutation (Gold, Rainbow - obtained via pet abilities, not weather)? */
export function isGrowthMutation(mutId: string): boolean {
    // Dynamic: growth mutations have baseChance > 0 and no tileRef (not weather-derived)
    const mutations = MGData.get('mutations') as Record<string, any> | null;
    if (mutations?.[mutId]) {
        return (mutations[mutId].baseChance ?? 0) > 0 && !mutations[mutId].tileRef;
    }
    return FALLBACK_GROWTH_MUTATIONS.has(mutId);
}

/**
 * Detect charged mutations. Known: Dawncharged (Dawn + Dawnbinder + Dawnlit),
 * Ambercharged (AmberMoon + Moonbinder + Ambershine).
 * Heuristic: any mutation ending in "charged" is a charged variant.
 */
export function isChargedMutation(mutId: string): boolean {
    return mutId.toLowerCase().endsWith('charged');
}

/**
 * For charged mutations, returns info about the base mutation and celestial plant needed.
 * Returns null for non-charged mutations.
 */
export function getChargedMutationInfo(mutId: string): {
    baseMutation: string;
    weatherId: string;
    celestialPlant: string;
    celestialCheck: 'hasDawnbinder' | 'hasMoonbinder' | string;
} | null {
    if (!isChargedMutation(mutId)) return null;

    // Known charged mutations
    if (mutId === 'Dawncharged') {
        return {
            baseMutation: 'Dawnlit',
            weatherId: 'Dawn',
            celestialPlant: 'DawnCelestial',
            celestialCheck: 'hasDawnbinder',
        };
    }
    if (mutId === 'Ambercharged') {
        return {
            baseMutation: 'Ambershine',
            weatherId: 'AmberMoon',
            celestialPlant: 'MoonCelestial',
            celestialCheck: 'hasMoonbinder',
        };
    }

    // Heuristic for future charged mutations: strip "charged" suffix to find base
    const base = mutId.replace(/charged$/i, '');
    const weatherId = getWeatherForMutation(base);
    return {
        baseMutation: base,
        weatherId: weatherId ?? base,
        celestialPlant: `${base}Celestial`,
        celestialCheck: `has${base}binder`,
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Colors
// ─────────────────────────────────────────────────────────────────────────────

/** Hash-based fallback color for unknown mutations */
function hashColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 70%, 60%)`;
}

/** Get the color for a mutation. Uses known colors, falls back to hash-based. */
export function getMutationColor(mutId: string): string {
    return KNOWN_MUTATION_COLORS[mutId] ?? hashColor(mutId);
}

/** Check if a mutation color is a gradient (only Rainbow currently) */
export function isMutationGradient(mutId: string): boolean {
    const color = getMutationColor(mutId);
    return color.startsWith('linear-gradient') || color.startsWith('radial-gradient');
}

// ─────────────────────────────────────────────────────────────────────────────
// Display Names & Letters
// ─────────────────────────────────────────────────────────────────────────────

/** Get display name for a mutation from MGData (e.g. Ambershine → Amberlit) */
export function getMutationDisplayName(mutId: string): string {
    const mutations = MGData.get('mutations') as Record<string, any> | null;
    return mutations?.[mutId]?.name ?? mutId;
}

/** Get the single display letter for a mutation (first char of display name) */
export function getMutationDisplayLetter(mutId: string): string {
    const displayName = getMutationDisplayName(mutId);
    return displayName.charAt(0).toUpperCase();
}

// ─────────────────────────────────────────────────────────────────────────────
// Weather Mutation Chance
// ─────────────────────────────────────────────────────────────────────────────

/** Get the chance per minute per crop for a weather mutation */
export function getWeatherMutationChance(weatherId: string): number {
    const weather = MGData.get('weather') as Record<string, any> | null;
    return weather?.[weatherId]?.mutator?.chancePerMinutePerCrop ?? 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// All Weather Mutations (ordered for badge chain)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns all weather mutation IDs (non-charged) in order of rarity/difficulty.
 * Excludes Frozen (composite: Wet+Chilled), charged mutations, and growth mutations.
 */
export function getWeatherMutationIds(): string[] {
    ensureCache();
    const ids: string[] = [];
    for (const mutId of mutationWeatherMap!.keys()) {
        // Skip Frozen (composite), charged mutations, growth mutations
        if (mutId === 'Frozen') continue;
        if (isChargedMutation(mutId)) continue;
        if (isGrowthMutation(mutId)) continue;
        ids.push(mutId);
    }
    return ids;
}

/** Returns all charged mutation IDs found in mutations data */
export function getChargedMutationIds(): string[] {
    const mutations = MGData.get('mutations') as Record<string, any> | null;
    if (!mutations) return [];
    return Object.keys(mutations).filter(id => isChargedMutation(id));
}
