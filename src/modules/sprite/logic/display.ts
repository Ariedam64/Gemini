// src/modules/sprite/display.ts
// show() and toCanvas() functions for sprite display
// Now uses pure canvas rendering (no PIXI dependency for toCanvas)

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
        const key = resolveKey(null, spriteId, state.textures, state.animations);
        const options: ToCanvasOptions = { scale: 1 };
        const boundsMode = resolveBoundsMode(options);
        const pad = resolvePad(boundsMode, options);
        const paddingKey = boundsPaddingKey(boundsMode, options.boundsPadding);
        const cacheKey = buildCanvasCacheKey(key, options, boundsMode, pad, paddingKey);

        if (!canvasCacheState.cache.has(cacheKey)) {
          spriteToCanvas(
            state,
            _mutCacheState,
            _mutCacheConfig,
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

function getImageSize(source: unknown): { w: number; h: number } {
  if (source instanceof HTMLImageElement) {
    return { w: source.naturalWidth || source.width, h: source.naturalHeight || source.height };
  }
  if (source instanceof HTMLCanvasElement) {
    return { w: source.width, h: source.height };
  }
  // Fallback for PixiTexture-like objects
  const tex = source as Record<string, unknown>;
  const orig = tex?.orig as { width?: number; height?: number } | undefined;
  const frame = tex?.frame as { width?: number; height?: number } | undefined;
  return {
    w: (orig?.width ?? frame?.width ?? (tex?.width as number) ?? 1) as number,
    h: (orig?.height ?? frame?.height ?? (tex?.height as number) ?? 1) as number,
  };
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
  const meta = MUT_META[mutName];
  if (isTall && meta?.tallIconOverride) {
    if (textures.has(meta.tallIconOverride)) return meta.tallIconOverride;
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
// Replicates the old PIXI-based composer logic using canvas 2D.
// All positioning uses basePos = { w * aX, h * aY } as the anchor reference,
// exactly like the old Container/Sprite system with generateTexture({ region: crop }).
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

  // Resolve anchor from API metadata (same as old tex.defaultAnchor)
  const meta = spriteMeta.get(itemKey);
  const aX = meta?.anchor?.x ?? 0.5;
  const aY = meta?.anchor?.y ?? 0.5;
  const basePos = { x: w * aX, y: h * aY };

  // Detect tall plants from metadata (replaces old isTallKey("tallplant"))
  const isTall = aY > 0.8 && h > w * 1.8;

  const pipeline = buildMutationPipeline(variant.muts, isTall);
  const overlayPipeline = buildMutationPipeline(variant.overlayMuts, isTall);
  const iconPipeline = buildMutationPipeline(variant.selectedMuts, isTall);

  // Pre-compute icon data for z-ordered drawing
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

      // Get icon's own anchor from metadata (same as old itex.defaultAnchor)
      const iconKey = findIconKey(itemKey, step.name, step.isTall, textures as Map<string, unknown>);
      const iconMeta = iconKey ? spriteMeta.get(iconKey) : null;
      const iconAnchorX = iconMeta?.anchor?.x ?? 0.5;
      const iconAnchorY = iconMeta?.anchor?.y ?? 0.5;

      // In PIXI: icon at (basePos + offset) with anchor → top-left = pos - anchor * scaledSize
      const iconX = basePos.x + iconLayout.offset.x - iconScaledW * iconAnchorX;
      const iconY = basePos.y + iconLayout.offset.y - iconScaledH * iconAnchorY;

      // Determine z-index (same as old buildIconSprites)
      let z = 2;
      if (step.isTall) z = -1;
      if (FLOATING_MUTATION_ICONS.has(step.name)) z = 10;

      iconDraws.push({ canvas: iconCanvas, x: iconX, y: iconY, sw: iconScaledW, sh: iconScaledH, z });
    } catch { /* skip icon */ }
  }

  // Output canvas is always base sprite size (w × h).
  // Anything that overflows is clipped — this ensures consistent sizing
  // across different mutation combos (same as old boundsMode: "base").
  const output = document.createElement("canvas");
  output.width = w;
  output.height = h;
  const ctx = output.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;

  // z=-1: Icons behind base (tall plant ground effects)
  for (const icon of iconDraws) {
    if (icon.z === -1) ctx.drawImage(icon.canvas, icon.x, icon.y, icon.sw, icon.sh);
  }

  // z=0: Base sprite
  ctx.drawImage(baseCanvas, 0, 0);

  // z=1: Color filter layers
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

  // z=2: Normal icons
  for (const icon of iconDraws) {
    if (icon.z === 2) ctx.drawImage(icon.canvas, icon.x, icon.y, icon.sw, icon.sh);
  }

  // z=3: Tall overlay mutations (masked to base shape)
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

  // z=10: Floating icons (Dawnlit, Ambershine, Dawncharged, Ambercharged)
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

function resolvePad(boundsMode: CanvasBoundsMode, options: ToCanvasOptions): number {
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
// To Canvas (pure canvas rendering)
// ─────────────────────────────────────────────────────────────────────────────

export function spriteToCanvas(
  state: SpriteState,
  _cacheState: MutationCacheState,
  _cacheConfig: CacheConfig,
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
    if (cached) return cloneCanvas(cached);
  }

  const mutations = options.mutations || [];
  const rawFrames = state.animations.get(key);
  const idx = Math.max(0, (options.frameIndex ?? 0) | 0);

  // Get the source image (HTMLImageElement stored in textures map)
  let sourceImg: unknown;
  if (rawFrames?.length) {
    sourceImg = rawFrames[idx % rawFrames.length];
  } else {
    sourceImg = state.textures.get(key);
  }
  if (!sourceImg) throw new Error(`Unknown sprite/anim key: ${key}`);

  // Convert source to canvas
  let baseCanvas = toCanvasElement(sourceImg);

  // Apply mutations if any
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
  // PIXI-based show is no longer supported without the game's PIXI instance
  throw new Error("MGSprite.show() is not supported in API-only mode");
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
