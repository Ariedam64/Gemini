import * as v from 'valibot';
import { ItemsTile } from '../../world/tiles';
import { Rarity } from '../rarity';
import { ToolBlueprint } from './tools-blueprint';

export const toolsDex = {
  WateringCan: {
    tileRef: ItemsTile.WateringCan,
    name: 'Watering Can',
    coinPrice: 5_000,
    creditPrice: 2,
    rarity: Rarity.Common,
    isOneTimePurchase: false,
    baseTileScale: 0.6,
    maxInventoryQuantity: 99,
  },
  PlanterPot: {
    tileRef: ItemsTile.PlanterPot,
    name: 'Planter Pot',
    coinPrice: 25_000,
    creditPrice: 5,
    rarity: Rarity.Common,
    isOneTimePurchase: false,
    baseTileScale: 0.8,
  },
  WetPotion: {
    tileRef: ItemsTile.WetPotion,
    name: 'Wet Potion',
    coinPrice: Infinity,
    creditPrice: Infinity,
    rarity: Rarity.Common,
    isOneTimePurchase: true,
    baseTileScale: 1,
    grantedMutation: 'Wet',
  },
  ChilledPotion: {
    tileRef: ItemsTile.ChilledPotion,
    name: 'Chilled Potion',
    coinPrice: Infinity,
    creditPrice: Infinity,
    rarity: Rarity.Common,
    isOneTimePurchase: true,
    baseTileScale: 1,
    grantedMutation: 'Chilled',
  },
  DawnlitPotion: {
    tileRef: ItemsTile.DawnlitPotion,
    name: 'Dawnlit Potion',
    coinPrice: Infinity,
    creditPrice: Infinity,
    rarity: Rarity.Uncommon,
    isOneTimePurchase: true,
    baseTileScale: 1,
    grantedMutation: 'Dawnlit',
  },
  Shovel: {
    tileRef: ItemsTile.Shovel,
    name: 'Garden Shovel',
    coinPrice: 1_000_000,
    creditPrice: 100,
    rarity: Rarity.Uncommon,
    isOneTimePurchase: true,
    baseTileScale: 0.7,
  },
  FrozenPotion: {
    tileRef: ItemsTile.FrozenPotion,
    name: 'Frozen Potion',
    coinPrice: Infinity,
    creditPrice: Infinity,
    rarity: Rarity.Rare,
    isOneTimePurchase: true,
    baseTileScale: 1,
    grantedMutation: 'Frozen',
  },
  AmberlitPotion: {
    tileRef: ItemsTile.AmberlitPotion,
    name: 'Amberlit Potion',
    coinPrice: Infinity,
    creditPrice: Infinity,
    rarity: Rarity.Rare,
    isOneTimePurchase: true,
    baseTileScale: 1,
    grantedMutation: 'Ambershine',
  },
  GoldPotion: {
    tileRef: ItemsTile.GoldPotion,
    name: 'Gold Potion',
    coinPrice: Infinity,
    creditPrice: Infinity,
    rarity: Rarity.Legendary,
    isOneTimePurchase: true,
    baseTileScale: 1,
    grantedMutation: 'Gold',
  },
  RainbowPotion: {
    tileRef: ItemsTile.RainbowPotion,
    name: 'Rainbow Potion',
    coinPrice: Infinity,
    creditPrice: Infinity,
    rarity: Rarity.Celestial,
    isOneTimePurchase: true,
    baseTileScale: 1,
    grantedMutation: 'Rainbow',
  },
} as const satisfies Record<Capitalize<string>, ToolBlueprint>;

export type ToolId = keyof typeof toolsDex;
export const toolIds = Object.keys(toolsDex) as ToolId[];
export const ToolIdSchema = v.picklist(toolIds);
export const toolEntries = Object.entries(toolsDex) as Array<
  [ToolId, ToolBlueprint]
>;
