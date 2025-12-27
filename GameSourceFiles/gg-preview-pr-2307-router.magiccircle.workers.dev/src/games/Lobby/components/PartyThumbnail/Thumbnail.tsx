import { Box, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import type { GameName } from '@/common/types/games';
import AvatarToken from '@/components/Avatars/AvatarToken';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { MotionBox, MotionMcFlex } from '@/components/Motion';
import gameMetaDatas from '@/games/gameMetaDatas';
import { useIsHost } from '@/hooks/useIsHost';
import useIsSmallHeight from '@/hooks/useIsSmallHeight';
import {
  useGameVotes,
  useIsGameStarting,
  useMyGameVote,
  useSelectedGame,
} from '@/room/hooks';
import { useCurrentGameName, useHost } from '@/store/store';
import PlayButton from '../PlayGameButton';
import ThumbnailButton from './ThumbnailButton';

interface ThumbnailProps {
  gameName: GameName;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ gameName }) => {
  const isGameStarting = useIsGameStarting();
  const selectedGame = useSelectedGame();
  const myVote = useMyGameVote();
  const isHost = useIsHost();
  const host = useHost();
  const isSelectedByHost = selectedGame === gameName;
  const isSelectedByMe = myVote === gameName;
  const isSelected = isSelectedByHost || (isSelectedByMe && !isGameStarting);
  const gameVotes = useGameVotes();
  const votesForThisGame = Object.entries(gameVotes).filter(
    ([, gameVote]) => gameVote === gameName
  );
  const currentGameName = useCurrentGameName();
  const isSmallHeight = useIsSmallHeight();

  if (!host) return null;

  return (
    <McFlex orient="top" autoH col position="relative" gap={3} p={4}>
      <Box
        position="relative"
        aspectRatio="1/1"
        maxW={isSmallHeight ? '250px' : '350px'}
        maxH={isSmallHeight ? '250px' : '350px'}
      >
        <ThumbnailButton gameName={gameName} />
        {!isGameStarting && (
          <McGrid
            templateColumns={`repeat(${votesForThisGame.length}, minmax(auto, 42px))`}
            pr={5}
            position="absolute"
            bottom="-21px"
            h="42px"
          >
            {votesForThisGame.map(([playerId, vote]) => (
              <MotionBox key={`${playerId}-${vote}`}>
                <AvatarToken
                  avatarProps={{
                    playerOrId: playerId,
                  }}
                  containerProps={{
                    position: 'absolute',
                  }}
                />
              </MotionBox>
            ))}
          </McGrid>
        )}
      </Box>
      {isSelected && (
        <MotionMcFlex
          visibility={isGameStarting ? 'hidden' : 'visible'}
          gap={2}
          pt={2}
        >
          {isHost ? (
            <PlayButton />
          ) : (
            <Text fontSize="sm" fontWeight="bold">
              {isSelectedByHost ? (
                <Trans>Waiting for host to start...</Trans>
              ) : currentGameName === 'Lobby' ? (
                <Trans>The host is browsing games...</Trans>
              ) : (
                <Trans>
                  The party is playing {gameMetaDatas[currentGameName].name}
                </Trans>
              )}
            </Text>
          )}
        </MotionMcFlex>
      )}
    </McFlex>
  );
};

export default Thumbnail;
