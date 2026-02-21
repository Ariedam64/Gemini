import { MGTile } from "../../../modules/tile";
import { MGSprite } from "../../../modules/sprite";
import { cacheState } from "../../../modules/sprite/state";

export type TextureFrom = (source: unknown, options?: unknown) => unknown;

type PixiTextureConstructor = {
  from?: TextureFrom;
};

type PixiTextureLike = {
  destroy?: () => void;
};

export type TextureOverrideEntry = {
  texture: unknown;
  updatedAt: number;
};

type OverrideState = {
  installed: boolean;
  overrides: Map<string, TextureOverrideEntry>;
  originalFrom: TextureFrom | null;
  originalFromCache: ((key: unknown) => unknown) | null;
};

let state: OverrideState | null = null;

function getState(): OverrideState {
  if (!state) {
    state = {
      installed: false,
      overrides: new Map(),
      originalFrom: null,
      originalFromCache: null,
    };
  }
  return state;
}

function captureTextureCtor(): PixiTextureConstructor | null {
  try {
    const tmp = MGSprite.show("sprite/pet/Bee", { x: -1e6, y: -1e6, alpha: 0 });
    const Texture = (tmp as any)?.texture?.constructor as PixiTextureConstructor | undefined;
    (tmp as unknown as PixiTextureLike | undefined)?.destroy?.();
    return Texture?.from ? Texture : null;
  } catch {
    return null;
  }
}

function tryHookTextureFromCache(): void {
  const s = getState();
  if (s.originalFromCache) return;
  try {
    const tmp = MGSprite.show("sprite/pet/Bee", { x: -1e6, y: -1e6, alpha: 0 });
    const tex = (tmp as any)?.texture as any;
    (tmp as any)?.destroy?.();

    const TextureCtor = tex?.constructor as any;
    if (!TextureCtor) return;
    const orig = TextureCtor.fromCache as ((key: unknown) => unknown) | undefined;
    if (typeof orig !== "function") return;

    s.originalFromCache = orig.bind(TextureCtor);
    TextureCtor.fromCache = function (key: unknown): unknown {
      if (typeof key === "string") {
        const hit = s.overrides.get(key);
        if (hit) return hit.texture;
      }
      return s.originalFromCache ? s.originalFromCache(key) : orig(key);
    };
  } catch {}
}

export function installTextureFromHook(): boolean {
  const s = getState();
  if (s.installed) return true;

  const Texture = captureTextureCtor();
  if (!Texture?.from) return false;

  const original = Texture.from.bind(Texture);
  s.originalFrom = original;

  Texture.from = function (source: unknown, options?: unknown): unknown {
    if (typeof source === "string") {
      const hit = s.overrides.get(source);
      if (hit) return hit.texture;
    }
    return original(source, options);
  };

  // Some Pixi paths use Texture.fromCache(key) rather than Texture.from(key).
  // Hook it too (best-effort, guarded).
  tryHookTextureFromCache();

  s.installed = true;
  return true;
}

export function isTextureFromHookInstalled(): boolean {
  return getState().installed;
}

export function setTextureOverride(spriteId: string, texture: unknown, updatedAt: number): void {
  const s = getState();
  s.overrides.set(spriteId, { texture, updatedAt });
}

export function clearTextureOverride(spriteId: string): void {
  const s = getState();
  s.overrides.delete(spriteId);
}

export function clearAllTextureOverrides(): void {
  const s = getState();
  s.overrides.clear();
}

export function refreshSpriteCaches(): void {
  const eng = MGTile.engine?.();

  // Important: do not call `.clear()` unless the object is known-safe in this runtime.
  // These guards keep this compatible across game versions.
  try {
    eng?.gameTextureCache?.textureCache?.clear?.();
  } catch {}

  try {
    eng?.canvasSpriteCache?.clear?.();
  } catch {}

  try {
    MGSprite.clearMutationCache();
  } catch {}

  try {
    MGSprite.clearToCanvasCache();
  } catch {}

  // Also clear mutation source-canvas cache, which is used by the mutation composer.
  // If we don't clear this, Pixi v8 mutated textures can keep using stale base pixels.
  try {
    cacheState.srcCanvas.clear();
  } catch {}

  // Force visible tiles to rebuild their visuals.
  try {
    const tos = MGTile.tos?.();
    const ctx = eng?.reusableContext;

    tos?.tileViews?.forEach?.((tv: any) => {
      if (!tv?.tileObject) return;
      tv.onDataChanged?.(tv.tileObject);
      if (ctx && typeof tv.update === "function") tv.update(ctx);
    });
  } catch {}
}
