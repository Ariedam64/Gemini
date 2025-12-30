/**
 * Auto-Favorite Feature - DEBUGGED & FIXED
 * VERIFIED: Only favorites Produce/Pets with actual IDs, prevents duplicates
 */

import { Gemini } from '../../api';
import { storageGet, storageSet } from '../shared/storage';

const GAME_MUTATIONS = ['Gold', 'Rainbow', 'Wet', 'Chilled', 'Frozen', 'Dawnlit', 'Ambershine', 'Dawncharged', 'Ambercharged'] as const;

export interface SimpleAutoFavoriteConfig {
    enabled: boolean;
    favoriteSpecies: string[];
    favoriteMutations: string[];
}

export interface AutoFavoriteConfig {
    enabled: boolean;
    mode: 'simple';
    simple: SimpleAutoFavoriteConfig;
}

const DEFAULT_CONFIG: AutoFavoriteConfig = {
    enabled: false,
    mode: 'simple',
    simple: {
        enabled: false,
        favoriteSpecies: [],
        favoriteMutations: [],
    },
};

let unsubscribe: (() => void) | null = null;
const processedItems = new Set<string>(); // Track processed items to prevent duplicates

export function start(): void {
    const config = storageGet<AutoFavoriteConfig>('gemini:features:autoFavorite', DEFAULT_CONFIG);

    if (!config.enabled) {
        console.log('[AutoFavorite] Disabled');
        return;
    }

    // Clear processed items on start
    processedItems.clear();

    // Subscribe to inventory changes
    unsubscribe = Gemini.Globals.myInventory.subscribeItems((event) => {
        if (event.added.length > 0) {
            for (const item of event.added) {
                processItem(item as any, config);
            }
        }
    });

    console.log(`✅ [AutoFavorite] Started - Watching ${config.simple.favoriteSpecies.length} species, ${config.simple.favoriteMutations.length} mutations`);
}

export function stop(): void {
    if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
    }
    processedItems.clear();
    console.log('🛑 [AutoFavorite] Stopped');
}

function processItem(item: any, config: AutoFavoriteConfig): void {
    // FIX #1: Only process Produce and Pets (not seeds, tools, etc.)
    if (item.itemType !== 'Produce' && item.itemType !== 'Pet') {
        return;
    }

    // FIX #2: Get item ID - must have one!
    const itemId = item.id;
    if (!itemId) {
        console.warn('[AutoFavorite] Item has no ID:', item);
        return;
    }

    // FIX #3: Check if already processed (prevent duplicate triggers)
    if (processedItems.has(itemId)) {
        return;
    }

    // FIX #4: Check if already favorited (from game state)
    const isFavorited = item.isFavorited || item.favorited || false;
    if (isFavorited) {
        console.log(`[AutoFavorite] Already favorited: ${item.species || itemId}`);
        return;
    }

    // Check if should favorite
    const shouldFavorite = checkItemSimple(item, config.simple);

    if (shouldFavorite) {
        // Mark as processed BEFORE calling WebSocket
        processedItems.add(itemId);

        // FIX #5: Call WebSocket and log result
        try {
            const result = Gemini.WebSocket.toggleFavoriteItem(itemId, true);
            console.log(`[AutoFavorite] ⭐ Favorited ${item.itemType}: ${item.species || itemId}`, {
                itemId,
                webSocketResult: result
            });
        } catch (error) {
            console.error('[AutoFavorite] WebSocket error:', error);
            // Remove from processed on error so we can retry
            processedItems.delete(itemId);
        }
    }
}

function checkItemSimple(item: any, config: SimpleAutoFavoriteConfig): boolean {
    if (!config.enabled) return false;

    const species = item.species || item.itemType || '';
    const baseSpecies = extractBaseSpecies(species);

    // Check if species is in favorite list
    if (config.favoriteSpecies.includes(baseSpecies)) {
        return true;
    }

    // Check if item has any favorite mutations
    if (config.favoriteMutations.length > 0) {
        const itemMutations = extractMutations(species);
        if (itemMutations.some(m => config.favoriteMutations.includes(m))) {
            return true;
        }
    }

    return false;
}

function extractBaseSpecies(fullName: string): string {
    let baseName = fullName;

    for (const mutation of GAME_MUTATIONS) {
        baseName = baseName.replace(mutation, '').trim();
    }

    return baseName;
}

function extractMutations(fullName: string): string[] {
    const found: string[] = [];

    for (const mutation of GAME_MUTATIONS) {
        if (fullName.includes(mutation)) {
            found.push(mutation);
        }
    }

    return found;
}

export function updateSimpleConfig(simpleConfig: Partial<SimpleAutoFavoriteConfig>): void {
    const config = storageGet<AutoFavoriteConfig>('gemini:features:autoFavorite', DEFAULT_CONFIG);
    config.mode = 'simple';
    config.simple = { ...config.simple, ...simpleConfig };
    storageSet('gemini:features:autoFavorite', config);
}

export function setEnabled(enabled: boolean): void {
    const config = storageGet<AutoFavoriteConfig>('gemini:features:autoFavorite', DEFAULT_CONFIG);
    config.enabled = enabled;
    config.simple.enabled = enabled;
    storageSet('gemini:features:autoFavorite', config);

    if (enabled) {
        start();
    } else {
        stop();
    }
}

export function getGameMutations(): readonly string[] {
    return GAME_MUTATIONS;
}
