/**
 * AriesAPI Feature - HTTP Helpers
 *
 * Low-level HTTP utilities for Aries API communication
 */

import { loadConfig } from '../state';

declare const GM_xmlhttpRequest: (details: {
    method: 'GET' | 'POST';
    url: string;
    headers?: Record<string, string>;
    data?: string;
    onload?: (response: { status: number; responseText: string }) => void;
    onerror?: (error: unknown) => void;
}) => void;

// ─────────────────────────────────────────────────────────────────────────────
// HTTP Response Type
// ─────────────────────────────────────────────────────────────────────────────

export interface HttpResponse<T> {
    status: number;
    data: T | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// URL Builder
// ─────────────────────────────────────────────────────────────────────────────

export function buildUrl(
    path: string,
    query?: Record<string, string | number | undefined>,
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

// ─────────────────────────────────────────────────────────────────────────────
// HTTP GET
// ─────────────────────────────────────────────────────────────────────────────

export function httpGet<T>(
    path: string,
    query?: Record<string, string | number | undefined>,
): Promise<HttpResponse<T>> {
    return new Promise((resolve) => {
        const url = buildUrl(path, query);

        GM_xmlhttpRequest({
            method: 'GET',
            url,
            headers: {},
            onload: (res) => {
                if (res.status >= 200 && res.status < 300) {
                    try {
                        const parsed = res.responseText
                            ? (JSON.parse(res.responseText) as T)
                            : null;
                        resolve({ status: res.status, data: parsed });
                    } catch (error) {
                        console.error('[AriesAPI] GET parse error:', error, res.responseText);
                        resolve({ status: res.status, data: null });
                    }
                } else {
                    console.error('[AriesAPI] GET error:', res.status, res.responseText);
                    resolve({ status: res.status, data: null });
                }
            },
            onerror: (error) => {
                console.error('[AriesAPI] GET request failed:', error);
                resolve({ status: 0, data: null });
            },
        });
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// HTTP POST
// ─────────────────────────────────────────────────────────────────────────────

export function httpPost<T>(
    path: string,
    body: unknown,
): Promise<HttpResponse<T>> {
    return new Promise((resolve) => {
        const url = buildUrl(path);

        GM_xmlhttpRequest({
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(body),
            onload: (res) => {
                if (res.status >= 200 && res.status < 300) {
                    try {
                        const parsed = res.responseText
                            ? (JSON.parse(res.responseText) as T)
                            : null;
                        resolve({ status: res.status, data: parsed });
                    } catch (error) {
                        console.error('[AriesAPI] POST parse error:', error, res.responseText);
                        resolve({ status: res.status, data: null });
                    }
                } else {
                    console.error('[AriesAPI] POST error:', res.status, res.responseText);
                    resolve({ status: res.status, data: null });
                }
            },
            onerror: (error) => {
                console.error('[AriesAPI] POST request failed:', error);
                resolve({ status: 0, data: null });
            },
        });
    });
}
