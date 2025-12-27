import { atom } from 'jotai';
import { actionAtom } from './actionAtom';
import { PRESS_AND_HOLD_ACTIONS } from './constants/constants';

export const isPressAndHoldActionAtom = atom((get): boolean => {
  const action = get(actionAtom);
  return PRESS_AND_HOLD_ACTIONS.has(action);
});
