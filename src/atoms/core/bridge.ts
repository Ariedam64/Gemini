// src/atoms/core/bridge.ts
// Bridge to game's Jotai store: capture via Fiber, mirror API, atom lookup.
// Idempotent multi-scripts. Zero monkey-patching.

import { pageWindow } from "../../utils/pageContext";
import type { Unsubscribe } from "../types";
import { getAtomCache } from "./lookup";

/* ================================ Types ================================ */

export type JotaiStore = {
  get: (atom: any) => any;
  set: (atom: any, value: any) => void | Promise<void>;
  sub: (atom: any, cb: () => void) => Unsubscribe;
  __polyfill?: boolean;
};

type Listener<T> = (value: T, prev: T) => void;

type MirrorRecord<T = any> = {
  last: T | undefined;
  has: boolean;
  subs: Set<Listener<T>>;
  unsubUpstream?: Unsubscribe;
};

export type MirrorAPI = {
  get<T = any>(atom: any): Promise<T>;
  set<T = any>(atom: any, value: T): Promise<void>;
  sub<T = any>(atom: any, cb: Listener<T>): Promise<Unsubscribe>;
  getShadow<T = any>(atom: any): T | undefined;
  hasShadow(atom: any): boolean;
  ensureWatch<T = any>(atom: any): Promise<void>;
  asStore(): Promise<JotaiStore>;
};

type CaptureVia = "fiber" | "write" | "polyfill" | null;

type GlobalState = {
  baseStore: JotaiStore | null;
  captureInProgress: boolean;
  captureError: unknown;
  lastCapturedVia: CaptureVia;
  mirror?: MirrorAPI;
};

/* ============================ Global Singleton ============================ */

const GLOBAL_KEY = "__JOTAI_MIRROR_SINGLETON__";

function getGlobal(): GlobalState {
  const w = pageWindow as any;
  if (!w[GLOBAL_KEY]) {
    w[GLOBAL_KEY] = {
      baseStore: null,
      captureInProgress: false,
      captureError: null,
      lastCapturedVia: null,
      mirror: undefined,
      atomByLabelCache: new Map(),
    } as GlobalState;
  }
  return w[GLOBAL_KEY] as GlobalState;
}

/* ============================== Ready Event ============================== */

const READY_EVENT = "__JOTAI_STORE_READY__";
let _readyNotified = false;
const _readyListeners = new Set<() => void>();

function notifyReadyOnce(): void {
  if (_readyNotified) return;
  _readyNotified = true;

  for (const fn of _readyListeners) {
    try {
      fn();
    } catch {
      // Ignore listener errors
    }
  }

  try {
    pageWindow.dispatchEvent?.(new pageWindow.CustomEvent(READY_EVENT));
  } catch {
    // Ignore dispatch errors
  }
}

/** Subscribe to be notified when a real store is captured (non-polyfill). */
export function onStoreReady(cb: () => void): Unsubscribe {
  _readyListeners.add(cb);

  const info = getCapturedInfo();
  if (info.via && !info.polyfill) {
    try {
      cb();
    } catch {
      // Ignore callback errors
    }
  }

  return () => {
    _readyListeners.delete(cb);
  };
}

/** Wait for a real store to be available. */
export async function waitForStore(
  options: { timeoutMs?: number; intervalMs?: number } = {}
): Promise<void> {
  const { timeoutMs = 6000, intervalMs = 50 } = options;

  const info = getCapturedInfo();
  if (info.via && !info.polyfill) return;

  return new Promise<void>((resolve, reject) => {
    let resolved = false;

    const unsub = onStoreReady(() => {
      if (resolved) return;
      resolved = true;
      unsub();
      resolve();
    });

    const startTime = Date.now();

    const poll = async () => {
      while (!resolved && Date.now() - startTime < timeoutMs) {
        const current = getCapturedInfo();
        if (current.via && !current.polyfill) {
          if (resolved) return;
          resolved = true;
          unsub();
          resolve();
          return;
        }
        await sleep(intervalMs);
      }

      if (!resolved) {
        resolved = true;
        unsub();
        reject(new Error("Store not captured within timeout"));
      }
    };

    poll();
  });
}

/* ================================= Utils ================================= */

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function triggerVisibilityChange(): void {
  try {
    pageWindow.dispatchEvent?.(new pageWindow.Event("visibilitychange"));
  } catch {
    // Ignore dispatch errors
  }
}

/* ========================== Capture via Fiber ========================== */

