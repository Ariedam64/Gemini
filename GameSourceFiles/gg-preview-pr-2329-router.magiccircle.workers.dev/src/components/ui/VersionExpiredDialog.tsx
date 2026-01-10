import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Link,
} from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useEffect, useRef, useState } from 'react';
import McFlex from '@/components/McFlex/McFlex';
import { closeDiscordActivity } from '@/discord-sdk/utils';
import { isRunningInsideDiscord, surface } from '@/environment';
import GlowingButton from './GlowingButton';

/**
 * VersionExpiredDialog
 * ------------------------------------
 * A friendly, blue-themed modal that informs the player that their current
 * client version is outdated. It displays a single call-to-action prompting the
 * user to refresh and continue playing.
 *
 * Unlike `CriticalAlertDialog`, this dialog purposefully omits any "bug
 * reporting" helpers and uses a calmer colour palette.
 */
export interface VersionExpiredDialogProps {
  /** Whether the dialog is visible */
  isOpen: boolean;
}

const DISCORD_ACTIVITY_AUTO_CLOSE_SECONDS = 120;

export function VersionExpiredDialog({ isOpen }: VersionExpiredDialogProps) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const [
    secondsUntilDiscordActivityAutoClose,
    setSecondsUntilDiscordActivityAutoClose,
  ] = useState(DISCORD_ACTIVITY_AUTO_CLOSE_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isOpen && isRunningInsideDiscord) {
      intervalRef.current = setInterval(() => {
        setSecondsUntilDiscordActivityAutoClose((prev) => {
          if (prev <= 1) {
            closeDiscordActivity('VersionExpiredDialog auto-closed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOpen]);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      // Disable lockFocusAcrossFrames because it was breaking right-click menus
      // in the Discord App
      lockFocusAcrossFrames={false}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      // We don’t provide an onClose – the dialog should remain until the user
      // chooses to refresh.
      onClose={() => void 0}
      variant="CriticalError"
    >
      <AlertDialogOverlay backgroundColor="ScrimDarker" />

      <AlertDialogContent
        maxWidth="500px"
        bg="Blue.Dark"
        border="2px solid"
        borderColor="Blue.Light"
        color="white"
        borderRadius="card"
        alignItems="center"
        pb={6}
      >
        <AlertDialogHeader pt="2" fontSize="lg" fontWeight="bold">
          <Trans>✨ Game update available! ✨</Trans>
        </AlertDialogHeader>

        <AlertDialogBody fontSize="md" textAlign="center" maxWidth="300px">
          {isRunningInsideDiscord ? (
            <Trans>
              Please <strong>close and re-open</strong> the activity to keep
              playing
            </Trans>
          ) : surface === 'webview' ? (
            <Trans>Tap the button below to load the latest version.</Trans>
          ) : (
            <Trans>Press the button below or refresh the page to update.</Trans>
          )}
        </AlertDialogBody>
        <McFlex mt={4}>
          <GlowingButton
            bg="white"
            color="black"
            progress={
              isRunningInsideDiscord
                ? 1 -
                  secondsUntilDiscordActivityAutoClose /
                    DISCORD_ACTIVITY_AUTO_CLOSE_SECONDS
                : 0
            }
            progressColor="Yellow.Dark"
            onClick={() => {
              if (isRunningInsideDiscord) {
                closeDiscordActivity('User accepted version update');
              } else {
                window.location.reload();
              }
            }}
          >
            {isRunningInsideDiscord ? (
              <Trans>Restart to play</Trans>
            ) : (
              <>
                {surface === 'webview' ? (
                  <Trans>Continue</Trans>
                ) : (
                  <Trans>Continue</Trans>
                )}
              </>
            )}
          </GlowingButton>
        </McFlex>
        {isRunningInsideDiscord && (
          <McFlex mt={3} fontSize="sm">
            <Trans>
              auto-close in{' '}
              <strong style={{ padding: '0 4px' }}>
                {secondsUntilDiscordActivityAutoClose}
              </strong>{' '}
              second{secondsUntilDiscordActivityAutoClose === 1 ? '' : 's'}
            </Trans>
          </McFlex>
        )}

        <McFlex gap={1} mt={2}>
          <Link
            href="https://discord.com/channels/808935495543160852/1393308739272052796"
            isExternal
            fontWeight="bold"
            // color="Blue.Lightest"
          >
            <Trans>Changelog</Trans>
          </Link>
          <ExternalLinkIcon />
        </McFlex>
      </AlertDialogContent>
    </AlertDialog>
  );
}
