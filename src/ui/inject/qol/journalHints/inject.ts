/**
 * Journal Hints - Core Injection Logic
 *
 * Watches for "???" badges in journal species pages and adds
 * hint tooltips on hover/tap explaining how to obtain each variant.
 *
 * Per ui/inject.md: No Shadow DOM, tracked cleanup, idempotent
 */

import { createCleanupTracker, addObserverWithCleanup } from '../../core/lifecycle';
import { getCropHint, getPetVariantHint, getAbilityHint } from './hints';
import { showHintTooltip, hideHintTooltip } from './render';
import { resolveSpeciesId } from '../_shared/names';
import { MGData } from '../../../../modules/data';
import {
    getCropJournalOrder,
    getPetJournalOrder,
    getCropVariantCount,
    getPetVariantCount,
} from './variantOrder';

// -----------------------------------------------------------------------------
// State
// -----------------------------------------------------------------------------

let tracker = createCleanupTracker();
let initialized = false;
const HINT_ATTACHED_CLASS = 'gemini-hint-attached';

// Track the currently viewed species for unknown species identification
let lastViewedSpecies: { id: string; type: 'crop' | 'pet' } | null = null;


// -----------------------------------------------------------------------------
// Detection Helpers
// -----------------------------------------------------------------------------

// Specific selector for species name on detail page (same as abilitiesInject)
const SPECIES_NAME_SELECTOR = 'p.chakra-text.css-1qd26jh';

/**
 * Get the actual species name from MGData, even if it's displayed as "???"
 */
function getActualSpeciesName(speciesId: string, type: 'crop' | 'pet'): string {
    const dataKey = type === 'crop' ? 'plants' : 'pets';
    const data = MGData.get(dataKey) as Record<string, any> | null;
    if (!data || !data[speciesId]) return speciesId;

    const itemKey = type === 'crop' ? 'crop' : 'pet';
    return data[speciesId][itemKey]?.name || speciesId;
}

/**
 * Get species name and internal ID from the journal species page header
 * Uses shared resolver to map display names to internal IDs
 */
function getSpeciesNameFromPage(): { displayName: string; id: string; type: 'crop' | 'pet' } | null {
    // Try specific selector first (same as abilitiesInject)
    const speciesNameEl = document.querySelector<HTMLElement>(SPECIES_NAME_SELECTOR);
    if (speciesNameEl) {
        const name = speciesNameEl.textContent?.trim();
        if (name && name !== '???') {
            const resolution = resolveSpeciesId(name);
            if (resolution) {
                return { displayName: name, id: resolution.id, type: resolution.type };
            }
        }

        // If the specific selector shows "???", this is an unknown species
        if (name === '???') {
            // Use the last viewed species from click tracking
            if (lastViewedSpecies) {
                return {
                    displayName: '???',
                    id: lastViewedSpecies.id,
                    type: lastViewedSpecies.type,
                };
            }
        }
    }

    // Fallback: search all text elements (original approach)
    const textElements = document.querySelectorAll<HTMLElement>('.chakra-text, p, span');

    for (const el of textElements) {
        const text = el.textContent?.trim();
        if (!text) continue;

        // Skip "???" - we handle it above with the specific selector
        if (text === '???') continue;

        // Skip progress indicators and UI text
        if (/^\d+\/\d+$/.test(text)) continue;
        if (text.includes('%')) continue;
        if (text === 'Crops' || text === 'Pets' || text === 'All') continue;
        if (text.includes('GARDEN') || text.includes('JOURNAL')) continue;
        if (text.includes('Collected')) continue;

        // Check if it's plausibly a species name (reasonable length)
        if (text.length >= 3 && text.length <= 20) {
            const resolution = resolveSpeciesId(text);
            if (resolution) {
                return { displayName: text, id: resolution.id, type: resolution.type };
            }
        }
    }

    return null;
}

/**
 * Determine what tab we're on based on visible content
 */
function getActiveTab(): 'crops' | 'pets' | null {
    const buttons = document.querySelectorAll<HTMLButtonElement>('button');

    for (const btn of buttons) {
        const text = btn.textContent?.trim();
        const motionFlex = btn.querySelector<HTMLElement>('[class*="MotionMcFlex"], .MotionMcFlex, div[style*="height: 35px"]');
        if (motionFlex) {
            const height = motionFlex.offsetHeight;
            if (height >= 30) {
                if (text === 'Crops') return 'crops';
                if (text === 'Pets') return 'pets';
            }
        }
    }
    return null;
}

// -----------------------------------------------------------------------------
// Badge Detection and Attachment
// -----------------------------------------------------------------------------

/**
 * Find all "???" text elements on the current page that haven't been processed
 * These appear in SpeciesPageEntry for unknown/unlogged variants
 *
 * STRUCTURE (from SpeciesPageEntry.tsx):
 * McGrid (templateRows="1fr auto")
 *    JournalStamp (has Stamp.webp background)
 *    McFlex
 *        Text "???"  WE TARGET THIS
 *
 * DETECTION: Walk up from "???" text to find a container whose children
 * include an element with Stamp.webp in its backgroundImage
 */
