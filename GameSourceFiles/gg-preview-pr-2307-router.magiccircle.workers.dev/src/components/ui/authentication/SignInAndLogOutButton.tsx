import { Button, ButtonProps } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { logOut } from '@/auth/discord/surfaces/web';
import { useIsUserAuthenticated } from '@/store/store';

export const SignInAndOutButton: React.FC<ButtonProps> = (props) => {
  const isAuthenticated = useIsUserAuthenticated();

  return (
    <Button
      variant="blank"
      height={props.size === 'xs' ? '32px' : undefined}
      fontSize={props.size === 'xs' ? '18px' : 'md'}
      bg={isAuthenticated ? 'Neutral.DarkGrey' : 'Purple.Magic'}
      color="MagicWhite"
      borderRadius="14px"
      onClick={() => {
        void logOut().catch(console.error);
      }}
      {...props}
    >
      {isAuthenticated ? <Trans>Log out</Trans> : <Trans>SIGN IN</Trans>}
    </Button>
  );
};
