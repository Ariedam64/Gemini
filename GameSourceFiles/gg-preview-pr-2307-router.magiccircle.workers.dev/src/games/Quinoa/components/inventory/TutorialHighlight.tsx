import { Box, keyframes, Portal } from '@chakra-ui/react';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { CardinalDirection } from '@/common/games/Quinoa/world/map';
import { MotionBox } from '@/components/Motion';
import StrokedText from '@/components/StrokedText/StrokedText';

interface TutorialHighlightProps {
  isActive: boolean;
  children: React.ReactNode;
  width?: string;
  height?: string;
  direction?: CardinalDirection;
  zIndex?: string;
  borderRadius?: string;
  showScrim?: boolean;
  numTasks?: number;
}

const pulseGlow = keyframes`
  0% { 
    box-shadow: 0 0 0 2px rgba(255, 255, 0, 0.8), 0 0 0 4px rgba(255, 255, 0, 0.4);
  }
  50% { 
    box-shadow: 0 0 0 3px rgba(255, 255, 0, 1), 0 0 0 8px rgba(255, 255, 0, 0.6);
  }
  100% { 
    box-shadow: 0 0 0 2px rgba(255, 255, 0, 0.8), 0 0 0 4px rgba(255, 255, 0, 0.4);
  }
`;

