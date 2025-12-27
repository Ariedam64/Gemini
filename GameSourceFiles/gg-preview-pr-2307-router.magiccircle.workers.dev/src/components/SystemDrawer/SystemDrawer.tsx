import { useEffect, useRef, useState } from 'react';
import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { playSfx } from '@/audio/useQuinoaAudio';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { useCloseDrawer, useDrawerType } from '@/store/store';
import drawerContent, { DrawerType } from './Content';
import { DrawerRef } from './types';

const SystemDrawer = () => {
  const isSmallScreen = useIsSmallScreen();
  const drawerType = useDrawerType();
  const currentType = useRef<DrawerType | null>();
  const drawerRef = useRef<DrawerRef>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeDrawer = useCloseDrawer();

  // If a player needs to go from one drawer to another
  // We close the drawer for 300ms, then open the new one
  const open = (type: DrawerType) => {
    currentType.current = type;
    setIsOpen(true);
    playSfx('Button_Modal_Open');
  };

  const close = () => {
    setIsOpen(false);
    playSfx('Button_Modal_Close');
  };

  useEffect(() => {
    if (drawerType) {
      if (isOpen) {
        close();
        setTimeout(() => open(drawerType), 300);
      } else {
        open(drawerType);
      }
    } else if (isOpen) {
      close();
    }
  }, [drawerType]);

  const onCloseDrawer = () => {
    // If the drawer has its own onCloseDrawer implementation, use it
    if (drawerRef.current?.onCloseDrawer) {
      drawerRef.current.onCloseDrawer();
    } else {
      closeDrawer();
    }
  };
  // Render drawer content with ref
  const renderDrawerContent = () => {
    if (!currentType.current) {
      return null;
    }
    const ContentComponent = drawerContent[currentType.current];
    return <ContentComponent ref={drawerRef} />;
  };

  const isProfileDrawer =
    currentType.current &&
    ['profile', 'profile-avatar', 'name'].includes(currentType.current);

  const isPartyDrawer =
    (currentType.current && currentType.current.startsWith('party-')) ||
    currentType.current === 'party';

  let placement: 'left' | 'right' | 'top' | 'bottom';

  if (isProfileDrawer) {
    placement = isSmallScreen ? 'bottom' : 'right';
  } else if (isPartyDrawer) {
    placement = 'left';
  } else {
    placement = 'top';
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onCloseDrawer}
      placement={placement}
      variant="SystemDrawer"
      isFullHeight
      // Disable lockFocusAcrossFrames because it was breaking right-click menus
      // in the Discord App
      lockFocusAcrossFrames={false}
      size={!isSmallScreen && placement === 'right' ? 'lg' : undefined}
    >
      <DrawerOverlay />
      <DrawerContent
        borderLeftRadius={isProfileDrawer && !isSmallScreen ? '25px' : 0}
        borderRightRadius={isProfileDrawer ? 0 : '25px'}
        style={
          isSmallScreen
            ? undefined
            : {
                transformOrigin: isProfileDrawer ? 'top right' : 'top left',
              }
        }
      >
        {renderDrawerContent()}
      </DrawerContent>
    </Drawer>
  );
};

export default SystemDrawer;
