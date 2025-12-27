import { atom, getDefaultStore, useAtomValue } from 'jotai';

type AvocadoMiniInitialPage = 'write' | 'vote' | 'results' | Date;
const defaultInitialPage: AvocadoMiniInitialPage = 'write';

export const avocadoMiniInitialPageAtom =
  atom<AvocadoMiniInitialPage>(defaultInitialPage);

export function setAvocadoMiniInitialPage(page: AvocadoMiniInitialPage) {
  const { set } = getDefaultStore();
  set(avocadoMiniInitialPageAtom, page);
}

export function useAvocadoMiniInitialPage() {
  const initialPage = useAtomValue(avocadoMiniInitialPageAtom);

  function clearInitialPage() {
    setAvocadoMiniInitialPage(defaultInitialPage);
  }

  return {
    initialPage,
    clearInitialPage,
  };
}
