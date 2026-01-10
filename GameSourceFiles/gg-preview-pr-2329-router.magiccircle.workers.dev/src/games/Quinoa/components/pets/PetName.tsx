import { Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Check, Edit3 } from 'react-feather';
import { faunaSpeciesDex } from '@/common/games/Quinoa/systems/fauna';
import { petNameMaxGraphemeClusters } from '@/common/games/Quinoa/utils/pets';
import { truncateStringSafe } from '@/common/utils/truncateString';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import MagicInput from '@/components/ui/MagicInput';
import { getRarityBackgroundColor } from '@/Quinoa/utils/getRarityBackgroundColor';
import { getContrastingColor } from '@/utils/getContrastingColor';
import { myPetsProgressAtom } from '../../atoms/myAtoms';

interface PetNameProps {
  petId: string;
  onNameChange: (petItemId: string, name: string) => void;
}

const PetName: React.FC<PetNameProps> = ({ petId, onNameChange }) => {
  const petsProgress = useAtomValue(myPetsProgressAtom);
  const { name, speciesId } = petsProgress[petId];
  const [displayedName, setDisplayedName] = useState(name);
  const [editableName, setEditableName] = useState(displayedName);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { rarity } = faunaSpeciesDex[speciesId];

  const rarityBackgroundColor = getRarityBackgroundColor(rarity);
  const contrastingColor = getContrastingColor(rarityBackgroundColor);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.select();
    }
  }, [isEditing]);

  // Update local state when petSlot.name changes (from server update)
  useEffect(() => {
    setDisplayedName(name);
    setEditableName(name);
  }, [name]);

  const onClickEditButton = () => {
    // Save the name when we press enter or click the check button
    if (isEditing) {
      const newName = editableName.trim();

      if (newName === '') {
        // If the field is empty after trimming, revert to the previously saved name.
        setEditableName(displayedName);
      } else {
        // Since we already cap the length on each keystroke, we can save directly.
        setDisplayedName(newName);
        onNameChange(petId, newName);
      }
    }

    setIsEditing(!isEditing);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Restrict the editable name to the allowed maximum number of grapheme clusters
    // as the user types. This prevents the user from entering a name longer than
    // `petNameMaxGraphemeClusters` directly in the input field, providing instant
    // feedback rather than waiting until save.
    const truncatedValue = truncateStringSafe(e.target.value, {
      maxClusters: petNameMaxGraphemeClusters,
    });

    setEditableName(truncatedValue);
  };

  const { t } = useLingui();

  return (
    <McGrid
      h="40px"
      templateColumns="1fr 125px 1fr"
      bg={rarityBackgroundColor}
      color={contrastingColor}
      borderRadius="5px"
      p={1}
    >
      <McFlex gridColumn={2}>
        {isEditing && (
          <MagicInput
            ref={inputRef}
            value={editableName}
            onBlur={onClickEditButton}
            onChange={onInputChange}
            onEnterKeyDown={onClickEditButton}
            placeholder={t`enter name`}
            autoComplete="off"
            type="text"
            fontSize={{ base: '14px', md: '16px' }}
            fontWeight="bold"
            color={contrastingColor}
            bg="transparent"
            border="none"
            outline="none"
            boxShadow="none"
            _focus={{}}
            h="24px"
            w="100%"
            m={0}
          />
        )}
        {!isEditing && (
          <Text
            fontWeight="bold"
            fontSize={{ base: '14px', md: '16px' }}
            onClick={onClickEditButton}
            cursor="pointer"
            noOfLines={1}
          >
            {displayedName}
          </Text>
        )}
      </McFlex>
      <Button
        aria-label={t`Edit name`}
        onClick={onClickEditButton}
        variant="blank"
        color={contrastingColor}
      >
        {isEditing && (
          <Check color={contrastingColor} size={14} strokeWidth={3} />
        )}
        {!isEditing && (
          <Edit3 color={contrastingColor} size={14} strokeWidth={2} />
        )}
      </Button>
    </McGrid>
  );
};

export default PetName;
