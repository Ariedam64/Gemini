/**
 * Shop Card - Displays shop items in a sortable table with toggle switches
 */

import { Card } from "../../../../components/Card/Card";
import { Table, TableHandle, ColDef } from "../../../../components/Table/Table";
import { Switch } from "../../../../components/Switch/Switch";
import { Badge } from "../../../../components/Badge/Badge";
import { getShops } from "../../../../../globals/variables/shops";
import { MGData, MGSprite } from "../../../../../modules";
import { MGShopNotifier } from "../../../../../features/shopNotifier";
import { element } from "../../../../styles/helpers";
import type { ShopType, Shop, ShopItem, ShopsData } from "../../../../../globals/core/types";

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

// MGData category mapping per item type. Resolution via itemType lets the Dawn
// shop (seeds + eggs) share the same lookup logic as homogeneous shops.
const DATA_CATEGORY_BY_ITEM_TYPE: Record<string, { category: string; subKey: string | null }> = {
  Seed: { category: "plants", subKey: "seed" },
  Tool: { category: "items", subKey: null },
  Egg: { category: "eggs", subKey: null },
  Decor: { category: "decor", subKey: null },
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

// Extended type for table rows with rarity
interface ShopItemRow extends ShopItem {
  rarity: string | null;
  spriteId: string | null;
  itemName: string;
  isTracked: boolean;
}

function resolveTarget(itemId: string, itemType: string): Record<string, unknown> | null {
  const mapping = DATA_CATEGORY_BY_ITEM_TYPE[itemType];
  if (!mapping) return null;

  const dataCategory = MGData.get(mapping.category as any);
  if (!dataCategory || typeof dataCategory !== "object") return null;

  const itemData = (dataCategory as any)[itemId];
  if (!itemData || typeof itemData !== "object") return null;

  const target = mapping.subKey ? itemData[mapping.subKey] : itemData;
  return target && typeof target === "object" ? target : null;
}

function getSpriteId(itemId: string, itemType: string): string | null {
  try {
    return (resolveTarget(itemId, itemType)?.spriteId as string | undefined) ?? null;
  } catch (error) {
    console.warn(`[ShopNotifier] Failed to get spriteId for ${itemId}:`, error);
    return null;
  }
}

function getRarity(itemId: string, itemType: string): string | null {
  try {
    const rarity = resolveTarget(itemId, itemType)?.rarity;
    return rarity ? String(rarity).toLowerCase() : null;
  } catch {
    return null;
  }
}

function getItemName(itemId: string, itemType: string): string {
  try {
    return (resolveTarget(itemId, itemType)?.name as string | undefined) ?? itemId;
  } catch (error) {
    console.warn(`[ShopNotifier] Failed to get name for ${itemId}:`, error);
    return itemId;
  }
}

function getEmoji(itemType: string, shopType: ShopType): string {
  return ITEM_EMOJI[itemType] ?? SHOP_FALLBACK_EMOJI[shopType];
}

function getTrackedIdSet(shopType: ShopType): Set<string> {
  const tracked = MGShopNotifier.getTrackedItems();
  const ids = tracked.filter((item) => item.shopType === shopType).map((item) => item.itemId);
  return new Set(ids);
}

function buildRows(shop: Shop, shopType: ShopType): ShopItemRow[] {
  const trackedIds = getTrackedIdSet(shopType);

  return shop.items.map((item) => ({
    ...item,
    rarity: getRarity(item.id, item.itemType),
    spriteId: getSpriteId(item.id, item.itemType),
    itemName: getItemName(item.id, item.itemType),
    isTracked: trackedIds.has(item.id),
  }));
}

function createItemsTable(shop: Shop, shopType: ShopType): TableHandle<ShopItemRow> {
  // Convert ShopItem[] to ShopItemRow[] (add rarity, spriteId, and itemName fields)
  const rows = buildRows(shop, shopType);

  // Define columns separately (like in AutoFavorite section)
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
        // Null/undefined rarities go to the end (value 999)
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
  const shops = getShops();
  const currentShop = shops.getShop(shopType);

  let root: HTMLElement | null = null;
  let table: TableHandle<ShopItemRow> | null = null;
  let unsubscribe: (() => void) | null = null;

  function buildCard(): HTMLElement {
    table = createItemsTable(currentShop, shopType);

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

  function refresh(): void {
    if (!table) return;

    const updatedShop = shops.getShop(shopType);
    const rows = buildRows(updatedShop, shopType);

    table.setData(rows);
  }

  function destroy(): void {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }

    if (table) {
      table.destroy();
      table = null;
    }

    root = null;
  }

  // Subscribe to shop changes
  unsubscribe = shops.subscribeStable((shopsData: ShopsData) => {
    const newShop = shopsData.byType[shopType];
    if (newShop) {
      // Check if data actually changed before refreshing
      const hasChanged = JSON.stringify(currentShop.items) !== JSON.stringify(newShop.items);
      if (hasChanged) {
        Object.assign(currentShop, newShop);
        refresh();
      }
    }
  });

  return {
    root: buildCard(),
    refresh,
    destroy,
  };
}
