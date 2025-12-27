import { Button, keyframes } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { logOut } from '@/auth/discord/surfaces/web';
import { surface } from '@/environment';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { useCoverSheetModal } from '@/presentables/cover-sheet/useCoverSheetModal';

const shine = keyframes`
  0% { transform: translate(-150%, -150%) rotate(45deg); }
  20% { transform: translate(150%, 150%) rotate(45deg); }
  100% { transform: translate(150%, 150%) rotate(45deg); }
`;

interface SignInButtonProps {}

const SignInButton: React.FC<SignInButtonProps> = () => {
  const { open } = useCoverSheetModal();
  const isSmallScreen = useIsSmallScreen();
  const onClick = () => {
    if (surface === 'webview') {
      void logOut().catch(console.error);
    } else {
      open();
    }
  };

  return (
    <Button
      h={isSmallScreen ? '40px' : '45px'}
      px={isSmallScreen ? '15px' : '20px'}
      fontSize="18px"
      color="MagicWhite"
      borderRadius="12px"
      borderBottom="3px solid rgba(0,0,0,0.4)"
      onClick={onClick}
      position="relative"
      overflow="hidden"
      pointerEvents="auto"
      _before={{
        content: '""',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background:
          'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.15) 55%, transparent 70%)',
        animation: `${shine} 10s infinite`,
      }}
      _hover={{
        transform: 'scale(1.02)',
      }}
      _active={{
        borderBottomWidth: '1px',
        borderBottomColor: 'rgba(0,0,0,0.2)',
        boxShadow: 'inset 0 3px 2px rgba(0,0,0,0.2)',
      }}
      transition="transform 0.2s ease"
    >
      <Trans>Sign In</Trans>
    </Button>
  );
};

export default SignInButton;
