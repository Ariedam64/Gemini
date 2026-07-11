/**
 * Injects a button as a native slot on the game's right-side icon rail
 * (`RightSideRail` — Chat, Leaderboard, Stats, etc.).
 *
 * That rail used to be a real DOM toolbar, which older injectors cloned a
 * `<button>` into. A game build moved it entirely to native Pixi rendering,
 * so there is no DOM node left to anchor next to — the button now lives
 * directly in the Pixi scene graph instead.
 *
 * Pixi's own EventSystem never dispatches clicks to this part of the game's
 * tree, so clicks are hit-tested from a window-capture `pointerdown`
 * listener instead of relying on Pixi `eventMode` — a bubble listener on the
 * canvas would run too late to stop the game's own movement handler, which
 * is already attached directly on that same canvas.
 */
import { MGPixi } from "../../../modules/pixi";
import { findGenericSpriteCtors } from "../../../modules/pixi/logic/utils";
import { pageWindow } from "../../../utils/windowContext";

const RAIL_LABEL = "RightSideRail";
const RAIL_FIND_RETRY_MS = 1000;
// The game doesn't reliably fire `childAdded` on the rail for every icon it
// adds after boot (some come from systems that finish initializing later
// than others), so `childAdded`/`childRemoved` alone isn't enough to keep
// us pinned below every real icon. This periodic re-check is the safety net.
const GEOMETRY_RESYNC_MS = 500;
const DEFAULT_SLOT_SIZE = 45;
const DEFAULT_SLOT_SPACING = 52;
const ICON_TEXTURE_SIZE = 64;
// A glyph's own em-box already has visual padding (like a rendered emoji),
// so it reads at full size well under the slot; a flat icon image doesn't
// have that built-in margin and looks tiny at the same ratio.
const GLYPH_ICON_SCALE = 0.6;
const IMAGE_ICON_SCALE = 1.0;
const WIGGLE_AMPLITUDE = 0.26; // radians
const WIGGLE_SPEED = 6; // radians/sec of the oscillation argument

export interface ScreenRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export type PixiRailButtonIcon = { type: "glyph"; glyph: string } | { type: "image"; url: string };

export interface PixiRailButtonOptions {
  /**
   * Unique Pixi container label. MUST start with `OWN_CONTAINER_LABEL_PREFIX`
   * so sibling `pixiRailButton` instances recognize each other and don't
   * fight over the last slot in the rail (see the reorder logic below).
   */
  label: string;
  icon: PixiRailButtonIcon;
  onClick: () => void;
}

/** Shared label prefix for every button injected via this helper (see `label`). */
export const OWN_CONTAINER_LABEL_PREFIX = "Gemini";

export interface PixiRailButtonController {
  stop(): void;
  /** Current on-screen bounding box of the button, in page (client) coordinates. */
  getScreenRect(): ScreenRect | null;
  setWiggle(active: boolean): void;
}

