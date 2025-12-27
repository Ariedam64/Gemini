// src/atoms/core/view.ts
// View factory for reactive atom access

import type { Path, Unsubscribe, View } from "../types";
import { Store } from "../store";
import { getAtPath, setAtPath, toPathArray } from "./utils";
import type { SignatureChannel, SignatureOptions } from "./signature";
import { createSignatureChannel } from "./signature";

// Re-export View type for convenience
export type { View } from "../types";

type WriteMode<TSrc, T> =
  | "replace"
  | "merge-shallow"
  | ((next: T, prevSrc: TSrc | undefined) => TSrc);

type ViewOptions<TSrc, T> = {
  path?: Path;
  write?: WriteMode<TSrc, T>;
};

// Registry: one active subscription per view
const activeSubscriptions = new Map<string, Unsubscribe>();

function attachManagedSubscription(label: string, unsub: Unsubscribe): Unsubscribe {
  const prev = activeSubscriptions.get(label);
  if (prev) {
    try {
      prev();
    } catch {
      // Ignore cleanup errors
    }
  }

  activeSubscriptions.set(label, unsub);

  return () => {
    try {
      unsub();
    } catch {
      // Ignore cleanup errors
    }
    if (activeSubscriptions.get(label) === unsub) {
      activeSubscriptions.delete(label);
    }
  };
}

/**
 * Create a View from a source atom with optional path-based derivation
 */
export function makeView<TSrc = unknown, T = unknown>(
  sourceLabel: string,
  options: ViewOptions<TSrc, T> = {}
): View<T> {
  const { path, write = "replace" } = options;
  const viewLabel = path ? `${sourceLabel}:${toPathArray(path).join(".")}` : sourceLabel;

  async function get(): Promise<T> {
    const source = await Store.select<TSrc>(sourceLabel);
    return (path ? getAtPath<T>(source, path) : (source as unknown)) as T;
  }

  async function set(next: T): Promise<void> {
    if (typeof write === "function") {
      const prev = await Store.select<TSrc>(sourceLabel);
      const raw = write(next, prev);
      return Store.set(sourceLabel, raw);
    }

    const prev = await Store.select<TSrc>(sourceLabel);
    const raw = path ? setAtPath(prev, path, next) : next;

    if (
      write === "merge-shallow" &&
      !path &&
      prev &&
      typeof prev === "object" &&
      typeof next === "object"
    ) {
      return Store.set(sourceLabel, { ...prev, ...(next as object) });
    }

    return Store.set(sourceLabel, raw);
  }

  async function update(fn: (prev: T) => T): Promise<T> {
    const prev = await get();
    const next = fn(prev);
    await set(next);
    return next;
  }

  async function createOnChangeSubscription(
    immediate: boolean,
    callback: (next: T, prev?: T) => void,
    isEqual: (a: T, b: T) => boolean
  ): Promise<Unsubscribe> {
    let prev: T | undefined;

    const handler = (source: TSrc) => {
      const value = (path ? getAtPath<T>(source, path) : (source as unknown)) as T;

      if (typeof prev === "undefined" || !isEqual(prev, value)) {
        const previousValue = prev;
        prev = value;
        callback(value, previousValue);
      }
    };

    const rawUnsub = immediate
      ? await Store.subscribeImmediate<TSrc>(sourceLabel, handler)
      : await Store.subscribe<TSrc>(sourceLabel, handler);

    return attachManagedSubscription(viewLabel, rawUnsub);
  }

  function stopOnChange(): void {
    const unsub = activeSubscriptions.get(viewLabel);
    if (unsub) {
      try {
        unsub();
      } catch {
        // Ignore cleanup errors
      }
      activeSubscriptions.delete(viewLabel);
    }
  }

  function asSignature<K extends string | number = string>(
    options: SignatureOptions<T, K>
  ): SignatureChannel<T, K> {
    return createSignatureChannel<T, K>(sourceLabel, options?.path ?? path, options);
  }

  return {
    label: viewLabel,
    get,
    set,
    update,
    onChange: (cb, eq = Object.is) => createOnChangeSubscription(false, cb, eq),
    onChangeNow: (cb, eq = Object.is) => createOnChangeSubscription(true, cb, eq),
    asSignature,
    stopOnChange,
  };
}

/**
 * Create a simple View without path derivation (shorthand)
 */
export function makeAtom<T = unknown>(label: string): View<T> {
  return makeView<T, T>(label);
}
