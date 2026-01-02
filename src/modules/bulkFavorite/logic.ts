/**
 * BulkFavorite Feature - Core Logic
 * 
 * Level 2: Imports types + state
 * Handles bulk favoriting operations
 */

import { G_MyInventory } from '../../globals';
import { toggleFavoriteItem } from '../../websocket/api';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/** Items that have an id property and can be favorited */
type FavoritableItem = { id: string; itemType: string };

/** Type guard to check if an item has an id property */
function hasFavoritableId(item: unknown): item is FavoritableItem {
    return (
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        typeof (item as Record<string, unknown>).id === 'string'
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Bulk Actions
// ─────────────────────────────────────────────────────────────────────────────

export async function bulkFavorite(favorite: boolean): Promise<number> {
    const inventory = G_MyInventory().get();

    if (!inventory?.items) {
        console.warn('[BulkFavorite] No inventory data available');
        return 0;
    }

    const favoritedIds = new Set(inventory.favoritedItemIds ?? []);
    let count = 0;

    for (const item of inventory.items) {
        // Only items with id can be favorited
        if (!hasFavoritableId(item)) continue;

        const isFavorited = favoritedIds.has(item.id);

        // Skip if already in desired state
        if (favorite && isFavorited) continue;
        if (!favorite && !isFavorited) continue;

        await toggleFavoriteItem(item.id, favorite);
        count++;

        // Small delay to avoid overwhelming the server
        await sleep(50);
    }

    console.log(`[BulkFavorite] ${favorite ? 'Favorited' : 'Unfavorited'} ${count} items`);
    return count;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

