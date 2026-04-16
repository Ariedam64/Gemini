/**
 * WebSocket-based game state module.
 *
 * Replaces Jotai atom polling with event-driven state from WS messages.
 * Zero polling, zero setInterval — updates arrive in real-time via PartialState patches.
 *
 * Usage:
 *   import { WSState } from "../state";
 *   WSState.subscribe("inventory", () => { ... });
 *   const slot = WSState.getMySlot();
 */

export {
  handleMessage,
  isReady,
  getRoomState,
  getGameState,
  getUserSlots,
  getMyPlayerId,
  setMyPlayerId,
  getMySlotIndex,
  getMySlot,
  getSelectedGrowSlotIndex,
  setSelectedGrowSlotIndex,
  subscribe,
  reset,
} from "./logic/engine";

export type {
  StateChannel,
  StateChangeCallback,
  Unsubscribe,
  WelcomeMessage,
  PartialStateMessage,
  Patch,
} from "./types";

// Façade object for convenient access
import * as engine from "./logic/engine";

export const WSState = {
  handleMessage: engine.handleMessage,
  isReady: engine.isReady,
  getRoomState: engine.getRoomState,
  getGameState: engine.getGameState,
  getUserSlots: engine.getUserSlots,
  getMyPlayerId: engine.getMyPlayerId,
  setMyPlayerId: engine.setMyPlayerId,
  getMySlotIndex: engine.getMySlotIndex,
  getMySlot: engine.getMySlot,
  getSelectedGrowSlotIndex: engine.getSelectedGrowSlotIndex,
  setSelectedGrowSlotIndex: engine.setSelectedGrowSlotIndex,
  subscribe: engine.subscribe,
  reset: engine.reset,
};
