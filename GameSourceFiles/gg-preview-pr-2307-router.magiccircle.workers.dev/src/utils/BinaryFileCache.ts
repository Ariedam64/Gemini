import { ConcurrentCache } from './ConcurrentCache';
import { fetchBinaryFile } from './fetchBinaryFile';

/**
 * In-memory cache for binary assets that deduplicates concurrent loads and returns
 * shared `ArrayBuffer` views.
 *
 * Internally backed by {@link ConcurrentCache} to coalesce simultaneous requests
 * for the same URL. Downloads are performed via {@link fetchBinaryFile}, which
 * retries with exponential backoff on transient failures.
 *
 * Notes:
 * - Values are cached for the lifetime of this instance only.
 * - The returned `ArrayBuffer` is shared; avoid mutating it. Clone if mutation is required
 *   (e.g., `new ArrayBuffer(value)`).
 */
export class BinaryFileCache {
  #cache: ConcurrentCache<ArrayBuffer>;

  constructor(private readonly name: `${string}BinaryFileCache`) {
    this.#cache = new ConcurrentCache<ArrayBuffer>(name);
  }

  /**
   * Gets the binary content for a URL from cache, fetching and caching it on a miss.
   * Concurrent calls with the same URL share a single in-flight request via
   * {@link ConcurrentCache#getOrFetch}.
   *
   * @param {string} url - Absolute or relative URL of the binary asset.
   * @returns {Promise<ArrayBuffer>} Promise that resolves to the asset as a `ArrayBuffer`.
   * @throws {Error} If {@link fetchBinaryFile} ultimately fails after retries.
   */
  public async getOrFetch(url: string): Promise<ArrayBuffer> {
    return this.#cache.getOrFetch(url, () => this.#loadBinaryFile(url));
  }

  /**
   * Fetches the binary resource via {@link fetchBinaryFile} and wraps the
   * `ArrayBuffer` in a `ArrayBuffer`.
   *
   * @param {string} url - URL of the binary file to load.
   * @returns {Promise<ArrayBuffer>} Promise resolving to the binary content.
   * @private
   */
  async #loadBinaryFile(url: string): Promise<ArrayBuffer> {
    const buffer = await fetchBinaryFile(url);
    return buffer;
  }
}
