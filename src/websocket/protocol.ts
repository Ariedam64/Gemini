// src/Websocket/protocol.ts
/**
 * WebSocket protocol constants (message types + close codes).
 *
 * Why:
 * - Avoid hardcoding strings everywhere ("Welcome", "Ping", etc.)
 * - Make middlewares/handlers safer and easier to refactor.
 *
 * Note:
 * - This file contains no logic. Only identifiers and types.
 */

// -----------------------------
// Server -> Client message types
// -----------------------------

export const ServerToClientMessageType = {
  Welcome: "Welcome",
  PartialState: "PartialState",
  ServerErrorMessage: "ServerErrorMessage",
  Config: "Config",
  InappropriateContentRejected: "InappropriateContentRejected",
  Emote: "Emote",
  CurrencyTransaction: "CurrencyTransaction",
  Pong: "Pong",
} as const;

export type ServerToClientMessageType =
  typeof ServerToClientMessageType[keyof typeof ServerToClientMessageType];

// Optional: best-effort shape used by handlers for typing (still generic).
export type ServerToClientMessage = {
  type: ServerToClientMessageType;
  [key: string]: unknown;
};

// -----------------------------
// Client -> Server message types
// -----------------------------

export const ClientToServerMessageType = {
  // Chat / social / host
  Chat: "Chat",
  Emote: "Emote",
  Wish: "Wish",
  KickPlayer: "KickPlayer",
  SetPlayerData: "SetPlayerData",
  UsurpHost: "UsurpHost",
  Dev: "Dev",

  // Session / game / heartbeat
  SetSelectedGame: "SetSelectedGame",
  VoteForGame: "VoteForGame",
  RequestGame: "RequestGame",
  RestartGame: "RestartGame",
  Ping: "Ping",
  PlayerPosition: "PlayerPosition",
  Teleport: "Teleport",
  CheckWeatherStatus: "CheckWeatherStatus",

  // Inventory / storage
  MoveInventoryItem: "MoveInventoryItem",
  DropObject: "DropObject",
  PickupObject: "PickupObject",
  ToggleFavoriteItem: "ToggleFavoriteItem",
  PutItemInStorage: "PutItemInStorage",
  RetrieveItemFromStorage: "RetrieveItemFromStorage",
  MoveStorageItem: "MoveStorageItem",
  LogItems: "LogItems",

  // Garden actions / shops
  PlantSeed: "PlantSeed",
  WaterPlant: "WaterPlant",
  HarvestCrop: "HarvestCrop",
  SellAllCrops: "SellAllCrops",
  PurchaseSeed: "PurchaseSeed",
  PurchaseEgg: "PurchaseEgg",
  PurchaseTool: "PurchaseTool",
  PurchaseDecor: "PurchaseDecor",
  PlantEgg: "PlantEgg",
  HatchEgg: "HatchEgg",
  PlantGardenPlant: "PlantGardenPlant",
  PotPlant: "PotPlant",
  MutationPotion: "MutationPotion",
  PickupDecor: "PickupDecor",
  PlaceDecor: "PlaceDecor",
  RemoveGardenObject: "RemoveGardenObject",

  // Pets
  PlacePet: "PlacePet",
  FeedPet: "FeedPet",
  PetPositions: "PetPositions",
  SwapPet: "SwapPet",
  StorePet: "StorePet",
  NamePet: "NamePet",
  SellPet: "SellPet",

  // Voice / Discord
  ReportSpeakingStart: "ReportSpeakingStart",
} as const;

export type ClientToServerMessageType =
  typeof ClientToServerMessageType[keyof typeof ClientToServerMessageType];

// Optional: best-effort shape used by middlewares for typing (still generic).
export type ClientToServerMessage = {
  type: ClientToServerMessageType;
  [key: string]: unknown;
};

// -----------------------------
// WebSocket close codes (server initiated)
// -----------------------------

export enum WebSocketCloseCode {
  /** Used ONLY when reconnecting immediately afterwards */
  ReconnectInitiated = 4100,
  /** Indicates the player left the room voluntarily */
  PlayerLeftVoluntarily = 4200,
  /** Session superseded by a new one in a different room */
  UserSessionSuperseded = 4250,
  /** Connection superseded by a new one to the same room */
  ConnectionSuperseded = 4300,
  /** Server instance disposed (HMR) */
  ServerDisposed = 4310,
  /** Heartbeat timeout expired */
  HeartbeatExpired = 4400,
  /** Player kicked by another player */
  PlayerKicked = 4500,
  /** Client/server version mismatch */
  VersionMismatch = 4700,
  /** Server version expired (not accepting new connections) */
  VersionExpired = 4710,
  /** Error during initial handshake/auth */
  AuthenticationFailure = 4800,
}

// -----------------------------
// Optional runtime guards (useful for debugging / unknown types)
// -----------------------------

const stcSet = new Set<string>(Object.values(ServerToClientMessageType));
const ctsSet = new Set<string>(Object.values(ClientToServerMessageType));

export function isServerToClientType(x: unknown): x is ServerToClientMessageType {
  return typeof x === "string" && stcSet.has(x);
}

export function isClientToServerType(x: unknown): x is ClientToServerMessageType {
  return typeof x === "string" && ctsSet.has(x);
}
