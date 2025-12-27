import type { IState } from './types/state';

export function findScopeInStateChain(
  state: IState<unknown> | null,
  scopes: string[]
): IState<unknown> | null {
  if (!state || scopes.length === 0) return null;

  // Check if the current state's scope matches the first scope in the scopes array
  if (state.scope === scopes[0]) {
    // If we only have one scope left in the scopes array, return the state
    if (scopes.length === 1) {
      return state;
    } else {
      // If not, proceed with the state's child and the rest of the scopes
      return findScopeInStateChain(state.child, scopes.slice(1));
    }
  }

  // If the scope does not match, return null
  return null;
}

export type Widen<T> = T extends number
  ? number
  : T extends string
    ? string
    : T extends boolean
      ? boolean
      : T extends ReadonlyArray<infer U>
        ? ReadonlyArray<Widen<U>>
        : T extends object
          ? { [K in keyof T]: Widen<T[K]> }
          : never;

type ImmutablePrimitive =
  | undefined
  | null
  | boolean
  | string
  | number
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  | Function;
type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };

export type { ImmutableObject };

// https://github.com/microsoft/TypeScript/issues/13923#issuecomment-557509399
export type Immutable<T> = T extends ImmutablePrimitive
  ? T
  : T extends Array<infer U>
    ? ImmutableArray<U>
    : T extends Map<infer K, infer V>
      ? ImmutableMap<K, V>
      : T extends Set<infer M>
        ? ImmutableSet<M>
        : ImmutableObject<T>;

export function spacesToDashes(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '-');
}

// Function to normalize emojis by removing variation selectors
export function normalizeEmoji(emojiString: string) {
  return emojiString.replace(/\uFE0F/g, ''); // Removes the variation selector-16 (U+FE0F)
}

/**
 * Formats a Date object into a more readable string format.
 * @param {Date} date - The date to format.
 * @param {boolean} includeTime - Whether to include hour and minutes with timezone (e.g. "Jan 1, 2023, 3:45 PM PST").
 * @returns {string} The formatted date string in medium date style.
 */
export function formatDate(date: Date, includeTime?: boolean): string {
  if (includeTime) {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(date);
  }
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(date);
}

// /**
//  * Recursively replaces all properties of type Date with string in a given type.
//  *
//  * This type utility traverses through object properties, array elements, and
//  * other nested structures, converting any Date types to string.
//  *
//  * @template T - The input type to transform
//  */
// export type WithDatesAsStrings<T> = T extends Date
//   ? string
//   : T extends Array<infer U>
//     ? Array<WithDatesAsStrings<U>>
//     : T extends object
//       ? { [K in keyof T]: WithDatesAsStrings<T[K]> }
//       : T;
/**
 * Parses a date string in YYYY-MM-DD format and returns a Date object.
 *
 * @param {string} dateString - The date string to parse in YYYY-MM-DD format.
 * @returns {Date | null} A Date object if the string is valid, or null if it's invalid.
 */
export function parseDateYYYYMMDD(dateString: string): Date | null {
  const [year, month, day] = dateString.split('-').map(Number);

  if (year === undefined || month === undefined || day === undefined) {
    return null;
  }

  // Check if we have valid numbers
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return null;
  }

  // Create the date object (note: month is 0-indexed in JavaScript Date)
  const date = new Date(year, month - 1, day);

  // Validate that the date object represents the input correctly
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function parseDateYYYYMMDDOrThrow(dateString: string): Date {
  const date = parseDateYYYYMMDD(dateString);
  if (!date) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  return date;
}

/**
 * Converts a Date object to a string in YYYY-MM-DD format.
 *
 * This function takes a Date object and returns a string representation in the format YYYY-MM-DD.
 * The time component of the date is ignored, and the date is formatted according to UTC.
 *
 * @param {Date} date - The Date object to convert
 * @returns {string} The date string in YYYY-MM-DD format
 *
 * @example
 * const date = new Date('2023-05-17T12:34:56.789Z');
 * const formatted = dateToYYYYMMDD(date);
 * console.log(formatted); // Outputs: "2023-05-17"
 */
