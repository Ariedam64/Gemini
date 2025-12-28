// src/atoms/atoms.ts
// All atom definitions with strict types

import { makeAtom, makeView } from "./core/view";
import type {
  GridPosition,
  PlayerId,
  Direction,
  QuinoaModal,
  QuinoaData,
  PlayerData,
  Garden,
  GardenTileObject,
  GrowSlot,
  Inventory,
  InventoryItem,
  CropInventoryItem,
  SeedInventoryItem,
  ToolInventoryItem,
  EggInventoryItem,
  DecorInventoryItem,
  PetInventoryItem,
  PetInfo,
  PetSlot,
  PetSlotInfo,
  Shops,
  Shop,
  ShopPurchases,
  UserSlot,
  GameMap,
  Weather,
  ActionType,
  AvatarTriggerAnimation,
  AvatarData,
  PlayerEmoteData,
  Journal,
  PlayerStats,
} from "./types";

// =============================================================================
// POSITION & MOVEMENT
// =============================================================================

export const positionAtom = makeAtom<GridPosition | null>("positionAtom");
export const lastPositionInMyGardenAtom = makeAtom<GridPosition | null>("lastPositionInMyGardenAtom");
export const playerDirectionAtom = makeAtom<Direction>("playerDirectionAtom");

// =============================================================================
// CORE STATE
// =============================================================================

export const stateAtom = makeAtom<unknown>("stateAtom");
export const quinoaDataAtom = makeAtom<QuinoaData | null>("quinoaDataAtom");
export const currentTimeAtom = makeAtom<number>("currentTimeAtom");
export const actionAtom = makeAtom<ActionType>("actionAtom");
export const isPressAndHoldActionAtom = makeAtom<boolean>("isPressAndHoldActionAtom");

// =============================================================================
// MAP
// =============================================================================

export const mapAtom = makeAtom<GameMap | null>("mapAtom");
export const tileSizeAtom = makeAtom<number>("tileSizeAtom");

// Derived map views
export const mapColsView = makeView<GameMap | null, number>("mapAtom", { path: "cols" });
export const mapRowsView = makeView<GameMap | null, number>("mapAtom", { path: "rows" });
export const mapSpawnTilesView = makeView<GameMap | null, number[]>("mapAtom", { path: "spawnTiles" });

// Map location views
export const mapSeedShopSpawnLocation = makeView<GameMap | null, number[]>("mapAtom", {
  path: "locations.seedShop.spawnTileIdx",
});
export const mapEggShopSpawnLocation = makeView<GameMap | null, number[]>("mapAtom", {
  path: "locations.eggShop.spawnTileIdx",
});
export const mapToolShopSpawnLocation = makeView<GameMap | null, number[]>("mapAtom", {
  path: "locations.toolShop.spawnTileIdx",
});
export const mapDecorShopSpawnLocation = makeView<GameMap | null, number[]>("mapAtom", {
  path: "locations.decorShop.spawnTileIdx",
});
export const mapSellCropsShopSpawnLocation = makeView<GameMap | null, number[]>("mapAtom", {
  path: "locations.sellCropsShop.spawnTileIdx",
});
export const mapSellPetShopSpawnLocation = makeView<GameMap | null, number[]>("mapAtom", {
  path: "locations.sellPetShop.spawnTileIdx",
});
export const mapCollectorsClubSpawnLocation = makeView<GameMap | null, number[]>("mapAtom", {
  path: "locations.collectorsClub.spawnTileIdx",
});
export const mapWishingWellSpawnLocation = makeView<GameMap | null, number[]>("mapAtom", {
  path: "locations.wishingWell.spawnTileIdx",
});
export const mapShopsCenterSpawnLocation = makeView<GameMap | null, number[]>("mapAtom", {
  path: "locations.shopsCenter.spawnTileIdx",
});

// =============================================================================
// PLAYER
// =============================================================================

export const playerAtom = makeAtom<PlayerData | null>("playerAtom");
export const myDataAtom = makeAtom<PlayerData | null>("myDataAtom");
export const myUserSlotIdxAtom = makeAtom<number | null>("myUserSlotIdxAtom");
export const isSpectatingAtom = makeAtom<boolean>("isSpectatingAtom");
export const myCoinsCountAtom = makeAtom<number>("myCoinsCountAtom");
export const numPlayersAtom = makeAtom<number>("numPlayersAtom");

// Derived player views
export const playerIdView = makeView<PlayerData | null, PlayerId | null>("playerAtom", { path: "id" });

// =============================================================================
// USER SLOTS
// =============================================================================

