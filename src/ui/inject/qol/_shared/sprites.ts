/**
 * Shared sprite rendering helpers for journal QOL injections
 *
 * Consolidates duplicated sprite rendering logic from journalGuide and journalAllTab.
 */

import { MGSprite } from '../../../../modules';
import type { MutationName } from '../../../../modules/sprite/types';
import { getSpriteAssetId } from './names';

// ─────────────────────────────────────────────────────────────────────────────
// Variant to Mutation Mapping
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Maps variant IDs to MGSprite mutation arrays.
 * Works for both crops and pets (only crops have weather mutations, pets only have Gold/Rainbow).
 */
const VARIANT_MUTATIONS: Record<string, MutationName[]> = {
    Gold: ['Gold'],
    Rainbow: ['Rainbow'],
    Wet: ['Wet'],
    Chilled: ['Chilled'],
    Frozen: ['Frozen'],
    Dawnlit: ['Dawnlit'],
    Ambershine: ['Ambershine'],
    Dawncharged: ['Dawncharged'],
    Ambercharged: ['Ambercharged'],
    // Normal and Max Weight have no visual mutations
    Normal: [],
    'Max Weight': [],
};

/**
 * Get the mutation array for a given variant ID.
 * Returns empty array if variant has no mutations or is unknown.
 */
export function getMutationsForVariant(variantId: string): MutationName[] {
    return VARIANT_MUTATIONS[variantId] ?? [];
}

// ─────────────────────────────────────────────────────────────────────────────
// Sprite Rendering
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render a species sprite with proper boundsMode, asset mapping, and error handling.
 * Returns null on failure (caller provides fallback).
 *
 * @param speciesId - Internal species ID (e.g., 'DawnCelestial', 'Chicken')
 * @param type - 'crop' or 'pet'
 * @param mutations - Array of MutationName to apply (use getMutationsForVariant() for variants)
 * @param size - Display size in pixels (width and height)
 * @returns Canvas element or null if rendering fails
 */
export function renderSpeciesSprite(
    speciesId: string,
    type: 'crop' | 'pet',
    mutations: MutationName[],
    size: number,
): HTMLCanvasElement | null {
    if (!MGSprite.isReady()) return null;

    try {
        // MGSprite uses 'plant' and 'pet' (singular), not 'plants'/'pets'
        const category = type === 'crop' ? 'plant' : 'pet';
        const assetId = getSpriteAssetId(speciesId, type);

        // Use boundsMode: 'mutations' when mutations are present to prevent cutoff
        const canvas = MGSprite.toCanvas(category, assetId, {
            scale: 0.5,
            mutations,
            boundsMode: mutations.length > 0 ? 'mutations' : undefined,
        });

        // Apply consistent styling matching game's InventorySprite.tsx
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        canvas.style.imageRendering = 'pixelated';
        canvas.style.objectFit = 'contain';
        canvas.style.display = 'block';

        return canvas;
    } catch (err) {
        console.warn(`[SharedSprites] Failed to render ${type} sprite for ${speciesId}:`, err);
        return null;
    }
}

/**
 * Try multiple sprite category/name variations for crops.
 * Some crops use 'tallplant' category or have case variations.
 * Returns the first successfully rendered canvas, or null if all fail.
 */
export function renderCropSpriteWithFallbacks(
    speciesId: string,
    mutations: MutationName[],
    size: number,
): HTMLCanvasElement | null {
    if (!MGSprite.isReady()) return null;

    const assetId = getSpriteAssetId(speciesId, 'crop');
    const tryCanvas = (category: string, asset: string): HTMLCanvasElement | null => {
        try {
            if (MGSprite.has(category, asset)) {
                const canvas = MGSprite.toCanvas(category, asset, {
                    scale: 0.5,
                    mutations,
                    boundsMode: mutations.length > 0 ? 'mutations' : undefined,
                });
                canvas.style.width = `${size}px`;
                canvas.style.height = `${size}px`;
                canvas.style.imageRendering = 'pixelated';
                canvas.style.objectFit = 'contain';
                canvas.style.display = 'block';
                return canvas;
            }
        } catch (err) {
            // Silent failure, try next variation
        }
        return null;
    };

    // Try variations in order of likelihood
    return (
        tryCanvas('plant', assetId) ||
        tryCanvas('tallplant', assetId) ||
        tryCanvas('plant', assetId.toLowerCase()) ||
        tryCanvas('tallplant', assetId.toLowerCase())
    );
}
