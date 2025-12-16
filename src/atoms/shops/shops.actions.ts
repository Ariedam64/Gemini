import { shops as shopsAtom, myShopPurchases } from "../atoms";
import {
  ShopRestock,
  ShopItems,
  _setShopItems,
  _setShopRestocks,
  parseKey,
  getShopItems
} from "./shops.state";

import { sig } from "../views";

/* ------------------------- Server-side types ------------------------- */

type ServerShop = {inventory: any[]; secondsUntilRestock: number };
type ShopsState = Partial<Record<string, ServerShop>>;
type PurchasesState = {
  [shop: string]: {
    createdAt: number;
    purchases: Record<string, number>; // "Carrot" -> 9
  };
};

/* -------------------------------- Builders -------------------------------- */

function keyOfItem(_shopId: string, item: any): string {
  const keys = Object.keys(item);
  return `${item[keys[0]]}:${item[keys[1]]}`;
}

function buildShopItems(state: ShopsState): Omit<ShopItems, "purchased">[] {
  const out: Omit<ShopItems, "purchased">[] = [];
  for (const [shop, s] of Object.entries(state)) {
    if (!s?.inventory) continue;
    for (const it of s.inventory) {
      out.push({
        shop,
        key: keyOfItem(shop, it),
        stock: Number(it?.initialStock ?? 0),
      });
    }
  }
  return out;
}

function buildRestocks(state: ShopsState): ShopRestock[] {
  const out: ShopRestock[] = [];
  for (const [shop, s] of Object.entries(state)) {
    if (!s) continue;
    const sec = Math.max(0, Number(s.secondsUntilRestock ?? 0));
    out.push({ shop, secondsUntilRestock: sec });
  }
  return out;
}

/* ------------------------------ Orchestration ------------------------------ */

export async function startOnChangeAtom() {
  await shopsAtom.onChangeNow((shops) => {
    const state: ShopsState = shops || {};
    const base = buildShopItems(state);
    const prev = getShopItems();
    const merged: ShopItems[] = base.map(row => {
      const prevRow = prev.find(p => p.shop === row.shop && p.key === row.key);
      return {
        ...row,
        purchased: prevRow?.purchased ?? 0,
      };
    });

    _setShopItems(merged);
    _setShopRestocks(buildRestocks(state));
  });

  await startOnChangePurchases();
}

export function stopOnChangeAtom() {
  shopsAtom.stopOnChange();
}

export async function startOnChangePurchases() {
  const chan = sig.record<PurchasesState>(myShopPurchases, {
    fields: ["purchases"],
  });

  await chan.sub(({ value }) => {
    const snap = value || {};
    const prev = getShopItems();
    let changed = false;

    const next: ShopItems[] = prev.map(row => {
      const { id } = parseKey(row.key); // "Seed:Carrot" -> "Carrot"
      const shopPurch = snap[row.shop]?.purchases;
      const purchased = shopPurch ? Number(shopPurch[id] ?? 0) : 0;

      if (row.purchased === purchased) return row;

      changed = true;
      return { ...row, purchased };
    });

    if (changed) {
      _setShopItems(next);
    }
  });
}
