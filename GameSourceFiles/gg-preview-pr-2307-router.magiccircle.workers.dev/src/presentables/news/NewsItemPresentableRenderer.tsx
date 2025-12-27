import { Center, Text } from '@chakra-ui/layout';
import { Button, Image } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useEffect } from 'react';
import discordLogo from '@/assets/discord-logo.png';
import HuzzahBurst from '@/assets/HuzzahBurst.png';
import { MagicCircleDiscordServerForumInviteUrl } from '@/common/constants';
import { NewsItemId } from '@/common/news-items';
import McFlex from '@/components/McFlex/McFlex';
import { MotionImage } from '@/components/Motion';
import { handleDiscordExternalLink } from '@/discord-sdk/utils';
import { isRunningInsideDiscord } from '@/environment';
import { post } from '@/utils';
import { useDismissCurrentPresentable } from '..';
import PresentableCloseButton from '../PresentableCloseButton';
import { newsItems } from './news-items';

interface NewsItemPresentableRendererProps {
  newsItemId: NewsItemId;
}

async function markAsRead(newsItemId: NewsItemId) {
  await post(`/me/news/${newsItemId}/read`);
}

export const NewsItemPresentableRenderer: React.FC<
  NewsItemPresentableRendererProps
> = ({ newsItemId }) => {
  const dismissPresentable = useDismissCurrentPresentable();

  useEffect(() => {
    void markAsRead(newsItemId).catch(console.warn);
  }, [newsItemId]);

  function dismissButtonClicked() {
    dismissPresentable();
    void markAsRead(newsItemId).catch(console.warn);
  }
  const newsItem = newsItems.find((item) => item.id === newsItemId);

  if (!newsItem) {
    console.warn(
      `NewsItemPresentableRenderer: News item not found for id: ${newsItemId}`
    );
    return null;
  }
  const isComponent = newsItem.kind === 'component';
  return (
    <McFlex col width="55vh" maxWidth="100vw" position="relative">
      <Center position="absolute" width="125%">
        <MotionImage
          src={HuzzahBurst}
          alt="Huzzah!"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          position="absolute"
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
            scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      </Center>
      <Center flexDirection="column" position="absolute">
        <PresentableCloseButton top="0" right="10px" />
        {isComponent ? (
          newsItem.component
        ) : (
          <>
            <Text
              fontSize="lg"
              textShadow="0px 0px 10px #000"
              fontWeight="bold"
              textAlign="center"
            >
              {newsItem.title}
            </Text>
            <MotionImage src={newsItem.imageSrc} alt={newsItem.title} />
          </>
        )}
        <McFlex auto gap="10px">
          <Button
            onClick={() => {
              const link =
                newsItem.id === NewsItemId.Rainbowpocalypse
                  ? 'https://discord.com/channels/808935495543160852/813128256291078184/1403110331672428544'
                  : newsItem.id === NewsItemId.Halloween2025
                    ? 'https://discord.com/channels/808935495543160852/813128256291078184'
                    : MagicCircleDiscordServerForumInviteUrl;
              if (isRunningInsideDiscord) {
                void handleDiscordExternalLink(link).catch(console.error);
              } else {
                window.open(link, '_blank');
              }
            }}
            mt={4}
            variant="outline"
            size={{ base: 'sm', md: 'md' }}
          >
            <Image src={discordLogo} height="20px" mr="8px" />
            <Trans>Learn more</Trans>
          </Button>
          <Button
            variant="outline"
            onClick={dismissButtonClicked}
            backgroundColor={
              isComponent ? 'Purple.Magic' : newsItem.buttonColor
            }
            borderColor="transparent"
            mt={4}
            size={{ base: 'sm', md: 'md' }}
          >
            <Trans>Got it</Trans>
          </Button>
        </McFlex>
      </Center>
    </McFlex>
  );
};
