import { Button, ButtonProps } from '@chakra-ui/react';

export interface GradientButtonProps extends ButtonProps {
  hoverBg?: string;
  hoverBoxShadow?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  hoverBg,
  hoverBoxShadow,
  children,
  sx,
  ...buttonProps
}) => {
  return (
    <Button
      h="100%"
      w="125px"
      boxShadow="0px 4px 20px 0px #FFE29633"
      size="md"
      textColor="MagicBlack"
      px="10px"
      mt={3}
      flexDirection="column"
      sx={{
        '&:hover': {
          bg: hoverBg || 'linear-gradient(90deg, #FFFFFF, #000000)',
          boxShadow: hoverBoxShadow || '0px 4px 20px 0px #FFE29633',
        },
        ...sx,
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
