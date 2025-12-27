import { useAnimationControls } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import McFlex from '@/components/McFlex/McFlex';
import { MotionBox } from '@/components/Motion';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import {
  goToNextAvailableGrowSlotIndex,
  goToPreviousAvailableGrowSlotIndex,
  isCurrentGrowSlotMatureAtom,
  myCurrentGardenObjectAtom,
  myCurrentGrowSlotAtom,
  numGrowSlotsAtom,
} from '@/Quinoa/atoms/myAtoms';
import ActionBrowseButton from '@/Quinoa/components/action/ActionBrowseButton';
import GardenItemInfoCard from '@/Quinoa/components/garden-info/GardenItemInfoCard';
import GrowProgressCard from '@/Quinoa/components/garden-info/GrowProgressCard';

type GardenObjectBrowserProps = {};

const GardenObjectBrowser: React.FC<GardenObjectBrowserProps> = () => {
  const growSlot = useAtomValue(myCurrentGrowSlotAtom);
  const gardenObject = useAtomValue(myCurrentGardenObjectAtom);
  const isCurrentGrowSlotMature = useAtomValue(isCurrentGrowSlotMatureAtom);
  const numGrowSlots = useAtomValue(numGrowSlotsAtom);
  const showBrowseButtons = numGrowSlots > 1;
  const animationControls = useAnimationControls();
  const isSmallScreen = useIsSmallScreen();

  useEffect(() => {
    void animationControls.start({
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.1,
      },
    });
  }, [growSlot]);

  return (
    <McFlex auto gap={isSmallScreen ? 0.5 : 2}>
      {showBrowseButtons && (
        <ActionBrowseButton
          direction="left"
          onClick={goToPreviousAvailableGrowSlotIndex}
        />
      )}
      <MotionBox animate={animationControls}>
        {gardenObject?.objectType !== 'plant' || isCurrentGrowSlotMature ? (
          <GardenItemInfoCard />
        ) : (
          <GrowProgressCard />
        )}
      </MotionBox>
      {showBrowseButtons && (
        <ActionBrowseButton
          direction="right"
          onClick={goToNextAvailableGrowSlotIndex}
        />
      )}
    </McFlex>
  );
};

export default GardenObjectBrowser;
