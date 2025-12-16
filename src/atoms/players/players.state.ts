// src/store/players/players.state.ts
// Gestion locale des joueurs (statePlayers + userSlots) sans dependance Jotai directe.

export type StatePlayerRow = {
  playerId: string;
  type?: string;
  databaseUserId?: string;
  [key: string]: any;
};

export type UserSlotRow = {
  id: string;
  name?: string;
  isConnected?: boolean;
  discordAvatarUrl?: string | null;
  cosmetic?: Record<string, any>;
  emoteData?: Record<string, any>;
  secondsRemainingUntilChatEnabled?: number;
  databaseUserId?: string;
  guildId?: string | null;
  [key: string]: any;
};

export type PlayerSlotDetails = Omit<UserSlotRow, "id">;
export type PlayerRow = StatePlayerRow & PlayerSlotDetails & { playerId: string };

export type PlayersPresenceChange = {
  added: StatePlayerRow[];
  removed: StatePlayerRow[];
  current: StatePlayerRow[];
};

let _statePlayers: StatePlayerRow[] = [];
let _userSlots: UserSlotRow[] = [];
let _players: PlayerRow[] = [];

let _statePlayersKey = "[]";
let _userSlotsKey = "[]";
let _playersKey = "[]";

let _playerIds = new Set<string>();

const subsStatePlayers = new Set<(rows: StatePlayerRow[]) => void>();
const subsUserSlots = new Set<(rows: UserSlotRow[]) => void>();
const subsPlayers = new Set<(rows: PlayerRow[]) => void>();
const subsPresence = new Set<(change: PlayersPresenceChange) => void>();

export function _setStatePlayers(next: any) {
  const list = Array.isArray(next) ? next.map(normalizeStatePlayer).filter(isNotNull) : [];
  const key = stableStringify(list);
  if (key === _statePlayersKey) return;

  const prev = _statePlayers;
  const prevIds = _playerIds;

  _statePlayers = list;
  _statePlayersKey = key;

  const nextIds = new Set(list.map(p => p.playerId));
  const added = list.filter(p => !prevIds.has(p.playerId));
  const removed = prev.filter(p => !nextIds.has(p.playerId));
  _playerIds = nextIds;

  for (const fn of subsStatePlayers) { try { fn(_statePlayers); } catch {} }

  if (added.length || removed.length) {
    const payload: PlayersPresenceChange = { added, removed, current: _statePlayers };
    for (const fn of subsPresence) { try { fn(payload); } catch {} }
  }

  emitPlayers();
}

export function _setUserSlots(next: any) {
  const list = Array.isArray(next) ? next.map(normalizeUserSlot).filter(isNotNull) : [];
  const key = stableStringify(list);
  if (key === _userSlotsKey) return;

  _userSlots = list;
  _userSlotsKey = key;

  for (const fn of subsUserSlots) { try { fn(_userSlots); } catch {} }

  emitPlayers();
}

export function getStatePlayers(): StatePlayerRow[] { return _statePlayers; }
export function getUserSlots(): UserSlotRow[] { return _userSlots; }
export function getPlayers(): PlayerRow[] { return _players; }

export function getCoinsCountByDatabaseUserId(databaseUserId: string): number | null {
  if (!databaseUserId) return null;

  const match = _players.find(p => String(p.databaseUserId ?? "") === databaseUserId);

  if (!match || !match.data) return null;
  const coins = (match as any)?.data?.coinsCount;
  return typeof coins === "number" ? coins : null;
}

export function onStatePlayers(cb: (rows: StatePlayerRow[]) => void): () => void {
  subsStatePlayers.add(cb);
  try { cb(_statePlayers); } catch {}
  return () => { subsStatePlayers.delete(cb); };
}

export function onUserSlots(cb: (rows: UserSlotRow[]) => void): () => void {
  subsUserSlots.add(cb);
  try { cb(_userSlots); } catch {}
  return () => { subsUserSlots.delete(cb); };
}

export function onPlayers(cb: (rows: PlayerRow[]) => void): () => void {
  subsPlayers.add(cb);
  try { cb(_players); } catch {}
  return () => { subsPlayers.delete(cb); };
}

export function onPlayersPresence(cb: (change: PlayersPresenceChange) => void): () => void {
  subsPresence.add(cb);
  return () => { subsPresence.delete(cb); };
}

function emitPlayers() {
  const list = buildPlayers();
  const key = stableStringify(list);
  if (key === _playersKey) return;
  _players = list;
  _playersKey = key;
  for (const fn of subsPlayers) { try { fn(_players); } catch {} }
}

function buildPlayers(): PlayerRow[] {
  if (!_statePlayers.length && !_userSlots.length) return [];

  const userSlotById = new Map<string, UserSlotRow>();
  for (const slot of _userSlots) userSlotById.set(slot.id, slot);

  const usedSlots = new Set<string>();
  const rows: PlayerRow[] = [];

  for (const player of _statePlayers) {
    const slot = userSlotById.get(player.playerId);
    if (slot) usedSlots.add(slot.id);
    rows.push(mergePlayer(player, slot));
  }

  for (const slot of _userSlots) {
    if (!usedSlots.has(slot.id)) rows.push(mergePlayer(undefined, slot));
  }

  return rows;
}

function mergePlayer(player?: StatePlayerRow, slot?: UserSlotRow): PlayerRow {
  const merged: PlayerRow = {
    ...(player ? { ...player } : {}),
    ...(slot ? omitSlotId(slot) : {}),
  } as PlayerRow;

  if (!merged.playerId) merged.playerId = player?.playerId ?? slot?.id ?? "";
  if (!merged.databaseUserId && slot?.databaseUserId) merged.databaseUserId = slot.databaseUserId;
  return merged;
}

function normalizeStatePlayer(raw: any): StatePlayerRow | null {
  if (!raw || typeof raw !== "object") return null;
  const id = raw.playerId ?? raw.id;
  if (typeof id !== "string" || !id) return null;
  return { ...raw, playerId: id };
}

function normalizeUserSlot(raw: any): UserSlotRow | null {
  if (!raw || typeof raw !== "object") return null;
  const id = raw.id ?? raw.playerId;
  if (typeof id !== "string" || !id) return null;
  return { ...raw, id };
}

function omitSlotId(slot: UserSlotRow): PlayerSlotDetails {
  const { id, ...rest } = slot;
  return rest;
}

function stableStringify(value: any): string {
  if (value === null) return "null";
  const type = typeof value;
  if (type === "number" || type === "boolean") return JSON.stringify(value);
  if (type === "string") return JSON.stringify(value);
  if (type === "undefined") return "undefined";
  if (type === "function") return '"__fn__"';
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const keys = Object.keys(value).sort();
  let out = "{";
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    out += (i ? "," : "") + JSON.stringify(k) + ":" + stableStringify(value[k]);
  }
  out += "}";
  return out;
}

function isNotNull<T>(value: T | null | undefined): value is T {
  return value != null;
}
