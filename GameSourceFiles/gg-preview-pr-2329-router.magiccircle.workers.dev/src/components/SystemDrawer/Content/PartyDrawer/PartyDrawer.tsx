import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { forwardRef, useEffect, useRef } from 'react';
import { Info, Plus, Settings, Shuffle, Users } from 'react-feather';
import { playSfx } from '@/audio/useQuinoaAudio';
import {
  isGameWindowedAtom,
  setIsGameWindowed,
  setIsGameWindowFullScreen,
} from '@/components/GameWindow/store';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import ShareWidget from '@/components/SystemDrawer/Content/PartyDrawer/ShareWidget';
import SystemDrawerCloseButton from '@/components/SystemDrawer/SystemDrawerCloseButton';
import useEndGameModal from '@/components/useEndGameModal';
import McConfigButton from '@/devtools/McConfigButton';
import { isRunningInsideDiscord, surface } from '@/environment';
import gameMetaDatas from '@/games/gameMetaDatas';
import { useSendRoomMessage } from '@/hooks';
import { useIsHost } from '@/hooks/useIsHost';
import useIsSmallHeight from '@/hooks/useIsSmallHeight';
import {
  useCloseDrawer,
  useCurrentGameName,
  useDrawerType,
  useIsDeveloper,
  useNumPlayers,
} from '@/store/store';
import type { DrawerRef } from '../../types';
import PlayersDrawer from '../PlayersDrawer';
import { AboutTab } from './AboutTab';
import { JoinRoomTab } from './JoinRoomTab';
import { SettingsTab } from './SettingsTab';

