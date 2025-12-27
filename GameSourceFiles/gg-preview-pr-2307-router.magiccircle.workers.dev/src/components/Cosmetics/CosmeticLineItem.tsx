import { Box, Text } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trash2 } from 'react-feather';
import { getRandomDefaultAvatar } from '@/common/resources/avatars/generateRandomDefaultUserStyle';
import type { CosmeticType } from '@/common/resources/cosmetics/cosmeticTypes';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { useAvatar } from '@/store/store';
import CosmeticImage from './CosmeticImage';

interface CosmeticLineItemProps {
  type: CosmeticType;
  name: string;
  price: number;
  filename: string;
  onClickRemove: () => void;
}

const CosmeticLineItem: React.FC<CosmeticLineItemProps> = ({
  type,
  name,
  price,
  filename,
  onClickRemove,
}) => {
  const avatar = useAvatar();

  return (
    <McFlex autoH bg="Neutral.EarlGrey" borderRadius="10px">
      <McGrid templateColumns="25% 1fr auto" pr="10px">
        <Box px="5px">
          {type === 'Expression' ? (
            // A bit of extra hacking to make the expression look better
            <Box transform="scale(0.8)">
              <CosmeticImage
                type={type}
                filename={filename}
                // Since 12/18/2024, there should only be a single default
                // random avatar, so the "random" aspect should be
                // removed/refactored. Til then, we'll just use a random avatar
                // Btw, we want to do this to show the expression in the
                // "default" avatar to make it clear that its the expression
                // itself being shown, not the face.
                avatar={getRandomDefaultAvatar()}
              />
            </Box>
          ) : (
            <CosmeticImage type={type} filename={filename} avatar={avatar} />
          )}
        </Box>

        <McGrid templateRows="1fr 1fr">
          <Text alignSelf="flex-end" fontWeight="bold">
            {name}
          </Text>
          <Text color="Orange.Pastel" fontWeight="bold">
            🍞 {price.toLocaleString()}
          </Text>
        </McGrid>

        <IconButton
          aria-label={t`Remove`}
          icon={<Trash2 />}
          variant="dark"
          h="40px"
          alignSelf="center"
          onClick={onClickRemove}
          bg="Red.Magic"
        />
      </McGrid>
    </McFlex>
  );
};

export default CosmeticLineItem;
