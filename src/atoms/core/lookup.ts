// src/atoms/core/lookup.ts
// Atom lookup utilities: find atoms by label from the game's atom cache

import { pageWindow } from "../../utils/pageContext";

/* ================================= Cache ================================= */

// Global cache for atom label lookups (shared across scripts)
const CACHE_KEY = "__ATOM_LABEL_CACHE__";

function getLabelCache(): Map<string, any> {
  const w = pageWindow as any;
  if (!w[CACHE_KEY]) {
    w[CACHE_KEY] = new Map<string, any>();
  }
  return w[CACHE_KEY];
}

/* ================================= Lookup ================================= */

/**
 * Get the game's Jotai atom cache
 */
export function getAtomCache(): Map<any, any> | undefined {
  return (pageWindow as any).jotaiAtomCache?.cache;
}

/**
 * Find all atoms matching a regex pattern
 */
export function findAtomsByLabel(regex: RegExp): any[] {
  const cache = getAtomCache();
  if (!cache) return [];

  const results: any[] = [];

  for (const atom of cache.values()) {
    const label = atom?.debugLabel || atom?.label || "";
    if (regex.test(String(label))) {
      results.push(atom);
    }
  }

  return results;
}

/**
 * Get a single atom by its exact label (cached)
 */
export function getAtomByLabel(label: string): any | null {
  const labelCache = getLabelCache();

  // Check cache first
  const cached = labelCache.get(label);
  if (cached) return cached;

  const atomCache = getAtomCache();
  if (!atomCache) return null;

  // Search for atom by label
  for (const atom of atomCache.values()) {
    const atomLabel = atom?.debugLabel || atom?.label || "";
    if (atomLabel === label) {
      labelCache.set(label, atom);
      return atom;
    }
  }

  return null;
}

/**
 * Clear the label cache (useful for debugging)
 */
export function clearLabelCache(): void {
  getLabelCache().clear();
}
