// src/modules/sprite/display.ts
// show() and toCanvas() functions for sprite display
// Uses pure canvas rendering with lazy image loading

import type {
  PixiSprite,
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
} from "../types";
import { resolveKey } from "./utils";
import { ensureImageLoaded, ensureImagesLoaded } from "./loader";
import { computeVariantSignature, buildMutationPipeline, MUT_META, FLOATING_MUTATION_ICONS } from "./mutations/constants";
import { applyFilterOnto } from "./mutations/filters";
import {
  baseNameOf,
  mutationAliases,
  findOverlayTexture,
  findIconTexture,
  computeIconLayout,
} from "./mutations/overlay";

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
  _mutCacheState: MutationCacheState,
  _mutCacheConfig: CacheConfig,
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
        await spriteToCanvas(
          state,
          _mutCacheState,
          _mutCacheConfig,
          null,
          spriteId,
          { scale: 1 },
          canvasCacheState,
          canvasCacheConfig
        );
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
// Image/Texture to Canvas Helper
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert an image-like object (HTMLImageElement, HTMLCanvasElement, or PixiTexture) to canvas
 */
function toCanvasElement(source: unknown): HTMLCanvasElement {
  if (source instanceof HTMLCanvasElement) return cloneCanvas(source);

  if (source instanceof HTMLImageElement) {
    const canvas = document.createElement("canvas");
    canvas.width = source.naturalWidth || source.width;
    canvas.height = source.naturalHeight || source.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(source, 0, 0);
    }
    return canvas;
  }

  // Fallback: try drawing as ImageBitmap or similar
  throw new Error("Cannot convert to canvas: unknown source type");
}

/**
 * Collect all sprite keys needed for mutation rendering and lazy-load them in parallel
 */
async function ensureMutationImagesLoaded(
  itemKey: string,
  mutations: MutationName[],
  state: SpriteState,
): Promise<void> {
  const variant = computeVariantSignature(mutations);
  if (!variant.sig) return;

  const keysToLoad = new Set<string>();

  const meta = state.spriteMeta.get(itemKey);
  const aY = meta?.anchor?.y ?? 0.5;
  const sMeta = meta?.sourceSize;
  const w = sMeta?.w ?? 1;
  const h = sMeta?.h ?? 1;
  const isTall = aY > 0.8 && h > w * 1.8;

  const iconPipeline = buildMutationPipeline(variant.selectedMuts, isTall);
  const overlayPipeline = buildMutationPipeline(variant.overlayMuts, isTall);

  // Collect icon keys
  for (const step of iconPipeline) {
    if (step.name === "Gold" || step.name === "Rainbow") continue;
    const mutMeta = MUT_META[step.name];
    if (step.isTall && mutMeta?.tallIconOverride) {
      keysToLoad.add(mutMeta.tallIconOverride);
    }
    const base = baseNameOf(itemKey);
    for (const alias of mutationAliases(step.name)) {
      keysToLoad.add(`sprite/mutation/${alias}Icon`);
      keysToLoad.add(`sprite/mutation/${alias}`);
      keysToLoad.add(`sprite/mutation/${alias}${base}`);
    }
  }

  // Collect overlay keys
  if (isTall) {
    for (const step of overlayPipeline) {
      if (step.overlayTall) keysToLoad.add(step.overlayTall);
      for (const alias of mutationAliases(step.name)) {
        keysToLoad.add(`sprite/mutation-overlay/${alias}TallPlant`);
        keysToLoad.add(`sprite/mutation-overlay/${alias}`);
        keysToLoad.add(`sprite/mutation/${alias}`);
      }
    }
  }

  // Filter to only keys that exist in catalog and aren't loaded yet
  const toLoad = [...keysToLoad].filter(
    (k) => state.catalogKeys.has(k) && !state.textures.has(k)
  );

  if (toLoad.length > 0) {
    await ensureImagesLoaded(toLoad, state);
  }
}

/**
 * Find the sprite key for a mutation icon (mirrors findIconTexture but returns the key)
 */
