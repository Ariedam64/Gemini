// src/utils/http.ts
// Cross-origin HTTP helpers for userscript context.
//
// The mod fetches from mg-api.ariedam.fr while running on magicgarden.gg, so
// requests need the userscript's cross-origin channel. GM_xmlhttpRequest is
// preferred; native fetch is the fallback for environments that do not inject
// it (Discord activities, dev builds outside a userscript manager).

/** Fetch and parse JSON from a URL. Rejects on non-2xx or network failure. */
export function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    if (typeof GM_xmlhttpRequest === "undefined") {
      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
          return response.json();
        })
        .then((data) => resolve(data as T))
        .catch(reject);
      return;
    }

    GM_xmlhttpRequest({
      method: "GET",
      url,
      responseType: "json",
      onload(response) {
        if (response.status < 200 || response.status >= 300) {
          reject(new Error(`HTTP ${response.status} for ${url}`));
          return;
        }
        resolve(response.response as T);
      },
      onerror() {
        reject(new Error(`Network error: ${url}`));
      },
    });
  });
}

/**
 * Load an image from a URL into a decoded HTMLImageElement.
 *
 * Through GM_xmlhttpRequest the bytes arrive as a Blob and are handed to the
 * image as an object URL, which is revoked as soon as the image has decoded.
 * That path also avoids the canvas taint a plain cross-origin `<img>` would
 * cause, so callers can read pixels back out.
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (typeof GM_xmlhttpRequest === "undefined") {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Failed to load: ${url}`));
      image.src = url;
      return;
    }

    GM_xmlhttpRequest({
      method: "GET",
      url,
      responseType: "blob",
      onload(response) {
        if (response.status < 200 || response.status >= 300) {
          reject(new Error(`HTTP ${response.status} for ${url}`));
          return;
        }

        const objectUrl = URL.createObjectURL(response.response as Blob);
        const image = new Image();
        image.onload = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(image);
        };
        image.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          reject(new Error(`Failed to decode: ${url}`));
        };
        image.src = objectUrl;
      },
      onerror() {
        reject(new Error(`Network error: ${url}`));
      },
    });
  });
}
