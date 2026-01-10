import { Sprite, type Texture } from 'pixi.js';
import {
  type FloraSpeciesId,
  floraSpeciesDex,
  HarvestType,
} from '@/common/games/Quinoa/systems/flora';
import {
  type MutationId,
  mutationSortFn,
} from '@/common/games/Quinoa/systems/mutation';
import {
  getIsTallPlant,
  getTextureFromTileRef,
  getTileFrameName,
} from '../../../../legacy/tile-mappings';
import { ColorOverlayFilter } from '../../../../pixi/filters/ColorOverlayFilter';
import {
  FLORA_SCALABLE_RENDER_SCALE,
  TILE_SIZE_WORLD,
} from '../../../../sprite-utils';
import { MutationVisualEffectsDex } from './mutation-filters';

const FloatingMutationIcons: Set<MutationId> = new Set([
  'Dawnlit',
  'Ambershine',
  'Dawncharged',
  'Ambercharged',
]);

const MutationIconYOffsetExceptions: Partial<Record<FloraSpeciesId, number>> = {
  Banana: 0.6,
  Carrot: 0.6,
  Sunflower: 0.5,
  Starweaver: 0.5,
  FavaBean: 0.25,
  BurrosTail: 0.2,
};

const MutationIconXOffsetExceptions: Partial<Record<FloraSpeciesId, number>> = {
  Pepper: 0.5,
  Banana: 0.6,
};

/**
 * Scale boost applied to mutation icons on tall plants.
 * Compensates for the smaller visual presence of icons on taller flora.
 */
const TALL_PLANT_MUTATION_ICON_SCALE_BOOST = 2;

/**
 * Creates mutation icon sprites.
 * Returns an array of sprites so the caller can position/layer them appropriately.
 *
 * @param mutations - Array of mutation IDs to create icons for
 * @param floraSpeciesId - The flora species ID for positioning calculations
 * @param isUnknown - Whether to apply unknown/silhouette darkening effect
 */
export function addMutationIcons(
  mutations: MutationId[],
  floraSpeciesId: FloraSpeciesId,
  isUnknown: boolean = false
): Sprite[] {
  const blueprint = floraSpeciesDex[floraSpeciesId];
  const sourceTileRef =
    blueprint.plant.harvestType === HarvestType.Multiple
      ? blueprint.crop.tileRef
      : blueprint.plant.tileRef;
  const result: Sprite[] = [];

  if (mutations.length === 0) {
    return result;
  }
  const sourceTexture = getTextureFromTileRef(sourceTileRef);
  const frameName = getTileFrameName(
    sourceTileRef.spritesheet,
    sourceTileRef.index - 1
  );
  const isTallPlant = frameName ? getIsTallPlant(frameName) : false;
  // Calculate unified positioning/scaling logic based on source texture
  const { offset, scaleFactor } = calculateIconLayout(
    sourceTexture,
    floraSpeciesId
  );
  const sortedMutations = mutations.toSorted(mutationSortFn);

  const iconMutations = sortedMutations.filter(
    (mutation) => mutation !== 'Gold' && mutation !== 'Rainbow'
  );
  for (const mutation of iconMutations) {
    const config = MutationVisualEffectsDex[mutation];
    if (!config?.iconTileRef) {
      continue;
    }
    let texture = getTextureFromTileRef(config.iconTileRef);

    if (isTallPlant && config.tallPlantIconOverrideTileRef) {
      texture = getTextureFromTileRef(config.tallPlantIconOverrideTileRef);
    }
    if (!texture) {
      continue;
    }
    const isFloatingMutationIcon = FloatingMutationIcons.has(mutation);

    let iconScale = isTallPlant
      ? FLORA_SCALABLE_RENDER_SCALE * TALL_PLANT_MUTATION_ICON_SCALE_BOOST
      : FLORA_SCALABLE_RENDER_SCALE;
    // Apply dynamic scaling based on crop size
    iconScale *= scaleFactor;

    const icon = new Sprite({
      texture,
      scale: iconScale,
      label: `mutation-icon-${mutation}`,
    });
    // Apply unknown/silhouette darkening effect (matches SpriteRenderingUtils behavior)
    if (isUnknown) {
      icon.filters = [new ColorOverlayFilter({ color: 0x2a2a2a, alpha: 0.9 })];
    }
    // Apply calculated offset
    icon.position.set(offset.x, offset.y);

    if (isTallPlant) {
      icon.zIndex = -1; // Sibling sorting: Behind plant (0)
    }
    if (isFloatingMutationIcon) {
      icon.zIndex = 10; // Floating icons stay on top
    }
    result.push(icon);
  }
  return result;
}

/**
 * Calculates layout (offset and scale factor) for mutation icons
 * based on the dimensions and anchor of the source texture.
 */
function calculateIconLayout(
  sourceTexture: Texture,
  speciesId: FloraSpeciesId
): {
  offset: { x: number; y: number };
  scaleFactor: number;
} {
  const harvestType = floraSpeciesDex[speciesId].plant.harvestType;
  const width = sourceTexture.width;
  const height = sourceTexture.height;
  const anchorX = sourceTexture.defaultAnchor?.x ?? 0;
  const anchorY = sourceTexture.defaultAnchor?.y ?? 0;
  // We shouldn't need to nudge the x offset for most crops since their x is centered.
  let targetX = anchorX;

  if (MutationIconXOffsetExceptions[speciesId]) {
    targetX = MutationIconXOffsetExceptions[speciesId];
  }
  // Require significantly taller than wide to be considered "Vertical"
  // This prevents squarish crops like Carrots from getting bottom-aligned icons.
  const isVertical = height > width * 1.5;
  const shouldCheckLongness = harvestType === HarvestType.Single;
  // Vertical (Bamboo, etc) -> Align icons to texture anchor (typically the base).
  // Round (Watermelon, Pumpkin, Carrot) -> Align icons to CENTER.
  let targetY = shouldCheckLongness && isVertical ? anchorY : 0.4;

  if (MutationIconYOffsetExceptions[speciesId]) {
    targetY = MutationIconYOffsetExceptions[speciesId];
  }
  const offset = {
    x: (targetX - anchorX) * width,
    y: (targetY - anchorY) * height,
  };
  const minDimension = Math.min(width, height);
  const maxScale = 1.5;
  const scaleFactor = Math.min(maxScale, minDimension / TILE_SIZE_WORLD);
  return { offset, scaleFactor };
}
