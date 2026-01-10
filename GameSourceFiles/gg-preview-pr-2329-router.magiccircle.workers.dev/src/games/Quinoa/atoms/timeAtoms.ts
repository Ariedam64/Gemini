import { atom } from 'jotai';
import { currentTimeAtom } from './baseAtoms';

export const serverClientTimeOffsetAtom = atom((get) => {
  const offset = Date.now() - get(currentTimeAtom);
  return offset;
});
