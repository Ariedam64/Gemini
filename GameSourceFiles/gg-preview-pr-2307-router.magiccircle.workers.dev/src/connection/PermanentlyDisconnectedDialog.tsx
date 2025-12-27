import { Button } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import WebSocketCloseCode, {
  type PermanentlyDisconnectedCloseCode,
} from '@/common/WebSocketCloseCode';
import McFlex from '@/components/McFlex/McFlex';
import { CriticalAlertDialog } from '@/components/ui/CriticalAlertDialog';
import { VersionExpiredDialog } from '@/components/ui/VersionExpiredDialog';
import { closeDiscordActivity } from '@/discord-sdk/utils';
import { isRunningInsideDiscord } from '@/environment';
import { authenticationFailureAtom } from '@/store/store';
import { useRoomConnection } from './hooks';

export function PermanentlyDisconnectedDialog() {
  const roomConnection = useRoomConnection();
  const [reason, setReason] = useState<null | PermanentlyDisconnectedCloseCode>(
    null
  );
  const { t } = useLingui();
  const setAuthenticationFailure = useSetAtom(authenticationFailureAtom);

  useEffect(() => {
    roomConnection.onPermanentlyDisconnected = (r) => {
      setReason(r);
      if (r === WebSocketCloseCode.AuthenticationFailure) {
        setAuthenticationFailure(r);
      }
    };
  }, [roomConnection]);

  let title = isRunningInsideDiscord ? t`Restart to play` : t`Refresh to play`;
  let alertMessage: string | null = null;
  let showBugInfo = true;

  switch (reason) {
    case WebSocketCloseCode.PlayerKicked: {
      title = t`You were kicked by another player`;
      alertMessage = t`Ouch. You can close the game and try to rejoin.`;
      showBugInfo = false;
      break;
    }
    case WebSocketCloseCode.ConnectionSuperseded: {
      alertMessage = t`You were disconnected because you started playing from a new location. Unsaved progress may have been lost.`;
      break;
    }
    case WebSocketCloseCode.UserSessionSuperseded: {
      alertMessage = t`You were disconnected because you started playing from a new location. Unsaved progress may have been lost.`;
      break;
    }
    case WebSocketCloseCode.VersionMismatch: {
      alertMessage = t`A new version is available. If you were in the middle of a game, you might have to start over. (VersionMismatch)`;
      break;
    }
    case WebSocketCloseCode.VersionExpired: {
      alertMessage = t`A new version is available. If you were in the middle of a game, you might have to start over. (VersionExpired)`;
      break;
    }
    case WebSocketCloseCode.AuthenticationFailure: {
      // handled via setAuthenticationFailure
      break;
    }
    case null: {
      // do nothing
    }
  }

  useEffect(() => {
    if (reason === null) {
      return;
    }
  }, [reason]);

  // Show a calmer blue dialog when the client version is expired.
  if (reason === WebSocketCloseCode.VersionExpired) {
    return <VersionExpiredDialog isOpen={true} />;
  }

  return (
    <CriticalAlertDialog
      isOpen={reason !== null}
      title={title}
      showBugInfo={showBugInfo}
    >
      {alertMessage}
      {/* The client gets into this state if a new connection is made from another
       client with the same playerID — the server will then disconnect the older 
       connection (this one). This button lets the user do the "uno reverse kick" 
       to rejoin. It's very important on Discord where this can happen when changing 
       surfaces from mobile -> desktop -> mobile*/}
      {(reason === WebSocketCloseCode.ConnectionSuperseded ||
        reason === WebSocketCloseCode.UserSessionSuperseded) && (
        <McFlex mt={2}>
          <Button
            variant="white"
            onClick={() => {
              roomConnection.connect();
            }}
          >
            <Trans>Reconnect</Trans>
          </Button>
        </McFlex>
      )}
      {/* The client gets into this state if a new connection is made from another
       client with the same playerID — the server will then disconnect the older 
       connection (this one). This button lets the user do the "uno reverse kick" 
       to rejoin. It's very important on Discord where this can happen when changing 
       surfaces from mobile -> desktop -> mobile*/}
      {reason === WebSocketCloseCode.PlayerKicked && isRunningInsideDiscord && (
        <McFlex mt={4}>
          <Button
            variant="white"
            onClick={() => {
              closeDiscordActivity('User chose to exit the game');
            }}
          >
            <Trans>exit game</Trans>
          </Button>
        </McFlex>
      )}
    </CriticalAlertDialog>
  );
}
