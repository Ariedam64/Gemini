/**
 * Crop Value Indicator - DOM Injection (QOL Rendering)
 *
 * Injects crop prices into game UI crop tooltips.
 * Per ui/inject.md:
 * - Injection must NOT render Shadow DOM
 * - All listeners must be tracked and cleaned up
 * - Idempotent init(), reversible destroy()
 */

import { createCleanupTracker, addObserverWithCleanup } from '../../ui/inject/core/lifecycle';
import { calculateCropSellPrice } from '../../modules/calculators/logic/crop';
import { getCurrentTile } from '../../globals/variables/currentTile';
import { MGSprite } from '../../modules/sprite';
import type { Unsubscribe } from '../../globals/core/types';
import type { GrowSlot } from '../../atoms/types';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Selectors (update these if game UI structure changes)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const CROP_CONTAINER_CLASS_MATURE = 'css-qnqsp4';
const CROP_CONTAINER_CLASS_GROWTH = 'css-v439q6';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// State
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

let tracker = createCleanupTracker();
let stylesInjected = false;
let initialized = false;
let plantInfoUnsubscribe: Unsubscribe | null = null;
let lastRenderedPrice: number | null = null;
let rafHandle: number | null = null;

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Styles
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const CROP_PRICE_STYLES = `
  .gemini-qol-cropPrice {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 6px;
  }

  .gemini-qol-cropPrice-sprite {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .gemini-qol-cropPrice-text {
    font-size: 14px;
    color: var(--accent);
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .gemini-qol-cropPrice {
      gap: 4px;
      margin-top: 4px;
    }

    .gemini-qol-cropPrice-sprite {
      width: 16px;
      height: 16px;
    }

    .gemini-qol-cropPrice-text {
      font-size: 12px;
    }
  }
`;

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Style Injection
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ensureStyles(): void {
  if (stylesInjected) return;

  const style = document.createElement('style');
  style.id = 'gemini-qol-cropPrice-styles';
  style.textContent = CROP_PRICE_STYLES;
  document.head.appendChild(style);

  tracker.add(() => style.remove());
  stylesInjected = true;
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Price Element Creation
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface CropTooltip {
  element: HTMLElement;
  priceElement?: HTMLElement;
}

function createPriceElement(price: number): HTMLElement {
  const root = document.createElement('div');
  root.className = 'gemini-qol-cropPrice';

  // Sprite container
  const spriteContainer = document.createElement('div');
  spriteContainer.className = 'gemini-qol-cropPrice-sprite';

  // Canvas for the coin sprite
  const canvas = document.createElement('canvas');
  canvas.width = 20;
  canvas.height = 20;
  spriteContainer.appendChild(canvas);

  // Price text
  const priceText = document.createElement('div');
  priceText.className = 'gemini-qol-cropPrice-text';
  priceText.textContent = price > 0 ? price.toLocaleString() : '';

  root.appendChild(spriteContainer);
  root.appendChild(priceText);

  // Render the coin sprite on the canvas
  try {
    const coinCanvas = MGSprite.toCanvas('ui', 'Coin');
    if (coinCanvas && canvas.parentElement) {
      // Scale the coin sprite to fit the canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw the coin sprite centered on the canvas
        const scale = Math.min(canvas.width / coinCanvas.width, canvas.height / coinCanvas.height);
        const scaledWidth = coinCanvas.width * scale;
        const scaledHeight = coinCanvas.height * scale;
        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;

        ctx.drawImage(coinCanvas, x, y, scaledWidth, scaledHeight);
      }
    }
  } catch (err) {
    console.warn('[CropValueIndicator.render] Failed to render coin sprite:', err);
  }

  return root;
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Tooltip Detection & Injection
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * Extract mutations from tooltip
 * Looks for <span> elements with crop mutation names
 */
function extractMutations(el: HTMLElement): string[] {
  const mutations: string[] = [];

  // Look for spans with mutation names
  const spans = el.querySelectorAll('span.chakra-text');

  for (const span of spans) {
    const text = span.textContent?.trim();
    if (!text) continue;

    // Known mutation/condition names
    const knownMutations = [
      'Gold', 'Rainbow',
      'Wet', 'Chilled', 'Frozen',
      'Dawnlit', 'Dawnbound',
      'Amberlit', 'Amberbound',
    ];

    if (knownMutations.includes(text)) {
      mutations.push(text);
    }
  }

  return mutations;
}

/**
 * Extract target scale (weight) from tooltip
 * Looks for text like "0.50 kg" in <p> elements
 */
function extractTargetScale(el: HTMLElement): number {
  const paragraphs = el.querySelectorAll('p.chakra-text');

  for (const p of paragraphs) {
    const text = p.textContent?.trim();
    if (!text) continue;

    // Match pattern like "0.50 kg" or "1.25 kg"
    const match = text.match(/^([\d.]+)\s*kg$/i);
    if (match) {
      return parseFloat(match[1]);
    }
  }

  // Default to 1.0 if not found
  return 1.0;
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
    // Check if visible
    if (!container.offsetParent) continue;

    // Skip if inside a pet button
    if (container.closest('button.chakra-button')) continue;

    // Find the timer container (last McFlex with paragraphs)
    const mcFlexes = container.querySelectorAll<HTMLElement>(':scope > .McFlex > .McFlex');
    if (mcFlexes.length > 0) {
      const timerContainer = mcFlexes[mcFlexes.length - 1]; // Last McFlex is the timer/info
      if (timerContainer.querySelector('p.chakra-text')) {
        tooltips.push({ element: timerContainer });
      }
    }
  }

  return tooltips;
}

