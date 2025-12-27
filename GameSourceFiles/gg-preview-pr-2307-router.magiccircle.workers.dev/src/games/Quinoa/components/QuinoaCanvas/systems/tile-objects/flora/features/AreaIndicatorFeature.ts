import { Container, Sprite } from 'pixi.js';
import {
  type FloraAbilityId,
  floraAbilitiesDex,
} from '@/common/games/Quinoa/systems/flora';
import type { WeatherId } from '@/common/games/Quinoa/systems/weather';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import type { QuinoaFrameContext } from '@/Quinoa/components/QuinoaCanvas/interfaces';
import { getTextureFromTileRef } from '../../../../legacy/tile-mappings';
import { TILE_SIZE_WORLD } from '../../../../sprite-utils';
import { GlobalRenderLayers } from '../../../GlobalRenderLayers';
import type {
  PlantVisualFeature,
  PlantVisualFeatureContext,
} from './PlantVisualFeature';

/**
 * Generates tile offsets for all tiles within a given radius (excluding center).
 *
 * @param radius - The tile radius (1 = 8 adjacent tiles, 2 = 24 tiles, etc.)
 * @returns Array of {dx, dy} offsets for each tile in the radius
 */
function generateTileOffsets(
  radius: number
): ReadonlyArray<{ dx: number; dy: number }> {
  const offsets: { dx: number; dy: number }[] = [];
  for (let dx = -radius; dx <= radius; dx++) {
    for (let dy = -radius; dy <= radius; dy++) {
      if (dx === 0 && dy === 0) continue; // Skip center
      offsets.push({ dx, dy });
    }
  }
  return offsets;
}

/**
 * Creates area indicator sprites for an ability.
 *
 * @param abilityId - The flora ability ID
 * @returns Container with sprites positioned for the ability's tile radius
 */
function createAreaSprites(abilityId: FloraAbilityId): Container {
  const ability = floraAbilitiesDex[abilityId];
  const { activationTileRef, tileRadius } = ability.baseParameters;

  const container = new Container({
    label: 'AreaIndicator',
  });

  const offsets = generateTileOffsets(tileRadius ?? 1);
  const texture = getTextureFromTileRef(activationTileRef);

  for (const { dx, dy } of offsets) {
    const sprite = new Sprite({
      texture,
      anchor: 0.5,
    });
    sprite.position.set(dx * TILE_SIZE_WORLD, dy * TILE_SIZE_WORLD);
    container.addChild(sprite);

    // Attach to aboveGround render layer so sprites render above ground
    // tiles but below plants/avatars
    GlobalRenderLayers.aboveGround?.attach(sprite);
  }

  return container;
}

/**
 * Options for creating a seed area indicator preview.
 */
export interface SeedAreaIndicatorOptions {
  /** The ability that defines the area effect. */
  abilityId: FloraAbilityId;
  /** The world position for positioning the indicator. */
  worldPosition: GridPosition;
}

/**
 * Simple area indicator for seed placement previews.
 * Always visible, no weather checks - just shows the area of effect.
 */
export class SeedAreaIndicator {
  public readonly container: Container;

  constructor(options: SeedAreaIndicatorOptions) {
    this.container = createAreaSprites(options.abilityId);
    this.container.visible = true;
  }

  /**
   * No-op update for compatibility with PlantVisualFeature interface pattern.
   */
  update(_context: QuinoaFrameContext, _isMature: boolean): void {
    // Always visible - no updates needed
  }

  destroy(): void {
    this.container.destroy({ children: true });
  }
}

/**
 * Renders activation tile sprites on adjacent tiles around a plant.
 *
 * Shows the area of effect indicators when:
 * - The local player is standing on the plant (preview mode)
 * - The plant's ability is activating (correct weather is active)
 *
 * Used for celestial plants (DawnCelestial, MoonCelestial) to visualize
 * the range of their mutation abilities.
 */
export class AreaIndicatorFeature implements PlantVisualFeature {
  public readonly container: Container;

  private readonly worldPosition: GridPosition;
  private readonly requiredWeather: WeatherId;

  /**
   * Determines if this feature should be created for the given plant context.
   */
  static shouldCreate(context: PlantVisualFeatureContext): boolean {
    const { blueprint, worldPosition } = context;
    if (!worldPosition || !blueprint.plant.abilities) return false;
    return blueprint.plant.abilities.some((id) => {
      const ability = floraAbilitiesDex[id];
      return ability.baseParameters.activationTileRef;
    });
  }

  constructor(context: PlantVisualFeatureContext) {
    const { blueprint, worldPosition } = context;
    const plantBlueprint = blueprint.plant;

    if (!worldPosition) {
      throw new Error('AreaIndicatorFeature requires worldPosition');
    }

    // Find first ability with activationTileRef
    const abilityId = plantBlueprint.abilities?.find((id) => {
      const ability = floraAbilitiesDex[id];
      return ability.baseParameters.activationTileRef;
    });

    if (!abilityId) {
      throw new Error(
        'AreaIndicatorFeature requires an ability with activationTileRef'
      );
    }

    const ability = floraAbilitiesDex[abilityId];
    this.worldPosition = worldPosition;
    this.requiredWeather = ability.baseParameters.requiredWeather!;

    this.container = createAreaSprites(abilityId);
    this.container.visible = false; // Hidden by default
  }

  /**
   * Updates visibility based on player position and weather.
   */
  update(context: QuinoaFrameContext, _isPlantMature: boolean): void {
    const isPlayerOnPlant =
      context.playerPosition.x === this.worldPosition.x &&
      context.playerPosition.y === this.worldPosition.y;

    const isAbilityActive = context.weatherId === this.requiredWeather;

    this.container.visible = isPlayerOnPlant || isAbilityActive;
  }

  destroy(): void {
    this.container.destroy({ children: true });
  }
}
