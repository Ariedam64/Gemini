import { useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { Home, Package, ShoppingBag } from 'react-feather';
import McGrid from '@/components/McGrid/McGrid';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { hotkeyBeingPressedAtom } from '../../atoms/hotkeyAtoms';
import { teleport } from '../../World/teleport';
import NavButton from './NavButton';

type NavButtonsProps = {};

const NavButtons: React.FC<NavButtonsProps> = () => {
  const { t } = useLingui();
  const activeKeypress = useAtomValue(hotkeyBeingPressedAtom);
  const isSmallScreen = useIsSmallScreen();

  return (
    <McGrid
      auto
      templateColumns="1fr 1fr 1fr"
      gap={isSmallScreen ? 1 : 2}
      pointerEvents="auto"
    >
      <NavButton
        tooltip={t`Teleport [shift+1]`}
        label={t`Shop`}
        icon={Package}
        onClick={() => teleport('seedShop')}
        bg="Blue.Magic"
        isActive={activeKeypress === 'Shift+1'}
      />
      <NavButton
        tooltip={t`Teleport [shift+2]`}
        label={t`My Garden`}
        icon={Home}
        onClick={() => teleport('myGarden')}
        bg="Green.Darker"
        isActive={activeKeypress === 'Shift+2'}
      />
      <NavButton
        tooltip={t`Teleport [shift+3]`}
        label={t`Sell`}
        icon={ShoppingBag}
        onClick={() => teleport('sellCropsShop')}
        bg="Red.Magic"
        isActive={activeKeypress === 'Shift+3'}
      />
    </McGrid>
  );
};

export default NavButtons;
