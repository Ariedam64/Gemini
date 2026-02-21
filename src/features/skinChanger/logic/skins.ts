import { MGSprite } from "../../../modules/sprite";
import { loadConfig, saveConfig } from "../state";
import type { SkinChangerConfig, SkinChangerSkinEntry, SkinChangerCategory } from "../types";
import {
  clearAllTextureOverrides,
  clearTextureOverride,
  installTextureFromHook,
  isTextureFromHookInstalled,
  refreshSpriteCaches,
  setTextureOverride,
} from "./texOverride";
import { patchAtlasTexturePixels } from "./texturePatch";

type PixiTextureConstructor = {
  from?: (source: unknown, options?: unknown) => unknown;
};

function normalizeSpriteId(spriteId: string): string {
  return String(spriteId || "").trim().replace(/^\/+/, "");
}

function uniqueBySpriteId(entries: SkinChangerSkinEntry[]): SkinChangerSkinEntry[] {
  const map = new Map<string, SkinChangerSkinEntry>();
  for (const e of entries) {
    const k = normalizeSpriteId(e.spriteId);
    if (!k) continue;
    const scale = Number.isFinite(Number((e as any)?.scale)) ? Number((e as any).scale) : 1;
    map.set(k, { ...e, spriteId: k, scale });
  }
  return [...map.values()].sort((a, b) => a.spriteId.localeCompare(b.spriteId));
}

async function readFileAsDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result || ""));
    r.onerror = () => reject(r.error ?? new Error("FileReader failed"));
    r.readAsDataURL(file);
  });
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
  return img;
}

function resizeImageToCanvas(img: HTMLImageElement, w: number, h: number): HTMLCanvasElement {
  const cw = Math.max(1, Math.round(w));
  const ch = Math.max(1, Math.round(h));
  const c = document.createElement("canvas");
  c.width = cw;
  c.height = ch;
  const ctx = c.getContext("2d");
  if (!ctx) return c;
  ctx.clearRect(0, 0, cw, ch);

  // Contain-fit while preserving aspect ratio
  const iw = Math.max(1, img.naturalWidth || img.width || 1);
  const ih = Math.max(1, img.naturalHeight || img.height || 1);
  const s = Math.min(cw / iw, ch / ih);
  const dw = Math.max(1, Math.round(iw * s));
  const dh = Math.max(1, Math.round(ih * s));
  const dx = Math.round((cw - dw) / 2);
  const dy = Math.round((ch - dh) / 2);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, dx, dy, dw, dh);
  return c;
}

function createPatchCanvas(spriteId: string, img: HTMLImageElement): HTMLCanvasElement {
  const size = (MGSprite as any)?._internal?.getTextureSize?.(spriteId) as { w: number; h: number } | null;
  if (size) return resizeImageToCanvas(img, size.w, size.h);
  return resizeImageToCanvas(img, img.naturalWidth || img.width || 1, img.naturalHeight || img.height || 1);
}

function createTextureFromImage(img: HTMLImageElement): unknown {
  // Capture Texture ctor without importing PIXI directly.
  const tmp = MGSprite.show("sprite/pet/Bee", { x: -1e6, y: -1e6, alpha: 0 });
  const Texture = (tmp as any)?.texture?.constructor as PixiTextureConstructor | undefined;
  (tmp as any)?.destroy?.();

  if (!Texture?.from) throw new Error("PIXI Texture.from not available");

  // Ensure we produce a fresh base texture each update.
  // Use a canvas to avoid cross-origin/resource quirks with Image elements.
  const canvas = resizeImageToCanvas(img, img.naturalWidth || img.width || 1, img.naturalHeight || img.height || 1);
  return Texture.from(canvas);
}

function createTextureFromImageSized(spriteId: string, img: HTMLImageElement): unknown {
  const size = (MGSprite as any)?._internal?.getTextureSize?.(spriteId) as { w: number; h: number } | null;
  if (!size) return createTextureFromImage(img);
  const canvas = resizeImageToCanvas(img, size.w, size.h);

  const tmp = MGSprite.show("sprite/pet/Bee", { x: -1e6, y: -1e6, alpha: 0 });
  const Texture = (tmp as any)?.texture?.constructor as PixiTextureConstructor | undefined;
  (tmp as any)?.destroy?.();
  if (!Texture?.from) return createTextureFromImage(img);

  return Texture.from(canvas);
}

function clampScale(scale: number): number {
  if (!Number.isFinite(scale)) return 1;
  return Math.max(0.25, Math.min(4, scale));
}