function findIconKey(
  itKey: string,
  mutName: MutationName,
  isTall: boolean,
  textures: Map<string, unknown>,
): string | null {
  const mutMeta = MUT_META[mutName];
  if (isTall && mutMeta?.tallIconOverride) {
    if (textures.has(mutMeta.tallIconOverride)) return mutMeta.tallIconOverride;
  }

  const base = baseNameOf(itKey);
  const aliases = mutationAliases(mutName);

  for (const name of aliases) {
    const tries = [
      `sprite/mutation/${name}Icon`,
      `sprite/mutation/${name}`,
      `sprite/mutation/${name}${base}`,
    ];
    for (const k of tries) {
      if (textures.has(k)) return k;
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pure Canvas Mutation Composition
// ─────────────────────────────────────────────────────────────────────────────

function applyMutationsToCanvas(
  baseCanvas: HTMLCanvasElement,
  itemKey: string,
  mutations: MutationName[],
  textures: Map<string, unknown>,
  spriteMeta: SpriteState["spriteMeta"],
): HTMLCanvasElement {
  const variant = computeVariantSignature(mutations);
  if (!variant.sig) return baseCanvas;

  const w = baseCanvas.width;
  const h = baseCanvas.height;

  const meta = spriteMeta.get(itemKey);
  const aX = meta?.anchor?.x ?? 0.5;
  const aY = meta?.anchor?.y ?? 0.5;
  const basePos = { x: w * aX, y: h * aY };

  const isTall = aY > 0.8 && h > w * 1.8;

  const pipeline = buildMutationPipeline(variant.muts, isTall);
  const overlayPipeline = buildMutationPipeline(variant.overlayMuts, isTall);
  const iconPipeline = buildMutationPipeline(variant.selectedMuts, isTall);

  const baseName = baseNameOf(itemKey);
  const fakeTexForLayout = { width: w, height: h, defaultAnchor: { x: aX, y: aY } };
  const iconLayout = computeIconLayout(fakeTexForLayout as unknown, baseName, isTall);

  interface IconDraw { canvas: HTMLCanvasElement; x: number; y: number; sw: number; sh: number; z: number }
  const iconDraws: IconDraw[] = [];

  for (const step of iconPipeline) {
    if (step.name === "Gold" || step.name === "Rainbow") continue;

    const itex = findIconTexture(itemKey, step.name, step.isTall, textures as Map<string, unknown>);
    if (!itex) continue;

    try {
      const iconCanvas = toCanvasElement(itex);
      const iconScaledW = iconCanvas.width * iconLayout.iconScale;
      const iconScaledH = iconCanvas.height * iconLayout.iconScale;

      const iconKey = findIconKey(itemKey, step.name, step.isTall, textures as Map<string, unknown>);
      const iconMeta = iconKey ? spriteMeta.get(iconKey) : null;
      const iconAnchorX = iconMeta?.anchor?.x ?? 0.5;
      const iconAnchorY = iconMeta?.anchor?.y ?? 0.5;

      const iconX = basePos.x + iconLayout.offset.x - iconScaledW * iconAnchorX;
      const iconY = basePos.y + iconLayout.offset.y - iconScaledH * iconAnchorY;

      let z = 2;
      if (step.isTall) z = -1;
      if (FLOATING_MUTATION_ICONS.has(step.name)) z = 10;

      iconDraws.push({ canvas: iconCanvas, x: iconX, y: iconY, sw: iconScaledW, sh: iconScaledH, z });
    } catch { /* skip icon */ }
  }

  const output = document.createElement("canvas");
  output.width = w;
  output.height = h;
  const ctx = output.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;

  for (const icon of iconDraws) {
    if (icon.z === -1) ctx.drawImage(icon.canvas, icon.x, icon.y, icon.sw, icon.sh);
  }

  ctx.drawImage(baseCanvas, 0, 0);

  for (const step of pipeline) {
    const layerCanvas = document.createElement("canvas");
    layerCanvas.width = w;
    layerCanvas.height = h;
    const lctx = layerCanvas.getContext("2d")!;
    lctx.imageSmoothingEnabled = false;
    lctx.drawImage(baseCanvas, 0, 0);
    applyFilterOnto(lctx, layerCanvas, step.name, step.isTall);
    ctx.drawImage(layerCanvas, 0, 0);
  }

  for (const icon of iconDraws) {
    if (icon.z === 2) ctx.drawImage(icon.canvas, icon.x, icon.y, icon.sw, icon.sh);
  }

  if (isTall) {
    for (const step of overlayPipeline) {
      const overlayKey = step.overlayTall;
      const hit = overlayKey && textures.get(overlayKey)
        ? { tex: textures.get(overlayKey)!, key: overlayKey }
        : findOverlayTexture(itemKey, step.name, textures as Map<string, unknown>, true);
      if (!hit?.tex) continue;

      try {
        const overlayCanvas = toCanvasElement(hit.tex);
        const ow = overlayCanvas.width;
        const oh = overlayCanvas.height;
        const overlayX = basePos.x - aX * ow;
        const overlayY = 0;

        const maskedCanvas = document.createElement("canvas");
        maskedCanvas.width = ow;
        maskedCanvas.height = oh;
        const mctx = maskedCanvas.getContext("2d");
        if (!mctx) continue;
        mctx.imageSmoothingEnabled = false;
        mctx.drawImage(overlayCanvas, 0, 0);
        mctx.globalCompositeOperation = "destination-in";
        mctx.drawImage(baseCanvas, -overlayX, -overlayY);
        ctx.drawImage(maskedCanvas, overlayX, overlayY);
      } catch { /* skip overlay */ }
    }
  }

  for (const icon of iconDraws) {
    if (icon.z === 10) ctx.drawImage(icon.canvas, icon.x, icon.y, icon.sw, icon.sh);
  }

  return output;
}

// ─────────────────────────────────────────────────────────────────────────────
// Bounds helpers
// ─────────────────────────────────────────────────────────────────────────────

function resolveBoundsMode(options: ToCanvasOptions): CanvasBoundsMode {
  if (options.boundsMode) return options.boundsMode;
  return "base";
}

function resolvePad(_boundsMode: CanvasBoundsMode, options: ToCanvasOptions): number {
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

// ─────────────────────────────────────────────────────────────────────────────
// To Canvas (async — lazy loads images on demand)
// ─────────────────────────────────────────────────────────────────────────────

export async function spriteToCanvas(
  state: SpriteState,
  _cacheState: MutationCacheState,
  _cacheConfig: CacheConfig,
  category: string | null,
  asset: string,
  options: ToCanvasOptions = {},
  canvasCacheState?: CanvasCacheState,
  canvasCacheConfig?: CanvasCacheConfig
): Promise<HTMLCanvasElement> {
  if (!state.ready) throw new Error("MGSprite not ready yet");

  const key = resolveKey(category, asset, state.catalogKeys, state.animationFrameIds);
  const boundsMode = resolveBoundsMode(options);
  const pad = resolvePad(boundsMode, options);
  const paddingKey = boundsPaddingKey(boundsMode, options.boundsPadding);
  const cacheKey = canvasCacheState && canvasCacheConfig?.enabled
    ? buildCanvasCacheKey(key, options, boundsMode, pad, paddingKey)
    : null;

  // Check canvas cache first (sync — no image loading needed)
  if (cacheKey && canvasCacheState && canvasCacheConfig?.enabled) {
    const cached = canvasCacheGet(canvasCacheState, cacheKey);
    if (cached) return cloneCanvas(cached);
  }

  const mutations = options.mutations || [];

  // Lazy-load the base image and any mutation images in parallel
  const frameIds = state.animationFrameIds.get(key);
  if (frameIds?.length) {
    // Animation: load all frame images
    await ensureImagesLoaded(frameIds, state);
  } else {
    // Single frame: load the base image
    await ensureImageLoaded(key, state);
  }

  // Pre-load mutation images if needed
  if (mutations.length > 0) {
    await ensureMutationImagesLoaded(key, mutations, state);
  }

  // Get the source image
  const idx = Math.max(0, (options.frameIndex ?? 0) | 0);
  let sourceImg: unknown;
  if (frameIds?.length) {
    // Resolve animation frames from loaded textures
    const frames = frameIds
      .map((fid) => state.textures.get(fid))
      .filter(Boolean);
    sourceImg = frames.length > 0 ? frames[idx % frames.length] : null;
  } else {
    sourceImg = state.textures.get(key);
  }
  if (!sourceImg) throw new Error(`Unknown sprite/anim key: ${key}`);

  // Convert source to canvas
  let baseCanvas = toCanvasElement(sourceImg);

  // Apply mutations if any (sync — all images already loaded above)
  if (mutations.length > 0) {
    baseCanvas = applyMutationsToCanvas(baseCanvas, key, mutations, state.textures, state.spriteMeta);
  }

  // Apply scaling and padding
  const scale = options.scale ?? 1;
  const boundsPadding = normalizeBoundsPadding(options.boundsPadding);
  const baseW = baseCanvas.width;
  const baseH = baseCanvas.height;
  const outW = Math.max(1, Math.ceil((baseW + boundsPadding.left + boundsPadding.right + pad * 2) * scale));
  const outH = Math.max(1, Math.ceil((baseH + boundsPadding.top + boundsPadding.bottom + pad * 2) * scale));

  let canvas: HTMLCanvasElement;
  if (scale === 1 && !pad && !boundsPadding.top && !boundsPadding.right && !boundsPadding.bottom && !boundsPadding.left) {
    canvas = baseCanvas;
  } else {
    canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      const drawX = (boundsPadding.left + pad) * scale;
      const drawY = (boundsPadding.top + pad) * scale;
      ctx.drawImage(baseCanvas, drawX, drawY, baseW * scale, baseH * scale);
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
// Show Sprite (requires PIXI - throws if not available)
// ─────────────────────────────────────────────────────────────────────────────

export function showSprite(
  state: SpriteState,
  _cacheState: MutationCacheState,
  _cacheConfig: CacheConfig,
  _category: string | null,
  _asset: string,
  _options: ShowOptions = {}
): PixiSprite {
  if (!state.ready) throw new Error("MGSprite not ready yet");
  if (!state.app || !state.ctors) {
    throw new Error("MGSprite.show() requires PIXI (not available - use toCanvas() instead)");
  }
  throw new Error("MGSprite.show() is not supported in API-only mode");
}

// ─────────────────────────────────────────────────────────────────────────────
// Clear All Live Sprites
// ─────────────────────────────────────────────────────────────────────────────

export function clearSprites(state: SpriteState): void {
  for (const obj of Array.from(state.live)) {
    const destroyFn = (obj as Record<string, unknown>).__mgDestroy;
    if (typeof destroyFn === "function") destroyFn.call(obj);
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
