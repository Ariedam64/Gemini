// src/modules/manifest/state.ts
// State management for manifest cache

import type { Manifest } from "./types";

const manifestCache = new Map<string, Promise<Manifest>>();

/**
 * Get cached manifest promise by base URL
 */
export function getCachedManifest(baseUrl: string): Promise<Manifest> | undefined {
  return manifestCache.get(baseUrl);
}

/**
 * Set cached manifest promise
 */
export function setCachedManifest(baseUrl: string, promise: Promise<Manifest>): void {
  manifestCache.set(baseUrl, promise);
}

/**
 * Check if manifest is cached for given base URL
 */
export function hasManifest(baseUrl: string): boolean {
  return manifestCache.has(baseUrl);
}

/**
 * Clear all cached manifests
 */
export function clearCache(): void {
  manifestCache.clear();
}
