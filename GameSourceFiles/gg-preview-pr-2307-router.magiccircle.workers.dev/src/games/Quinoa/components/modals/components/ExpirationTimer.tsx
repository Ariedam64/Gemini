import { Box, type BoxProps } from '@chakra-ui/layout';
import { useAtomValue } from 'jotai';
import { currentTimeAtom } from '@/Quinoa/atoms/baseAtoms';
import QuinoaTimer, {
  type QuinoaTimerProps,
} from '@/Quinoa/components/QuinoaTimer';

interface ExpirationTimerProps extends BoxProps {
  expiryDate: Date;
  timerProps?: Partial<QuinoaTimerProps>;
}

const ExpirationTimer: React.FC<ExpirationTimerProps> = ({
  expiryDate,
  timerProps,
  ...boxProps
}) => {
  const currentTime = useAtomValue(currentTimeAtom);
  return (
    <Box {...boxProps}>
      <QuinoaTimer
        seconds={(expiryDate.getTime() - currentTime) / 1000}
        bg="Orange.Magic"
        strokeColor="Orange.Dark"
        {...timerProps}
      />
    </Box>
  );
};

export default ExpirationTimer;
