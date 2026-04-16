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

const CROP_CONTAINER_CLASS_MATURE = 'css-qnqsp4';
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

interface MaturedCropTooltip {
  element: HTMLElement;
  weightElement?: HTMLElement;
}

function findMatureCropTooltips(): MaturedCropTooltip[] {
  const tooltips: MaturedCropTooltip[] = [];

  const matureCropContainers = document.querySelectorAll<HTMLElement>(
    `.${CROP_CONTAINER_CLASS_MATURE}`
  );

  console.log(`[CropSizeIndicator.debug] Found ${matureCropContainers.length} mature containers`);

  for (const container of matureCropContainers) {
    // Check if visible (use getBoundingClientRect to support position:fixed on mobile)
    const rect = container.getBoundingClientRect();
    console.log(`[CropSizeIndicator.debug] Container rect: ${rect.width}x${rect.height}, offsetParent: ${container.offsetParent?.tagName ?? 'null'}`);
    if (rect.width === 0 && rect.height === 0) {
      console.log(`[CropSizeIndicator.debug] Skipping container (zero size)`);
      continue;
    }

    // Skip if inside a pet button
    if (container.closest('button.chakra-button')) continue;

    // Find the weight label element by class
    const weightElement = container.querySelector<HTMLElement>(`.${WEIGHT_LABEL_CLASS}`);
    console.log(`[CropSizeIndicator.debug] Weight element (${WEIGHT_LABEL_CLASS}): ${weightElement ? 'found' : 'NOT FOUND'}`);
    if (weightElement) {
      tooltips.push({ element: container, weightElement });
    }
  }

  console.log(`[CropSizeIndicator.debug] findMatureCropTooltips → ${tooltips.length} visible tooltips`);
  return tooltips;
}

function calculateCurrentSize(): number {
  // Get plant data from currentTile
  const tile = getCurrentTile().get();
  const plant = tile.plant;

  if (!plant) return 0;

  const currentSlot = plant.currentSlotIndex !== null ? plant.slots[plant.currentSlotIndex] : null;

  if (!currentSlot) return 0;

  // Calculate size from the actual plant data
  return calculateCropSize(currentSlot.species, currentSlot.targetScale);
}

function doUpdateSize(size: number, currentSlot: any): void {
  // Update all visible crop size displays
  const allMatureContainers = document.querySelectorAll<HTMLElement>(
    `.${CROP_CONTAINER_CLASS_MATURE}`
  );

  for (const container of allMatureContainers) {
    const containerRect = container.getBoundingClientRect();
    if (containerRect.width === 0 && containerRect.height === 0) continue;
    if (container.closest('button.chakra-button')) continue;

    // Find the weight label element by class
    const weightElement = container.querySelector<HTMLElement>(`.${WEIGHT_LABEL_CLASS}`);
    if (weightElement) {
      // Replace the content - keep the SVG icon if it exists
      const svg = weightElement.querySelector('svg');
      const sizeText = `${size}%`;
      weightElement.textContent = sizeText;
      if (svg) {
        weightElement.appendChild(svg);
      }
    }
  }

  // Also update tooltips when plant data changes
  updateTooltipContent();

  console.log(`[CropSizeIndicator.render] 🔄 Updated all sizes:`, {
    species: currentSlot.species,
    scale: currentSlot.targetScale,
    size,
    count: allMatureContainers.length,
  });
}

function scheduleRender(): void {
  // Cancel previous RAF if pending
  if (rafHandle !== null) {
    cancelAnimationFrame(rafHandle);
  }

  rafHandle = requestAnimationFrame(() => {
    rafHandle = null;

    const size = calculateCurrentSize();

    // Skip if size hasn't changed
    if (size === lastRenderedSize) {
      return;
    }

    lastRenderedSize = size;

    const tile = getCurrentTile().get();
    const plant = tile.plant;
    if (!plant) return;

    const currentSlot = plant.currentSlotIndex !== null ? plant.slots[plant.currentSlotIndex] : null;
    if (!currentSlot) return;

    doUpdateSize(size, currentSlot);
  });
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
  // Find all visible tooltips
  const tooltips = document.querySelectorAll<HTMLElement>(TOOLTIP_SELECTOR);

  // Get current plant data for weight calculation
  const tile = getCurrentTile().get();
  const plant = tile.plant;

  if (!plant || plant.currentSlotIndex === null) {
    return;
  }

  const currentSlot = plant.slots[plant.currentSlotIndex];
  if (!currentSlot) return;

  const calculatedWeight = calculateCropWeight(currentSlot.species, currentSlot.targetScale);

  for (const tooltip of tooltips) {
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.width === 0 && tooltipRect.height === 0) continue; // Skip hidden tooltips

    const text = tooltip.textContent?.trim();
    if (text && text.startsWith('Size:')) {
      // Replace "Size: XX" with calculated kg weight
      if (calculatedWeight) {
        tooltip.textContent = calculatedWeight;
      }
    }
  }
}

