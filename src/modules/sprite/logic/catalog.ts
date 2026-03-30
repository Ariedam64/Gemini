// src/modules/sprite/logic/catalog.ts
// Load sprite catalog metadata from MG API (lazy image loading)

import { log } from "./utils";

const SPRITE_DATA_URL = "https://mg-api.ariedam.fr/assets/sprite-data?full=1";
const SPRITE_PNG_BASE = "https://mg-api.ariedam.fr/assets/sprites";

// ─────────────────────────────────────────────────────────────────────────────
// API Types
// ─────────────────────────────────────────────────────────────────────────────

interface CatalogFrameEntry {
  type: "frame";
  id: string;
  name: string;
  anchor?: { x: number; y: number };
  sourceSize?: { w: number; h: number };
  spriteSourceSize?: { x: number; y: number; w: number; h: number };
  trimmed?: boolean;
}

interface CatalogAnimationEntry {
  type: "animation";
  id: string;
  name: string;
  frames: string[];
}

type CatalogEntry = CatalogFrameEntry | CatalogAnimationEntry;

// ─────────────────────────────────────────────────────────────────────────────
// Sprite Metadata (stored alongside images)
// ─────────────────────────────────────────────────────────────────────────────

/** Metadata for a sprite, attached to the image for use by display/mutation systems */
export interface SpriteMeta {
  anchor: { x: number; y: number };
  sourceSize: { w: number; h: number };
  trimmed: boolean;
  trimOffset: { x: number; y: number };
}

/** Map of sprite ID → metadata */
export type SpriteMetaMap = Map<string, SpriteMeta>;

// ─────────────────────────────────────────────────────────────────────────────
// Result
// ─────────────────────────────────────────────────────────────────────────────

export interface CatalogResult {
  catalogKeys: Set<string>;
  meta: SpriteMetaMap;
  animationFrameIds: Map<string, string[]>;
  categoryIndex: Map<string, Set<string>>;
  pngUrlResolver: (id: string) => string;
}

// ─────────────────────────────────────────────────────────────────────────────
// URL Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Mapping from sprite ID category (singular in IDs) to API URL category.
 * Built dynamically from the API categories data in loadCatalogFromApi().
 * e.g. "item" -> "items", "decor" -> "decor", "mutation" -> "mutations"
 */
let idCatToApiCat: Map<string, string> = new Map();

function spritePngUrl(id: string): string {
  const path = id.startsWith("sprite/") ? id.slice(7) : id;
  const slashIdx = path.indexOf("/");
  if (slashIdx > 0) {
    const idCat = path.slice(0, slashIdx);
    const rest = path.slice(slashIdx);
    const apiCat = idCatToApiCat.get(idCat) ?? idCat;
    return `${SPRITE_PNG_BASE}/${apiCat}${rest}.png`;
  }
  return `${SPRITE_PNG_BASE}/${path}.png`;
}

// ─────────────────────────────────────────────────────────────────────────────
// HTTP helpers (GM_xmlhttpRequest with native fetch fallback)
// ─────────────────────────────────────────────────────────────────────────────

