import { Box } from '@chakra-ui/layout';
import {
  Button,
  type ButtonProps,
  Image,
  type ImageProps,
} from '@chakra-ui/react';
import McFlex from '@/components/McFlex/McFlex';
import StrokedText from '@/components/StrokedText/StrokedText';
import type { StrokedTextProps } from '@/components/StrokedText/StrokedTextProps';
import GlowingAlert from './GlowingAlert';

interface MagicWidgetProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  iconProps: ImageProps;
  value: number;
  textProps?: StrokedTextProps;
  buttonProps?: ButtonProps;
  isAlertActive?: boolean;
}

const MagicWidget: React.FC<MagicWidgetProps> = ({
  onClick,
  iconProps,
  value,
  textProps,
  buttonProps,
  isAlertActive = false,
}) => {
  return (
    <Button
      onClick={onClick}
      h="45px"
      position="relative"
      pointerEvents="auto"
      {...buttonProps}
    >
      <McFlex auto orient="left">
        <Box w="45px" pl="5px">
          <Image {...iconProps} />
        </Box>
        <StrokedText
          fontSize="lg"
          fontWeight="bold"
          ml="-20px"
          minW="20px"
          textAlign="left"
          zIndex={1}
          {...textProps}
        >
          {value.toLocaleString()}
        </StrokedText>
      </McFlex>
      {isAlertActive && (
        <Box position="absolute" top="-2px" left="4px" zIndex={2}>
          <GlowingAlert />
        </Box>
      )}
    </Button>
  );
};

export default MagicWidget;
