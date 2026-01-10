import { Container, Sprite, Texture } from 'pixi.js';
import {
  type FloraAbilityId,
  type FloraSpeciesId,
  floraAbilitiesDex,
  floraSpeciesDex,
} from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { MutationId } from '@/common/games/Quinoa/systems/mutation';
import { toolsDex } from '@/common/games/Quinoa/systems/tools';
import type {
  InventoryItem,
  PetInventoryItem,
  PlantInventoryItem,
  PlantTileObject,
} from '@/common/games/Quinoa/user-json-schema/current';
import { getInventoryItemId } from '@/common/games/Quinoa/utils/inventory';
import type { TileRef } from '@/common/games/Quinoa/world/tiles';
import { bakeSpriteTexture } from '../../GameTextureCache';
import type { QuinoaFrameContext } from '../../interfaces';
import { TILE_SIZE_WORLD } from '../../sprite-utils';
import { PetVisual } from '../pets/PetVisual';
import { DecorVisual } from '../tile-objects/decor/DecorVisual';
import { EggVisual } from '../tile-objects/egg/EggVisual';
import {
  FilteredAreaIndicator,
  type TileVisibilityFilter,
} from '../tile-objects/flora/features/AreaIndicatorFeature';
import { CropVisual } from '../tile-objects/flora/visuals/CropVisual';
import { PlantVisual } from '../tile-objects/flora/visuals/PlantVisual';
import { AVATAR_Y_OFFSET } from './avatarConstants';
import { getHeldItemLayout } from './heldItemConfig';

// ============================================================================
// Animation
// ============================================================================

/** Bobbing animation frequency in radians per millisecond for items above head */
const BOB_FREQUENCY_ABOVE_HEAD = 0.006;

/** Bobbing animation frequency in radians per millisecond for items below head */
const BOB_FREQUENCY_BELOW_HEAD = 0.004;

/** Bobbing animation amplitude in pixels for items held above head */
const BOB_AMPLITUDE_ABOVE_HEAD = 3;

/** Bobbing animation amplitude in pixels for items held below head */
const BOB_AMPLITUDE_BELOW_HEAD = 1;

/** Pivot Y offset multiplier for plant items (in tile units) */
const PLANT_PIVOT_Y_MULTIPLIER = 0.45;

/**
 * Applies vertical bobbing animation to a display object.
 */
function applyBob(
  target: Container,
  time: number,
  baseY: number,
  phaseOffset: number,
  amplitude: number,
  frequency: number
): void {
  target.position.y =
    baseY + Math.sin(time * frequency + phaseOffset) * amplitude;
}

/**
 * Checks if the held item should be suppressed based on the suppression timestamp.
 * @param suppressUntil - Timestamp until which the item should be hidden (0 = not suppressed)
 * @param time - Current time from performance.now()
 * @returns true if the item should be hidden
 */
function isSuppressed(suppressUntil: number, time: number): boolean {
  return suppressUntil > 0 && time < suppressUntil;
}

/**
 * Gets the first ability with an activationTileRef from a flora species.
 * Used to determine if a plant/seed should show area-of-effect indicators.
 *
 * @param species - The flora species ID to check
 * @returns The ability ID if found, null otherwise
 */
function getAbilityWithActivationTile(
  species: FloraSpeciesId
): FloraAbilityId | null {
  const blueprint = floraSpeciesDex[species];
  const abilities =
    'abilities' in blueprint.plant ? blueprint.plant.abilities : undefined;

  if (!abilities) {
    return null;
  }
  for (const abilityId of abilities) {
    const ability = floraAbilitiesDex[abilityId];
    if (ability.baseParameters.activationTileRef) {
      return abilityId;
    }
  }
  return null;
}

// ============================================================================
// Item Data Helpers
// ============================================================================

/** Simple item visual data: tileRef and mutations. */
interface ItemTileData {
  tileRef: TileRef;
  mutations: MutationId[];
}

/**
 * Returns the TileRef and mutations for simple inventory items.
 * Complex items (Plants, Decor, Produce, Eggs, Pets) use dedicated Visual classes.
 */
function getItemTileData(item: InventoryItem): ItemTileData | null {
  switch (item.itemType) {
    case ItemType.Tool:
      return { tileRef: toolsDex[item.toolId].tileRef, mutations: [] };

    case ItemType.Seed:
      return {
        tileRef: floraSpeciesDex[item.species].seed.tileRef,
        mutations: [],
      };

    // Complex items handled via dedicated Visual classes
    case ItemType.Plant:
    case ItemType.Decor:
    case ItemType.Produce:
    case ItemType.Egg:
    case ItemType.Pet:
      return null;
  }
}

