import { isMusicDisabledDueToMemoryPressure } from '@/audio/legacy/audio';
import { playMusic } from '@/audio/legacy/music/music';
import type { SfxName } from '@/audio/types';
import { playSfx } from '@/audio/useQuinoaAudio';
import type { FaunaSpeciesId } from '@/common/games/Quinoa/systems/fauna';
import { WeatherId } from '@/common/games/Quinoa/systems/weather';

// =============================================================================
// PET SOUND EFFECTS
// =============================================================================

const petToSoundEffect = (species: FaunaSpeciesId): SfxName | null => {
  const petSoundMap: Partial<Record<FaunaSpeciesId, SfxName>> = {
    Bee: 'Pet_Bee',
    Bunny: 'Pet_Rabbit',
    Capybara: 'Pet_Capybara',
    Chicken: 'Pet_Chicken',
    Cow: 'Pet_Cow',
    Goat: 'Pet_Goat',
    Pig: 'Pet_Pig',
    Snail: 'Pet_Snail',
    Squirrel: 'Pet_Squirrel',
    Turtle: 'Pet_Turtle',
    Worm: 'Pet_Worm',
    Butterfly: 'Pet_Butterfly',
  };

  return petSoundMap[species] || null;
};

/**
 * Play sound effects for pet abilities
 * Plays the species-specific pet sound and the general effect active sound
 */
export const playPetSoundEffect = (species: FaunaSpeciesId) => {
  const petSoundEffect = petToSoundEffect(species);
  if (petSoundEffect) {
    playSfx(petSoundEffect);
  }
};