const PartyDrawer = forwardRef<DrawerRef>(() => {
  const drawerType = useDrawerType();
  const numPlayers = useNumPlayers();
  const currentGameName = useCurrentGameName();
  const isDeveloper = useIsDeveloper();
  const isHost = useIsHost();
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const isGameWindowed = useAtomValue(isGameWindowedAtom);
  const isSmallScreen = useIsSmallHeight();
  const sendRoomMessage = useSendRoomMessage();
  const confirmEndGame = useEndGameModal();
  const closeDrawer = useCloseDrawer();
  const { t } = useLingui();

  useEffect(() => {
    if (!tabListRef.current) {
      return;
    }
    const childrenHeight = tabListRef.current.scrollHeight;
    tabListRef.current.style.minHeight = `${childrenHeight}px`;
  }, [isSmallScreen]);

  let defaultIndex = 0;
  if (drawerType === 'party-players') {
    defaultIndex = 0;
  } else if (drawerType === 'party-invite') {
    defaultIndex = 1;
  } else if (drawerType === 'party-join') {
    defaultIndex = 2;
  } else if (drawerType === 'party-settings') {
    defaultIndex = surface === 'web' ? 3 : 1;
  }
  const onConfirmEndGame = async () => {
    const gameIsEnded = await confirmEndGame();
    if (gameIsEnded) {
      closeDrawer();
    }
  };
  const canUsurpHost = !isHost && (isDeveloper || surface === 'discord');

  const isPartyGame =
    currentGameName !== 'Lobby' &&
    gameMetaDatas[currentGameName].type === 'Party';

  const tabStyles = {
    fontSize: isSmallScreen ? '12px' : '16px',
    py: isSmallScreen ? 0 : 3,
    px: isSmallScreen ? 2 : 3,
    height: isSmallScreen ? '30px' : 'auto',
  };

  useEffect(() => {
    if (!tabListRef.current) {
      return;
    }
    // Reset height first to get accurate scrollHeight
    tabListRef.current.style.height = 'auto';
    tabListRef.current.style.minHeight = 'auto';
    const childrenHeight = tabListRef.current.scrollHeight;
    tabListRef.current.style.height = `${childrenHeight}px`;
    tabListRef.current.style.minHeight = `${childrenHeight}px`;
  }, [isSmallScreen]);

  return (
    <McGrid
      id="PartyDrawer"
      templateRows="auto 1fr"
      backdropFilter="blur(50px)"
      borderRadius="inherit"
      boxShadow="4px 4px 4px 4px rgba(0, 0, 0, 0.2)"
      pt="calc(var(--sait) + 10px)"
      w="calc(100% + var(--sail))"
      pl="var(--sail)"
    >
      <McFlex orient="left" gap={2} px={2}>
        <SystemDrawerCloseButton position="relative" top="0" left="0" />
        <Text fontSize={18} fontWeight="bold" lineHeight="1">
          {currentGameName === 'Lobby'
            ? 'Magic Circle'
            : gameMetaDatas[currentGameName].name}
        </Text>
        {isDeveloper && <McConfigButton />}
      </McFlex>
      <Tabs
        px={4}
        pt={3}
        variant="vertical"
        defaultIndex={defaultIndex}
        orientation="vertical"
        position="relative"
        onChange={() => playSfx('Button_Main')}
        borderRadius="inherit"
        overflowX="hidden"
      >
        <TabList ref={tabListRef} mb="15px !important">
          <McFlex col gap={2} autoH pb={2}>
            {currentGameName === 'Quinoa' && (
              <Button
                size={isSmallScreen ? 'xs' : 'sm'}
                onClick={() => {
                  setIsGameWindowed(!isGameWindowed);
                  setIsGameWindowFullScreen(false);
                  closeDrawer();
                }}
                color="Orange.Pastel"
                backgroundColor="rgba(24, 23, 23, 0.40)"
                borderRadius="10px"
                width="100%"
                border="1px solid"
                borderColor="Orange.Pastel"
              >
                {isGameWindowed ? t`Hide All Games` : t`Show All Games`}
              </Button>
            )}
            {isPartyGame && (
              <>
                <Button
                  size={isSmallScreen ? 'xs' : 'sm'}
                  onClick={() => void onConfirmEndGame()}
                  color="Orange.Pastel"
                  backgroundColor="rgba(24, 23, 23, 0.40)"
                  borderRadius="10px"
                  width="100%"
                  border="1px solid"
                  borderColor="Orange.Pastel"
                  data-testid="end-game-button"
                >
                  <Trans>End Game</Trans>
                </Button>
                <Button
                  size={isSmallScreen ? 'xs' : 'sm'}
                  onClick={() => {
                    sendRoomMessage({
                      type: 'RestartGame',
                      name: currentGameName,
                    });
                    closeDrawer();
                  }}
                  color="Red.Pastel"
                  borderColor="Red.Pastel"
                  backgroundColor="rgba(24, 23, 23, 0.40)"
                  borderRadius="10px"
                  width="100%"
                  border="1px solid"
                >
                  <Trans>Restart Game</Trans>
                </Button>
              </>
            )}
            {canUsurpHost && (
              <Button
                size={isSmallScreen ? 'xs' : 'sm'}
                onClick={() => {
                  sendRoomMessage({ type: 'UsurpHost' });
                }}
                color="Yellow.Pastel"
                borderColor="Yellow.Pastel"
                backgroundColor="rgba(24, 23, 23, 0.40)"
                borderRadius="10px"
                width="100%"
                border="1px solid"
              >
                <Trans>Become Host</Trans>
              </Button>
            )}
          </McFlex>
          <McGrid
            templateColumns={isSmallScreen ? '1fr 1fr' : '1fr'}
            gap={isSmallScreen ? 1 : 2}
          >
            <Tab sx={tabStyles}>
              <Users />
              <Trans>Party</Trans>
              {numPlayers === 1 ? (
                <Text
                  opacity="0.7"
                  fontWeight="demibold"
                  whiteSpace="nowrap"
                  fontSize={isSmallScreen ? '9px !important' : '14px'}
                >
                  <Trans>(just you)</Trans>
                </Text>
              ) : (
                <Text
                  opacity="0.7"
                  fontWeight="demibold"
                  fontSize={isSmallScreen ? '9px !important' : '14px'}
                >
                  <Trans>({numPlayers} players)</Trans>
                </Text>
              )}
            </Tab>
            {!isRunningInsideDiscord && (
              <>
                <Tab sx={tabStyles}>
                  <Plus />
                  <Trans>Invite</Trans>
                </Tab>
                <Tab sx={tabStyles}>
                  <Shuffle />
                  <Trans>Change Room</Trans>
                </Tab>
              </>
            )}
            <Tab sx={tabStyles}>
              <Settings />
              <Trans>Settings</Trans>
            </Tab>
            <Tab sx={tabStyles}>
              <Info />
              <Trans>About</Trans>
            </Tab>
          </McGrid>
        </TabList>
        <TabPanels
          overflowY="auto"
          height="100%"
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
          <TabPanel>
            <PlayersDrawer />
          </TabPanel>
          {!isRunningInsideDiscord && (
            <TabPanel>
              <ShareWidget />
            </TabPanel>
          )}
          {!isRunningInsideDiscord && (
            <TabPanel>
              <JoinRoomTab />
            </TabPanel>
          )}
          <TabPanel>
            <SettingsTab />
          </TabPanel>
          <TabPanel height="100%">
            <AboutTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </McGrid>
  );
});

PartyDrawer.displayName = 'PartyDrawer';

export default PartyDrawer;
