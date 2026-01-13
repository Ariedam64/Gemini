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

  console.log(`[CropValueIndicator] Updated crop value: ${currentCropValue} coins`);
}

/**
 * Handle plant info change event
 */
function handlePlantInfoChange(event: PlantInfoChange): void {
  const { current } = event;

  // Update the current crop value
  updateCropValue();

  if (!current) {
    console.log('[CropValueIndicator] No plant on current tile');
    return;
  }

  const currentSlot = current.currentSlotIndex !== null ? current.slots[current.currentSlotIndex] : null;

  // Log crop value with detailed slot information
  if (currentSlot) {
    console.log(`[CropValueIndicator] 💰 Crop Price: ${currentCropValue} coins`, {
      species: current.species,
      slot: {
        index: current.currentSlotIndex,
        scale: currentSlot.targetScale,
        mutations: currentSlot.mutations || [],
      },
      plantInfo: {
        totalSlots: current.slots.length,
        sortedSlotIndices: current.sortedSlotIndices,
        nextHarvestSlotIndex: current.nextHarvestSlotIndex,
      },
    });
  } else {
    console.log('[CropValueIndicator] Plant Info:', {
      species: current.species,
      currentSlotIndex: current.currentSlotIndex,
      sortedSlotIndices: current.sortedSlotIndices,
      nextHarvestSlotIndex: current.nextHarvestSlotIndex,
      totalSlots: current.slots.length,
      currentSlot,
      cropValue: currentCropValue > 0 ? `${currentCropValue} coins` : 'N/A',
    });
  }
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

  // Initialize with current value
  updateCropValue();

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
  currentCropValue = 0;

  console.log('[CropValueIndicator] Monitoring stopped');
}

/**
 * Check if currently monitoring
 */
export function isMonitoring(): boolean {
  return unsubscribe !== null;
}
