// src/modules/pixi/pixi.ts
// MGPixi - Pixi.js utilities (highlights, fades, inspection)

import { tryDo, clamp } from "../utils/helpers";
import { pageWindow } from "../../utils/windowContext";
import { MGPixiHooks } from "./hooks";
import { MGTile } from "./tile";

// Types
type PixiApp = any;
type PixiRenderer = any;
type PixiTicker = any;
type DisplayObject = any;
type TileView = any;

interface HighlightEntry {
  root: DisplayObject;
  tick: () => void;
  baseAlpha: number | null;
  tint: { o: DisplayObject; baseTint: number }[];
}

interface FadeEntry {
  targets: { o: DisplayObject; baseAlpha: number }[];
}

interface HighlightOptions {
  key?: string;
  tint?: number;
  minAlpha?: number;
  maxAlpha?: number;
  speed?: number;
  tintMix?: number;
  deepTint?: boolean;
}

interface FilterOptions {
  tileSet?: string;
  tiles?: Array<{ x: number; y: number } | [number, number]>;
}

interface MutationHighlightOptions extends HighlightOptions, FilterOptions {
  clear?: boolean;
}

interface FadeOptions extends FilterOptions {
  alpha?: number;
  deep?: boolean;
  clear?: boolean;
}

// State
const state = {
  ready: false,
  app: null as PixiApp | null,
  renderer: null as PixiRenderer | null,
  stage: null as any,
  ticker: null as PixiTicker | null,

  tileSets: new Map<string, { x: number; y: number }[]>(),
  highlights: new Map<string, HighlightEntry>(),
  watches: new Map<string, ReturnType<typeof setInterval>>(),

  fades: new Map<string, FadeEntry>(),
  fadeWatches: new Map<string, ReturnType<typeof setInterval>>(),
};

// ----- Utils -----
type AnyRecord = Record<string, unknown>;
const isObj = (v: unknown): v is AnyRecord => !!v && typeof v === "object" && !Array.isArray(v);
const isDisp = (o: any): boolean => !!(o && typeof o.getBounds === "function" && ("parent" in o || "children" in o));
const hasTint = (o: any): boolean => !!(o && typeof o.tint === "number");
const hasAlpha = (o: any): boolean => !!(o && typeof o.alpha === "number");

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(c0: number, c1: number, t: number): number {
  const r0 = (c0 >> 16) & 255;
  const g0 = (c0 >> 8) & 255;
  const b0 = c0 & 255;
  const r1 = (c1 >> 16) & 255;
  const g1 = (c1 >> 8) & 255;
  const b1 = c1 & 255;
  const r = lerp(r0, r1, t) | 0;
  const g = lerp(g0, g1, t) | 0;
  const b = lerp(b0, b1, t) | 0;
  return (r << 16) | (g << 8) | b;
}

// ----- Traversal -----
function collectTint(rootDisp: DisplayObject, cap = 900): DisplayObject[] {
  const out: DisplayObject[] = [];
  const stack = [rootDisp];
  while (stack.length && out.length < cap) {
    const node = stack.pop();
    if (!node) continue;
    if (hasTint(node)) out.push(node);
    const children = node.children;
    if (Array.isArray(children)) {
      for (let i = children.length - 1; i >= 0; i--) stack.push(children[i]);
    }
  }
  return out;
}

function collectAlpha(rootDisp: DisplayObject, cap = 25000): DisplayObject[] {
  const out: DisplayObject[] = [];
  const stack = [rootDisp];
  let guard = 0;
  while (stack.length && guard++ < cap) {
    const node = stack.pop();
    if (!node) continue;
    if (hasAlpha(node)) out.push(node);
    const children = node.children;
    if (Array.isArray(children)) {
      for (let i = children.length - 1; i >= 0; i--) stack.push(children[i]);
    }
  }
  return out;
}

