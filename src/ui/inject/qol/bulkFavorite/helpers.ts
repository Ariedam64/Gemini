/**
 * BulkFavorite Button Creation Helpers
 *
 * Isolated button rendering logic for easier testing and maintenance.
 */

import { element } from '../../../styles/helpers';
import { MGSprite } from '../../../../modules';
import * as CONFIG from './config';

// ─────────────────────────────────────────────────────────────────────────────
// SVG Constants
// ─────────────────────────────────────────────────────────────────────────────

const HEART_SVG_FILLED = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

const HEART_SVG_OUTLINE = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SpeciesButtonOptions {
    species: string;
    itemCount: number;
    isFavorited: boolean;
    isMobile: boolean;
    onClick: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create a species-specific favorite toggle button
 *
 * @param options - Button configuration
 * @returns Configured button element
 */
export function createSpeciesButton(options: SpeciesButtonOptions): HTMLButtonElement {
    const { species, itemCount, isFavorited, isMobile, onClick } = options;

    const btn = element('button', {
        className: `gemini-qol-bulkFavorite-btn${isMobile ? ' mobile' : ''}`,
        title: `${isFavorited ? 'Unfavorite' : 'Favorite'} all ${itemCount} ${species}`,
    }) as HTMLButtonElement;

    btn.dataset.species = species;

    // Add sprite/fallback
    btn.appendChild(createSpriteElement(species, isMobile));

    // Add heart icon
    btn.appendChild(createHeartIcon(isFavorited));

    // Add label
    btn.appendChild(createLabel(species));

    // Add click handler
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
    });

    return btn;
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create sprite element for a species
 * Falls back to first letter if sprite unavailable
 */
function createSpriteElement(species: string, isMobile: boolean): HTMLElement {
    try {
        if (!MGSprite.isReady() || !MGSprite.has('plant', species)) {
            return createFallbackSprite(species);
        }

        const scale = isMobile ? CONFIG.SPRITE_SCALE_MOBILE : CONFIG.SPRITE_SCALE_DESKTOP;
        const canvas = MGSprite.toCanvas('plant', species, { scale });
        canvas.className = 'gemini-qol-bulkFavorite-sprite';
        return canvas;
    } catch (error) {
        console.warn(`[BulkFavorite] Failed to load sprite for ${species}:`, error);
        return createFallbackSprite(species);
    }
}

/**
 * Create fallback element showing first letter of species
 */
function createFallbackSprite(species: string): HTMLElement {
    return element('div', {
        className: 'gemini-qol-bulkFavorite-fallback'
    }, species.charAt(0).toUpperCase());
}

/**
 * Create heart icon indicating favorite status
 */
function createHeartIcon(filled: boolean): HTMLElement {
    const heart = element('span', {
        className: `gemini-qol-bulkFavorite-heart ${filled ? 'filled' : 'outline'}`
    });
    heart.innerHTML = filled ? HEART_SVG_FILLED : HEART_SVG_OUTLINE;
    return heart;
}

/**
 * Create label showing species name
 */
function createLabel(species: string): HTMLElement {
    return element('span', {
        className: 'gemini-qol-bulkFavorite-label'
    }, species);
}
