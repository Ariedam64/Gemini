/**
 * Pet Hunger Notifier - Tracking Logic
 *
 * Detects when active pets fall below hunger threshold and triggers notifications
 */

import { getMyPets } from '../../../globals/variables/myPets';
import { MGAudio } from '../../../modules';
import { getThreshold } from '../state';
import type { Unsubscribe } from '../../../globals/core/types';

let unsubscribe: Unsubscribe | null = null;
const notifiedPets = new Set<string>(); // Track which pets we already notified for

/**
 * Initialize pet hunger tracking
 */
export function initTracking(): void {
  if (unsubscribe) {
    console.log('[PetHungerNotifier] Already tracking');
    return;
  }

  const myPets = getMyPets();
  const threshold = getThreshold();

  console.log('[PetHungerNotifier] Starting tracking, threshold:', threshold + '%');

  // Subscribe to myPets changes
  unsubscribe = myPets.subscribe((data) => {
    const activePets = data.byLocation.active;

    for (const pet of activePets) {
      // Check if hunger is below threshold
      if (pet.hungerPercent < threshold) {
        // Only notify once per pet until hunger goes back up
        if (!notifiedPets.has(pet.id)) {
          console.log('[PetHungerNotifier] Pet hunger low:', {
            name: pet.name || pet.petSpecies,
            species: pet.petSpecies,
            hungerPercent: pet.hungerPercent.toFixed(2) + '%',
          });

          // Play notification sound
          playNotificationSound();

          // Emit custom event for UI updates
          const notificationEvent = new CustomEvent('gemini:pet-hunger-low', {
            detail: { pet },
          });
          window.dispatchEvent(notificationEvent);

          // Mark as notified
          notifiedPets.add(pet.id);
        }
      } else {
        // Reset notification if hunger goes back up above threshold
        notifiedPets.delete(pet.id);
      }
    }
  });

  console.log('[PetHungerNotifier] Tracking initialized');
}

/**
 * Stop pet hunger tracking
 */
export function stopTracking(): void {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
    notifiedPets.clear();
    console.log('[PetHungerNotifier] Tracking stopped');
  }
}

/**
 * Play notification sound
 */
function playNotificationSound(): void {
  try {
    MGAudio.CustomSounds.play('default-notification');
  } catch (error) {
    console.warn('[PetHungerNotifier] Failed to play notification sound:', error);
  }
}
