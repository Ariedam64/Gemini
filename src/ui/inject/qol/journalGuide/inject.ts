/**
 * Journal Guide - Tab Integration
 *
 * Injects a "Guide" tab into the journal modal showing actionable recommendations
 * for obtaining missing variants. Follows journalAllTab pattern for natural integration.
 */

import {
    createCleanupTracker,
    addObserverWithCleanup,
    isMutationGuarded,
    withMutationGuard,
} from '../../core/lifecycle';
import { findJournalModal, findScrollableSpeciesList } from '../_shared/dom';
import { resolveSpeciesId } from '../_shared/names';
import { onCustomTabChange } from '../_shared/tabState';
import { MGData, MGEnvironment, MGSprite } from '../../../../modules';
import { getMyGarden, getMyPets, getMyInventory } from '../../../../globals';
import { injectStyles, removeStyles } from './styles';
import { startWeatherTracking, stopWeatherTracking } from './weather';
import { EVENTS } from '../../../../utils/storage';
import { gatherContext, invalidateContext } from './context';
import { computeAllRecommendations, countAvailableNow, type Recommendation } from './scoring';
import { selectBadge } from './badges';
import { createBadgeElement, cleanupTooltips } from './render';
import { createGuideTab, activateGuideTab, deactivateGuideTab, resetGuideTabState } from './guideTab';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let tabTracker = createCleanupTracker();
let contentTracker = createCleanupTracker();
let initialized = false;
let guideTabActive = false;

// Badge diffing
const activeBadges = new Map<string, { element: HTMLElement; badgeKey: string }>();

// Debounce timers
let refreshTimer: number | null = null;
let badgeRefreshTimer: number | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Tab Detection
// ─────────────────────────────────────────────────────────────────────────────

interface SpeciesEntry {
    element: HTMLElement;
    speciesId: string;
    category: 'crop' | 'pet';
}

function findTabContainer(): HTMLElement | null {
    const modal = findJournalModal();
    if (!modal) return null;

    const allElements = modal.querySelectorAll<HTMLElement>('.chakra-text, p, span');

    for (const el of allElements) {
        const text = el.textContent?.trim();
        if (text === 'Crops' || text === 'Pets' || text === 'All') {
            const button = el.closest('button');
            if (button) {
                const container = button.parentElement;
                if (container) {
                    const buttons = container.querySelectorAll('button');
                    if (buttons.length >= 2) {
                        return container as HTMLElement;
                    }
                }
            }
        }
    }
    return null;
}

function findTabButtons(): { crops: HTMLButtonElement | null; pets: HTMLButtonElement | null; all: HTMLButtonElement | null } {
    const container = findTabContainer();
    if (!container) return { crops: null, pets: null, all: null };

    let crops: HTMLButtonElement | null = null;
    let pets: HTMLButtonElement | null = null;
    let all: HTMLButtonElement | null = null;

    const buttons = container.querySelectorAll<HTMLButtonElement>('button');
    for (const btn of buttons) {
        const text = btn.textContent?.trim();
        if (text === 'Crops') crops = btn;
        if (text === 'Pets') pets = btn;
        if (text === 'All') all = btn;
    }

    return { crops, pets, all };
}

// ─────────────────────────────────────────────────────────────────────────────
// Badge Scanning & Diffing
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build species ID list in visual order by reading from DOM
 * This handles both known and unknown species correctly
 */
