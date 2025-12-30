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
  CanvasCacheState,
  CanvasCacheConfig,
  CanvasBoundsMode,
  BoundsPadding,
} from "./types";
import { resolveKey, makeKey } from "./utils";
import { computeVariantSignature, MUT_NAMES } from "./mutations/types";
import { composeMutatedTexture, composeMutatedAnimation, textureToCanvas } from "./mutations/composer";
import { variantKey, lruGet, lruSet, DEFAULT_CACHE_CONFIG } from "./mutations/cache";

// ─────────────────────────────────────────────────────────────────────────────
// Canvas Cache
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_CANVAS_CACHE_CONFIG: CanvasCacheConfig = {
  enabled: true,
  maxEntries: 500,
};

export function createCanvasCacheState(): CanvasCacheState {
  return {
    cache: new Map(),
    maxEntries: DEFAULT_CANVAS_CACHE_CONFIG.maxEntries,
  };
}

function buildCanvasCacheKey(
  key: string,
  options: ToCanvasOptions,
  boundsMode: CanvasBoundsMode,
  pad: number,
  paddingKey: string
): string {
  const scale = options.scale ?? 1;
  const frameIndex = options.frameIndex ?? 0;
  const mutations = options.mutations?.slice().sort().join(",") || "";
  const anchorX = options.anchorX ?? 0.5;
  const anchorY = options.anchorY ?? 0.5;
  return `${key}|s${scale}|f${frameIndex}|m${mutations}|ax${anchorX}|ay${anchorY}|bm${boundsMode}|bp${paddingKey}|p${pad}`;
}

function canvasCacheGet(
  cacheState: CanvasCacheState,
  cacheKey: string
): HTMLCanvasElement | null {
  const entry = cacheState.cache.get(cacheKey);
  if (!entry) return null;
  entry.lastAccess = performance.now();
  return entry.canvas;
}

function canvasCacheSet(
  cacheState: CanvasCacheState,
  config: CanvasCacheConfig,
  cacheKey: string,
  canvas: HTMLCanvasElement
): void {
  if (!config.enabled) return;

  if (cacheState.cache.size >= config.maxEntries) {
    let oldest: string | null = null;
    let oldestTime = Infinity;
    for (const [k, v] of cacheState.cache) {
      if (v.lastAccess < oldestTime) {
        oldestTime = v.lastAccess;
        oldest = k;
      }
    }
    if (oldest) cacheState.cache.delete(oldest);
  }

  cacheState.cache.set(cacheKey, {
    canvas,
    lastAccess: performance.now(),
  });
}

function cloneCanvas(source: HTMLCanvasElement): HTMLCanvasElement {
  const clone = document.createElement("canvas");
  clone.width = source.width;
  clone.height = source.height;
  const ctx = clone.getContext("2d");
  if (ctx) ctx.drawImage(source, 0, 0);
  return clone;
}

export function clearCanvasCache(cacheState: CanvasCacheState): void {
  cacheState.cache.clear();
}

export function getCanvasCacheStats(cacheState: CanvasCacheState): { size: number; maxEntries: number } {
  return {
    size: cacheState.cache.size,
    maxEntries: cacheState.maxEntries,
  };
}

export type WarmupProgressCallback = (loaded: number, total: number) => void;

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => resolve(), { timeout: 50 });
    } else {
      setTimeout(resolve, 0);
    }
  });
}

export async function warmupCanvasCache(
  spriteIds: string[],
  state: SpriteState,
  mutCacheState: MutationCacheState,
  mutCacheConfig: CacheConfig,
  canvasCacheState: CanvasCacheState,
  canvasCacheConfig: CanvasCacheConfig,
  onProgress?: WarmupProgressCallback,
  batchSize = 5,
  _batchDelayMs = 0
): Promise<number> {
  if (!state.ready || !canvasCacheConfig.enabled) return 0;

  const total = spriteIds.length;
  let loaded = 0;

  onProgress?.(0, total);

  for (let i = 0; i < total; i += batchSize) {
    const batch = spriteIds.slice(i, i + batchSize);

    for (const spriteId of batch) {
      try {
        const key = resolveKey(null, spriteId, state.textures, state.animations);
        const options: ToCanvasOptions = { scale: 1 };
        const boundsMode = resolveBoundsMode(options);
        const pad = resolvePad(boundsMode, options);
        const paddingKey = boundsPaddingKey(boundsMode, options.boundsPadding);
        const cacheKey = buildCanvasCacheKey(key, options, boundsMode, pad, paddingKey);

        if (!canvasCacheState.cache.has(cacheKey)) {
          spriteToCanvas(
            state,
            mutCacheState,
            mutCacheConfig,
            null,
            spriteId,
            options,
            canvasCacheState,
            canvasCacheConfig
          );
        }
        loaded++;
      } catch {
        loaded++;
      }
    }

    onProgress?.(loaded, total);

    if (i + batchSize < total) {
      await yieldToMain();
    }
  }

  return loaded;
}

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

