import { useEffect } from 'react';
import { animate, useMotionValue, useTransform } from 'framer-motion';
import { MotionText, MotionTextProps } from './Motion';

export interface AnimatedNumberProps extends MotionTextProps {
  from: number;
  to: number;
  isAnimating: boolean;
  duration?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  from,
  to,
  isAnimating,
  duration = 2,
  ...textProps
}) => {
  const number = useMotionValue(from);
  const rounded = useTransform(number, (value) => Math.round(value));

  useEffect(() => {
    if (isAnimating) {
      void animate(number, to, {
        duration,
        ease: 'easeInOut',
      });
    }
  }, [isAnimating]);

  return <MotionText {...textProps}>{rounded}</MotionText>;
};
export default AnimatedNumber;
