import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { debounce } from 'lodash';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Maximize, Maximize2, Minimize2, Settings } from 'react-feather';
import { playSoundEffect } from '@/audio/legacy/soundEffects/soundEffect';
import type { GameName } from '@/common/types/games';
import BackgroundImageContainer from '@/components/Background/BackgroundImageContainer';
import HowToPlayPanel from '@/components/HowToPlay/HowToPlayPanel/HowToPlayPanel';
import LoadingScreen from '@/components/LoadingScreen';
import McChakraProvider from '@/components/McChakraProvider';
import McFlex, { type McFlexProps } from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import Scope from '@/components/Scope';
import HelpMiniButton from '@/components/SystemHeader/HelpMiniButton';
import useEndGameModal from '@/components/useEndGameModal';
import { environment } from '@/environment';
import gameMetaDatas from '@/games/gameMetaDatas';
import { useSendRoomMessage } from '@/hooks';
import { sendQuinoaMessage } from '@/Quinoa/utils/sendQuinoaMessage';
import {
  useActiveGame,
  useCurrentGameName,
  useIsDeveloper,
} from '@/store/store';
import { getContrastingColor } from '@/utils/getContrastingColor';
import DatePicker, { type DatePickerProps } from './DatePicker';
import {
  isGameWindowFullScreenAtom,
  setIsGameWindowed,
  setIsGameWindowFullScreen,
} from './store';

interface GameWindowProps extends McFlexProps {
  gameName: GameName;
  children: React.ReactNode;
  dateData?: DatePickerProps;
  additionalHeaderElement?: React.ReactNode;
  overflowY?: 'auto' | 'hidden';
}

