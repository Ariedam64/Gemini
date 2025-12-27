import { atom } from 'jotai';
import { emptyQuinoaData } from '@/common/games/Quinoa/emptyQuinoaData';
import type { QuinoaData } from '@/common/games/Quinoa/types/quinoa-data';
import { playerIdAtom, stateAtom } from '@/store/store';

export const quinoaDataAtom = atom((get) => {
  const state = get(stateAtom);
  if (state.child?.scope !== 'Quinoa') {
    return { ...emptyQuinoaData };
  }
  return state.child?.data as QuinoaData;
});

export const currentTimeAtom = atom((get) => get(quinoaDataAtom).currentTime);

export const shopsAtom = atom((get) => get(quinoaDataAtom).shops);

export const weatherAtom = atom((get) => get(quinoaDataAtom).weather);

export const userSlotsAtom = atom((get) => get(quinoaDataAtom).userSlots);

export const filteredUserSlotsAtom = atom((get) =>
  get(userSlotsAtom).filter((slot) => slot !== null)
);

export const spectatorsAtom = atom((get) => get(quinoaDataAtom).spectators);

export const myUserSlotAtom = atom((get) => {
  const myId = get(playerIdAtom);
  const userSlots = get(userSlotsAtom);
  return userSlots.find((slot) => slot?.playerId === myId) ?? null;
});

export const myDataAtom = atom((get) => {
  const myUserSlot = get(myUserSlotAtom);
  return myUserSlot?.data;
});
