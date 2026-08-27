// src/modules/sprite/logic/catalog.ts
// Load sprite catalog metadata from MG API (lazy image loading)

import { log } from "./utils";
import { fetchJson, loadImage } from "../../../utils/http";
import { MG_API } from "../../../utils/mgApi";
import { buildSpriteKey } from "../../../utils/spriteCategory";

const SPRITE_PNG_BASE = MG_API.spritePng;

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

/**
 * Exact PNG URL per sprite id, as published by `/assets/sprites`.
 *
 * Preferred over a URL built from the id: it carries the API's own cache-buster
 * (`?v=<version>`), so a game update invalidates the browser's copy.
 */
let pngUrlById: Map<string, string> = new Map();

function spritePngUrl(id: string): string {
  const published = pngUrlById.get(id);
  if (published) return published;

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

/** @deprecated Use `loadImage` from `utils/http` directly. */
export const loadImageGM = loadImage;

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

/** Shape of `/assets/sprites`: names and ready-to-use PNG URLs, by category. */
interface SpriteCatalogResponse {
  count: number;
  baseUrl: string;
  categories: string[];
  sprites: Record<string, { name: string; url: string }[]>;
}

/**
 * Register every sprite the game ships, beyond what the atlas export knows.
 *
 * `/assets/sprite-data` only covers what has been through atlas extraction, and
 * that can lag far behind: it has been seen serving pets and decor alone while
 * the game shipped 656 sprites. Everything missing from it — plants, seeds,
 * items, mutations, UI — then failed to resolve at all, and the feature asking
 * for it just rendered nothing.
 *
 * These entries carry no anchor or source size, so they fall back to the same
 * defaults `extractMeta` already applies to an incomplete atlas entry. That
 * only affects where mutation icons land on a composed sprite; the sprite
 * itself draws correctly.
 */
function mergeSpriteCatalog(
  response: SpriteCatalogResponse,
  catalogKeys: Set<string>,
  meta: SpriteMetaMap,
): number {
  let added = 0;

  for (const [category, sprites] of Object.entries(response.sprites ?? {})) {
    for (const sprite of sprites) {
      if (!sprite?.name || !sprite.url) continue;

      const id = buildSpriteKey(category, sprite.name);
      pngUrlById.set(id, sprite.url);

      if (catalogKeys.has(id)) continue;
      catalogKeys.add(id);
      meta.set(id, {
        anchor: { x: 0.5, y: 0.5 },
        sourceSize: { w: 0, h: 0 },
        trimmed: false,
        trimOffset: { x: 0, y: 0 },
      });
      added += 1;
    }
  }

  return added;
}

export async function loadCatalogFromApi(): Promise<CatalogResult> {
  log("fetching sprite catalog from API...");

  // Both catalogs, in parallel. The atlas metadata is authoritative where it
  // exists; the sprite listing decides what exists at all.
  const [raw, spriteCatalog] = await Promise.all([
    fetchJson<{
      baseUrl: string;
      count: number;
      categories?: { cat: string; items: CatalogEntry[] }[];
      items?: CatalogEntry[];
    }>(MG_API.spriteData),
    fetchJson<SpriteCatalogResponse>(MG_API.spriteCatalog).catch((error) => {
      log("sprite listing unavailable, atlas metadata only:", error);
      return null;
    }),
  ]);

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

  // Fill in every sprite the atlas export does not cover
  pngUrlById = new Map();
  if (spriteCatalog) {
    const added = mergeSpriteCatalog(spriteCatalog, catalogKeys, meta);
    log(`sprite listing: ${spriteCatalog.count} published, ${added} not in the atlas metadata`);
  }

  // Yield again before building category index
  await new Promise((r) => setTimeout(r, 0));

  // Build category index from all known IDs
  const allIds = [...catalogKeys];
  const categoryIndex = buildCategoryIndex(allIds);

  log(`indexed ${categoryIndex.size} categories, ${animationFrameIds.size} animations, ${catalogKeys.size} total keys`);

  return { catalogKeys, meta, animationFrameIds, categoryIndex, pngUrlResolver: spritePngUrl };
}
