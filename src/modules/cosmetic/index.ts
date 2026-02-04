// src/modules/cosmetic/index.ts
// MGCosmetic - Cosmetic image management (HTML images)

import type { CreateOptions, ShowOptions } from "./types";
import { isReady } from "./state";
import { initCosmeticSystem } from "./logic/init";
import { categories, list, url } from "./logic/query";
import { create, show, clear } from "./logic/display";
import { attach } from "./logic/overlay";
import { Avatar } from "./avatar";

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

function ensureReady(): void {
  if (!isReady()) throw new Error("MGCosmetic not ready yet");
}

export const MGCosmetic = {
  init: initCosmeticSystem,
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
