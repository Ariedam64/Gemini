import quinoaMapJson from '../Tiled/map.json';
import type { GardenTileType } from '../tiles';
import { LOCATION_NAMES } from './constants';
import type { GridPosition, LocationName, Locations, QuinoaMap } from './types';

// ============================================================================
// COORDINATE & POSITION UTILITIES
// ============================================================================

/**
 * Converts x,y coordinates to a global tile index
 */
export function getGlobalTileIndexFromCoordinate(
  world: QuinoaMap,
  x: number,
  y: number
) {
  return x + y * world.cols;
}

/**
 * Converts a global tile index to x,y coordinates
 */
export function getTilePosition(world: QuinoaMap, tileIndex: number) {
  return {
    x: tileIndex % world.cols,
    y: Math.floor(tileIndex / world.cols),
  };
}

// ============================================================================
// TILE INDEX MAPPING UTILITIES
// ============================================================================

/**
 * Gets the global tile index from user slot index, tile index, and tile type.
 *
 * @param map - The base quinoa map containing tile mappings
 * @param tileType - The type of tile ('Dirt' or 'Boardwalk')
 * @param userSlotIdx - The user slot index
 * @param tileIndex - The index of the tile within its type-specific mapping
 * @returns The global tile index, or undefined if not found
 */
export function getGlobalTileIndexFromSlot(
  map: QuinoaMap,
  tileType: GardenTileType,
  userSlotIdx: number,
  tileIndex: number
): number | undefined {
  switch (tileType) {
    case 'Dirt': {
      const dirtTiles =
        map.userSlotIdxAndDirtTileIdxToGlobalTileIdx[userSlotIdx];
      if (dirtTiles && tileIndex < dirtTiles.length) {
        return dirtTiles[tileIndex];
      }
      return undefined;
    }
    case 'Boardwalk': {
      const boardwalkTiles =
        map.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx[userSlotIdx];
      if (boardwalkTiles && tileIndex < boardwalkTiles.length) {
        return boardwalkTiles[tileIndex];
      }
      return undefined;
    }
    default:
      return undefined;
  }
}

/**
 * Validates if a slot index is valid for the given tile type and user slot
 */
export function getIsValidSlotIndex({
  tileType,
  map,
  userSlotIdx,
  slotIndex,
}: {
  tileType: GardenTileType;
  map: QuinoaMap;
  userSlotIdx: number;
  slotIndex: number;
}): boolean {
  if (!Number.isSafeInteger(slotIndex) || slotIndex < 0) {
    return false;
  }
  switch (tileType) {
    case 'Dirt': {
      return (
        map.userSlotIdxAndDirtTileIdxToGlobalTileIdx[userSlotIdx][slotIndex] !==
        undefined
      );
    }
    case 'Boardwalk': {
      return (
        map.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx[userSlotIdx][
          slotIndex
        ] !== undefined
      );
    }
    default:
      return false;
  }
}

// ============================================================================
// TILE DISCOVERY & ADJACENCY
// ============================================================================

/**
 * Gets adjacent tiles around a given tile within a specified range.
 *
 * How it works:
 * 1. Takes a tile index, type, and user slot to determine which mapping to use (dirt or boardwalk)
 * 2. Converts the tile index to x,y coordinates using the map dimensions
 * 3. Calculates all adjacent coordinates within the specified range (including diagonals)
 * 4. For each adjacent coordinate, converts it back to a global tile index
 * 5. Determines the tile type for each adjacent tile by checking which mapping contains it
 * 6. Returns an array of objects containing tileType and tileIndex for each valid adjacent tile
 *
 * @param map - The base quinoa map containing tile mappings
 * @param tileType - The type of tile ('Dirt' or 'Boardwalk')
 * @param tileIndex - The index of the tile within its type-specific mapping
 * @param userSlotIdx - The user slot index to use for the tile lookup
 * @param includeSelf - Whether to include the original tile in results (default: false)
 * @param tileRadius - The range of adjacent tiles to include (default: 1)
 * @returns Array of objects with tileType and tileIndex for adjacent tiles
 */
