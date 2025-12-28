import type { GrowSlot, GardenTileObject } from "../../atoms/types";

export type Unsubscribe = () => void;

export type GlobalVariable<T> = {
  get(): T;
  subscribe(callback: (value: T, prev: T) => void): Unsubscribe;
  destroy(): void;
};

export type TilePosition = {
  globalIndex: number | null;
  localIndex: number | null;
};

export type TileInfo = {
  type: string | null;
  isEmpty: boolean;
};

export type GardenContext = {
  name: string | null;
  isOwner: boolean;
  playerSlotIndex: number | null;
};

export type TileObject = {
  type: "plant" | "egg" | "decor" | null;
  data: GardenTileObject | null;
  isMature: boolean;
};

export type PlantInfo = {
  species: string;
  slots: GrowSlot[];
  currentSlotIndex: number | null;
  sortedSlotIndices: number[];
  nextHarvestSlotIndex: number | null;
};

export type CurrentTileData = {
  position: TilePosition;
  tile: TileInfo;
  garden: GardenContext;
  object: TileObject;
  plant: PlantInfo | null;
};

export type ObjectChange = {
  current: TileObject;
  previous: TileObject;
};

export type PlantInfoChange = {
  current: PlantInfo | null;
  previous: PlantInfo | null;
};

export type GardenChange = {
  current: GardenContext;
  previous: GardenContext;
};

export type CurrentTileGlobal = CurrentTileData;

export type CurrentTileGlobalWithSubscriptions = {
  get(): CurrentTileData;
  subscribe(callback: (value: CurrentTileData, prev: CurrentTileData) => void): Unsubscribe;
  subscribeStable(callback: (value: CurrentTileData, prev: CurrentTileData) => void): Unsubscribe;
  subscribeObject(callback: (event: ObjectChange) => void): Unsubscribe;
  subscribePlantInfo(callback: (event: PlantInfoChange) => void): Unsubscribe;
  subscribeGarden(callback: (event: GardenChange) => void): Unsubscribe;
  destroy(): void;
};

export type AtomSources<T extends Record<string, unknown>> = {
  [K in keyof T]: string;
};

export type CombineFunction<TSources extends Record<string, unknown>, TResult> = (
  sources: TSources
) => TResult;

// =============================================================================
// MY PETS GLOBAL
// =============================================================================

export type PetLocation = "inventory" | "hutch" | "active";

export type PetAbilityTrigger = {
  abilityId: string | null;
  performedAt: number | null;
  data: unknown;
} | null;

export type UnifiedPet = {
  id: string;
  petSpecies: string;
  name: string | null;
  xp: number;
  hunger: number;
  mutations: string[];
  targetScale: number;
  abilities: string[];
  location: PetLocation;
  position: { x: number; y: number } | null;
  lastAbilityTrigger: PetAbilityTrigger;
};

export type MyPetsData = {
  all: UnifiedPet[];
  byLocation: {
    inventory: UnifiedPet[];
    hutch: UnifiedPet[];
    active: UnifiedPet[];
  };
  counts: {
    inventory: number;
    hutch: number;
    active: number;
    total: number;
  };
};

export type PetLocationChange = {
  pet: UnifiedPet;
  from: PetLocation;
  to: PetLocation;
};

export type PetAbilityEvent = {
  pet: UnifiedPet;
  trigger: NonNullable<PetAbilityTrigger>;
};

export type PetCountChange = {
  added: UnifiedPet[];
  removed: UnifiedPet[];
  counts: MyPetsData["counts"];
};

export type MyPetsGlobal = {
  get(): MyPetsData;
  subscribe(callback: (value: MyPetsData, prev: MyPetsData) => void): Unsubscribe;
  subscribeStable(callback: (value: MyPetsData, prev: MyPetsData) => void): Unsubscribe;
  subscribeLocation(callback: (event: PetLocationChange) => void): Unsubscribe;
  subscribeAbility(callback: (event: PetAbilityEvent) => void): Unsubscribe;
  subscribeCount(callback: (event: PetCountChange) => void): Unsubscribe;
  destroy(): void;
};

// =============================================================================
// GAME MAP GLOBAL
// =============================================================================

export type XY = { x: number; y: number };

export type MapTile = {
  globalIndex: number;
  localIndex: number;
  position: XY;
};

export type UserSlotTiles = {
  userSlotIdx: number;
  dirtTiles: MapTile[];
  boardwalkTiles: MapTile[];
  allTiles: MapTile[];
};

export type MapLocation = {
  name: string;
  spawnTiles: number[];
  spawnPositions: XY[];
};

export type GameMapData = {
  cols: number;
  rows: number;
  totalTiles: number;
  tileSize: number;
  spawnTiles: number[];
  spawnPositions: XY[];
  locations: Record<string, MapLocation>;
  userSlots: UserSlotTiles[];

  globalToXY(globalIndex: number): XY;
  xyToGlobal(x: number, y: number): number;
  getTileOwner(globalIndex: number): number | null;
  isDirtTile(globalIndex: number): boolean;
  isBoardwalkTile(globalIndex: number): boolean;
};

export type GameMapGlobal = {
  get(): GameMapData | null;
  isReady(): boolean;
  onReady(callback: (data: GameMapData) => void): Unsubscribe;
  destroy(): void;
};

// =============================================================================
// MY INVENTORY GLOBAL
// =============================================================================

import type { InventoryItem } from "../../atoms/types";

