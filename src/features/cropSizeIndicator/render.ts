/**
 * Crop Size Indicator - DOM Injection (QOL Rendering)
 *
 * Modifies mature crop tooltips to display crop size percentage (0-100).
 * Per ui/inject.md:
 * - Injection must NOT render Shadow DOM
 * - All listeners must be tracked and cleaned up
 * - Idempotent init(), reversible destroy()
 */

import { createCleanupTracker, addObserverWithCleanup } from '../../ui/inject/core/lifecycle';
import { calculateCropSize } from '../../modules/calculators/logic/crop';
import { getCurrentTile } from '../../globals/variables/currentTile';
import { MGData } from '../../modules/data';
import type { Unsubscribe } from '../../globals/core/types';

// ─────────────────────────────────────────────────────────────────────────────
// Selectors (update these if game UI structure changes)
// ─────────────────────────────────────────────────────────────────────────────

// Universal anchor: same class on both desktop and mobile
const WEIGHT_LABEL_CLASS = 'css-1cdcuw7'; // The kg/weight label element
const TOOLTIP_SELECTOR = '[role="tooltip"]'; // Popper.js tooltip element

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let tracker = createCleanupTracker();
let initialized = false;
let plantInfoUnsubscribe: Unsubscribe | null = null;
let lastRenderedSize: number | null = null;
let rafHandle: number | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Crop Size Update Logic
// ─────────────────────────────────────────────────────────────────────────────

function calculateCurrentSize(): number {
  const tile = getCurrentTile().get();
  const plant = tile.plant;

  if (!plant) return 0;

  const currentSlot = plant.currentSlotIndex !== null ? plant.slots[plant.currentSlotIndex] : null;

  if (!currentSlot) return 0;

  return calculateCropSize(currentSlot.species, currentSlot.targetScale);
}

function calculateCropWeight(species: string, targetScale: number): string {
  const plantsData = MGData.get('plants');
  if (!plantsData) return '';

  const plantData = (plantsData as any)[species];
  if (!plantData?.crop?.baseWeight) return '';

  const weight = plantData.crop.baseWeight * targetScale;
  return `${weight.toFixed(2)} kg`;
}

function updateTooltipContent(): void {
  const tooltips = document.querySelectorAll<HTMLElement>(TOOLTIP_SELECTOR);

  const tile = getCurrentTile().get();
  const plant = tile.plant;

  if (!plant || plant.currentSlotIndex === null) return;

  const currentSlot = plant.slots[plant.currentSlotIndex];
  if (!currentSlot) return;

  const calculatedWeight = calculateCropWeight(currentSlot.species, currentSlot.targetScale);

  for (const tooltip of tooltips) {
    const rect = tooltip.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;

    const text = tooltip.textContent?.trim();
    if (text && text.startsWith('Size:') && calculatedWeight) {
      tooltip.textContent = calculatedWeight;
    }
  }
}

function doUpdateSize(size: number, currentSlot: any): void {
  // Query weight elements directly — works on both desktop and mobile
  const weightEls = document.querySelectorAll<HTMLElement>(`p.${WEIGHT_LABEL_CLASS}`);

  for (const weightEl of weightEls) {
    const rect = weightEl.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (weightEl.closest('button.chakra-button')) continue;

    const svg = weightEl.querySelector('svg');
    weightEl.textContent = `${size}%`;
    if (svg) weightEl.appendChild(svg);
  }

  updateTooltipContent();
}

function scheduleRender(): void {
  if (rafHandle !== null) {
    cancelAnimationFrame(rafHandle);
  }

  rafHandle = requestAnimationFrame(() => {
    rafHandle = null;

    const size = calculateCurrentSize();

    if (size === lastRenderedSize) return;

    lastRenderedSize = size;

    const tile = getCurrentTile().get();
    const plant = tile.plant;
    if (!plant) return;

    const currentSlot = plant.currentSlotIndex !== null ? plant.slots[plant.currentSlotIndex] : null;
    if (!currentSlot) return;

    doUpdateSize(size, currentSlot);
  });
}

