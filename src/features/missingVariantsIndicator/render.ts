/**
 * Missing Variants Indicator - DOM Injection (QOL Rendering)
 *
 * Injects colored letters showing unlogged crop variants into game UI crop tooltips.
 * Per ui/inject.md:
 * - Injection must NOT render Shadow DOM
 * - All listeners must be tracked and cleaned up
 * - Idempotent init(), reversible destroy()
 */

import { createCleanupTracker, addObserverWithCleanup, withMutationGuard } from '../../ui/inject/core/lifecycle';
import { getCurrentTile } from '../../globals/variables/currentTile';
import { MGData } from '../../modules';
import { MGJournal } from '../../features/journal';
import { getVariantLetterStyle } from './letterStyles';
import type { Unsubscribe } from '../../globals/core/types';
import { resolveSpeciesId } from '../../ui/inject/qol/_shared/names';

// -----------------------------------------------------------------------------
// Selectors (same as crop value indicator uses)
// -----------------------------------------------------------------------------

const CROP_CONTAINER_CLASS_MATURE = 'css-qnqsp4';
const CROP_CONTAINER_CLASS_GROWTH = 'css-v439q6';
const MISSING_VARIANTS_CLASS = 'gemini-qol-missingVariants';

// -----------------------------------------------------------------------------
// State
// -----------------------------------------------------------------------------

let tracker = createCleanupTracker();
let stylesInjected = false;
let initialized = false;
let plantInfoUnsubscribe: Unsubscribe | null = null;

