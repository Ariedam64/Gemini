// src/store/views.ts
// Generic views + utilities + signature DSL.
// Consumes ONLY the Store facade (api.ts), which itself talks to the mirror.

import { Store, Unsubscribe } from "./api";

/* -------------------------- utils path & equality -------------------------- */
export type Path = string | Array<string | number>;

export function toPathArray(path?: Path): Array<string | number> {
  if (!path) return [];
  return Array.isArray(path) ? path.slice() : path.split(".").map(k => (k.match(/^\d+$/) ? Number(k) : k));
}

export function getAtPath<T = any>(root: any, path?: Path): T {
  const segs = toPathArray(path);
  let cur = root;
  for (const s of segs) {
    if (cur == null) return undefined as any;
    cur = (cur as any)[s as any];
  }
  return cur as T;
}

export function setAtPath(root: any, path: Path, nextValue: any) {
  const segs = toPathArray(path);
  if (!segs.length) return nextValue;
  const clone = Array.isArray(root) ? root.slice() : { ...(root ?? {}) };
  let cur: any = clone;
  for (let i = 0; i < segs.length - 1; i++) {
    const key = segs[i];
    const src = cur[key as any];
    const obj = typeof src === "object" && src !== null
      ? (Array.isArray(src) ? src.slice() : { ...src })
      : {};
    cur[key as any] = obj;
    cur = obj;
  }
  cur[segs[segs.length - 1] as any] = nextValue;
  return clone;
}

export const HubEq = {
  shallow(a: any, b: any) {
    if (Object.is(a, b)) return true;
    if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;
    const ka = Object.keys(a); const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const k of ka) if (!Object.is((a as any)[k], (b as any)[k])) return false;
    return true;
  },
  idSet(a: string[], b: string[]) {
    if (a === b) return true;
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    const sa = new Set(a);
    for (const id of b) if (!sa.has(id)) return false;
    return true;
  },
};

/* ----------------- Registry: un abonnement actif par View ------------------ */
const __activeSubs = new Map<string, Unsubscribe>();

function __attachManaged(label: string, unsub: Unsubscribe): Unsubscribe {
  const prev = __activeSubs.get(label);
  if (prev) { try { prev(); } catch {} }
  __activeSubs.set(label, unsub);
  return () => {
    try { unsub(); } catch {}
    if (__activeSubs.get(label) === unsub) __activeSubs.delete(label);
  };
}

/* --------------------------------- Views ---------------------------------- */
export type View<T> = {
  label: string;
  get(): Promise<T>;
  set(next: T): Promise<void>;
  update(fn: (prev: T) => T): Promise<T>;
  onChange(cb: (next: T, prev?: T) => void, isEqual?: (a: T, b: T) => boolean): Promise<Unsubscribe>;
  onChangeNow(cb: (next: T, prev?: T) => void, isEqual?: (a: T, b: T) => boolean): Promise<Unsubscribe>;
  asSignature<K extends string | number = string>(opts: SignatureOpts<T, K>): SignatureChannel<T, K>;
  /** Stops the active managed subscription for this view. */
  stopOnChange(): void;
};

type MakeViewOpts<TSrc, T> = {
  path?: Path;
  write?: "replace" | "merge-shallow" | ((next: T, prevSrc: TSrc | undefined) => TSrc);
};

