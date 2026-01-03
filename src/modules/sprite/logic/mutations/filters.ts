// src/modules/sprite/mutations/filters.ts
// Color filters for mutations (Gold, Rainbow, Wet, etc.)

import type { MutationName } from "../../types";

// ─────────────────────────────────────────────────────────────────────────────
// Filter Definitions
// ─────────────────────────────────────────────────────────────────────────────

export interface FilterDef {
  op: GlobalCompositeOperation;
  colors: string[];
  a?: number;
  ang?: number;
  angTall?: number;
  masked?: boolean;
}

export const FILTERS: Record<MutationName, FilterDef> = {
  Gold: { op: "source-atop", colors: ["rgb(235,200,0)"], a: 0.7 },
  Rainbow: {
    op: "color",
    colors: ["#FF1744", "#FF9100", "#FFEA00", "#00E676", "#2979FF", "#D500F9"],
    ang: 130,
    angTall: 0,
    masked: true,
  },
  Wet: { op: "source-atop", colors: ["rgb(50,180,200)"], a: 0.25 },
  Chilled: { op: "source-atop", colors: ["rgb(100,160,210)"], a: 0.45 },
  Frozen: { op: "source-atop", colors: ["rgb(100,130,220)"], a: 0.5 },
  Dawnlit: { op: "source-atop", colors: ["rgb(209,70,231)"], a: 0.5 },
  Ambershine: { op: "source-atop", colors: ["rgb(190,100,40)"], a: 0.5 },
  Dawncharged: { op: "source-atop", colors: ["rgb(140,80,200)"], a: 0.5 },
  Ambercharged: { op: "source-atop", colors: ["rgb(170,60,25)"], a: 0.5 },
};

export function hasMutationFilter(name: string): name is MutationName {
  return Boolean(name && FILTERS[name as MutationName]);
}

// ─────────────────────────────────────────────────────────────────────────────
// Blend Mode Detection
// ─────────────────────────────────────────────────────────────────────────────

const SUPPORTED_BLEND_OPS: Set<string> = (() => {
  try {
    const c = document.createElement("canvas");
    const g = c.getContext("2d");
    if (!g) return new Set();

    const ops = ["color", "hue", "saturation", "luminosity", "overlay", "screen", "lighter", "source-atop"];
    const ok = new Set<string>();

    for (const op of ops) {
      g.globalCompositeOperation = op as GlobalCompositeOperation;
      if (g.globalCompositeOperation === op) ok.add(op);
    }

    return ok;
  } catch {
    return new Set<string>();
  }
})();

export function pickBlendOp(desired: string): GlobalCompositeOperation {
  if (SUPPORTED_BLEND_OPS.has(desired)) return desired as GlobalCompositeOperation;
  if (SUPPORTED_BLEND_OPS.has("overlay")) return "overlay";
  if (SUPPORTED_BLEND_OPS.has("screen")) return "screen";
  if (SUPPORTED_BLEND_OPS.has("lighter")) return "lighter";
  return "source-atop";
}

// ─────────────────────────────────────────────────────────────────────────────
// Gradient Helpers
// ─────────────────────────────────────────────────────────────────────────────

function angleGrad(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  ang: number,
  fullSpan = false
): CanvasGradient {
  const rad = ((ang - 90) * Math.PI) / 180;
  const cx = w / 2;
  const cy = h / 2;

  if (!fullSpan) {
    const R2 = Math.min(w, h) / 2;
    return ctx.createLinearGradient(
      cx - Math.cos(rad) * R2,
      cy - Math.sin(rad) * R2,
      cx + Math.cos(rad) * R2,
      cy + Math.sin(rad) * R2
    );
  }

  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  const R = (Math.abs(dx) * w) / 2 + (Math.abs(dy) * h) / 2;

  return ctx.createLinearGradient(cx - dx * R, cy - dy * R, cx + dx * R, cy + dy * R);
}

function fillGrad(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  f: FilterDef,
  fullSpan = false
): void {
  const cols = f.colors?.length ? f.colors : ["#fff"];
  const g = f.ang != null ? angleGrad(ctx, w, h, f.ang, fullSpan) : ctx.createLinearGradient(0, 0, 0, h);

  if (cols.length === 1) {
    g.addColorStop(0, cols[0]);
    g.addColorStop(1, cols[0]);
  } else {
    cols.forEach((c, i) => g.addColorStop(i / (cols.length - 1), c));
  }

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

// ─────────────────────────────────────────────────────────────────────────────
// Apply Filter
// ─────────────────────────────────────────────────────────────────────────────

export function applyFilterOnto(
  ctx: CanvasRenderingContext2D,
  sourceCanvas: HTMLCanvasElement,
  name: MutationName,
  isTall: boolean
): void {
  const base = FILTERS[name];
  if (!base) return;

  const f = { ...base };
  if (name === "Rainbow" && isTall && f.angTall != null) {
    f.ang = f.angTall;
  }

  const fullSpan = name === "Rainbow" && isTall;
  const w = sourceCanvas.width;
  const h = sourceCanvas.height;

  ctx.save();

  const blendOp = f.masked ? pickBlendOp(f.op) : "source-in";
  ctx.globalCompositeOperation = blendOp;
  if (f.a != null) ctx.globalAlpha = f.a;

  if (f.masked) {
    const m = document.createElement("canvas");
    m.width = w;
    m.height = h;
    const mctx = m.getContext("2d")!;
    mctx.imageSmoothingEnabled = false;
    fillGrad(mctx, w, h, f, fullSpan);
    mctx.globalCompositeOperation = "destination-in";
    mctx.drawImage(sourceCanvas, 0, 0);
    ctx.drawImage(m, 0, 0);
  } else {
    fillGrad(ctx, w, h, f, fullSpan);
  }

  ctx.restore();
}
