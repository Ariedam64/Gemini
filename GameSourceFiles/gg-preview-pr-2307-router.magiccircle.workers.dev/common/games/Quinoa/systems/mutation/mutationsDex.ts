import * as v from 'valibot';
import { MutationTiles } from '../../world/tiles';
import { MutationBlueprint } from './mutation-blueprint';

export const mutationsDex = {
  Gold: {
    name: 'Gold',
    baseChance: 0.01,
    coinMultiplier: 25,
  },
  Rainbow: {
    name: 'Rainbow',
    baseChance: 0.001,
    coinMultiplier: 50,
  },
  Wet: {
    name: 'Wet',
    baseChance: 0.0,
    coinMultiplier: 2,
    tileRef: MutationTiles.Wet,
  },
  Chilled: {
    name: 'Chilled',
    baseChance: 0.0,
    coinMultiplier: 2,
    tileRef: MutationTiles.Chilled,
  },
  Frozen: {
    name: 'Frozen',
    baseChance: 0.0,
    coinMultiplier: 10,
    tileRef: MutationTiles.Frozen,
  },
  Dawnlit: {
    name: 'Dawnlit',
    baseChance: 0.0,
    coinMultiplier: 2,
    tileRef: MutationTiles.Dawnlit,
  },
  Ambershine: {
    name: 'Amberlit',
    baseChance: 0.0,
    coinMultiplier: 5,
    tileRef: MutationTiles.Amberlit,
  },
  Dawncharged: {
    name: 'Dawnbound',
    baseChance: 0.0,
    coinMultiplier: 3,
    tileRef: MutationTiles.Dawncharged,
  },
  Ambercharged: {
    name: 'Amberbound',
    baseChance: 0.0,
    coinMultiplier: 6,
    tileRef: MutationTiles.Ambercharged,
  },
} as const satisfies Record<Capitalize<string>, MutationBlueprint>;

export type MutationId = keyof typeof mutationsDex;
export const MutationIds = Object.keys(mutationsDex) as MutationId[];
export const MutationIdSchema = v.picklist(MutationIds);

/**
 * Map of MutationIds to their index for stable sorting.
 */
const mutationIdOrder = new Map<MutationId, number>(
  MutationIds.map((id, idx) => [id, idx])
);

/**
 * Sorts MutationIds using a cached order map for stable sorting.
 * Example:
 * ```ts
 * const mutations = ['Gold', 'Rainbow', 'Wet'];
 * const sortedMutations = mutations.toSorted(mutationSortFn);
 * console.log(sortedMutations); // ['Gold', 'Rainbow', 'Wet']
 * ```
 */
export function mutationSortFn(a: MutationId, b: MutationId): number {
  // Push unknown mutations to the end with Infinity
  return (
    (mutationIdOrder.get(a) ?? Infinity) - (mutationIdOrder.get(b) ?? Infinity)
  );
}
