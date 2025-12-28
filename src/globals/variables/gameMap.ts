import { Store } from "../../atoms/store";
import type {
  GameMapGlobal,
  GameMapData,
  XY,
  MapTile,
  UserSlotTiles,
  MapLocation,
  Unsubscribe,
} from "../core/types";

type RawMapData = {
  cols: number;
  rows: number;
  spawnTiles: number[];
  userSlotIdxAndDirtTileIdxToGlobalTileIdx: number[][];
  userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx: number[][];
  globalTileIdxToDirtTile: Record<string, { userSlotIdx: number; dirtTileIdx: number }>;
  globalTileIdxToBoardwalkTile: Record<string, { userSlotIdx: number; boardwalkTileIdx: number }>;
  locations?: Record<string, { spawnTileIdx: number[] }>;
};

function createGameMapGlobal(): GameMapGlobal {
  let data: GameMapData | null = null;
  let unsubscribe: Unsubscribe | null = null;
  const readyCallbacks = new Set<(data: GameMapData) => void>();

  function globalToXY(cols: number, globalIndex: number): XY {
    return {
      x: globalIndex % cols,
      y: Math.floor(globalIndex / cols),
    };
  }

  function xyToGlobal(cols: number, x: number, y: number): number {
    return y * cols + x;
  }

  function buildMapData(raw: RawMapData): GameMapData {
    const { cols, rows } = raw;
    const totalTiles = cols * rows;

    const dirtTileSet = new Set<number>();
    const boardwalkTileSet = new Set<number>();
    const tileOwnerMap = new Map<number, number>();

    const userSlots: UserSlotTiles[] = [];

    const dirtArrays = raw.userSlotIdxAndDirtTileIdxToGlobalTileIdx ?? [];
    const boardwalkArrays = raw.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx ?? [];

    const maxSlots = Math.max(dirtArrays.length, boardwalkArrays.length);

    for (let slotIdx = 0; slotIdx < maxSlots; slotIdx++) {
      const dirtGlobals = dirtArrays[slotIdx] ?? [];
      const boardwalkGlobals = boardwalkArrays[slotIdx] ?? [];

      const dirtTiles: MapTile[] = dirtGlobals.map((globalIndex, localIndex) => {
        dirtTileSet.add(globalIndex);
        tileOwnerMap.set(globalIndex, slotIdx);
        return {
          globalIndex,
          localIndex,
          position: globalToXY(cols, globalIndex),
        };
      });

      const boardwalkTiles: MapTile[] = boardwalkGlobals.map((globalIndex, localIndex) => {
        boardwalkTileSet.add(globalIndex);
        tileOwnerMap.set(globalIndex, slotIdx);
        return {
          globalIndex,
          localIndex,
          position: globalToXY(cols, globalIndex),
        };
      });

      userSlots.push({
        userSlotIdx: slotIdx,
        dirtTiles,
        boardwalkTiles,
        allTiles: [...dirtTiles, ...boardwalkTiles],
      });
    }

    const spawnPositions = raw.spawnTiles.map((idx) => globalToXY(cols, idx));

    const locations: Record<string, MapLocation> = {};
    if (raw.locations) {
      for (const [name, loc] of Object.entries(raw.locations)) {
        const spawnTiles = loc.spawnTileIdx ?? [];
        locations[name] = {
          name,
          spawnTiles,
          spawnPositions: spawnTiles.map((idx) => globalToXY(cols, idx)),
        };
      }
    }

    return {
      cols,
      rows,
      totalTiles,
      spawnTiles: raw.spawnTiles,
      spawnPositions,
      locations,
      userSlots,

      globalToXY(globalIndex: number): XY {
        return globalToXY(cols, globalIndex);
      },

      xyToGlobal(x: number, y: number): number {
        return xyToGlobal(cols, x, y);
      },

      getTileOwner(globalIndex: number): number | null {
        return tileOwnerMap.get(globalIndex) ?? null;
      },

      isDirtTile(globalIndex: number): boolean {
        return dirtTileSet.has(globalIndex);
      },

      isBoardwalkTile(globalIndex: number): boolean {
        return boardwalkTileSet.has(globalIndex);
      },
    };
  }

  async function init(): Promise<void> {
    unsubscribe = await Store.subscribe("mapAtom", (value: unknown) => {
      if (!value || data) return;

      const raw = value as RawMapData;
      data = buildMapData(raw);

      for (const cb of readyCallbacks) {
        cb(data);
      }
      readyCallbacks.clear();
    });
  }

  init();

  return {
    get(): GameMapData | null {
      return data;
    },

    isReady(): boolean {
      return data !== null;
    },

    onReady(callback: (data: GameMapData) => void): Unsubscribe {
      if (data) {
        callback(data);
        return () => {};
      }

      readyCallbacks.add(callback);
      return () => readyCallbacks.delete(callback);
    },

    destroy(): void {
      unsubscribe?.();
      unsubscribe = null;
      data = null;
      readyCallbacks.clear();
    },
  };
}

let instance: GameMapGlobal | null = null;

export function getGameMap(): GameMapGlobal {
  if (!instance) {
    instance = createGameMapGlobal();
  }
  return instance;
}
