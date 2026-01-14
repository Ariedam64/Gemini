/**
 * Shop Card - Displays shop items and tracking
 */

import type { ShopType } from "../../../../../globals/core/types";

export interface ShopCardPart {
  root: HTMLElement;
  refresh?: () => void;
}

export interface ShopCardOptions {
  shopType: ShopType;
}

export function createShopCard(options: ShopCardOptions): ShopCardPart {
  const root = document.createElement("div");
  root.className = `shop-card shop-card--${options.shopType}`;
  root.innerHTML = `
    <div class="shop-card__header">
      <h3>${options.shopType}</h3>
    </div>
    <div class="shop-card__content">
      <!-- Items will be rendered here -->
    </div>
  `;

  return {
    root,
    refresh: () => {
      // Refresh logic here
    },
  };
}
