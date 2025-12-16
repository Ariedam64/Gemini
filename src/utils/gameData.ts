// Access catalogs captured by the loader via window.__MGH_CATALOGS

import { readSharedGlobal } from "./pageContext";

export type BundleCatalogs = {
  itemCatalog: any | null;
  decorCatalog: any | null;
  mutationCatalog: any | null;
  eggCatalog: any | null;
  petCatalog: any | null;
  petAbilities: any | null;
  plantCatalog: any | null;
  weatherCatalog: any | null;
};

// Global name exposed by the loader: root.__MGH_CATALOGS
const GLOBAL_NAME = "__MGH_CATALOGS";

// No-op hook (compat with earlier code paths)
export function initBundleCatalogHook(): void { /* loader now captures at document-start */ }

/* ---------------------------- Raw accessors ---------------------------- */

/**
 * Return the raw object set by the loader on window.__MGH_CATALOGS,
 * or null if nothing has been captured yet.
 */
export function getRuntimeCatalogs(): BundleCatalogs | null {
  const val = readSharedGlobal<BundleCatalogs>(GLOBAL_NAME);
  return val ?? null;
}

/* ---------------------------- Targeted helpers ---------------------------- */

export function getRuntimeItemCatalog<T = any>(): T | null {
  return (getRuntimeCatalogs()?.itemCatalog ?? null) as T | null;
}

export function getRuntimeDecorCatalog<T = any>(): T | null {
  return (getRuntimeCatalogs()?.decorCatalog ?? null) as T | null;
}

export function getRuntimeMutationCatalog<T = any>(): T | null {
  return (getRuntimeCatalogs()?.mutationCatalog ?? null) as T | null;
}

export function getRuntimeEggCatalog<T = any>(): T | null {
  return (getRuntimeCatalogs()?.eggCatalog ?? null) as T | null;
}

export function getRuntimePetCatalog<T = any>(): T | null {
  return (getRuntimeCatalogs()?.petCatalog ?? null) as T | null;
}

export function getRuntimePetAbilities<T = any>(): T | null {
  return (getRuntimeCatalogs()?.petAbilities ?? null) as T | null;
}

export function getRuntimePlantCatalog<T = any>(): T | null {
  return (getRuntimeCatalogs()?.plantCatalog ?? null) as T | null;
}

export function getRuntimeWeatherCatalog<T = any>(): T | null {
  return (getRuntimeCatalogs()?.weatherCatalog ?? null) as T | null;
}

/* ---------------------------- Async helpers (optional) ---------------------------- */

type CatalogKey = keyof BundleCatalogs;

/**
 * Wait until at least one catalog is present in __MGH_CATALOGS.
 * Returns the whole object.
 */
export function waitForRuntimeCatalogs(
  timeoutMs = 10_000,
  intervalMs = 50
): Promise<BundleCatalogs> {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const tick = () => {
      const current = getRuntimeCatalogs();
      if (current && Object.values(current).some(v => v != null)) {
        resolve(current);
        return;
      }
      if (Date.now() - start >= timeoutMs) {
        reject(new Error("Runtime catalogs not available within timeout"));
        return;
      }
      setTimeout(tick, intervalMs);
    };

    tick();
  });
}

/**
 * Wait until a specific catalog is present (itemCatalog, plantCatalog, etc.).
 */
export function waitForRuntimeCatalogKey<K extends CatalogKey>(
  key: K,
  timeoutMs = 10_000,
  intervalMs = 50
): Promise<NonNullable<BundleCatalogs[K]>> {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const tick = () => {
      const all = getRuntimeCatalogs();
      const val = all && all[key];
      if (val != null) {
        resolve(val as NonNullable<BundleCatalogs[K]>);
        return;
      }
      if (Date.now() - start >= timeoutMs) {
        reject(new Error(`Runtime catalog "${String(key)}" not available within timeout`));
        return;
      }
      setTimeout(tick, intervalMs);
    };

    tick();
  });
}

// Backward-compatible aliases used across the codebase
export const getItemCatalog = getRuntimeItemCatalog;
export const getDecorCatalog = getRuntimeDecorCatalog;
export const getMutationCatalog = getRuntimeMutationCatalog;
export const getEggCatalog = getRuntimeEggCatalog;
export const getPetCatalog = getRuntimePetCatalog;
export const getPetAbilities = getRuntimePetAbilities;
export const getPlantCatalog = getRuntimePlantCatalog;
export const getWeatherCatalog = getRuntimeWeatherCatalog;
export const waitForKey = waitForRuntimeCatalogKey;
