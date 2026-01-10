import { Text } from '@chakra-ui/layout';
import { Trans } from '@lingui/react/macro';
import type { FloraSpeciesId } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import InfoIcon from '../InfoIcon';
import InventorySprite from '../InventorySprite';

interface PetDietProps {
  petDiet: FloraSpeciesId[];
}

const PetDiet: React.FC<PetDietProps> = ({ petDiet }) => {
  const tooltipContent = (
    <McFlex col auto gap={1} p={1} maxW="200px">
      <Text
        fontSize={{ base: '12px', md: '14px' }}
        fontWeight="bold"
        align="center"
      >
        <Trans>This pet only eats these crops</Trans>
      </Text>
      <McFlex gap={1} wrap="wrap" auto>
        {petDiet.map((speciesId) => (
          <McFlex auto key={speciesId} gap={1}>
            <InventorySprite
              item={{
                itemType: ItemType.Produce,
                species: speciesId,
                scale: 1,
                id: speciesId,
                mutations: [],
              }}
              size="24px"
              canvasScale={2.5}
            />
          </McFlex>
        ))}
      </McFlex>
    </McFlex>
  );

  return (
    <McTooltip label={tooltipContent} keepOpenOnDesktopClick>
      <InfoIcon boxSize="22px" fill="Brown.Magic" />
    </McTooltip>
  );
};

export default PetDiet;
