import { Button, Checkbox, Text } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import McFlex from '@/components/McFlex/McFlex';

interface ItemTypeFilterProps {
  itemTypeFilters: Set<ItemType>;
  onItemTypeFilterChange: (itemType: ItemType, isChecked: boolean) => void;
  onClearFilters?: () => void;
}

const ItemTypeFilter: React.FC<ItemTypeFilterProps> = ({
  itemTypeFilters,
  onItemTypeFilterChange,
  onClearFilters,
}) => {
  const { t } = useLingui();

  const itemTypeDisplayNames: Record<ItemType, string> = {
    [ItemType.Seed]: t`Seed`,
    [ItemType.Produce]: t`Crop`,
    [ItemType.Plant]: t`Plant`,
    [ItemType.Tool]: t`Tool`,
    [ItemType.Pet]: t`Pet`,
    [ItemType.Egg]: t`Egg`,
    [ItemType.Decor]: t`Decor`,
  };

  return (
    <McFlex wrap="wrap" gap={{ base: 2, md: 3 }} rowGap={1} px={2} autoW>
      {[
        ItemType.Seed,
        ItemType.Produce,
        ItemType.Pet,
        ItemType.Egg,
        ItemType.Tool,
        ItemType.Plant,
        ItemType.Decor,
      ].map((itemType) => (
        <Checkbox
          key={itemType}
          isChecked={itemTypeFilters.has(itemType)}
          onChange={(e) => onItemTypeFilterChange(itemType, e.target.checked)}
          sx={{
            '.chakra-checkbox__control': {
              borderRadius: '50%',
              borderWidth: { base: '1px', md: '2px' },
              width: { base: '10px', md: '15px' },
              height: { base: '10px', md: '15px' },
            },
            '.chakra-checkbox__control[data-checked]': {
              bg: 'Purple.Magic !important',
              borderColor: 'Purple.Magic !important',
            },
            '.chakra-checkbox__label': {
              ml: '4px',
            },
          }}
        >
          <Text fontSize={{ base: '13px', md: '14px' }}>
            {itemTypeDisplayNames[itemType]}
          </Text>
        </Checkbox>
      ))}
      <Button
        variant="blank"
        onClick={onClearFilters}
        fontSize={{ base: '11px', md: '12px' }}
        p={0}
        color="Neutral.DarkGrey"
        _hover={{
          color: 'white',
          bg: 'transparent',
        }}
      >
        <Trans>CLEAR FILTERS</Trans>
      </Button>
    </McFlex>
  );
};

export default ItemTypeFilter;
