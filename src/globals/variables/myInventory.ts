import { subscribe as wsSubscribe, getMySlot } from "../../state";
import { deepEqual } from "../core/reactive";
import type {
  MyInventoryGlobal,
  MyInventoryData,
  SelectedItem,
  SelectedItemChange,
  InventoryItemsChange,
  FavoritesChange,
  SubscribeOptions,
  Unsubscribe,
} from "../core/types";
import type { Inventory, InventoryItem, ItemStorage } from "../../atoms/types";

type MyInventorySources = {
  inventory: Inventory | null;
  isFull: boolean;
  selectedItemIndex: number | null;
  storages: ItemStorage[];
};

const MAX_INVENTORY_SIZE = 100; // Game max inventory slots

const initialData: MyInventoryData = {
  items: [],
  storages: [],
  favoritedItemIds: [],
  count: 0,
  isFull: false,
  selectedItem: null,
};

function buildData(sources: MyInventorySources): MyInventoryData {
  const inventory = sources.inventory;
  // Snapshot: game engine mutates these arrays in place, so we must clone
  // deeply enough that change detection (deepEqual / stable key) is reliable.
  const items = (inventory?.items ?? []).map((it) => ({ ...it })) as InventoryItem[];
  const favoritedItemIds = [...(inventory?.favoritedItemIds ?? [])];
  const storages = (sources.storages ?? []).map((s) => ({
    ...s,
    items: (s.items ?? []).map((it) => ({ ...it })) as InventoryItem[],
  })) as ItemStorage[];
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
    storages,
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

  const storageKeys = data.storages.map((s) => {
    const id = (s as { id?: string; decorId?: string }).id ?? (s as { decorId?: string }).decorId ?? "unknown";
    const itemSig = (s.items ?? [])
      .map((it) => {
        if ("species" in it && it.itemType === "Seed") return `S:${it.species}:${it.quantity}`;
        if ("decorId" in it && it.itemType === "Decor") return `D:${it.decorId}:${it.quantity}`;
        if ("id" in it) return `P:${it.id}`;
        return "?";
      })
      .join(",");
    return `${id}[${itemSig}]`;
  });

  return JSON.stringify({
    itemKeys,
    storageKeys,
    favoritedItemIds: data.favoritedItemIds,
    isFull: data.isFull,
    selectedItemIndex: data.selectedItem?.index ?? null,
  });
}

function isStableEqual(prev: MyInventoryData, next: MyInventoryData): boolean {
  return getStableKey(prev) === getStableKey(next);
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

  function readSources(): MyInventorySources {
    const slot = getMySlot();
    const inventory = slot?.data?.inventory ?? null;
    const items = inventory?.items ?? [];
    const selectedItemIndex = slot?.notAuthoritative_selectedItemIndex ?? null;
    const storages = (inventory?.storages ?? []) as ItemStorage[];
    return {
      inventory,
      isFull: items.length >= MAX_INVENTORY_SIZE,
      selectedItemIndex,
      storages,
    };
  }

  function onStateChange(): void {
    const sources = readSources();
    const nextData = buildData(sources);

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

  function init(): void {
    if (initialized) return;

    // Read initial state
    const sources = readSources();
    if (sources.inventory) {
      currentData = buildData(sources);
    }

    // Subscribe to inventory + selection changes via WS.
    // Also subscribe to mySlot as a safety net (storages live under slot.data.inventory).
    unsubscribes.push(wsSubscribe("inventory", onStateChange));
    unsubscribes.push(wsSubscribe("selection", onStateChange));
    unsubscribes.push(wsSubscribe("mySlot", onStateChange));

    initialized = true;
  }

  init();

  return {
    get(): MyInventoryData {
      return currentData;
    },

    subscribe(callback: (value: MyInventoryData, prev: MyInventoryData) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.all.add(callback);
      if (options?.immediate !== false && initialized && currentData !== initialData) {
        callback(currentData, currentData);
      }
      return () => listeners.all.delete(callback);
    },

    subscribeStable(callback: (value: MyInventoryData, prev: MyInventoryData) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.stable.add(callback);
      if (options?.immediate !== false && initialized && currentData !== initialData) {
        callback(currentData, currentData);
      }
      return () => listeners.stable.delete(callback);
    },

    subscribeSelection(callback: (event: SelectedItemChange) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.selection.add(callback);
      if (options?.immediate && initialized && currentData !== initialData) {
        callback({ current: currentData.selectedItem, previous: currentData.selectedItem });
      }
      return () => listeners.selection.delete(callback);
    },

    subscribeItems(callback: (event: InventoryItemsChange) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.items.add(callback);
      if (options?.immediate && initialized && currentData !== initialData) {
        callback({ added: currentData.items, removed: [], counts: { before: 0, after: currentData.count } });
      }
      return () => listeners.items.delete(callback);
    },

    subscribeFavorites(callback: (event: FavoritesChange) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.favorites.add(callback);
      if (options?.immediate && initialized && currentData !== initialData) {
        callback({ added: currentData.favoritedItemIds, removed: [], current: currentData.favoritedItemIds });
      }
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

export function destroyMyInventory(): void { instance?.destroy(); instance = null; }

export function getMyInventory(): MyInventoryGlobal {
  if (!instance) {
    instance = createMyInventoryGlobal();
  }
  return instance;
}
