/**
 * The spritesheets used in the game.
 */
export enum Spritesheet {
  Plants = 'plants',
  TallPlants = 'tallplants',
  Seeds = 'seeds',
  Items = 'items',
  Animations = 'animations',
  Mutations = 'mutations',
  MutationOverlays = 'mutation-overlays',
  Pets = 'pets',
  Decor = 'decor',
}
/**
 * A reference to a tile within a specific spritesheet.
 * Can either be a tile with a spritesheet and index, or explicitly empty.
 */
export type TileRef = {
  type: 'tile';
  spritesheet: Spritesheet;
  index: number;
};
/**
 * Represents a reference to a set of tiles within a specific spritesheet
 * Can either be a tile with a spritesheet and index, or explicitly empty
 */
export type TileRefs = {
  type: 'tile';
  spritesheet: Spritesheet;
  indices: number[];
};

/**
 * Represents a tile reference with optional flips for rotation variants
 */
export type RotatedTileRef = {
  tileRef: TileRef;
  flipH?: boolean;
  flipV?: boolean;
  flipD?: boolean;
  baseTileScale?: number;
  nudgeY?: number;
};

/**
 * Map of rotation degrees to their corresponding tile references
 */
export type TileRefsByRotation = Partial<Record<number, RotatedTileRef>>;
