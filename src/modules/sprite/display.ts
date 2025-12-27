// src/modules/sprite/display.ts
// show() and toCanvas() functions for sprite display

import type {
  PixiSprite,
  PixiTexture,
  PixiContainer,
  ShowOptions,
  ToCanvasOptions,
  SpriteState,
  MutationCacheState,
  CacheConfig,
  MutationName,
} from "./types";
import { resolveKey, makeKey } from "./utils";
import { computeVariantSignature } from "./mutations/types";
import { composeMutatedTexture, composeMutatedAnimation } from "./mutations/composer";
import { variantKey, lruGet, lruSet, DEFAULT_CACHE_CONFIG } from "./mutations/cache";

// ─────────────────────────────────────────────────────────────────────────────
// Overlay Management
// ─────────────────────────────────────────────────────────────────────────────

function ensureOverlay(state: SpriteState): PixiContainer {
  if (state.overlay) return state.overlay;

  const container = new state.ctors!.Container();
  container.sortableChildren = true;
  container.zIndex = 99999999;

  try {
    state.app!.stage.sortableChildren = true;
  } catch {}
  state.app!.stage.addChild(container);

  state.overlay = container;
  return container;
}

function getDefaultParent(state: SpriteState): PixiContainer | null {
  const p = state.defaultParent;
  if (!p) return null;
  try {
    return typeof p === "function" ? p() : p;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Get Mutated Texture (with caching)
// ─────────────────────────────────────────────────────────────────────────────

function getMutatedTexture(
  key: string,
  tex: PixiTexture,
  mutations: MutationName[],
  state: SpriteState,
  cacheState: MutationCacheState,
  cacheConfig: CacheConfig
): PixiTexture {
  if (!mutations.length) return tex;

  const variant = computeVariantSignature(mutations);
  if (!variant.sig) return tex;

  const cacheKey = variantKey(key, variant);
  const cached = lruGet(cacheState, cacheKey);
  if (cached?.tex) return cached.tex;

  const composed = composeMutatedTexture(tex, key, variant, {
    renderer: state.renderer!,
    ctors: state.ctors!,
    textures: state.textures,
    cacheState,
    cacheConfig,
  });

  if (composed) {
    lruSet(cacheState, cacheKey, { isAnim: false, tex: composed }, cacheConfig);
    return composed;
  }

  return tex;
}

function getMutatedFrames(
  key: string,
  frames: PixiTexture[],
  mutations: MutationName[],
  state: SpriteState,
  cacheState: MutationCacheState,
  cacheConfig: CacheConfig
): PixiTexture[] {
  if (!mutations.length) return frames;

  const variant = computeVariantSignature(mutations);
  if (!variant.sig) return frames;

  const cacheKey = variantKey(key, variant);
  const cached = lruGet(cacheState, cacheKey);
  if (cached?.isAnim && cached.frames?.length) return cached.frames;

  const composed = composeMutatedAnimation(frames, key, variant, {
    renderer: state.renderer!,
    ctors: state.ctors!,
    textures: state.textures,
    cacheState,
    cacheConfig,
  });

  if (composed) {
    lruSet(cacheState, cacheKey, { isAnim: true, frames: composed }, cacheConfig);
    return composed;
  }

  return frames;
}

// ─────────────────────────────────────────────────────────────────────────────
// Show Sprite
// ─────────────────────────────────────────────────────────────────────────────

export function showSprite(
  state: SpriteState,
  cacheState: MutationCacheState,
  cacheConfig: CacheConfig,
  category: string | null,
  asset: string,
  options: ShowOptions = {}
): PixiSprite {
  if (!state.ready) throw new Error("MGSprite not ready yet");

  const key = resolveKey(category, asset, state.textures, state.animations);
  const mutations = options.mutations || [];
  const parent = options.parent || getDefaultParent(state) || ensureOverlay(state);

  const W = state.renderer?.width || state.renderer?.view?.width || innerWidth;
  const H = state.renderer?.height || state.renderer?.view?.height || innerHeight;
  const x = options.center ? W / 2 : (options.x ?? W / 2);
  const y = options.center ? H / 2 : (options.y ?? H / 2);

  let obj: PixiSprite;
  const rawFrames = state.animations.get(key);

  if (rawFrames && rawFrames.length >= 2) {
    const frames = getMutatedFrames(key, rawFrames, mutations, state, cacheState, cacheConfig);
    const AS = state.ctors!.AnimatedSprite;

    if (AS) {
      obj = new AS(frames);
      obj.animationSpeed = options.fps ? options.fps / 60 : (options.speed ?? 0.15);
      obj.loop = options.loop ?? true;
      obj.play();
    } else {
      const spr = new state.ctors!.Sprite(frames[0]);
      const fps = Math.max(1, options.fps || 8);
      const frameMs = 1000 / fps;
      let acc = 0;
      let i = 0;

      const tick = (delta: number) => {
        const ms = state.app!.ticker?.deltaMS ?? delta * (1000 / 60);
        acc += ms;
        if (acc < frameMs) return;
        const step = (acc / frameMs) | 0;
        acc %= frameMs;
        i = (i + step) % frames.length;
        spr.texture = frames[i];
      };

      (spr as any).__mgTick = tick;
      state.app!.ticker?.add?.(tick);
      obj = spr;
    }
  } else {
    const rawTex = state.textures.get(key);
    if (!rawTex) throw new Error(`Unknown sprite/anim key: ${key}`);

    const tex = getMutatedTexture(key, rawTex, mutations, state, cacheState, cacheConfig);
    obj = new state.ctors!.Sprite(tex);
  }

  const ax = options.anchorX ?? obj.texture?.defaultAnchor?.x ?? 0.5;
  const ay = options.anchorY ?? obj.texture?.defaultAnchor?.y ?? 0.5;
  obj.anchor?.set?.(ax, ay);

  obj.position.set(x, y);
  obj.scale.set(options.scale ?? 1);
  obj.alpha = options.alpha ?? 1;
  obj.rotation = options.rotation ?? 0;
  obj.zIndex = options.zIndex ?? 999999;

  parent.addChild(obj);
  state.live.add(obj);

  (obj as any).__mgDestroy = () => {
    try {
      if ((obj as any).__mgTick) state.app!.ticker?.remove?.((obj as any).__mgTick);
    } catch {}
    try {
      obj.destroy?.({ children: true, texture: false, baseTexture: false });
    } catch {
      try {
        obj.destroy?.();
      } catch {}
    }
    state.live.delete(obj);
  };

  return obj;
}

// ─────────────────────────────────────────────────────────────────────────────
// Extract Canvas
// ─────────────────────────────────────────────────────────────────────────────

function extractCanvas(state: SpriteState, target: any): HTMLCanvasElement {
  const r = state.renderer;
  if (r?.extract?.canvas) return r.extract.canvas(target);
  if (r?.plugins?.extract?.canvas) return r.plugins.extract.canvas(target);
  throw new Error("No extract.canvas available on renderer");
}

// ─────────────────────────────────────────────────────────────────────────────
// To Canvas
// ─────────────────────────────────────────────────────────────────────────────

export function spriteToCanvas(
  state: SpriteState,
  cacheState: MutationCacheState,
  cacheConfig: CacheConfig,
  category: string | null,
  asset: string,
  options: ToCanvasOptions = {}
): HTMLCanvasElement {
  if (!state.ready) throw new Error("MGSprite not ready yet");

  const key = resolveKey(category, asset, state.textures, state.animations);
  const mutations = options.mutations || [];

  const rawFrames = state.animations.get(key);
  const idx = Math.max(0, (options.frameIndex ?? 0) | 0);

  let tex: PixiTexture;

  if (rawFrames?.length) {
    const frames = getMutatedFrames(key, rawFrames, mutations, state, cacheState, cacheConfig);
    tex = frames[idx % frames.length];
  } else {
    const rawTex = state.textures.get(key);
    if (!rawTex) throw new Error(`Unknown sprite/anim key: ${key}`);
    tex = getMutatedTexture(key, rawTex, mutations, state, cacheState, cacheConfig);
  }

  const spr = new state.ctors!.Sprite(tex);
  const ax = options.anchorX ?? spr.texture?.defaultAnchor?.x ?? 0.5;
  const ay = options.anchorY ?? spr.texture?.defaultAnchor?.y ?? 0.5;
  spr.anchor?.set?.(ax, ay);
  spr.scale.set(options.scale ?? 1);

  const pad = options.pad ?? 2;
  const tmp = new state.ctors!.Container();
  tmp.addChild(spr);

  try {
    tmp.updateTransform?.();
  } catch {}

  const bnd = spr.getBounds?.(true) || { x: 0, y: 0, width: spr.width, height: spr.height };
  spr.position.set(-bnd.x + pad, -bnd.y + pad);

  const canvas = extractCanvas(state, tmp);

  try {
    tmp.destroy?.({ children: true });
  } catch {}

  return canvas;
}

// ─────────────────────────────────────────────────────────────────────────────
// Clear All Live Sprites
// ─────────────────────────────────────────────────────────────────────────────

export function clearSprites(state: SpriteState): void {
  for (const obj of Array.from(state.live)) {
    (obj as any).__mgDestroy?.();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Attach Parent
// ─────────────────────────────────────────────────────────────────────────────

export function attachParent(state: SpriteState, container: PixiContainer): boolean {
  state.defaultParent = container;
  return true;
}

export function attachParentProvider(state: SpriteState, fn: () => PixiContainer): boolean {
  state.defaultParent = fn;
  return true;
}
