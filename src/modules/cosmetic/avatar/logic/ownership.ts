/**
 * Avatar Ownership State
 * Manages owned cosmetic items cache
 */

import { fetchOwnedCosmetics } from './api';
import { waitForStore } from '../../../../atoms/store';
import { isDevBuild } from '../../../../utils/buildMode';

interface OwnershipState {
  ownedFilenames: Set<string>;
  loaded: boolean;
  error: Error | null;
}

const state: OwnershipState = {
  ownedFilenames: new Set(),
  loaded: false,
  error: null,
};

const listeners: (() => void)[] = [];

function notify() {
  listeners.forEach(fn => fn());
}

/**
 * Initialize ownership data
 */
export async function initOwnership(): Promise<void> {
  if (isDevBuild()) {
    state.loaded = true;
    return;
  }

  try {
    await waitForStore();
    const { Store } = await import('../../../../atoms/store');

    const isAuth = await Store.select('isUserAuthenticatedAtom');

    if (!isAuth) {
      state.loaded = true;
      notify();
      return;
    }

    const owned = await fetchOwnedCosmetics();
    state.ownedFilenames = new Set(owned.map(item => item.cosmeticFilename));
    state.loaded = true;
    state.error = null;
    notify();
  } catch (err) {
    state.error = err as Error;
    state.loaded = true;
    notify();
  }
}

/**
 * Check if user owns a cosmetic item
 */
export function isOwned(filename: string): boolean {
  if (isDevBuild()) {
    return true;
  }

  return state.ownedFilenames.has(filename);
}

/**
 * Check if ownership data is loaded
 */
export function isLoaded(): boolean {
  return state.loaded;
}

/**
 * Wait for ownership data to load
 */
export async function waitForOwnership(): Promise<void> {
  if (state.loaded) return;

  return new Promise((resolve) => {
    const unsub = subscribe(() => {
      if (state.loaded) {
        unsub();
        resolve();
      }
    });
  });
}

/**
 * Subscribe to ownership changes
 */
export function subscribe(callback: () => void): () => void {
  listeners.push(callback);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

/**
 * Get all owned filenames
 */
export function getOwnedFilenames(): Set<string> {
  return new Set(state.ownedFilenames);
}

/**
 * Manually refresh ownership data
 */
export async function refresh(): Promise<void> {
  state.loaded = false;
  await initOwnership();
}
