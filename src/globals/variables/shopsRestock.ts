/**
 * Restock detection, kept pure so it can be checked without the game state.
 *
 * It covers every shop the state carries (the weather shops `rain`, `snow`,
 * `amber`, `thunder`... included), not only the five historic ones.
 */

import type { Shop, ShopRestockEvent, ShopType, ShopsData } from "../core/types";

export function detectRestockForType(prev: Shop, next: Shop): ShopRestockEvent | null {
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

/**
 * Every shop that restocked between two snapshots.
 *
 * A shop the previous snapshot did not have yet has nothing to diff against
 * and is skipped.
 */
export function collectRestockEvents(
  prev: ShopsData,
  next: ShopsData
): Array<{ type: ShopType; event: ShopRestockEvent }> {
  const events: Array<{ type: ShopType; event: ShopRestockEvent }> = [];

  for (const nextShop of next.all) {
    const prevShop = prev.byType[nextShop.type] as Shop | undefined;
    if (!prevShop) continue;

    const event = detectRestockForType(prevShop, nextShop);
    if (event) events.push({ type: nextShop.type, event });
  }

  return events;
}
