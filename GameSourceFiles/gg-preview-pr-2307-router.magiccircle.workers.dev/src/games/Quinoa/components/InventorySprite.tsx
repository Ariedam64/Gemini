import type { BoxProps } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import { getPetScale } from '@/common/games/Quinoa/utils/pets';
import McFlex from '@/components/McFlex/McFlex';
import { useInterval } from '@/utils';
import { quinoaEngineAtom } from '../atoms/engineAtom';
import { getNormalizedScale } from '../utils/getNormalizedScale';
import { calculateServerNow } from '../utils/serverNow';
import { generateInventoryItemCacheKey } from './QuinoaCanvas/CanvasSpriteCache';
import { getInventoryItemCanvas } from './QuinoaCanvas/InventoryItemRenderer';

interface InventorySpriteProps {
  /** The inventory item to render. */
  item: InventoryItem;
  /** The size of the sprite container (width and height). */
  size?: BoxProps['width'];
  /** Whether to render as unknown/silhouette (for journal entries not yet logged). */
  isUnknown?: boolean;
  /** The scale of the canvas. */
  canvasScale?: number;
}

/**
 * Renders any inventory item using the appropriate PixiJS visual.
 * Automatically handles item-type-specific rendering:
 * - Plants: Full plant composition with crops via PlantVisual
 * - Produce: Crop with mutation icons via CropVisual
 * - Pets, Tools, Decor, Seeds, Eggs: Standard sprite rendering
 *
 * @example
 * ```tsx
 * <InventorySprite item={item} size="30px" />
 * ```
 */
const InventorySprite: React.FC<InventorySpriteProps> = ({
  item,
  size = '100%',
  isUnknown = false,
  canvasScale = 1,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const engine = useAtomValue(quinoaEngineAtom);
  const [plantTick, setPlantTick] = useState(0);
  // For plants that are still maturing, update the visual every 10 seconds.
  const needsPeriodicUpdate = useMemo(() => {
    return (
      item.itemType === ItemType.Plant &&
      item.slots.some((s) => s.endTime > calculateServerNow())
    );
  }, [item]);

  useInterval(
    () => setPlantTick((t) => t + 1),
    needsPeriodicUpdate ? 10_000 : undefined
  );
  // Create a stable visual identity key for the item.
  // Include tick to force recalculation when timer fires for maturing plants.
  const visualKey = useMemo(() => {
    return generateInventoryItemCacheKey(item, { isUnknown });
  }, [item, isUnknown, plantTick]);

  const itemScale = useMemo(() => {
    switch (item.itemType) {
      case ItemType.Produce:
        return getNormalizedScale(item.scale);
      case ItemType.Pet: {
        const scale = getPetScale({
          speciesId: item.petSpecies,
          xp: item.xp,
          targetScale: item.targetScale,
        });
        return getNormalizedScale(scale);
      }
      default:
        return 1;
    }
  }, [item]);

  const totalScale = canvasScale * itemScale;

  useEffect(() => {
    const container = canvasRef.current;
    // Ensure CanvasSpriteCache is initialized before attempting to render
    if (!engine?.canvasSpriteCache || !container) {
      return;
    }
    const canvas = getInventoryItemCanvas(item, isUnknown);

    container.innerHTML = '';
    container.appendChild(canvas);

    return () => {
      container.innerHTML = '';
    };
    // Re-render when the visual identity of the item changes.
    // Scale changes don't require re-render - handled via CSS.
  }, [visualKey, engine]);

  return (
    <McFlex
      ref={canvasRef}
      width={size}
      height={size}
      position="relative"
      overflow="visible"
      sx={{
        '& > canvas': {
          width: `${totalScale * 100}%`,
          height: `${totalScale * 100}%`,
        },
      }}
    />
  );
};

export default InventorySprite;
