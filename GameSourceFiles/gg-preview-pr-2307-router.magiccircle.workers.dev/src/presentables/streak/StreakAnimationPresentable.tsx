import { useLingui } from '@lingui/react/macro';
import { Alignment, Fit } from '@rive-app/canvas';
import { Layout } from '@rive-app/react-canvas';
import { useEffect } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import type { StreakState } from '@/common/streaks';
import McFlex from '@/components/McFlex/McFlex';
import { RiveErrorBoundary } from '@/components/rive/RiveErrorFallback';
import streakIncreasedRiveFile from '@/components/Streak/streakflame.riv?url';
import useMcRive from '@/hooks/useMcRive';

interface StreakAnimationPresentableProps {
  streakState: StreakState;
  onComplete: () => void;
}

/**
 * Presentable component that displays the streak increased animation.
 * Automatically dismisses when the animation completes.
 */
const StreakAnimationPresentable: React.FC<StreakAnimationPresentableProps> = ({
  streakState,
  onComplete,
}) => {
  const { t } = useLingui();

  const { rive, RiveComponent } = useMcRive({
    src: streakIncreasedRiveFile,
    stateMachines: 'State Machine 1',
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: true,
    onStateChange: (state) => {
      const isExit =
        Array.isArray(state.data) &&
        state.data.length > 0 &&
        state.data[0] === 'exit';

      if (isExit) {
        onComplete();
      }
    },
  });

  // Play the sound effect when the animation starts
  useEffect(() => {
    playSfx('Streak_Continues');
  }, []);

  // Stop the animation when the component unmounts
  useEffect(() => {
    return () => {
      if (rive) {
        rive.stop();
      }
    };
  }, [rive]);

  // Set the streak count digits on the animation
  useEffect(() => {
    if (!rive || !streakState) {
      return;
    }
    const paddedCount = streakState.streakCount.toString().padStart(2, '0');
    rive.setTextRunValue('Text_Digits_Run_Tens', paddedCount[0]);
    rive.setTextRunValue('Text_Digits_Run_Ones', paddedCount[1]);
    rive.setTextRunValue('Text_Title_Run', t`Daily Streak`);
  }, [rive, streakState, t]);

  return (
    <McFlex
      id="StreakAnimationPresentable"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="DialogOverlay"
    >
      <RiveErrorBoundary>
        <RiveComponent />
      </RiveErrorBoundary>
    </McFlex>
  );
};

export default StreakAnimationPresentable;