export const userSlotsAtom = makeAtom<(UserSlot | null)[]>("userSlotsAtom");
export const filteredUserSlotsAtom = makeAtom<UserSlot[]>("filteredUserSlotsAtom");
export const myUserSlotAtom = makeAtom<UserSlot | null>("myUserSlotAtom");
export const spectatorsAtom = makeAtom<PlayerId[]>("spectatorsAtom");

// State derived views
export const stateChildView = makeView<unknown, unknown>("stateAtom", { path: "child" });
export const stateChildDataView = makeView<unknown, unknown>("stateAtom", { path: "child.data" });
export const stateShopsView = makeView<unknown, Shops | null>("stateAtom", { path: "child.data.shops" });
export const stateUserSlotsView = makeView<unknown, (UserSlot | null)[]>("stateAtom", { path: "child.data.userSlots" });
export const statePlayersView = makeView<unknown, unknown[]>("stateAtom", { path: "data.players" });
export const stateHostPlayerIdView = makeView<unknown, string>("stateAtom", { path: "data.hostPlayerId" });

// =============================================================================
// INVENTORY
// =============================================================================

export const myInventoryAtom = makeAtom<Inventory | null>("myInventoryAtom");
export const myInventoryItemsAtom = makeAtom<InventoryItem[]>("myInventoryItemsAtom");
export const isMyInventoryAtMaxLengthAtom = makeAtom<boolean>("isMyInventoryAtMaxLengthAtom");
export const myFavoritedItemIdsAtom = makeAtom<string[]>("myFavoritedItemIdsAtom");

// Typed inventory atoms
export const myCropInventoryAtom = makeAtom<CropInventoryItem[]>("myCropInventoryAtom");
export const mySeedInventoryAtom = makeAtom<SeedInventoryItem[]>("mySeedInventoryAtom");
export const myToolInventoryAtom = makeAtom<ToolInventoryItem[]>("myToolInventoryAtom");
export const myEggInventoryAtom = makeAtom<EggInventoryItem[]>("myEggInventoryAtom");
export const myDecorInventoryAtom = makeAtom<DecorInventoryItem[]>("myDecorInventoryAtom");
export const myPetInventoryAtom = makeAtom<PetInventoryItem[]>("myPetInventoryAtom");

// Inventory derived views
export const favoriteIdsView = makeView<Inventory | null, string[]>("myInventoryAtom", {
  path: "favoritedItemIds",
});

// Item filters
export const itemTypeFiltersAtom = makeAtom<Set<string>>("itemTypeFiltersAtom");

// Item storages
export const myItemStoragesAtom = makeAtom<unknown[]>("myItemStoragesAtom");
export const myPetHutchStoragesAtom = makeAtom<unknown[]>("myPetHutchStoragesAtom");
export const myPetHutchItemsAtom = makeAtom<unknown[]>("myPetHutchItemsAtom");
export const myPetHutchPetItemsAtom = makeAtom<PetInventoryItem[]>("myPetHutchPetItemsAtom");
export const myNumPetHutchItemsAtom = makeAtom<number>("myNumPetHutchItemsAtom");

// =============================================================================
// SELECTION
// =============================================================================

export const myValidatedSelectedItemIndexAtom = makeAtom<number | null>("myValidatedSelectedItemIndexAtom");
export const isSelectedItemAtomSuspendedAtom = makeAtom<Record<PlayerId, boolean>>("isSelectedItemAtomSuspended");
export const mySelectedItemAtom = makeAtom<InventoryItem | null>("mySelectedItemAtom");
export const mySelectedItemNameAtom = makeAtom<string>("mySelectedItemNameAtom");
export const mySelectedItemRotationsAtom = makeAtom<number[] | null>("mySelectedItemRotationsAtom");
export const mySelectedItemRotationAtom = makeAtom<number>("mySelectedItemRotationAtom");
export const setSelectedIndexToEndAtom = makeAtom<number | null>("setSelectedIndexToEndAtom");
export const myPossiblyNoLongerValidSelectedItemIndexAtom = makeAtom<number | null>("myPossiblyNoLongerValidSelectedItemIndexAtom");

// =============================================================================
// GARDEN
// =============================================================================

