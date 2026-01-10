import {
  type FaunaAbilityId,
  type FaunaSpeciesId,
  faunaAbilityIds,
  faunaSpeciesDex,
} from '../systems/fauna';
import type { FloraSpeciesId } from '../systems/flora';
import { floraSpeciesDex } from '../systems/flora/floraSpeciesDex';
import { ItemType } from '../systems/inventory';
import {
  cropJournalVariants,
  type JournalVariant,
  petJournalVariants,
} from '../systems/journal';
import type { MutationId } from '../systems/mutation';
import type {
  CropInventoryItem,
  InventoryItem,
  Journal,
  PetInventoryItem,
} from '../user-json-schema/current';

/**
 * Gets new mutation variants that haven't been logged yet
 */
function getNewMutationVariants(
  mutations: MutationId[],
  loggedVariants: JournalVariant[]
): JournalVariant[] {
  return mutations.filter((mutation) => !loggedVariants.includes(mutation));
}

/**
 * Checks if Normal variant should be added (when item has no mutations and Normal not logged)
 */
function getIsNewNormalVariant(
  mutations: MutationId[],
  loggedVariants: JournalVariant[]
): boolean {
  return mutations.length === 0 && !loggedVariants.includes('Normal');
}

/**
 * Checks if Max variant should be added (when item reaches max scale and Max not logged)
 */
function getIsNewMaxVariant(
  currentScale: number,
  maxScale: number,
  loggedVariants: JournalVariant[]
): boolean {
  return currentScale >= maxScale && !loggedVariants.includes('Max Weight');
}

export function getHasNewVariant({
  mutations,
  currentScale,
  maxScale,
  loggedVariants,
}: {
  mutations: MutationId[];
  currentScale: number;
  maxScale: number;
  loggedVariants: JournalVariant[];
}): boolean {
  const newMutationVariants = getNewMutationVariants(mutations, loggedVariants);
  const isNewNormalVariant = getIsNewNormalVariant(mutations, loggedVariants);
  const isNewMaxVariant = getIsNewMaxVariant(
    currentScale,
    maxScale,
    loggedVariants
  );
  return (
    newMutationVariants.length > 0 || isNewNormalVariant || isNewMaxVariant
  );
}

/**
 * Sorts variants according to the provided order for consistent animations
 */
function sortVariants({
  variants,
  sortOrder,
}: {
  variants: JournalVariant[];
  sortOrder: readonly JournalVariant[];
}): JournalVariant[] {
  const copy = [...variants];
  copy.sort((a, b) => {
    const indexA = sortOrder.indexOf(a);
    const indexB = sortOrder.indexOf(b);
    return indexA - indexB;
  });
  return copy;
}

/**
 * Processes crop items to find new journal variants
 */
function getNewCropVariants(
  items: CropInventoryItem[],
  journal: Journal
): Partial<Record<FloraSpeciesId, JournalVariant[]>> {
  const newVariants: Partial<Record<FloraSpeciesId, JournalVariant[]>> = {};
  // Sort crop items by schema order first
  const speciesOrder = Object.keys(floraSpeciesDex);
  items.sort((a, b) => {
    const indexA = speciesOrder.indexOf(a.species);
    const indexB = speciesOrder.indexOf(b.species);
    return indexA - indexB;
  });
  // Group items by species to handle multiple items of the same species
  const itemsBySpecies = new Map<FloraSpeciesId, typeof items>();
  for (const item of items) {
    const existing = itemsBySpecies.get(item.species) || [];
    existing.push(item);
    itemsBySpecies.set(item.species, existing);
  }
  // Process each species group
  for (const [speciesId, speciesItems] of itemsBySpecies) {
    const loggedVariants =
      journal.produce[speciesId]?.variantsLogged.map(
        (entry) => entry.variant
      ) ?? [];
    const variantsToAdd = new Set<JournalVariant>();
    // Process all items of this species
    for (const item of speciesItems) {
      // Add new mutation variants
      const newMutationVariants = getNewMutationVariants(
        item.mutations,
        loggedVariants
      );
      newMutationVariants.forEach((variant) => variantsToAdd.add(variant));
      // Add Normal variant if applicable
      if (getIsNewNormalVariant(item.mutations, loggedVariants)) {
        variantsToAdd.add('Normal');
      }
      // Add Max variant if applicable
      const { maxScale } = floraSpeciesDex[speciesId].crop;
      if (getIsNewMaxVariant(item.scale, maxScale, loggedVariants)) {
        variantsToAdd.add('Max Weight');
      }
    }
    // Convert Set to sorted array
    const variants = Array.from(variantsToAdd);
    if (variants.length > 0) {
      newVariants[speciesId] = sortVariants({
        variants,
        sortOrder: cropJournalVariants,
      });
    }
  }
  return newVariants;
}

/**
 * Processes pet items to find new journal variants
 */
