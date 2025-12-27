const APP_ROOM_REGEX = /\/r\/([^/]+)/;

export function getSantizedRoomIdFromAppUrl(
  url: string | undefined
): string | null {
  if (!url) {
    return null;
  }
  const { pathname } = new URL(url);
  const roomId = pathname.match(APP_ROOM_REGEX)?.[1];
  if (!roomId) {
    return null;
  }
  return roomId.toUpperCase();
}

const GAMESERVER_ROOM_REGEX = /\/api\/rooms\/([^/]+)/;

export function getSantizedRoomIdFromGameServerUrl(
  url: string | undefined
): string | null {
  if (!url) {
    return null;
  }
  const { pathname } = new URL(url);
  const roomId = pathname.match(GAMESERVER_ROOM_REGEX)?.[1];
  if (!roomId) {
    return null;
  }
  return roomId.toUpperCase();
}

/**
 * Removes the gameserver room prefix from the given pathname.
 *
 * This function strips out the '/api/rooms/{roomId}' portion from the pathname,
 * if present. If the prefix is not found, it returns the original pathname.
 *
 * @param {string} pathname - The pathname to process.
 * @returns {string} The pathname with the gameserver room prefix removed.
 *
 * @example
 * // Returns '/players'
 * stripRoomFromPathname('/api/rooms/ABC123/players');
 *
 * @example
 * // Returns '/api/other/endpoint'
 * stripRoomFromPathname('/api/other/endpoint');
 *
 * @example
 * // Returns '/api/rooms' (no trailing slash)
 * stripRoomFromPathname('/api/rooms');
 */
export function stripRoomFromPathname(pathname: string): string {
  return pathname.replace(GAMESERVER_ROOM_REGEX, '');
}
