/**
 * Room Section - Public Card Part
 * Displays available public rooms from Aries API
 */

import { element } from "../../../styles/helpers";
import { Card } from "../../../components/Card/Card";
import { RoomsList } from "../../../components/RoomsList";
import type { RoomsListHandle, Room } from "../../../components/RoomsList";
import { MGAriesAPI } from "../../../../features/ariesAPI";
import type { Room as AriesRoom } from "../../../../features/ariesAPI";
import { MGEnvironment } from "../../../../modules/environment";
import type { RoomStateController } from "../state";

/* ───────────────────────── Types ───────────────────────── */

export interface PublicCardOptions {
  state: RoomStateController;
  defaultExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
}

export interface PublicCardHandle {
  root: HTMLDivElement;
  destroy(): void;
}

/* ───────────────────────── Public Card Part ───────────────────────── */

export async function createPublicCard(options: PublicCardOptions): Promise<PublicCardHandle> {
  const { state, defaultExpanded = true, onExpandChange } = options;

  let roomsListHandle: RoomsListHandle | null = null;
  let isLoading = false;

  // Check if running in browser (not Discord)
  const joinEnabled = !MGEnvironment.isDiscord();
  const isDiscord = MGEnvironment.isDiscord();

  // Get current origin for Join logic
  const env = MGEnvironment.detect();
  const currentOrigin = env.origin;

  /**
   * Fetch rooms from Aries API and convert to component format
   */
  async function fetchRooms(): Promise<Room[]> {
    try {
      // Fetch all rooms (high limit to get all available rooms)
      const ariesRooms = await MGAriesAPI.fetchRooms(1000);

      return ariesRooms.map((room: AriesRoom) => ({
        id: room.id,
        playerCount: room.playersCount,
        maxPlayers: 6, // Max players is always 6
        playerAvatars: room.userSlots?.map(slot => ({
          name: slot.name,
          avatarUrl: slot.avatarUrl,
        })),
      }));
    } catch (err) {
      console.error(`[Room] Failed to fetch rooms:`, err);
      return [];
    }
  }

  /**
   * Refresh rooms list
   */
  async function refreshRooms(): Promise<void> {
    if (isLoading || !roomsListHandle) return;

    isLoading = true;
    roomsListHandle.setLoading(true);

    try {
      const rooms = await fetchRooms();
      const timestamp = new Date();

      roomsListHandle.setRooms(rooms);
      roomsListHandle.setLastUpdated(timestamp);

      console.log(`[Room] Fetched ${rooms.length} rooms from Aries API`);
    } catch (err) {
      console.error(`[Room] Failed to refresh rooms:`, err);
    } finally {
      isLoading = false;
      roomsListHandle.setLoading(false);
    }
  }

  // Container for card content
  const cardContent = element("div", {
    style: "display: flex; flex-direction: column; gap: 12px;",
  }) as HTMLDivElement;

  // Create RoomsList component
  roomsListHandle = RoomsList({
    rooms: [],
    joinEnabled,
    onJoinRoom: (roomId: string) => {
      // Open room in new tab using current origin
      const roomUrl = `${currentOrigin}/r/${roomId}`;
      window.open(roomUrl, '_blank');
      console.log(`[Room] Opening room: ${roomUrl}`);
    },
    onCopyRoomId: (roomId: string) => {
      navigator.clipboard.writeText(roomId).then(() => {
        console.log(`[Room] Room ID copied to clipboard: ${roomId}`);
      }).catch(err => {
        console.error(`[Room] Failed to copy room ID:`, err);
      });
    },
    onRefresh: () => {
      refreshRooms();
    },
    emptyMessage: "No public rooms available",
    initialFilter: "5-6",
  });

  cardContent.appendChild(roomsListHandle.root);

  const card = Card(
    {
      title: "Public",
      subtitle: isDiscord
        ? "List of available public rooms (view only on Discord)"
        : "List of available public rooms",
      padding: "lg",
      expandable: true,
      defaultExpanded,
      onExpandChange: (expanded) => {
        onExpandChange?.(expanded);
        state.setCardExpanded("public", expanded);
        // Fetch rooms when card is expanded
        if (expanded && !isLoading) {
          refreshRooms();
        }
      },
    },
    cardContent
  );

  // Initial fetch if expanded by default
  if (defaultExpanded) {
    refreshRooms();
  }

  return {
    root: card,
    destroy() {
      if (roomsListHandle) {
        roomsListHandle.destroy();
        roomsListHandle = null;
      }
    },
  };
}
