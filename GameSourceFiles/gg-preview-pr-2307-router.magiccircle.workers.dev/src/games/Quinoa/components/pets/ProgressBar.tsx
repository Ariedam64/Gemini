import { keyframes } from '@chakra-ui/react';
import McFlex from '@/components/McFlex/McFlex';
import { MotionMcFlex } from '@/components/Motion';
import type { ChakraColor } from '@/theme/types';

const shine = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const reverseShine = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

interface ProgressBarProps {
  progress: number;
  color: ChakraColor;
  shineDirection?: 'left' | 'right';
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
  shineDirection,
  height = 15,
}) => {
  return (
    <McFlex
      orient="left"
      borderColor="Neutral.Grey"
      borderRadius="3px"
      borderWidth="1px"
      overflow="hidden"
      style={{ height: `${height}px` }}
    >
      <MotionMcFlex
        position="relative"
        overflow="hidden"
        initial={false}
        animate={{ width: `${Math.max(0, Math.floor(progress * 100))}%` }}
        sx={{ backgroundColor: color }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        _before={
          shineDirection
            ? {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.3) 60%, transparent)',
                animation: `${shineDirection === 'left' ? reverseShine : shine} 1.5s infinite`,
              }
            : undefined
        }
      />
    </McFlex>
  );
};

export default ProgressBar;
