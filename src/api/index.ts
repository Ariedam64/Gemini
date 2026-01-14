import { pageWindow } from "../utils/windowContext";
import { Store } from "../atoms/store";
import { Globals, getGlobals, initGlobals, destroyGlobals } from "../globals";
import * as WebSocketAPI from "../websocket/api";
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
} from "../modules";
import { MGAntiAfk } from "../features/antiAfk";
import { MGAutoFavorite } from "../features/autoFavorite";
import { MGJournalChecker } from "../features/journalChecker";
import { MGBulkFavorite } from "../features/bulkFavorite";
import { MGAchievements } from "../features/achievements";
import { MGPetTeam } from "../features/petTeam";
import { MGXPTracker } from "../features/xpTracker";
import { MGCropValueIndicator } from "../features/cropValueIndicator";
import { MGCropSizeIndicator } from "../features/cropSizeIndicator";
// import { MGShopNotifier } from "../features/shopNotifier";
import { MGPets, MGTracker } from "../features";

export const GeminiAPI = {
  Store: {
    select: Store.select.bind(Store),
    set: Store.set.bind(Store),
    subscribe: Store.subscribe.bind(Store),
    subscribeImmediate: Store.subscribeImmediate.bind(Store),
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
    Audio: MGAudio,
    Cosmetic: MGCosmetic,
    Calculators: MGCalculators,
  },

  Features: {
    AutoFavorite: MGAutoFavorite,
    JournalChecker: MGJournalChecker,
    BulkFavorite: MGBulkFavorite,
    Achievements: MGAchievements,
    Tracker: MGTracker,
    AntiAfk: MGAntiAfk,
    Pets: MGPets,
    PetTeam: MGPetTeam,
    XPTracker: MGXPTracker,
    CropValueIndicator: MGCropValueIndicator,
    CropSizeIndicator: MGCropSizeIndicator,
    // ShopNotifier: MGShopNotifier,
  },

  WebSocket: {
    chat: WebSocketAPI.chat,
    emote: WebSocketAPI.emote,
    wish: WebSocketAPI.wish,
    kickPlayer: WebSocketAPI.kickPlayer,
    setPlayerData: WebSocketAPI.setPlayerData,
    usurpHost: WebSocketAPI.usurpHost,
    reportSpeakingStart: WebSocketAPI.reportSpeakingStart,

    setSelectedGame: WebSocketAPI.setSelectedGame,
    voteForGame: WebSocketAPI.voteForGame,
    requestGame: WebSocketAPI.requestGame,
    restartGame: WebSocketAPI.restartGame,
    ping: WebSocketAPI.ping,
    checkWeatherStatus: WebSocketAPI.checkWeatherStatus,

    move: WebSocketAPI.move,
    playerPosition: WebSocketAPI.playerPosition,
    teleport: WebSocketAPI.teleport,

    moveInventoryItem: WebSocketAPI.moveInventoryItem,
    dropObject: WebSocketAPI.dropObject,
    pickupObject: WebSocketAPI.pickupObject,
    toggleFavoriteItem: WebSocketAPI.toggleFavoriteItem,
    putItemInStorage: WebSocketAPI.putItemInStorage,
    retrieveItemFromStorage: WebSocketAPI.retrieveItemFromStorage,
    moveStorageItem: WebSocketAPI.moveStorageItem,
    logItems: WebSocketAPI.logItems,

    plantSeed: WebSocketAPI.plantSeed,
    waterPlant: WebSocketAPI.waterPlant,
    harvestCrop: WebSocketAPI.harvestCrop,
    sellAllCrops: WebSocketAPI.sellAllCrops,
    purchaseDecor: WebSocketAPI.purchaseDecor,
    purchaseEgg: WebSocketAPI.purchaseEgg,
    purchaseTool: WebSocketAPI.purchaseTool,
    purchaseSeed: WebSocketAPI.purchaseSeed,
    plantEgg: WebSocketAPI.plantEgg,
    hatchEgg: WebSocketAPI.hatchEgg,
    plantGardenPlant: WebSocketAPI.plantGardenPlant,
    potPlant: WebSocketAPI.potPlant,
    mutationPotion: WebSocketAPI.mutationPotion,
    pickupDecor: WebSocketAPI.pickupDecor,
    placeDecor: WebSocketAPI.placeDecor,
    removeGardenObject: WebSocketAPI.removeGardenObject,

    placePet: WebSocketAPI.placePet,
    feedPet: WebSocketAPI.feedPet,
    petPositions: WebSocketAPI.petPositions,
    swapPet: WebSocketAPI.swapPet,
    storePet: WebSocketAPI.storePet,
    namePet: WebSocketAPI.namePet,
    sellPet: WebSocketAPI.sellPet,
  },

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
  win.MGAssets = MGAssets;
  win.MGEnvironment = MGEnvironment;
}

export function getExposedAPI(): typeof GeminiAPI | undefined {
  return (pageWindow as unknown as Record<string, typeof GeminiAPI>).Gemini;
}
