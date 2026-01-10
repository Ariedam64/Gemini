import { surface } from '@/environment';

// More info on scopes here: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
export const scopes = [
  'identify',
  'guilds.members.read',
  'guilds',

  // We only need this scope if we're on the "discord" surface
  ...(surface === 'discord'
    ? (['applications.commands', 'rpc.voice.read'] as const)
    : ([] as const)),
] as const;
