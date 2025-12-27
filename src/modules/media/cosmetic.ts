// src/modules/media/cosmetic.ts
// MGCosmetic - Cosmetic image management (HTML images)

import { joinPath } from "../utils/path";
import { MGAssets } from "../core/assets";
import { MGManifest } from "../core/manifest";

// Types
interface CreateOptions {
  alt?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  opacity?: string | number;
  style?: Record<string, string | number>;
}

interface ShowOptions extends CreateOptions {
  parent?: HTMLElement;
  x?: number;
  y?: number;
  center?: boolean;
  absolute?: boolean;
  scale?: number;
  rotation?: number;
  zIndex?: number;
  anchor?: "center" | "topleft";
}

interface NormalizedCosmetic {
  cat: string;
  asset: string;
  base: string;
}

// State
let _initPromise: Promise<boolean> | null = null;

const state = {
  ready: false,
  baseUrl: null as string | null,

  byCat: new Map<string, Map<string, string>>(),
  byBase: new Map<string, string>(),

  overlay: null as HTMLDivElement | null,
  live: new Set<HTMLImageElement>(),
  defaultParent: null as HTMLElement | (() => HTMLElement) | null,
};

// ----- Overlay -----
function ensureOverlay(): HTMLDivElement {
  if (state.overlay) return state.overlay;

  const div = document.createElement("div");
  div.id = "MG_COSMETIC_OVERLAY";
  div.style.cssText = [
    "position:fixed",
    "left:0",
    "top:0",
    "width:100vw",
    "height:100vh",
    "pointer-events:none",
    "z-index:99999999",
  ].join(";");

  document.documentElement.appendChild(div);
  state.overlay = div;
  return div;
}

function getDefaultParent(): HTMLElement | null {
  const p = state.defaultParent;
  if (!p) return null;
  try {
    return typeof p === "function" ? p() : p;
  } catch {
    return null;
  }
}

