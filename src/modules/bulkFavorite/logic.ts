/**
 * BulkFavorite Feature - Core Logic
 * 
 * Level 2: Imports types + state
 * Handles bulk favoriting operations
 */

import { G_MyInventory } from '../../globals';
import { toggleFavoriteItem } from '../../websocket/api';

// ─────────────────────────────────────────────────────────────────────────────
// Bulk Actions
// ─────────────────────────────────────────────────────────────────────────────

export async function bulkFavorite(favorite: boolean): Promise<number> {
    const inventory = G_MyInventory().get();

    if (!inventory?.items) {
        console.warn('[BulkFavorite] No inventory data available');
        return 0;
    }

    let count = 0;

    for (const item of inventory.items) {
        if (favorite && item.isFavorited) continue;
        if (!favorite && !item.isFavorited) continue;

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
