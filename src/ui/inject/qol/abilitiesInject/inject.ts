/**
 * AbilitiesInject - Core Injection Logic
 *
 * Simple pattern (matching cropSizeIndicator):
 * - Watch document.body with MutationObserver
 * - Look for specific Chakra UI classes that indicate pet species page
 * - Inject abilities section when found
 * - Remove when navigating away
 */

import { MGData } from '../../../../modules/data';
import { calculateAbilityProgress, getAllAbilities } from './data';
import { createAbilityStampEntries } from './render';

// ─────────────────────────────────────────────────────────────────────────────
// Selectors (exact Chakra UI classes from game)
// ─────────────────────────────────────────────────────────────────────────────

const SPECIES_NAME_SELECTOR = 'p.chakra-text.css-1qd26jh'; // Species name (e.g., "Bunny")
const COLLECTED_COUNT_SELECTOR = 'p.chakra-text.css-12b1ql2'; // "Collected X/Y"

// ─────────────────────────────────────────────────────────────────────────────
// Runtime State
// ─────────────────────────────────────────────────────────────────────────────

let injectedStamps: HTMLElement[] = [];
let currentSpeciesId: string | null = null;
let observer: MutationObserver | null = null;
let initialized = false;
let isInjecting = false; // Re-entrancy guard to prevent infinite loop
const ABILITY_STAMP_CLASS = 'gemini-ability-entry';

// Overview page state
let overviewCountsUpdated = false;
const OVERVIEW_UPDATED_CLASS = 'gemini-overview-updated';

// Tab tracking state
let lastActiveTab: 'Crops' | 'Pets' | 'All' | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// DOM Detection
// ─────────────────────────────────────────────────────────────────────────────

interface PetSpeciesPage {
  speciesName: string;
  variantGrid: HTMLElement;
}

/**
 * Check if we're on a pet species detail page
 * Returns species info if found, null otherwise
 */
function findPetSpeciesPage(): PetSpeciesPage | null {
  // Look for species name element
  const speciesNameEl = document.querySelector<HTMLElement>(SPECIES_NAME_SELECTOR);
  if (!speciesNameEl) return null;

  const speciesName = speciesNameEl.textContent?.trim();
  if (!speciesName || speciesName === '???') return null;

  // Look for "Collected X/Y" to confirm we're on detail page
  const collectedEl = document.querySelector<HTMLElement>(COLLECTED_COUNT_SELECTOR);
  if (!collectedEl) return null;

  // Find the variant grid by looking for a grid containing ONLY variant stamp text
  // (not the parent grid that contains tabs, species name, etc.)
  const allGrids = document.querySelectorAll<HTMLElement>('div.McGrid');
  let variantGrid: HTMLElement | null = null;

  for (const grid of allGrids) {
    const text = grid.textContent || '';

    // Check if this grid contains variant stamp keywords
    const hasNormal = text.includes('Normal');
    const hasGold = text.includes('Gold');
    const hasMaxWeight = text.includes('Max Weight');
    const hasRainbow = text.includes('Rainbow');
    const hasUnknown = text.includes('???');

    const matchCount = [hasNormal, hasGold, hasMaxWeight, hasRainbow, hasUnknown].filter(Boolean).length;

    // Must have at least 2 variant keywords BUT must NOT contain page-level elements
    // (to exclude the parent grid that contains the whole species page)
    const hasTabs = text.includes('Crops') || text.includes('Pets');
    const hasCollected = text.includes('Collected');
    const hasBackButton = text.includes('Back');

    if (matchCount >= 2 && !hasTabs && !hasCollected && !hasBackButton) {
      variantGrid = grid;
      break;
    }
  }

  if (!variantGrid) {
    return null;
  }

  return { speciesName, variantGrid };
}

/**
 * Map species name to species ID via MGData
 */