const GameWindow: React.FC<GameWindowProps> = ({
  children,
  gameName,
  dateData,
  overflowY = 'auto',
  additionalHeaderElement,
  ...props
}) => {
  const { name, primaryAccentColor, howToSlides } = gameMetaDatas[gameName];
  const contentRef = useRef<HTMLDivElement>(null);
  const isGameWindowFullScreen = useAtomValue(isGameWindowFullScreenAtom);
  const currentGameName = useCurrentGameName();
  const activeGame = useActiveGame();
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isShowingHowToPlay, setIsShowingHowToPlay] = useState(false);
  const [isPartySettingsOpen, setIsPartySettingsOpen] = useState(false);
  const sendRoomMessage = useSendRoomMessage();
  const confirmEndGame = useEndGameModal();
  const { t } = useLingui();

  const onConfirmEndGame = async () => {
    await confirmEndGame();
  };
  const isDeveloper = useIsDeveloper();

  const checkOverflow = useMemo(
    () =>
      debounce(() => {
        if (!contentRef.current) return;
        const { scrollHeight, clientHeight } = contentRef.current;
        setHasOverflow(scrollHeight > clientHeight);
      }, 250),
    []
  );

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }
    const observer = new MutationObserver(checkOverflow);

    observer.observe(contentRef.current, {
      childList: true,
      subtree: true,
    });
    window.addEventListener('resize', checkOverflow);
    checkOverflow();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  const isPreview = environment === 'Preview';
  const primaryColor = isPreview ? 'Red.Magic' : primaryAccentColor;
  const contrastingPrimaryColor = getContrastingColor(primaryColor);
  const isPartyGame =
    currentGameName !== 'Lobby' &&
    gameMetaDatas[currentGameName].type === 'Party';

  return (
    <Scope scope={gameName}>
      <McChakraProvider>
        <Suspense fallback={<LoadingScreen />}>
          <McFlex
            col
            borderRadius="10px"
            overflow="hidden"
            borderWidth="3px"
            borderColor={primaryColor}
            maxW={isGameWindowFullScreen ? '100%' : '1300px'}
            {...props}
          >
            <McFlex autoH bg={primaryColor} pl={2} pb={1} gap={1}>
              <McFlex orient="left" pl={1}>
                {isPreview ? (
                  <Text
                    size={{ base: 'sm', md: 'md' }}
                    fontWeight="extrabold"
                    lineHeight="1"
                    textTransform="uppercase"
                    color={contrastingPrimaryColor}
                  >
                    <Trans>⚠️ BETA ⚠️</Trans> {name}
                  </Text>
                ) : (
                  <Text
                    size={{ base: 'sm', md: 'md' }}
                    fontWeight="extrabold"
                    lineHeight="1"
                    textTransform="uppercase"
                    color={contrastingPrimaryColor}
                  >
                    {name}
                  </Text>
                )}
              </McFlex>
              {dateData && <DatePicker {...dateData} />}
              {howToSlides && (
                <HelpMiniButton
                  color={contrastingPrimaryColor}
                  isOpen={isShowingHowToPlay}
                  onClick={() => {
                    playSoundEffect('Button_Main_01');
                    setIsShowingHowToPlay(!isShowingHowToPlay);
                  }}
                />
              )}
              {additionalHeaderElement}
              {isDeveloper && (
                <Button
                  size="xs"
                  onClick={() =>
                    sendQuinoaMessage({
                      type: 'Dev',
                    })
                  }
                >
                  Dev
                </Button>
              )}
              {isPartyGame && (
                <Menu
                  isOpen={isPartySettingsOpen}
                  onClose={() => {
                    playSoundEffect('Button_Main_01');
                    setIsPartySettingsOpen(false);
                  }}
                  placement="bottom-end"
                >
                  <McTooltip
                    label={t`Party Settings`}
                    placement="bottom"
                    showOnDesktopOnly
                  >
                    <MenuButton
                      as={IconButton}
                      variant="blank"
                      aria-label={t`Party Settings`}
                      icon={
                        <Settings
                          color={contrastingPrimaryColor}
                          strokeWidth={1.5}
                        />
                      }
                      onClick={() => {
                        playSoundEffect('Button_Main_01');
                        setIsPartySettingsOpen(!isPartySettingsOpen);
                      }}
                    />
                  </McTooltip>
                  <MenuList
                    backdropFilter="blur(50px)"
                    bg="transparent"
                    border="none"
                    borderRadius="10px"
                    mr="-30px"
                    px={4}
                    py={2}
                    w="auto"
                    zIndex="GameWindowModal"
                  >
                    <McFlex col gap={2}>
                      <Button
                        px={0}
                        size="sm"
                        onClick={() => void onConfirmEndGame()}
                        color="Orange.Pastel"
                        backgroundColor="rgba(24, 23, 23, 0.40)"
                        borderRadius="10px"
                        width="100%"
                        border="1px solid"
                        borderColor="Orange.Pastel"
                      >
                        <Trans>End Game</Trans>
                      </Button>{' '}
                      <Button
                        px={0}
                        size="sm"
                        onClick={() => {
                          sendRoomMessage({
                            type: 'RestartGame',
                            name: gameName,
                          });
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
                    </McFlex>
                  </MenuList>
                </Menu>
              )}
              {isGameWindowFullScreen && (
                <McTooltip
                  label={t`Smaller`}
                  placement="bottom"
                  showOnDesktopOnly
                >
                  <IconButton
                    px={1}
                    variant="blank"
                    aria-label={t`Smaller`}
                    icon={
                      <Minimize2
                        color={contrastingPrimaryColor}
                        strokeWidth={1.5}
                      />
                    }
                    onClick={() => {
                      playSoundEffect('Button_Main_01');
                      setIsGameWindowFullScreen(false);
                    }}
                  />
                </McTooltip>
              )}
              {!isGameWindowFullScreen && (
                <McTooltip
                  label={t`Bigger`}
                  placement="bottom"
                  showOnDesktopOnly
                >
                  <IconButton
                    px={1}
                    variant="blank"
                    aria-label={t`Bigger`}
                    icon={
                      <Maximize2
                        color={contrastingPrimaryColor}
                        strokeWidth={1.5}
                      />
                    }
                    onClick={() => {
                      playSoundEffect('Button_Main_01');
                      setIsGameWindowFullScreen(true);
                    }}
                  />
                </McTooltip>
              )}
              {currentGameName === 'Quinoa' && activeGame === 'Quinoa' && (
                <McTooltip
                  label={t`Fullscreen`}
                  placement="bottom"
                  showOnDesktopOnly
                >
                  <IconButton
                    pr={1}
                    variant="blank"
                    aria-label={t`Fullscreen`}
                    icon={
                      <Maximize
                        color={contrastingPrimaryColor}
                        strokeWidth={1.5}
                      />
                    }
                    onClick={() => {
                      playSoundEffect('Button_Main_01');
                      setIsGameWindowed(false);
                    }}
                  />
                </McTooltip>
              )}
            </McFlex>
            <McFlex overflow="hidden" position="relative">
              <McFlex
                position="absolute"
                top={0}
                left={0}
                zIndex="BackgroundImage"
              >
                <BackgroundImageContainer
                  gameName={gameName}
                  brightness={0.6}
                />
              </McFlex>
              <McFlex
                ref={contentRef}
                overflowY={isShowingHowToPlay ? 'auto' : overflowY}
                overflowX="hidden"
                orient={hasOverflow ? 'top' : 'center'}
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
                {isShowingHowToPlay && howToSlides ? (
                  <HowToPlayPanel
                    howToSlides={howToSlides}
                    onClose={() => setIsShowingHowToPlay(false)}
                  />
                ) : (
                  children
                )}
              </McFlex>
            </McFlex>
          </McFlex>
        </Suspense>
      </McChakraProvider>
    </Scope>
  );
};

export default GameWindow;
