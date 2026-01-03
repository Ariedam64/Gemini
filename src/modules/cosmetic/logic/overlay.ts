// src/modules/cosmetic/logic/overlay.ts
// Overlay management

import { state } from "../state";
import { pageWindow } from "../../../utils/windowContext";

const doc = pageWindow?.document ?? document;

// ─────────────────────────────────────────────────────────────────────────────
// Overlay Management
// ─────────────────────────────────────────────────────────────────────────────

export function ensureOverlay(): HTMLDivElement {
  if (state.overlay) return state.overlay;

  const div = doc.createElement("div");
  div.id = "MG_COSMETIC_OVERLAY";
  div.style.cssText = [
    "position:fixed",
    "left:0",
    "top:0",
    "width:100vw",
    "height:100vh",
    "pointer-events:none",
    "z-index:99999999",
  ].join(";");

  doc.documentElement.appendChild(div);
  state.overlay = div;
  return div;
}

export function getDefaultParent(): HTMLElement | null {
  const p = state.defaultParent;
  if (!p) return null;
  try {
    return typeof p === "function" ? p() : p;
  } catch {
    return null;
  }
}

export function attach(elementOrFn: HTMLElement | (() => HTMLElement)): boolean {
  state.defaultParent = elementOrFn;
  return true;
}
