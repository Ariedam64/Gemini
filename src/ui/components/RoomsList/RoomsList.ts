/**
 * RoomsList Component
 * Displays a compact list of available rooms with player info and join functionality
 */

import { element } from "../../styles/helpers";
import { roomsListCss } from "./roomsList.css";
import { Button } from "../Button/Button";
import { Select } from "../Select/Select";
import type { SelectOption } from "../Select/Select";

export { roomsListCss };

/* ───────────────────────── Types ───────────────────────── */

export interface Room {
  /** Unique room identifier */
  id: string;
  /** Current player count */
  playerCount: number;
  /** Maximum player count (typically 6) */
  maxPlayers: number;
  /** Array of player avatars */
  playerAvatars?: Array<{ name: string; avatarUrl: string | null }>;
}

export type PlayerFilter = "5-6" | "4" | "1-3" | "all";

export interface RoomsListOptions {
  /** Initial list of rooms */
  rooms?: Room[];
  /** Callback when Join button is clicked */
  onJoinRoom?: (roomId: string) => void;
  /** Callback when Room ID is clicked (copy to clipboard) */
  onCopyRoomId?: (roomId: string) => void;
  /** Callback when Refresh button is clicked */
  onRefresh?: () => void;
  /** Empty state message */
  emptyMessage?: string;
  /** Whether Join button is enabled (browser only) */
  joinEnabled?: boolean;
  /** Initial player count filter */
  initialFilter?: PlayerFilter;
  /** Callback when filter changes */
  onFilterChange?: (filter: PlayerFilter) => void;
}

export interface RoomsListHandle {
  root: HTMLElement;
  setRooms(rooms: Room[]): void;
  setFilter(filter: PlayerFilter): void;
  setLastUpdated(timestamp: Date): void;
  setLoading(loading: boolean): void;
  destroy(): void;
}

/* ───────────────────────── Helper Functions ───────────────────────── */

/**
 * Detect platform from room ID using regex
 * Discord pattern: I-{digits}-GC-{digits}-{digits}
 * Example: "I-1462764964283682981-GC-808935495543160852-1392928961679331541"
 */
function detectPlatform(roomId: string): "discord" | "web" {
  const discordPattern = /^I-\d+-GC-\d+-\d+$/;
  return discordPattern.test(roomId) ? "discord" : "web";
}

/**
 * Create a badge element for platform indicator
 */
function createPlatformBadge(platform: "discord" | "web"): HTMLSpanElement {
  const badge = element("span", {
    className: `rooms-list__badge rooms-list__badge--${platform}`,
  }) as HTMLSpanElement;
  badge.textContent = platform === "discord" ? "Discord" : "Web";
  return badge;
}

/**
 * Truncate room ID if too long
 */
function truncateRoomId(id: string, maxLength = 16): string {
  if (id.length <= maxLength) return id;
  return `${id.slice(0, maxLength)}...`;
}

/**
 * Create copy icon SVG
 */
function createCopyIcon(): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "14");
  svg.setAttribute("height", "14");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.innerHTML = `
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  `;
  return svg;
}

/**
 * Filter rooms by player count
 */
function filterRooms(rooms: Room[], filter: PlayerFilter): Room[] {
  // For "all" filter, include full rooms; otherwise exclude them
  const filtered = filter === "all"
    ? rooms
    : rooms.filter(r => r.playerCount < r.maxPlayers);

  switch (filter) {
    case "5-6":
      return filtered.filter(r => r.playerCount >= 5);
    case "4":
      return filtered.filter(r => r.playerCount === 4);
    case "1-3":
      return filtered.filter(r => r.playerCount >= 1 && r.playerCount <= 3);
    case "all":
    default:
      return filtered;
  }
}

/**
 * Format timestamp for display
 */
function formatTimestamp(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

/**
 * Create loading spinner SVG
 */
function createSpinner(): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 50 50");
  svg.setAttribute("width", "50");
  svg.setAttribute("height", "50");
  svg.innerHTML = `
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="31.4 31.4">
      <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
    </circle>
  `;
  return svg;
}

/* ───────────────────────── Factory Function ───────────────────────── */

