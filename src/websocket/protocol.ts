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
  RoomFrame: "RoomFrame",
  /** @deprecated Replaced by RoomFrame (state.patches). Kept for backward compatibility. */
  PartialState: "PartialState",
  ServerErrorMessage: "ServerErrorMessage",
  Config: "Config",
  InappropriateContentRejected: "InappropriateContentRejected",
  Emote: "Emote",
  CurrencyTransaction: "CurrencyTransaction",
  Pong: "Pong",
  /** Reply to a QuinoaCommand envelope, keyed by its requestId. */
  QuinoaCommandResult: "QuinoaCommandResult",
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
  MarkChatRead: "MarkChatRead",

  // Session / game / heartbeat
  SetSelectedGame: "SetSelectedGame",
  VoteForGame: "VoteForGame",
  RestartGame: "RestartGame",
  Ping: "Ping",
  PlayerPosition: "PlayerPosition",
  Teleport: "Teleport",
  CheckWeatherStatus: "CheckWeatherStatus",
  QuinoaTutorialSkipped: "QuinoaTutorialSkipped",

  // Inventory / storage
  MoveInventoryItem: "MoveInventoryItem",
  DropObject: "DropObject",
  PickupObject: "PickupObject",
  PutItemInStorage: "PutItemInStorage",
  RetrieveItemFromStorage: "RetrieveItemFromStorage",
  MoveStorageItem: "MoveStorageItem",
  SwapItemWithStorage: "SwapItemWithStorage",
  LogItems: "LogItems",

  // Inventory / items
  ToggleLockItem: "ToggleLockItem",
  SetSelectedItem: "SetSelectedItem",

  // Garden actions / shops
  PlantSeed: "PlantSeed",
  WaterPlant: "WaterPlant",
  HarvestCrop: "HarvestCrop",
  SellAllCrops: "SellAllCrops",
  PurchaseShopItem: "PurchaseShopItem",
  GrowEgg: "GrowEgg",
  HatchEgg: "HatchEgg",
  PlantGardenPlant: "PlantGardenPlant",
  PotPlant: "PotPlant",
  MutationPotion: "MutationPotion",
  CropCleanser: "CropCleanser",
  PickupDecor: "PickupDecor",
  PlaceDecor: "PlaceDecor",
  RemoveGardenObject: "RemoveGardenObject",
  Preserve: "Preserve",
  DisplayCrop: "DisplayCrop",
  PickupDisplayedCrop: "PickupDisplayedCrop",

  // Pets
  PlacePet: "PlacePet",
  FeedPet: "FeedPet",
  SwapPet: "SwapPet",
  SwapPetFromStorage: "SwapPetFromStorage",
  PickupPet: "PickupPet",
  MovePetSlot: "MovePetSlot",
  NamePet: "NamePet",
  SellPet: "SellPet",
  RidePet: "RidePet",
  DismountPet: "DismountPet",
  DawnCapture: "DawnCapture",
  Thundercharge: "Thundercharge",
  RequestPetGreet: "RequestPetGreet",
  ReplenishPotion: "ReplenishPotion",
  XPPotion: "XPPotion",
  EquipPetCosmetic: "EquipPetCosmetic",
  UpgradePetHutch: "UpgradePetHutch",
  UpgradeSeedSilo: "UpgradeSeedSilo",
  UpgradeDecorShed: "UpgradeDecorShed",

  // Pet teams
  SavePetTeam: "SavePetTeam",
  ApplyPetTeam: "ApplyPetTeam",
  DeletePetTeam: "DeletePetTeam",
  MovePetTeam: "MovePetTeam",
  SetPetTeamEmblem: "SetPetTeamEmblem",

  // Seasonal / misc
  ThrowSnowball: "ThrowSnowball",
  CheckFriendBonus: "CheckFriendBonus",
} as const;

export type ClientToServerMessageType =
  typeof ClientToServerMessageType[keyof typeof ClientToServerMessageType];

// Optional: best-effort shape used by middlewares for typing (still generic).
export type ClientToServerMessage = {
  type: ClientToServerMessageType;
  [key: string]: unknown;
};

// -----------------------------
// QuinoaCommand envelope
// -----------------------------

/**
 * Message type of the envelope that carries a gameplay command.
 *
 * See `commandSequence.ts` for why the sequence number matters, and `api.ts`
 * for which actions travel inside it.
 */
export const COMMAND_ENVELOPE_TYPE = "QuinoaCommand";

export type QuinoaCommandEnvelope = {
  scopePath: string[];
  type: typeof COMMAND_ENVELOPE_TYPE;
  requestId: string;
  commandSequence: number;
  command: { type: string; [key: string]: unknown };
};

/**
 * The two Quinoa messages that never were commands.
 *
 * `Ping` has its own `Pong` reply and `PlayerPosition` feeds the movement
 * snapshot channel (QuinoaMovementSnapshot/Batch), so neither goes near the
 * command pipeline — wrapping one would break it in the other direction.
 */
export const RAW_QUINOA_MESSAGE_TYPES: ReadonlySet<string> = new Set<string>([
  ClientToServerMessageType.Ping,
  ClientToServerMessageType.PlayerPosition,
]);

/** Reads the inner command out of an envelope, or `null` for anything else. */
export function unwrapCommandEnvelope(
  message: unknown
): QuinoaCommandEnvelope["command"] | null {
  if (!message || typeof message !== "object") return null;

  const envelope = message as Partial<QuinoaCommandEnvelope>;
  if (envelope.type !== COMMAND_ENVELOPE_TYPE) return null;
  if (!envelope.command || typeof envelope.command !== "object") return null;

  return envelope.command;
}

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
