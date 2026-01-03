// src/modules/manifest/logic.ts
// Manifest loading and parsing logic

import { getJSON } from "../utils/network";
import { joinPath } from "../utils/path";
import { MGAssets } from "../assets";
import type { Manifest, ManifestBundle, ManifestLoadOptions } from "./types";
import { getCachedManifest, setCachedManifest } from "./state";

const MANIFEST_FILENAME = "manifest.json";

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
 * Load manifest.json from given base URL or default assets base
 */
export async function loadManifest(options: ManifestLoadOptions = {}): Promise<Manifest> {
  const baseUrl = options.baseUrl ?? await MGAssets.base();

  const cached = getCachedManifest(baseUrl);
  if (cached) return cached;

  const promise = getJSON<Manifest>(joinPath(baseUrl, MANIFEST_FILENAME));
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
 * List all JSON files from a bundle (excluding manifest.json)
 */
export function extractJsonFiles(bundle: ManifestBundle | null): string[] {
  if (!bundle) return [];

  const jsonFiles = new Set<string>();

  for (const asset of bundle.assets) {
    for (const src of asset.src ?? []) {
      if (typeof src === "string" && src.endsWith(".json") && src !== MANIFEST_FILENAME) {
        jsonFiles.add(src);
      }
    }
  }

  return Array.from(jsonFiles);
}
