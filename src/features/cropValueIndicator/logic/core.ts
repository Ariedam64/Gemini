/**
 * Crop Value Indicator - Core Logic
 * Handles subscription to plant info and logging
 */

import { getCurrentTile } from '../../../globals/variables/currentTile';
import type { Unsubscribe, PlantInfoChange } from '../../../globals/core/types';
import { calculateCropSellPrice } from '../../../modules/calculators/logic/crop';

let unsubscribe: Unsubscribe | null = null;
let currentCropValue = 0;

/**
 * Get the current crop value for the active slot
 */
export function getCurrentCropValue(): number {
  return currentCropValue;
}

/**
 * Update crop value from currentTile.get().plant
 */
function updateCropValue(): void {
  const tile = getCurrentTile().get();
  const plant = tile.plant;

  if (!plant) {
    currentCropValue = 0;
    return;
  }

  const currentSlot = plant.currentSlotIndex !== null ? plant.slots[plant.currentSlotIndex] : null;

  if (!currentSlot) {
    currentCropValue = 0;
    return;
  }

  currentCropValue = calculateCropSellPrice(
    currentSlot.species,
    currentSlot.targetScale,
    currentSlot.mutations || []
  );
}

/**
 * Handle plant info change event
 */
function handlePlantInfoChange(event: PlantInfoChange): void {
  // Update the current crop value
  updateCropValue();
}

/**
 * Start monitoring plant info changes
 */
export function startMonitoring(): void {
  if (unsubscribe) {
    stopMonitoring();
  }

  // Initialize with current value
  updateCropValue();

  const currentTile = getCurrentTile();
  unsubscribe = currentTile.subscribePlantInfo(handlePlantInfoChange, { immediate: true });
}

/**
 * Stop monitoring plant info changes
 */
export function stopMonitoring(): void {
  if (!unsubscribe) return;

  unsubscribe();
  unsubscribe = null;
  currentCropValue = 0;
}

/**
 * Check if currently monitoring
 */
export function isMonitoring(): boolean {
  return unsubscribe !== null;
}
