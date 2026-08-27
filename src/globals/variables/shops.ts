import { subscribe as wsSubscribe, getGameState, getMySlot } from "../../state";
import { deepEqual } from "../core/reactive";
import type {
  ShopsGlobal,
  ShopsData,
  Shop,
  ShopItem,
  ShopType,
  ShopRestockEvent,
  ShopPurchaseEvent,
  ShopAvailabilityChange,
  SubscribeOptions,
  Unsubscribe,
} from "../core/types";
import type { Shops as RawShops, Shop as RawShop, ShopPurchases, ShopPurchase, ShopInventoryItem } from "../../atoms/types";

type ShopsSources = {
  shops: RawShops | null;
  purchases: ShopPurchases;
};

/**
 * Shops that are always reported, even when the state omits them.
 *
 * They back `byType.seed` and friends, which consumers read without guarding.
 */
const KNOWN_SHOP_TYPES: ShopType[] = ["seed", "tool", "egg", "decor", "dawn"];

/**
 * Every shop to build, in a stable order: the known ones first, then whatever
 * else the state carries.
 *
 * This list used to be hardcoded at five while the game served eight — `snow`,
 * `thunder` and `apology` existed but no restock of theirs was ever seen.
 */
function resolveShopTypes(rawShops: RawShops | null): ShopType[] {
  const extra = Object.keys(rawShops ?? {})
    .filter((type) => !KNOWN_SHOP_TYPES.includes(type))
    .sort();

  return [...KNOWN_SHOP_TYPES, ...extra];
}

/**
 * Resolve a stable item id from the raw shop inventory entry.
 *
 * Resolution is driven by `itemType` rather than the parent shop, because the
 * Dawn shop holds a heterogeneous mix of items (Seed + Egg) and we need each
 * row to carry the correct id field.
 */
function getItemId(rawItem: ShopInventoryItem): string {
  switch (rawItem.itemType) {
    case "Seed":
      return rawItem.species ?? rawItem.itemType;
    case "Tool":
      return rawItem.toolId ?? rawItem.itemType;
    case "Egg":
      return rawItem.eggId ?? rawItem.itemType;
    case "Decor":
      return rawItem.decorId ?? rawItem.itemType;
    default:
      return rawItem.itemType;
  }
}

function buildShopItem(
  rawItem: ShopInventoryItem,
  purchases: Record<string, number>
): ShopItem {
  const id = getItemId(rawItem);
  const purchased = purchases[id] ?? 0;
  const remaining = Math.max(0, rawItem.initialStock - purchased);

  return {
    id,
    itemType: rawItem.itemType,
    initialStock: rawItem.initialStock,
    purchased,
    remaining,
    isAvailable: remaining > 0,
    price: rawItem.price,
  };
}

function buildShop(
  type: ShopType,
  rawShop: RawShop | null | undefined,
  purchases: ShopPurchases
): Shop {
  if (!rawShop) {
    return {
      type,
      items: [],
      availableCount: 0,
      totalCount: 0,
      secondsUntilRestock: 0,
      restockAt: null,
    };
  }

  const shopPurchase: ShopPurchase | undefined = purchases[type];
  const shopPurchasesRecord = shopPurchase?.purchases ?? {};
  const items = (rawShop.inventory ?? []).map((item) => buildShopItem(item, shopPurchasesRecord));
  const availableCount = items.filter((item) => item.isAvailable).length;

  const secondsUntilRestock = rawShop.secondsUntilRestock ?? 0;
  const restockAt = secondsUntilRestock > 0 ? Date.now() + secondsUntilRestock * 1000 : null;

  return {
    type,
    items,
    availableCount,
    totalCount: items.length,
    secondsUntilRestock,
    restockAt,
  };
}

