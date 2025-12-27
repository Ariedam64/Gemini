import { useCallback, useEffect, useState } from 'react';
import type { RoomMessage } from '@/common/games/Room/messages';
import type { AnyMessage } from '@/common/types/messages';
import { useScopes } from '@/hooks';
import { useInterval } from '@/utils';
import RoomConnection from './RoomConnection';

export function useRoomConnection(): RoomConnection {
  return RoomConnection.getInstance();
}

export function useSendRoomMessage(): (message: RoomMessage) => void {
  const roomConnection = useRoomConnection();
  return useCallback(
    (message: RoomMessage) => {
      roomConnection.sendMessage({
        scopePath: ['Room'],
        ...message,
      });
    },
    [roomConnection]
  );
}

// The customScopes parameter was added to handle an edge case in useAppEffects.
// In this edge case, we want to send a LobbyMessage, but the scope there resolves only to ['Room'].
// However, we need it to resolve to ['Room', 'Lobby']. Hence, the customScopes parameter allows us to specify a custom scope path.
// In most cases though, we don't need to specify a custom scope path, so we can just use the default scope path.
export function useSendMessage<T extends AnyMessage>(
  customScopes?: string[]
): (message: T) => void {
  const roomConnection = useRoomConnection();
  const scopes = useScopes();

  return useCallback(
    (message: T): void => {
      roomConnection.sendMessage({
        scopePath: customScopes ?? scopes,
        ...message,
      });
    },
    [scopes, roomConnection, customScopes]
  );
}

export function useIsConnected(): boolean {
  const roomConnection = useRoomConnection();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleReconnectionAttempt = (state: {
      isConnected: boolean;
      numConsecutiveAttempts?: number;
    }) => {
      setIsConnected(state.isConnected);
    };
    setIsConnected(roomConnection.isConnected());

    const unsubscribe = roomConnection.addReconnectionListener(
      handleReconnectionAttempt
    );

    return unsubscribe;
  }, [roomConnection]);
  // Also poll the connection state periodically to catch cases where
  // the WebSocket closes but reconnection listeners aren't notified
  // (e.g., when document is hidden)
  useInterval(() => {
    const currentState = roomConnection.isConnected();
    setIsConnected(currentState);
  }, 1000);

  return isConnected;
}
