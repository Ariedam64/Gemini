import {
    mapCols, 
    mapRows, 
    mapSpawnTiles,
    mapEggShopSpawnLocation,
    mapDecorShopSpawnLocation, 
    mapSeedShopSpawnLocation, 
    mapToolShopSpawnLocation,
    mapSellAllCropsShopSpawnLocation,
    mapSellPetShopSpawnLocation,
    mapsCollectorsClubSpawnLocation,
    mapsWishingWellSpawnLocation,
    mapsShopsCenterSpawnLocation,
} from "../atoms";

import { centerTileForShop } from "./map.state";
import { teleport, move } from "../../core/ws";


type ShopHop = {
  shop: string;
  fromTile: number;
  toTile: number;
  steps: number;
  estimatedMs: number;
};

const MOVES_PER_SECOND = 4;

export async function tileToXY(
  tile: number,
  opts: { indexBase?: 0 | 1; coordsBase?: 0 | 1; strict?: boolean } = {}
): Promise<{ x: number; y: number }> {
  const cols = await mapCols.get()
  const rows = await mapRows.get()
  const { indexBase = 0, coordsBase = 0, strict = true } = opts;

  if (!Number.isInteger(cols) || cols <= 0) throw new RangeError("Invalid cols");
  if (!Number.isInteger(rows) || rows <= 0) throw new RangeError("Invalid rows");
  if (!Number.isInteger(tile)) throw new TypeError("`tile` must be an integer");

  // Normalize to 0-based index
  const i0 = indexBase === 1 ? tile - 1 : tile;

  if (strict) {
    const max = cols * rows - 1;
    if (i0 < 0 || i0 > max) {
      const minShown = indexBase === 1 ? 1 : 0;
      const maxShown = indexBase === 1 ? max + 1 : max;
      throw new RangeError(`Tile out of bounds: expected [${minShown}..${maxShown}]`);
    }
  }

  const x0 = i0 % cols;
  const y0 = Math.floor(i0 / cols);

  return {
    x: coordsBase === 1 ? x0 + 1 : x0,
    y: coordsBase === 1 ? y0 + 1 : y0,
  };
}

async function tpFromTiles(
  tiles: number[] | null | undefined,
  opts: { index?: number } = {}
) {
  if (!tiles || tiles.length === 0) return;

  const { index } = opts;

  let tile: number;

  if (index != null) {
    if (!Number.isInteger(index) || index < 0 || index >= tiles.length) {return;}
    tile = tiles[index];
  } else {
    const randomIdx = Math.floor(Math.random() * tiles.length);
    tile = tiles[randomIdx];
  }

  const { x, y } = await tileToXY(tile);
  teleport(x, y);
}


export async function tpToSpawn(spawnIndex: number) {
  const spawnTiles = await mapSpawnTiles.get();
  return tpFromTiles(spawnTiles, {index: spawnIndex})
}

export async function tpToSeedShop() {
  const seedShopTiles = await mapSeedShopSpawnLocation.get();
  return tpFromTiles(seedShopTiles)
}

export async function tpToToolShop() {
  const toolShopTiles = await mapToolShopSpawnLocation.get();
  return tpFromTiles(toolShopTiles)
}

export async function tpToEggShop() {
  const eggShopTiles = await mapEggShopSpawnLocation.get();
  return tpFromTiles(eggShopTiles)
}

export async function tpToDecorShop() {
  const decorShopTiles = await mapDecorShopSpawnLocation.get();
  return tpFromTiles(decorShopTiles)
}


export async function tpToSellAllCropsShop() {
  const sellAllCropsShopTiles = await mapSellAllCropsShopSpawnLocation.get();
  return tpFromTiles(sellAllCropsShopTiles)
}

export async function tpToSellPetShop() {
  const sellPetShopTiles = await mapSellPetShopSpawnLocation.get();
  return tpFromTiles(sellPetShopTiles)
}

export async function tpToCollectorsClub() {
  const collectorsClubTiles = await mapsCollectorsClubSpawnLocation.get();
  return tpFromTiles(collectorsClubTiles)
}

export async function tpToWishingWell() {
  const wishingWellTiles = await mapsWishingWellSpawnLocation.get();
  return tpFromTiles(wishingWellTiles)
}

export async function tpToShopsCenter(shopIndex: number) {
  const shopCentersTiles = await mapsShopsCenterSpawnLocation.get();
  return tpFromTiles(shopCentersTiles, {index: shopIndex})
}

async function distTiles(a: number, b: number): Promise<number> {
  const COLS = await mapCols.get()
  const ax = a % COLS;
  const ay = Math.floor(a / COLS);
  const bx = b % COLS;
  const by = Math.floor(b / COLS);
  return Math.abs(ax - bx) + Math.abs(ay - by);
}

export async function computeShopRoute(startTile: number, priority: string[]):  Promise<ShopHop[]> {
  const route: ShopHop[] = [];
  let current = startTile;

  for (const shop of priority) {
    const target = centerTileForShop[shop];
    if (target == null) continue;

    const steps = await distTiles(current, target);
    const estimatedMs = (steps / MOVES_PER_SECOND) * 1000;

    route.push({
      shop,
      fromTile: current,
      toTile: target,
      steps,
      estimatedMs,
    });

    current = target;
  }

  return route;
}


async function moveToTile(tile: number): Promise<void> {
  const COLS = await mapCols.get();
  const x = tile % COLS;
  const y = Math.floor(tile / COLS);
  await move(x, y);
}

export async function moveToShopCenter(shop: string, fromTile: number): Promise<{ toTile: number; steps: number }> {
  const target = centerTileForShop[shop];
  if (target == null) return { toTile: fromTile, steps: 0 };
  const steps = await distTiles(fromTile, target);
  await moveToTile(target);
  return { toTile: target, steps };
}