export function getTargetTiles({
  map,
  tileType,
  tileIndex,
  userSlotIdx,
  includeSelf = false,
  tileRadius = 1,
}: {
  map: QuinoaMap;
  tileType: GardenTileType;
  tileIndex: number;
  userSlotIdx: number;
  includeSelf?: boolean;
  tileRadius?: number;
}): { tileType: GardenTileType; tileIndex: number }[] {
  // Get the global tile index from the specified user slot
  const globalTileIdx = getGlobalTileIndexFromSlot(
    map,
    tileType,
    userSlotIdx,
    tileIndex
  );
  if (globalTileIdx === undefined) {
    return [];
  }
  // Convert global tile index to x,y coordinates
  const originalPos = getTilePosition(map, globalTileIdx);
  const results: Array<{ tileType: GardenTileType; tileIndex: number }> = [];
  // Calculate all adjacent coordinates within range
  for (let dx = -tileRadius; dx <= tileRadius; dx++) {
    for (let dy = -tileRadius; dy <= tileRadius; dy++) {
      // Skip if not including self and this is the original position
      if (!includeSelf && dx === 0 && dy === 0) {
        continue;
      }
      const newX = originalPos.x + dx;
      const newY = originalPos.y + dy;
      // Check bounds
      if (newX < 0 || newX >= map.cols || newY < 0 || newY >= map.rows) {
        continue;
      }
      // Convert back to global tile index
      const adjacentGlobalTileIdx = getGlobalTileIndexFromCoordinate(
        map,
        newX,
        newY
      );
      // Determine tile type by checking which mapping contains this global tile index
      if (map.globalTileIdxToDirtTile[adjacentGlobalTileIdx]) {
        const dirtMapping = map.globalTileIdxToDirtTile[adjacentGlobalTileIdx];
        const dirtTileIdx = dirtMapping.dirtTileIdx;
        results.push({ tileType: 'Dirt', tileIndex: dirtTileIdx });
      } else if (map.globalTileIdxToBoardwalk[adjacentGlobalTileIdx]) {
        const boardwalkMapping =
          map.globalTileIdxToBoardwalk[adjacentGlobalTileIdx];
        const boardwalkTileIdx = boardwalkMapping.boardwalkTileIdx;
        results.push({ tileType: 'Boardwalk', tileIndex: boardwalkTileIdx });
      }
    }
  }
  return results;
}

// ============================================================================
// SPAWN POSITION UTILITIES
// ============================================================================

/**
 * Gets the spawn position for a user slot
 */
export function getSpawnPosition(
  world: QuinoaMap,
  userSlotIdx: number
): GridPosition | undefined {
  const spawnTile = world.spawnTiles[userSlotIdx];
  if (!spawnTile) {
    return undefined;
  }
  return getTilePosition(world, spawnTile);
}

// ============================================================================
// LOCATION MANAGEMENT
// ============================================================================

/**
 * Creates a locations object from the predefined list of location names.
 * Each location will have default values that should be populated later.
 *
 * @returns Locations object with default configurations
 */
export function initLocationTiles(): Locations {
  const locations = {} as Locations;

  for (const name of LOCATION_NAMES) {
    locations[name] = {
      spawnTileIdx: [],
      activationTilesIdxs: [],
    };
  }
  return locations;
}

// ============================================================================
// MAP GENERATION
// ============================================================================

/**
 * Generates the complete QuinoaMap from the Tiled map JSON data
 * Nov-28-2025(avi) While soon-to-be deprecated, this map parsing is still used as a
 * source of truth for client and server about what things go where. I've
 * optimized the performance to be ~4X faster by removing the TileInfo
 * generation, inverting the looping, and pulling string parsing out of the inner loop.
 */
