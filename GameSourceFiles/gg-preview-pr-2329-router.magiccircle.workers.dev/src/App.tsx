import { Box } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import BackgroundImageContainer from '@/components/Background/BackgroundImageContainer';
import ChatWidget from '@/components/Chat/ChatWidget';
import { ConfirmationDialog } from '@/components/ConfirmationDialog/ConfirmationDialog';
import { CreditsModal } from '@/components/Credits/credits-modal/CreditsModal';
import BreadToasterWindow from '@/components/Currency/BreadToasterWindow';
import CurrencyTransactionEventAnnouncer from '@/components/Currency/CurrencyTransactionEventAnnouncer';
import EmoteWindow from '@/components/Emotes/EmoteWindow';
import GameStartingCountdown from '@/components/GameStartingCountdown/GameStartingCountdown';
import {
  isGameWindowedAtom,
  isGameWindowFullScreenAtom,
} from '@/components/GameWindow/store';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { MotionMcFlex } from '@/components/Motion';
import OneTimeRewardsModal from '@/components/OneTimeRewardsModal/OneTimeRewardsModal';
import ReportPlayerModal from '@/components/ReportPlayerModal';
import Slapper from '@/components/Slapper/Slapper';
import SystemDrawer from '@/components/SystemDrawer/SystemDrawer';
import { InappropriateContentRejectedDialog } from '@/components/ui/InappropriateContentRejected';
import QuinoaView from '@/Quinoa/QuinoaView';
import SystemHeader from './components/SystemHeader/SystemHeader';
import { ConnectionInterruptedDialog } from './connection/ConnectionInterruptedDialog';
import { PermanentlyDisconnectedDialog } from './connection/PermanentlyDisconnectedDialog';
import { platform } from './environment';
import EmbeddedGameContainer from './games/Lobby/components/EmbeddedGameContainer';
import GamesGallery from './games/Lobby/components/GamesGallery';
import useAppEffects from './hooks/useAppEffects';
import { usePreviewWarningModal } from './hooks/usePreviewWarningModal';
import useScaleFactorEffects from './hooks/useScaleFactorEffects';
import CoverSheetModal from './presentables/cover-sheet/CoverSheetModal';
import { useCurrentGameName, useIsBreadToasterWindowOpen } from './store/store';
import '@pixi/sound'; // Import to register sound parser with PixiJS Assets

const App = () => {
  const isBreadToasterWindowOpen = useIsBreadToasterWindowOpen();
  const isGameWindowed = useAtomValue(isGameWindowedAtom);
  const isGameWindowFullScreen = useAtomValue(isGameWindowFullScreenAtom);
  const currentGameName = useCurrentGameName();

  useAppEffects();
  usePreviewWarningModal();
  useScaleFactorEffects();

  return (
    <Box id="AppWrapper" w="100%" h="100%" position="relative">
      <MotionMcFlex zIndex="BackgroundImage" position="absolute">
        <BackgroundImageContainer
          gameName="Lobby"
          brightness={0.5}
          renderInPortal={true}
        />
      </MotionMcFlex>
      <GameStartingCountdown />
      <OneTimeRewardsModal />
      <ReportPlayerModal />
      <CreditsModal />
      <CoverSheetModal />
      <Slapper />
      <SystemDrawer />
      {isBreadToasterWindowOpen && <BreadToasterWindow />}
      <CurrencyTransactionEventAnnouncer />
      {platform === 'desktop' && <EmoteWindow />}
      <ChatWidget />
      <InappropriateContentRejectedDialog />
      <PermanentlyDisconnectedDialog />
      <ConnectionInterruptedDialog />
      <ConfirmationDialog />
      <McFlex id="App">
        {currentGameName === 'Quinoa' && !isGameWindowed ? (
          <QuinoaView />
        ) : (
          <McGrid templateRows="auto 1fr auto" overflow="hidden">
            <SystemHeader />
            <McFlex minHeight="200px" overflow="hidden">
              <EmbeddedGameContainer />
            </McFlex>
            {!isGameWindowFullScreen && (
              <McFlex
                overflow="hidden"
                orient="top"
                pt={{ base: 1, sm: 2 }}
                pb={{ base: 0, sm: 1, md: 2 }}
              >
                <GamesGallery />
              </McFlex>
            )}
          </McGrid>
        )}
      </McFlex>
    </Box>
  );
};

export default App;
