// src/modules/core/manifest.ts
// MGManifest - Loads and parses the game manifest.json

import { getJSON } from "../utils/network";
import { joinPath } from "../utils/path";
import { MGAssets } from "./assets";

// Types for manifest structure
export interface ManifestAsset {
  alias?: string[];
  src?: string[];
  data?: {
    tags?: Record<string, boolean>;
    [key: string]: any;
  };
}

export interface ManifestBundle {
  name: string;
  assets: ManifestAsset[];
}

export interface Manifest {
  bundles: ManifestBundle[];
}

// Cache: baseUrl -> Promise<Manifest>
const _cache = new Map<string, Promise<Manifest>>();

/**
 * Load the manifest.json from the given base URL (or default assets base)
 */
async function load(baseUrl?: string): Promise<Manifest> {
  const base = baseUrl || (await MGAssets.base());

  if (_cache.has(base)) {
    return _cache.get(base)!;
  }

  const promise = getJSON<Manifest>(joinPath(base, "manifest.json"));
  _cache.set(base, promise);
  return promise;
}

/**
 * Get a specific bundle from the manifest by name
 */
function getBundle(manifest: Manifest, name: string): ManifestBundle | null {
  return manifest?.bundles?.find((bundle) => bundle?.name === name) || null;
}

/**
 * List all JSON files from a bundle (excluding manifest.json)
 */
function listJsonFromBundle(bundle: ManifestBundle | null): string[] {
  const result = new Set<string>();

  for (const asset of bundle?.assets || []) {
    for (const src of asset?.src || []) {
      if (typeof src === "string" && src.endsWith(".json") && src !== "manifest.json") {
        result.add(src);
      }
    }
  }

  return Array.from(result);
}

export const MGManifest = {
  load,
  getBundle,
  listJsonFromBundle,
};