type TextureBaseMeta = {
  baseX: number;
  baseY: number;
  baseW: number;
  baseH: number;
  texW: number;
  texH: number;
};

const autoBoundsPaddingCache = new Map<string, BoundsPadding>();

function resolveBoundsMode(options: ToCanvasOptions): CanvasBoundsMode {
  if (options.boundsMode) return options.boundsMode;
  if (options.mutations && options.mutations.length > 0) return "base";
  return "mutations";
}

function resolvePad(boundsMode: CanvasBoundsMode, options: ToCanvasOptions): number {
  if (boundsMode === "mutations") return options.pad ?? 2;
  return options.pad ?? 0;
}

function clampPad(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, value);
}

function normalizeBoundsPadding(input?: number | BoundsPadding): BoundsPadding {
  if (typeof input === "number") {
    const v = clampPad(input);
    return { top: v, right: v, bottom: v, left: v };
  }
  if (!input) return { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    top: clampPad(input.top ?? 0),
    right: clampPad(input.right ?? 0),
    bottom: clampPad(input.bottom ?? 0),
    left: clampPad(input.left ?? 0),
  };
}

function boundsPaddingKey(boundsMode: CanvasBoundsMode, padding?: number | BoundsPadding): string {
  if (boundsMode === "mutations") return "0,0,0,0";
  if (boundsMode === "padded" && padding == null) return "auto";
  const p = normalizeBoundsPadding(padding);
  return `${p.top},${p.right},${p.bottom},${p.left}`;
}

function getTextureSize(tex: PixiTexture): { w: number; h: number } {
  const w = tex?.orig?.width ?? tex?.frame?.width ?? tex?.width ?? 1;
  const h = tex?.orig?.height ?? tex?.frame?.height ?? tex?.height ?? 1;
  return { w, h };
}

function getTextureBaseMeta(tex: PixiTexture, baseW: number, baseH: number): TextureBaseMeta {
  const meta = (tex as any)?.__mg_base;
  if (
    meta &&
    Number.isFinite(meta.baseX) &&
    Number.isFinite(meta.baseY) &&
    Number.isFinite(meta.baseW) &&
    Number.isFinite(meta.baseH) &&
    Number.isFinite(meta.texW) &&
    Number.isFinite(meta.texH)
  ) {
    return meta as TextureBaseMeta;
  }
  return { baseX: 0, baseY: 0, baseW, baseH, texW: baseW, texH: baseH };
}