/**
 * Converts a PlantInventoryItem to a PlantTileObject for PlantVisual.
 */
function toPlantTileObject(plant: PlantInventoryItem): PlantTileObject {
  return {
    objectType: 'plant',
    species: plant.species,
    slots: plant.slots,
    plantedAt: plant.plantedAt,
    maturedAt: plant.maturedAt,
  };
}

// ============================================================================
// HeldVisual Interface
// ============================================================================

/**
 * Unified interface for any visual that can be held by an avatar.
 * Allows HeldItemVisual to work with different visual types uniformly.
 */
interface HeldVisual {
  /** The container to apply animations to */
  readonly target: Container;
  /**
   * Optional getter for the container to use for bounds calculation.
   * If not provided, uses `target`. Useful when features (like immature sprites)
   * should be visible but shouldn't affect anchor/pivot positioning.
   */
  getBoundsTarget?(): Container;
  /** Optional per-frame update (e.g., for plant growth) */
  update?(context: QuinoaFrameContext): void;
  /** Cleanup when switching items */
  destroy(): void;
}

// ============================================================================
// HeldItemVisual
// ============================================================================

/**
 * Visual component for displaying the item an avatar is holding.
 * Renders with a gentle bobbing animation.
 *
 * Uses the HeldVisual abstraction to work uniformly with different item types:
 * - Plants (PlantVisual)
 * - Decor (DecorVisual)
 * - Crops/Produce (CropVisual)
 * - Simple items (Sprite)
 *
 * @example
 * ```typescript
 * const heldItem = new HeldItemVisual();
 * container.addChild(heldItem);
 *
 * heldItem.setItem(inventoryItem);
 * heldItem.update(performance.now(), serverNow);
 * ```
 */
export class HeldItemVisual extends Container {
  /** Current held visual (wraps the active visual type) */
  private heldVisual: HeldVisual | null = null;
  /** Current item ID for change detection */
  private currentItemId: string | null = null;
  /** Current decor rotation for change detection */
  private currentDecorRotation: number = 0;
  /** Current item's Y offset for bobbing animation */
  private currentOffsetY: number = 0;
  /** Bobbing amplitude for current item (varies by hold position) */
  private currentBobAmplitude: number = BOB_AMPLITUDE_ABOVE_HEAD;
  /** Bobbing frequency for current item (varies by hold position) */
  private currentBobFrequency: number = BOB_FREQUENCY_ABOVE_HEAD;
  /** Random phase offset in radians to stagger bobbing animations */
  private readonly bobbingPhaseOffset: number;
  /** Reusable sprite for simple items (avoids allocation per item change) */
  private readonly simpleSprite: Sprite;
  /**
   * Timestamp until which the held item should be hidden.
   * Used during action animations (water, harvest, etc.) to avoid visual overlap.
   * 0 = not suppressed.
   */
  private suppressUntil: number = 0;
  /** Area indicator for celestial plants (shows activation tiles around avatar) */
  private areaIndicator: FilteredAreaIndicator | null = null;
  /** Filter to determine which tiles should show area indicators */
  private tileVisibilityFilter: TileVisibilityFilter | null = null;

  constructor() {
    super();
    this.label = 'HeldItemVisual';
    this.simpleSprite = new Sprite({ texture: Texture.EMPTY });
    // Random phase offset to stagger bobbing animations (0 to 2π)
    this.bobbingPhaseOffset = Math.random() * Math.PI * 2;
    this.visible = false;
  }

  /**
   * Sets the tile visibility filter for area indicators.
   * Tiles passing this filter will show activation indicators when holding
   * celestial plants/seeds.
   *
   * @param filter - Function that returns true for tiles that should show indicators
   */
  setTileVisibilityFilter(filter: TileVisibilityFilter): void {
    this.tileVisibilityFilter = filter;
  }

