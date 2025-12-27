import {
  type FaunaAbilityId,
  type FaunaSpeciesId,
  faunaSpeciesDex,
} from '../systems/fauna';
import type { MutationId } from '../systems/mutation';
import type { GrowSlot, PetSlot } from '../user-json-schema/current';

export const petSlotsLimit = 3;

/**
 * Maximum visible-character length (in Unicode *grapheme clusters*) for a pet name.
 *
 * A grapheme cluster corresponds to what users perceive as a single character –
 * for example the complex emoji 👩‍👩‍👧‍👦 counts as **one**, even though its
 * JavaScript `.length` is 11 UTF-16 code units.
 *
 * All name-related validation and truncation now uses `Intl.Segmenter` so this
 * constant is defined in clusters rather than raw string length. If you need
 * to compare against `.length`, be aware it may be larger than
 * `petNameMaxLength`.
 */
export const petNameMaxGraphemeClusters = 12;
export const xpPerAge = 3600;
export const xpPerHour = 3600;
export const agePerHour = xpPerHour / xpPerAge;
// The target strength at targetScale = 1.0
const baseTargetStrength = 80;
// The target strength at targetScale = maxScale
export const maxTargetStrength = 100;
// The strength gained from birth to maturity
// e.g., if a pet has a target strength of 80, their starting strength is 50
// Note that strengthGainedFromBirthToMaturity should ALWAYS be larger than
// base strength, or else the starting strength of a pet could be negative.
const strengthGainedFromBirthToMaturity = 30;

export function getTargetStrength(
  speciesId: FaunaSpeciesId,
  targetScale: number
): number {
  const { maxScale } = faunaSpeciesDex[speciesId];

  if (targetScale <= 1) {
    return baseTargetStrength;
  }
  if (targetScale >= maxScale) {
    return maxTargetStrength;
  }
  // Linearly interpolate between baseTargetStrength at scale 1 and maxTargetStrength at maxScale
  const scaleProgress = (targetScale - 1) / (maxScale - 1);
  const targetStrength =
    baseTargetStrength +
    (maxTargetStrength - baseTargetStrength) * scaleProgress;

  return Math.floor(targetStrength);
}

export function getTargetScale({
  speciesId,
  targetStrength,
}: {
  speciesId: FaunaSpeciesId;
  targetStrength: number;
}): number {
  const { maxScale } = faunaSpeciesDex[speciesId];

  if (targetStrength <= baseTargetStrength) {
    return 1.0;
  }
  if (targetStrength >= maxTargetStrength) {
    return maxScale;
  }
  // Reverse the linear interpolation formula:
  // targetStrength = baseTargetStrength + (maxTargetStrength - baseTargetStrength) * scaleProgress
  // where scaleProgress = (targetScale - 1) / (maxScale - 1)
  // Solving for targetScale:
  const strengthProgress =
    (targetStrength - baseTargetStrength) /
    (maxTargetStrength - baseTargetStrength);
  const targetScale = 1 + strengthProgress * (maxScale - 1);

  return targetScale;
}

export function getStartingStrength(
  speciesId: FaunaSpeciesId,
  targetScale: number
): number {
  const targetStrength = getTargetStrength(speciesId, targetScale);
  return targetStrength - strengthGainedFromBirthToMaturity;
}

const getStrengthGainedPerHour = (speciesId: FaunaSpeciesId): number => {
  const { hoursToMature } = faunaSpeciesDex[speciesId];
  return strengthGainedFromBirthToMaturity / hoursToMature;
};

export function getStrength({
  speciesId,
  xp,
  targetScale,
}: {
  speciesId: FaunaSpeciesId;
  xp: number;
  targetScale: number;
}): number {
  const hoursGrown = xp / xpPerHour;
  const strengthGainedPerHour = getStrengthGainedPerHour(speciesId);
  // Cannot gain strength beyond maturity
  const strengthGained = Math.min(
    strengthGainedPerHour * hoursGrown,
    strengthGainedFromBirthToMaturity
  );
  const startingStrength = getStartingStrength(speciesId, targetScale);
  const currentStrength = startingStrength + strengthGained;
  // Get discrete jumps in strength for xp gained
  return Math.floor(currentStrength);
}

export function getStrengthScaleFactor({
  speciesId,
  xp,
  targetScale,
}: {
  speciesId: FaunaSpeciesId;
  xp: number;
  targetScale: number;
}): number {
  const strength = getStrength({ speciesId, xp, targetScale });
  return strength / maxTargetStrength;
}
export function getXPForStrength({
  strength,
  speciesId,
  targetScale,
}: {
  strength: number;
  speciesId: FaunaSpeciesId;
  targetScale: number;
}): number {
  const startingStrength = getStartingStrength(speciesId, targetScale);
  const strengthGained = strength - startingStrength;
  if (strengthGained <= 0) {
    return 0;
  }
  const strengthGainedPerHour = getStrengthGainedPerHour(speciesId);
  const hoursGrown = strengthGained / strengthGainedPerHour;
  const xp = hoursGrown * xpPerHour;

  return xp;
}

export function getPetScale({
  speciesId,
  xp,
  targetScale,
}: {
  speciesId: FaunaSpeciesId;
  xp: number;
  targetScale: number;
}): number {
  const strength = getStrength({ speciesId, xp, targetScale });
  const targetStrength = getTargetStrength(speciesId, targetScale);
  const progress = strength / targetStrength;
  return progress * targetScale;
}

