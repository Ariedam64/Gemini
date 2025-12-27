// src/hook/store.ts
// Core: capture Jotai (via Fiber), mirror-only, atom lookup.
// Idempotent multi-scripts. Zero monkey-patching.

import { pageWindow } from "../utils/pageContext";

/* ================================ Types ================================ */
export type Unsubscribe = () => void;

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
  atomByLabelCache: Map<string, any>;
};

/* ============================ Singleton window ============================ */
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

/* =========================== Ready Notifier (NEW) =========================== */

const READY_EVENT = "__JOTAI_STORE_READY__";
let _readyNotified = false;
const _readyListeners = new Set<() => void>();

// [AUTOBOOT] — dynamic import and one-time launch of projections
let _autobootDone = false;
async function _autobootOnce() {
  if (_autobootDone) return;
  _autobootDone = true;


  // Declare every module to boot here
  const modules: Array<() => Promise<unknown>> = [
    // Add modules to autoboot here
  ];

  type Starter = (() => Promise<void>) | (() => void) | undefined;

  // Mapping table: keys = possible export names to run
  const candidateStarters = [
    "startOnChangeAtom",          // acceptable naming
  ] as const;

  const results = await Promise.allSettled(
    modules.map(load => load().then(async (m) => {
      // Look for a known starter name
      let fn: Starter;
      for (const k of candidateStarters) {
        if (typeof (m as any)[k] === "function") { fn = (m as any)[k] as Starter; break; }
      }
      // If nothing found, try a usable default export
      if (!fn && typeof (m as any).default === "function") {
        fn = (m as any).default as Starter;
      }
      // Execute if found (module should handle idempotence)
      if (fn) await Promise.resolve(fn());
    }))
  );

  // Optional: minimal logging in dev, silent otherwise.
  // for (const r of results) if (r.status === "rejected") console.debug("[autoboot] module failed:", r.reason);
}

function notifyReadyOnce() {
  if (_readyNotified) return;
  _readyNotified = true;
  // callbacks JS
  for (const fn of _readyListeners) { try { fn(); } catch {} }
  // optional DOM event
  try { pageWindow.dispatchEvent?.(new pageWindow.CustomEvent(READY_EVENT)); } catch {}
  // [AUTOBOOT] — automatically trigger the app projections
  void _autobootOnce();
}

/** Subscribe when a real store is captured (non-polyfill). */
export function onStoreReady(cb: () => void): () => void {
  _readyListeners.add(cb);
  const info = getCapturedInfo();
  if (info.via && !info.polyfill) {
    try { cb(); } catch {}
  }
  return () => { _readyListeners.delete(cb); };
}

/** Programmatically wait for a real store to be available. */
export async function waitForStore(opts: { timeoutMs?: number; intervalMs?: number } = {}) {
  const { timeoutMs = 6000, intervalMs = 50 } = opts;
  const info0 = getCapturedInfo();
  if (info0.via && !info0.polyfill) return;

  let unsub: (() => void) | null = null;
  let resolved = false;
  const p = new Promise<void>((resolve, reject) => {
    try { unsub = onStoreReady(() => { resolved = true; resolve(); }); } catch {}
    const t0 = Date.now();
    (async function spin() {
      while (!resolved && Date.now() - t0 < timeoutMs) {
        const info = getCapturedInfo();
        if (info.via && !info.polyfill) { resolved = true; resolve(); return; }
        await new Promise(r => setTimeout(r, intervalMs));
      }
      if (!resolved) reject(new Error("Store non capturé dans le délai imparti"));
    })();
  }).finally(() => { try { unsub?.(); } catch {} });

  return p;
}

/* ================================= Utils ================================= */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const getAtomCache = () =>
  (pageWindow as any).jotaiAtomCache?.cache as Map<any, any> | undefined;

/* ============================ Capture (read-only) ======================== */
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
        const f = stack.pop();
        if (!f || seen.has(f)) continue;
        seen.add(f);

        const v = f?.pendingProps?.value;
        if (v && typeof v.get === "function" && typeof v.set === "function" && typeof v.sub === "function") {
          g.lastCapturedVia = "fiber";
          return v as JotaiStore;
        }
        if (f.child) stack.push(f.child);
        if (f.sibling) stack.push(f.sibling);
        if (f.alternate) stack.push(f.alternate);
      }
    }
  }
  return null;
}

