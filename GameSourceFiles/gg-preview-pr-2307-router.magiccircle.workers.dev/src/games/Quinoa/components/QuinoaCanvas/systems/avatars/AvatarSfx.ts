import type { SfxName } from '@/audio/types';
import { playSfx } from '@/audio/useQuinoaAudio';
import type { GridPosition } from '@/common/games/Quinoa/world/map';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';

/**
 * Maps trigger animations to their corresponding sound effects.
 * Sound effects are played with spatial audio (pan/volume based on distance).
 */
const ANIMATION_SFX_MAP: Partial<Record<AvatarTriggerAnimationName, SfxName>> =
  {
    [AvatarTriggerAnimationName.Walk]: 'Footstep',
    [AvatarTriggerAnimationName.Harvest]: 'Harvest',
    [AvatarTriggerAnimationName.Water]: 'PlantSeed',
    [AvatarTriggerAnimationName.WaterGold]: 'WateringCan_Speedup',
    [AvatarTriggerAnimationName.PotPlant]: 'Destroy_Object',
    [AvatarTriggerAnimationName.Dig]: 'Destroy_Object',
    [AvatarTriggerAnimationName.DropObject]: 'Object_Drop',
    [AvatarTriggerAnimationName.PickupObject]: 'Object_PickUp',
    [AvatarTriggerAnimationName.JoinGame]: 'Player_Appears',
    [AvatarTriggerAnimationName.Teleport]: 'Player_Appears',
  };

/** Maximum tile distance for spatial audio falloff. */
const MAX_AUDIO_DISTANCE = 20;

/**
 * Plays the sound effect associated with an avatar animation using spatial audio.
 * Volume and stereo panning are calculated based on the avatar's distance from the
 * local player. Sounds beyond `MAX_AUDIO_DISTANCE` tiles are not played.
 *
 * @param animationName - The animation being triggered
 * @param avatarPosition - Grid position of the avatar performing the animation
 * @param localPlayerPosition - Grid position of the local player (listener)
 *
 * @example
 * ```typescript
 * playAnimationSfx(
 *   AvatarTriggerAnimationName.Harvest,
 *   { x: 10, y: 5 },
 *   { x: 8, y: 5 }
 * );
 * ```
 */
export function playAnimationSfx(
  animationName: AvatarTriggerAnimationName,
  avatarPosition: GridPosition,
  localPlayerPosition: GridPosition
): void {
  const sfxName = ANIMATION_SFX_MAP[animationName];
  if (!sfxName) return;

  const dx = avatarPosition.x - localPlayerPosition.x;
  const dy = avatarPosition.y - localPlayerPosition.y;
  const pan = dx / MAX_AUDIO_DISTANCE;
  const volumeMultiplier =
    1 - Math.max(Math.abs(dx), Math.abs(dy)) / MAX_AUDIO_DISTANCE;

  if (volumeMultiplier > 0) {
    playSfx(sfxName, { pan, volumeMultiplier });
  }
}
