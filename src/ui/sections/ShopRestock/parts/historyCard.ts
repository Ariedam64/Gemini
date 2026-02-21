/**
 * Shop Restock - History Card
 */

import { Card } from "../../../components/Card/Card";
import { Table, ColDef } from "../../../components/Table/Table";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { element } from "../../../styles/helpers";
import { MGShopRestock } from "../../../../features/shopRestock";
import { MGSprite } from "../../../../modules";
import type { TrackedShopType } from "../../../../features/shopRestock/types";
import { getShops } from "../../../../globals";
import { EVENTS, FEATURE_KEYS } from "../../../../utils/storage";
import { dispatchCustomEventAll } from "../../../../utils/windowContext";
import { getCoinPrice, getExpiryDateMs, getItemName, getRarity, getSpriteId } from "./itemMeta";

export interface HistoryCardPart {
  root: HTMLElement;
  destroy(): void;
}

interface RowData {
  itemId: string;
  itemName: string;
  shopType: TrackedShopType;
  spriteId: string | null;
  rarity: string | null;
  price: number;
  expiryMs: number | null;
  totalOccurrences: number;
  totalQuantity: number | null;
  lastSeen: number | null;
  tracked: boolean;
  // Computed for rendering
  heatPct: number; // 0-100
}


function formatPrice(value: number): string {
  if (!value || value < 1000) return `${value}`;
  const units = ["K", "M", "B", "T", "Q"];
  let v = value;
  let idx = -1;
  while (v >= 1000 && idx < units.length - 1) {
    v /= 1000;
    idx++;
  }
  const rounded = v >= 10 ? Math.round(v) : Math.round(v * 10) / 10;
  return `${rounded}${units[idx]}`;
}

function formatClock(ms: number | null): string {
  if (!ms) return "-";
  const dt = new Date(ms);
  return dt.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatRelativeDay(ms: number): string | null {
  const now = Date.now();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const dayMs = 86400000;
  const diffDays = Math.floor((startOfToday.getTime() - new Date(ms).setHours(0, 0, 0, 0)) / dayMs);
  if (!Number.isFinite(diffDays) || diffDays <= 0) return null;
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "always" });
  return rtf.format(-diffDays, "day");
}

function formatExactWhen(ms: number | null): { primary: string; secondary: string | null; title: string } {
  if (!ms) return { primary: "-", secondary: null, title: "-" };
  const dt = new Date(ms);
  const primary = formatClock(ms);
  const relative = formatRelativeDay(ms);
  const secondary = relative ?? null;
  const title = dt.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
  return { primary, secondary, title };
}

