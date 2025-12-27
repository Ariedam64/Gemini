import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import StrokedText from '@/components/StrokedText/StrokedText';
import type { ChakraColor } from '@/theme/types';

export interface QuinoaTimerProps {
  seconds: number;
  showDays?: boolean;
  showHours?: boolean;
  bg?: ChakraColor;
  strokeColor?: ChakraColor;
  size?: number;
}

const TimeSquare: React.FC<{
  value: number;
  unit: string;
  bg: ChakraColor;
  strokeColor: ChakraColor;
  size: number;
}> = ({ value, unit, bg, strokeColor, size }) => {
  return (
    <McFlex auto>
      <McFlex
        col
        bg={bg}
        borderRadius="5px"
        aspectRatio="1 / 1"
        width={`${size}px`}
        height={`${size}px`}
        gap={2}
        orient="center"
      >
        <StrokedText
          fontSize={{ base: '12px', md: '16px' }}
          color="MagicWhite"
          strokeColor={strokeColor}
          fontWeight="bold"
          lineHeight="1.1"
          mb={-2}
        >
          {String(value).padStart(2, '0')}
        </StrokedText>
        <StrokedText
          fontSize={{ base: '10px', md: '12px' }}
          fontWeight="bold"
          strokeWidth={0}
          lineHeight="1"
          mb={{ base: -1, md: 0 }}
        >
          {unit}
        </StrokedText>
      </McFlex>
    </McFlex>
  );
};

const calculateTimeDisplay = (rawSeconds: number) => {
  // Ensure we work with non-negative whole seconds.
  const totalSeconds = Math.max(0, Math.floor(rawSeconds));

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};

const QuinoaTimer: React.FC<QuinoaTimerProps> = ({
  seconds,
  showDays = true,
  showHours = true,
  bg = 'Purple.Magic',
  strokeColor = 'Purple.Dark',
  size = 40,
}) => {
  const timeRemaining = calculateTimeDisplay(seconds);

  let numCells = 2; // minutes and seconds
  if (showHours) numCells++;
  if (showDays) numCells++;
  const gridAspectRatio = `${numCells} / 1`;

  return (
    <McGrid
      templateColumns={`repeat(${numCells}, 1fr)`}
      sx={{ aspectRatio: gridAspectRatio }}
    >
      {showDays && (
        <TimeSquare
          value={timeRemaining.days}
          unit="d"
          bg={bg}
          strokeColor={strokeColor}
          size={size}
        />
      )}
      {showHours && (
        <TimeSquare
          value={timeRemaining.hours}
          unit="h"
          bg={bg}
          strokeColor={strokeColor}
          size={size}
        />
      )}
      <TimeSquare
        value={timeRemaining.minutes}
        unit="m"
        bg={bg}
        strokeColor={strokeColor}
        size={size}
      />
      <TimeSquare
        value={timeRemaining.seconds}
        unit="s"
        bg={bg}
        strokeColor={strokeColor}
        size={size}
      />
    </McGrid>
  );
};

export default QuinoaTimer;
