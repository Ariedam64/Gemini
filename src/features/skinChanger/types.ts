import { FEATURE_KEYS } from "../../utils/storage";

export type SkinChangerCategory =
  | "pet"
  | "plantSeed"
  | "plantPlant"
  | "plantCrop"
  | "decor"
  | "item"
  | "egg"
  | "mutation"
  | "mutationOverlay";

export interface SkinChangerSkinEntry {
  /** Normalized sprite id path (e.g. sprite/pet/Bee) */
  spriteId: string;
  /** Image data URL (png/jpg/webp) */
  dataUrl: string;
  /** Per-skin scale multiplier for the override image */
  scale: number;
  /** Last time this entry was updated (epoch ms) */
  updatedAt: number;
  /** Optional category for grouping/UI */
  category?: SkinChangerCategory;
}

export interface SkinChangerConfig {
  enabled: boolean;
  skins: SkinChangerSkinEntry[];
}

export const STORAGE_KEY = FEATURE_KEYS.SKIN_CHANGER;

export const DEFAULT_CONFIG: SkinChangerConfig = {
  enabled: false,
  skins: [],
};
