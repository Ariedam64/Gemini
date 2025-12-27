import * as tiled from '@kayahr/tiled';
import { CompositeTilemap } from '@pixi/tilemap';
import { TILE_SIZE_WORLD } from '../../sprite-utils';
import {
  getTextureForGid,
  getTileFlipFlags,
  isTileEmpty,
  tiledFlipsToGroupD8,
} from './PixiTiledUtils';

const DEBUG_TILEMAP = false;

/**
 * Generates a CompositeTilemap from Tiled map data.
 */
export function generateTilemap(mapData: tiled.Map): CompositeTilemap {
  const tilemap = new CompositeTilemap();

  if (!mapData.tilesets || mapData.tilesets.length === 0) {
    throw new Error('[MapRenderer] No tilesets found in map data');
  }

  // Process each layer
  for (const layer of mapData.layers) {
    if (layer.type !== 'tilelayer') {
      continue;
    }
    if (!layer.data || !layer.visible) {
      if (DEBUG_TILEMAP && !layer.visible) {
        console.log(`[MapRenderer] Skipping invisible layer: ${layer.name}`);
      }
      continue;
    }

    if (DEBUG_TILEMAP) {
      console.log(`[MapRenderer] Building layer: ${layer.name}`);
    }

    const stats = {
      tilesAdded: 0,
      tilesSkipped: 0,
      tilesFlipped: 0,
    };

    // Process each tile in the layer
    for (let y = 0; y < layer.height; y++) {
      for (let x = 0; x < layer.width; x++) {
        const index = y * layer.width + x;
        const gid = layer.data[index];

        if (typeof gid !== 'number') {
          continue;
        }

        if (isTileEmpty(gid)) {
          stats.tilesSkipped++;
          continue;
        }

        const { flippedH, flippedV, flippedD } = getTileFlipFlags(gid);

        // Get texture for this tile
        const tileTexture = getTextureForGid(gid, mapData.tilesets);

        if (!tileTexture) {
          continue;
        }

        // World position
        // Adjust Y for tiles larger/smaller than grid size (align bottom-left)
        const worldX = x * TILE_SIZE_WORLD;
        const worldY =
          y * TILE_SIZE_WORLD - (tileTexture.height - TILE_SIZE_WORLD);

        // Convert Tiled flip flags to PixiJS GroupD8 rotation
        const rotate = tiledFlipsToGroupD8(flippedH, flippedV, flippedD);

        if (flippedH || flippedV || flippedD) {
          stats.tilesFlipped++;
        }

        tilemap.tile(tileTexture, worldX, worldY, {
          tileWidth: tileTexture.width,
          tileHeight: tileTexture.height,
          rotate,
        });
        stats.tilesAdded++;
      }
    }

    if (DEBUG_TILEMAP) {
      console.log(
        `[MapRenderer] Layer ${layer.name}: ${stats.tilesAdded} added, ${stats.tilesFlipped} with rotation, ${stats.tilesSkipped} empty`
      );
    }
  }

  if (DEBUG_TILEMAP) {
    console.log(
      `[MapRenderer] Built tilemap with ${tilemap.children.length} tiles`
    );
  }

  return tilemap;
}
