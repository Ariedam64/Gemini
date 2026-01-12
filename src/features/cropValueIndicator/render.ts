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
import { loadConfig } from './state';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let tracker = createCleanupTracker();
let stylesInjected = false;
let initialized = false;

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────

const CROP_PRICE_STYLES = `
  .gemini-qol-cropPrice {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem 0 0 0;
    margin-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.9rem;
  }

  .gemini-qol-cropPrice__label {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
  }

  .gemini-qol-cropPrice__value {
    color: #4ade80;
    font-weight: 600;
    font-family: 'Courier New', monospace;
  }

  @media (max-width: 768px) {
    .gemini-qol-cropPrice {
      font-size: 0.8rem;
      padding: 0.4rem 0 0 0;
      margin-top: 0.4rem;
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

  console.log('[CropValueIndicator.render] Styles injected');
}

// ─────────────────────────────────────────────────────────────────────────────
// Price Element Creation
// ─────────────────────────────────────────────────────────────────────────────

interface CropTooltip {
  element: HTMLElement;
  priceElement?: HTMLElement;
}

function createPriceElement(price: number): HTMLElement {
  const root = document.createElement('div');
  root.className = 'gemini-qol-cropPrice';

  const label = document.createElement('span');
  label.className = 'gemini-qol-cropPrice__label';
  label.textContent = 'Price: ';

  const value = document.createElement('span');
  value.className = 'gemini-qol-cropPrice__value';
  value.textContent = price > 0 ? price.toLocaleString() : 'N/A';

  root.appendChild(label);
  root.appendChild(value);

  return root;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip Detection & Injection
// ─────────────────────────────────────────────────────────────────────────────

function findCropTooltips(): CropTooltip[] {
  const tooltips: CropTooltip[] = [];

  // Strategy: Look for tooltip elements with crop-related content
  const candidates = document.querySelectorAll<HTMLElement>(
    '[role="tooltip"], .tooltip, .popup, [class*="tooltip"]'
  );

  for (const el of candidates) {
    // Check if visible
    if (!el.offsetParent) continue;

    // Check for crop indicators (e.g., "Starweaver Fruit", size percentages, etc.)
    const text = el.textContent || '';
    if (text.includes('%') || text.match(/\d+h\s+\d+m/)) {
      tooltips.push({ element: el });
    }
  }

  return tooltips;
}

function injectPriceToTooltip(tooltip: CropTooltip): void {
  // Check if already injected
  if (tooltip.element.querySelector('.gemini-qol-cropPrice')) {
    return;
  }

  try {
    // Try to extract crop info from tooltip
    // Strategy: Look for crop species name in tooltip
    const titleEl = tooltip.element.querySelector('p, h3, h4, strong, span[class*="name"]');
    if (!titleEl) return;

    const species = titleEl.textContent?.trim();
    if (!species) return;

    // For now, use a default scale and empty mutations
    // In a full implementation, we'd extract these from the tooltip data
    const targetScale = 1.0;
    const mutations: string[] = [];

    // Calculate price
    const price = calculateCropSellPrice(species, targetScale, mutations);

    // Inject price element
    const priceEl = createPriceElement(price);
    tooltip.element.appendChild(priceEl);

    tracker.add(() => priceEl.remove());

    console.log(`[CropValueIndicator.render] Injected price for ${species}`);
  } catch (err) {
    console.warn('[CropValueIndicator.render] Failed to inject price:', err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip Mutation Observation
// ─────────────────────────────────────────────────────────────────────────────

function startObservingTooltips(): void {
  // Inject prices for existing tooltips
  const existing = findCropTooltips();
  for (const tooltip of existing) {
    injectPriceToTooltip(tooltip);
  }

  // Watch for new tooltips
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        // Check if any new tooltip nodes were added
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // Check if this is a tooltip or contains tooltips
            if (node.getAttribute('role') === 'tooltip' ||
                node.className?.includes('tooltip') ||
                node.className?.includes('popup')) {
              setTimeout(() => injectPriceToTooltip({ element: node }), 50);
            }

            // Also check children
            const children = node.querySelectorAll<HTMLElement>(
              '[role="tooltip"], .tooltip, .popup, [class*="tooltip"]'
            );
            children.forEach((child) => {
              setTimeout(() => injectPriceToTooltip({ element: child }), 50);
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

  console.log('[CropValueIndicator.render] Started observing tooltips');
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
    if (initialized) {
      console.log('[CropValueIndicator.render] Already initialized');
      return;
    }

    const config = loadConfig();
    if (!config.enabled) {
      console.log('[CropValueIndicator.render] Feature disabled');
      return;
    }

    initialized = true;

    ensureStyles();
    startObservingTooltips();

    console.log('✅ [CropValueIndicator.render] Initialized');
  },

  /**
   * Stop injecting and cleanup
   * Reversible: re-calling init() will reinitialize
   */
  destroy(): void {
    if (!initialized) return;

    initialized = false;
    tracker.run();
    tracker.clear();

    // Reset tracker for next init
    tracker = createCleanupTracker();
    stylesInjected = false;

    console.log('🛑 [CropValueIndicator.render] Destroyed');
  },

  /**
   * Check if enabled
   */
  isEnabled(): boolean {
    return loadConfig().enabled;
  },
};