function buildData(sources: ShopsSources): ShopsData {
  const rawShops = sources.shops;
  const purchases = sources.purchases ?? {};

  const shops: Shop[] = resolveShopTypes(rawShops).map((type) =>
    buildShop(type, rawShops?.[type as keyof RawShops], purchases)
  );

  const byType = shops.reduce((acc, shop) => {
    acc[shop.type] = shop;
    return acc;
  }, {} as Record<ShopType, Shop>);

  const shopsWithRestock = shops.filter((s) => s.restockAt !== null);
  let nextRestock: ShopsData["nextRestock"] = null;

  if (shopsWithRestock.length > 0) {
    const sorted = shopsWithRestock.sort((a, b) => (a.restockAt ?? 0) - (b.restockAt ?? 0));
    const first = sorted[0];
    nextRestock = {
      shop: first.type,
      seconds: first.secondsUntilRestock,
      at: first.restockAt!,
    };
  }

  return {
    all: shops,
    byType,
    nextRestock,
  };
}

const initialData: ShopsData = {
  all: KNOWN_SHOP_TYPES.map((type) => ({
    type,
    items: [],
    availableCount: 0,
    totalCount: 0,
    secondsUntilRestock: 0,
    restockAt: null,
  })),
  byType: {
    seed: { type: "seed", items: [], availableCount: 0, totalCount: 0, secondsUntilRestock: 0, restockAt: null },
    tool: { type: "tool", items: [], availableCount: 0, totalCount: 0, secondsUntilRestock: 0, restockAt: null },
    egg: { type: "egg", items: [], availableCount: 0, totalCount: 0, secondsUntilRestock: 0, restockAt: null },
    decor: { type: "decor", items: [], availableCount: 0, totalCount: 0, secondsUntilRestock: 0, restockAt: null },
    dawn: { type: "dawn", items: [], availableCount: 0, totalCount: 0, secondsUntilRestock: 0, restockAt: null },
  },
  nextRestock: null,
};

function getStableKey(data: ShopsData): string {
  return JSON.stringify({
    shops: data.all.map((s) => ({
      type: s.type,
      itemCount: s.items.length,
      availableCount: s.availableCount,
    })),
  });
}

function detectRestockForType(prev: Shop, next: Shop): ShopRestockEvent | null {
  const prevSeconds = prev.secondsUntilRestock;
  const nextSeconds = next.secondsUntilRestock;

  const hasRestocked =
    (prevSeconds > 0 && prevSeconds <= 5 && nextSeconds > prevSeconds) ||
    (prevSeconds > 0 && nextSeconds === 0 && next.items.some((item) => item.purchased === 0));

  if (!hasRestocked) return null;

  return {
    shop: next,
    previousItems: prev.items,
  };
}

function detectPurchaseEvents(prev: ShopsData, next: ShopsData): ShopPurchaseEvent[] {
  const events: ShopPurchaseEvent[] = [];

  for (const nextShop of next.all) {
    const shopType = nextShop.type;
    // A shop the previous snapshot did not have yet has nothing to diff against.
    const prevShop = prev.byType[shopType];
    if (!prevShop) continue;

    const prevItemMap = new Map(prevShop.items.map((i) => [i.id, i]));

    for (const nextItem of nextShop.items) {
      const prevItem = prevItemMap.get(nextItem.id);
      if (prevItem && nextItem.purchased > prevItem.purchased) {
        events.push({
          shopType,
          itemId: nextItem.id,
          quantity: nextItem.purchased - prevItem.purchased,
          newPurchased: nextItem.purchased,
          remaining: nextItem.remaining,
        });
      }
    }
  }

  return events;
}

function detectAvailabilityChanges(prev: ShopsData, next: ShopsData): ShopAvailabilityChange[] {
  const changes: ShopAvailabilityChange[] = [];

  for (const nextShop of next.all) {
    const shopType = nextShop.type;
    const prevShop = prev.byType[shopType];
    if (!prevShop) continue;

    const prevItemMap = new Map(prevShop.items.map((i) => [i.id, i]));

    for (const nextItem of nextShop.items) {
      const prevItem = prevItemMap.get(nextItem.id);
      if (prevItem && prevItem.isAvailable !== nextItem.isAvailable) {
        changes.push({
          shopType,
          itemId: nextItem.id,
          wasAvailable: prevItem.isAvailable,
          isAvailable: nextItem.isAvailable,
        });
      }
    }
  }

  return changes;
}