// ----- Path helpers -----
function stripCosmeticPath(s: string): string {
  let x = String(s || "").trim();
  if (!x) return "";
  x = x.replace(/^cosmetic\//i, "");
  x = x.replace(/\.png$/i, "");
  return x;
}

function normalize(a: string, b?: string): NormalizedCosmetic {
  if (b === undefined) {
    const base = stripCosmeticPath(a);
    const i = base.indexOf("_");
    if (i < 0) return { cat: "", asset: base, base };
    return { cat: base.slice(0, i), asset: base.slice(i + 1), base };
  }

  const cat = String(a || "").trim();
  const asset = stripCosmeticPath(b);
  const base = asset.includes("_") ? asset : `${cat}_${asset}`;

  if (asset.includes("_") && !cat) {
    const i = asset.indexOf("_");
    return { cat: asset.slice(0, i), asset: asset.slice(i + 1), base: asset };
  }
  return { cat, asset: asset.replace(/^.+?_/, ""), base };
}

// ----- Public API -----
function categories(): string[] {
  return Array.from(state.byCat.keys()).sort((a, b) => a.localeCompare(b));
}

function list(category: string): string[] {
  const map = state.byCat.get(String(category || "").trim());
  if (!map) return [];
  return Array.from(map.keys()).sort((a, b) => a.localeCompare(b));
}

function url(category: string, asset?: string): string;
function url(asset: string): string;
function url(a: string, b?: string): string {
  const { cat, asset, base } = normalize(a, b);

  const direct = state.byBase.get(base);
  if (direct) return direct;

  const map = state.byCat.get(cat);
  const u = map?.get(asset);
  if (u) return u;

  if (!state.baseUrl) throw new Error("MGCosmetic not initialized");
  if (!base) throw new Error("Invalid cosmetic name");

  return joinPath(state.baseUrl, `cosmetic/${base}.png`);
}

function create(category: string, asset: string, options?: CreateOptions): HTMLImageElement;
function create(asset: string, options?: CreateOptions): HTMLImageElement;
function create(a: string, b?: string | CreateOptions, c?: CreateOptions): HTMLImageElement {
  if (!state.ready) throw new Error("MGCosmetic not ready yet");

  let opts: CreateOptions;
  let assetB: string | undefined;

  if (typeof b === "object" && b !== null) {
    opts = b;
    assetB = undefined;
  } else if (typeof b === "string") {
    assetB = b;
    opts = c || {};
  } else {
    assetB = undefined;
    opts = c || {};
  }

  const u = assetB !== undefined ? url(a, assetB) : url(a);
  const img = document.createElement("img");
  img.decoding = "async";
  img.loading = "eager";
  img.src = u;

  img.alt = opts.alt != null ? String(opts.alt) : stripCosmeticPath(assetB ?? a);
  if (opts.className) img.className = String(opts.className);

  if (opts.width != null) img.style.width = String(opts.width);
  if (opts.height != null) img.style.height = String(opts.height);
  if (opts.opacity != null) img.style.opacity = String(opts.opacity);

  if (opts.style && typeof opts.style === "object") {
    for (const [key, value] of Object.entries(opts.style)) {
      try {
        (img.style as any)[key] = String(value);
      } catch {}
    }
  }

  return img;
}

function show(category: string, asset: string, options?: ShowOptions): HTMLImageElement;
function show(asset: string, options?: ShowOptions): HTMLImageElement;
function show(a: string, b?: string | ShowOptions, c?: ShowOptions): HTMLImageElement {
  let opts: ShowOptions;
  let assetB: string | undefined;

  if (typeof b === "object" && b !== null) {
    opts = b;
    assetB = undefined;
  } else if (typeof b === "string") {
    assetB = b;
    opts = c || {};
  } else {
    assetB = undefined;
    opts = c || {};
  }

  const parent = opts.parent || getDefaultParent() || ensureOverlay();
  const img = assetB !== undefined ? create(a, assetB, opts) : create(a, opts);

  const useOverlayPos =
    parent === state.overlay ||
    opts.center ||
    opts.x != null ||
    opts.y != null ||
    opts.absolute;

  if (useOverlayPos) {
    img.style.position = "absolute";
    img.style.pointerEvents = "none";
    img.style.zIndex = String(opts.zIndex ?? 999999);

    const scale = opts.scale ?? 1;
    const rot = opts.rotation ?? 0;

    if (opts.center) {
      img.style.left = "50%";
      img.style.top = "50%";
      img.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rot}rad)`;
    } else {
      const x = opts.x ?? innerWidth / 2;
      const y = opts.y ?? innerHeight / 2;
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.transform = `scale(${scale}) rotate(${rot}rad)`;
      if (opts.anchor === "center") {
        img.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rot}rad)`;
      }
    }
  }

  parent.appendChild(img);
  state.live.add(img);

  (img as any).__mgDestroy = () => {
    try {
      img.remove();
    } catch {}
    state.live.delete(img);
  };

  return img;
}

function attach(elementOrFn: HTMLElement | (() => HTMLElement)): boolean {
  state.defaultParent = elementOrFn;
  return true;
}

function clear(): void {
  for (const el of Array.from(state.live)) {
    (el as any).__mgDestroy?.();
  }
}

async function init(): Promise<boolean> {
  if (state.ready) return true;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    state.baseUrl = await MGAssets.base();

    const manifest = await MGManifest.load(state.baseUrl);
    const bundle = MGManifest.getBundle(manifest, "cosmetic");
    if (!bundle) throw new Error("No 'cosmetic' bundle in manifest");

    state.byCat.clear();
    state.byBase.clear();

    for (const asset of bundle.assets || []) {
      for (const src of asset.src || []) {
        if (typeof src !== "string") continue;
        if (!/^cosmetic\/.+\.png$/i.test(src)) continue;

        const file = src.split("/").pop()!;
        const base = file.replace(/\.png$/i, "");
        const i = base.indexOf("_");
        if (i < 0) continue;

        const cat = base.slice(0, i);
        const name = base.slice(i + 1);
        const u = joinPath(state.baseUrl!, src);

        state.byBase.set(base, u);
        if (!state.byCat.has(cat)) state.byCat.set(cat, new Map());
        state.byCat.get(cat)!.set(name, u);
      }
    }

    state.ready = true;
    return true;
  })();

  return _initPromise;
}

export const MGCosmetic = {
  init,
  ready: () => state.ready,

  categories,
  list,
  url,

  create,
  show,

  attach,
  clear,
};
