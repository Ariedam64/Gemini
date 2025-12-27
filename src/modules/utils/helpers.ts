// src/modules/utils/helpers.ts
// Utility functions shared across modules

/**
 * Sleep for a given number of milliseconds
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Try to execute a function, return undefined if it throws
 */
export const tryDo = <T>(fn: () => T): T | undefined => {
  try {
    return fn();
  } catch {
    return undefined;
  }
};

/**
 * Clamp a number between min and max
 */
export const clamp = (n: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, n));

/**
 * Clamp a number between 0 and 1
 */
export const clamp01 = (v: number): number => clamp(v, 0, 1);

/**
 * Wait for a promise with timeout
 */
export async function waitWithTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string
): Promise<T> {
  const t0 = performance.now();
  while (performance.now() - t0 < ms) {
    const out = await Promise.race([promise, sleep(50).then(() => null)]);
    if (out !== null) return out as T;
  }
  throw new Error(`${label} timeout`);
}
