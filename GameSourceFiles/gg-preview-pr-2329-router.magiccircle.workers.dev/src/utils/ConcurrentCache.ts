/**
 * Represents the status of a cache entry.
 */
type CacheEntry<T> =
  | { status: 'Loading'; promise: Promise<T> }
  | { status: 'Ready'; value: T };

/**
 * Options for configuring the ConcurrentCache.
 */
interface ConcurrentCacheOptions<T> {
  /**
   * LRU configuration. If provided, enables LRU functionality.
   */
  lru?: {
    /**
     * Maximum number of entries to keep in the cache.
     * @default 25
     */
    maxSize?: number;
    /**
     * Function to call when an entry is evicted from the cache.
     */
    onEvict?: (key: string, value: T) => void;
  };
}

/**
 * A generic concurrent cache that prevents multiple parallel fetches for the same key.
 * Optionally supports LRU (Least Recently Used) eviction policy.
 */
export class ConcurrentCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private lruOrder: string[] = [];
  private readonly lruMaxSize: number | undefined;
  private readonly onEvict: ((key: string, value: T) => void) | undefined;

  /**
   * Creates a new ConcurrentCache instance.
   * @param options - Configuration options for the cache.
   */
  constructor(
    private readonly name: `${string}Cache`,
    options: ConcurrentCacheOptions<T> = {}
  ) {
    if (options.lru) {
      this.lruMaxSize = options.lru.maxSize ?? 25;
      this.onEvict = options.lru.onEvict;
    }
  }

  /**
   * Retrieves a value from the cache or fetches it if not found.
   * @param key - The key to retrieve or fetch.
   * @param fetchFn - The function to fetch the value if not in cache.
   * @returns A promise that resolves to the cached or fetched value.
   */
  async getOrFetch(key: string, fetchFn: () => Promise<T>): Promise<T> {
    const existingEntry = this.cache.get(key);

    if (existingEntry?.status === 'Ready') {
      // console.debug(
      //   `${this.name} [${this.cache.size}/${this.lruMaxSize}] Returning cached value for`,
      //   key
      // );
      this.updateLRU(key);
      return existingEntry.value;
    }

    if (existingEntry?.status === 'Loading') {
      // console.debug(
      //   `${this.name} [${this.cache.size}/${this.lruMaxSize}] Returning existing promise for`,
      //   key
      // );
      return existingEntry.promise;
    }

    console.debug(
      `${this.name} [${this.cache.size}/${this.lruMaxSize ?? '∞'}] Starting new fetch for`,
      key
    );

    // Start a new fetch
    const promise = fetchFn().then(
      (value) => {
        this.set(key, value);
        return value;
      },
      (error) => {
        this.cache.delete(key);
        throw error;
      }
    );

    this.cache.set(key, { status: 'Loading', promise });
    return promise;
  }

  /**
   * Sets a value in the cache and updates LRU order if enabled.
   * @param key - The key to set.
   * @param value - The value to store.
   */
  private set(key: string, value: T): void {
    this.cache.set(key, { status: 'Ready', value });
    this.updateLRU(key);
  }

  /**
   * Updates the LRU order and evicts items if necessary.
   * @param key - The key to move to the front of the LRU order.
   */
  private updateLRU(key: string): void {
    if (!this.lruMaxSize) return;

    const index = this.lruOrder.indexOf(key);
    if (index > -1) {
      this.lruOrder.splice(index, 1);
    }
    this.lruOrder.unshift(key);

    if (this.lruOrder.length > this.lruMaxSize) {
      const evictedKey = this.lruOrder.pop()!;
      const evictedEntry = this.cache.get(evictedKey);
      if (evictedEntry?.status === 'Ready' && this.onEvict) {
        this.onEvict(evictedKey, evictedEntry.value);
      }
      this.cache.delete(evictedKey);
    }
  }

  /**
   * Clears the entire cache.
   */
  clear(): void {
    this.cache.clear();
    this.lruOrder = [];
  }

  /**
   * Removes a specific entry from the cache.
   * @param key - The key of the entry to remove.
   */
  remove(key: string): void {
    this.cache.delete(key);
    const index = this.lruOrder.indexOf(key);
    if (index > -1) {
      this.lruOrder.splice(index, 1);
    }
  }

  /**
   * Gets a value from the cache if it exists and is ready.
   * @param key - The key to retrieve.
   * @returns The cached value if found and ready, undefined otherwise.
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (entry?.status === 'Ready') {
      this.updateLRU(key);
      return entry.value;
    }
    return undefined;
  }

  /**
   * Checks if a key exists in the cache and is ready.
   * @param key - The key to check.
   * @returns True if the key exists and is ready, false otherwise.
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    return entry?.status === 'Ready';
  }
}
