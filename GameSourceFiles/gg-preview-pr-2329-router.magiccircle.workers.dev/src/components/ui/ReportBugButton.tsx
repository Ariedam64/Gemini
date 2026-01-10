import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { Zap } from 'react-feather';
import { MagicCircleDiscordServerForumInviteUrl } from '@/common/constants';
import { handleDiscordExternalLink } from '@/discord-sdk/utils';
import { isRunningInsideDiscord } from '@/environment';

const ReportBugButton: React.FC = () => {
  return (
    <Button
      size="xs"
      width="auto"
      height="32px"
      leftIcon={<Zap size={20} />}
      backgroundColor="Neutral.Black"
      onClick={() => {
        if (isRunningInsideDiscord) {
          void handleDiscordExternalLink(
            MagicCircleDiscordServerForumInviteUrl
          ).catch(console.warn);
        } else {
          window.open(MagicCircleDiscordServerForumInviteUrl, '_blank');
        }
      }}
    >
      <Trans>Report Bug</Trans>
    </Button>
  );
};

export default ReportBugButton;
