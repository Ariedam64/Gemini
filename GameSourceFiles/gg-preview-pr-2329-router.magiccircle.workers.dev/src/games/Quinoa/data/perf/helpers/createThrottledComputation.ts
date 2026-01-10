/**
 * Creates a throttled cache that only recalculates values at specified intervals.
 * Useful for expensive computations that don't need to update on every render.
 *
 * @param intervalMs - The minimum interval between updates in milliseconds
 * @returns A function that takes a computation function and returns a cached value
 */
export function createThrottledCache<T>(intervalMs: number) {
  let lastUpdateTime = 0;
  let cachedValue: T | undefined;

  /**
   * Gets the cached value or recalculates if the throttle interval has passed.
   *
   * @param computeFn - Function that computes the new value when cache is stale
   * @returns The cached value or newly computed value
   */
  return (computeFn: () => T): T => {
    const now = Date.now();

    // Only recalculate if more than the specified interval has passed since last update
    if (cachedValue === undefined || now - lastUpdateTime >= intervalMs) {
      cachedValue = computeFn();
      lastUpdateTime = now;
    }

    return cachedValue;
  };
}
