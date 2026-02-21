import { loadConfig } from "./state";
import type { SkinChangerSkinEntry } from "./types";
import {
  addOrReplaceSkin,
  applyAllStoredSkins,
  clearAllSkins,
  isEnabled,
  isHookInstalled,
  listSkins,
  removeSkin,
  setSkinScale,
  setEnabled,
} from "./logic/skins";
import {
  clearCapturedKeys,
  installTextureFromCaptureHook,
  isCapturing,
  listCapturedKeys,
  setCapturing,
  subscribeCaptureKeys,
} from "./logic/texCapture";

let inited = false;

function init(): void {
  if (inited) return;
  inited = true;

  const cfg = loadConfig();
  if (cfg.enabled) applyAllStoredSkins();
}

function destroy(): void {
  // Feature is purely hook + cached textures; leave installed hook in place,
  // but disabling clears overrides and refreshes.
  setEnabled(false);
  inited = false;
}

export const MGSkinChanger = {
  init,
  destroy,

  isEnabled,
  setEnabled,
  isHookInstalled,

  listSkins: (): SkinChangerSkinEntry[] => listSkins(),
  addOrReplaceSkin,
  removeSkin,
  clearAllSkins,
  setSkinScale,

  // Debug / discovery
  installCaptureHook: installTextureFromCaptureHook,
  setCaptureEnabled: setCapturing,
  isCaptureEnabled: isCapturing,
  clearCapturedKeys,
  listCapturedKeys,
  subscribeCapturedKeys: subscribeCaptureKeys,
};

export type { SkinChangerConfig, SkinChangerSkinEntry } from "./types";
