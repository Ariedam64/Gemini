import * as tiled from '@kayahr/tiled';
import { isEmbeddedTileset } from '@kayahr/tiled';
import { Assets, groupD8, Rectangle, Texture } from 'pixi.js';

// Tiled flip flags (32-bit integer)
const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
const FLIPPED_VERTICALLY_FLAG = 0x40000000;
const FLIPPED_DIAGONALLY_FLAG = 0x20000000;
const TILE_ID_MASK = 0x1fffffff;

/**
 * Converts Tiled flip flags to a PixiJS groupD8 rotation value.
 *
 * Tiled applies flips in a specific order:
 * 1. Diagonal (Swap X/Y)
 * 2. Horizontal (Mirror X)
 * 3. Vertical (Mirror Y)
 *
 * We use groupD8.add() to compose these transformations sequentially.
 *
 * @returns A groupD8 constant (0-14, even numbers only)
 */
export function tiledFlipsToGroupD8(
  flippedH: boolean,
  flippedV: boolean,
  flippedD: boolean
): number {
  let group = groupD8.E;
  if (flippedD) group = groupD8.add(group, groupD8.MAIN_DIAGONAL);
  if (flippedH) group = groupD8.add(group, groupD8.MIRROR_HORIZONTAL);
  if (flippedV) group = groupD8.add(group, groupD8.MIRROR_VERTICAL);
  return group;
}

/**
 * Extracts the asset key from a Tiled file path.
 *
 * Handles paths by extracting the relative path after known root directories
 * (e.g. "export-from-figma-to-this-folder{ignore}").
 *
 * Example:
 * ".../export-from-figma-to-this-folder{ignore}/tile/Cobblestone_A.png"
 * -> "tile/Cobblestone_A"
 */
export function getAssetKeyFromPath(path: string): string {
  // Match everything after known roots.
  // We allow suffixes on the folder name (like "{ignore}") using [^/]*
  // We ensure the root is a full folder name by checking for ^ or / before it.
  const match = path.match(
    /(?:^|\/)(?:export-from-figma-to-this-folder{ignore}[^/]*)\/(.+)\./
  );

  if (match && match[1]) {
    return match[1];
  }

  // Fallback: try to get just the filename without extension
  const filename = path.split('/').pop()?.split('.')[0];
  if (filename) return filename;

  console.warn(`[MapRenderer] Could not derive asset key from path: ${path}`);
  return path;
}

/**
 * Retrieves the texture for a given global tile ID (GID).
 * Supports both standard tilesets (atlases) and image collection tilesets.
 */
export function getTextureForGid(
  gid: number,
  tilesets: tiled.AnyTileset[]
): Texture | null {
  const tileId = gid & TILE_ID_MASK;

  if (!tilesets) {
    return null;
  }

  // Find the tileset that contains this tileId
  // Iterate in reverse to find the first one where firstgid <= tileId
  let tileset: tiled.AnyTileset | undefined;
  for (let i = tilesets.length - 1; i >= 0; i--) {
    const ts = tilesets[i];
    if (ts.firstgid <= tileId) {
      tileset = ts;
      break;
    }
  }

  if (!tileset) {
    return null;
  }

  // Validate that it's an embedded tileset
  if (!isEmbeddedTileset(tileset)) {
    console.warn(
      `[MapRenderer] Tileset ref (non-embedded) not supported for gid: ${gid}`
    );
    return null;
  }

  const localId = tileId - tileset.firstgid;

  // Standard tileset (single image atlas)
  if (tileset.image) {
    const assetKey = getAssetKeyFromPath(tileset.image);
    const baseTexture = Assets.get<Texture>(assetKey);

    if (!baseTexture) {
      console.warn(`[MapRenderer] Texture not found for key: ${assetKey}`);
      return null;
    }

    // Calculate tile position in tileset
    const tileWidth = tileset.tilewidth;
    const tileHeight = tileset.tileheight;
    const columns = tileset.columns;
    const margin = tileset.margin ?? 0;
    const spacing = tileset.spacing ?? 0;

    const tileX = margin + (localId % columns) * (tileWidth + spacing);
    const tileY =
      margin + Math.floor(localId / columns) * (tileHeight + spacing);

    return new Texture({
      source: baseTexture.source,
      frame: new Rectangle(tileX, tileY, tileWidth, tileHeight),
    });
  }

  // Image collection tileset (individual images)
  if (tileset.tiles) {
    const tile = tileset.tiles.find((t) => t.id === localId);
    if (tile && tile.image) {
      const assetKey = getAssetKeyFromPath(tile.image);
      const texture = Assets.get<Texture>(assetKey);
      if (!texture) {
        console.warn(`[MapRenderer] Texture not found for key: ${assetKey}`);
      }
      return texture || null;
    }
  }

  return null;
}

export function getTileFlipFlags(gid: number) {
  return {
    flippedH: !!(gid & FLIPPED_HORIZONTALLY_FLAG),
    flippedV: !!(gid & FLIPPED_VERTICALLY_FLAG),
    flippedD: !!(gid & FLIPPED_DIAGONALLY_FLAG),
  };
}

export function isTileEmpty(gid: number) {
  return gid === 0;
}
