/**
 * Central registry for all DOM injections
 *
 * Responsibilities:
 * - Track all registered injections
 * - Manage lifecycle (init/destroy all)
 * - Persist toggle states
 * - Expose settings UI access
 */

import type { InjectionConfig, InjectionAPI } from './types';
import { storageGet, storageSet } from '../../../utils/storage';

interface RegistryState {
  [injectionId: string]: boolean; // enabled state per injection
}

export class InjectionRegistry {
  private injections = new Map<string, InjectionConfig>();
  private state: RegistryState = {};
  private initialized = false;

  /**
   * Register a new injection
   * Per ui/inject.md: must be idempotent
   */
  register(config: InjectionConfig): void {
    if (this.injections.has(config.id)) {
      console.warn(`[InjectionRegistry] ${config.id} already registered`);
      return;
    }

    this.injections.set(config.id, config);
    this.loadState(config.id);

    console.log(`[InjectionRegistry] Registered: ${config.name}`);
  }

  /**
   * Initialize all enabled injections
   * Called from ui/loader/bootstrap.ts
   */
  initAll(): void {
    if (this.initialized) return;

    for (const [id, config] of this.injections) {
      const enabled = this.state[id] ?? config.defaultEnabled ?? false;

      if (enabled) {
        try {
          config.injection.init();
        } catch (err) {
          console.error(`[InjectionRegistry] Failed to init ${id}:`, err);
        }
      }
    }

    this.initialized = true;
    console.log('[InjectionRegistry] All injections initialized');
  }

  /**
   * Cleanup all injections
   */
  destroyAll(): void {
    for (const [, config] of this.injections) {
      try {
        config.injection.destroy();
      } catch (err) {
        console.error(`[InjectionRegistry] Failed to destroy ${config.id}:`, err);
      }
    }

    this.initialized = false;
    console.log('[InjectionRegistry] All injections destroyed');
  }

  /**
   * Toggle an injection on/off
   * Called from Settings UI
   */
  setEnabled(injectionId: string, enabled: boolean): void {
    const config = this.injections.get(injectionId);
    if (!config) {
      console.warn(`[InjectionRegistry] Unknown injection: ${injectionId}`);
      return;
    }

    this.state[injectionId] = enabled;
    this.saveState(injectionId);

    if (enabled) {
      config.injection.init();
    } else {
      config.injection.destroy();
    }

    console.log(`[InjectionRegistry] ${config.name} ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Get all registered injections (for Settings UI)
   */
  getAll(): InjectionConfig[] {
    return Array.from(this.injections.values());
  }

  /**
   * Get state for a specific injection
   */
  isEnabled(injectionId: string): boolean {
    return this.state[injectionId] ?? false;
  }

  private loadState(injectionId: string): void {
    const config = this.injections.get(injectionId);
    if (!config) return;

    const enabled = storageGet(config.storageKey, config.defaultEnabled ?? false);
    this.state[injectionId] = enabled;
  }

  private saveState(injectionId: string): void {
    const config = this.injections.get(injectionId);
    if (!config) return;

    storageSet(config.storageKey, this.state[injectionId]);
  }
}

// Singleton instance
let registry: InjectionRegistry | null = null;

export function getRegistry(): InjectionRegistry {
  if (!registry) {
    registry = new InjectionRegistry();
  }
  return registry;
}
