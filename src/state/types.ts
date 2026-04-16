/**
 * WebSocket-based game state types.
 * Mirrors the game's PartialState/Welcome message format.
 */

// Re-export shared types from atoms (they define the canonical game shapes)
export type {
  GridPosition,
  PlayerId,
  Inventory,
  InventoryItem,
  CropInventoryItem,
  SeedInventoryItem,
  ToolInventoryItem,
  PlantInventoryItem,
  EggInventoryItem,
  PetInventoryItem,
  DecorInventoryItem,
  ItemStorage,
  PetSlot,
  PetSlotInfo,
  GrowSlot,
  Garden,
  GardenTileObject,
  PlantTileObject,
  EggTileObject,
  DecorTileObject,
  Shop,
  Shops,
  ShopPurchases,
  Weather,
  Journal,
  PlayerStats,
  GameMap,
  ItemType,
} from "../atoms/types";

// ─── WS Message Types ─────────────────────────────────────────────────────────

export interface WelcomeMessage {
  type: "Welcome";
  fullState: {
    scope: string;
    data: RoomState;
    child?: {
      scope: string;
      data: GameStateData;
    };
  };
}

export interface PartialStateMessage {
  type: "PartialState";
  patches: Patch[];
}

export interface Patch {
  op: "add" | "replace" | "remove";
  path: string;
  value?: unknown;
}

// ─── Raw State Shapes ─────────────────────────────────────────────────────────

export interface RoomState {
  roomId: string;
  roomSessionId: string;
  hostPlayerId: string;
  selectedGame: string;
  dateRoomCreated: string;
  dateGameBegan: string;
  isGameStarting: boolean;
  timer: RoomTimer | null;
  chat: RoomChat;
  gameVotes: Record<string, string>;
  players: RoomPlayer[];
  [key: string]: unknown;
}

export interface RoomTimer {
  name: string;
  totalSeconds: number;
  secondsRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
}

export interface RoomChat {
  messages: unknown[];
  playerCosmeticInfos: Record<string, unknown>;
}

export interface RoomPlayer {
  id: string;
  name: string;
  isConnected: boolean;
  discordAvatarUrl: string | null;
  cosmetic: Record<string, unknown>;
  emoteData: Record<string, unknown>;
  secondsRemainingUntilChatEnabled: number;
  databaseUserId: string;
  guildId: string | null;
}

export interface GameStateData {
  currentTime: number;
  shops: {
    seed: ShopData;
    egg: ShopData;
    tool: ShopData;
    decor: ShopData;
  };
  weather: import("../atoms/types").Weather;
  userSlots: (UserSlotData | null)[];
  spectators: string[];
  [key: string]: unknown;
}

export interface ShopData {
  inventory: unknown[];
  secondsUntilRestock: number;
}

export interface UserSlotData {
  playerId: string;
  databaseUserId: string;
  position: import("../atoms/types").GridPosition | null;
  petSlotInfos: Record<string, import("../atoms/types").PetSlotInfo>;
  notAuthoritative_selectedItemIndex: number | null;
  lastActionEvent: unknown;
  customRestockInventories: Record<string, unknown>;
  lastSlotMachineInfo: unknown;
  data: UserSlotInnerData | null;
  [key: string]: unknown;
}

export interface UserSlotInnerData {
  schemaVersion: number | null;
  coinsCount: number;
  inventory: import("../atoms/types").Inventory;
  garden: import("../atoms/types").Garden;
  petSlots: import("../atoms/types").PetSlot[];
  shopPurchases: import("../atoms/types").ShopPurchases;
  customRestocks: Record<string, unknown>;
  journal: import("../atoms/types").Journal;
  tasksCompleted: string[];
  stats: import("../atoms/types").PlayerStats;
  activityLogs: unknown[];
  [key: string]: unknown;
}

// ─── Subscription Types ───────────────────────────────────────────────────────

export type StateChangeCallback = () => void;
export type Unsubscribe = () => void;

/** Channels that subscribers can listen to for granular updates */
export type StateChannel =
  | "state"           // any change
  | "players"         // player list / slot changes
  | "mySlot"          // my own userSlot changed
  | "inventory"       // my inventory changed
  | "garden"          // my garden changed
  | "pets"            // my pets changed
  | "shops"           // shop data changed
  | "weather"         // weather changed
  | "room"            // room metadata changed
  | "position"        // my position changed
  | "selection";      // selected item/slot changed
