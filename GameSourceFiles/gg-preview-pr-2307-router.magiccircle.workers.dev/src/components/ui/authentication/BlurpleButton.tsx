import { Button, ButtonProps } from '@chakra-ui/react';

/**
 * A custom button component styled with the Blurple color.
 * Blurple is Discord's primary brand color.
 */
export const BlurpleButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      bg="#5865F2"
      height={props.size === 'xs' ? '32px' : undefined}
      fontSize={props.size === 'xs' ? '18px' : 'md'}
      {...props}
    >
      {props.children}
    </Button>
  );
};
