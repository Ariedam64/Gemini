// src/modules/pixi/tile.ts
// MGTile - TileObject API for the game grid

import { tryDo } from "../utils/helpers";
import { MGPixiHooks } from "./hooks";

// Types
type GameEngine = any;
type TileObjectSystem = any;
type TileView = any;
type TileObject = any;

interface TileInfo {
  tx: number;
  ty: number;
  gidx: number | null;
  tileView: TileView | null;
  tileObject?: TileObject;
}

interface ApplyResult {
  ok: boolean;
  tx: number;
  ty: number;
  gidx: number;
  before: TileObject;
  after: TileObject;
}

interface PointToTileResult {
  tx: number;
  ty: number;
  fx: number;
  fy: number;
  x: number;
  y: number;
  gidx: number | null;
}

interface TileTransform {
  ok: boolean;
  cols: number;
  rows: number | null;
  vx: { x: number; y: number };
  vy: { x: number; y: number };
  inv: { a: number; b: number; c: number; d: number };
  anchorMode: "center" | "topleft";
  originCenter: { x: number; y: number };
}

interface PlantSlotPatch {
  startTime?: number;
  endTime?: number;
  targetScale?: number;
  mutations?: string[];
}

interface PlantPatch {
  plantedAt?: number;
  maturedAt?: number;
  species?: string;
  slotIdx?: number;
  slotPatch?: PlantSlotPatch;
  slots?: PlantSlotPatch[] | Record<number, PlantSlotPatch>;
}

// State (local, no longer captures engine)
let _initPromise: Promise<boolean> | null = null;

const state = {
  ready: false,
  xform: null as TileTransform | null,
  xformAt: 0,
};

// ----- Helpers -----
function deepClone<T>(value: T): T {
  try {
    if (typeof structuredClone === "function") return structuredClone(value);
  } catch {}
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {}
  return value;
}

function tos(): TileObjectSystem | null {
  return MGPixiHooks.tos();
}

function engine(): GameEngine | null {
  return MGPixiHooks.engine();
}

function cols(): number | null {
  const c = tos()?.map?.cols;
  return Number.isFinite(c) && c > 0 ? c : null;
}

function gidx(tx: number, ty: number): number | null {
  const c = cols();
  if (!c) return null;
  return (ty * c + tx) | 0;
}

function getTileViewAt(tx: number, ty: number, ensure = true): { gidx: number | null; tv: TileView | null } {
  const TOS = tos();
  const gi = gidx(tx, ty);
  if (!TOS || gi == null) return { gidx: null, tv: null };

  let tv = TOS.tileViews?.get?.(gi) || null;
  if (!tv && ensure && typeof TOS.getOrCreateTileView === "function") {
    try {
      tv = TOS.getOrCreateTileView(gi);
    } catch {}
  }
  return { gidx: gi, tv: tv || null };
}

function applyTileObject(
  tx: number,
  ty: number,
  nextObj: TileObject | null,
  opts: { ensureView?: boolean; forceUpdate?: boolean } = {}
): ApplyResult {
  const ensureView = opts.ensureView !== false;
  const forceUpdate = opts.forceUpdate !== false;

  const eng = engine();
  const { gidx: gi, tv } = getTileViewAt(Number(tx), Number(ty), ensureView);

  if (gi == null) throw new Error("MGTile: cols unavailable (engine/TOS not ready)");
  if (!tv) throw new Error("MGTile: TileView unavailable (not instantiated)");

  const before = tv.tileObject;

  if (typeof tv.onDataChanged !== "function") {
    throw new Error("MGTile: tileView.onDataChanged not found (different API?)");
  }

  tv.onDataChanged(nextObj);

  if (forceUpdate && eng?.reusableContext && typeof tv.update === "function") {
    try {
      tv.update(eng.reusableContext);
    } catch {}
  }

  return { ok: true, tx: Number(tx), ty: Number(ty), gidx: gi, before, after: tv.tileObject };
}

function assertType(obj: TileObject, type: string): void {
  if (!obj) throw new Error("MGTile: no tileObject on this tile");
  if (obj.objectType !== type) {
    throw new Error(`MGTile: expected objectType "${type}", got "${obj.objectType}"`);
  }
}

function patchPlantSlot(slot: any, patch: PlantSlotPatch): void {
  if ("startTime" in patch) slot.startTime = Number(patch.startTime);
  if ("endTime" in patch) slot.endTime = Number(patch.endTime);
  if ("targetScale" in patch) slot.targetScale = Number(patch.targetScale);

  if ("mutations" in patch) {
    if (!Array.isArray(patch.mutations)) {
      throw new Error("MGTile: mutations must be an array of strings");
    }
    slot.mutations = patch.mutations.slice();
  }
}

function ensureReady(): void {
  if (!state.ready) throw new Error("MGTile: not ready. Call MGTile.init() first.");
}

