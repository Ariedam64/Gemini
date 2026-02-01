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
import { CROP_VARIANT_IDS, PET_VARIANT_IDS } from '../_shared/constants';
import { resolveSpeciesId } from '../_shared/names';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let tracker = createCleanupTracker();
let initialized = false;
const HINT_ATTACHED_CLASS = 'gemini-hint-attached';

// ─────────────────────────────────────────────────────────────────────────────
// Detection Helpers
// ─────────────────────────────────────────────────────────────────────────────



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

// ─────────────────────────────────────────────────────────────────────────────
// Badge Detection and Attachment
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Find all "???" text elements on the current page that haven't been processed
 * These appear in SpeciesPageEntry for unknown/unlogged variants
 * 
 * STRUCTURE (from SpeciesPageEntry.tsx):
 * McGrid (templateRows="1fr auto")
 *   ├─ JournalStamp (has Stamp.webp background)
 *   └─ McFlex
 *       └─ Text "???" ← WE TARGET THIS
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

/**
 * Get variant internal IDs in order (matching game layout)
 * IMPORTANT: Use internal IDs, not display names
 * - Ambershine (not "Amberlit")
 * - Dawncharged (not "Dawnbound")
 * - Ambercharged (not "Amberbound")
 */
function getCropVariantNames(): string[] {
    return [...CROP_VARIANT_IDS];
}

function getPetVariantNames(): string[] {
    return [...PET_VARIANT_IDS];
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
 * Validate variant ID exists in hints system
 */
function validateVariantId(variantId: string, speciesType: 'crops' | 'pets'): boolean {
    const validList: readonly string[] = speciesType === 'crops' ? CROP_VARIANT_IDS : PET_VARIANT_IDS;
    return validList.includes(variantId);
}

/**
 * Attach hint listeners to a badge element
 */
function attachHintToBadge(badge: HTMLElement): void {
    if (badge.classList.contains(HINT_ATTACHED_CLASS)) return;
    badge.classList.add(HINT_ATTACHED_CLASS);

    const species = getSpeciesNameFromPage();
    if (!species) return;

    const speciesType = species.type === 'crop' ? 'crops' : 'pets';
    const speciesId = species.id;  // Internal ID
    const speciesDisplayName = species.displayName;  // Display name

    // Find all stamps
    const allStamps = findStampContainers(badge);
    if (allStamps.length === 0) return;

    // Find index of this badge's stamp
    const stampIndex = findBadgeStampIndex(badge, allStamps);
    if (stampIndex < 0) return;

    const variantName = getVariantForIndex(stampIndex, speciesType);
    if (!variantName) return;

    if (!validateVariantId(variantName, speciesType)) {
        return;
    }

    // Create hint text using INTERNAL ID (so abilities can match correctly)
    let hintText: string;
    if (speciesType === 'crops') {
        hintText = getCropHint(variantName, speciesDisplayName);
    } else {
        // Check if this is a variant or ability (abilities come after first 4 pet variants)
        if (stampIndex < 4) {
            hintText = getPetVariantHint(variantName, speciesDisplayName);
        } else {
            // Pass internal ID for ability hints (so egg type matching works)
            hintText = getAbilityHint(speciesId);
        }
    }

    // Attach hover listeners (desktop) - show immediately on enter
    const handleMouseEnter = () => showHintTooltip(badge, hintText);
    const handleMouseLeave = () => hideHintTooltip();

    badge.addEventListener('mouseenter', handleMouseEnter);
    badge.addEventListener('mouseleave', handleMouseLeave);

    // Attach touch listener (mobile)
    const handleTouch = (e: TouchEvent) => {
        e.preventDefault();
        showHintTooltip(badge, hintText);
        // Hide after 3 seconds on mobile
        setTimeout(hideHintTooltip, 3000);
    };

    badge.addEventListener('touchstart', handleTouch, { passive: false });

    // Track cleanup
    tracker.add(() => {
        badge.removeEventListener('mouseenter', handleMouseEnter);
        badge.removeEventListener('mouseleave', handleMouseLeave);
        badge.removeEventListener('touchstart', handleTouch);
        badge.classList.remove(HINT_ATTACHED_CLASS);
    });

    // Add cursor style to indicate interactivity
    badge.style.cursor = 'help';
}

// ─────────────────────────────────────────────────────────────────────────────
// Observation
// ─────────────────────────────────────────────────────────────────────────────

function processPage(): void {
    const badges = findUnknownBadges();
    for (const badge of badges) {
        attachHintToBadge(badge);
    }
}

function startObserving(): void {
    // Initial scan with delays for React renders
    setTimeout(processPage, 100);
    setTimeout(processPage, 300);
    setTimeout(processPage, 700);

    // Watch for new badges
    const observer = new MutationObserver(() => {
        setTimeout(processPage, 50);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    addObserverWithCleanup(tracker, observer);
}

function stopObserving(): void {
    hideHintTooltip();
    tracker.run();
    tracker.clear();
    tracker = createCleanupTracker();
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function init(): void {
    if (initialized) return;
    initialized = true;
    startObserving();
    console.log('[JournalHints] Initialized');
}

export function destroy(): void {
    if (!initialized) return;
    initialized = false;
    stopObserving();
    console.log('[JournalHints] Destroyed');
}

export function isEnabled(): boolean {
    return initialized;
}
