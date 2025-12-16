// src/utils/updatePlayerInfo.ts (fixed)

import { onPlayers, getPlayers, getCoinsCountByDatabaseUserId } from "../atoms/players/players.state";
import { myPlayer } from "../atoms/atoms";
import { pageWindow, shareGlobal, readSharedGlobal } from "./pageContext";

type PlayerSnapshot = {
  playerId: string;           // databaseUserId
  name: string | null;
  avatar: string | null;
  coins: number | null;
};

// Check that we have a player with .data and a numeric coinsCount
function hasPlayerDataByDbId(databaseUserId: string): boolean {
  if (!databaseUserId) return false;
  const me = getPlayers().find(p => String(p.databaseUserId ?? "") === String(databaseUserId));
  return !!(me && (me as any).data && typeof (me as any).data.coinsCount === "number");
}

async function buildSnapshot(info: any): Promise<PlayerSnapshot | null> {
  const databaseUserId = String(info?.databaseUserId || "");
  if (!databaseUserId) return null;

  // If data is not ready yet, wait
  if (!hasPlayerDataByDbId(databaseUserId)) return null;

  const name = (info?.name || "").trim() || null;
  const avatar = (info?.discordAvatarUrl || "").trim() || null;
  const coins = getCoinsCountByDatabaseUserId(databaseUserId); // dbId, not playerId

  return { playerId: databaseUserId, name, avatar, coins };
}

export function pushSnapshot(snap: PlayerSnapshot) {
  // Expose into window (page + sandbox)
  const prev = readSharedGlobal<any>("MGH") || {};
  shareGlobal("MGH", { ...prev, player: snap });

  // Loader bridge if available
  const postBridge = readSharedGlobal<((d: PlayerSnapshot) => void)>("__MGH_POST_PLAYERINFO");
  if (typeof postBridge === "function") {
    try { postBridge(snap); } catch {}
  }
}

export function updatePlayerInfo() {
  const prevOff = readSharedGlobal<() => void>("__MGH_UNSUB_PLAYERS");
  if (typeof prevOff === "function") { try { prevOff(); } catch {} }

  let done = false;

  const off = onPlayers(async () => {
    if (done) return;

    const info = await myPlayer.get();
    const databaseUserId = String(info?.databaseUserId || "");
    if (!databaseUserId) return; // no ID → nothing to do

    if (hasPlayerDataByDbId(databaseUserId)) {
      const snap = await buildSnapshot(info);
      if (snap) {
        pushSnapshot(snap);
        done = true;
        off();                                  // unsubscribe as soon as it is ready
        shareGlobal("__MGH_UNSUB_PLAYERS", undefined);
      }
    }
  });

  shareGlobal("__MGH_UNSUB_PLAYERS", off);
  return off;
}
