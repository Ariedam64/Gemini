// src/modules/cosmetic/logic/display.ts
// Display and rendering logic for cosmetics

import type { CreateOptions, ShowOptions } from "../types";
import { state } from "../state";
import { pageWindow } from "../../../utils/windowContext";
import { stripCosmeticPath } from "./utils";
import { url } from "./query";
import { ensureOverlay, getDefaultParent } from "./overlay";

const doc = pageWindow?.document ?? document;

// ─────────────────────────────────────────────────────────────────────────────
// Create Image Element
// ─────────────────────────────────────────────────────────────────────────────

export function create(
  category: string,
  asset: string,
  options?: CreateOptions
): HTMLImageElement;
export function create(asset: string, options?: CreateOptions): HTMLImageElement;
export function create(a: string, b?: string | CreateOptions, c?: CreateOptions): HTMLImageElement {
  if (!state.ready) throw new Error("MGCosmetic not ready yet");

  let opts: CreateOptions;
  let assetB: string | undefined;

  if (typeof b === "object" && b !== null) {
    opts = b;
    assetB = undefined;
  } else if (typeof b === "string") {
    assetB = b;
    opts = c || {};
  } else {
    assetB = undefined;
    opts = c || {};
  }

  const u = assetB !== undefined ? url(a, assetB) : url(a);
  const img = doc.createElement("img");
  img.decoding = "async";
  img.loading = "eager";
  img.src = u;

  img.alt = opts.alt != null ? String(opts.alt) : stripCosmeticPath(assetB ?? a);
  if (opts.className) img.className = String(opts.className);

  if (opts.width != null) img.style.width = String(opts.width);
  if (opts.height != null) img.style.height = String(opts.height);
  if (opts.opacity != null) img.style.opacity = String(opts.opacity);

  if (opts.style && typeof opts.style === "object") {
    for (const [key, value] of Object.entries(opts.style)) {
      try {
        (img.style as any)[key] = String(value);
      } catch {}
    }
  }

  return img;
}

// ─────────────────────────────────────────────────────────────────────────────
// Show Image
// ─────────────────────────────────────────────────────────────────────────────

export function show(category: string, asset: string, options?: ShowOptions): HTMLImageElement;
export function show(asset: string, options?: ShowOptions): HTMLImageElement;
export function show(a: string, b?: string | ShowOptions, c?: ShowOptions): HTMLImageElement {
  let opts: ShowOptions;
  let assetB: string | undefined;

  if (typeof b === "object" && b !== null) {
    opts = b;
    assetB = undefined;
  } else if (typeof b === "string") {
    assetB = b;
    opts = c || {};
  } else {
    assetB = undefined;
    opts = c || {};
  }

  const parent = opts.parent || getDefaultParent() || ensureOverlay();
  const img = assetB !== undefined ? create(a, assetB, opts) : create(a, opts);

  const useOverlayPos =
    parent === state.overlay ||
    opts.center ||
    opts.x != null ||
    opts.y != null ||
    opts.absolute;

  if (useOverlayPos) {
    img.style.position = "absolute";
    img.style.pointerEvents = "none";
    img.style.zIndex = String(opts.zIndex ?? 999999);

    const scale = opts.scale ?? 1;
    const rot = opts.rotation ?? 0;

    if (opts.center) {
      img.style.left = "50%";
      img.style.top = "50%";
      img.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rot}rad)`;
    } else {
      const x = opts.x ?? innerWidth / 2;
      const y = opts.y ?? innerHeight / 2;
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.transform = `scale(${scale}) rotate(${rot}rad)`;
      if (opts.anchor === "center") {
        img.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rot}rad)`;
      }
    }
  }

  parent.appendChild(img);
  state.live.add(img);

  (img as any).__mgDestroy = () => {
    try {
      img.remove();
    } catch {}
    state.live.delete(img);
  };

  return img;
}

// ─────────────────────────────────────────────────────────────────────────────
// Clear
// ─────────────────────────────────────────────────────────────────────────────

export function clear(): void {
  for (const el of Array.from(state.live)) {
    (el as any).__mgDestroy?.();
  }
}
