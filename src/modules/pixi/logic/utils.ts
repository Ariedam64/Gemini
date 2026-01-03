// src/modules/pixi/logic/utils.ts
// Utility functions for Pixi operations

import type { DisplayObject } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// Type Guards
// ─────────────────────────────────────────────────────────────────────────────

export type AnyRecord = Record<string, unknown>;

export function isObj(v: unknown): v is AnyRecord {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

export function isDisp(o: any): boolean {
  return !!(o && typeof o.getBounds === "function" && ("parent" in o || "children" in o));
}

export function hasTint(o: any): boolean {
  return !!(o && typeof o.tint === "number");
}

export function hasAlpha(o: any): boolean {
  return !!(o && typeof o.alpha === "number");
}

// ─────────────────────────────────────────────────────────────────────────────
// Math Utilities
// ─────────────────────────────────────────────────────────────────────────────

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpColor(c0: number, c1: number, t: number): number {
  const r0 = (c0 >> 16) & 255;
  const g0 = (c0 >> 8) & 255;
  const b0 = c0 & 255;
  const r1 = (c1 >> 16) & 255;
  const g1 = (c1 >> 8) & 255;
  const b1 = c1 & 255;
  const r = lerp(r0, r1, t) | 0;
  const g = lerp(g0, g1, t) | 0;
  const b = lerp(b0, b1, t) | 0;
  return (r << 16) | (g << 8) | b;
}

// ─────────────────────────────────────────────────────────────────────────────
// Display Object Traversal
// ─────────────────────────────────────────────────────────────────────────────

export function collectTint(rootDisp: DisplayObject, cap = 900): DisplayObject[] {
  const out: DisplayObject[] = [];
  const stack = [rootDisp];
  while (stack.length && out.length < cap) {
    const node = stack.pop();
    if (!node) continue;
    if (hasTint(node)) out.push(node);
    const children = node.children;
    if (Array.isArray(children)) {
      for (let i = children.length - 1; i >= 0; i--) stack.push(children[i]);
    }
  }
  return out;
}

export function collectAlpha(rootDisp: DisplayObject, cap = 25000): DisplayObject[] {
  const out: DisplayObject[] = [];
  const stack = [rootDisp];
  let guard = 0;
  while (stack.length && guard++ < cap) {
    const node = stack.pop();
    if (!node) continue;
    if (hasAlpha(node)) out.push(node);
    const children = node.children;
    if (Array.isArray(children)) {
      for (let i = children.length - 1; i >= 0; i--) stack.push(children[i]);
    }
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Display Object Resolution
// ─────────────────────────────────────────────────────────────────────────────

const DISP_KEYS = [
  "plantVisual",
  "cropVisual",
  "slotVisual",
  "slotView",
  "displayObject",
  "view",
  "container",
  "root",
  "sprite",
  "gfx",
  "graphics",
];

export function pickDisp(node: unknown): DisplayObject | null {
  if (!node) return null;
  if (isDisp(node)) return node;
  if (!isObj(node)) return null;
  for (const key of DISP_KEYS) {
    const v = node[key];
    if (isDisp(v)) return v;
  }
  return null;
}

export function findSlotDisplays(base: any, slotCount: number): DisplayObject[] | null {
  const queue: { o: unknown; d: number }[] = [{ o: base, d: 0 }];
  const seen = new Set();
  const maxDepth = 6;

  while (queue.length) {
    const { o, d } = queue.shift()!;
    if (!o || d > maxDepth) continue;
    if (seen.has(o)) continue;
    seen.add(o);

    if (Array.isArray(o)) {
      if (o.length === slotCount) {
        const arr: DisplayObject[] = new Array(slotCount);
        let ok = true;
        for (let i = 0; i < slotCount; i++) {
          const disp = pickDisp(o[i]);
          if (!disp) {
            ok = false;
            break;
          }
          arr[i] = disp;
        }
        if (ok) return arr;
      }
      for (const item of o) queue.push({ o: item, d: d + 1 });
      continue;
    }

    if (isObj(o)) {
      const obj = o as AnyRecord;
      for (const key of Object.keys(obj)) queue.push({ o: obj[key], d: d + 1 });
    }
  }
  return null;
}
