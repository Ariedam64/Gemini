/**
 * Normalizes extreme scale values to be closer to 1 for better visual appearance.
 * This makes sprites look more normalized and visually pleasing.
 *
 * - Values > 1 are normalized towards 1 (e.g., 3 → 1.4, 2 → 1.2)
 * - Values < 1 are normalized towards 1, but less aggressively (e.g., 0.2 → ~0.44)
 */
export function getNormalizedScale(scale: number): number {
  if (scale > 1) {
    // Normalize down large scales: reduce the difference from 1 by 70%
    return 1 + (scale - 1) * 0.3;
  }
  if (scale < 1) {
    // Normalize up small scales: reduce the difference from 1 by 30% (less aggressive)
    return 1 - (1 - scale) * 0.7;
  }
  return scale;
}
