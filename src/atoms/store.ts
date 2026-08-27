// src/atoms/store.ts
// Store facade: select / set / subscribe
// All access to Jotai atoms goes through this facade

import { getMirror, getCapturedInfo } from "./core/bridge";
import { getAtomByLabel, hasAtomLabel, waitForAtomByLabel } from "./core/lookup";
import type { Unsubscribe } from "./types";

// Re-export waitForStore from bridge
export { waitForStore } from "./core/bridge";

export const Store = {
  /**
   * Select (read) the current value of an atom.
   *
   * Deliberately non-waiting: a read must answer right away rather than hang
   * its caller. For a value the game has not registered yet, subscribe (which
   * attaches late) or await {@link Store.waitFor} first.
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

  /** Whether the game has registered this atom (or one of its aliases) yet. */
  async has(sourceLabel: string): Promise<boolean> {
    await getMirror();
    return hasAtomLabel(sourceLabel);
  },

  /**
   * Resolve once the game registers this atom. `false` means the wait timed
   * out, which in practice means the label no longer exists in the bundle.
   *
   * Pass `timeoutMs` when the caller cannot afford the default wait — anything
   * on a startup path should, so a renamed atom degrades instead of hanging.
   */
  async waitFor(sourceLabel: string, timeoutMs?: number): Promise<boolean> {
    await getMirror();
    return !!(await waitForAtomByLabel(sourceLabel, timeoutMs));
  },

  /**
   * Subscribe to atom changes.
   *
   * The mod boots before the game creates its atoms, so an unknown label is not
   * an error: the subscription attaches later, as soon as the label shows up.
   * The returned unsubscribe cancels a pending wait as well as a live
   * subscription, and is safe to call more than once.
   */
  async subscribe<T = unknown>(
    sourceLabel: string,
    callback: (value: T) => void
  ): Promise<Unsubscribe> {
    return attachSubscription<T>(sourceLabel, callback, false);
  },

  /**
   * Get info about how the Jotai store was captured (fiber/write/polyfill)
   */
  getCapturedInfo() {
    return getCapturedInfo();
  },

  /**
   * Subscribe to atom changes and immediately call with the current value.
   *
   * When the atom arrives late, the current value is pushed at attach time
   * rather than at boot — otherwise the subscriber would sit on the empty
   * early read until a change that may never come.
   */
  async subscribeImmediate<T = unknown>(
    sourceLabel: string,
    callback: (value: T) => void
  ): Promise<Unsubscribe> {
    return attachSubscription<T>(sourceLabel, callback, true);
  },
};

/**
 * Shared subscribe implementation.
 *
 * Order matters when `pushCurrent` is set: subscribe first, then read, so
 * nothing that happens in between is lost.
 */
async function attachSubscription<T>(
  sourceLabel: string,
  callback: (value: T) => void,
  pushCurrent: boolean
): Promise<Unsubscribe> {
  const mirror = await getMirror();

  let cancelled = false;
  let attachedUnsubscribe: Unsubscribe | null = null;

  const safeCallback = (value: T): void => {
    try {
      callback(value);
    } catch {
      // Ignore callback errors
    }
  };

  const attach = async (atom: any): Promise<void> => {
    const unsubscribe = await mirror.sub<T>(atom, safeCallback);

    if (cancelled) {
      try { unsubscribe(); } catch { /* ignore */ }
      return;
    }
    attachedUnsubscribe = unsubscribe;

    if (!pushCurrent) return;
    try {
      const current = await mirror.get<T>(atom);
      if (!cancelled) safeCallback(current);
    } catch {
      // Atom exists but cannot be read yet — the subscription will deliver it.
    }
  };

  const known = getAtomByLabel(sourceLabel);
  if (known) {
    await attach(known);
  } else {
    void (async () => {
      const found = await waitForAtomByLabel(sourceLabel);
      if (!found || cancelled) return;
      try { await attach(found); } catch { /* ignore */ }
    })();
  }

  return () => {
    cancelled = true;
    const unsubscribe = attachedUnsubscribe;
    attachedUnsubscribe = null;
    try { unsubscribe?.(); } catch { /* ignore */ }
  };
}

/**
 * Prewarm the store by triggering mirror creation
 */
export async function prewarm(): Promise<void> {
  await getMirror();
}
