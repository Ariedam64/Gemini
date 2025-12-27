import { Text } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useConfirmationDialog } from './ConfirmationDialog/useConfirmationDialog';
import McFlex from './McFlex/McFlex';
import { SignInWithDiscordButton } from './ui/authentication/DiscordButtons';

const useDiscordModal = () => {
  const showConfirmation = useConfirmationDialog();
  const { t } = useLingui();

  const showDiscordModal = (): Promise<boolean> => {
    return new Promise<boolean>(() => {
      showConfirmation({
        title: t`Sign in with Discord`,
        isCentered: true,
        content: (
          <McFlex col gap={6} p={2} pt={1}>
            <Text fontSize="md">
              <Trans>
                Play daily games, save your progress, and earn amazing prizes!
              </Trans>
            </Text>
            <SignInWithDiscordButton size="lg">
              <Trans>Sign in</Trans>
            </SignInWithDiscordButton>
          </McFlex>
        ),
      });
    });
  };

  return showDiscordModal;
};

export default useDiscordModal;
