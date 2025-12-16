// src/store/players/players.actions.ts
// Projection: ecoute statePlayers & stateUserSlots pour alimenter players.state.

import type { Unsubscribe } from "../api";
import { statePlayers, stateUserSlots } from "../atoms";
import { _setStatePlayers, _setUserSlots } from "./players.state";

let unsubPlayers: Unsubscribe | null = null;
let unsubUserSlots: Unsubscribe | null = null;
let _started = false;

export async function startOnChangeAtom() {
  if (_started) return;
  _started = true;

  if (!unsubPlayers) {
    unsubPlayers = await statePlayers.onChangeNow((next) => {
      _setStatePlayers(toArray(next));
    });
  }

  if (!unsubUserSlots) {
    unsubUserSlots = await stateUserSlots.onChangeNow((next) => {
      _setUserSlots(toArray(next));
    });
  }
}

export function stopOnChangeAtom() {
  if (unsubPlayers) { try { unsubPlayers(); } catch {} ; unsubPlayers = null; }
  if (unsubUserSlots) { try { unsubUserSlots(); } catch {} ; unsubUserSlots = null; }
  _started = false;
}

function toArray(value: any): any[] {
  return Array.isArray(value) ? value : [];
}
