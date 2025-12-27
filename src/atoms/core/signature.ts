// src/atoms/core/signature.ts
// Signature-based change detection for fine-grained subscriptions

import type { Path, Unsubscribe } from "../types";
import { Store } from "../store";
import { getAtPath } from "./utils";
import type { View } from "./view";

export type SignatureOptions<TView, K extends string | number> = {
  /** Optional: nested path for the view */
  path?: Path;
  /** Detection mode: "auto" | "array" | "record" */
  mode?: "auto" | "array" | "record";
  /** Custom key extraction function */
  key?: (item: unknown, indexOrKey: number | string, whole: TView) => K;
  /** Custom signature computation function */
  sig?: (item: unknown, indexOrKey: number | string, whole: TView) => string;
  /** List of fields for stable signature (alternative to sig) */
  fields?: string[];
};

export type SignatureChannel<TView, K extends string | number> = {
  /** Subscribe to all changes with changed keys */
  sub(callback: (payload: { value: TView; changedKeys: K[] }) => void): Promise<Unsubscribe>;
  /** Subscribe to changes for a specific key */
  subKey(key: K, callback: (payload: { value: TView }) => void): Promise<Unsubscribe>;
  /** Subscribe to changes for multiple keys */
  subKeys(
    keys: K[],
    callback: (payload: { value: TView; changedKeys: K[] }) => void
  ): Promise<Unsubscribe>;
};

/**
 * Create a stable JSON string from selected fields of an object
 */
function stablePick(obj: unknown, fields: string[]): string {
  const result: Record<string, unknown> = {};

  for (const field of fields) {
    result[field] = field.includes(".") ? getAtPath(obj, field) : (obj as Record<string, unknown>)?.[field];
  }

  try {
    return JSON.stringify(result);
  } catch {
    return String(result);
  }
}

/**
 * Create a signature channel for fine-grained change detection
 */
export function createSignatureChannel<TView, K extends string | number>(
  sourceLabel: string,
  path: Path | undefined,
  options: SignatureOptions<TView, K>
): SignatureChannel<TView, K> {
  const mode = options.mode ?? "auto";

  function computeSignatures(whole: TView): { signatures: Map<K, string>; keys: K[] } {
    const value = path ? getAtPath<unknown>(whole, path) : whole;
    const signatures = new Map<K, string>();

    if (value == null) {
      return { signatures, keys: [] };
    }

    const isArray = Array.isArray(value);
    const shouldProcessAsArray = mode === "array" || (mode === "auto" && isArray);

    if (shouldProcessAsArray && isArray) {
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const key = (options.key ? options.key(item, i, whole) : i) as K;
        const sig = options.sig
          ? options.sig(item, i, whole)
          : options.fields
            ? stablePick(item, options.fields)
            : JSON.stringify(item);
        signatures.set(key, sig);
      }
    } else {
      for (const [k, item] of Object.entries(value as Record<string, unknown>)) {
        const key = (options.key ? options.key(item, k, whole) : k) as K;
        const sig = options.sig
          ? options.sig(item, k, whole)
          : options.fields
            ? stablePick(item, options.fields)
            : JSON.stringify(item);
        signatures.set(key, sig);
      }
    }

    return { signatures, keys: Array.from(signatures.keys()) };
  }

  function mapsEqual(a: Map<K, string> | null, b: Map<K, string> | null): boolean {
    if (a === b) return true;
    if (!a || !b || a.size !== b.size) return false;

    for (const [key, value] of a) {
      if (b.get(key) !== value) return false;
    }

    return true;
  }

  async function sub(
    callback: (payload: { value: TView; changedKeys: K[] }) => void
  ): Promise<Unsubscribe> {
    let prevSignatures: Map<K, string> | null = null;

    return Store.subscribeImmediate<TView>(sourceLabel, (source) => {
      const whole = (path ? getAtPath<TView>(source, path) : source) as TView;
      const { signatures } = computeSignatures(whole);

      if (!mapsEqual(prevSignatures, signatures)) {
        const allKeys = new Set<K>([
          ...(prevSignatures ? Array.from(prevSignatures.keys()) : []),
          ...Array.from(signatures.keys()),
        ]);

        const changedKeys: K[] = [];
        for (const key of allKeys) {
          const prevSig = prevSignatures?.get(key) ?? "__NONE__";
          const currSig = signatures.get(key) ?? "__NONE__";
          if (prevSig !== currSig) {
            changedKeys.push(key);
          }
        }

        prevSignatures = signatures;
        callback({ value: whole, changedKeys });
      }
    });
  }

  async function subKey(
    key: K,
    callback: (payload: { value: TView }) => void
  ): Promise<Unsubscribe> {
    return sub(({ value, changedKeys }) => {
      if (changedKeys.includes(key)) {
        callback({ value });
      }
    });
  }

  async function subKeys(
    keys: K[],
    callback: (payload: { value: TView; changedKeys: K[] }) => void
  ): Promise<Unsubscribe> {
    const watchedKeys = new Set(keys);

    return sub(({ value, changedKeys }) => {
      const matchedKeys = changedKeys.filter((k) => watchedKeys.has(k));
      if (matchedKeys.length) {
        callback({ value, changedKeys: matchedKeys });
      }
    });
  }

  return { sub, subKey, subKeys };
}

/**
 * Signature DSL helpers
 */
export const sig = {
  /**
   * Create a signature channel for array data
   */
  array<T>(
    view: View<T>,
    options: {
      key?: string | ((item: unknown, i: number, whole: T) => string | number);
      fields?: string[];
      sig?: (item: unknown, i: number, whole: T) => string;
      path?: Path;
    }
  ): SignatureChannel<T, string | number> {
    const keyFn =
      typeof options.key === "string"
        ? (item: unknown, i: number) => String(getAtPath(item, options.key as string) ?? i)
        : options.key;

    return view.asSignature<string | number>({
      mode: "array",
      path: options.path,
      key: keyFn as SignatureOptions<T, string | number>["key"],
      fields: options.sig ? undefined : options.fields,
      sig: options.sig as SignatureOptions<T, string | number>["sig"],
    });
  },

  /**
   * Create a signature channel for record/object data
   */
  record<T>(
    view: View<T>,
    options: {
      key?: (value: unknown, k: string, whole: T) => string | number;
      fields?: string[];
      sig?: (value: unknown, k: string, whole: T) => string;
      path?: Path;
    }
  ): SignatureChannel<T, string | number> {
    return view.asSignature<string | number>({
      mode: "record",
      path: options.path,
      key: options.key as SignatureOptions<T, string | number>["key"],
      fields: options.sig ? undefined : options.fields,
      sig: options.sig as SignatureOptions<T, string | number>["sig"],
    });
  },

  /**
   * Shorthand: array with key by ID path
   */
  arrayById<T>(
    view: View<T>,
    keyPath: string,
    fields?: string[],
    path?: Path
  ): SignatureChannel<T, string | number> {
    return sig.array(view, { key: keyPath, fields, path });
  },

  /**
   * Shorthand: record with stable fields
   */
  recordFields<T>(
    view: View<T>,
    fields: string[],
    path?: Path
  ): SignatureChannel<T, string | number> {
    return sig.record(view, { fields, path });
  },
};