  /**
   * Sets the inventory item to display.
   *
   * @param item - The inventory item to display, or null to hide
   * @param decorRotation - Rotation for decor items (0 for others)
   */
  setItem(item: InventoryItem | null, decorRotation: number = 0): void {
    const itemId = item ? getInventoryItemId(item) : null;
    const rotationChanged =
      item?.itemType === ItemType.Decor &&
      decorRotation !== this.currentDecorRotation;

    if (itemId === this.currentItemId && !rotationChanged) {
      return;
    }
    this.currentItemId = itemId;
    this.currentDecorRotation = decorRotation;
    this.clearHeldVisual();

    if (!item) {
      this.visible = false;
      return;
    }
    const layout = getHeldItemLayout(item);

    // Calculate String Lights offset before setting currentOffsetY
    const isStringLights =
      item.itemType === ItemType.Decor &&
      ['ColoredStringLights', 'StringLights'].includes(item.decorId);

    let stringLightsOffsetY = 0;

    if (isStringLights) {
      const absRotation = Math.abs(decorRotation);

      if (decorRotation === 0 || decorRotation === -360) {
        stringLightsOffsetY = 0.1 * TILE_SIZE_WORLD;
      } else if (absRotation === 180) {
        stringLightsOffsetY = 1.05 * TILE_SIZE_WORLD;
      } else if (absRotation === 90) {
        stringLightsOffsetY = 1.05 * TILE_SIZE_WORLD;
      } else if (absRotation === 270) {
        stringLightsOffsetY = 1.05 * TILE_SIZE_WORLD;
      }
    }

    // Add offset to currentOffsetY so it's included in bobbing calculation
    this.currentOffsetY = layout.position.y + stringLightsOffsetY;
    // Items held above head (negative Y) bob more/faster than items below head
    const isAboveHead = layout.position.y < 0;
    this.currentBobAmplitude = isAboveHead
      ? BOB_AMPLITUDE_ABOVE_HEAD
      : BOB_AMPLITUDE_BELOW_HEAD;
    this.currentBobFrequency = isAboveHead
      ? BOB_FREQUENCY_ABOVE_HEAD
      : BOB_FREQUENCY_BELOW_HEAD;
    this.heldVisual = this.createHeldVisual(item, decorRotation);

    if (this.heldVisual) {
      // Use getBoundsTarget if available (e.g., for plants with features that
      // shouldn't affect anchor positioning)
      const boundsTarget =
        this.heldVisual.getBoundsTarget?.() ?? this.heldVisual.target;
      const bounds = boundsTarget.getLocalBounds();
      // Special handling for plant items: use constant pivot y
      if (item.itemType === ItemType.Plant) {
        this.heldVisual.target.pivot.y =
          PLANT_PIVOT_Y_MULTIPLIER * TILE_SIZE_WORLD;
      } else {
        this.heldVisual.target.pivot.y =
          bounds.y + bounds.height * layout.anchor.y;
      }
      this.heldVisual.target.position.set(
        layout.position.x,
        layout.position.y + stringLightsOffsetY
      );
      this.addChild(this.heldVisual.target);
      this.visible = true;
    } else {
      this.visible = false;
    }
    // Create area indicator for celestial plants/seeds (items with AoE abilities)
    const species = this.getFloraSpecies(item);
    if (!species) {
      return;
    }
    const abilityId = getAbilityWithActivationTile(species);
    if (!abilityId) {
      return;
    }
    this.areaIndicator = new FilteredAreaIndicator(abilityId);
    // Position at tile center (compensate for avatar's upward Y offset)
    this.areaIndicator.container.position.y = TILE_SIZE_WORLD * AVATAR_Y_OFFSET;
    this.addChild(this.areaIndicator.container);
  }

  /**
   * Gets the flora species from an inventory item.
   * Returns the species for plants and seeds, null for other item types.
   */
  private getFloraSpecies(item: InventoryItem): FloraSpeciesId | null {
    if (item.itemType === ItemType.Plant || item.itemType === ItemType.Seed) {
      return item.species;
    }
    return null;
  }

  /**
   * Creates the appropriate HeldVisual for an inventory item.
   */
  private createHeldVisual(
    item: InventoryItem,
    decorRotation: number
  ): HeldVisual | null {
    switch (item.itemType) {
      case ItemType.Plant:
        return this.createPlantVisual(item);
      case ItemType.Decor:
        return this.createDecorVisual(item, decorRotation);
      case ItemType.Produce:
        return this.createCropVisual(item);
      case ItemType.Egg:
        return this.createEggVisual(item);
      case ItemType.Pet:
        return this.createPetVisual(item);
      case ItemType.Tool:
      case ItemType.Seed:
        return this.createSimpleVisual(item);
    }
  }

