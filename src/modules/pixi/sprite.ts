// src/modules/pixi/sprite.ts
// MGSprite - Sprite/texture management for Pixi.js

import { sleep, waitWithTimeout } from "../utils/helpers";
import { getJSON, getBlob, blobToImage } from "../utils/network";
import { joinPath, relPath } from "../utils/path";
import { pageWindow } from "../../utils/pageContext";
import { MGAssets } from "../core/assets";
import { MGManifest } from "../core/manifest";
import { MGPixiHooks } from "./hooks";

// Types
type PixiApp = any;
type PixiRenderer = any;
type PixiTexture = any;
type PixiSprite = any;
type PixiContainer = any;
type PixiRectangle = any;
type PixiAnimatedSprite = any;

interface PixiConstructors {
  Container: new () => PixiContainer;
  Sprite: new (texture: PixiTexture) => PixiSprite;
  Texture: any;
  Rectangle: new (x: number, y: number, w: number, h: number) => PixiRectangle;
  AnimatedSprite: (new (frames: PixiTexture[]) => PixiAnimatedSprite) | null;
}

interface AtlasFrame {
  frame: { x: number; y: number; w: number; h: number };
  rotated?: boolean;
  trimmed?: boolean;
  spriteSourceSize?: { x: number; y: number; w: number; h: number };
  sourceSize?: { w: number; h: number };
  anchor?: { x: number; y: number };
}

interface AtlasJson {
  frames: Record<string, AtlasFrame>;
  meta: {
    image: string;
    related_multi_packs?: string[];
  };
  animations?: Record<string, string[]>;
}

interface ShowOptions {
  parent?: PixiContainer;
  x?: number;
  y?: number;
  center?: boolean;
  scale?: number;
  alpha?: number;
  rotation?: number;
  zIndex?: number;
  anchorX?: number;
  anchorY?: number;
  fps?: number;
  speed?: number;
  loop?: boolean;
}

interface ToCanvasOptions {
  frameIndex?: number;
  scale?: number;
  pad?: number;
  anchorX?: number;
  anchorY?: number;
}

// State
let _initPromise: Promise<boolean> | null = null;

const state = {
  ready: false,
  app: null as PixiApp | null,
  renderer: null as PixiRenderer | null,
  ctors: null as PixiConstructors | null,
  baseUrl: null as string | null,

  textures: new Map<string, PixiTexture>(),
  animations: new Map<string, PixiTexture[]>(),
  live: new Set<PixiSprite>(),

  defaultParent: null as PixiContainer | (() => PixiContainer) | null,
  overlay: null as PixiContainer | null,

  categoryIndex: null as Map<string, Set<string>> | null,
};

const log = (...args: any[]) => {
  try {
    console.log("[MGSprite]", ...args);
  } catch {}
};

