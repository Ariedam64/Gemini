import * as v from 'valibot';
import { StatBlueprint } from './stats-blueprint';

export const playerStatsDex = {
  // Planting & Harvesting
  numSeedsPlanted: {
    name: 'Seeds Planted',
    description: 'Total number of seeds planted',
  },
  numCropsHarvested: {
    name: 'Crops Harvested',
    description: 'Total number of crops harvested',
  },
  numPlantsPotted: {
    name: 'Plants Potted',
    description: 'Total number of plants potted',
  },
  numPlantsWatered: {
    name: 'Plants Watered',
    description: 'Total number of plants watered',
  },
  numPlantsDestroyed: {
    name: 'Plants Destroyed',
    description: 'Total number of plants destroyed',
  },

  // Pets
  numEggsHatched: {
    name: 'Eggs Hatched',
    description: 'Total number of eggs hatched',
  },
  numPetsSold: {
    name: 'Pets Sold',
    description: 'Total number of pets sold',
  },

  // Decor
  numDecorPurchased: {
    name: 'Decor Purchased',
    description: 'Total number of decor items purchased',
  },
  numDecorDestroyed: {
    name: 'Decor Destroyed',
    description: 'Total number of decor items destroyed',
  },

  // Earnings
  totalEarningsSellCrops: {
    name: 'Crop Earnings',
    description: 'Total coins earned from selling crops',
  },
  totalEarningsSellPet: {
    name: 'Pet Earnings',
    description: 'Total coins earned from selling pets',
  },

  // Pet Food
  totalHungerReplenished: {
    name: 'Hunger Replenished',
    description: 'Total amount of hunger replenished',
  },

  // Time Saved
  secondsSavedWaterPlants: {
    name: 'Time Saved: Water Plants',
    description: 'Total time saved from watering plants',
  },
  secondsSavedInstaGrowPlants: {
    name: 'Time Saved: Insta-Grow Plants',
    description: 'Total time saved from insta-growing plants',
  },
  secondsSavedInstaGrowEggs: {
    name: 'Time Saved: Insta-Grow Eggs',
    description: 'Total time saved from insta-growing eggs',
  },
} as const satisfies Record<string, StatBlueprint>;

export type PlayerStatId = keyof typeof playerStatsDex;
export const playerStatIds = Object.keys(playerStatsDex) as PlayerStatId[];
export const PlayerStatIdSchema = v.picklist(playerStatIds);
export const playerStatEntries = Object.entries(playerStatsDex) as Array<
  [PlayerStatId, StatBlueprint]
>;
