// src/modules/cosmetic/avatar/logic/catalog.ts
/**
 * Cosmetic catalog, loaded from the MG API.
 *
 * Replaces two local sources that no longer hold: a hardcoded defaults list,
 * and a walk of the game's `manifest.json` that guessed each item's type from
 * its filename. Both are gone; the API is the single source.
 */

import { fetchJson } from "../../../../utils/http";
import { MG_API } from "../../../../utils/mgApi";
import type { CosmeticAvailability, CosmeticInfo, CosmeticType } from "../types";

/** One entry as the API serves it. */
interface ApiCosmetic {
  cat: string;
  name: string;
  base: string;
  src: string;
  url: string;
}

interface ApiCosmeticsResponse {
  baseUrl: string;
  count: number;
  categories: { cat: string; items: ApiCosmetic[] }[];
}

let catalog: CosmeticInfo[] = [];
let loadPromise: Promise<CosmeticInfo[]> | null = null;

/**
 * Whether an item is free for everyone or has to be owned.
 *
 * The API does not carry this, so it is read off the naming convention. This
 * is the single place that knows the rule, and the only fragile point of the
 * catalog: a rename on the game's side breaks it silently. To check what the
 * names look like today, fetch `/assets/cosmetics?full=1`.
 *
 * The category test is not redundant with the `_Default` one: the eight body
 * colours are named `Default_Blue`, `Default_Gray`, … with no leading
 * underscore, so only `cat` identifies them.
 */
function deriveAvailability(cat: string, base: string): CosmeticAvailability {
  if (cat === "Default") return "default";
  if (base.includes("_Default")) return "default";
  if (base.endsWith("_Blank")) return "default";
  return "purchasable";
}

function toCosmeticInfo(entry: ApiCosmetic): CosmeticInfo {
  return {
    id: entry.base,
    filename: `${entry.base}.png`,
    type: entry.cat as CosmeticType,
    displayName: entry.name,
    availability: deriveAvailability(entry.cat, entry.base),
    price: 0,
    url: entry.url,
  };
}

/**
 * Load the catalog once. Concurrent callers share the same request.
 *
 * A failure leaves the catalog empty and is not cached, so a later call
 * retries rather than being stuck with nothing for the session.
 */
export function loadCatalog(): Promise<CosmeticInfo[]> {
  if (catalog.length > 0) return Promise.resolve(catalog);
  if (loadPromise) return loadPromise;

  loadPromise = fetchJson<ApiCosmeticsResponse>(MG_API.cosmetics)
    .then((response) => {
      catalog = (response.categories ?? []).flatMap((category) =>
        (category.items ?? []).map(toCosmeticInfo)
      );
      loadPromise = null;
      console.log(`[Avatar] Catalog loaded: ${catalog.length} cosmetics`);
      return catalog;
    })
    .catch((error) => {
      loadPromise = null;
      console.error("[Avatar] Failed to load cosmetic catalog:", error);
      return [];
    });

  return loadPromise;
}

/**
 * The catalog as loaded so far.
 *
 * Empty until {@link loadCatalog} resolves — callers that cannot deal with an
 * empty list should await it instead.
 */
export function getCatalog(): readonly CosmeticInfo[] {
  return catalog;
}

export function isCatalogLoaded(): boolean {
  return catalog.length > 0;
}

/**
 * Absolute URL of a cosmetic asset, by filename.
 *
 * Callers used to build this by hand as `baseUrl + filename`, which meant
 * every one of them had to know how the game versions its asset paths. The
 * catalog already carries the finished URL, so they look it up instead.
 *
 * Returns "" for an unknown filename, including before the catalog loads —
 * an `<img>` with an empty src fails visibly rather than fetching a wrong URL.
 */
export function resolveCosmeticUrl(filename: string): string {
  if (!filename) return "";

  if (catalog.length === 0) {
    warnCatalogNotLoaded();
    return "";
  }

  return catalog.find((item) => item.filename === filename)?.url ?? "";
}

let warnedNotLoaded = false;

/**
 * An empty catalog renders as blank images and nothing else, which is exactly
 * how this went unnoticed once already. Say it out loud, once.
 */
function warnCatalogNotLoaded(): void {
  if (warnedNotLoaded) return;
  warnedNotLoaded = true;
  console.warn(
    "[Avatar] Cosmetic URL requested before the catalog loaded — " +
    "MGCosmetic.init() has not completed. Cosmetics will render blank."
  );
}
