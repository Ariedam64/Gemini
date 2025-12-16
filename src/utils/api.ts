

export type Surface = "discord" | "web";

export type OS =
  | "windows"
  | "mac"
  | "ios"
  | "android"
  | "linux"
  | "chromeos"
  | "unknown";

export interface EnvironmentInfo {
  surface: Surface;
  host: string;
  origin: string;
  isInIframe: boolean;
  platform: "desktop" | "mobile";
  browser: string;
  os:OS;

  viewportWidth: number;         // window.innerWidth (CSS px)
  viewportHeight: number;        // window.innerHeight (CSS px)
  visualViewportWidth: number;   // if available (mobile zoom), otherwise fallback = viewportWidth
  visualViewportHeight: number;
  screenWidth: number;           // screen.width (CSS px)
  screenHeight: number;          // screen.height (CSS px)
  availScreenWidth: number;      // screen.availWidth (system UI areas excluded)
  availScreenHeight: number;
  dpr: number;                   // devicePixelRatio
  orientation: "portrait" | "landscape" | "unknown";
}

function getOrientation(): "portrait" | "landscape" | "unknown" {
  try {
    const vv = (window as any).visualViewport;
    const w = Math.round((vv?.width ?? window.innerWidth) || 0);
    const h = Math.round((vv?.height ?? window.innerHeight) || 0);
    if (w && h) return w >= h ? "landscape" : "portrait";
  } catch {}
  return "unknown";
}

function detectOS(): OS {
  const ua = navigator.userAgent || "";
  const plat = (navigator as any).platform || "";
  const uaData = (navigator as any).userAgentData;

  // UA-CH brandless OS hint
  if (uaData && typeof uaData.platform === "string") {
    const p = uaData.platform.toLowerCase();
    if (p.includes("windows")) return "windows";
    if (p.includes("mac")) return "mac";
    if (p.includes("android")) return "android";
    if (p.includes("chrome os") || p.includes("cros")) return "chromeos";
    if (p.includes("linux")) return "linux";
    if (p.includes("ios")) return "ios";
  }

  // iPadOS spoof (MacIntel + touch)
  const isIOSLike =
    /iPhone|iPad|iPod/i.test(ua) ||
    (plat === "MacIntel" && (navigator as any).maxTouchPoints > 1);

  if (isIOSLike) return "ios";
  if (/Android/i.test(ua)) return "android";
  if (/CrOS/i.test(ua)) return "chromeos";
  if (/Win/i.test(ua)) return "windows";
  if (/Mac/i.test(ua)) return "mac";
  if (/Linux/i.test(ua)) return "linux";
  return "unknown";
}

function detectBrowser(): string {
  const ua = navigator.userAgent || "";
  const uaData = (navigator as any).userAgentData;

  // UA-CH brands if available (Chromium-based)
  if (uaData && Array.isArray(uaData.brands)) {
    const brands: string[] = uaData.brands.map((b: any) => String(b.brand || b.brandName || b.brandVersion || b));
    const hasEdge = brands.some(b => /Edge/i.test(b) || /Microsoft Edge/i.test(b));
    const hasOpera = brands.some(b => /Opera/i.test(b) || /OPR/i.test(b));
    const hasChrome = brands.some(b => /Chrome|Chromium/i.test(b));
    if (hasEdge) return "Edge";
    if (hasOpera) return "Opera";
    if (hasChrome) return "Chrome";
    // Brave lies about brands. Simple attempt:
    if ((navigator as any).brave) return "Brave";
  }

  // iOS tokens first
  if (/FxiOS/i.test(ua)) return "Firefox";
  if (/CriOS/i.test(ua)) return "Chrome";
  if (/EdgiOS/i.test(ua)) return "Edge";
  if (/OPiOS|OPR|Opera Mini|Opera/i.test(ua)) return "Opera";

  // Desktop/classic
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR\//i.test(ua) || /Opera/i.test(ua)) return "Opera";
  if (/Firefox/i.test(ua)) return "Firefox";
  if (/Safari/i.test(ua) && !/Chrome|Chromium|Edg|OPR/i.test(ua)) return "Safari";
  if (/Brave/i.test(ua) || (window as any).Brave || (navigator as any).brave) return "Brave";
  if (/Chrome|Chromium/i.test(ua)) return "Chrome";

  return "Unknown";
}

