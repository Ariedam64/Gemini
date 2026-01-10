import { useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import {
  getStrength,
  getTargetStrength,
  getXPForStrength,
} from '@/common/games/Quinoa/utils/pets';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import { myPetsProgressAtom } from '../../atoms/myAtoms';
import ProgressBar from './ProgressBar';

interface StrengthBarProps {
  petId: string;
  height?: number;
  isShining?: boolean;
}

const StrengthBar: React.FC<StrengthBarProps> = ({
  petId,
  height,
  isShining = true,
}) => {
  const { t } = useLingui();
  const petsProgress = useAtomValue(myPetsProgressAtom);
  const { speciesId, xp, hunger, targetScale } = petsProgress[petId];

  const currentStrength = getStrength({ speciesId, xp, targetScale });
  const nextStrength = currentStrength + 1;

  const xpForCurrentStrength = getXPForStrength({
    strength: currentStrength,
    speciesId,
    targetScale,
  });
  const xpForNextStrength = getXPForStrength({
    strength: nextStrength,
    speciesId,
    targetScale,
  });
  const xpGainedForThisStrength = xp - xpForCurrentStrength;
  const xpToNextStrength = xpForNextStrength - xpForCurrentStrength;
  const progressToNextStrength = xpGainedForThisStrength / xpToNextStrength;
  const targetStrength = getTargetStrength(speciesId, targetScale);
  const isMatured = currentStrength >= targetStrength;
  const shineDirection =
    isShining && hunger > 0 && !isMatured ? 'right' : undefined;

  return (
    <McTooltip
      label={
        isMatured
          ? `${t`Max strength`}`
          : `${t`Next level`}: ${Math.round(xp).toLocaleString()} / ${Math.round(
              xpForNextStrength
            ).toLocaleString()} XP`
      }
      keepOpenOnDesktopClick
    >
      <McFlex>
        <ProgressBar
          progress={isMatured ? 1 : progressToNextStrength}
          color={isMatured ? 'Blue.Baby' : 'Blue.Magic'}
          height={height}
          shineDirection={shineDirection}
        />
      </McFlex>
    </McTooltip>
  );
};

export default StrengthBar;
