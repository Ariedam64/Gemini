import McFlex from '@/components/McFlex/McFlex';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import GardenObjectInfoCard from '../garden-info/GardenObjectInfoCard';
import ActionButton from './ActionButton';
import OrientDecorControls from './OrientDecorControls';

type ActionUIProps = {};

const ActionUI: React.FC<ActionUIProps> = () => {
  const isSmallScreen = useIsSmallScreen();

  return (
    <McFlex col auto pointerEvents="auto" gap={isSmallScreen ? 1 : 2}>
      <OrientDecorControls />
      <GardenObjectInfoCard />
      <ActionButton />
    </McFlex>
  );
};

export default ActionUI;