// ----- pointToTile helpers -----
function getTileDisplay(tv: TileView): any | null {
  if (!tv) return null;

  const ok = (obj: any) =>
    obj && (typeof obj.getGlobalPosition === "function" || typeof obj.toGlobal === "function");

  const prefer = [
    "container", "root", "view", "tile", "ground", "base", "floor", "bg", "background",
    "baseSprite", "tileSprite", "displayObject", "gfx", "graphics", "sprite",
  ];

  for (const key of prefer) {
    if (ok(tv[key])) return tv[key];
  }
  if (ok(tv)) return tv;

  const known = [tv.container, tv.root, tv.view, tv.displayObject, tv.tileSprite, tv.gfx, tv.graphics, tv.sprite];
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

function getGlobalPos(disp: any): { x: number; y: number } | null {
  const p = tryDo(() => disp?.getGlobalPosition?.());
  if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) return { x: p.x, y: p.y };

  const q = tryDo(() => disp?.toGlobal?.({ x: 0, y: 0 }));
  if (q && Number.isFinite(q.x) && Number.isFinite(q.y)) return { x: q.x, y: q.y };

  return null;
}

function detectAnchorMode(disp: any): "center" | "topleft" {
  try {
    if (!disp?.getBounds) return "center";
    const b = disp.getBounds();
    const gp = getGlobalPos(disp);
    if (!gp || !b || !Number.isFinite(b.width) || !Number.isFinite(b.height)) return "center";

    const cx = b.x + b.width / 2;
    const cy = b.y + b.height / 2;
    return Math.hypot(gp.x - cx, gp.y - cy) < Math.hypot(gp.x - b.x, gp.y - b.y) ? "center" : "topleft";
  } catch {
    return "center";
  }
}

function buildTileTransform(): TileTransform | null {
  const TOS = tos();
  const c = TOS?.map?.cols;
  const r = TOS?.map?.rows;

  if (!TOS || !Number.isFinite(c) || c <= 1) return null;

  const rr = Number.isFinite(r) && r > 1 ? r : null;

  const candidates: [number, number][] = [
    [0, 0], [1, 1], [Math.min(2, c - 2), 0], [0, 1],
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

// ----- Public API -----
async function init(timeoutMs = 15000): Promise<boolean> {
  if (state.ready) return true;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    await MGPixiHooks.init(timeoutMs);
    if (!tos()) throw new Error("MGTile: engine captured but tileObject system not found");
    state.ready = true;
    return true;
  })();

  return _initPromise;
}

function hook(): { ok: boolean; engine: GameEngine | null; tos: TileObjectSystem | null; note?: string } {
  return MGPixiHooks.hook();
}

function getTileObject(
  tx: number,
  ty: number,
  opts: { ensureView?: boolean; clone?: boolean } = {}
): TileInfo {
  ensureReady();
  const ensureView = opts.ensureView !== false;
  const clone = opts.clone !== false;

  const { gidx: gi, tv } = getTileViewAt(Number(tx), Number(ty), ensureView);
  if (gi == null) throw new Error("MGTile: cols unavailable (engine not ready)");
  if (!tv) return { tx: Number(tx), ty: Number(ty), gidx: gi, tileView: null, tileObject: undefined };

  const obj = tv.tileObject;
  return {
    tx: Number(tx),
    ty: Number(ty),
    gidx: gi,
    tileView: tv,
    tileObject: clone ? deepClone(obj) : obj,
  };
}

function setTileEmpty(tx: number, ty: number, opts = {}): ApplyResult {
  ensureReady();
  return applyTileObject(tx, ty, null, opts);
}

function setTilePlant(tx: number, ty: number, patch: PlantPatch, opts = {}): ApplyResult {
  ensureReady();
  const info = getTileObject(tx, ty, { ...opts, clone: false });
  const current = info.tileView?.tileObject;
  assertType(current, "plant");

  const next = deepClone(current);
  if (!Array.isArray(next.slots)) next.slots = [];

  if ("plantedAt" in patch) next.plantedAt = Number(patch.plantedAt);
  if ("maturedAt" in patch) next.maturedAt = Number(patch.maturedAt);
  if ("species" in patch) next.species = String(patch.species);

  if ("slotIdx" in patch && "slotPatch" in patch) {
    const i = Number(patch.slotIdx) | 0;
    if (!next.slots[i]) throw new Error(`MGTile: plant slot ${i} doesn't exist`);
    patchPlantSlot(next.slots[i], patch.slotPatch!);
    return applyTileObject(tx, ty, next, opts);
  }

  if ("slots" in patch) {
    const slots = patch.slots;

    if (Array.isArray(slots)) {
      for (let i = 0; i < slots.length; i++) {
        if (slots[i] == null) continue;
        if (!next.slots[i]) throw new Error(`MGTile: plant slot ${i} doesn't exist`);
        patchPlantSlot(next.slots[i], slots[i]!);
      }
    } else if (slots && typeof slots === "object") {
      for (const key of Object.keys(slots)) {
        const i = Number(key) | 0;
        if (!Number.isFinite(i)) continue;
        if (!next.slots[i]) throw new Error(`MGTile: plant slot ${i} doesn't exist`);
        patchPlantSlot(next.slots[i], (slots as Record<number, PlantSlotPatch>)[i]);
      }
    } else {
      throw new Error("MGTile: patch.slots must be array or object map");
    }

    return applyTileObject(tx, ty, next, opts);
  }

  return applyTileObject(tx, ty, next, opts);
}

