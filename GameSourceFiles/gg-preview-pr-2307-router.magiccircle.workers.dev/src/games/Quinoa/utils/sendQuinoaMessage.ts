import type { QuinoaMessage } from '@/common/games/Quinoa/messages';
import RoomConnection from '@/connection/RoomConnection';

/**
 * Send a message to the Quinoa server
 */
export function sendQuinoaMessage(message: QuinoaMessage) {
  const roomConnection = RoomConnection.getInstance();
  roomConnection.sendMessage({
    scopePath: ['Room', 'Quinoa'],
    ...message,
  });
}
