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

// ─────────────────────────────────────────────────────────────────────────────
// Selectors (update these if game UI structure changes)
// ─────────────────────────────────────────────────────────────────────────────

// Universal anchor: same class on both desktop and mobile
const WEIGHT_LABEL_CLASS = 'css-1cdcuw7';
// Growth crops (still growing): keep class-based selector
const CROP_CONTAINER_CLASS_GROWTH = 'css-v439q6';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let tracker = createCleanupTracker();
let stylesInjected = false;
let initialized = false;
let plantInfoUnsubscribe: Unsubscribe | null = null;
let lastRenderedPrice: number | null = null;
let rafHandle: number | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────

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
    color: #FFD84D;
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

// ─────────────────────────────────────────────────────────────────────────────
// Style Injection
// ─────────────────────────────────────────────────────────────────────────────

function ensureStyles(): void {
  if (stylesInjected) return;

  const style = document.createElement('style');
  style.id = 'gemini-qol-cropPrice-styles';
  style.textContent = CROP_PRICE_STYLES;
  document.head.appendChild(style);

  tracker.add(() => style.remove());
  stylesInjected = true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Price Element Creation
// ─────────────────────────────────────────────────────────────────────────────

interface CropTooltip {
  element: HTMLElement;
}

async function createPriceElement(price: number): Promise<HTMLElement> {
  const root = document.createElement('div');
  root.className = 'gemini-qol-cropPrice';

  const spriteContainer = document.createElement('div');
  spriteContainer.className = 'gemini-qol-cropPrice-sprite';

  const canvas = document.createElement('canvas');
  canvas.width = 20;
  canvas.height = 20;
  spriteContainer.appendChild(canvas);

  const priceText = document.createElement('div');
  priceText.className = 'gemini-qol-cropPrice-text';
  priceText.textContent = price > 0 ? price.toLocaleString() : '';

  root.appendChild(spriteContainer);
  root.appendChild(priceText);

  try {
    const coinCanvas = await MGSprite.toCanvas('ui', 'Coin');
    if (coinCanvas && canvas.parentElement) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
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

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip Detection & Injection
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Extract mutations from a crop panel element
 */
function extractMutations(el: HTMLElement): string[] {
  const mutations: string[] = [];
  const spans = el.querySelectorAll('span.chakra-text');

  for (const span of spans) {
    const text = span.textContent?.trim();
    if (!text) continue;

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
 * Extract target scale from a crop panel element
 * Looks for text like "0.50 kg" in <p> elements
 */
function extractTargetScale(el: HTMLElement): number {
  const paragraphs = el.querySelectorAll('p.chakra-text');

  for (const p of paragraphs) {
    const text = p.textContent?.trim();
    if (!text) continue;

    const match = text.match(/^([\d.]+)\s*kg$/i);
    if (match) {
      return parseFloat(match[1]);
    }
  }

  return 1.0;
}

function findCropTooltips(): CropTooltip[] {
  const tooltips: CropTooltip[] = [];
  const seen = new Set<HTMLElement>();

  // Mature crops: use weight label as universal anchor (same class on mobile and desktop)
  const weightEls = document.querySelectorAll<HTMLElement>(`p.${WEIGHT_LABEL_CLASS}`);
  for (const weightEl of weightEls) {
    const rect = weightEl.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (weightEl.closest('button.chakra-button')) continue;

    const container = weightEl.closest('.McFlex') as HTMLElement | null;
    if (!container || seen.has(container)) continue;
    seen.add(container);

    tooltips.push({ element: container });
  }

  // Growth crops (still growing): keep class-based selector
  const growthCropContainers = document.querySelectorAll<HTMLElement>(
    `.${CROP_CONTAINER_CLASS_GROWTH}`
  );

  for (const container of growthCropContainers) {
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (container.closest('button.chakra-button')) continue;

    const mcFlexes = container.querySelectorAll<HTMLElement>(':scope > .McFlex > .McFlex');
    if (mcFlexes.length > 0) {
      const timerContainer = mcFlexes[mcFlexes.length - 1];
      if (timerContainer.querySelector('p.chakra-text') && !seen.has(timerContainer)) {
        seen.add(timerContainer);
        tooltips.push({ element: timerContainer });
      }
    }
  }

  return tooltips;
}

function doRender(price: number): void {
  const allPriceElements = document.querySelectorAll<HTMLElement>('.gemini-qol-cropPrice');

  for (const priceEl of allPriceElements) {
    const rect = priceEl.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    if (priceEl.closest('button.chakra-button')) continue;

    const priceTextEl = priceEl.querySelector('.gemini-qol-cropPrice-text') as HTMLElement | null;
    if (priceTextEl) {
      priceTextEl.textContent = price > 0 ? price.toLocaleString() : '';
    }
  }
}

function calculateCurrentPrice(): number {
  const tile = getCurrentTile().get();
  const plant = tile.plant;

  if (!plant) return 0;

  const currentSlot = plant.currentSlotIndex !== null ? plant.slots[plant.currentSlotIndex] : null;

  if (!currentSlot) return 0;

  return calculateCropSellPrice(
    currentSlot.species,
    currentSlot.targetScale,
    currentSlot.mutations || []
  );
}

function scheduleRender(): void {
  if (rafHandle !== null) {
    cancelAnimationFrame(rafHandle);
  }

  rafHandle = requestAnimationFrame(() => {
    rafHandle = null;

    const price = calculateCurrentPrice();

    if (price === lastRenderedPrice) return;

    lastRenderedPrice = price;

    doRender(price);
  });
}

async function injectPriceToTooltip(tooltip: CropTooltip): Promise<void> {
  if (tooltip.element.querySelector('.gemini-qol-cropPrice')) return;

  try {
    // Primary: use atom data (accurate, works on all platforms)
    const tile = getCurrentTile().get();
    const plant = tile.plant;

    let price = 0;
    if (plant && plant.currentSlotIndex !== null) {
      const currentSlot = plant.slots[plant.currentSlotIndex];
      if (currentSlot) {
        price = calculateCropSellPrice(
          currentSlot.species,
          currentSlot.targetScale,
          currentSlot.mutations || []
        );
      }
    }

    // Fallback: extract from DOM if atom data not available
    if (price === 0) {
      // Look for species name in nearby p.chakra-text (not the weight label)
      const parentEl = tooltip.element.parentElement as HTMLElement | null;
      const searchRoot = parentEl ?? tooltip.element;
      const nameEl = [...searchRoot.querySelectorAll('p.chakra-text')].find(
        p => !p.classList.contains(WEIGHT_LABEL_CLASS)
      ) as HTMLElement | undefined;
      if (nameEl) {
        const species = nameEl.textContent?.trim();
        if (species) {
          const targetScale = extractTargetScale(tooltip.element);
          const mutations = extractMutations(tooltip.element);
          price = calculateCropSellPrice(species, targetScale, mutations);
        }
      }
    }

    const priceEl = await createPriceElement(price);
    // Insert after the tooltip element (not inside) to avoid flex row layout issues
    tooltip.element.insertAdjacentElement('afterend', priceEl);
    tracker.add(() => priceEl.remove());
  } catch (err) {
    console.warn('[CropValueIndicator.render] Failed to inject price:', err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip Mutation Observation
// ─────────────────────────────────────────────────────────────────────────────

function startObservingTooltips(): void {
  const existing = findCropTooltips();
  for (const crop of existing) {
    injectPriceToTooltip(crop);
  }

  plantInfoUnsubscribe = getCurrentTile().subscribePlantInfo(() => {
    scheduleRender();
  });

  // Debounced mutation handler — coalesces rapid DOM changes into a single
  // rAF pass. This prevents Firefox from stalling on the dozens of
  // synchronous MutationObserver callbacks React triggers per render cycle.
  let pendingRAF = false;
  let pendingNodes: HTMLElement[] = [];

  function processPendingNodes(): void {
    pendingRAF = false;
    const nodes = pendingNodes;
    pendingNodes = [];

    for (const node of nodes) {
      // Weight label added directly → its McFlex parent is the injection point
      if (node.tagName === 'P' && node.classList.contains(WEIGHT_LABEL_CLASS)) {
        if (!node.closest('button.chakra-button')) {
          const container = node.closest('.McFlex') as HTMLElement | null;
          if (container) injectPriceToTooltip({ element: container });
        }
      }

      // Weight label added inside a subtree
      const weightEls = node.querySelectorAll<HTMLElement>(`p.${WEIGHT_LABEL_CLASS}`);
      weightEls.forEach((weightEl) => {
        if (!weightEl.closest('button.chakra-button')) {
          const container = weightEl.closest('.McFlex') as HTMLElement | null;
          if (container) injectPriceToTooltip({ element: container });
        }
      });

      // Growth crop containers
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
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            pendingNodes.push(node);
          }
        });
      }
    }
    if (pendingNodes.length > 0 && !pendingRAF) {
      pendingRAF = true;
      requestAnimationFrame(processPendingNodes);
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
   * Start injecting prices into tooltips
   * Idempotent: safe to call multiple times
   */
  init(): void {
    if (initialized) return;

    initialized = true;

    ensureStyles();
    startObservingTooltips();
  },

  /**
   * Stop injecting and cleanup
   * Reversible: re-calling init() will reinitialize
   */
  destroy(): void {
    if (!initialized) return;

    initialized = false;

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
