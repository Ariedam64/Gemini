// src/store/api.ts
// Consumption facade: select / set / subscribe, wired to the MIRROR.
// You should never use the original store directly anymore.

import { getMirror, getAtomByLabel, Unsubscribe, getCapturedInfo  } from "../hook/store";
export type { Unsubscribe } from "../hook/store";

export const Store = {
  async select<T = any>(sourceLabel: string): Promise<T> {
    const m = await getMirror();
    const atom = getAtomByLabel(sourceLabel);
    if (!atom) throw new Error(`[Store] Atom introuvable "${sourceLabel}"`);
    return m.get<T>(atom);
  },

  async set<T = any>(sourceLabel: string, next: T): Promise<void> {
    const m = await getMirror();
    const atom = getAtomByLabel(sourceLabel);
    if (!atom) throw new Error(`[Store] Atom introuvable "${sourceLabel}"`);
    await m.set<T>(atom, next);
  },

  async subscribe<T = any>(sourceLabel: string, cb: (value: T) => void): Promise<Unsubscribe> {
    const m = await getMirror();
    const atom = getAtomByLabel(sourceLabel);
    if (!atom) throw new Error(`[Store] Atom introuvable "${sourceLabel}"`);
    return m.sub<T>(atom, (curr) => { try { cb(curr); } catch {} });
  },

  async subscribeImmediate<T = any>(sourceLabel: string, cb: (value: T) => void): Promise<Unsubscribe> {
    const v = await Store.select<T>(sourceLabel);
    try { cb(v); } catch {}
    return Store.subscribe<T>(sourceLabel, cb);
  },
};

export async function prewarm(): Promise<void> {
  await getMirror(); // trigger mirror creation
}

export async function waitForStore(opts: { timeoutMs?: number; intervalMs?: number } = {}) {
  const { timeoutMs = 5000, intervalMs = 50 } = opts;
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    const info = getCapturedInfo();
    if (info.via && !info.polyfill) return; // found via fiber, not a polyfill
    await new Promise(r => setTimeout(r, intervalMs));
  }
  throw new Error("Store non capturé dans le délai imparti");
}