function getNewPetVariants(
  items: PetInventoryItem[],
  journal: Journal
): Partial<Record<FaunaSpeciesId, JournalVariant[]>> {
  const newVariants: Partial<Record<FaunaSpeciesId, JournalVariant[]>> = {};
  // Sort pet items by schema order first
  const speciesOrder = Object.keys(faunaSpeciesDex);
  items.sort((a, b) => {
    const indexA = speciesOrder.indexOf(a.petSpecies);
    const indexB = speciesOrder.indexOf(b.petSpecies);
    return indexA - indexB;
  });
  // Group items by pet species to handle multiple items of the same species
  const itemsBySpecies = new Map<FaunaSpeciesId, typeof items>();
  for (const item of items) {
    const existing = itemsBySpecies.get(item.petSpecies) || [];
    existing.push(item);
    itemsBySpecies.set(item.petSpecies, existing);
  }
  // Process each pet species group
  for (const [speciesId, speciesItems] of itemsBySpecies) {
    const loggedVariants =
      journal.pets[speciesId]?.variantsLogged.map((entry) => entry.variant) ??
      [];
    const variantsToAdd = new Set<JournalVariant>();
    // Process all items of this pet species
    for (const item of speciesItems) {
      // Add new mutation variants
      const newMutationVariants = getNewMutationVariants(
        item.mutations,
        loggedVariants
      );
      newMutationVariants.forEach((variant) => variantsToAdd.add(variant));
      // Add Normal variant if applicable
      if (getIsNewNormalVariant(item.mutations, loggedVariants)) {
        variantsToAdd.add('Normal');
      }
      // Add Max variant if applicable
      const { maxScale } = faunaSpeciesDex[speciesId];
      if (getIsNewMaxVariant(item.targetScale, maxScale, loggedVariants)) {
        variantsToAdd.add('Max Weight');
      }
    }
    // Convert Set to sorted array
    const variants = Array.from(variantsToAdd);
    if (variants.length > 0) {
      newVariants[speciesId] = sortVariants({
        variants,
        sortOrder: petJournalVariants,
      });
    }
  }
  return newVariants;
}

function sortAbilities(
  abilities: FaunaAbilityId[],
  sortOrder: readonly FaunaAbilityId[]
): FaunaAbilityId[] {
  const copy = [...abilities];
  copy.sort((a, b) => {
    const indexA = sortOrder.indexOf(a);
    const indexB = sortOrder.indexOf(b);
    return indexA - indexB;
  });
  return copy;
}

function getNewPetAbilities(
  items: PetInventoryItem[],
  journal: Journal
): Partial<Record<FaunaSpeciesId, FaunaAbilityId[]>> {
  const newAbilities: Partial<Record<FaunaSpeciesId, FaunaAbilityId[]>> = {};
  // Sort pet items by schema order first
  const speciesOrder = Object.keys(faunaSpeciesDex);
  items.sort((a, b) => {
    const indexA = speciesOrder.indexOf(a.petSpecies);
    const indexB = speciesOrder.indexOf(b.petSpecies);
    return indexA - indexB;
  });
  // Group items by pet species to handle multiple items of the same species
  const itemsBySpecies = new Map<FaunaSpeciesId, typeof items>();
  for (const item of items) {
    const existing = itemsBySpecies.get(item.petSpecies) || [];
    existing.push(item);
    itemsBySpecies.set(item.petSpecies, existing);
  }
  // Process each pet species group
  for (const [speciesId, speciesItems] of itemsBySpecies) {
    const loggedAbilities =
      journal.pets[speciesId]?.abilitiesLogged.map((entry) => entry.ability) ??
      [];
    const abilitiesToAdd = new Set<FaunaAbilityId>();
    // Process all items of this pet species
    for (const item of speciesItems) {
      const newAbilities = item.abilities.filter(
        (ability) => !loggedAbilities.includes(ability)
      );
      newAbilities.forEach((ability) => abilitiesToAdd.add(ability));
    }
    // Convert Set to sorted array
    const abilities = Array.from(abilitiesToAdd);
    if (abilities.length > 0) {
      newAbilities[speciesId] = sortAbilities(abilities, faunaAbilityIds);
    }
  }
  return newAbilities;
}

/**
 * Determines if logging an item would result in new journal variants being discovered.
 * This simulates the server-side logic for what variants would be added to the journal.
 */
export function getNewLogs(
  items: InventoryItem[],
  journal: Journal,
  currentTime: number
): {
  allNewCropVariants: Partial<Record<FloraSpeciesId, JournalVariant[]>>;
  newCropVariantsFromSelling: Partial<Record<FloraSpeciesId, JournalVariant[]>>;
  newPetVariants: Partial<Record<FaunaSpeciesId, JournalVariant[]>>;
  newPetAbilities: Partial<Record<FaunaSpeciesId, FaunaAbilityId[]>>;
} {
  const plantItems = items.filter((item) => item.itemType === ItemType.Plant);
  const matureCropsOnPlants: CropInventoryItem[] = plantItems.flatMap((plant) =>
    plant.slots
      // Only consider slots that have matured
      .filter((slot) => slot.endTime <= currentTime)
      .map((slot) => ({
        ...slot,
        id: crypto.randomUUID(),
        itemType: ItemType.Produce,
        scale: slot.targetScale,
      }))
  );
  const cropItemsInInventory = items.filter(
    (item) => item.itemType === ItemType.Produce
  );
  const allLoggableCrops = [...matureCropsOnPlants, ...cropItemsInInventory];

  const petItems = items.filter((item) => item.itemType === ItemType.Pet);

  return {
    allNewCropVariants: getNewCropVariants(allLoggableCrops, journal),
    newCropVariantsFromSelling: getNewCropVariants(
      cropItemsInInventory,
      journal
    ),
    newPetVariants: getNewPetVariants(petItems, journal),
    newPetAbilities: getNewPetAbilities(petItems, journal),
  };
}
