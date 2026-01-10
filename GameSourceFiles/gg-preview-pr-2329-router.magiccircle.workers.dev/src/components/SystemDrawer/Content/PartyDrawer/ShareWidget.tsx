import { Text } from '@chakra-ui/layout';
import { Button, useClipboard } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { truncate } from 'lodash';
import { useState } from 'react';
import McFlex from '@/components/McFlex/McFlex';
import QRCode from '@/components/SystemDrawer/Content/PartyDrawer/QRCode';
import ShareButton from '@/components/SystemDrawer/Content/PartyDrawer/ShareButton';
import { getCurrentRoomId, getShareUrl } from '@/utils';

const ShareWidget: React.FC = () => {
  const roomId = getCurrentRoomId();
  const qrUrl = getShareUrl('qr');
  const shareSheetUrl = getShareUrl('sharesheet');
  const copyToShareUrl = getShareUrl('copy');
  const { onCopy } = useClipboard(copyToShareUrl);
  const [isCopied, setIsCopied] = useState(false);

  if (!roomId) return null;

  return (
    <McFlex borderRadius={12} orient="left" bg="Neutral.TrueWhite" p={3}>
      <QRCode value={qrUrl} size="100%" />
      <McFlex col gap={2}>
        <McFlex col px={2}>
          <Text color="MagicBlack" size="xs" fontWeight="bold">
            <Trans>Room Code</Trans>
          </Text>
          <Text
            color="MagicBlack"
            fontSize="xl"
            fontWeight="extrabold"
            letterSpacing={4}
            my={-2}
          >
            {truncate(roomId, { length: 7, omission: '..' })}
          </Text>
        </McFlex>
        <ShareButton
          backgroundColor="Purple.Light"
          shareData={{
            url: shareSheetUrl,
          }}
          size="sm"
        />
        <Button
          aria-label={t`Copy`}
          backgroundColor={isCopied ? 'Green.Magic' : 'Neutral.DarkGrey'}
          onClick={() => {
            onCopy();
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }}
          size="sm"
        >
          {isCopied ? <Trans>Copied!</Trans> : <Trans>Copy</Trans>}
        </Button>
      </McFlex>
    </McFlex>
  );
};

export default ShareWidget;
