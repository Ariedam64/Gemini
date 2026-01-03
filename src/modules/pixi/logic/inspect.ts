// src/modules/pixi/logic/inspect.ts
// Tile inspection utilities

import { tryDo } from "../../utils/helpers";
import { MGTile } from "../../tile";

// ─────────────────────────────────────────────────────────────────────────────
// Plant Summarization
// ─────────────────────────────────────────────────────────────────────────────

export function summarizePlant(obj: any): any {
  const slots = Array.isArray(obj?.slots) ? obj.slots : [];
  return {
    objectType: "plant",
    species: obj?.species ?? null,
    plantedAt: obj?.plantedAt ?? null,
    maturedAt: obj?.maturedAt ?? null,
    slotCount: slots.length,
    slots: slots.map((s: any, i: number) => ({
      idx: i,
      mutations: Array.isArray(s?.mutations) ? s.mutations.slice() : [],
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Tile Inspection
// ─────────────────────────────────────────────────────────────────────────────

export function inspectTile(
  tx: number,
  ty: number,
  opts: { ensureView?: boolean; log?: boolean } = {}
): any {
  const x = Number(tx) | 0;
  const y = Number(ty) | 0;
  const ensureView = opts.ensureView !== false;

  const info = MGTile.getTileObject(x, y, { ensureView, clone: false });
  const tv = info?.tileView || null;
  const obj = tv?.tileObject;

  const res = {
    ok: true,
    tx: x,
    ty: y,
    gidx: info?.gidx ?? MGTile.gidx?.(x, y) ?? null,
    hasTileView: !!tv,
    objectType: obj?.objectType ?? null,
    tileObject: obj ?? null,
    summary:
      obj?.objectType === "plant"
        ? summarizePlant(obj)
        : obj
          ? { objectType: obj.objectType ?? null }
          : null,
    display: tv ? tv.childView?.plantVisual || tv.childView || tv.displayObject || tv : null,
  };

  if (opts.log !== false) {
    tryDo(() => console.log("[MGPixi.inspectTile]", res));
  }

  return res;
}
