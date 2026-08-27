import { pageWindow } from "../utils/windowContext";
import { Store } from "../atoms/store";
import { WSState } from "../state";
import { Globals, getGlobals, initGlobals, destroyGlobals } from "../globals";
import * as WebSocketAPI from "../websocket/api";
import { getInfo as getCommandSequenceInfo } from "../websocket/commandSequence";
import { getNextFreeStorageIndex, findStorageById } from "../utils/gameStorage";
import {
  MGVersion,
  MGAssets,
  MGManifest,
  MGData,
  MGEnvironment,
  MGCustomModal,
  MGSprite,
  MGTile,
  MGPixi,
  MGAudio,
  MGCosmetic,
  MGCalculators,
  MGShopActions,
  MGRiveLoader,
} from "../modules";
import { MGAntiAfk } from "../features/antiAfk";

import { MGAchievements } from "../features/achievements";
import { MGPetTeam } from "../features/petTeam";
import { MGXPTracker } from "../features/xpTracker";
import { MGCropValueIndicator } from "../features/cropValueIndicator";
import { MGShopNotifier } from "../features/shopNotifier";
import { MGWeatherNotifier } from "../features/weatherNotifier";
import { MGPetHungerNotifier } from "../features/petHungerNotifier";
import { MGAriesAPI } from "../features/ariesAPI";
import { MGHarvestLocker } from "../features/harvestLocker";
import { MGEggLocker } from "../features/eggLocker";
import { MGDecorLocker } from "../features/decorLocker";
import { MGAutoStockSeedSilo } from "../features/autoStockSeedSilo";
import { MGAutoStockDecorShed } from "../features/autoStockDecorShed";
import { MGPets, MGTracker } from "../features";

