/**
 * Shops Card - Table creation and column configuration
 */

import { Table, TableHandle, ColDef } from "../../../../components/Table/Table";
import { Switch, SwitchHandle } from "../../../../components/Switch/Switch";
import { Badge } from "../../../../components/Badge/Badge";
import { MGSprite } from "../../../../../modules";
import { MGShopNotifier } from "../../../../../features/shopNotifier";
import { isItemAtMaxQuantity } from "../../../../../features/shopNotifier/logic/limitedItems";
import { getMyInventory } from "../../../../../globals/variables/myInventory";
import { getMyGarden } from "../../../../../globals/variables/myGarden";
import { element } from "../../../../styles/helpers";
import type { ShopItemRow } from "./shopsCardData";
import { ITEM_EMOJI, RARITY_ORDER } from "./shopsCardData";

interface CreateTableOptions {
  rows: ShopItemRow[];
}

/**
 * Create the items table with all columns configured
 */
export function createItemsTable(
  options: CreateTableOptions
): TableHandle<ShopItemRow> {
  const { rows } = options;

  // Track switch handles for updating disabled state
  const switchHandles = new Map<string, SwitchHandle>();

  const columns: ColDef<ShopItemRow>[] = [
    {
      key: "item",
      header: "Item",
      width: "1fr",
      align: "left",
      sortable: true,
      sortFn: (a, b) =>
        a.itemName.localeCompare(b.itemName, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      render: (row) => {
        const container = element("div", { className: "shop-item-cell" });

        // Icon
        const iconContainer = element("div", { className: "shop-item-icon" });
        if (row.spriteId) {
          const canvas = MGSprite.toCanvas(row.spriteId);
          if (canvas) {
            canvas.className = "shop-item-sprite";
            iconContainer.appendChild(canvas);
          } else {
            iconContainer.textContent = ITEM_EMOJI[row.shopType];
          }
        } else {
          iconContainer.textContent = ITEM_EMOJI[row.shopType];
        }

        // Name
        const nameContainer = element("div", { className: "shop-item-name" });
        nameContainer.textContent = row.itemName;

        container.appendChild(iconContainer);
        container.appendChild(nameContainer);

        return container;
      },
    },
    {
      key: "rarity",
      header: "Rarity",
      width: "120px",
      align: "center",
      sortable: true,
      sortFn: (a, b) => {
        const aOrder = a.rarity
          ? (RARITY_ORDER[a.rarity.toLowerCase()] ?? 999)
          : 999;
        const bOrder = b.rarity
          ? (RARITY_ORDER[b.rarity.toLowerCase()] ?? 999)
          : 999;
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
      key: "notify",
      header: "Notify",
      width: "60px",
      align: "center",
      sortable: false,
      render: (row) => {
        const container = element("div", { className: "shop-item-notify" });

        // Check if item is at max quantity
        const isAtMax = isItemAtMaxQuantity(row.id, row.shopType);

        const switchHandle = Switch({
          checked: row.isTracked,
          disabled: isAtMax,
          size: "sm",
          onChange: (checked) => {
            row.isTracked = checked;
            if (checked) {
              MGShopNotifier.addTrackedItem(row.shopType, row.id);
            } else {
              MGShopNotifier.removeTrackedItem(row.shopType, row.id);
            }
          },
        });

        // Store switch handle for later updates
        const rowKey = `${row.shopType}:${row.id}`;
        switchHandles.set(rowKey, switchHandle);

        container.appendChild(switchHandle.root);
        return container;
      },
    },
  ];

  const tableHandle = Table<ShopItemRow>({
    columns,
    data: rows,
    maxHeight: 400,
    stickyHeader: true,
    zebra: true,
    compact: true,
    getRowId: (row) => `${row.shopType}:${row.id}`,
  });

  const updateDisabledStates = (filterShopType?: ShopItemRow["shopType"]) => {
    for (const [rowKey, switchHandle] of switchHandles.entries()) {
      const [shopType, itemId] = rowKey.split(":") as [ShopItemRow["shopType"], string];
      if (filterShopType && shopType !== filterShopType) continue;
      const isAtMax = isItemAtMaxQuantity(itemId, shopType);
      switchHandle.setDisabled(isAtMax);
    }
  };

  // Subscribe to inventory changes to update disabled state
  const inventory = getMyInventory();
  const inventoryUnsub = inventory.subscribeStable(() => {
    updateDisabledStates();
  });

  // Subscribe to garden decor changes to update disabled state
  const garden = getMyGarden();
  const decorPlacedUnsub = garden.subscribeDecorPlaced(() => {
    updateDisabledStates("decor");
  });
  const decorRemovedUnsub = garden.subscribeDecorRemoved(() => {
    updateDisabledStates("decor");
  });

  // Extend table handle with cleanup for subscriptions
  const originalDestroy = tableHandle.destroy.bind(tableHandle);
  tableHandle.destroy = () => {
    inventoryUnsub();
    decorPlacedUnsub();
    decorRemovedUnsub();
    switchHandles.clear();
    originalDestroy();
  };

  return tableHandle;
}
