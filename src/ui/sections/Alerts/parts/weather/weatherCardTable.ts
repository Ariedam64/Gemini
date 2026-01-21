/**
 * Weather Card - Table creation and column configuration
 */

import { Table, TableHandle, ColDef } from "../../../../components/Table/Table";
import { Switch } from "../../../../components/Switch/Switch";
import { MGSprite } from "../../../../../modules";
import { MGWeatherNotifier } from "../../../../../features/weatherNotifier";
import { element } from "../../../../styles/helpers";
import type { WeatherRow } from "./weatherCardData";
import { createCustomSoundModal } from "../../../../components/CustomSoundModal/CustomSoundModal";
import { CustomSounds } from "../../../../../modules/audio/customSounds";

const LONG_PRESS_DELAY_MS = 500;
const LONG_PRESS_MOVE_TOLERANCE_PX = 10;
const SUPPRESS_ROW_CLICK_TIMEOUT_MS = 800;

interface CreateTableOptions {
  rows: WeatherRow[];
}

/**
 * Create the weather table with all columns configured
 */
export function createWeatherTable(
  options: CreateTableOptions
): TableHandle<WeatherRow> {
  const { rows } = options;

  let tableHandle: TableHandle<WeatherRow> | null = null;
  let rowIndicatorSyncPending = false;
  const rowDataByKey = new Map<string, WeatherRow>();
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
    return CustomSounds.hasItemCustomSound("weather", rowKey);
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

  function setRowDataMap(nextRows: WeatherRow[]): void {
    rowDataByKey.clear();
    for (const row of nextRows) {
      rowDataByKey.set(row.weatherId, row);
    }
  }

  function hasRowCustomSound(rowKey: string): boolean {
    return CustomSounds.hasItemCustomSound("weather", rowKey);
  }

  function resetRowCustomSound(rowKey: string): void {
    if (!CustomSounds.hasItemCustomSound("weather", rowKey)) return;

    CustomSounds.removeItemCustomSound("weather", rowKey);
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

  const columns: ColDef<WeatherRow>[] = [
    {
      key: "weather",
      header: "Weather",
      width: "1fr",
      align: "left",
      sortable: true,
      sortFn: (a, b) =>
        a.weatherName.localeCompare(b.weatherName, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      render: (row) => {
        const container = element("div", { className: "weather-item-cell" });

        // Icon/Sprite
        const iconContainer = element("div", { className: "weather-item-icon" });
        if (row.spriteId) {
          const canvas = MGSprite.toCanvas(row.spriteId);
          if (canvas) {
            canvas.className = "weather-item-sprite";
            iconContainer.appendChild(canvas);
          } else {
            // Fallback emoji based on weather type
            iconContainer.textContent = getWeatherEmoji(row.weatherId);
          }
        } else {
          iconContainer.textContent = getWeatherEmoji(row.weatherId);
        }

        // Name
        const nameContainer = element("div", { className: "weather-item-name" });
        nameContainer.textContent = row.weatherName;

        container.appendChild(iconContainer);
        container.appendChild(nameContainer);

        return container;
      },
    },
    {
      key: "effects",
      header: "Effects",
      width: "120px",
      align: "center",
      sortable: false,
      render: (row) => {
        const container = element("div", { className: "weather-item-effects" });
        container.textContent = row.effects;
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
        const container = element("div", { className: "weather-item-notify" });

        const switchHandle = Switch({
          checked: row.isTracked,
          disabled: false,
          size: "sm",
          onChange: (checked) => {
            row.isTracked = checked;
            if (checked) {
              MGWeatherNotifier.addTrackedWeather(row.weatherId);
            } else {
              MGWeatherNotifier.removeTrackedWeather(row.weatherId);
            }
          },
        });

        container.appendChild(switchHandle.root);
        return container;
      },
    },
  ];

  tableHandle = Table<WeatherRow>({
    columns,
    data: rows,
    maxHeight: 280,
    stickyHeader: true,
    zebra: true,
    compact: true,
    getRowId: (row) => row.weatherId,
    onSortChange: () => {
      scheduleRowCustomIndicatorSync();
    },
    onRowClick: (row, _index, event) => {
      const rowKey = row.weatherId;
      if (suppressRowClickKey) {
        if (suppressRowClickKey === rowKey) {
          clearSuppressRowClickKey();
          return;
        }
        clearSuppressRowClickKey();
      }

      const target = event.target as HTMLElement;
      if (target.closest(".weather-item-notify")) {
        return;
      }

      createCustomSoundModal({
        entityType: "weather",
        entityId: row.weatherId,
        entityName: row.weatherName,
        spriteId: row.spriteId,
        onSave: (config) => {
          if (config === null) {
            CustomSounds.removeItemCustomSound("weather", row.weatherId);
            row.hasCustomSound = false;
            updateRowCustomIndicator(rowKey, false);
          } else {
            CustomSounds.setItemCustomSound("weather", row.weatherId, config);
            row.hasCustomSound = true;
            updateRowCustomIndicator(rowKey, true);
          }
        },
      });
    },
  });

  if (!tableHandle) {
    throw new Error("[WeatherCard] Failed to create weather table");
  }

  setRowDataMap(rows);

  const tableRoot = tableHandle.root;

  const handleContextMenu = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest(".weather-item-notify")) return;

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
    if (target.closest(".weather-item-notify")) return;

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
  tableHandle.setData = (nextRows: WeatherRow[]) => {
    setRowDataMap(nextRows);
    originalSetData(nextRows);
    scheduleRowCustomIndicatorSync();
  };

  scheduleRowCustomIndicatorSync();

  const originalDestroy = tableHandle.destroy.bind(tableHandle);
  tableHandle.destroy = () => {
    tableRoot.removeEventListener("contextmenu", handleContextMenu);
    tableRoot.removeEventListener("pointerdown", handlePointerDown);
    tableRoot.removeEventListener("pointermove", handlePointerMove);
    tableRoot.removeEventListener("pointerup", handlePointerUp);
    tableRoot.removeEventListener("pointercancel", handlePointerCancel);
    clearLongPressState();
    clearSuppressRowClickKey();
    rowDataByKey.clear();
    originalDestroy();
  };

  return tableHandle;
}

/**
 * Get emoji fallback for weather type
 */
function getWeatherEmoji(weatherId: string): string {
  const emojiMap: Record<string, string> = {
    Sunny: "☀️",
    Rain: "🌧️",
    Frost: "❄️",
    Dawn: "🌅",
    AmberMoon: "🌕",
  };

  return emojiMap[weatherId] || "🌤️";
}
