/**
 * Weather Card - Table creation and column configuration
 */

import { Table, TableHandle, ColDef } from "../../../../components/Table/Table";
import { Switch } from "../../../../components/Switch/Switch";
import { MGSprite } from "../../../../../modules";
import { MGWeatherNotifier } from "../../../../../features/weatherNotifier";
import { element } from "../../../../styles/helpers";
import type { WeatherRow } from "./weatherCardData";

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

  const tableHandle = Table<WeatherRow>({
    columns,
    data: rows,
    maxHeight: 280,
    stickyHeader: true,
    zebra: true,
    compact: true,
    getRowId: (row) => row.weatherId,
  });

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