export const myCurrentGlobalTileIndexAtom = makeAtom<number | null>("myCurrentGlobalTileIndexAtom");
export const myCurrentGardenTileAtom = makeAtom<unknown>("myCurrentGardenTileAtom");
export const myCurrentGardenObjectAtom = makeAtom<GardenTileObject | null>("myCurrentGardenObjectAtom");
export const myOwnCurrentGardenObjectAtom = makeAtom<GardenTileObject | null>("myOwnCurrentGardenObjectAtom");
export const myOwnCurrentDirtTileIndexAtom = makeAtom<number | null>("myOwnCurrentDirtTileIndexAtom");
export const myCurrentGardenObjectNameAtom = makeAtom<string>("myCurrentGardenObjectNameAtom");
export const isInMyGardenAtom = makeAtom<boolean>("isInMyGardenAtom");
export const myGardenBoardwalkTileObjectsAtom = makeAtom<Record<string, unknown>>("myGardenBoardwalkTileObjectsAtom");

// Garden derived views
export const gardenView = makeView<PlayerData | null, Garden | null>("myDataAtom", { path: "garden" });
export const gardenTileObjectsView = makeView<PlayerData | null, Record<string, GardenTileObject>>("myDataAtom", {
  path: "garden.tileObjects",
});
export const myOwnCurrentGardenObjectTypeView = makeView<GardenTileObject | null, string | null>(
  "myOwnCurrentGardenObjectAtom",
  { path: "objectType" }
);

// Grow slots
export const myCurrentStablePlantObjectInfoAtom = makeAtom<unknown>("myCurrentStablePlantObjectInfoAtom");
export const myCurrentSortedGrowSlotIndicesAtom = makeAtom<number[] | null>("myCurrentSortedGrowSlotIndicesAtom");
export const myCurrentGrowSlotIndexAtom = makeAtom<number | null>("myCurrentGrowSlotIndexAtom");
export const myCurrentGrowSlotsAtom = makeAtom<GrowSlot[] | null>("myCurrentGrowSlotsAtom");
export const myCurrentGrowSlotAtom = makeAtom<GrowSlot | null>("myCurrentGrowSlotAtom");
export const secondsUntilCurrentGrowSlotMaturesAtom = makeAtom<string>("secondsUntilCurrentGrowSlotMaturesAtom");
export const isCurrentGrowSlotMatureAtom = makeAtom<boolean>("isCurrentGrowSlotMatureAtom");
export const numGrowSlotsAtom = makeAtom<number>("numGrowSlotsAtom");

// Eggs
export const myCurrentEggAtom = makeAtom<unknown>("myCurrentEggAtom");

// =============================================================================
// PETS
// =============================================================================

export const petInfosAtom = makeAtom<PetInfo[]>("petInfosAtom");
export const myPetInfosAtom = makeAtom<PetInfo[]>("myPetInfosAtom");
export const myPetSlotInfosAtom = makeAtom<Record<string, PetSlotInfo>>("myPetSlotInfosAtom");
export const myPrimitivePetSlotsAtom = makeAtom<PetSlot[]>("myPrimitivePetSlotsAtom");
export const myNonPrimitivePetSlotsAtom = makeAtom<PetSlot[]>("myNonPrimitivePetSlotsAtom");
export const expandedPetSlotIdAtom = makeAtom<string | null>("expandedPetSlotIdAtom");
export const myPetsProgressAtom = makeAtom<Record<string, unknown>>("myPetsProgressAtom");
export const myActiveCropMutationPetsAtom = makeAtom<unknown>("myActiveCropMutationPetsAtom");
export const totalPetSellPriceAtom = makeAtom<number>("totalPetSellPriceAtom");
export const selectedPetHasNewVariantsAtom = makeAtom<boolean>("selectedPetHasNewVariantsAtom");

// =============================================================================
// SHOPS
// =============================================================================

export const shopsAtom = makeAtom<Shops | null>("shopsAtom");
export const myShopPurchasesAtom = makeAtom<ShopPurchases>("myShopPurchasesAtom");

// Individual shop atoms
export const seedShopAtom = makeAtom<Shop | null>("seedShopAtom");
export const seedShopInventoryAtom = makeAtom<unknown[]>("seedShopInventoryAtom");
export const seedShopRestockSecondsAtom = makeAtom<number>("seedShopRestockSecondsAtom");
export const seedShopCustomRestockInventoryAtom = makeAtom<unknown[]>("seedShopCustomRestockInventoryAtom");

export const eggShopAtom = makeAtom<Shop | null>("eggShopAtom");
export const eggShopInventoryAtom = makeAtom<unknown[]>("eggShopInventoryAtom");
export const eggShopRestockSecondsAtom = makeAtom<number>("eggShopRestockSecondsAtom");
export const eggShopCustomRestockInventoryAtom = makeAtom<unknown[]>("eggShopCustomRestockInventoryAtom");