function findUnknownBadges(): HTMLElement[] {
    const badges: HTMLElement[] = [];

    const allParagraphs = document.querySelectorAll<HTMLElement>('p');
    const allSpans = document.querySelectorAll<HTMLElement>('span');
    const textElements = [...allParagraphs, ...allSpans];

    for (const el of textElements) {
        const text = el.textContent?.trim();
        if (text !== '???') continue;

        if (!el.offsetParent) continue;

        let container: HTMLElement | null = el.parentElement;
        let entryContainer: HTMLElement | null = null;

        for (let level = 0; level < 4 && container && !entryContainer; level++) {
            const parent = container.parentElement;
            if (!parent) break;

            for (const sibling of Array.from(parent.children)) {
                if (!(sibling instanceof HTMLElement)) continue;
                if (sibling === container) continue;

                const checkForStamp = (elem: HTMLElement): boolean => {
                    if (hasStampBackground(elem)) return true;
                    for (const child of Array.from(elem.children)) {
                        if (child instanceof HTMLElement && checkForStamp(child)) return true;
                    }
                    return false;
                };

                if (checkForStamp(sibling)) {
                    entryContainer = parent;
                    break;
                }
            }

            container = parent;
        }

        if (!entryContainer) continue;
        if (entryContainer.classList.contains(HINT_ATTACHED_CLASS)) continue;

        badges.push(entryContainer);
    }

    return badges;
}

/**
 * Get the variant internal ID for a stamp at a given index.
 * Uses the dynamically-derived variant order from variantOrder module.
 */
function getVariantForIndex(index: number, speciesType: 'crops' | 'pets'): string | null {
    const variants = speciesType === 'crops' ? getCropJournalOrder() : getPetJournalOrder();
    return variants[index] ?? null;
}

/**
 * Check if an element has a Stamp background image
 */
function hasStampBackground(el: HTMLElement): boolean {
    if (el.style.backgroundImage && el.style.backgroundImage.includes('Stamp')) {
        return true;
    }
    const computed = window.getComputedStyle(el).backgroundImage;
    return computed.includes('Stamp');
}

/**
 * Find all stamp containers in the species page
 * Returns an ordered list of elements that have Stamp.webp background
 */
function findStampContainers(badge: HTMLElement): HTMLElement[] {
    let container: HTMLElement | null = badge.parentElement;

    for (let level = 0; level < 8 && container; level++) {
        const allDivs = container.querySelectorAll<HTMLElement>('div');
        const stamps: HTMLElement[] = [];

        for (const div of allDivs) {
            if (hasStampBackground(div)) {
                stamps.push(div);
            }
        }

        if (stamps.length >= 4) {
            return stamps;
        }

        container = container.parentElement;
    }

    return [];
}

/**
 * Find the index of a badge within the stamp grid
 */
function findBadgeStampIndex(badge: HTMLElement, stamps: HTMLElement[]): number {
    let container: HTMLElement | null = badge.parentElement;

    for (let level = 0; level < 6 && container; level++) {
        const stampsInContainer: HTMLElement[] = [];

        for (const stamp of stamps) {
            if (container.contains(stamp)) {
                stampsInContainer.push(stamp);
            }
        }

        if (stampsInContainer.length === 1) {
            const stamp = stampsInContainer[0];
            return stamps.indexOf(stamp);
        }

        container = container.parentElement;
    }

    return -1;
}

/**
 * Determine if a stamp represents a crop variant or a pet ability.
 * Uses dynamic pet variant count from MGData.
 */
function getStampType(index: number, totalStamps: number): 'variant' | 'ability' {
    const petVariantCount = getPetVariantCount();
    if (totalStamps > petVariantCount) {
        return index >= petVariantCount ? 'ability' : 'variant';
    }
    return 'variant';
}

/**
 * Attach hint tooltip to a badge container
 */
