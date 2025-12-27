import { Atom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import isEqual from 'lodash/isEqual';

/**
 * Creates a derived atom that selects a slice of the value from the given atom, using a comparator for equality.
 * @param baseAtom The atom to select from.
 * @param selector A function to select a slice of the atom's value. Defaults to the identity function.
 * @param comparator Optional comparator function for equality. Defaults to lodash's isEqual.
 */
export function simpleSelectAtom<Value, Slice = Value>(
  baseAtom: Atom<Value>,
  selector: (value: Value) => Slice = (v) => v as unknown as Slice,
  comparator: (a: Slice, b: Slice) => boolean = isEqual
) {
  return selectAtom(baseAtom, selector, comparator);
}