// ----- TileSets -----
function normTiles(tiles: any[]): { x: number; y: number }[] {
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

function defineTileSet(name: string, tiles: any[]): { ok: boolean; name: string; count: number } {
  const n = String(name || "").trim();
  if (!n) throw new Error("MGPixi.defineTileSet: empty name");
  const list = normTiles(tiles);
  state.tileSets.set(n, list);
  return { ok: true, name: n, count: list.length };
}

function deleteTileSet(name: string): boolean {
  return state.tileSets.delete(String(name || "").trim());
}

function listTileSets(): string[] {
  return Array.from(state.tileSets.keys()).sort((a, b) => a.localeCompare(b));
}

function hasFilter(opts: FilterOptions): boolean {
  return !!(opts && (opts.tileSet != null || Array.isArray(opts.tiles)));
}

function getEntries(filter: FilterOptions): { entries: [number, TileView][]; gidxSet: Set<number> | null } {
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

// ----- Highlights -----
function stopHighlight(key: string): boolean {
  const entry = state.highlights.get(key);
  if (!entry) return false;

  tryDo(() => state.ticker?.remove(entry.tick));
  if (entry.root && entry.baseAlpha != null && hasAlpha(entry.root)) {
    tryDo(() => { entry.root.alpha = entry.baseAlpha!; });
  }
  for (const t of entry.tint) {
    if (t.o && hasTint(t.o)) tryDo(() => { t.o.tint = t.baseTint; });
  }
  state.highlights.delete(key);
  return true;
}

function clearHighlights(prefix: string | null = null): boolean {
  for (const key of Array.from(state.highlights.keys())) {
    if (prefix && !String(key).startsWith(prefix)) continue;
    stopHighlight(key);
  }
  return true;
}

function highlightPulse(rootDisp: DisplayObject, opts: HighlightOptions = {}): string {
  ensure();
  if (!isDisp(rootDisp)) throw new Error("MGPixi.highlightPulse: invalid root");

  const key = String(opts.key || `hl:${Math.random().toString(16).slice(2)}`);
  if (state.highlights.has(key)) return key;

  const baseAlpha = hasAlpha(rootDisp) ? Number(rootDisp.alpha) : null;
  const minA = clamp(Number(opts.minAlpha ?? 0.12), 0, 1);
  const maxA = clamp(Number(opts.maxAlpha ?? 1.0), 0, 1);
  const speed = Number(opts.speed ?? 1.25);
  const tint = (opts.tint ?? 0x7ff6ff) >>> 0;
  const tintMix = clamp(Number(opts.tintMix ?? 0.85), 0, 1);
  const deepTint = opts.deepTint !== false;

  const tintTargets: { o: DisplayObject; baseTint: number }[] = [];
  if (deepTint) {
    for (const o of collectTint(rootDisp)) {
      tintTargets.push({ o, baseTint: o.tint });
    }
  } else if (hasTint(rootDisp)) {
    tintTargets.push({ o: rootDisp, baseTint: rootDisp.tint });
  }

  const start = performance.now();
  const tick = () => {
    const t = (performance.now() - start) / 1000;
    const s = (Math.sin(t * Math.PI * 2 * speed) + 1) / 2;
    const e = s * s * (3 - 2 * s);

    if (baseAlpha != null && hasAlpha(rootDisp)) {
      rootDisp.alpha = clamp(lerp(minA, maxA, e) * baseAlpha, 0, 1);
    }

    const mix = e * tintMix;
    for (const tt of tintTargets) {
      if (tt.o && hasTint(tt.o)) tt.o.tint = lerpColor(tt.baseTint, tint, mix);
    }
  };

  state.ticker?.add(tick);
  state.highlights.set(key, { root: rootDisp, tick, baseAlpha, tint: tintTargets });
  return key;
}

// ----- Slot resolver -----
const DISP_KEYS = [
  "plantVisual", "cropVisual", "slotVisual", "slotView", "displayObject",
  "view", "container", "root", "sprite", "gfx", "graphics",
];

function pickDisp(node: unknown): DisplayObject | null {
  if (!node) return null;
  if (isDisp(node)) return node;
  if (!isObj(node)) return null;
  for (const key of DISP_KEYS) {
    const v = node[key];
    if (isDisp(v)) return v;
  }
  return null;
}

function findSlotDisplays(base: any, slotCount: number): DisplayObject[] | null {
  const queue: { o: unknown; d: number }[] = [{ o: base, d: 0 }];
  const seen = new Set();
  const maxDepth = 6;

  while (queue.length) {
    const { o, d } = queue.shift()!;
    if (!o || d > maxDepth) continue;
    if (seen.has(o)) continue;
    seen.add(o);

    if (Array.isArray(o)) {
      if (o.length === slotCount) {
        const arr: DisplayObject[] = new Array(slotCount);
        let ok = true;
        for (let i = 0; i < slotCount; i++) {
          const disp = pickDisp(o[i]);
          if (!disp) { ok = false; break; }
          arr[i] = disp;
        }
        if (ok) return arr;
      }
      for (const item of o) queue.push({ o: item, d: d + 1 });
      continue;
    }

    if (isObj(o)) {
      const obj = o as AnyRecord;
      for (const key of Object.keys(obj)) queue.push({ o: obj[key], d: d + 1 });
    }
  }
  return null;
}

function slotHasMutation(slot: any, wantLower: string): boolean {
  const muts = slot?.mutations;
  if (!Array.isArray(muts)) return false;
  for (const m of muts) {
    if (String(m || "").toLowerCase() === wantLower) return true;
  }
  return false;
}

// ----- Mutation highlighting -----
function highlightMutation(mutation: string, opts: MutationHighlightOptions = {}): any {
  ensure();
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

  const hlOpts: HighlightOptions = {
    tint: (opts.tint ?? 0x7ff6ff) >>> 0,
    minAlpha: Number(opts.minAlpha ?? 0.12),
    maxAlpha: Number(opts.maxAlpha ?? 1.0),
    speed: Number(opts.speed ?? 1.25),
    tintMix: Number(opts.tintMix ?? 0.85),
    deepTint: opts.deepTint !== false,
  };

  let plants = 0, matchedSlots = 0, created = 0, failed = 0;

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
      if (!rootSlot) { failed++; continue; }
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

function watchMutation(mutation: string, opts: MutationHighlightOptions & { intervalMs?: number } = {}): any {
  ensure();
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

function stopWatchMutation(keyOrMutation: string): boolean {
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

// ----- Inspect tile -----
function summarizePlant(obj: any): any {
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

function inspectTile(tx: number, ty: number, opts: { ensureView?: boolean; log?: boolean } = {}): any {
  ensure();
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
    summary: obj?.objectType === "plant" ? summarizePlant(obj) : obj ? { objectType: obj.objectType ?? null } : null,
    display: tv ? tv.childView?.plantVisual || tv.childView || tv.displayObject || tv : null,
  };

  if (opts.log !== false) {
    tryDo(() => console.log("[MGPixi.inspectTile]", res));
  }

  return res;
}

// ----- Fades -----
function resolvePlantRoot(tv: TileView): DisplayObject | null {
  const base = tv?.childView?.plantVisual || tv?.childView?.cropVisual || tv?.childView || tv?.displayObject || tv;
  return pickDisp(base) || pickDisp(tv?.displayObject) || null;
}

function stopFade(key: string): boolean {
  const entry = state.fades.get(key);
  if (!entry) return false;

  for (const t of entry.targets) {
    if (t.o && hasAlpha(t.o) && Number.isFinite(t.baseAlpha)) {
      tryDo(() => { t.o.alpha = t.baseAlpha; });
    }
  }
  state.fades.delete(key);
  return true;
}

function clearFades(prefix: string | null = null): boolean {
  for (const key of Array.from(state.fades.keys())) {
    if (prefix && !String(key).startsWith(prefix)) continue;
    stopFade(key);
  }
  return true;
}

function clearSpeciesFade(species: string, opts: FilterOptions = {}): boolean {
  ensure();
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

function fadeSpecies(species: string, opts: FadeOptions = {}): any {
  ensure();
  const sp = String(species || "").trim().toLowerCase();
  if (!sp) throw new Error("MGPixi.fadeSpecies: empty species");

  const alpha = clamp(Number(opts.alpha ?? 0.2), 0, 1);
  const deep = opts.deep === true;

  const { entries, gidxSet } = getEntries(opts);
  const prefix = `fade:${sp}:`;

  if (opts.clear === true) clearSpeciesFade(sp, opts);

  let plantsSeen = 0, matched = 0, applied = 0, failed = 0;

  for (const [gidx, tv] of entries) {
    const obj = tv?.tileObject;
    if (!obj || obj.objectType !== "plant") continue;
    plantsSeen++;

    const s = String(obj.species || "").trim().toLowerCase();
    if (!s || s !== sp) continue;
    matched++;

    const rootDisp = resolvePlantRoot(tv);
    if (!rootDisp || !hasAlpha(rootDisp)) { failed++; continue; }

    const key = `${prefix}${gidx}`;
    if (state.fades.has(key)) {
      tryDo(() => { rootDisp.alpha = alpha; });
      applied++;
      continue;
    }

    const targets = deep ? collectAlpha(rootDisp) : [rootDisp];
    const snap: { o: DisplayObject; baseAlpha: number }[] = [];
    for (const o of targets) {
      if (hasAlpha(o)) snap.push({ o, baseAlpha: Number(o.alpha) });
    }

    for (const t of snap) tryDo(() => { t.o.alpha = alpha; });
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

function watchFadeSpecies(species: string, opts: FadeOptions & { intervalMs?: number } = {}): any {
  ensure();
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

function stopWatchFadeSpecies(keyOrSpecies: string): boolean {
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

// ----- Expose -----
function expose(): any {
  const root = pageWindow as any;
  root.$PIXI = root.PIXI || null;
  root.$app = state.app || null;
  root.$renderer = state.renderer || null;
  root.$stage = state.stage || null;
  root.$ticker = state.ticker || null;

  root.__MG_PIXI__ = {
    PIXI: root.$PIXI,
    app: root.$app,
    renderer: root.$renderer,
    stage: root.$stage,
    ticker: root.$ticker,
    ready: state.ready,
  };

  return root.__MG_PIXI__;
}

function ensure(): void {
  if (!state.ready) throw new Error("MGPixi: call MGPixi.init() first");
}

async function init(timeoutMs = 15000): Promise<boolean> {
  if (state.ready) {
    expose();
    return true;
  }

  await MGPixiHooks.init(timeoutMs);

  state.app = MGPixiHooks.app();
  state.ticker = MGPixiHooks.ticker();
  state.renderer = MGPixiHooks.renderer();
  state.stage = MGPixiHooks.stage();

  if (!state.app || !state.ticker) throw new Error("MGPixi: PIXI app/ticker not found");

  state.ready = true;
  expose();
  return true;
}

export const MGPixi = {
  init,
  ready: () => state.ready,
  expose,

  get app() { return state.app; },
  get renderer() { return state.renderer; },
  get stage() { return state.stage; },
  get ticker() { return state.ticker; },
  get PIXI() { return (pageWindow as any).PIXI || null; },

  defineTileSet,
  deleteTileSet,
  listTileSets,

  highlightPulse,
  stopHighlight,
  clearHighlights,

  highlightMutation,
  watchMutation,
  stopWatchMutation,

  inspectTile,

  fadeSpecies,
  clearSpeciesFade,
  clearFades,
  watchFadeSpecies,
  stopWatchFadeSpecies,
};