function updateCropSizes(): void {
  const tile = getCurrentTile().get();
  const plant = tile.plant;

  if (!plant || plant.currentSlotIndex === null) return;

  const currentSlot = plant.slots[plant.currentSlotIndex];
  if (!currentSlot) return;

  const size = calculateCropSize(currentSlot.species, currentSlot.targetScale);
  const weightEls = document.querySelectorAll<HTMLElement>(`p.${WEIGHT_LABEL_CLASS}`);

  for (const weightEl of weightEls) {
    const rect = weightEl.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (weightEl.closest('button.chakra-button')) continue;

    try {
      const svg = weightEl.querySelector('svg');
      weightEl.textContent = `${size}%`;
      if (svg) weightEl.appendChild(svg);
    } catch (err) {
      console.warn('[CropSizeIndicator.render] Failed to update size:', err);
    }
  }

  updateTooltipContent();
}

function restoreCropWeights(): void {
  const tile = getCurrentTile().get();
  const plant = tile.plant;

  if (!plant || plant.currentSlotIndex === null) return;

  const currentSlot = plant.slots[plant.currentSlotIndex];
  if (!currentSlot) return;

  const weight = calculateCropWeight(currentSlot.species, currentSlot.targetScale);

  const weightEls = document.querySelectorAll<HTMLElement>(`p.${WEIGHT_LABEL_CLASS}`);
  for (const weightEl of weightEls) {
    const rect = weightEl.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (weightEl.closest('button.chakra-button')) continue;

    const svg = weightEl.querySelector('svg');
    weightEl.textContent = weight;
    if (svg) weightEl.appendChild(svg);
  }

  const tooltips = document.querySelectorAll<HTMLElement>(TOOLTIP_SELECTOR);
  for (const tooltip of tooltips) {
    const rect = tooltip.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;

    const text = tooltip.textContent?.trim();
    if (text && !text.includes('kg')) {
      tooltip.textContent = weight;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip Mutation Observation
// ─────────────────────────────────────────────────────────────────────────────

function startObservingTooltips(): void {
  updateCropSizes();

  plantInfoUnsubscribe = getCurrentTile().subscribePlantInfo(() => {
    scheduleRender();
  });

  // Debounced mutation handler — coalesces rapid DOM changes into a single
  // rAF pass to avoid stalling Firefox with synchronous observer callbacks.
  let pendingRAF = false;
  let needsCropSizeUpdate = false;
  let needsTooltipUpdate = false;

  function processPending(): void {
    pendingRAF = false;
    if (needsCropSizeUpdate) {
      needsCropSizeUpdate = false;
      updateCropSizes();
    }
    if (needsTooltipUpdate) {
      needsTooltipUpdate = false;
      updateTooltipContent();
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // Weight label added directly
            if (node.tagName === 'P' && node.classList.contains(WEIGHT_LABEL_CLASS)) {
              if (!node.closest('button.chakra-button')) {
                needsCropSizeUpdate = true;
              }
            }

            // Weight label added inside a subtree
            const weightEls = node.querySelectorAll<HTMLElement>(`p.${WEIGHT_LABEL_CLASS}`);
            if (weightEls.length > 0) {
              needsCropSizeUpdate = true;
            }

            // Popper.js tooltip with Size: text
            if (node.hasAttribute('role') && node.getAttribute('role') === 'tooltip') {
              const text = node.textContent?.trim();
              if (text && text.startsWith('Size:')) {
                needsTooltipUpdate = true;
              }
            }

            const tooltips = node.querySelectorAll<HTMLElement>(TOOLTIP_SELECTOR);
            tooltips.forEach((tooltip) => {
              const text = tooltip.textContent?.trim();
              if (text && text.startsWith('Size:')) needsTooltipUpdate = true;
            });
          }
        });
      }
    }
    if ((needsCropSizeUpdate || needsTooltipUpdate) && !pendingRAF) {
      pendingRAF = true;
      requestAnimationFrame(processPending);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  addObserverWithCleanup(tracker, observer);
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export const render = {
  /**
   * Start updating crop sizes in tooltips
   * Idempotent: safe to call multiple times
   */
  init(): void {
    if (initialized) return;

    initialized = true;

    startObservingTooltips();
  },

  /**
   * Stop updating and cleanup
   * Reversible: re-calling init() will reinitialize
   */
  destroy(): void {
    if (!initialized) return;

    initialized = false;

    restoreCropWeights();

    if (rafHandle !== null) {
      cancelAnimationFrame(rafHandle);
      rafHandle = null;
    }

    if (plantInfoUnsubscribe) {
      plantInfoUnsubscribe();
      plantInfoUnsubscribe = null;
    }

    tracker.run();
    tracker.clear();

    tracker = createCleanupTracker();
    lastRenderedSize = null;
  },

  /**
   * Check if currently initialized
   */
  isEnabled(): boolean {
    return initialized;
  },
};
