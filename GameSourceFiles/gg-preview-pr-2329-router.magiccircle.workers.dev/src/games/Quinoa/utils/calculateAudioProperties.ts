import type { GridPosition } from '@/common/games/Quinoa/world/map';

export function calculateAudioProperties(
  listenerPos: GridPosition,
  emitterPos: GridPosition,
  maxDistance: number
) {
  const dx = emitterPos.x - listenerPos.x;
  const dy = emitterPos.y - listenerPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Volume falloff
  const volume = 1 - Math.min(distance / maxDistance, 1);
  const scaledVolume = volume * volume; // Squared curve for falloff

  // Stereo panning
  const pan = Math.max(-1, Math.min(1, dx / (maxDistance / 2)));

  return { volume: scaledVolume, stereo: pan };
}