export function createHistoryCard(): HistoryCardPart {
  let query = "";

  let table: ReturnType<typeof Table<RowData>> | null = null;
  let currentMaxOccurrences = 1;
  const shopsGlobal = getShops();
  let shopsUnsub: (() => void) | null = null;
  const nowProvider = () => Date.now();

  const search = SearchBar({
    placeholder: "Search...",
    value: "",
    debounceMs: 150,
    withClear: true,
    size: "sm",
    blockGameKeys: true,
    onChange: (val) => {
      query = val.trim().toLowerCase();
      refresh();
    },
  });
  search.root.classList.add("search-bar");

  const columns: ColDef<RowData>[] = [
    {
      key: "item",
      header: "ITEM",
      width: "2.7fr",
      align: "left",
      sortable: false,
      render: (row) => {
        // Wrapper
        const cell = element("div", { className: "restock-item-cell" });

        // Icon with Rarity Border (Source Pip Removed)
        const rarity = row.rarity || 'common';
        const iconWrap = element("div", { className: `restock-icon-wrap rarity-${rarity}` });

        if (row.spriteId) {
          try {
            const canvas = MGSprite.toCanvas(row.spriteId);
            if (canvas) {
              canvas.className = "restock-item-sprite";
              iconWrap.appendChild(canvas);
            }
          } catch (e) { /* ignore */ }
        }

        // Text Info
        const info = element("div", { className: "restock-item-info" });
        const nameClass = `restock-text-${rarity}`;
        const name = element("div", { className: `restock-item-name ${nameClass}` }, row.itemName);

        // Tracked Star + Price
        const sub = element("div", { className: "restock-item-sub" });
        if (row.tracked) {
          const star = element("span", { className: "restock-tracked-icon" }, "★");
          sub.appendChild(star);
        }

        // Price with Coin Icon
        const price = element("span", { className: "restock-price-wrap" });
        try {
          const coinIcon = MGSprite.toCanvas("ui", "Coin");
          if (coinIcon) {
            coinIcon.className = "restock-coin-icon";
            price.appendChild(coinIcon);
          }
        } catch (e) { /* ignore */ }
        const valText = element("span", {}, formatPrice(row.price));
        price.appendChild(valText);

        sub.appendChild(price);

        info.append(name, sub);
        cell.append(iconWrap, info);
        return cell;
      },
    },
    {
      key: "qty",
      header: "QUANTITY",
      width: "90px",
      align: "center",
      sortable: false,
      render: (row) => {
        const val = element("div", {
          style: "font-variant-numeric: tabular-nums; font-weight: 600; opacity: 0.9;"
        }, row.totalQuantity != null ? formatPrice(row.totalQuantity) : "-");
        return val;
      }
    },
    {
      key: "last",
      header: "SEEN",
      width: "96px",
      align: "right",
      sortable: false,
      render: (row) => {
        const time = element("div", { className: "restock-time-cell" });
        const exact = formatExactWhen(row.lastSeen);
        time.title = exact.title;
        const main = element("div", { style: "font-weight: 600;" }, exact.primary);
        time.appendChild(main);
        if (exact.secondary) {
          const sub = element("div", { style: "opacity: 0.7; font-size: 11px;" }, exact.secondary);
          time.appendChild(sub);
        }
        return time;
      },
    },
  ];

  function buildRows(): RowData[] {
    const remote = new Map<string, ReturnType<typeof MGShopRestock.getHistoryForShop>[number]>();
    for (const item of MGShopRestock.getHistoryForShop("seed")) remote.set(`${item.shopType}:${item.itemId}`, item);
    for (const item of MGShopRestock.getHistoryForShop("egg")) remote.set(`${item.shopType}:${item.itemId}`, item);
    for (const item of MGShopRestock.getHistoryForShop("decor")) remote.set(`${item.shopType}:${item.itemId}`, item);

    let rows = Array.from(remote.values())
      .map((selected) => {

        // Filter out items that are not in the current game data (likely event/legacy)
        const price = getCoinPrice(selected.itemId, selected.shopType);
        const rarity = getRarity(selected.itemId, selected.shopType);
        const expiryMs = getExpiryDateMs(selected.itemId, selected.shopType);

        return {
          itemId: selected.itemId,
          itemName: getItemName(selected.itemId, selected.shopType),
          shopType: selected.shopType,
          spriteId: getSpriteId(selected.itemId, selected.shopType),
          rarity,
          price,
          expiryMs,
          totalOccurrences: selected.totalOccurrences,
          totalQuantity: selected.totalQuantity ?? null,
          lastSeen: selected.lastSeen,
          tracked: MGShopRestock.isTracked(selected.shopType, selected.itemId),
          heatPct: 0,
        } as RowData;
      })
      .filter((row): row is RowData => !!row)
      .filter((row) => !row.expiryMs || row.expiryMs > nowProvider())
      .filter((row) => !row.tracked);

    if (query) {
      rows = rows.filter(
        (row) =>
          row.itemId.toLowerCase().includes(query) ||
          row.itemName.toLowerCase().includes(query)
      );
    }

    currentMaxOccurrences = rows.reduce((max, r) => Math.max(max, r.totalOccurrences), 1);

    for (const row of rows) {
      row.heatPct = (row.totalOccurrences / currentMaxOccurrences) * 100;
    }

    // Sorting: Shop > Rarity > Price (Common -> Mythical, low -> high)
    const rarityWeights: Record<string, number> = {
      common: 0,
      uncommon: 1,
      rare: 2,
      legendary: 3,
      mythic: 4,
      mythical: 4,
      divine: 5,
      celestial: 6,
    };

    rows.sort((a, b) => {
      // 1. Shop Type
      // Custom order: Seed > Egg > Decor
      const shopOrder: Record<string, number> = { seed: 0, egg: 1, decor: 2 };
      const shopA = shopOrder[a.shopType] ?? 99;
      const shopB = shopOrder[b.shopType] ?? 99;
      if (shopA !== shopB) return shopA - shopB;

      // 2. Rarity (Ascending: common -> mythical)
      const rarityA = rarityWeights[a.rarity || "common"] ?? 99;
      const rarityB = rarityWeights[b.rarity || "common"] ?? 99;
      if (rarityA !== rarityB) return rarityA - rarityB;

      // 3. Price (Ascending)
      if (a.price !== b.price) return a.price - b.price;
      return a.itemName.localeCompare(b.itemName, undefined, { sensitivity: "base" });
    });

    return rows;
  }

  let rafId: number | null = null;
  function refresh(): void {
    if (!table) return;
    if (rafId !== null) return;
    const snapshot = table;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const scrollTop = snapshot.getScrollTop();
      snapshot.setData(buildRows());
      snapshot.setScrollTop(scrollTop);
    });
  }
  function refreshHard(): void {
    if (!table) return;
    const scrollTop = table.getScrollTop();
    table.setData([]);
    table.setData(buildRows());
    table.sortBy(null, null);
    table.setScrollTop(scrollTop);
  }

  table = Table<RowData>({
    columns,
    data: buildRows(),
    maxHeight: 400,
    stickyHeader: true,
    zebra: false,
    compact: false,
    animations: false,
    getRowId: (row) => `${row.shopType}:${row.itemId}:${row.tracked ? '1' : '0'}`,
    onRowClick: (row, _idx, ev) => {
      MGShopRestock.setTrackedItem(row.shopType, row.itemId, true);
      // Force predictions refresh immediately.
      const items = MGShopRestock.getTrackedItems();
      dispatchCustomEventAll(EVENTS.SHOP_RESTOCK_TRACKED_CHANGED);
      dispatchCustomEventAll(EVENTS.SHOP_RESTOCK_TRACKED, { items });
      refresh();
    },
  });

  table.root.classList.add("restock-history-table");

  window.addEventListener(EVENTS.SHOP_RESTOCK_HISTORY_UPDATED, refresh as EventListener);
  window.addEventListener(EVENTS.SHOP_RESTOCK_TRACKED_CHANGED, refresh as EventListener);
  window.addEventListener(EVENTS.SHOP_RESTOCK_TRACKED, refresh as EventListener);
  const handleStorage = (event: Event) => {
    const detail = (event as CustomEvent<{ key?: string }>).detail;
    if (detail?.key === FEATURE_KEYS.SHOP_RESTOCK) {
      refresh();
    }
  };
  window.addEventListener(EVENTS.STORAGE_CHANGE, handleStorage as EventListener);
  shopsUnsub = shopsGlobal.subscribeStable(() => refresh());

  const filterBar = element("div", { className: "restock-filter-bar" });
  filterBar.append(search.root);

  const root = Card(
    {
      id: "restock-history",
      title: "History",
      variant: "soft",
      padding: "none",
      expandable: true,
      defaultExpanded: false,
      stateKey: "history",
    },
    filterBar,
    table.root
  );
  root.classList.add("restock-card");

  return {
    root,
    destroy() {
      window.removeEventListener(EVENTS.SHOP_RESTOCK_HISTORY_UPDATED, refresh as EventListener);
      window.removeEventListener(EVENTS.SHOP_RESTOCK_TRACKED_CHANGED, refresh as EventListener);
      window.removeEventListener(EVENTS.SHOP_RESTOCK_TRACKED, refresh as EventListener);
      window.removeEventListener(EVENTS.STORAGE_CHANGE, handleStorage as EventListener);
      if (shopsUnsub) shopsUnsub();
      shopsUnsub = null;
      table?.destroy();
      table = null;
    },
  };
}
