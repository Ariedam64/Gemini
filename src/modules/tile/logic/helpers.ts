// src/modules/tile/logic/helpers.ts
// Utility functions for tile operations

import type { GameEngine, TileObjectSystem } from "../types";
import { MGPixiHooks } from "../../pixi/logic/hooks";

// ─────────────────────────────────────────────────────────────────────────────
// Deep Clone
// ─────────────────────────────────────────────────────────────────────────────

export function deepClone<T>(value: T): T {
  try {
    if (typeof structuredClone === "function") return structuredClone(value);
  } catch {}
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {}
  return value;
}

// ─────────────────────────────────────────────────────────────────────────────
// Engine/TOS Access
// ─────────────────────────────────────────────────────────────────────────────

export function tos(): TileObjectSystem | null {
  return MGPixiHooks.tos();
}

export function engine(): GameEngine | null {
  return MGPixiHooks.engine();
}

export function cols(): number | null {
  const c = tos()?.map?.cols;
  return Number.isFinite(c) && c > 0 ? c : null;
}

export function gidx(tx: number, ty: number): number | null {
  const c = cols();
  if (!c) return null;
  return (ty * c + tx) | 0;
}
