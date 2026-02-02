/**
 * Journal Hints - Core Injection Logic
 * 
 * Watches for "???" badges in journal species pages and adds
 * hint tooltips on hover/tap explaining how to obtain each variant.
 * 
 * Per ui/inject.md: No Shadow DOM, tracked cleanup, idempotent
 */

import { createCleanupTracker, addObserverWithCleanup } from '../../core/lifecycle';
import { createHintLookup, getCropVariants, getPetVariants } from './hints';
import { showHintTooltip, hideHintTooltip } from './render';
import { resolveSpeciesId } from '../_shared/names';

// -----------------------------------------------------------------------------
// State
// -----------------------------------------------------------------------------

let tracker = createCleanupTracker();
let initialized = false;
const HINT_ATTACHED_CLASS = 'gemini-hint-attached';

const hintLookup = createHintLookup();

// -----------------------------------------------------------------------------
// Detection Helpers
// -----------------------------------------------------------------------------

/**
 * Get species name and internal ID from the journal species page header
 * Uses shared resolver to map display names to internal IDs
 */
function getSpeciesNameFromPage(): { displayName: string; id: string; type: 'crop' | 'pet' } | null {
    // The species name appears in a Text component at the top of the species page
    // It should be larger text, not "???" and not contain "/" (like "0/11")
    const textElements = document.querySelectorAll<HTMLElement>('.chakra-text, p, span');

    for (const el of textElements) {
        const text = el.textContent?.trim();
        if (!text) continue;

        // Skip "???"
        if (text === '???') continue;

        // Skip progress text (contains "/")
        if (text.includes('/')) continue;

        // Skip percentage text
        if (text.includes('%')) continue;

        // Skip common UI text
        if (text === 'Crops' || text === 'Pets' || text === 'All') continue;
        if (text.includes('GARDEN') || text.includes('JOURNAL')) continue;
        if (text.includes('Collected')) continue;

        // Check if it's plausibly a species name (reasonable length)
        if (text.length >= 3 && text.length <= 20) {
            // Try to resolve display name to internal ID
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
    // Look for text that says "Crops" or "Pets" and check if it's in the active tab
    const buttons = document.querySelectorAll<HTMLButtonElement>('button');

    for (const btn of buttons) {
        const text = btn.textContent?.trim();
        // Check if this button has the "active" style (taller height)
        const motionFlex = btn.querySelector<HTMLElement>('[class*="MotionMcFlex"], .MotionMcFlex, div[style*="height: 35px"]');
        if (motionFlex) {
            const height = motionFlex.offsetHeight;
            // Active tab is taller (35px vs 20px)
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
 *    JournalStamp (has Stamp.webp background)
 *    McFlex
 *        Text "???"  WE TARGET THIS
 * 
 * DETECTION: Walk up from "???" text to find a container whose children
 * include an element with Stamp.webp in its backgroundImage
 */
function findUnknownBadges(): HTMLElement[] {
    const badges: HTMLElement[] = [];

    // Look for all text elements
    const allParagraphs = document.querySelectorAll<HTMLElement>('p');
    const allSpans = document.querySelectorAll<HTMLElement>('span');

    const textElements = [...allParagraphs, ...allSpans];

    for (const el of textElements) {
        // Check for exact "???" text
        const text = el.textContent?.trim();
        if (text !== '???') continue;

        // Should be visible
        if (!el.offsetParent) continue;

        // Walk up to find the entry container (has both stamp sibling and this text)
        let container: HTMLElement | null = el.parentElement;
        let entryContainer: HTMLElement | null = null;

        // Walk up max 4 levels
        for (let level = 0; level < 4 && container && !entryContainer; level++) {
            const parent = container.parentElement;
            if (!parent) break;

            // Check all siblings of container for Stamp background
            for (const sibling of Array.from(parent.children)) {
                if (!(sibling instanceof HTMLElement)) continue;
                if (sibling === container) continue; // Skip self

                // Check this sibling and its descendants for stamp background
                const checkForStamp = (elem: HTMLElement): boolean => {
                    if (hasStampBackground(elem)) return true;

                    for (const child of Array.from(elem.children)) {
                        if (child instanceof HTMLElement && checkForStamp(child)) return true;
                    }
                    return false;
                };

                if (checkForStamp(sibling)) {
                    // Found stamp sibling - parent is the entry container
                    entryContainer = parent;
                    break;
                }
            }

            container = parent;
        }

        if (!entryContainer) continue;

        // Skip if already processed (check on entry container, not text)
        if (entryContainer.classList.contains(HINT_ATTACHED_CLASS)) continue;

        badges.push(entryContainer);
    }

    return badges;
}

function getCropVariantNames(): string[] {
    return getCropVariants();
}

function getPetVariantNames(): string[] {
    return getPetVariants();
}

/**
 * Get the variant name for a stamp at a given index
 */
function getVariantForIndex(index: number, speciesType: 'crops' | 'pets'): string | null {
    const variants = speciesType === 'crops' ? getCropVariantNames() : getPetVariantNames();
    return variants[index] ?? null;
}

/**
 * Check if an element has a Stamp background image
 */
function hasStampBackground(el: HTMLElement): boolean {
    // Check inline style first (faster)
    if (el.style.backgroundImage && el.style.backgroundImage.includes('Stamp')) {
        return true;
    }
    // Check computed style (catches CSS-set backgrounds)
    const computed = window.getComputedStyle(el).backgroundImage;
    return computed.includes('Stamp');
}

/**
 * Find all stamp containers in the species page
 * Returns an ordered list of elements that have Stamp.webp background
 */
function findStampContainers(badge: HTMLElement): HTMLElement[] {
    // Walk up from badge to find a container with multiple stamps
    let container: HTMLElement | null = badge.parentElement;

    for (let level = 0; level < 8 && container; level++) {
        // Find all divs in this container and check for stamp background
        const allDivs = container.querySelectorAll<HTMLElement>('div');
        const stamps: HTMLElement[] = [];

        for (const div of allDivs) {
            if (hasStampBackground(div)) {
                stamps.push(div);
            }
        }

        // If we find multiple stamps (at least 4 for crops, 4 for pets), we've found the species page
        if (stamps.length >= 4) {
            return stamps;
        }

        container = container.parentElement;
    }

    return [];
}

/**
 * Find the index of a badge within the stamp grid
 * APPROACH: Walk up from badge to find the closest container that contains
 * exactly ONE stamp. That stamp's position in the stamps array is the answer.
 */
function findBadgeStampIndex(badge: HTMLElement, stamps: HTMLElement[]): number {
    // Walk up from badge to find entry container
    let container: HTMLElement | null = badge.parentElement;

    for (let level = 0; level < 6 && container; level++) {
        // Count how many stamps are in this container
        const stampsInContainer: HTMLElement[] = [];

        for (const stamp of stamps) {
            if (container.contains(stamp)) {
                stampsInContainer.push(stamp);
            }
        }

        // If exactly one stamp, we found the entry container!
        if (stampsInContainer.length === 1) {
            const stamp = stampsInContainer[0];
            const index = stamps.indexOf(stamp);
            return index;
        }

        container = container.parentElement;
    }

    return -1;
}

/**
 * Determine if a stamp represents a crop variant or a pet ability
 */
function getStampType(index: number, totalStamps: number): 'variant' | 'ability' {
    // For pets, abilities appear after variants
    if (totalStamps > getPetVariantNames().length) {
        return index >= getPetVariantNames().length ? 'ability' : 'variant';
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
    if (!activeTab) return;

    // Find all stamps in the species page
    const stamps = findStampContainers(badge);
    if (stamps.length === 0) return;

    // Find this badge's index in the stamps array
    const index = findBadgeStampIndex(badge, stamps);
    if (index === -1) return;

    let hintText = '';

    if (activeTab === 'crops') {
        const variantId = getVariantForIndex(index, 'crops');
        if (!variantId) return;
        hintText = hintLookup.getCropHint(variantId, { speciesId: species.id, speciesName: species.displayName });
    } else if (activeTab === 'pets') {
        const stampType = getStampType(index, stamps.length);

        if (stampType === 'variant') {
            const variantId = getVariantForIndex(index, 'pets');
            if (!variantId) return;
            hintText = hintLookup.getPetVariantHint(variantId, { speciesId: species.id, speciesName: species.displayName });
        } else {
            hintText = hintLookup.getAbilityHint(species.id);
        }
    }

    // Mark this badge as processed
    badge.classList.add(HINT_ATTACHED_CLASS);

    // Attach event listeners for tooltip
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

    processBadges();
    setupObserver();
}

export function destroy(): void {
    if (!initialized) return;
    initialized = false;

    tracker.run();
    tracker.clear();
    tracker = createCleanupTracker();

    // Cleanup any active tooltip
    hideHintTooltip();
}

export function isEnabled(): boolean {
    return initialized;
}


