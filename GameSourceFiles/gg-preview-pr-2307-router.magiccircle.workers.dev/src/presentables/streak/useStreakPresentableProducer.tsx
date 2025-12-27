import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import {
  initialStreakStateAtom,
  shouldTriggerStreakAnimationAtom,
} from '@/components/Streak/store';
import { useStreak } from '@/components/Streak/useStreak';
import { isTutorialCompleteAtom } from '@/Quinoa/atoms/myAtoms';
import { useDismissCurrentPresentable, usePresentableProducer } from '..';
import StreakAnimationPresentable from './StreakAnimationPresentable';

export interface StreakPresentable {
  type: 'Streak';
  component: React.ReactNode;
}

/**
 * Produces a streak animation presentable when the user's streak increases.
 * Triggers on:
 * 1. Initial load: when streak goes from non-active to active
 * 2. Day rollover: optimistically when user had an active streak
 */
export function useStreakPresentableProducer(priority: number) {
  const { addPresentable, removePresentable } =
    usePresentableProducer<StreakPresentable>(priority);
  const { streakState: currentStreakState } = useStreak();
  const isTutorialComplete = useAtomValue(isTutorialCompleteAtom);
  const initialStreakState = useAtomValue(initialStreakStateAtom);
  const [shouldTriggerAnimation, setShouldTriggerAnimation] = useAtom(
    shouldTriggerStreakAnimationAtom
  );
  const hasShownInitialAnimationRef = useRef(false);
  const dismissCurrentPresentable = useDismissCurrentPresentable();

  const handleComplete = () => {
    dismissCurrentPresentable();
    removePresentable({ id: 'streak-animation' });
  };

  const showStreakAnimation = () => {
    if (!currentStreakState) {
      return;
    }
    addPresentable({
      id: 'streak-animation',
      presentable: {
        type: 'Streak',
        component: (
          <StreakAnimationPresentable
            streakState={currentStreakState}
            onComplete={handleComplete}
          />
        ),
      },
    });
  };

  // Trigger 1: Initial load - streak went from non-active to active
  useEffect(() => {
    if (
      hasShownInitialAnimationRef.current ||
      !isTutorialComplete ||
      !currentStreakState ||
      !initialStreakState
    ) {
      return;
    }
    const hasStreakIncreased =
      initialStreakState.status !== 'active' &&
      currentStreakState.status === 'active';

    if (hasStreakIncreased) {
      hasShownInitialAnimationRef.current = true;
      showStreakAnimation();
    }
  }, [currentStreakState, initialStreakState, isTutorialComplete]);

  // Trigger 2: Day rollover - optimistically show animation
  useEffect(() => {
    if (!shouldTriggerAnimation || !isTutorialComplete) {
      return;
    }
    setShouldTriggerAnimation(false);
    showStreakAnimation();
  }, [shouldTriggerAnimation, isTutorialComplete]);
}
