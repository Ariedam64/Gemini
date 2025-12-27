import { QuinoaMessage } from './games/Quinoa/messages';
import { RoomMessage } from './games/Room/messages';
import { GameNameIncludingLobby } from './types/games';
import { AnyMessage, ClientToServerMessage } from './types/messages';

export const noisyMessages: {
  scope: GameNameIncludingLobby;
  type: string;
}[] = [
  {
    scope: 'Quinoa',
    type: 'PlayerPosition' satisfies QuinoaMessage['type'],
  },
  {
    scope: 'Quinoa',
    type: 'PetPositions' satisfies QuinoaMessage['type'],
  },
  {
    scope: 'Quinoa',
    type: 'HarvestCrop' satisfies QuinoaMessage['type'],
  },
  {
    scope: 'Quinoa',
    type: 'PurchaseSeed' satisfies QuinoaMessage['type'],
  },
  {
    scope: 'Quinoa',
    type: 'Ping' satisfies QuinoaMessage['type'],
  },
  {
    scope: 'Quinoa',
    type: 'SetSelectedItem' satisfies QuinoaMessage['type'],
  },
  {
    scope: 'Quinoa',
    type: 'PickupObject' satisfies QuinoaMessage['type'],
  },
  {
    scope: 'Quinoa',
    type: 'DropObject' satisfies QuinoaMessage['type'],
  },
];

function isRoomMessage(message: ClientToServerMessage): boolean {
  return message.scopePath.length === 1 && message.scopePath[0] === 'Room';
}

export function isNoisyClientToServerMessage(
  message: ClientToServerMessage
): boolean {
  if (isRoomMessage(message)) {
    const roomMessage = message as RoomMessage;
    if (roomMessage.type === 'ReportSpeakingStart') {
      return true;
    }
  }
  const scope = [...message.scopePath].pop();
  if (scope === undefined) {
    return false;
  }
  return isNoisyMessage(scope, message);
}

export function isNoisyMessage(scope: string, message: AnyMessage): boolean {
  return noisyMessages.some((noisyMessage) => {
    return message.type === noisyMessage.type && scope === noisyMessage.scope;
  });
}