function buildOrderedSpeciesIdsFromDOM(entries: HTMLElement[], category: 'crop' | 'pet'): string[] {
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

/**
 * Identify unknown species (displayed as "???") by their position in the list
 */
function identifyUnknownSpeciesByPosition(el: HTMLElement): SpeciesEntry | null {
    // Find the scrollable list container
    const scrollable = findScrollableSpeciesList();
    if (!scrollable) return null;

    // Get all McGrid entries
    const allEntries = Array.from(scrollable.querySelectorAll<HTMLElement>(':scope > .McGrid'));
    const index = allEntries.indexOf(el);
    if (index === -1) return null;

    // Determine category from tab
    const tab = getCurrentTab();

    let category: 'crop' | 'pet';
    let relevantEntries: HTMLElement[];
    let adjustedIndex: number;

    if (!tab || tab === 'all') {
        // "All" tab - determine category by position
        // Game renders crops first, then pets
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
        // Specific tab selected
        category = tab === 'crops' ? 'crop' : 'pet';
        relevantEntries = allEntries;
        adjustedIndex = index;
    }

    // Build ordered species IDs from visible DOM
    const orderedIds = buildOrderedSpeciesIdsFromDOM(relevantEntries, category);

    if (adjustedIndex < orderedIds.length && orderedIds[adjustedIndex]) {
        return {
            element: el,
            speciesId: orderedIds[adjustedIndex],
            category,
        };
    }

    return null;
}

/**
 * Detect which journal tab is currently active
 */
function getCurrentTab(): 'crops' | 'pets' | 'all' | null {
    const tabButtons = findTabButtons();

    // Check button styles to find active tab
    const checkActive = (btn: HTMLButtonElement | null): boolean => {
        if (!btn) return false;
        // Active tabs have specific styling - check for height or other indicators
        const motionFlex = btn.querySelector('[class*="MotionMcFlex"], .MotionMcFlex');
        if (motionFlex instanceof HTMLElement) {
            return motionFlex.offsetHeight >= 30; // Active tabs are taller
        }
        return false;
    };

    if (checkActive(tabButtons.crops)) return 'crops';
    if (checkActive(tabButtons.pets)) return 'pets';
    if (checkActive(tabButtons.all)) return 'all';

    return null;
}

function findSpeciesEntries(): SpeciesEntry[] {
    const entries: SpeciesEntry[] = [];
    const seenSpecies = new Set<string>();

    // Strategy 1: Native Crops/Pets tabs
    const scrollable = findScrollableSpeciesList();
    if (scrollable) {
        const gridEntries = scrollable.querySelectorAll<HTMLElement>(':scope > .McGrid');
        for (const el of gridEntries) {
            const entry = parseSpeciesEntry(el);
            if (entry && !seenSpecies.has(entry.speciesId)) {
                entries.push(entry);
                seenSpecies.add(entry.speciesId);
            }
        }
    }

    // Strategy 2: All tab overlay
    const overlay = document.querySelector('.gemini-journal-allOverlay');
    if (overlay) {
        const overlayRows = overlay.querySelectorAll<HTMLElement>('.gemini-journal-allOverlay-row');
        for (const row of overlayRows) {
            const entry = parseSpeciesEntry(row);
            if (entry && !seenSpecies.has(entry.speciesId)) {
                entries.push(entry);
                seenSpecies.add(entry.speciesId);
            }
        }
    }

    return entries;
}

function parseSpeciesEntry(el: HTMLElement): SpeciesEntry | null {
    // Find species name from text content
    const textElements = el.querySelectorAll('.chakra-text, p, span');

    let foundUnknown = false;

    // First try to find a resolvable species name (for known species)
    for (const text of textElements) {
        const content = text.textContent?.trim() ?? '';
        // Skip progress indicators and percents
        if (content.includes('%') || /^\d+\/\d+$/.test(content)) continue;
        // Track if we found "???"
        if (content === '???') {
            foundUnknown = true;
            continue;
        }
        // Don't skip "???" yet - it might be the species name for unknown species
        if (content.length < 2 || content.length > 30) continue;

        // Try to resolve non-"???" names first
        const resolved = resolveSpeciesId(content);
        if (resolved) {
            return {
                element: el,
                speciesId: resolved.id,
                category: resolved.type,
            };
        }
    }

    // If we found "???" as the name, this is an unknown species
    // We need to use position-based mapping to identify it
    if (foundUnknown) {
        return identifyUnknownSpeciesByPosition(el);
    }

    return null;
}

function refreshBadges(): void {
    if (guideTabActive) return; // Don't show badges when Guide tab is active

    const ctx = gatherContext();
    const entries = findSpeciesEntries();

    const seenSpecies = new Set<string>();

    for (const { element, speciesId, category } of entries) {
        seenSpecies.add(speciesId);

        const badge = selectBadge(speciesId, category, ctx);
        const existing = activeBadges.get(speciesId);

        // No change
        if (badge && existing && existing.badgeKey === badge.key) continue;

        // Remove old badge
        if (existing) {
            existing.element.remove();
            activeBadges.delete(speciesId);
        }

        // Add new badge
        if (badge) {
            const badgeEl = createBadgeElement(badge);
            // Position badge relative to entry
            element.style.position = element.style.position || 'relative';
            element.appendChild(badgeEl);
            activeBadges.set(speciesId, { element: badgeEl, badgeKey: badge.key });
        }
    }

    // Clean up badges for species no longer visible
    for (const [speciesId, { element }] of activeBadges) {
        if (!seenSpecies.has(speciesId)) {
            element.remove();
            activeBadges.delete(speciesId);
        }
    }
}

function scheduleBadgeRefresh(): void {
    if (badgeRefreshTimer !== null) clearTimeout(badgeRefreshTimer);
    badgeRefreshTimer = window.setTimeout(() => {
        badgeRefreshTimer = null;
        withMutationGuard(() => refreshBadges());
    }, 200);
}

// ─────────────────────────────────────────────────────────────────────────────
// Guide Tab Management
// ─────────────────────────────────────────────────────────────────────────────

function handleActivateGuideTab(): void {
    if (guideTabActive) return;
    guideTabActive = true;

    // Clear badges when Guide tab is active
    activeBadges.forEach(({ element }) => element.remove());
    activeBadges.clear();

    const ctx = gatherContext();
    const recommendations = computeAllRecommendations(ctx);
    activateGuideTab(recommendations, contentTracker);

    console.log('[JournalGuide] Guide tab activated');
}

function handleDeactivateGuideTab(): void {
    if (!guideTabActive) return;
    guideTabActive = false;

    deactivateGuideTab();
    contentTracker.run();
    contentTracker = createCleanupTracker();

    // Restore badges
    withMutationGuard(() => refreshBadges());

    console.log('[JournalGuide] Guide tab deactivated');
}

function scheduleRefresh(): void {
    if (refreshTimer !== null) clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
        refreshTimer = null;
        invalidateContext();
        withMutationGuard(() => {
            refreshBadges();
            // If Guide tab is active, refresh its content
            if (guideTabActive) {
                handleActivateGuideTab();
            }
        });
    }, 300);
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab Injection
// ─────────────────────────────────────────────────────────────────────────────