function findStoreViaFiber(): JotaiStore | null {
  const g = getGlobal();
  const hook: any = (pageWindow as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (!hook?.renderers?.size) return null;

  for (const [rid] of hook.renderers) {
    const roots = hook.getFiberRoots?.(rid);
    if (!roots) continue;

    for (const root of roots) {
      const seen = new Set<any>();
      const stack = [root.current];

      while (stack.length) {
        const fiber = stack.pop();
        if (!fiber || seen.has(fiber)) continue;
        seen.add(fiber);

        const value = fiber?.pendingProps?.value;
        if (
          value &&
          typeof value.get === "function" &&
          typeof value.set === "function" &&
          typeof value.sub === "function"
        ) {
          g.lastCapturedVia = "fiber";
          return value as JotaiStore;
        }

        if (fiber.child) stack.push(fiber.child);
        if (fiber.sibling) stack.push(fiber.sibling);
        if (fiber.alternate) stack.push(fiber.alternate);
      }
    }
  }

  return null;
}

/* ======================== Capture via Write Patch ======================== */

function createPolyfillStore(): JotaiStore {
  return {
    get: () => {
      throw new Error("Store not captured: get unavailable");
    },
    set: () => {
      throw new Error("Store not captured: set unavailable");
    },
    sub: () => () => {},
    __polyfill: true,
  };
}

async function captureViaWritePatch(timeoutMs = 5000): Promise<JotaiStore> {
  const cache = getAtomCache();
  if (!cache) {
    console.warn("[jotai-bridge] jotaiAtomCache.cache not found");
    throw new Error("jotaiAtomCache.cache not found");
  }

  const g = getGlobal();
  let capturedGet: any = null;
  let capturedSet: any = null;

  // Track patched atoms for restoration
  const patched: any[] = [];

  const restorePatched = () => {
    for (const atom of patched) {
      try {
        if (atom.__origWrite) {
          atom.write = atom.__origWrite;
          delete atom.__origWrite;
        }
      } catch {
        // Ignore restore errors
      }
    }
  };

  // Patch all known atoms to intercept write calls
  for (const atom of cache.values()) {
    if (!atom || typeof atom.write !== "function" || atom.__origWrite) continue;

    const orig = atom.write;
    atom.__origWrite = orig;
    atom.write = function (get: any, set: any, ...args: any[]) {
      if (!capturedSet) {
        capturedGet = get;
        capturedSet = set;
        restorePatched();
      }
      return orig.call(this, get, set, ...args);
    };
    patched.push(atom);
  }

  // Trigger potential writes
  triggerVisibilityChange();

  // Wait for capture
  const startTime = Date.now();
  while (!capturedSet && Date.now() - startTime < timeoutMs) {
    await sleep(50);
  }

  // Timeout: return polyfill
  if (!capturedSet) {
    restorePatched();
    g.lastCapturedVia = "polyfill";
    console.warn("[jotai-bridge] write-patch: timeout → polyfill");
    return createPolyfillStore();
  }

  // Success: create mini-store from captured get/set
  g.lastCapturedVia = "write";

  return {
    get: (atom: any) => capturedGet(atom),
    set: (atom: any, value: any) => capturedSet(atom, value),
    sub: (atom: any, cb: () => void) => {
      // No official sub API here, use polling
      let last: any;
      try {
        last = capturedGet(atom);
      } catch {
        // Ignore initial get errors
      }

      const id = setInterval(() => {
        let curr: any;
        try {
          curr = capturedGet(atom);
        } catch {
          return;
        }

        if (curr !== last) {
          last = curr;
          try {
            cb();
          } catch {
            // Ignore callback errors
          }
        }
      }, 100);

      return () => clearInterval(id);
    },
  };
}

/* ============================ Capture Fallback ============================ */

async function captureWithFiberPolling(timeoutMs = 2000): Promise<JotaiStore> {
  const g = getGlobal();

  triggerVisibilityChange();

  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    const store = findStoreViaFiber();
    if (store) return store;
    await sleep(50);
  }

  g.lastCapturedVia = "polyfill";
  return createPolyfillStore();
}

/* ============================ Main Capture ============================ */