const TutorialHighlight = forwardRef<HTMLDivElement, TutorialHighlightProps>(
  (
    {
      isActive,
      children,
      width = 'auto',
      height = 'auto',
      direction = 'down',
      zIndex = 'AboveGameModal',
      borderRadius = '10px',
      showScrim = false,
      numTasks = 1,
    },
    ref
  ) => {
    const elementRef = useRef<HTMLDivElement>(null);
    // Forward the ref to the element
    useImperativeHandle(ref, () => elementRef.current!, []);
    const arrowSize = 28;

    const TriangleArrow: React.FC<{
      direction: CardinalDirection;
      size: number;
    }> = ({ direction, size }) => {
      const getTrianglePath = () => {
        const halfSize = size / 2;

        switch (direction) {
          case 'up':
            return `M ${halfSize} 0 L ${size} ${size} L 0 ${size} Z`;
          case 'down':
            return `M 0 0 L ${size} 0 L ${halfSize} ${size} Z`;
          case 'left':
            return `M ${size} 0 L ${size} ${size} L 0 ${halfSize} Z`;
          case 'right':
            return `M 0 0 L ${size} ${halfSize} L 0 ${size} Z`;
          default:
            return `M 0 0 L ${size} 0 L ${halfSize} ${size} Z`;
        }
      };

      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <path
            d={getTrianglePath()}
            fill="rgba(255, 255, 0, 0.8)"
            stroke="rgba(255, 255, 0, 1)"
            strokeWidth={1.7}
          />
        </svg>
      );
    };

    const getTransformOrigin = (direction: CardinalDirection) => {
      switch (direction) {
        case 'up':
          return 'center top';
        case 'down':
          return 'center bottom';
        case 'left':
          return 'left center';
        case 'right':
          return 'right center';
      }
    };

    const getArrowPosition = (
      elementStyles: {
        top: number;
        left: number;
        width: number;
        height: number;
      },
      direction: CardinalDirection
    ) => {
      const offset = 12;
      switch (direction) {
        case 'up':
          return {
            top: elementStyles.top + elementStyles.height + offset,
            left: elementStyles.left + elementStyles.width / 2 - arrowSize / 2,
          };
        case 'down':
          return {
            top: elementStyles.top - arrowSize - offset,
            left: elementStyles.left + elementStyles.width / 2 - arrowSize / 2,
          };
        case 'left':
          return {
            top: elementStyles.top + elementStyles.height / 2 - arrowSize / 2,
            left: elementStyles.left + elementStyles.width + offset,
          };
        case 'right':
          return {
            top: elementStyles.top + elementStyles.height / 2 - arrowSize / 2,
            left: elementStyles.left - arrowSize - offset,
          };
      }
    };
    const [elementPosition, setElementPosition] = useState<{
      top: number;
      left: number;
      width: number;
      height: number;
    } | null>(null);

    useEffect(() => {
      if (!isActive || !elementRef.current) {
        setElementPosition(null);
        return;
      }
      const updatePosition = () => {
        if (!elementRef.current) {
          return;
        }
        try {
          const rect = elementRef.current.getBoundingClientRect();
          // Safety check for valid rect values
          if (
            rect &&
            typeof rect.top === 'number' &&
            typeof rect.left === 'number'
          ) {
            setElementPosition({
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            });
          }
        } catch (error) {
          console.warn('TutorialHighlight position update failed:', error);
          // Don't crash, just skip this update
        }
      };
      // Initial position - try immediate first, then with small delay as backup
      updatePosition(); // Immediate attempt
      const initialTimeout = setTimeout(updatePosition, 5); // Reduced delay backup

      // Throttled update for resize events to prevent crashes
      let resizeTicking = false;
      const handleResize = () => {
        // Throttled updates for resize to prevent crashes during rapid resize
        if (!resizeTicking) {
          requestAnimationFrame(() => {
            updatePosition();
            resizeTicking = false;
          });
          resizeTicking = true;
        }
      };
      let scrollTicking = false;
      const handleScroll = () => {
        // Throttled updates for scroll events only
        if (!scrollTicking) {
          requestAnimationFrame(() => {
            updatePosition();
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      };
      // Use ResizeObserver with throttled updates to prevent crashes
      let resizeObserver: ResizeObserver | null = null;
      if (elementRef.current && 'ResizeObserver' in window) {
        let observerTicking = false;
        resizeObserver = new ResizeObserver(() => {
          // Throttled updates for ResizeObserver to prevent crashes during rapid resize
          if (!observerTicking) {
            requestAnimationFrame(() => {
              updatePosition();
              observerTicking = false;
            });
            observerTicking = true;
          }
        });
        resizeObserver.observe(elementRef.current);
      }
      // Also track parent container changes immediately
      const parentElement = elementRef.current?.parentElement;
      if (parentElement && resizeObserver) {
        resizeObserver.observe(parentElement);
      }
      // Use MutationObserver with throttled updates to prevent crashes
      let mutationObserver: MutationObserver | null = null;
      if (elementRef.current) {
        let mutationTicking = false;
        mutationObserver = new MutationObserver(() => {
          // Throttled updates for DOM changes to prevent crashes during resize
          if (!mutationTicking) {
            requestAnimationFrame(() => {
              updatePosition();
              mutationTicking = false;
            });
            mutationTicking = true;
          }
        });
        mutationObserver.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class'],
        });
      }
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });
      window.addEventListener('orientationchange', handleResize, {
        passive: true,
      });

      return () => {
        clearTimeout(initialTimeout);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        if (mutationObserver) {
          mutationObserver.disconnect();
        }
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      };
    }, [isActive]);

    return (
      <Box ref={elementRef} position="relative" width={width} height={height}>
        {isActive && elementPosition && (
          <Portal>
            {showScrim && (
              <MotionBox
                position="fixed"
                top="0"
                left="0"
                width="100vw"
                height="100vh"
                backgroundColor="rgba(0, 0, 0, 0.3)"
                zIndex={1000}
                pointerEvents="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.1,
                }}
              />
            )}
            {(() => {
              const arrowPos = getArrowPosition(elementPosition, direction);
              return (
                <>
                  <MotionBox
                    position="fixed"
                    top={`${arrowPos.top}px`}
                    left={`${arrowPos.left}px`}
                    zIndex={zIndex}
                    pointerEvents="none"
                    initial={{ opacity: 0 }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: 1,
                    }}
                    transition={{
                      scale: {
                        duration: 1.5,
                        repeat: Infinity,
                      },
                      delay: 0.3,
                    }}
                    style={{
                      transformOrigin: getTransformOrigin(direction),
                    }}
                  >
                    <TriangleArrow direction={direction} size={arrowSize} />
                  </MotionBox>
                  {numTasks > 1 && (
                    <Box
                      position="fixed"
                      top={`${arrowPos.top - 6.5}px`}
                      left={`${arrowPos.left + arrowSize / 2}px`}
                      transform="translateX(-50%)"
                      zIndex={zIndex}
                      pointerEvents="none"
                    >
                      <MotionBox
                        initial={{ opacity: 0 }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: 1,
                        }}
                        transition={{
                          scale: {
                            duration: 1.5,
                            repeat: Infinity,
                          },
                          delay: 0.3,
                        }}
                        style={{
                          transformOrigin: getTransformOrigin(direction),
                        }}
                      >
                        <StrokedText
                          strokeWidth={3}
                          fontSize="14px"
                          shadowHeight={0}
                          fontWeight="bold"
                          color="Yellow.Magic"
                          strokeColor="Neutral.EarlGrey"
                        >
                          ×{numTasks}
                        </StrokedText>
                      </MotionBox>
                    </Box>
                  )}
                </>
              );
            })()}
            <MotionBox
              position="fixed"
              top={`${elementPosition.top}px`}
              left={`${elementPosition.left}px`}
              width={`${elementPosition.width}px`}
              height={`${elementPosition.height}px`}
              borderRadius={borderRadius}
              animation={`${pulseGlow} 1.5s ease-in-out infinite`}
              pointerEvents="none"
              zIndex={zIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.3,
              }}
            />
          </Portal>
        )}
        {children}
      </Box>
    );
  }
);

TutorialHighlight.displayName = 'TutorialHighlight';

export default TutorialHighlight;
