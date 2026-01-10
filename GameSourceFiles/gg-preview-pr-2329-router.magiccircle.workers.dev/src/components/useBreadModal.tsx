import { chakra, List, ListItem, Text } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { AuthenticationOptions } from '@/components/ui/authentication/AuthenticationOptions';
import { useIsUserAuthenticated } from '@/store/store';
import { useConfirmationDialog } from './ConfirmationDialog/useConfirmationDialog';
import McFlex from './McFlex/McFlex';

const useBreadModal = () => {
  const showConfirmation = useConfirmationDialog();
  const isAuthenticated = useIsUserAuthenticated();
  const { t } = useLingui();

  const waysToEarnBread = [
    t`Come back tomorrow to claim your Daily Bread`,
    t`Submit an answer to The Daily Question (top answers earn bonus Bread)`,
    t`More ways coming soon!`,
  ];

  const showBreadModal = (): Promise<boolean> => {
    return new Promise<boolean>(() => {
      showConfirmation({
        title: t`What's 🍞 Bread?`,
        isCentered: true,
        content: (
          <McFlex col gap={4} p={2} pt={1}>
            {isAuthenticated ? (
              <>
                <Text fontSize="md">
                  <Trans>
                    You can buy cosmetics and access special features with 🍞
                    Bread.
                  </Trans>
                </Text>
                <Text fontSize="md" fontWeight="bold" textAlign="center" pt={2}>
                  <Trans>How to earn 🍞 Bread:</Trans>
                </Text>
                <List spacing={2} textAlign="left" pl={4} listStyleType="none">
                  {waysToEarnBread.map((text) => (
                    <ListItem key={text} display="flex" alignItems="flex-start">
                      <chakra.span mr="2" role="img" aria-label={t`Bread`}>
                        🍞
                      </chakra.span>
                      <Text as="span">
                        <Trans>{text}</Trans>
                      </Text>
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <>
                <Text fontSize="md">
                  <Trans>Sign in to earn 🍞 Bread while you play!</Trans>
                </Text>
                <AuthenticationOptions />
                <Text fontSize="md">
                  <Trans>
                    You can buy cosmetics and access special features with 🍞
                    Bread.
                  </Trans>
                </Text>
              </>
            )}
          </McFlex>
        ),
      });
    });
  };

  return showBreadModal;
};

export default useBreadModal;