function isPixiTextureLike(tex: unknown): tex is { frame?: any; orig?: any; trim?: any; rotate?: any; defaultAnchor?: any; updateUvs?: () => void } {
  return !!tex && typeof tex === "object";
}

function cloneTextureWithScale(texture: unknown, scale: number): unknown {
  // We can’t rely on `baseTexture.resolution` to influence display size.
  // Instead, rebuild a new Texture that reuses the same source but scales the rects.
  const s = clampScale(scale);
  if (s === 1) return texture;
  if (!isPixiTextureLike(texture)) return texture;

  const tmp = MGSprite.show("sprite/pet/Bee", { x: -1e6, y: -1e6, alpha: 0 });
  const TextureCtor = (tmp as any)?.texture?.constructor as any;
  const RectangleCtor = (tmp as any)?.texture?.frame?.constructor as any;
  (tmp as any)?.destroy?.();

  if (!TextureCtor || !RectangleCtor) return texture;
  const src = (texture as any).source ?? (texture as any).baseTexture ?? (texture as any).baseTexture?.resource;
  const frame = (texture as any).frame;
  const orig = (texture as any).orig;
  const trim = (texture as any).trim;
  const rotate = (texture as any).rotate ?? 0;

  if (!frame || !orig) return texture;

  const mkRect = (r: any) => new RectangleCtor(r.x * s, r.y * s, r.width * s, r.height * s);
  const frame2 = mkRect(frame);
  const orig2 = mkRect(orig);
  const trim2 = trim ? mkRect(trim) : undefined;

  let out: any;
  try {
    out = new TextureCtor({ source: (texture as any).source ?? (texture as any).baseTexture?.source ?? src, frame: frame2, orig: orig2, trim: trim2, rotate });
  } catch {
    try {
      out = new TextureCtor((texture as any).baseTexture || texture, frame2, orig2, trim2, rotate);
    } catch {
      return texture;
    }
  }

  try {
    if ((texture as any).defaultAnchor) out.defaultAnchor = (texture as any).defaultAnchor;
  } catch {}
  try {
    out.updateUvs?.();
  } catch {}

  return out;
}

function guessCategoryFromSpriteId(spriteId: string): SkinChangerCategory | undefined {
  const id = normalizeSpriteId(spriteId);
  const m = /^sprite\/([^/]+)\//.exec(id);
  if (!m) return undefined;
  const cat = m[1].toLowerCase();
  if (cat === "pet" || cat === "pets") return "pet";
  if (cat === "items" || cat === "item") return "item";
  if (cat === "decor" || cat === "decors") return "decor";
  if (cat === "eggs" || cat === "egg") return "egg";
  if (cat === "mutations" || cat === "mutation") return "mutation";
  if (cat === "mutation-overlay" || cat === "mutationoverlays") return "mutationOverlay";
  if (cat === "plants" || cat === "plant" || cat === "tallplants") return "plantPlant";
  if (cat === "seeds" || cat === "seed") return "plantSeed";
  return undefined;
}

export function getConfig(): SkinChangerConfig {
  const cfg = loadConfig();
  return { ...cfg, skins: uniqueBySpriteId(cfg.skins) };
}

export function setEnabled(enabled: boolean): void {
  const cfg = getConfig();
  const next = { ...cfg, enabled: !!enabled };
  saveConfig(next);

  if (!next.enabled) {
    // When disabling, remove overrides and refresh once.
    clearAllTextureOverrides();
    refreshSpriteCaches();
  } else {
    // When enabling, apply current stored skins.
    applyAllStoredSkins();
  }
}

export function isEnabled(): boolean {
  return !!getConfig().enabled;
}

export function isHookInstalled(): boolean {
  return isTextureFromHookInstalled();
}

export function listSkins(): SkinChangerSkinEntry[] {
  return getConfig().skins;
}

