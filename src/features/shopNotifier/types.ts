/**
 * Shop Notifier Types
 */

import type { ShopType } from "../../globals/core/types";
import { FEATURE_KEYS } from "../../utils/storage";

export type TrackedItem = {
  shopType: ShopType;
  itemId: string;
};

export type TrackedItemsByShop = Record<ShopType, string[]>;

export interface ShopNotifierConfig {
  enabled: boolean;
  trackedItems: TrackedItemsByShop;
}

export const STORAGE_KEY = FEATURE_KEYS.SHOP_NOTIFIER;

export const DEFAULT_TRACKED_ITEMS: TrackedItemsByShop = {
  seed: [],
  tool: [],
  egg: [],
  decor: [],
};

export const DEFAULT_CONFIG: ShopNotifierConfig = {
  enabled: false,
  trackedItems: DEFAULT_TRACKED_ITEMS,
};
