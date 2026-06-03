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
// Selectors
// ─────────────────────────────────────────────────────────────────────────────
//
// Mature crop tooltips are matched by STRUCTURE, not by Emotion hash classes
// (css-xxxxx). Those hashes are derived from the style and are both unstable
// across game updates AND shared by unrelated elements — keying on them caused
// mass false matches and froze the page. The component classes below
// (McGrid / McFlex / Sprite / chakra-text) are stable.
//
// A mature crop tooltip looks like:
//   .McGrid
//     .McFlex > canvas            (crop image)
//     .McFlex                     (info column)
//       p.chakra-text             (species name)
//       .McFlex                   (group row)  ← injection anchor
//         .McFlex > span...       (mutations)
//         .McFlex                 (size row)
//           .Sprite > canvas      (size icon)
//           p.chakra-text         (size value)

// Entry selector for the scan. `McGrid`/`McFlex` are generic layout primitives
// used everywhere in the game UI — scanning all of them every frame froze the
// page. This is the crop-tooltip grid's specific class: it returns only a
// handful of elements, and we still validate the structure before injecting.
// If a game update breaks detection, this is the first thing to refresh.
const CROP_TOOLTIP_GRID_CLASS = 'css-1utk8e1';

// Minimum delay between rescans (ms). Tooltips don't appear faster than human
// reaction, so throttling here keeps movement smooth without visible lag.
const RESCAN_THROTTLE_MS = 200;

// Growth crops (still growing): kept as a class-based selector for now.
const CROP_CONTAINER_CLASS_GROWTH = 'css-v439q6';

/**
 * Find the size-value <p> inside a crop tooltip by structure: the size row is a
 * `.McFlex` that holds a `.Sprite` icon directly followed by a `p.chakra-text`.
 */
