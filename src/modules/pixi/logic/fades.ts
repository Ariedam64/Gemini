// src/modules/pixi/logic/fades.ts
// Fade system for species filtering

import { tryDo, clamp } from "../../utils/helpers";
import type { FadeOptions, DisplayObject, TileView } from "../types";
import { state } from "../state";
import { hasAlpha, pickDisp, collectAlpha } from "./utils";
import { getEntries, hasFilter } from "./tilesets";

// ─────────────────────────────────────────────────────────────────────────────
// Plant Root Resolution
// ─────────────────────────────────────────────────────────────────────────────

export function resolvePlantRoot(tv: TileView): DisplayObject | null {
  const base =
    tv?.childView?.plantVisual ||
    tv?.childView?.cropVisual ||
    tv?.childView ||
    tv?.displayObject ||
    tv;
  return pickDisp(base) || pickDisp(tv?.displayObject) || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Fade Management
// ─────────────────────────────────────────────────────────────────────────────

export function stopFade(key: string): boolean {
  const entry = state.fades.get(key);
  if (!entry) return false;

  for (const t of entry.targets) {
    if (t.o && hasAlpha(t.o) && Number.isFinite(t.baseAlpha)) {
      tryDo(() => {
        t.o.alpha = t.baseAlpha;
      });
    }
  }
  state.fades.delete(key);
  return true;
}

export function clearFades(prefix: string | null = null): boolean {
  for (const key of Array.from(state.fades.keys())) {
    if (prefix && !String(key).startsWith(prefix)) continue;
    stopFade(key);
  }
  return true;
}

export function clearSpeciesFade(species: string, opts: FadeOptions = {}): boolean {
  const sp = String(species || "").trim().toLowerCase();
  if (!sp) throw new Error("MGPixi.clearSpeciesFade: empty species");

  const prefix = `fade:${sp}:`;

  if (!hasFilter(opts)) return clearFades(prefix);

  const { gidxSet } = getEntries(opts);
  if (!gidxSet) return clearFades(prefix);

  for (const key of Array.from(state.fades.keys())) {
    if (!key.startsWith(prefix)) continue;
    const g = Number(key.slice(prefix.length));
    if (gidxSet.has(g)) stopFade(key);
  }
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Fade Species
// ─────────────────────────────────────────────────────────────────────────────

export function fadeSpecies(species: string, opts: FadeOptions = {}): any {
  const sp = String(species || "").trim().toLowerCase();
  if (!sp) throw new Error("MGPixi.fadeSpecies: empty species");

  const alpha = clamp(Number(opts.alpha ?? 0.2), 0, 1);
  const deep = opts.deep === true;

  const { entries, gidxSet } = getEntries(opts);
  const prefix = `fade:${sp}:`;

  if (opts.clear === true) clearSpeciesFade(sp, opts);

  let plantsSeen = 0,
    matched = 0,
    applied = 0,
    failed = 0;

  for (const [gidx, tv] of entries) {
    const obj = tv?.tileObject;
    if (!obj || obj.objectType !== "plant") continue;
    plantsSeen++;

    const s = String(obj.species || "").trim().toLowerCase();
    if (!s || s !== sp) continue;
    matched++;

    const rootDisp = resolvePlantRoot(tv);
    if (!rootDisp || !hasAlpha(rootDisp)) {
      failed++;
      continue;
    }

    const key = `${prefix}${gidx}`;
    if (state.fades.has(key)) {
      tryDo(() => {
        rootDisp.alpha = alpha;
      });
      applied++;
      continue;
    }

    const targets = deep ? collectAlpha(rootDisp) : [rootDisp];
    const snap: { o: DisplayObject; baseAlpha: number }[] = [];
    for (const o of targets) {
      if (hasAlpha(o)) snap.push({ o, baseAlpha: Number(o.alpha) });
    }

    for (const t of snap)
      tryDo(() => {
        t.o.alpha = alpha;
      });
    state.fades.set(key, { targets: snap });
    applied++;
  }

  return {
    ok: true,
    species: sp,
    alpha,
    deep,
    filtered: !!gidxSet,
    plantsSeen,
    matchedPlants: matched,
    applied,
    failed,
    totalFades: state.fades.size,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Fade Watch System
// ─────────────────────────────────────────────────────────────────────────────

export function watchFadeSpecies(
  species: string,
  opts: FadeOptions & { intervalMs?: number } = {}
): any {
  const sp = String(species || "").trim().toLowerCase();
  if (!sp) throw new Error("MGPixi.watchFadeSpecies: empty species");

  const key = `watchfade:${sp}:${opts.tileSet ? `set:${opts.tileSet}` : opts.tiles ? "tiles" : "all"}`;
  const intervalMs = Number.isFinite(opts.intervalMs) ? opts.intervalMs : 1000;

  const prev = state.fadeWatches.get(key);
  if (prev) clearInterval(prev);

  const id = setInterval(() => {
    tryDo(() => fadeSpecies(sp, { ...opts, clear: false }));
  }, intervalMs);

  state.fadeWatches.set(key, id);
  return { ok: true, key, species: sp, intervalMs };
}

export function stopWatchFadeSpecies(keyOrSpecies: string): boolean {
  const k = String(keyOrSpecies || "").trim();
  if (!k) return false;

  if (!k.startsWith("watchfade:")) {
    const sp = k.toLowerCase();
    let stopped = 0;
    for (const [wk, id] of Array.from(state.fadeWatches.entries())) {
      if (wk.startsWith(`watchfade:${sp}:`)) {
        clearInterval(id);
        state.fadeWatches.delete(wk);
        stopped++;
      }
    }
    return stopped > 0;
  }

  const id = state.fadeWatches.get(k);
  if (!id) return false;
  clearInterval(id);
  state.fadeWatches.delete(k);
  return true;
}
