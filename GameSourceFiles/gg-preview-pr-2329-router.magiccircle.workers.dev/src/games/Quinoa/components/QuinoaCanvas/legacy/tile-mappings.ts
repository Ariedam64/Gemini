import { Texture } from 'pixi.js';
import {
  Spritesheet,
  type TileRef,
} from '@/common/games/Quinoa/world/tiles/ref';
import {
  DecorTile,
  ItemsTile,
  MutationOverlayTiles,
  MutationTiles,
  PetTiles,
  PlantsTile,
  SeedsTile,
  SpecialPlantsTiles,
  TallPlantsTile,
} from '@/common/games/Quinoa/world/tiles/spritesheets';

/**
 * Create reverse lookups from tile index to tile name.
 * @example createIndexToNameMap(PlantsTile) → { 33: "Carrot", ... }
 */
function createIndexToNameMap<T extends Record<string, { index: number }>>(
  tileSet: T
): Record<number, string> {
  const map: Record<number, string> = {};
  for (const [name, tileRef] of Object.entries(tileSet)) {
    map[tileRef.index - 1] = name;
  }
  return map;
}

const PLANTS_INDEX_TO_NAME = createIndexToNameMap(PlantsTile);
const DECOR_INDEX_TO_NAME = createIndexToNameMap(DecorTile);
const SEEDS_INDEX_TO_NAME = createIndexToNameMap(SeedsTile);
const ITEMS_INDEX_TO_NAME = createIndexToNameMap(ItemsTile);
const TALLPLANTS_INDEX_TO_NAME = createIndexToNameMap(TallPlantsTile);
const MUTATIONS_INDEX_TO_NAME = createIndexToNameMap(MutationTiles);
const MUTATION_OVERLAYS_INDEX_TO_NAME =
  createIndexToNameMap(MutationOverlayTiles);
const PETS_INDEX_TO_NAME = createIndexToNameMap(PetTiles);

const ANIMATIONS_INDEX_TO_NAME = {
  ...createIndexToNameMap(SpecialPlantsTiles),
};

/**
 * Get the TexturePacker frame name for a given spritesheet and tile index.
 * @example getTileFrameName('plants', 34) → "plants/tiles/Carrot"
 * @param spritesheet - The spritesheet name (e.g., 'plants', 'decor')
 * @param tileIndex - The tile index from the spritesheet
 * @returns The full frame name for TexturePacker, or null if not found
 */
export function getTileFrameName(
  spritesheet: string,
  tileIndex: number
): string | null {
  let tileName: string | undefined;
  let subfolder: string = '';

  switch (spritesheet) {
    case Spritesheet.Plants:
      tileName = PLANTS_INDEX_TO_NAME[tileIndex];
      subfolder = 'plant';
      break;
    case Spritesheet.Decor:
      tileName = DECOR_INDEX_TO_NAME[tileIndex];
      subfolder = 'decor';
      break;
    case Spritesheet.TallPlants:
      tileName = TALLPLANTS_INDEX_TO_NAME[tileIndex];
      subfolder = 'tallplant';
      break;
    case Spritesheet.Seeds:
      tileName = SEEDS_INDEX_TO_NAME[tileIndex];
      subfolder = 'seed';
      break;
    case Spritesheet.Mutations:
      tileName = MUTATIONS_INDEX_TO_NAME[tileIndex];
      subfolder = 'mutation';
      break;
    case Spritesheet.MutationOverlays:
      tileName = MUTATION_OVERLAYS_INDEX_TO_NAME[tileIndex];
      subfolder = 'mutation-overlay';
      break;
    case Spritesheet.Animations:
      tileName = ANIMATIONS_INDEX_TO_NAME[tileIndex];
      subfolder = 'animation';
      break;
    case Spritesheet.Pets:
      tileName = PETS_INDEX_TO_NAME[tileIndex];
      subfolder = 'pet';
      break;
    case Spritesheet.Items:
      tileName = ITEMS_INDEX_TO_NAME[tileIndex];
      subfolder = 'item';
      break;
    default:
      return null;
  }
  if (!tileName) return null;

  // Convert to TexturePacker frame name format
  // e.g., "Carrot" → "plants/tiles/Carrot"
  return `sprite/${subfolder}/${tileName}`;
}

export function getTextureFromTileRef(tileRef: TileRef): Texture {
  if (!tileRef) {
    console.warn('[getTextureFromTileRef] Missing tileRef');
    return Texture.WHITE;
  }
  const frameName = getTileFrameName(tileRef.spritesheet, tileRef.index - 1);
  if (!frameName) {
    console.warn(
      `[createSpriteFromTileRef] Missing sprite for ${tileRef.spritesheet}:${tileRef.index}`
    );
    return Texture.WHITE;
  }
  return Texture.from(frameName);
}

export function getIsTallPlant(frameName: string): boolean {
  return frameName.includes('tallplant');
}
