// src/atoms/types.ts
// All type definitions for atoms - derived from game source

// =============================================================================
// CORE TYPES
// =============================================================================

export type Unsubscribe = () => void;
export type Path = string | Array<string | number>;
export type PlayerId = string;
export type GridPosition = { x: number; y: number };

// =============================================================================
// VIEW TYPE (moved here to avoid circular dependency)
// =============================================================================

import type { SignatureChannel, SignatureOptions } from "./core/signature";

export type View<T> = {
  label: string;
  get(): Promise<T>;
  set(next: T): Promise<void>;
  update(fn: (prev: T) => T): Promise<T>;
  onChange(
    callback: (next: T, prev?: T) => void,
    isEqual?: (a: T, b: T) => boolean
  ): Promise<Unsubscribe>;
  onChangeNow(
    callback: (next: T, prev?: T) => void,
    isEqual?: (a: T, b: T) => boolean
  ): Promise<Unsubscribe>;
  asSignature<K extends string | number = string>(
    options: SignatureOptions<T, K>
  ): SignatureChannel<T, K>;
  stopOnChange(): void;
};

// =============================================================================
// ENUMS
// =============================================================================

export type ItemType = "Produce" | "Seed" | "Tool" | "Plant" | "Egg" | "Pet" | "Decor";
export type Currency = "coins" | "credits";
export type DecorRotation = 0 | 90 | 180 | 270 | -360 | -90 | -180 | -270;
export type Direction = "up" | "down" | "left" | "right";

export type QuinoaModal =
  | "seedShop"
  | "eggShop"
  | "toolShop"
  | "decorShop"
  | "inventory"
  | "leaderboard"
  | "journal"
  | "stats"
  | "petHutch"
  | "activityLog"
  | null;

// =============================================================================
// INVENTORY ITEMS
// =============================================================================

export type CropInventoryItem = {
  id: string;
  species: string;
  itemType: "Produce";
  scale: number;
  mutations: string[];
};

export type SeedInventoryItem = {
  species: string;
  itemType: "Seed";
  quantity: number;
};

export type ToolInventoryItem = {
  toolId: string;
  itemType: "Tool";
  quantity: number;
};

export type PlantInventoryItem = {
  id: string;
  species: string;
  itemType: "Plant";
  slots: GrowSlot[];
  plantedAt: number;
  maturedAt: number;
};

export type EggInventoryItem = {
  eggId: string;
  itemType: "Egg";
  quantity: number;
};

export type PetInventoryItem = {
  id: string;
  itemType: "Pet";
  petSpecies: string;
  name: string | null;
  xp: number;
  hunger: number;
  mutations: string[];
  targetScale: number;
  abilities: string[];
};

export type DecorInventoryItem = {
  decorId: string;
  itemType: "Decor";
  quantity: number;
};

export type InventoryItem =
  | CropInventoryItem
  | SeedInventoryItem
  | ToolInventoryItem
  | PlantInventoryItem
  | EggInventoryItem
  | PetInventoryItem
  | DecorInventoryItem;

// =============================================================================
// INVENTORY STATE
// =============================================================================

export type Inventory = {
  items: InventoryItem[];
  storages: ItemStorage[];
  favoritedItemIds: string[];
};

export type ItemStorage = {
  id: string;
  items: InventoryItem[];
  maxItems: number;
};

// =============================================================================
// PET TYPES
// =============================================================================

export type PetSlot = {
  id: string;
  petSpecies: string;
  name: string | null;
  xp: number;
  hunger: number;
  mutations: string[];
  targetScale: number;
  abilities: string[];
};

export type PetInfo = {
  slot: PetSlot;
  position: GridPosition | null;
};

export type PetSlotInfo = {
  position: GridPosition | null;
  lastAbilityTrigger: {
    abilityId: string | null;
    performedAt: number | null;
    data: unknown;
  } | null;
};

// =============================================================================
// GARDEN TYPES
// =============================================================================

export type GrowSlot = {
  species: string;
  startTime: number;
  endTime: number;
  targetScale: number;
  mutations: string[];
};

export type PlantTileObject = {
  objectType: "plant";
  species: string;
  slots: GrowSlot[];
  plantedAt: number;
  maturedAt: number;
};

export type EggTileObject = {
  objectType: "egg";
  eggId: string;
  plantedAt: number;
  maturedAt: number;
};

export type DecorTileObject = {
  objectType: "decor";
  decorId: string;
  rotation: DecorRotation;
};

export type GardenTileObject = PlantTileObject | EggTileObject | DecorTileObject;

export type Garden = {
  tileObjects: Record<string, GardenTileObject>;
  boardwalkTileObjects: Record<string, DecorTileObject>;
};

// =============================================================================
// SHOP TYPES
// =============================================================================

export type ShopInventoryItem = {
  itemType: string;
  species?: string;
  toolId?: string;
  eggId?: string;
  decorId?: string;
  initialStock: number;
  price: number;
  currency: Currency;
};

