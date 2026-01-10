import placeholderData1 from '@/common/games/Quinoa/placeholder-user-data/1.json';
import placeholderData2 from '@/common/games/Quinoa/placeholder-user-data/2.json';
import placeholderData3 from '@/common/games/Quinoa/placeholder-user-data/3.json';
import placeholderData4 from '@/common/games/Quinoa/placeholder-user-data/4.json';
import placeholderData5 from '@/common/games/Quinoa/placeholder-user-data/5.json';
import placeholderData6 from '@/common/games/Quinoa/placeholder-user-data/6.json';
import placeholderDataBeta from '@/common/games/Quinoa/placeholder-user-data/beta.json';
import type {
  Garden,
  QuinoaUserJson,
} from '@/common/games/Quinoa/user-json-schema/current';
import { environment } from '@/environment';

// Type assertion to ensure the imported JSON matches QuinoaUserData structure
const placeholderUserDataSets: QuinoaUserJson[] = [
  placeholderData1 as unknown as QuinoaUserJson,
  (environment === 'Production'
    ? placeholderData2
    : placeholderDataBeta) as unknown as QuinoaUserJson,
  placeholderData3 as unknown as QuinoaUserJson,
  placeholderData4 as unknown as QuinoaUserJson,
  placeholderData5 as unknown as QuinoaUserJson,
  placeholderData6 as unknown as QuinoaUserJson,
  // TODO: Add additional placeholder data files here (up to 10 total)
];

/**
 * Gets placeholder garden data for a specific slot index.
 * Slot 0 uses placeholderData1, slot 1 uses placeholderData2, etc.
 * This ensures stable, predictable gardens across all players.
 * @param slotIndex The garden slot index (0-based)
 * @returns Garden tileObjects for the specified slot, or empty object if no data available
 */
export function getPlaceholderGardenForSlot(slotIndex: number): Garden {
  // Map slot index to placeholder data (1-based indexing for the data files)
  const dataIndex = slotIndex % placeholderUserDataSets.length;
  const placeholderData = placeholderUserDataSets[dataIndex];

  return placeholderData
    ? placeholderData.garden
    : {
        tileObjects: {},
        boardwalkTileObjects: {},
      };
}
