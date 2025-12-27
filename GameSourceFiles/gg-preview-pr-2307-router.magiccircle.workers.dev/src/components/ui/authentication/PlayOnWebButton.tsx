import { Button, type ButtonProps } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { MagicCircleWebUrl } from '@/common/constants';
import { handleDiscordExternalLink } from '@/discord-sdk/utils';
import { isRunningInsideDiscord } from '@/environment';

interface PlayOnWebButtonProps extends ButtonProps {}

const PlayOnWebButton: React.FC<PlayOnWebButtonProps> = (props) => {
  const onClick = () => {
    if (isRunningInsideDiscord) {
      void handleDiscordExternalLink(MagicCircleWebUrl).catch(console.error);
    } else {
      window.open(MagicCircleWebUrl, '_blank');
    }
  };

  return (
    <Button
      h="50px"
      w="180px"
      bg="Blue.Magic"
      onClick={onClick}
      textTransform="none"
      flexDirection="column"
      fontWeight="semibold"
      borderRadius="14px"
      {...props}
    >
      <Trans>Play on web</Trans>
    </Button>
  );
};

export default PlayOnWebButton;
