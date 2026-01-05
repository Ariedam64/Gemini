import {
  statePlayersView,
  stateHostPlayerIdView,
  stateUserSlotsView,
} from "../../atoms";
import { Store } from "../../atoms/store";
import { deepEqual } from "../core/reactive";
import type {
  PlayersGlobal,
  PlayersData,
  Player,
  PlayerJoinLeaveEvent,
  PlayerConnectionChange,
  HostChange,
  SubscribeOptions,
  Unsubscribe,
} from "../core/types";

type RawPlayer = {
  id: string;
  name: string;
  isConnected: boolean;
  discordAvatarUrl: string | null;
  cosmetic: {
    color: string;
    avatar: string[];
  };
  emoteData: {
    emoteType: number;
  };
  databaseUserId: string;
  guildId: string | null;
};

type RawUserSlot = {
  type: string;
  playerId: string;
  databaseUserId: string;
  data: {
    schemaVersion: number;
    coinsCount: number;
    inventory: unknown;
    garden: unknown;
    petSlots: unknown[];
    customRestocks: unknown;
    shopPurchases: unknown;
    journal: unknown;
    tasksCompleted: unknown[];
    stats: unknown;
    activityLogs: unknown[];
  };
  position: { x: number; y: number } | null;
  petSlotInfos: unknown;
  customRestockInventories: unknown;
  lastActionEvent: {
    action: string | null;
    data: unknown;
    timestamp: number | null;
  } | null;
  hasBeenSupersededByAnotherRoom: boolean;
  notAuthoritative_selectedItemIndex: number | null;
  lastSlotMachineInfo: unknown;
};

type PlayersSources = {
  players: RawPlayer[];
  hostPlayerId: string;
  userSlots: (RawUserSlot | null)[];
  myUserSlotIndex: number | null;
};

const initialData: PlayersData = {
  all: [],
  host: null,
  myPlayer: null,
  count: 0,
};

function buildPlayer(
  raw: RawPlayer,
  hostPlayerId: string,
  userSlotMap: Map<string, { slot: RawUserSlot; index: number }>
): Player {
  const slotEntry = userSlotMap.get(raw.id);
  const slot = slotEntry?.slot;
  const slotData = slot?.data;
  const lastActionEvent = slot?.lastActionEvent;

  return {
    // Identité
    id: raw.id,
    name: raw.name,
    discordId: raw.databaseUserId,
    discordAvatarUrl: raw.discordAvatarUrl,
    guildId: raw.guildId,

    // État
    isConnected: raw.isConnected,
    isHost: raw.id === hostPlayerId,
    slotIndex: slotEntry?.index ?? null,
    position: slot?.position ?? null,

    // Apparence
    cosmetic: {
      color: raw.cosmetic?.color ?? "",
      avatar: raw.cosmetic?.avatar ? [...raw.cosmetic.avatar] : [],
    },
    emote: {
      type: raw.emoteData?.emoteType ?? -1,
    },

    // Économie
    coins: slotData?.coinsCount ?? 0,
    inventory: slotData?.inventory ?? null,
    shopPurchases: slotData?.shopPurchases ?? null,

    // Jardin
    garden: slotData?.garden ?? null,

    // Pets
    pets: {
      slots: slotData?.petSlots ?? [],
      slotInfos: slot?.petSlotInfos ?? null,
    },

    // Progression
    journal: slotData?.journal ?? null,
    stats: slotData?.stats ?? null,
    tasksCompleted: slotData?.tasksCompleted ?? [],
    activityLogs: slotData?.activityLogs ?? [],

    // Restocks personnalisés
    customRestocks: {
      config: slotData?.customRestocks ?? null,
      inventories: slot?.customRestockInventories ?? null,
    },

    // Actions
    lastAction: lastActionEvent
      ? {
        type: lastActionEvent.action,
        data: lastActionEvent.data,
        timestamp: lastActionEvent.timestamp,
      }
      : null,
    selectedItemIndex: slot?.notAuthoritative_selectedItemIndex ?? null,
    lastSlotMachineInfo: slot?.lastSlotMachineInfo ?? null,
  };
}

function buildData(sources: PlayersSources): PlayersData {
  const players = sources.players;
  const hostPlayerId = sources.hostPlayerId ?? "";
  const userSlots = sources.userSlots ?? [];
  const myUserSlotIndex = sources.myUserSlotIndex;

  if (!players || !Array.isArray(players) || players.length === 0) {
    return initialData;
  }

  const userSlotMap = new Map<string, { slot: RawUserSlot; index: number }>();
  if (Array.isArray(userSlots)) {
    userSlots.forEach((slot, index) => {
      if (slot?.type === "user" && slot?.playerId) {
        userSlotMap.set(slot.playerId, { slot, index });
      }
    });
  }

  const all = players.map((raw) => buildPlayer(raw, hostPlayerId, userSlotMap));
  const host = all.find((p) => p.isHost) ?? null;
  const myPlayer = myUserSlotIndex !== null
    ? all.find((p) => p.slotIndex === myUserSlotIndex) ?? null
    : null;

  return {
    all,
    host,
    myPlayer,
    count: all.length,
  };
}

function getStableKey(data: PlayersData): string {
  const playerKeys = data.all.map((p) => `${p.id}:${p.isConnected}:${p.isHost}`);
  return JSON.stringify({
    playerKeys,
    hostId: data.host?.id ?? null,
    count: data.count,
  });
}

type ListenerSets = {
  all: Set<(value: PlayersData, prev: PlayersData) => void>;
  stable: Set<(value: PlayersData, prev: PlayersData) => void>;
  joinLeave: Set<(event: PlayerJoinLeaveEvent) => void>;
  connection: Set<(event: PlayerConnectionChange) => void>;
  host: Set<(event: HostChange) => void>;
};