  private createPlantVisual(item: PlantInventoryItem): HeldVisual {
    const plantVisual = new PlantVisual({
      plant: toPlantTileObject(item),
      blueprint: floraSpeciesDex[item.species],
      isolateRendering: true,
      renderPlanterPot: true,
    });
    // Return the full container (including features like ImmatureFeature and
    // CelestialGrowingAnimationFeature) so celestial plants render correctly.
    // Use bodyVisual for bounds calculation to avoid features affecting anchor.
    return {
      target: plantVisual.container,
      getBoundsTarget: () => plantVisual.bodyVisual.container,
      update: (ctx) => plantVisual.update(ctx),
      destroy: () => plantVisual.destroy(),
    };
  }

  private createDecorVisual(
    item: InventoryItem & { itemType: ItemType.Decor },
    decorRotation: number
  ): HeldVisual {
    const decorVisual = new DecorVisual({
      decorId: item.decorId,
      rotation: decorRotation,
    });
    return {
      target: decorVisual.container,
      destroy: () => decorVisual.destroy(),
    };
  }

  private createCropVisual(
    item: InventoryItem & { itemType: ItemType.Produce }
  ): HeldVisual {
    const cropVisual = new CropVisual({
      scale: item.scale,
      mutations: item.mutations,
      floraSpeciesId: item.species,
      mode: 'crop',
    });
    return {
      target: cropVisual.container,
      destroy: () => cropVisual.destroy(),
    };
  }

  private createEggVisual(
    item: InventoryItem & { itemType: ItemType.Egg }
  ): HeldVisual {
    const eggVisual = new EggVisual({ eggId: item.eggId });
    return {
      target: eggVisual.sprite,
      destroy: () => eggVisual.destroy(),
    };
  }

  private createPetVisual(item: PetInventoryItem): HeldVisual {
    const petVisual = new PetVisual({ petSlot: item });
    return {
      target: petVisual.sprite,
      destroy: () => petVisual.destroy(),
    };
  }

  private createSimpleVisual(item: InventoryItem): HeldVisual | null {
    const tileData = getItemTileData(item);
    if (!tileData) {
      return null;
    }
    const texture = bakeSpriteTexture(tileData.tileRef, tileData.mutations);
    this.simpleSprite.texture = texture;
    this.simpleSprite.scale.set(1);
    this.simpleSprite.anchor.set(0.5);

    return {
      target: this.simpleSprite,
      destroy: () => {
        this.simpleSprite.texture = Texture.EMPTY;
      },
    };
  }

  private clearHeldVisual(): void {
    if (this.heldVisual) {
      this.removeChild(this.heldVisual.target);
      this.heldVisual.destroy();
      this.heldVisual = null;
    }
    if (this.areaIndicator) {
      this.removeChild(this.areaIndicator.container);
      this.areaIndicator.destroy();
      this.areaIndicator = null;
    }
  }

  /**
   * Temporarily hides the held item during action animations.
   * The item will automatically reappear after the specified duration.
   *
   * @param durationMs - How long to suppress the display (in milliseconds)
   * @param time - Current time from performance.now()
   */
  suppress(durationMs: number, time: number): void {
    this.suppressUntil = time + durationMs;
  }

  /**
   * Updates the bobbing animation each frame.
   * Handles suppression state to hide item during action animations.
   *
   * @param time - Current render time in milliseconds (e.g., performance.now())
   * @param serverNow - Current server time for plant growth calculations
   */
  update(context: QuinoaFrameContext): void {
    if (!this.heldVisual) {
      return;
    }
    // Hide during action animations (water, harvest, etc.)
    this.visible = !isSuppressed(this.suppressUntil, context.time);
    if (!this.visible) {
      return;
    }
    this.heldVisual.update?.(context);
    applyBob(
      this.heldVisual.target,
      context.time,
      this.currentOffsetY,
      this.bobbingPhaseOffset,
      this.currentBobAmplitude,
      this.currentBobFrequency
    );

    // Update area indicator visibility based on tile filter
    if (this.areaIndicator && this.tileVisibilityFilter) {
      this.areaIndicator.updateVisibility(
        context.playerPosition,
        this.tileVisibilityFilter
      );
    }
  }

  /**
   * Cleans up resources when the visual is no longer needed.
   */
  destroy(): void {
    this.clearHeldVisual();
    this.simpleSprite.destroy();
    super.destroy();
  }
}
