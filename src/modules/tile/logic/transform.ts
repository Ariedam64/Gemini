// src/modules/tile/logic/transform.ts
// Coordinate transformation and point-to-tile conversion

import { tryDo } from "../../utils/helpers";
import type { TileView, TileTransform, PointToTileResult } from "../types";
import { state } from "../state";
import { tos, gidx } from "./helpers";
import { getTileViewAt } from "./tileview";

// ─────────────────────────────────────────────────────────────────────────────
// TileView Display Object Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getTileDisplay(tv: TileView): any | null {
  if (!tv) return null;

  const ok = (obj: any) =>
    obj && (typeof obj.getGlobalPosition === "function" || typeof obj.toGlobal === "function");

  const prefer = [
    "container",
    "root",
    "view",
    "tile",
    "ground",
    "base",
    "floor",
    "bg",
    "background",
    "baseSprite",
    "tileSprite",
    "displayObject",
    "gfx",
    "graphics",
    "sprite",
  ];

  for (const key of prefer) {
    if (ok(tv[key])) return tv[key];
  }
  if (ok(tv)) return tv;

  const known = [
    tv.container,
    tv.root,
    tv.view,
    tv.displayObject,
    tv.tileSprite,
    tv.gfx,
    tv.graphics,
    tv.sprite,
  ];
  for (const obj of known) {
    if (ok(obj)) return obj;
  }

  try {
    for (const key of Object.keys(tv)) {
      if (ok(tv[key])) return tv[key];
    }
  } catch {}

  return null;
}

export function getGlobalPos(disp: any): { x: number; y: number } | null {
  const p = tryDo(() => disp?.getGlobalPosition?.());
  if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) return { x: p.x, y: p.y };

  const q = tryDo(() => disp?.toGlobal?.({ x: 0, y: 0 }));
  if (q && Number.isFinite(q.x) && Number.isFinite(q.y)) return { x: q.x, y: q.y };

  return null;
}

export function detectAnchorMode(disp: any): "center" | "topleft" {
  try {
    if (!disp?.getBounds) return "center";
    const b = disp.getBounds();
    const gp = getGlobalPos(disp);
    if (!gp || !b || !Number.isFinite(b.width) || !Number.isFinite(b.height)) return "center";

    const cx = b.x + b.width / 2;
    const cy = b.y + b.height / 2;
    return Math.hypot(gp.x - cx, gp.y - cy) < Math.hypot(gp.x - b.x, gp.y - b.y)
      ? "center"
      : "topleft";
  } catch {
    return "center";
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Transform Building
// ─────────────────────────────────────────────────────────────────────────────

export function buildTileTransform(): TileTransform | null {
  const TOS = tos();
  const c = TOS?.map?.cols;
  const r = TOS?.map?.rows;

  if (!TOS || !Number.isFinite(c) || c <= 1) return null;

  const rr = Number.isFinite(r) && r > 1 ? r : null;

  const candidates: [number, number][] = [
    [0, 0],
    [1, 1],
    [Math.min(2, c - 2), 0],
    [0, 1],
  ];
  if (rr && rr > 2) candidates.push([Math.floor(c / 2), Math.floor(rr / 2)]);

  for (const [bx, by] of candidates) {
    if (bx < 0 || by < 0 || bx >= c) continue;
    if (rr && by >= rr) continue;

    const a = getTileViewAt(bx, by, true).tv;
    const b = bx + 1 < c ? getTileViewAt(bx + 1, by, true).tv : null;
    const d = getTileViewAt(bx, by + 1, true).tv;

    const da = getTileDisplay(a);
    const db = getTileDisplay(b);
    const dd = getTileDisplay(d);
    if (!da || !db || !dd) continue;

    const p0 = getGlobalPos(da);
    const p1 = getGlobalPos(db);
    const p2 = getGlobalPos(dd);
    if (!p0 || !p1 || !p2) continue;

    const vx = { x: p1.x - p0.x, y: p1.y - p0.y };
    const vy = { x: p2.x - p0.x, y: p2.y - p0.y };
    const det = vx.x * vy.y - vx.y * vy.x;
    if (!Number.isFinite(det) || Math.abs(det) < 1e-6) continue;

    const invDet = 1 / det;
    const inv = {
      a: vy.y * invDet,
      b: -vy.x * invDet,
      c: -vx.y * invDet,
      d: vx.x * invDet,
    };

    const origin = {
      x: p0.x - bx * vx.x - by * vy.x,
      y: p0.y - bx * vx.y - by * vy.y,
    };

    const anchorMode = detectAnchorMode(da);
    const originCenter =
      anchorMode === "center"
        ? origin
        : { x: origin.x + 0.5 * (vx.x + vy.x), y: origin.y + 0.5 * (vx.y + vy.y) };

    return { ok: true, cols: c, rows: rr, vx, vy, inv, anchorMode, originCenter };
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Transform Operations
// ─────────────────────────────────────────────────────────────────────────────

export function rebuildTransform(): { ok: boolean; xform: TileTransform | null } {
  state.xform = buildTileTransform();
  state.xformAt = Date.now();
  return { ok: !!state.xform?.ok, xform: state.xform };
}

export function pointToTile(
  point: { x: number; y: number },
  opts: { maxAgeMs?: number; forceRebuild?: boolean } = {}
): PointToTileResult | null {
  if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return null;

  const maxAgeMs: number = Number.isFinite(opts.maxAgeMs) ? Number(opts.maxAgeMs) : 1500;
  if (!state.xform?.ok || opts.forceRebuild || Date.now() - state.xformAt > maxAgeMs) {
    rebuildTransform();
  }

  const xf = state.xform;
  if (!xf?.ok) return null;

  const dx = point.x - xf.originCenter.x;
  const dy = point.y - xf.originCenter.y;

  const fx = xf.inv.a * dx + xf.inv.b * dy;
  const fy = xf.inv.c * dx + xf.inv.d * dy;

  const ix = Math.floor(fx);
  const iy = Math.floor(fy);
  const candidates: [number, number][] = [
    [ix, iy],
    [ix + 1, iy],
    [ix, iy + 1],
    [ix + 1, iy + 1],
  ];

  let best: PointToTileResult | null = null;
  let bestD2 = Infinity;

  for (const [tx, ty] of candidates) {
    if (tx < 0 || ty < 0 || tx >= xf.cols) continue;
    if (Number.isFinite(xf.rows) && xf.rows !== null && ty >= xf.rows) continue;

    const cx = xf.originCenter.x + tx * xf.vx.x + ty * xf.vy.x;
    const cy = xf.originCenter.y + tx * xf.vx.y + ty * xf.vy.y;
    const d2 = (point.x - cx) ** 2 + (point.y - cy) ** 2;

    if (d2 < bestD2) {
      bestD2 = d2;
      best = { tx, ty, fx, fy, x: point.x, y: point.y, gidx: null };
    }
  }

  if (!best) return null;
  best.gidx = gidx(best.tx, best.ty);
  return best;
}

export function tileToPoint(tx: number, ty: number): { x: number; y: number } | null {
  const xf = state.xform;
  if (!xf?.ok) return null;
  return {
    x: xf.originCenter.x + tx * xf.vx.x + ty * xf.vy.x,
    y: xf.originCenter.y + tx * xf.vx.y + ty * xf.vy.y,
  };
}
