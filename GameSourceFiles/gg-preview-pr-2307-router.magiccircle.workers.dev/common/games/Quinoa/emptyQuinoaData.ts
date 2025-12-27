import type { QuinoaData } from './types';

export const emptyQuinoaData: QuinoaData = {
  currentTime: 0,
  shops: {
    seed: {
      inventory: [],
      secondsUntilRestock: 0,
    },
    egg: {
      inventory: [],
      secondsUntilRestock: 0,
    },
    tool: {
      inventory: [],
      secondsUntilRestock: 0,
    },
    decor: {
      inventory: [],
      secondsUntilRestock: 0,
    },
  },
  weather: null,
  userSlots: [null, null, null, null, null, null],
  spectators: [],
};
