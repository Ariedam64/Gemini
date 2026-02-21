import { MGSprite } from "../../../modules/sprite";

type PixiTextureConstructor = {
  from?: (source: unknown, options?: unknown) => unknown;
};

export type TextureFromCaptureEntry = {
  key: string;
  count: number;
  firstSeenAt: number;
  lastSeenAt: number;
};

type CaptureState = {
  installed: boolean;
  capturing: boolean;
  originalFrom: ((source: unknown, options?: unknown) => unknown) | null;
  counts: Map<string, TextureFromCaptureEntry>;
  listeners: Set<() => void>;
};

let state: CaptureState | null = null;

function getState(): CaptureState {
  if (!state) {
    state = {
      installed: false,
      capturing: false,
      originalFrom: null,
      counts: new Map(),
      listeners: new Set(),
    };
  }
  return state;
}

function captureTextureCtor(): PixiTextureConstructor | null {
  try {
    const tmp = MGSprite.show("sprite/pet/Bee", { x: -1e6, y: -1e6, alpha: 0 });
    const Texture = (tmp as any)?.texture?.constructor as PixiTextureConstructor | undefined;
    (tmp as any)?.destroy?.();
    return Texture?.from ? Texture : null;
  } catch {
    return null;
  }
}

function notify(): void {
  const s = getState();
  for (const cb of s.listeners) {
    try {
      cb();
    } catch {}
  }
}

export function installTextureFromCaptureHook(): boolean {
  const s = getState();
  if (s.installed) return true;

  // Ensure sprite system exists so we can safely capture PIXI constructors.
  try {
    if (!MGSprite.isReady()) return false;
  } catch {
    return false;
  }

  const Texture = captureTextureCtor();
  if (!Texture?.from) return false;

  const original = Texture.from.bind(Texture);
  s.originalFrom = original;

  Texture.from = function (source: unknown, options?: unknown): unknown {
    if (s.capturing && typeof source === "string") {
      const key = String(source);
      const now = Date.now();
      const prev = s.counts.get(key);
      if (prev) {
        prev.count += 1;
        prev.lastSeenAt = now;
      } else {
        s.counts.set(key, { key, count: 1, firstSeenAt: now, lastSeenAt: now });
      }
      notify();
    }
    return original(source, options);
  };

  s.installed = true;
  return true;
}

export function setCapturing(enabled: boolean): void {
  const s = getState();
  s.capturing = !!enabled;
}

export function isCapturing(): boolean {
  return getState().capturing;
}

export function clearCapturedKeys(): void {
  const s = getState();
  s.counts.clear();
  notify();
}

export function listCapturedKeys(): TextureFromCaptureEntry[] {
  const s = getState();
  return [...s.counts.values()].sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return b.lastSeenAt - a.lastSeenAt;
  });
}

export function subscribeCaptureKeys(cb: () => void): () => void {
  const s = getState();
  s.listeners.add(cb);
  return () => {
    s.listeners.delete(cb);
  };
}

