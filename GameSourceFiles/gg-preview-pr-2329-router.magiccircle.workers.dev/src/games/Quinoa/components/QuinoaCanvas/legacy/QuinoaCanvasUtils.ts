import {
  defaultRotation,
  flippedDefaultRotation,
} from '@/common/games/Quinoa/constants';
import {
  type DecorBlueprint,
  type DecorId,
  decorDex,
} from '@/common/games/Quinoa/systems/decor';

/**
 * Gets the tile reference and flip state for a given rotation
 * @param blueprint The decor blueprint
 * @param rotation The rotation in degrees (can be negative to indicate horizontal flip)
 * @returns The rotated tile reference with flip information
 */
export function getDecorTileInfo(decorId: DecorId, rotation: number) {
  const blueprint: DecorBlueprint = decorDex[decorId];
  const { tileRef, rotationVariants } = blueprint;
  // Determine if horizontally flipped (negative rotation)
  const isFlipped = rotation < 0;
  const absoluteRotation = Math.abs(
    rotation === flippedDefaultRotation ? defaultRotation : rotation
  );
  const rotationVariant = rotationVariants?.[absoluteRotation];
  // Check if there's a specific variant for this rotation
  if (rotationVariant) {
    // If rotation is negative, we need to flip horizontally
    // If the variant already has flipH: true and we're flipping again, they cancel out
    const effectiveFlipH = isFlipped
      ? !rotationVariant.flipH
      : !!rotationVariant.flipH;
    return {
      ...rotationVariant,
      flipH: effectiveFlipH,
    };
  }
  // Fall back to the base tileRef
  return {
    tileRef,
    flipH: isFlipped,
  };
}
