import { loadConfig } from "../state";
import { httpGet as baseGet, httpPost as basePost, type HttpResponse } from "../../../utils/http";

export type { HttpResponse };

export function buildUrl(
  path: string,
  query?: Record<string, string | number | undefined>
): string {
  const config = loadConfig();
  const url = new URL(path, config.apiBaseUrl);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) continue;
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

export function httpGet<T>(
  path: string,
  query?: Record<string, string | number | undefined>,
  headers?: Record<string, string>
): Promise<HttpResponse<T>> {
  const url = buildUrl(path, query);
  return baseGet<T>(url, headers);
}

export function httpPost<T>(
  path: string,
  body: unknown,
  headers?: Record<string, string>
): Promise<HttpResponse<T>> {
  const url = buildUrl(path);
  return basePost<T>(url, body, headers);
}