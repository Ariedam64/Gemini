/**
 * Enum representing the names of cookies used in the application.
 */
export enum CookieName {
  /** The JWT token for Magic Circle authentication */
  mc_jwt = 'mc_jwt',

  /** The redirect URI used for OAuth2 authentication on web */
  mc_oauth_redirect_uri = 'mc_oauth_redirect_uri',

  /** The room ID for OAuth2 authentication on web */
  mc_oauth_room_id = 'mc_oauth_room_id',
}