function fetchJsonGM<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    if (typeof GM_xmlhttpRequest === "undefined") {
      fetch(url)
        .then((res) => {
          if (!res.ok) reject(new Error(`HTTP ${res.status} for ${url}`));
          else return res.json();
        })
        .then((data) => resolve(data as T))
        .catch(reject);
      return;
    }

    GM_xmlhttpRequest({
      method: "GET",
      url,
      responseType: "json",
      onload(response) {
        if (response.status < 200 || response.status >= 300) {
          reject(new Error(`HTTP ${response.status} for ${url}`));
          return;
        }
        resolve(response.response as T);
      },
      onerror() {
        reject(new Error(`Network error: ${url}`));
      },
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Image Loading (exported for lazy loader)
// ─────────────────────────────────────────────────────────────────────────────

export function loadImageGM(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (typeof GM_xmlhttpRequest === "undefined") {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load: ${url}`));
      img.src = url;
      return;
    }

    GM_xmlhttpRequest({
      method: "GET",
      url,
      responseType: "blob",
      onload(response) {
        if (response.status < 200 || response.status >= 300) {
          reject(new Error(`HTTP ${response.status} for ${url}`));
          return;
        }
        const blob = response.response as Blob;
        const objectUrl = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(img);
        };
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          reject(new Error(`Failed to decode: ${url}`));
        };
        img.src = objectUrl;
      },
      onerror() {
        reject(new Error(`Network error: ${url}`));
      },
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Catalog Loading (metadata only — no image downloads)
// ─────────────────────────────────────────────────────────────────────────────

function buildCategoryIndex(ids: string[]): Map<string, Set<string>> {
  const index = new Map<string, Set<string>>();
  for (const id of ids) {
    const m = /^sprite\/([^/]+)\/(.+)$/.exec(id);
    if (!m) continue;
    const [, cat, name] = m;
    if (!index.has(cat)) index.set(cat, new Set());
    index.get(cat)!.add(name);
  }
  return index;
}

function extractMeta(entry: CatalogFrameEntry): SpriteMeta {
  return {
    anchor: entry.anchor ?? { x: 0.5, y: 0.5 },
    sourceSize: entry.sourceSize ?? { w: 0, h: 0 },
    trimmed: entry.trimmed ?? false,
    trimOffset: {
      x: entry.spriteSourceSize?.x ?? 0,
      y: entry.spriteSourceSize?.y ?? 0,
    },
  };
}

export async function loadCatalogFromApi(): Promise<CatalogResult> {
  log("fetching sprite catalog from API...");

  const raw = await fetchJsonGM<{
    baseUrl: string;
    count: number;
    categories?: { cat: string; items: CatalogEntry[] }[];
    items?: CatalogEntry[];
  }>(SPRITE_DATA_URL);

  // full=1 returns { categories: [{ cat, items }] }, flat=1 returns { items: [] }
  const catalog: CatalogEntry[] = raw.items
    ?? raw.categories?.flatMap((c) => c.items)
    ?? [];
  log(`catalog received: ${catalog.length} entries`);

  // Build idCategory → apiCategory mapping from categories data
  // Prefer exact matches (idCat === apiCat) over first-seen to avoid
  // cross-category contamination (e.g. "animations" cat containing "sprite/ui/..." entries)
  if (raw.categories) {
    idCatToApiCat = new Map();
    for (const category of raw.categories) {
      for (const item of category.items ?? []) {
        if (!item.id) continue;
        const m = /^sprite\/([^/]+)\//.exec(item.id);
        if (!m) continue;
        const idCat = m[1];
        const existing = idCatToApiCat.get(idCat);
        if (!existing || idCat === category.cat) {
          idCatToApiCat.set(idCat, category.cat);
        }
      }
    }
    log(`category mapping:`, Object.fromEntries(idCatToApiCat));
  }

  // Yield to main thread after heavy JSON parse to avoid game freeze
  await new Promise((r) => setTimeout(r, 0));

  const frameEntries = catalog.filter((e): e is CatalogFrameEntry => e.type === "frame");
  const animEntries = catalog.filter((e): e is CatalogAnimationEntry => e.type === "animation");

  // Extract metadata from frame entries
  const meta: SpriteMetaMap = new Map();
  const catalogKeys = new Set<string>();
  for (const entry of frameEntries) {
    meta.set(entry.id, extractMeta(entry));
    catalogKeys.add(entry.id);
  }

  // Build animation frame ID lists (no image loading)
  const animationFrameIds = new Map<string, string[]>();
  for (const anim of animEntries) {
    if (anim.frames.length >= 2) {
      animationFrameIds.set(anim.id, anim.frames);
      catalogKeys.add(anim.id);
    }
  }

  // Yield again before building category index
  await new Promise((r) => setTimeout(r, 0));

  // Build category index from all known IDs
  const allIds = [...catalogKeys];
  const categoryIndex = buildCategoryIndex(allIds);

  log(`indexed ${categoryIndex.size} categories, ${animationFrameIds.size} animations, ${catalogKeys.size} total keys`);

  return { catalogKeys, meta, animationFrameIds, categoryIndex, pngUrlResolver: spritePngUrl };
}
