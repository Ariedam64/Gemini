// src/store/shops.state.ts
// Pure state + subscriptions. No dependency on Jotai/Store here.

import { shops } from "../../data/shops";

// ----------------------------- Types -----------------------------

export type ShopRestock = {
  shop: string;
  secondsUntilRestock: number; // raw value returned by the atom
};

export type ShopItems = {
  shop: string;
  key: string;        // "Seed:Carrot" / "Tool:Shovel" / ...
  stock: number;
  purchased: number;
};

/*
EXAMPLES:

_state (ShopItems[])
[
  { shop: "seed",  key: "Seed:Carrot",      stock: 23 },
  { shop: "seed",  key: "Seed:Strawberry",  stock:  2 },
  { shop: "tool",  key: "Tool:WateringCan", stock:  3 },
  { shop: "egg",   key: "Egg:CommonEgg",    stock:  2 },
  { shop: "decor", key: "Decor:SmallRock",  stock:  5 },
]

_restocks (ShopRestock[])
[
  { shop: "seed",  secondsUntilRestock: 248 },
  { shop: "tool",  secondsUntilRestock: 548 },
  { shop: "egg",   secondsUntilRestock: 548 },
  { shop: "decor", secondsUntilRestock: 548 },
]
*/

// ------------------------- In-memory state -------------------------

let _restocks: ShopRestock[] = [];
let _state:    ShopItems[]   = [];

// -------------------------- Subscriptions ---------------------------

const subsRestocks  = new Set<(rows: ShopRestock[]) => void>();
const subsItemState = new Set<(rows: ShopItems[]) => void>();

// --------------------------- Helpers --------------------------

function eqStateRows(A: ShopItems[] | null, B: ShopItems[]): boolean {
  if (!A || A.length !== B.length) return false;
  for (let i = 0; i < A.length; i++) {
    const a = A[i], b = B[i];
    if (a.shop !== b.shop || a.key !== b.key) return false;
    if (a.stock !== b.stock) return false;
    if (a.purchased !== b.purchased) return false;
  }
  return true;
}

function eqRestockRows(A: ShopRestock[] | null, B: ShopRestock[]): boolean {
  if (!A || A.length !== B.length) return false;
  for (let i = 0; i < A.length; i++) {
    const a = A[i], b = B[i];
    if (a.shop !== b.shop) return false;
    if (a.secondsUntilRestock !== b.secondsUntilRestock) return false;
  }
  return true;
}

// ------------------------- Internal setters -----------------------

export function _setShopItems(next: ShopItems[]) {
  if (eqStateRows(_state, next)) return;
  _state = next;
  _version.state++;
  _invalidateDerived();
  for (const fn of subsItemState) { try { fn(_state); } catch {} }
}

export function _setShopRestocks(next: ShopRestock[]) {
  if (eqRestockRows(_restocks, next)) return;
  _restocks = next;
  _version.restocks++;
  for (const fn of subsRestocks) { try { fn(_restocks); } catch {} }
}

// --------------------------- Read API --------------------------

export function getShopItems(): ShopItems[] { return _state; }
export function getShopRestocks(): ShopRestock[] { return _restocks; }

// ------------------------- Subscription API ------------------------

export function onShopItems(cb: (rows: ShopItems[]) => void): () => void {
  subsItemState.add(cb);
  try { cb(_state); } catch {}
  return () => { subsItemState.delete(cb); };
}

export function onShopRestocks(cb: (rows: ShopRestock[]) => void): () => void {
  subsRestocks.add(cb);
  try { cb(_restocks); } catch {}
  return () => { subsRestocks.delete(cb); };
}

// --------------------- reset (for cleanup/tests) ----------------

export function _resetShopState() {
  _restocks = [];
  _state = [];
  subsRestocks.clear();
  subsItemState.clear();
  _version.state = _version.restocks = 0;
  _invalidateDerived();
}

// ========================== HELPFUL UTILITIES =========================

/** List of known shops derived from current states. */
export function getShopsIds(): string[] {
  const set = new Set<string>();
  for (const r of _state) set.add(r.shop);
  for (const r of _restocks) set.add(r.shop);
  return Array.from(set);
}

/** Split "Type:Id" when needed. */
export function parseKey(key: string): { type: string; id: string } {
  const i = key.indexOf(":");
  if (i < 0) return { type: key, id: "" };
  return { type: key.slice(0, i), id: key.slice(i + 1) };
}

/** Logical order derived from the items stream (preserves server inventory order). */
export function getOrder(shop: string): string[] {
  const order: string[] = [];
  const seen = new Set<string>();
  for (const r of _state) {
    if (r.shop !== shop) continue;
    if (!seen.has(r.key)) { seen.add(r.key); order.push(r.key); }
  }
  return order;
}

export function getRestockFor(shop: string): ShopRestock | undefined {
  return _restocks.find(r => r.shop === shop);
}

/** Seconds remaining before restock, straight from state. */
export function secUntilRestock(shop: string): number | null {
  const r = getRestockFor(shop);
  return r ? Math.max(0, Number(r.secondsUntilRestock) || 0) : null;
}

export function getStocksFor(shop: string): Map<string, { stock: number }> {
  const map = new Map<string, { stock: number }>();
  for (const r of _state) if (r.shop === shop) map.set(r.key, { stock: r.stock });
  return map;
}

export function getStock(shop: string, key: string): { stock: number } | undefined {
  for (const r of _state) if (r.shop === shop && r.key === key) return { stock: r.stock };
  return undefined;
}

export function availableInOrder(shop: string): string[] {
  const order = getOrder(shop);
  if (!order.length) return [];
  const set = new Set(_state.filter(r => r.shop === shop && r.stock > 0).map(r => r.key));
  return order.filter(k => set.has(k));
}

