// src/atoms/store.ts
// Store facade: select / set / subscribe
// All access to Jotai atoms goes through this facade

import { getMirror } from "./core/bridge";
import { getAtomByLabel } from "./core/lookup";
import type { Unsubscribe } from "./types";

// Re-export waitForStore from bridge
export { waitForStore } from "./core/bridge";

export const Store = {
  /**
   * Select (read) the current value of an atom
   */
  async select<T = unknown>(sourceLabel: string): Promise<T> {
    const mirror = await getMirror();
    const atom = getAtomByLabel(sourceLabel);

    if (!atom) {
      throw new Error(`[Store] Atom not found: "${sourceLabel}"`);
    }

    return mirror.get<T>(atom);
  },

  /**
   * Set a new value for an atom
   */
  async set<T = unknown>(sourceLabel: string, next: T): Promise<void> {
    const mirror = await getMirror();
    const atom = getAtomByLabel(sourceLabel);

    if (!atom) {
      throw new Error(`[Store] Atom not found: "${sourceLabel}"`);
    }

    await mirror.set<T>(atom, next);
  },

  /**
   * Subscribe to atom changes
   */
  async subscribe<T = unknown>(
    sourceLabel: string,
    callback: (value: T) => void
  ): Promise<Unsubscribe> {
    const mirror = await getMirror();
    const atom = getAtomByLabel(sourceLabel);

    if (!atom) {
      throw new Error(`[Store] Atom not found: "${sourceLabel}"`);
    }

    return mirror.sub<T>(atom, (current) => {
      try {
        callback(current);
      } catch {
        // Ignore callback errors
      }
    });
  },

  /**
   * Subscribe to atom changes and immediately call with current value
   */
  async subscribeImmediate<T = unknown>(
    sourceLabel: string,
    callback: (value: T) => void
  ): Promise<Unsubscribe> {
    const value = await Store.select<T>(sourceLabel);

    try {
      callback(value);
    } catch {
      // Ignore callback errors
    }

    return Store.subscribe<T>(sourceLabel, callback);
  },
};

/**
 * Prewarm the store by triggering mirror creation
 */
export async function prewarm(): Promise<void> {
  await getMirror();
}
