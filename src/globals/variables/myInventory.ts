import { Store } from "../../atoms/store";
import type {
  MyInventoryGlobal,
  MyInventoryData,
  SelectedItem,
  SelectedItemChange,
  InventoryItemsChange,
  FavoritesChange,
  Unsubscribe,
} from "../core/types";
import type { Inventory, InventoryItem } from "../../atoms/types";

type MyInventorySources = {
  inventory: Inventory | null;
  isFull: boolean;
  selectedItemIndex: number | null;
};

const atomSources = {
  inventory: "myInventoryAtom",
  isFull: "isMyInventoryAtMaxLengthAtom",
  selectedItemIndex: "myPossiblyNoLongerValidSelectedItemIndexAtom",
};

const initialData: MyInventoryData = {
  items: [],
  favoritedItemIds: [],
  count: 0,
  isFull: false,
  selectedItem: null,
};

function buildData(sources: MyInventorySources): MyInventoryData {
  const inventory = sources.inventory;
  const items = inventory?.items ?? [];
  const favoritedItemIds = inventory?.favoritedItemIds ?? [];
  const selectedIndex = sources.selectedItemIndex;

  let selectedItem: SelectedItem = null;
  if (selectedIndex !== null && selectedIndex >= 0 && selectedIndex < items.length) {
    selectedItem = {
      index: selectedIndex,
      item: items[selectedIndex],
    };
  }

  return {
    items,
    favoritedItemIds,
    count: items.length,
    isFull: sources.isFull ?? false,
    selectedItem,
  };
}

function getStableKey(data: MyInventoryData): string {
  const itemKeys = data.items.map((item) => {
    if ("id" in item) {
      return item.id;
    }
    if ("species" in item && item.itemType === "Seed") {
      return `seed:${item.species}:${item.quantity}`;
    }
    if ("toolId" in item) {
      return `tool:${item.toolId}:${item.quantity}`;
    }
    if ("eggId" in item) {
      return `egg:${item.eggId}:${item.quantity}`;
    }
    if ("decorId" in item) {
      return `decor:${item.decorId}:${item.quantity}`;
    }
    return JSON.stringify(item);
  });

  return JSON.stringify({
    itemKeys,
    favoritedItemIds: data.favoritedItemIds,
    isFull: data.isFull,
    selectedItemIndex: data.selectedItem?.index ?? null,
  });
}

function isStableEqual(prev: MyInventoryData, next: MyInventoryData): boolean {
  return getStableKey(prev) === getStableKey(next);
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return a === b;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object") return a === b;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (Array.isArray(a) || Array.isArray(b)) return false;

  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;
  const aKeys = Object.keys(aObj);
  const bKeys = Object.keys(bObj);

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(bObj, key)) return false;
    if (!deepEqual(aObj[key], bObj[key])) return false;
  }

  return true;
}

type ListenerSets = {
  all: Set<(value: MyInventoryData, prev: MyInventoryData) => void>;
  stable: Set<(value: MyInventoryData, prev: MyInventoryData) => void>;
  selection: Set<(event: SelectedItemChange) => void>;
  items: Set<(event: InventoryItemsChange) => void>;
  favorites: Set<(event: FavoritesChange) => void>;
};

function isSelectionChanged(prev: SelectedItem, next: SelectedItem): boolean {
  if (prev === null && next === null) return false;
  if (prev === null || next === null) return true;
  return prev.index !== next.index;
}

function getItemKey(item: InventoryItem): string {
  if ("id" in item) return item.id;
  if ("species" in item && item.itemType === "Seed") return `seed:${item.species}`;
  if ("toolId" in item) return `tool:${item.toolId}`;
  if ("eggId" in item) return `egg:${item.eggId}`;
  if ("decorId" in item) return `decor:${item.decorId}`;
  return JSON.stringify(item);
}

function detectItemsChange(
  prev: InventoryItem[],
  next: InventoryItem[]
): InventoryItemsChange | null {
  const prevKeys = new Set(prev.map(getItemKey));
  const nextKeys = new Set(next.map(getItemKey));

  const added = next.filter((item) => !prevKeys.has(getItemKey(item)));
  const removed = prev.filter((item) => !nextKeys.has(getItemKey(item)));

  if (added.length === 0 && removed.length === 0) return null;

  return {
    added,
    removed,
    counts: { before: prev.length, after: next.length },
  };
}

