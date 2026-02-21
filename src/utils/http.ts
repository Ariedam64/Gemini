/**
 * HTTP Helpers (GM_xmlhttpRequest)
 *
 * Utility HTTP functions for features/injectors.
 * Dependency-leaf: do not import from features/modules/UI.
 */

declare const GM_xmlhttpRequest: (details: {
  method: 'GET' | 'POST';
  url: string;
  headers?: Record<string, string>;
  data?: string;
  onload?: (response: { status: number; responseText: string }) => void;
  onerror?: (error: unknown) => void;
}) => void;

export interface HttpResponse<T> {
  status: number;
  data: T | null;
}

export function httpGet<T>(
  url: string,
  headers?: Record<string, string>
): Promise<HttpResponse<T>> {
  return new Promise((resolve) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url,
      headers: headers ?? {},
      onload: (res) => {
        if (res.status >= 200 && res.status < 300) {
          try {
            const parsed = res.responseText ? (JSON.parse(res.responseText) as T) : null;
            resolve({ status: res.status, data: parsed });
          } catch {
            resolve({ status: res.status, data: null });
          }
          return;
        }
        resolve({ status: res.status, data: null });
      },
      onerror: () => resolve({ status: 0, data: null }),
    });
  });
}

export function httpPost<T>(
  url: string,
  body: unknown,
  headers?: Record<string, string>
): Promise<HttpResponse<T>> {
  return new Promise((resolve) => {
    GM_xmlhttpRequest({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        ...(headers ?? {}),
      },
      data: JSON.stringify(body),
      onload: (res) => {
        if (res.status >= 200 && res.status < 300) {
          try {
            const parsed = res.responseText ? (JSON.parse(res.responseText) as T) : null;
            resolve({ status: res.status, data: parsed });
          } catch {
            resolve({ status: res.status, data: null });
          }
          return;
        }
        resolve({ status: res.status, data: null });
      },
      onerror: () => resolve({ status: 0, data: null }),
    });
  });
}