function getSpeciesId(speciesName: string): string | null {
  const pets = MGData.get('pets') ?? {};

  // Try exact match first
  for (const [id, data] of Object.entries(pets)) {
    const petData = data as Record<string, any>;
    if (
      petData.name === speciesName ||
      petData.displayName === speciesName ||
      id === speciesName
    ) {
      return id;
    }
  }

  // Try case-insensitive match
  const lowerName = speciesName.toLowerCase();
  for (const [id, data] of Object.entries(pets)) {
    const petData = data as Record<string, any>;
    if (
      petData.name?.toLowerCase() === lowerName ||
      petData.displayName?.toLowerCase() === lowerName ||
      id.toLowerCase() === lowerName
    ) {
      return id;
    }
  }

  // Fallback: use lowercase name as ID
  return lowerName.replace(/\s+/g, '');
}

/**
 * Check if species is a pet (not crop)
 */
function isPetSpecies(speciesId: string): boolean {
  const pets = MGData.get('pets') ?? {};
  return speciesId in pets;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab Detection (content-based, no hardcoded CSS selectors)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Detect which tab is active by looking at tab button styling
 * Uses content-based detection instead of fragile CSS class selectors
 */
function getActiveTab(): 'Crops' | 'Pets' | 'All' | null {
  // 1. First check for Gemini-injected All tab
  const allTab = document.querySelector('.gemini-journal-allTab');
  if (allTab) {
    // Check if it looks active based on height (35px)
    const allTabInner = allTab.querySelector('.gemini-allTab-tab');
    if (allTabInner instanceof HTMLElement && allTabInner.offsetHeight > 25) {
      return 'All';
    }
  }

  // 2. Then check for native tabs
  const buttons = document.querySelectorAll<HTMLButtonElement>('button');
  let cropsButton: HTMLButtonElement | null = null;
  let petsButton: HTMLButtonElement | null = null;

  for (const btn of buttons) {
    const text = btn.textContent?.trim();
    if (text === 'Crops') cropsButton = btn;
    if (text === 'Pets') petsButton = btn;
  }

  if (!cropsButton && !petsButton) return null;

  // Active tab has a taller height (35px vs 25px)
  if (cropsButton && petsButton) {
    const cropsHeight = cropsButton.offsetHeight;
    const petsHeight = petsButton.offsetHeight;

    if (cropsHeight > petsHeight) return 'Crops';
    if (petsHeight > cropsHeight) return 'Pets';

    // Fallback: aria-selected
    if (cropsButton.getAttribute('aria-selected') === 'true') return 'Crops';
    if (petsButton.getAttribute('aria-selected') === 'true') return 'Pets';
  }

  // If only one exists and is visible
  if (petsButton && petsButton.offsetParent) return 'Pets';
  if (cropsButton && cropsButton.offsetParent) return 'Crops';

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Overview Page Detection & Updates
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if we're on the journal overview page (species list) AND on the Pets tab
 * Overview page has "GARDEN JOURNAL" header and multiple species entries
 */
function isOnOverviewPage(): boolean {
  // Look for GARDEN JOURNAL header
  const headerText = Array.from(document.querySelectorAll('p.chakra-text')).find(
    (el) => el.textContent?.includes('GARDEN JOURNAL')
  );
  if (!headerText) return false;

  // Look for "Collected X% (Y/Z)" text
  const collectedText = Array.from(document.querySelectorAll('p.chakra-text')).find(
    (el) => el.textContent?.match(/Collected\s+\d+%/)
  );
  if (!collectedText) return false;

  // Make sure we're NOT on a species detail page (no species name header)
  const speciesNameEl = document.querySelector<HTMLElement>(SPECIES_NAME_SELECTOR);
  const hasSpeciesName = speciesNameEl && !speciesNameEl.textContent?.includes('GARDEN');

  if (hasSpeciesName) return false;

  // CRITICAL: Check active tab - only return true for Pets tab
  const activeTab = getActiveTab();
  return activeTab === 'Pets';
}

/**
 * Update the overview page "Collected X% (Y/Z)" count to include abilities
 * Returns true if update succeeded, false otherwise
 */
function updateOverviewCollectedCount(): boolean {
  // Find the "Collected X% (Y/Z)" text element
  const collectedTextEl = Array.from(document.querySelectorAll('p.chakra-text')).find(
    (el) => el.textContent?.match(/Collected\s+\d+%/)
  ) as HTMLElement | undefined;

  if (!collectedTextEl) return false;

  // Check if active tab is Pets. If not, don't update (or let All tab handle it)
  const activeTab = getActiveTab();
  if (activeTab !== 'Pets') return false;

  // Check if already updated
  if (collectedTextEl.classList.contains(OVERVIEW_UPDATED_CLASS)) {
    return true;
  }

  // Parse current count from the nested span containing "(Y/Z)"
  const countSpan = collectedTextEl.querySelector('span.chakra-text') as HTMLElement | null;
  if (!countSpan) return false;

  const match = countSpan.textContent?.match(/\((\d+)\/(\d+)\)/);
  if (!match) return false;

  const baseLogged = parseInt(match[1], 10);
  const baseTotal = parseInt(match[2], 10);

  // Validate we're not touching stale data
  const pets = MGData.get('pets') ?? {};
  const expectedPetVariants = Object.keys(pets).length * 4;
  const tolerance = expectedPetVariants * 0.25;
  if (Math.abs(baseTotal - expectedPetVariants) > tolerance) return false;

  // Store original values for restoration
  // We match the pattern from game so we can put it back exactly
  if (!collectedTextEl.hasAttribute('data-original-percent')) {
    const percentMatch = collectedTextEl.textContent?.match(/Collected\s+(\d+)%/);
    if (percentMatch) {
      collectedTextEl.setAttribute('data-original-percent', percentMatch[1]);
    }
  }
  if (!countSpan.hasAttribute('data-original-count')) {
    countSpan.setAttribute('data-original-count', countSpan.textContent || '');
  }

  // Calculate total ability counts
  let totalAbilities = 0;
  let totalLoggedAbilities = 0;

  for (const speciesId of Object.keys(pets)) {
    const abilities = getAllAbilities(speciesId);
    const progress = calculateAbilityProgress(speciesId);
    totalAbilities += abilities.length;
    totalLoggedAbilities += progress.logged.length;
  }

  // Calculate new values
  const newLogged = baseLogged + totalLoggedAbilities;
  const newTotal = baseTotal + totalAbilities;
  const newPercentage = Math.floor((newLogged / newTotal) * 100);

  // Update without destroying nodes (safest for React)
  const percentageNode = collectedTextEl.childNodes[0];
  if (percentageNode && percentageNode.nodeType === Node.TEXT_NODE) {
    percentageNode.textContent = `Collected ${newPercentage}% `;
  }
  countSpan.textContent = `(${newLogged}/${newTotal})`;

  // Mark as updated
  collectedTextEl.classList.add(OVERVIEW_UPDATED_CLASS);

  return true;
}

/**
 * Update each species entry "X/Y" count to include abilities
 */
function updateOverviewSpeciesCounts(): void {
  const pets = MGData.get('pets') ?? {};

  // Find all text elements that look like counts "X/Y"
  const allTextElements = document.querySelectorAll('p.chakra-text');

  for (const textEl of allTextElements) {
    const text = textEl.textContent || '';

    // Skip if not a count pattern
    if (!text.match(/^\d+\/\d+$/)) continue;

    // Check if already updated
    if (textEl.classList.contains(OVERVIEW_UPDATED_CLASS)) {
      continue;
    }

    // Parse current count
    const match = text.match(/^(\d+)\/(\d+)$/);
    if (!match) continue;

    const baseLogged = parseInt(match[1], 10);
    const baseTotal = parseInt(match[2], 10);

    // Find the species name - look for sibling text elements in the same parent container
    // The name should be in a Text element before this count element
    let nameEl: Element | null = null;

    // Try to find parent McGrid that contains both name and count
    let currentEl: Element | null = textEl;
    let foundGrid = false;

    while (currentEl && !foundGrid) {
      if (currentEl.classList.contains('McGrid')) {
        // Found a grid, look for name text in it
        const textsInGrid = currentEl.querySelectorAll('p.chakra-text');
        for (const el of textsInGrid) {
          const elText = el.textContent || '';
          // Name should not be "???", should not contain "/", and should be reasonably short
          if (elText !== '???' && !elText.includes('/') && elText.length > 2 && elText.length < 30) {
            nameEl = el;
            foundGrid = true;
            break;
          }
        }
      }
      currentEl = currentEl.parentElement;
    }

    if (!nameEl) continue;

    const speciesName = nameEl.textContent?.trim();
    if (!speciesName) continue;

    // Map name to species ID
    const speciesId = getSpeciesId(speciesName);
    if (!speciesId || !isPetSpecies(speciesId)) {
      continue;
    }

    // Calculate ability counts for this species
    const abilities = getAllAbilities(speciesId);
    const progress = calculateAbilityProgress(speciesId);

    if (abilities.length === 0) {
      continue;
    }

    // Update the count
    const newLogged = baseLogged + progress.logged.length;
    const newTotal = baseTotal + abilities.length;

    textEl.textContent = `${newLogged}/${newTotal}`;

    // Mark as updated
    textEl.classList.add(OVERVIEW_UPDATED_CLASS);
  }
}

/**
 * Update all overview page counts (both total and per-species)
 */
function updateOverviewPage(): void {
  if (!isOnOverviewPage()) {
    overviewCountsUpdated = false;
    return;
  }

  if (overviewCountsUpdated) {
    return;
  }

  try {
    const collectedUpdated = updateOverviewCollectedCount();
    updateOverviewSpeciesCounts();

    // Only mark as complete if the main count was updated successfully
    // (Species counts can update independently)
    if (collectedUpdated) {
      overviewCountsUpdated = true;
    }
  } catch (error) {
    console.error('[AbilitiesInject] Failed to update overview page:', error);
  }
}

/**
 * Reset overview page update flag (called when navigating away)
 */
function resetOverviewPage(): void {
  // Find the header element
  const collectedTextEl = Array.from(document.querySelectorAll('p.chakra-text')).find(
    (el) => el.hasAttribute('data-original-percent')
  ) as HTMLElement | undefined;

  if (collectedTextEl) {
    const origPercent = collectedTextEl.getAttribute('data-original-percent');
    if (origPercent) {
      const percentageNode = collectedTextEl.childNodes[0];
      if (percentageNode && percentageNode.nodeType === Node.TEXT_NODE) {
        percentageNode.textContent = `Collected ${origPercent}% `;
      }
    }
    collectedTextEl.removeAttribute('data-original-percent');
    collectedTextEl.classList.remove(OVERVIEW_UPDATED_CLASS);

    const countSpan = collectedTextEl.querySelector('span.chakra-text') as HTMLElement | null;
    if (countSpan) {
      const origCount = countSpan.getAttribute('data-original-count');
      if (origCount) countSpan.textContent = origCount;
      countSpan.removeAttribute('data-original-count');
    }
  }

  // Remove update markers from species entries
  document.querySelectorAll(`.${OVERVIEW_UPDATED_CLASS}`).forEach((el) => {
    // Note: We don't restore individual counts here because they are usually 
    // swapped out by React anyway when tab changes, but we could if needed.
    el.classList.remove(OVERVIEW_UPDATED_CLASS);
  });

  overviewCountsUpdated = false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Injection Logic
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Detect screen size (matching game's isSmallScreen logic)
 */
function isSmallScreen(): boolean {
  return window.innerWidth < 768; // Standard mobile breakpoint
}

/**
 * Update the "Collected X/Y" count to include abilities
 */
function updateCollectedCount(loggedAbilitiesCount: number, totalAbilitiesCount: number): void {
  const collectedEl = document.querySelector<HTMLElement>(COLLECTED_COUNT_SELECTOR);
  if (!collectedEl) return;

  // Parse current count (e.g., "Collected 3/4")
  const match = collectedEl.textContent?.match(/Collected (\d+)\/(\d+)/);
  if (!match) return;

  const currentLogged = parseInt(match[1], 10);
  const currentTotal = parseInt(match[2], 10);

  // Add abilities to the count
  const newLogged = currentLogged + loggedAbilitiesCount;
  const newTotal = currentTotal + totalAbilitiesCount;

  collectedEl.textContent = `Collected ${newLogged}/${newTotal}`;
}

/**
 * Inject abilities by appending stamps directly to variant grid
 */
function injectAbilities(variantGrid: HTMLElement, speciesId: string): void {
  try {
    // Set re-entrancy guard
    isInjecting = true;

    // Remove existing injection
    removeInjection();

    // Calculate progress (synchronous - uses JournalChecker and MGData APIs)
    const progress = calculateAbilityProgress(speciesId);

    if (progress.total === 0) {
      return;
    }

    // Create ability stamp entries
    const stampEntries = createAbilityStampEntries(progress, speciesId, isSmallScreen());

    // Append each stamp directly to the variant grid
    // This makes them part of the same grid layout as variant stamps
    for (const stampEntry of stampEntries) {
      variantGrid.appendChild(stampEntry);
      injectedStamps.push(stampEntry);
    }

    // Update the "Collected X/Y" count to include abilities
    updateCollectedCount(progress.logged.length, progress.total);
    lastInjectedProgress = { logged: progress.logged.length, total: progress.total };
  } catch (error) {
    console.error('[AbilitiesInject] Failed to inject:', error);
    removeInjection();
  } finally {
    // Clear re-entrancy guard after a tick to allow observer to settle
    setTimeout(() => {
      isInjecting = false;
    }, 0);
  }
}

/**
 * Restore the "Collected X/Y" count to original (remove abilities)
 */
function restoreCollectedCount(loggedAbilitiesCount: number, totalAbilitiesCount: number): void {
  const collectedEl = document.querySelector<HTMLElement>(COLLECTED_COUNT_SELECTOR);
  if (!collectedEl) return;

  // Parse current count
  const match = collectedEl.textContent?.match(/Collected (\d+)\/(\d+)/);
  if (!match) return;

  const currentLogged = parseInt(match[1], 10);
  const currentTotal = parseInt(match[2], 10);

  // Subtract abilities from the count
  const newLogged = currentLogged - loggedAbilitiesCount;
  const newTotal = currentTotal - totalAbilitiesCount;

  collectedEl.textContent = `Collected ${newLogged}/${newTotal}`;
}

// Track the counts so we can restore them
let lastInjectedProgress: { logged: number; total: number } | null = null;

/**
 * Remove injected ability stamps
 */
function removeInjection(): void {
  // Restore the collected count before removing stamps
  if (lastInjectedProgress) {
    restoreCollectedCount(lastInjectedProgress.logged, lastInjectedProgress.total);
    lastInjectedProgress = null;
  }

  for (const stamp of injectedStamps) {
    stamp.remove();
  }
  injectedStamps = [];
  currentSpeciesId = null;
  isInjecting = false; // Clear flag when removing
}

// ─────────────────────────────────────────────────────────────────────────────
// Update Logic
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check page and inject/remove as needed
 */
function updateInjection(): void {
  // Prevent re-entrancy - don't update while we're already injecting
  if (isInjecting) {
    return;
  }

  // CRITICAL BUG FIX: Detect tab changes and reset counts
  const currentTab = getActiveTab();
  if (currentTab !== lastActiveTab) {
    // Tab changed - reset everything to prevent stale counts
    if (lastActiveTab === 'Pets' && currentTab !== 'Pets') {
      // Switching away from Pets tab - reset all Pets-related updates
      resetOverviewPage();
      removeInjection();
    }
    lastActiveTab = currentTab;
  }

  // Check if we're on the overview page (Pets tab only)
  const activeTab = getActiveTab();
  if (isOnOverviewPage() && activeTab === 'Pets') {
    // Remove any species detail injection
    removeInjection();
    // Update overview page counts
    updateOverviewPage();
    return;
  }

  // Reset overview page state if we're not on it
  resetOverviewPage();

  const page = findPetSpeciesPage();

  if (!page) {
    // Not on species detail page
    removeInjection();
    return;
  }

  const speciesId = getSpeciesId(page.speciesName);
  if (!speciesId) {
    removeInjection();
    return;
  }

  if (!isPetSpecies(speciesId)) {
    // It's a crop, not a pet
    removeInjection();
    return;
  }

  // Check if already injected for this species
  if (speciesId === currentSpeciesId && injectedStamps.length > 0 && injectedStamps[0].isConnected) {
    return; // Already showing
  }

  currentSpeciesId = speciesId;
  injectAbilities(page.variantGrid, speciesId);
}

// ─────────────────────────────────────────────────────────────────────────────
// Observation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Start watching document.body for journal changes
 */
function startObserving(): void {
  // Initial check
  updateInjection();

  // Delayed checks to catch React renders at different timing
  setTimeout(() => {
    updateInjection();
  }, 100);

  setTimeout(() => {
    updateInjection();
  }, 500);

  // Longer delay to catch updates after React fully re-renders tab switches
  setTimeout(() => {
    updateInjection();
  }, 1000);

  // Note: We don't subscribe to myPetJournalAtom because:
  // 1. The atom might not exist yet at initialization
  // 2. The MutationObserver handles all updates automatically
  // This matches the cropSizeIndicator pattern which uses subscribePlantInfo instead

  // Watch for DOM changes (navigation between species, tabs, etc.)
  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // CRITICAL: Ignore our own injected stamps to prevent infinite loop
            if (node.classList.contains(ABILITY_STAMP_CLASS)) {
              return;
            }

            // Also ignore if the node is one of our injected stamps
            if (injectedStamps.includes(node)) {
              return;
            }

            // Check if overview page elements were added
            const nodeText = node.textContent || '';
            if (
              nodeText.includes('GARDEN JOURNAL') ||
              nodeText.includes('Collected') ||
              nodeText.includes('Chicken') ||
              nodeText.includes('Bunny')
            ) {
              updateInjection();
            }

            // Check if species name element was added
            if (
              node.matches?.(SPECIES_NAME_SELECTOR) ||
              node.querySelector?.(SPECIES_NAME_SELECTOR)
            ) {
              updateInjection();
            }

            // Check if any grid was added (we'll filter by content later)
            if (
              node.matches?.('div.McGrid') ||
              node.querySelector?.('div.McGrid')
            ) {
              updateInjection();
            }
          }
        });

        // Also check if removed (navigating away)
        mutation.removedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // Don't trigger on our own stamps being removed
            if (node.classList.contains(ABILITY_STAMP_CLASS)) {
              return;
            }

            if (
              node.matches?.(SPECIES_NAME_SELECTOR) ||
              node.querySelector?.(SPECIES_NAME_SELECTOR)
            ) {
              removeInjection();
            }
          }
        });
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

/**
 * Stop observing and cleanup
 */
function stopObserving(): void {
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  removeInjection();
  resetOverviewPage();
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Initialize abilities injection
 */
export function init(): void {
  if (initialized) {
    return;
  }

  initialized = true;
  startObserving();
}

/**
 * Destroy and cleanup
 */
export function destroy(): void {
  if (!initialized) return;

  initialized = false;
  stopObserving();
}

/**
 * Check if initialized
 */
export function isEnabled(): boolean {
  return initialized;
}
