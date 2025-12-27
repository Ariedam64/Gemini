import type { CardinalDirection } from './types';
/**
 * The location names that are supported in the Quinoa world.
 * This is the single source of truth for location names.
 */
export const LOCATION_NAMES = [
  'seedShop',
  'eggShop',
  'toolShop',
  'decorShop',
  'sellCropsShop',
  'sellPetShop',
  'collectorsClub',
  'wishingWell',
  'shopsCenter',
] as const;

export const DirectionMap: Record<CardinalDirection, { x: number; y: number }> =
  {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };
