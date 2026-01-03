// src/modules/tile/index.ts
// MGTile - TileObject API for the game grid

import type { TileTransform } from "./types";
import { isReady, state } from "./state";
import { initTileSystem } from "./logic/init";
import { engine, tos, gidx as getGidx } from "./logic/helpers";
import { getTileObject, setTileEmpty, setTilePlant, setTileDecor, setTileEgg, setTileObjectRaw, inspect } from "./logic/operations";
import { rebuildTransform, pointToTile, tileToPoint } from "./logic/transform";
import { MGPixiHooks } from "../pixi/logic/hooks";

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

function ensureReady(): void {
  if (!isReady()) throw new Error("MGTile: not ready. Call MGTile.init() first.");
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
    "MGTile.tileToPoint(tx,ty)",
  ].join("\n");
}

export const MGTile = {
  init: initTileSystem,
  isReady,

  hook: MGPixiHooks.hook,
  engine,
  tos,

  gidx: (tx: number, ty: number) => getGidx(Number(tx), Number(ty)),

  getTileObject: (tx: number, ty: number, opts = {}) => {
    ensureReady();
    return getTileObject(tx, ty, opts);
  },

  inspect: (tx: number, ty: number, opts = {}) => {
    ensureReady();
    return inspect(tx, ty, opts);
  },

  setTileEmpty: (tx: number, ty: number, opts = {}) => {
    ensureReady();
    return setTileEmpty(tx, ty, opts);
  },

  setTilePlant: (tx: number, ty: number, patch: any, opts = {}) => {
    ensureReady();
    return setTilePlant(tx, ty, patch, opts);
  },

  setTileDecor: (tx: number, ty: number, patch: any, opts = {}) => {
    ensureReady();
    return setTileDecor(tx, ty, patch, opts);
  },

  setTileEgg: (tx: number, ty: number, patch: any, opts = {}) => {
    ensureReady();
    return setTileEgg(tx, ty, patch, opts);
  },

  setTileObjectRaw: (tx: number, ty: number, objOrFn: any, opts = {}) => {
    ensureReady();
    return setTileObjectRaw(tx, ty, objOrFn, opts);
  },

  rebuildTransform: () => {
    ensureReady();
    return rebuildTransform();
  },

  pointToTile: (point: { x: number; y: number }, opts = {}) => {
    ensureReady();
    return pointToTile(point, opts);
  },

  tileToPoint: (tx: number, ty: number) => {
    ensureReady();
    return tileToPoint(tx, ty);
  },

  getTransform: (): TileTransform | null => {
    ensureReady();
    return state.xform;
  },

  help,
};