export const GeminiAPI = {
  Store: {
    select: Store.select.bind(Store),
    set: Store.set.bind(Store),
    subscribe: Store.subscribe.bind(Store),
    subscribeImmediate: Store.subscribeImmediate.bind(Store),
    getCapturedInfo: Store.getCapturedInfo,
    /** Whether the game has registered this atom — for diagnosing renames. */
    has: Store.has.bind(Store),
    waitFor: Store.waitFor.bind(Store),
  },

  Globals,

  Modules: {
    Version: MGVersion,
    Assets: MGAssets,
    Manifest: MGManifest,
    Data: MGData,
    Environment: MGEnvironment,
    CustomModal: MGCustomModal,
    Sprite: MGSprite,
    Tile: MGTile,
    Pixi: MGPixi,
    RiveLoader: MGRiveLoader,
    Audio: MGAudio,
    Cosmetic: MGCosmetic,
    Calculators: MGCalculators,
    ShopActions: MGShopActions,
  },

  Features: {
    Achievements: MGAchievements,
    Tracker: MGTracker,
    AntiAfk: MGAntiAfk,
    Pets: MGPets,
    PetTeam: MGPetTeam,
    XPTracker: MGXPTracker,
    CropValueIndicator: MGCropValueIndicator,
    ShopNotifier: MGShopNotifier,
    WeatherNotifier: MGWeatherNotifier,
    PetHungerNotifier: MGPetHungerNotifier,
    AriesAPI: MGAriesAPI,
    HarvestLocker: MGHarvestLocker,
    EggLocker: MGEggLocker,
    DecorLocker: MGDecorLocker,
    AutoStockSeedSilo: MGAutoStockSeedSilo,
    AutoStockDecorShed: MGAutoStockDecorShed,
  },

  Utils: {
    getNextFreeStorageIndex,
    findStorageById,
  },

  WebSocket: {
    chat: WebSocketAPI.chat,
    emote: WebSocketAPI.emote,
    wish: WebSocketAPI.wish,
    kickPlayer: WebSocketAPI.kickPlayer,
    setPlayerData: WebSocketAPI.setPlayerData,
    usurpHost: WebSocketAPI.usurpHost,
    markChatRead: WebSocketAPI.markChatRead,

    setSelectedGame: WebSocketAPI.setSelectedGame,
    voteForGame: WebSocketAPI.voteForGame,
    restartGame: WebSocketAPI.restartGame,
    ping: WebSocketAPI.ping,
    checkWeatherStatus: WebSocketAPI.checkWeatherStatus,
    quinoaTutorialSkipped: WebSocketAPI.quinoaTutorialSkipped,

    move: WebSocketAPI.move,
    playerPosition: WebSocketAPI.playerPosition,
    teleport: WebSocketAPI.teleport,

    moveInventoryItem: WebSocketAPI.moveInventoryItem,
    dropObject: WebSocketAPI.dropObject,
    pickupObject: WebSocketAPI.pickupObject,
    toggleLockItem: WebSocketAPI.toggleLockItem,
    toggleFavoriteItem: WebSocketAPI.toggleFavoriteItem,
    setSelectedItem: WebSocketAPI.setSelectedItem,
    putItemInStorage: WebSocketAPI.putItemInStorage,
    retrieveItemFromStorage: WebSocketAPI.retrieveItemFromStorage,
    moveStorageItem: WebSocketAPI.moveStorageItem,
    swapItemWithStorage: WebSocketAPI.swapItemWithStorage,
    logItems: WebSocketAPI.logItems,

    plantSeed: WebSocketAPI.plantSeed,
    waterPlant: WebSocketAPI.waterPlant,
    harvestCrop: WebSocketAPI.harvestCrop,
    sellAllCrops: WebSocketAPI.sellAllCrops,
    purchaseDecor: WebSocketAPI.purchaseDecor,
    purchaseEgg: WebSocketAPI.purchaseEgg,
    purchaseTool: WebSocketAPI.purchaseTool,
    purchaseSeed: WebSocketAPI.purchaseSeed,
    purchaseDawnItem: WebSocketAPI.purchaseDawnItem,
    purchaseShopItem: WebSocketAPI.purchaseShopItem,
    growEgg: WebSocketAPI.growEgg,
    plantEgg: WebSocketAPI.plantEgg,
    hatchEgg: WebSocketAPI.hatchEgg,
    plantGardenPlant: WebSocketAPI.plantGardenPlant,
    potPlant: WebSocketAPI.potPlant,
    mutationPotion: WebSocketAPI.mutationPotion,
    cropCleanser: WebSocketAPI.cropCleanser,
    pickupDecor: WebSocketAPI.pickupDecor,
    placeDecor: WebSocketAPI.placeDecor,
    removeGardenObject: WebSocketAPI.removeGardenObject,
    preserve: WebSocketAPI.preserve,
    displayCrop: WebSocketAPI.displayCrop,
    pickupDisplayedCrop: WebSocketAPI.pickupDisplayedCrop,

    placePet: WebSocketAPI.placePet,
    feedPet: WebSocketAPI.feedPet,
    swapPet: WebSocketAPI.swapPet,
    swapPetFromStorage: WebSocketAPI.swapPetFromStorage,
    pickupPet: WebSocketAPI.pickupPet,
    movePetSlot: WebSocketAPI.movePetSlot,
    namePet: WebSocketAPI.namePet,
    sellPet: WebSocketAPI.sellPet,
    ridePet: WebSocketAPI.ridePet,
    dismountPet: WebSocketAPI.dismountPet,
    dawnCapture: WebSocketAPI.dawnCapture,
    thundercharge: WebSocketAPI.thundercharge,
    requestPetGreet: WebSocketAPI.requestPetGreet,
    replenishPotion: WebSocketAPI.replenishPotion,
    xpPotion: WebSocketAPI.xpPotion,
    equipPetCosmetic: WebSocketAPI.equipPetCosmetic,
    upgradePetHutch: WebSocketAPI.upgradePetHutch,
    upgradeSeedSilo: WebSocketAPI.upgradeSeedSilo,
    upgradeDecorShed: WebSocketAPI.upgradeDecorShed,

    savePetTeam: WebSocketAPI.savePetTeam,
    applyPetTeam: WebSocketAPI.applyPetTeam,
    deletePetTeam: WebSocketAPI.deletePetTeam,
    movePetTeam: WebSocketAPI.movePetTeam,
    setPetTeamEmblem: WebSocketAPI.setPetTeamEmblem,

    throwSnowball: WebSocketAPI.throwSnowball,
    checkFriendBonus: WebSocketAPI.checkFriendBonus,

    /** Where the shared command counter stands. For diagnosing invalid_sequence. */
    commandSequenceInfo: getCommandSequenceInfo,
  },

  WSState,

  _internal: {
    getGlobals,
    initGlobals,
    destroyGlobals,
  },
};

export type GeminiAPIType = typeof GeminiAPI;

// Export alias for backward compatibility with features
export { GeminiAPI as Gemini };

export function exposeGeminiAPI(): void {
  const win = pageWindow as unknown as Record<string, unknown>;
  win.Gemini = GeminiAPI;

  // Direct shortcuts for high-value modules
  win.MGSprite = MGSprite;
  win.MGData = MGData;
  win.MGPixi = MGPixi;
  win.MGRiveLoader = MGRiveLoader;
  win.MGAssets = MGAssets;
  win.MGEnvironment = MGEnvironment;
}

export function getExposedAPI(): typeof GeminiAPI | undefined {
  return (pageWindow as unknown as Record<string, typeof GeminiAPI>).Gemini;
}
