import { useAtomValue } from 'jotai';
import { posthog } from 'posthog-js';
import McFlex, { type McFlexProps } from '@/components/McFlex/McFlex';
import {
  OpenInDiscordButton,
  SignInWithDiscordButton,
} from '@/components/ui/authentication/DiscordButtons';
import { GetIOSButton } from '@/components/ui/authentication/GetTheIOSAppButton';
import { SignInAndOutButton } from '@/components/ui/authentication/SignInAndLogOutButton';
import { useConfig } from '@/config';
import { isNonIOSMobile, surface } from '@/environment';
import { isUserAuthenticatedAtom } from '@/store/store';
import PlayAsGuestButton from './PlayAsGuestButton';
import PlayOnWebButton from './PlayOnWebButton';

interface AuthenticationOptions extends McFlexProps {
  onClickPlayAsGuest?: () => void;
  showPlayAsGuestButton?: boolean;
  showOpenInDiscordButton?: boolean;
  showSignInWithDiscordButton?: boolean;
  showSignInAndOutButton?: boolean;
  showPlayOnWebButton?: boolean;
}

/**
 * Renders appropriate authentication options based on the user's surface (web/webview/discord),
 * device type (iOS/mobile/desktop), and authentication state.
 */
export const AuthenticationOptions: React.FC<AuthenticationOptions> = ({
  onClickPlayAsGuest,
  showSignInAndOutButton = true,
  showPlayAsGuestButton = false,
  showOpenInDiscordButton = false,
  showSignInWithDiscordButton = true,
  showPlayOnWebButton = false,
  ...props
}) => {
  const isAuthenticated = useAtomValue(isUserAuthenticatedAtom);
  const shouldShowiOSAppUpsell = useConfig().root_shouldShowiOSAppUpsell;

  function onClickGuestPlay() {
    posthog.capture('UI_CoverSheet_Click_PlayAsGuest');
    onClickPlayAsGuest?.();
  }
  function onBeforeDiscordRedirect() {
    posthog.capture('UI_CoverSheet_Click_DiscordSignIn');
  }
  function onBeforeIOSRedirect() {
    posthog.capture('UI_CoverSheet_Click_GetIOSApp');
  }
  if (surface === 'webview') {
    const hasAnyOptions =
      showSignInAndOutButton || showPlayOnWebButton || showPlayAsGuestButton;

    if (!hasAnyOptions) {
      return null;
    }
    return (
      <McFlex gap={2} {...props} col>
        {showSignInAndOutButton && <SignInAndOutButton h="50px" w="210px" />}
        {showPlayOnWebButton && <PlayOnWebButton h="50px" w="245px" />}
        {showPlayAsGuestButton && (
          <PlayAsGuestButton onClick={onClickGuestPlay} />
        )}
      </McFlex>
    );
  }
  if (isAuthenticated && !showOpenInDiscordButton) {
    const showGetIOS = !isNonIOSMobile && shouldShowiOSAppUpsell;
    const hasAnyOptions =
      showGetIOS || showPlayOnWebButton || showSignInAndOutButton;

    if (!hasAnyOptions) {
      return null;
    }
    return (
      <McFlex gap={2} {...props} col>
        {showGetIOS && <GetIOSButton h="50px" w="245px" />}
        {showPlayOnWebButton && <PlayOnWebButton h="50px" w="245px" />}
        {showSignInAndOutButton && <SignInAndOutButton h="40px" w="180px" />}
      </McFlex>
    );
  }
  const showDiscordOption =
    surface !== 'discord' &&
    (showOpenInDiscordButton || showSignInWithDiscordButton);
  const showGetIOS = !isNonIOSMobile && shouldShowiOSAppUpsell;
  const hasAnyOptions =
    showDiscordOption ||
    showGetIOS ||
    showPlayOnWebButton ||
    showPlayAsGuestButton;

  if (!hasAnyOptions) {
    return null;
  }
  return (
    <McFlex gap={2} {...props} col>
      {surface !== 'discord' &&
        (showOpenInDiscordButton ? (
          <OpenInDiscordButton h="50px" w="245px" />
        ) : showSignInWithDiscordButton ? (
          <SignInWithDiscordButton
            h="50px"
            w="245px"
            onBeforeRedirect={onBeforeDiscordRedirect}
            textTransform="none"
            fontWeight="semibold"
            size="lg"
          />
        ) : null)}
      {showGetIOS && (
        <GetIOSButton
          h="50px"
          w="245px"
          onBeforeRedirect={onBeforeIOSRedirect}
        />
      )}
      {showPlayOnWebButton && <PlayOnWebButton h="50px" w="245px" />}
      {showPlayAsGuestButton && (
        <PlayAsGuestButton onClick={onClickGuestPlay} />
      )}
    </McFlex>
  );
};
