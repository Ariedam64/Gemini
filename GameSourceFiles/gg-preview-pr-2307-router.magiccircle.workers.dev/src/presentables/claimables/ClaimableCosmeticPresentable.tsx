import type { ClaimableCosmeticInfo } from '@/common/resources/avatars/ClaimableCosmeticInfo';
import { avatarSections } from '@/common/resources/cosmetics/cosmeticTypes';
import { useSendRoomMessage } from '@/hooks';
import { useOpenDrawer, usePlayer } from '@/store/store';
import { post } from '@/utils';
import { useDismissCurrentPresentable } from '..';
import ClaimCosmeticSheet from './ClaimCosmeticSheet';

export interface ClaimableCosmeticPresentable {
  type: 'ClaimableCosmetic';
  component: React.ReactNode;
}

interface ClaimableCosmeticPresentableRendererProps {
  claimableCosmetic: ClaimableCosmeticInfo;
}

export const ClaimableCosmeticPresentableRenderer: React.FC<
  ClaimableCosmeticPresentableRendererProps
> = ({ claimableCosmetic: cosmetic }) => {
  const sendRoomMessage = useSendRoomMessage();
  const openDrawer = useOpenDrawer();
  const player = usePlayer();
  const dissmissPresentable = useDismissCurrentPresentable();

  function claimCosmetic(cosmetic: ClaimableCosmeticInfo) {
    return post(`/me/cosmetics/claim/${cosmetic.cosmeticFilename}`);
  }

  async function onAccept() {
    dissmissPresentable();
    await claimCosmetic(cosmetic);
  }

  async function onWear() {
    dissmissPresentable();
    await claimCosmetic(cosmetic);
    equipCosmetic();
    openDrawer('profile-avatar');
  }

  function equipCosmetic() {
    if (cosmetic.cosmeticType === 'Color') {
      console.warn('Color cosmetics are not supported yet');
      return;
    }
    const avatarIndex = avatarSections.indexOf(cosmetic.cosmeticType);
    const newAvatar = [...player.cosmetic.avatar];
    newAvatar[avatarIndex] = cosmetic.cosmeticFilename;
    sendRoomMessage({
      type: 'SetPlayerData',
      cosmetic: {
        ...player.cosmetic,
        avatar: newAvatar,
      },
    });
  }
  return (
    <ClaimCosmeticSheet
      claimableCosmetic={cosmetic}
      onWear={() => void onWear()}
      onAccept={() => void onAccept()}
    />
  );
};