export async function addOrReplaceSkin(spriteId: string, file: File): Promise<void> {
  const id = normalizeSpriteId(spriteId);
  if (!id) throw new Error("Missing spriteId");

  const dataUrl = await readFileAsDataUrl(file);
  if (!dataUrl) throw new Error("Failed to read file");

  // Preload to validate it’s an image (and to avoid async surprises later).
  const img = await loadImage(dataUrl);
  const patchCanvas = createPatchCanvas(id, img);
  const tex = createTextureFromImageSized(id, img);

  const updatedAt = Date.now();
  const entry: SkinChangerSkinEntry = {
    spriteId: id,
    dataUrl,
    scale: 1,
    updatedAt,
    category: guessCategoryFromSpriteId(id),
  };

  const cfg = getConfig();
  const next: SkinChangerConfig = {
    ...cfg,
    skins: uniqueBySpriteId([...cfg.skins.filter((e) => normalizeSpriteId(e.spriteId) !== id), entry]),
  };
  saveConfig(next);

  if (!next.enabled) return;

  // Ensure MGSprite is ready and hook is installed on this client.
  try {
    if (!MGSprite.isReady()) {
      await MGSprite.init();
    }
  } catch {}

  // If this sprite key exists in the catalog but isn't loaded, attempt to load the atlas pack(s).
  try {
    await (MGSprite as any)?._internal?.ensureLoadedKeys?.([id]);
  } catch {}

  if (!installTextureFromHook()) throw new Error("Failed to install texture hook");

  // Only register a Texture.from override for non-atlas sprites.
  // Atlas-backed sprites are patched in-place (preferred).
  const atlasBacked = !!(MGSprite as any)?._internal?.hasTexture?.(id);
  if (atlasBacked) {
    const applied = patchAtlasTexturePixels(id, patchCanvas);
    if (!applied) console.warn("[SkinChanger] Atlas patch returned null for:", id);
  } else {
    setTextureOverride(id, tex, updatedAt);
    console.warn("[SkinChanger] Non-atlas sprite; override depends on Texture.from/Cache:", id);
  }

  // Compatibility fallback: also register Texture.from override for atlas-backed keys.
  // Some game paths fetch textures by key rather than reusing the atlas texture object.
  // This is safe now that we no longer hook Sprite.texture setter.
  setTextureOverride(id, tex, updatedAt);

  refreshSpriteCaches();
}

export function setSkinScale(spriteId: string, scale: number): void {
  const id = normalizeSpriteId(spriteId);
  if (!id) return;

  const nextScale = clampScale(scale);

  const cfg = getConfig();
  const idx = cfg.skins.findIndex((e) => normalizeSpriteId(e.spriteId) === id);
  if (idx < 0) return;

  const nextEntry: SkinChangerSkinEntry = { ...cfg.skins[idx], spriteId: id, scale: nextScale };
  const next: SkinChangerConfig = {
    ...cfg,
    skins: uniqueBySpriteId([
      ...cfg.skins.slice(0, idx),
      nextEntry,
      ...cfg.skins.slice(idx + 1),
    ]),
  };
  saveConfig(next);

  if (!next.enabled) return;
  applyAllStoredSkins();
}

export function removeSkin(spriteId: string): void {
  const id = normalizeSpriteId(spriteId);
  if (!id) return;

  const cfg = getConfig();
  const next: SkinChangerConfig = {
    ...cfg,
    skins: cfg.skins.filter((e) => normalizeSpriteId(e.spriteId) !== id),
  };
  saveConfig(next);

  if (!next.enabled) return;

  clearTextureOverride(id);
  refreshSpriteCaches();
}

export function clearAllSkins(): void {
  const cfg = getConfig();
  const next: SkinChangerConfig = { ...cfg, skins: [] };
  saveConfig(next);

  if (!next.enabled) return;

  clearAllTextureOverrides();
  refreshSpriteCaches();
}

export function applyAllStoredSkins(): void {
  const cfg = getConfig();
  if (!cfg.enabled) return;

  // Lazily ensure sprite system is ready before attempting to hook.
  // This prevents the “uploads do nothing” case on slower machines.
  try {
    if (!MGSprite.isReady()) {
      void MGSprite.init().then(() => applyAllStoredSkins());
      return;
    }
  } catch {}

  if (!installTextureFromHook()) return;

  // Recreate textures each time we apply, to avoid stale BaseTexture state.
  // (DataURLs remain the persistence format.)
  void (async () => {
    for (const entry of cfg.skins) {
      try {
        const img = await loadImage(entry.dataUrl);
        const patchCanvas = createPatchCanvas(entry.spriteId, img);
        const atlasBacked = !!(MGSprite as any)?._internal?.hasTexture?.(entry.spriteId);

        if (atlasBacked) {
          // Preferred path: patch pixels in place.
          patchAtlasTexturePixels(entry.spriteId, patchCanvas);
        } else {
          // Fallback path: use Texture.from override map.
          const texBase = createTextureFromImageSized(entry.spriteId, img);
          const tex = cloneTextureWithScale(texBase, entry.scale);
          setTextureOverride(entry.spriteId, tex, entry.updatedAt);
        }
      } catch (err) {
        console.warn("[SkinChanger] Failed to apply skin", entry.spriteId, err);
      }
    }
    refreshSpriteCaches();
  })();
}