export function generateMap(): QuinoaMap {
  const { width, height, layers } = quinoaMapJson;
  const spawnTiles: number[] = [];
  const userSlotIdxAndDirtTileIdxToGlobalTileIdx: number[][] = [];
  const userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx: number[][] = [];
  // Mapping from global tile index to dirt tile (for planting/harvesting/decor)
  const globalTileIdxToDirtTile: Record<
    number,
    { userSlotIdx: number; dirtTileIdx: number }
  > = {};
  // Mapping from global tile index to boardwalk tile (for decor)
  const globalTileIdxToBoardwalk: Record<
    number,
    { userSlotIdx: number; boardwalkTileIdx: number }
  > = {};
  const collisionTiles: Set<number> = new Set();
  const locations = initLocationTiles();

  for (const layer of layers) {
    if (layer.type !== 'tilelayer' || !layer.data || !layer.class) {
      continue;
    }

    switch (layer.class) {
      case 'DirtTiles': {
        const userSlotIdx = parseInt(layer.name.split('-')[1]);
        if (!userSlotIdxAndDirtTileIdxToGlobalTileIdx[userSlotIdx]) {
          userSlotIdxAndDirtTileIdxToGlobalTileIdx[userSlotIdx] = [];
        }
        const tiles = userSlotIdxAndDirtTileIdxToGlobalTileIdx[userSlotIdx];
        for (let i = 0; i < layer.data.length; i++) {
          if (layer.data[i] > 0) {
            tiles.push(i);
            globalTileIdxToDirtTile[i] = {
              userSlotIdx,
              dirtTileIdx: tiles.length - 1,
            };
          }
        }
        break;
      }
      case 'BoardwalkTiles': {
        const userSlotIdx = parseInt(layer.name.split('-')[1]);
        if (!userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx[userSlotIdx]) {
          userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx[userSlotIdx] = [];
        }
        const tiles =
          userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx[userSlotIdx];
        for (let i = 0; i < layer.data.length; i++) {
          if (layer.data[i] > 0) {
            tiles.push(i);
            globalTileIdxToBoardwalk[i] = {
              userSlotIdx,
              boardwalkTileIdx: tiles.length - 1,
            };
          }
        }
        break;
      }
      case 'GardenSpawnTile': {
        // Layers in Tiled might be in reverse order, so we must use the name to
        // determine the correct slot index rather than push order.
        const parts = layer.name.split('-');
        const userSlotIdx = parts.length > 1 ? parseInt(parts[1]) : -1;

        for (let i = 0; i < layer.data.length; i++) {
          if (layer.data[i] > 0) {
            if (userSlotIdx >= 0) {
              spawnTiles[userSlotIdx] = i;
            } else {
              spawnTiles.push(i);
            }
          }
        }
        break;
      }
      case 'Spawn': {
        const buildingName = layer.name as LocationName;
        if (buildingName in locations) {
          const list = locations[buildingName].spawnTileIdx;
          for (let i = 0; i < layer.data.length; i++) {
            if (layer.data[i] > 0) {
              list.push(i);
            }
          }
        } else {
          console.error(`(Spawn) Unknown building name: ${buildingName}`);
        }
        break;
      }
      case 'BuildingActivation': {
        const buildingName = layer.name as LocationName;
        if (buildingName in locations) {
          const list = locations[buildingName].activationTilesIdxs;
          for (let i = 0; i < layer.data.length; i++) {
            if (layer.data[i] > 0) {
              list.push(i);
            }
          }
        } else {
          console.error(
            `(BuildingActivation) Unknown building name: ${buildingName}`
          );
        }
        break;
      }
      case 'Collision': {
        for (let i = 0; i < layer.data.length; i++) {
          if (layer.data[i] > 0) {
            collisionTiles.add(i);
          }
        }
        break;
      }
    }
  }

  // Sort location tiles to ensure deterministic order (matching spatial scan)
  for (const name of LOCATION_NAMES) {
    locations[name].spawnTileIdx.sort((a, b) => a - b);
    locations[name].activationTilesIdxs.sort((a, b) => a - b);
  }

  const world: QuinoaMap = {
    cols: width,
    rows: height,
    spawnTiles,
    userSlotIdxAndDirtTileIdxToGlobalTileIdx,
    userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx,
    globalTileIdxToDirtTile,
    globalTileIdxToBoardwalk,
    collisionTiles,
    locations,
  };
  return world;
}
