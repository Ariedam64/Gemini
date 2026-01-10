import { useAtomValue } from 'jotai';
import useIsSmallWidth from '@/hooks/useIsSmallWidth';
import { currentTimeAtom } from '@/Quinoa/atoms/baseAtoms';
import { decorShopRestockSecondsAtom } from '@/Quinoa/atoms/shopAtoms';
import ExpirationTimer from './ExpirationTimer';

interface LimitedTimeDecorTimerProps {
  expiryDate: Date;
}

const LimitedTimeDecorTimer: React.FC<LimitedTimeDecorTimerProps> = ({
  expiryDate,
}) => {
  const isSmallWidth = useIsSmallWidth();
  const currentTime = useAtomValue(currentTimeAtom);
  const restockSeconds = useAtomValue(decorShopRestockSecondsAtom);
  // Determine which comes later: expiryDate or restock date
  const restockDate = new Date(currentTime + restockSeconds * 1000);
  const actualExpiryDate = expiryDate > restockDate ? expiryDate : restockDate;

  return (
    <ExpirationTimer
      expiryDate={actualExpiryDate}
      w={isSmallWidth ? '115px' : '135px'}
      timerProps={{ size: isSmallWidth ? 27 : 32 }}
    />
  );
};

export default LimitedTimeDecorTimer;
