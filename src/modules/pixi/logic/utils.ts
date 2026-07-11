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

/**
 * Searches for a node matching `pred`, giving each top-level branch of `root`
 * its own search budget instead of pooling one `limit` across the whole tree.
 * The game's world/tile layer alone can hold thousands of sprite nodes — a
 * single shared budget starting there exhausts before ever reaching sibling
 * UI layers, making anything only found there (e.g. a rail/toolbar) unreachable
 * once the world grows large enough.
 */
export function findAcrossBranches(root: any, pred: (node: any) => boolean, limitPerBranch = 25000): any {
  if (!root) return null;
  if (pred(root)) return root;
  const children = root.children;
  if (!Array.isArray(children)) return null;
  for (const child of children) {
    const stack = [child];
    const seen = new Set<any>();
    let n = 0;
    while (stack.length && n++ < limitPerBranch) {
      const node = stack.pop();
      if (!node || seen.has(node)) continue;
      seen.add(node);
      if (pred(node)) return node;
      const kids = node.children;
      if (Array.isArray(kids)) for (const kid of kids) stack.push(kid);
    }
  }
  return null;
}

export interface GenericSpriteCtors {
  Sprite: any;
  Texture: any;
}

/**
 * Finds a live Sprite instance anywhere in the stage and reads its
 * `Sprite`/`Texture` constructors off it. The game never exposes a global
 * `PIXI` namespace, so this is the only reliable way to get constructors for
 * building our own sprites — there is almost always at least one crop/tile
 * sprite rendered once the garden has loaded.
 *
 * Matching on `.texture` alone isn't enough: `Mesh` nodes (e.g. the weather
 * overlay) also carry a `.texture` but have an incompatible constructor
 * signature, and can be found before any real Sprite depending on where they
 * sit in the tree. `.anchor` is Sprite-specific (Mesh has no anchor — its
 * offset is baked into the geometry), so it reliably rules Mesh out.
 */
export function findGenericSpriteCtors(stage: any): GenericSpriteCtors | null {
  const anySprite = findAcrossBranches(
    stage,
    (node: any) =>
      !!(node && node !== stage && node.texture && node.texture.constructor && node.anchor && typeof node.anchor.set === "function")
  );
  if (!anySprite) return null;
  return { Sprite: anySprite.constructor, Texture: anySprite.texture.constructor };
}

/**
 * Finds a live Text instance anywhere in the stage and reads its constructor
 * off it — same rationale as `findGenericSpriteCtors` (no global `PIXI`).
 *
 * `.text` + `.style` alone isn't a safe signature: the game's Rive-based
 * display objects (animated character parts) also expose `.text`/`.style`,
 * and constructing with `new RiveCtor({ text, style })` throws (Rive expects
 * positional args, not a Pixi-style options object). Prefer Pixi v8's own
 * `renderPipeId === "text"` marker on genuine text nodes; fall back to the
 * looser match (still excluding anything Rive-shaped) for older Pixi builds.
 */
export function findGenericTextCtor(stage: any): any {
  const isTextLike = (node: any) =>
    (typeof node?.text === "string" || typeof node?.text === "number") && !!node?.style;
  const isRiveLike = (node: any) => !!(node?.artboard || node?.stateMachine || node?.rive);

  const preferred = findAcrossBranches(stage, (node: any) => isTextLike(node) && node?.renderPipeId === "text");
  if (preferred) return preferred.constructor;

  const fallback = findAcrossBranches(stage, (node: any) => isTextLike(node) && !isRiveLike(node));
  return fallback?.constructor ?? null;
}

let cachedGraphicsCtor: any = null;

/**
 * Finds the game's own Graphics constructor by locating any node exposing
 * `roundRect`/`clear` — public PIXI.Graphics API methods, so unlike minified
 * identifiers these survive the game's build unchanged. Cached at module
 * level: it's a stable class reference for the whole page session, so
 * re-deriving it on every card change (which re-walks the whole stage,
 * including the large world/tile layer) would be wasted work repeated by
 * every consumer.
 */
export function findGraphicsCtor(stage: any): any {
  if (cachedGraphicsCtor) return cachedGraphicsCtor;
  const found = findAcrossBranches(
    stage,
    (node: any) => typeof node?.roundRect === "function" && typeof node?.clear === "function"
  );
  if (found) cachedGraphicsCtor = found.constructor;
  return cachedGraphicsCtor;
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
