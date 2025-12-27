import { useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { faunaSpeciesDex } from '@/common/games/Quinoa/systems/fauna';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import { myPetsProgressAtom } from '../../atoms/myAtoms';
import ProgressBar from './ProgressBar';

interface HungerBarProps {
  petId: string;
  height?: number;
  isShining?: boolean;
}

const HungerBar: React.FC<HungerBarProps> = ({
  petId,
  height,
  isShining = true,
}) => {
  const petsProgress = useAtomValue(myPetsProgressAtom);
  const { hunger, speciesId } = petsProgress[petId];

  const { t } = useLingui();

  const { coinsToFullyReplenishHunger } = faunaSpeciesDex[speciesId];

  return (
    <McTooltip
      label={`${t`Hunger`}: ${Math.round(hunger).toLocaleString()} / ${Math.round(coinsToFullyReplenishHunger).toLocaleString()}`}
      keepOpenOnDesktopClick
    >
      <McFlex>
        <ProgressBar
          progress={hunger / coinsToFullyReplenishHunger}
          color="Green.Magic"
          shineDirection={isShining ? 'left' : undefined}
          height={height}
        />
      </McFlex>
    </McTooltip>
  );
};

export default HungerBar;