export const toolShopAtom = makeAtom<Shop | null>("toolShopAtom");
export const toolShopInventoryAtom = makeAtom<unknown[]>("toolShopInventoryAtom");
export const toolShopRestockSecondsAtom = makeAtom<number>("toolShopRestockSecondsAtom");
export const toolShopCustomRestockInventoryAtom = makeAtom<unknown[]>("toolShopCustomRestockInventoryAtom");

export const decorShopAtom = makeAtom<Shop | null>("decorShopAtom");
export const decorShopInventoryAtom = makeAtom<unknown[]>("decorShopInventoryAtom");
export const decorShopRestockSecondsAtom = makeAtom<number>("decorShopRestockSecondsAtom");
export const decorShopCustomRestockInventoryAtom = makeAtom<unknown[]>("decorShopCustomRestockInventoryAtom");
export const isDecorShopAboutToRestockAtom = makeAtom<boolean>("isDecorShopAboutToRestockAtom");

// Shop derived views
export const seedShopView = makeView<Shops | null, Shop | null>("shopsAtom", { path: "seed" });
export const toolShopView = makeView<Shops | null, Shop | null>("shopsAtom", { path: "tool" });
export const eggShopView = makeView<Shops | null, Shop | null>("shopsAtom", { path: "egg" });
export const decorShopView = makeView<Shops | null, Shop | null>("shopsAtom", { path: "decor" });

// =============================================================================
// CROPS & SELLING
// =============================================================================

export const myCropItemsAtom = makeAtom<CropInventoryItem[]>("myCropItemsAtom");
export const myCropItemsToSellAtom = makeAtom<CropInventoryItem[]>("myCropItemsToSellAtom");
export const totalCropSellPriceAtom = makeAtom<number>("totalCropSellPriceAtom");
export const friendBonusMultiplierAtom = makeAtom<number>("friendBonusMultiplierAtom");

// =============================================================================
// JOURNAL & STATS
// =============================================================================

export const myJournalAtom = makeAtom<Journal | null>("myJournalAtom");
export const myCropJournalAtom = makeAtom<unknown>("myCropJournalAtom");
export const myPetJournalAtom = makeAtom<unknown>("myPetJournalAtom");
export const myStatsAtom = makeAtom<PlayerStats | null>("myStatsAtom");
export const myActivityLogsAtom = makeAtom<unknown[]>("myActivityLogsAtom");

// Logs
export const newLogsAtom = makeAtom<unknown[]>("newLogsAtom");
export const hasNewLogsAtom = makeAtom<boolean>("hasNewLogsAtom");
export const newCropLogsFromSellingAtom = makeAtom<unknown[]>("newCropLogsFromSellingAtom");
export const hasNewCropLogsFromSellingAtom = makeAtom<boolean>("hasNewCropLogsFromSellingAtom");

// =============================================================================
// TASKS
// =============================================================================

export const myCompletedTasksAtom = makeAtom<string[]>("myCompletedTasksAtom");
export const myActiveTasksAtom = makeAtom<string[]>("myActiveTasksAtom");

// Task UI atoms
export const isWelcomeToastVisibleAtom = makeAtom<boolean>("isWelcomeToastVisibleAtom");
export const shouldCloseWelcomeToastAtom = makeAtom<boolean>("shouldCloseWelcomeToastAtom");
export const isInitialMoveToDirtPatchToastVisibleAtom = makeAtom<boolean>("isInitialMoveToDirtPatchToastVisibleAtom");
export const isFirstPlantSeedActiveAtom = makeAtom<boolean>("isFirstPlantSeedActiveAtom");
export const isThirdSeedPlantActiveAtom = makeAtom<boolean>("isThirdSeedPlantActiveAtom");
export const isThirdSeedPlantCompletedAtom = makeAtom<boolean>("isThirdSeedPlantCompletedAtom");
export const isDemoTouchpadVisibleAtom = makeAtom<boolean>("isDemoTouchpadVisibleAtom");
export const areShopAnnouncersEnabledAtom = makeAtom<boolean>("areShopAnnouncersEnabledAtom");
export const arePresentablesEnabledAtom = makeAtom<boolean>("arePresentablesEnabledAtom");
export const isEmptyDirtTileHighlightedAtom = makeAtom<boolean>("isEmptyDirtTileHighlightedAtom");
export const isPlantTileHighlightedAtom = makeAtom<boolean>("isPlantTileHighlightedAtom");
export const isItemHighlightedInHotbarAtom = makeAtom<boolean>("isItemHiglightedInHotbarAtom");
export const isItemHighlightedInModalAtom = makeAtom<boolean>("isItemHighlightedInModalAtom");
export const isMyGardenButtonHighlightedAtom = makeAtom<boolean>("isMyGardenButtonHighlightedAtom");
export const isSellButtonHighlightedAtom = makeAtom<boolean>("isSellButtonHighlightedAtom");
export const isShopButtonHighlightedAtom = makeAtom<boolean>("isShopButtonHighlightedAtom");
export const isInstaGrowButtonHiddenAtom = makeAtom<boolean>("isInstaGrowButtonHiddenAtom");
export const isActionButtonHighlightedAtom = makeAtom<boolean>("isActionButtonHighlightedAtom");
export const isGardenItemInfoCardHiddenAtom = makeAtom<boolean>("isGardenItemInfoCardHiddenAtom");
export const isSeedPurchaseButtonHighlightedAtom = makeAtom<boolean>("isSeedPurchaseButtonHighlightedAtom");
export const isFirstSeedPurchaseActiveAtom = makeAtom<boolean>("isFirstSeedPurchaseActiveAtom");
export const isFirstCropHarvestActiveAtom = makeAtom<boolean>("isFirstCropHarvestActiveAtom");
export const isWeatherStatusHighlightedAtom = makeAtom<boolean>("isWeatherStatusHighlightedAtom");