function updateTooltipPrice(infoContainer: HTMLElement): void {
  try {
    // Find existing price element
    const existingPrice = infoContainer.querySelector('.gemini-qol-cropPrice') as HTMLElement | null;
    if (!existingPrice) return;

    // Find the price text element
    const priceTextEl = existingPrice.querySelector('.gemini-qol-cropPrice-text') as HTMLElement | null;
    if (!priceTextEl) return;

    // Find the name element to extract species
    const nameEl = infoContainer.querySelector('p.chakra-text');
    if (!nameEl) return;

    const species = nameEl.textContent?.trim();
    if (!species) return;

    // Extract crop information
    const targetScale = extractTargetScale(infoContainer);
    const mutations = extractMutations(infoContainer);

    // Calculate new price
    const price = calculateCropSellPrice(species, targetScale, mutations);

    // Update the price element text
    priceTextEl.textContent = price > 0 ? price.toLocaleString() : '';
  } catch (err) {
    console.warn('[CropValueIndicator.render] Failed to update price:', err);
  }
}

function calculateCurrentPrice(): number {
  // Get plant data from currentTile
  const tile = getCurrentTile().get();
  const plant = tile.plant;

  if (!plant) return 0;

  const currentSlot = plant.currentSlotIndex !== null ? plant.slots[plant.currentSlotIndex] : null;

  if (!currentSlot) return 0;

  // Calculate price from the actual plant data
  return calculateCropSellPrice(
    currentSlot.species,
    currentSlot.targetScale,
    currentSlot.mutations || []
  );
}

import type { GrowSlot } from '../../atoms/types';

function doRender(price: number, currentSlot: GrowSlot): void {
  // Update all visible crop price elements
  const allPriceElements = document.querySelectorAll<HTMLElement>('.gemini-qol-cropPrice');

  for (const priceEl of allPriceElements) {
    if (!priceEl.offsetParent) continue;
    if (priceEl.closest('button.chakra-button')) continue;

    // Update the price text element
    const priceTextEl = priceEl.querySelector('.gemini-qol-cropPrice-text') as HTMLElement | null;
    if (priceTextEl) {
      priceTextEl.textContent = price > 0 ? price.toLocaleString() : '';
    }
  }
}

function scheduleRender(): void {
  // Cancel previous RAF if pending
  if (rafHandle !== null) {
    cancelAnimationFrame(rafHandle);
  }

  rafHandle = requestAnimationFrame(() => {
    rafHandle = null;

    const price = calculateCurrentPrice();

    // Skip if price hasn't changed
    if (price === lastRenderedPrice) {
      return;
    }

    lastRenderedPrice = price;

    const tile = getCurrentTile().get();
    const plant = tile.plant;
    if (!plant) return;

    const currentSlot = plant.currentSlotIndex !== null ? plant.slots[plant.currentSlotIndex] : null;
    if (!currentSlot) return;

    doRender(price, currentSlot);
  });
}

