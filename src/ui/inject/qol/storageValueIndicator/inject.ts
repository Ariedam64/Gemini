/**
 * Storage Value Indicator - DOM Injection Logic
 *
 * Injects total storage value into Seed Silo, Pet Hutch, and Decor Shed modals.
 */

import { createCleanupTracker, addObserverWithCleanup, withMutationGuard, isMutationGuarded } from '../../core/lifecycle';
import { storageValueIndicatorCss } from './styles.css';
import { createStorageValueSubscriptions } from './logic';
import { MGSprite } from '../../../../modules/sprite';
import { activeModalAtom } from '../../../../atoms/atoms';

type ModalKind = 'seed' | 'pet' | 'decor';

const MODAL_TITLES: Record<ModalKind, string> = {
  seed: 'Seeds in Silo',
  pet: 'Pets in Hutch',
  decor: 'Decor in Shed',
};

const STYLE_ID = 'gemini-qol-storageValue-styles';
const INDICATOR_CLASS = 'gemini-qol-storageValue';
const INDICATOR_TEXT_CLASS = 'gemini-qol-storageValue-text';

const MODAL_BY_ACTIVE: Record<string, ModalKind> = {
  seedSilo: 'seed',
  petHutch: 'pet',
  decorShed: 'decor',
};

let tracker = createCleanupTracker();
let initialized = false;
let stylesInjected = false;
let activeModal: ModalKind | null = null;
let activeHeaderGrid: HTMLElement | null = null;
let indicatorElement: HTMLElement | null = null;
let lastStorageSignature = '';
let unsubscribeValues: (() => void) | null = null;
type ValueBreakdown = { storage: number; inventory: number; total: number };

let currentValues: Record<ModalKind, ValueBreakdown> = {
  seed: { storage: 0, inventory: 0, total: 0 },
  pet: { storage: 0, inventory: 0, total: 0 },
  decor: { storage: 0, inventory: 0, total: 0 },
};
let debounceTimer: number | null = null;

function ensureStyles(): void {
  if (stylesInjected) return;
  if (document.getElementById(STYLE_ID)) {
    stylesInjected = true;
    return;
  }

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = storageValueIndicatorCss;
  document.head.appendChild(style);

  tracker.add(() => style.remove());
  stylesInjected = true;
}

function resetIndicatorState(): void {
  indicatorElement?.remove();
  indicatorElement = null;
  activeHeaderGrid = null;
  lastStorageSignature = '';
}

function updateIndicatorText(value: number): void {
  if (!indicatorElement) return;
  const textEl = indicatorElement.querySelector<HTMLElement>(`.${INDICATOR_TEXT_CLASS}`);
  if (!textEl) return;
  textEl.textContent = formatAbbreviated(value);
  indicatorElement.dataset.rawValue = String(Math.round(value));
  indicatorElement.title = `${value.toLocaleString()} coins`;
}

function updateIndicatorTooltip(): void {
  if (!indicatorElement || !activeModal) return;
  const breakdown = currentValues[activeModal];
  indicatorElement.dataset.rawValue = String(Math.round(breakdown.total));
  indicatorElement.title = `${breakdown.storage.toLocaleString()} + ${breakdown.inventory.toLocaleString()}`;
}

function getStorageSignature(): string {
  const seed = currentValues.seed;
  const pet = currentValues.pet;
  const decor = currentValues.decor;
  return `${seed.storage}|${seed.inventory}|${seed.total}|${pet.storage}|${pet.inventory}|${pet.total}|${decor.storage}|${decor.inventory}|${decor.total}`;
}

