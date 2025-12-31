/**
 * AutoFavorite Feature - Core Logic
 * 
 * Level 2: Imports types + state
 * Handles item processing and favoriting
 */

import { G_MyInventory } from '../../globals';
import { toggleFavoriteItem } from '../../websocket/api';
import { MGData } from '..';
import { loadConfig, updateConfig } from './state';
import type { AutoFavoriteConfig, SimpleAutoFavoriteConfig, FavoriteableItem } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Runtime State (not persisted)
// ─────────────────────────────────────────────────────────────────────────────

let unsubscribe: (() => void) | null = null;
const processedItems = new Set<string>();

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

export function start(): void {
    const config = loadConfig();

    if (!config.enabled) {
        console.log('[AutoFavorite] Disabled');
        return;
    }

    processedItems.clear();

    unsubscribe = G_MyInventory().subscribeItems((event) => {
        if (event.added.length > 0) {
            const currentConfig = loadConfig();
            for (const item of event.added) {
                processItem(item as FavoriteableItem, currentConfig);
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

export function setEnabled(enabled: boolean): void {
    const config = loadConfig();
    config.enabled = enabled;
    config.simple.enabled = enabled;
    updateConfig(config);

    enabled ? start() : stop();
}

// ─────────────────────────────────────────────────────────────────────────────
// Item Processing
// ─────────────────────────────────────────────────────────────────────────────

function processItem(item: FavoriteableItem, config: AutoFavoriteConfig): void {
    if (item.itemType !== 'Produce' && item.itemType !== 'Pet') {
        return;
    }

    if (!item.id) {
        console.warn('[AutoFavorite] Item has no ID:', item);
        return;
    }

    if (processedItems.has(item.id)) {
        return;
    }

    const isFavorited = item.isFavorited || item.favorited || false;
    if (isFavorited) {
        return;
    }

    if (shouldFavorite(item, config.simple)) {
        processedItems.add(item.id);

        try {
            toggleFavoriteItem(item.id, true);
            console.log(`[AutoFavorite] ⭐ Favorited ${item.itemType}: ${item.species || item.id}`);
        } catch (error) {
            console.error('[AutoFavorite] WebSocket error:', error);
            processedItems.delete(item.id);
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Matching Logic
// ─────────────────────────────────────────────────────────────────────────────

export function shouldFavorite(item: FavoriteableItem, config: SimpleAutoFavoriteConfig): boolean {
    if (!config.enabled) return false;

    // 1. Get explicit IDs/Species from item
    const speciesId = item.itemType === 'Pet' ? item.petSpecies : item.species;
    if (!speciesId) return false;

    // 2. Exact Species Match
    if (config.favoriteSpecies.includes(speciesId)) {
        return true;
    }

    // 3. Mutation Match
    if (config.favoriteMutations.length > 0) {
        const itemMutations = item.mutations || [];
        if (itemMutations.some(m => config.favoriteMutations.includes(m))) {
            return true;
        }
    }

    return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getGameMutations(): string[] {
    return Object.keys(MGData.get('mutations') ?? {});
}

export function getGameSpecies(): string[] {
    const plants = MGData.get('plants') ?? {};
    const pets = MGData.get('pets') ?? {};
    return [...Object.keys(plants), ...Object.keys(pets)];
}
