// src/modules/tile/logic/operations.ts
// Tile manipulation operations

import type {
  TileObject,
  TileInfo,
  ApplyResult,
  PlantPatch,
  PlantSlotPatch,
  DecorPatch,
  EggPatch,
  TileOperationOptions,
} from "../types";
import { deepClone, engine } from "./helpers";
import { getTileViewAt, patchPlantSlot } from "./tileview";

// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────

export function assertType(obj: TileObject, type: string): void {
  if (!obj) throw new Error("MGTile: no tileObject on this tile");
  if (obj.objectType !== type) {
    throw new Error(`MGTile: expected objectType "${type}", got "${obj.objectType}"`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Core Apply Operation
// ─────────────────────────────────────────────────────────────────────────────

export function applyTileObject(
  tx: number,
  ty: number,
  nextObj: TileObject | null,
  opts: TileOperationOptions = {}
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

// ─────────────────────────────────────────────────────────────────────────────
// Get Tile Object
// ─────────────────────────────────────────────────────────────────────────────

export function getTileObject(tx: number, ty: number, opts: TileOperationOptions = {}): TileInfo {
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

// ─────────────────────────────────────────────────────────────────────────────
// Set Operations
// ─────────────────────────────────────────────────────────────────────────────

export function setTileEmpty(tx: number, ty: number, opts: TileOperationOptions = {}): ApplyResult {
  return applyTileObject(tx, ty, null, opts);
}

export function setTilePlant(tx: number, ty: number, patch: PlantPatch, opts: TileOperationOptions = {}): ApplyResult {
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

export function setTileDecor(tx: number, ty: number, patch: DecorPatch, opts: TileOperationOptions = {}): ApplyResult {
  const info = getTileObject(tx, ty, { ...opts, clone: false });
  const current = info.tileView?.tileObject;
  assertType(current, "decor");

  const next = deepClone(current);
  if ("rotation" in patch) next.rotation = Number(patch.rotation);
  return applyTileObject(tx, ty, next, opts);
}

export function setTileEgg(tx: number, ty: number, patch: EggPatch, opts: TileOperationOptions = {}): ApplyResult {
  const info = getTileObject(tx, ty, { ...opts, clone: false });
  const current = info.tileView?.tileObject;
  assertType(current, "egg");

  const next = deepClone(current);
  if ("plantedAt" in patch) next.plantedAt = Number(patch.plantedAt);
  if ("maturedAt" in patch) next.maturedAt = Number(patch.maturedAt);
  return applyTileObject(tx, ty, next, opts);
}

export function setTileObjectRaw(
  tx: number,
  ty: number,
  objOrFn: TileObject | ((current: TileObject) => TileObject),
  opts: TileOperationOptions = {}
): ApplyResult {
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

// ─────────────────────────────────────────────────────────────────────────────
// Inspect
// ─────────────────────────────────────────────────────────────────────────────

export function inspect(tx: number, ty: number, opts: TileOperationOptions = {}): any {
  const ensureView = opts.ensureView !== false;
  const { gidx: gi, tv } = getTileViewAt(Number(tx), Number(ty), ensureView);
  if (gi == null) throw new Error("MGTile: cols unavailable");
  if (!tv)
    return { ok: true, tx: Number(tx), ty: Number(ty), gidx: gi, tv: null, tileObject: undefined };

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
