import { type FileAsset, type ImageAsset, RiveFile } from '@rive-app/canvas';
import type { PlayerId } from '@/common/types/player';
import { globalRiveFileBinaryCache } from '@/store/rive-atom';
import { ConcurrentCache } from '@/utils/ConcurrentCache';
import avatarRiveFileSrc from './assets/avatarelements.riv?url';

const dynamicImageAssetNames = [
  'DiscordAvatarPlaceholder',
  'Top',
  'Mid',
  'Bottom',
] as const;

/**
 * Checks if the given asset name is a dynamic image asset name.
 *
 * @param {string} assetName - The name of the asset to check.
 * @returns {boolean} True if the asset name is a dynamic image asset name, false otherwise.
 */
export function isDynamicImageAssetName(
  assetName: string
): assetName is DynamicImageAssetName {
  return dynamicImageAssetNames.includes(assetName as DynamicImageAssetName);
}

export type DynamicImageAssetName = (typeof dynamicImageAssetNames)[number];

export type AvatarRiveFileCacheValue = {
  riveFile: RiveFile;
  imageAssets: {
    [key in DynamicImageAssetName]: ImageAsset | undefined;
  };
};

export class AvatarRiveFileCache {
  #cache: ConcurrentCache<AvatarRiveFileCacheValue>;

  constructor() {
    this.#cache = new ConcurrentCache<AvatarRiveFileCacheValue>(
      'AvatarRiveFileCache',
      {
        lru: {
          maxSize: 16,
          onEvict: (key) => {
            console.log('[AvatarRiveFileCache] Evicting', key);
          },
        },
      }
    );
  }

  public async getOrFetch(
    playerId: PlayerId
  ): Promise<AvatarRiveFileCacheValue> {
    // We use the playerId as the cache key
    return await this.#cache.getOrFetch(playerId, async () => {
      const riveFile = await this.createRiveFile();
      console.log('[AvatarRiveFileCache] Created RiveFile for', playerId);
      return riveFile;
    });
  }

  async createRiveFile(): Promise<AvatarRiveFileCacheValue> {
    const buffer =
      await globalRiveFileBinaryCache.getOrFetch(avatarRiveFileSrc);
    return new Promise<AvatarRiveFileCacheValue>((resolve, reject) => {
      const imageAssets = Object.fromEntries(
        dynamicImageAssetNames.map((name) => [name, undefined])
      ) as AvatarRiveFileCacheValue['imageAssets'];

      const riveFile: RiveFile = new RiveFile({
        buffer,
        assetLoader: (asset: FileAsset) => {
          if (!asset.isImage) return false;
          if (isDynamicImageAssetName(asset.name)) {
            imageAssets[asset.name] = asset as ImageAsset;
            return true;
          }
          return false;
        },
        onLoad: () => {
          resolve({ riveFile, imageAssets });
        },
        onLoadError: () => {
          reject(new Error(`[AvatarRiveFileCache] Failed to load RiveFile`));
        },
      });
      riveFile.init().catch(() => {
        reject(
          new Error(`[AvatarRiveFileCache] Failed to initialize RiveFile`)
        );
      });
      // Increment the ref count so the RiveFile is not destroyed
      // Yes, this does raise a very important question of WHEN to cleanup the
      // RiveFile. One idea would be to clean it up when the player disconnects,
      // but for now, we think it's not necessary to do this.
      riveFile.getInstance();
    });
  }
}
