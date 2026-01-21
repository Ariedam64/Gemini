/**
 * Pet Hunger Notifier - Types
 */

import { FEATURE_KEYS } from '../../utils/storage';

export interface PetHungerNotifierConfig {
  enabled: boolean;
  threshold: number; // Hunger threshold percentage (default: 5%)
}

export const STORAGE_KEY = FEATURE_KEYS.PET_HUNGER_NOTIFIER;

export const DEFAULT_CONFIG: PetHungerNotifierConfig = {
  enabled: false,
  threshold: 5,
};
