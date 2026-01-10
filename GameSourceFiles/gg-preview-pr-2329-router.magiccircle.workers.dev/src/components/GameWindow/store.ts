import { atom, getDefaultStore } from 'jotai';

const { set } = getDefaultStore();

export const isGameWindowFullScreenAtom = atom(false);

export const setIsGameWindowFullScreen = (value: boolean) =>
  set(isGameWindowFullScreenAtom, value);

export const isGameWindowedAtom = atom(false);

export const setIsGameWindowed = (value: boolean) =>
  set(isGameWindowedAtom, value);

export const setGameWindowedAndNotFullScreen = () => {
  setIsGameWindowed(true);
  setIsGameWindowFullScreen(false);
};
