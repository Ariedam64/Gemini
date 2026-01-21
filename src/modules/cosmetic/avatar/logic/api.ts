/**
 * Avatar Cosmetics API
 * Fetches owned cosmetic items from server
 */

import { pageWindow } from '../../../../utils/windowContext';

export interface UserCosmeticItem {
  id: number;
  createdAt: string;
  userId: string;
  transactionId: number | null;
  cosmeticFilename: string;
  cosmeticType: string;
}

/**
 * Extract version hash from loaded scripts
 */
function getVersionHash(): string {
  try {
    const scripts = Array.from(pageWindow.document.querySelectorAll('script'));
    const versionedScript = scripts.find((s: HTMLScriptElement) => s.src.includes('/version/'));
    const match = versionedScript?.src.match(/\/version\/([^/]+)\//);
    return match?.[1] || '669ccaa';
  } catch (err) {
    console.error('[Avatar API] Failed to get version hash:', err);
    return '669ccaa';
  }
}

/**
 * Extract room code from URL
 */
function getRoomCode(): string {
  return pageWindow.location.pathname.split('/').pop() || 'UNKNOWN';
}

/**
 * Fetch owned cosmetic items for authenticated user
 */
export async function fetchOwnedCosmetics(): Promise<UserCosmeticItem[]> {
  try {
    const version = getVersionHash();
    const roomCode = getRoomCode();
    const url = `https://magicgarden.gg/version/${version}/api/rooms/${roomCode}/me/cosmetics`;

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error('[Avatar API] Failed to fetch owned cosmetics:', err);
    return [];
  }
}