function updateCropSizes(): void {
  // Find all mature crop tooltips and update their size displays
  const existing = findMatureCropTooltips();
  for (const crop of existing) {
    if (!crop.weightElement) continue;

    try {
      // Get size from currentTile data
      const tile = getCurrentTile().get();
      const plant = tile.plant;

      if (plant && plant.currentSlotIndex !== null) {
        const currentSlot = plant.slots[plant.currentSlotIndex];
        if (currentSlot) {
          const size = calculateCropSize(currentSlot.species, currentSlot.targetScale);

          // Update the weight element - show size with percent
          const svg = crop.weightElement.querySelector('svg');
          crop.weightElement.textContent = `${size}%`;
          if (svg) {
            crop.weightElement.appendChild(svg);
          }
        }
      }
    } catch (err) {
      console.warn('[CropSizeIndicator.render] Failed to update size:', err);
    }
  }

  // Also update any visible tooltips
  updateTooltipContent();
}

function restoreCropWeights(): void {
  // Restore crop labels and tooltips to original weight display
  const allMatureContainers = document.querySelectorAll<HTMLElement>(
    `.${CROP_CONTAINER_CLASS_MATURE}`
  );

  const tile = getCurrentTile().get();
  const plant = tile.plant;

  if (!plant || plant.currentSlotIndex === null) {
    return;
  }

  const currentSlot = plant.slots[plant.currentSlotIndex];
  if (!currentSlot) return;

  const weight = calculateCropWeight(currentSlot.species, currentSlot.targetScale);

  // Restore crop labels
  for (const container of allMatureContainers) {
    const restoreRect = container.getBoundingClientRect();
    if (restoreRect.width === 0 && restoreRect.height === 0) continue;
    if (container.closest('button.chakra-button')) continue;

    const weightElement = container.querySelector<HTMLElement>(`.${WEIGHT_LABEL_CLASS}`);
    if (weightElement) {
      const svg = weightElement.querySelector('svg');
      weightElement.textContent = weight;
      if (svg) {
        weightElement.appendChild(svg);
      }
    }
  }

  // Restore tooltips
  const tooltips = document.querySelectorAll<HTMLElement>(TOOLTIP_SELECTOR);
  for (const tooltip of tooltips) {
    const restoreTooltipRect = tooltip.getBoundingClientRect();
    if (restoreTooltipRect.width === 0 && restoreTooltipRect.height === 0) continue;

    const text = tooltip.textContent?.trim();
    // If it's a size tooltip we modified, restore it to weight
    if (text && !text.includes('kg')) {
      tooltip.textContent = weight;
    }
  }

  console.log('[CropSizeIndicator.render] Restored crop weights');
}

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip Mutation Observation
// ─────────────────────────────────────────────────────────────────────────────

function startObservingTooltips(): void {
  console.log(`[CropSizeIndicator.debug] startObservingTooltips called`);

  // Update sizes for existing crops
  updateCropSizes();

  // Subscribe to plant info changes to update tooltip sizes
  plantInfoUnsubscribe = getCurrentTile().subscribePlantInfo(() => {
    console.log(`[CropSizeIndicator.debug] subscribePlantInfo fired → scheduleRender`);
    scheduleRender();
  });

  // Watch for new crops added to the page and tooltips
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // Check if this node is a tooltip
            if (node.hasAttribute('role') && node.getAttribute('role') === 'tooltip') {
              const text = node.textContent?.trim();
              if (text && text.startsWith('Size:')) {
                updateTooltipContent();
              }
            }

            // Check if this node is a mature crop container
            if (node.classList.contains(CROP_CONTAINER_CLASS_MATURE)) {
              if (!node.closest('button.chakra-button')) {
                updateCropSizes();
              }
            }

            // Also check children for mature crop containers
            const matureCropContainers = node.querySelectorAll<HTMLElement>(
              `.${CROP_CONTAINER_CLASS_MATURE}`
            );
            if (matureCropContainers.length > 0) {
              updateCropSizes();
            }

            // Check children for tooltips
            const tooltips = node.querySelectorAll<HTMLElement>(TOOLTIP_SELECTOR);
            tooltips.forEach((tooltip) => {
              const text = tooltip.textContent?.trim();
              if (text && text.startsWith('Size:')) {
                updateTooltipContent();
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

  console.log('[CropSizeIndicator.render] Started observing crops');
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
    if (initialized) {
      console.log('[CropSizeIndicator.render] Already initialized');
      return;
    }

    initialized = true;

    startObservingTooltips();

    console.log('✅ [CropSizeIndicator.render] Initialized');
  },

  /**
   * Stop updating and cleanup
   * Reversible: re-calling init() will reinitialize
   */
  destroy(): void {
    if (!initialized) return;

    initialized = false;

    // Restore crop weights before cleanup
    restoreCropWeights();

    // Cancel pending RAF
    if (rafHandle !== null) {
      cancelAnimationFrame(rafHandle);
      rafHandle = null;
    }

    // Cleanup plant info subscription
    if (plantInfoUnsubscribe) {
      plantInfoUnsubscribe();
      plantInfoUnsubscribe = null;
    }

    tracker.run();
    tracker.clear();

    // Reset tracker for next init
    tracker = createCleanupTracker();
    lastRenderedSize = null;

    console.log('🛑 [CropSizeIndicator.render] Destroyed');
  },

  /**
   * Check if currently initialized
   */
  isEnabled(): boolean {
    return initialized;
  },
};
