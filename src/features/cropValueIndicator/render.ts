/**
 * Crop Value Indicator - Pixi rendering (QOL)
 *
 * Draws a coin + price badge above the game's Pixi-rendered garden info card
 * for the currently displayed crop (see ../../ui/inject/core/gardenInfoCardPixi.ts
 * for how that card is found/tracked). The card used to be DOM (Chakra
 * McGrid/McFlex), which is what the old MutationObserver-based version of
 * this file scanned for.
 *
 * Per ui/inject.md:
 * - Injection must NOT render Shadow DOM
 * - All listeners must be tracked and cleaned up
 * - Idempotent init(), reversible destroy()
 */

import { watchGardenInfoCard, type GardenInfoCardGeometry } from '../../ui/inject/core/gardenInfoCardPixi';
import { MGPixi } from '../../modules/pixi';
import { findGraphicsCtor, findGenericTextCtor, findGenericSpriteCtors } from '../../modules/pixi/logic/utils';
import { calculateCropSellPrice } from '../../modules/calculators/logic/crop';
import { myCurrentGardenObjectAtom, mySelectedSlotIdAtom } from '../../atoms';
import type { GardenTileObject, GrowSlot, Unsubscribe } from '../../atoms/types';
import { MGSprite } from '../../modules/sprite';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const VALUE_TEXT_STYLE = { fontFamily: 'Arial', fontSize: 14, fontWeight: '700', fill: '#FFD84D' };
const VALUE_BADGE_GAP = 20;
const VALUE_ICON_SIZE = 16;
const VALUE_ICON_GAP = 4;
const BADGE_PADDING_X = 8;
const BADGE_PADDING_Y = 4;
const BADGE_RADIUS = 6;
const BADGE_COLOR = 0x000000;
const BADGE_ALPHA = 0.55;

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let running = false;
let currentCard: any = null;
let geometry: GardenInfoCardGeometry | null = null;
let valueText: any = null;
let valueIcon: any = null;
let valueBadge: any = null;
let graphicsCtor: any = null;
let textCtor: any = null;
let iconRetryScheduled = false;
let offCard: (() => void) | null = null;
let gardenObjectUnsubscribe: Unsubscribe | null = null;
let selectedSlotIdUnsubscribe: Unsubscribe | null = null;
let currentGardenObject: GardenTileObject | null = null;
let currentSelectedSlotId: number | null = null;

// Coin texture is decoded once (via the game's own sprite catalog, per
// core.md rule 1) and shared across every card the badge is drawn on.
let coinTexture: any = null;
let coinTexturePromise: Promise<any> | null = null;

function ensureCoinTexture(): Promise<any> {
  if (coinTexture) return Promise.resolve(coinTexture);
  if (!coinTexturePromise) {
    coinTexturePromise = MGSprite.toCanvas('ui', 'Coin')
      .then((canvas) => {
        const spriteCtors = findGenericSpriteCtors(MGPixi.stage);
        if (!canvas || !spriteCtors) {
          coinTexturePromise = null;
          return null;
        }
        try {
          coinTexture = spriteCtors.Texture.from(canvas);
        } catch {
          coinTexture = null;
        }
        return coinTexture;
      })
      .catch((err) => {
        console.warn('[CropValueIndicator.render] Failed to load coin sprite:', err);
        coinTexturePromise = null;
        return null;
      });
  }
  return coinTexturePromise;
}

// ─────────────────────────────────────────────────────────────────────────────
// Price
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolve the slot currently shown in the tooltip: `mySelectedSlotIdAtom`
 * holds a stable `slotId`, not an index into `slots[]`, so it must be
 * resolved by id (falling back to the first slot when nothing matches,
 * e.g. a single-crop tile with no selection).
 */
function resolveCurrentSlot(): GrowSlot | null {
  if (!currentGardenObject || currentGardenObject.objectType !== 'plant') return null;
  const slots = currentGardenObject.slots ?? [];
  if (!slots.length) return null;
  if (currentSelectedSlotId != null) {
    const match = slots.find((slot) => slot.slotId === currentSelectedSlotId);
    if (match) return match;
  }
  return slots[0];
}

/**
 * Price of the crop currently shown in the tooltip.
 *
 * `myCurrentGardenObjectAtom`/`mySelectedSlotIdAtom` mirror whatever object
 * the game itself is showing in the info card — unlike `currentTile`
 * (derived from the player's own position on the map), this is correct
 * regardless of where the player is standing, which matters since the card
 * can be shown for tiles the player isn't standing on.
 */