export function makeView<TSrc = any, T = any>(sourceLabel: string, opts: MakeViewOpts<TSrc, T> = {}): View<T> {
  const { path, write = "replace" } = opts;
  const viewLabel = sourceLabel + (opts.path ? ":" + toPathArray(opts.path).join(".") : "");

  async function get(): Promise<T> {
    const src = await Store.select<TSrc>(sourceLabel);
    return (path ? getAtPath<T>(src, path) : (src as any)) as T;
  }

  async function set(next: T) {
    if (typeof write === "function") {
      const prev = await Store.select<TSrc>(sourceLabel);
      const raw = write(next, prev);
      return Store.set(sourceLabel, raw);
    }
    const prev = await Store.select<any>(sourceLabel);
    const raw = path ? setAtPath(prev, path, next) : next;
    if (write === "merge-shallow" && !path && prev && typeof prev === "object" && typeof next === "object") {
      return Store.set(sourceLabel, { ...prev, ...(next as any) });
    }
    return Store.set(sourceLabel, raw);
  }

  async function update(fn: (prev: T) => T) {
    const prev = await get();
    const next = fn(prev);
    await set(next);
    return next;
  }

  async function onChangeFactory(
    immediate: boolean,
    cb: (next: T, prev?: T) => void,
    isEqual: (a: T, b: T) => boolean
  ): Promise<Unsubscribe> {
    let prev: T | undefined;
    const sub = (src: TSrc) => {
      const v = (path ? getAtPath<T>(src, path) : (src as any)) as T;
      if (typeof prev === "undefined" || !isEqual(prev as T, v)) {
        const p = prev;
        prev = v;
        cb(v, p);
      }
    };
    const rawUnsub = immediate
      ? await Store.subscribeImmediate<TSrc>(sourceLabel, sub)
      : await Store.subscribe<TSrc>(sourceLabel, sub);

    // Manage and replace the active subscription for this view
    return __attachManaged(viewLabel, rawUnsub);
  }

  function stopOnChange() {
    const u = __activeSubs.get(viewLabel);
    if (u) { try { u(); } catch {} ; __activeSubs.delete(viewLabel); }
  }

  function asSignature<K extends string | number = string>(opts: SignatureOpts<T, K>): SignatureChannel<T, K> {
    return makeSignatureChannel<T, K>(sourceLabel, opts?.path ?? undefined, opts);
  }

  return {
    label: viewLabel,
    get, set, update,
    onChange: (cb, eq = Object.is) => onChangeFactory(false, cb, eq),
    onChangeNow: (cb, eq = Object.is) => onChangeFactory(true, cb, eq),
    asSignature,
    stopOnChange,
  };
}

export function makeAtom<T = any>(label: string) {
  return makeView<T, T>(label);
}

/* ---------------------------- Signatures helpers ---------------------------- */

export type SignatureOpts<TView, K extends string | number> = {
  /** Optional: nested view without recreating a View (equivalent to path for asSignature on View) */
  path?: Path;
  /** "auto" (default) | "array" | "record" */
  mode?: "auto" | "array" | "record";
  /** Logical key: by default index for array, property for record */
  key?: (item: any, indexOrKey: number | string, whole: TView) => K;
  /** Custom signature computation (takes precedence if provided) */
  sig?: (item: any, indexOrKey: number | string, whole: TView) => string;
  /** Simplified: list of fields for a stable signature */
  fields?: Array<string>;
};

export type SignatureChannel<TView, K extends string | number> = {
  sub(cb: (p: { value: TView; changedKeys: K[] }) => void): Promise<Unsubscribe>;
  subKey(key: K, cb: (p: { value: TView }) => void): Promise<Unsubscribe>;
  subKeys(keys: K[], cb: (p: { value: TView; changedKeys: K[] }) => void): Promise<Unsubscribe>;
};

function stablePick(obj: any, fields: string[]): string {
  const out: any = {};
  for (const f of fields) {
    out[f] = f.includes(".") ? getAtPath(obj, f) : obj?.[f];
  }
  try { return JSON.stringify(out); } catch { return String(out); }
}

