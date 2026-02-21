/**
 * Shared DOM helpers for journal QOL injections
 *
 * Extracted from journalAllTab and journalFilterSort to avoid duplication.
 */

import { MGData } from '../../../../modules';
import { resolveSpeciesId } from './names';

// ─────────────────────────────────────────────────────────────────────────────
// Modal Caching
// ─────────────────────────────────────────────────────────────────────────────

let cachedModal: HTMLElement | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 500;

/**
 * Find the journal modal by looking for GardenJournal.webp background image.
 * Uses computed styles since Chakra UI applies styles via CSS, not inline.
 * Includes 500ms TTL cache for performance.
 */
export function findJournalModal(): HTMLElement | null {
    // Check cache first
    if (cachedModal && Date.now() - cacheTime < CACHE_TTL_MS && document.contains(cachedModal)) {
        return cachedModal;
    }
    // Strategy 1: Look for elements with GardenJournal in computed background-image
    const boxes = document.querySelectorAll<HTMLElement>('.chakra-box, [class*="Box"], div');
    for (const el of boxes) {
        if (el.style.backgroundImage?.includes('GardenJournal')) {
            cachedModal = el;
            cacheTime = Date.now();
            return el;
        }
        const computed = window.getComputedStyle(el);
        if (computed.backgroundImage?.includes('GardenJournal')) {
            cachedModal = el;
            cacheTime = Date.now();
            return el;
        }
    }

    // Strategy 2: Find by looking for "GARDEN JOURNAL" text and walking up
    const textElements = document.querySelectorAll<HTMLElement>('.chakra-text, p, span');
    for (const el of textElements) {
        if (el.textContent?.includes('GARDEN JOURNAL')) {
            let parent = el.parentElement;
            for (let i = 0; i < 10 && parent; i++) {
                if (parent.classList.contains('McGrid') || parent.querySelector('.McGrid')) {
                    cachedModal = parent;
                    cacheTime = Date.now();
                    return parent;
                }
                parent = parent.parentElement;
            }
        }
    }

    cachedModal = null;
    cacheTime = Date.now();
    return null;
}

/**
 * Invalidate the journal modal cache.
 * Call this when the journal closes to prevent stale references.
 */
export function invalidateJournalModalCache(): void {
    cachedModal = null;
    cacheTime = 0;
}

/**
 * Check if we're currently on the journal page (modal is open).
 */
export function isJournalPage(): boolean {
    return findJournalModal() !== null;
}

/**
 * Find the scrollable species list (McFlex with overflowY: auto containing McGrid children).
 */
export function findScrollableSpeciesList(): HTMLElement | null {
    const modal = findJournalModal();
    if (!modal) return null;

    const flexes = modal.querySelectorAll<HTMLElement>('.McFlex');
    for (const flex of flexes) {
        const computed = window.getComputedStyle(flex);
        if ((computed.overflowY === 'auto' || computed.overflowY === 'scroll') &&
            flex.querySelector(':scope > .McGrid')) {
            return flex;
        }
    }
    return null;
}
/**
 * Find the overview page header containing "Collected X%"
 */