export async function ensureStore(): Promise<JotaiStore> {
  const g = getGlobal();

  // Already captured a real store
  if (g.baseStore && !g.baseStore.__polyfill) {
    notifyReadyOnce();
    return g.baseStore;
  }

  // Another capture in progress, wait for it
  if (g.captureInProgress) {
    const startTime = Date.now();
    const maxWait = 2500;

    while (!g.baseStore && Date.now() - startTime < maxWait) {
      await sleep(25);
    }

    if (g.baseStore) {
      if (!g.baseStore.__polyfill) notifyReadyOnce();
      return g.baseStore;
    }
  }

  g.captureInProgress = true;

  try {
    // 1. Try direct Fiber capture
    const viaFiber = findStoreViaFiber();
    if (viaFiber) {
      g.baseStore = viaFiber;
      notifyReadyOnce();
      return viaFiber;
    }

    // 2. Try write-patch capture
    try {
      const viaWrite = await captureViaWritePatch(5000);
      g.baseStore = viaWrite;
      if (!viaWrite.__polyfill) notifyReadyOnce();
      return viaWrite;
    } catch (e) {
      g.captureError = e;
    }

    // 3. Final fallback with polling
    const viaFallback = await captureWithFiberPolling();
    g.baseStore = viaFallback;
    return viaFallback;
  } catch (e) {
    g.captureError = e;
    throw e;
  } finally {
    g.captureInProgress = false;
  }
}

export function getCapturedInfo(): {
  via: CaptureVia;
  polyfill: boolean;
  error: unknown;
} {
  const g = getGlobal();
  return {
    via: g.lastCapturedVia,
    polyfill: !!g.baseStore?.__polyfill,
    error: g.captureError,
  };
}

/* ================================= Mirror ================================= */

async function createMirror(): Promise<MirrorAPI> {
  const base = await ensureStore();
  const records = new WeakMap<any, MirrorRecord>();

  const ensureUpstreamSub = async <T>(atom: any): Promise<MirrorRecord<T>> => {
    let rec = records.get(atom) as MirrorRecord<T> | undefined;
    if (rec) return rec;

    rec = { last: undefined, has: false, subs: new Set() };
    records.set(atom, rec);

    // Get initial value
    try {
      rec.last = base.get(atom) as T;
      rec.has = true;
    } catch {
      // Ignore initial get errors
    }

    // Subscribe to upstream changes
    const unsub = base.sub(atom, () => {
      let curr: T;
      try {
        curr = base.get(atom) as T;
      } catch {
        return;
      }

      const prev = rec!.last as T;
      const changed = !Object.is(curr, prev) || !rec!.has;

      rec!.last = curr;
      rec!.has = true;

      if (changed) {
        for (const fn of rec!.subs) {
          try {
            fn(curr, prev);
          } catch {
            // Ignore listener errors
          }
        }
      }
    });

    rec.unsubUpstream = unsub;
    return rec;
  };

  const api: MirrorAPI = {
    async get<T>(atom: any): Promise<T> {
      const rec = await ensureUpstreamSub<T>(atom);
      if (rec.has) return rec.last as T;

      const value = base.get(atom) as T;
      rec.last = value;
      rec.has = true;
      return value;
    },

    async set<T>(atom: any, value: T): Promise<void> {
      await base.set(atom, value as any);
      const rec = await ensureUpstreamSub<T>(atom);
      rec.last = value;
      rec.has = true;
    },

    async sub<T>(atom: any, cb: Listener<T>): Promise<Unsubscribe> {
      const rec = await ensureUpstreamSub<T>(atom);
      rec.subs.add(cb);

      // Immediately call with current value
      if (rec.has) {
        try {
          cb(rec.last as T, rec.last as T);
        } catch {
          // Ignore callback errors
        }
      }

      return () => {
        rec.subs.delete(cb);
      };
    },

    getShadow<T>(atom: any): T | undefined {
      const rec = records.get(atom) as MirrorRecord<T> | undefined;
      return rec?.last;
    },

    hasShadow(atom: any): boolean {
      return !!records.get(atom)?.has;
    },

    async ensureWatch<T>(atom: any): Promise<void> {
      await ensureUpstreamSub<T>(atom);
    },

    async asStore(): Promise<JotaiStore> {
      return {
        get: (atom: any) => this.get(atom),
        set: (atom: any, value: any) => this.set(atom, value),
        sub: (atom: any, cb: any) => {
          let unsub: Unsubscribe | null = null;
          this.sub(atom, () => cb()).then((u) => (unsub = u));
          return () => unsub?.();
        },
      };
    },
  };

  return api;
}

export async function getMirror(): Promise<MirrorAPI> {
  const g = getGlobal();
  if (g.mirror) return g.mirror;

  g.mirror = await createMirror();
  return g.mirror;
}