export function dateToYYYYMMDD(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Returns the current date, rounded to the start of the day.
 *
 * This function creates a new Date object representing the current date and time,
 * then sets the time to 00:00:00.000 (midnight) to round it to the start of the day.
 * This is useful for date comparisons or when you need the current date without time information.
 *
 * @returns {Date} A Date object representing the current date at 00:00:00.000 local time.
 *
 * @example
 * const today = getCurrentDate();
 * console.log(today.toISOString()); // Outputs something like "2023-05-17T00:00:00.000Z"
 */
/**
 * Returns the current date in UTC, rounded to the start of the day.
 *
 * This function creates a new Date object representing the current date and time in UTC,
 * then sets the time to 00:00:00.000 (midnight) to round it to the start of the day.
 * This is useful for date comparisons or when you need the current date without time information,
 * ensuring consistency across different time zones.
 *
 * @returns {Date} A Date object representing the current UTC date at 00:00:00.000.
 *
 * @example
 * const todayUTC = getCurrentDate();
 * console.log(todayUTC.toISOString()); // Outputs something like "2023-05-17T00:00:00.000Z"
 */
export function getStartOfTodayUTC(): Date {
  // Simply get the current date and pass it to the helper
  const now = new Date();
  return getStartOfUTCDay(now);
}

export function getPreviousUTCDate(date: Date): Date {
  const previous = new Date(date);
  previous.setUTCDate(previous.getUTCDate() - 1);
  return previous;
}

export function getNextUTCDate(date: Date): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + 1);
  return next;
}

/**
 * Returns a new Date object representing the start of the given date's UTC day.
 *
 * Sets the time components (hours, minutes, seconds, milliseconds) to zero in UTC.
 * Does not modify the original Date object.
 *
 * @param {Date} date - The input Date object.
 * @returns {Date} A new Date object representing the start of the UTC day (00:00:00.000Z).
 */
export function getStartOfUTCDay(date: Date): Date {
  const start = new Date(date); // Clone to avoid modifying the original date
  start.setUTCHours(0, 0, 0, 0);
  return start;
}

/**
 * Computes the difference in calendar days between two `Date` instances, basing "calendar day"
 * transitions strictly on UTC midnight (00:00:00.000Z). This is useful for calculating the number
 * of days between two dates, regardless of the time zone of the dates, as
 * date-fns's differenceInCalendarDays calculates the difference in calendar
 * days using the system's local time zone.
 *
 * @param {Date} laterDate - The later `Date`. Its UTC calendar representation is used for comparison.
 * @param {Date} earlierDate - The earlier `Date`. Its UTC calendar representation is used for comparison.
 * @returns {number} The number of UTC calendar days between the dates. Positive if `laterDate`
 *          is later, negative if earlier, 0 if on the same UTC day.
 *
 * @example
 * // Basic case
 * const d1 = new Date('2023-05-17T02:00:00.000Z'); // May 17th UTC
 * const d2 = new Date('2023-05-15T22:00:00.000Z'); // May 15th UTC
 * differenceInCalendarDaysUTC(d1, d2); // Returns 2
 *
 * // Same UTC day
 * const d3 = new Date('2023-05-15T01:00:00.000Z'); // May 15th UTC
 * const d4 = new Date('2023-05-15T23:00:00.000Z'); // May 15th UTC
 * differenceInCalendarDaysUTC(d3, d4); // Returns 0
 *
 * // Spanning a UTC midnight, with non-UTC timezone in string constructor
 * // These represent May 16th 03:00 UTC and May 15th 20:00 UTC respectively.
 * const d5_pdt_evening = new Date('2023-05-15T20:00:00-07:00'); // May 15th 8PM PDT = May 16th 03:00 UTC
 * const d6_pdt_morning = new Date('2023-05-15T13:00:00-07:00'); // May 15th 1PM PDT = May 15th 20:00 UTC
 * differenceInCalendarDaysUTC(d5_pdt_evening, d6_pdt_morning); // Returns 1 (May 16 UTC vs May 15 UTC)
 */
export function differenceInCalendarDaysUTC(
  laterDate: Date,
  earlierDate: Date
): number {
  const startOfLaterUTCDay = getStartOfUTCDay(laterDate);
  const startOfEarlierUTCDay = getStartOfUTCDay(earlierDate);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const differenceInMilliseconds =
    startOfLaterUTCDay.getTime() - startOfEarlierUTCDay.getTime();

  return Math.floor(differenceInMilliseconds / millisecondsPerDay);
}

