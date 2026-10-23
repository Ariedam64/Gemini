// src/modules/bugReport/logic/frameGrab.ts
// A picture of the game as the player sees it, for a bug report.
//
// The game's WebGL canvas does not keep its drawing buffer, so reading it at
// a random moment gives a blank image. Rendering the stage and copying the
// canvas in the same task gets a real frame without asking the browser for
// anything. When that still comes out blank (another backend, a lost
// context), the renderer's extract draws the stage into a texture instead,
// which costs a GPU round trip but does not depend on the buffer.
//
// Only the canvas is captured: the game's HTML menus and Gemini's HUD are not
// in it.

import { MGPixi } from "../../pixi";

type Drawable = CanvasImageSource & { width: number; height: number };
type UnknownRecord = Record<string, unknown>;

const DEFAULT_MAX_SIDE = 1920;
const PROBE_SIDE = 16;

const isRecord = (value: unknown): value is UnknownRecord => !!value && typeof value === "object";

/** Duck-typed, so a canvas from the page's realm counts too. */
function asCanvas(value: unknown): Drawable | null {
  if (!isRecord(value) || typeof value.getContext !== "function") return null;
  const { width, height } = value;
  if (typeof width !== "number" || typeof height !== "number" || width <= 0 || height <= 0) return null;
  return value as unknown as Drawable;
}

function canvasOf(renderer: UnknownRecord, app: unknown): Drawable | null {
  // Pixi v8 names it `canvas`; `view` is the v7 name, sometimes a wrapper.
  const view = renderer.view;
  const appRecord = isRecord(app) ? app : {};
  return (
    asCanvas(renderer.canvas) ??
    asCanvas(isRecord(view) ? view.canvas : null) ??
    asCanvas(view) ??
    asCanvas(appRecord.canvas) ??
    asCanvas(appRecord.view)
  );
}

/** A copy of `source` at most `maxSide` pixels on its longest side. */
function scaledCopy(source: Drawable, maxSide: number): HTMLCanvasElement | null {
  const scale = Math.min(1, maxSide / Math.max(source.width, source.height));
  const out = document.createElement("canvas");
  out.width = Math.max(1, Math.round(source.width * scale));
  out.height = Math.max(1, Math.round(source.height * scale));
  const ctx = out.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(source, 0, 0, out.width, out.height);
  return out;
}

/** True when every pixel of a small sample is fully transparent: the buffer was already cleared. */
function looksBlank(canvas: HTMLCanvasElement): boolean {
  const probe = document.createElement("canvas");
  probe.width = PROBE_SIDE;
  probe.height = PROBE_SIDE;
  const ctx = probe.getContext("2d", { willReadFrequently: true });
  if (!ctx) return false;
  ctx.drawImage(canvas, 0, 0, PROBE_SIDE, PROBE_SIDE);
  const data = ctx.getImageData(0, 0, PROBE_SIDE, PROBE_SIDE).data;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] !== 0) return false;
  }
  return true;
}

function extractFrame(renderer: UnknownRecord, stage: unknown, maxSide: number): HTMLCanvasElement | null {
  const extract = renderer.extract;
  if (!isRecord(extract) || typeof extract.canvas !== "function") return null;
  // Without a frame, extract takes the stage's whole bounds, the off-screen
  // world included. The screen rectangle keeps it to what the player sees.
  const frame = renderer.screen;
  const source: unknown = frame ? extract.canvas({ target: stage, frame }) : extract.canvas(stage);
  const canvas = asCanvas(source);
  return canvas ? scaledCopy(canvas, maxSide) : null;
}

/**
 * The game's current frame on a canvas, at most `maxSide` pixels on its
 * longest side, or null when the renderer is not there yet or cannot be
 * read. Never throws.
 */
export function grabGameFrame(maxSide: number = DEFAULT_MAX_SIDE): HTMLCanvasElement | null {
  try {
    const renderer: unknown = MGPixi.renderer;
    const app: unknown = MGPixi.app;
    if (!isRecord(renderer) || typeof renderer.render !== "function") return null;
    const stage: unknown = MGPixi.stage ?? (isRecord(app) ? app.stage : null);
    const canvas = canvasOf(renderer, app);
    if (!stage || !canvas) return null;

    renderer.render(stage);
    const copy = scaledCopy(canvas, maxSide);
    if (copy && !looksBlank(copy)) return copy;
    return extractFrame(renderer, stage, maxSide);
  } catch {
    return null;
  }
}
