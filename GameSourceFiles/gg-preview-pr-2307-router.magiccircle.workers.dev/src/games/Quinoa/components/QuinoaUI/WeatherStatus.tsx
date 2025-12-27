import { Text } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import {
  type WeatherBlueprintBase,
  weatherDex,
} from '@/common/games/Quinoa/systems/weather';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { weatherAtom } from '@/Quinoa/atoms/baseAtoms';
import { isWeatherStatusHighlightedAtom } from '@/Quinoa/atoms/taskAtoms';
import { getFormattedPercentage } from '@/Quinoa/utils/formatPercentage';
import { sendQuinoaMessage } from '@/Quinoa/utils/sendQuinoaMessage';
import { myActiveCropMutationPetsAtom } from '../../atoms/myAtoms';
import InventorySprite from '../InventorySprite';
import TutorialHighlight from '../inventory/TutorialHighlight';
import MutationText from '../MutationText';
import Sprite from '../Sprite';

const WeatherStatus: React.FC = () => {
  const weather = useAtomValue(weatherAtom);
  const isSmallScreen = useIsSmallScreen();
  const size = isSmallScreen ? 42 : 48;
  const isStatusHighlighted = useAtomValue(isWeatherStatusHighlightedAtom);
  const cropMutationPetDetails = useAtomValue(myActiveCropMutationPetsAtom);
  const { t } = useLingui();

  const weatherData: WeatherBlueprintBase = weather
    ? weatherDex[weather]
    : {
        iconSpriteKey: 'sprite/ui/SunnyIcon',
        name: t`Clear Skies`,
      };
  const baseMutationChance = weatherData.mutator?.chancePerMinutePerCrop || 0;
  // Calculate the realized chance per minute per crop
  const totalMutationChanceIncrease =
    cropMutationPetDetails.reduce(
      (total, pet) => total + pet.mutationChanceIncreasePercentage / 100,
      0
    ) || 0;
  const realizedMutationChance = weatherData.mutator
    ? baseMutationChance * (1 + totalMutationChanceIncrease)
    : 0;

  const handleInteraction = () => {
    sendQuinoaMessage({ type: 'CheckWeatherStatus' });
  };

  const tooltipContent = (
    <McFlex col gap="1px">
      <Text fontWeight="bold" fontSize={{ base: '14px', md: '16px' }}>
        {weatherData.name}
      </Text>
      <McFlex h="1px" bg="Neutral.DarkGrey" />
      <McFlex py="1px" col>
        {weatherData.mutator ? (
          <>
            <Text fontSize={{ base: '12px', md: '14px' }}>
              <Trans>Gives the</Trans>{' '}
              <MutationText
                mutationId={weatherData.mutator.mutation}
                fontSize={{ base: '12px', md: '14px' }}
              />{' '}
              <Trans>mutation to mature garden crops</Trans>
            </Text>
            <Text
              fontSize={{ base: '12px', md: '14px' }}
              color="rgba(255, 255, 255, 0.7)"
            >
              <Trans>
                Chance per minute per crop:{' '}
                <Text
                  as="span"
                  fontWeight="bold"
                  fontSize={{ base: '12px', md: '14px' }}
                >
                  {getFormattedPercentage(realizedMutationChance, 3)}%
                </Text>
              </Trans>
            </Text>
            {cropMutationPetDetails.length > 0 && (
              <McFlex
                auto
                fontSize={{ base: '9px', md: '11px' }}
                color="Neutral.Grey"
                py={0.5}
              >
                <Text as="span" fontSize={{ base: '9px', md: '11px' }}>
                  <Text
                    as="span"
                    fontStyle="italic"
                    fontSize={{ base: '9px', md: '11px' }}
                  >
                    {getFormattedPercentage(baseMutationChance)}%{' '}
                  </Text>
                  × (100%
                </Text>
                {cropMutationPetDetails.map((pet, index) => (
                  <McFlex key={`${pet.speciesId}-${index}`} auto>
                    <Text as="span" fontSize={{ base: '9px', md: '11px' }}>
                      +{' '}
                      {getFormattedPercentage(
                        pet.mutationChanceIncreasePercentage
                      )}
                      %
                    </Text>
                    <InventorySprite
                      item={{
                        itemType: ItemType.Pet,
                        petSpecies: pet.speciesId,
                        mutations: pet.mutations,
                        xp: 0,
                        hunger: 100,
                        targetScale: 1,
                        abilities: [],
                        id: '',
                        name: '',
                      }}
                      size="15px"
                    />
                  </McFlex>
                ))}
                <Text as="span" fontSize={{ base: '9px', md: '11px' }}>
                  )
                </Text>
              </McFlex>
            )}
          </>
        ) : (
          <Text fontSize={{ base: '12px', md: '14px' }}>
            <Trans>No special effects</Trans>
          </Text>
        )}
      </McFlex>
    </McFlex>
  );
  return (
    <TutorialHighlight
      isActive={isStatusHighlighted}
      direction="right"
      borderRadius="full"
    >
      <McTooltip label={tooltipContent} placement="left" keepOpenOnDesktopClick>
        <McFlex
          pointerEvents="auto"
          position="relative"
          backgroundColor="rgba(0, 0, 0, 0.65)"
          borderRadius="full"
          borderWidth="2px"
          borderColor="transparent"
          w={`${size}px`}
          h={`${size}px`}
          minW={`${size}px`}
          minH={`${size}px`}
          p={1}
          onClick={handleInteraction}
          onMouseEnter={handleInteraction}
        >
          {weatherData.iconSpriteKey && (
            <Sprite
              spriteName={weatherData.iconSpriteKey}
              width="100%"
              height="100%"
            />
          )}
        </McFlex>
      </McTooltip>
    </TutorialHighlight>
  );
};

export default WeatherStatus;
