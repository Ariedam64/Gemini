/**
 * Journal Hints - Hint Lookup Builder
 *
 * Builds hint text for crop variants, pet variants, and pet abilities.
 * Uses MGData and MGJournal for dynamic data (no hardcoded game data).
 */

import { MGData } from '../../../../modules/data';
import { MGJournal } from '../../../../features/journal';

export type SpeciesContext = {
  speciesId: string;
  speciesName: string;
};

export type HintLookup = {
  getCropHint: (variantId: string, context: SpeciesContext) => string;
  getPetVariantHint: (variantId: string, context: SpeciesContext) => string;
  getAbilityHint: (speciesId: string) => string;
};

const FALLBACK_HINT = 'Discover this variant by experimenting in the garden.';
const PET_VARIANT_HINT = 'Hatch and raise pets to discover this variant.';
const ABILITY_HINT = 'Hatch pets of this species to discover its abilities.';

function toTitle(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^\w/, c => c.toUpperCase());
}

export function getCropVariants(): string[] {
  return MGJournal.getCropVariants();
}

export function getPetVariants(): string[] {
  return MGJournal.getPetVariants();
}

function getMutationInfo(variantId: string): { hint?: string } {
  const mutations = MGData.get('mutations') ?? {};
  const mutation = mutations[variantId] as Record<string, unknown> | undefined;
  if (!mutation) return {};

  const hint = typeof mutation.hint === 'string' ? mutation.hint : undefined;
  return { hint };
}

function getVariantDisplayName(variantId: string): string {
  const mutations = MGData.get('mutations') ?? {};
  const mutation = mutations[variantId] as Record<string, unknown> | undefined;
  const name = typeof mutation?.name === 'string' ? mutation.name : undefined;
  const display = typeof mutation?.displayName === 'string' ? mutation.displayName : undefined;
  return display ?? name ?? toTitle(variantId);
}

function buildCropHint(variantId: string): string {
  if (variantId === 'Normal') {
    return 'Grow a standard crop without special conditions.';
  }

  if (variantId === 'Max Weight') {
    return 'Harvest a crop at maximum weight.';
  }

  const mutationInfo = getMutationInfo(variantId);
  if (mutationInfo.hint) {
    return mutationInfo.hint;
  }

  const name = getVariantDisplayName(variantId);
  return `Discover ${name} by experimenting with crop conditions.`;
}

function buildPetVariantHint(variantId: string): string {
  if (variantId === 'Normal') return PET_VARIANT_HINT;
  if (variantId === 'Max Weight') return 'Raise a pet to its maximum weight.';

  const name = getVariantDisplayName(variantId);
  return `Hatch pets to discover the ${name} variant.`;
}

function getPetAbilityNames(speciesId: string): string[] {
  const pets = MGData.get('pets') ?? {};
  const pet = pets[speciesId] as Record<string, unknown> | undefined;
  const weights = pet?.innateAbilityWeights as Record<string, number> | undefined;
  if (!weights) return [];
  return Object.keys(weights);
}

export function createHintLookup(): HintLookup {
  return {
    getCropHint: (variantId: string) => buildCropHint(variantId) || FALLBACK_HINT,
    getPetVariantHint: (variantId: string) => buildPetVariantHint(variantId) || PET_VARIANT_HINT,
    getAbilityHint: (speciesId: string) => {
      const abilities = getPetAbilityNames(speciesId);
      if (abilities.length === 0) return ABILITY_HINT;
      return ABILITY_HINT;
    },
  };
}
