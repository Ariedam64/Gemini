// src/atoms/index.ts
// Public API for atoms module

// =============================================================================
// TYPES
// =============================================================================

export type {
  // Core types
  Unsubscribe,
  Path,
  PlayerId,
  GridPosition,
  View,

  // Enums
  ItemType,
  Currency,
  DecorRotation,
  Direction,
  QuinoaModal,
  ActionType,

  // Inventory items
  CropInventoryItem,
  SeedInventoryItem,
  ToolInventoryItem,
  PlantInventoryItem,
  EggInventoryItem,
  PetInventoryItem,
  DecorInventoryItem,
  InventoryItem,
  Inventory,
  ItemStorage,

  // Pet types
  PetSlot,
  PetInfo,
  PetSlotInfo,

  // Garden types
  GrowSlot,
  PlantTileObject,
  EggTileObject,
  DecorTileObject,
  GardenTileObject,
  Garden,

  // Shop types
  ShopInventoryItem,
  Shop,
  Shops,
  ShopPurchase,
  ShopPurchases,

  // Player types
  UserSlot,
  PlayerData,
  AvatarData,
  PlayerEmoteData,
  Journal,
  PlayerStats,

  // Map types
  MapLocation,
  MapLocations,
  GameMap,

  // Weather
  Weather,

  // Game state
  QuinoaData,
  PlayerAction,
  AvatarTriggerAnimation,

  // Legacy aliases (deprecated)
  CropItem,
  SeedItem,
  ToolItem,
  EggItem,
  DecorItem,
  XY,
  GardenState,
  CurrentGardenObject,
  PetState,
  CropInventoryState,
  SeedInventoryState,
  ToolInventoryState,
  EggInventoryState,
  DecorInventoryState,
  PetInventoryState,
} from "./types";

// =============================================================================
// STORE FACADE
// =============================================================================

export { Store, prewarm, waitForStore } from "./store";
export { installReactDevToolsHook } from "./core/bridge";

// =============================================================================
// CORE UTILITIES
// =============================================================================

export { makeAtom, makeView } from "./core/view";
export { sig, createSignatureChannel } from "./core/signature";
export type { SignatureChannel, SignatureOptions } from "./core/signature";
export { getAtPath, setAtPath, toPathArray, Equality } from "./core/utils";
export { getAtomByLabel, findAtomsByLabel, getAtomCache, clearLabelCache } from "./core/lookup";

// =============================================================================
// ALL ATOMS
// =============================================================================

