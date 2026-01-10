import { atom } from 'jotai';
import { positionAtom } from './positionAtoms';

// Atom to track if the establishing shot animation is currently running
export const isEstablishingShotRunningAtom = atom(false);

export const isEstablishingShotCompleteAtom = atom<boolean>((get) => {
  const position = get(positionAtom);
  const isEstablishingShotRunning = get(isEstablishingShotRunningAtom);
  // If the position is set and the establishing shot is not running, then the establishing shot is complete
  return !!position && !isEstablishingShotRunning;
});