export function getAge(xp: number): number {
  return xp / xpPerAge;
}

export function getXPForAge(age: number): number {
  return age * xpPerAge;
}

export function getIsPetSlotsFull(petSlots: PetSlot[]): boolean {
  return petSlots.length >= petSlotsLimit;
}

export type PetAbilityToastData = {
  CoinFinderI: { coinsFound: number };
  CoinFinderII: { coinsFound: number };
  CoinFinderIII: { coinsFound: number };
  SeedFinderI: { seedName: string };
  SeedFinderII: { seedName: string };
  SeedFinderIII: { seedName: string };
  SeedFinderIV: { seedName: string };
  HungerRestore: { petName: string; hungerRestoreAmount: number };
  HungerRestoreII: { petName: string; hungerRestoreAmount: number };
  DoubleHarvest: { cropName: string };
  DoubleHatch: { petName: string };
  ProduceEater: { cropName: string; sellPrice: number };
  PetHatchSizeBoost: { petName: string; strengthIncrease: number };
  PetHatchSizeBoostII: { petName: string; strengthIncrease: number };
  PetAgeBoost: { petName: string; bonusXp: number };
  PetAgeBoostII: { petName: string; bonusXp: number };
  PetRefund: { eggName: string };
  PetRefundII: { eggName: string };
  ProduceRefund: { numCropsRefunded: number };
  SellBoostI: { bonusCoins: number };
  SellBoostII: { bonusCoins: number };
  SellBoostIII: { bonusCoins: number };
  SellBoostIV: { bonusCoins: number };
  GoldGranter: { growSlot: GrowSlot };
  RainbowGranter: { growSlot: GrowSlot };
  RainDance: { growSlot: GrowSlot };
  PetXpBoost: { bonusXp: number };
  PetXpBoostII: { bonusXp: number };
  EggGrowthBoost: { minutesReduced: number };
  EggGrowthBoostII_NEW: { minutesReduced: number };
  EggGrowthBoostII: { minutesReduced: number };
  PlantGrowthBoost: { minutesReduced: number };
  PlantGrowthBoostII: { minutesReduced: number };
  ProduceScaleBoost: { scaleIncreasePercentage: number };
  ProduceScaleBoostII: { scaleIncreasePercentage: number };
  ProduceMutationBoost: {};
  ProduceMutationBoostII: {};
  PetMutationBoost: {};
  PetMutationBoostII: {};
  Copycat: {};
  HungerBoost: {};
  HungerBoostII: {};
};

export type PetAbilityTriggerData = {
  [K in FaunaAbilityId]: {
    abilityId: K;
    data: PetAbilityToastData[K];
    performedAt: number;
  };
}[FaunaAbilityId];

export function createPetAbilityTriggerData<T extends FaunaAbilityId>(
  abilityId: T,
  data: PetAbilityToastData[T]
): {
  abilityId: T;
  data: PetAbilityToastData[T];
  performedAt: number;
} {
  return {
    abilityId,
    data,
    performedAt: Date.now(),
  };
}

export function generateAbilitiesForPet(
  speciesId: FaunaSpeciesId,
  mutations: MutationId[]
): FaunaAbilityId[] {
  const { innateAbilityWeights } = faunaSpeciesDex[speciesId];

  const innateAbilities = Object.keys(innateAbilityWeights) as FaunaAbilityId[];
  const numInnateAbilities = innateAbilities.length;

  let numAbilitiesToSelect: number;
  if (numInnateAbilities === 0) {
    numAbilitiesToSelect = 0;
  } else if (numInnateAbilities === 1) {
    numAbilitiesToSelect = 1;
  } else if (numInnateAbilities === 2) {
    const probabilityOfOne = 0.9;
    numAbilitiesToSelect = Math.random() < probabilityOfOne ? 1 : 2;
  } else if (numInnateAbilities === 3) {
    const probabilityOfOne = 0.7;
    const probabilityOfTwo = 0.29;
    const rand = Math.random();
    if (rand < probabilityOfOne) {
      numAbilitiesToSelect = 1;
    } else if (rand < probabilityOfOne + probabilityOfTwo) {
      numAbilitiesToSelect = 2;
    } else {
      numAbilitiesToSelect = 3;
    }
  } else {
    const probabilityOfTwo = 0.99;
    numAbilitiesToSelect = Math.random() < probabilityOfTwo ? 2 : 3;
  }
  // Select abilities based on weights
  const selectedAbilities: FaunaAbilityId[] = [];
  const availableAbilities = [...innateAbilities];
  const availableWeights = Object.values(innateAbilityWeights);

  for (let i = 0; i < numAbilitiesToSelect; i++) {
    const totalWeight = availableWeights.reduce(
      (sum, weight) => sum + weight,
      0
    );
    const random = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    let selectedIndex = 0;

    for (let j = 0; j < availableWeights.length; j++) {
      cumulativeWeight += availableWeights[j];
      if (random <= cumulativeWeight) {
        selectedIndex = j;
        break;
      }
    }
    // Add selected ability and remove from pool
    selectedAbilities.push(availableAbilities[selectedIndex]);
    availableAbilities.splice(selectedIndex, 1);
    availableWeights.splice(selectedIndex, 1);
  }
  // Add mutation abilities (these are bonus abilities)
  if (mutations.includes('Gold')) {
    selectedAbilities.push('GoldGranter');
  }
  if (mutations.includes('Rainbow')) {
    selectedAbilities.push('RainbowGranter');
  }
  return selectedAbilities;
}
