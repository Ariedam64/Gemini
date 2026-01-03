// src/modules/pixi/logic/mutations.ts
// Mutation highlighting system

import { tryDo } from "../../utils/helpers";
import type { MutationHighlightOptions } from "../types";
import { state } from "../state";
import { findSlotDisplays } from "./utils";
import { highlightPulse, stopHighlight, clearHighlights } from "./highlights";
import { getEntries } from "./tilesets";

// ─────────────────────────────────────────────────────────────────────────────
// Mutation Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function slotHasMutation(slot: any, wantLower: string): boolean {
  const muts = slot?.mutations;
  if (!Array.isArray(muts)) return false;
  for (const m of muts) {
    if (String(m || "").toLowerCase() === wantLower) return true;
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mutation Highlighting
// ─────────────────────────────────────────────────────────────────────────────

export function highlightMutation(mutation: string, opts: MutationHighlightOptions = {}): any {
  const mut = String(mutation || "").trim().toLowerCase();
  if (!mut) throw new Error("MGPixi.highlightMutation: empty mutation");

  const { entries, gidxSet } = getEntries(opts);
  const prefix = `hlmut:${mut}:`;

  if (opts.clear === true) {
    if (!gidxSet) {
      clearHighlights(prefix);
    } else {
      for (const key of Array.from(state.highlights.keys())) {
        if (!key.startsWith(prefix)) continue;
        const parts = key.split(":");
        const g = Number(parts[2]);
        if (gidxSet.has(g)) stopHighlight(key);
      }
    }
  }

  const hlOpts = {
    tint: (opts.tint ?? 0x7ff6ff) >>> 0,
    minAlpha: Number(opts.minAlpha ?? 0.12),
    maxAlpha: Number(opts.maxAlpha ?? 1.0),
    speed: Number(opts.speed ?? 1.25),
    tintMix: Number(opts.tintMix ?? 0.85),
    deepTint: opts.deepTint !== false,
  };

  let plants = 0,
    matchedSlots = 0,
    created = 0,
    failed = 0;

  for (const [gidx, tv] of entries) {
    const obj = tv?.tileObject;
    if (!obj || obj.objectType !== "plant") continue;

    const slots = obj.slots;
    if (!Array.isArray(slots) || slots.length === 0) continue;

    let any = false;
    const wanted: number[] = [];
    for (let i = 0; i < slots.length; i++) {
      if (slotHasMutation(slots[i], mut)) {
        wanted.push(i);
        any = true;
      }
    }
    if (!any) continue;

    plants++;
    matchedSlots += wanted.length;

    const base = tv?.childView?.plantVisual || tv?.childView || tv;
    const slotDisp = findSlotDisplays(base, slots.length);
    if (!slotDisp) {
      failed += wanted.length;
      continue;
    }

    for (const i of wanted) {
      const rootSlot = slotDisp[i];
      if (!rootSlot) {
        failed++;
        continue;
      }
      const key = `${prefix}${gidx}:${i}`;
      if (state.highlights.has(key)) continue;
      highlightPulse(rootSlot, { key, ...hlOpts });
      created++;
    }
  }

  return {
    ok: true,
    mutation: mut,
    filtered: !!gidxSet,
    plantsMatched: plants,
    matchedSlots,
    newHighlights: created,
    failedSlots: failed,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Mutation Watch System
// ─────────────────────────────────────────────────────────────────────────────

export function watchMutation(
  mutation: string,
  opts: MutationHighlightOptions & { intervalMs?: number } = {}
): any {
  const mut = String(mutation || "").trim().toLowerCase();
  if (!mut) throw new Error("MGPixi.watchMutation: empty mutation");

  const key = `watchmut:${mut}:${opts.tileSet ? `set:${opts.tileSet}` : opts.tiles ? "tiles" : "all"}`;
  const intervalMs = Number.isFinite(opts.intervalMs) ? opts.intervalMs : 1000;

  const prev = state.watches.get(key);
  if (prev) clearInterval(prev);

  const id = setInterval(() => {
    tryDo(() => highlightMutation(mut, { ...opts, clear: false }));
  }, intervalMs);

  state.watches.set(key, id);
  return { ok: true, key, mutation: mut, intervalMs };
}

export function stopWatchMutation(keyOrMutation: string): boolean {
  const k = String(keyOrMutation || "").trim();
  if (!k) return false;

  if (!k.startsWith("watchmut:")) {
    const mut = k.toLowerCase();
    let stopped = 0;
    for (const [wk, id] of Array.from(state.watches.entries())) {
      if (wk.startsWith(`watchmut:${mut}:`)) {
        clearInterval(id);
        state.watches.delete(wk);
        stopped++;
      }
    }
    return stopped > 0;
  }

  const id = state.watches.get(k);
  if (!id) return false;
  clearInterval(id);
  state.watches.delete(k);
  return true;
}
