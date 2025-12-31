// src/modules/sprite/utils.ts
// Key helpers and utilities for sprite system

import type { PixiApp, PixiConstructors } from "./types";
import { pageWindow } from "../../utils/windowContext";

// ─────────────────────────────────────────────────────────────────────────────
// Key Normalization
// ─────────────────────────────────────────────────────────────────────────────

export function normalizeKey(key: string): string {
  const s = String(key || "").trim();
  if (!s) return "";
  if (s.startsWith("sprite/") || s.startsWith("sprites/")) return s;
  if (s.includes("/")) return `sprite/${s}`;
  return s;
}

export function makeKey(category: string | null, asset: string): string {
  const cat = String(category || "")
    .trim()
    .replace(/^sprites?\//, "")
    .replace(/^\/+|\/+$/g, "");
  const a = String(asset || "").trim();

  if (a.includes("/")) return normalizeKey(a);
  if (!cat) return normalizeKey(a);
  return `sprite/${cat}/${a}`;
}

export function resolveKey(
  category: string | null,
  asset: string,
  textures: Map<string, unknown>,
  animations: Map<string, unknown[]>
): string {
  const k1 = makeKey(category, asset);
  if (textures.has(k1) || animations.has(k1)) return k1;

  const a = String(asset || "").trim();
  if (textures.has(a) || animations.has(a)) return a;

  const k3 = normalizeKey(a);
  if (textures.has(k3) || animations.has(k3)) return k3;

  return k1;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constructor Detection
// ─────────────────────────────────────────────────────────────────────────────

export function findAny<T>(
  rootNode: any,
  pred: (node: any) => boolean,
  limit = 25000
): T | null {
  const stack = [rootNode];
  const seen = new Set();
  let n = 0;

  while (stack.length && n++ < limit) {
    const node = stack.pop();
    if (!node || seen.has(node)) continue;
    seen.add(node);
    if (pred(node)) return node as T;
    const children = node.children;
    if (Array.isArray(children)) {
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }
  return null;
}

export function getCtors(app: PixiApp): PixiConstructors {
  const PIXI = (pageWindow as any).PIXI;

  if (PIXI?.Texture && PIXI?.Sprite && PIXI?.Container && PIXI?.Rectangle) {
    return {
      Container: PIXI.Container,
      Sprite: PIXI.Sprite,
      Texture: PIXI.Texture,
      Rectangle: PIXI.Rectangle,
      AnimatedSprite: PIXI.AnimatedSprite || null,
    };
  }

  const stage = app?.stage;
  const anySprite = findAny<any>(
    stage,
    (x) =>
      x?.texture?.frame &&
      x?.constructor &&
      x?.texture?.constructor &&
      x?.texture?.frame?.constructor
  );

  if (!anySprite) {
    throw new Error("No Sprite found yet (constructors).");
  }

  return {
    Container: stage.constructor,
    Sprite: anySprite.constructor,
    Texture: anySprite.texture.constructor,
    Rectangle: anySprite.texture.frame.constructor,
    AnimatedSprite: PIXI?.AnimatedSprite || null,
  };
}

import { sleep } from "../utils/helpers";

export async function waitForCtors(
  app: PixiApp,
  timeoutMs = 15000
): Promise<PixiConstructors> {
  const t0 = performance.now();
  while (performance.now() - t0 < timeoutMs) {
    try {
      return getCtors(app);
    } catch {
      await sleep(50);
    }
  }
  throw new Error("Constructors timeout");
}

// ─────────────────────────────────────────────────────────────────────────────
// Logging
// ─────────────────────────────────────────────────────────────────────────────

export const log = (...args: any[]) => {
  try {
    console.log("[MGSprite]", ...args);
  } catch { }
};
