/**
 * Shop Restock - Inventory Card
 */

import { Card } from "../../../components/Card/Card";
import { createNavTabs } from "../../../components/NavTabs/NavTabs";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { Table, ColDef } from "../../../components/Table/Table";
import { element } from "../../../styles/helpers";
import { getShops } from "../../../../globals";
import { MGSprite } from "../../../../modules";
import { MGShopRestock } from "../../../../features/shopRestock";
import { getStore } from "../state";
import { debugLog } from "../../../../features/shopRestock/logic/log";
import { EVENTS } from "../../../../utils/storage";
import type { TrackedShopType } from "../../../../features/shopRestock";
import { getCoinPrice, getItemName, getRarity, getSpriteId } from "./itemMeta";

export interface InventoryCardPart {
  root: HTMLElement;
  destroy(): void;
}

const SHOP_LABELS: Record<TrackedShopType, string> = {
  seed: "Seeds",
  egg: "Eggs",
  decor: "Decor",
};


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

interface RowData {
  id: string;
  shopType: TrackedShopType;
  itemName: string;
  rarity: string | null;
  spriteId: string | null;
  remaining: number;
  initialStock: number;
  price: number;
  tracked: boolean;
}

function buildRestockTimer(shopType: TrackedShopType): HTMLElement {
  // Digital Clock Style
  const wrap = element("div", {
    style: "display: flex; flex-direction: column; align-items: flex-end; line-height: 1;"
  });
  const label = element("div", { style: "font-size: 10px; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.5px;" }, "NEXT RESTOCK");
  const value = element("div", {
    style: "font-size: 20px; font-weight: 700; font-variant-numeric: tabular-nums; letter-spacing: -0.5px; color: var(--fg);"
  }, "--:--");

  wrap.append(label, value);

  let intervalId: number | null = null;

  function format(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.max(0, seconds % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  function tick(): void {
    const shops = getShops();
    const shop = shops.getShop(shopType);
    if (!shop.restockAt) {
      value.textContent = "--:--";
      value.style.color = "";
      return;
    }
    const remainingMs = Math.max(0, shop.restockAt - Date.now());
    const remainingSec = Math.floor(remainingMs / 1000);
    value.textContent = format(remainingSec);

    if (remainingSec <= 10) {
      value.style.color = "var(--accent)";
      value.style.textShadow = "0 0 10px color-mix(in oklab, var(--accent) 30%, transparent)";
    } else {
      value.style.color = "";
      value.style.textShadow = "";
    }
  }

  intervalId = window.setInterval(tick, 1000);
  tick();

  (wrap as any).__destroy = () => {
    if (intervalId !== null) window.clearInterval(intervalId);
    intervalId = null;
  };

  return wrap;
}

export function createInventoryCard(): InventoryCardPart {
  const shops = getShops();
  const store = getStore();
  let activeShop: TrackedShopType = store.get().activeInventoryTab ?? "seed";
  let query = "";
  let tableHandle: ReturnType<typeof Table<RowData>> | null = null;
  let unsubscribe: (() => void) | null = null;

  let timerWrap: HTMLElement | null = null;
  const headerActionsStart = element("div", { style: "display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 12px;" });

  const tabRoot = createNavTabs(
    [
      { id: "seed", label: SHOP_LABELS.seed },
      { id: "egg", label: SHOP_LABELS.egg },
      { id: "decor", label: SHOP_LABELS.decor },
    ],
    activeShop,
    (id: string) => {
      activeShop = id as TrackedShopType;
      store.set({ ...store.get(), activeInventoryTab: activeShop });
      rebuildTable(activeShop);
      updateTimer(activeShop);
      debugLog("Inventory tab change", { shopType: activeShop });
    }
  );
  tabRoot.root.style.flex = "1";
  tabRoot.root.style.marginBottom = "0"; // Override default marginBottom if any

  // Timer container
  const timerContainer = element("div", { style: "flex-shrink: 0; margin-left: 16px;" });
  headerActionsStart.append(tabRoot.root, timerContainer);

  const search = SearchBar({
    placeholder: "Search shop...",
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
  search.root.style.marginBottom = "12px";

  const columns: ColDef<RowData>[] = [
    {
      key: "item",
      header: "ITEM",
      width: "3fr",
      align: "left",
      sortable: true,
      sortFn: (a, b) => a.itemName.localeCompare(b.itemName, undefined, { numeric: true, sensitivity: "base" }),
      render: (row) => {
        const cell = element("div", { className: "restock-item-cell" });

        // Icon
        const iconWrap = element("div", { className: `restock-icon-wrap rarity-${row.rarity || 'common'}` });
        if (row.spriteId) {
          const canvas = MGSprite.toCanvas(row.spriteId);
          if (canvas) {
            canvas.className = "restock-item-sprite";
            iconWrap.appendChild(canvas);
          }
        }
        // No source pip for inventory items (implied shop)

        // Text
        const info = element("div", { className: "restock-item-info" });
        const name = element("div", { className: `restock-item-name restock-text-${row.rarity || 'common'}` }, row.itemName);

        // Sub: Tracked star + Price
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
      key: "stock",
      header: "STOCK",
      width: "80px",
      align: "center",
      sortable: true,
      render: (row) => {
        const val = element("div", {
          style: "font-variant-numeric: tabular-nums; font-weight: 600; opacity: 0.9;"
        }, `${row.remaining}/${row.initialStock}`);
        if (row.remaining === 0) val.style.opacity = "0.4";
        return val;
      }
    }
  ];

  function buildRows(shopType: TrackedShopType, q: string): RowData[] {
    const shopData = getShops().getShop(shopType);
    const rows = shopData.items.map((item) => ({
      id: item.id,
      shopType,
      itemName: getItemName(item.id, shopType),
      rarity: getRarity(item.id, shopType),
      spriteId: getSpriteId(item.id, shopType),
      remaining: item.remaining,
      initialStock: item.initialStock,
      price: typeof item.price === "number" ? item.price : getCoinPrice(item.id, shopType),
      tracked: MGShopRestock.isTracked(shopType, item.id),
    }));

    const filtered = q
      ? rows.filter((r) => r.itemName.toLowerCase().includes(q) || r.id.toLowerCase().includes(q))
      : rows;

    return filtered;
  }

  function rebuildTable(shopType: TrackedShopType): void {
    if (tableHandle) tableHandle.destroy();

    tableHandle = Table<RowData>({
      columns,
      data: buildRows(shopType, query),
      maxHeight: 360,
      stickyHeader: true,
      zebra: false,
      compact: false,
      animations: false,
      getRowId: (row) => `${row.shopType}:${row.id}`,
      onRowClick: (row) => {
        const enabled = MGShopRestock.toggleTrackedItem(row.shopType, row.id);
        debugLog("Tracked item toggled", { shopType: row.shopType, itemId: row.id, enabled });
        refresh();
      },
    });

    // Manual styling class hook
    tableHandle.root.classList.add("restock-history-table");

    // Clear and rebuild content slot (we'll just use the Card content)
    // Wait, createInventoryCard returns a root. We need to maintain the structure.
    // The structure is Header (Tabs + Timer) -> Search -> Table. 
    // We are returning the Card which manages its children. 
    // We can't easily replace the table if we passed it to Card.
    // Solution: Card contents can be a wrapper div that we manage.
    contentWrapper.replaceChildren(headerActionsStart, search.root, tableHandle.root);
  }

  function updateTimer(shopType: TrackedShopType): void {
    if (timerWrap) (timerWrap as any).__destroy?.();
    timerWrap = buildRestockTimer(shopType);
    timerContainer.replaceChildren(timerWrap);
  }

  function refresh(): void {
    if (!tableHandle) return;
    tableHandle.setData(buildRows(activeShop, query));
  }

  unsubscribe = shops.subscribeStable(() => refresh());
  window.addEventListener(EVENTS.SHOP_RESTOCK_TRACKED_CHANGED, refresh as EventListener);
  window.addEventListener(EVENTS.SHOP_RESTOCK_HISTORY_UPDATED, refresh as EventListener);

  const contentWrapper = element("div", { className: "restock-wrapper" });

  // Initial Build
  updateTimer(activeShop);

  // We need to defer rebuildTable because tableHandle needs to be created first? No.
  // We need to call rebuildTable to create the initial tableHandle and populate contentWrapper.
  rebuildTable(activeShop);
  tabRoot.activate(activeShop);

  const root = Card(
    {
      id: "restock-inventory",
      title: "Current Shop",
      variant: "soft",
      padding: "md",
      expandable: true,
      defaultExpanded: true,
      stateKey: "inventory",
    },
    contentWrapper
  );
  root.classList.add("restock-card");

  return {
    root,
    destroy() {
      unsubscribe?.();
      unsubscribe = null;
      (timerWrap as any)?.__destroy?.();
      tableHandle?.destroy();
      tableHandle = null;
      window.removeEventListener(EVENTS.SHOP_RESTOCK_TRACKED_CHANGED, refresh as EventListener);
      window.removeEventListener(EVENTS.SHOP_RESTOCK_HISTORY_UPDATED, refresh as EventListener);
    },
  };
}