function isMobilePlatform(): "desktop" | "mobile" {
  const ua = navigator.userAgent || "";
  const uaData = (navigator as any).userAgentData;
  if (uaData && typeof uaData.mobile === "boolean") {
    return uaData.mobile ? "mobile" : "desktop";
  }
  return /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ? "mobile" : "desktop";
}

/** Detect whether the current page is embedded inside Discord or running standalone. */
export function detectEnvironment(): EnvironmentInfo {
  const isInIframe = (() => {
    try { return window.top !== window.self; } catch { return true; }
  })();

  const refHost = safeHost(document.referrer);
  const parentLooksDiscord =
    isInIframe && !!refHost && /(^|\.)discord(app)?\.com$/i.test(refHost);

  const surface: Surface = parentLooksDiscord ? "discord" : "web";
  const platform = isMobilePlatform();
  const os = detectOS();
  const browser = detectBrowser();

  // Reasonable “max” measurements: current screen + available area
  // (No, you will not get the dimensions of other screens.)
  const scr = window.screen || ({} as Screen);
  const vv = (window as any).visualViewport;

  const viewportWidth  = Math.round(window.innerWidth  || document.documentElement.clientWidth || 0);
  const viewportHeight = Math.round(window.innerHeight || document.documentElement.clientHeight || 0);

  const visualViewportWidth  = Math.round(vv?.width  ?? viewportWidth);
  const visualViewportHeight = Math.round(vv?.height ?? viewportHeight);

  const screenWidth  = Math.round((scr as any).width  || 0);
  const screenHeight = Math.round((scr as any).height || 0);
  const availScreenWidth  = Math.round((scr as any).availWidth  || screenWidth);
  const availScreenHeight = Math.round((scr as any).availHeight || screenHeight);

  const dpr = Number.isFinite(window.devicePixelRatio) ? window.devicePixelRatio : 1;

  return {
    surface,
    host: location.hostname,
    origin: location.origin,
    isInIframe,
    platform,
    browser,
    os,

    viewportWidth,
    viewportHeight,
    visualViewportWidth,
    visualViewportHeight,
    screenWidth,
    screenHeight,
    availScreenWidth,
    availScreenHeight,
    dpr,
    orientation: getOrientation(),
  };
}

/** Convenience shortcut. */
export function isDiscordSurface(): boolean {
  return detectEnvironment().surface === "discord";
}

export type RoomEndpoint = "info";

/** Build the REST URL for a room endpoint. */
export function buildRoomApiUrl(
  roomIdOrCode: string,
  endpoint: RoomEndpoint = "info"
): string {
  return `${location.origin}/api/rooms/${encodeURIComponent(roomIdOrCode)}/${endpoint}`;
}

export interface RequestRoomOptions {
  jwt?: string;
  preferGM?: boolean;
  timeoutMs?: number;
  endpoint?: RoomEndpoint;
}

export interface RoomPlayerPayload {
  id?: string;
  name?: string;
  isConnected?: boolean;
  discordAvatarUrl?: string | null;
  databaseUserId?: string;
  [key: string]: unknown;
}

export interface RoomInfoPayload {
  roomId?: string;
  numPlayers?: number;
  currentGame?: string;
  hostPlayerId?: string;
  players?: RoomPlayerPayload[];
  [key: string]: unknown;
}

export interface RoomRequestResult<T = unknown> {
  url: string;
  status: number;
  ok: boolean;
  body: string;
  parsed?: T;
}

