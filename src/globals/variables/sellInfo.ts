import {
  totalCropSellPriceAtom,
  friendBonusMultiplierAtom,
  hasNewCropLogsFromSellingAtom,
  newCropLogsFromSellingAtom,
  newLogsAtom,
} from "../../atoms";
import type {
  SellInfoGlobal,
  SellInfoData,
  SellLogEntry,
  SellEvent,
  NewLogsEvent,
  PendingLogs,
  NewVariants,
  Unsubscribe,
} from "../core/types";

type RawCropLog = {
  species?: string;
  quantity?: number;
  price?: number;
  timestamp?: number;
};

type RawNewLogs = {
  allNewCropVariants?: Record<string, string[]>;
  newCropVariantsFromSelling?: Record<string, string[]>;
  newPetVariants?: Record<string, string[]>;
  newPetAbilities?: Record<string, string[]>;
};

type SellInfoSources = {
  totalPrice: number;
  friendBonus: number;
  hasNewLogs: boolean;
  rawLogs: unknown[];
  newLogs: RawNewLogs | null;
};

const emptyVariants: NewVariants = {};

const emptyPendingLogs: PendingLogs = {
  crops: {
    all: emptyVariants,
    fromSelling: emptyVariants,
  },
  pets: {
    variants: emptyVariants,
    abilities: emptyVariants,
  },
  hasPending: false,
  totalCount: 0,
};

const initialData: SellInfoData = {
  totalPrice: 0,
  friendBonus: 1,
  hasNewLogs: false,
  recentLogs: [],
  pendingLogs: emptyPendingLogs,
};

function parseLog(raw: unknown): SellLogEntry | null {
  if (!raw || typeof raw !== "object") return null;

  const log = raw as RawCropLog;
  if (!log.species) return null;

  return {
    species: log.species,
    quantity: log.quantity ?? 1,
    price: log.price ?? 0,
    timestamp: log.timestamp ?? Date.now(),
  };
}

function countVariants(variants: NewVariants): number {
  let count = 0;
  for (const species of Object.keys(variants)) {
    count += variants[species].length;
  }
  return count;
}

function buildPendingLogs(raw: RawNewLogs | null): PendingLogs {
  if (!raw) return emptyPendingLogs;

  const cropsAll = raw.allNewCropVariants ?? emptyVariants;
  const cropsFromSelling = raw.newCropVariantsFromSelling ?? emptyVariants;
  const petsVariants = raw.newPetVariants ?? emptyVariants;
  const petsAbilities = raw.newPetAbilities ?? emptyVariants;

  const totalCount =
    countVariants(cropsAll) +
    countVariants(petsVariants) +
    countVariants(petsAbilities);

  return {
    crops: {
      all: cropsAll,
      fromSelling: cropsFromSelling,
    },
    pets: {
      variants: petsVariants,
      abilities: petsAbilities,
    },
    hasPending: totalCount > 0,
    totalCount,
  };
}

function buildData(sources: SellInfoSources): SellInfoData {
  const recentLogs: SellLogEntry[] = [];

  for (const rawLog of sources.rawLogs ?? []) {
    const parsed = parseLog(rawLog);
    if (parsed) {
      recentLogs.push(parsed);
    }
  }

  return {
    totalPrice: sources.totalPrice ?? 0,
    friendBonus: sources.friendBonus ?? 1,
    hasNewLogs: sources.hasNewLogs ?? false,
    recentLogs,
    pendingLogs: buildPendingLogs(sources.newLogs),
  };
}

function arraysEqual(a: SellLogEntry[], b: SellLogEntry[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (
      a[i].species !== b[i].species ||
      a[i].quantity !== b[i].quantity ||
      a[i].price !== b[i].price ||
      a[i].timestamp !== b[i].timestamp
    ) {
      return false;
    }
  }
  return true;
}

function pendingLogsEqual(a: PendingLogs, b: PendingLogs): boolean {
  if (a.totalCount !== b.totalCount || a.hasPending !== b.hasPending) return false;
  return JSON.stringify(a) === JSON.stringify(b);
}

type ListenerSets = {
  all: Set<(value: SellInfoData, prev: SellInfoData) => void>;
  sell: Set<(event: SellEvent) => void>;
  newLogs: Set<(event: NewLogsEvent) => void>;
};

