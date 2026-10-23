// src/utils/http.ts
// Cross-origin HTTP helpers for userscript context.
//
// The mod fetches from mg-api.ariedam.fr while running on magicgarden.gg, so
// requests need the userscript's cross-origin channel. GM_xmlhttpRequest is
// preferred; native fetch is the fallback for environments that do not inject
// it (Discord activities, dev builds outside a userscript manager).

export interface TextRequest {
  method: "GET" | "POST";
  url: string;
  headers?: Record<string, string>;
  /** Always a string: the MG AFK app's GM_xmlhttpRequest turns any other body into "[object ...]". */
  body?: string;
  timeoutMs: number;
}

export interface TextResponse {
  status: number;
  body: string;
}

/**
 * Send a request and resolve with any status and the body as text. Rejects
 * on a network failure, and with a "timed out" error once `timeoutMs` has
 * passed: the MG AFK app's GM_xmlhttpRequest ignores `timeout`, so the timer
 * here is the one that counts.
 */
export function requestText(request: TextRequest): Promise<TextResponse> {
  return new Promise((resolve, reject) => {
    let settled = false;
    let abort: (() => void) | null = null;

    const finish = (outcome: () => void): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      outcome();
    };
    const fail = (message: string) => finish(() => reject(new Error(message)));
    const timer = setTimeout(() => {
      fail(`Request timed out: ${request.url}`);
      try {
        abort?.();
      } catch {
        // Nothing left to cancel.
      }
    }, request.timeoutMs);

    if (typeof GM_xmlhttpRequest === "undefined") {
      const controller = new AbortController();
      abort = () => controller.abort();
      fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        credentials: "omit",
        signal: controller.signal,
      })
        .then(async (response) => {
          const body = await response.text();
          finish(() => resolve({ status: response.status, body }));
        })
        .catch(() => fail(`Network error: ${request.url}`));
      return;
    }

    try {
      const handle = GM_xmlhttpRequest({
        method: request.method,
        url: request.url,
        headers: request.headers,
        data: request.body,
        timeout: request.timeoutMs,
        anonymous: true,
        onload(response) {
          finish(() => resolve({ status: response.status, body: response.responseText ?? "" }));
        },
        onerror() {
          fail(`Network error: ${request.url}`);
        },
        ontimeout() {
          fail(`Request timed out: ${request.url}`);
        },
        onabort() {
          fail(`Request aborted: ${request.url}`);
        },
      });
      abort = () => handle?.abort?.();
    } catch {
      fail(`Network error: ${request.url}`);
    }
  });
}

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
