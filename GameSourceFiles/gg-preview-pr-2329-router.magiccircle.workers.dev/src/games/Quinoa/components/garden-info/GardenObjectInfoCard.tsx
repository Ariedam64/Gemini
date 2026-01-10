import { useAtomValue } from 'jotai';
import McFlex from '@/components/McFlex/McFlex';
import { isGardenObjectMatureAtom } from '@/Quinoa/atoms/myAtoms';
import CurrentPlantAbilities from '@/Quinoa/components/abilities/CurrentPlantAbilities';
import GardenObjectBrowser from '@/Quinoa/components/garden-info/GardenObjectBrowser';
import GrowProgressCard from '@/Quinoa/components/garden-info/GrowProgressCard';

type GardenObjectInfoCardProps = {};

const GardenObjectInfoCard: React.FC<GardenObjectInfoCardProps> = () => {
  const isGardenObjectMature = useAtomValue(isGardenObjectMatureAtom);

  return (
    <McFlex auto col gap={1}>
      <CurrentPlantAbilities />
      {isGardenObjectMature ? <GardenObjectBrowser /> : <GrowProgressCard />}
    </McFlex>
  );
};

export default GardenObjectInfoCard;