// Fallback: capture the store by temporarily patching atom.write() to grab (get,set).
// Restore everything as soon as a write is captured, otherwise return a polyfill.
async function captureViaWriteOnce(timeoutMs = 5000): Promise<JotaiStore> {
  const cache = getAtomCache();
  if (!cache) {
    console.warn("[jotai-bridge] jotaiAtomCache.cache not found");
    throw new Error("jotaiAtomCache.cache not found");
  }

  const g = getGlobal();

  let capturedGet: any = null;
  let capturedSet: any = null;

  const patched: any[] = [];
  const restorePatched = () => {
    for (const a of patched) {
      try {
        if (a.__origWrite) {
          a.write = a.__origWrite;
          delete a.__origWrite;
        }
      } catch {}
    }
  };

  // Patch all known atoms
  for (const atom of cache.values()) {
    if (!atom || typeof atom.write !== "function" || atom.__origWrite) continue;
    const orig = atom.write;
    atom.__origWrite = orig;
    atom.write = function (get: any, set: any, ...args: any[]) {
      if (!capturedSet) {
        capturedGet = get;
        capturedSet = set;
        // Restore all patched atoms as soon as a capture happens
        restorePatched();
      }
      return orig.call(this, get, set, ...args);
    };
    patched.push(atom);
  }

  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const t0 = Date.now();

  try {
    pageWindow.dispatchEvent?.(new pageWindow.Event("visibilitychange"));
  } catch {}

  while (!capturedSet && Date.now() - t0 < timeoutMs) {
    await wait(50);
  }

  // Timeout → strict polyfill
  if (!capturedSet) {
    restorePatched();
    g.lastCapturedVia = "polyfill";
    console.warn("[jotai-bridge] write-once: timeout → polyfill");
    return {
      get: () => { throw new Error("Store not captured: get unavailable"); },
      set: () => { throw new Error("Store not captured: set unavailable"); },
      sub: () => () => {},
      __polyfill: true,
    };
  }

  // Success: mini-store based on captured (get,set)
  g.lastCapturedVia = "write";
  return {
    get: (a: any) => capturedGet(a),
    set: (a: any, v: any) => capturedSet(a, v),
    sub: (_a: any, cb: () => void) => {
      // No official sub API here → light polling
      let last: any;
      try { last = capturedGet(_a); } catch {}
      const id = setInterval(() => {
        let curr: any;
        try { curr = capturedGet(_a); } catch { return; }
        if (curr !== last) {
          last = curr;
          try { cb(); } catch {}
        }
      }, 100);
      return () => clearInterval(id as any);
    },
  };
}

async function captureBaseStore(timeoutMs = 2000): Promise<JotaiStore> {
  const g = getGlobal();
  try { pageWindow.dispatchEvent?.(new pageWindow.Event("visibilitychange")); } catch {}
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    const viaFiber = findStoreViaFiber();
    if (viaFiber) return viaFiber;
    await sleep(50);
  }
  g.lastCapturedVia = "polyfill";
  return {
    get: () => { throw new Error("Store not captured: get unavailable"); },
    set: () => { throw new Error("Store not captured: set unavailable"); },
    sub: () => () => {},
    __polyfill: true,
  };
}

export async function ensureStore(): Promise<JotaiStore> {
  const g = getGlobal();

  if (g.baseStore && !g.baseStore.__polyfill) {
    // if we come back here after capture, make sure we already notified
    notifyReadyOnce();
    return g.baseStore;
  }

  if (g.captureInProgress) {
    const t0 = Date.now();
    const maxWait = 2500;
    while (!g.baseStore && Date.now() - t0 < maxWait) await sleep(25);
    if (g.baseStore) {
      if (!g.baseStore.__polyfill) notifyReadyOnce();
      return g.baseStore;
    }
  }

  g.captureInProgress = true;
  try {
    // 1) Direct fiber path
    const viaFiber = findStoreViaFiber();
    if (viaFiber) {
      g.baseStore = viaFiber;
      notifyReadyOnce(); // notify here
      return viaFiber;
    }

    // 2) Fallback write-once
    try {
      const viaWrite = await captureViaWriteOnce(5000);
      g.baseStore = viaWrite;
      notifyReadyOnce(); // notify here
      return viaWrite;
    } catch (e) {
      g.captureError = e;
    }

    // 3) Strict polyfill
    const viaFallback = await captureBaseStore();
    g.baseStore = viaFallback;
    // no notify for polyfill
    return viaFallback;
  } catch (e) {
    g.captureError = e;
    throw e;
  } finally {
    g.captureInProgress = false;
  }
}

