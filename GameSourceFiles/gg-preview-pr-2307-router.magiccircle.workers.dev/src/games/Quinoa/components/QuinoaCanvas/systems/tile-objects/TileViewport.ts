import type { GridPosition } from '@/common/games/Quinoa/world/map';

/**
 * Viewport bounds in grid tile coordinates.
 * Represents the visible tile range in the world.
 */
export interface TileViewport {
  minTileX: number;
  minTileY: number;
  maxTileX: number;
  maxTileY: number;
}

/**
 * Calculates the exact visible tile bounds from viewport dimensions and camera position.
 *
 * @param viewportWidth - Canvas width in pixels
 * @param viewportHeight - Canvas height in pixels
 * @param tileSize - Size of each tile in pixels
 * @param cameraPosition - Camera position in grid tile coordinates
 * @returns Exact viewport bounds in grid tile coordinates (no buffer)
 */
export function calculateTileViewport(
  viewportWidth: number,
  viewportHeight: number,
  tileSize: number,
  cameraPosition: GridPosition
): TileViewport {
  if (tileSize <= 0 || !Number.isFinite(tileSize)) {
    if (tileSize <= 0) {
      console.warn('Invalid tile size', tileSize);
    } else {
      console.warn('Tile size is not a finite number', tileSize);
    }
    return {
      minTileX: 0,
      minTileY: 0,
      maxTileX: 0,
      maxTileY: 0,
    };
  }
  const halfWidthInTiles = viewportWidth / 2 / tileSize;
  const halfHeightInTiles = viewportHeight / 2 / tileSize;

  return {
    minTileX: Math.floor(cameraPosition.x - halfWidthInTiles),
    minTileY: Math.floor(cameraPosition.y - halfHeightInTiles),
    maxTileX: Math.ceil(cameraPosition.x + halfWidthInTiles),
    maxTileY: Math.ceil(cameraPosition.y + halfHeightInTiles),
  };
}

/**
 * Checks if a grid coordinate falls within the tile viewport (with optional buffer).
 * Optimized for primitive arguments to avoid allocation.
 */
export function isCoordinateInViewport(
  x: number,
  y: number,
  viewport: TileViewport,
  bufferTiles = 0
): boolean {
  // Defensive: ensure buffer is non-negative
  if (bufferTiles < 0) {
    console.error(
      `[TileViewport] bufferTiles must be non-negative, got ${bufferTiles}. Using 0.`
    );
    bufferTiles = 0;
  }

  return (
    x >= viewport.minTileX - bufferTiles &&
    x <= viewport.maxTileX + bufferTiles &&
    y >= viewport.minTileY - bufferTiles &&
    y <= viewport.maxTileY + bufferTiles
  );
}

/**
 * Checks if a linear tile index falls within the tile viewport (with optional buffer).
 * Fast path for iterating indices without decomposing to x/y first.
 *
 * @param index - Linear tile index
 * @param mapCols - Width of the map in tiles
 * @param viewport - Viewport bounds
 * @param bufferTiles - Optional buffer
 */
export function isTileIndexInViewport(
  index: number,
  mapCols: number,
  viewport: TileViewport,
  bufferTiles = 0
): boolean {
  // Defensive: ensure buffer is non-negative
  if (bufferTiles < 0) {
    bufferTiles = 0;
  }

  const x = index % mapCols;
  const y = Math.floor(index / mapCols);

  return (
    x >= viewport.minTileX - bufferTiles &&
    x <= viewport.maxTileX + bufferTiles &&
    y >= viewport.minTileY - bufferTiles &&
    y <= viewport.maxTileY + bufferTiles
  );
}

/**
 * Generator that yields tile indices within the viewport bounds.
 * Allows linear iteration over the 2D grid area.
 *
 * @param viewport - The viewport bounds to iterate over
 * @param mapCols - Map width in tiles, required to calculate linear index
 */
export function* iterateTileIndices(
  viewport: TileViewport,
  mapCols: number
): Generator<number> {
  for (let y = viewport.minTileY; y <= viewport.maxTileY; y++) {
    let tileIndex = y * mapCols + viewport.minTileX;
    for (let x = viewport.minTileX; x <= viewport.maxTileX; x++) {
      yield tileIndex;
      tileIndex++;
    }
  }
}
