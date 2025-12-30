// src/modules/sprite/mutations/composer.ts
// Texture composition pipeline for mutations

import type {
  PixiTexture,
  PixiSprite,
  PixiContainer,
  PixiRenderer,
  PixiConstructors,
  MutationCacheState,
  CacheConfig,
  MutationName,
} from "../types";
import type { VariantSignature, PipelineStep } from "./types";
import { buildMutationPipeline } from "./types";
import { applyFilterOnto } from "./filters";
import {
  isTallKey,
  baseNameOf,
  findOverlayTexture,
  findIconTexture,
  computeIconLayout,
} from "./overlay";
import { FLOATING_MUTATION_ICONS } from "./types";
import { getSrcCanvas, setSrcCanvas } from "./cache";

// ─────────────────────────────────────────────────────────────────────────────
// Texture to Canvas Conversion
// ─────────────────────────────────────────────────────────────────────────────

export function textureToCanvas(
  tex: PixiTexture,
  renderer: PixiRenderer,
  ctors: PixiConstructors,
  cacheState: MutationCacheState,
  cacheConfig: CacheConfig
): HTMLCanvasElement {
  const cached = getSrcCanvas(cacheState, tex);
  if (cached) return cached;

  let canvas: HTMLCanvasElement | null = null;

  try {
    if (renderer?.extract?.canvas) {
      const spr = new ctors.Sprite(tex);
      canvas = renderer.extract.canvas(spr);
      spr.destroy?.({ children: true, texture: false, baseTexture: false });
    }
  } catch { }

  if (!canvas) {
    const fr = tex?.frame || tex?._frame;
    const orig = tex?.orig || tex?._orig;
    const trim = tex?.trim || tex?._trim;
    const rot = tex?.rotate || tex?._rotate || 0;
    const src =
      tex?.baseTexture?.resource?.source ||
      tex?.baseTexture?.resource ||
      tex?.source?.resource?.source ||
      tex?.source?.resource ||
      tex?._source?.resource?.source ||
      null;

    if (!fr || !src) throw new Error("textureToCanvas fail");

    const rotated = rot === true || rot === 2 || rot === 6;
    const isCcw90 = rot === true || rot === 2;

    canvas = document.createElement("canvas");
    const fullW = Math.max(1, (orig?.width ?? fr.width) | 0);
    const fullH = Math.max(1, (orig?.height ?? fr.height) | 0);

    const offX = trim?.x ?? 0;
    const offY = trim?.y ?? 0;

    canvas.width = fullW;
    canvas.height = fullH;

    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.imageSmoothingEnabled = false;

    if (rotated) {
      ctx.save();
      // Translate to center of its rotated frame and rotate
      ctx.translate(offX + fr.height / 2, offY + fr.width / 2);
      ctx.rotate(isCcw90 ? -Math.PI / 2 : Math.PI / 2);
      ctx.drawImage(src, fr.x, fr.y, fr.width, fr.height, -fr.width / 2, -fr.height / 2, fr.width, fr.height);
      ctx.restore();
    } else {
      ctx.drawImage(src, fr.x, fr.y, fr.width, fr.height, offX, offY, fr.width, fr.height);
    }
  }

  setSrcCanvas(cacheState, tex, canvas, cacheConfig);
  return canvas;
}

// ─────────────────────────────────────────────────────────────────────────────
// Layer Builders
// ─────────────────────────────────────────────────────────────────────────────

interface ComposeDims {
  w: number;
  h: number;
  aX: number;
  aY: number;
  basePos: { x: number; y: number };
}

function buildColorLayerSprites(
  tex: PixiTexture,
  dims: ComposeDims,
  pipeline: PipelineStep[],
  ctors: PixiConstructors,
  renderer: PixiRenderer,
  cacheState: MutationCacheState,
  cacheConfig: CacheConfig,
  disposables: PixiTexture[]
): PixiSprite[] {
  const { w, h, aX, aY, basePos } = dims;
  const layers: PixiSprite[] = [];

  for (const step of pipeline) {
    const clone = new ctors.Sprite(tex);
    clone.anchor?.set?.(aX, aY);
    clone.position.set(basePos.x, basePos.y);
    clone.zIndex = 1;

    const layerCanvas = document.createElement("canvas");
    layerCanvas.width = w;
    layerCanvas.height = h;

    const lctx = layerCanvas.getContext("2d", { willReadFrequently: true })!;
    lctx.imageSmoothingEnabled = false;
    lctx.save();
    lctx.translate(w * aX, h * aY);
    lctx.drawImage(
      textureToCanvas(tex, renderer, ctors, cacheState, cacheConfig),
      -w * aX,
      -h * aY
    );
    lctx.restore();

    applyFilterOnto(lctx, layerCanvas, step.name, step.isTall);

    // Unified Logical Resolution: Force resolution 1 for intermediate textures.
    const filteredTex = ctors.Texture.from(layerCanvas, { resolution: 1 });
    disposables.push(filteredTex);

    clone.texture = filteredTex;
    layers.push(clone);
  }

  return layers;
}

