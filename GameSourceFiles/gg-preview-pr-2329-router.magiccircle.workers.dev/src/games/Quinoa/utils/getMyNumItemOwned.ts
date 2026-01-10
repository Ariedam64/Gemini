import { getDefaultStore } from 'jotai';
import { getNumItemOwned } from '@/common/games/Quinoa/utils/getNumItemOwned';
import type { itemToAddInfo } from '@/common/games/Quinoa/utils/inventory';
import { myDataAtom } from '@/Quinoa/atoms/baseAtoms';

const { get } = getDefaultStore();

export const getMyNumItemOwned = (itemToAdd: itemToAddInfo) => {
  const myData = get(myDataAtom);
  if (!myData) {
    return 0;
  }
  return getNumItemOwned(myData, itemToAdd);
};