function createSellInfoGlobal(): SellInfoGlobal {
  let currentData: SellInfoData = initialData;
  let previousData: SellInfoData = initialData;
  let initialized = false;
  const unsubscribes: Unsubscribe[] = [];

  const listeners: ListenerSets = {
    all: new Set(),
    sell: new Set(),
    newLogs: new Set(),
  };

  const sources: Partial<SellInfoSources> = {};
  const ready = new Set<keyof SellInfoSources>();
  const sourceCount = 5;

  function notify(): void {
    if (ready.size < sourceCount) return;

    const nextData = buildData(sources as SellInfoSources);

    const hasChanged =
      currentData.totalPrice !== nextData.totalPrice ||
      currentData.friendBonus !== nextData.friendBonus ||
      currentData.hasNewLogs !== nextData.hasNewLogs ||
      !arraysEqual(currentData.recentLogs, nextData.recentLogs) ||
      !pendingLogsEqual(currentData.pendingLogs, nextData.pendingLogs);

    if (!hasChanged) return;

    previousData = currentData;
    currentData = nextData;

    if (!initialized) return;

    for (const cb of listeners.all) {
      cb(currentData, previousData);
    }

    if (currentData.hasNewLogs && currentData.recentLogs.length > previousData.recentLogs.length) {
      const newLogs = currentData.recentLogs.slice(previousData.recentLogs.length);
      if (newLogs.length > 0) {
        const event: SellEvent = {
          logs: newLogs,
          totalPrice: currentData.totalPrice,
        };
        for (const cb of listeners.sell) {
          cb(event);
        }
      }
    }

    if (!pendingLogsEqual(currentData.pendingLogs, previousData.pendingLogs)) {
      const event: NewLogsEvent = {
        pendingLogs: currentData.pendingLogs,
        previous: previousData.pendingLogs,
      };
      for (const cb of listeners.newLogs) {
        cb(event);
      }
    }
  }

  async function init(): Promise<void> {
    if (initialized) return;

    const unsub1 = await totalCropSellPriceAtom.onChangeNow((value) => {
      sources.totalPrice = value;
      ready.add("totalPrice");
      notify();
    });
    unsubscribes.push(unsub1);

    const unsub2 = await friendBonusMultiplierAtom.onChangeNow((value) => {
      sources.friendBonus = value;
      ready.add("friendBonus");
      notify();
    });
    unsubscribes.push(unsub2);

    const unsub3 = await hasNewCropLogsFromSellingAtom.onChangeNow((value) => {
      sources.hasNewLogs = value;
      ready.add("hasNewLogs");
      notify();
    });
    unsubscribes.push(unsub3);

    const unsub4 = await newCropLogsFromSellingAtom.onChangeNow((value) => {
      sources.rawLogs = value;
      ready.add("rawLogs");
      notify();
    });
    unsubscribes.push(unsub4);

    const unsub5 = await newLogsAtom.onChangeNow((value) => {
      sources.newLogs = value as RawNewLogs | null;
      ready.add("newLogs");
      notify();
    });
    unsubscribes.push(unsub5);

    initialized = true;

    if (ready.size === sourceCount) {
      currentData = buildData(sources as SellInfoSources);
    }
  }

  init();

  return {
    get(): SellInfoData {
      return currentData;
    },

    subscribe(callback: (value: SellInfoData, prev: SellInfoData) => void): Unsubscribe {
      listeners.all.add(callback);
      if (initialized && ready.size === sourceCount) {
        callback(currentData, currentData);
      }
      return () => listeners.all.delete(callback);
    },

    subscribeSell(callback: (event: SellEvent) => void): Unsubscribe {
      listeners.sell.add(callback);
      return () => listeners.sell.delete(callback);
    },

    subscribeNewLogs(callback: (event: NewLogsEvent) => void): Unsubscribe {
      listeners.newLogs.add(callback);
      return () => listeners.newLogs.delete(callback);
    },

    destroy(): void {
      for (const unsub of unsubscribes) {
        unsub();
      }
      unsubscribes.length = 0;
      listeners.all.clear();
      listeners.sell.clear();
      listeners.newLogs.clear();
      initialized = false;
    },
  };
}

let instance: SellInfoGlobal | null = null;

export function getSellInfo(): SellInfoGlobal {
  if (!instance) {
    instance = createSellInfoGlobal();
  }
  return instance;
}
