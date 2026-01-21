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
import { createCustomSoundModal } from "../../../../components/CustomSoundModal/CustomSoundModal";
import { CustomSounds } from "../../../../../modules/audio/customSounds";

const SHOP_TYPES: ShopItemRow["shopType"][] = ["seed", "tool", "egg", "decor"];
const SHOP_TYPE_SET = new Set<ShopItemRow["shopType"]>(SHOP_TYPES);

function parseRowKey(rowKey: string): { shopType: ShopItemRow["shopType"]; itemId: string } | null {
  const [shopType, ...rest] = rowKey.split(":");
  if (!shopType || rest.length === 0) return null;
  if (!SHOP_TYPE_SET.has(shopType as ShopItemRow["shopType"])) return null;
  return { shopType: shopType as ShopItemRow["shopType"], itemId: rest.join(":") };
}

const LONG_PRESS_DELAY_MS = 500;
const LONG_PRESS_MOVE_TOLERANCE_PX = 10;
const SUPPRESS_ROW_CLICK_TIMEOUT_MS = 800;

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
  let tableHandle: TableHandle<ShopItemRow> | null = null;
  let rowIndicatorSyncPending = false;
  const rowDataByKey = new Map<string, ShopItemRow>();
  let suppressRowClickKey: string | null = null;
  let suppressRowClickTimer: number | null = null;
  let longPressTimer: number | null = null;
  let longPressRowKey: string | null = null;
  let longPressStart: { x: number; y: number } | null = null;
  let longPressTriggered = false;

  function applyRowCustomIndicator(rowElement: HTMLElement, hasCustom: boolean): void {
    if (hasCustom) {
      rowElement.classList.add("has-custom-sound");
    } else {
      rowElement.classList.remove("has-custom-sound");
    }
  }

  function resolveRowHasCustomSound(rowKey: string): boolean {
    const parsed = parseRowKey(rowKey);
    if (!parsed) return false;
    return CustomSounds.hasItemCustomSound("shop", parsed.itemId, parsed.shopType);
  }

  function findRowElement(rowKey: string): HTMLElement | null {
    if (!tableHandle) return null;
    const rowsInTable = tableHandle.root.querySelectorAll<HTMLElement>(".lg-tr-body");
    for (const rowElement of rowsInTable) {
      if (rowElement.dataset.id === rowKey) {
        return rowElement;
      }
    }
    return null;
  }

  function updateRowCustomIndicator(rowKey: string, hasCustom?: boolean): void {
    const rowElement = findRowElement(rowKey);
    if (!rowElement) return;
    const nextHasCustom = hasCustom ?? resolveRowHasCustomSound(rowKey);
    applyRowCustomIndicator(rowElement, nextHasCustom);
  }

  function syncRowCustomIndicators(): void {
    if (!tableHandle) return;
    const rowsInTable = tableHandle.root.querySelectorAll<HTMLElement>(".lg-tr-body");
    rowsInTable.forEach((rowElement) => {
      const rowKey = rowElement.dataset.id;
      if (!rowKey) return;
      applyRowCustomIndicator(rowElement, resolveRowHasCustomSound(rowKey));
    });
  }

  function scheduleRowCustomIndicatorSync(): void {
    if (rowIndicatorSyncPending) return;
    rowIndicatorSyncPending = true;
    requestAnimationFrame(() => {
      rowIndicatorSyncPending = false;
      syncRowCustomIndicators();
    });
  }

  function setRowDataMap(nextRows: ShopItemRow[]): void {
    rowDataByKey.clear();
    for (const row of nextRows) {
      rowDataByKey.set(`${row.shopType}:${row.id}`, row);
    }
  }

  function hasRowCustomSound(rowKey: string): boolean {
    const parsed = parseRowKey(rowKey);
    if (!parsed) return false;
    return CustomSounds.hasItemCustomSound("shop", parsed.itemId, parsed.shopType);
  }

  function resetRowCustomSound(rowKey: string): void {
    const parsed = parseRowKey(rowKey);
    if (!parsed) return;
    if (!CustomSounds.hasItemCustomSound("shop", parsed.itemId, parsed.shopType)) return;

    CustomSounds.removeItemCustomSound("shop", parsed.itemId, parsed.shopType);
    const row = rowDataByKey.get(rowKey);
    if (row) {
      row.hasCustomSound = false;
    }
    updateRowCustomIndicator(rowKey, false);
    scheduleRowCustomIndicatorSync();
  }

  function clearSuppressRowClickKey(): void {
    if (suppressRowClickTimer !== null) {
      window.clearTimeout(suppressRowClickTimer);
      suppressRowClickTimer = null;
    }
    suppressRowClickKey = null;
  }

  function setSuppressRowClickKey(rowKey: string): void {
    suppressRowClickKey = rowKey;
    if (suppressRowClickTimer !== null) {
      window.clearTimeout(suppressRowClickTimer);
    }
    suppressRowClickTimer = window.setTimeout(() => {
      suppressRowClickTimer = null;
      suppressRowClickKey = null;
    }, SUPPRESS_ROW_CLICK_TIMEOUT_MS);
  }

  function clearLongPressState(): void {
    if (longPressTimer !== null) {
      window.clearTimeout(longPressTimer);
      longPressTimer = null;
    }
    longPressRowKey = null;
    longPressStart = null;
    longPressTriggered = false;
  }

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

  // Create the table
  tableHandle = Table<ShopItemRow>({
    columns,
    data: rows,
    maxHeight: 400,
    stickyHeader: true,
    zebra: true,
    compact: true,
    getRowId: (row) => `${row.shopType}:${row.id}`,
    onSortChange: () => {
      scheduleRowCustomIndicatorSync();
    },
    onRowClick: (row, _index, event) => {
      const rowKey = `${row.shopType}:${row.id}`;
      if (suppressRowClickKey) {
        if (suppressRowClickKey === rowKey) {
          clearSuppressRowClickKey();
          return;
        }
        clearSuppressRowClickKey();
      }

      // Ignore clicks on the switch (notify column)
      const target = event.target as HTMLElement;
      if (target.closest('.shop-item-notify')) {
        return;
      }

      // Open custom sound modal
      createCustomSoundModal({
        entityType: 'shop',
        entityId: row.id,
        entityName: row.itemName,
        spriteId: row.spriteId,
        shopType: row.shopType,
        onSave: (config) => {
          if (config === null) {
            // Reset (remove custom)
            CustomSounds.removeItemCustomSound('shop', row.id, row.shopType);
            row.hasCustomSound = false;
            // Update row visual indicator
            updateRowCustomIndicator(rowKey, false);
          } else {
            // Save custom
            CustomSounds.setItemCustomSound('shop', row.id, config, row.shopType);
            row.hasCustomSound = true;
            // Update row visual indicator
            updateRowCustomIndicator(rowKey, true);
          }
        },
      });
    },
  });

  if (!tableHandle) {
    throw new Error("[ShopsCard] Failed to create items table");
  }

  setRowDataMap(rows);

  const tableRoot = tableHandle.root;

  const handleContextMenu = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest(".shop-item-notify")) return;

    const rowElement = target.closest<HTMLElement>(".lg-tr-body");
    const rowKey = rowElement?.dataset.id;
    if (!rowKey || !hasRowCustomSound(rowKey)) return;

    event.preventDefault();
    event.stopPropagation();
    setSuppressRowClickKey(rowKey);
    resetRowCustomSound(rowKey);
  };

  const handlePointerDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse") return;
    if (event.button !== 0) return;

    const target = event.target as HTMLElement;
    if (target.closest(".shop-item-notify")) return;

    const rowElement = target.closest<HTMLElement>(".lg-tr-body");
    const rowKey = rowElement?.dataset.id;
    if (!rowKey || !hasRowCustomSound(rowKey)) return;

    clearLongPressState();
    longPressRowKey = rowKey;
    longPressStart = { x: event.clientX, y: event.clientY };
    longPressTimer = window.setTimeout(() => {
      longPressTimer = null;
      if (!longPressRowKey) return;
      longPressTriggered = true;
      setSuppressRowClickKey(longPressRowKey);
      resetRowCustomSound(longPressRowKey);
    }, LONG_PRESS_DELAY_MS);
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!longPressStart || !longPressRowKey || longPressTriggered) return;
    const dx = event.clientX - longPressStart.x;
    const dy = event.clientY - longPressStart.y;
    if ((dx * dx + dy * dy) > LONG_PRESS_MOVE_TOLERANCE_PX * LONG_PRESS_MOVE_TOLERANCE_PX) {
      clearLongPressState();
    }
  };

  const handlePointerUp = () => {
    clearLongPressState();
  };

  const handlePointerCancel = () => {
    clearLongPressState();
  };

  tableRoot.addEventListener("contextmenu", handleContextMenu);
  tableRoot.addEventListener("pointerdown", handlePointerDown);
  tableRoot.addEventListener("pointermove", handlePointerMove);
  tableRoot.addEventListener("pointerup", handlePointerUp);
  tableRoot.addEventListener("pointercancel", handlePointerCancel);

  const originalSetData = tableHandle.setData.bind(tableHandle);
  tableHandle.setData = (nextRows: ShopItemRow[]) => {
    setRowDataMap(nextRows);
    originalSetData(nextRows);
    scheduleRowCustomIndicatorSync();
  };

  scheduleRowCustomIndicatorSync();

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
    tableRoot.removeEventListener("contextmenu", handleContextMenu);
    tableRoot.removeEventListener("pointerdown", handlePointerDown);
    tableRoot.removeEventListener("pointermove", handlePointerMove);
    tableRoot.removeEventListener("pointerup", handlePointerUp);
    tableRoot.removeEventListener("pointercancel", handlePointerCancel);
    clearLongPressState();
    clearSuppressRowClickKey();
    switchHandles.clear();
    rowDataByKey.clear();
    originalDestroy();
  };

  return tableHandle;
}
