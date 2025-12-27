import { Box, Center, Text } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { Alignment, Fit } from '@rive-app/canvas';
import { useEffect, useRef, useState } from 'react';
import type { Audio } from '@/audio/legacy/audio';
import { playSoundEffect } from '@/audio/legacy/soundEffects/soundEffect';
import { ChallengeType, challengeRewards } from '@/common/challenges';
import type { UserChallenge } from '@/common/prisma/generated/browser';
import Rive_BreadToaster from '@/components/Currency/Rive_BreadToaster/Rive_BreadToaster';
import Rive_Currency, {
  Rive_CurrencyState,
} from '@/components/Currency/Rive_Currency/Rive_Currency';
import { wiggleBreadCounterWidget } from '@/components/Currency/wiggleCurrencyCounters';
import McFlex from '@/components/McFlex/McFlex';
import { MotionBox } from '@/components/Motion';
import GlowingButton from '@/components/ui/GlowingButton';
import { useMagicToast } from '@/components/ui/MagicToast';
import { useCompleteChallengeOptimistically, useUser } from '@/user';
import { delay } from '@/utils/delay';
import { useDismissCurrentPresentable } from '..';
import PresentableCloseButton from '../PresentableCloseButton';

export interface DailyChallengeCompletePresentable {
  type: 'DailyChallengeComplete';
  component: React.ReactNode;
}

interface DailyChallengeCompletePresentableRendererProps {
  challenge: UserChallenge;
}

export const DailyChallengeCompletePresentableRenderer: React.FC<
  DailyChallengeCompletePresentableRendererProps
> = ({ challenge }) => {
  const [didPressClaim, setDidPressClaim] = useState(false);
  const isClaiming = useRef(false);
  const [isBreadShooting, setIsBreadShooting] = useState(false);
  const [isBreadAmazed, setIsBreadAmazed] = useState(false);
  const breadSparkleLoopRef = useRef<Audio | undefined>();
  const breadPoppingLoopRef = useRef<Audio | undefined>();
  const completeChallenge = useCompleteChallengeOptimistically();
  const dismissCurrentPresentable = useDismissCurrentPresentable();
  const { t } = useLingui();
  const { user } = useUser();
  const { sendToast } = useMagicToast();

  // TODO: this is a hack to get around the fact that on web surface
  // we created an account BEFORE they connected to the websocket, so
  // their lastActiveAt is set to the time they connected to the websocket,
  // which is SLIGHTLY after their account was created.
  // We use a 10 minute fudge factor to account for this.
  const tenMinutesInMs = 10 * 60 * 1000;
  const isFirstTimeLoggingIn = user
    ? user.lastActiveAt.getTime() - user.createdAt.getTime() <= tenMinutesInMs
    : false;

  useEffect(() => {
    breadSparkleLoopRef.current = playSoundEffect('Bread_SparkleLoop_01', {
      loop: true,
    });
    return () => {
      breadSparkleLoopRef.current?.stopPlaying();
      breadPoppingLoopRef.current?.stopPlaying();
    };
  }, []);

  const onClick = async () => {
    if (isClaiming.current) {
      return;
    }
    isClaiming.current = true;
    setDidPressClaim(true);
    playSoundEffect('Bread_PullLever_01');

    void delay(0.5)
      .then(() => {
        setIsBreadShooting(true);
        setIsBreadAmazed(true);
        breadPoppingLoopRef.current = playSoundEffect('Bread_PoppingLoop_01');
      })
      .catch(console.warn);

    await delay(2);

    setIsBreadShooting(false);
    breadPoppingLoopRef.current?.stopPlaying();
    await delay(1.25);
    playSoundEffect('Bread_DonePopping_01');
    void wiggleBreadCounterWidget();
    const undoDismiss = dismissCurrentPresentable();

    try {
      await completeChallenge(challenge);
    } catch (e) {
      sendToast({
        title: t`Failed to complete challenge`,
        description: e instanceof Error ? e.message : t`Unknown error`,
        status: 'error',
      });
      setDidPressClaim(false);
      setIsBreadShooting(false);
      setIsBreadAmazed(false);
      undoDismiss();
      isClaiming.current = false;
    }
  };

  const dailyChallengeAmount = challengeRewards[ChallengeType.DailyBread];

  return (
    <Center
      flexDirection="column"
      textAlign="center"
      maxWidth="100%"
      justifyContent="start"
      height="100%"
      width="100%"
    >
      <Box width="45vh" height="55vh" position="relative" marginBottom="-10vh">
        <Box width="100%" height="100%">
          <PresentableCloseButton position="absolute" top="25vh" right="5px" />
          <Rive_BreadToaster
            isShootingBread={isBreadShooting}
            riveLayoutParameters={{
              fit: Fit.FitWidth,
              alignment: Alignment.BottomCenter,
            }}
          />
        </Box>
      </Box>
      <Text
        variant="textSlapper-default"
        my="10px"
        fontSize="4xl"
        width="95vw"
        px="10px"
      >
        {isFirstTimeLoggingIn ? (
          <Trans>Welcome gift!</Trans>
        ) : (
          <Trans>Your Daily Bread</Trans>
        )}
      </Text>
      <Text fontSize="md" maxWidth="100vw" px="10px">
        <Trans>Every day you play, you'll earn more Bread :)</Trans>
      </Text>
      <McFlex gap="10px" mt="20px" height="auto" mb="10px">
        <GlowingButton
          onClick={() => void onClick()}
          size="lg"
          backgroundColor="Purple.Dark"
          glowBackgroundColor="Purple.Dark"
          isGlowing={!didPressClaim}
          pointerEvents={didPressClaim ? 'none' : 'auto'}
          padding="30px 50px"
          paddingRight="0px"
          fontSize="xl"
          overflow="visible"
        >
          <Trans>Claim {dailyChallengeAmount}</Trans>
          <MotionBox
            height="100px"
            width="100px"
            initial={{ scale: 0.5 }}
            animate={{
              scale: didPressClaim ? 1 : 0.5,
              marginLeft: didPressClaim ? '5px' : '-20px',
            }}
          >
            <Rive_Currency
              currencyState={
                isBreadAmazed
                  ? Rive_CurrencyState.Amazed
                  : Rive_CurrencyState.Idle
              }
            />
          </MotionBox>
        </GlowingButton>
      </McFlex>
    </Center>
  );
};
