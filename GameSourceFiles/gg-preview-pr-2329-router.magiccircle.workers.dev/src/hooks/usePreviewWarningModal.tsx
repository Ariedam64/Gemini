import { ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useEffect } from 'react';
import McFlex from '@/components/McFlex/McFlex';
import { getIsPlaywrightTestClient } from '@/utils/getIsPlaywrightTestClient';
import { setConfirmationDialog } from '../components/ConfirmationDialog/useConfirmationDialog';
import { environment } from '../environment';

export const usePreviewWarningModal = () => {
  const { t } = useLingui();
  const isPlaywrightTestClient = getIsPlaywrightTestClient();

  useEffect(() => {
    if (environment === 'Preview' && !isPlaywrightTestClient) {
      const message = (
        <McFlex col gap={4} textAlign="left">
          <Text fontSize="md" fontWeight="bold">
            <Trans>You are on a beta version of Magic Garden.</Trans>
          </Text>
          <UnorderedList spacing={2} pl={5}>
            <ListItem>
              <Trans>
                This environment exists for testing and feedback before public
                release.
              </Trans>
            </ListItem>
            <ListItem>
              <Trans>
                Changes here will NOT be saved to your real account, such as
                game progress, currency, streaks, achievements, and settings.
              </Trans>
            </ListItem>
            <ListItem>
              <Trans>
                Expect new features, improvements, and bugs (please report!).
              </Trans>
            </ListItem>
            <ListItem>
              <Trans>
                All content here is confidential. Leaking any information may
                result in removal from testing.
              </Trans>
            </ListItem>
          </UnorderedList>
          <Text fontSize="sm" color="Neutral.MediumGrey">
            <Trans>Thanks for helping improve Magic Garden! 💜</Trans>
          </Text>
        </McFlex>
      );
      setConfirmationDialog({
        title: t`⚠️ BETA WARNING ⚠️`,
        message,
        okText: <Trans>I UNDERSTAND</Trans>,
        okButtonColor: 'Red.Magic',
        isCentered: true,
        zIndex: 'CriticalErrorModalOverlay',
      });
    }
  }, [t]);
};
