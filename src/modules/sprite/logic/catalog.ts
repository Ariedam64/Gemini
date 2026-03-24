// src/modules/sprite/logic/catalog.ts
// Load sprite catalog and images from MG API

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
  images: Map<string, HTMLImageElement>;
  meta: SpriteMetaMap;
  animationFrameIds: Map<string, string[]>;
  categoryIndex: Map<string, Set<string>>;
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
// Image Loading
// ─────────────────────────────────────────────────────────────────────────────

function loadImageGM(url: string): Promise<HTMLImageElement> {
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

async function loadImagesBatched(
  entries: { id: string; url: string }[],
  batchSize: number,
): Promise<Map<string, HTMLImageElement>> {
  const results = new Map<string, HTMLImageElement>();
  const total = entries.length;
  let loaded = 0;

  for (let i = 0; i < total; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    const settled = await Promise.allSettled(
      batch.map(async (entry) => {
        const img = await loadImageGM(entry.url);
        return { id: entry.id, img };
      })
    );

    for (const result of settled) {
      if (result.status === "fulfilled") {
        results.set(result.value.id, result.value.img);
        loaded++;
      }
    }

    if (i + batchSize < total) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  log(`loaded ${loaded}/${total} sprite images`);
  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// Catalog Loading
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
  log("fetching sprite catalog from API (full)...");

  const response = await fetch(SPRITE_DATA_URL);
  if (!response.ok) {
    throw new Error(`[MGSprite] Sprite catalog fetch failed: ${response.status}`);
  }

  const raw = await response.json() as {
    baseUrl: string;
    count: number;
    categories?: { cat: string; items: CatalogEntry[] }[];
    items?: CatalogEntry[];
  };

  // full=1 returns { categories: [{ cat, items }] }, flat=1 returns { items: [] }
  const catalog: CatalogEntry[] = raw.items
    ?? raw.categories?.flatMap((c) => c.items)
    ?? [];
  log(`catalog received: ${catalog.length} entries`);

  // Build idCategory → apiCategory mapping from categories data
  // A single API category (e.g. "mutations") can contain multiple ID prefixes
  // (e.g. "sprite/mutation/..." AND "sprite/mutation-overlay/...")
  if (raw.categories) {
    idCatToApiCat = new Map();
    for (const category of raw.categories) {
      for (const item of category.items ?? []) {
        if (!item.id) continue;
        const m = /^sprite\/([^/]+)\//.exec(item.id);
        if (m && !idCatToApiCat.has(m[1])) {
          idCatToApiCat.set(m[1], category.cat);
        }
      }
    }
    log(`category mapping:`, Object.fromEntries(idCatToApiCat));
  }

  const frameEntries = catalog.filter((e): e is CatalogFrameEntry => e.type === "frame");
  const animEntries = catalog.filter((e): e is CatalogAnimationEntry => e.type === "animation");

  // Extract metadata from frame entries
  const meta: SpriteMetaMap = new Map();
  for (const entry of frameEntries) {
    meta.set(entry.id, extractMeta(entry));
  }

  // Load images
  const imageLoadList = frameEntries.map((entry) => ({
    id: entry.id,
    url: spritePngUrl(entry.id),
  }));
  const images = await loadImagesBatched(imageLoadList, 30);

  log(`loaded ${images.size} images, ${meta.size} metadata entries`);

  // Build animations
  const animationFrameIds = new Map<string, string[]>();
  for (const anim of animEntries) {
    if (anim.frames.length >= 2) {
      animationFrameIds.set(anim.id, anim.frames);
    }
  }

  // Build category index
  const allIds = [...images.keys(), ...animationFrameIds.keys()];
  const categoryIndex = buildCategoryIndex(allIds);

  log(`indexed ${categoryIndex.size} categories, ${animationFrameIds.size} animations`);

  return { images, meta, animationFrameIds, categoryIndex };
}
