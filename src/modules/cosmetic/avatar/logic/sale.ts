// src/modules/cosmetic/avatar/logic/sale.ts
/**
 * Sale metadata of avatar cosmetics (`/data/avatar-cosmetics`): join onto the
 * catalog, Spooky Shop novelties first, and a one-line description.
 *
 * Pure logic: no DOM, no network.
 */

import type { CosmeticInfo } from "../types";

/** One entry of `/data/avatar-cosmetics`. A missing flag means false. */
export interface ApiAvatarCosmeticMeta {
  id?: string;
  filename?: string;
  cost?: { currency: string; amount: number };
  expiryDate?: string;
  newAtSpookyShop?: boolean;
  soldAtSpookyShop?: boolean;
}

function applyMeta(item: CosmeticInfo, m: ApiAvatarCosmeticMeta): CosmeticInfo {
  const enriched: CosmeticInfo = {
    ...item,
    newAtSpookyShop: m.newAtSpookyShop === true,
    soldAtSpookyShop: m.soldAtSpookyShop === true,
  };
  const cost = m.cost;
  if (cost && typeof cost.amount === "number" && Number.isFinite(cost.amount)) {
    enriched.cost = { currency: String(cost.currency), amount: cost.amount };
    enriched.price = cost.amount;
  }
  if (typeof m.expiryDate === "string") {
    enriched.expiryDate = m.expiryDate;
  }
  return enriched;
}

/**
 * Copy sale metadata onto catalog items, joined by id, with a fallback on
 * filename (the game keys some entries with `.png`, Gemini ids do not).
 * Items without metadata are returned as they are.
 */
export function enrichWithSaleData(
  items: CosmeticInfo[],
  meta: Record<string, ApiAvatarCosmeticMeta> | null | undefined
): CosmeticInfo[] {
  if (!meta || typeof meta !== "object") return items;

  const byFilename = new Map<string, ApiAvatarCosmeticMeta>();
  for (const entry of Object.values(meta)) {
    if (entry && typeof entry.filename === "string") {
      byFilename.set(entry.filename, entry);
    }
  }

  return items.map((item) => {
    const own = Object.prototype.hasOwnProperty.call(meta, item.id) ? meta[item.id] : undefined;
    const m = own ?? byFilename.get(item.filename);
    return m ? applyMeta(item, m) : item;
  });
}

/** Spooky Shop novelties first, original order kept within each group. */
export function sortNewSpookyFirst(items: CosmeticInfo[]): CosmeticInfo[] {
  return [
    ...items.filter((item) => item.newAtSpookyShop === true),
    ...items.filter((item) => item.newAtSpookyShop !== true),
  ];
}

/** `YYYY-MM-DD` in UTC, or null for a date that does not parse. */
function formatDay(value: string): string | null {
  const date = new Date(value);
  if (isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

/**
 * One line for the outfit picker, e.g. `New · 329 credits · until 2026-11-10`.
 * Null when there is nothing to say.
 */
export function describeSale(item: CosmeticInfo): string | null {
  const parts: string[] = [];
  if (item.newAtSpookyShop === true) parts.push("New");
  if (item.cost) parts.push(`${item.cost.amount} ${item.cost.currency}`);
  if (typeof item.expiryDate === "string") {
    const day = formatDay(item.expiryDate);
    if (day) parts.push(`until ${day}`);
  }
  return parts.length > 0 ? parts.join(" · ") : null;
}