function findSizeLabel(root: HTMLElement): HTMLElement | null {
  const rows = root.querySelectorAll<HTMLElement>('.McFlex');
  for (const row of rows) {
    if (!row.querySelector(':scope > .Sprite')) continue;
    const valueEl = row.querySelector(':scope > p.chakra-text') as HTMLElement | null;
    if (valueEl) return valueEl;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let tracker = createCleanupTracker();
let stylesInjected = false;
let initialized = false;
let plantInfoUnsubscribe: Unsubscribe | null = null;
let lastRenderedPrice: number | null = null;
let rafHandle: number | null = null;
let scanTimer: number | null = null;

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

// Coin sprite is identical for every price element — load it once and reuse.
// Loading it per-injection (awaited) is what made rapid hovering freeze the page.
let coinCanvasPromise: Promise<HTMLCanvasElement | null> | null = null;

function getCoinCanvas(): Promise<HTMLCanvasElement | null> {
  if (!coinCanvasPromise) {
    coinCanvasPromise = MGSprite.toCanvas('ui', 'Coin').catch((err) => {
      console.warn('[CropValueIndicator.render] Failed to load coin sprite:', err);
      coinCanvasPromise = null; // allow a later retry
      return null;
    });
  }
  return coinCanvasPromise;
}

function drawCoin(canvas: HTMLCanvasElement): void {
  void getCoinCanvas().then((coinCanvas) => {
    if (!coinCanvas || !canvas.isConnected) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = Math.min(canvas.width / coinCanvas.width, canvas.height / coinCanvas.height);
    const scaledWidth = coinCanvas.width * scale;
    const scaledHeight = coinCanvas.height * scale;
    const x = (canvas.width - scaledWidth) / 2;
    const y = (canvas.height - scaledHeight) / 2;

    ctx.drawImage(coinCanvas, x, y, scaledWidth, scaledHeight);
  });
}

/**
 * Build the price element synchronously. The coin sprite is drawn afterwards
 * (cached), so the element can be inserted in the same tick it is created —
 * this is what keeps the dedup guard race-free.
 */
function createPriceElement(price: number): HTMLElement {
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

  drawCoin(canvas);

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

/**
 * Resolve the injection anchor for a mature crop from its size-value label.
 * The size value sits in a row alongside the mutations; anchoring on that row's
 * parent lets us insert the price on its own line at the bottom of the info column,
 * instead of inline next to the size.
 */
function resolveMatureAnchor(sizeEl: HTMLElement): HTMLElement | null {
  const sizeRow = sizeEl.closest('.McFlex') as HTMLElement | null;
  if (!sizeRow) return null;

  const groupRow = sizeRow.parentElement as HTMLElement | null;
  return groupRow ?? sizeRow;
}

function findCropTooltips(): CropTooltip[] {
  const tooltips: CropTooltip[] = [];
  const seen = new Set<HTMLElement>();

  // Mature crops: scoped to the crop-tooltip grid class, then validated by
  // structure (a grid holding a crop image + a size row).
  const grids = document.querySelectorAll<HTMLElement>(`.${CROP_TOOLTIP_GRID_CLASS}`);
  for (const grid of grids) {
    if (grid.closest('button.chakra-button')) continue;

    const rect = grid.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;

    // Must look like a crop tooltip: a crop image canvas + a size row
    if (!grid.querySelector(':scope .McFlex > canvas')) continue;

    const sizeEl = findSizeLabel(grid);
    if (!sizeEl) continue;

    const container = resolveMatureAnchor(sizeEl);
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

/**
 * Price of the crop currently shown in the tooltip.
 * currentTile.plant.currentSlotIndex now maps directly to the selected slot
 * (see currentTile buildPlantInfo), so it points at the exact slot displayed.
 */
function calculateCurrentPrice(): number {
  const plant = getCurrentTile().get().plant;
  if (!plant || plant.currentSlotIndex === null) return 0;

  const slot = plant.slots[plant.currentSlotIndex];
  if (!slot) return 0;

  return calculateCropSellPrice(slot.species, slot.targetScale, slot.mutations || []);
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

function injectPriceToTooltip(tooltip: CropTooltip): void {
  // Synchronous on purpose: guard + insertion must happen in the same tick so
  // concurrent observer batches can't each pass the guard and double-insert.
  // Price is inserted as the next sibling (afterend), so guard on the sibling too.
  if (tooltip.element.nextElementSibling?.classList.contains('gemini-qol-cropPrice')) return;
  if (tooltip.element.querySelector('.gemini-qol-cropPrice')) return;

  try {
    // Primary: selected slot from the game atom (the exact slot in the tooltip)
    let price = calculateCurrentPrice();

    // Fallback: extract from DOM if atom data not available.
    // The species name is the direct <p> child of the info column (the group
    // row's parent); the size value <p> lives deeper, inside the group row.
    if (price === 0) {
      const infoColumn = tooltip.element.parentElement as HTMLElement | null;
      const nameEl = infoColumn?.querySelector(':scope > p.chakra-text') as HTMLElement | null;
      if (nameEl) {
        const species = nameEl.textContent?.trim();
        if (species) {
          const targetScale = extractTargetScale(tooltip.element);
          const mutations = extractMutations(tooltip.element);
          price = calculateCropSellPrice(species, targetScale, mutations);
        }
      }
    }

    const priceEl = createPriceElement(price);
    // Insert after the tooltip element (not inside) to avoid flex row layout issues.
    // Not tracked per-element (would leak a closure per injection under rapid
    // hovering); all price elements are swept together in destroy().
    tooltip.element.insertAdjacentElement('afterend', priceEl);
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

  // Throttled rescan — DOM mutations fire constantly while the player moves, so
  // we coalesce them into at most one scan every RESCAN_THROTTLE_MS. The scan
  // itself is scoped to the crop-tooltip grid class (few elements), so this
  // stays cheap even during heavy movement.
  function rescan(): void {
    scanTimer = null;
    const crops = findCropTooltips();
    for (const crop of crops) {
      injectPriceToTooltip(crop);
    }
  }

  const observer = new MutationObserver((mutations) => {
    if (scanTimer !== null) return;

    for (const mutation of mutations) {
      if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
        scanTimer = window.setTimeout(rescan, RESCAN_THROTTLE_MS);
        return;
      }
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

    if (scanTimer !== null) {
      clearTimeout(scanTimer);
      scanTimer = null;
    }

    if (plantInfoUnsubscribe) {
      plantInfoUnsubscribe();
      plantInfoUnsubscribe = null;
    }

    tracker.run();
    tracker.clear();

    // Sweep every injected price element in one pass
    document
      .querySelectorAll('.gemini-qol-cropPrice')
      .forEach((el) => el.remove());

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