function injectPriceToTooltip(tooltip: CropTooltip): void {
  // Check if already injected
  if (tooltip.element.querySelector('.gemini-qol-cropPrice')) {
    return;
  }

  try {
    // Find the crop info container (McFlex that contains the name)
    const nameEl = tooltip.element.querySelector('p.chakra-text');
    if (!nameEl) {
      return;
    }

    const infoContainer = nameEl.closest('.McFlex') as HTMLElement | null;
    if (!infoContainer) {
      return;
    }

    // Get price from currentTile data (accurate and fast)
    const tile = getCurrentTile().get();
    const plant = tile.plant;

    let price = 0;
    let speciesId: string | null = null;

    if (plant && plant.currentSlotIndex !== null) {
      const currentSlot = plant.slots[plant.currentSlotIndex];
      if (currentSlot) {
        speciesId = currentSlot.species;
        price = calculateCropSellPrice(
          currentSlot.species,
          currentSlot.targetScale,
          currentSlot.mutations || []
        );
      }
    }

    // Fallback: extract from DOM if plant data not available
    if (price === 0) {
      const species = nameEl.textContent?.trim();
      if (species) {
        speciesId = species;
        const targetScale = extractTargetScale(infoContainer);
        const mutations = extractMutations(infoContainer);
        price = calculateCropSellPrice(species, targetScale, mutations);
      }
    }

    // Inject price element at the end of the info container
    const priceEl = createPriceElement(price);
    infoContainer.appendChild(priceEl);
    tracker.add(() => priceEl.remove());

    // Note: Missing variants are now handled by the separate MGMissingVariantsIndicator feature
  } catch (err) {
    console.warn('[CropValueIndicator.render] Failed to inject price:', err);
  }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Tooltip Mutation Observation
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function startObservingTooltips(): void {
  // Inject prices for existing crops
  const existing = findCropTooltips();
  for (const crop of existing) {
    injectPriceToTooltip(crop);
  }

  // Subscribe to plant info changes to update tooltip prices
  plantInfoUnsubscribe = getCurrentTile().subscribePlantInfo(() => {
    scheduleRender();
  });

  // Watch for new crops added to the page
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // Check if this node is a mature crop container
            if (node.classList.contains(CROP_CONTAINER_CLASS_MATURE)) {
              if (!node.closest('button.chakra-button')) {
                injectPriceToTooltip({ element: node });
              }
            }

            // Also check children for mature crop containers
            const matureCropContainers = node.querySelectorAll<HTMLElement>(
              `.${CROP_CONTAINER_CLASS_MATURE}`
            );
            matureCropContainers.forEach((container) => {
              if (!container.closest('button.chakra-button')) {
                injectPriceToTooltip({ element: container });
              }
            });

            // Check if this node is a growth crop container
            if (node.classList.contains(CROP_CONTAINER_CLASS_GROWTH)) {
              if (!node.closest('button.chakra-button')) {
                const mcFlexes = node.querySelectorAll<HTMLElement>(':scope > .McFlex > .McFlex');
                if (mcFlexes.length > 0) {
                  const timerContainer = mcFlexes[mcFlexes.length - 1];
                  if (timerContainer.querySelector('p.chakra-text') && !timerContainer.querySelector('.gemini-qol-cropPrice')) {
                    injectPriceToTooltip({ element: timerContainer });
                  }
                }
              }
            }

            // Also check children for growth crop containers
            const growthCropContainers = node.querySelectorAll<HTMLElement>(
              `.${CROP_CONTAINER_CLASS_GROWTH}`
            );
            growthCropContainers.forEach((container) => {
              if (!container.closest('button.chakra-button')) {
                const mcFlexes = container.querySelectorAll<HTMLElement>(':scope > .McFlex > .McFlex');
                if (mcFlexes.length > 0) {
                  const timerContainer = mcFlexes[mcFlexes.length - 1];
                  if (timerContainer.querySelector('p.chakra-text') && !timerContainer.querySelector('.gemini-qol-cropPrice')) {
                    injectPriceToTooltip({ element: timerContainer });
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


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Public API
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const render = {
  /**
   * Start injecting prices into tooltips
   * Idempotent: safe to call multiple times
   */
  init(): void {
    if (initialized) {
      return;
    }

    initialized = true;

    ensureStyles();
    startObservingTooltips();
    // Note: Missing variants are now handled by the separate MGMissingVariantsIndicator feature
  },

  /**
   * Stop injecting and cleanup
   * Reversible: re-calling init() will reinitialize
   */
  destroy(): void {
    if (!initialized) return;

    initialized = false;

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
    lastRenderedPrice = null;
  },

  /**
   * Check if currently initialized
   */
  isEnabled(): boolean {
    return initialized;
  },
};




