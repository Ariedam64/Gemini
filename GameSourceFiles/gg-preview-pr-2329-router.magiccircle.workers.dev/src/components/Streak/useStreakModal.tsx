import { Text } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useConfirmationDialog } from '@/components/ConfirmationDialog/useConfirmationDialog';
import McFlex from '@/components/McFlex/McFlex';
import { AuthenticationOptions } from '@/components/ui/authentication/AuthenticationOptions';
import UpdatingStreakImage from './StreakImage';
import StreakTimer from './StreakTimer';
import { useStreak } from './useStreak';

/**
 * @hook useStreakModal
 * @description Provides a function to display a modal detailing the user's current game streak status.
 * The modal's content, including text and the streak image, is determined by the user's
 * current `streakState` obtained from the `useStreak` hook.
 * It utilizes the `UpdatingStreakImage` component to display a daily-refreshing streak image
 * and the `StreakTimer` component to show relevant countdowns.
 */
const useStreakModal = () => {
  const showConfirmation = useConfirmationDialog();
  const { streakState } = useStreak();
  const { t } = useLingui();

  const title =
    !streakState ||
    (streakState.status === 'incomplete' && streakState.streakCount === 0)
      ? t`Start your streak 🔥`
      : streakState.status === 'active'
        ? t`Keep it up 🔥`
        : streakState.status === 'inactive'
          ? t`⚰️ R.I.P.`
          : t`Your streak is in danger!`;

  const showStreakModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    showConfirmation({
      title,
      isCentered: true,
      content: (
        <McFlex col>
          {!streakState ? (
            <McFlex col gap={2} pb={4} px={3} pt={1}>
              <Text fontSize="md" textAlign="center" lineHeight="1.4">
                <Trans>Sign in to earn rewards when you play every day!</Trans>
              </Text>
              <AuthenticationOptions mt={3.5} />
              <McFlex col gap={1} pt={4} px={10}>
                <Text fontSize="sm" fontWeight="bold">
                  <Trans>You have</Trans>
                </Text>
                <StreakTimer />
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  textAlign="center"
                  lineHeight="1.2"
                >
                  <Trans>
                    left to start your streak and earn Bread, exclusive
                    cosmetics, and more!
                  </Trans>
                </Text>
              </McFlex>
            </McFlex>
          ) : streakState.status === 'active' ? (
            <McFlex col gap={2} pb={4} px={3}>
              <Text
                fontSize="md"
                fontWeight="bold"
                textAlign="center"
                lineHeight="1.4"
              >
                <Trans>
                  You played a game today, which
                  {streakState.streakCount === 1
                    ? t` started your streak!`
                    : t` increased your streak!`}
                </Trans>
              </Text>
              <McFlex col gap={1} pt={4} px={10}>
                <Text fontSize="sm">
                  <Trans>Come back in</Trans>
                </Text>
                <StreakTimer />
                <Text fontSize="sm" textAlign="center" lineHeight="1.2">
                  <Trans>
                    to extend your streak and earn Bread, exclusive cosmetics,
                    and more!
                  </Trans>
                </Text>
              </McFlex>
            </McFlex>
          ) : streakState.status === 'inactive' &&
            streakState.streakCount > 0 ? (
            <McFlex col gap={2} pb={4} px={3}>
              <Text fontSize="lg" textAlign="center" fontWeight="bold">
                <Trans>Your streak has ended.</Trans>
              </Text>
              <Text fontSize="md" textAlign="center" lineHeight="1.4">
                <Trans>
                  Play a game to start a new streak and earn Bread, exclusive
                  cosmetics, and more!
                </Trans>
              </Text>
              <McFlex col gap={1} pt={4}>
                <StreakTimer />
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  textAlign="center"
                  lineHeight="1.2"
                >
                  <Trans>left until the streak day resets.</Trans>
                </Text>
              </McFlex>
            </McFlex>
          ) : (
            <McFlex col gap={2} pb={4} px={3}>
              <Text
                fontSize="md"
                fontWeight="bold"
                textAlign="center"
                lineHeight="1.4"
              >
                <Trans>Play every day and earn rewards!</Trans>
              </Text>
              <McFlex col gap={1} pt={4} px={10}>
                <Text fontSize="sm" lineHeight="1.2">
                  A new day begins in
                </Text>
                <StreakTimer />
              </McFlex>
            </McFlex>
          )}
          {streakState && (
            <>
              <UpdatingStreakImage />
            </>
          )}
        </McFlex>
      ),
    });
  };

  return showStreakModal;
};

export default useStreakModal;
