/**
 * Purple lock-border + lock-icon indicator drawn around the game's
 * Pixi-rendered garden info card (see gardenInfoCardPixi.ts for how that
 * card is found/tracked).
 *
 * Shared by HarvestLocker, EggLocker and DecorLocker: all three used to draw
 * the same `3px solid rgb(188, 53, 215)` border on a Chakra tooltip element
 * (`.css-qnqsp4`) that no longer exists now that this card renders natively
 * in Pixi. Each caller supplies its own `isLocked()` check and decides when
 * to call `recheck()`; this module only owns the drawing.
 */
import { watchGardenInfoCard, type GardenInfoCardGeometry } from "./gardenInfoCardPixi";
import { MGPixi } from "../../../modules/pixi";
import { findGraphicsCtor, findGenericTextCtor } from "../../../modules/pixi/logic/utils";

// Same purple as the old DOM border (`rgb(188, 53, 215)`).
const BORDER_COLOR = 0xbc35d7;
const BORDER_WIDTH = 3;
const BORDER_RADIUS = 12;
// Draw the border a couple pixels outside the card's own measured bounds —
// the card's actual rendered background is very slightly larger than the
// hit-area/local-bounds size we measure it by, so a border drawn exactly on
// that boundary lets a sliver of the card's own background peek past it.
const BORDER_EXPAND = 2;
const LOCK_ICON_TEXT = "\u{1F512}"; // 🔒
const LOCK_ICON_STYLE = { fontSize: 16 };
const LOCK_ICON_X_NUDGE = 4;
const LOCK_ICON_Y_NUDGE = 4;

export interface GardenInfoLockIndicatorOptions {
  /** Whether the object currently shown in the card should display the lock indicator. */
  isLocked: () => boolean;
}

export interface GardenInfoLockIndicatorController {
  /** Re-evaluate `isLocked()` against the currently tracked card and redraw/remove accordingly. */
  recheck(): void;
  stop(): void;
}

export function startGardenInfoLockIndicator(
  opts: GardenInfoLockIndicatorOptions
): GardenInfoLockIndicatorController {
  let running = true;
  let currentCard: any = null;
  let geometry: GardenInfoCardGeometry | null = null;
  let border: any = null;
  let lockIcon: any = null;
  let graphicsCtor: any = null;
  let textCtor: any = null;

  const removeIndicator = () => {
    if (border) {
      try { border.destroy(); } catch { /* already gone */ }
      border = null;
    }
    if (lockIcon) {
      try { lockIcon.destroy(); } catch { /* already gone */ }
      lockIcon = null;
    }
  };

  // Runs from Pixi node events (card swap) and from external lock-state
  // change callbacks — none of those call stacks tolerate an uncaught throw
  // here without corrupting the game's own layout pass (see gardenInfoCardPixi.ts).
  const syncUnsafe = () => {
    if (!running || !currentCard || currentCard.destroyed || !geometry || !opts.isLocked()) {
      removeIndicator();
      return;
    }

    graphicsCtor ??= findGraphicsCtor(MGPixi.stage);
    if (!graphicsCtor) return;
    if (!border) {
      border = new graphicsCtor();
      currentCard.addChild(border);
    }

    const left = -BORDER_EXPAND;
    const top = -BORDER_EXPAND;
    const width = Math.max(0, geometry.width + BORDER_EXPAND * 2);
    const height = Math.max(0, geometry.height + BORDER_EXPAND * 2);
    const inset = BORDER_WIDTH / 2;
    border.clear();
    border
      .roundRect(left + inset, top + inset, Math.max(0, width - BORDER_WIDTH), Math.max(0, height - BORDER_WIDTH), BORDER_RADIUS)
      .stroke({ width: BORDER_WIDTH, color: BORDER_COLOR, alpha: 1 });

    // Lock glyph centered on the border's top-right corner, straddling it.
    textCtor ??= findGenericTextCtor(MGPixi.stage);
    if (!lockIcon && textCtor) {
      lockIcon = new textCtor({ text: LOCK_ICON_TEXT, style: LOCK_ICON_STYLE });
      currentCard.addChild(lockIcon);
    }
    if (lockIcon) {
      const right = left + width;
      lockIcon.position.set(right - lockIcon.width / 2 - LOCK_ICON_X_NUDGE, top - lockIcon.height / 2 + LOCK_ICON_Y_NUDGE);
    }
  };

  const sync = () => {
    try {
      syncUnsafe();
    } catch (error) {
      console.warn("[gardenInfoLockIndicator] sync failed, clearing indicator", error);
      try { removeIndicator(); } catch { /* best effort */ }
    }
  };

  const offCard = watchGardenInfoCard((card, geom) => {
    removeIndicator();
    currentCard = card;
    geometry = geom;
    sync();
  });

  return {
    recheck: sync,
    stop() {
      if (!running) return;
      running = false;
      offCard();
      removeIndicator();
      currentCard = null;
    },
  };
}
