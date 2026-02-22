import { shopsAtom, shopPurchasesView } from "../../atoms";
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

const SHOP_TYPES: ShopType[] = ["seed", "tool", "egg", "decor"];

function getItemId(rawItem: ShopInventoryItem, shopType: ShopType): string {
  switch (shopType) {
    case "seed":
      return rawItem.species ?? rawItem.itemType;
    case "tool":
      return rawItem.toolId ?? rawItem.itemType;
    case "egg":
      return rawItem.eggId ?? rawItem.itemType;
    case "decor":
      return rawItem.decorId ?? rawItem.itemType;
    default:
      return rawItem.itemType;
  }
}

function buildShopItem(
  rawItem: ShopInventoryItem,
  shopType: ShopType,
  purchases: Record<string, number>
): ShopItem {
  const id = getItemId(rawItem, shopType);
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
  const items = (rawShop.inventory ?? []).map((item) => buildShopItem(item, type, shopPurchasesRecord));
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

  const shops: Shop[] = SHOP_TYPES.map((type) =>
    buildShop(type, rawShops?.[type], purchases)
  );

  const byType = {
    seed: shops[0],
    tool: shops[1],
    egg: shops[2],
    decor: shops[3],
  };

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
  all: SHOP_TYPES.map((type) => ({
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

  for (const shopType of SHOP_TYPES) {
    const prevShop = prev.byType[shopType];
    const nextShop = next.byType[shopType];

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

  for (const shopType of SHOP_TYPES) {
    const prevShop = prev.byType[shopType];
    const nextShop = next.byType[shopType];

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

    const restockListeners: Record<ShopType, Set<(event: ShopRestockEvent) => void>> = {
      seed: listeners.seedRestock,
      tool: listeners.toolRestock,
      egg: listeners.eggRestock,
      decor: listeners.decorRestock,
    };

    for (const shopType of SHOP_TYPES) {
      const restockEvent = detectRestockForType(
        previousData.byType[shopType],
        currentData.byType[shopType]
      );
      if (restockEvent) {
        for (const cb of restockListeners[shopType]) {
          cb(restockEvent);
        }
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

  async function init(): Promise<void> {
    if (initialized) return;

    const unsub1 = await shopsAtom.onChangeNow((value) => {
      sources.shops = value;
      ready.add("shops");
      notify();
    });
    unsubscribes.push(unsub1);

    const unsub2 = await shopPurchasesView.onChangeNow((value) => {
      sources.purchases = value;
      ready.add("purchases");
      notify();
    });
    unsubscribes.push(unsub2);

    initialized = true;

    if (ready.size === sourceCount) {
      currentData = buildData(sources as ShopsSources);
    }
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
      if (options?.immediate !== false && initialized && ready.size === sourceCount) {
        callback(currentData, currentData);
      }
      return () => listeners.all.delete(callback);
    },

    subscribeStable(callback: (value: ShopsData, prev: ShopsData) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.stable.add(callback);
      if (options?.immediate !== false && initialized && ready.size === sourceCount) {
        callback(currentData, currentData);
      }
      return () => listeners.stable.delete(callback);
    },

    subscribeSeedRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.seedRestock.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        callback({ shop: currentData.byType.seed, previousItems: [] });
      }
      return () => listeners.seedRestock.delete(callback);
    },

    subscribeToolRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.toolRestock.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        callback({ shop: currentData.byType.tool, previousItems: [] });
      }
      return () => listeners.toolRestock.delete(callback);
    },

    subscribeEggRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.eggRestock.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        callback({ shop: currentData.byType.egg, previousItems: [] });
      }
      return () => listeners.eggRestock.delete(callback);
    },

    subscribeDecorRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.decorRestock.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        callback({ shop: currentData.byType.decor, previousItems: [] });
      }
      return () => listeners.decorRestock.delete(callback);
    },

    subscribePurchase(callback: (event: ShopPurchaseEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.purchase.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
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
      if (options?.immediate && initialized && ready.size === sourceCount) {
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
      listeners.purchase.clear();
      listeners.availability.clear();
      initialized = false;
    },
  };
}

let instance: ShopsGlobal | null = null;

export function getShops(): ShopsGlobal {
  if (!instance) {
    instance = createShopsGlobal();
  }
  return instance;
}