function buildOverlaySprites(
  itKey: string,
  dims: ComposeDims,
  overlayPipeline: PipelineStep[],
  textures: Map<string, PixiTexture>,
  ctors: PixiConstructors,
  renderer: PixiRenderer,
  cacheState: MutationCacheState,
  cacheConfig: CacheConfig,
  baseCanvas: HTMLCanvasElement,
  disposables: PixiTexture[]
): PixiSprite[] {
  const { aX, basePos } = dims;
  const overlays: PixiSprite[] = [];

  for (const step of overlayPipeline) {
    const hit =
      (step.overlayTall && textures.get(step.overlayTall) && {
        tex: textures.get(step.overlayTall)!,
        key: step.overlayTall,
      }) ||
      findOverlayTexture(itKey, step.name, textures, step.isTall);

    if (!hit?.tex) continue;

    const oCan = textureToCanvas(hit.tex, renderer, ctors, cacheState, cacheConfig);
    if (!oCan) continue;

    const ow = oCan.width;
    const overlayAnchor = { x: 0, y: 0 };
    const overlayPos = { x: basePos.x - aX * ow, y: 0 };

    const maskedCanvas = document.createElement("canvas");
    maskedCanvas.width = ow;
    maskedCanvas.height = oCan.height;

    const mctx = maskedCanvas.getContext("2d", { willReadFrequently: true });
    if (!mctx) continue;

    mctx.imageSmoothingEnabled = false;
    mctx.drawImage(oCan, 0, 0);
    mctx.globalCompositeOperation = "destination-in";
    mctx.drawImage(baseCanvas, -overlayPos.x, -overlayPos.y);

    // Unified Logical Resolution: Force resolution 1 for intermediate textures.
    const maskedTex = ctors.Texture.from(maskedCanvas, { resolution: 1 });
    disposables.push(maskedTex);

    const ov = new ctors.Sprite(maskedTex);
    ov.anchor?.set?.(overlayAnchor.x, overlayAnchor.y);
    ov.position.set(overlayPos.x, overlayPos.y);
    ov.scale.set(1);
    ov.alpha = 1;
    ov.zIndex = 3;

    overlays.push(ov);
  }

  return overlays;
}

