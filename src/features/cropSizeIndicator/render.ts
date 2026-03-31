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
import { findCropTooltipInfos, findCropTooltipInfosFromNode } from '../../ui/inject/qol/_shared/cropTooltips';

// ─────────────────────────────────────────────────────────────────────────────
// Selectors (update these if game UI structure changes)
// ─────────────────────────────────────────────────────────────────────────────

const WEIGHT_LABEL_CLASS = 'css-1cdcuw7'; // The kg/weight label element
const SIZE_BADGE_CLASS = 'gemini-qol-cropSize';
const TOOLTIP_SELECTOR = '[role="tooltip"], .chakra-tooltip, [data-popper-placement]';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let tracker = createCleanupTracker();
let stylesInjected = false;
let initialized = false;
let plantInfoUnsubscribe: Unsubscribe | null = null;
let lastRenderedSize: number | null = null;
let rafHandle: number | null = null;

const CROP_SIZE_STYLES = `
  .${SIZE_BADGE_CLASS} {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-top: 4px;
    font-size: 12px;
    color: #A88A6B;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .${SIZE_BADGE_CLASS} {
      font-size: 11px;
      margin-top: 2px;
    }
  }
`;

function ensureStyles(): void {
  if (stylesInjected) return;

  const style = document.createElement('style');
  style.id = 'gemini-qol-cropSize-styles';
  style.textContent = CROP_SIZE_STYLES;
  document.head.appendChild(style);

  tracker.add(() => style.remove());
  stylesInjected = true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Crop Size Update Logic
// ─────────────────────────────────────────────────────────────────────────────

function findWeightElement(container: HTMLElement): HTMLElement | null {
  const byClass = container.querySelector<HTMLElement>(`.${WEIGHT_LABEL_CLASS}`);
  if (byClass) return byClass;

  const textNodes = container.querySelectorAll<HTMLElement>('p.chakra-text, span.chakra-text, div.chakra-text, p, span, div');
  for (const node of textNodes) {
    const text = node.textContent?.trim() ?? '';
    if (/^\\d+(?:\\.\\d+)?\\s*kg$/i.test(text)) {
      return node;
    }
  }

  return null;
}

function ensureSizeBadge(infoContainer: HTMLElement, size: number): void {
  let badge = infoContainer.querySelector<HTMLElement>(`.${SIZE_BADGE_CLASS}`);
  if (!badge) {
    badge = document.createElement('div');
    badge.className = SIZE_BADGE_CLASS;
    infoContainer.appendChild(badge);
    tracker.add(() => badge?.remove());
  }
  badge.textContent = `${size}%`;
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
  const tooltips = findCropTooltipInfos();
  let updatedCount = 0;

  for (const tooltip of tooltips) {
    const weightElement =
      findWeightElement(tooltip.root) ||
      findWeightElement(tooltip.infoContainer);

    if (weightElement) {
      const svg = weightElement.querySelector('svg');
      weightElement.textContent = `${size}%`;
      if (svg) {
        weightElement.appendChild(svg);
      }
      updatedCount += 1;
    } else {
      ensureSizeBadge(tooltip.infoContainer, size);
      updatedCount += 1;
    }
  }

  // Also update tooltips when plant data changes
  updateTooltipContent();

  console.log(`[CropSizeIndicator.render] Updated all sizes:`, {
    species: currentSlot.species,
    scale: currentSlot.targetScale,
    size,
    count: updatedCount,
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
    const style = window.getComputedStyle(tooltip);
    if (style.display === 'none' || style.visibility === 'hidden') continue;

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
  try {
    const tile = getCurrentTile().get();
    const plant = tile.plant;

    if (!plant || plant.currentSlotIndex === null) {
      return;
    }

    const currentSlot = plant.slots[plant.currentSlotIndex];
    if (!currentSlot) return;

    const size = calculateCropSize(currentSlot.species, currentSlot.targetScale);
    doUpdateSize(size, currentSlot);
  } catch (err) {
    console.warn('[CropSizeIndicator.render] Failed to update size:', err);
  }
}

function restoreCropWeights(): void {
  const tile = getCurrentTile().get();
  const plant = tile.plant;

  if (!plant || plant.currentSlotIndex === null) {
    return;
  }

  const currentSlot = plant.slots[plant.currentSlotIndex];
  if (!currentSlot) return;

  const weight = calculateCropWeight(currentSlot.species, currentSlot.targetScale);

  const tooltips = findCropTooltipInfos();
  for (const tooltip of tooltips) {
    const weightElement =
      findWeightElement(tooltip.root) ||
      findWeightElement(tooltip.infoContainer);

    if (weightElement && weight) {
      const svg = weightElement.querySelector('svg');
      weightElement.textContent = weight;
      if (svg) {
        weightElement.appendChild(svg);
      }
    }

    const badge = tooltip.infoContainer.querySelector<HTMLElement>(`.${SIZE_BADGE_CLASS}`);
    if (badge) {
      badge.remove();
    }
  }

  // Restore tooltips
  const tooltipNodes = document.querySelectorAll<HTMLElement>(TOOLTIP_SELECTOR);
  for (const tooltip of tooltipNodes) {
    const text = tooltip.textContent?.trim();
    // If it's a size tooltip we modified, restore it to weight
    if (text && !text.includes('kg') && weight) {
      tooltip.textContent = weight;
    }
  }

  console.log('[CropSizeIndicator.render] Restored crop weights');
}

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip Mutation Observation
// ─────────────────────────────────────────────────────────────────────────────

function startObservingTooltips(): void {
  // Update sizes for existing crops
  updateCropSizes();

  // Subscribe to plant info changes to update tooltip sizes
  plantInfoUnsubscribe = getCurrentTile().subscribePlantInfo(() => {
    scheduleRender();
  });

  // Watch for new crops added to the page and tooltips
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const cropTooltips = findCropTooltipInfosFromNode(node);
            if (cropTooltips.length > 0) {
              updateCropSizes();
            }

            const tooltipNodes = node.matches(TOOLTIP_SELECTOR)
              ? [node]
              : Array.from(node.querySelectorAll<HTMLElement>(TOOLTIP_SELECTOR));

            for (const tooltip of tooltipNodes) {
              const text = tooltip.textContent?.trim();
              if (text && text.startsWith('Size:')) {
                updateTooltipContent();
              }
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

    ensureStyles();
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
    stylesInjected = false;
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
