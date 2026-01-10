export class LRUCache<K, V> {
  private maxSize: number;
  private cache: Map<K, V>;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.cache = new Map<K, V>();
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item) {
      // Move to end of map to mark as recently used
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }

  set(key: K, value: V): void {
    // If it's already in the cache, we're just updating its value and moving it to the end.
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // If it's a new item and the cache is full, evict the least recently used one.
    else if (this.cache.size >= this.maxSize) {
      // `keys().next().value` is the first (and therefore oldest) key in a Map iterator.
      const leastRecentlyUsedKey = this.cache.keys().next().value;
      if (leastRecentlyUsedKey) {
        this.cache.delete(leastRecentlyUsedKey);
      }
    }
    this.cache.set(key, value);
  }

  /** Returns the current number of entries in the cache. */
  get size(): number {
    return this.cache.size;
  }

  clear(): void {
    this.cache.clear();
  }
}
