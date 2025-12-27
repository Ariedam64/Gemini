/**
 * Avatar Z-Layer System
 *
 * Single source of truth for determining avatar z-layer relative to tile objects.
 * This determines whether the avatar is rendered ON TOP of or BEHIND an object.
 *
 * Z-Layer Rules:
 * - Background objects (benches, bridges) → Avatar ON TOP (AboveForeground)
 * - Everything else (plants, all other decor) → Avatar BEHIND (BelowForeground)
 *
 * Obscuring (semi-transparency) is a separate concern handled by
 * doesTileObjectObscureAvatar.ts, which uses this module to determine z-layer
 * and then applies transparency based on object scale.
 */

import type {
  DecorObject,
  GardenTileObject,
} from '@/common/games/Quinoa/user-json-schema/current';
import {
  DecorTile,
  PlantsTile,
  SpecialPlantsTiles,
  type TileRef,
} from '@/common/games/Quinoa/world/tiles';
import { getDecorTileInfo } from '../../legacy/QuinoaCanvasUtils';
import { ZLayer } from '../../sprite-utils';

/**
 * Tile refs where the avatar is drawn ON TOP of the object.
 * These are typically flat objects you can sit/stand on (benches, bridges).
 */
const BACKGROUND_TILE_REFS = new Set<TileRef>([
  PlantsTile.DirtPatch,
  DecorTile.WoodBench,
  DecorTile.WoodBenchSideways,
  DecorTile.StoneBench,
  DecorTile.StoneBenchSideways,
  DecorTile.MarbleBench,
  DecorTile.MarbleBenchSideways,
  DecorTile.MarbleBenchBackwards,
  DecorTile.WoodBridge,
  DecorTile.WoodBridgeSideways,
  DecorTile.StoneBridge,
  DecorTile.StoneBridgeSideways,
  DecorTile.MarbleBridge,
  DecorTile.MarbleBridgeSideways,
  SpecialPlantsTiles.MoonCelestialActivationTile,
  SpecialPlantsTiles.DawnCelestialActivationTile,
]);

/**
 * Checks if a tile ref is a background object (avatar drawn on top).
 *
 * @param tileRef - The tile reference to check
 * @returns True if avatar should be drawn on top of this tile
 */
export function isBackgroundTileRef(tileRef: TileRef): boolean {
  return BACKGROUND_TILE_REFS.has(tileRef);
}

/**
 * Determines the z-layer for an avatar standing on a tile object.
 *
 * @param tileObject - The tile object the avatar is standing on
 * @returns ZLayer indicating if avatar should be above or below foreground
 */
export function getAvatarZLayerForTileObject(
  tileObject: GardenTileObject
): ZLayer {
  switch (tileObject.objectType) {
    case 'decor':
      return getAvatarZLayerForDecor(tileObject);
    case 'plant':
    case 'egg':
      // Plants and eggs: avatar is always behind
      return ZLayer.BelowForeground;
  }
}

/**
 * Determines the z-layer for an avatar standing on decor.
 *
 * @param decor - The decor object
 * @returns ZLayer indicating if avatar should be above or below foreground
 */
function getAvatarZLayerForDecor(decor: DecorObject): ZLayer {
  const tileInfo = getDecorTileInfo(decor.decorId, decor.rotation);

  // Background objects (benches, bridges) → avatar on top
  if (BACKGROUND_TILE_REFS.has(tileInfo.tileRef)) {
    return ZLayer.AboveForeground;
  }

  // Everything else → avatar behind
  return ZLayer.BelowForeground;
}
