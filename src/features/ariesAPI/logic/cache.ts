/**
 * AriesAPI Feature - Cache Management
 *
 * In-memory cache for friends and incoming requests (not persisted)
 */

import type { PlayerView } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Cache Storage (Memory only)
// ─────────────────────────────────────────────────────────────────────────────

let cachedFriendsView: PlayerView[] | null = null;
let cachedIncomingRequests: PlayerView[] | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Setters (Internal)
// ─────────────────────────────────────────────────────────────────────────────

export function setCachedFriends(friends: PlayerView[]): void {
    cachedFriendsView = friends;
}

export function setCachedIncomingRequests(requests: PlayerView[]): void {
    cachedIncomingRequests = requests;
}

// ─────────────────────────────────────────────────────────────────────────────
// Getters (Public)
// ─────────────────────────────────────────────────────────────────────────────

export function getCachedFriends(): PlayerView[] {
    return cachedFriendsView ? [...cachedFriendsView] : [];
}

export function getCachedIncomingRequests(): PlayerView[] {
    return cachedIncomingRequests ? [...cachedIncomingRequests] : [];
}

// ─────────────────────────────────────────────────────────────────────────────
// Clear Cache
// ─────────────────────────────────────────────────────────────────────────────

export function clearCache(): void {
    cachedFriendsView = null;
    cachedIncomingRequests = null;
}
