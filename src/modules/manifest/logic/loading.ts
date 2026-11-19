// src/modules/manifest/logic/loading.ts
// Manifest loading and parsing logic

import { getJSON } from "../../utils/network";
import { MGAssets } from "../../assets";
import type { Manifest, ManifestBundle, ManifestLoadOptions } from "../types";
import { getCachedManifest, setCachedManifest } from "../state";
import { isManifestFile, manifestUrl } from "./filename";

let defaultManifest: Manifest | null = null;

/**
 * Initialize module by loading default manifest
 */
export async function initializeManifest(): Promise<void> {
  if (defaultManifest) return;
  defaultManifest = await loadManifest();
}

/**
 * Check if module is ready
 */
export function isModuleReady(): boolean {
  return defaultManifest !== null;
}

/**
 * Load manifest.rgba8.json from given base URL or default assets base.
 * One request per base URL: the promise is cached, even if it rejects.
 */
export async function loadManifest(options: ManifestLoadOptions = {}): Promise<Manifest> {
  const baseUrl = options.baseUrl ?? await MGAssets.base();

  const cached = getCachedManifest(baseUrl);
  if (cached) return cached;

  const promise = getJSON<Manifest>(manifestUrl(baseUrl));
  setCachedManifest(baseUrl, promise);

  return promise;
}

/**
 * Get a specific bundle from manifest by name
 */
export function getBundleByName(manifest: Manifest, bundleName: string): ManifestBundle | null {
  return manifest.bundles.find((bundle) => bundle.name === bundleName) ?? null;
}

/**
 * List all JSON files from a bundle (excluding the manifest itself)
 */
export function extractJsonFiles(bundle: ManifestBundle | null): string[] {
  if (!bundle) return [];

  const jsonFiles = new Set<string>();

  for (const asset of bundle.assets) {
    for (const src of asset.src ?? []) {
      if (typeof src === "string" && src.endsWith(".json") && !isManifestFile(src)) {
        jsonFiles.add(src);
      }
    }
  }

  return Array.from(jsonFiles);
}
