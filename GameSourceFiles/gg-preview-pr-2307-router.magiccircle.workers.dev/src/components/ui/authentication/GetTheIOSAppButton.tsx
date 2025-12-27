import { Button, type ButtonProps, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { posthog } from 'posthog-js';
import { MagicCircleAppStoreUrl } from '@/common/constants';
import { handleDiscordExternalLink } from '@/discord-sdk/utils';
import { isRunningInsideDiscord } from '@/environment';

export interface GetIOSButtonProps extends ButtonProps {
  onBeforeRedirect?: () => void;
}

export const GetIOSButton: React.FC<GetIOSButtonProps> = ({
  onBeforeRedirect,
  ...props
}) => {
  const onClick = () => {
    onBeforeRedirect?.();
    posthog.capture('UI_Click_GetIOSApp');
    if (isRunningInsideDiscord) {
      void handleDiscordExternalLink(MagicCircleAppStoreUrl).catch(
        console.error
      );
    } else {
      window.open(MagicCircleAppStoreUrl, '_blank');
    }
  };

  return (
    <Button
      bg="Purple.Magic"
      onClick={onClick}
      textTransform="none"
      flexDirection="column"
      fontWeight="semibold"
      borderRadius="14px"
      {...props}
    >
      <Trans>Get the iOS app</Trans>
      <Text fontSize="2xs">
        <Trans>Exclusive seeds & more!</Trans>
      </Text>
    </Button>
  );
};