function attachHintToBadge(badge: HTMLElement): void {
    const species = getSpeciesNameFromPage();
    if (!species) return;

    const activeTab = getActiveTab();
    if (!activeTab && !species.type) return;

    const stamps = findStampContainers(badge);
    if (stamps.length === 0) return;

    const index = findBadgeStampIndex(badge, stamps);
    if (index === -1) return;

    let hintText = '';

    const category = species.type || (activeTab === 'crops' ? 'crop' : 'pet');
    const actualName = getActualSpeciesName(species.id, category);

    if (category === 'crop') {
        const variantId = getVariantForIndex(index, 'crops');
        if (!variantId) return;
        hintText = getCropHint(variantId, actualName);
    } else if (category === 'pet') {
        const stampType = getStampType(index, stamps.length);

        if (stampType === 'variant') {
            const variantId = getVariantForIndex(index, 'pets');
            if (!variantId) return;
            hintText = getPetVariantHint(variantId, actualName);
        } else {
            hintText = getAbilityHint(species.id);
        }
    }

    badge.classList.add(HINT_ATTACHED_CLASS);

    const handleMouseEnter = () => showHintTooltip(badge, hintText);
    const handleMouseLeave = () => hideHintTooltip();
    const handleClick = (e: Event) => {
        e.stopPropagation();
        showHintTooltip(badge, hintText);
        setTimeout(() => hideHintTooltip(), 3000);
    };

    badge.addEventListener('mouseenter', handleMouseEnter);
    badge.addEventListener('mouseleave', handleMouseLeave);
    badge.addEventListener('click', handleClick);

    tracker.add(() => {
        badge.removeEventListener('mouseenter', handleMouseEnter);
        badge.removeEventListener('mouseleave', handleMouseLeave);
        badge.removeEventListener('click', handleClick);
    });
}

/**
 * Process all unknown badges on the current page
 */
function processBadges(): void {
    const badges = findUnknownBadges();
    if (badges.length === 0) return;

    for (const badge of badges) {
        attachHintToBadge(badge);
    }
}

/**
 * Build species ID list in visual order by reading from DOM (shared with journalGuide)
 */
function buildOrderedSpeciesIdsFromDOM(entries: HTMLElement[], category: 'crop' | 'pet'): string[] {
    const ids: string[] = [];

    for (const entry of entries) {
        const textElements = entry.querySelectorAll('.chakra-text, p, span');
        let foundSpecies: string | null = null;

        for (const text of textElements) {
            const content = text.textContent?.trim() ?? '';
            if (content.includes('%') || /^\d+\/\d+$/.test(content)) continue;
            if (content.length < 2 || content.length > 30) continue;

            if (content !== '???') {
                const resolved = resolveSpeciesId(content);
                if (resolved && resolved.type === category) {
                    foundSpecies = resolved.id;
                    break;
                }
            }
        }

        ids.push(foundSpecies ?? '');
    }

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

/**
 * Track species entry clicks to identify which species is being viewed
 */
function trackSpeciesClicks(): void {
    const clickHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        const entry = target.closest('.McGrid');
        if (!entry) return;

        const textElements = entry.querySelectorAll('.chakra-text, p, span');
        for (const text of textElements) {
            const content = text.textContent?.trim() ?? '';

            if (content.includes('%') || /^\d+\/\d+$/.test(content)) continue;
            if (content.length < 2 || content.length > 30) continue;

            if (content !== '???') {
                const resolved = resolveSpeciesId(content);
                if (resolved) {
                    lastViewedSpecies = { id: resolved.id, type: resolved.type };
                    return;
                }
            }
        }

        const scrollable = entry.closest('.McFlex');
        if (!scrollable) return;

        const allEntries = Array.from(scrollable.querySelectorAll<HTMLElement>(':scope > .McGrid'));
        const index = allEntries.indexOf(entry as HTMLElement);
        if (index === -1) return;

        const activeTab = getActiveTab();

        let category: 'crop' | 'pet';
        let relevantEntries: HTMLElement[];
        let adjustedIndex: number;

        if (!activeTab) {
            const plantsData = MGData.get('plants');
            const numCropSpecies = plantsData ? Object.keys(plantsData).length : 0;

            if (index < numCropSpecies) {
                category = 'crop';
                relevantEntries = allEntries.slice(0, numCropSpecies);
                adjustedIndex = index;
            } else {
                category = 'pet';
                relevantEntries = allEntries.slice(numCropSpecies);
                adjustedIndex = index - numCropSpecies;
            }
        } else {
            category = activeTab === 'crops' ? 'crop' : 'pet';
            relevantEntries = allEntries;
            adjustedIndex = index;
        }

        const orderedIds = buildOrderedSpeciesIdsFromDOM(relevantEntries, category);

        if (adjustedIndex < orderedIds.length && orderedIds[adjustedIndex]) {
            lastViewedSpecies = { id: orderedIds[adjustedIndex], type: category };
        }
    };

    document.body.addEventListener('click', clickHandler, { capture: true });
    tracker.add(() => document.body.removeEventListener('click', clickHandler, { capture: true }));
}

/**
 * Setup mutation observer to watch for new species pages
 */
function setupObserver(): void {
    const observer = new MutationObserver(() => {
        if (!initialized) return;
        processBadges();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    addObserverWithCleanup(tracker, observer);
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

export function init(): void {
    if (initialized) return;
    initialized = true;

    trackSpeciesClicks();
    processBadges();
    setupObserver();
}

export function destroy(): void {
    if (!initialized) return;
    initialized = false;

    tracker.run();
    tracker.clear();
    tracker = createCleanupTracker();

    hideHintTooltip();
}

export function isEnabled(): boolean {
    return initialized;
}
