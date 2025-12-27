import { differenceInSeconds } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { getNextUTCDate, getStartOfTodayUTC } from '@/common/utils';
import McFlex from '@/components/McFlex/McFlex';
import StrokedText from '@/components/StrokedText/StrokedText';
import { useInterval } from '../../utils';

type StreakTimerProps = {};

const TimeSquare: React.FC<{
  value: number;
  unit: string;
  fontSize?: string;
  unitFontSize?: string;
}> = ({ value, unit }) => (
  <McFlex
    col
    orient="center"
    bg="Orange.Light"
    borderRadius="15px"
    p={2}
    aspectRatio="1 / 1"
    gap={1.5}
  >
    <StrokedText
      fontSize="30px"
      mt={-1}
      color="MagicWhite"
      strokeColor="Red.Magic"
      fontWeight="bold"
    >
      {String(value).padStart(2, '0')}
    </StrokedText>
    <StrokedText
      fontSize="18px"
      fontWeight="bold"
      strokeWidth={0}
      mt={-3}
      mb={-2}
    >
      {unit}
    </StrokedText>
  </McFlex>
);

const calculateTimeDisplay = (targetTime: Date, currentTime: Date) => {
  let totalSeconds = differenceInSeconds(targetTime, currentTime);

  // If current time is past target time, or if the difference is negligible,
  // treat as 0 remaining for this cycle. The main logic in timerTick will reset the targetDate.
  if (totalSeconds < 0) {
    totalSeconds = 0;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};

const StreakTimer: React.FC<StreakTimerProps> = () => {
  const [targetDate, setTargetDate] = useState<Date>(() =>
    getNextUTCDate(getStartOfTodayUTC())
  );
  // State for the displayed time remaining
  const [timeRemaining, setTimeRemaining] = useState(() =>
    calculateTimeDisplay(targetDate, getStartOfTodayUTC())
  );
  const timerTick = useCallback(() => {
    const now = new Date();
    // Check if the current target has been reached or passed
    if (now.getTime() >= targetDate.getTime()) {
      // Set the new target to the next midnight UTC
      const newNextMidnight = getNextUTCDate(getStartOfTodayUTC());
      setTargetDate(newNextMidnight);
    }
    setTimeRemaining(calculateTimeDisplay(targetDate, now));
  }, [targetDate]);

  useEffect(() => {
    timerTick();
  }, []);

  useInterval(timerTick, 1000);

  return (
    <McFlex gap={2} w="200px" autoH>
      <TimeSquare value={timeRemaining.hours} unit="h" />
      <TimeSquare value={timeRemaining.minutes} unit="m" />
      <TimeSquare value={timeRemaining.seconds} unit="s" />
    </McFlex>
  );
};

export default StreakTimer;
