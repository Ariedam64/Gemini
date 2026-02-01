/**
 * Storage Value Indicator - Calculation + subscriptions
 */

import { Store } from '../../../../atoms/store';
import type { Inventory, InventoryItem, ItemStorage, PetInventoryItem, SeedInventoryItem, DecorInventoryItem } from '../../../../atoms/types';
import { MGData } from '../../../../modules/data';
import { calculateMutationMultiplier } from '../../../../modules/calculators/logic/mutation';
import {
  calculateMaxStrength,
  calculateCurrentStrength,
  calculateStrengthProgress,
} from '../../../../modules/calculators/logic/pet';

export type StorageValueKind = 'seed' | 'pet' | 'decor';

export interface StorageValueUpdate {
  kind: StorageValueKind;
  storageValue: number;
  inventoryValue: number;
  totalValue: number;
}

export interface StorageValueSubscriptions {
  start(onUpdate: (update: StorageValueUpdate) => void): Promise<() => void>;
}

type ItemStorageLike = ItemStorage & { decorId?: string };

const STORAGE_IDS = {
  seed: 'SeedSilo',
  pet: 'PetHutch',
  decor: 'DecorShed',
} as const;

function getStorages(items: unknown[]): ItemStorageLike[] {
  if (!Array.isArray(items)) return [];
  return items.filter((storage): storage is ItemStorageLike => {
    return typeof storage === 'object' && storage !== null && 'items' in storage;
  });
}

function normalizeDecorId(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'decorId' in value) {
    const nested = (value as { decorId?: unknown }).decorId;
    return typeof nested === 'string' ? nested : null;
  }
  return null;
}

function filterStorageItems(storages: ItemStorageLike[], decorId: string): InventoryItem[] {
  const matched = storages.filter((storage) => {
    const id = normalizeDecorId(storage.decorId);
    return id === decorId;
  });
  return matched.flatMap((storage) => storage.items ?? []);
}

export function calculateSeedStorageValue(seeds: SeedInventoryItem[]): number {
  if (!seeds.length) return 0;
  const plantsData = MGData.get('plants') as Record<string, any> | null;
  if (!plantsData) return 0;

  return seeds.reduce((total, seed) => {
    const speciesData = plantsData[seed.species];
    const coinPrice = speciesData?.seed?.coinPrice ?? 0;
    return total + coinPrice * (seed.quantity ?? 0);
  }, 0);
}

export function calculateDecorStorageValue(decors: DecorInventoryItem[]): number {
  if (!decors.length) return 0;
  const decorData = MGData.get('decor') as Record<string, any> | null;
  if (!decorData) return 0;

  return decors.reduce((total, decor) => {
    const blueprint = decorData[decor.decorId];
    const coinPrice = blueprint?.coinPrice ?? 0;
    return total + coinPrice * (decor.quantity ?? 0);
  }, 0);
}

function calculatePetSellPrice(pet: PetInventoryItem): number {
  const petsData = MGData.get('pets') as Record<string, any> | null;
  if (!petsData) return 0;

  const speciesData = petsData[pet.petSpecies];
  const maturitySellPrice = speciesData?.maturitySellPrice ?? speciesData?.sellPrice ?? 0;

  const maxStrength = calculateMaxStrength(pet.petSpecies, pet.targetScale);
  const currentStrength = calculateCurrentStrength(pet.petSpecies, pet.xp, maxStrength);
  const strengthProgress = calculateStrengthProgress(currentStrength, maxStrength);
  const scale = strengthProgress * pet.targetScale;

  const mutationMultiplier = calculateMutationMultiplier(pet.mutations ?? []);
  return Math.round(maturitySellPrice * scale * mutationMultiplier);
}

export function calculatePetStorageValue(pets: PetInventoryItem[]): number {
  if (!pets.length) return 0;
  return pets.reduce((total, pet) => total + calculatePetSellPrice(pet), 0);
}

export function createStorageValueSubscriptions(): StorageValueSubscriptions {
  return {
    async start(onUpdate: (update: StorageValueUpdate) => void): Promise<() => void> {
      const cleanups: Array<() => void> = [];

      const emitSeedValue = (storages: ItemStorageLike[], inventoryItems: InventoryItem[]): void => {
        const storageItems = filterStorageItems(storages, STORAGE_IDS.seed)
          .filter((item): item is SeedInventoryItem => item.itemType === 'Seed');
        const storageValue = calculateSeedStorageValue(storageItems);
        const inventorySeeds = inventoryItems
          .filter((item): item is SeedInventoryItem => item.itemType === 'Seed');
        const inventoryValue = calculateSeedStorageValue(inventorySeeds);
        onUpdate({ kind: 'seed', storageValue, inventoryValue, totalValue: storageValue + inventoryValue });
      };

      const emitDecorValue = (storages: ItemStorageLike[], inventoryItems: InventoryItem[]): void => {
        const storageItems = filterStorageItems(storages, STORAGE_IDS.decor)
          .filter((item): item is DecorInventoryItem => item.itemType === 'Decor');
        const storageValue = calculateDecorStorageValue(storageItems);
        const inventoryDecors = inventoryItems
          .filter((item): item is DecorInventoryItem => item.itemType === 'Decor');
        const inventoryValue = calculateDecorStorageValue(inventoryDecors);
        onUpdate({ kind: 'decor', storageValue, inventoryValue, totalValue: storageValue + inventoryValue });
      };

      const emitPetValue = (storages: ItemStorageLike[], inventoryItems: InventoryItem[]): void => {
        const storageItems = filterStorageItems(storages, STORAGE_IDS.pet)
          .filter((item): item is PetInventoryItem => item.itemType === 'Pet');
        const storageValue = calculatePetStorageValue(storageItems);
        const inventoryPets = inventoryItems
          .filter((item): item is PetInventoryItem => item.itemType === 'Pet');
        const inventoryValue = calculatePetStorageValue(inventoryPets);
        onUpdate({ kind: 'pet', storageValue, inventoryValue, totalValue: storageValue + inventoryValue });
      };

      const handleInventory = (value: Inventory | null): void => {
        const storages = getStorages(value?.storages ?? []);
        const inventoryItems = value?.items ?? [];
        emitSeedValue(storages, inventoryItems);
        emitDecorValue(storages, inventoryItems);
        emitPetValue(storages, inventoryItems);
      };

      const handleStorages = (value: unknown[]): void => {
        const storages = getStorages(value);
        emitSeedValue(storages, []);
        emitDecorValue(storages, []);
        emitPetValue(storages, []);
      };

      let inventoryUnsub: (() => void) | null = null;

      try {
        inventoryUnsub = await Store.subscribeImmediate<Inventory | null>(
          'myInventoryAtom',
          handleInventory
        );
      } catch (err) {
        console.warn('[StorageValueIndicator] Failed to subscribe myInventoryAtom', err);
        try {
          inventoryUnsub = await Store.subscribeImmediate<unknown[]>(
            'myItemStoragesAtom',
            handleStorages
          );
        } catch (err2) {
          console.warn('[StorageValueIndicator] Failed to subscribe myItemStoragesAtom', err2);
        }
      }

      if (inventoryUnsub) {
        cleanups.push(inventoryUnsub);
      }

      return () => {
        for (const cleanup of cleanups) {
          try {
            cleanup();
          } catch {
            // ignore cleanup errors
          }
        }
        cleanups.length = 0;
      };
    },
  };
}