/**
 * Attempts to parse an ISO 8601 date string and return a Date object.
 * Returns the original value if it's not a valid ISO date string.
 *
 * @param value - The value to attempt to parse
 * @returns A Date object if the value is a valid ISO date string, otherwise the original value
 */
function tryReviveDate(value: unknown): unknown {
  if (typeof value === 'string') {
    const parts =
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d*))?(Z|([+-])(\d{2}):(\d{2}))$/.exec(
        value
      );
    if (
      parts &&
      parts[1] &&
      parts[2] &&
      parts[3] &&
      parts[4] &&
      parts[5] &&
      parts[6]
    ) {
      return new Date(
        Date.UTC(
          +parts[1],
          +parts[2] - 1,
          +parts[3],
          +parts[4],
          +parts[5],
          +parts[6],
          +(parts[7] || 0)
        )
      );
    }
  }
  return value;
}

/**
 * Reviver function for JSON.parse to convert ISO 8601 date strings to Date objects.
 *
 * @param key - The property key (provided by JSON.parse)
 * @param value - The property value (provided by JSON.parse)
 * @returns A Date object if the value is a valid ISO date string, otherwise the original value
 *
 * @example
 * const obj = JSON.parse(jsonString, dateReviver);
 *
 * @see https://github.com/benjamine/jsondiffpatch/blob/bb534c189eebb8a6343c82b133c2a3fd9c121339/packages/jsondiffpatch/src/date-reviver.ts
 */
export function dateReviver(key: string, value: unknown) {
  return tryReviveDate(value);
}

export function isDiscordId(id: string): boolean {
  return /^[0-9]+$/.test(id);
}

/**
 * Recursively walks an object tree and converts ISO 8601 date strings to Date objects.
 * Mutates the object in place for performance.
 *
 * Uses the same date detection logic as `dateReviver` but operates on an already-parsed object.
 *
 * @param obj - The object to walk and mutate
 */
export function reviveDatesInPlace(obj: unknown): void {
  if (!obj || typeof obj !== 'object') return;
  if (obj instanceof Date) return; // Already a Date

  for (const [key, value] of Object.entries(obj)) {
    const revivedValue = tryReviveDate(value);
    if (revivedValue !== value) {
      // It was a date string and got converted
      (obj as Record<string, unknown>)[key] = revivedValue;
    } else if (value && typeof value === 'object') {
      // Recurse into nested objects
      reviveDatesInPlace(value);
    }
  }
}

/**
 * Clones a state tree using structuredClone and revives ISO 8601 date strings to Date objects.
 * Optionally skips cloning specific scopes (useful for large game state that doesn't need cloning).
 *
 * @param state - The state tree to clone
 * @param skipScopes - Array of scope names to skip cloning (will reuse the original reference)
 * @returns A cloned state tree with dates revived
 *
 * @example
 * // Clone the entire state tree with date revival
 * const cloned = cloneStateAndReviveDates(roomState);
 *
 * @example
 * // Clone but skip the Quinoa game state for performance
 * const cloned = cloneStateAndReviveDates(roomState, ['Quinoa']);
 */
export function cloneStateAndReviveDates<T>(
  state: T,
  skipScopes: string[] = []
): T {
  // Check if this is an IState node with a scope we should skip
  if (
    state &&
    typeof state === 'object' &&
    'scope' in state &&
    typeof state.scope === 'string' &&
    skipScopes.includes(state.scope)
  ) {
    // Return the original reference without cloning
    return state;
  }

  // For IState nodes with children, handle recursively
  if (
    state &&
    typeof state === 'object' &&
    'scope' in state &&
    'data' in state &&
    'child' in state
  ) {
    // Clone this IState node
    const cloned = structuredClone(state) as typeof state & {
      child: unknown;
    };

    // Revive dates in the cloned data
    reviveDatesInPlace(cloned);

    // If there's a child, process it recursively (might skip it)
    if (cloned.child) {
      cloned.child = cloneStateAndReviveDates(cloned.child, skipScopes);
    }

    return cloned as T;
  }

  // For non-IState objects, just clone and revive dates
  const cloned = structuredClone(state);
  reviveDatesInPlace(cloned);
  return cloned;
}