function getAutoBoundsPadding(
  key: string,
  frameIndex: number,
  baseTex: PixiTexture,
  state: SpriteState,
  cacheState: MutationCacheState,
  cacheConfig: CacheConfig
): BoundsPadding {
  const cacheKey = `${key}|f${frameIndex}`;
  const cached = autoBoundsPaddingCache.get(cacheKey);
  if (cached) return cached;

  const baseSize = getTextureSize(baseTex);
  const max = { top: 0, right: 0, bottom: 0, left: 0 };

  for (const mut of MUT_NAMES) {
    const mtex = getMutatedTexture(key, baseTex, [mut], state, cacheState, cacheConfig);
    const meta = getTextureBaseMeta(mtex, baseSize.w, baseSize.h);
    const left = Math.max(0, meta.baseX);
    const top = Math.max(0, meta.baseY);
    const right = Math.max(0, meta.texW - meta.baseX - meta.baseW);
    const bottom = Math.max(0, meta.texH - meta.baseY - meta.baseH);

    if (left > max.left) max.left = left;
    if (top > max.top) max.top = top;
    if (right > max.right) max.right = right;
    if (bottom > max.bottom) max.bottom = bottom;
  }

  autoBoundsPaddingCache.set(cacheKey, max);
  return max;
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
  options: ToCanvasOptions = {},
  canvasCacheState?: CanvasCacheState,
  canvasCacheConfig?: CanvasCacheConfig
): HTMLCanvasElement {
  if (!state.ready) throw new Error("MGSprite not ready yet");

  const key = resolveKey(category, asset, state.textures, state.animations);
  const boundsMode = resolveBoundsMode(options);
  const pad = resolvePad(boundsMode, options);
  const paddingKey = boundsPaddingKey(boundsMode, options.boundsPadding);
  const cacheKey = canvasCacheState && canvasCacheConfig?.enabled
    ? buildCanvasCacheKey(key, options, boundsMode, pad, paddingKey)
    : null;

  // Check canvas cache first
  if (cacheKey && canvasCacheState && canvasCacheConfig?.enabled) {
    const cached = canvasCacheGet(canvasCacheState, cacheKey);
    if (cached) {
      return cloneCanvas(cached);
    }
  }

  const mutations = options.mutations || [];
  const rawFrames = state.animations.get(key);
  const idx = Math.max(0, (options.frameIndex ?? 0) | 0);

  let baseTex: PixiTexture;
  let tex: PixiTexture;

  if (rawFrames?.length) {
    baseTex = rawFrames[idx % rawFrames.length];
    if (mutations.length) {
      const frames = getMutatedFrames(key, rawFrames, mutations, state, cacheState, cacheConfig);
      tex = frames[idx % frames.length];
    } else {
      tex = baseTex;
    }
  } else {
    const rawTex = state.textures.get(key);
    if (!rawTex) throw new Error(`Unknown sprite/anim key: ${key}`);
    baseTex = rawTex;
    tex = getMutatedTexture(key, rawTex, mutations, state, cacheState, cacheConfig);
  }

  let canvas: HTMLCanvasElement;

  if (boundsMode === "mutations") {
    const spr = new state.ctors!.Sprite(tex);
    const ax = options.anchorX ?? spr.texture?.defaultAnchor?.x ?? 0.5;
    const ay = options.anchorY ?? spr.texture?.defaultAnchor?.y ?? 0.5;
    spr.anchor?.set?.(ax, ay);
    spr.scale.set(options.scale ?? 1);

    const tmp = new state.ctors!.Container();
    tmp.addChild(spr);

    try {
      tmp.updateTransform?.();
    } catch {}

    const bnd = spr.getBounds?.(true) || { x: 0, y: 0, width: spr.width, height: spr.height };
    spr.position.set(-bnd.x + pad, -bnd.y + pad);

    canvas = extractCanvas(state, tmp);

    try {
      tmp.destroy?.({ children: true });
    } catch {}
  } else {
    const scale = options.scale ?? 1;
    let boundsPadding = normalizeBoundsPadding(options.boundsPadding);
    if (boundsMode === "padded" && options.boundsPadding == null) {
      boundsPadding = getAutoBoundsPadding(key, idx, baseTex, state, cacheState, cacheConfig);
    }
    if (pad) {
      boundsPadding = {
        top: boundsPadding.top + pad,
        right: boundsPadding.right + pad,
        bottom: boundsPadding.bottom + pad,
        left: boundsPadding.left + pad,
      };
    }

    const baseSize = getTextureSize(baseTex);
    const meta = getTextureBaseMeta(tex, baseSize.w, baseSize.h);
    const outW = Math.max(1, Math.ceil((baseSize.w + boundsPadding.left + boundsPadding.right) * scale));
    const outH = Math.max(1, Math.ceil((baseSize.h + boundsPadding.top + boundsPadding.bottom) * scale));

    canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      const srcCanvas = textureToCanvas(tex, state.renderer!, state.ctors!, cacheState, cacheConfig);
      const drawX = (boundsPadding.left - meta.baseX) * scale;
      const drawY = (boundsPadding.top - meta.baseY) * scale;
      ctx.drawImage(srcCanvas, drawX, drawY, srcCanvas.width * scale, srcCanvas.height * scale);
    }
  }

  // Store in canvas cache
  if (cacheKey && canvasCacheState && canvasCacheConfig?.enabled) {
    canvasCacheSet(canvasCacheState, canvasCacheConfig, cacheKey, canvas);
    return cloneCanvas(canvas);
  }

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
