/**
 * HUD Storage Wrapper
 * 
 * Re-exports from the unified storage wrapper in src/utils/storage.ts
 * This file exists for backward compatibility with existing HUD code.
 * 
 * @deprecated Import directly from @/utils/storage instead
 */

export {
  storageGet as loadFromTampermonkey,
  storageSet as saveToTampermonkey,
  storageRemove as clearTampermonkeyStorage,
  storageHas as hasStorageKey,
} from '../../../utils/storage';