// ----- Constructors detection -----
function findAny<T>(rootNode: any, pred: (node: any) => boolean, limit = 25000): T | null {
  const stack = [rootNode];
  const seen = new Set();
  let n = 0;

  while (stack.length && n++ < limit) {
    const node = stack.pop();
    if (!node || seen.has(node)) continue;
    seen.add(node);
    if (pred(node)) return node as T;
    const children = node.children;
    if (Array.isArray(children)) {
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }
  return null;
}

function getCtors(app: PixiApp): PixiConstructors {
  const PIXI = (pageWindow as any).PIXI;

  if (PIXI?.Texture && PIXI?.Sprite && PIXI?.Container && PIXI?.Rectangle) {
    return {
      Container: PIXI.Container,
      Sprite: PIXI.Sprite,
      Texture: PIXI.Texture,
      Rectangle: PIXI.Rectangle,
      AnimatedSprite: PIXI.AnimatedSprite || null,
    };
  }

  const stage = app?.stage;
  const anySprite = findAny<any>(
    stage,
    (x) => x?.texture?.frame && x?.constructor && x?.texture?.constructor && x?.texture?.frame?.constructor
  );

  if (!anySprite) {
    throw new Error("No Sprite found yet (constructors).");
  }

  return {
    Container: stage.constructor,
    Sprite: anySprite.constructor,
    Texture: anySprite.texture.constructor,
    Rectangle: anySprite.texture.frame.constructor,
    AnimatedSprite: PIXI?.AnimatedSprite || null,
  };
}

async function waitForCtors(app: PixiApp, timeoutMs = 15000): Promise<PixiConstructors> {
  const t0 = performance.now();
  while (performance.now() - t0 < timeoutMs) {
    try {
      return getCtors(app);
    } catch {
      await sleep(50);
    }
  }
  throw new Error("Constructors timeout");
}

// ----- Atlas helpers -----
const isAtlas = (json: any): json is AtlasJson =>
  json && typeof json === "object" && json.frames && json.meta && typeof json.meta.image === "string";

function mkRect(Rectangle: any, x: number, y: number, w: number, h: number): PixiRectangle {
  return new Rectangle(x, y, w, h);
}

function mkSubTex(
  Texture: any,
  baseTex: PixiTexture,
  frame: PixiRectangle,
  orig: PixiRectangle,
  trim: PixiRectangle | null,
  rotate: number,
  anchor: { x: number; y: number } | null
): PixiTexture {
  let tex: PixiTexture;

  try {
    tex = new Texture({
      source: baseTex.source,
      frame,
      orig,
      trim: trim || undefined,
      rotate: rotate || 0,
    });
  } catch {
    tex = new Texture(baseTex.baseTexture || baseTex, frame, orig, trim || undefined, rotate || 0);
  }

  if (anchor) {
    if (tex.defaultAnchor?.set) {
      try {
        tex.defaultAnchor.set(anchor.x, anchor.y);
      } catch {}
    } else if (tex.defaultAnchor) {
      tex.defaultAnchor.x = anchor.x;
      tex.defaultAnchor.y = anchor.y;
    } else {
      tex.defaultAnchor = { x: anchor.x, y: anchor.y };
    }
  }

  try {
    tex.updateUvs?.();
  } catch {}

  return tex;
}

function buildAtlasTextures(
  atlasJson: AtlasJson,
  baseTex: PixiTexture,
  outTexMap: Map<string, PixiTexture>,
  ctors: PixiConstructors
): void {
  const { Texture, Rectangle } = ctors;

  for (const [key, fd] of Object.entries(atlasJson.frames)) {
    const fr = fd.frame;
    const rotated = !!fd.rotated;
    const rot = rotated ? 2 : 0;
    const w = rotated ? fr.h : fr.w;
    const h = rotated ? fr.w : fr.h;

    const frame = mkRect(Rectangle, fr.x, fr.y, w, h);
    const ss = fd.sourceSize || { w: fr.w, h: fr.h };
    const orig = mkRect(Rectangle, 0, 0, ss.w, ss.h);

    let trim: PixiRectangle | null = null;
    if (fd.trimmed && fd.spriteSourceSize) {
      const s = fd.spriteSourceSize;
      trim = mkRect(Rectangle, s.x, s.y, s.w, s.h);
    }

    outTexMap.set(key, mkSubTex(Texture, baseTex, frame, orig, trim, rot, fd.anchor || null));
  }
}

// ----- Key helpers -----
function normalizeKey(key: string): string {
  const s = String(key || "").trim();
  if (!s) return "";
  if (s.startsWith("sprite/") || s.startsWith("sprites/")) return s;
  if (s.includes("/")) return `sprite/${s}`;
  return s;
}

function makeKey(category: string | null, asset: string): string {
  const cat = String(category || "")
    .trim()
    .replace(/^sprites?\//, "")
    .replace(/^\/+|\/+$/g, "");
  const a = String(asset || "").trim();

  if (a.includes("/")) return normalizeKey(a);
  if (!cat) return normalizeKey(a);
  return `sprite/${cat}/${a}`;
}

function resolveKey(category: string | null, asset: string): string {
  const k1 = makeKey(category, asset);
  if (state.textures.has(k1) || state.animations.has(k1)) return k1;

  const a = String(asset || "").trim();
  if (state.textures.has(a) || state.animations.has(a)) return a;

  const k3 = normalizeKey(a);
  if (state.textures.has(k3) || state.animations.has(k3)) return k3;

  return k1;
}

// ----- Overlay -----
function ensureOverlay(): PixiContainer {
  if (state.overlay) return state.overlay;

  const container = new state.ctors!.Container();
  container.sortableChildren = true;
  container.zIndex = 99999999;

  try {
    state.app!.stage.sortableChildren = true;
  } catch {}
  state.app!.stage.addChild(container);

  state.overlay = container;
  return container;
}

function getDefaultParent(): PixiContainer | null {
  const p = state.defaultParent;
  if (!p) return null;
  try {
    return typeof p === "function" ? p() : p;
  } catch {
    return null;
  }
}

// ----- Loader -----
async function loadDefaultSprites(): Promise<void> {
  const manifest = await MGManifest.load(state.baseUrl!);
  const bundle = MGManifest.getBundle(manifest, "default");
  if (!bundle) throw new Error("No default bundle in manifest");

  const jsonPaths = MGManifest.listJsonFromBundle(bundle);
  const seen = new Set<string>();
  const categoryIndex = new Map<string, Set<string>>();

  const addCategory = (cat: string, id: string) => {
    const c = String(cat || "").trim();
    const i = String(id || "").trim();
    if (!c || !i) return;
    if (!categoryIndex.has(c)) categoryIndex.set(c, new Set());
    categoryIndex.get(c)!.add(i);
  };

  async function loadAtlasJson(path: string): Promise<void> {
    if (seen.has(path)) return;
    seen.add(path);

    const atlas = await getJSON<any>(joinPath(state.baseUrl!, path));
    if (!isAtlas(atlas)) return;

    const rels = atlas.meta?.related_multi_packs;
    if (Array.isArray(rels)) {
      for (const rel of rels) {
        await loadAtlasJson(relPath(path, rel));
      }
    }

    const imgPath = relPath(path, atlas.meta.image);
    const img = await blobToImage(await getBlob(joinPath(state.baseUrl!, imgPath)));
    const baseTex = state.ctors!.Texture.from(img);

    buildAtlasTextures(atlas, baseTex, state.textures, state.ctors!);

    for (const key of Object.keys(atlas.frames || {})) {
      const m = /^sprite\/([^/]+)\/(.+)$/.exec(key);
      if (m) addCategory(m[1], m[2]);
    }

    if (atlas.animations && typeof atlas.animations === "object") {
      for (const [animKey, frames] of Object.entries(atlas.animations)) {
        if (!Array.isArray(frames)) continue;
        const texFrames = (frames as string[])
          .map((k) => state.textures.get(k))
          .filter(Boolean) as PixiTexture[];
        if (texFrames.length >= 2) {
          state.animations.set(animKey, texFrames);
        }
      }
    }
  }

  for (const p of jsonPaths) {
    await loadAtlasJson(p);
  }
  state.categoryIndex = categoryIndex;
}

// ----- Public API -----
function show(category: string, asset: string, options?: ShowOptions): PixiSprite;
function show(asset: string, options?: ShowOptions): PixiSprite;
function show(a: string, b?: string | ShowOptions, c?: ShowOptions): PixiSprite {
  if (!state.ready) throw new Error("MGSprite not ready yet");

  let key: string;
  let opts: ShowOptions;

  if (typeof b === "string") {
    key = resolveKey(a, b);
    opts = c || {};
  } else {
    key = resolveKey(null, a);
    opts = b || {};
  }

  const parent = opts.parent || getDefaultParent() || ensureOverlay();

  const W = state.renderer?.width || state.renderer?.view?.width || innerWidth;
  const H = state.renderer?.height || state.renderer?.view?.height || innerHeight;
  const x = opts.center ? W / 2 : (opts.x ?? W / 2);
  const y = opts.center ? H / 2 : (opts.y ?? H / 2);

  let obj: PixiSprite;
  const frames = state.animations.get(key);

  if (frames && frames.length >= 2) {
    const AS = state.ctors!.AnimatedSprite;
    if (AS) {
      obj = new AS(frames);
      obj.animationSpeed = opts.fps ? opts.fps / 60 : (opts.speed ?? 0.15);
      obj.loop = opts.loop ?? true;
      obj.play();
    } else {
      const spr = new state.ctors!.Sprite(frames[0]);
      const fps = Math.max(1, opts.fps || 8);
      const frameMs = 1000 / fps;
      let acc = 0;
      let i = 0;

      const tick = (delta: number) => {
        const ms = state.app!.ticker?.deltaMS ?? delta * (1000 / 60);
        acc += ms;
        if (acc < frameMs) return;
        const step = (acc / frameMs) | 0;
        acc %= frameMs;
        i = (i + step) % frames.length;
        spr.texture = frames[i];
      };

      (spr as any).__mgTick = tick;
      state.app!.ticker?.add?.(tick);
      obj = spr;
    }
  } else {
    const tex = state.textures.get(key);
    if (!tex) throw new Error(`Unknown sprite/anim key: ${key}`);
    obj = new state.ctors!.Sprite(tex);
  }

  const ax = opts.anchorX ?? obj.texture?.defaultAnchor?.x ?? 0.5;
  const ay = opts.anchorY ?? obj.texture?.defaultAnchor?.y ?? 0.5;
  obj.anchor?.set?.(ax, ay);

  obj.position.set(x, y);
  obj.scale.set(opts.scale ?? 1);
  obj.alpha = opts.alpha ?? 1;
  obj.rotation = opts.rotation ?? 0;
  obj.zIndex = opts.zIndex ?? 999999;

  parent.addChild(obj);
  state.live.add(obj);

  (obj as any).__mgDestroy = () => {
    try {
      if ((obj as any).__mgTick) state.app!.ticker?.remove?.((obj as any).__mgTick);
    } catch {}
    try {
      obj.destroy?.({ children: true, texture: false, baseTexture: false });
    } catch {
      try {
        obj.destroy?.();
      } catch {}
    }
    state.live.delete(obj);
  };

  return obj;
}

function extractCanvas(target: any): HTMLCanvasElement {
  const r = state.renderer;
  if (r?.extract?.canvas) return r.extract.canvas(target);
  if (r?.plugins?.extract?.canvas) return r.plugins.extract.canvas(target);
  throw new Error("No extract.canvas available on renderer");
}

function toCanvas(category: string, asset: string, options?: ToCanvasOptions): HTMLCanvasElement;
function toCanvas(asset: string, options?: ToCanvasOptions): HTMLCanvasElement;
function toCanvas(a: string, b?: string | ToCanvasOptions, c?: ToCanvasOptions): HTMLCanvasElement {
  if (!state.ready) throw new Error("MGSprite not ready yet");

  let key: string;
  let opts: ToCanvasOptions;

  if (typeof b === "string") {
    key = resolveKey(a, b);
    opts = c || {};
  } else {
    key = resolveKey(null, a);
    opts = b || {};
  }

  const frames = state.animations.get(key);
  const idx = Math.max(0, (opts.frameIndex ?? 0) | 0);
  const tex = frames?.length ? frames[idx % frames.length] : state.textures.get(key);

  if (!tex) throw new Error(`Unknown sprite/anim key: ${key}`);

  const spr = new state.ctors!.Sprite(tex);
  const ax = opts.anchorX ?? spr.texture?.defaultAnchor?.x ?? 0.5;
  const ay = opts.anchorY ?? spr.texture?.defaultAnchor?.y ?? 0.5;
  spr.anchor?.set?.(ax, ay);
  spr.scale.set(opts.scale ?? 1);

  const pad = opts.pad ?? 2;
  const tmp = new state.ctors!.Container();
  tmp.addChild(spr);

  try {
    tmp.updateTransform?.();
  } catch {}

  const bnd = spr.getBounds?.(true) || { x: 0, y: 0, width: spr.width, height: spr.height };
  spr.position.set(-bnd.x + pad, -bnd.y + pad);

  const canvas = extractCanvas(tmp);

  try {
    tmp.destroy?.({ children: true });
  } catch {}

  return canvas;
}

function clear(): void {
  for (const obj of Array.from(state.live)) {
    (obj as any).__mgDestroy?.();
  }
}

function attach(container: PixiContainer): boolean {
  state.defaultParent = container;
  return true;
}

function attachProvider(fn: () => PixiContainer): boolean {
  state.defaultParent = fn;
  return true;
}

function has(category: string, asset: string): boolean;
function has(asset: string): boolean;
function has(a: string, b?: string): boolean {
  const key = typeof b === "string" ? resolveKey(a, b) : resolveKey(null, a);
  return state.textures.has(key) || state.animations.has(key);
}

function assertReady(): void {
  if (!state.ready) throw new Error("MGSprite not ready yet");
}

function getCategories(): string[] {
  assertReady();
  const index = state.categoryIndex;
  if (!index) return [];
  return Array.from(index.keys()).sort((a, b) => a.localeCompare(b));
}

function getCategoryId(category: string): string[] {
  assertReady();
  const cat = String(category || "").trim();
  if (!cat) return [];
  const index = state.categoryIndex;
  if (!index) return [];
  return Array.from(index.get(cat)?.values() || []).sort((a, b) => a.localeCompare(b));
}

function hasId(category: string, id: string): boolean {
  assertReady();
  const cat = String(category || "").trim();
  const asset = String(id || "").trim();
  if (!cat || !asset) return false;
  const index = state.categoryIndex;
  if (!index) return false;
  const catLc = cat.toLowerCase();
  const assetLc = asset.toLowerCase();
  for (const [c, ids] of index.entries()) {
    if (c.toLowerCase() !== catLc) continue;
    for (const v of ids.values()) {
      if (v.toLowerCase() === assetLc) return true;
    }
  }
  return false;
}

function listIds(prefix?: string): string[] {
  assertReady();
  const index = state.categoryIndex;
  if (!index) return [];
  const pref = String(prefix || "").trim().toLowerCase();
  const out: string[] = [];
  for (const [cat, ids] of index.entries()) {
    for (const id of ids.values()) {
      const key = makeKey(cat, id);
      if (!pref || key.toLowerCase().startsWith(pref)) out.push(key);
    }
  }
  return out.sort((a, b) => a.localeCompare(b));
}

function getIdInfo(idOrPath: string): { category: string; id: string; key: string } | null {
  assertReady();
  const s = String(idOrPath || "").trim();
  if (!s) return null;

  const key = normalizeKey(s);
  const m = /^sprite\/([^/]+)\/(.+)$/.exec(key);
  if (!m) return null;

  const catIn = m[1];
  const idIn = m[2];

  const index = state.categoryIndex;
  const catLc = catIn.toLowerCase();
  const idLc = idIn.toLowerCase();

  let catMatch = catIn;
  let idMatch = idIn;

  if (index) {
    const foundCat = Array.from(index.keys()).find((c) => c.toLowerCase() === catLc);
    if (!foundCat) return null;
    catMatch = foundCat;
    const ids = index.get(foundCat);
    if (!ids) return null;
    const foundId = Array.from(ids.values()).find((v) => v.toLowerCase() === idLc);
    if (!foundId) return null;
    idMatch = foundId;
  }

  return { category: catMatch, id: idMatch, key: makeKey(catMatch, idMatch) };
}

function getIdPath(category: string, id: string): string {
  assertReady();
  const catIn = String(category || "").trim();
  const assetIn = String(id || "").trim();
  if (!catIn || !assetIn) throw new Error("getIdPath(category, id) requires both category and id");

  const index = state.categoryIndex;
  if (!index) throw new Error("Sprite categories not indexed");

  const catLc = catIn.toLowerCase();
  const assetLc = assetIn.toLowerCase();

  const catKey = Array.from(index.keys()).find((c) => c.toLowerCase() === catLc) || catIn;
  const ids = index.get(catKey);
  if (!ids) throw new Error(`Unknown sprite category: ${catIn}`);

  const idKey = Array.from(ids.values()).find((v) => v.toLowerCase() === assetLc) || assetIn;
  if (!ids.has(idKey)) throw new Error(`Unknown sprite id: ${catIn}/${assetIn}`);

  return makeKey(catKey, idKey);
}

async function init(): Promise<boolean> {
  if (state.ready) return true;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    const startAt = performance.now();
    log("init start");

    const app = await waitWithTimeout(MGPixiHooks.appReady, 15000, "PIXI app");
    log("app ready");

    const renderer = await waitWithTimeout(MGPixiHooks.rendererReady, 15000, "PIXI renderer");
    log("renderer ready");

    state.app = app;
    state.renderer = renderer || app?.renderer || null;
    state.ctors = await waitForCtors(app);
    log("constructors resolved");

    state.baseUrl = await MGAssets.base();
    log("base url", state.baseUrl);

    await loadDefaultSprites();
    log(
      "atlases loaded",
      "textures",
      state.textures.size,
      "animations",
      state.animations.size,
      "categories",
      state.categoryIndex?.size ?? 0
    );

    state.ready = true;
    log("ready in", Math.round(performance.now() - startAt), "ms");
    return true;
  })();

  return _initPromise;
}

export const MGSprite = {
  init,
  ready: () => state.ready,

  show,
  toCanvas,

  clear,
  attach,
  attachProvider,

  has,
  key: (category: string, asset: string) => makeKey(category, asset),

  getCategories,
  getCategoryId,
  hasId,
  listIds,
  getIdInfo,
  getIdPath,
};
