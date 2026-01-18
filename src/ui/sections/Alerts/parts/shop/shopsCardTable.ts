/**
 * Shops Card - Table creation and column configuration
 */

import { Table, TableHandle, ColDef } from "../../../../components/Table/Table";
import { Switch } from "../../../../components/Switch/Switch";
import { Badge } from "../../../../components/Badge/Badge";
import { MGSprite } from "../../../../../modules";
import { MGShopNotifier } from "../../../../../features/shopNotifier";
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
        const switchHandle = Switch({
          checked: row.isTracked,
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

  return tableHandle;
}
