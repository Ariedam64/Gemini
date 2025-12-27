import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import { TILE_SIZE_WORLD } from '../../sprite-utils';

export interface HeldItemLayout {
  position: { x: number; y: number };
  anchor: { x: number; y: number };
}

// Define the 3 distinct layout styles
const ABOVE_HEAD = {
  position: { x: 0, y: -0.25 },
  anchor: { x: 0.5, y: 1 },
};

const IN_FRONT = {
  position: { x: 0, y: 0.2 },
  anchor: { x: 0.5, y: 0 },
};

const TOOL_RIGHT = {
  position: { x: 0.3, y: 0.2 },
  anchor: { x: 0.5, y: 0 },
};

const LAYOUTS: Record<ItemType, typeof ABOVE_HEAD> = {
  [ItemType.Produce]: ABOVE_HEAD,
  [ItemType.Pet]: ABOVE_HEAD,
  [ItemType.Decor]: ABOVE_HEAD,
  [ItemType.Plant]: ABOVE_HEAD,
  [ItemType.Tool]: TOOL_RIGHT,
  [ItemType.Seed]: IN_FRONT,
  [ItemType.Egg]: IN_FRONT,
};

/**
 * Returns the full layout configuration for a specific inventory item.
 */
export function getHeldItemLayout(item: InventoryItem): HeldItemLayout {
  const layout = LAYOUTS[item.itemType];
  return {
    position: {
      x: layout.position.x * TILE_SIZE_WORLD,
      y: layout.position.y * TILE_SIZE_WORLD,
    },
    anchor: layout.anchor,
  };
}