function buildIconSprites(
  itKey: string,
  dims: ComposeDims,
  iconPipeline: PipelineStep[],
  textures: Map<string, PixiTexture>,
  ctors: PixiConstructors,
  iconLayout: ReturnType<typeof computeIconLayout>
): PixiSprite[] {
  const { basePos } = dims;
  const icons: PixiSprite[] = [];

  for (const step of iconPipeline) {
    if (step.name === "Gold" || step.name === "Rainbow") continue;

    const itex = findIconTexture(itKey, step.name, step.isTall, textures);
    if (!itex) continue;

    const icon = new ctors.Sprite(itex);
    const iconAnchorX = itex?.defaultAnchor?.x ?? 0.5;
    const iconAnchorY = itex?.defaultAnchor?.y ?? 0.5;

    icon.anchor?.set?.(iconAnchorX, iconAnchorY);
    icon.position.set(basePos.x + iconLayout.offset.x, basePos.y + iconLayout.offset.y);
    icon.scale.set(iconLayout.iconScale);

    if (step.isTall) icon.zIndex = -1;
    if (FLOATING_MUTATION_ICONS.has(step.name)) icon.zIndex = 10;
    if (!icon.zIndex) icon.zIndex = 2;

    icons.push(icon);
  }

  return icons;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Composer Function
// ─────────────────────────────────────────────────────────────────────────────

export interface ComposerContext {
  renderer: PixiRenderer;
  ctors: PixiConstructors;
  textures: Map<string, PixiTexture>;
  cacheState: MutationCacheState;
  cacheConfig: CacheConfig;
}

export function composeMutatedTexture(
  tex: PixiTexture,
  itemKey: string,
  variant: VariantSignature,
  ctx: ComposerContext
): PixiTexture | null {
  try {
    if (!tex || !ctx.renderer || !ctx.ctors?.Container || !ctx.ctors?.Sprite || !ctx.ctors?.Texture) {
      return null;
    }

    const { Container, Sprite, Texture } = ctx.ctors;

    const rot = tex?.rotate || tex?._rotate || 0;
    const isRotated = rot === true || rot === 2 || rot === 6;

    const w = tex?.orig?.width ?? tex?.frame?.width ?? tex?.width ?? 1;
    const h = tex?.orig?.height ?? tex?.frame?.height ?? tex?.height ?? 1;

    const aX = tex?.defaultAnchor?.x ?? 0.5;
    const aY = tex?.defaultAnchor?.y ?? 0.5;
    const basePos = { x: w * aX, y: h * aY };

    const baseCanvas = textureToCanvas(tex, ctx.renderer, ctx.ctors, ctx.cacheState, ctx.cacheConfig);

    const root: PixiContainer = new Container();
    root.sortableChildren = true;

    // Lock sprite determines the bounds and prevents expansion
    const lock = new Sprite(tex);
    lock.anchor?.set?.(aX, aY);
    lock.position.set(basePos.x, basePos.y);
    lock.width = w;
    lock.height = h;
    lock.alpha = 0;
    lock.zIndex = -1000;
    root.addChild(lock);

    const base: PixiSprite = new Sprite(tex);
    base.anchor?.set?.(aX, aY);
    base.position.set(basePos.x, basePos.y);
    base.zIndex = 0;
    root.addChild(base);

    const isTall = isTallKey(itemKey);
    const pipeline = buildMutationPipeline(variant.muts, isTall);
    const overlayPipeline = buildMutationPipeline(variant.overlayMuts, isTall);
    const iconPipeline = buildMutationPipeline(variant.selectedMuts, isTall);

    const disposables: PixiTexture[] = [];
    const dims: ComposeDims = { w, h, aX, aY, basePos };
    const baseName = baseNameOf(itemKey);
    const iconLayout = computeIconLayout(tex, baseName, isTall);

    const colorLayers = buildColorLayerSprites(
      tex,
      dims,
      pipeline,
      ctx.ctors,
      ctx.renderer,
      ctx.cacheState,
      ctx.cacheConfig,
      disposables
    );
    colorLayers.forEach((layer) => root.addChild(layer));

    const overlaySprites = buildOverlaySprites(
      itemKey,
      dims,
      overlayPipeline,
      ctx.textures,
      ctx.ctors,
      ctx.renderer,
      ctx.cacheState,
      ctx.cacheConfig,
      baseCanvas,
      disposables
    );
    overlaySprites.forEach((ov) => root.addChild(ov));

    const iconSprites = buildIconSprites(itemKey, dims, iconPipeline, ctx.textures, ctx.ctors, iconLayout);
    iconSprites.forEach((icon) => root.addChild(icon));

    // Unified Logical Resolution: Force resolution 1.
    // This ensures a 50px sprite always renders to a 50px canvas.
    const resolution = 1;

    // Create crop region to constrain output to exact dimensions.
    const { Rectangle } = ctx.ctors;
    const crop = Rectangle ? new Rectangle(0, 0, w, h) : undefined;

    let rt: any = null;
    if (typeof ctx.renderer.generateTexture === "function") {
      rt = ctx.renderer.generateTexture(root, { resolution, region: crop });
    } else if (ctx.renderer.textureGenerator?.generateTexture) {
      rt = ctx.renderer.textureGenerator.generateTexture({ target: root, resolution, region: crop });
    }

    if (!rt) throw new Error("no render texture");

    const outTex = rt instanceof Texture ? rt : Texture.from(ctx.renderer.extract.canvas(rt), { resolution });

    if (rt && rt !== outTex) {
      rt.destroy?.(true);
    }

    root.destroy({ children: true, texture: false, baseTexture: false });

    try {
      outTex.__mg_gen = true;
      outTex.label = `${itemKey}|${variant.sig}`;
    } catch { }

    return outTex;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Compose Animation Frames
// ─────────────────────────────────────────────────────────────────────────────

export function composeMutatedAnimation(
  frames: PixiTexture[],
  itemKey: string,
  variant: VariantSignature,
  ctx: ComposerContext
): PixiTexture[] | null {
  if (!frames || frames.length < 2) return null;

  const result: PixiTexture[] = [];

  for (const frame of frames) {
    const mutated = composeMutatedTexture(frame, itemKey, variant, ctx);
    if (mutated) {
      result.push(mutated);
    }
  }

  return result.length >= 2 ? result : null;
}
