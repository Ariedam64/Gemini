/**
 * Growth Dropdown Component
 *
 * Displays a dropdown menu of growing items (eggs/plants) positioned above
 * the anchor element. Used in the growth summary bar.
 *
 * Per .claude/rules/ui/components.md:
 * - Factory function pattern
 * - Cleanup on close
 * - Theme-compatible styling
 *
 * @module expansion/GrowthDropdown
 */

import type { EggWithTile, CropInfo } from '../../../../../globals/core/types';
import { MGSprite } from '../../../../../modules/sprite';
import { element } from '../../../../styles/helpers';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Union type for items in the dropdown
 * Note: Plants use CropInfo (individual crop slots), eggs use EggWithTile
 */
export type GrowthItem = EggWithTile | CropInfo;

/**
 * Options for showing the growth dropdown
 */
export interface GrowthDropdownOptions {
    /** Anchor element to position relative to */
    anchor: HTMLElement;
    /** Items to display */
    items: GrowthItem[];
    /** Current view type */
    viewType: 'egg' | 'plant';
    /** Team ID (for toggle logic) */
    teamId: string;
    /** Callback when item is selected */
    onSelect: (itemId: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get species name from item based on view type
 */
function getItemSpecies(item: GrowthItem, viewType: 'egg' | 'plant'): string {
    if (viewType === 'egg') {
        return (item as EggWithTile).eggId;
    }
    // CropInfo uses species
    let species = (item as CropInfo).species;

    // Handle Celestial plant sprite mapping (pattern from GrowthPanel.ts)
    if (species === 'DawnCelestial') species = 'DawnCelestialCrop';
    if (species === 'MoonCelestial') species = 'MoonCelestialCrop';

    return species;
}

/**
 * Get end time from item based on view type
 */
function getItemEndTime(item: GrowthItem, viewType: 'egg' | 'plant'): number {
    if (viewType === 'egg') {
        return (item as EggWithTile).maturedAt;
    }
    // CropInfo uses endTime
    return (item as CropInfo).endTime;
}

/**
 * Create sprite element for dropdown option
 */
function createSpriteElement(species: string, viewType: 'egg' | 'plant'): HTMLElement {
    const container = element('span', { className: 'dropdown-sprite' });
    const category = viewType === 'egg' ? 'pet' : 'plant';

    try {
        if (MGSprite.isReady() && MGSprite.has(category, species)) {
            const canvas = MGSprite.toCanvas(category, species, { scale: 0.3 });
            canvas.style.height = '16px';
            canvas.style.width = 'auto';
            canvas.style.imageRendering = 'pixelated';
            container.appendChild(canvas);
        } else {
            container.textContent = viewType === 'egg' ? '🥚' : '🌱';
        }
    } catch {
        container.textContent = viewType === 'egg' ? '🥚' : '🌱';
    }

    return container;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Close any existing dropdown menu
 */
export function closeGrowthDropdown(): void {
    const existing = document.querySelector('.growth-dropdown-menu');
    existing?.remove();
}

/**
 * Show growth dropdown menu positioned above the anchor
 *
 * Implements toggle behavior: if dropdown for same team/viewType is already
 * open, closes it instead of opening a new one.
 */
export function showGrowthDropdown(options: GrowthDropdownOptions): void {
    const { anchor, items, viewType, teamId, onSelect } = options;

    // Check for existing dropdown (toggle behavior)
    const existingMenu = document.querySelector('.growth-dropdown-menu');
    if (existingMenu) {
        const isSameToggle =
            existingMenu.getAttribute('data-owner-id') === teamId &&
            existingMenu.getAttribute('data-view-type') === viewType;
        existingMenu.remove();

        // If closing same dropdown, we're done
        if (isSameToggle) {
            return;
        }
    }

    // Create menu
    const menu = element('div', { className: 'growth-dropdown-menu' });
    menu.setAttribute('data-owner-id', teamId);
    menu.setAttribute('data-view-type', viewType);

    // Empty state
    if (items.length === 0) {
        const emptyOption = element('div', { className: 'growth-dropdown-option' });
        emptyOption.textContent = 'No items growing';
        menu.appendChild(emptyOption);
    } else {
        // Create options for each item
        for (const item of items) {
            const id = item.tileIndex;
            const species = getItemSpecies(item, viewType);
            const endTime = getItemEndTime(item, viewType);

            const option = element('div', { className: 'growth-dropdown-option' });

            // Add sprite
            option.appendChild(createSpriteElement(species, viewType));

            // Add text
            const date = new Date(endTime);
            const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
            const textSpan = element('span', { className: 'dropdown-text' });
            textSpan.textContent = `${species} - ${timeStr}`;
            option.appendChild(textSpan);

            // Click handler
            option.onclick = (e) => {
                e.stopPropagation();
                onSelect(String(id));
                menu.remove();
            };

            menu.appendChild(option);
        }
    }

    // Position ABOVE the anchor (fixed positioning to escape container clipping)
    const rect = anchor.getBoundingClientRect();
    menu.style.position = 'fixed';
    menu.style.bottom = `${window.innerHeight - rect.top + 4}px`;
    menu.style.top = 'auto';
    menu.style.left = 'auto';
    menu.style.right = `${window.innerWidth - rect.right}px`;
    menu.style.marginTop = '0';
    menu.style.zIndex = '999999';

    // Append to body for z-index
    document.body.appendChild(menu);

    // Close on click outside
    const close = (e: MouseEvent) => {
        if (!menu.contains(e.target as Node) && e.target !== anchor) {
            menu.remove();
            document.removeEventListener('click', close, true);
        }
    };
    setTimeout(() => document.addEventListener('click', close, true), 10);
}
