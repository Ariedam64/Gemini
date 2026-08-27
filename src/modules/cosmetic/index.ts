// src/modules/cosmetic/index.ts
// MGCosmetic - Cosmetic image management (HTML images)

import type { CreateOptions, ShowOptions } from "./types";
import { isReady } from "./state";
import { initCosmeticSystem } from "./logic/init";
import { categories, list, url } from "./logic/query";
import { create, show, clear } from "./logic/display";
import { attach } from "./logic/overlay";
import { Avatar } from "./avatar";
import { loadCatalog as loadAvatarCatalog } from "./avatar/logic/catalog";

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

function ensureReady(): void {
  if (!isReady()) throw new Error("MGCosmetic not ready yet");
}

export const MGCosmetic = {
  /**
   * Initialize the cosmetic system and the avatar catalog.
   *
   * The avatar catalog has to load here: `Avatar.list()` and
   * `resolveCosmeticUrl()` are synchronous, so anything rendering cosmetics
   * gets an empty list unless the catalog is already in memory. It used to be
   * filled by an import-time side effect, which is why nothing ever called an
   * init for it.
   *
   * The two run independently — a missing cosmetic bundle in the game manifest
   * must not cost us the avatar catalog, and the reverse. Ownership stays lazy
   * (see `listAsync`): it needs an authenticated session and must not hold up
   * module loading.
   */
  init: async (): Promise<boolean> => {
    const [systemReady] = await Promise.allSettled([
      initCosmeticSystem(),
      loadAvatarCatalog(),
    ]);
    if (systemReady.status === "rejected") throw systemReady.reason;
    return systemReady.value;
  },
  isReady,

  categories: () => {
    ensureReady();
    return categories();
  },

  list: (category: string) => {
    ensureReady();
    return list(category);
  },

  url: ((a: string, b?: string) => {
    ensureReady();
    return url(a as any, b as any);
  }) as {
    (category: string, asset: string): string;
    (asset: string): string;
  },

  create: ((a: string, b?: string | CreateOptions, c?: CreateOptions) => {
    ensureReady();
    return create(a as any, b as any, c as any);
  }) as {
    (category: string, asset: string, options?: CreateOptions): HTMLImageElement;
    (asset: string, options?: CreateOptions): HTMLImageElement;
  },

  show: ((a: string, b?: string | ShowOptions, c?: ShowOptions) => {
    ensureReady();
    return show(a as any, b as any, c as any);
  }) as {
    (category: string, asset: string, options?: ShowOptions): HTMLImageElement;
    (asset: string, options?: ShowOptions): HTMLImageElement;
  },

  attach: (elementOrFn: HTMLElement | (() => HTMLElement)) => {
    ensureReady();
    return attach(elementOrFn);
  },

  clear: () => {
    ensureReady();
    return clear();
  },

  // Avatar sub-module
  Avatar,
};
