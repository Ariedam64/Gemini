// src/global.d.ts
// Global type declarations

import type { GeminiAPIType } from "./api";

declare global {
  interface Window {
    Gemini: GeminiAPIType;
  }
}

export {};
