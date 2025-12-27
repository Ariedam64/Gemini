import { RefObject, useLayoutEffect, useMemo, useState } from 'react';
import { keyframes } from '@chakra-ui/react';

export const useGlowAnimation = (
  isGlowing: boolean,
  glowSize: number,
  elementRef: RefObject<HTMLElement>
) => {
  const [scale, setScale] = useState({ x: 1, y: 1 });

  useLayoutEffect(() => {
    if (elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      if (width > 0 && height > 0) {
        // Multiply by 1.75 for backwards compatibility
        const scaleX = 1 + (1.75 * glowSize) / width;
        const scaleY = 1 + (1.75 * glowSize) / height;
        setScale({ x: scaleX, y: scaleY });
      }
    }
  }, [glowSize, elementRef.current]);

  const glowKeyframes = useMemo(
    () =>
      keyframes`
        0%, 100% {
          transform: scale(1, 1);
        }
        50% {
          transform: scale(${scale.x}, ${scale.y});
        }
      `,
    [scale.x, scale.y]
  );

  const glowAnimation = isGlowing
    ? `${glowKeyframes} 1.5s ease-in-out infinite`
    : undefined;

  return glowAnimation;
};
