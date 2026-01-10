import {
  AssetExtension,
  Assets,
  DOMAdapter,
  ExtensionType,
  type ResolvedAsset,
} from 'pixi.js';

const BYTES_SUFFIX = '?bytes';

// Small helper function to append the ?bytes suffix to an asset
// without a bunch of magic ?bytes suffixes all over the place
export function resolveAssetAsBytes(asset: string) {
  return asset + BYTES_SUFFIX;
}

/**
 * PixiJS Asset Extension for loading files as raw bytes.
 *
 * Combines the resolver and loader to provide a complete asset loading
 * pipeline for raw binary data. Register with `extensions.add()` to enable
 * loading any asset as bytes instead of its default type.
 *
 * @example
 * ```typescript
 * import { extensions } from 'pixi.js';
 * import { loadAsBytesAssetExtension } from './extensions/bytes';
 *
 * // Register the extension
 * extensions.add(loadAsBytesAssetExtension);
 *
 * // Now you can load any asset as bytes
 * const imageBytes = await Assets.load<ArrayBuffer>('avatar.png?bytes');
 * const riveBytes = await Assets.load<ArrayBuffer>('animation.riv?bytes');
 * ```
 */
export const BytesAsset = {
  extension: ExtensionType.Asset,
  // cache: {
  //   test: (asset) => asset instanceof ArrayBuffer,
  //   getCacheableAssets: (keys: string[], asset: any) => {
  //     console.log('asked to get cacheable assets', keys, asset);
  //     return { [keys[0]]: asset };
  //   },
  // },
  detection: {
    test: () => {
      return Promise.resolve(true);
    },
    add: (formats) => {
      return Promise.resolve([...formats, 'bytes']);
    },
    remove: (formats) => {
      return Promise.resolve(formats.filter((format) => format !== 'bytes'));
    },
  },
  resolver: {
    test: (value: string): boolean => value.includes(BYTES_SUFFIX),
    parse: (value: string) => {
      return {
        format: 'bytes',
        src: value,
      };
    },
  },
  loader: {
    id: 'bytes',
    test: (_url, resolvedAsset) => resolvedAsset?.format === 'bytes',
    async load(
      _url: string,
      resolvedAsset?: ResolvedAsset
    ): Promise<ArrayBuffer> {
      // The caller added ?bytes to the alias (e.g., 'Bottom_Backpacking?bytes')
      // We need to strip it off to get the real alias and resolve it
      const suffixedAlias = resolvedAsset?.alias?.[0];
      if (!suffixedAlias) {
        const ref =
          resolvedAsset?.src || JSON.stringify(resolvedAsset) || '<unknown>';
        throw new Error(
          `[loadBytes] No alias found for Bytes loader! ResolvedAsset: ${ref}`
        );
      }

      // Strip ?bytes suffix to get real alias (e.g., 'Bottom_Backpacking')
      const realAlias = suffixedAlias.split(BYTES_SUFFIX)[0];

      // Resolve the real alias to get the actual URL from manifest
      const asset = Assets.resolver.resolve(realAlias);
      if (!asset.src) {
        throw new Error(
          `[loadBytes] Could not resolve asset source for alias '${realAlias}' (original alias: '${suffixedAlias}').` +
            `Resolved: ${JSON.stringify(asset)}`
        );
      }

      // Fetch and return raw bytes
      const response = await DOMAdapter.get().fetch(asset.src);
      return response.arrayBuffer();
    },
  },
} satisfies AssetExtension<ArrayBuffer>;
