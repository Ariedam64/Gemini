/**
 * Shops Card - Unified card displaying all shop items with filters
 * Refactored: Splits responsibilities across shopsCardData.ts and shopsCardTable.ts
 */

import { Card } from "../../../../components/Card/Card";
import { Select, SelectHandle } from "../../../../components/Select/Select";
import { SearchBar, SearchBarHandle } from "../../../../components/SearchBar/SearchBar";
import { TableHandle } from "../../../../components/Table/Table";
import { getShops } from "../../../../../globals/variables/shops";
import { element } from "../../../../styles/helpers";
import type { ShopType, ShopsData } from "../../../../../globals/core/types";
import {
  buildAllRows,
  SHOP_TYPE_LABELS,
  type ShopItemRow,
} from "./shopsCardData";
import { createItemsTable } from "./shopsCardTable";

/**
 * Public handle for the shops card part
 */
export interface ShopsCardPart {
  root: HTMLElement;
  refresh(): void;
  destroy(): void;
}

/**
 * Internal state for filters
 */
interface FilterState {
  selectedShopType: ShopType | "all";
  searchQuery: string;
}

/**
 * Internal references to components
 */
interface ComponentRefs {
  shopTypeSelect: SelectHandle | null;
  searchInput: SearchBarHandle | null;
  tableHandle: TableHandle<ShopItemRow> | null;
}

function getLongestLabel(labels: string[]): string {
  let longest = "";
  for (const label of labels) {
    if (label.length > longest.length) longest = label;
  }
  return longest;
}

function measureSelectWidth(selectRoot: HTMLElement, label: string): number {
  const rootNode = selectRoot.getRootNode();
  const container =
    rootNode instanceof ShadowRoot
      ? rootNode
      : document.body || document.documentElement;

  if (!container) return 0;

  const measureRoot = element("div", { className: "select" }) as HTMLDivElement;
  for (const className of Array.from(selectRoot.classList)) {
    if (className.startsWith("select--")) {
      measureRoot.classList.add(className);
    }
  }

  measureRoot.style.position = "absolute";
  measureRoot.style.visibility = "hidden";
  measureRoot.style.pointerEvents = "none";
  measureRoot.style.left = "-9999px";
  measureRoot.style.top = "-9999px";
  measureRoot.style.minWidth = "0";

  const trigger = element("button", {
    className: "select-trigger",
    type: "button",
  }) as HTMLButtonElement;
  trigger.style.width = "auto";
  trigger.style.minWidth = "0";
  trigger.style.whiteSpace = "nowrap";

  const caretText =
    selectRoot.querySelector(".select-caret")?.textContent || "v";

  const value = element("span", { className: "select-value" }, label) as HTMLSpanElement;
  const caret = element("span", { className: "select-caret" }, caretText) as HTMLSpanElement;
  trigger.append(value, caret);
  measureRoot.appendChild(trigger);

  container.appendChild(measureRoot);
  const width = Math.ceil(trigger.getBoundingClientRect().width);
  measureRoot.remove();

  return width;
}

function applySelectWidth(selectRoot: HTMLElement, labels: string[]): void {
  const longest = getLongestLabel(labels);
  if (!longest) return;

  let attempts = 0;
  const maxAttempts = 6;

  const apply = () => {
    attempts += 1;
    if (!selectRoot.isConnected) {
      if (attempts < maxAttempts) {
        requestAnimationFrame(apply);
      }
      return;
    }

    const width = measureSelectWidth(selectRoot, longest);
    if (width > 0) {
      selectRoot.style.width = `${width}px`;
      selectRoot.style.minWidth = `${width}px`;
    }
  };

  requestAnimationFrame(apply);
}

/**
 * Create the shops card part
 */
