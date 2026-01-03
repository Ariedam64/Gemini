// src/modules/pixi/logic/tilesets.ts
// TileSet management for filtering operations

import type { FilterOptions, TileView } from "../types";
import { state } from "../state";
import { isObj } from "./utils";
import { MGTile } from "../../tile";

// ─────────────────────────────────────────────────────────────────────────────
// Tile Normalization
// ─────────────────────────────────────────────────────────────────────────────

export function normTiles(tiles: any[]): { x: number; y: number }[] {
  if (!Array.isArray(tiles)) return [];
  const seen = new Set<string>();
  const out: { x: number; y: number }[] = [];

  for (const t of tiles) {
    let x: number, y: number;
    if (Array.isArray(t)) {
      x = t[0];
      y = t[1];
    } else if (isObj(t)) {
      x = (t as any).x ?? (t as any).tx;
      y = (t as any).y ?? (t as any).ty;
    } else {
      continue;
    }

    x = Number(x);
    y = Number(y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;

    x |= 0;
    y |= 0;
    const key = `${x},${y}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ x, y });
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// TileSet Management
// ─────────────────────────────────────────────────────────────────────────────

export function defineTileSet(
  name: string,
  tiles: any[]
): { ok: boolean; name: string; count: number } {
  const n = String(name || "").trim();
  if (!n) throw new Error("MGPixi.defineTileSet: empty name");
  const list = normTiles(tiles);
  state.tileSets.set(n, list);
  return { ok: true, name: n, count: list.length };
}

export function deleteTileSet(name: string): boolean {
  return state.tileSets.delete(String(name || "").trim());
}

export function listTileSets(): string[] {
  return Array.from(state.tileSets.keys()).sort((a, b) => a.localeCompare(b));
}

// ─────────────────────────────────────────────────────────────────────────────
// Filter Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function hasFilter(opts: FilterOptions): boolean {
  return !!(opts && (opts.tileSet != null || Array.isArray(opts.tiles)));
}

export function getEntries(filter: FilterOptions): {
  entries: [number, TileView][];
  gidxSet: Set<number> | null;
} {
  const TOS = MGTile.tos?.();
  const tileViews = TOS?.tileViews;
  if (!tileViews?.entries) throw new Error("MGPixi: TOS.tileViews not found");

  if (!hasFilter(filter)) {
    return { entries: Array.from(tileViews.entries()) as [number, TileView][], gidxSet: null };
  }

  let list: { x: number; y: number }[] = [];
  if (filter.tileSet != null) {
    const n = String(filter.tileSet || "").trim();
    const set = state.tileSets.get(n);
    if (!set) throw new Error(`MGPixi: tileSet not found "${n}"`);
    list = set;
  } else {
    list = normTiles(filter.tiles || []);
  }

  const map = new Map<number, TileView>();
  for (const p of list) {
    const info = MGTile.getTileObject(p.x, p.y, { ensureView: true, clone: false });
    if (info?.tileView && info.gidx != null) {
      map.set(info.gidx, info.tileView);
    }
  }

  return { entries: Array.from(map.entries()), gidxSet: new Set(map.keys()) };
}
