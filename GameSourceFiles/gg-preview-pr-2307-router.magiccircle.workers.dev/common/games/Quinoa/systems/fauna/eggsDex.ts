import * as v from 'valibot';
import { PetTiles } from '../../world/tiles';
import { Rarity } from '../rarity';
import type { EggBlueprint } from './egg-blueprint';

export const EggsDex = {
  CommonEgg: {
    tileRef: PetTiles.CommonEgg,
    name: 'Common Egg',
    coinPrice: 100_000,
    creditPrice: 19,
    rarity: Rarity.Common,
    secondsToHatch: 600,
    faunaSpawnWeights: { Worm: 60, Snail: 35, Bee: 5 },
  },
  UncommonEgg: {
    tileRef: PetTiles.UncommonEgg,
    name: 'Uncommon Egg',
    coinPrice: 1_000_000,
    creditPrice: 48,
    rarity: Rarity.Uncommon,
    secondsToHatch: 3600,
    faunaSpawnWeights: { Chicken: 65, Bunny: 25, Dragonfly: 10 },
  },
  RareEgg: {
    tileRef: PetTiles.RareEgg,
    name: 'Rare Egg',
    coinPrice: 10_000_000,
    creditPrice: 99,
    rarity: Rarity.Rare,
    secondsToHatch: 21_600,
    faunaSpawnWeights: { Pig: 80, Cow: 15, Turkey: 5 },
  },
  LegendaryEgg: {
    tileRef: PetTiles.LegendaryEgg,
    name: 'Legendary Egg',
    coinPrice: 100_000_000,
    creditPrice: 249,
    rarity: Rarity.Legendary,
    secondsToHatch: 43_200,
    faunaSpawnWeights: { Squirrel: 60, Turtle: 30, Goat: 10 },
  },
  MythicalEgg: {
    tileRef: PetTiles.MythicalEgg,
    name: 'Mythical Egg',
    coinPrice: 1_000_000_000,
    creditPrice: 599,
    rarity: Rarity.Mythic,
    secondsToHatch: 86_400,
    faunaSpawnWeights: { Butterfly: 75, Capybara: 5, Peacock: 20 },
  },
} as const satisfies Record<Capitalize<string>, EggBlueprint>;

export type EggId = keyof typeof EggsDex;
export const EggIds = Object.keys(EggsDex) as EggId[];
export const EggIdSchema = v.picklist(EggIds);
export const EggEntries = Object.entries(EggsDex) as Array<
  [EggId, EggBlueprint]
>;