// =============================================================================
// WEATHER
// =============================================================================

export const weatherAtom = makeAtom<Weather>("weatherAtom");

// =============================================================================
// UI / MODALS
// =============================================================================

export const activeModalAtom = makeAtom<QuinoaModal>("activeModalAtom");
export const hotkeyBeingPressedAtom = makeAtom<string | null>("hotkeyBeingPressedAtom");

// =============================================================================
// AVATARS & ANIMATIONS
// =============================================================================

export const avatarTriggerAnimationAtom = makeAtom<AvatarTriggerAnimation | null>("avatarTriggerAnimationAtom");
export const avatarDataAtom = makeAtom<Record<PlayerId, AvatarData>>("avatarDataAtom");
export const emoteDataAtom = makeAtom<Record<PlayerId, PlayerEmoteData>>("emoteDataAtom");

// =============================================================================
// OTHER PLAYERS
// =============================================================================

export const otherUserSlotsAtom = makeAtom<UserSlot[]>("otherUserSlotsAtom");
export const otherPlayerPositionsAtom = makeAtom<Record<PlayerId, GridPosition | null>>("otherPlayerPositionsAtom");
export const otherPlayerSelectedItemsAtom = makeAtom<Record<PlayerId, InventoryItem | null>>("otherPlayerSelectedItemsAtom");
export const otherPlayerLastActionsAtom = makeAtom<Record<PlayerId, unknown>>("otherPlayerLastActionsAtom");

// =============================================================================
// NPC
// =============================================================================

export const traderBunnyPlayerIdAtom = makeAtom<string>("traderBunnyPlayerId");
export const npcPlayersAtom = makeAtom<unknown[]>("npcPlayersAtom");
export const npcQuinoaUsersAtom = makeAtom<unknown>("npcQuinoaUsersAtom");
export const numNpcAvatarsAtom = makeAtom<number>("numNpcAvatarsAtom");
export const traderBunnyEmoteTimeoutAtom = makeAtom<ReturnType<typeof setTimeout> | null>("traderBunnyEmoteTimeoutAtom");
export const traderBunnyEmoteAtom = makeAtom<string>("traderBunnyEmoteAtom");

// =============================================================================
// LEADERBOARD
// =============================================================================

export const unsortedLeaderboardAtom = makeAtom<unknown[]>("unsortedLeaderboardAtom");
export const currentGardenNameAtom = makeAtom<string | undefined>("currentGardenNameAtom");

// =============================================================================
// ENGINE & PERFORMANCE
// =============================================================================

export const quinoaEngineAtom = makeAtom<unknown>("quinoaEngineAtom");
export const quinoaInitializationErrorAtom = makeAtom<Error | null>("quinoaInitializationErrorAtom");
export const avgPingAtom = makeAtom<number>("avgPingAtom");
export const serverClientTimeOffsetAtom = makeAtom<number>("serverClientTimeOffsetAtom");

// =============================================================================
// ESTABLISHING SHOT
// =============================================================================

export const isEstablishingShotRunningAtom = makeAtom<boolean>("isEstablishingShotRunningAtom");
export const isEstablishingShotCompleteAtom = makeAtom<boolean>("isEstablishingShotCompleteAtom");
