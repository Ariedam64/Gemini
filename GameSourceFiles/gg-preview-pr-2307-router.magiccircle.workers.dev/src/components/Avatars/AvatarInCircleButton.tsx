import { Button, ButtonProps } from '@chakra-ui/react';
import { getPlayerDecoration } from '@/constants/decorations';
import { useCosmetic } from '@/store/store';
import { AvatarProps } from './Avatar';
import AvatarToken from './AvatarToken';

type AvatarInCircleButtonProps = {
  buttonProps?: ButtonProps;
  avatarProps: AvatarProps;
};

export default function AvatarInCircleButton({
  buttonProps,
  avatarProps,
}: AvatarInCircleButtonProps) {
  const cosmetic = useCosmetic();
  const { background } = getPlayerDecoration(cosmetic);
  return (
    <Button
      background={background}
      minHeight="48px"
      minWidth="48px"
      p="0"
      borderRadius="full"
      {...buttonProps}
    >
      <AvatarToken
        containerProps={{
          id: 'SystemHeaderPlayerToken',
        }}
        avatarProps={{
          size: 'xs',
          ...avatarProps,
        }}
      />
    </Button>
  );
}
