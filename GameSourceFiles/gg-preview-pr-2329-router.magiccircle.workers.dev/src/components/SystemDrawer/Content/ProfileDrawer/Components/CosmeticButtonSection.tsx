import { Heading } from '@chakra-ui/layout';
import { memo } from 'react';
import type { CosmeticColor } from '@/common/resources/cosmetic-colors';
import type { CosmeticItem_MaybeLocked } from '@/common/resources/cosmetics/cosmeticTypes';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { MotionBox } from '@/components/Motion';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import CosmeticButton, { type CosmeticButtonProps } from './CosmeticButton';

interface CosmeticButtonSectionProps {
  heading?: string;
  items: CosmeticItem_MaybeLocked[];
  avatar: readonly string[];
  color: CosmeticColor;
  onClickCosmeticButton: (cosmetic: CosmeticItem_MaybeLocked) => void;
}

interface SelectableCosmeticButtonProps extends CosmeticButtonProps {
  isSelected: boolean;
}

const SelectableCosmeticButton: React.FC<SelectableCosmeticButtonProps> = memo(
  ({ isSelected, ...props }) => {
    return (
      <MotionBox
        animate={{
          rotate: isSelected ? -4 : 0,
          scale: isSelected ? 1 : 0.9,
        }}
      >
        <CosmeticButton isSelected={isSelected} {...props} />
      </MotionBox>
    );
  },
  (prevProps, nextProps) => {
    // Expression is a special case because it has a different avatar for each
    // expression, so we DO need to re-render when the avatar changes
    if (prevProps.item.type === 'Expression') {
      return prevProps.avatar === nextProps.avatar;
    }
    // For all other cosmetic types, we only need to re-render when the
    // cosmetic is actually selected or deselected
    return prevProps.isSelected === nextProps.isSelected;
  }
);

const CosmeticButtonSection: React.FC<CosmeticButtonSectionProps> = ({
  heading = '',
  items,
  avatar,
  color,
  onClickCosmeticButton,
}) => {
  const isSmallScreen = useIsSmallScreen();

  if (items.length === 0) {
    return null;
  }
  const isSelected = (id: string) => avatar.includes(id) || color === id;

  return (
    <McGrid templateRows="auto 1fr">
      {heading && (
        <Heading pl="10px" mb="10px">
          {heading}
        </Heading>
      )}
      <McFlex>
        <McGrid
          templateColumns={`repeat(auto-fill, minmax(${isSmallScreen ? '100px' : '120px'}, 1fr))`}
          gap="4px"
        >
          {items.map((item) => (
            <SelectableCosmeticButton
              key={item.id}
              item={item}
              avatar={avatar}
              isSelected={isSelected(item.id)}
              onClick={onClickCosmeticButton}
            />
          ))}
        </McGrid>
      </McFlex>
    </McGrid>
  );
};

export default CosmeticButtonSection;
