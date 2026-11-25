// src/globals/variables/shopsRestock.check.test.ts
/**
 * BR-70: restock detection covers every shop the state carries, weather shops
 * (rain, snow, amber, thunder...) included, not only the five historic ones.
 *
 * Pure logic only: hand-written `ShopsData`, no WebSocket state, no DOM.
 * `shops.ts` cannot be imported in a node environment (it reads the game state).
 *
 * `./shopsRestock` is loaded through `import.meta.glob` rather than a static
 * import, so that while the module does not exist the check fails on an
 * assertion (the behaviour is missing) instead of a resolution error, and
 * typecheck stays green.
 */

import { describe, expect, it } from "vitest";
import type { Shop, ShopItem, ShopRestockEvent, ShopType, ShopsData } from "../core/types";

/** The public surface `variables/shopsRestock.ts` must expose. */
interface ShopsRestockModule {
  detectRestockForType(prev: Shop, next: Shop): ShopRestockEvent | null;
  collectRestockEvents(
    prev: ShopsData,
    next: ShopsData
  ): Array<{ type: ShopType; event: ShopRestockEvent }>;
}

const restockModules = import.meta.glob<ShopsRestockModule>("./shopsRestock.ts");

async function loadRestock(): Promise<ShopsRestockModule> {
  const load = restockModules["./shopsRestock.ts"];
  expect(
    load,
    "src/globals/variables/shopsRestock.ts must exist and export detectRestockForType and collectRestockEvents"
  ).toBeDefined();
  const mod = await (load as () => Promise<ShopsRestockModule>)();
  expect(typeof mod.detectRestockForType).toBe("function");
  expect(typeof mod.collectRestockEvents).toBe("function");
  return mod;
}

function potion(id: string, purchased: number): ShopItem {
  const initialStock = 3;
  const remaining = Math.max(0, initialStock - purchased);
  return {
    id,
    itemType: "Tool",
    initialStock,
    purchased,
    remaining,
    isAvailable: remaining > 0,
    price: 1000,
  };
}

function shop(type: ShopType, secondsUntilRestock: number, items: ShopItem[]): Shop {
  return {
    type,
    items,
    availableCount: items.filter((entry) => entry.isAvailable).length,
    totalCount: items.length,
    secondsUntilRestock,
    restockAt: secondsUntilRestock > 0 ? 1_700_000_000_000 + secondsUntilRestock * 1000 : null,
  };
}

function data(shops: Shop[]): ShopsData {
  const byType = {} as Record<ShopType, Shop>;
  for (const entry of shops) byType[entry.type] = entry;
  return { all: shops, byType, nextRestock: null };
}

describe("BR-70 restock of every shop", () => {
  it("emits a restock event for the rain shop when its timer goes from 3 to 600", async () => {
    const { collectRestockEvents } = await loadRestock();
    const prev = data([
      shop("seed", 120, []),
      shop("rain", 3, [potion("RainPotion", 3)]),
    ]);
    const next = data([
      shop("seed", 119, []),
      shop("rain", 600, [potion("RainPotion", 0)]),
    ]);

    const events = collectRestockEvents(prev, next);
    const rain = events.filter((entry) => entry.type === "rain");
    expect(rain).toHaveLength(1);
    expect(rain[0].event.shop.type).toBe("rain");
    expect(rain[0].event.previousItems.map((entry) => entry.id)).toEqual(["RainPotion"]);
    // seed did not restock.
    expect(events.some((entry) => entry.type === "seed")).toBe(false);
  });

  it("still reports a historic shop (seed) through the same function", async () => {
    const { collectRestockEvents } = await loadRestock();
    const prev = data([shop("seed", 2, [])]);
    const next = data([shop("seed", 300, [])]);
    expect(collectRestockEvents(prev, next).map((entry) => entry.type)).toEqual(["seed"]);
  });

  it("skips a shop present in next but absent from prev.byType, without throwing", async () => {
    const { collectRestockEvents } = await loadRestock();
    const prev = data([shop("seed", 120, [])]);
    const next = data([
      shop("seed", 119, []),
      shop("thunder", 600, [potion("ThunderPotion", 0)]),
    ]);

    expect(() => collectRestockEvents(prev, next)).not.toThrow();
    expect(collectRestockEvents(prev, next)).toEqual([]);
  });
});
