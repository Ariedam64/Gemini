/**
 * Weather Card - Card displaying all weather types with notification toggles
 */

import { Card } from "../../../../components/Card/Card";
import { TableHandle } from "../../../../components/Table/Table";
import { element } from "../../../../styles/helpers";
import type { WeatherRow } from "./weatherCardData";
import { buildAllRows } from "./weatherCardData";
import { createWeatherTable } from "./weatherCardTable";
/**
 * Public handle for the weather card part
 */
export interface WeatherCardPart {
  root: HTMLElement;
  refresh(): void;
  destroy(): void;
}

/**
 * Options for the weather card
 */
export interface WeatherCardOptions {
  defaultExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
}

/**
 * Internal references to components
 */
interface ComponentRefs {
  tableHandle: TableHandle<WeatherRow> | null;
}

/**
 * Create the weather card part
 */
export function createWeatherCard(options?: WeatherCardOptions): WeatherCardPart {
  let root: HTMLElement | null = null;
  let allRows: WeatherRow[] = [];

  // Component references
  const components: ComponentRefs = {
    tableHandle: null,
  };

  // Change detection state
  let lastRowCount = 0;

  /**
   * Build the card with table
   */
  function buildCard(): HTMLElement {
    // Build initial rows
    allRows = buildAllRows();
    lastRowCount = allRows.length;

    // Create card body container
    const body = element("div");

    // Create table
    components.tableHandle = createWeatherTable({ rows: allRows });

    // Add to DOM
    body.appendChild(components.tableHandle.root);

    const hint = element("div", { className: "weather-card-hint" });
    const desktopHint = element(
      "span",
      { className: "weather-card-hint-desktop" },
      "Click a weather to set a custom sound alert. Right-click to reset"
    );
    const mobileHint = element(
      "span",
      { className: "weather-card-hint-mobile" },
      "Tap a weather to set a custom sound alert. Long-press to reset"
    );
    hint.append(desktopHint, mobileHint);
    body.appendChild(hint);

    // Create card
    root = Card(
      {
        id: "weather-card",
        title: "Weather events",
        subtitle: "Get notified when specific weather appears",
        expandable: true,
        defaultExpanded: options?.defaultExpanded ?? true,
        stateKey: "weather",
        variant: "soft",
        padding: "none",
        divider: false,
        onExpandChange: options?.onExpandChange,
      },
      body
    );

    return root;
  }

  /**
   * Refresh when weather data changes
   */
  function refresh(): void {
    const newRows = buildAllRows();

    // Simple change detection (row count)
    const currentRowCount = newRows.length;

    if (currentRowCount !== lastRowCount) {
      lastRowCount = currentRowCount;
      allRows = newRows;
      components.tableHandle?.setData(newRows);
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

    // Null out references
    root = null;
  }

  return {
    root: buildCard(),
    refresh,
    destroy,
  };
}
