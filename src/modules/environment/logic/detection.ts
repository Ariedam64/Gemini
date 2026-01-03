// src/modules/environment/logic/detection.ts
// Environment detection logic

import type { EnvironmentInfo, OS, Platform, Surface, Orientation } from "../types";
import { getPlatformOverride, getCachedEnvironment, setCachedEnvironment } from "../state";

/**
 * Detect screen orientation
 */
function detectOrientation(): Orientation {
  try {
    const vv = (window as unknown as { visualViewport?: { width: number; height: number } }).visualViewport;
    const width = Math.round((vv?.width ?? window.innerWidth) || 0);
    const height = Math.round((vv?.height ?? window.innerHeight) || 0);
    if (width && height) return width >= height ? "landscape" : "portrait";
  } catch {
    // Ignore errors
  }
  return "unknown";
}

/**
 * Detect operating system
 */
export function detectOS(): OS {
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

/**
 * Detect browser
 */
export function detectBrowser(): string {
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

/**
 * Detect platform (desktop or mobile)
 */
function detectPlatform(): Platform {
  const override = getPlatformOverride();
  if (override) return override;

  const ua = navigator.userAgent || "";
  const uaData = (navigator as unknown as { userAgentData?: { mobile?: boolean } }).userAgentData;

  if (uaData && typeof uaData.mobile === "boolean") {
    return uaData.mobile ? "mobile" : "desktop";
  }

  return /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ? "mobile" : "desktop";
}

/**
 * Extract hostname from URL safely
 */
function extractHostname(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

/**
 * Detect if running in iframe
 */
function detectIframe(): boolean {
  try {
    return window.top !== window.self;
  } catch {
    return true;
  }
}

/**
 * Detect surface (Discord or web)
 */
function detectSurface(): Surface {
  const isInIframe = detectIframe();
  const refHost = extractHostname(document.referrer);
  const parentLooksDiscord = isInIframe && !!refHost && /(^|\.)discord(app)?\.com$/i.test(refHost);
  return parentLooksDiscord ? "discord" : "web";
}

/**
 * Detect complete environment information
 */
export function detectEnvironment(): EnvironmentInfo {
  const cached = getCachedEnvironment();
  if (cached) return cached;

  const surface = detectSurface();
  const platform = detectPlatform();
  const os = detectOS();
  const browser = detectBrowser();
  const isInIframe = detectIframe();

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

  const info: EnvironmentInfo = {
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
    orientation: detectOrientation(),
  };

  setCachedEnvironment(info);
  return info;
}

/**
 * Check if running on Discord
 */
export function checkIsDiscord(): boolean {
  return detectEnvironment().surface === "discord";
}

/**
 * Check if running on mobile
 */
export function checkIsMobile(): boolean {
  return detectEnvironment().platform === "mobile";
}

/**
 * Initialize module (detects environment)
 */
export function initializeEnvironment(): void {
  detectEnvironment();
}

/**
 * Check if module is ready
 */
export function isModuleReady(): boolean {
  return getCachedEnvironment() !== null;
}
