import { Button } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import { useEffect, useRef, useState } from 'react';
import { Check, Edit3 } from 'react-feather';
import { PlayerNameMaxStringLength } from '@/common/constants';
import type { CosmeticColor } from '@/common/resources/cosmetic-colors';
import type { Avatar } from '@/common/types/player';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import StrokedText from '@/components/StrokedText/StrokedText';
import MagicInput from '@/components/ui/MagicInput';
import { getDecoration } from '@/constants/decorations';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { truncatePlayerName } from '@/utils/truncatePlayerName';
import ShuffleAvatarButton from './ShuffleAvatarButton';

interface ProfileDrawerAvatarNameProps {
  name: string;
  setName: (name: string) => void;
  color: CosmeticColor;
  avatar: readonly string[];
  setAvatar: (avatar: Avatar) => void;
}

const ProfileDrawerNameDisplay: React.FC<ProfileDrawerAvatarNameProps> = ({
  name,
  setName,
  color,
  avatar,
  setAvatar,
}) => {
  const isSmallScreen = useIsSmallScreen();
  const inputRef = useRef<HTMLInputElement>(null);
  const { backgroundColor, textColor } = getDecoration(color);
  const [editableName, setEditableName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useLingui();

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.select();
    }
  }, [isEditing]);

  const onClickButton = () => {
    // Save the name when we press enter or click the check button
    if (isEditing) {
      if (editableName.trim() === '') {
        setEditableName(name);
      } else {
        setName(editableName);
      }
    }
    setIsEditing(!isEditing);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableName(e.target.value);
  };

  return (
    <McGrid templateColumns="1fr auto 1fr" gap="10px" px="10px" h="55px">
      <McGrid
        templateColumns="1fr auto 1fr"
        gap={2}
        gridColumn={2}
        alignItems="center"
      >
        {isEditing ? (
          <MagicInput
            gridColumn={2}
            ref={inputRef}
            value={editableName}
            onBlur={onClickButton}
            onChange={onChange}
            onEnterKeyDown={onClickButton}
            maxLength={PlayerNameMaxStringLength}
            placeholder={t`enter your name`}
            autoComplete={`${t`given-name`}`}
            id="name-input"
            data-testid="name-input"
            type="text"
            height="45px"
            maxW={{ base: '200px', md: '100%' }}
            fontSize={isSmallScreen ? '20px' : '24px'}
          />
        ) : (
          <StrokedText
            gridColumn={2}
            textAlign="center"
            strokeColor={backgroundColor}
            strokeWidth={6}
            fontSize={isSmallScreen ? '20px' : '24px'}
            fontWeight="bold"
            shadowHeight={0}
            color={textColor}
            zIndex={1}
            mb="0px"
            onClick={onClickButton}
          >
            {truncatePlayerName(name)}
          </StrokedText>
        )}
        <Button
          gridColumn={3}
          variant="blank"
          aria-label={t`Edit name`}
          onClick={onClickButton}
        >
          {isEditing ? (
            <Check color={textColor} size={isSmallScreen ? '20px' : '24px'} />
          ) : (
            <Edit3 color={textColor} size={isSmallScreen ? '20px' : '24px'} />
          )}
        </Button>
      </McGrid>
      <McFlex orient="right" gridColumn={3}>
        <ShuffleAvatarButton
          avatar={avatar}
          setAvatar={setAvatar}
          color={color}
        />
      </McFlex>
    </McGrid>
  );
};

export default ProfileDrawerNameDisplay;
