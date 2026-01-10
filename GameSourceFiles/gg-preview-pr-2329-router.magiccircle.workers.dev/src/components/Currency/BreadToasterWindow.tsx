import { Box, Text } from '@chakra-ui/layout';
import { Trans, useLingui } from '@lingui/react/macro';
import { useCallback, useEffect, useRef, useState } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import { breadWidgetGrantTypes } from '@/common/types/currencies';
import McFlex from '@/components/McFlex/McFlex';
import { RiveErrorBoundary } from '@/components/rive/RiveErrorFallback';
import { useMagicToast } from '@/components/ui/MagicToast';
import { isDesktopMode } from '@/environment';
import {
  useDesktopWindowScaleFactor,
  useSetIsBreadToasterWindowOpen,
} from '@/store/store';
import { claimPendingGrants, useUnclaimedGrantsAmount, useUser } from '@/user';
import { delay } from '@/utils/delay';
import RandomBreadBackground from './RandomBreadBackground';
import Rive_BreadToaster from './Rive_BreadToaster/Rive_BreadToaster';
import { Rive_CurrencyState } from './Rive_Currency/Rive_Currency';
import { wiggleBreadCounterWidget } from './wiggleCurrencyCounters';

const BreadToasterWindow: React.FC = () => {
  const scaleFactor = useDesktopWindowScaleFactor();
  const setIsBreadToasterWindowOpen = useSetIsBreadToasterWindowOpen();
  const { totalAmountUnclaimed, mutateTotalAmountUnclaimed } =
    useUnclaimedGrantsAmount(breadWidgetGrantTypes);
  const [hasClickedToaster, setHasClickedToaster] = useState(false);
  const [breadState, setBreadState] = useState<Rive_CurrencyState>(
    Rive_CurrencyState.Idle
  );
  const newBalance = useRef<number>(0);
  const { user, mutateUser } = useUser();
  const { sendToast } = useMagicToast();
  const { t } = useLingui();

  const handleToasterClicked = useCallback(async () => {
    if (hasClickedToaster) {
      return;
    }
    try {
      playSfx('Bread_PullLever');

      void delay(0.5)
        .then(() => {
          // TODO_AUDIO_LOOP: This sound needs looping support - was using playSoundEffect('Bread_PoppingLoop_01')
          playSfx('Bread_PoppingLoop');
        })
        .catch(console.warn);
      setHasClickedToaster(true);
      setBreadState(Rive_CurrencyState.Amazed);
      // Execute claimPendingGrants() and delay(1000) in parallel.
      // This ensures that the subsequent operations wait for both:
      // 1. The pending grants to be claimed.
      // 2. A minimum delay of 3 second to allow for the animation.
      // The animation duration will be the longer of the two operations.
      const [claimResult] = await Promise.all([
        claimPendingGrants(breadWidgetGrantTypes),
        delay(2),
      ]);

      // Extract the new balance from the result of claimPendingGrants().
      newBalance.current = claimResult.newBalance;

      setBreadState(Rive_CurrencyState.Outro);
      // TODO_AUDIO_LOOP: audioSoundEffect.current?.stopPlaying(); // Needs looping API to stop sound

      void delay(0.4)
        .then(() => {
          playSfx('Bread_DonePopping');
        })
        .catch(console.warn);
    } catch (e) {
      setIsBreadToasterWindowOpen(false);
      sendToast({
        title: t`Failed to redeem bread`,
        description: e instanceof Error ? e.message : t`Unknown error`,
        status: 'error',
      });
    }
  }, [mutateTotalAmountUnclaimed, mutateUser, user]);

  const onComplete = () => {
    // Use SWR's mutate functions to update the local cache in parallel.
    // This ensures that the pending grants are reset and the user's balance
    // is updated immediately after the toaster closes.

    void wiggleBreadCounterWidget();
    void mutateTotalAmountUnclaimed(0).catch(console.error);
    if (user) {
      void mutateUser({ ...user, currencyBalance: newBalance.current }).catch(
        console.error
      );
    }

    setIsBreadToasterWindowOpen(false);
  };

  useEffect(() => {
    // TODO_AUDIO_LOOP: This sound needs looping support - was using { loop: true }
    // TODO_AUDIO_LOOP: Need to implement stopping mechanism (was calling .stopPlaying())
    playSfx('Bread_SparkleLoop');

    return () => {
      // TODO_AUDIO_LOOP: audioSoundEffect.current?.stopPlaying(); // Needs looping API to stop sound
    };
  }, []);

  // This is a VERY QUICK fix to make this component work on mobile.
  // The toaster was off the side of the screen and unclickable.
  // We should do a cleaner refactor.
  if (!isDesktopMode) {
    return (
      <McFlex
        id="BreadToasterWindow"
        col
        position="absolute"
        top="0"
        zIndex="BreadToasterWindow"
        backgroundColor={`rgba(0, 0, 0, 0.80)`}
      >
        <RandomBreadBackground count={8} breadState={breadState} />
        <Text fontSize="40px" whiteSpace="nowrap" lineHeight={0}>
          <Trans>YOU FOUND</Trans>
        </Text>
        <Text pl={5} fontSize="100px" fontWeight="bold" color="Yellow.Pastel">
          {totalAmountUnclaimed}
        </Text>
        <Text
          fontFamily="textSlap"
          fontStyle="italic"
          fontSize="60px"
          fontWeight="bold"
          lineHeight="30px"
        >
          <Trans>BREAD</Trans>
        </Text>
        <Box mt="-130px" w="300px" h="300px" onClick={handleToasterClicked}>
          <RiveErrorBoundary>
            <Rive_BreadToaster
              isShootingBread={breadState === Rive_CurrencyState.Amazed}
              onComplete={onComplete}
            />
          </RiveErrorBoundary>
        </Box>
        <Text
          visibility={hasClickedToaster ? 'hidden' : 'visible'}
          fontSize="25px"
        >
          <Trans>Pull the lever to redeem!</Trans>
        </Text>
      </McFlex>
    );
  }

  return (
    <McFlex
      id="BreadToasterWindow"
      position="absolute"
      top="0"
      zIndex="BreadToasterWindow"
      backgroundColor={`rgba(0, 0, 0, 0.80)`}
    >
      <RandomBreadBackground count={8} breadState={breadState} />
      <McFlex
        position="absolute"
        top="50%"
        left="50%"
        transform={`translate(-50%, -50%) scale(${scaleFactor})`}
        transformOrigin="center"
      >
        <McFlex col width="auto" pt="40px">
          <McFlex h="auto" mb="-50px">
            <Text fontSize="80px" whiteSpace="nowrap">
              <Trans>YOU FOUND</Trans>
            </Text>
            <Text
              pl={5}
              fontSize="100px"
              fontWeight="bold"
              color="Yellow.Pastel"
            >
              {totalAmountUnclaimed}
            </Text>
          </McFlex>
          <Text
            fontFamily="textSlap"
            fontStyle="italic"
            fontSize="96px"
            fontWeight="bold"
          >
            <Trans>BREAD</Trans>
          </Text>
          <Text
            visibility={hasClickedToaster ? 'hidden' : 'visible'}
            fontSize="35px"
            whiteSpace="nowrap"
          >
            <Trans>Pull the lever to redeem!</Trans>
          </Text>
        </McFlex>
        <Box minW="500px" h="800px" mb="250px" position="relative">
          <Box
            id="ToasterHitbox"
            bottom="16%"
            left="26%"
            position="absolute"
            cursor={hasClickedToaster ? 'default' : 'pointer'}
            w="250px"
            h="250px"
            onClick={handleToasterClicked}
          />
          <Rive_BreadToaster
            isShootingBread={breadState === Rive_CurrencyState.Amazed}
            onComplete={onComplete}
          />
        </Box>
      </McFlex>
    </McFlex>
  );
};

export default BreadToasterWindow;
