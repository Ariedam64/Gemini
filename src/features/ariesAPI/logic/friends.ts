/**
 * AriesAPI Feature - Friends API
 *
 * Functions for friend management (fetch, send, respond, remove)
 */

import type { FriendAction, FriendRequestsResult, PlayerView } from '../types';
import { httpGet, httpPost } from './http';
import { fetchPlayersView } from './players';
import { setCachedFriends, setCachedIncomingRequests } from './cache';

// ─────────────────────────────────────────────────────────────────────────────
// Fetch Friends IDs
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchFriendsIds(playerId: string): Promise<string[]> {
    if (!playerId) return [];

    const { status, data } = await httpGet<{
        playerId: string;
        friends: string[];
    }>('list-friends', { playerId });

    if (status !== 200 || !data || !Array.isArray(data.friends)) return [];
    return data.friends;
}

// ─────────────────────────────────────────────────────────────────────────────
// Fetch Friends with Views (cached)
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchFriendsWithViews(playerId: string): Promise<PlayerView[]> {
    const friendIds = await fetchFriendsIds(playerId);
    if (friendIds.length === 0) {
        setCachedFriends([]);
        return [];
    }

    const result = await fetchPlayersView(friendIds, {
        sections: ['profile', 'room'],
    });
    setCachedFriends(result);
    return [...result];
}

// ─────────────────────────────────────────────────────────────────────────────
// Fetch Friend Requests (incoming/outgoing)
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchFriendRequests(
    playerId: string,
): Promise<FriendRequestsResult> {
    if (!playerId) {
        return { playerId: '', incoming: [], outgoing: [] };
    }

    const { status, data } = await httpGet<FriendRequestsResult>(
        'list-friend-requests',
        { playerId },
    );

    if (status !== 200 || !data) {
        return { playerId, incoming: [], outgoing: [] };
    }

    return {
        playerId: data.playerId,
        incoming: Array.isArray(data.incoming) ? data.incoming : [],
        outgoing: Array.isArray(data.outgoing) ? data.outgoing : [],
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Fetch Incoming Requests with Views (cached)
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchIncomingRequestsWithViews(
    playerId: string,
): Promise<PlayerView[]> {
    const { incoming } = await fetchFriendRequests(playerId);
    const ids = incoming.map((r) => r.fromPlayerId);
    if (ids.length === 0) {
        setCachedIncomingRequests([]);
        return [];
    }

    const result = await fetchPlayersView(ids, { sections: ['profile'] });
    setCachedIncomingRequests(result);
    return [...result];
}

// ─────────────────────────────────────────────────────────────────────────────
// Fetch Outgoing Requests with Views
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchOutgoingRequestsWithViews(
    playerId: string,
): Promise<PlayerView[]> {
    const { outgoing } = await fetchFriendRequests(playerId);
    const ids = outgoing.map((r) => r.toPlayerId);
    if (ids.length === 0) return [];

    return fetchPlayersView(ids, { sections: ['profile'] });
}

// ─────────────────────────────────────────────────────────────────────────────
// Send Friend Request (POST)
// ─────────────────────────────────────────────────────────────────────────────

export async function sendFriendRequest(
    fromPlayerId: string,
    toPlayerId: string,
): Promise<boolean> {
    if (!fromPlayerId || !toPlayerId || fromPlayerId === toPlayerId) {
        return false;
    }

    const { status } = await httpPost<null>('friend-request', {
        fromPlayerId,
        toPlayerId,
    });

    if (status === 204) return true;
    if (status === 409) {
        console.warn('[AriesAPI] friend-request conflict (already exists)');
    }
    return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Respond to Friend Request (POST)
// ─────────────────────────────────────────────────────────────────────────────

export async function respondFriendRequest(params: {
    playerId: string;
    otherPlayerId: string;
    action: FriendAction;
}): Promise<boolean> {
    const { playerId, otherPlayerId, action } = params;
    if (!playerId || !otherPlayerId || playerId === otherPlayerId) {
        return false;
    }

    const { status } = await httpPost<null>('friend-respond', {
        playerId,
        otherPlayerId,
        action,
    });

    if (status === 204) return true;
    return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Remove Friend (POST)
// ─────────────────────────────────────────────────────────────────────────────

export async function removeFriend(
    playerId: string,
    otherPlayerId: string,
): Promise<boolean> {
    if (!playerId || !otherPlayerId || playerId === otherPlayerId) {
        return false;
    }

    const { status } = await httpPost<null>('friend-remove', {
        playerId,
        otherPlayerId,
    });

    return status === 204;
}
