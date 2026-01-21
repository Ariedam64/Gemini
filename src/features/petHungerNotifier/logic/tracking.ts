/**
 * Pet Hunger Notifier - Tracking Logic
 *
 * Detects when active pets fall below hunger threshold and triggers notifications
 */

import { getMyPets } from '../../../globals/variables/myPets';
import { MGAudio } from '../../../modules';
import type { NotificationConfig } from '../../../modules/audio/customSounds/types';
import { getThreshold } from '../state';
import type { Unsubscribe } from '../../../globals/core/types';

let unsubscribe: Unsubscribe | null = null;
const notifiedPets = new Set<string>(); // Track which pets we already notified for
let isLooping = false;
let loopSoundSource: string | null = null;

function startLoop(config: NotificationConfig): void {
  if (isLooping) return;

  const sound = MGAudio.CustomSounds.getById(config.soundId);
  if (!sound) return;

  loopSoundSource = sound.source;
  isLooping = true;

  try {
    MGAudio.CustomSounds.play(config.soundId, {
      volume: config.volume / 100,
      loop: true,
    });
  } catch {
    isLooping = false;
    loopSoundSource = null;
  }
}

function stopLoop(): void {
  if (!isLooping) return;

  try {
    const handle = MGAudio.getCustomHandle();
    if (!loopSoundSource || (handle && handle.url === loopSoundSource)) {
      MGAudio.CustomSounds.stop();
    }
  } catch {
    // Ignore if audio isn't ready
  }

  isLooping = false;
  loopSoundSource = null;
}

function syncLoop(shouldLoop: boolean, config: NotificationConfig): void {
  if (config.mode !== 'loop') {
    if (isLooping) {
      stopLoop();
    }
    return;
  }

  if (shouldLoop) {
    if (!isLooping) {
      startLoop(config);
    }
  } else if (isLooping) {
    stopLoop();
  }
}

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
    const config = MGAudio.CustomSounds.getNotificationConfig('pet');
    const isLoopMode = config.mode === 'loop';
    let shouldLoop = false;

    for (const pet of activePets) {
      // Check if hunger is below threshold
      if (pet.hungerPercent < threshold) {
        shouldLoop = true;

        // Only notify once per pet until hunger goes back up
        if (!notifiedPets.has(pet.id)) {
          console.log('[PetHungerNotifier] Pet hunger low:', {
            name: pet.name || pet.petSpecies,
            species: pet.petSpecies,
            hungerPercent: pet.hungerPercent.toFixed(2) + '%',
          });

          // Play notification sound
          if (!isLoopMode) {
            playNotificationSound(config);
          }

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

    syncLoop(shouldLoop, config);
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
    stopLoop();
    console.log('[PetHungerNotifier] Tracking stopped');
  }
}

/**
 * Play notification sound
 */
function playNotificationSound(config: NotificationConfig): void {
  try {
    MGAudio.CustomSounds.play(config.soundId, { volume: config.volume / 100 });
  } catch (error) {
    console.warn('[PetHungerNotifier] Failed to play notification sound:', error);
  }
}