function setTileDecor(tx: number, ty: number, patch: { rotation?: number }, opts = {}): ApplyResult {
  ensureReady();
  const info = getTileObject(tx, ty, { ...opts, clone: false });
  const current = info.tileView?.tileObject;
  assertType(current, "decor");

  const next = deepClone(current);
  if ("rotation" in patch) next.rotation = Number(patch.rotation);
  return applyTileObject(tx, ty, next, opts);
}

function setTileEgg(
  tx: number,
  ty: number,
  patch: { plantedAt?: number; maturedAt?: number },
  opts = {}
): ApplyResult {
  ensureReady();
  const info = getTileObject(tx, ty, { ...opts, clone: false });
  const current = info.tileView?.tileObject;
  assertType(current, "egg");

  const next = deepClone(current);
  if ("plantedAt" in patch) next.plantedAt = Number(patch.plantedAt);
  if ("maturedAt" in patch) next.maturedAt = Number(patch.maturedAt);
  return applyTileObject(tx, ty, next, opts);
}

function setTileObjectRaw(
  tx: number,
  ty: number,
  objOrFn: TileObject | ((current: TileObject) => TileObject),
  opts: { ensureView?: boolean; forceUpdate?: boolean } = {}
): ApplyResult {
  ensureReady();
  const ensureView = opts.ensureView !== false;
  const forceUpdate = opts.forceUpdate !== false;

  const eng = engine();
  const { gidx: gi, tv } = getTileViewAt(Number(tx), Number(ty), ensureView);
  if (gi == null) throw new Error("MGTile: cols unavailable (engine not ready)");
  if (!tv) throw new Error("MGTile: TileView unavailable");

  const before = tv.tileObject;
  const next = typeof objOrFn === "function" ? objOrFn(deepClone(before)) : objOrFn;

  tv.onDataChanged(next);
  if (forceUpdate && eng?.reusableContext && typeof tv.update === "function") {
    try {
      tv.update(eng.reusableContext);
    } catch {}
  }

  return { ok: true, tx: Number(tx), ty: Number(ty), gidx: gi, before, after: tv.tileObject };
}

function inspect(tx: number, ty: number, opts: { ensureView?: boolean; clone?: boolean } = {}): any {
  ensureReady();
  const ensureView = opts.ensureView !== false;
  const { gidx: gi, tv } = getTileViewAt(Number(tx), Number(ty), ensureView);
  if (gi == null) throw new Error("MGTile: cols unavailable");
  if (!tv) return { ok: true, tx: Number(tx), ty: Number(ty), gidx: gi, tv: null, tileObject: undefined };

  const clone = opts.clone !== false;
  const obj = tv.tileObject;

  return {
    ok: true,
    tx: Number(tx),
    ty: Number(ty),
    gidx: gi,
    objectType: obj?.objectType ?? null,
    tileObject: clone ? deepClone(obj) : obj,
    tvKeys: Object.keys(tv || {}).sort(),
    tileView: tv,
  };
}

function rebuildTransform(): { ok: boolean; xform: TileTransform | null } {
  ensureReady();
  state.xform = buildTileTransform();
  state.xformAt = Date.now();
  return { ok: !!state.xform?.ok, xform: state.xform };
}

function pointToTile(
  point: { x: number; y: number },
  opts: { maxAgeMs?: number; forceRebuild?: boolean } = {}
): PointToTileResult | null {
  ensureReady();
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
  const candidates: [number, number][] = [[ix, iy], [ix + 1, iy], [ix, iy + 1], [ix + 1, iy + 1]];

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

function help(): string {
  return [
    "MGTile.init()",
    "MGTile.hook()",
    "MGTile.getTileObject(tx,ty) / inspect(tx,ty)",
    "MGTile.setTileEmpty(tx,ty)",
    "MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg",
    "MGTile.setTileObjectRaw(tx,ty,objOrFn)",
    "MGTile.rebuildTransform() / pointToTile({x,y})",
  ].join("\n");
}

export const MGTile = {
  init,
  ready: () => state.ready,

  hook,
  engine: () => engine(),
  tos: () => tos(),

  gidx: (tx: number, ty: number) => gidx(Number(tx), Number(ty)),

  getTileObject,
  inspect,

  setTileEmpty,
  setTilePlant,
  setTileDecor,
  setTileEgg,
  setTileObjectRaw,

  rebuildTransform,
  pointToTile,

  help,
};
