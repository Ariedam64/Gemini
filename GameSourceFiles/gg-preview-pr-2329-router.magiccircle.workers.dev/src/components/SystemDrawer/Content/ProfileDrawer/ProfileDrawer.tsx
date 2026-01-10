import { useLingui } from '@lingui/react/macro';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import type { UserCosmeticItem } from '@/common/prisma/generated/browser';
import { allCosmeticItems } from '@/common/resources/cosmetics/allCosmeticItems';
import type { CosmeticItem } from '@/common/resources/cosmetics/cosmeticTypes';
import type { Cosmetic } from '@/common/types/player';
import bannerSwimAnimation from '@/components/Avatars/bannerAnimation';
import { useConfirmationDialog } from '@/components/ConfirmationDialog/useConfirmationDialog';
import CosmeticPurchaseModal from '@/components/Cosmetics/CosmeticPurchaseModal';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { getPlayerDecoration } from '@/constants/decorations';
import { getCosmeticSrc } from '@/cosmetics/getCosmeticSrc';
import { useAvailableCosmetics, useVisibleCosmetics } from '@/cosmetics/hooks';
import { useSendRoomMessage } from '@/hooks';
import useIsSmallHeight from '@/hooks/useIsSmallHeight';
import preloadBannerImages from '@/preload/preloadBannerImages';
import {
  useAvatar,
  useCloseDrawer,
  useColor,
  usePlayerName,
} from '@/store/store';
import type { DrawerRef } from '../../types';
import AvatarPreview from './Components/01_TopSection/AvatarPreview';
import ProfileDrawerNameDisplay from './Components/02_MidSection/ProfileDrawerNameDisplay';
import ProfileDrawerHeader from './Components/ProfileDrawerHeader';
import ProfileDrawerTabs from './Components/ProfileDrawerTabs';

