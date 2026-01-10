import { useAtomValue } from 'jotai';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import McFlex from '@/components/McFlex/McFlex';
import {
  isGardenObjectMatureAtom,
  myCurrentGardenObjectAtom,
} from '@/Quinoa/atoms/myAtoms';
import PlantAbility from './PlantAbility';

type CurrentPlantAbilitiesProps = {};

const CurrentPlantAbilities: React.FC<CurrentPlantAbilitiesProps> = () => {
  const currentGardenObject = useAtomValue(myCurrentGardenObjectAtom);
  const isMature = useAtomValue(isGardenObjectMatureAtom);
  if (currentGardenObject?.objectType !== 'plant') {
    return null;
  }
  const blueprint = floraSpeciesDex[currentGardenObject.species].plant;
  const abilities = 'abilities' in blueprint ? blueprint.abilities : [];
  if (abilities.length === 0) {
    return null;
  }
  return (
    <McFlex bg="rgba(0, 0, 0, 0.65)" borderRadius="10px" p={1} auto col gap={1}>
      {abilities.map((ability) => (
        <PlantAbility key={ability} abilityId={ability} isMature={isMature} />
      ))}
    </McFlex>
  );
};

export default CurrentPlantAbilities;