export function getCapturedInfo() {
  const g = getGlobal();
  return { via: g.lastCapturedVia, polyfill: !!g.baseStore?.__polyfill, error: g.captureError };
}

/* ================================= Mirror ================================= */
async function _createMirror(): Promise<MirrorAPI> {
  const base = await ensureStore();
  const records = new WeakMap<any, MirrorRecord>();

  const ensureUpstreamSub = async <T>(atom: any): Promise<MirrorRecord<T>> => {
    let rec = records.get(atom) as MirrorRecord<T> | undefined;
    if (rec) return rec;

    rec = { last: undefined, has: false, subs: new Set() };
    records.set(atom, rec);

    try { rec.last = base.get(atom) as T; rec.has = true; } catch {}

    const unsub = base.sub(atom, () => {
      let curr: T;
      try { curr = base.get(atom) as T; } catch { return; }
      const prev = rec!.last as T;
      const changed = !Object.is(curr, prev) || !rec!.has;
      rec!.last = curr; rec!.has = true;
      if (changed) for (const fn of rec!.subs) { try { fn(curr, prev); } catch {} }
    });

    rec.unsubUpstream = unsub;
    return rec;
  };

  const api: MirrorAPI = {
    async get<T>(atom: any): Promise<T> {
      const rec = await ensureUpstreamSub<T>(atom);
      if (rec.has) return rec.last as T;
      const v = base.get(atom) as T;
      rec.last = v; rec.has = true;
      return v;
    },
    async set<T>(atom: any, value: T): Promise<void> {
      await base.set(atom, value as any);
      const rec = await ensureUpstreamSub<T>(atom);
      rec.last = value; rec.has = true;
    },
    async sub<T>(atom: any, cb: Listener<T>): Promise<Unsubscribe> {
      const rec = await ensureUpstreamSub<T>(atom);
      rec.subs.add(cb);
      if (rec.has) { try { cb(rec.last as T, rec.last as T); } catch {} }
      return () => { rec.subs.delete(cb); };
    },
    getShadow<T>(atom: any): T | undefined {
      const rec = records.get(atom) as MirrorRecord<T> | undefined;
      return rec?.last;
    },
    hasShadow(atom: any): boolean { return !!records.get(atom)?.has; },
    async ensureWatch<T>(atom: any): Promise<void> { await ensureUpstreamSub<T>(atom); },
    async asStore(): Promise<JotaiStore> {
      const self = this;
      return {
        get: (a: any) => (self.get as any)(a),
        set: (a: any, v: any) => (self.set as any)(a, v),
        sub: (a: any, cb: any) => {
          let u: Unsubscribe | null = null;
          (self.sub as any)(a, () => cb()).then((unsub: Unsubscribe) => (u = unsub));
          return () => { try { u?.(); } catch {} };
        },
      };
    },
  };

  return api;
}

export async function getMirror(): Promise<MirrorAPI> {
  const g = getGlobal();
  if (g.mirror) return g.mirror;
  g.mirror = await _createMirror();
  return g.mirror!;
}

/* ============================ Atom lookup helpers ========================= */
export function findAtomsByLabel(regex: RegExp): any[] {
  const cache = getAtomCache();
  if (!cache) return [];
  const out: any[] = [];
  for (const a of cache.values()) {
    const label = a?.debugLabel || a?.label || "";
    if (regex.test(String(label))) out.push(a);
  }
  return out;
}

export function getAtomByLabel(label: string): any | null {
  const g = getGlobal();
  const cached = g.atomByLabelCache.get(label);
  if (cached) return cached;

  const cache = getAtomCache();
  if (!cache) return null;

  for (const a of cache.values()) {
    const lb = a?.debugLabel || a?.label || "";
    if (lb === label) {
      g.atomByLabelCache.set(label, a);
      return a;
    }
  }
  return null;
}
