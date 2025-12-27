import { Button, IconButton } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { X } from 'react-feather';
import type { CosmeticColor } from '@/common/resources/cosmetic-colors';
import BreadWidget from '@/components/Currency/BreadWidget';
import McFlex from '@/components/McFlex/McFlex';
import { getDecoration } from '@/constants/decorations';

interface ProfileDrawerHeaderProps {
  color: CosmeticColor;
  onClickCancel: () => void;
  onClickSave: () => void;
  isSelectingLockedCosmetics: boolean;
  isUnsavedChanges: boolean;
}

const ProfileDrawerHeader: React.FC<ProfileDrawerHeaderProps> = ({
  color,
  onClickCancel,
  onClickSave,
  isSelectingLockedCosmetics,
  isUnsavedChanges,
}) => {
  const { textColor } = getDecoration(color);

  return (
    <McFlex autoH orient="space-between">
      <BreadWidget />
      <McFlex autoW gap={2}>
        {isUnsavedChanges && (
          <Button
            w="80px"
            variant="outline"
            color={textColor}
            borderColor={textColor}
            size="sm"
            aria-label={t`Save`}
            onClick={
              isUnsavedChanges ? () => onClickSave() : () => onClickCancel()
            }
          >
            {isSelectingLockedCosmetics ? (
              <Trans>Buy</Trans>
            ) : (
              <Trans>Save</Trans>
            )}
          </Button>
        )}
        <IconButton
          icon={<X size="32px" />}
          onClick={onClickCancel}
          aria-label={t`Close`}
          variant="outline"
          color={textColor}
          borderColor={textColor}
        />
      </McFlex>
    </McFlex>
  );
};

export default ProfileDrawerHeader;