function injectGuideTab(): void {
    const container = findTabContainer();
    if (!container) return;

    // Check if already injected
    if (container.querySelector('.gemini-qol-journalGuide-tab')) return;

    const { pets } = findTabButtons();
    if (!pets) return;

    const ctx = gatherContext();
    const recommendations = computeAllRecommendations(ctx);
    const availableCount = countAvailableNow(recommendations);

    const guideBtn = createGuideTab(availableCount, handleActivateGuideTab);
    // Insert after Pets tab
    if (pets.nextSibling) {
        container.insertBefore(guideBtn, pets.nextSibling);
    } else {
        container.appendChild(guideBtn);
    }
    tabTracker.add(() => guideBtn.remove());

    // Listen for clicks on other tabs to deactivate Guide
    const handleOtherTabClick = () => {
        withMutationGuard(() => handleDeactivateGuideTab());
    };

    const { crops: cropsBtn, pets: petsBtn } = findTabButtons();
    if (cropsBtn) {
        cropsBtn.addEventListener('click', handleOtherTabClick);
        tabTracker.add(() => cropsBtn.removeEventListener('click', handleOtherTabClick));
    }
    if (petsBtn) {
        petsBtn.addEventListener('click', handleOtherTabClick);
        tabTracker.add(() => petsBtn.removeEventListener('click', handleOtherTabClick));
    }

    // Look for All tab button (from journalAllTab injection)
    const allBtn = document.querySelector('.gemini-allTab-tab')?.parentElement as HTMLButtonElement | null;
    if (allBtn) {
        allBtn.addEventListener('click', handleOtherTabClick);
        tabTracker.add(() => allBtn.removeEventListener('click', handleOtherTabClick));
    }

    // Subscribe to tab state changes for mutual exclusion with All tab
    const unsubscribe = onCustomTabChange((tab) => {
        if (tab !== 'guide' && guideTabActive) {
            withMutationGuard(() => handleDeactivateGuideTab());
        }
    });
    tabTracker.add(unsubscribe);

    console.log('[JournalGuide] Guide tab injected');
}