function calculateCurrentPrice(): number {
  const slot = resolveCurrentSlot();
  if (!slot) return 0;
  return calculateCropSellPrice(slot.species, slot.targetScale, slot.mutations || []);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sync
// ─────────────────────────────────────────────────────────────────────────────

function detachValueNode(): void {
  if (valueBadge) {
    try { valueBadge.destroy(); } catch { /* already gone */ }
    valueBadge = null;
  }
  if (valueIcon) {
    try { valueIcon.destroy(); } catch { /* already gone */ }
    valueIcon = null;
  }
  if (valueText) {
    try { valueText.destroy(); } catch { /* already gone */ }
    valueText = null;
  }
}

// Runs from Pixi node events (card swap) and from plant-info change
// callbacks — none of those call stacks tolerate an uncaught throw here
// without corrupting the game's own layout pass (see gardenInfoCardPixi.ts).
function syncUnsafe(): void {
  if (!running || !currentCard || currentCard.destroyed || !geometry) {
    detachValueNode();
    return;
  }

  const price = calculateCurrentPrice();
  if (price <= 0) {
    detachValueNode();
    return;
  }
  const text = price.toLocaleString();

  textCtor ??= findGenericTextCtor(MGPixi.stage);
  if (!textCtor) return;

  if (!valueText) {
    graphicsCtor ??= findGraphicsCtor(MGPixi.stage);
    if (graphicsCtor) {
      valueBadge = new graphicsCtor();
      currentCard.addChild(valueBadge);
    }
    valueText = new textCtor({ text, style: VALUE_TEXT_STYLE });
    currentCard.addChild(valueText);
  } else if (valueText.text !== text) {
    valueText.text = text;
  }

  if (!valueIcon) {
    if (coinTexture) {
      const spriteCtors = findGenericSpriteCtors(MGPixi.stage);
      if (spriteCtors) {
        valueIcon = new spriteCtors.Sprite(coinTexture);
        valueIcon.width = VALUE_ICON_SIZE;
        valueIcon.height = VALUE_ICON_SIZE;
        currentCard.addChild(valueIcon);
      }
    } else if (!iconRetryScheduled) {
      iconRetryScheduled = true;
      void ensureCoinTexture().then(() => {
        iconRetryScheduled = false;
        if (running) sync();
      });
    }
  }

  // Row (icon + text) centered horizontally, placed above the existing card content.
  const rowHeight = Math.max(valueIcon ? VALUE_ICON_SIZE : 0, valueText.height);
  const rowWidth = (valueIcon ? VALUE_ICON_SIZE + VALUE_ICON_GAP : 0) + valueText.width;
  const badgeHeight = rowHeight + BADGE_PADDING_Y * 2;
  const badgeTop = geometry.top - VALUE_BADGE_GAP - badgeHeight;
  const rowTop = badgeTop + BADGE_PADDING_Y;
  const startX = Math.max(0, (geometry.width - rowWidth) / 2);

  if (valueIcon) {
    valueIcon.position.set(startX, rowTop + (rowHeight - VALUE_ICON_SIZE) / 2);
    valueText.position.set(startX + VALUE_ICON_SIZE + VALUE_ICON_GAP, rowTop + (rowHeight - valueText.height) / 2);
  } else {
    valueText.position.set(startX, rowTop + (rowHeight - valueText.height) / 2);
  }

  if (valueBadge) {
    const badgeWidth = rowWidth + BADGE_PADDING_X * 2;
    valueBadge.clear();
    valueBadge.roundRect(0, 0, badgeWidth, badgeHeight, BADGE_RADIUS).fill({ color: BADGE_COLOR, alpha: BADGE_ALPHA });
    valueBadge.position.set(startX - BADGE_PADDING_X, badgeTop);
  }
}

function sync(): void {
  try {
    syncUnsafe();
  } catch (error) {
    console.warn('[CropValueIndicator.render] sync failed, clearing overlay', error);
    try { detachValueNode(); } catch { /* best effort */ }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export const render = {
  /**
   * Start injecting the price badge.
   * Idempotent: safe to call multiple times.
   */
  init(): void {
    if (running) return;
    running = true;

    offCard = watchGardenInfoCard((card, geom) => {
      currentCard = card;
      geometry = geom;
      detachValueNode();
      if (card) sync();
    });

    void myCurrentGardenObjectAtom
      .onChangeNow((next) => {
        currentGardenObject = next;
        sync();
      })
      .then((unsub) => {
        if (running) gardenObjectUnsubscribe = unsub;
        else unsub();
      });

    void mySelectedSlotIdAtom
      .onChangeNow((next) => {
        currentSelectedSlotId = next;
        sync();
      })
      .then((unsub) => {
        if (running) selectedSlotIdUnsubscribe = unsub;
        else unsub();
      });
  },

  /**
   * Stop injecting and cleanup.
   * Reversible: re-calling init() will reinitialize.
   */
  destroy(): void {
    if (!running) return;
    running = false;

    offCard?.();
    offCard = null;

    gardenObjectUnsubscribe?.();
    gardenObjectUnsubscribe = null;
    currentGardenObject = null;

    selectedSlotIdUnsubscribe?.();
    selectedSlotIdUnsubscribe = null;
    currentSelectedSlotId = null;

    detachValueNode();
    currentCard = null;
    geometry = null;
  },

  /**
   * Check if currently initialized.
   */
  isEnabled(): boolean {
    return running;
  },
};
