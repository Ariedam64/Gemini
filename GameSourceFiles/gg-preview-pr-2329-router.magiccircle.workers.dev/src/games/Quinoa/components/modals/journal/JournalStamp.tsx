import { useLingui } from '@lingui/react/macro';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type {
  CropInventoryItem,
  PetInventoryItem,
} from '@/common/games/Quinoa/user-json-schema/current';
import { formatDate } from '@/common/utils';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import { BASE_URL } from '@/environment';
import InventorySprite from '../../InventorySprite';

interface JournalStampProps {
  /** The inventory item to display (crop or pet). */
  item: CropInventoryItem | PetInventoryItem;
  width?: string;
  height?: string;
  /** Whether to render as unknown/silhouette (for entries not yet logged). */
  isUnknown?: boolean;
  /** Whether to render as Max Weight (1.7x scale). */
  isMaxWeight?: boolean;
  /** Timestamp when this entry was logged (for tooltip). */
  logDate?: number;
}

/**
 * A stamp-styled container for displaying journal entries.
 * Uses InventorySprite for accurate rendering with mutation icons.
 */
const JournalStamp: React.FC<JournalStampProps> = ({
  item,
  width = '60px',
  height = '60px',
  isUnknown = false,
  isMaxWeight = false,
  logDate,
}) => {
  const { t } = useLingui();

  const isTooltipDisabled = isUnknown || logDate === undefined;
  const tooltipLabel = logDate
    ? t`Logged on ${formatDate(new Date(logDate))}`
    : '';

  const canvasScale = item.itemType === ItemType.Pet ? 0.7 : 1.35;
  const canvasScaleMultiplier = isMaxWeight ? 2 : 1;

  return (
    <McTooltip
      label={tooltipLabel}
      placement="top"
      isDisabled={isTooltipDisabled}
      fontSize="2xs"
      offset={[0, -10]}
      keepOpenOnDesktopClick
    >
      <McFlex
        position="relative"
        w={width}
        h={height}
        backgroundImage={`url(${BASE_URL}/assets/ui/Stamp.webp)`}
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <McFlex>
          <InventorySprite
            item={item}
            isUnknown={isUnknown}
            canvasScale={canvasScale * canvasScaleMultiplier}
          />
        </McFlex>
      </McFlex>
    </McTooltip>
  );
};

export default JournalStamp;