type ListenerSets = {
  all: Set<(value: ShopsData, prev: ShopsData) => void>;
  stable: Set<(value: ShopsData, prev: ShopsData) => void>;
  seedRestock: Set<(event: ShopRestockEvent) => void>;
  toolRestock: Set<(event: ShopRestockEvent) => void>;
  eggRestock: Set<(event: ShopRestockEvent) => void>;
  decorRestock: Set<(event: ShopRestockEvent) => void>;
  dawnRestock: Set<(event: ShopRestockEvent) => void>;
  purchase: Set<(event: ShopPurchaseEvent) => void>;
  availability: Set<(event: ShopAvailabilityChange) => void>;
};

function createShopsGlobal(): ShopsGlobal {
  let currentData: ShopsData = initialData;
  let previousData: ShopsData = initialData;
  let initialized = false;
  const unsubscribes: Unsubscribe[] = [];

  const listeners: ListenerSets = {
    all: new Set(),
    stable: new Set(),
    seedRestock: new Set(),
    toolRestock: new Set(),
    eggRestock: new Set(),
    decorRestock: new Set(),
    dawnRestock: new Set(),
    purchase: new Set(),
    availability: new Set(),
  };

  const sources: Partial<ShopsSources> = {};
  const ready = new Set<keyof ShopsSources>();
  const sourceCount = 2;

  function notify(): void {
    if (ready.size < sourceCount) return;

    const nextData = buildData(sources as ShopsSources);

    if (deepEqual(currentData, nextData)) return;

    previousData = currentData;
    currentData = nextData;

    if (!initialized) return;

    for (const cb of listeners.all) {
      cb(currentData, previousData);
    }

    if (getStableKey(previousData) !== getStableKey(currentData)) {
      for (const cb of listeners.stable) {
        cb(currentData, previousData);
      }
    }

    // Only the five long-standing shops have a dedicated listener set; a shop
    // the game added later still reaches subscribers through `listeners.all`.
    const restockListeners: Partial<Record<ShopType, Set<(event: ShopRestockEvent) => void>>> = {
      seed: listeners.seedRestock,
      tool: listeners.toolRestock,
      egg: listeners.eggRestock,
      decor: listeners.decorRestock,
      dawn: listeners.dawnRestock,
    };

    for (const currentShop of currentData.all) {
      const previousShop = previousData.byType[currentShop.type];
      if (!previousShop) continue;

      const restockEvent = detectRestockForType(previousShop, currentShop);
      if (!restockEvent) continue;

      for (const cb of restockListeners[currentShop.type] ?? []) {
        cb(restockEvent);
      }
    }

    const purchaseEvents = detectPurchaseEvents(previousData, currentData);
    for (const event of purchaseEvents) {
      for (const cb of listeners.purchase) {
        cb(event);
      }
    }

    const availabilityChanges = detectAvailabilityChanges(previousData, currentData);
    for (const change of availabilityChanges) {
      for (const cb of listeners.availability) {
        cb(change);
      }
    }
  }

  function readSources(): ShopsSources {
    const gs = getGameState();
    const slot = getMySlot();
    return {
      shops: (gs?.shops as RawShops) ?? null,
      purchases: (slot?.data?.shopPurchases ?? {}) as ShopPurchases,
    };
  }

  function onStateChange(): void {
    const next = readSources();
    sources.shops = next.shops;
    sources.purchases = next.purchases;
    ready.add("shops");
    ready.add("purchases");
    notify();
  }

  function init(): void {
    if (initialized) return;

    // Read initial state
    onStateChange();
    if (initialized) {
      currentData = buildData(sources as ShopsSources);
    }

    unsubscribes.push(wsSubscribe("shops", onStateChange));
    unsubscribes.push(wsSubscribe("mySlot", onStateChange));

    initialized = true;
  }

  init();

  return {
    get(): ShopsData {
      return currentData;
    },

    getShop(type: ShopType): Shop {
      return currentData.byType[type];
    },

    getItem(shopType: ShopType, itemId: string): ShopItem | null {
      const shop = currentData.byType[shopType];
      return shop.items.find((item) => item.id === itemId) ?? null;
    },

    subscribe(callback: (value: ShopsData, prev: ShopsData) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.all.add(callback);
      if (options?.immediate !== false && initialized && initialized) {
        callback(currentData, currentData);
      }
      return () => listeners.all.delete(callback);
    },

    subscribeStable(callback: (value: ShopsData, prev: ShopsData) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.stable.add(callback);
      if (options?.immediate !== false && initialized && initialized) {
        callback(currentData, currentData);
      }
      return () => listeners.stable.delete(callback);
    },

    subscribeSeedRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.seedRestock.add(callback);
      if (options?.immediate && initialized && initialized) {
        callback({ shop: currentData.byType.seed, previousItems: [] });
      }
      return () => listeners.seedRestock.delete(callback);
    },

    subscribeToolRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.toolRestock.add(callback);
      if (options?.immediate && initialized && initialized) {
        callback({ shop: currentData.byType.tool, previousItems: [] });
      }
      return () => listeners.toolRestock.delete(callback);
    },

    subscribeEggRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.eggRestock.add(callback);
      if (options?.immediate && initialized && initialized) {
        callback({ shop: currentData.byType.egg, previousItems: [] });
      }
      return () => listeners.eggRestock.delete(callback);
    },

    subscribeDecorRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.decorRestock.add(callback);
      if (options?.immediate && initialized && initialized) {
        callback({ shop: currentData.byType.decor, previousItems: [] });
      }
      return () => listeners.decorRestock.delete(callback);
    },

    subscribeDawnRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.dawnRestock.add(callback);
      if (options?.immediate && initialized && initialized) {
        callback({ shop: currentData.byType.dawn, previousItems: [] });
      }
      return () => listeners.dawnRestock.delete(callback);
    },

    subscribePurchase(callback: (event: ShopPurchaseEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.purchase.add(callback);
      if (options?.immediate && initialized && initialized) {
        for (const shop of currentData.all) {
          for (const item of shop.items) {
            if (item.purchased > 0) {
              callback({ shopType: shop.type, itemId: item.id, quantity: item.purchased, newPurchased: item.purchased, remaining: item.remaining });
            }
          }
        }
      }
      return () => listeners.purchase.delete(callback);
    },

    subscribeAvailability(callback: (event: ShopAvailabilityChange) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.availability.add(callback);
      if (options?.immediate && initialized && initialized) {
        for (const shop of currentData.all) {
          for (const item of shop.items) {
            callback({ shopType: shop.type, itemId: item.id, wasAvailable: item.isAvailable, isAvailable: item.isAvailable });
          }
        }
      }
      return () => listeners.availability.delete(callback);
    },

    destroy(): void {
      for (const unsub of unsubscribes) {
        unsub();
      }
      unsubscribes.length = 0;
      listeners.all.clear();
      listeners.stable.clear();
      listeners.seedRestock.clear();
      listeners.toolRestock.clear();
      listeners.eggRestock.clear();
      listeners.decorRestock.clear();
      listeners.dawnRestock.clear();
      listeners.purchase.clear();
      listeners.availability.clear();
      initialized = false;
    },
  };
}

let instance: ShopsGlobal | null = null;

export function destroyShops(): void { instance?.destroy(); instance = null; }

export function getShops(): ShopsGlobal {
  if (!instance) {
    instance = createShopsGlobal();
  }
  return instance;
}
