import { atom, Getter } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { isEqual } from 'lodash';

/**
 * Creates a stable atom for non-primitive values using a custom comparator.
 *
 * @template T The type of the value.
 * @param value A getter function that receives Jotai's get and returns the value for the atom.
 * @param comparator A function to compare two values for equality. Defaults to lodash's isEqual.
 * @returns A derived atom that only updates when the comparator returns false.
 */
export const nonPrimitiveAtom = <T>(
  value: (get: Getter) => T,
  comparator: (a: T, b: T) => boolean = isEqual
) => {
  return selectAtom(atom(value), (v) => v, comparator);
};
