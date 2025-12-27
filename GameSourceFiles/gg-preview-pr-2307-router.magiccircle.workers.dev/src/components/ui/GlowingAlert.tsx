import { type ReactNode, useRef } from 'react';
import McFlex, { type McFlexProps } from '@/components/McFlex/McFlex';
import { useGlowAnimation } from '@/hooks/useGlowAnimation';

interface GlowingAlertProps extends McFlexProps {
  isGlowing?: boolean;
  children?: ReactNode;
}

const GlowingAlert: React.FC<GlowingAlertProps> = ({
  isGlowing = true,
  children = '!',
  ...props
}) => {
  const chakraColor = 'Red.Magic';
  const alertRef = useRef<HTMLDivElement>(null);
  const glowAnimation = useGlowAnimation(isGlowing, 4, alertRef);

  return (
    <McFlex
      ref={alertRef}
      bg={chakraColor}
      width="16px"
      height="16px"
      fontSize="16px"
      pb="1px"
      borderRadius="full"
      fontWeight="bold"
      animation={glowAnimation}
      {...props}
    >
      {children}
    </McFlex>
  );
};

export default GlowingAlert;
