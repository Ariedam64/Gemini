import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';

/**
 * Determines whether the avatar should display the "holding" pose animation
 * based on the currently selected inventory item.
 *
 * @param selectedItem - The currently selected inventory item, or null
 * @returns true if the avatar should be in holding pose
 */
export function getIsHoldingAnimationActive(
  selectedItem: InventoryItem | null
): boolean {
  if (!selectedItem) {
    return false;
  }
  return (
    selectedItem.itemType === ItemType.Plant ||
    selectedItem.itemType === ItemType.Produce ||
    selectedItem.itemType === ItemType.Pet ||
    selectedItem.itemType === ItemType.Decor
  );
}
