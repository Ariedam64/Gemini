import { useLingui } from '@lingui/react/macro';
import { getDefaultStore, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { isEstablishingShotCompleteAtom } from '@/Quinoa/atoms/establishingShotAtoms';
import {
  isFirstCropHarvestActiveAtom,
  isInitialMoveToDirtPatchToastVisibleAtom,
  isThirdSeedPlantActiveAtom,
  isWelcomeToastVisibleAtom,
  shouldCloseWelcomeToastAtom,
} from '@/Quinoa/atoms/taskAtoms';
import {
  closeNonStackableToast,
  sendQuinoaToast,
} from '@/Quinoa/atoms/toastAtoms';
import { delay } from '@/utils/delay';

type HACKYTutorialAnnouncersProps = {};

const { get } = getDefaultStore();

const HACKYTutorialAnnouncers: React.FC<HACKYTutorialAnnouncersProps> = () => {
  const isTouchDevice = useIsTouchDevice();
  const isWelcomeToastVisible = useAtomValue(isWelcomeToastVisibleAtom);
  const isMoveToDirtPatchToastVisible = useAtomValue(
    isInitialMoveToDirtPatchToastVisibleAtom
  );
  const isFirstCropHarvestActive = useAtomValue(isFirstCropHarvestActiveAtom);
  const shouldCloseWelcomeToast = useAtomValue(shouldCloseWelcomeToastAtom);
  const isEstablishingShotComplete = useAtomValue(
    isEstablishingShotCompleteAtom
  );
  const isThirdSeedPlantActive = useAtomValue(isThirdSeedPlantActiveAtom);

  const { t } = useLingui();

  useEffect(() => {
    if (!isEstablishingShotComplete) {
      return;
    }
    if (isWelcomeToastVisible) {
      const icon = isTouchDevice ? 'sprite/ui/Touchpad' : 'sprite/ui/ArrowKeys';
      const directionalController = isTouchDevice ? t`touchpad` : t`arrow keys`;
      sendQuinoaToast({
        title: t`Welcome to Magic Garden!`,
        description: t`Use the ${directionalController} to move.`,
        variant: 'info',
        icon,
        duration: null,
      });
    } else if (isMoveToDirtPatchToastVisible) {
      void delay(3).then(() => {
        if (get(isInitialMoveToDirtPatchToastVisibleAtom)) {
          const icon = 'sprite/ui/Dirt';
          sendQuinoaToast({
            title: t`Walk to a soil patch`,
            description: t`Go plant your first seed!`,
            variant: 'info',
            icon,
            duration: null,
          });
        }
      });
    } else if (isFirstCropHarvestActive) {
      void delay(4).then(() => {
        const icon = 'sprite/plant/BabyCarrot';
        sendQuinoaToast({
          title: t`Harvest your Carrot`,
          description: t`Your crop is fully grown!`,
          variant: 'info',
          icon,
          duration: null,
        });
      });
    } else if (isThirdSeedPlantActive) {
      const icon = 'sprite/ui/Dirt';
      sendQuinoaToast({
        title: t`Keep planting!`,
        description: t`Walk to another soil patch.`,
        variant: 'info',
        icon,
        duration: null,
      });
    }
  }, [
    isWelcomeToastVisible,
    isTouchDevice,
    isMoveToDirtPatchToastVisible,
    isEstablishingShotComplete,
    isFirstCropHarvestActive,
    isThirdSeedPlantActive,
  ]);

  useEffect(() => {
    if (shouldCloseWelcomeToast) {
      closeNonStackableToast();
    }
  }, [shouldCloseWelcomeToast]);

  return null;
};

export default HACKYTutorialAnnouncers;
