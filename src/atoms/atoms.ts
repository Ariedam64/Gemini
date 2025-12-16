// src/store/atoms.ts
import { makeAtom, makeView } from "./views";

/* Types locaux si tu veux, sinon importe depuis un fichier types.ts */
export type XY = { x: number; y: number };
export type GardenState = { tileObjects: Record<string, any>; boardwalkTileObjects: Record<string, any>; };
export type CurrentGardenObject =
  | { objectType: "plant"; species: string; slots: any[]; plantedAt?: number; maturedAt?: number }
  | Record<string, unknown> | null;

export type PetSlot = { id: string; petSpecies: string; name?: string | null; xp?: number; hunger?: number; mutations?: string[]; targetScale?: number; abilities?: string[]; };
export type PetInfo = { slot: PetSlot; position?: XY | null };
export type PetState = PetInfo[] | null;

export type ToolItem = { toolId: string; itemType: string; quantity: number };
export type DecorItem = { decorId: string; itemType: "Decor"; quantity: number };
export type CropItem = { id: string; species?: string; itemType?: string; scale?: number; mutations?: string[]; };
export type SeedItem = { species: string; itemType: "Seed"; quantity: number };

export type CropInventoryState = CropItem[] | null;
export type SeedInventoryState = SeedItem[] | null;
export type ToolInventoryState = ToolItem[] | null;
export type DecorInventoryState = DecorItem[] | null;
export type AvatarTriggerAnimation = { playerId: string; animation: string };

/* Root atoms */
export const position = makeAtom<XY>("positionAtom");
export const state = makeAtom<any>("stateAtom");
export const map = makeAtom<any>("mapAtom");
export const action = makeAtom<any | null>("actionAtom");

export const myPlayer = makeAtom<any>("playerAtom");
export const myData = makeAtom<any>("myDataAtom");
export const myInventory = makeAtom<any>("myInventoryAtom");

export const myCropInventory = makeAtom<CropInventoryState>("myCropInventoryAtom");
export const mySeedInventory = makeAtom<SeedInventoryState>("mySeedInventoryAtom");
export const myToolInventory = makeAtom<ToolInventoryState>("myToolInventoryAtom");
export const myEggInventory = makeAtom<ToolInventoryState>("myEggInventoryAtom");
export const myDecorInventory = makeAtom<DecorInventoryState>("myDecorInventoryAtom");
export const myPetInfos = makeAtom<PetState>("myPetInfosAtom");
export const myPetSlotInfos = makeAtom<any>("myPetSlotInfosAtom");
export const totalPetSellPrice = makeAtom<number>("totalPetSellPriceAtom");
export const expandedPetSlotId = makeAtom<string>("expandedPetSlotIdAtom");
export const myCropItemsToSell = makeAtom<any>("myCropItemsToSellAtom");

export const shops = makeAtom<any>("shopsAtom");
export const myShopPurchases = makeAtom<any>("myShopPurchasesAtom");

export const numPlayers = makeAtom<number>("numPlayersAtom");
export const totalCropSellPrice = makeAtom<number>("totalCropSellPriceAtom");

export const myValidatedSelectedItemIndex = makeAtom<number | null>("myValidatedSelectedItemIndexAtom");
export const setSelectedIndexToEnd = makeAtom<number | null>("setSelectedIndexToEndAtom");
export const mySelectedItemName = makeAtom<any>("mySelectedItemNameAtom");
export const myPossiblyNoLongerValidSelectedItemIndex = makeAtom<number | null>("myPossiblyNoLongerValidSelectedItemIndexAtom");

export const myCurrentGardenObject = makeAtom<CurrentGardenObject>("myCurrentGardenObjectAtom");
export const myCurrentSortedGrowSlotIndices = makeAtom<number[] | null>("myCurrentSortedGrowSlotIndicesAtom");
export const myCurrentGrowSlotIndex = makeAtom<number | null>("myCurrentGrowSlotIndexAtom");

export const myOwnCurrentGardenObject = makeAtom<any>("myOwnCurrentGardenObjectAtom");
export const isCurrentGrowSlotMature = makeAtom<any>("isCurrentGrowSlotMatureAtom");
export const myOwnCurrentDirtTileIndex = makeAtom<any>("myOwnCurrentDirtTileIndexAtom");

export const weather = makeAtom<string | null>("weatherAtom");

export const activeModal = makeAtom<string | null>("activeModalAtom");
export const avatarTriggerAnimationAtom = makeAtom<AvatarTriggerAnimation | null>("avatarTriggerAnimationAtom");

/* Derived views */
export const garden = makeView<any, GardenState | null>("myDataAtom", { path: "garden" });
export const gardenTileObjects = makeView<any, Record<string, any>>("myDataAtom", { path: "garden.tileObjects" });
export const favoriteIds = makeView<any, string[]>("myInventoryAtom", { path: "favoritedItemIds" });
export const playerId = makeView<any, string | null>("playerAtom", { path: "id" });
export const myOwnCurrentGardenObjectType = makeView<any, string | null>("myOwnCurrentGardenObjectAtom", { path: "objectType" });

export const stateChild = makeView<any, any>("stateAtom", { path: "child" });
export const stateChildData = makeView<any, any>("stateAtom", { path: "child.data" });
export const stateShops = makeView<any, any>("stateAtom", { path: "child.data.shops" });
export const stateUserSlots = makeView<any, any>("stateAtom", { path: "child.data.userSlots" });
export const statePlayers = makeView<any, any[] | undefined>("stateAtom", { path: "data.players" });

export const seedShop  = makeView<any, any>("shopsAtom", { path: "seed"  });
export const toolShop  = makeView<any, any>("shopsAtom", { path: "tool"  });
export const eggShop   = makeView<any, any>("shopsAtom", { path: "egg"   });
export const decorShop = makeView<any, any>("shopsAtom", { path: "decor" });

export const mapCols = makeView<any, any>("mapAtom", { path: "cols" });
export const mapRows = makeView<any, any>("mapAtom", { path: "rows" });
export const mapSpawnTiles = makeView<any, any>("mapAtom", { path: "spawnTiles" });
export const mapSeedShopSpawnLocation = makeView<any, any>("mapAtom", { path: "locations.seedShop.spawnTileIdx" });
export const mapEggShopSpawnLocation = makeView<any, any>("mapAtom", { path: "locations.eggShop.spawnTileIdx" });
export const mapToolShopSpawnLocation = makeView<any, any>("mapAtom", { path: "locations.toolShop.spawnTileIdx" });
export const mapDecorShopSpawnLocation = makeView<any, any>("mapAtom", { path: "locations.decorShop.spawnTileIdx" });
export const mapSellAllCropsShopSpawnLocation = makeView<any, any>("mapAtom", { path: "locations.sellCropsShop.spawnTileIdx" });
export const mapSellPetShopSpawnLocation = makeView<any, any>("mapAtom", { path: "locations.sellPetShop.spawnTileIdx" });
export const mapsCollectorsClubSpawnLocation = makeView<any, any>("mapAtom", { path: "locations.collectorsClub.spawnTileIdx" });
export const mapsWishingWellSpawnLocation = makeView<any, any>("mapAtom", { path: "locations.wishingWell.spawnTileIdx" });
export const mapsShopsCenterSpawnLocation = makeView<any, any>("mapAtom", { path: "locations.shopsCenter.spawnTileIdx" });


