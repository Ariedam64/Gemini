import type { SfxName } from '@/audio/types';
import { playSfx } from '@/audio/useQuinoaAudio';
import type { FaunaSpeciesId } from '@/common/games/Quinoa/systems/fauna';

// =============================================================================
// PET SOUND EFFECTS
// =============================================================================

const petToSoundEffect = (species: FaunaSpeciesId): SfxName | null => {
  const petSoundMap: Record<FaunaSpeciesId, SfxName> = {
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
    Dragonfly: 'Pet_Dragonfly',
    Turkey: 'Pet_Turkey',
    Peacock: 'Pet_Peacock',
    SnowFox: 'Pet_SnowFox',
    Stoat: 'Pet_Stoat',
    WhiteCaribou: 'Pet_WhiteCaribou',
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
