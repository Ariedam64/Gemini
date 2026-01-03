// src/modules/environment/types.ts
// Type definitions for MGEnvironment module

/**
 * Platform surface (Discord or web)
 */
export type Surface = "discord" | "web";

/**
 * Operating system
 */
export type OS =
  | "windows"
  | "mac"
  | "ios"
  | "android"
  | "linux"
  | "chromeos"
  | "unknown";

/**
 * Device platform
 */
export type Platform = "desktop" | "mobile";

/**
 * Screen orientation
 */
export type Orientation = "portrait" | "landscape" | "unknown";

/**
 * Complete environment information
 */
export interface EnvironmentInfo {
  surface: Surface;
  host: string;
  origin: string;
  isInIframe: boolean;
  platform: Platform;
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
  orientation: Orientation;
}
