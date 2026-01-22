/**
 * AriesAPI Feature - Rooms API
 *
 * Functions for fetching and searching public rooms
 */

import type { Room, RoomDto, RoomSearchResult } from '../types';
import { httpGet } from './http';

// ─────────────────────────────────────────────────────────────────────────────
// Fetch Available Rooms
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchAvailableRooms(limit = 50): Promise<Room[]> {
    const { data } = await httpGet<RoomDto[]>('rooms', { limit });
    if (!data || !Array.isArray(data)) return [];

    return data.map((r) => ({
        id: r.id,
        isPrivate: r.is_private,
        playersCount: r.players_count ?? 0,
        lastUpdatedAt: r.last_updated_at,
        lastUpdatedByPlayerId: r.last_updated_by_player_id,
        userSlots: Array.isArray(r.user_slots)
            ? r.user_slots.map((slot) => ({
                  name: slot.name,
                  avatarUrl: slot.avatar_url ?? null,
              }))
            : undefined,
    }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Search Rooms by Player Name
// ─────────────────────────────────────────────────────────────────────────────

export async function searchRoomsByPlayerName(
    rawQuery: string,
    options?: {
        limitRooms?: number;
        minQueryLength?: number;
    },
): Promise<RoomSearchResult[]> {
    const query = rawQuery.trim();
    const minLen = options?.minQueryLength ?? 2;

    if (query.length < minLen) {
        return [];
    }

    const limitRooms = options?.limitRooms ?? 200;
    const qLower = query.toLowerCase();

    const rooms = await fetchAvailableRooms(limitRooms);

    const results: RoomSearchResult[] = [];

    for (const room of rooms) {
        if (!room.userSlots || room.userSlots.length === 0) continue;

        const matchedSlots = room.userSlots.filter((slot) => {
            if (!slot.name) return false;
            return slot.name.toLowerCase().includes(qLower);
        });

        if (matchedSlots.length > 0) {
            results.push({
                room,
                matchedSlots,
            });
        }
    }

    return results;
}
