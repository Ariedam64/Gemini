// src/modules/core/environment.ts
// MGEnvironment - Detects user environment (OS, browser, platform, surface)

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
  os: OS;
  viewportWidth: number;
  viewportHeight: number;
  visualViewportWidth: number;
  visualViewportHeight: number;
  screenWidth: number;
  screenHeight: number;
  availScreenWidth: number;
  availScreenHeight: number;
  dpr: number;
  orientation: "portrait" | "landscape" | "unknown";
}

function getOrientation(): "portrait" | "landscape" | "unknown" {
  try {
    const vv = (window as unknown as { visualViewport?: { width: number; height: number } }).visualViewport;
    const w = Math.round((vv?.width ?? window.innerWidth) || 0);
    const h = Math.round((vv?.height ?? window.innerHeight) || 0);
    if (w && h) return w >= h ? "landscape" : "portrait";
  } catch {}
  return "unknown";
}

function detectOS(): OS {
  const ua = navigator.userAgent || "";
  const plat = (navigator as unknown as { platform?: string }).platform || "";
  const uaData = (navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData;

  if (uaData && typeof uaData.platform === "string") {
    const p = uaData.platform.toLowerCase();
    if (p.includes("windows")) return "windows";
    if (p.includes("mac")) return "mac";
    if (p.includes("android")) return "android";
    if (p.includes("chrome os") || p.includes("cros")) return "chromeos";
    if (p.includes("linux")) return "linux";
    if (p.includes("ios")) return "ios";
  }

  const isIOSLike =
    /iPhone|iPad|iPod/i.test(ua) ||
    (plat === "MacIntel" && ((navigator as unknown as { maxTouchPoints?: number }).maxTouchPoints ?? 0) > 1);

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
  const uaData = (navigator as unknown as { userAgentData?: { brands?: Array<{ brand?: string; brandName?: string; brandVersion?: string }> } }).userAgentData;

  if (uaData && Array.isArray(uaData.brands)) {
    const brands = uaData.brands.map((b) => String(b.brand || b.brandName || b.brandVersion || b));
    const hasEdge = brands.some((b) => /Edge/i.test(b) || /Microsoft Edge/i.test(b));
    const hasOpera = brands.some((b) => /Opera/i.test(b) || /OPR/i.test(b));
    const hasChrome = brands.some((b) => /Chrome|Chromium/i.test(b));
    if (hasEdge) return "Edge";
    if (hasOpera) return "Opera";
    if (hasChrome) return "Chrome";
    if ((navigator as unknown as { brave?: unknown }).brave) return "Brave";
  }

  if (/FxiOS/i.test(ua)) return "Firefox";
  if (/CriOS/i.test(ua)) return "Chrome";
  if (/EdgiOS/i.test(ua)) return "Edge";
  if (/OPiOS|OPR|Opera Mini|Opera/i.test(ua)) return "Opera";
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR\//i.test(ua) || /Opera/i.test(ua)) return "Opera";
  if (/Firefox/i.test(ua)) return "Firefox";
  if (/Safari/i.test(ua) && !/Chrome|Chromium|Edg|OPR/i.test(ua)) return "Safari";
  if (/Brave/i.test(ua) || (window as unknown as { Brave?: unknown }).Brave || (navigator as unknown as { brave?: unknown }).brave) return "Brave";
  if (/Chrome|Chromium/i.test(ua)) return "Chrome";

  return "Unknown";
}

function detectPlatform(): "desktop" | "mobile" {
  const ua = navigator.userAgent || "";
  const uaData = (navigator as unknown as { userAgentData?: { mobile?: boolean } }).userAgentData;
  if (uaData && typeof uaData.mobile === "boolean") {
    return uaData.mobile ? "mobile" : "desktop";
  }
  return /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ? "mobile" : "desktop";
}

function safeHost(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function detect(): EnvironmentInfo {
  const isInIframe = (() => {
    try {
      return window.top !== window.self;
    } catch {
      return true;
    }
  })();

  const refHost = safeHost(document.referrer);
  const parentLooksDiscord = isInIframe && !!refHost && /(^|\.)discord(app)?\.com$/i.test(refHost);
  const surface: Surface = parentLooksDiscord ? "discord" : "web";
  const platform = detectPlatform();
  const os = detectOS();
  const browser = detectBrowser();

  const scr = window.screen || ({} as Screen);
  const vv = (window as unknown as { visualViewport?: { width: number; height: number } }).visualViewport;

  const viewportWidth = Math.round(window.innerWidth || document.documentElement.clientWidth || 0);
  const viewportHeight = Math.round(window.innerHeight || document.documentElement.clientHeight || 0);
  const visualViewportWidth = Math.round(vv?.width ?? viewportWidth);
  const visualViewportHeight = Math.round(vv?.height ?? viewportHeight);
  const screenWidth = Math.round(scr.width || 0);
  const screenHeight = Math.round(scr.height || 0);
  const availScreenWidth = Math.round(scr.availWidth || screenWidth);
  const availScreenHeight = Math.round(scr.availHeight || screenHeight);
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

function isDiscord(): boolean {
  return detect().surface === "discord";
}

function isMobile(): boolean {
  return detect().platform === "mobile";
}

export const MGEnvironment = {
  detect,
  isDiscord,
  isMobile,
  detectOS,
  detectBrowser,
};
