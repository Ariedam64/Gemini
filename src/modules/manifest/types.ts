// src/modules/manifest/types.ts
// Type definitions for MGManifest module

/**
 * Asset entry in manifest
 */
export interface ManifestAsset {
  alias?: string[];
  src?: string[];
  data?: {
    tags?: Record<string, boolean>;
    [key: string]: unknown;
  };
}

/**
 * Bundle entry in manifest
 */
export interface ManifestBundle {
  name: string;
  assets: ManifestAsset[];
}

/**
 * Root manifest structure
 */
export interface Manifest {
  bundles: ManifestBundle[];
}

/**
 * Options for manifest loading
 */
export interface ManifestLoadOptions {
  /** Custom base URL (defaults to MGAssets.base()) */
  baseUrl?: string;
}
