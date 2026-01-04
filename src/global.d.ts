/**
 * Global type declarations for Gemini
 */

import type { GeminiAPI } from "./api";

declare global {
  interface Window {
    Gemini: typeof GeminiAPI;
  }
}

export {};
