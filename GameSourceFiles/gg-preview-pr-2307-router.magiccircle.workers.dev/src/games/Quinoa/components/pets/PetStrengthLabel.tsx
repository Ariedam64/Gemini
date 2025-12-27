import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { getStrength } from '@/common/games/Quinoa/utils/pets';
import { myPetsProgressAtom } from '../../atoms/myAtoms';

interface PetStrengthProps {
  petId: string;
}

const PetStrengthLabel: React.FC<PetStrengthProps> = ({ petId }) => {
  const petsProgress = useAtomValue(myPetsProgressAtom);
  const { speciesId, xp, targetScale } = petsProgress[petId];
  const strength = getStrength({
    speciesId,
    xp,
    targetScale,
  });

  return (
    <>
      <Trans>STR</Trans> {strength}
    </>
  );
};

export default PetStrengthLabel;
