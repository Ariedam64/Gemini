import { Text } from '@chakra-ui/react';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { MotionMcFlex } from '@/components/Motion';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { getContrastingColor } from '@/utils/getContrastingColor';
import InventorySprite from '../../InventorySprite';

const getProgressColor = (percentage: number): string => {
  if (percentage < 15) return '#F98B4B'; // Light Orange
  if (percentage < 25) return '#FC6D30'; // Orange.Magic
  if (percentage < 50) return '#F3D32B'; // Yellow.Magic
  if (percentage < 75) return '#E9B52F'; // Yellow.Dark
  if (percentage < 100) return '#5EAC46'; // Green.Magic
  return '#0B893F'; // Green.Dark (100%)
};

export interface OverviewPageEntryProps {
  name: string;
  inventoryItem: InventoryItem;
  progress: {
    numVariantsLogged: number;
    numVariantsTotal: number;
    percentage: number;
  };
  onClick: () => void;
}

const OverviewPageEntry: React.FC<OverviewPageEntryProps> = ({
  name,
  inventoryItem,
  progress,
  onClick,
}) => {
  const isUnknown = progress.percentage === 0;
  const progressColor = getProgressColor(progress.percentage);
  const progressColorContrast = getContrastingColor(progressColor);
  const isSmallScreen = useIsSmallScreen();

  return (
    <McGrid
      templateColumns="auto 1fr"
      alignItems="center"
      cursor="pointer"
      onClick={onClick}
      gap={2}
      autoH
    >
      <InventorySprite
        item={inventoryItem}
        size={isSmallScreen ? '25px' : '50px'}
        isUnknown={isUnknown}
        canvasScale={inventoryItem.itemType === ItemType.Pet ? 1.3 : 2.3}
      />
      <McFlex
        position="relative"
        bg="Brown.Pastel"
        borderRadius="5px"
        auto
        px={isSmallScreen ? 2 : 4}
        py={isSmallScreen ? 1 : 2}
      >
        <MotionMcFlex
          position="absolute"
          top={0}
          left={0}
          h="100%"
          bg={progressColor}
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          borderRadius="inherit"
        />
        <McGrid
          templateColumns="1fr auto"
          alignItems="center"
          position="relative"
          zIndex={1}
          py={0.5}
        >
          <McFlex orient="left">
            <Text
              color={progressColorContrast}
              fontSize={isSmallScreen ? '12px' : '14px'}
              fontWeight="bold"
              lineHeight={1}
            >
              {isUnknown ? '???' : name}
            </Text>
          </McFlex>
          {!isUnknown && (
            <Text
              color={
                progress.percentage < 100
                  ? 'Brown.Magic'
                  : progressColorContrast
              }
              fontSize={isSmallScreen ? '12px' : '14px'}
              fontWeight="bold"
              lineHeight={1}
            >
              {Math.floor(progress.numVariantsLogged)}/
              {progress.numVariantsTotal}
            </Text>
          )}
        </McGrid>
      </McFlex>
    </McGrid>
  );
};

export default OverviewPageEntry;
