/**
 * Shop Card - Displays shop items in a sortable table with toggle switches.
 * Rows are sourced from MGData's static shop catalog (every item with at least
 * one entry in `eligibleShops`), so users can configure alerts even when the
 * live shop inventory is empty (e.g. Dawn shop outside Dawn weather).
 */

import { Card } from "../../../../components/Card/Card";
import { Table, TableHandle, ColDef } from "../../../../components/Table/Table";
import { Switch } from "../../../../components/Switch/Switch";
import { Badge } from "../../../../components/Badge/Badge";
import { MGData, MGSprite } from "../../../../../modules";
import { MGShopNotifier } from "../../../../../features/shopNotifier";
import { element } from "../../../../styles/helpers";
import type { ShopType, ShopItem } from "../../../../../globals/core/types";

export interface ShopCardPart {
  root: HTMLElement;
  refresh?: () => void;
  destroy?: () => void;
}

export interface ShopCardOptions {
  shopType: ShopType;
}

const SHOP_LABELS: Record<ShopType, string> = {
  seed: "Seeds",
  tool: "Tools",
  egg: "Eggs",
  decor: "Decor",
  dawn: "Dawn",
};

const ITEM_EMOJI: Record<string, string> = {
  Seed: "🌱",
  Tool: "🔧",
  Egg: "🥚",
  Decor: "🎨",
};

const SHOP_FALLBACK_EMOJI: Record<ShopType, string> = {
  seed: "🌱",
  tool: "🔧",
  egg: "🥚",
  decor: "🎨",
  dawn: "🌅",
};

// Rarity order for sorting (from lowest to highest)
const RARITY_ORDER: Record<string, number> = {
  common: 0,
  uncommon: 1,
  rare: 2,
  legendary: 3,
  mythical: 4,
  divine: 5,
  celestial: 6,
};

// Extended type for table rows (carries all data needed for display)
interface ShopItemRow extends ShopItem {
  rarity: string | null;
  spriteId: string | null;
  itemName: string;
  isTracked: boolean;
}

function getEmoji(itemType: string, shopType: ShopType): string {
  return ITEM_EMOJI[itemType] ?? SHOP_FALLBACK_EMOJI[shopType];
}

function getTrackedIdSet(shopType: ShopType): Set<string> {
  const tracked = MGShopNotifier.getTrackedItems();
  const ids = tracked.filter((item) => item.shopType === shopType).map((item) => item.itemId);
  return new Set(ids);
}

/**
 * Build rows for a shop from MGData's catalog. Items eligible for the given
 * shop yield one row each. Live shop quantities are not used here — the table
 * only shows display info and the tracking switch.
 */
function buildRows(shopType: ShopType): ShopItemRow[] {
  const trackedIds = getTrackedIdSet(shopType);
  const catalog = MGData.getShopCatalog();

  const rows: ShopItemRow[] = [];
  for (const entry of catalog) {
    if (!entry.shops.includes(shopType)) continue;
    rows.push({
      // ShopItem fields — runtime quantities are not used by this table
      id: entry.id,
      itemType: entry.itemType,
      initialStock: 0,
      purchased: 0,
      remaining: 0,
      isAvailable: false,
      price: 0,
      // Display fields
      rarity: entry.rarity,
      spriteId: entry.spriteId,
      itemName: entry.name,
      isTracked: trackedIds.has(entry.id),
    });
  }

  return rows;
}

function createItemsTable(shopType: ShopType): TableHandle<ShopItemRow> {
  const rows = buildRows(shopType);

  const columns: ColDef<ShopItemRow>[] = [
    {
      key: "icon",
      header: "",
      width: "40px",
      align: "center",
      sortable: false,
      render: (row) => {
        const container = element("div", { className: "shop-item-icon" });
        const fallbackEmoji = getEmoji(row.itemType, shopType);

        if (row.spriteId) {
          // Use MGSprite to render the sprite (async)
          MGSprite.toCanvas(row.spriteId).then((canvas) => {
            if (canvas) {
              canvas.style.maxWidth = "32px";
              canvas.style.maxHeight = "32px";
              canvas.style.width = "auto";
              canvas.style.height = "auto";
              canvas.style.imageRendering = "auto";
              canvas.style.display = "block";
              container.appendChild(canvas);
            } else {
              container.textContent = fallbackEmoji;
            }
          }).catch(() => {
            container.textContent = fallbackEmoji;
          });
        } else {
          container.textContent = fallbackEmoji;
        }

        return container;
      },
    },
    {
      key: "itemName",
      header: "Item",
      width: "1fr",
      align: "left",
      sortable: true,
      sortFn: (a, b) => a.itemName.localeCompare(b.itemName, undefined, { numeric: true, sensitivity: "base" }),
    },
    {
      key: "rarity",
      header: "Rarity",
      width: "120px",
      align: "left",
      sortable: true,
      sortFn: (a, b) => {
        const aOrder = a.rarity ? (RARITY_ORDER[a.rarity.toLowerCase()] ?? 999) : 999;
        const bOrder = b.rarity ? (RARITY_ORDER[b.rarity.toLowerCase()] ?? 999) : 999;
        return aOrder - bOrder;
      },
      render: (row) => {
        const container = element("div", { className: "shop-item-rarity" });
        const badge = Badge({
          variant: "rarity",
          rarity: row.rarity,
        });
        container.appendChild(badge.root);
        return container;
      },
    },
    {
      key: "toggle",
      header: "Track",
      width: "60px",
      align: "center",
      sortable: false,
      render: (row) => {
        const container = element("div", { className: "shop-item-toggle" });
        const switchHandle = Switch({
          checked: row.isTracked,
          size: "sm",
          onChange: (checked) => {
            row.isTracked = checked;
            if (checked) {
              MGShopNotifier.addTrackedItem(shopType, row.id);
            } else {
              MGShopNotifier.removeTrackedItem(shopType, row.id);
            }
          },
        });
        container.appendChild(switchHandle.root);
        return container;
      },
    },
  ];

  const table = Table<ShopItemRow>({
    columns,
    data: rows,
    maxHeight: 360, // Height for ~6 visible rows with scroll
    stickyHeader: true,
    zebra: true,
    compact: true,
    getRowId: (row) => row.id,
  });

  return table;
}

export function createShopCard(options: ShopCardOptions): ShopCardPart {
  const { shopType } = options;

  let root: HTMLElement | null = null;
  let table: TableHandle<ShopItemRow> | null = null;

  function buildCard(): HTMLElement {
    table = createItemsTable(shopType);

    root = Card(
      {
        id: `shop-card-${shopType}`,
        title: SHOP_LABELS[shopType],
        expandable: true,
        defaultExpanded: true,
        stateKey: `shop-${shopType}`,
        variant: "soft",
        padding: "none",
        divider: false,
      },
      table.root
    );

    root.classList.add(`shop-card--${shopType}`);

    return root;
  }

  /**
   * Rebuild rows from MGData's catalog. Catalog is static after MGData load,
   * so this is mostly a no-op safety net (e.g. if MGData is reloaded externally).
   */
  function refresh(): void {
    if (!table) return;
    table.setData(buildRows(shopType));
  }

  function destroy(): void {
    if (table) {
      table.destroy();
      table = null;
    }
    root = null;
  }

  return {
    root: buildCard(),
    refresh,
    destroy,
  };
}
