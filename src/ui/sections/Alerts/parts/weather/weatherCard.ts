/**
 * Weather Card - Card displaying all weather types with notification toggles
 */

import { Card } from "../../../../components/Card/Card";
import { TableHandle } from "../../../../components/Table/Table";
import { element } from "../../../../styles/helpers";
import type { WeatherRow } from "./weatherCardData";
import { buildAllRows } from "./weatherCardData";
import { createWeatherTable } from "./weatherCardTable";
import { setCardExpandedState } from "../../state";

/**
 * Public handle for the weather card part
 */
export interface WeatherCardPart {
  root: HTMLElement;
  refresh(): void;
  destroy(): void;
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
export function createWeatherCard(): WeatherCardPart {
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

    // Create card
    root = Card(
      {
        id: "weather-card",
        title: "Weather",
        subtitle: "Get notified when specific weather appears",
        expandable: true,
        defaultExpanded: true,
        stateKey: "weather",
        variant: "soft",
        padding: "none",
        divider: false,
        onExpandChange: (expanded) => {
          // Persist the card expansion state (async, safe to not await)
          setCardExpandedState("weather-card", expanded).catch((error) => {
            console.error(`[WeatherCard] Failed to save expansion state:`, error);
          });
        },
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
