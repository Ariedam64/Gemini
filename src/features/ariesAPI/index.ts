/**
 * AriesAPI Feature - Public API
 *
 * Aries API integration for fetching rooms, players, and managing friends
 */

import type { AriesAPIConfig } from './types';
import * as State from './state';
import * as Cache from './logic/cache';
import * as Rooms from './logic/rooms';
import * as Players from './logic/players';
import * as Friends from './logic/friends';

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle State
// ─────────────────────────────────────────────────────────────────────────────

let initialized = false;

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export const MGAriesAPI = {
    // ─── Lifecycle ───
    /**
     * Initialize the AriesAPI feature
     * Idempotent: safe to call multiple times
     */
    init(): void {
        if (initialized) return;

        initialized = true;
        console.log('[AriesAPI] Initialized');
    },

    /**
     * Destroy the AriesAPI feature
     * Cleans up cache and resets state
     */
    destroy(): void {
        if (!initialized) return;
        initialized = false;
        Cache.clearCache();
        console.log('[AriesAPI] Destroyed');
    },

    /**
     * Check if the feature is initialized
     */
    isReady(): boolean {
        return initialized;
    },

    // ─── Configuration ───
    /**
     * Get current configuration
     */
    getConfig(): AriesAPIConfig {
        return State.loadConfig();
    },

    /**
     * Update configuration
     */
    updateConfig(partial: Partial<AriesAPIConfig>): AriesAPIConfig {
        return State.updateConfig(partial);
    },

    // ─── Rooms API ───
    /**
     * Fetch available public rooms
     */
    fetchRooms: Rooms.fetchAvailableRooms,

    /**
     * Search rooms by player name
     */
    searchRoomsByPlayerName: Rooms.searchRoomsByPlayerName,

    // ─── Players API ───
    /**
     * Fetch a single player view
     */
    fetchPlayerView: Players.fetchPlayerView,

    /**
     * Fetch multiple player views (batch)
     */
    fetchPlayersView: Players.fetchPlayersView,

    /**
     * Search players by name (via public rooms)
     */
    searchPlayersByName: Players.searchPlayersByName,

    // ─── Friends API (Fetch) ───
    /**
     * Fetch friend IDs for a player
     */
    fetchFriendsIds: Friends.fetchFriendsIds,

    /**
     * Fetch friends with full views (cached)
     */
    fetchFriendsWithViews: Friends.fetchFriendsWithViews,

    /**
     * Fetch friend requests (incoming/outgoing)
     */
    fetchFriendRequests: Friends.fetchFriendRequests,

    /**
     * Fetch incoming requests with views (cached)
     */
    fetchIncomingRequestsWithViews: Friends.fetchIncomingRequestsWithViews,

    /**
     * Fetch outgoing requests with views
     */
    fetchOutgoingRequestsWithViews: Friends.fetchOutgoingRequestsWithViews,

    // ─── Friends API (Actions) ───
    /**
     * Send a friend request
     */
    sendFriendRequest: Friends.sendFriendRequest,

    /**
     * Respond to a friend request (accept/reject)
     */
    respondFriendRequest: Friends.respondFriendRequest,

    /**
     * Remove a friend
     */
    removeFriend: Friends.removeFriend,

    // ─── Cache API ───
    /**
     * Get cached friends (read-only)
     */
    getCachedFriends: Cache.getCachedFriends,

    /**
     * Get cached incoming requests (read-only)
     */
    getCachedIncomingRequests: Cache.getCachedIncomingRequests,

    /**
     * Clear all cache
     */
    clearCache: Cache.clearCache,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Type Exports
// ─────────────────────────────────────────────────────────────────────────────

export type {
    AriesAPIConfig,
    Room,
    RoomUserSlot,
    RoomSearchResult,
    PlayerView,
    PlayerViewState,
    PlayerRoomResult,
    PlayerViewSection,
    FriendAction,
    FriendRequestIncoming,
    FriendRequestOutgoing,
    FriendRequestsResult,
} from './types';
