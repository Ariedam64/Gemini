import { Box, Center, Modal, ModalOverlay, Portal } from '@chakra-ui/react';
import { Alignment, Fit } from '@rive-app/canvas';
import { useEffect } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import { wiggleCreditsCounterWidget } from '@/components/Currency/wiggleCurrencyCounters';
import McFlex from '@/components/McFlex/McFlex';
import PresentableCloseButton from '@/presentables/PresentableCloseButton';
import { delay } from '@/utils/delay';
import Rive_DonutToaster from './Rive_DonutToaster';

interface DonutPurchaseSuccessWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonutPurchaseSuccessWindow: React.FC<DonutPurchaseSuccessWindowProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    playSfx('Bread_PullLever');
    void delay(0.4)
      .then(() => {
        // TODO_AUDIO_LOOP: This sound needs looping support - was using playSoundEffect with { loop: true }
        playSfx('Bread_PoppingLoop');
      })
      .catch(console.warn);

    return () => {
      // TODO_AUDIO_LOOP: Need to stop the looping sound here - was calling breadPoppingLoopRef.current?.stopPlaying()
      playSfx('Bread_DonePopping');
      void wiggleCreditsCounterWidget();
    };
  }, [isOpen]);

  return (
    <Portal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay zIndex="DialogOverlay" backgroundColor="ScrimDarker" />
        <McFlex
          position="absolute"
          id="DonutPurchaseSuccessWindow"
          top="var(--sait)"
          height="calc(var(--app-height) - var(--sait) - var(--saib))"
          left="var(--sail)"
          right="var(--sair)"
          zIndex="DialogOverlay"
        >
          <Center
            zIndex="BreadToasterWindow"
            flexDirection="column"
            textAlign="center"
            maxWidth="100%"
            justifyContent="start"
            height="100%"
            width="100%"
          >
            <Box
              width="45vh"
              height="100vh"
              position="relative"
              marginTop="-20vh"
            >
              <Rive_DonutToaster
                isShootingDonuts={true}
                onComplete={() => {
                  onClose();
                }}
                riveLayoutParameters={{
                  fit: Fit.FitWidth,
                  alignment: Alignment.BottomCenter,
                }}
              />
            </Box>
          </Center>
          <PresentableCloseButton
            position="absolute"
            top="20px"
            right="20px"
            onClick={onClose}
            zIndex="BreadToasterWindow"
          />
        </McFlex>
      </Modal>
    </Portal>
  );
};

export default DonutPurchaseSuccessWindow;
