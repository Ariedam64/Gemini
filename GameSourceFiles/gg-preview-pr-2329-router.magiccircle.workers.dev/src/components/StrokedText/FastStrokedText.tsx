import { chakra, useToken } from '@chakra-ui/react';
import { StrokedTextProps } from './StrokedTextProps';

const FastStrokedText: React.FC<StrokedTextProps> = ({
  color = 'MagicWhite',
  strokeColor = 'MagicBlack',
  strokeWidth = 4,
  shadowHeight = 'auto',
  children,
  ...rest
}) => {
  const [resolvedStrokeColor] = useToken('colors', [strokeColor]);
  const computedShadow =
    shadowHeight === 'auto' ? strokeWidth * 0.667 : shadowHeight;

  return (
    <chakra.span
      position="relative"
      display="inline-block"
      lineHeight="1"
      fontWeight="700"
      // This marginBottom is a compatibility shim for how the old SVG-based
      // StrokedText component worked.
      mb="4px"
      {...rest}
    >
      {/* 
        This is the text shadow. We achieve this effect by "stacking" two spans, 
        the first with a transparent stroke and the second with the text. The first 
        span is positioned absolutely and translated down by the computedShadow amount. 
        This creates a more realistic 'shadow around the outline', since textShadow 
        does not consider WebkitTextStroke.
      */}
      {computedShadow && computedShadow !== 0 ? (
        <chakra.span
          aria-hidden="true"
          sx={{
            position: 'absolute',
            transform: `translateY(${computedShadow}px)`,
            color: 'transparent',
            WebkitTextStrokeWidth: `${strokeWidth}px`,
            WebkitTextStrokeColor: 'rgba(0,0,0,.25)',
            pointerEvents: 'none',
          }}
        >
          {children}
        </chakra.span>
      ) : null}

      <chakra.span
        position="absolute"
        aria-hidden="true"
        color={color}
        sx={{
          WebkitTextStrokeWidth: `${strokeWidth}px`,
          WebkitTextStrokeColor: resolvedStrokeColor ?? strokeColor,
          paintOrder: 'stroke fill',
        }}
      >
        {children}
      </chakra.span>

      {/* This is the text itself. */}
      {children}
    </chakra.span>
  );
};

export default FastStrokedText;
