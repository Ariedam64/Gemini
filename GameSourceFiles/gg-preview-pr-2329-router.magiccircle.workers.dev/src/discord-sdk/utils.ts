import { useEffect, useState } from 'react';
import { RPCCloseCodes } from '@discord/embedded-app-sdk';
import { getDefaultStore } from 'jotai';
import { DiscordClientId, isRunningInsideDiscord } from '@/environment';
import {
  discordAccessTokenAtom,
  discordSdkAtom,
  useIsUserAuthenticated,
} from '@/store/store';

/**
 * Helper function to fetch the Discord SDK and permissions.
 */
async function getDiscordSdkAndPermissions() {
  if (!isRunningInsideDiscord) {
    return null;
  }

  const discordSdk = getDefaultStore().get(discordSdkAtom);
  if (!discordSdk) {
    console.warn('Running in Discord but Discord SDK not initialized');
    return null;
  }
  const { PermissionUtils, Permissions } = await import(
    '@discord/embedded-app-sdk'
  );
  try {
    const { permissions } = await discordSdk.commands.getChannelPermissions();
    return { discordSdk, PermissionUtils, Permissions, permissions };
  } catch (err) {
    console.warn('Failed to get channel permissions', err);
    return null;
  }
}

/**
 * Checks if the user can create a Discord invite.
 * This function verifies if the user has the necessary permissions to create a Discord invite.
 * Note that the user might not have sufficient permissions to create an invite based on the server's configuration.
 * Additionally, in Group Direct Messages (GDMs), the user will never have permission to create an invite.
 *
 * @returns {Promise<boolean>} True if the user can create a Discord invite, false otherwise.
 */
export async function canUserCreateDiscordInvite(): Promise<boolean> {
  const result = await getDiscordSdkAndPermissions();
  if (!result) return false;
  const { PermissionUtils, Permissions, permissions } = result;
  return PermissionUtils.can(Permissions.CREATE_INSTANT_INVITE, permissions);
}

/**
 * Custom hook to check if the user can create a Discord invite.
 * This hook caches the result to avoid calling the permission check on every
 * render, which can be expensive as it involves async imports.
 * @returns {boolean} True if the user can create a Discord invite, false otherwise.
 */
export function useCanUserCreateDiscordInvite(): boolean {
  const [canCreateInvite, setCanCreateInvite] = useState(false);
  const isUserAuthenticated = useIsUserAuthenticated();

  useEffect(() => {
    if (!isUserAuthenticated) return;

    async function checkPermissions() {
      const canUserCreate = await canUserCreateDiscordInvite();
      setCanCreateInvite(canUserCreate);
    }

    void checkPermissions().catch(console.warn);
  }, [isUserAuthenticated]);

  return canCreateInvite;
}

/**
 * Opens the Discord invite dialog if the user has the necessary permissions.
 */
export async function openDiscordInviteDialog() {
  try {
    const result = await getDiscordSdkAndPermissions();
    if (!result) return;
    const { discordSdk } = result;
    if (await canUserCreateDiscordInvite()) {
      await discordSdk.commands.openInviteDialog();
      // successfully opened dialog
    } else {
      console.warn('User does not have CREATE_INSTANT_INVITE permissions');
    }
  } catch (err) {
    console.warn('Error opening invite dialog:', err);
  }
}

/**
 * Handles opening an external link in Discord.
 * @param {string} url - The URL to open.
 */
export async function handleDiscordExternalLink(url: string): Promise<boolean> {
  if (!isRunningInsideDiscord) {
    return false;
  }
  const res = await getDefaultStore()
    .get(discordSdkAtom)
    ?.commands.openExternalLink({
      url,
    });
  if (res?.opened) {
    return true;
  }
  return false;
}

export function closeDiscordActivity(reason: string) {
  if (!isRunningInsideDiscord) {
    return;
  }
  const discordSdk = getDefaultStore().get(discordSdkAtom);
  if (!discordSdk) {
    console.warn('Discord SDK not initialized');
    return;
  }
  discordSdk.close(RPCCloseCodes.CLOSE_NORMAL, reason);
}

export const handleDiscordShareMoment = async (url: string) => {
  const accessToken = getDefaultStore().get(discordAccessTokenAtom);
  if (!accessToken) {
    return;
  }
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const buf = await blob.arrayBuffer();
    const mimeType = blob.type;
    const imageFile = new File([buf], 'shareable.png', {
      type: mimeType,
    });
    const body = new FormData();
    body.append('file', imageFile);
    const applicationId = DiscordClientId;

    // see docs: https://discord.com/developers/docs/activities/development-guides
    const attachmentResponse = await fetch(
      `https://discord.com/api/v10/applications/${applicationId}/attachment`,
      {
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const attachmentJson = (await attachmentResponse.json()) as {
      attachment: { url: string };
    };
    const mediaUrl = attachmentJson.attachment.url;

    const result = await getDiscordSdkAndPermissions();
    if (!result) return;
    const { discordSdk } = result;
    await discordSdk.commands.openShareMomentDialog({ mediaUrl });
  } catch (err) {
    console.warn('Error sharing to Discord:', err);
  }
};
