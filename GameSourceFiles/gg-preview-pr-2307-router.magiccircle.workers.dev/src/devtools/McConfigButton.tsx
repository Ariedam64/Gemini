import { Button, type ButtonProps, Icon, Text } from '@chakra-ui/react';
import { Pause } from 'react-feather';
import McFlex from '@/components/McFlex/McFlex';
import { handleDiscordExternalLink } from '@/discord-sdk/utils';
import { environment, isRunningInsideDiscord } from '@/environment';
import { useTimer } from '@/room/hooks';
import { getCurrentRoomId } from '@/utils';

const McConfigButton = (props: ButtonProps) => {
  const timer = useTimer();

  return (
    <Button
      onClick={() => {
        const linkToThisRoom = `${window.location.origin}/r/${getCurrentRoomId()}`;
        const configUrl = new URL('https://config.magiccircle.dev');
        configUrl.searchParams.set('u', linkToThisRoom);
        if (isRunningInsideDiscord) {
          void handleDiscordExternalLink(configUrl.toString()).catch(
            console.error
          );
        } else {
          window.open(configUrl);
        }
      }}
      size="xs"
      textTransform="none"
      backgroundColor={
        timer.isPaused
          ? 'Red.Magic'
          : environment === 'Production'
            ? 'Neutral.DarkGrey'
            : environment === 'Preview'
              ? 'Orange.Dark'
              : environment === 'Local'
                ? 'Purple.Indigo'
                : 'Gray.Magic'
      }
      minW="100px"
      h="36px"
      gap={0.5}
      {...props}
    >
      <McFlex col gap={0}>
        <Text fontWeight="bold" fontSize="14px" fontFamily="monospace">
          {environment}
        </Text>
        {timer.isPaused && (
          <McFlex gap={0.5}>
            <Icon as={Pause} fill="white" boxSize={3} />
            <Text fontWeight="extrabold" fontSize="2xs">
              Paused
            </Text>
          </McFlex>
        )}
      </McFlex>
    </Button>
  );
};

export default McConfigButton;
