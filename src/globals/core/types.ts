import type { GrowSlot, GardenTileObject } from "../../atoms/types";

export type Unsubscribe = () => void;

export type SubscribeOptions = {
  immediate?: boolean;
};

export type GlobalVariable<T> = {
  get(): T;
  subscribe(callback: (value: T, prev: T) => void, options?: SubscribeOptions): Unsubscribe;
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
  subscribe(callback: (value: CurrentTileData, prev: CurrentTileData) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeStable(callback: (value: CurrentTileData, prev: CurrentTileData) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeObject(callback: (event: ObjectChange) => void, options?: SubscribeOptions): Unsubscribe;
  subscribePlantInfo(callback: (event: PlantInfoChange) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeGarden(callback: (event: GardenChange) => void, options?: SubscribeOptions): Unsubscribe;
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
  hungerPercent: number;
  mutations: string[];
  targetScale: number;
  abilities: string[];
  location: PetLocation;
  position: { x: number; y: number } | null;
  lastAbilityTrigger: PetAbilityTrigger;
  growthStage: number;
  currentStrength: number;
  maxStrength: number;
  isMature: boolean;
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
  hutch: {
    hasHutch: boolean;
    currentItems: number;
    maxItems: number;
  };
  expandedPetSlotId: string | null;
  expandedPet: UnifiedPet | null;
  abilityLogs: AbilityLog[];
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

export type AbilityLog = {
  petId: string;
  petName: string;
  petSpecies: string;
  abilityId: string;
  data: unknown;
  performedAt: number;
};

export type PetCountChange = {
  added: UnifiedPet[];
  removed: UnifiedPet[];
  counts: MyPetsData["counts"];
};

export type ExpandedPetChange = {
  current: UnifiedPet | null;
  previous: UnifiedPet | null;
  currentId: string | null;
  previousId: string | null;
};

export type PetGrowthEvent = {
  pet: UnifiedPet;
  previousStage: number;
  newStage: number;
};

export type PetStrengthGainEvent = {
  pet: UnifiedPet;
  previousStrength: number;
  newStrength: number;
};

export type PetMaxStrengthEvent = {
  pet: UnifiedPet;
};

export type MyPetsGlobal = {
  get(): MyPetsData;
  subscribe(callback: (value: MyPetsData, prev: MyPetsData) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeStable(callback: (value: MyPetsData, prev: MyPetsData) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeLocation(callback: (event: PetLocationChange) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeAbility(callback: (event: PetAbilityEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeCount(callback: (event: PetCountChange) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeExpandedPet(callback: (event: ExpandedPetChange) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeGrowth(callback: (event: PetGrowthEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeStrengthGain(callback: (event: PetStrengthGainEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeMaxStrength(callback: (event: PetMaxStrengthEvent) => void, options?: SubscribeOptions): Unsubscribe;
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
  onReady(callback: (data: GameMapData) => void, options?: SubscribeOptions): Unsubscribe;
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
  subscribe(callback: (value: MyInventoryData, prev: MyInventoryData) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeStable(callback: (value: MyInventoryData, prev: MyInventoryData) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeSelection(callback: (event: SelectedItemChange) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeItems(callback: (event: InventoryItemsChange) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeFavorites(callback: (event: FavoritesChange) => void, options?: SubscribeOptions): Unsubscribe;
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
  myPlayer: Player | null;
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
  subscribe(callback: (value: PlayersData, prev: PlayersData) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeStable(callback: (value: PlayersData, prev: PlayersData) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeJoinLeave(callback: (event: PlayerJoinLeaveEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeConnection(callback: (event: PlayerConnectionChange) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeHost(callback: (event: HostChange) => void, options?: SubscribeOptions): Unsubscribe;
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

  subscribe(callback: (value: ShopsData, prev: ShopsData) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeStable(callback: (value: ShopsData, prev: ShopsData) => void, options?: SubscribeOptions): Unsubscribe;

  subscribeSeedRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeToolRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeEggRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeDecorRestock(callback: (event: ShopRestockEvent) => void, options?: SubscribeOptions): Unsubscribe;

  subscribePurchase(callback: (event: ShopPurchaseEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeAvailability(callback: (event: ShopAvailabilityChange) => void, options?: SubscribeOptions): Unsubscribe;

  destroy(): void;
};

// =============================================================================
// WEATHER GLOBAL
// =============================================================================

export type WeatherData = {
  id: string;
  name: string;
  startTime: number | null;
  endTime: number | null;
  remainingSeconds: number;
};

export type WeatherChangeEvent = {
  current: WeatherData;
  previous: WeatherData;
};

export type WeatherGlobal = {
  get(): WeatherData;
  subscribe(callback: (value: WeatherData, prev: WeatherData) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeStable(callback: (event: WeatherChangeEvent) => void, options?: SubscribeOptions): Unsubscribe;
  destroy(): void;
};

// =============================================================================
// SELL INFO GLOBAL
// =============================================================================

export type SellLogEntry = {
  species: string;
  quantity: number;
  price: number;
  timestamp: number;
};

export type NewVariants = Record<string, string[]>;

export type PendingLogs = {
  crops: {
    all: NewVariants;
    fromSelling: NewVariants;
  };
  pets: {
    variants: NewVariants;
    abilities: NewVariants;
  };
  hasPending: boolean;
  totalCount: number;
};

export type SellInfoData = {
  totalPrice: number;
  friendBonus: number;
  hasNewLogs: boolean;
  recentLogs: SellLogEntry[];
  pendingLogs: PendingLogs;
};

export type SellEvent = {
  logs: SellLogEntry[];
  totalPrice: number;
};

export type NewLogsEvent = {
  pendingLogs: PendingLogs;
  previous: PendingLogs;
};

export type SellInfoGlobal = {
  get(): SellInfoData;
  subscribe(callback: (value: SellInfoData, prev: SellInfoData) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeSell(callback: (event: SellEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeNewLogs(callback: (event: NewLogsEvent) => void, options?: SubscribeOptions): Unsubscribe;
  destroy(): void;
};

// =============================================================================
// MY GARDEN GLOBAL
// =============================================================================

import type { Garden, DecorRotation } from "../../atoms/types";

export type TileIndex = string;

export type MutationId = string;

export type PlantWithTile = {
  tileIndex: TileIndex;
  position: XY;
  species: string;
  plantedAt: number;
  maturedAt: number;
  isMature: boolean;
  slots: GrowSlot[];
  slotsCount: number;
  matureSlotsCount: number;
};

export type CropInfo = {
  tileIndex: TileIndex;
  position: XY;
  slotIndex: number;
  species: string;
  startTime: number;
  endTime: number;
  targetScale: number;
  mutations: string[];
  isMature: boolean;
};

export type EggWithTile = {
  tileIndex: TileIndex;
  position: XY;
  eggId: string;
  plantedAt: number;
  maturedAt: number;
  isMature: boolean;
};

export type DecorWithTile = {
  tileIndex: TileIndex;
  position: XY;
  decorId: string;
  rotation: DecorRotation;
  location: "tileObjects" | "boardwalk";
};

export type MyGardenData = {
  garden: Garden | null;
  mySlotIndex: number | null;

  plants: {
    all: PlantWithTile[];
    mature: PlantWithTile[];
    growing: PlantWithTile[];
    bySpecies: Record<string, PlantWithTile[]>;
    count: number;
  };

  crops: {
    all: CropInfo[];
    mature: CropInfo[];
    growing: CropInfo[];
    mutated: {
      all: CropInfo[];
      byMutation: Record<string, CropInfo[]>;
    };
  };

  eggs: {
    all: EggWithTile[];
    mature: EggWithTile[];
    growing: EggWithTile[];
    byType: Record<string, EggWithTile[]>;
    count: number;
  };

  decors: {
    tileObjects: DecorWithTile[];
    boardwalk: DecorWithTile[];
    all: DecorWithTile[];
    byType: Record<string, DecorWithTile[]>;
    count: number;
  };

  tiles: {
    tileObjects: MapTile[];
    boardwalk: MapTile[];
    empty: {
      tileObjects: MapTile[];
      boardwalk: MapTile[];
    };
  };

  counts: {
    plants: number;
    maturePlants: number;
    crops: number;
    matureCrops: number;
    eggs: number;
    matureEggs: number;
    decors: number;
    emptyTileObjects: number;
    emptyBoardwalk: number;
  };
};

export type PlantAddedEvent = { plant: PlantWithTile };
export type PlantRemovedEvent = { plant: PlantWithTile; tileIndex: TileIndex };
export type PlantMaturedEvent = { plant: PlantWithTile };

export type CropMutatedEvent = {
  crop: CropInfo;
  added: MutationId[];
  removed: MutationId[];
};
export type CropMaturedEvent = { crop: CropInfo };
export type CropHarvestedEvent = { crop: CropInfo; remainingSlots: number };

export type EggPlacedEvent = { egg: EggWithTile };
export type EggRemovedEvent = { egg: EggWithTile };
export type EggMaturedEvent = { egg: EggWithTile };

export type DecorPlacedEvent = { decor: DecorWithTile };
export type DecorRemovedEvent = { decor: DecorWithTile };

export type MyGardenGlobal = {
  get(): MyGardenData;

  subscribe(callback: (value: MyGardenData, prev: MyGardenData) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeStable(callback: (value: MyGardenData, prev: MyGardenData) => void, options?: SubscribeOptions): Unsubscribe;

  subscribePlantAdded(callback: (event: PlantAddedEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribePlantRemoved(callback: (event: PlantRemovedEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribePlantMatured(callback: (event: PlantMaturedEvent) => void, options?: SubscribeOptions): Unsubscribe;

  subscribeCropMutated(callback: (event: CropMutatedEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeCropMatured(callback: (event: CropMaturedEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeCropHarvested(callback: (event: CropHarvestedEvent) => void, options?: SubscribeOptions): Unsubscribe;

  subscribeEggPlaced(callback: (event: EggPlacedEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeEggRemoved(callback: (event: EggRemovedEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeEggMatured(callback: (event: EggMaturedEvent) => void, options?: SubscribeOptions): Unsubscribe;

  subscribeDecorPlaced(callback: (event: DecorPlacedEvent) => void, options?: SubscribeOptions): Unsubscribe;
  subscribeDecorRemoved(callback: (event: DecorRemovedEvent) => void, options?: SubscribeOptions): Unsubscribe;

  destroy(): void;
};
