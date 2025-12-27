// src/modules/utils/network.ts
// Network utilities for fetching game assets via GM_xmlhttpRequest

declare const GM_xmlhttpRequest: any;

export const ORIGIN = "https://magicgarden.gg";

interface GMResponse {
  status: number;
  responseText: string;
  response: any;
}

/**
 * Fetch a URL using GM_xmlhttpRequest (bypasses CORS)
 */
export function gmGet(
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
 * Fetch JSON from a URL
 */
export const getJSON = async <T = any>(url: string): Promise<T> =>
  JSON.parse((await gmGet(url, "text")).responseText);

/**
 * Fetch a Blob from a URL
 */
export const getBlob = async (url: string): Promise<Blob> =>
  (await gmGet(url, "blob")).response;

/**
 * Convert a Blob to an HTMLImageElement
 */
export function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
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