function makeSignatureChannel<TView, K extends string | number>(
  sourceLabel: string,
  path: Path | undefined,
  opts: SignatureOpts<TView, K>
): SignatureChannel<TView, K> {
  const mode = opts.mode ?? "auto";

  function computeSig(whole: TView): { sig: Map<K, string>; keys: K[] } {
    const base: any = whole;
    const value = path ? getAtPath<any>(base, path) : base;

    const sig = new Map<K, string>();
    if (value == null) return { sig, keys: [] };

    if ((mode === "array" || (mode === "auto" && Array.isArray(value))) && Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const key = (opts.key ? opts.key(item, i, whole) : (i as any)) as K;
        const s = opts.sig
          ? opts.sig(item, i, whole)
          : opts.fields
            ? stablePick(item, opts.fields)
            : JSON.stringify(item);
        sig.set(key, s);
      }
    } else {
      for (const [k, item] of Object.entries(value as Record<string, any>)) {
        const key = (opts.key ? opts.key(item, k, whole) : (k as any)) as K;
        const s = opts.sig
          ? opts.sig(item, k, whole)
          : opts.fields
            ? stablePick(item, opts.fields)
            : JSON.stringify(item);
        sig.set(key, s);
      }
    }
    return { sig, keys: Array.from(sig.keys()) };
  }

  function mapEqual(a?: Map<K, string> | null, b?: Map<K, string> | null) {
    if (a === b) return true;
    if (!a || !b || a.size !== b.size) return false;
    for (const [k, v] of a) if (b.get(k) !== v) return false;
    return true;
  }

  async function sub(cb: (p: { value: TView; changedKeys: K[] }) => void): Promise<Unsubscribe> {
    let prevSig: Map<K, string> | null = null;
    return Store.subscribeImmediate<TView>(sourceLabel, (src) => {
      const whole = (path ? getAtPath<any>(src, path) : (src as any)) as TView;
      const { sig } = computeSig(whole);
      if (!mapEqual(prevSig, sig)) {
        const allKeys = new Set<K>([
          ...(prevSig ? (Array.from(prevSig.keys()) as K[]) : []),
          ...(Array.from(sig.keys()) as K[]),
        ]);
        const changed: K[] = [];
        for (const k of allKeys) if ((prevSig?.get(k) ?? "__NONE__") !== (sig.get(k) ?? "__NONE__")) changed.push(k);
        prevSig = sig;
        cb({ value: whole, changedKeys: changed });
      }
    });
  }

  async function subKey(key: K, cb: (p: { value: TView }) => void): Promise<Unsubscribe> {
    return sub(({ value, changedKeys }) => { if (changedKeys.includes(key)) cb({ value }); });
  }

  async function subKeys(keys: K[], cb: (p: { value: TView; changedKeys: K[] }) => void): Promise<Unsubscribe> {
    const wanted = new Set(keys);
    return sub(({ value, changedKeys }) => {
      const hit = changedKeys.filter(k => wanted.has(k));
      if (hit.length) cb({ value, changedKeys: hit });
    });
  }

  return { sub, subKey, subKeys };
}

/* -------------------------- Simplified DSL: sig.* -------------------------- */
export const sig = {
  /** Array: key by field or fn, signature by fields or fn. */
  array<T>(
    view: View<T>,
    opts: {
      key?: string | ((item: any, i: number, whole: T) => string | number),
      fields?: string[],
      sig?: (item: any, i: number, whole: T) => string,
      path?: Path
    }
  ) {
    const keyFn = typeof opts.key === "string"
      ? (it: any, i: number, whole: T) => String(getAtPath(it, opts.key as string) ?? i)
      : opts.key;
    return view.asSignature<string | number>({
      mode: "array",
      path: opts.path,
      key: keyFn as any,
      fields: opts.sig ? undefined : (opts.fields ?? undefined),
      sig: opts.sig as any,
    });
  },

  /** Record: key = property name by default; fields/sig likewise. */
  record<T>(
    view: View<T>,
    opts: {
      key?: (value: any, k: string, whole: T) => string | number,
      fields?: string[],
      sig?: (value: any, k: string, whole: T) => string,
      path?: Path
    }
  ) {
    return view.asSignature<string | number>({
      mode: "record",
      path: opts.path,
      key: opts.key as any,
      fields: opts.sig ? undefined : (opts.fields ?? undefined),
      sig: opts.sig as any,
    });
  },

  /** Macro: array by id path. */
  arrayById<T>(view: View<T>, keyPath: string, fields?: string[], path?: Path) {
    return sig.array(view, { key: keyPath, fields, path });
  },

  /** Macro: record with stable fields. */
  recordFields<T>(view: View<T>, fields: string[], path?: Path) {
    return sig.record(view, { fields, path });
  },
};