const ProfileDrawer = forwardRef<DrawerRef>((_props, ref) => {
  const visibleCosmetics = useVisibleCosmetics();
  const availableCosmetics = useAvailableCosmetics();
  const nameFromAtom = usePlayerName();
  const colorFromAtom = useColor();
  const avatarFromAtom = useAvatar();
  const isSmallHeight = useIsSmallHeight();
  const [name, setName] = useState(nameFromAtom);
  const [color, setColor] = useState(colorFromAtom);
  const [avatar, setAvatar] = useState(avatarFromAtom);
  const [tabIdx, setTabIdx] = useState(0);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const { t } = useLingui();
  const confirmAction = useConfirmationDialog();
  const sendRoomMessage = useSendRoomMessage();
  const closeDrawer = useCloseDrawer();

  const cosmetic: Cosmetic = { color, avatar };
  const { background } = getPlayerDecoration(cosmetic);
  const isUnsavedChanges =
    name.trim() !== nameFromAtom ||
    color !== colorFromAtom ||
    avatar.join() !== avatarFromAtom.join();

  /**
   * On mount, preload the banner images
   */
  useEffect(() => {
    // Should we do this?
    preloadBannerImages();
    // HACK: This is a hack to preload the images so that they don't blink when
    // first shown
    visibleCosmetics.forEach(({ filename: cosmeticFilename }) => {
      const src = getCosmeticSrc(cosmeticFilename);
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, []);

  /**
   * Update the local state when the user's name or cosmetic changes
   * Should fire when the user signs in or signs up
   */
  useEffect(() => {
    setName(nameFromAtom);
    setColor(colorFromAtom);
    setAvatar(avatarFromAtom);
  }, [nameFromAtom, colorFromAtom, avatarFromAtom.join()]);

  const saveAvatar = (acquiredCosmetics?: UserCosmeticItem[]) => {
    const trimmedName = name.trim();
    const mergedCosmetics = [
      ...availableCosmetics.map((cosmetic) => cosmetic.filename),
      ...(acquiredCosmetics || []).map((cosmetic) => cosmetic.cosmeticFilename),
    ];
    const newAvatar = avatar.map((newFilename, idx) => {
      const isAvailable = mergedCosmetics.some(
        (filename) => filename === newFilename
      );
      return isAvailable ? newFilename : avatarFromAtom[idx];
    });
    const cosmetic = {
      color,
      avatar: newAvatar,
    };
    sendRoomMessage({
      type: 'SetPlayerData',
      name: trimmedName,
      cosmetic,
    });
  };

  // TODO: This should be optimized.
  // ALSO: It only handles avatar parts, not colors
  const selectedLockedCosmetics: CosmeticItem[] = [];
  for (const filename of avatar) {
    const isAvailable = availableCosmetics.some(
      (availableItem) => availableItem.filename === filename
    );
    if (!isAvailable) {
      const cosmeticItem = allCosmeticItems.find(
        (item) => item.filename === filename
      );
      if (cosmeticItem) {
        selectedLockedCosmetics.push(cosmeticItem);
      }
    }
  }

  const _setTabIdx = (_tabIdx: number) => {
    if (_tabIdx !== tabIdx) {
      setTabIdx(_tabIdx);
      playSfx('Button_Main');
    }
  };

  const onClickSave = (acquiredCosmetics?: UserCosmeticItem[]) => {
    if (selectedLockedCosmetics.length && !isPurchaseModalOpen) {
      setIsPurchaseModalOpen(true);
      return;
    }
    const trimmedName = name.trim();
    if (trimmedName === '') {
      // TODO: Don't assume name is the first tab
      _setTabIdx(0);
      return;
    }
    saveAvatar(acquiredCosmetics);
    closeDrawer();
    playSfx('Button_Avatar_ThatsMe');
  };

  const onCloseDrawer = () => {
    if (isUnsavedChanges) {
      confirmAction({
        title: t`Save changes?`,
        message: t`You can save your changes or discard them.`,
        okText: t`Save`,
        cancelText: t`Discard`,
        onConfirm: () => onClickSave(),
        onCancel: closeDrawer,
      });
    } else {
      closeDrawer();
    }
  };

  const revertItem = (filename: string) => {
    const newAvatar = avatar.map((part) =>
      part === filename ? avatarFromAtom[avatar.indexOf(part)] : part
    );
    setAvatar(newAvatar);
  };
  const onCloseModal = () => {
    setIsPurchaseModalOpen(false);
  };
  // Expose onCloseDrawer to parent component
  useImperativeHandle(ref, () => ({
    onCloseDrawer,
  }));

  return (
    <>
      <CosmeticPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={onCloseModal}
        cosmeticItems={selectedLockedCosmetics}
        revertItem={revertItem}
        onClickSave={onClickSave}
      />
      <McFlex
        autoH
        position="absolute"
        p="10px"
        pr="calc(var(--sair) + 10px)"
        pl="calc(var(--sail) + 10px)"
        zIndex={2}
        top="var(--sait)"
      >
        <ProfileDrawerHeader
          color={color}
          onClickCancel={onCloseDrawer}
          onClickSave={onClickSave}
          isSelectingLockedCosmetics={selectedLockedCosmetics.length > 0}
          isUnsavedChanges={isUnsavedChanges}
        />
      </McFlex>
      <McGrid
        id="ProfileDrawer"
        templateRows={isSmallHeight ? '1fr' : '1fr 1fr'}
        templateColumns={isSmallHeight ? '1fr 1fr' : '1fr'}
        background={background}
        animation={bannerSwimAnimation}
        borderRadius="inherit"
        boxShadow="-4px -4px 4px 4px rgba(0, 0, 0, 0.2)"
        pt="var(--sait)"
        pr="var(--sair)"
        pl="var(--sail)"
      >
        <McGrid templateRows="1fr auto">
          <AvatarPreview avatar={avatar} />
          <ProfileDrawerNameDisplay
            name={name}
            setName={setName}
            color={color}
            avatar={avatar}
            setAvatar={setAvatar}
          />
        </McGrid>
        <McFlex overflow="hidden" pt={isSmallHeight ? '60px' : 0}>
          <ProfileDrawerTabs
            tabIdx={tabIdx}
            setTabIdx={_setTabIdx}
            color={color}
            setColor={setColor}
            avatar={avatar}
            setAvatar={setAvatar}
          />
        </McFlex>
      </McGrid>
    </>
  );
});
ProfileDrawer.displayName = 'ProfileDrawer';

export default ProfileDrawer;
