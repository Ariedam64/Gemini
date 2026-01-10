import { Button } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import WebSocketCloseCode from '@/common/WebSocketCloseCode';
import McFlex, { type McFlexProps } from '@/components/McFlex/McFlex';
import PlayerCard from '@/components/ui/PlayerCard';
import { useRoomConnection } from '@/connection/hooks';
import { isHeadlessBrowser, isRunningInsideDiscord } from '@/environment';
import { useSendRoomMessage } from '@/hooks';
import {
  useHostPlayerId,
  useIsModeratorOrDeveloper,
  useOpenDrawer,
  usePlayerId,
  usePlayersMeFirst,
} from '@/store/store';

function KickButton({ targetPlayerId }: { targetPlayerId: string }) {
  const sendRoomMessage = useSendRoomMessage();

  return (
    <Button
      marginLeft="auto"
      onClick={() => {
        sendRoomMessage({ type: 'KickPlayer', targetPlayerId });
      }}
      size="sm"
      bg="Red.Magic"
    >
      <Trans>Kick</Trans>
    </Button>
  );
}

function LeaveButton() {
  const roomConnection = useRoomConnection();

  return (
    <Button
      marginLeft="auto"
      onClick={() => {
        roomConnection.disconnect(WebSocketCloseCode.PlayerLeftVoluntarily);
        window.location.href = '/';
      }}
      size="sm"
      bg="Neutral.DarkGrey"
    >
      <Trans>Leave</Trans>
    </Button>
  );
}

type PlayerDrawerProps = McFlexProps;

const PlayersDrawer: React.FC<PlayerDrawerProps> = ({ ...rest }) => {
  const players = usePlayersMeFirst();
  const myPlayerId = usePlayerId();
  const numPlayers = players.length;
  const openDrawer = useOpenDrawer();
  const hostPlayerId = useHostPlayerId();
  const amIModOrDev = useIsModeratorOrDeveloper();
  const amIHost = myPlayerId === hostPlayerId;
  const { t } = useLingui();
  return (
    <McFlex col orient="top" {...rest}>
      <McFlex col py={10} justify="top" gap="10px">
        {players.map((player) => {
          const isMe = player.id === myPlayerId;
          const isHost = player.id === hostPlayerId;
          return (
            <PlayerCard
              overflow="visible"
              key={player.id}
              playerOrId={player}
              isConnected={player.isConnected}
              showConnectionStatusIndicator
              textSize="md"
              caption={isHost ? t`Host` : undefined}
              onClick={() => {
                if (isMe) {
                  openDrawer('profile');
                }
              }}
            >
              {/* On web, only show the leave button if there's more than one player */}
              {/* On Discord, never show the leave button */}
              {/* Only show the leave button for the player themselves, and only if there's more than one player */}
              {isMe && numPlayers > 1 && !isRunningInsideDiscord && (
                <LeaveButton />
              )}

              {/* On web, always show the kick button */}
              {/* On Discord, show the kick button if moderator */}
              {/* On Discord, show the host the kick button for AFK players */}
              {/* Never show the kick button for the player themselves */}
              {!isMe &&
                (isHeadlessBrowser ||
                  amIModOrDev ||
                  (amIHost && !player.isConnected)) && (
                  <KickButton targetPlayerId={player.id} />
                )}
            </PlayerCard>
          );
        })}
      </McFlex>
    </McFlex>
  );
};

export default PlayersDrawer;