// ─────────────────────────────────────────────────────────────────────────────
// Observation
// ─────────────────────────────────────────────────────────────────────────────

function processPage(): void {
    withMutationGuard(() => {
        try {
            const modal = findJournalModal();
            if (!modal) {
                // Journal closed — clean up
                activeBadges.forEach(({ element }) => element.remove());
                activeBadges.clear();
                handleDeactivateGuideTab();
                return;
            }

            injectGuideTab();
            refreshBadges();
        } catch (err) {
            console.warn('[JournalGuide] processPage error:', err);
        }
    });
}

let debounceTimer: number | null = null;

function debouncedProcessPage(): void {
    if (debounceTimer !== null) clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
        if (!isMutationGuarded()) {
            processPage();
        }
        debounceTimer = null;
    }, 200);
}

function startObserving(): void {
    // Initial scans with delays (React rendering)
    setTimeout(processPage, 100);
    setTimeout(processPage, 400);
    setTimeout(processPage, 800);

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
        if (isMutationGuarded()) return;
        debouncedProcessPage();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    addObserverWithCleanup(tabTracker, observer);

    // Subscribe to game state changes
    const gardenUnsub = getMyGarden().subscribeStable(() => {
        scheduleRefresh();
    });
    tabTracker.add(gardenUnsub);

    const petsUnsub = getMyPets().subscribe(() => {
        scheduleRefresh();
    });
    tabTracker.add(petsUnsub);

    const invUnsub = getMyInventory().subscribeStable(() => {
        scheduleRefresh();
    });
    tabTracker.add(invUnsub);

    // Listen for journal updates
    const journalHandler = () => {
        invalidateContext();
        scheduleRefresh();
    };
    window.addEventListener('gemini:journal-updated', journalHandler);
    tabTracker.add(() => window.removeEventListener('gemini:journal-updated', journalHandler));

    // Listen for weather transitions
    const weatherHandler = () => {
        invalidateContext();
        scheduleRefresh();
    };
    window.addEventListener(EVENTS.WEATHER_TRANSITION, weatherHandler);
    tabTracker.add(() => window.removeEventListener(EVENTS.WEATHER_TRANSITION, weatherHandler));

    // Start weather tracking
    startWeatherTracking(tabTracker);

    // Cleanup timers
    tabTracker.add(() => {
        if (refreshTimer !== null) {
            clearTimeout(refreshTimer);
            refreshTimer = null;
        }
        if (badgeRefreshTimer !== null) {
            clearTimeout(badgeRefreshTimer);
            badgeRefreshTimer = null;
        }
        if (debounceTimer !== null) {
            clearTimeout(debounceTimer);
            debounceTimer = null;
        }
    });
}

function stopObserving(): void {
    // Clean up all badges
    activeBadges.forEach(({ element }) => element.remove());
    activeBadges.clear();

    // Deactivate guide tab
    handleDeactivateGuideTab();

    // Stop weather tracking
    stopWeatherTracking();

    // Run all cleanups
    contentTracker.run();
    contentTracker.clear();
    tabTracker.run();
    tabTracker.clear();
    tabTracker = createCleanupTracker();
    contentTracker = createCleanupTracker();
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function init(): void {
    if (initialized) return;
    initialized = true;

    // Inject styles
    injectStyles();

    // Start observing
    startObserving();

    console.log('[JournalGuide] Initialized');
}

export function destroy(): void {
    if (!initialized) return;
    initialized = false;

    stopObserving();
    removeStyles();
    cleanupTooltips();
    resetGuideTabState();

    console.log('[JournalGuide] Destroyed');
}

export function isEnabled(): boolean {
    return initialized;
}