function detectFavoritesChange(prev: string[], next: string[]): FavoritesChange | null {
  const prevSet = new Set(prev);
  const nextSet = new Set(next);

  const added = next.filter((id) => !prevSet.has(id));
  const removed = prev.filter((id) => !nextSet.has(id));

  if (added.length === 0 && removed.length === 0) return null;

  return {
    added,
    removed,
    current: next,
  };
}

function createMyInventoryGlobal(): MyInventoryGlobal {
  let currentData: MyInventoryData = initialData;
  let previousData: MyInventoryData = initialData;
  let initialized = false;
  const unsubscribes: Unsubscribe[] = [];

  const listeners: ListenerSets = {
    all: new Set(),
    stable: new Set(),
    selection: new Set(),
    items: new Set(),
    favorites: new Set(),
  };

  const sources: Partial<MyInventorySources> = {};
  const sourceKeys = Object.keys(atomSources) as (keyof MyInventorySources)[];
  const ready = new Set<keyof MyInventorySources>();

  function notify(): void {
    if (ready.size < sourceKeys.length) return;

    const nextData = buildData(sources as MyInventorySources);

    if (deepEqual(currentData, nextData)) return;

    previousData = currentData;
    currentData = nextData;

    if (!initialized) return;

    for (const cb of listeners.all) {
      cb(currentData, previousData);
    }

    if (!isStableEqual(previousData, currentData)) {
      for (const cb of listeners.stable) {
        cb(currentData, previousData);
      }
    }

    if (isSelectionChanged(previousData.selectedItem, currentData.selectedItem)) {
      const event: SelectedItemChange = {
        current: currentData.selectedItem,
        previous: previousData.selectedItem,
      };
      for (const cb of listeners.selection) {
        cb(event);
      }
    }

    const itemsChange = detectItemsChange(previousData.items, currentData.items);
    if (itemsChange) {
      for (const cb of listeners.items) {
        cb(itemsChange);
      }
    }

    const favoritesChange = detectFavoritesChange(
      previousData.favoritedItemIds,
      currentData.favoritedItemIds
    );
    if (favoritesChange) {
      for (const cb of listeners.favorites) {
        cb(favoritesChange);
      }
    }
  }

  async function init(): Promise<void> {
    if (initialized) return;

    const subscriptionPromises = sourceKeys.map(async (key) => {
      const atomLabel = atomSources[key];

      const unsub = await Store.subscribe(atomLabel, (value: unknown) => {
        (sources as Record<string, unknown>)[key] = value;
        ready.add(key);
        notify();
      });

      unsubscribes.push(unsub);
    });

    await Promise.all(subscriptionPromises);
    initialized = true;

    if (ready.size === sourceKeys.length) {
      currentData = buildData(sources as MyInventorySources);
    }
  }

  init();

  return {
    get(): MyInventoryData {
      return currentData;
    },

    subscribe(callback: (value: MyInventoryData, prev: MyInventoryData) => void): Unsubscribe {
      listeners.all.add(callback);
      if (initialized && ready.size === sourceKeys.length) {
        callback(currentData, currentData);
      }
      return () => listeners.all.delete(callback);
    },

    subscribeStable(callback: (value: MyInventoryData, prev: MyInventoryData) => void): Unsubscribe {
      listeners.stable.add(callback);
      if (initialized && ready.size === sourceKeys.length) {
        callback(currentData, currentData);
      }
      return () => listeners.stable.delete(callback);
    },

    subscribeSelection(callback: (event: SelectedItemChange) => void): Unsubscribe {
      listeners.selection.add(callback);
      return () => listeners.selection.delete(callback);
    },

    subscribeItems(callback: (event: InventoryItemsChange) => void): Unsubscribe {
      listeners.items.add(callback);
      return () => listeners.items.delete(callback);
    },

    subscribeFavorites(callback: (event: FavoritesChange) => void): Unsubscribe {
      listeners.favorites.add(callback);
      return () => listeners.favorites.delete(callback);
    },

    destroy(): void {
      for (const unsub of unsubscribes) {
        unsub();
      }
      unsubscribes.length = 0;
      listeners.all.clear();
      listeners.stable.clear();
      listeners.selection.clear();
      listeners.items.clear();
      listeners.favorites.clear();
      initialized = false;
    },
  };
}

let instance: MyInventoryGlobal | null = null;

export function getMyInventory(): MyInventoryGlobal {
  if (!instance) {
    instance = createMyInventoryGlobal();
  }
  return instance;
}
