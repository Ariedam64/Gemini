import { useCallback } from 'react';
import { userStyleToPlayerCosmetic } from '@/common/resources/cosmetics/utils';
import { useRoomData } from '@/hooks';
import { getPastelColor } from '@/theme/colors';

export const usePlayerChatDisplay = () => {
  const playerCosmeticInfos = useRoomData(
    (data) => data.chat.playerCosmeticInfos
  );

  const getPlayerCosmeticInfo = useCallback(
    (playerId: string) => {
      const defaultCosmeticInfo = {
        userStyle: {
          name: '[Unknown]',
          color: 'White',
          avatarTop: 'Top_Blank.png',
          avatarMid: 'Mid_Blank.png',
          avatarBottom: 'Bottom_Blank.png',
          avatarExpression: 'Expression_Default.png',
        },
        discordAvatarUrl: null,
        lastUpdatedAt: Date.now(),
      };
      return playerCosmeticInfos[playerId] ?? defaultCosmeticInfo;
    },
    [playerCosmeticInfos]
  );

  const getPlayerCosmetic = useCallback(
    (playerId: string) => {
      const playerCosmeticInfo = getPlayerCosmeticInfo(playerId);
      const cosmetic = userStyleToPlayerCosmetic(playerCosmeticInfo.userStyle);
      return cosmetic;
    },
    [playerCosmeticInfos]
  );

  const getPastelPlayerColor = useCallback(
    (playerId: string): string => {
      const color = getPlayerCosmetic(playerId).color;
      if (color === 'White' || color === 'Black') {
        // Black color on MagicBlack background is not visible
        return 'White';
      }
      return getPastelColor(color);
    },
    [playerCosmeticInfos]
  );

  const getPlayerName = useCallback(
    (playerId: string) => {
      const playerCosmeticInfo = getPlayerCosmeticInfo(playerId);
      return playerCosmeticInfo.userStyle.name;
    },
    [playerCosmeticInfos]
  );

  const getPlayerDiscordAvatarUrl = useCallback(
    (playerId: string) => {
      const playerCosmeticInfo = getPlayerCosmeticInfo(playerId);
      return playerCosmeticInfo.discordAvatarUrl;
    },
    [playerCosmeticInfos]
  );

  return {
    getPlayerCosmetic,
    getPlayerName,
    getPastelPlayerColor,
    getPlayerDiscordAvatarUrl,
  };
};