function buildIconCanvas(icon: PixiRailButtonIcon): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = ICON_TEXTURE_SIZE;
  canvas.height = ICON_TEXTURE_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.reject(new Error("2D context unavailable"));

  if (icon.type === "glyph") {
    ctx.font = `${Math.round(ICON_TEXTURE_SIZE * 0.75)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(icon.glyph, ICON_TEXTURE_SIZE / 2, ICON_TEXTURE_SIZE / 2 + 2);
    return Promise.resolve(canvas);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, ICON_TEXTURE_SIZE, ICON_TEXTURE_SIZE);
      resolve(canvas);
    };
    img.onerror = () => reject(new Error(`Failed to load icon image: ${icon.url}`));
    img.src = icon.url;
  });
}

export function startPixiRailButton(opts: PixiRailButtonOptions): PixiRailButtonController {
  let running = true;
  let rail: any = null;
  let container: any = null;
  let icon: any = null;
  let iconBuildToken = 0;
  let lastSize = DEFAULT_SLOT_SIZE;

  let findRafId: number | null = null;
  let lastFindCheckAt = 0;

  let resyncRafId: number | null = null;
  let lastResyncAt = 0;

  let canvasEl: HTMLCanvasElement | null = null;
  let canvasListenersAttached = false;
  let weSetPointerCursor = false;

  let wiggleActive = false;
  let wiggleRafId: number | null = null;
  let wiggleT = 0;
  let wiggleLastFrameAt: number | null = null;

  const raf: (cb: (t: number) => void) => number = (pageWindow as any).requestAnimationFrame.bind(pageWindow);
  const cancelRaf: (id: number) => void = (pageWindow as any).cancelAnimationFrame.bind(pageWindow);

  const forgetContainerRefs = () => {
    container = null;
    icon = null;
  };

  const removeContainer = () => {
    if (container) {
      try { container.destroy({ children: true }); } catch { /* already gone */ }
    }
    forgetContainerRefs();
  };

  const onClick = () => {
    try { opts.onClick(); } catch (error) {
      console.error(`[pixiRailButton:${opts.label}] onClick error:`, error);
    }
  };

  const computeScreenRect = (): ScreenRect | null => {
    if (!container || container.destroyed) return null;
    const canvas = MGPixi.renderer?.canvas || MGPixi.renderer?.view?.canvas || MGPixi.renderer?.view;
    if (!canvas) return null;
    try {
      const rect = canvas.getBoundingClientRect();
      const topLeft = container.toGlobal({ x: 0, y: 0 });
      const bottomRight = container.toGlobal({ x: lastSize, y: lastSize });
      return {
        left: rect.left + topLeft.x,
        top: rect.top + topLeft.y,
        right: rect.left + bottomRight.x,
        bottom: rect.top + bottomRight.y,
        width: bottomRight.x - topLeft.x,
        height: bottomRight.y - topLeft.y,
      };
    } catch {
      return null;
    }
  };

  const hitTestButton = (clientX: number, clientY: number): boolean => {
    const rect = computeScreenRect();
    if (!rect) return false;
    return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
  };

  const onWindowPointerDownCapture = (ev: PointerEvent) => {
    if (!hitTestButton(ev.clientX, ev.clientY)) return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    ev.preventDefault();
    onClick();
  };

  const onCanvasPointerMove = (ev: PointerEvent) => {
    if (!canvasEl) return;
    const isHovering = hitTestButton(ev.clientX, ev.clientY);
    if (isHovering && !weSetPointerCursor) {
      canvasEl.style.cursor = "pointer";
      weSetPointerCursor = true;
    } else if (!isHovering && weSetPointerCursor) {
      canvasEl.style.cursor = "";
      weSetPointerCursor = false;
    }
  };

  const onCanvasPointerLeave = () => {
    if (weSetPointerCursor && canvasEl) {
      canvasEl.style.cursor = "";
      weSetPointerCursor = false;
    }
  };

  const isOwnLabel = (label: unknown): boolean =>
    typeof label === "string" && label.startsWith(OWN_CONTAINER_LABEL_PREFIX);

  const hasRealSiblingAfterSelf = (): boolean => {
    const children = rail?.children;
    if (!Array.isArray(children)) return false;
    const myIndex = children.indexOf(container);
    if (myIndex === -1) return true; // not attached yet
    for (let i = myIndex + 1; i < children.length; i++) {
      if (!isOwnLabel(children[i]?.label)) return true;
    }
    return false;
  };

  const ensureCanvasListeners = () => {
    if (canvasListenersAttached) return;
    const canvas = MGPixi.renderer?.canvas || MGPixi.renderer?.view?.canvas || MGPixi.renderer?.view;
    if (!canvas) return;
    canvasEl = canvas;
    (pageWindow as any).addEventListener("pointerdown", onWindowPointerDownCapture, true);
    canvas.addEventListener("pointermove", onCanvasPointerMove);
    canvas.addEventListener("pointerleave", onCanvasPointerLeave);
    canvasListenersAttached = true;
  };

  // Reads the real spacing/size of the rail's existing icons instead of
  // hardcoding them, so this keeps working if the game changes the rail's
  // slot size or icon count in a future build.
  //
  // Only *real* (non-Gemini) siblings feed the "how far down" measurement.
  // Two of our own buttons resync periodically (see GEOMETRY_RESYNC_MS) — if
  // each computed its position from the other's current Y, every resync
  // would push both buttons further down forever. Stacking between our own
  // buttons is instead driven by their stable order in the child list.
  const computeSlot = (): { size: number; nextY: number } => {
    const allChildren: any[] = Array.isArray(rail?.children) ? rail.children : [];
    let size = DEFAULT_SLOT_SIZE;
    const railWidth = Number(rail?.width);
    if (Number.isFinite(railWidth) && railWidth > 0) size = railWidth;

    const realSiblings = allChildren.filter((c: any) => c !== container && !isOwnLabel(c?.label));

    let spacing = DEFAULT_SLOT_SPACING;
    if (realSiblings.length >= 2) {
      const ys = realSiblings.map((c: any) => Number(c?.y) || 0).sort((a, b) => a - b);
      const diffs: number[] = [];
      for (let i = 1; i < ys.length; i++) diffs.push(ys[i] - ys[i - 1]);
      diffs.sort((a, b) => a - b);
      const median = diffs[Math.floor(diffs.length / 2)];
      if (Number.isFinite(median) && median > 0) spacing = median;
    }

    const realMaxY = realSiblings.length
      ? Math.max(...realSiblings.map((c: any) => Number(c?.y) || 0))
      : -spacing;

    const ownSiblingsInOrder = allChildren.filter((c: any) => isOwnLabel(c?.label));
    const ownRank = Math.max(0, ownSiblingsInOrder.indexOf(container));

    return { size, nextY: realMaxY + spacing + ownRank * spacing };
  };

  const syncGeometry = () => {
    const { size, nextY } = computeSlot();
    lastSize = size;
    container.position.set(0, nextY);
    if (icon) {
      const iconScale = opts.icon.type === "glyph" ? GLYPH_ICON_SCALE : IMAGE_ICON_SCALE;
      icon.width = size * iconScale;
      icon.height = size * iconScale;
      if (typeof icon.anchor?.set === "function") icon.anchor.set(0.5);
      icon.position.set(size / 2, size / 2);
    }
  };

  const attachIcon = async (ctors: { Sprite: any; Texture: any }) => {
    const token = ++iconBuildToken;
    let canvas: HTMLCanvasElement;
    try {
      canvas = await buildIconCanvas(opts.icon);
    } catch (error) {
      console.warn(`[pixiRailButton:${opts.label}] icon build failed:`, error);
      return;
    }
    if (token !== iconBuildToken || !container || container.destroyed) return;

    try {
      const texture = ctors.Texture.from(canvas);
      icon = new ctors.Sprite(texture);
      container.addChild(icon);
      syncGeometry();
    } catch (error) {
      console.warn(`[pixiRailButton:${opts.label}] sprite creation failed:`, error);
    }
  };

  const syncUnsafe = () => {
    if (!running || !rail || rail.destroyed) {
      removeContainer();
      return;
    }

    if (!container) {
      const ContainerCtor = rail.constructor;
      container = new ContainerCtor();
      container.label = opts.label;
      const thisContainer = container;
      // The game can destroy/rebuild the rail's whole subtree without
      // telling us — drop our stale reference instead of crashing the next
      // time we touch it.
      thisContainer.once("destroyed", () => {
        if (container === thisContainer) forgetContainerRefs();
      });
    }

    // Keep ourselves below every *real* rail icon. The game can add its own
    // new icons well after we first attached (some systems come online later
    // than others), and `computeSlot()`'s "below the current max" math is
    // only ever correct relative to siblings that exist *right now* — if we
    // don't also stay last in the list, a later real icon can end up behind
    // (visually above) us instead of the other way around.
    //
    // Only real (non-Gemini) siblings count for this check: with two of our
    // own buttons on the rail, each reacting to the other's `childAdded`
    // would otherwise have them perpetually re-appending past each other.
    if (hasRealSiblingAfterSelf()) {
      rail.addChild(container); // re-parenting an existing child moves it to the end
    }

    if (!icon) {
      const ctors = findGenericSpriteCtors(MGPixi.stage);
      if (ctors) attachIcon(ctors);
    }

    ensureCanvasListeners();
    syncGeometry();
  };

  const sync = () => {
    try {
      syncUnsafe();
    } catch (error) {
      console.warn(`[pixiRailButton:${opts.label}] sync failed, clearing button:`, error);
      try { removeContainer(); } catch { /* best effort */ }
    }
  };

  const onRailChildrenChanged = () => sync();

  const restartSearchIfNeeded = () => {
    if (!running || rail) return;
    tryFindRail();
    if (!running || rail) return;
    if (findRafId == null) findRafId = raf(scheduleFind);
  };

  const scheduleResync = (now: number) => {
    resyncRafId = null;
    if (!running || !rail) return;
    if (now - lastResyncAt >= GEOMETRY_RESYNC_MS) {
      lastResyncAt = now;
      sync();
    }
    if (!running || !rail) return;
    resyncRafId = raf(scheduleResync);
  };

  const attachToRail = (node: any) => {
    rail = node;
    rail.on("childAdded", onRailChildrenChanged);
    rail.on("childRemoved", onRailChildrenChanged);
    rail.once("destroyed", () => {
      if (rail === node) {
        rail = null;
        removeContainer();
        restartSearchIfNeeded();
      }
    });
    sync();
    if (resyncRafId == null) resyncRafId = raf(scheduleResync);
  };

  const tryFindRail = () => {
    if (!running || rail) return;
    if (!MGPixi.isReady()) return;
    const found = MGPixi.findByLabel(RAIL_LABEL);
    if (found) attachToRail(found);
  };

  const scheduleFind = (now: number) => {
    findRafId = null;
    if (!running || rail) return;
    if (now - lastFindCheckAt >= RAIL_FIND_RETRY_MS) {
      lastFindCheckAt = now;
      tryFindRail();
    }
    if (!running || rail) return;
    findRafId = raf(scheduleFind);
  };

  const stopWiggleAnimation = () => {
    if (wiggleRafId != null) { cancelRaf(wiggleRafId); wiggleRafId = null; }
    wiggleLastFrameAt = null;
    if (icon && !icon.destroyed) icon.rotation = 0;
  };

  const wiggleTick = (time: number) => {
    wiggleRafId = null;
    if (!wiggleActive || !icon || icon.destroyed) {
      stopWiggleAnimation();
      return;
    }
    if (wiggleLastFrameAt == null) wiggleLastFrameAt = time;
    const dt = (time - wiggleLastFrameAt) / 1000;
    wiggleLastFrameAt = time;
    wiggleT += dt;
    icon.rotation = Math.sin(wiggleT * WIGGLE_SPEED) * WIGGLE_AMPLITUDE;
    wiggleRafId = raf(wiggleTick);
  };

  tryFindRail();
  if (!rail) findRafId = raf(scheduleFind);

  return {
    stop() {
      if (!running) return;
      running = false;
      if (findRafId != null) { cancelRaf(findRafId); findRafId = null; }
      if (resyncRafId != null) { cancelRaf(resyncRafId); resyncRafId = null; }
      stopWiggleAnimation();
      if (rail) {
        try {
          rail.off("childAdded", onRailChildrenChanged);
          rail.off("childRemoved", onRailChildrenChanged);
        } catch { /* rail already gone */ }
      }
      if (canvasListenersAttached) {
        try {
          (pageWindow as any).removeEventListener("pointerdown", onWindowPointerDownCapture, true);
          if (canvasEl) {
            canvasEl.removeEventListener("pointermove", onCanvasPointerMove);
            canvasEl.removeEventListener("pointerleave", onCanvasPointerLeave);
            if (weSetPointerCursor) canvasEl.style.cursor = "";
          }
        } catch { /* canvas already gone */ }
      }
      removeContainer();
      rail = null;
    },

    getScreenRect(): ScreenRect | null {
      return computeScreenRect();
    },

    setWiggle(active: boolean) {
      if (wiggleActive === active) return;
      wiggleActive = active;
      if (active) {
        wiggleT = 0;
        wiggleLastFrameAt = null;
        if (wiggleRafId == null) wiggleRafId = raf(wiggleTick);
      } else {
        stopWiggleAnimation();
      }
    },
  };
}
