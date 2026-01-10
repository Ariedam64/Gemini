import { Box, type BoxProps } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import type { MutationId } from '@/common/games/Quinoa/systems/mutation';
import type {
  TileRef,
  TileTransformOrigin,
} from '@/common/games/Quinoa/world/tiles';
import { useResponsiveValue } from '@/utils';
import { quinoaEngineAtom } from '../atoms/engineAtom';

interface SpriteProps {
  /** The tile reference containing spritesheet and index information. */
  tileRef?: TileRef;
  /** Direct sprite frame name (e.g., 'sprite/ui/Donut'). */
  spriteName?: string;
  width?: BoxProps['width'];
  height?: BoxProps['height'];
  scale?: number;
  mutations?: MutationId[];
  transformOrigin?: TileTransformOrigin;
  flipH?: boolean;
  flipV?: boolean;
  isUnknown?: boolean;
  isDisabled?: boolean;
  isNormalizedScale?: boolean;
  /** Whether to apply unpremultiply filter for correct alpha blending. */
  unpremultiply?: boolean;
}

/**
 * A component that displays a sprite using a canvas element.
 * Supports both TileRef (spritesheet + index) and direct sprite names.
 *
 * @param tileRef - The tile reference containing spritesheet and index information.
 * @param spriteName - Direct sprite frame name (e.g., 'sprite/ui/Donut').
 * @param width - The width of the sprite container.
 * @param height - The height of the sprite container.
 * @param scale - Optional scale factor to enlarge the sprite within its container.
 * @param mutations - Optional mutations to apply to the sprite.
 * @param transformOrigin - Optional transform origin for scaling.
 */
const Sprite: React.FC<SpriteProps> = ({
  tileRef,
  spriteName,
  width: rawWidth = '80px',
  height: rawHeight = '80px',
  scale = 1,
  mutations,
  transformOrigin,
  flipH = false,
  flipV = false,
  isUnknown = false,
  isDisabled = false,
  isNormalizedScale = false,
  unpremultiply = false,
}) => {
  const width = useResponsiveValue(rawWidth, '80px');
  const height = useResponsiveValue(rawHeight, '80px');
  const canvasRef = useRef<HTMLDivElement>(null);
  const normalizedScale = isNormalizedScale ? Math.min(1 / scale, 1) : 1;
  const engine = useAtomValue(quinoaEngineAtom);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) {
      return;
    }
    // Require either tileRef or spriteName
    if (!tileRef && !spriteName) {
      container.innerHTML = '';
      return;
    }
    // If using tileRef and the tile is empty (index 0), just clear the container.
    if (tileRef && tileRef.index === 0) {
      container.innerHTML = '';
      return;
    }
    const cache = engine?.canvasSpriteCache;
    if (!cache) {
      return;
    }
    // Get canvas using either tileRef or spriteName
    const canvas = tileRef
      ? cache.getCanvas(
          tileRef,
          mutations ?? [],
          isDisabled,
          isUnknown,
          unpremultiply
        )
      : cache.getCanvasByFrameName(
          spriteName as string,
          mutations ?? [],
          isDisabled,
          isUnknown,
          unpremultiply
        );
    // Clear any previous content and append the new canvas.
    // Note: CanvasSpriteCache returns a cloned canvas for each call
    container.innerHTML = '';
    container.appendChild(canvas);
    // Cleanup function to prevent memory leaks
    return () => {
      container.innerHTML = '';
    };
  }, [
    mutations,
    tileRef,
    spriteName,
    isUnknown,
    isDisabled,
    unpremultiply,
    engine,
  ]);
  return (
    <Box
      className="Sprite"
      ref={canvasRef}
      position="relative"
      sx={{
        width,
        height,
        transform: `scale(${normalizedScale})`,
        transformOrigin,
        '> canvas': {
          objectFit: 'contain',
          width: '100%',
          height: '100%',
          transform: `scale(${flipH ? '-' : ''}${scale}, ${flipV ? '-' : ''}${scale})`,
          transformOrigin,
        },
      }}
    />
  );
};

export default Sprite;
