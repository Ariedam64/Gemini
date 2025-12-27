// src/atoms/core/bridge.ts
// Bridge to game's Jotai store: capture via Fiber, mirror API, atom lookup.
// Idempotent multi-scripts. Zero monkey-patching.

import { pageWindow } from "../../utils/pageContext";
import type { Unsubscribe } from "../types";
import { getAtomCache } from "./lookup";

/* ========================= React DevTools Hook ========================= */

/**
 * Install a minimal React DevTools hook if not present.
 * This allows us to capture React Fiber roots even without the extension.
 * Must be called BEFORE React loads (at document-start).
 */
export function installReactDevToolsHook(): void {
  const win = pageWindow as any;

  // Already installed
  if (win.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    return;
  }

  // Create minimal hook structure that React will populate
  const renderers = new Map<number, any>();
  const fiberRoots = new Map<number, Set<any>>();

  win.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
    renderers,
    supportsFiber: true,
    inject: (renderer: any) => {
      const id = renderers.size + 1;
      renderers.set(id, renderer);
      fiberRoots.set(id, new Set());
      return id;
    },
    onCommitFiberRoot: (id: number, root: any) => {
      const roots = fiberRoots.get(id);
      if (roots) {
        roots.add(root);
      }
    },
    onCommitFiberUnmount: () => {},
    onPostCommitFiberRoot: () => {},
    getFiberRoots: (id: number) => fiberRoots.get(id),
    // Minimal stubs for compatibility
    checkDCE: () => {},
    isDisabled: false,
  };
}

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

/* ============================ Module State ============================ */

// Use local module state instead of pageWindow global to avoid Firefox context issues
const _state: GlobalState = {
  baseStore: null,
  captureInProgress: false,
  captureError: null,
  lastCapturedVia: null,
  mirror: undefined,
};

function getGlobal(): GlobalState {
  return _state;
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
    const CustomEventCtor = (pageWindow as any).CustomEvent || CustomEvent;
    pageWindow.dispatchEvent?.(new CustomEventCtor(READY_EVENT));
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
    const EventCtor = (pageWindow as any).Event || Event;
    pageWindow.dispatchEvent?.(new EventCtor("visibilitychange"));
  } catch {
    // Ignore dispatch errors
  }
}

/* ========================== Capture via Fiber ========================== */

// Helper to check if something looks like a Jotai store
function isJotaiStore(v: any): v is JotaiStore {
  return (
    v &&
    typeof v === "object" &&
    typeof v.get === "function" &&
    typeof v.set === "function" &&
    typeof v.sub === "function"
  );
}

// Helper to recursively search an object for a store (with depth limit)
function findStoreInObject(obj: any, depth = 0, seen = new WeakSet()): JotaiStore | null {
  if (depth > 3 || !obj || typeof obj !== "object") return null;
  if (seen.has(obj)) return null;
  try {
    seen.add(obj);
  } catch {
    return null;
  }

  if (isJotaiStore(obj)) return obj;

  // Check common property names where store might be
  const keysToCheck = ["store", "value", "current", "state", "s", "baseStore"];
  for (const key of keysToCheck) {
    try {
      const val = obj[key];
      if (isJotaiStore(val)) return val;
    } catch {
      // Ignore access errors
    }
  }

  return null;
}

/**
 * Capture the store by scanning React Fiber roots for a Jotai store.
 * Looks in multiple locations:
 * 1. Provider value (pendingProps.value)
 * 2. useStore hook state (memoizedState)
 * 3. Any object with get/set/sub signature
 */
function findStoreViaFiber(): JotaiStore | null {
  const g = getGlobal();
  const hook: any = (pageWindow as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (!hook?.renderers?.size) {
    return null;
  }

  // Check if we have any fiber roots yet
  let totalRoots = 0;
  for (const [rid] of hook.renderers) {
    const roots = hook.getFiberRoots?.(rid);
    if (roots) totalRoots += roots.size || 0;
  }
  if (totalRoots === 0) {
    return null;
  }

  for (const [rid] of hook.renderers) {
    const roots = hook.getFiberRoots?.(rid);
    if (!roots) continue;

    for (const root of roots) {
      const seen = new Set<any>();
      const stack = [root.current];

      while (stack.length) {
        const f = stack.pop();
        if (!f || seen.has(f)) continue;
        seen.add(f);

        // 1. Check pendingProps.value (Provider pattern)
        try {
          const v = f?.pendingProps?.value;
          if (isJotaiStore(v)) {
            g.lastCapturedVia = "fiber";
            return v;
          }
        } catch {
          // Ignore access errors
        }

        // 2. Check memoizedState chain (hooks)
        try {
          let state = f?.memoizedState;
          let stateCount = 0;
          while (state && stateCount < 15) {
            stateCount++;
            // Check the state itself
            const storeInState = findStoreInObject(state);
            if (storeInState) {
              g.lastCapturedVia = "fiber";
              return storeInState;
            }
            // Check memoizedState property
            const storeInMemo = findStoreInObject(state.memoizedState);
            if (storeInMemo) {
              g.lastCapturedVia = "fiber";
              return storeInMemo;
            }
            state = state.next;
          }
        } catch {
          // Ignore access errors
        }

        // 3. Check stateNode (class components)
        try {
          if (f?.stateNode) {
            const storeInNode = findStoreInObject(f.stateNode);
            if (storeInNode) {
              g.lastCapturedVia = "fiber";
              return storeInNode;
            }
          }
        } catch {
          // Ignore access errors
        }

        if (f.child) stack.push(f.child);
        if (f.sibling) stack.push(f.sibling);
        if (f.alternate) stack.push(f.alternate);
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
  // Wait for jotaiAtomCache to be available
  const cacheWaitStart = Date.now();
  let cache = getAtomCache();

  while (!cache && Date.now() - cacheWaitStart < timeoutMs) {
    await sleep(100);
    cache = getAtomCache();
  }

  if (!cache) {
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

async function captureWithFiberPolling(timeoutMs = 10000): Promise<JotaiStore> {
  const g = getGlobal();

  triggerVisibilityChange();

  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    const store = findStoreViaFiber();
    if (store) {
      return store;
    }
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