export function getFirstAvailable(shop: string): string | null {
  const list = availableInOrder(shop);
  return list.length ? list[0] : null;
}

export function findItemState(shop: string, predicate: (row: ShopItems) => boolean): ShopItems | undefined {
  for (const r of _state) if (r.shop === shop && predicate(r)) return r;
  return undefined;
}

export function findByKey(shop: string, key: string): ShopItems | undefined {
  return findItemState(shop, r => r.key === key);
}

function getConfiguredResetSec(shop: string): number | null {
  const s = (shops as Record<string, { reset?: number } | undefined>)[shop];
  const v = s?.reset;
  return typeof v === "number" && v > 0 ? v : null;
}

export function selectedAvailableForShop(selectedKeys: string[], shop: string): ShopItems[] {
  if (!Array.isArray(selectedKeys) || !shop) return [];
  const selected = new Set(selectedKeys);
  // keys already filtered by stock>0 and ordered server-side
  const availKeys = availableInOrder(shop);
  const pickedKeys = availKeys.filter(k => selected.has(k));
  const rows: ShopItems[] = [];
  for (const key of pickedKeys) {
    const r = findByKey(shop, key);
    if (r) rows.push(r); // r.stock > 0 is guaranteed by availableInOrder
  }
  return rows;
}

/* ------------------- Filtered subscriptions (shop-scoped) -------------------- */

export function onShopItemsFor(shop: string, cb: (order: string[]) => void): () => void {
  return onShopItems(() => {
    try { cb(getOrder(shop)); } catch {}
  });
}

export function onShopRestockFor(shop: string, cb: (r: ShopRestock | undefined) => void): () => void {
  return onShopRestocks(rows => {
    try { cb(rows.find(x => x.shop === shop)); } catch {}
  });
}

/** Event "reset": fired when secondsUntilRestock == shops[shop].reset */
export function onAnyShopReset(
  cb: (shop: string, row: ShopRestock) => void,
  opts?: { shops?: string[]; fireInitial?: boolean }
): () => void {
  let watched = (opts?.shops && opts?.shops.length) ? opts.shops.slice() : getShopsIds();

  const targets = new Map<string, number>();
  for (const k of watched) {
    const v = getConfiguredResetSec(k);
    if (v != null) targets.set(k, v);
  }
  const locked = new Map<string, boolean>();
  for (const k of watched) locked.set(k, false);

  let firstPulse = !(opts?.fireInitial === true);

  const off = onShopRestocks((rows) => {
    const seen = new Set(getShopsIds());
    for (const k of seen) {
      if (!targets.has(k)) {
        const v = getConfiguredResetSec(k);
        if (v != null) targets.set(k, v);
      }
      if (!locked.has(k)) locked.set(k, false);
    }
    watched = Array.from(seen);

    if (firstPulse) { firstPulse = false; return; }

    for (const shop of watched) {
      const target = targets.get(shop);
      if (target == null) continue;

      const row = rows.find(r => r.shop === shop);
      if (!row) continue;

      const secLeft = Math.max(0, Number(row.secondsUntilRestock) || 0);
      const isLocked = locked.get(shop)!;

      if (secLeft === target) {
        if (!isLocked) {
          locked.set(shop, true);
          try { cb(shop, row); } catch {}
        }
        continue;
      }
      if (secLeft < target && isLocked) {
        locked.set(shop, false);
      }
    }
  });

  return () => { off(); };
}

/** Virtual tick based on pushes — no interval needed. */
export function onRestockTick(
  shop: string,
  cb: (secLeft: number | null) => void
): () => void {
  let stop = false;
  try { cb(secUntilRestock(shop)); } catch {}
  const off = onShopRestockFor(shop, () => { if (!stop) try { cb(secUntilRestock(shop)); } catch {} });
  return () => { stop = true; off(); };
}

export function onShopReset(shop: string, cb: () => void): () => void {
  const target = getConfiguredResetSec(shop);
  if (target == null) return () => {};
  let locked = false;
  return onRestockTick(shop, (secLeft) => {
    if (secLeft == null) return;
    if (secLeft === target) {
      if (!locked) { locked = true; try { cb(); } catch {} }
      return;
    }
    if (secLeft < target) locked = false;
  });
}

// =================== Memoized derived values (optional) ===================

const _version = { state: 0, restocks: 0 };
let __cache: {
  stateByShop?: Map<string, ShopItems[]>;
  stateMapByShop?: Map<string, Map<string, { stock: number }>>;
  vState: number;
} | null = null;

function _invalidateDerived() { __cache = null; }

function _ensureDerived() {
  if (__cache && __cache.vState === _version.state) return __cache;

  const stateByShop = new Map<string, ShopItems[]>();
  for (const r of _state) {
    const arr = stateByShop.get(r.shop) ?? [];
    arr.push(r);
    stateByShop.set(r.shop, arr);
  }

  const stateMapByShop = new Map<string, Map<string, { stock: number }>>();
  for (const [shop, arr] of stateByShop) {
    const m = new Map<string, { stock: number }>();
    for (const r of arr) m.set(r.key, { stock: r.stock });
    stateMapByShop.set(shop, m);
  }

  __cache = { stateByShop, stateMapByShop, vState: _version.state };
  return __cache;
}

export function getStateByShopMemo(): Map<string, ShopItems[]> {
  return _ensureDerived().stateByShop!;
}
export function getStateMapByShopMemo(): Map<string, Map<string, { stock: number }>> {
  return _ensureDerived().stateMapByShop!;
}
