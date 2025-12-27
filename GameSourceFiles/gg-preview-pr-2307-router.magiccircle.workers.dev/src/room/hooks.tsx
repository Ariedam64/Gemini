import { Text } from '@chakra-ui/layout';
import { Trans, useLingui } from '@lingui/react/macro';
import { useCallback, useEffect, useState } from 'react';
import type { RoomData } from '@/common/games/Room/types';
import { useConfirmationDialog } from '@/components/ConfirmationDialog/useConfirmationDialog';
import McFlex from '@/components/McFlex/McFlex';
import { useConfig } from '@/config';
import {
  canUserCreateDiscordInvite,
  openDiscordInviteDialog,
} from '@/discord-sdk/utils';
import { surface } from '@/environment';
import { useRoomData, useSendRoomMessage } from '@/hooks';
import {
  useIsRegionSupportedByOpenAI,
  useNumPlayers,
  useOpenDrawer,
  usePlayerId,
} from '@/store/store';
import gameMetaDatas from '../games/gameMetaDatas';

export function useTimer() {
  return useRoomData((data: RoomData) => data.timer);
}

export function useIsGameStarting() {
  return useRoomData((data: RoomData) => data.isGameStarting);
}

export function useGameVotes() {
  return useRoomData((data: RoomData) => data.gameVotes);
}

export function useMyGameVote() {
  const myPlayerId = usePlayerId();
  const gameVotes = useGameVotes();
  return gameVotes[myPlayerId] ?? null;
}

export function useSelectedGame() {
  return useRoomData((data: RoomData) => data.selectedGame);
}

export function useOnClickStart() {
  const requestConfirm = useConfirmationDialog();
  const sendRoomMessage = useSendRoomMessage();
  const selectedGame = useSelectedGame();
  const bypassMinPlayersCheck = useConfig().root_bypassMinPlayersCheck;
  const numPlayers = useNumPlayers();
  const openDrawer = useOpenDrawer();
  const isRegionSupportedByOpenAI = useIsRegionSupportedByOpenAI();
  const minPlayers = selectedGame ? gameMetaDatas[selectedGame].minPlayers : 0;
  const hasEnoughPlayersToStart =
    bypassMinPlayersCheck || numPlayers >= minPlayers;
  const { t } = useLingui();

  const [canInvite, setCanInvite] = useState(false);

  useEffect(() => {
    if (surface === 'discord') {
      void canUserCreateDiscordInvite().then((canInvite) => {
        setCanInvite(canInvite);
      });
    }
  }, [surface]);

  const startGame = useCallback(() => {
    if (!selectedGame) {
      return;
    }
    if (gameMetaDatas[selectedGame].type === 'Daily') {
      return;
    }
    if (
      gameMetaDatas[selectedGame].requiresOpenAI &&
      !isRegionSupportedByOpenAI
    ) {
      requestConfirm({
        title: t`Unsupported region`,
        content: (
          <McFlex col>
            <Text fontSize="md">
              <Trans>
                <strong>This game is not available in your region.</strong> Some
                of our other games might be available in your region.
                <br />
                Sorry! :(
              </Trans>
            </Text>
          </McFlex>
        ),
        okText: t`OK`,
        onConfirm: () => {},
      });
      return;
    }
    sendRoomMessage({
      type: 'RequestGame',
      name: selectedGame,
    });
  }, [selectedGame, canInvite]);

  return useCallback(() => {
    if (!selectedGame) {
      return;
    }
    if (!hasEnoughPlayersToStart) {
      requestConfirm({
        title: t`Need more players? 👀`,
        isCentered: true,
        content: (
          <McFlex col>
            <Text w="95%" fontSize="md">
              <Trans>
                This game works best with <b>{minPlayers}+ players</b>.
              </Trans>
            </Text>
          </McFlex>
        ),
        okText: canInvite ? t`Invite friends` : null,
        okButtonColor: 'Purple.Magic',
        onConfirm: () => {
          if (surface === 'discord' && canInvite) {
            openDiscordInviteDialog().catch((error) => {
              console.error('Error opening Discord invite dialog:', error);
            });
          } else {
            openDrawer('party-invite');
          }
        },
        cancelVariant: 'outlineInverse',
        cancelColor: 'MagicBlack',
        cancelBackground: 'Transparent',
        cancelText: t`Play anyway`,
        onCancel: () => startGame(),
      });
      return;
    }
    startGame();
  }, [selectedGame, hasEnoughPlayersToStart]);
}