export type SelectedItem = {
  index: number;
  item: InventoryItem;
} | null;

export type MyInventoryData = {
  items: InventoryItem[];
  favoritedItemIds: string[];
  count: number;
  isFull: boolean;
  selectedItem: SelectedItem;
};

export type SelectedItemChange = {
  current: SelectedItem;
  previous: SelectedItem;
};

export type InventoryItemsChange = {
  added: InventoryItem[];
  removed: InventoryItem[];
  counts: { before: number; after: number };
};

export type FavoritesChange = {
  added: string[];
  removed: string[];
  current: string[];
};

export type MyInventoryGlobal = {
  get(): MyInventoryData;
  subscribe(callback: (value: MyInventoryData, prev: MyInventoryData) => void): Unsubscribe;
  subscribeStable(callback: (value: MyInventoryData, prev: MyInventoryData) => void): Unsubscribe;
  subscribeSelection(callback: (event: SelectedItemChange) => void): Unsubscribe;
  subscribeItems(callback: (event: InventoryItemsChange) => void): Unsubscribe;
  subscribeFavorites(callback: (event: FavoritesChange) => void): Unsubscribe;
  destroy(): void;
};

// =============================================================================
// PLAYERS GLOBAL
// =============================================================================

export type PlayerLastAction = {
  type: string | null;
  data: unknown;
  timestamp: number | null;
};

export type Player = {
  // Identité
  id: string;
  name: string;
  discordId: string;
  discordAvatarUrl: string | null;
  guildId: string | null;

  // État
  isConnected: boolean;
  isHost: boolean;
  slotIndex: number | null;
  position: { x: number; y: number } | null;

  // Apparence
  cosmetic: {
    color: string;
    avatar: string[];
  };
  emote: {
    type: number;
  };

  // Économie
  coins: number;
  inventory: unknown;
  shopPurchases: unknown;

  // Jardin
  garden: unknown;

  // Pets
  pets: {
    slots: unknown[];
    slotInfos: unknown;
  };

  // Progression
  journal: unknown;
  stats: unknown;
  tasksCompleted: unknown[];
  activityLogs: unknown[];

  // Restocks personnalisés
  customRestocks: {
    config: unknown;
    inventories: unknown;
  };

  // Actions
  lastAction: PlayerLastAction | null;
  selectedItemIndex: number | null;
  lastSlotMachineInfo: unknown;
};

export type PlayersData = {
  all: Player[];
  host: Player | null;
  count: number;
};

export type PlayerJoinLeaveEvent = {
  player: Player;
  type: "join" | "leave";
};

export type PlayerConnectionChange = {
  player: Player;
  isConnected: boolean;
};

export type HostChange = {
  current: Player | null;
  previous: Player | null;
};

export type PlayersGlobal = {
  get(): PlayersData;
  subscribe(callback: (value: PlayersData, prev: PlayersData) => void): Unsubscribe;
  subscribeStable(callback: (value: PlayersData, prev: PlayersData) => void): Unsubscribe;
  subscribeJoinLeave(callback: (event: PlayerJoinLeaveEvent) => void): Unsubscribe;
  subscribeConnection(callback: (event: PlayerConnectionChange) => void): Unsubscribe;
  subscribeHost(callback: (event: HostChange) => void): Unsubscribe;
  destroy(): void;
};

// =============================================================================
// SHOPS GLOBAL
// =============================================================================

export type ShopType = "seed" | "tool" | "egg" | "decor";

export type ShopItem = {
  id: string;
  itemType: string;
  initialStock: number;
  purchased: number;
  remaining: number;
  isAvailable: boolean;
};

export type Shop = {
  type: ShopType;
  items: ShopItem[];
  availableCount: number;
  totalCount: number;
  secondsUntilRestock: number;
  restockAt: number | null;
};

export type ShopsData = {
  all: Shop[];
  byType: Record<ShopType, Shop>;
  nextRestock: {
    shop: ShopType;
    seconds: number;
    at: number;
  } | null;
};

export type ShopRestockEvent = {
  shop: Shop;
  previousItems: ShopItem[];
};

export type ShopPurchaseEvent = {
  shopType: ShopType;
  itemId: string;
  quantity: number;
  newPurchased: number;
  remaining: number;
};

export type ShopAvailabilityChange = {
  shopType: ShopType;
  itemId: string;
  wasAvailable: boolean;
  isAvailable: boolean;
};

export type ShopsGlobal = {
  get(): ShopsData;
  getShop(type: ShopType): Shop;
  getItem(shopType: ShopType, itemId: string): ShopItem | null;

  subscribe(callback: (value: ShopsData, prev: ShopsData) => void): Unsubscribe;
  subscribeStable(callback: (value: ShopsData, prev: ShopsData) => void): Unsubscribe;

  subscribeSeedRestock(callback: (event: ShopRestockEvent) => void): Unsubscribe;
  subscribeToolRestock(callback: (event: ShopRestockEvent) => void): Unsubscribe;
  subscribeEggRestock(callback: (event: ShopRestockEvent) => void): Unsubscribe;
  subscribeDecorRestock(callback: (event: ShopRestockEvent) => void): Unsubscribe;

  subscribePurchase(callback: (event: ShopPurchaseEvent) => void): Unsubscribe;
  subscribeAvailability(callback: (event: ShopAvailabilityChange) => void): Unsubscribe;

  destroy(): void;
};
