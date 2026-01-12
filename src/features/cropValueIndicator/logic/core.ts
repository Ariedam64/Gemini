/**
 * Crop Value Indicator - Core Logic
 * Handles subscription to plant info and logging
 */

import { getCurrentTile } from '../../../globals/variables/currentTile';
import type { Unsubscribe, PlantInfoChange } from '../../../globals/core/types';
import { calculateCropSellPrice } from '../../../modules/calculators/logic/crop';

let unsubscribe: Unsubscribe | null = null;

/**
 * Handle plant info change event
 */
function handlePlantInfoChange(event: PlantInfoChange): void {
  const { current, previous } = event;

  if (!current) {
    console.log('[CropValueIndicator] No plant on current tile');
    return;
  }

  const currentSlot = current.currentSlotIndex !== null ? current.slots[current.currentSlotIndex] : null;

  // Calculate crop value if slot exists
  let cropValue = 0;
  if (currentSlot) {
    cropValue = calculateCropSellPrice(
      currentSlot.species,
      currentSlot.targetScale,
      currentSlot.mutations || []
    );
  }

  console.log('[CropValueIndicator] Plant Info:', {
    species: current.species,
    currentSlotIndex: current.currentSlotIndex,
    sortedSlotIndices: current.sortedSlotIndices,
    nextHarvestSlotIndex: current.nextHarvestSlotIndex,
    totalSlots: current.slots.length,
    currentSlot,
    cropValue: cropValue > 0 ? `${cropValue} coins` : 'N/A',
  });
}

/**
 * Start monitoring plant info changes
 */
export function startMonitoring(): void {
  if (unsubscribe) {
    console.warn('[CropValueIndicator] Already monitoring, cleaning up previous subscription');
    stopMonitoring();
  }

  console.log('[CropValueIndicator] Starting plant info monitoring...');

  const currentTile = getCurrentTile();
  unsubscribe = currentTile.subscribePlantInfo(handlePlantInfoChange, { immediate: true });

  console.log('[CropValueIndicator] Monitoring started');
}

/**
 * Stop monitoring plant info changes
 */
export function stopMonitoring(): void {
  if (!unsubscribe) return;

  console.log('[CropValueIndicator] Stopping monitoring...');

  unsubscribe();
  unsubscribe = null;
  console.log('[CropValueIndicator] Monitoring stopped');
}

/**
 * Check if currently monitoring
 */
export function isMonitoring(): boolean {
  return unsubscribe !== null;
}