function detectJoinLeave(prev: Player[], next: Player[]): PlayerJoinLeaveEvent[] {
  const events: PlayerJoinLeaveEvent[] = [];
  const prevIds = new Set(prev.map((p) => p.id));
  const nextIds = new Set(next.map((p) => p.id));

  for (const player of next) {
    if (!prevIds.has(player.id)) {
      events.push({ player, type: "join" });
    }
  }

  for (const player of prev) {
    if (!nextIds.has(player.id)) {
      events.push({ player, type: "leave" });
    }
  }

  return events;
}

function detectConnectionChanges(prev: Player[], next: Player[]): PlayerConnectionChange[] {
  const changes: PlayerConnectionChange[] = [];
  const prevMap = new Map(prev.map((p) => [p.id, p]));

  for (const player of next) {
    const prevPlayer = prevMap.get(player.id);
    if (prevPlayer && prevPlayer.isConnected !== player.isConnected) {
      changes.push({ player, isConnected: player.isConnected });
    }
  }

  return changes;
}

function createPlayersGlobal(): PlayersGlobal {
  let currentData: PlayersData = initialData;
  let previousData: PlayersData = initialData;
  let initialized = false;
  const unsubscribes: Unsubscribe[] = [];

  const listeners: ListenerSets = {
    all: new Set(),
    stable: new Set(),
    joinLeave: new Set(),
    connection: new Set(),
    host: new Set(),
  };

  const sources: Partial<PlayersSources> = {};
  const ready = new Set<keyof PlayersSources>();
  const sourceCount = 4;

  function notify(): void {
    if (ready.size < sourceCount) return;

    const nextData = buildData(sources as PlayersSources);

    if (deepEqual(currentData, nextData)) return;

    previousData = currentData;
    currentData = nextData;

    if (!initialized) return;

    for (const cb of listeners.all) {
      cb(currentData, previousData);
    }

    if (getStableKey(previousData) !== getStableKey(currentData)) {
      for (const cb of listeners.stable) {
        cb(currentData, previousData);
      }
    }

    const joinLeaveEvents = detectJoinLeave(previousData.all, currentData.all);
    for (const event of joinLeaveEvents) {
      for (const cb of listeners.joinLeave) {
        cb(event);
      }
    }

    const connectionChanges = detectConnectionChanges(previousData.all, currentData.all);
    for (const change of connectionChanges) {
      for (const cb of listeners.connection) {
        cb(change);
      }
    }

    const prevHostId = previousData.host?.id ?? null;
    const currHostId = currentData.host?.id ?? null;
    if (prevHostId !== currHostId) {
      const event: HostChange = {
        current: currentData.host,
        previous: previousData.host,
      };
      for (const cb of listeners.host) {
        cb(event);
      }
    }
  }

  async function init(): Promise<void> {
    if (initialized) return;

    const unsub1 = await statePlayersView.onChangeNow((value) => {
      sources.players = value as RawPlayer[];
      ready.add("players");
      notify();
    });
    unsubscribes.push(unsub1);

    const unsub2 = await stateHostPlayerIdView.onChangeNow((value) => {
      sources.hostPlayerId = value;
      ready.add("hostPlayerId");
      notify();
    });
    unsubscribes.push(unsub2);

    const unsub3 = await stateUserSlotsView.onChangeNow((value) => {
      sources.userSlots = value as (RawUserSlot | null)[];
      ready.add("userSlots");
      notify();
    });
    unsubscribes.push(unsub3);

    const unsub4 = await Store.subscribe("myUserSlotIdxAtom", (value: unknown) => {
      sources.myUserSlotIndex = value as number | null;
      ready.add("myUserSlotIndex");
      notify();
    });
    unsubscribes.push(unsub4);

    initialized = true;

    if (ready.size === sourceCount) {
      currentData = buildData(sources as PlayersSources);
    }
  }

  init();

  return {
    get(): PlayersData {
      return currentData;
    },

    subscribe(callback: (value: PlayersData, prev: PlayersData) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.all.add(callback);
      if (options?.immediate !== false && initialized && ready.size === sourceCount) {
        callback(currentData, currentData);
      }
      return () => listeners.all.delete(callback);
    },

    subscribeStable(callback: (value: PlayersData, prev: PlayersData) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.stable.add(callback);
      if (options?.immediate !== false && initialized && ready.size === sourceCount) {
        callback(currentData, currentData);
      }
      return () => listeners.stable.delete(callback);
    },

    subscribeJoinLeave(callback: (event: PlayerJoinLeaveEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.joinLeave.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const player of currentData.all) {
          callback({ player, type: "join" });
        }
      }
      return () => listeners.joinLeave.delete(callback);
    },

    subscribeConnection(callback: (event: PlayerConnectionChange) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.connection.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const player of currentData.all) {
          callback({ player, isConnected: player.isConnected });
        }
      }
      return () => listeners.connection.delete(callback);
    },

    subscribeHost(callback: (event: HostChange) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.host.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        callback({ current: currentData.host, previous: currentData.host });
      }
      return () => listeners.host.delete(callback);
    },

    destroy(): void {
      for (const unsub of unsubscribes) {
        unsub();
      }
      unsubscribes.length = 0;
      listeners.all.clear();
      listeners.stable.clear();
      listeners.joinLeave.clear();
      listeners.connection.clear();
      listeners.host.clear();
      initialized = false;
    },
  };
}

let instance: PlayersGlobal | null = null;

export function getPlayers(): PlayersGlobal {
  if (!instance) {
    instance = createPlayersGlobal();
  }
  return instance;
}
