/**
 * Core state engine — processes WS messages and maintains raw + derived state.
 * No side effects on import. Call init() to start.
 */

import type {
  RoomState,
  GameStateData,
  UserSlotData,
  Patch,
  WelcomeMessage,
  PartialStateMessage,
  StateChannel,
  StateChangeCallback,
  Unsubscribe,
} from "../types";
import { applyPatch } from "./jsonPatch";

// ─── Internal State ───────────────────────────────────────────────────────────

let roomState: RoomState | null = null;
let gameState: GameStateData | null = null;
let welcomed = false;
let myPlayerId: string | null = null;

// Client-local UI state (not from WS — tracked via outgoing message interception)
let selectedGrowSlotIndex: number | null = null;

// Channel-based subscriptions
const subs = new Map<StateChannel, Set<StateChangeCallback>>();

// Throttled notification — state patches are applied immediately (always fresh),
// but subscriber notifications are throttled to max ~10/s.
const pendingChannels = new Set<StateChannel>();
let flushTimerId: ReturnType<typeof setTimeout> | null = null;
const THROTTLE_MS = 100;

function scheduleFlush(): void {
  if (flushTimerId !== null) return;
  flushTimerId = setTimeout(() => {
    flushTimerId = null;
    const channels = [...pendingChannels];
    pendingChannels.clear();
    for (const ch of channels) {
      notify(ch);
    }
  }, THROTTLE_MS);
}

// ─── Patch Routing ────────────────────────────────────────────────────────────

const ROOM_PATH_RE = /^\/data\/(players\/\d+|roomId|roomSessionId|hostPlayerId|gameVotes|chat|selectedGame)(\/.*)?$/;

/** Determine which channels a patch path affects — uses string ops (no regex) for speed */
function addAffectedChannels(path: string, out: Set<StateChannel>): void {
  out.add("state");

  // Room-level patches
  if (path.startsWith("/data/players")) { out.add("players"); return; }
  if (path.startsWith("/data/hostPlayerId") || path.startsWith("/data/roomId") ||
      path.startsWith("/data/chat") || path.startsWith("/data/timer") ||
      path.startsWith("/data/gameVotes")) { out.add("room"); return; }

  // Game-level patches (under /child/data/)
  if (!path.startsWith("/child")) return;

  if (path.includes("/weather")) { out.add("weather"); return; }
  if (path.includes("/shops")) { out.add("shops"); return; }

  // Check if this patch affects my userSlot
  const myIdx = getMySlotIndex();
  if (myIdx === null) return;

  const mySlotPrefix = `/child/data/userSlots/${myIdx}`;
  if (!path.startsWith(mySlotPrefix)) return;

  out.add("mySlot");
  if (path.includes("/inventory")) out.add("inventory");
  if (path.includes("/garden")) out.add("garden");
  if (path.includes("/petSlot")) out.add("pets");
  if (path.includes("/position")) out.add("position");
  if (path.includes("/notAuthoritative_selectedItemIndex")) out.add("selection");
}

// ─── Message Handlers ─────────────────────────────────────────────────────────

function handleWelcome(msg: WelcomeMessage): void {
  const fullState = msg.fullState;
  if (!fullState) return;

  roomState = (fullState.data as RoomState) || null;
  gameState = (fullState.child?.data as GameStateData) || null;
  welcomed = true;

  // Use throttled notification (same as PartialState) to avoid blocking
  // the main thread on the massive Welcome payload.
  const allChannels: StateChannel[] = [
    "state", "players", "mySlot", "inventory", "garden",
    "pets", "shops", "weather", "room", "position", "selection",
  ];
  for (const ch of allChannels) {
    pendingChannels.add(ch);
  }
  scheduleFlush();
}

function handlePartialState(msg: PartialStateMessage): void {
  const patches = msg.patches;
  if (!Array.isArray(patches) || patches.length === 0) return;

  const affectedChannels = new Set<StateChannel>();

  for (const patch of patches) {
    const { path, value, op } = patch;
    if (!path) continue;

    // Collect affected channels (string-based, no regex)
    addAffectedChannels(path, affectedChannels);

    // Room state patches
    if (roomState && ROOM_PATH_RE.test(path)) {
      roomState = applyPatch(roomState, path, value, op) as RoomState;
      continue;
    }

    // Game state patches (everything under /child)
    if (gameState && path.startsWith("/child")) {
      const gamePath = path.replace(/^\/child/, "");
      gameState = applyPatch(gameState, gamePath, value, op) as GameStateData;
      continue;
    }
  }

  // Batch notifications — accumulate affected channels and flush once per frame.
  // Without this, position updates (sent every frame by the game) would trigger
  // globals recalculation 60+ times/second instead of once per frame.
  for (const ch of affectedChannels) {
    pendingChannels.add(ch);
  }
  scheduleFlush();
}

// ─── Public: Message Entry Point ──────────────────────────────────────────────

export function handleMessage(msg: unknown): void {
  if (!msg || typeof msg !== "object") return;
  const typed = msg as { type?: string };

  if (typed.type === "Welcome") {
    handleWelcome(msg as WelcomeMessage);
  } else if (typed.type === "PartialState") {
    handlePartialState(msg as PartialStateMessage);
  }
}

// ─── Public: State Accessors ──────────────────────────────────────────────────

export function isReady(): boolean {
  return welcomed;
}

export function getRoomState(): RoomState | null {
  return roomState;
}

export function getGameState(): GameStateData | null {
  return gameState;
}

export function getUserSlots(): (UserSlotData | null)[] {
  return gameState?.userSlots ?? [];
}

export function getMyPlayerId(): string | null {
  return myPlayerId;
}

export function setMyPlayerId(id: string): void {
  myPlayerId = id;
}

export function getMySlotIndex(): number | null {
  if (!myPlayerId || !gameState?.userSlots) return null;
  for (let i = 0; i < gameState.userSlots.length; i++) {
    const slot = gameState.userSlots[i];
    if (slot && (slot.playerId === myPlayerId || slot.databaseUserId === myPlayerId)) {
      return i;
    }
  }
  return null;
}

export function getMySlot(): UserSlotData | null {
  const idx = getMySlotIndex();
  if (idx === null) return null;
  return gameState?.userSlots?.[idx] ?? null;
}

// ─── Client-local UI State ────────────────────────────────────────────────────

export function getSelectedGrowSlotIndex(): number | null {
  return selectedGrowSlotIndex;
}

export function setSelectedGrowSlotIndex(index: number | null): void {
  if (selectedGrowSlotIndex === index) return;
  selectedGrowSlotIndex = index;
  notify("selection");
}

// ─── Public: Subscriptions ────────────────────────────────────────────────────

export function subscribe(channel: StateChannel, cb: StateChangeCallback): Unsubscribe {
  let set = subs.get(channel);
  if (!set) {
    set = new Set();
    subs.set(channel, set);
  }
  set.add(cb);
  return () => { set!.delete(cb); };
}

function notify(channel: StateChannel): void {
  const set = subs.get(channel);
  if (!set) return;
  for (const cb of set) {
    try { cb(); } catch { /* ignore */ }
  }
}

function notifyAll(): void {
  const notified = new Set<StateChangeCallback>();
  for (const set of subs.values()) {
    for (const cb of set) {
      if (!notified.has(cb)) {
        notified.add(cb);
        try { cb(); } catch { /* ignore */ }
      }
    }
  }
}

// ─── Public: Reset ────────────────────────────────────────────────────────────

export function reset(): void {
  roomState = null;
  gameState = null;
  welcomed = false;
  myPlayerId = null;
}
