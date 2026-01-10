import { IconButton } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { sample } from 'lodash';
import { Shuffle } from 'react-feather';
import { playSfx } from '@/audio/useQuinoaAudio';
import type { CosmeticColor } from '@/common/resources/cosmetic-colors';
import { avatarSections } from '@/common/resources/cosmetics/cosmeticTypes';
import type { Avatar } from '@/common/types/player';
import { getDecoration } from '@/constants/decorations';
import { useVisibleCosmetics } from '@/cosmetics/hooks';

interface ShuffleAvatarButtonProps {
  avatar: Avatar;
  setAvatar: (avatar: Avatar) => void;
  color: CosmeticColor;
}

const ShuffleAvatarButton: React.FC<ShuffleAvatarButtonProps> = ({
  avatar,
  setAvatar,
  color,
}) => {
  const visibleCosmeticItems = useVisibleCosmetics();
  const cosmeticsNotCurrentlyEquipped = visibleCosmeticItems.filter(
    (cosmetic) => !avatar.includes(cosmetic.filename)
  );
  const { textColor } = getDecoration(color);

  const onClickRandomize = () => {
    const nextAvatar = avatarSections.map((cosmeticType, idx) => {
      const equipableParts = cosmeticsNotCurrentlyEquipped.filter(
        (cosmetic) => cosmetic.type === cosmeticType
      );
      return sample(equipableParts)?.filename || avatar[idx];
    });
    setAvatar(nextAvatar);
    playSfx('Button_Avatar_Randomizer');
  };

  return (
    <IconButton
      aria-label={t`Shuffle`}
      onClick={onClickRandomize}
      icon={<Shuffle size="28px" />}
      w="32px"
      h="32px"
      variant="blank"
      color={textColor}
      borderColor={textColor}
    />
  );
};

export default ShuffleAvatarButton;
