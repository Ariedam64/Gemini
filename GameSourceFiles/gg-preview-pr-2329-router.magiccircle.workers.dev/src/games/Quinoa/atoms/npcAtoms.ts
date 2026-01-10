import { atom, getDefaultStore } from 'jotai';
import type { QuinoaAnonymousPlayerSlot } from '@/common/games/Quinoa/types';
import { createDefaultQuinoaUserJson } from '@/common/games/Quinoa/user-json-schema/current';
import { EmoteType } from '@/common/types/emote';
import type Player from '@/common/types/player';
import defaultPlayer from '@/constants/default-player';

const { set, get } = getDefaultStore();

export const traderBunnyPlayerId = 'NPC_TraderBunny';

const _traderBunnyPlayerAtom = atom<Player>((get) => ({
  ...defaultPlayer,
  id: traderBunnyPlayerId,
  name: 'Harlow Hopwright',
  cosmetic: {
    color: 'Purple',
    avatar: [
      'Bottom_Trader.png',
      'Mid_Trader.png',
      'Top_Trader.png',
      'Expression_Stressed.png',
    ],
  },
  emoteData: {
    emoteType: get(traderBunnyEmoteAtom),
  },
}));

const _traderBunnyQuinoaUserAtom = atom<QuinoaAnonymousPlayerSlot>({
  type: 'anonymous',
  playerId: traderBunnyPlayerId,
  data: createDefaultQuinoaUserJson(),
  position: { x: 39, y: 21 },
  petSlotInfos: {},
  lastActionEvent: null,
  notAuthoritative_selectedItemIndex: null,
  lastSlotMachineInfo: null,
});

function setTraderBunnyEmote(emoteType: EmoteType): void {
  set(traderBunnyEmoteAtom, emoteType);
}

function resetTraderBunnyEmote(): void {
  set(traderBunnyEmoteAtom, EmoteType.Idle);
}

const traderBunnyEmoteTimeoutAtom = atom<ReturnType<typeof setTimeout> | null>(
  null
);
const traderBunnyEmoteAtom = atom<EmoteType>(EmoteType.Idle);

export const playRandomTraderBunnyEmote = (): void => {
  const existingTimeout = get(traderBunnyEmoteTimeoutAtom);
  if (existingTimeout !== null) {
    clearTimeout(existingTimeout);
  }
  const emotes = [EmoteType.Clapping, EmoteType.Laughing, EmoteType.Love];
  const emoteType = emotes[Math.floor(Math.random() * emotes.length)];
  setTraderBunnyEmote(emoteType);
  const timeout = setTimeout(() => {
    resetTraderBunnyEmote();
    set(traderBunnyEmoteTimeoutAtom, null);
  }, 1000);
  set(traderBunnyEmoteTimeoutAtom, timeout);
};

export const npcPlayersAtom = atom(() => []);
export const npcQuinoaUsersAtom = atom(() => []);
export const numNpcAvatarsAtom = atom((get) => get(npcPlayersAtom).length);
