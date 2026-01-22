/**
 * AriesAPI Feature - Players API
 *
 * Functions for fetching and searching player information
 */

import type { PlayerView, PlayerViewSection, PlayerRoomResult } from '../types';
import { httpGet, httpPost } from './http';
import { fetchAvailableRooms } from './rooms';

// ─────────────────────────────────────────────────────────────────────────────
// Fetch Single Player View
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchPlayerView(playerId: string): Promise<PlayerView | null> {
    if (!playerId) return null;
    const { status, data } = await httpGet<PlayerView>('get-player-view', {
        playerId,
    });
    if (status === 404) return null;
    return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// Fetch Multiple Players View (Batch)
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchPlayersView(
    playerIds: string[],
    options?: {
        sections?: PlayerViewSection[] | PlayerViewSection;
    },
): Promise<PlayerView[]> {
    const ids = Array.from(
        new Set(
            (playerIds ?? [])
                .map((x) => String(x).trim())
                .filter((x) => x.length >= 3),
        ),
    );
    if (ids.length === 0) return [];

    const body: {
        playerIds: string[];
        sections?: PlayerViewSection[];
    } = { playerIds: ids };

    if (options?.sections) {
        body.sections = Array.isArray(options.sections)
            ? options.sections
            : [options.sections];
    }

    const { status, data } = await httpPost<PlayerView[]>('get-players-view', body);

    if (status !== 200 || !Array.isArray(data)) return [];
    return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// Search Players by Name (via public rooms)
// ─────────────────────────────────────────────────────────────────────────────

export async function searchPlayersByName(
    rawQuery: string,
    options?: {
        limitRooms?: number;
        minQueryLength?: number;
    },
): Promise<PlayerRoomResult[]> {
    const query = rawQuery.trim();
    const minLen = options?.minQueryLength ?? 2;

    if (query.length < minLen) {
        return [];
    }

    const limitRooms = options?.limitRooms ?? 200;
    const qLower = query.toLowerCase();

    const rooms = await fetchAvailableRooms(limitRooms);

    const map = new Map<string, PlayerRoomResult>();

    for (const room of rooms) {
        if (!room.userSlots || room.userSlots.length === 0) continue;

        for (const slot of room.userSlots) {
            if (!slot.name) continue;

            const nameLower = slot.name.toLowerCase();
            if (!nameLower.includes(qLower)) continue;

            const key = `${room.id}::${slot.name}`;
            if (map.has(key)) continue;

            map.set(key, {
                playerName: slot.name,
                avatarUrl: slot.avatarUrl,
                roomId: room.id,
                roomPlayersCount: room.playersCount,
            });
        }
    }

    return Array.from(map.values());
}