/** Execute a GET request with the Fetch API and a timeout. */
async function httpGetWithFetch(
  url: string,
  headers: Record<string, string> | undefined,
  timeoutMs = 10_000
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers,
      signal: controller.signal,
    });
    const body = await res.text();
    return { status: res.status, ok: res.ok, body };
  } finally {
    clearTimeout(timeout);
  }
}

function httpGetWithGM(
  url: string,
  headers: Record<string, string> | undefined,
  timeoutMs = 10_000
) {
  return new Promise<{ status: number; ok: boolean; body: string }>((resolve, reject) => {
    if (typeof GM_xmlhttpRequest !== "function") {
      reject(new Error("GM_xmlhttpRequest is not available"));
      return;
    }

    GM_xmlhttpRequest({
      method: "GET",
      url,
      headers,
      timeout: timeoutMs,
      onload: (response) =>
        resolve({
          status: response.status,
          ok: response.status >= 200 && response.status < 300,
          body: response.responseText,
        }),
      onerror: (error) => reject(error),
      ontimeout: () => reject(new Error("GM_xmlhttpRequest timed out")),
    });
  });
}

export async function requestRoomEndpoint<T = unknown>(
  roomIdOrCode: string,
  options: RequestRoomOptions = {}
): Promise<RoomRequestResult<T>> {
  const endpoint = options.endpoint ?? "info";
  const url = buildRoomApiUrl(roomIdOrCode, endpoint);
  const headers: Record<string, string> = {};

  if (options.jwt) {
    headers["Authorization"] = `Bearer ${options.jwt}`;
  }

  let rawResponse: { status: number; ok: boolean; body: string } | undefined;

  if (options.preferGM && typeof GM_xmlhttpRequest === "function") {
    rawResponse = await httpGetWithGM(url, headers, options.timeoutMs);
  } else {
    try {
      rawResponse = await httpGetWithFetch(url, headers, options.timeoutMs);
    } catch (error) {
      if (typeof GM_xmlhttpRequest === "function") {
        rawResponse = await httpGetWithGM(url, headers, options.timeoutMs);
      } else {
        throw error;
      }
    }
  }

  let parsed: T | undefined;
  try {
    parsed = JSON.parse(rawResponse.body) as T;
  } catch {
    // Non JSON body – leave `parsed` undefined
  }

  return { url, ...rawResponse, parsed };
}

export async function getPlayersRoom(
  roomIdOrCode: string,
  options: Omit<RequestRoomOptions, "endpoint"> = {}
): Promise<number> {
  const response = await requestRoomEndpoint<RoomInfoPayload>(roomIdOrCode, {
    ...options,
    endpoint: "info",
  });

  if (!response.ok) {
    throw new Error(
      `Impossible de récupérer les joueurs de la room ${roomIdOrCode} (HTTP ${response.status}).`
    );
  }

  const payload =
    response.parsed ??
    (() => {
      try {
        return JSON.parse(response.body) as RoomInfoPayload;
      } catch {
        return undefined;
      }
    })();

  if (!payload || typeof payload.numPlayers !== "number" || !Number.isFinite(payload.numPlayers)) {
    throw new Error(`Réponse invalide pour la room ${roomIdOrCode}: numPlayers absent.`);
  }

  return Math.max(0, Math.floor(payload.numPlayers));
}

export function extractJwtFromUrl(urlLike: string): string | undefined {
  try {
    const url = new URL(urlLike);
    const raw = url.searchParams.get("jwt");
    if (!raw) return undefined;

    let token = decodeURIComponent(raw);
    token = token.replace(/^%22|%22$/g, "");
    token = token.replace(/^"+|"+$/g, "");
    return token;
  } catch {
    return undefined;
  }
}

