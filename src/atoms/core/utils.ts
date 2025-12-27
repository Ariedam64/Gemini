// src/atoms/core/utils.ts
// Path utilities and equality helpers

import type { Path } from "../types";

/**
 * Convert a path (string or array) to an array of segments
 */
export function toPathArray(path?: Path): Array<string | number> {
  if (!path) return [];
  if (Array.isArray(path)) return path.slice();
  return path.split(".").map((k) => (k.match(/^\d+$/) ? Number(k) : k));
}

/**
 * Get a nested value from an object using a path
 */
export function getAtPath<T = unknown>(root: unknown, path?: Path): T {
  const segments = toPathArray(path);
  let current = root;

  for (const segment of segments) {
    if (current == null) return undefined as T;
    current = (current as Record<string | number, unknown>)[segment];
  }

  return current as T;
}

/**
 * Set a nested value in an object using a path (immutable)
 */
export function setAtPath<T>(root: T, path: Path, value: unknown): T {
  const segments = toPathArray(path);
  if (!segments.length) return value as T;

  const clone = Array.isArray(root) ? [...root] : { ...(root ?? {}) };
  let current: Record<string | number, unknown> = clone as Record<string | number, unknown>;

  for (let i = 0; i < segments.length - 1; i++) {
    const key = segments[i];
    const source = current[key];
    const nested =
      typeof source === "object" && source !== null
        ? Array.isArray(source)
          ? [...source]
          : { ...source }
        : {};
    current[key] = nested;
    current = nested as Record<string | number, unknown>;
  }

  current[segments[segments.length - 1]] = value;
  return clone as T;
}

/**
 * Equality utilities
 */
export const Equality = {
  /**
   * Shallow equality check for objects
   */
  shallow(a: unknown, b: unknown): boolean {
    if (Object.is(a, b)) return true;
    if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!Object.is((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
        return false;
      }
    }

    return true;
  },

  /**
   * Check if two string arrays contain the same IDs (order-independent)
   */
  idSet(a: string[], b: string[]): boolean {
    if (a === b) return true;
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;

    const setA = new Set(a);
    for (const id of b) {
      if (!setA.has(id)) return false;
    }

    return true;
  },
};
