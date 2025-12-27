import { Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { Heart, Star, Users } from 'react-feather';
import type { GameName } from '@/common/types/games';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import useDiscordModal from '@/components/useDiscordModal';
import VerticalDivider from '@/components/VerticalDivider';
import { useConfig } from '@/config';
import { surface } from '@/environment';
import useIsSmallWidth from '@/hooks/useIsSmallWidth';
import {
  useActiveGame,
  useIsUserAuthenticated,
  useSetActiveGame,
} from '@/store/store';
import { useGameUserStatuses } from '@/user';
import 'swiper/css';
import { getGamesToShowInOrder } from '../LobbyUtils';
import GalleryThumbnail from './GalleryThumbnail';

type GamesGalleryProps = {};

const GamesGallery: React.FC<GamesGalleryProps> = () => {
  const activeGame = useActiveGame();
  const setActiveGame = useSetActiveGame();
  const openDiscordModal = useDiscordModal();
  const isAuthenticated = useIsUserAuthenticated();
  const { data: gameUserStatuses } = useGameUserStatuses();
  const grindGameNamesSorted = useConfig().root_grindGameNamesSorted;
  const dailyGameNamesSorted = useConfig().root_dailyGameNamesSorted;
  const gameStatuses = useConfig().root_gameStatuses;
  const partyGameNamesSorted = useConfig()
    .root_gameNamesSorted_Desktop as GameName[];
  const partyGamesToShow = getGamesToShowInOrder(
    gameStatuses,
    partyGameNamesSorted
  );
  const isSmallWidth = useIsSmallWidth();

  const handleGameClick = (gameName: GameName) => {
    const authenticatedOnlyGames = ['Peach', 'Orange'];
    if (authenticatedOnlyGames.includes(gameName) && !isAuthenticated) {
      void openDiscordModal();
    } else {
      setActiveGame(gameName);
    }
  };

  return (
    <McGrid
      px={{ base: 1, sm: 2 }}
      templateRows={isSmallWidth ? 'auto auto' : '1fr'}
      templateColumns={isSmallWidth ? '1fr' : 'auto auto'}
      overflowX={isSmallWidth ? 'hidden' : 'auto'}
      width={isSmallWidth ? '100%' : 'auto'}
      sx={{
        '&::-webkit-scrollbar': {
          width: '4px',
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '3px',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.3)',
          },
        },
      }}
    >
      {/* Grind and Daily Games Section */}
      <McFlex overflow={isSmallWidth ? 'hidden' : undefined}>
        {/* Grind Games Section - Always show */}
        <McFlex autoW>
          <McFlex col autoW>
            <McFlex orient="left" autoH gap={0.5} align="center">
              <Star size={isSmallWidth ? 16 : 20} />
              <Text
                fontSize={{ base: 'xs ', sm: 'sm' }}
                textAlign="center"
                fontWeight="demibold"
              >
                <Trans>Garden</Trans>
              </Text>
            </McFlex>
            <McFlex
              gap={0.5}
              orient="top left"
              overflowX="auto"
              overflowY="hidden"
              wrap="nowrap"
              sx={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                  height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '3px',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                  },
                },
              }}
            >
              {grindGameNamesSorted.map((grindGameName) => (
                <GalleryThumbnail
                  key={`grind-${grindGameName}`}
                  gameName={grindGameName}
                  onClick={() => handleGameClick(grindGameName)}
                  isActive={activeGame === grindGameName}
                  numIncompleteTasks={
                    gameUserStatuses &&
                    gameUserStatuses[grindGameName]?.numIncompleteTasks
                  }
                />
              ))}
              {(surface !== 'webview' ||
                (surface === 'webview' && !isSmallWidth)) && (
                <VerticalDivider mr={2} ml={1.5} />
              )}
            </McFlex>
          </McFlex>
        </McFlex>
        {/* Daily Games Section - Only show when not webview */}
        {surface !== 'webview' && (
          <McFlex overflow={isSmallWidth ? 'hidden' : undefined} autoW>
            <McFlex overflowX={isSmallWidth ? 'auto' : undefined} col autoW>
              <McFlex orient="left" autoH gap={0.5} align="center">
                <Heart size={isSmallWidth ? 16 : 20} />
                <Text
                  fontSize={{ base: 'xs ', sm: 'sm' }}
                  textAlign="center"
                  fontWeight="demibold"
                >
                  <Trans>Daily</Trans>
                </Text>
              </McFlex>
              <McFlex
                gap={0.5}
                orient="top left"
                overflowX="auto"
                overflowY="hidden"
                wrap="nowrap"
                sx={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                    height: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '3px',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.3)',
                    },
                  },
                }}
                pr={isSmallWidth ? 1 : 0}
              >
                {dailyGameNamesSorted.map((dailyGameName) => (
                  <GalleryThumbnail
                    key={`daily-${dailyGameName}`}
                    gameName={dailyGameName}
                    onClick={() => handleGameClick(dailyGameName)}
                    isActive={activeGame === dailyGameName}
                    numIncompleteTasks={
                      gameUserStatuses &&
                      gameUserStatuses[dailyGameName]?.numIncompleteTasks
                    }
                  />
                ))}
                {!isSmallWidth && (
                  <VerticalDivider alignSelf="flex-end" mr={2} ml={1.5} />
                )}
              </McFlex>
            </McFlex>
          </McFlex>
        )}
      </McFlex>
      {/* Party Games Section */}
      <McFlex overflow={isSmallWidth ? 'hidden' : undefined}>
        <McFlex overflowX={isSmallWidth ? 'auto' : undefined} col autoW>
          <McFlex orient="left" autoH gap={0.5} align="center">
            <Users size={isSmallWidth ? 16 : 20} />
            <Text
              fontSize={{ base: 'xs ', sm: 'sm' }}
              textAlign="center"
              fontWeight="demibold"
            >
              <Trans>Party</Trans>
            </Text>
          </McFlex>
          <McFlex
            gap={0.5}
            orient="top left"
            wrap="nowrap"
            overflowY="hidden"
            overflowX="auto"
            sx={{
              '&::-webkit-scrollbar': {
                width: '4px',
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '3px',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                },
              },
            }}
          >
            {partyGamesToShow.map((gameName) => (
              <GalleryThumbnail
                key={`party-${gameName}`}
                gameName={gameName}
                isActive={activeGame === gameName}
                numIncompleteTasks={
                  gameUserStatuses &&
                  gameUserStatuses[gameName]?.numIncompleteTasks
                }
                onClick={() => handleGameClick(gameName)}
              />
            ))}
          </McFlex>
        </McFlex>
      </McFlex>
    </McGrid>
  );
};

export default GamesGallery;
