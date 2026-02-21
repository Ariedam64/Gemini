import { storageGet, storageSet } from "../../utils/storage";
import { DEFAULT_CONFIG, STORAGE_KEY, type SkinChangerConfig } from "./types";

export function loadConfig(): SkinChangerConfig {
  const raw = storageGet<SkinChangerConfig>(STORAGE_KEY, DEFAULT_CONFIG);
  return {
    enabled: !!raw.enabled,
    skins: Array.isArray(raw.skins)
      ? raw.skins.map((e: any) => ({
          spriteId: String(e?.spriteId || ""),
          dataUrl: String(e?.dataUrl || ""),
          scale: Number.isFinite(Number(e?.scale)) ? Number(e.scale) : 1,
          updatedAt: Number.isFinite(Number(e?.updatedAt)) ? Number(e.updatedAt) : 0,
          category: e?.category,
        }))
      : [],
  };
}

export function saveConfig(config: SkinChangerConfig): void {
  storageSet(STORAGE_KEY, config);
}
