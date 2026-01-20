/**
 * Pet Hunger Notifier - State Management
 */

import { storageGet, storageSet, FEATURE_KEYS } from '../../utils/storage';
import type { PetHungerNotifierConfig } from './types';
import { DEFAULT_CONFIG } from './types';

export function loadConfig(): PetHungerNotifierConfig {
  return storageGet<PetHungerNotifierConfig>(FEATURE_KEYS.PET_HUNGER_NOTIFIER, DEFAULT_CONFIG);
}

export function saveConfig(config: PetHungerNotifierConfig): void {
  storageSet(FEATURE_KEYS.PET_HUNGER_NOTIFIER, config);
}

export function isEnabled(): boolean {
  return loadConfig().enabled;
}

export function setEnabled(enabled: boolean): void {
  const config = loadConfig();
  config.enabled = enabled;
  saveConfig(config);

  // Emit event to trigger reinit
  const event = new CustomEvent('gemini:pet-hunger-config-changed', {
    detail: { shouldReinit: true },
  });
  window.dispatchEvent(event);
}

export function getThreshold(): number {
  return loadConfig().threshold;
}

export function setThreshold(threshold: number): void {
  const config = loadConfig();
  config.threshold = threshold;
  saveConfig(config);
}
