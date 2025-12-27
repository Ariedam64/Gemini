import { customAlphabet } from 'nanoid';
import { PlayerId } from './types/player';

// Room ID alphabet, designed to be very easy and unambiguous to read and type
const ROOMID_ALPHABET = '6789BCDFGHJKLMNPQRTW';

// Base58 alphabet without 0, O, and I
const BASE58_ALPHABET =
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

const mediumLength = 16;
const nanoidConfig = {
  roomId: customAlphabet(ROOMID_ALPHABET, 4),
  short: customAlphabet(BASE58_ALPHABET, 12),
  medium: customAlphabet(BASE58_ALPHABET, mediumLength),
};

const BOT_ID_PREFIX = 'bot_';

export class Identifiers {
  static generateRoomId(): string {
    return nanoidConfig.roomId();
  }

  static generateRoomSessionId(): string {
    return 'rs_' + nanoidConfig.short();
  }

  static generatePlayerId(): PlayerId {
    return 'p_' + nanoidConfig.medium();
  }

  static isValidWebPlayerId(playerId: unknown): playerId is PlayerId {
    if (typeof playerId !== 'string') {
      return false;
    }
    const playerIdPrefix = 'p_';
    const validLength = mediumLength + playerIdPrefix.length; // nanoidLongLength + prefix length
    const regex = new RegExp(
      `^${playerIdPrefix}[${BASE58_ALPHABET}]{${mediumLength}}$`
    );

    return playerId.length === validLength && regex.test(playerId);
  }

  static isBotId(playerId: string): boolean {
    return playerId.startsWith(BOT_ID_PREFIX);
  }

  static generateBotId(): string {
    return BOT_ID_PREFIX + nanoidConfig.medium();
  }
}
