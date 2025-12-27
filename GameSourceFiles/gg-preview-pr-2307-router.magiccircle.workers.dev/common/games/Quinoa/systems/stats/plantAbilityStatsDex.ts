import * as v from 'valibot';
import { FloraAbilityId } from '../flora/floraAbilitiesDex';
import { StatBlueprint } from './stats-blueprint';

/**
 * Stats tracking for plant abilities.
 * - Ability IDs track the number of times each ability has triggered
 * - Extended stats track cumulative values (mutations applied, etc.)
 */
type PlantAbilitiesStatsDex = Record<FloraAbilityId, StatBlueprint> &
  Record<string, StatBlueprint>;

export const plantAbilitiesStatsDex = {
  // ===== ABILITY TRIGGER COUNTS =====
  // Each ability ID tracks how many times it has successfully triggered
  MoonKisser: {
    name: 'Amberbinder',
    description: 'Number of times Amberbinder triggered',
  },
  DawnKisser: {
    name: 'Dawnbinder',
    description: 'Number of times Dawnbinder triggered',
  },
} as const satisfies PlantAbilitiesStatsDex;

export type PlantAbilityStatId = keyof typeof plantAbilitiesStatsDex;

export const plantAbilityStatIds = Object.keys(
  plantAbilitiesStatsDex
) as PlantAbilityStatId[];
export const PlantAbilityStatIdSchema = v.picklist(plantAbilityStatIds);
export const plantAbilityStatEntries = Object.entries(
  plantAbilitiesStatsDex
) as Array<[PlantAbilityStatId, StatBlueprint]>;
