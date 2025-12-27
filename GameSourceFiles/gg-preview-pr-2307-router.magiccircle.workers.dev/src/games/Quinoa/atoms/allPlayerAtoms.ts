import { atom } from 'jotai';
import type { PlayerEmoteData } from '@/common/types/emote';
import type { PlayerId } from '@/common/types/player';
import { getDecoration } from '@/constants/decorations';
import { playersAtom } from '@/store/store';
import { nonPrimitiveAtom } from '@/utils/nonPrimitiveAtom';
import { filteredUserSlotsAtom } from './baseAtoms';
import { myCurrentGardenTileAtom } from './myAtoms';
import { npcPlayersAtom } from './npcAtoms';

interface AvatarData {
  avatar: readonly string[];
  discordAvatarUrl: string | null;
  displayName: string;
  nameTagColors: {
    textColor: string;
    backgroundColor: string;
  };
}

export const avatarDataAtom = nonPrimitiveAtom<Record<PlayerId, AvatarData>>(
  (get) => {
    const players = get(playersAtom);
    const npc = get(npcPlayersAtom);
    const allPlayers = [...players, ...npc];
    const avatarData: Record<PlayerId, AvatarData> = {};

    for (const player of allPlayers) {
      const decoration = getDecoration(player.cosmetic.color);
      avatarData[player.id] = {
        avatar: player.cosmetic.avatar,
        discordAvatarUrl: player.discordAvatarUrl,
        displayName: player.name,
        nameTagColors: {
          textColor: decoration.textColor,
          backgroundColor: decoration.backgroundColor,
        },
      };
    }
    return avatarData;
  }
);

export const emoteDataAtom = nonPrimitiveAtom<
  Record<PlayerId, PlayerEmoteData>
>((get) => {
  const players = get(playersAtom);
  const npc = get(npcPlayersAtom);
  const allPlayers = [...players, ...npc];
  const emoteData: Record<PlayerId, PlayerEmoteData> = {};
  for (const player of allPlayers) {
    emoteData[player.id] = player.emoteData;
  }
  return emoteData;
});

// This atom gathers all necessary data for the leaderboard modal
// As a small optimization, we leave the sorting to the component because this atom evaluates
// multiple times a second. The component will only sort the data when the data changes.
export const unsortedLeaderboardAtom = nonPrimitiveAtom<
  {
    name: string;
    playerId: PlayerId;
    coinsCount: number;
  }[]
>((get) => {
  const players = get(playersAtom);
  const filteredUsers = get(filteredUserSlotsAtom);
  return filteredUsers.map((user) => ({
    name:
      players.find((player) => player.id === user.playerId)?.name ??
      user.playerId,
    playerId: user.playerId,
    coinsCount: user.data.coinsCount,
  }));
});

export const currentGardenNameAtom = atom((get) => {
  const currentGardenTile = get(myCurrentGardenTileAtom);
  if (!currentGardenTile) {
    return;
  }
  const players = get(playersAtom);
  const player = players.find((p) => p.id === currentGardenTile.playerId);
  if (!player) {
    return;
  }
  return player.name;
});
