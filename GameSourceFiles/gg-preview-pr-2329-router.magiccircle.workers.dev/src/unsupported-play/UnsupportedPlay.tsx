import { Flex, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useEffect } from 'react';
import McFlex from '@/components/McFlex/McFlex';
import ReportBugButton from '@/components/ui/ReportBugButton';
import { getIOSVersion } from '../utils/getIOSVersion';
import type { UnsupportedReason } from './hooks';
import UnsupportedPlayContent from './UnsupportedPlayContent';

const MIN_IOS_MAJOR_VERSION = 16;
const MIN_IOS_MINOR_VERSION = 4;

interface UnsupportedPlayProps {
  reason: UnsupportedReason;
}

const UnsupportedPlay: React.FC<UnsupportedPlayProps> = ({ reason }) => {
  const iosVersion = getIOSVersion();
  const isOldIOS =
    iosVersion !== null &&
    (iosVersion[0] < MIN_IOS_MAJOR_VERSION ||
      (iosVersion[0] === MIN_IOS_MAJOR_VERSION &&
        iosVersion[1] < MIN_IOS_MINOR_VERSION));
  // Check for iOS 18.7.2 specifically (pre-release version with WebGL bug)
  const isIOS18_7_2 =
    iosVersion !== null &&
    iosVersion[0] === 18 &&
    iosVersion[1] === 7 &&
    iosVersion[2] === 2;

  const isBuggyIOSPrerelease = reason === 'webgl' && isIOS18_7_2;

  useEffect(() => {
    // Inform the Rive loading spinner in index.html that the app has loaded
    window.onAppContentLoaded();
  }, []);

  const renderContent = () => {
    if (isBuggyIOSPrerelease) {
      return (
        <UnsupportedPlayContent
          heading={<Trans>Update iOS to play</Trans>}
          externalLink={{
            href: 'https://support.apple.com/en-us/118575',
            label: <Trans>Learn how</Trans>,
          }}
        >
          <Text fontSize="md" lineHeight={1.3} color="Neutral.Grey" mb={3}>
            <Trans>
              Your device is running iOS <strong>18.7.2</strong>, a beta version
              of iOS that is unable to play most web-based games.
            </Trans>
          </Text>
          <Text fontSize="md" lineHeight={1.3} color="Neutral.Grey">
            <Trans>
              Please update to the latest version of iOS (26+) to play.
            </Trans>
          </Text>
        </UnsupportedPlayContent>
      );
    }
    if (isOldIOS) {
      return (
        <UnsupportedPlayContent
          heading={
            <Trans>
              Update to iOS {MIN_IOS_MAJOR_VERSION}.{MIN_IOS_MINOR_VERSION}+ to
              play
            </Trans>
          }
        >
          <Text fontSize="md" lineHeight={1.5} color="Neutral.Grey">
            <Trans>
              Looks like you're on version:{' '}
              <strong>
                {iosVersion[0]}.{iosVersion[1]}
              </strong>
            </Trans>
          </Text>
        </UnsupportedPlayContent>
      );
    }
    if (reason === 'webgl') {
      return (
        <UnsupportedPlayContent
          heading={<Trans>Enable graphics acceleration to play</Trans>}
          externalLink={{
            href: 'https://get.webgl.org/',
            label: <Trans>Learn how</Trans>,
          }}
        >
          <Text fontSize="md" lineHeight={1.5} color="Neutral.Grey">
            <Trans>WebGL is not available or is disabled.</Trans>
          </Text>
        </UnsupportedPlayContent>
      );
    }
    if (reason === 'hardware_acceleration') {
      return (
        <UnsupportedPlayContent
          heading={<Trans>Enable hardware acceleration to play</Trans>}
          externalLink={{
            href: 'https://i.imgur.com/7G2zBkv.png',
            label: <Trans>Show me how</Trans>,
          }}
        >
          <Text fontSize="md" lineHeight={1.5} color="Neutral.Grey">
            <Trans>
              Please enable it in{' '}
              <strong>
                Discord Settings → Advanced → Hardware Acceleration
              </strong>
              .
            </Trans>
          </Text>
        </UnsupportedPlayContent>
      );
    }
    // Default: webp unsupported
    return (
      <UnsupportedPlayContent
        heading={<Trans>Unsupported Browser or OS</Trans>}
      >
        <Text fontSize="md" lineHeight={1.5} color="Neutral.Grey">
          <Trans>(Reason: WebP images unsupported)</Trans>
        </Text>
      </UnsupportedPlayContent>
    );
  };
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minH="100dvh"
      w="100vw"
      bg="MagicBlack"
      color="white"
      fontFamily="body"
      px={5}
      textAlign="center"
    >
      {renderContent()}
      <McFlex maxW={450} w="100%" justify="center" gap={2} col mt={8}>
        <Text fontSize="md" lineHeight={1.5} color="Neutral.Grey">
          <Trans>Think you're seeing this by mistake?</Trans>
        </Text>
        <ReportBugButton />
      </McFlex>
    </Flex>
  );
};

export default UnsupportedPlay;
