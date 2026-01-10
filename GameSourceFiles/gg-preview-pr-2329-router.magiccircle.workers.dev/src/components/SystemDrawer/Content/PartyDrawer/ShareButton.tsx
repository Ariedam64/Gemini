import { Button, ButtonProps } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { Share } from 'react-feather';

type ShareData = {
  title?: string;
  text?: string;
  url: string;
};

interface ShareButtonProps extends ButtonProps {
  shareData: ShareData;
}

const ShareButton: React.FC<ShareButtonProps> = ({ shareData, ...props }) => {
  const { t } = useLingui();

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing content', error);
      }
    } else {
      alert(t`Web Share API not supported in this browser`);
    }
  };

  return (
    <Button
      leftIcon={<Share strokeWidth="2.5px" />}
      onClick={() => void share()}
      {...props}
    >
      <Trans>Share</Trans>
    </Button>
  );
};

export default ShareButton;
