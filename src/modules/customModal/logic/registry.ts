import type { CustomizableModal, ModalRegistryEntry } from "../types";

export const MODAL_REGISTRY: Record<CustomizableModal, ModalRegistryEntry> = {
  inventory: {
    atoms: [
      {
        atomLabel: "myInventoryAtom",
        dataKey: "_full",
        transform: (data: unknown) => {
          const d = data as { items?: unknown[]; storages?: unknown[]; favoritedItemIds?: string[] };
          return {
            items: d.items ?? [],
            storages: d.storages ?? [],
            favoritedItemIds: d.favoritedItemIds ?? [],
          };
        },
      },
    ],
    derivedAtoms: [
      {
        atomLabel: "myCropInventoryAtom",
        sourceKey: "items",
        deriveFn: (items: unknown) =>
          Array.isArray(items)
            ? items.filter((i: { itemType: string }) => i.itemType === "Produce")
            : [],
      },
      {
        atomLabel: "mySeedInventoryAtom",
        sourceKey: "items",
        deriveFn: (items: unknown) =>
          Array.isArray(items)
            ? items.filter((i: { itemType: string }) => i.itemType === "Seed")
            : [],
      },
      {
        atomLabel: "myToolInventoryAtom",
        sourceKey: "items",
        deriveFn: (items: unknown) =>
          Array.isArray(items)
            ? items.filter((i: { itemType: string }) => i.itemType === "Tool")
            : [],
      },
      {
        atomLabel: "myEggInventoryAtom",
        sourceKey: "items",
        deriveFn: (items: unknown) =>
          Array.isArray(items)
            ? items.filter((i: { itemType: string }) => i.itemType === "Egg")
            : [],
      },
      {
        atomLabel: "myDecorInventoryAtom",
        sourceKey: "items",
        deriveFn: (items: unknown) =>
          Array.isArray(items)
            ? items.filter((i: { itemType: string }) => i.itemType === "Decor")
            : [],
      },
      {
        atomLabel: "myPetInventoryAtom",
        sourceKey: "items",
        deriveFn: (items: unknown) =>
          Array.isArray(items)
            ? items.filter((i: { itemType: string }) => i.itemType === "Pet")
            : [],
      },
    ],
  },

  journal: {
    atoms: [
      {
        atomLabel: "myJournalAtom",
        dataKey: "_full",
      },
    ],
    derivedAtoms: [
      {
        atomLabel: "myCropJournalAtom",
        sourceKey: "produce",
        deriveFn: (produce: unknown) => produce ?? {},
      },
      {
        atomLabel: "myPetJournalAtom",
        sourceKey: "pets",
        deriveFn: (pets: unknown) => pets ?? {},
      },
    ],
  },

  stats: {
    atoms: [
      {
        atomLabel: "myStatsAtom",
        dataKey: "_full",
      },
    ],
  },

  activityLog: {
    atoms: [
      {
        atomLabel: "myActivityLogsAtom",
        dataKey: "logs",
      },
    ],
  },

  seedShop: {
    atoms: [
      {
        atomLabel: "seedShopInventoryAtom",
        dataKey: "inventory",
      },
      {
        atomLabel: "seedShopRestockSecondsAtom",
        dataKey: "secondsUntilRestock",
        transform: (data) => data ?? 0,
      },
    ],
  },

  eggShop: {
    atoms: [
      {
        atomLabel: "eggShopInventoryAtom",
        dataKey: "inventory",
      },
      {
        atomLabel: "eggShopRestockSecondsAtom",
        dataKey: "secondsUntilRestock",
        transform: (data) => data ?? 0,
      },
    ],
  },

  toolShop: {
    atoms: [
      {
        atomLabel: "toolShopInventoryAtom",
        dataKey: "inventory",
      },
      {
        atomLabel: "toolShopRestockSecondsAtom",
        dataKey: "secondsUntilRestock",
        transform: (data) => data ?? 0,
      },
    ],
  },

  decorShop: {
    atoms: [
      {
        atomLabel: "decorShopInventoryAtom",
        dataKey: "inventory",
      },
      {
        atomLabel: "decorShopRestockSecondsAtom",
        dataKey: "secondsUntilRestock",
        transform: (data) => data ?? 0,
      },
    ],
  },

  leaderboard: {
    atoms: [
      {
        atomLabel: "unsortedLeaderboardAtom",
        dataKey: "entries",
      },
    ],
  },

  petHutch: {
    atoms: [
      {
        atomLabel: "myPetHutchItemsAtom",
        dataKey: "items",
      },
      {
        atomLabel: "myPetHutchPetItemsAtom",
        dataKey: "petItems",
      },
    ],
  },
};

export function getRegistryForModal(
  modal: CustomizableModal
): ModalRegistryEntry {
  return MODAL_REGISTRY[modal];
}

export function getAtomLabelsForModal(modal: CustomizableModal): string[] {
  const entry = MODAL_REGISTRY[modal];
  const labels: string[] = [];

  for (const atom of entry.atoms) {
    labels.push(atom.atomLabel);
  }

  if (entry.derivedAtoms) {
    for (const derived of entry.derivedAtoms) {
      labels.push(derived.atomLabel);
    }
  }

  return labels;
}
