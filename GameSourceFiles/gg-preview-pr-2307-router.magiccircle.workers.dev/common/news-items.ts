export enum NewsItemId {
  SpookyContent = 1, // September 2024
  PoliticalContent = 2, // October 1 2024
  Crapitalism = 3, // October 14, 2024
  Strippening = 4, // December 20, 2024
  Rainbowpocalypse = 5, // August 2025
  Halloween2025 = 6, // October 2025
}

export const allNewsItemIds: number[] = Object.values(NewsItemId).filter(
  (value): value is number => typeof value === 'number'
);

// Add current news items to this array during the period they are relevant
// We don't necessarily want to announce all news items to the user
// For example, the Political content pack is only relevant for a short period of time
// So we should only announce it for a short period of time
export const newsItemsToAnnounce: NewsItemId[] = [];

/**
 * Type guard to check if a given number is a valid NewsItemId.
 *
 * @param newsItemId - The number to check.
 * @returns True if the number is a valid NewsItemId, false otherwise.
 */
export function isValidNewsItemId(
  newsItemId: number
): newsItemId is NewsItemId {
  return allNewsItemIds.includes(newsItemId);
}
