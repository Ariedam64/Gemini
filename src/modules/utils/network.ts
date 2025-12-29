// src/modules/utils/network.ts
// Network utilities for fetching game assets
// Uses native fetch (works in page context) with GM_xmlhttpRequest as fallback

import { pageWindow } from "../../utils/windowContext";

declare const GM_xmlhttpRequest: any;

// Use the current page origin instead of hardcoded value
export const ORIGIN = pageWindow?.location?.origin || "https://magicgarden.gg";

interface GMResponse {
  status: number;
  responseText: string;
  response: any;
}

/**
 * Check if GM_xmlhttpRequest is available
 */
function hasGM(): boolean {
  return typeof GM_xmlhttpRequest === "function";
}

/**
 * Fetch a URL using GM_xmlhttpRequest (bypasses CORS)
 */
function gmGet(
  url: string,
  responseType: "text" | "blob" | "arraybuffer" = "text"
): Promise<GMResponse> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url,
      responseType,
      onload: (r: GMResponse) =>
        r.status >= 200 && r.status < 300
          ? resolve(r)
          : reject(new Error(`HTTP ${r.status} for ${url}`)),
      onerror: () => reject(new Error(`Network error for ${url}`)),
      ontimeout: () => reject(new Error(`Timeout for ${url}`)),
    });
  });
}

/**
 * Fetch JSON from a URL (uses native fetch, falls back to GM_xmlhttpRequest)
 */
export async function getJSON<T = any>(url: string): Promise<T> {
  if (hasGM()) {
    return JSON.parse((await gmGet(url, "text")).responseText);
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

/**
 * Fetch a Blob from a URL (uses native fetch, falls back to GM_xmlhttpRequest)
 */
export async function getBlob(url: string): Promise<Blob> {
  if (hasGM()) {
    return (await gmGet(url, "blob")).response;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.blob();
}

/**
 * Fetch text from a URL (uses native fetch, falls back to GM_xmlhttpRequest)
 */
export async function getText(url: string): Promise<string> {
  if (hasGM()) {
    return (await gmGet(url, "text")).responseText;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

/**
 * Convert a Blob to an HTMLImageElement
 */
export function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const ImageCtor = (pageWindow as any)?.Image || Image;
    const img = new ImageCtor() as HTMLImageElement;
    img.decoding = "async";
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image decode failed"));
    };
    img.src = url;
  });
}
