import { Store } from "../../atoms/store";
import type {
  Unsubscribe,
  GlobalVariable,
  AtomSources,
  CombineFunction,
} from "./types";

type SourceState<T extends Record<string, unknown>> = {
  values: Partial<T>;
  ready: Set<keyof T>;
  unsubscribes: Unsubscribe[];
};

type EqualityFn<T> = (a: T, b: T) => boolean;

export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return a === b;
  if (typeof a !== typeof b) return false;

  if (typeof a !== "object") return a === b;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (Array.isArray(a) || Array.isArray(b)) return false;

  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;
  const aKeys = Object.keys(aObj);
  const bKeys = Object.keys(bObj);

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(bObj, key)) return false;
    if (!deepEqual(aObj[key], bObj[key])) return false;
  }

  return true;
}

export function createReactiveGlobal<
  TSources extends Record<string, unknown>,
  TResult
>(
  atomSources: AtomSources<TSources>,
  combine: CombineFunction<TSources, TResult>,
  initialValue: TResult,
  isEqual: EqualityFn<TResult> = deepEqual
): GlobalVariable<TResult> {
  const listeners = new Set<(value: TResult, prev: TResult) => void>();
  let currentValue: TResult = initialValue;
  let previousValue: TResult = initialValue;
  let initialized = false;

  const state: SourceState<TSources> = {
    values: {},
    ready: new Set(),
    unsubscribes: [],
  };

  const sourceKeys = Object.keys(atomSources) as (keyof TSources)[];
  const totalSources = sourceKeys.length;

  function recompute(): void {
    if (state.ready.size < totalSources) return;

    const nextValue = combine(state.values as TSources);

    if (isEqual(currentValue, nextValue)) return;

    previousValue = currentValue;
    currentValue = nextValue;

    if (initialized) {
      for (const listener of listeners) {
        listener(currentValue, previousValue);
      }
    }
  }

  async function init(): Promise<void> {
    if (initialized) return;

    const subscriptionPromises = sourceKeys.map(async (key) => {
      const atomLabel = atomSources[key];

      const unsub = await Store.subscribe(atomLabel, (value: unknown) => {
        state.values[key] = value as TSources[typeof key];
        state.ready.add(key);
        recompute();
      });

      state.unsubscribes.push(unsub);
    });

    await Promise.all(subscriptionPromises);
    initialized = true;

    if (state.ready.size === totalSources) {
      currentValue = combine(state.values as TSources);
    }
  }

  init();

  return {
    get(): TResult {
      return currentValue;
    },

    subscribe(callback: (value: TResult, prev: TResult) => void): Unsubscribe {
      listeners.add(callback);

      if (initialized && state.ready.size === totalSources) {
        callback(currentValue, currentValue);
      }

      return () => {
        listeners.delete(callback);
      };
    },

    destroy(): void {
      for (const unsub of state.unsubscribes) {
        unsub();
      }
      state.unsubscribes.length = 0;
      listeners.clear();
      initialized = false;
    },
  };
}

