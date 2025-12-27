import { friendBonusMultiplier } from '../constants';
import { faunaSpeciesDex } from '../systems/fauna';
import { floraSpeciesDex } from '../systems/flora/floraSpeciesDex';
import { mutationsDex } from '../systems/mutation';
import {
  CropInventoryItem,
  PetInventoryItem,
} from '../user-json-schema/current';
import { getPetScale } from './pets';

export const getCropSellPrice = (item: CropInventoryItem): number => {
  const { baseSellPrice } = floraSpeciesDex[item.species].crop;
  const mutationMultiplier = calculateMutationsMultiplier(item);
  return Math.round(baseSellPrice * item.scale * mutationMultiplier);
};

export const getPetSellPrice = (item: PetInventoryItem): number => {
  const { maturitySellPrice } = faunaSpeciesDex[item.petSpecies];
  const mutationMultiplier = calculateMutationsMultiplier(item);
  const scale = getPetScale({
    speciesId: item.petSpecies,
    xp: item.xp,
    targetScale: item.targetScale,
  });
  return Math.round(maturitySellPrice * scale * mutationMultiplier);
};

/**
 * Calculates the friend bonus multiplier for farming operations.
 * The multiplier starts at 1.0 and increases by 0.1 for each friend,
 * up to a maximum of 2.0 (achieved with 10 or more friends).
 *
 * @param numFriends - The number of friends helping. Must be non-negative.
 *                     Fractional values will be floored to the nearest integer.
 * @returns A multiplier between 1.0 and 2.0 (inclusive)
 */
export const calculateFriendBonusMultiplier = (numFriends: number): number => {
  // Ensure numFriends is a non-negative integer
  const validFriendCount = Math.max(0, Math.floor(numFriends));

  const baseMultiplier = 1;
  const friendBonus = validFriendCount * friendBonusMultiplier;
  const totalMultiplier = baseMultiplier + friendBonus;
  const maxMultiplier = 2;

  // Clamp between base and max multiplier
  return Math.min(totalMultiplier, maxMultiplier);
};

export const calculateMutationsMultiplier = (
  item: CropInventoryItem | PetInventoryItem
) => {
  // https://growagarden.fandom.com/wiki/Mutations
  // Total Price = Fruit Constant × Mass² × Growth Mutation × (1 + ∑ Mutations − Number of Mutations)
  const { mutations } = item;

  const growthMutation = mutations.find(
    (mutation): mutation is 'Rainbow' | 'Gold' =>
      ['Rainbow', 'Gold'].includes(mutation)
  );

  const environmentMutations = mutations.filter(
    (mutation) => !['Rainbow', 'Gold'].includes(mutation)
  );

  const growthMutationMultiplier = growthMutation
    ? mutationsDex[growthMutation].coinMultiplier
    : 1;

  const environmentMutationMultiplier = environmentMutations.reduce(
    (acc, mutation) => {
      return acc + mutationsDex[mutation].coinMultiplier;
    },
    0
  );

  const numEnvironmentMutations = environmentMutations.length;

  return (
    growthMutationMultiplier *
    (1 + environmentMutationMultiplier - numEnvironmentMutations)
  );
};
