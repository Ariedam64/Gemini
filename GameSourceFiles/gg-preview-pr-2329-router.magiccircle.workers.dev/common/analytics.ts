export enum GroupType {
  RoomSession = 'RoomSession',
  DiscordActivityInstance = 'DiscordActivityInstance',
}

export enum QueryParamKeys {
  /** Source of the player joining the room, which could be a QR code, a link, direct URL etc. */
  mc_source = 'mc_source',

  // Deprecated - keeping here so we don't re-use these keys in the future
  // /** Venue ID, i.e., which venue the QR code was scanned at. */
  // mc_vid = 'mc_vid',
  // /** Tent face, 1 or 2. */
  // mc_tf = 'mc_tf',
  // /** Tent variant, which is the creative design of the table tent. */
  // mc_tv = 'mc_tv',
}
