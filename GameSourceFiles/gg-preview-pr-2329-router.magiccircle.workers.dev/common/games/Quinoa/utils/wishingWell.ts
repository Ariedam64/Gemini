import { QuinoaUserJson } from '../user-json-schema/current';

/**
 * Checks if a player is "broke" - meaning they can't continue playing the game.
 * A player is considered broke if:
 * 1. They have less than 10 coins (can't afford a carrot)
 * 2. They have no plant tiles in their garden (nothing growing)
 * 3. They have no plants or produce in their inventory
 */
export const getIsPlayerBroke = (data: QuinoaUserJson): boolean => {
  // Check if they have less than 10 coins
  const hasInsufficientCoins = data.coinsCount < 10;
  // Check if they have any plant tiles in their garden
  const hasPlantTiles = Object.values(data.garden.tileObjects).some(
    (tileObject) => tileObject.objectType === 'plant'
  );
  // Check if they have any plants or produce in their inventory
  const hasPlantOrProduceInInventory = data.inventory.items.some(
    (item) => item.itemType === 'Plant' || item.itemType === 'Produce'
  );
  // Player is broke if they have insufficient coins AND no plant tiles AND no plants/produce in inventory
  return (
    hasInsufficientCoins && !hasPlantTiles && !hasPlantOrProduceInInventory
  );
};
