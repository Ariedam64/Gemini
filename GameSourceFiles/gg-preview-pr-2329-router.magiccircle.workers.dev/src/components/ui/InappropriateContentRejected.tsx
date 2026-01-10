import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useAtomValue, useSetAtom } from 'jotai';
import { posthog } from 'posthog-js';
import { useRef } from 'react';
import McFlex from '@/components/McFlex/McFlex';
import { inappropriateContentAtom } from '@/store/store';
import { useMagicToast } from './MagicToast';
/**
 * A dialog component that displays when inappropriate content is detected.
 * It provides information about the inappropriate content and options to report or acknowledge.
 */
export function InappropriateContentRejectedDialog() {
  const inappropriateContent = useAtomValue(inappropriateContentAtom);
  const setInappropriateContent = useSetAtom(inappropriateContentAtom);
  const clearRef = useRef(null);
  const { sendToast } = useMagicToast();
  const { t } = useLingui();

  const handleClearContent = () => {
    setInappropriateContent(undefined);
    sendToast({
      title: t`Thanks <3`,
      description: t`We appreciate you keeping the game safe for everyone.`,
    });
  };

  /**
   * Handles the reporting of incorrectly flagged content.
   * Fires a PostHog event to track this user action.
   */
  const handleReportIssue = () => {
    posthog.capture('UI_ReportFlaggedContent', {
      content: inappropriateContent?.content,
      reason: inappropriateContent?.reason,
    });
    sendToast({
      title: t`Report sent`,
      description: t`We have received your report and will review it shortly.`,
    });
    setInappropriateContent(undefined);
  };

  return (
    <AlertDialog
      variant="Dialog"
      isOpen={inappropriateContent !== undefined}
      onClose={() => void 0}
      leastDestructiveRef={clearRef}
      lockFocusAcrossFrames={false}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Trans>Hey, that's not OK</Trans>
        </AlertDialogHeader>
        <AlertDialogBody>
          <p>
            <strong>"{inappropriateContent?.content}"</strong>{' '}
            <Trans>is not appropriate for this game.</Trans>
          </p>

          <p style={{ marginTop: '1rem' }}>
            <Trans>Please follow our rules:</Trans>
          </p>

          <ul
            style={{
              paddingLeft: '10px',
              listStyleType: 'none',
              marginTop: '1rem',
            }}
          >
            <li>
              <Trans>👍 Don't be mean to other players</Trans>
            </li>
            <li>
              <Trans>😎 Keep it PG-13</Trans>
            </li>
            <li>
              <Trans>🔒 Don't request or share personal info</Trans>
            </li>
          </ul>

          <p style={{ marginTop: '1rem' }}>
            <Trans>
              If you believe what you wrote was incorrectly flagged as
              inappropriate, you can report an issue.
            </Trans>
          </p>

          <McFlex justifyContent="right" gap={2} mt={3} width="auto">
            <Button
              backgroundColor="Neutral.DarkGrey"
              onClick={handleReportIssue}
            >
              <Trans>Report Issue</Trans>
            </Button>
            <Button
              ref={clearRef}
              onClick={handleClearContent}
              backgroundColor="Blue.Magic"
            >
              <Trans>K, I'll be nice</Trans>
            </Button>
          </McFlex>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
}