function createIndicatorElement(value: number): HTMLElement {
  const root = document.createElement('div');
  root.className = INDICATOR_CLASS;
  root.dataset.rawValue = String(Math.round(value));
  root.title = `${value.toLocaleString()} coins`;

  const spriteContainer = document.createElement('div');
  spriteContainer.className = 'gemini-qol-storageValue-sprite';

  const canvas = document.createElement('canvas');
  canvas.width = 20;
  canvas.height = 20;
  spriteContainer.appendChild(canvas);

  const text = document.createElement('div');
  text.className = INDICATOR_TEXT_CLASS;
  text.textContent = formatAbbreviated(value);

  root.appendChild(spriteContainer);
  root.appendChild(text);

  try {
    const coinCanvas = MGSprite.toCanvas('ui', 'Coin');
    if (coinCanvas) {
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
    console.warn('[StorageValueIndicator] Failed to render coin sprite:', err);
  }

  return root;
}

function formatAbbreviated(value: number): string {
  const rounded = Math.round(value);
  if (rounded >= 1_000_000_000_000_000) {
    return `${(rounded / 1_000_000_000_000_000).toFixed(2)}Q`;
  }
  if (rounded >= 1_000_000_000_000) {
    return `${(rounded / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (rounded >= 1_000_000_000) {
    return `${(rounded / 1_000_000_000).toFixed(2)}B`;
  }
  if (rounded >= 1_000_000) {
    return `${(rounded / 1_000_000).toFixed(2)}M`;
  }
  if (rounded >= 1_000) {
    const thousands = rounded / 1_000;
    return thousands >= 100 ? `${Math.round(thousands)}K` : `${thousands.toFixed(1)}K`;
  }
  return String(rounded);
}

function findHeaderGrid(modal: ModalKind): HTMLElement | null {
  const title = MODAL_TITLES[modal];
  const textElements = document.querySelectorAll<HTMLElement>('.chakra-text, p, span');

  for (const el of textElements) {
    const text = el.textContent?.trim();
    if (text !== title) continue;
    if (!el.offsetParent) continue;

    const grid = el.closest('.McGrid') as HTMLElement | null;
    if (!grid) continue;

    // Validate this is the header grid by ensuring it has a right count column
    const rightFlex = grid.querySelector('.McFlex');
    if (!rightFlex) continue;
    return grid;
  }

  return null;
}

function detectModalFromDom(): ModalKind | null {
  if (findHeaderGrid('seed')) return 'seed';
  if (findHeaderGrid('pet')) return 'pet';
  if (findHeaderGrid('decor')) return 'decor';
  return null;
}

function injectIndicator(modal: ModalKind): void {
  const headerGrid = findHeaderGrid(modal);
  if (!headerGrid) return;

  const signature = getStorageSignature();
  if (headerGrid === activeHeaderGrid && indicatorElement?.isConnected) {
    if (signature !== lastStorageSignature) {
      lastStorageSignature = signature;
      updateIndicatorText(currentValues[modal].total);
      updateIndicatorTooltip();
    }
    updateIndicatorText(currentValues[modal].total);
    updateIndicatorTooltip();
    return;
  }

  resetIndicatorState();
  activeHeaderGrid = headerGrid;

  const indicator = createIndicatorElement(currentValues[modal].total);
  indicatorElement = indicator;
  lastStorageSignature = signature;
  updateIndicatorTooltip();

  const leftCell = document.createElement('div');
  leftCell.style.display = 'flex';
  leftCell.style.alignItems = 'center';
  leftCell.style.justifyContent = 'flex-start';
  leftCell.style.position = 'relative';
  leftCell.style.minHeight = '20px';
  leftCell.appendChild(indicator);

  headerGrid.insertBefore(leftCell, headerGrid.firstChild);
  tracker.add(() => leftCell.remove());
}

function handleModalChange(next: ModalKind | null): void {
  if (next === activeModal) return;
  activeModal = next;

  if (!next) {
    resetIndicatorState();
    return;
  }

  ensureStyles();
  injectIndicator(next);
}

async function startValueSubscriptions(): Promise<void> {
  if (unsubscribeValues) return;

  const subscriptions = createStorageValueSubscriptions();
  unsubscribeValues = await subscriptions.start(({ kind, storageValue, inventoryValue, totalValue }) => {
    currentValues[kind] = { storage: storageValue, inventory: inventoryValue, total: totalValue };
    if (activeModal === kind && indicatorElement) {
      lastStorageSignature = getStorageSignature();
      updateIndicatorText(totalValue);
      updateIndicatorTooltip();
    }
  });

  tracker.add(() => {
    unsubscribeValues?.();
    unsubscribeValues = null;
  });
}

function processModal(): void {
  const detected = activeModal ?? detectModalFromDom();
  handleModalChange(detected);
}

function debouncedProcessModal(): void {
  if (debounceTimer !== null) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = window.setTimeout(() => {
    debounceTimer = null;
    if (!isMutationGuarded()) {
      withMutationGuard(() => processModal());
    }
  }, 200);
}

function startDomObservers(): void {
  // Initial scan with delays for React rendering
  setTimeout(processModal, 100);
  setTimeout(processModal, 400);
  setTimeout(processModal, 800);

  const observer = new MutationObserver(() => {
    if (isMutationGuarded()) return;
    debouncedProcessModal();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  addObserverWithCleanup(tracker, observer);

  tracker.add(() => {
    if (debounceTimer !== null) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
  });
}

export function init(): void {
  if (initialized) return;
  initialized = true;

  ensureStyles();
  startValueSubscriptions();

  activeModalAtom.onChangeNow((modal) => {
    const mapped = modal ? MODAL_BY_ACTIVE[String(modal)] ?? null : null;
    if (mapped) {
      handleModalChange(mapped);
      return;
    }
    const detected = detectModalFromDom();
    handleModalChange(detected);
  }).then((unsub) => {
    tracker.add(() => unsub());
  });

  startDomObservers();
}

export function destroy(): void {
  if (!initialized) return;
  initialized = false;

  resetIndicatorState();
  tracker.run();
  tracker.clear();
  tracker = createCleanupTracker();

  stylesInjected = false;
  activeModal = null;
  currentValues = {
    seed: { storage: 0, inventory: 0, total: 0 },
    pet: { storage: 0, inventory: 0, total: 0 },
    decor: { storage: 0, inventory: 0, total: 0 },
  };
}

export function isEnabled(): boolean {
  return initialized;
}
