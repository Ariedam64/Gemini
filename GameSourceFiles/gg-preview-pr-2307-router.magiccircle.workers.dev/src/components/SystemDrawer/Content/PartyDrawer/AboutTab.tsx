import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  IconButton,
  Link,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { Gift, Heart } from 'react-feather';
import { CookieName } from '@/common/cookies';
import { formatDate } from '@/common/utils';
import { useConfirmationDialog } from '@/components/ConfirmationDialog/useConfirmationDialog';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { handleDiscordExternalLink } from '@/discord-sdk/utils';
import {
  deploymentVersion,
  isRunningInsideDiscord,
  surface,
} from '@/environment';
import {
  jwtAtom,
  useCloseDrawer,
  useIsDeveloper,
  useSetIsOneTimeRewardsModalOpen,
} from '@/store/store';
import { useUser } from '@/user';
import { getCurrentRoomId, getRoomServerApiRoot } from '@/utils';

const DevHttpMe = () => {
  const jwtToken = useAtomValue(jwtAtom);
  const isDeveloper = useIsDeveloper();
  const showConfirmation = useConfirmationDialog();
  if (!isDeveloper || !isRunningInsideDiscord) {
    return null;
  }
  const authenticatedApiRoot = getRoomServerApiRoot() + '/me';
  const httpieCommand = `http get ${authenticatedApiRoot} Cookie:"${CookieName.mc_jwt}=${jwtToken}"`;
  return (
    <>
      <Text fontSize="sm" color="Neutral.LightGrey">
        [dev]
      </Text>
      <Button
        aria-label={t`Copy`}
        variant="ghost"
        color="Purple.Light"
        backgroundColor="black"
        size="xs"
        onClick={() => {
          showConfirmation({
            title: '[dev] authenticated http',
            message:
              'Run this command in your terminal to make authenticated requests to the API.',
            okText: 'close',
            content: (
              <Textarea
                color="white"
                autoFocus
                onFocus={(e) => e.target.select()}
                fontSize="xs"
                value={httpieCommand}
                isReadOnly
                width="100%"
              />
            ),
            onConfirm: () => {},
          });
        }}
      >
        http /me
      </Button>
    </>
  );
};

export const AboutTab = () => {
  const roomID = getCurrentRoomId();
  const setIsOneTimeRewardsModalOpen = useSetIsOneTimeRewardsModalOpen();
  const closeDrawer = useCloseDrawer();
  const { user } = useUser();
  if (!roomID) {
    return null;
  }
  return (
    <McFlex col px={4} pb={3} gap={3} orient="top" autoH>
      {/* Header Section */}
      <McFlex col orient="left" autoH gap={2}>
        <Text textAlign="left" fontSize="md" fontWeight="bold" color="white">
          <Trans>
            play every day... <br />
            party on the weekend!
          </Trans>
        </Text>
        <McFlex autoH orient="left" gap={2}>
          <Button
            size="xs"
            py={4}
            backgroundColor="Green.Dark"
            onClick={() => {
              closeDrawer();
              setIsOneTimeRewardsModalOpen(true);
            }}
            rightIcon={<Gift size={16} />}
          >
            <Trans>Follow us</Trans>
          </Button>
          <Button
            size="xs"
            py={4}
            backgroundColor="MagicBlack"
            onClick={() => {
              if (isRunningInsideDiscord) {
                void handleDiscordExternalLink(
                  'https://magiccircle.studio'
                ).catch(console.error);
              } else {
                window.open('https://magiccircle.studio', '_blank');
              }
            }}
            rightIcon={<ExternalLinkIcon />}
          >
            <Trans>Learn more</Trans>
          </Button>
        </McFlex>
      </McFlex>
      <Divider color="Neutral.DarkGrey" />
      <McGrid
        templateColumns="auto 1fr"
        columnGap={2}
        rowGap={1}
        alignItems="center"
      >
        {user && (
          <>
            <Text fontSize="sm" color="Neutral.LightGrey">
              <Trans>Joined:</Trans>
            </Text>
            <Text fontSize="sm" color="white" fontWeight="medium">
              {formatDate(user.createdAt)}
            </Text>
          </>
        )}
        {user && (
          <>
            <Text fontSize="sm" color="Neutral.LightGrey">
              <Trans>User ID:</Trans>
            </Text>
            <McFlex autoH orient="left" gap={1} minWidth={0}>
              <Text
                userSelect="text"
                data-testid="user-id"
                fontSize="sm"
                color="white"
                fontWeight="medium"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {user.id}
              </Text>
              {!isRunningInsideDiscord && (
                <IconButton
                  aria-label={t`Copy user ID`}
                  variant="ghost"
                  onClick={() => {
                    void navigator.clipboard.writeText(user.id);
                  }}
                  size="xs"
                  icon={<CopyIcon />}
                  color="Purple.Light"
                />
              )}
            </McFlex>
          </>
        )}
        <Text fontSize="sm" color="Neutral.LightGrey">
          <Trans>Room:</Trans>
        </Text>
        <McFlex autoH orient="left" gap={1} minWidth={0}>
          <Text
            userSelect="text"
            data-testid="room-id"
            fontSize={roomID.length >= 20 ? '11px' : 'sm'}
            color="white"
            fontWeight="medium"
            wordBreak="break-all"
            lineHeight="1.2"
          >
            {roomID}
          </Text>
          {!isRunningInsideDiscord && (
            <IconButton
              aria-label={t`Copy room ID`}
              variant="ghost"
              onClick={() => {
                void navigator.clipboard.writeText(roomID);
              }}
              size="xs"
              icon={<CopyIcon />}
              color="Purple.Light"
            />
          )}
        </McFlex>
        <Text fontSize="sm" color="Neutral.LightGrey">
          <Trans>Version:</Trans>
        </Text>
        <Text fontSize="sm" color="white" fontWeight="medium">
          {deploymentVersion}
        </Text>
        {surface === 'webview' && window.__MAGICCIRCLE_IOS_APP_VERSION__ && (
          <>
            <Text fontSize="sm" color="Neutral.LightGrey">
              <Trans>App Version:</Trans>
            </Text>
            <Text fontSize="sm" color="white" fontWeight="medium">
              {window.__MAGICCIRCLE_IOS_APP_VERSION__}
            </Text>
          </>
        )}
        <DevHttpMe />
      </McGrid>
      <McFlex col autoH gap={2}>
        <McFlex autoH gap={2}>
          <Text fontSize="sm" color="white">
            <Trans>Magic Circle loves you</Trans>
          </Text>
          <Heart fill="violet" size={16} />
        </McFlex>
        <McFlex autoH gap={3}>
          <Link
            href="/docs/terms"
            target="_blank"
            fontSize="xs"
            color="Neutral.LightGrey"
            onClick={() => {
              void handleDiscordExternalLink(
                'https://magiccircle.gg/docs/terms'
              ).catch(console.error);
            }}
          >
            <Trans>Terms</Trans>
          </Link>
          <Link
            href="/docs/privacy"
            target="_blank"
            fontSize="xs"
            color="Neutral.LightGrey"
            onClick={() => {
              void handleDiscordExternalLink(
                'https://magiccircle.gg/docs/privacy'
              ).catch(console.error);
            }}
          >
            <Trans>Privacy</Trans>
          </Link>
        </McFlex>
      </McFlex>
    </McFlex>
  );
};