export function createShopsCard(): ShopsCardPart {
  const shops = getShops();
  const shopsData = shops.get();

  let root: HTMLElement | null = null;
  let allRows: ShopItemRow[] = [];
  let filteredRows: ShopItemRow[] = [];

  // Filter state
  const filterState: FilterState = {
    selectedShopType: "all",
    searchQuery: "",
  };

  // Component references
  const components: ComponentRefs = {
    shopTypeSelect: null,
    searchInput: null,
    tableHandle: null,
  };

  // Change detection state
  let lastRowCount = 0;
  let lastShopTypes = new Set<ShopType>();

  /**
   * Compare two sets for equality
   */
  function setsEqual<T>(a: Set<T>, b: Set<T>): boolean {
    if (a.size !== b.size) return false;
    for (const item of a) {
      if (!b.has(item)) return false;
    }
    return true;
  }

  /**
   * Apply filter state to all rows and update table
   */
  function applyFilters(): void {
    if (!components.tableHandle) {
      return;
    }

    const nextRows = allRows.filter((row) => {
      // Shop type filter
      if (
        filterState.selectedShopType !== "all" &&
        row.shopType !== filterState.selectedShopType
      ) {
        return false;
      }

      // Search filter
      if (
        filterState.searchQuery &&
        !row.itemName
          .toLowerCase()
          .includes(filterState.searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    filteredRows = nextRows;
    components.tableHandle.setData(nextRows);
  }

  /**
   * Create filter components (shop type select + search bar)
   */
  function createFilters(): HTMLElement {
    const container = element("div", { className: "shops-card-filters" });

    // Shop type select
    const shopTypes: ShopType[] = ["seed", "tool", "egg", "decor"];
    const selectOptions = [
      { value: "all", label: "All Shops" },
      ...shopTypes.map((type) => ({
        value: type,
        label: SHOP_TYPE_LABELS[type],
      })),
    ];

    components.shopTypeSelect = Select({
      value: "all",
      options: selectOptions,
      size: "sm",
      onChange: (value) => {
        filterState.selectedShopType = value as ShopType | "all";
        applyFilters();
      },
    });

    const selectRoot = components.shopTypeSelect.root;
    selectRoot.style.minWidth = "0";
    selectRoot.style.width = "auto";
    applySelectWidth(selectRoot, selectOptions.map((opt) => opt.label));

    // Search input
    components.searchInput = SearchBar({
      placeholder: "Search items...",
      size: "sm",
      debounceMs: 150,
      autoSearch: true,
      withClear: true,
      blockGameKeys: true,
      focusKey: "",
      onSearch: (value: string) => {
        filterState.searchQuery = value.trim();
        applyFilters();
      },
    });

    container.appendChild(components.shopTypeSelect.root);
    container.appendChild(components.searchInput.root);

    return container;
  }

  /**
   * Build the card with table and filters
   */
  function buildCard(): HTMLElement {
    // Build initial rows
    allRows = buildAllRows(shopsData);
    filteredRows = [...allRows];

    // Initialize change detection state
    lastRowCount = allRows.length;
    lastShopTypes = new Set(allRows.map((r) => r.shopType));

    // Create card body container
    const body = element("div");

    // IMPORTANT: Create table FIRST so it exists before filter callbacks are registered
    components.tableHandle = createItemsTable({ rows: filteredRows });

    // Create filters (callbacks will reference the already-created tableHandle)
    const filters = createFilters();

    // Add to DOM (filters first for visual order)
    body.appendChild(filters);
    body.appendChild(components.tableHandle.root);

    // Create card
    root = Card(
      {
        id: "shops-card",
        title: "Shops",
        subtitle: "Get notified when tracked items restock",
        expandable: true,
        defaultExpanded: true,
        stateKey: "shops",
        variant: "soft",
        padding: "none",
        divider: false,
      },
      body
    );

    return root;
  }

  /**
   * Refresh when shop data changes
   */
  function refresh(): void {
    const updatedShopsData = shops.get();
    const newRows = buildAllRows(updatedShopsData);

    // Efficient change detection using simpler properties
    const currentRowCount = newRows.length;
    const currentShopTypes = new Set(newRows.map((r) => r.shopType));

    const hasChanged =
      currentRowCount !== lastRowCount ||
      !setsEqual(currentShopTypes, lastShopTypes);

    if (hasChanged) {
      lastRowCount = currentRowCount;
      lastShopTypes = currentShopTypes;
      allRows = newRows;
      applyFilters();
    }
  }

  /**
   * Clean up all resources
   */
  function destroy(): void {

    // Destroy table
    if (components.tableHandle) {
      components.tableHandle.destroy();
      components.tableHandle = null;
    }

    // Destroy shop type select
    if (components.shopTypeSelect) {
      components.shopTypeSelect.destroy();
      components.shopTypeSelect = null;
    }

    // Destroy search input (use internal cleanup)
    if (components.searchInput) {
      const cleanup = (components.searchInput.root as any).__cleanup;
      if (cleanup) cleanup();
      components.searchInput = null;
    }

    // Null out references
    root = null;
  }

  return {
    root: buildCard(),
    refresh,
    destroy,
  };
}
