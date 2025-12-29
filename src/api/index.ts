import { pageWindow } from "../utils/windowContext";
import { Store } from "../atoms/store";
import { Globals, getGlobals, initGlobals, destroyGlobals } from "../globals";
import * as WebSocketAPI from "../websocket/api";
import {
  MGVersion,
  MGAssets,
  MGManifest,
  MGData,
  MGSprite,
  MGTile,
  MGPixi,
  MGAudio,
  MGCosmetic,
  MGAchievements,
  MGCalculators,
  MGPets,
  MGTracker,
} from "../modules";

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
    Sprite: MGSprite,
    Tile: MGTile,
    Pixi: MGPixi,
    Audio: MGAudio,
    Cosmetic: MGCosmetic,
    Achievements: MGAchievements,
    Calculators: MGCalculators,
    Pets: MGPets,
    Tracker: MGTracker,
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

export function exposeGeminiAPI(): void {
  (pageWindow as unknown as Record<string, unknown>).Gemini = GeminiAPI;
}

export function getExposedAPI(): typeof GeminiAPI | undefined {
  return (pageWindow as unknown as Record<string, typeof GeminiAPI>).Gemini;
}
