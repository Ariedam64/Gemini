import { Button, ButtonProps, Image } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import discordLogo from '@/assets/discord-logo.png';
import { redirectToDiscordLogin } from '@/auth/discord/surfaces/web';
import { DiscordClientId } from '@/environment';
import { BlurpleButton } from './BlurpleButton';

export interface SignInWithDiscordButtonProps extends ButtonProps {
  onBeforeRedirect?: () => void;
}

export const SignInWithDiscordButton: React.FC<
  SignInWithDiscordButtonProps
> = ({ onBeforeRedirect, ...props }) => {
  return (
    <BlurpleButton
      onClick={() => {
        onBeforeRedirect?.();
        redirectToDiscordLogin();
      }}
      borderRadius="14px"
      {...props}
    >
      <Image
        src={discordLogo}
        height={props.size === 'lg' ? '20px' : '12px'}
        mr={props.size === 'lg' ? '8px' : '4px'}
      />
      {props.children || <Trans>Sign in with Discord</Trans>}
    </BlurpleButton>
  );
};

export const OpenInDiscordButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      as="a"
      href={`https://discord.com/activities/${DiscordClientId}`}
      target="_blank"
      rel="noopener noreferrer"
      bg="#5865F2"
      leftIcon={<Image src={discordLogo} height="20px" />}
      borderRadius="14px"
      textTransform="none"
      fontWeight="semibold"
      {...props}
    >
      <Trans>Open in Discord</Trans>
    </Button>
  );
};