export type Shop = {
  inventory: ShopInventoryItem[];
  secondsUntilRestock: number;
};

export type Shops = {
  seed: Shop;
  egg: Shop;
  tool: Shop;
  decor: Shop;
};

export type ShopPurchase = {
  createdAt: number;
  purchases: Record<string, number>;
};

export type ShopPurchases = Record<string, ShopPurchase>;

// =============================================================================
// PLAYER / USER TYPES
// =============================================================================

export type UserSlot = {
  odId: string;
  odType: string;
  odData: unknown;
  playerId: PlayerId;
  name: string;
  discordAvatarUrl: string | null;
  cosmetic: Record<string, unknown>;
  emoteData: Record<string, unknown>;
  secondsRemainingUntilChatEnabled: number;
  databaseUserId: string;
  guildId: string | null;
  isConnected: boolean;
};

export type PlayerData = {
  odId: string;
  odType: string;
  playerId: PlayerId;
  databaseUserId: string;
  name: string;
  discordAvatarUrl: string | null;
  cosmetic: Record<string, unknown>;
  coinsCount: number;
  garden: Garden;
  inventory: Inventory;
  journal: Journal;
  stats: PlayerStats;
  petSlots: PetSlot[];
  completedTasks: string[];
  activeTasks: string[];
};

export type AvatarData = {
  playerId: PlayerId;
  direction: Direction;
  isMoving: boolean;
  cosmetic: Record<string, unknown>;
};

export type PlayerEmoteData = {
  emoteType: string;
  timestamp: number;
};

// =============================================================================
// JOURNAL & STATS
// =============================================================================

export type Journal = {
  produce: Record<string, { variantsLogged: string[] }>;
  pets: Record<string, { variantsLogged: string[]; abilitiesLogged: string[] }>;
};

export type PlayerStats = {
  player: Record<string, number>;
  slotMachine: Record<string, { numPlays: number; prizesWon: number }>;
  petAbility: Record<string, number>;
  plantAbility: Record<string, number>;
};

// =============================================================================
// MAP TYPES
// =============================================================================

export type MapLocation = {
  spawnTileIdx: number[];
};

export type MapLocations = {
  seedShop: MapLocation;
  eggShop: MapLocation;
  toolShop: MapLocation;
  decorShop: MapLocation;
  sellCropsShop: MapLocation;
  sellPetShop: MapLocation;
  collectorsClub: MapLocation;
  wishingWell: MapLocation;
  shopsCenter: MapLocation;
};

export type GameMap = {
  cols: number;
  rows: number;
  spawnTiles: number[];
  locations: MapLocations;
};

// =============================================================================
// WEATHER
// =============================================================================

export type Weather = {
  type: string;
  startTime: number;
  endTime: number;
} | null;

// =============================================================================
// QUINOA DATA (main game state)
// =============================================================================

export type QuinoaData = {
  currentTime: number;
  shops: Shops;
  weather: Weather;
  userSlots: (UserSlot | null)[];
  spectators: PlayerId[];
};

// =============================================================================
// ACTION TYPES
// =============================================================================

export type ActionType =
  | "idle"
  | "walk"
  | "plant"
  | "water"
  | "harvest"
  | "pet"
  | "feed"
  | "sell"
  | "buy"
  | "placeDecor"
  | "removeDecor"
  | null;

export type PlayerAction = {
  type: ActionType;
  timestamp: number;
  data?: unknown;
};

// =============================================================================
// AVATAR ANIMATION
// =============================================================================

export type AvatarTriggerAnimation = {
  playerId: PlayerId;
  animation: string;
};

// =============================================================================
// LEGACY ALIASES (for backward compatibility)
// =============================================================================

/** @deprecated Use CropInventoryItem */
export type CropItem = CropInventoryItem;
/** @deprecated Use SeedInventoryItem */
export type SeedItem = SeedInventoryItem;
/** @deprecated Use ToolInventoryItem */
export type ToolItem = ToolInventoryItem;
/** @deprecated Use EggInventoryItem */
export type EggItem = EggInventoryItem;
/** @deprecated Use DecorInventoryItem */
export type DecorItem = DecorInventoryItem;
/** @deprecated Use GridPosition */
export type XY = GridPosition;
/** @deprecated Use Garden */
export type GardenState = Garden;
/** @deprecated Use GardenTileObject */
export type CurrentGardenObject = GardenTileObject | null;
/** @deprecated Use PetInfo[] */
export type PetState = PetInfo[] | null;

export type CropInventoryState = CropInventoryItem[] | null;
export type SeedInventoryState = SeedInventoryItem[] | null;
export type ToolInventoryState = ToolInventoryItem[] | null;
export type EggInventoryState = EggInventoryItem[] | null;
export type DecorInventoryState = DecorInventoryItem[] | null;
export type PetInventoryState = PetInventoryItem[] | null;
