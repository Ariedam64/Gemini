import { atom, getDefaultStore } from 'jotai';
import { isTutorialCompleteAtom } from './myAtoms';

const { get, set } = getDefaultStore();

type QuinoaModal =
  | 'seedShop'
  | 'eggShop'
  | 'toolShop'
  | 'inventory'
  | 'leaderboard'
  | 'journal'
  | 'decorShop'
  | 'stats'
  | 'petHutch'
  | 'activityLog';

export const activeModalAtom = atom<QuinoaModal | null>(null);

export const setActiveModal = (modal: QuinoaModal | null) => {
  set(activeModalAtom, modal);
};

export const closeActiveModal = () => {
  set(activeModalAtom, null);
};

export const openActivityLogModal = () => {
  const isTutorialComplete = get(isTutorialCompleteAtom);
  if (!isTutorialComplete) {
    return;
  }
  set(activeModalAtom, 'activityLog');
};
