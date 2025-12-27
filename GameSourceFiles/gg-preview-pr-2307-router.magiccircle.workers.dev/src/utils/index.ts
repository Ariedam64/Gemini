import type { ResponsiveValue } from '@chakra-ui/react';
import { getDefaultStore } from 'jotai';
import { useEffect, useMemo, useRef } from 'react';
import { QueryParamKeys } from '@/common/analytics';
import { getSantizedRoomIdFromAppUrl } from '@/common/getSantizedRoomIdFromRequest';
import { dateReviver } from '@/common/utils';
import { BASE_URL, surface } from '@/environment';
import useWindowSize from '@/hooks/useWindowSize';
import { discordSdkAtom, jwtAtom } from '@/store/store';
import { breakpoints, type McBreakpoint } from '@/theme/RoomTheme';
import { StatusError } from './StatusError';

export const getUrl = (): string => {
  return window.location.href;
};

export const getShareUrl = (source: string): string => {
  const url = new URL(getUrl());
  if (source) {
    url.searchParams.set(QueryParamKeys.mc_source, source);
  }
  return url.toString();
};

export const getCurrentRoomId = (): string | null => {
  const { get } = getDefaultStore();
  if (surface === 'discord') {
    const discordSdk = get(discordSdkAtom);
    return discordSdk?.instanceId ?? null;
  }
  return getSantizedRoomIdFromAppUrl(getUrl());
};

export const getRoomServerApiRoot = (): string => {
  const roomId = getCurrentRoomId();
  if (!roomId) {
    throw new Error(
      'Could not get room ID from current URL. Are you visiting an app deployment directly? You should probably navigate to the router instead.'
    );
  }

  return location.origin + BASE_URL + '/api/rooms/' + roomId;
};

/**
 * Sends an HTTP request to the gameserver for this room and returns the response.
 *
 * @template Response - The expected response type.
 * @param {string} path - The path to append to the room server API root URL.
 * @param {unknown} [json] - The JSON body to include in the request, if any.
 * @param {RequestInit} [options] - Additional options to pass to the fetch
 * request.
 * @returns {Promise<Response>} - A promise that resolves to the response of
 * the request.
 * @throws {StatusError} - If the response status is not OK (2xx).
 */
export async function sendRequest<Response>(
  path: string,
  json?: unknown,
  options?: RequestInit
): Promise<Response> {
  const headers = new Headers(options?.headers);
  const noRoomScope = headers.get('X-No-Room-Scope') === 'true';
  const url = noRoomScope
    ? location.origin + BASE_URL + path
    : getRoomServerApiRoot() + path;

  if (json) {
    headers.set('Content-Type', 'application/json');
  }

  // On Discord, the JWT token is stored in a Jotai atom persisted to
  // localStorage
  // On other surfaces, the JWT token is stored in a cookie for increased
  // security (cookies are not supported in all 'discord' surface contexts)
  if (surface === 'discord') {
    const jwtToken = getDefaultStore().get(jwtAtom);
    if (jwtToken) {
      headers.set('Authorization', `Bearer ${jwtToken}`);
    }
  }

  const response = await fetch(url, {
    body: json ? JSON.stringify(json) : undefined,
    // Add a timeout to the request, just in case, because the default is 300
    // seconds (!) in Chrome
    signal:
      // AbortSignal.timeout is not supported in Safari < 16
      'AbortSignal' in window && typeof AbortSignal.timeout === 'function'
        ? AbortSignal.timeout(60_000)
        : undefined,
    ...options,
    headers,
  });

  if (!response.ok) {
    const method = options?.method ?? 'GET';
    const statusError = new StatusError(
      response,
      `Failed to ${method} ${path}: ${response.status} ${response.statusText}\n${await response.text()}`
    );
    throw statusError;
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const jsonString = await response.text();
    // We manually parse the JSON string to revive dates,
    // as response.json() does not support reviver functions
    return JSON.parse(jsonString, dateReviver) as Response;
  }
  return response as unknown as Promise<Response>;
}

/**
 * Convenience function to send a POST request to the gameserver for this room.
 */
export function post<Response, RequestBody = unknown>(
  path: string,
  json?: RequestBody,
  options?: RequestInit
) {
  return sendRequest<Response>(path, json, {
    ...options,
    method: 'POST',
  });
}

/**
 *  Hook that calls a callback function every `delay` milliseconds.
 * @param callback  The callback function to call.
 * @param delay     The delay in milliseconds.
 */
export function useInterval(callback: () => void, delay?: number) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === undefined) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    // Clear the interval if the delay changes or the component is unmounted.
    return () => clearInterval(id);
  }, [delay]);
}

/**
 * Hook that calls a callback function after `delay` milliseconds.
 * @param callback The callback function to call.
 * @param delay The delay in milliseconds.
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}

/**
 * Generic hook that resolves a responsive value to a concrete value based on
 * the current breakpoint.
 *
 * @template T - The type of value being resolved (e.g., CardSize, string,
 * number)
 * @param value - A responsive value that can vary by breakpoint, or a static
 * value of type T
 * @param defaultValue - The default value to use if the breakpoint value is
 * undefined
 * @returns The resolved value of type T for the current breakpoint
 *
 * @example
 * const cardSize = useResponsiveValue<CardSize>({ base: 'small', md: 'default' }, 'default');
 * // Returns 'small' on mobile and 'default' on medium screens and above
 */
export const useResponsiveValue = <T extends string | number>(
  value: ResponsiveValue<T>,
  defaultValue: T
): T => {
  const activeBreakpoint = useMcBreakpoint();

  if (typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    console.warn(
      "useResponsiveValue: chakra's responsive array syntax is hard to read/maintain and therefore not supported. use an object instead. default value will be returned."
    );
    return defaultValue;
  }

  return value[activeBreakpoint] ?? defaultValue;
};

/**
 * Hook that returns the current breakpoint value.
 * Note: we do this ourselves, instead of using Chakra's useBreakpoint(),
 * because it is horrifically slow and broken.
 * One such example: https://github.com/chakra-ui/chakra-ui/issues/6452
 */
export const useMcBreakpoint = (): McBreakpoint => {
  const windowSize = useWindowSize();

  const activeBreakpoint = useMemo(() => {
    // First, sort the breakpoints from smallest to largest
    const breakpointsSmallestFirst = Object.entries(breakpoints).toSorted(
      (a, b) => a[1] - b[1]
    ) as [keyof typeof breakpoints, number][];

    // Then, iterate through the breakpoints until we find the first one that is
    // greater than the window size
    for (const [breakpoint, pixelValue] of breakpointsSmallestFirst) {
      if (windowSize.width < pixelValue) {
        return breakpoint;
      }
    }
    // If no breakpoint is found, return the smallest breakpoint
    return 'base';
  }, [windowSize.width]);

  return activeBreakpoint;
};
