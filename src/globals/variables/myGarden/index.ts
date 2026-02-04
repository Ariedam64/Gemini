/**
 * myGarden Module
 *
 * Public API for myGarden global state management.
 * Provides singleton instance for garden state tracking.
 *
 * @module globals/variables/myGarden
 */

import type { MyGardenGlobal } from "../../core/types";
import { createMyGardenGlobal } from "./lifecycle";

// Singleton instance
let instance: MyGardenGlobal | null = null;

/**
 * Get myGarden global singleton instance
 *
 * Creates the instance on first call, returns same instance on subsequent calls.
 */
export function getMyGarden(): MyGardenGlobal {
  if (!instance) {
    instance = createMyGardenGlobal();
  }
  return instance;
}

// Re-export types for convenience
export type { GardenSources, ListenerSets } from "./types";
