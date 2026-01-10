import * as v from 'valibot';
import { Currency } from '../../types';
import { ItemType } from '../inventory';
import { Rarity } from '../rarity';
import { SlotMachineBlueprint } from './slot-machine-blueprint';

export const slotMachineDex = {
  Carnival25K: {
    name: '25K Celebration Carnival Stand',
    description: 'Limited-time slot machine to celebrate 25K Discord members.',
    expiryDate: new Date('2025-10-29T00:00:00.000Z'),
    cost: {
      type: ItemType.Seed,
      species: 'Carrot',
      amount: 25,
    },
    prizes: [
      {
        name: '750 Coins',
        type: Currency.Coins,
        amount: 750,
        probabilityWeight: 12,
        rarity: Rarity.Common,
      },
      {
        name: 'Aloe Seed (×3)',
        type: ItemType.Seed,
        species: 'Aloe',
        amount: 3,
        probabilityWeight: 12,
        rarity: Rarity.Common,
      },
      {
        name: 'Delphinium Seed (×2)',
        type: ItemType.Seed,
        species: 'Delphinium',
        amount: 2,
        probabilityWeight: 12,
        rarity: Rarity.Common,
      },
      {
        name: 'Tulip Seed (×2)',
        type: ItemType.Seed,
        species: 'OrangeTulip',
        amount: 2,
        probabilityWeight: 12,
        rarity: Rarity.Common,
      },
      {
        name: '2500 Coins',
        type: Currency.Coins,
        amount: 2500,
        probabilityWeight: 9,
        rarity: Rarity.Uncommon,
      },
      {
        name: 'Wet Potion',
        type: ItemType.Tool,
        toolId: 'WetPotion',
        amount: 1,
        probabilityWeight: 9,
        rarity: Rarity.Uncommon,
      },
      {
        name: 'Pumpkin Seed',
        type: ItemType.Seed,
        species: 'Pumpkin',
        amount: 1,
        probabilityWeight: 9,
        rarity: Rarity.Uncommon,
      },
      {
        name: 'Daffodil Seed',
        type: ItemType.Seed,
        species: 'Daffodil',
        amount: 1,
        probabilityWeight: 6,
        rarity: Rarity.Rare,
      },
      {
        name: 'Planter Pot',
        type: ItemType.Tool,
        toolId: 'PlanterPot',
        amount: 1,
        probabilityWeight: 6,
        rarity: Rarity.Rare,
      },
      {
        name: 'Chilled Potion',
        type: ItemType.Tool,
        toolId: 'ChilledPotion',
        amount: 1,
        probabilityWeight: 6,
        rarity: Rarity.Rare,
      },
      {
        name: 'Squash Seed',
        type: ItemType.Seed,
        species: 'Squash',
        amount: 1,
        probabilityWeight: 2,
        rarity: Rarity.Legendary,
      },
      {
        name: 'Frozen Potion',
        type: ItemType.Tool,
        toolId: 'FrozenPotion',
        amount: 1,
        probabilityWeight: 2,
        rarity: Rarity.Legendary,
      },
      {
        name: 'Dawnlit Potion',
        type: ItemType.Tool,
        toolId: 'DawnlitPotion',
        amount: 1,
        probabilityWeight: 1.2,
        rarity: Rarity.Legendary,
      },
      {
        name: 'Amberlit Potion',
        type: ItemType.Tool,
        toolId: 'AmberlitPotion',
        amount: 1,
        probabilityWeight: 1.2,
        rarity: Rarity.Legendary,
      },
      {
        name: 'Grape Seed',
        type: ItemType.Seed,
        species: 'Grape',
        amount: 1,
        probabilityWeight: 0.2,
        rarity: Rarity.Mythic,
      },
      {
        name: 'Straw Scarecrow',
        type: ItemType.Decor,
        decorId: 'StrawScarecrow',
        amount: 1,
        probabilityWeight: 0.2,
        rarity: Rarity.Mythic,
      },
      {
        name: 'Gold Potion',
        type: ItemType.Tool,
        toolId: 'GoldPotion',
        amount: 1,
        probabilityWeight: 0.1,
        rarity: Rarity.Divine,
      },
      {
        name: 'Mini Fairy Forge',
        type: ItemType.Decor,
        decorId: 'MiniFairyForge',
        amount: 1,
        probabilityWeight: 0.1,
        rarity: Rarity.Divine,
      },
    ],
  },
} as const satisfies Record<string, SlotMachineBlueprint>;

export type SlotMachineId = keyof typeof slotMachineDex;
export const slotMachineIds = Object.keys(slotMachineDex) as SlotMachineId[];
export const SlotMachineIdSchema = v.picklist(slotMachineIds);
export const slotMachineEntries = Object.entries(slotMachineDex) as Array<
  [SlotMachineId, SlotMachineBlueprint]
>;
