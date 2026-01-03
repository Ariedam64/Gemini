// src/modules/data/logic/hooks.ts
// Object.* hook installation and restoration

import { captureState, NativeObject, originalObjectKeys, originalObjectValues, originalObjectEntries } from "../state";
import { tryCapture } from "./capture";

/**
 * Install hooks on Object.keys/values/entries to capture game data
 */
export function installObjectHooks(): void {
  if (captureState.isHookInstalled) return;

  // Global sentinel to prevent double-patching across HMR/scripts
  if ((NativeObject as any).__MG_HOOKED__) {
    captureState.isHookInstalled = true;
    return;
  }
  (NativeObject as any).__MG_HOOKED__ = true;
  captureState.isHookInstalled = true;

  try {
    NativeObject.keys = function hookedKeys(target: any): any {
      tryCapture(target);
      return originalObjectKeys.apply(this, arguments as any);
    };

    if (originalObjectValues) {
      NativeObject.values = function hookedValues(target: any): any {
        tryCapture(target);
        return (originalObjectValues as any).apply(this, arguments as any);
      };
    }

    if (originalObjectEntries) {
      NativeObject.entries = function hookedEntries(target: any): any {
        tryCapture(target);
        return (originalObjectEntries as any).apply(this, arguments as any);
      };
    }
  } catch {
    // Ignore hook installation errors
  }
}

/**
 * Restore original Object methods
 */
export function restoreObjectHooks(): void {
  if (!captureState.isHookInstalled) return;
  try {
    NativeObject.keys = originalObjectKeys;
    if (originalObjectValues) NativeObject.values = originalObjectValues;
    if (originalObjectEntries) NativeObject.entries = originalObjectEntries;
  } catch {
    // Ignore restoration errors
  }
  captureState.isHookInstalled = false;
}
