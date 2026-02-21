import { MGPixi } from "../../../modules/pixi";
import { MGSprite } from "../../../modules/sprite";
import type { PixiTexture } from "../../../modules/sprite/types";

type PixiV8TextureLike = {
  source?: any;
  sourceDeprecated?: any;
  frame?: { x: number; y: number; width: number; height: number };
  rotate?: unknown;
  _rotate?: unknown;
};

function getRenderer(): any {
  try {
    return MGPixi.isReady() ? MGPixi.renderer : null;
  } catch {
    return null;
  }
}

function drawIntoAtlasFrame(
  atlas: HTMLCanvasElement,
  frame: { x: number; y: number; width: number; height: number },
  rotate: unknown,
  patch: HTMLCanvasElement
): void {
  const ctx = atlas.getContext("2d");
  if (!ctx) return;

  const fx = Math.max(0, Math.round(frame.x));
  const fy = Math.max(0, Math.round(frame.y));
  const fw = Math.max(1, Math.round(frame.width));
  const fh = Math.max(1, Math.round(frame.height));

  // Ensure we draw with the expected copy mode.
  try {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  } catch {}

  ctx.clearRect(fx, fy, fw, fh);
  ctx.imageSmoothingEnabled = false;

  const rotated = rotate === true || rotate === 2 || rotate === 8;
  if (!rotated) {
    ctx.drawImage(patch, 0, 0, patch.width, patch.height, fx, fy, fw, fh);
    return;
  }

  ctx.save();
  ctx.translate(fx + fw / 2, fy + fh / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.drawImage(patch, 0, 0, patch.width, patch.height, -fh / 2, -fw / 2, fh, fw);
  ctx.restore();
}

const atlasCanvasBySource = new WeakMap<object, HTMLCanvasElement>();

function ensureAtlasCanvas(source: any): HTMLCanvasElement | null {
  if (!source || typeof source !== "object" || !("resource" in source)) return null;

  const cached = atlasCanvasBySource.get(source as object);
  if (cached) {
    try {
      if ((source as any).resource !== cached) (source as any).resource = cached;
    } catch {}
    return cached;
  }

  const res = (source as any).resource as unknown;
  if (res instanceof HTMLCanvasElement) return res;

  if (res instanceof HTMLImageElement) {
    const c = document.createElement("canvas");
    c.width = Math.max(1, res.naturalWidth || res.width || (source as any).pixelWidth || 1);
    c.height = Math.max(1, res.naturalHeight || res.height || (source as any).pixelHeight || 1);
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(res, 0, 0, c.width, c.height);
    }
    (source as any).resource = c;
    atlasCanvasBySource.set(source as object, c);
    return c;
  }

  return null;
}

export function patchAtlasTexturePixels(spriteId: string, patchCanvas: HTMLCanvasElement): PixiTexture | null {
  const tex = (MGSprite as any)?._internal?.getTexture?.(spriteId) as PixiTexture | null;
  if (!tex) return null;

  const t = tex as unknown as PixiV8TextureLike;
  const source = t.source ?? t.sourceDeprecated ?? null;
  if (!source) return null;

  const fr = t.frame ?? null;
  if (!fr || typeof fr.x !== "number" || typeof fr.y !== "number") return null;

  const atlasCanvas = ensureAtlasCanvas(source);
  if (!atlasCanvas) return null;

  drawIntoAtlasFrame(atlasCanvas, fr, t.rotate ?? t._rotate ?? 0, patchCanvas);

  // Re-upload the texture source (Pixi v8 path)
  const renderer = getRenderer();
  // Mark as touched so v8 texture GC doesn't reclaim/skip it.
  try {
    (source as any)._touched = true;
  } catch {}
  try {
    if (typeof source.update === "function") source.update();
  } catch {}
  try {
    renderer?.texture?.update?.(source);
  } catch {}

  // Fallback: try updating via the stage renderer methods if present.
  try {
    renderer?.render?.(renderer.stage);
  } catch {}

  return tex;
}
