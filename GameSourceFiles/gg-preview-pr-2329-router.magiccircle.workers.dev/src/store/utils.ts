import { Atom, atom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import isEqual from 'lodash/isEqual';

/**
 * Attempts to retrieve and parse a value from storage.
 * Returns undefined if the value doesn't exist or fails validation.
 */
function getStoredValue<TValue>(
  key: string,
  storage: Storage,
  validator?: (value: unknown) => boolean
): TValue | undefined {
  const rawValue = storage.getItem(key);
  if (!rawValue) return undefined;
  try {
    const parsed = JSON.parse(rawValue) as unknown;
    // Need to check for undefined specifically since null is a valid value
    if (parsed === undefined) {
      return undefined;
    }
    if (validator && !validator(parsed)) {
      console.warn(`Value from storage failed validation for key "${key}"`, {
        value: parsed,
      });
      return undefined;
    }
    return parsed as TValue;
  } catch {
    return undefined;
  }
}

/**
 * Creates an atom with persistent storage, allowing for state to be saved and retrieved across sessions.
 *
 * @template TValue The type of the value to be stored.
 * @param {string} key A unique identifier for the stored value in the storage medium.
 * @param {TValue} defaultValue The initial value to use if no value is found in storage.
 * @param {Object} [options] Additional configuration options for the persisted atom.
 * @param {Storage} [options.storage=localStorage] The storage mechanism to use. Defaults to localStorage.
 * @param {boolean} [options.persistInitialValue=true] Whether to immediately save the default value if no stored value is found.
 * @param {(value: TValue) boolean} [options.validateValueFromStorage] Optional function to validate the stored value. If validation fails, the default value will be used.
 *
 * @example
 * // Create a persisted atom for a counter
 * const counterAtom = persistedAtom('counter', 0);
 * // The counter's value will persist across page reloads
 *
 * @example
 * // Create a persisted atom for user preferences using session storage and validation
 * const prefsAtom = persistedAtom('prefs', { theme: 'light' }, {
 *   storage: sessionStorage,
 *   validateValueFromStorage: (value) => typeof value.theme === 'string'
 * });
 * // Preferences will persist for the duration of the browser session if valid
 */
export function persistedAtom<TValue>(
  key: string,
  defaultValue: TValue,
  {
    storage = localStorage,
    persistInitialValue = true,
    validateValueFromStorage,
  }: {
    storage?: Storage;
    persistInitialValue?: boolean;
    validateValueFromStorage?: (value: unknown) => boolean;
  } = {}
) {
  const storedValue = getStoredValue<TValue>(
    key,
    storage,
    validateValueFromStorage
  );
  const initialValue = storedValue !== undefined ? storedValue : defaultValue;

  if (storedValue === undefined && persistInitialValue) {
    storage.setItem(key, JSON.stringify(defaultValue));
  }

  const baseAtom = atom<TValue>(initialValue);

  return atom(
    (get) => get(baseAtom),
    (_get, set, newValue: TValue) => {
      set(baseAtom, newValue);
      storage.setItem(key, JSON.stringify(newValue));
    }
  );
}

/**
 *  Like selectAtom, but uses a deep equals function to determine if the value has changed
 * @param atom Atom to select from
 * @param selector A function that takes the atom's value and 'focuses' on a sub-value
 * @returns A new atom that only updates when the selector returns a new value
 */
export function selectAtomDeepEquals<Value, Result>(
  atom: Atom<Value>,
  selector: (value: Value) => Result
) {
  return selectAtom(atom, selector, isEqual);
}