function safeHost(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

/* ───────────────────────────── JOIN BY CODE ───────────────────────────── */

export interface JoinRoomOptions {
  /** Prefer SPA navigation (history + popstate) when possible. */
  preferSoft?: boolean;
  /** Perform a full reload when the soft navigation fails. Defaults to `true`. */
  hardIfSoftFails?: boolean;
  /**
   * Discord activities do not support switching rooms by code.
   * When `true`, redirect the user to the official website instead.
   */
  siteFallbackOnDiscord?: boolean;
  /** Open the site fallback in a new tab instead of the current window. */
  openInNewTab?: boolean;
}

export type JoinRoomMode = "soft" | "hard" | "site-fallback" | "noop" | "discord-unsupported";

export interface JoinRoomResult {
  ok: boolean;
  mode: JoinRoomMode;
  url?: string;
  message?: string;
}

/** Build a SPA (soft) URL pointing to `/r/<code>` while preserving the current query string. */
function buildSoftJoinUrl(roomCode: string): string {
  const merged = new URLSearchParams(location.search);
  const url = new URL(location.href);
  url.pathname = `/r/${encodeURIComponent(roomCode)}`;
  url.search = merged.toString();
  return url.toString();
}

/** Build a full reload URL pointing to `/r/<code>`. */
function buildHardJoinUrl(roomCode: string): string {
  return buildSoftJoinUrl(roomCode);
}

/**
 * Join a room by code or ID.
 * - On the official website we prefer SPA navigation when possible.
 * - On the Discord activity we either return an explicit unsupported message or
 *   redirect to the site if `siteFallbackOnDiscord` is enabled.
 */
export function joinRoom(roomCode: string, options: JoinRoomOptions = {}): JoinRoomResult {
  const env = detectEnvironment();
  const isDiscord = env.surface === "discord";
  const preferSoft = options.preferSoft ?? !isDiscord;
  const hardIfSoftFails = options.hardIfSoftFails ?? true;

  if (isDiscord) {
    if (options.siteFallbackOnDiscord) {
      const fallback = `https://magiccircle.gg/r/${encodeURIComponent(roomCode)}`;
      if (options.openInNewTab) {
        window.open(fallback, "_blank", "noopener,noreferrer");
      } else {
        location.assign(fallback);
      }
      return {
        ok: true,
        mode: "site-fallback",
        url: fallback,
        message: "Discord activity does not support room switching by code, redirecting to the official site.",
      };
    }

    return {
      ok: false,
      mode: "discord-unsupported",
      message: "Discord activity does not support joining a room by code. Open the website or use an activity invite.",
    };
  }

  const softUrl = buildSoftJoinUrl(roomCode);

  if (preferSoft) {
    try {
      const url = new URL(softUrl);
      if (url.origin === location.origin) {
        history.replaceState({}, "", url.pathname + (url.search || "") + (url.hash || ""));
        window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
        // eslint-disable-next-line no-console
        return { ok: true, mode: "soft", url: url.toString() };
      }
    } catch {
      // Ignore and potentially fall back to a hard reload.
    }

    if (!hardIfSoftFails) {
      return {
        ok: false,
        mode: "noop",
        url: softUrl,
        message: "Soft navigation failed because the origins differ.",
      };
    }
  }

  const hardUrl = buildHardJoinUrl(roomCode);
  // eslint-disable-next-line no-console
  location.assign(hardUrl);
  return { ok: true, mode: "hard", url: hardUrl };
}

/* ------------------------------------------------------------------ */
/* ---------------------------- Usage example ----------------------- */
/* ------------------------------------------------------------------ */
/*
(async () => {
  const env = detectEnvironment();
  console.log("[env]", env, "isDiscord?", isDiscordSurface());

  const room = "2";

  const response = await requestRoomEndpoint(room);
  logRoomResult("GET /info", room, response);

  const joinResult = joinRoom(room, { siteFallbackOnDiscord: true, openInNewTab: true });
  console.log("[joinRoom] result:", joinResult);
})();
*/