export function RoomsList(options: RoomsListOptions = {}): RoomsListHandle {
  const {
    rooms = [],
    onJoinRoom,
    onCopyRoomId,
    onRefresh,
    emptyMessage = "No rooms available",
    joinEnabled = false,
    initialFilter = "5-6",
    onFilterChange,
  } = options;

  let currentFilter: PlayerFilter = initialFilter;
  let currentRooms: Room[] = rooms;
  let lastUpdated: Date | null = null;

  // Root container
  const root = element("div", { className: "rooms-list" }) as HTMLDivElement;

  // Inject styles
  const style = element("style") as HTMLStyleElement;
  style.textContent = roomsListCss;
  root.appendChild(style);

  // Header: Filter + Refresh button
  const header = element("div", { className: "rooms-list__header-bar" }) as HTMLDivElement;

  // Filter select
  const filterOptions: SelectOption[] = [
    { value: "5-6", label: "5-6 players" },
    { value: "4", label: "4 players" },
    { value: "1-3", label: "1-3 players" },
    { value: "all", label: "All" },
  ];

  const filterSelect = Select({
    options: filterOptions,
    value: initialFilter,
    onChange: (value) => {
      currentFilter = value as PlayerFilter;
      onFilterChange?.(currentFilter);
      render(currentRooms);
    },
  });

  header.appendChild(filterSelect.root);

  // Refresh button
  const refreshButton = Button({
    label: "Refresh rooms",
    variant: "default",
    size: "sm",
    iconLeft: "",
    onClick: () => {
      onRefresh?.();
    },
  });

  header.appendChild(refreshButton);

  root.appendChild(header);

  // Wrapper for list container + loading overlay
  const listWrapper = element("div", {
    style: "position: relative;",
  }) as HTMLDivElement;

  // Scrollable list container (max 4 items visible)
  const listContainer = element("div", {
    className: "rooms-list__container",
  }) as HTMLDivElement;
  listWrapper.appendChild(listContainer);

  // Loading overlay (scoped to list container only)
  const loadingOverlay = element("div", {
    className: "rooms-list__loading-overlay",
  }) as HTMLDivElement;
  loadingOverlay.style.display = "none";

  const spinner = createSpinner();
  loadingOverlay.appendChild(spinner);
  listWrapper.appendChild(loadingOverlay);

  root.appendChild(listWrapper);

  // Footer: Powered by Aries + Timestamp
  const footer = element("div", {
    className: "rooms-list__footer",
  }) as HTMLDivElement;

  const ariesBadge = element("div", {
    className: "rooms-list__aries-badge",
  }) as HTMLDivElement;
  ariesBadge.textContent = "Powered by Aries";
  footer.appendChild(ariesBadge);

  const timestampElement = element("div", {
    className: "rooms-list__timestamp",
  }) as HTMLDivElement;
  timestampElement.style.display = "none"; // Hidden until first update
  footer.appendChild(timestampElement);

  root.appendChild(footer);

  // Track persistent components for cleanup (filter select, refresh button)
  const persistentComponents: Array<{ destroy?: () => void; remove?: () => void }> = [
    filterSelect,
    { remove: () => refreshButton.remove() }
  ];

  // Track dynamic room components for cleanup (join buttons)
  const roomComponents: Array<{ destroy?: () => void; remove?: () => void }> = [];

  /**
   * Render a single room item (compact layout - vertical)
   */
  function renderRoomItem(room: Room): HTMLDivElement {
    const platform = detectPlatform(room.id);

    const item = element("div", {
      className: "rooms-list__item",
    }) as HTMLDivElement;

    // Top row: Badge + ID + Copy
    const topRow = element("div", {
      className: "rooms-list__top-row",
    }) as HTMLDivElement;

    const badge = createPlatformBadge(platform);
    topRow.appendChild(badge);

    const roomIdText = element("span", {
      className: "rooms-list__id",
    }) as HTMLSpanElement;
    roomIdText.textContent = truncateRoomId(room.id, 20);
    roomIdText.title = room.id; // Full ID on hover
    topRow.appendChild(roomIdText);

    const copyIcon = createCopyIcon();
    const copyButton = element("button", {
      className: "rooms-list__copy-btn",
    }) as HTMLButtonElement;
    copyButton.type = "button";
    copyButton.title = "Copy room ID";
    copyButton.appendChild(copyIcon);
    copyButton.addEventListener("click", (e) => {
      e.stopPropagation();
      onCopyRoomId?.(room.id);
    });
    topRow.appendChild(copyButton);

    item.appendChild(topRow);

    // Bottom row: Avatars + Count + Join button
    const bottomRow = element("div", {
      className: "rooms-list__bottom-row",
    }) as HTMLDivElement;

    // Left section: Avatars + Count
    const bottomLeft = element("div", {
      className: "rooms-list__bottom-left",
    }) as HTMLDivElement;

    // Avatars container
    const avatarsContainer = element("div", {
      className: "rooms-list__avatars",
    }) as HTMLDivElement;

    // Render player avatars (max 6)
    for (let i = 0; i < room.maxPlayers; i++) {
      const avatar = element("div", {
        className: `rooms-list__avatar ${i < room.playerCount ? "rooms-list__avatar--filled" : "rooms-list__avatar--empty"
          }`,
      }) as HTMLDivElement;

      // If we have actual avatar data, use it
      if (room.playerAvatars && room.playerAvatars[i]) {
        const playerAvatar = room.playerAvatars[i];
        if (playerAvatar.avatarUrl) {
          const img = element("img", {
            src: playerAvatar.avatarUrl,
            alt: playerAvatar.name,
          }) as HTMLImageElement;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "cover";
          avatar.appendChild(img);
        } else {
          avatar.textContent = "👤";
        }
        avatar.title = playerAvatar.name;
      } else if (i < room.playerCount) {
        // Placeholder for filled slots
        avatar.textContent = "👤";
      }

      avatarsContainer.appendChild(avatar);
    }

    bottomLeft.appendChild(avatarsContainer);

    // Player count text (next to avatars)
    const countText = element("span", {
      className: "rooms-list__count",
    }) as HTMLSpanElement;
    countText.textContent = `${room.playerCount}/${room.maxPlayers}`;
    bottomLeft.appendChild(countText);

    bottomRow.appendChild(bottomLeft);

    // Join button (right side)
    const isFull = room.playerCount >= room.maxPlayers;
    const joinButton = Button({
      label: "Join",
      variant: "primary",
      size: "sm",
      disabled: !joinEnabled || isFull,
      onClick: () => {
        onJoinRoom?.(room.id);
      },
    });
    roomComponents.push(joinButton);
    bottomRow.appendChild(joinButton);

    item.appendChild(bottomRow);

    return item;
  }

  /**
   * Render all rooms or empty state
   */
  function render(roomsList: Room[]): void {
    // Clear previous content
    listContainer.innerHTML = "";

    // Clean up previous room components (join buttons)
    roomComponents.forEach((comp) => {
      if (comp.destroy) comp.destroy();
      else if (comp.remove) comp.remove();
    });
    roomComponents.length = 0;

    // Apply filter
    const filtered = filterRooms(roomsList, currentFilter);

    if (filtered.length === 0) {
      // Empty state
      const emptyState = element("div", {
        className: "rooms-list__empty",
      }) as HTMLDivElement;
      emptyState.textContent = emptyMessage;
      listContainer.appendChild(emptyState);
    } else {
      // Render each room
      filtered.forEach(room => {
        const roomItem = renderRoomItem(room);
        listContainer.appendChild(roomItem);
      });
    }
  }

  // Initial render
  render(rooms);

  /* ───────────────────────── Handle API ───────────────────────── */

  const handle: RoomsListHandle = {
    root,
    setRooms(newRooms: Room[]): void {
      currentRooms = newRooms;
      render(newRooms);
    },
    setFilter(filter: PlayerFilter): void {
      currentFilter = filter;
      filterSelect.setValue(filter);
      render(currentRooms);
    },
    setLastUpdated(timestamp: Date): void {
      lastUpdated = timestamp;
      timestampElement.textContent = formatTimestamp(timestamp);
      timestampElement.style.display = "block";
    },
    setLoading(loading: boolean): void {
      if (loading) {
        loadingOverlay.style.display = "flex";
        loadingOverlay.style.opacity = "0";
        // Force reflow
        void loadingOverlay.offsetWidth;
        loadingOverlay.style.opacity = "1";
      } else {
        loadingOverlay.style.opacity = "0";
        setTimeout(() => {
          loadingOverlay.style.display = "none";
        }, 300);
      }
    },
    destroy(): void {
      // Clean up room components
      roomComponents.forEach((comp) => {
        if (comp.destroy) comp.destroy();
        else if (comp.remove) comp.remove();
      });
      roomComponents.length = 0;

      // Clean up persistent components (filter select, refresh button)
      persistentComponents.forEach((comp) => {
        if (comp.destroy) comp.destroy();
        else if (comp.remove) comp.remove();
      });
      persistentComponents.length = 0;

      // Remove from DOM
      root.remove();
    },
  };

  return handle;
}