export {
  // Position & Movement
  positionAtom,
  lastPositionInMyGardenAtom,
  playerDirectionAtom,

  // Core State
  stateAtom,
  quinoaDataAtom,
  currentTimeAtom,
  actionAtom,
  isPressAndHoldActionAtom,

  // Map
  mapAtom,
  tileSizeAtom,
  mapColsView,
  mapRowsView,
  mapSpawnTilesView,
  mapSeedShopSpawnLocation,
  mapEggShopSpawnLocation,
  mapToolShopSpawnLocation,
  mapDecorShopSpawnLocation,
  mapSellCropsShopSpawnLocation,
  mapSellPetShopSpawnLocation,
  mapCollectorsClubSpawnLocation,
  mapWishingWellSpawnLocation,
  mapShopsCenterSpawnLocation,

  // Player
  playerAtom,
  myDataAtom,
  myUserSlotIdxAtom,
  isSpectatingAtom,
  myCoinsCountAtom,
  numPlayersAtom,
  playerIdView,
  activityLogsView,

  // User Slots
  userSlotsAtom,
  filteredUserSlotsAtom,
  myUserSlotAtom,
  spectatorsAtom,
  stateChildView,
  stateChildDataView,
  stateShopsView,
  stateUserSlotsView,
  statePlayersView,
  stateHostPlayerIdView,

  // Inventory
  myInventoryAtom,
  myInventoryItemsAtom,
  isMyInventoryAtMaxLengthAtom,
  myFavoritedItemIdsAtom,
  myCropInventoryAtom,
  mySeedInventoryAtom,
  myToolInventoryAtom,
  myEggInventoryAtom,
  myDecorInventoryAtom,
  myPetInventoryAtom,
  favoriteIdsView,
  itemTypeFiltersAtom,
  myItemStoragesAtom,
  myPetHutchStoragesAtom,
  myPetHutchItemsAtom,
  myPetHutchPetItemsAtom,
  myNumPetHutchItemsAtom,

  // Selection
  myValidatedSelectedItemIndexAtom,
  isSelectedItemAtomSuspendedAtom,
  mySelectedItemAtom,
  mySelectedItemNameAtom,
  mySelectedItemRotationsAtom,
  mySelectedItemRotationAtom,
  setSelectedIndexToEndAtom,
  myPossiblyNoLongerValidSelectedItemIndexAtom,

  // Garden
  myCurrentGlobalTileIndexAtom,
  myCurrentGardenTileAtom,
  myCurrentGardenObjectAtom,
  myOwnCurrentGardenObjectAtom,
  myOwnCurrentDirtTileIndexAtom,
  myCurrentGardenObjectNameAtom,
  isInMyGardenAtom,
  myGardenBoardwalkTileObjectsAtom,
  gardenView,
  gardenTileObjectsView,
  myOwnCurrentGardenObjectTypeView,
  myCurrentStablePlantObjectInfoAtom,
  myCurrentSortedGrowSlotIndicesAtom,
  myCurrentGrowSlotIndexAtom,
  myCurrentGrowSlotsAtom,
  myCurrentGrowSlotAtom,
  secondsUntilCurrentGrowSlotMaturesAtom,
  isCurrentGrowSlotMatureAtom,
  numGrowSlotsAtom,
  myCurrentEggAtom,

  // Pets
  petInfosAtom,
  myPetInfosAtom,
  myPetSlotInfosAtom,
  myPrimitivePetSlotsAtom,
  myNonPrimitivePetSlotsAtom,
  expandedPetSlotIdAtom,
  myPetsProgressAtom,
  myActiveCropMutationPetsAtom,
  totalPetSellPriceAtom,
  selectedPetHasNewVariantsAtom,

  // Shops
  shopsAtom,
  myShopPurchasesAtom,
  seedShopAtom,
  seedShopInventoryAtom,
  seedShopRestockSecondsAtom,
  seedShopCustomRestockInventoryAtom,
  eggShopAtom,
  eggShopInventoryAtom,
  eggShopRestockSecondsAtom,
  eggShopCustomRestockInventoryAtom,
  toolShopAtom,
  toolShopInventoryAtom,
  toolShopRestockSecondsAtom,
  toolShopCustomRestockInventoryAtom,
  decorShopAtom,
  decorShopInventoryAtom,
  decorShopRestockSecondsAtom,
  decorShopCustomRestockInventoryAtom,
  isDecorShopAboutToRestockAtom,
  seedShopView,
  toolShopView,
  eggShopView,
  decorShopView,

  // Crops & Selling
  myCropItemsAtom,
  myCropItemsToSellAtom,
  totalCropSellPriceAtom,
  friendBonusMultiplierAtom,

  // Journal & Stats
  myJournalAtom,
  myCropJournalAtom,
  myPetJournalAtom,
  myStatsAtom,
  myActivityLogsAtom,
  newLogsAtom,
  hasNewLogsAtom,
  newCropLogsFromSellingAtom,
  hasNewCropLogsFromSellingAtom,

  // Tasks
  myCompletedTasksAtom,
  myActiveTasksAtom,
  isWelcomeToastVisibleAtom,
  shouldCloseWelcomeToastAtom,
  isInitialMoveToDirtPatchToastVisibleAtom,
  isFirstPlantSeedActiveAtom,
  isThirdSeedPlantActiveAtom,
  isThirdSeedPlantCompletedAtom,
  isDemoTouchpadVisibleAtom,
  areShopAnnouncersEnabledAtom,
  arePresentablesEnabledAtom,
  isEmptyDirtTileHighlightedAtom,
  isPlantTileHighlightedAtom,
  isItemHighlightedInHotbarAtom,
  isItemHighlightedInModalAtom,
  isMyGardenButtonHighlightedAtom,
  isSellButtonHighlightedAtom,
  isShopButtonHighlightedAtom,
  isInstaGrowButtonHiddenAtom,
  isActionButtonHighlightedAtom,
  isGardenItemInfoCardHiddenAtom,
  isSeedPurchaseButtonHighlightedAtom,
  isFirstSeedPurchaseActiveAtom,
  isFirstCropHarvestActiveAtom,
  isWeatherStatusHighlightedAtom,

  // Weather
  weatherAtom,

  // UI / Modals
  activeModalAtom,
  hotkeyBeingPressedAtom,

  // Avatars & Animations
  avatarTriggerAnimationAtom,
  avatarDataAtom,
  emoteDataAtom,

  // Other Players
  otherUserSlotsAtom,
  otherPlayerPositionsAtom,
  otherPlayerSelectedItemsAtom,
  otherPlayerLastActionsAtom,

  // NPC
  traderBunnyPlayerIdAtom,
  npcPlayersAtom,
  npcQuinoaUsersAtom,
  numNpcAvatarsAtom,
  traderBunnyEmoteTimeoutAtom,
  traderBunnyEmoteAtom,

  // Leaderboard
  unsortedLeaderboardAtom,
  currentGardenNameAtom,

  // Engine & Performance
  quinoaEngineAtom,
  quinoaInitializationErrorAtom,
  avgPingAtom,
  serverClientTimeOffsetAtom,

  // Establishing Shot
  isEstablishingShotRunningAtom,
  isEstablishingShotCompleteAtom,
} from "./atoms";
