/**
 * Enum representing custom WebSocket close codes for specific scenarios.
 * These codes are in the 4xxx range to avoid conflicts with standard close codes.
 * See: https://datatracker.ietf.org/doc/html/rfc6455#section-7.4.2
 */
enum WebSocketCloseCode {
  /** Used ONLY when reconnecting immediately afterwards */
  ReconnectInitiated = 4100,
  /** Indicates the player left the room voluntarily */
  PlayerLeftVoluntarily = 4200,
  /** Indicates the user session was superseded by a new one when the user
   * starts playing Magic Circle (for now, only Quinoa) in a different room.
   * The player's data in the previous room is now considered stale and requires
   * cleanup/removal since they've moved to a new game session elsewhere. */
  UserSessionSuperseded = 4250,
  /** Indicates the connection was superseded by a new one when the same
   * player reconnects to the same room (e.g., refreshing browser, switching
   * devices, switching platforms, network reconnection, etc.). We attempt to
   * reuse existing player data when possible, though this isn't always feasible
   * when the player ID differs between connections, e.g., playing in Discord
   * and then switching to web (limitation to be addressed).
   */
  ConnectionSuperseded = 4300,
  /** Indicates the server instance was disposed of due to HMR */
  ServerDisposed = 4310,
  /** Indicates the heartbeat timeout expired */
  HeartbeatExpired = 4400,
  /** Indicates the player was kicked from the room by another player*/
  PlayerKicked = 4500,
  /** Indicates a version mismatch between client and server. Generally, this
   * happens when the client is out of date (i.e. the client's version is older
   * than the server's version) */
  VersionMismatch = 4700,
  /** Indicates the server itself is outdated and is not accepting new connections */
  VersionExpired = 4710,
  /** Indicates an error occured during the initial connection handshake */
  AuthenticationFailure = 4800,
}

export const permanentlyDisconnectedCloseCodes = [
  WebSocketCloseCode.ConnectionSuperseded,
  WebSocketCloseCode.UserSessionSuperseded,
  WebSocketCloseCode.PlayerKicked,
  WebSocketCloseCode.VersionMismatch,
  WebSocketCloseCode.VersionExpired,
  WebSocketCloseCode.AuthenticationFailure,
] as const;

export type PermanentlyDisconnectedCloseCode =
  (typeof permanentlyDisconnectedCloseCodes)[number];

export default WebSocketCloseCode;
