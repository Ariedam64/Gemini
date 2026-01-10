import { RiveFile } from '@rive-app/canvas';
import { ConcurrentCache } from './ConcurrentCache';

/**
 * A class for managing a cache of Rive files.
 */
export class RiveFileCache {
  #cache: ConcurrentCache<RiveFile> = new ConcurrentCache<RiveFile>(
    'RiveFileCache'
  );

  /**
   * Retrieves a Rive file from the cache or loads it if not cached and then adds it to the cache.
   * @param {string} url - URL of the Rive file to retrieve or load.
   * @returns {Promise<RiveFile>} - Promise resolving to the RiveFile, either from cache or newly loaded.
   * @throws {Error} If there's an error loading the Rive file.
   */
  public async getOrFetch(url: string): Promise<RiveFile> {
    return this.#cache.getOrFetch(url, () => this.#loadRiveFile(url));
  }

  /**
   * Loads a single Rive file from the given URL.
   * @param {string} url - URL of the Rive file to load.
   * @returns {Promise<RiveFile>} - Promise resolving to the loaded RiveFile.
   * @private
   */
  async #loadRiveFile(url: string): Promise<RiveFile> {
    return new Promise<RiveFile>((resolve, reject) => {
      const riveFile: RiveFile = new RiveFile({
        src: url,
        onLoad: () => {
          // console.log('[RiveFileCache] Added to cache', url);
          resolve(riveFile);
        },
        onLoadError: (error) => {
          reject(error);
        },
      });
      riveFile.init().catch((error) => {
        reject(error);
      });
      riveFile.getInstance();
    });
  }
}
