import { Container, Sprite, Texture } from 'pixi.js';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
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
import { PetVisual } from '../pets/PetVisual';
import { DecorVisual } from '../tile-objects/decor/DecorVisual';
import { EggVisual } from '../tile-objects/egg/EggVisual';
import { CropVisual } from '../tile-objects/flora/visuals/CropVisual';
import { PlantVisual } from '../tile-objects/flora/visuals/PlantVisual';
import { getHeldItemLayout } from './heldItemConfig';

// ============================================================================
// Animation
// ============================================================================

/** Bobbing animation frequency in radians per millisecond */
const BOB_FREQUENCY = 0.006;

/** Bobbing animation amplitude in pixels */
const BOB_AMPLITUDE = 3;

/**
 * Applies vertical bobbing animation to a display object.
 */
function applyBob(
  target: Container,
  time: number,
  baseY: number,
  phaseOffset: number
): void {
  target.position.y =
    baseY + Math.sin(time * BOB_FREQUENCY + phaseOffset) * BOB_AMPLITUDE;
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

  constructor() {
    super();
    this.label = 'HeldItemVisual';
    this.simpleSprite = new Sprite({ texture: Texture.EMPTY });
    // Random phase offset to stagger bobbing animations (0 to 2π)
    this.bobbingPhaseOffset = Math.random() * Math.PI * 2;
    this.visible = false;
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
    this.currentOffsetY = layout.position.y;
    this.heldVisual = this.createHeldVisual(item, decorRotation);

    if (this.heldVisual) {
      const bounds = this.heldVisual.target.getLocalBounds();
      this.heldVisual.target.pivot.y =
        bounds.y + bounds.height * layout.anchor.y;
      this.heldVisual.target.position.set(layout.position.x, layout.position.y);
      this.addChild(this.heldVisual.target);
      this.visible = true;
    } else {
      this.visible = false;
    }
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
    });
    // Return just the body container (like DecorVisual returns just the sprite)
    // to avoid features like dirt patches affecting bounds calculation
    return {
      target: plantVisual.bodyVisual.container,
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
      target: decorVisual.sprite,
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
    if (!tileData) return null;

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
      this.bobbingPhaseOffset
    );
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
