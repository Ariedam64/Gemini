/**
 * Constructs a Discord Activity Instance ID from interaction components
 */
export function constructDiscordActivityInstanceId(params: {
  interactionId: string;
  guildId?: string;
  channelId: string;
}): string {
  const { interactionId, guildId, channelId } = params;

  if (guildId) {
    // Guild context (server)
    return `i-${interactionId}-gc-${guildId}-${channelId}`;
  } else {
    // Private channel context (DM or group DM)
    return `i-${interactionId}-pc-${channelId}`;
  }
}

/**
 * Deconstructs a Discord Activity Instance ID to extract Discord server information
 */
export function deconstructDiscordActivityInstanceId(
  activityInstanceId: string
): {
  isDiscordRoom: boolean;
  guildId?: string;
  channelId?: string;
  serverType?: 'guild' | 'private';
} {
  // Parse Discord activity instance ID format
  // Guild: i-{interactionId}-gc-{guildId}-{channelId}
  // Private: i-{interactionId}-pc-{channelId}
  const guildMatch = activityInstanceId.match(/^i-[^-]+-gc-([^-]+)-([^-]+)$/i);
  if (guildMatch) {
    const guildId = guildMatch[1];
    const channelId = guildMatch[2];
    return {
      isDiscordRoom: true,
      serverType: 'guild',
      guildId,
      channelId,
    };
  }

  const privateMatch = activityInstanceId.match(/^i-[^-]+-pc-([^-]+)$/i);
  if (privateMatch) {
    const channelId = privateMatch[1];
    return {
      isDiscordRoom: true,
      serverType: 'private',
      channelId,
    };
  }
  // Not a Discord room
  return {
    isDiscordRoom: false,
  };
}

export function getGuildIdWhereActivityIsBeingPlayed(roomId: string) {
  const result = deconstructDiscordActivityInstanceId(roomId);
  if (result.isDiscordRoom) {
    return result.guildId;
  }
}
