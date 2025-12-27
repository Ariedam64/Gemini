import { Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useMemo } from 'react';
import { AuthenticationOptions } from '@/components/ui/authentication/AuthenticationOptions';
import { isDesktopMode, isNonIOSMobile, surface } from '@/environment';
import McFlex from '../McFlex/McFlex';

interface PlatformGuidanceMessageProps {
  hasNoPurchasables: boolean;
}

export const PlatformGuidanceMessage = ({
  hasNoPurchasables = true,
}: PlatformGuidanceMessageProps) => {
  // If no purchasables exist on discord or webview, that is intentional (i.e., preview or local development)
  const noPurchasablesExists =
    ['discord', 'webview'].includes(surface) && hasNoPurchasables;

  const message = useMemo(() => {
    if (noPurchasablesExists) {
      return <Trans>No purchase options are available.</Trans>;
    }
    if (['discord', 'web'].includes(surface) && isNonIOSMobile)
      return <Trans>Purchase donuts on Discord (desktop/laptop only).</Trans>;
    else if (surface === 'webview') {
      return <Trans>Sign in to purchase donuts.</Trans>;
    }
    return (
      <Trans>
        Purchase donuts on Discord (desktop/laptop only) or the iOS app.
      </Trans>
    );
  }, [surface]);

  return (
    <McFlex col gap={3}>
      {!noPurchasablesExists && (
        <AuthenticationOptions
          showOpenInDiscordButton={isDesktopMode}
          showSignInWithDiscordButton={isDesktopMode}
          showSignInAndOutButton={surface === 'webview'}
        />
      )}
      <Text
        fontSize="sm"
        textAlign="center"
        maxW="300px"
        fontWeight="bold"
        color="MagicWhite"
      >
        {message}
      </Text>
    </McFlex>
  );
};
