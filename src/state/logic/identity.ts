/**
 * Player identity across the renames the server has been through.
 *
 * Two fields moved under our feet, both silently — nothing errors, the join
 * just stops matching and every slot-backed view goes empty:
 * - `userSlots[].playerId` -> `userId` (same value, the id Welcome reports as
 *   `selfPlayerId`); `playerId` is now null on every slot.
 * - `databaseUserId` -> `discordUserId` on room players and on slots.
 *
 * Reading through these helpers accepts either name, so an older deployment or
 * a cached bundle keeps working.
 */

type UnknownRecord = Record<string, unknown>;

/** Field names holding a slot's owner id, newest first. */
const SLOT_OWNER_KEYS = ["userId", "playerId", "id"] as const;

/** Field names holding the account id, newest first. */
const ACCOUNT_ID_KEYS = ["discordUserId", "databaseUserId"] as const;

function readString(source: unknown, keys: readonly string[]): string | null {
  if (!source || typeof source !== "object") return null;

  const record = source as UnknownRecord;
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return null;
}

/** The room-player id that owns this user slot. */
export function getSlotOwnerId(slot: unknown): string | null {
  return readString(slot, SLOT_OWNER_KEYS);
}

/**
 * The account id of a slot or a room player.
 *
 * On a slot the field sits at the top level, but older payloads nested it under
 * `data`, so both are checked.
 */
export function getAccountId(source: unknown): string | null {
  const direct = readString(source, ACCOUNT_ID_KEYS);
  if (direct) return direct;

  const nested = (source as UnknownRecord | null)?.data;
  return readString(nested, ACCOUNT_ID_KEYS);
}

/** Whether this slot belongs to the given player/account id. */
export function slotBelongsTo(slot: unknown, playerId: string | null): boolean {
  if (!slot || !playerId) return false;
  return getSlotOwnerId(slot) === playerId || getAccountId(slot) === playerId;
}