// Tracking state for update-in-place
let lastRenderedSpecies: string | null = null;
let rafHandle: number | null = null;

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const MISSING_VARIANTS_STYLES = `
  .${MISSING_VARIANTS_CLASS} {
    display: flex;
    gap: 6px;
    margin-top: 6px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

// -----------------------------------------------------------------------------
// Style Injection
// -----------------------------------------------------------------------------

function ensureStyles(): void {
  if (stylesInjected) return;

  const style = document.createElement('style');
  style.id = 'gemini-qol-missingVariants-styles';
  style.textContent = MISSING_VARIANTS_STYLES;
  document.head.appendChild(style);

  tracker.add(() => style.remove());
  stylesInjected = true;
}

// -----------------------------------------------------------------------------
// Journal Data Access
// -----------------------------------------------------------------------------

/**
 * Get all crop variant types from game data
 */
function getAllCropVariants(): string[] {
  return MGJournal.getCropVariants();
}

/**
 * Get unlogged variants for a specific crop species
 */
function getUnloggedCropVariants(speciesId: string): string[] {
  const journal = MGJournal.getMyJournal();
  if (!journal) {
    // Return all variants as missing if journal not loaded yet
    return getAllCropVariants();
  }

  const produceEntry = journal.produce?.[speciesId];
  const loggedVariants = produceEntry?.variantsLogged?.map(v => v.variant) ?? [];

  const allVariants = getAllCropVariants();
  return allVariants.filter(v => !loggedVariants.includes(v));
}

/**
 * Check if a species ID is valid crop species
 */
function isValidCropSpecies(speciesId: string): boolean {
  const plants = MGData.get('plants') ?? {};
  if (speciesId in plants) return true;

  // Use shared resolver for display names (e.g. "Tulip" -> "OrangeTulip")
  const resolution = resolveSpeciesId(speciesId);
  return resolution?.type === 'crop';
}

/**
 * Get current species ID from currentTile global
 */
function getCurrentSpeciesId(): string | null {
  const tile = getCurrentTile().get();
  const plant = tile.plant;
  if (!plant) return null;

  let id: string | null = null;
  // Try currently hovered slot first
  if (plant.currentSlotIndex !== null) {
    const currentSlot = plant.slots[plant.currentSlotIndex];
    if (currentSlot) id = currentSlot.species;
  }

  // Fallback to plant species (crucial for multi-harvest trees or when no slot is hovered)
  if (!id) id = plant.species;

  // Resolve/normalize to internal ID
  const resolution = resolveSpeciesId(id ?? '');
  return resolution?.id ?? id;
}

/**
 * Update existing missing variant letters in-place (for all visible tooltips)
 */
function updateExistingLetters(speciesId: string): void {
  const allRows = document.querySelectorAll<HTMLElement>(`.${MISSING_VARIANTS_CLASS}`);
  const missingVariants = getUnloggedCropVariants(speciesId);

  // If no variants missing, we'll remove rows, otherwise update them
  for (const row of allRows) {
    if (missingVariants.length === 0) {
      row.remove();
      continue;
    }

    // Only update if content would actually change (simple optimization)
    const currentLetters = Array.from(row.children).map(c => (c as HTMLElement).title);
    if (JSON.stringify(currentLetters) === JSON.stringify(missingVariants)) {
      continue;
    }

    // Clear old letters
    row.replaceChildren();

    // Re-create letters for new species
    for (const variantId of missingVariants) {
      const variantStyle = getVariantLetterStyle(variantId);
      const letter = document.createElement('span');
      letter.textContent = variantStyle.text;
      letter.title = variantId;
      letter.style.cssText = variantStyle.css;
      row.appendChild(letter);
    }
  }
}

/**
 * Schedule a render with RAF debouncing
 */
function scheduleRender(): void {
  if (rafHandle !== null) cancelAnimationFrame(rafHandle);

  rafHandle = requestAnimationFrame(() => {
    rafHandle = null;

    const speciesId = getCurrentSpeciesId();
    if (!speciesId) return;

    // Perform a regular search and inject to catch tooltips added during quick switching
    // that might have been missed by the MutationObserver
    const tooltips = findCropTooltips();
    for (const tooltip of tooltips) {
      injectMissingVariantsToTooltip(tooltip);
    }

    // Update existing ones in-place
    updateExistingLetters(speciesId);
  });
}

// -----------------------------------------------------------------------------
// DOM Rendering
// -----------------------------------------------------------------------------

/**
 * Create the missing variants row element
 * Returns null if no missing variants or species not found
 */
function createMissingVariantsRow(speciesId: string): HTMLElement | null {
  if (!isValidCropSpecies(speciesId)) return null;

  const missingVariants = getUnloggedCropVariants(speciesId);

  if (missingVariants.length === 0) {
    return null;
  }

  const row = document.createElement('div');
  row.className = MISSING_VARIANTS_CLASS;

  // Create colored letter for each missing variant
  for (const variantId of missingVariants) {
    const variantStyle = getVariantLetterStyle(variantId);
    const letter = document.createElement('span');
    letter.textContent = variantStyle.text;
    letter.title = variantId;
    letter.style.cssText = variantStyle.css;
    row.appendChild(letter);
  }

  return row;
}

// -----------------------------------------------------------------------------
// Tooltip Detection & Injection
// -----------------------------------------------------------------------------

interface CropTooltip {
  element: HTMLElement;
}

function findCropTooltips(): CropTooltip[] {
  const tooltips: CropTooltip[] = [];

  // Find all mature crop containers (with mutations/scale)
  const matureCropContainers = document.querySelectorAll<HTMLElement>(
    `.${CROP_CONTAINER_CLASS_MATURE}`
  );

  for (const container of matureCropContainers) {
    // Check if visible
    if (!container.offsetParent) continue;
    // Skip if inside a pet button
    if (container.closest('button.chakra-button')) continue;
    tooltips.push({ element: container });
  }

  // Find all growth crop containers (timer/info panels)
  const growthCropContainers = document.querySelectorAll<HTMLElement>(
    `.${CROP_CONTAINER_CLASS_GROWTH}`
  );

  for (const container of growthCropContainers) {
    if (!container.offsetParent) continue;
    if (container.closest('button.chakra-button')) continue;

    // More robust McFlex detection: find ANY McFlex that contains a p.chakra-text
    // and doesn't look like an empty/loading state
    const potentialContainers = container.querySelectorAll<HTMLElement>('.McFlex');
    for (const flex of potentialContainers) {
      const nameEl = flex.querySelector('p.chakra-text');
      if (nameEl && nameEl.textContent && !nameEl.textContent.includes('%')) {
        tooltips.push({ element: flex });
        break; // Found the primary info container for this tooltip
      }
    }
  }

  return tooltips;
}

function injectMissingVariantsToTooltip(tooltip: CropTooltip): void {
  // Check if already injected
  if (tooltip.element.querySelector(`.${MISSING_VARIANTS_CLASS}`)) {
    return;
  }

  try {
    // Find the name element to extract species
    const nameEl = tooltip.element.querySelector('p.chakra-text');
    if (!nameEl) return;

    // Determine where to append (the McFlex containing the name)
    const infoContainer = nameEl.closest('.McFlex') as HTMLElement | null;
    if (!infoContainer) return;

    // Get species from currentTile data or resolve from DOM name
    let speciesId: string | null = null;

    const tile = getCurrentTile().get();
    const plant = tile.plant;
    if (plant) {
      if (plant.currentSlotIndex !== null && plant.slots[plant.currentSlotIndex]) {
        speciesId = plant.slots[plant.currentSlotIndex].species;
      } else {
        speciesId = plant.species;
      }
    }

    // Fallback/Resolve: extract from DOM and map display name to internal ID
    // Essential for Tulip, Cacao, Pine Tree, etc.
    const domName = nameEl.textContent?.trim() ?? '';
    const resolution = resolveSpeciesId(domName);

    if (resolution?.type === 'crop') {
      speciesId = resolution.id;
    }

    if (!speciesId) return;

    // Create and inject missing variants row
    const missingVariantsRow = createMissingVariantsRow(speciesId);
    if (missingVariantsRow) {
      withMutationGuard(() => {
        infoContainer.appendChild(missingVariantsRow);
      });
      tracker.add(() => missingVariantsRow.remove());
    }
  } catch (err) {
    console.warn('[MissingVariantsIndicator] Failed to inject:', err);
  }
}

// -----------------------------------------------------------------------------
// Tooltip Mutation Observation
// -----------------------------------------------------------------------------

function startObservingTooltips(): void {
  // Inject for existing crops
  const existing = findCropTooltips();
  for (const crop of existing) {
    injectMissingVariantsToTooltip(crop);
  }

  // Subscribe to plant info changes to update letters in-place
  plantInfoUnsubscribe = getCurrentTile().subscribePlantInfo(() => {
    scheduleRender();
  });

  // Watch for new crops added to the page
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // Check mature crop containers
            if (node.classList.contains(CROP_CONTAINER_CLASS_MATURE)) {
              if (!node.closest('button.chakra-button')) {
                injectMissingVariantsToTooltip({ element: node });
              }
            }

            const matureCropContainers = node.querySelectorAll<HTMLElement>(
              `.${CROP_CONTAINER_CLASS_MATURE}`
            );
            matureCropContainers.forEach((container) => {
              if (!container.closest('button.chakra-button')) {
                injectMissingVariantsToTooltip({ element: container });
              }
            });

            // Check growth crop containers
            if (node.classList.contains(CROP_CONTAINER_CLASS_GROWTH)) {
              if (!node.closest('button.chakra-button')) {
                const mcFlexes = node.querySelectorAll<HTMLElement>(':scope > .McFlex > .McFlex');
                if (mcFlexes.length > 0) {
                  const timerContainer = mcFlexes[mcFlexes.length - 1];
                  if (timerContainer.querySelector('p.chakra-text')) {
                    injectMissingVariantsToTooltip({ element: timerContainer });
                  }
                }
              }
            }

            const growthCropContainers = node.querySelectorAll<HTMLElement>(
              `.${CROP_CONTAINER_CLASS_GROWTH}`
            );
            growthCropContainers.forEach((container) => {
              if (!container.closest('button.chakra-button')) {
                const mcFlexes = container.querySelectorAll<HTMLElement>(':scope > .McFlex > .McFlex');
                if (mcFlexes.length > 0) {
                  const timerContainer = mcFlexes[mcFlexes.length - 1];
                  if (timerContainer.querySelector('p.chakra-text')) {
                    injectMissingVariantsToTooltip({ element: timerContainer });
                  }
                }
              }
            });
          }
        });
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  addObserverWithCleanup(tracker, observer);
}

// -----------------------------------------------------------------------------
// Journal Data Retry Logic
// -----------------------------------------------------------------------------

async function waitForJournalData(): Promise<boolean> {
  const maxAttempts = 5;
  const delayMs = 1000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (!MGJournal.isReady()) {
      try {
        MGJournal.init();
      } catch (err) {
        console.warn(`[MissingVariantsIndicator] Failed to init journal checker:`, err);
      }
    }

    const journal = MGJournal.getMyJournal();
    if (journal) {
      console.log('[MissingVariantsIndicator] Journal data available');
      return true;
    }

    if (attempt < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  console.warn('[MissingVariantsIndicator] Journal data not available, continuing anyway');
  return false;
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

export const render = {
  init(): void {
    if (initialized) return;
    initialized = true;

    ensureStyles();
    startObservingTooltips();

    // Attempt to initialize journal data in background
    waitForJournalData().catch(err => {
      console.warn('[MissingVariantsIndicator] Error waiting for journal data:', err);
    });
  },

  destroy(): void {
    if (!initialized) return;
    initialized = false;

    if (plantInfoUnsubscribe) {
      plantInfoUnsubscribe();
      plantInfoUnsubscribe = null;
    }

    if (rafHandle !== null) {
      cancelAnimationFrame(rafHandle);
      rafHandle = null;
    }

    lastRenderedSpecies = null;

    tracker.run();
    tracker.clear();
    tracker = createCleanupTracker();
    stylesInjected = false;
  },

  isEnabled(): boolean {
    return initialized;
  },
};


