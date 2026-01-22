/**
 * AriesAPI Feature - Types
 *
 * Types for Aries API integration (rooms, players, friends)
 */

import { FEATURE_KEYS } from '../../utils/storage';
import type { GardenState } from '../../atoms/types';

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

export interface AriesAPIConfig {
    apiBaseUrl: string;
}

export const DEFAULT_CONFIG: AriesAPIConfig = {
    apiBaseUrl: 'https://ariesmod-api.ariedam.fr/',
};

export const STORAGE_KEY = FEATURE_KEYS.ARIES_API;

// ─────────────────────────────────────────────────────────────────────────────
// API Types - Rooms
// ─────────────────────────────────────────────────────────────────────────────

export interface RoomUserSlot {
    name: string;
    avatarUrl: string | null;
}

export interface Room {
    id: string;
    isPrivate: boolean;
    playersCount: number;
    lastUpdatedAt: string;
    lastUpdatedByPlayerId: string | null;
    userSlots?: RoomUserSlot[];
}

export interface RoomSearchResult {
    room: Room;
    matchedSlots: RoomUserSlot[];
}

/**
 * Internal DTO from API (snake_case)
 */
export interface RoomDto {
    id: string;
    is_private: boolean;
    players_count: number | null;
    last_updated_at: string;
    last_updated_by_player_id: string | null;
    user_slots?: Array<{
        name: string;
        avatar_url?: string | null;
    }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// API Types - Players
// ─────────────────────────────────────────────────────────────────────────────

export interface PlayerViewState {
    garden: GardenState | null;
    inventory: unknown | null;
    stats: Record<string, unknown> | null;
    activityLog: unknown[] | null;
    journal: unknown | null;
    activityLogs?: unknown[] | null;
}

export interface PlayerView {
    playerId: string;
    playerName: string | null;
    avatarUrl: string | null;
    coins: number | null;
    room: unknown | null;
    hasModInstalled: boolean;
    isOnline: boolean;
    lastEventAt: string | null;
    privacy: PlayerPrivacyPayload;
    state?: PlayerViewState;
}

export interface PlayerPrivacyPayload {
    // TODO: Define privacy fields based on API spec
    [key: string]: unknown;
}

export interface PlayerRoomResult {
    playerName: string;
    avatarUrl: string | null;
    roomId: string;
    roomPlayersCount: number;
}

export type PlayerViewSection =
    | 'profile'
    | 'garden'
    | 'inventory'
    | 'stats'
    | 'activityLog'
    | 'journal'
    | 'room';

// ─────────────────────────────────────────────────────────────────────────────
// API Types - Friends
// ─────────────────────────────────────────────────────────────────────────────

export type FriendAction = 'accept' | 'reject';

export interface FriendRequestIncoming {
    fromPlayerId: string;
    otherPlayerId: string;
    createdAt: string;
}

export interface FriendRequestOutgoing {
    toPlayerId: string;
    otherPlayerId: string;
    createdAt: string;
}

export interface FriendRequestsResult {
    playerId: string;
    incoming: FriendRequestIncoming[];
    outgoing: FriendRequestOutgoing[];
}