export function findOverviewHeader(): HTMLElement | null {
    const modal = findJournalModal();
    if (!modal) return null;

    const textElements = modal.querySelectorAll<HTMLElement>('.chakra-text, p, span');
    for (const el of textElements) {
        const text = el.textContent?.trim() ?? '';
        if (text.match(/Collected\s+\d+%/i)) {
            return el;
        }
    }
    return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab Management
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Find the tab button container (McGrid containing Crops/Pets tabs)
 */
export function findTabContainer(): HTMLElement | null {
    const modal = findJournalModal();
    if (!modal) return null;

    const grids = modal.querySelectorAll<HTMLElement>('.McGrid');
    for (const grid of grids) {
        const buttons = grid.querySelectorAll('button');
        for (const btn of buttons) {
            const text = btn.textContent?.trim();
            if (text === 'Crops' || text === 'Pets') {
                return grid;
            }
        }
    }
    return null;
}

/**
 * Find native tab buttons (Crops and Pets)
 * Returns { crops: HTMLButtonElement | null, pets: HTMLButtonElement | null }
 */
export function findTabButtons(): { crops: HTMLButtonElement | null; pets: HTMLButtonElement | null } {
    const modal = findJournalModal();
    if (!modal) return { crops: null, pets: null };

    let crops: HTMLButtonElement | null = null;
    let pets: HTMLButtonElement | null = null;

    const buttons = modal.querySelectorAll<HTMLButtonElement>('button');
    for (const btn of buttons) {
        const text = btn.textContent?.trim();
        if (text === 'Crops') crops = btn;
        if (text === 'Pets') pets = btn;
    }

    return { crops, pets };
}

/**
 * Find the content wrapper (McFlex with overflow: hidden containing native tab content)
 */
export function findContentWrapper(): HTMLElement | null {
    const modal = findJournalModal();
    if (!modal) return null;

    const grids = modal.querySelectorAll<HTMLElement>('.McGrid');
    for (const grid of grids) {
        const flexes = grid.querySelectorAll<HTMLElement>(':scope > .McFlex');
        for (const flex of flexes) {
            const computed = window.getComputedStyle(flex);
            if (computed.overflow === 'hidden' || computed.overflowY === 'hidden') {
                if (flex.textContent?.includes('JOURNAL') || flex.querySelector('.McGrid')) {
                    return flex;
                }
            }
        }
    }
    return null;
}

/**
 * Detect currently active native tab (crops or pets)
 * Returns 'crops', 'pets', or null if neither is active
 */
export function getCurrentTab(): 'crops' | 'pets' | null {
    const modal = findJournalModal();
    if (!modal) return null;

    const buttons = modal.querySelectorAll<HTMLButtonElement>('button');
    for (const btn of buttons) {
        const text = btn.textContent?.trim();
        if (text === 'Crops' || text === 'Pets') {
            // Check if this tab is active (height: 35px instead of 20px)
            const tabInner = btn.querySelector('div');
            if (tabInner) {
                const innerTab = tabInner.querySelector<HTMLElement>('div');
                if (innerTab) {
                    const computed = window.getComputedStyle(innerTab);
                    // Active tabs have height > 20px (typically 35px)
                    const height = parseFloat(computed.height);
                    if (height > 25) {
                        return text.toLowerCase() as 'crops' | 'pets';
                    }
                }
            }
        }
    }
    return null;
}

/**
 * Retract native tabs to inactive state (height: 20px)
 * Called when custom tabs (All/Guide) are activated
 */
export function deactivateNativeTabs(): void {
    const modal = findJournalModal();
    if (!modal) return;

    const buttons = modal.querySelectorAll<HTMLButtonElement>('button');
    for (const btn of buttons) {
        const text = btn.textContent?.trim();
        if (text === 'Crops' || text === 'Pets') {
            const tabInner = btn.querySelector('div');
            if (tabInner) {
                const innerTab = tabInner.querySelector<HTMLElement>('div');
                if (innerTab) {
                    innerTab.style.height = '20px';
                }
            }
        }
    }
}

/**
 * Restore native tabs to active state (height: 35px)
 * Called when custom tabs (All/Guide) are deactivated
 */
export function reactivateNativeTabs(): void {
    const modal = findJournalModal();
    if (!modal) return;

    const buttons = modal.querySelectorAll<HTMLButtonElement>('button');
    for (const btn of buttons) {
        const text = btn.textContent?.trim();
        if (text === 'Crops' || text === 'Pets') {
            const tabInner = btn.querySelector('div');
            if (tabInner) {
                const innerTab = tabInner.querySelector<HTMLElement>('div');
                if (innerTab && innerTab.style.height === '20px') {
                    innerTab.style.height = '';
                }
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Species Order Detection
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build ordered species IDs from DOM entries (used by journalGuide and journalHints).
 * Maps known species names, then fills unknowns using MGData order.
 *
 * @param entries - Array of journal entry DOM elements
 * @param category - 'crop' or 'pet'
 * @returns Array of species IDs in journal display order
 */
export function buildOrderedSpeciesIdsFromDOM(entries: HTMLElement[], category: 'crop' | 'pet'): string[] {
    const ids: string[] = [];

    // First pass: collect all known species IDs in order
    for (const entry of entries) {
        const textElements = entry.querySelectorAll('.chakra-text, p, span');
        let foundSpecies: string | null = null;

        for (const text of textElements) {
            const content = text.textContent?.trim() ?? '';
            // Skip progress indicators and percents
            if (content.includes('%') || /^\d+\/\d+$/.test(content)) continue;
            if (content.length < 2 || content.length > 30) continue;

            // Try to resolve known species names
            if (content !== '???') {
                const resolved = resolveSpeciesId(content);
                if (resolved && resolved.type === category) {
                    foundSpecies = resolved.id;
                    break;
                }
            }
        }

        ids.push(foundSpecies ?? ''); // Empty string for unknown
    }

    // Second pass: fill in unknowns using MGData order
    const allSpeciesData = category === 'crop' ? MGData.get('plants') : MGData.get('pets');
    const allSpeciesIds = allSpeciesData ? Object.keys(allSpeciesData) : [];
    const usedIds = new Set(ids.filter(id => id !== ''));
    const availableIds = allSpeciesIds.filter(id => !usedIds.has(id));

    let availableIndex = 0;
    for (let i = 0; i < ids.length; i++) {
        if (ids[i] === '' && availableIndex < availableIds.length) {
            ids[i] = availableIds[availableIndex];
            availableIndex++;
        }
    }

    return ids;
}
