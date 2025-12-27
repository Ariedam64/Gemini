import { Box, Text } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import type * as React from 'react';
import { decorDex } from '@/common/games/Quinoa/systems/decor';
import {
  EggsDex,
  type FaunaAbilityId,
  type FaunaSpeciesId,
  faunaAbilityIds,
} from '@/common/games/Quinoa/systems/fauna';
import { faunaSpeciesDex } from '@/common/games/Quinoa/systems/fauna/faunaSpeciesDex';
import {
  type FloraAbilityId,
  type FloraSpeciesId,
  floraAbilityIds,
  HarvestType,
} from '@/common/games/Quinoa/systems/flora';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora/floraSpeciesDex';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { JournalVariant } from '@/common/games/Quinoa/systems/journal';
import type { MutationId } from '@/common/games/Quinoa/systems/mutation';
import { slotMachineDex } from '@/common/games/Quinoa/systems/slotMachine';
import { toolsDex } from '@/common/games/Quinoa/systems/tools';
import { Currency } from '@/common/games/Quinoa/types/currency';
import {
  type ActivityLogEntry,
  type CropInventoryItem,
  type GrowSlot,
  type InventoryItem,
  type PetInventoryItem,
  type PetSlot,
  type PlantInventoryItem,
  type PlantTileObject,
  ShopType,
} from '@/common/games/Quinoa/user-json-schema/current';
import { getCropSellPrice } from '@/common/games/Quinoa/utils/sell';
import {
  PlantsTile,
  TallPlantsTile,
  type TileRef,
} from '@/common/games/Quinoa/world/tiles';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import McTooltip from '@/components/McTooltip/McTooltip';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import InventorySprite from '@/Quinoa/components/InventorySprite';
import MutationText from '@/Quinoa/components/MutationText';
import JournalStamp from '@/Quinoa/components/modals/journal/JournalStamp';
import Sprite from '@/Quinoa/components/Sprite';
import { getAbilityColor } from '@/Quinoa/constants/colors';
import { getNormalizedScale } from '@/Quinoa/utils/getNormalizedScale';
import { calculateServerNow } from '@/Quinoa/utils/serverNow';
import { formatTime } from '@/utils/formatTime';
import CurrencyText from '../currency/CurrencyText';
import { getProgress } from '../QuinoaCanvas/sprite-utils';

const skinnyPlantSprites: TileRef[] = [
  TallPlantsTile.Bamboo,
  TallPlantsTile.Cactus,
  TallPlantsTile.DawnCelestialPlant,
  TallPlantsTile.DawnCelestialPlantActive,
  TallPlantsTile.DawnCelestialPlatform,
  TallPlantsTile.MoonCelestialPlant,
  TallPlantsTile.MoonCelestialPlantActive,
  TallPlantsTile.MoonCelestialPlatform,
  TallPlantsTile.StarweaverPlant,
  TallPlantsTile.StarweaverPlatform,
  PlantsTile.Tree,
  PlantsTile.PalmTree,
  PlantsTile.FavaBean,
  PlantsTile.Delphinium,
  PlantsTile.BurrosTail,
];

const matureEggScale = 1.2;
const spriteRenderLimit = 10;

function normalizeAlpha(input: string, targetAlpha = 0.2): string {
  if (input.startsWith('rgba(')) {
    return input.replace(
      /rgba\((\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,)\s*([0-9]*\.?[0-9]+)\s*\)/g,
      (_m, prefix) => `rgba(${prefix} ${targetAlpha})`
    );
  }
  if (
    input.startsWith('linear-gradient') ||
    input.startsWith('radial-gradient')
  ) {
    return input.replace(
      /rgba\((\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,)\s*([0-9]*\.?[0-9]+)\s*\)/g,
      (_m, prefix) => `rgba(${prefix} ${targetAlpha})`
    );
  }
  if (/^#([0-9a-fA-F]{6})$/.test(input)) {
    const hex = input.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${targetAlpha})`;
  }
  return input;
}

/**
 * Returns a very light background color associated with an activity log action.
 * Colors are loosely based on action variants in ButtonTheme, but with soft alpha.
 */
function getActivityLogBg(action: ActivityLogEntry['action']): string {
  const green = 'rgba(60, 170, 56, 0.25)'; // #3CA938 @ 18%
  const darkerGreen = 'rgba(60, 170, 56, 0.45)'; // #3CA938 @ 36%
  const purple = 'rgba(128, 0, 178, 0.2)'; // #8000B2 @ 18%
  const blue = 'rgba(36, 118, 215, 0.2)'; // #2476D7 @ 18%
  const gold = 'rgba(233, 181, 48, 0.2)'; // #E9B530 @ 18%
  const red = 'rgba(197, 48, 48, 0.2)'; // #C53030 @ 18%
  const brown = 'rgba(139, 69, 19, 0.2)'; // #8B4513 @ 18%
  const darkerBrown = 'rgba(139, 69, 19, 0.3)'; // #8B4513 @ 36%

  if (
    faunaAbilityIds.some((abilityId) => abilityId === action) ||
    floraAbilityIds.some((abilityId) => abilityId === action)
  ) {
    const { bg } = getAbilityColor(action as FaunaAbilityId | FloraAbilityId);
    return normalizeAlpha(bg, 0.18);
  }

  switch (action) {
    // Purchases
    case 'purchaseDecor':
    case 'purchaseSeed':
    case 'purchaseEgg':
    case 'purchaseTool':
    case 'waterPlant':
      return blue;
    // Planting / Seeds / Harvest
    case 'plantSeed':
    case 'plantGardenPlant':
      return green;
    case 'harvest':
      return darkerGreen;
    // Eggs
    case 'feedPet':
    case 'plantEgg':
    case 'hatchEgg':
      return purple;
    // Premium
    case 'instaGrow':
    case 'customRestock':
    case 'spinSlotMachine':
      return gold;
    // Selling
    case 'sellAllCrops':
    case 'sellPet':
      return red;
    // Tools / Logging
    case 'potPlant':
    case 'removeGardenObject':
      return darkerBrown;
    case 'logItems':
    case 'mutationPotion':
      return brown;
    // Abilities should be handled by getAbilityColor
    default:
      return brown;
  }
}

/**
 * Formats a timestamp into a relative time string with translation support
 */
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return t`Just now`;
  } else if (diffInMinutes < 60) {
    return t`${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return t`${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return t`${diffInDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
}

/**
 * Highlight component for emphasized values in activity logs
 */
const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isSmallScreen = useIsSmallScreen();

  return (
    <Text
      as="span"
      color="Orange.Dark"
      fontWeight="semibold"
      fontSize={{ base: isSmallScreen ? '12px' : '14px', lg: '17px' }}
    >
      {children}
    </Text>
  );
};

/**
 * Generic template component for activity log entries
 */
interface ActivityLogTemplateProps {
  timestamp: number;
  text: React.ReactNode;
  additionalContent?: React.ReactNode;
  bg: string;
}

const ActivityLogTemplate: React.FC<ActivityLogTemplateProps> = ({
  timestamp,
  text,
  additionalContent,
  bg,
}) => {
  const isSmallScreen = useIsSmallScreen();
  const formattedTime = formatTimestamp(timestamp);
  const timeLabel = new Date(timestamp).toLocaleString();

  return (
    <McGrid
      templateColumns="1fr auto"
      p={1}
      bg={bg}
      autoH
      borderRadius="8px"
      gap={2}
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
    >
      <McGrid templateRows="1fr auto" gap={2} pt={1} pl={1}>
        <Box
          fontSize={{ base: isSmallScreen ? '12px' : '14px', lg: '17px' }}
          color="MagicBlack"
          lineHeight="1.2"
          fontWeight="medium"
        >
          {text}
        </Box>
        <McFlex orient="left">
          <McTooltip label={timeLabel} keepOpenOnDesktopClick>
            <Text
              fontSize={{ base: isSmallScreen ? '9px' : '10px', lg: '13px' }}
              color="Brown.Magic"
              flexShrink={0}
            >
              {formattedTime}
            </Text>
          </McTooltip>
        </McFlex>
      </McGrid>
      <McFlex
        auto
        wrap="wrap"
        orient="right"
        maxWidth={{ base: '120px', sm: '180px', md: '250px' }}
      >
        {additionalContent}
      </McFlex>
    </McGrid>
  );
};

const CropInventoryLogSprite: React.FC<{
  crop: CropInventoryItem;
  size: number;
}> = ({ crop, size }) => {
  const { tileRef } = floraSpeciesDex[crop.species].crop;
  const scaledSizePx = `${size * getNormalizedScale(crop.scale)}px`;
  const isSkinnyPlant = skinnyPlantSprites.includes(tileRef);

  return (
    <McFlex
      auto
      width={
        // Reduce empty space around skinny plants.
        isSkinnyPlant ? `${size / 1.2}px` : scaledSizePx
      }
      height={scaledSizePx}
      position="relative"
    >
      <McFlex position="absolute" auto>
        <InventorySprite
          // Set scale to 1 because we already handle the sizing manually
          // and don't want to scale it twice.
          item={{ ...crop, scale: 1 }}
          size={scaledSizePx}
          canvasScale={isSkinnyPlant ? 3 : 2.2}
        />
      </McFlex>
    </McFlex>
  );
};

const GrowSlotLogSprite: React.FC<{
  growSlot: GrowSlot;
  size: number;
}> = ({ growSlot, size }) => {
  const { species, startTime, endTime, targetScale } = growSlot;
  const { tileRef } = floraSpeciesDex[species].crop;
  const progress = getProgress(startTime, endTime, calculateServerNow());
  const scaledSizePx = `${size * getNormalizedScale(targetScale * progress)}px`;
  const inventoryItem: CropInventoryItem = {
    id: '',
    species,
    itemType: ItemType.Produce,
    // Set scale to 1 because we already handle the sizing manually
    // and don't want to scale it twice.
    scale: 1,
    mutations: growSlot.mutations,
  };
  const isSkinnyPlant = skinnyPlantSprites.includes(tileRef);

  return (
    <McFlex
      auto
      width={
        // Reduce empty space around skinny plants.
        isSkinnyPlant
          ? `${(size * getNormalizedScale(progress)) / 1.2}px`
          : scaledSizePx
      }
      height={scaledSizePx}
      position="relative"
    >
      <McFlex position="absolute" auto>
        <InventorySprite
          item={inventoryItem}
          size={scaledSizePx}
          canvasScale={isSkinnyPlant ? 3 : 2.2}
        />
      </McFlex>
    </McFlex>
  );
};

const PlantLogSprite: React.FC<{
  plant: PlantTileObject;
  size: number;
}> = ({ plant, size }) => {
  const { species, slots, plantedAt, maturedAt } = plant;
  const { baseTileScale, harvestType, tileRef } =
    floraSpeciesDex[species].plant;
  let growthScale = 1;
  if (harvestType === HarvestType.Single) {
    const progress = getProgress(plantedAt, maturedAt, calculateServerNow());
    growthScale = slots[0].targetScale * progress;
  }
  const plantItem: PlantInventoryItem = {
    // We use a dummy ID here because this is a visual-only representation for
    // the log, not a real inventory item.
    // NOTE: This relies on CanvasSpriteCache NOT caching plants by ID. If plant
    // caching is ever added, this must use a unique ID (e.g. derived from log
    // timestamp).
    id: '',
    species,
    itemType: ItemType.Plant,
    slots,
    plantedAt,
    maturedAt,
  };
  const scaledSize = size * getNormalizedScale(baseTileScale * growthScale);

  return (
    <McFlex
      auto
      width={skinnyPlantSprites.includes(tileRef) ? scaledSize / 1.5 : 'auto'}
    >
      <InventorySprite
        item={plantItem}
        size={`${scaledSize}px`}
        canvasScale={2}
      />
    </McFlex>
  );
};

const PetLogSprite: React.FC<{
  pet: PetInventoryItem | PetSlot;
  size: number;
}> = ({ pet, size }) => {
  const inventoryItem: PetInventoryItem = {
    itemType: ItemType.Pet,
    petSpecies: pet.petSpecies,
    xp: pet.xp,
    targetScale: pet.targetScale,
    mutations: pet.mutations,
    name: pet.name,
    hunger: pet.hunger,
    abilities: pet.abilities,
    id: pet.id,
  };

  return <InventorySprite item={inventoryItem} size={`${size}px`} />;
};

const AdditionalItemsIcon: React.FC<{
  numItems: number;
  size: number;
}> = ({ numItems, size }) => {
  return (
    <McFlex
      width={`${size * 0.7}px`}
      height={`${size * 0.7}px`}
      m={`${size * 0.1}px`}
      bg="Brown.Pastel"
      borderRadius="full"
    >
      <Text
        fontSize={{ base: '12px', md: '14px', lg: '16px' }}
        color="Brown.Magic"
        fontWeight="bold"
      >
        +{numItems}
      </Text>
    </McFlex>
  );
};

/**
 * Generates a human-readable description for an activity log entry.
 * Returns a React component with the log entry formatted using the template.
 */
const ActivityLogDescription: React.FC<{
  log: ActivityLogEntry;
}> = ({ log }) => {
  const isSmallScreen = useIsSmallScreen();
  // The egg should be slightly larger when it's mature
  const standardSpriteSizePx = isSmallScreen ? 30 : 42;
  const seedSpriteSizePx = standardSpriteSizePx;
  const toolSpriteSizePx = standardSpriteSizePx;
  const decorSpriteSizePx = standardSpriteSizePx;
  const currencySpriteSizePx = standardSpriteSizePx;
  const plantSpriteSizePx = standardSpriteSizePx;
  const cropSpriteSizePx = isSmallScreen ? 24 : 36;
  const petSpriteSizePx = isSmallScreen ? 24 : 36;
  const eggSpriteSizePx = isSmallScreen ? 20 : 32;
  const currencyTextSpriteSize = isSmallScreen ? '18px' : '20px';
  const currencyTextFontSize = {
    base: isSmallScreen ? '12px' : '14px',
    lg: '17px',
  };
  const activityBg = getActivityLogBg(log.action);

  switch (log.action) {
    case 'plantSeed': {
      const { speciesIds } = log.parameters;
      // We only support one type of species per log at the moment, which is why this is safe
      const speciesId = speciesIds[0];
      const numPlanted = speciesIds.length;
      const seedName = floraSpeciesDex[speciesId].seed.name;
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Seed,
        species: speciesId,
        quantity: 1,
      };

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You planted {numPlanted} <Highlight>{seedName}</Highlight>
              {numPlanted > 1 ? '(s)' : ''}
            </Trans>
          }
          additionalContent={
            <InventorySprite
              item={inventoryItem}
              size={`${seedSpriteSizePx}px`}
            />
          }
        />
      );
    }

    case 'harvest': {
      const { crops } = log.parameters;
      // We only support one type of species per log at the moment, which is why this is safe
      const speciesId = crops[0].species;
      const numHarvested = crops.length;
      const cropName = floraSpeciesDex[speciesId].crop.name;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You harvested {numHarvested} <Highlight>{cropName}</Highlight>
              {numHarvested > 1 ? '(s)' : ''}
            </Trans>
          }
          additionalContent={crops
            .toReversed()
            .map((crop) => (
              <CropInventoryLogSprite
                key={crop.id}
                crop={crop}
                size={cropSpriteSizePx}
              />
            ))}
        />
      );
    }

    case 'potPlant': {
      const { plant } = log.parameters;
      const plantName = floraSpeciesDex[plant.species].plant.name;
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Tool,
        toolId: 'PlanterPot',
        quantity: 1,
      };

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You potted your <Highlight>{plantName}</Highlight>
            </Trans>
          }
          additionalContent={
            <>
              <PlantLogSprite plant={plant} size={plantSpriteSizePx} />
              <InventorySprite
                item={inventoryItem}
                size={`${toolSpriteSizePx}px`}
              />
            </>
          }
        />
      );
    }

    case 'plantGardenPlant': {
      const { plant } = log.parameters;
      const plantName = floraSpeciesDex[plant.species].plant.name;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You re-planted your <Highlight>{plantName}</Highlight>
            </Trans>
          }
          additionalContent={
            <PlantLogSprite plant={plant} size={plantSpriteSizePx} />
          }
        />
      );
    }

    case 'waterPlant': {
      const { plant, numTimes, secondsReduced } = log.parameters;
      const plantName = floraSpeciesDex[plant.species].plant.name;
      const timeSaved = formatTime(secondsReduced * 1000);

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You watered your <Highlight>{plantName}</Highlight>{' '}
              {numTimes > 1 ? t`${numTimes} times` : ''} and sped up its growth
              by <Highlight>{timeSaved}</Highlight>
            </Trans>
          }
          additionalContent={
            <PlantLogSprite plant={plant} size={plantSpriteSizePx} />
          }
        />
      );
    }

    case 'plantEgg': {
      const { eggIds } = log.parameters;
      // We only support one type of egg per log at the moment, which is why this is safe
      const eggId = eggIds[0];
      const numPlanted = eggIds.length;
      const eggName = EggsDex[eggId].name;
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Egg,
        eggId,
        quantity: 1,
      };

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You planted {numPlanted} <Highlight>{eggName}</Highlight>
              {numPlanted > 1 ? '(s)' : ''}
            </Trans>
          }
          additionalContent={
            <InventorySprite
              item={inventoryItem}
              size={`${eggSpriteSizePx}px`}
            />
          }
        />
      );
    }

    case 'hatchEgg': {
      const { pet, eggId } = log.parameters;
      const eggName = EggsDex[eggId].name;
      const faunaName = faunaSpeciesDex[pet.petSpecies].name;
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Egg,
        eggId,
        quantity: 1,
      };

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You hatched your <Highlight>{eggName}</Highlight> and got 1{' '}
              <Highlight>{faunaName}</Highlight>
            </Trans>
          }
          additionalContent={
            <>
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
              <InventorySprite
                item={inventoryItem}
                size={`${eggSpriteSizePx * matureEggScale}px`}
              />
            </>
          }
        />
      );
    }

    case 'feedPet': {
      const { pet, crops } = log.parameters;
      // We only support one type of species per log at the moment, which is why this is safe
      const speciesId = crops[0].species;
      const numCrops = crops.length;
      const { name: petName, petSpecies } = pet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const cropName = floraSpeciesDex[speciesId].crop.name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You fed {petText} {numCrops} <Highlight>{cropName}</Highlight>
              {numCrops > 1 ? '(s)' : ''}
            </Trans>
          }
          additionalContent={
            <>
              {crops.toReversed().map((crop) => (
                <CropInventoryLogSprite
                  key={crop.id}
                  crop={crop}
                  size={cropSpriteSizePx}
                />
              ))}
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    case 'removeGardenObject': {
      const gardenObject = log.parameters.gardenObject;

      let name: string;
      let sprite: React.ReactNode;

      switch (gardenObject.objectType) {
        case 'plant': {
          name = floraSpeciesDex[gardenObject.species].plant.name;
          sprite = (
            <PlantLogSprite plant={gardenObject} size={plantSpriteSizePx} />
          );
          break;
        }
        case 'decor': {
          const { decorId } = gardenObject;
          name = decorDex[decorId].name;
          const inventoryItem: InventoryItem = {
            itemType: ItemType.Decor,
            decorId,
            quantity: 1,
          };
          sprite = (
            <InventorySprite
              item={inventoryItem}
              size={`${decorSpriteSizePx}px`}
            />
          );
          break;
        }
        default:
          return null;
      }
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Tool,
        toolId: 'Shovel',
        quantity: 1,
      };

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You destroyed your <Highlight>{name}</Highlight>
            </Trans>
          }
          additionalContent={
            <>
              {sprite}
              <InventorySprite
                item={inventoryItem}
                size={`${toolSpriteSizePx}px`}
              />
            </>
          }
        />
      );
    }

    case 'purchaseSeed': {
      const { currency, purchasePrice, speciesIds } = log.parameters;
      // We only support one type of species per log at the moment, which is why this is safe
      const speciesId = speciesIds[0];
      const numPurchased = speciesIds.length;
      const seedName = floraSpeciesDex[speciesId].seed.name;
      const cost = Math.round(purchasePrice);
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Seed,
        species: speciesId,
        quantity: 1,
      };

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You purchased {numPurchased} <Highlight>{seedName}</Highlight>
              {numPurchased > 1 ? '(s)' : ''} for{' '}
              <CurrencyText
                currency={currency}
                amount={cost}
                spriteSize={currencyTextSpriteSize}
                fontSize={currencyTextFontSize}
              />
            </Trans>
          }
          additionalContent={
            <InventorySprite
              item={inventoryItem}
              size={`${seedSpriteSizePx}px`}
            />
          }
        />
      );
    }

    case 'purchaseEgg': {
      const { currency, purchasePrice, eggIds } = log.parameters;
      // We only support one type of egg per log at the moment, which is why this is safe
      const eggId = eggIds[0];
      const numPurchased = eggIds.length;
      const eggName = EggsDex[eggId].name;
      const cost = Math.round(purchasePrice);
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Egg,
        eggId,
        quantity: 1,
      };

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You purchased {numPurchased} <Highlight>{eggName}</Highlight>
              {numPurchased > 1 ? '(s)' : ''} for{' '}
              <CurrencyText
                currency={currency}
                amount={cost}
                spriteSize={currencyTextSpriteSize}
                fontSize={currencyTextFontSize}
              />
            </Trans>
          }
          additionalContent={
            <InventorySprite
              item={inventoryItem}
              size={`${eggSpriteSizePx}px`}
            />
          }
        />
      );
    }

    case 'purchaseTool': {
      const { currency, purchasePrice, toolIds } = log.parameters;
      // We only support one type of tool per log at the moment, which is why this is safe
      const toolId = toolIds[0];
      const numPurchased = toolIds.length;
      const toolName = toolsDex[toolId].name;
      const cost = Math.round(purchasePrice);
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Tool,
        toolId,
        quantity: 1,
      };

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You purchased {numPurchased} <Highlight>{toolName}</Highlight>
              {numPurchased > 1 ? '(s)' : ''} for{' '}
              <CurrencyText
                currency={currency}
                amount={cost}
                spriteSize={currencyTextSpriteSize}
                fontSize={currencyTextFontSize}
              />
            </Trans>
          }
          additionalContent={
            <InventorySprite
              item={inventoryItem}
              size={`${toolSpriteSizePx}px`}
            />
          }
        />
      );
    }

    case 'purchaseDecor': {
      const { currency, purchasePrice, decorIds } = log.parameters;
      // We only support one type of decor per log at the moment, which is why this is safe
      const decorId = decorIds[0];
      const numPurchased = decorIds.length;
      const decorName = decorDex[decorId].name;
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Decor,
        decorId,
        quantity: 1,
      };

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You purchased {numPurchased} <Highlight>{decorName}</Highlight>
              {numPurchased > 1 ? '(s)' : ''} for{' '}
              <CurrencyText
                currency={currency}
                amount={purchasePrice}
                spriteSize={currencyTextSpriteSize}
                fontSize={currencyTextFontSize}
              />
            </Trans>
          }
          additionalContent={
            <InventorySprite
              item={inventoryItem}
              size={`${decorSpriteSizePx}px`}
            />
          }
        />
      );
    }

    case 'sellAllCrops': {
      const { totalValue, cropsSold } = log.parameters;
      const numCrops = cropsSold.length;
      const cropsText = numCrops > 1 ? t`crops` : t`crop`;
      const renderedCrops = cropsSold
        .sort((a, b) => getCropSellPrice(b) - getCropSellPrice(a))
        .slice(0, spriteRenderLimit);
      const numAdditionalCrops = numCrops - spriteRenderLimit;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You sold <Highlight>{numCrops}</Highlight> {cropsText} for{' '}
              <CurrencyText
                currency={Currency.Coins}
                amount={totalValue}
                spriteSize={currencyTextSpriteSize}
                fontSize={currencyTextFontSize}
              />
            </Trans>
          }
          additionalContent={
            <>
              {renderedCrops.map((crop) => (
                <CropInventoryLogSprite
                  key={crop.id}
                  crop={crop}
                  size={cropSpriteSizePx}
                />
              ))}
              {numAdditionalCrops > 0 && (
                <AdditionalItemsIcon
                  numItems={numAdditionalCrops}
                  size={standardSpriteSizePx}
                />
              )}
            </>
          }
        />
      );
    }

    case 'sellPet': {
      const { pet, totalValue } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const { name: faunaName } = faunaSpeciesDex[petSpecies];
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You sold {petText} for{' '}
              <CurrencyText
                currency={Currency.Coins}
                amount={totalValue}
                spriteSize={currencyTextSpriteSize}
                fontSize={currencyTextFontSize}
              />
            </Trans>
          }
          additionalContent={<PetLogSprite pet={pet} size={petSpriteSizePx} />}
        />
      );
    }

    case 'logItems': {
      const { newCropVariants, newPetVariants } = log.parameters;
      const allVariantEntries: Array<{
        speciesId: string;
        variant: JournalVariant;
        isCrop: boolean;
      }> = [];
      for (const [speciesId, variants] of Object.entries(newCropVariants)) {
        for (const variant of variants) {
          allVariantEntries.push({ speciesId, variant, isCrop: true });
        }
      }
      for (const [speciesId, variants] of Object.entries(newPetVariants)) {
        for (const variant of variants) {
          allVariantEntries.push({ speciesId, variant, isCrop: false });
        }
      }
      const total = allVariantEntries.length;
      const renderedEntries = allVariantEntries.slice(0, spriteRenderLimit);
      const numAdditionalEntries = total - spriteRenderLimit;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You logged <Highlight>{total}</Highlight> new{' '}
              {total > 1 ? t`entries` : t`entry`} in your journal
            </Trans>
          }
          additionalContent={
            <>
              {renderedEntries.toReversed().map((entry) => {
                const mutations: MutationId[] = [
                  'Normal',
                  'Max Weight',
                ].includes(entry.variant)
                  ? []
                  : [entry.variant as MutationId];

                const item: CropInventoryItem | PetInventoryItem = entry.isCrop
                  ? {
                      id: `journal-${entry.speciesId}-${entry.variant}`,
                      itemType: ItemType.Produce,
                      species: entry.speciesId as FloraSpeciesId,
                      scale: 1,
                      mutations,
                    }
                  : {
                      id: `journal-${entry.speciesId}-${entry.variant}`,
                      itemType: ItemType.Pet,
                      petSpecies: entry.speciesId as FaunaSpeciesId,
                      mutations,
                      hunger: 100,
                      name: null,
                      xp: 0,
                      targetScale: 1,
                      abilities: [],
                    };

                return (
                  <Box key={item.id} ml={1}>
                    <JournalStamp
                      item={item}
                      width={`${standardSpriteSizePx}px`}
                      height={`${standardSpriteSizePx}px`}
                      isMaxWeight={entry.variant === 'Max Weight'}
                    />
                  </Box>
                );
              })}
              {numAdditionalEntries > 0 && (
                <AdditionalItemsIcon
                  numItems={numAdditionalEntries}
                  size={standardSpriteSizePx}
                />
              )}
            </>
          }
        />
      );
    }

    case 'instaGrow': {
      const { gardenObject, cost, secondsSaved } = log.parameters;
      const timeSaved = formatTime(secondsSaved * 1000);
      let objectName: string;
      let sprite: React.ReactNode;

      switch (gardenObject.objectType) {
        case 'plant': {
          objectName = floraSpeciesDex[gardenObject.species].plant.name;
          sprite = (
            <PlantLogSprite plant={gardenObject} size={plantSpriteSizePx} />
          );
          break;
        }
        case 'egg': {
          objectName = EggsDex[gardenObject.eggId].name;
          const inventoryItem: InventoryItem = {
            itemType: ItemType.Egg,
            eggId: gardenObject.eggId,
            quantity: 1,
          };

          sprite = (
            <InventorySprite
              item={inventoryItem}
              size={`${eggSpriteSizePx * matureEggScale}px`}
            />
          );
          break;
        }
        default:
          return null;
      }
      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You insta-grew your <Highlight>{objectName}</Highlight> for{' '}
              <Highlight>{cost.toLocaleString()}</Highlight>{' '}
              {cost > 1 ? t`donuts` : t`donut`} and saved{' '}
              <Highlight>{timeSaved}</Highlight>
            </Trans>
          }
          additionalContent={sprite}
        />
      );
    }

    case 'mutationPotion': {
      const { growSlot, toolId } = log.parameters;
      const toolName = toolsDex[toolId].name;
      const speciesName = floraSpeciesDex[growSlot.species].crop.name;
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Tool,
        toolId,
        quantity: 1,
      };

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You used your <Highlight>{toolName}</Highlight> on your{' '}
              <Highlight>{speciesName}</Highlight>
            </Trans>
          }
          additionalContent={
            <>
              <GrowSlotLogSprite growSlot={growSlot} size={cropSpriteSizePx} />
              <InventorySprite
                item={inventoryItem}
                size={`${toolSpriteSizePx}px`}
              />
            </>
          }
        />
      );
    }

    case 'spinSlotMachine': {
      const { slotMachineId, prizeId } = log.parameters;
      const { name, prizes } = slotMachineDex[slotMachineId];
      const prize = prizes[prizeId];
      const { name: prizeName } = prize;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You spun <Highlight>{name}</Highlight> and won:
              <Highlight>{prizeName}</Highlight>
            </Trans>
          }
        />
      );
    }

    case 'customRestock': {
      const { shopType, currency, purchasePrice } = log.parameters;
      let shopName: string;
      let customRestockSpriteName: string;

      switch (shopType) {
        case ShopType.Seed:
          shopName = t`Seed Shop`;
          customRestockSpriteName = 'sprite/ui/SeedsRestocked';
          break;
        case ShopType.Egg:
          shopName = t`Egg Shop`;
          customRestockSpriteName = 'sprite/ui/EggsRestocked';
          break;
        case ShopType.Tool:
          shopName = t`Tool Shop`;
          customRestockSpriteName = 'sprite/ui/ToolsRestocked';
          break;
        case ShopType.Decor:
          shopName = t`Decor Shop`;
          customRestockSpriteName = 'sprite/ui/DecorRestocked';
          break;
      }
      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              You restocked the <Highlight>{shopName}</Highlight> for{' '}
              <CurrencyText
                currency={currency}
                amount={purchasePrice}
                spriteSize={currencyTextSpriteSize}
                fontSize={currencyTextFontSize}
              />
            </Trans>
          }
          additionalContent={
            <Sprite
              spriteName={customRestockSpriteName}
              width={`${standardSpriteSizePx}px`}
              height={`${standardSpriteSizePx}px`}
              isNormalizedScale
            />
          }
        />
      );
    }

    // Pet Abilities - Coin Finders
    case 'CoinFinderI':
    case 'CoinFinderII':
    case 'CoinFinderIII': {
      const { pet, coinsFound } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const { name: faunaName } = faunaSpeciesDex[petSpecies];
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} found{' '}
              <CurrencyText
                currency={Currency.Coins}
                amount={coinsFound}
                spriteSize={currencyTextSpriteSize}
                fontSize={currencyTextFontSize}
              />
            </Trans>
          }
          additionalContent={
            <>
              <Sprite
                spriteName="sprite/ui/Coin"
                width={`${currencySpriteSizePx}px`}
                height={`${currencySpriteSizePx}px`}
                isNormalizedScale
              />
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    // Seed Finders
    case 'SeedFinderI':
    case 'SeedFinderII':
    case 'SeedFinderIII':
    case 'SeedFinderIV': {
      const { pet, speciesId } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const { name: faunaName } = faunaSpeciesDex[petSpecies];
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const seedName = floraSpeciesDex[speciesId].seed.name;
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Seed,
        species: speciesId,
        quantity: 1,
      };

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} found 1 <Highlight>{seedName}</Highlight>
            </Trans>
          }
          additionalContent={
            <>
              <InventorySprite
                item={inventoryItem}
                size={`${seedSpriteSizePx}px`}
              />
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    // Hunger Restore
    case 'HungerRestore':
    case 'HungerRestoreII': {
      const { pet, targetPet, hungerRestoreAmount } = log.parameters;
      const { name: petName, petSpecies, id: petId } = pet;
      const {
        name: targetName,
        petSpecies: targetSpecies,
        id: targetPetId,
      } = targetPet;
      const faunaName = faunaSpeciesDex[petSpecies].name;

      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const targetFaunaName = faunaSpeciesDex[targetSpecies].name;

      const isTargetItself = petId === targetPetId;

      const targetText = isTargetItself ? (
        <Trans>itself</Trans>
      ) : targetName ? (
        <Highlight>{targetName}</Highlight>
      ) : (
        <Trans>
          your <Highlight>{targetFaunaName}</Highlight>
        </Trans>
      );
      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} restored{' '}
              <Highlight>{hungerRestoreAmount.toLocaleString()}</Highlight>{' '}
              hunger to <Highlight>{targetText}</Highlight>
            </Trans>
          }
          additionalContent={
            <>
              {isTargetItself ? null : (
                <PetLogSprite pet={targetPet} size={petSpriteSizePx} />
              )}
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    // Double Harvest
    case 'DoubleHarvest': {
      const { pet, harvestedCrop } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const cropName = floraSpeciesDex[harvestedCrop.species].crop.name;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} harvested an extra <Highlight>{cropName}</Highlight>
            </Trans>
          }
          additionalContent={
            <>
              <CropInventoryLogSprite
                crop={harvestedCrop}
                size={cropSpriteSizePx}
              />
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    // Double Hatch
    case 'DoubleHatch': {
      const { pet, extraPet } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const extraPetName = faunaSpeciesDex[extraPet.petSpecies].name;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} hatched an extra <Highlight>{extraPetName}</Highlight>
            </Trans>
          }
          additionalContent={
            <>
              <PetLogSprite pet={extraPet} size={petSpriteSizePx} />
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    // Produce Refund
    case 'ProduceRefund': {
      const { pet, cropsRefunded } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const numCrops = cropsRefunded.length;
      const renderedCrops = cropsRefunded.slice(0, spriteRenderLimit);
      const numAdditionalCrops = numCrops - spriteRenderLimit;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} refunded <Highlight>{numCrops}</Highlight>{' '}
              {numCrops > 1 ? t`crops` : t`crop`}
            </Trans>
          }
          additionalContent={
            <>
              {renderedCrops.map((crop) => (
                <CropInventoryLogSprite
                  key={crop.id}
                  crop={crop}
                  size={cropSpriteSizePx}
                />
              ))}
              {numAdditionalCrops > 0 && (
                <AdditionalItemsIcon
                  numItems={numAdditionalCrops}
                  size={standardSpriteSizePx}
                />
              )}
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    // Sell Boost
    case 'SellBoostI':
    case 'SellBoostII':
    case 'SellBoostIII':
    case 'SellBoostIV': {
      const { pet, bonusCoins } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} gave a sale bonus of{' '}
              <CurrencyText
                currency={Currency.Coins}
                amount={bonusCoins}
                spriteSize={currencyTextSpriteSize}
                fontSize={currencyTextFontSize}
              />
            </Trans>
          }
          additionalContent={
            <>
              <Sprite
                spriteName="sprite/ui/Coin"
                width={`${currencySpriteSizePx}px`}
                height={`${currencySpriteSizePx}px`}
                isNormalizedScale
              />
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    // Pet XP Boost
    case 'PetXpBoost':
    case 'PetXpBoostII': {
      const { pet, bonusXp, petsAffected } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const numPets = petsAffected.length;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} boosted the XP of <Highlight>{numPets}</Highlight>{' '}
              {numPets > 1 ? t`pets` : t`pet`} by{' '}
              <Highlight>{bonusXp.toLocaleString()}</Highlight>
            </Trans>
          }
          additionalContent={<PetLogSprite pet={pet} size={petSpriteSizePx} />}
        />
      );
    }

    // Pet Refund
    case 'PetRefund':
    case 'PetRefundII': {
      const { pet, eggId } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const eggName = EggsDex[eggId].name;
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Egg,
        eggId,
        quantity: 1,
      };

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} refunded 1 <Highlight>{eggName}</Highlight>
            </Trans>
          }
          additionalContent={
            <>
              <InventorySprite
                item={inventoryItem}
                size={`${eggSpriteSizePx * matureEggScale}px`}
              />
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    // Pet Age Boost
    case 'PetAgeBoost':
    case 'PetAgeBoostII': {
      const { pet, targetPet, bonusXp } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const { name: targetName, petSpecies: targetSpecies } = targetPet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const targetFaunaName = faunaSpeciesDex[targetSpecies].name;
      const targetText = targetName ? (
        <Highlight>{targetName}</Highlight>
      ) : (
        <Trans>
          your <Highlight>{targetFaunaName}</Highlight>
        </Trans>
      );
      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} boosted the XP of {targetText} by{' '}
              <Highlight>{bonusXp.toLocaleString()}</Highlight>
            </Trans>
          }
          additionalContent={
            <>
              <PetLogSprite pet={targetPet} size={petSpriteSizePx} />
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    // Egg Growth Boost
    case 'EggGrowthBoost':
    case 'EggGrowthBoostII_NEW':
    case 'EggGrowthBoostII': {
      const { pet, secondsReduced, eggsAffected } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const timeSaved = formatTime(secondsReduced * 1000);
      const numEggs = eggsAffected.length;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} sped up the growth of <Highlight>{numEggs}</Highlight>{' '}
              {numEggs > 1 ? t`eggs` : t`egg`} by{' '}
              <Highlight>{timeSaved}</Highlight>
            </Trans>
          }
          additionalContent={<PetLogSprite pet={pet} size={petSpriteSizePx} />}
        />
      );
    }

    // Pet Hatch Size Boost
    case 'PetHatchSizeBoost':
    case 'PetHatchSizeBoostII': {
      const { pet, targetPet, strengthIncrease } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const { name: targetName, petSpecies: targetSpecies } = targetPet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const targetFaunaName = faunaSpeciesDex[targetSpecies].name;
      const targetText = targetName ? (
        <Highlight>{targetName}</Highlight>
      ) : (
        <Trans>
          your <Highlight>{targetFaunaName}</Highlight>
        </Trans>
      );
      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} boosted the Max Strength of {targetText} by{' '}
              <Highlight>{strengthIncrease.toFixed(0)}</Highlight>
            </Trans>
          }
          additionalContent={
            <>
              <PetLogSprite pet={targetPet} size={petSpriteSizePx} />
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    // Produce Scale Boost
    case 'ProduceScaleBoost':
    case 'ProduceScaleBoostII': {
      const { pet, scaleIncreasePercentage, numPlantsAffected } =
        log.parameters;
      const { name: petName, petSpecies } = pet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const numPlants = numPlantsAffected;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} boosted the size of <Highlight>{numPlants}</Highlight>{' '}
              {numPlants > 1 ? t`crops` : t`crop`} by{' '}
              <Highlight>{scaleIncreasePercentage.toFixed(0)}%</Highlight>
            </Trans>
          }
          additionalContent={<PetLogSprite pet={pet} size={petSpriteSizePx} />}
        />
      );
    }

    // Plant Growth Boost
    case 'PlantGrowthBoost':
    case 'PlantGrowthBoostII': {
      const { pet, secondsReduced, numPlantsAffected } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const timeSaved = formatTime(secondsReduced * 1000);
      const numPlants = numPlantsAffected;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} sped up the growth of <Highlight>{numPlants}</Highlight>{' '}
              {numPlants > 1 ? t`plants` : t`plant`} by{' '}
              <Highlight>{timeSaved}</Highlight>
            </Trans>
          }
          additionalContent={<PetLogSprite pet={pet} size={petSpriteSizePx} />}
        />
      );
    }

    // Gold/Rainbow Granter
    case 'GoldGranter':
    case 'RainbowGranter':
    case 'RainDance': {
      const { pet, mutation, growSlot } = log.parameters;
      const { species, mutations } = growSlot;
      const { name: petName, petSpecies } = pet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const speciesName = floraSpeciesDex[species].crop.name;

      let text: React.ReactNode;
      // If the crop is Frozen, we know that it was previously Chilled and
      // turned Frozen when gaining Wet from Rain Dance.
      if (log.action === 'RainDance' && mutations.includes('Frozen')) {
        text = (
          <Trans>
            {petText} made your <MutationText mutationId="Chilled" isDark />{' '}
            <Highlight>{speciesName}</Highlight> turn{' '}
            <MutationText mutationId="Frozen" isDark />
          </Trans>
        );
      } else {
        text = (
          <Trans>
            {petText} made your <Highlight>{speciesName}</Highlight> turn{' '}
            <MutationText mutationId={mutation} isDark />
          </Trans>
        );
      }
      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={text}
          additionalContent={
            <>
              <GrowSlotLogSprite growSlot={growSlot} size={cropSpriteSizePx} />
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    // Produce Eater
    case 'ProduceEater': {
      const { pet, growSlot, sellPrice } = log.parameters;
      const { name: petName, petSpecies } = pet;
      const faunaName = faunaSpeciesDex[petSpecies].name;
      const petText = petName ? (
        <Highlight>{petName}</Highlight>
      ) : (
        <Trans>
          Your <Highlight>{faunaName}</Highlight>
        </Trans>
      );
      const speciesName = floraSpeciesDex[growSlot.species].crop.name;

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              {petText} ate your <Highlight>{speciesName}</Highlight> for{' '}
              <CurrencyText
                currency={Currency.Coins}
                amount={sellPrice}
                spriteSize={currencyTextSpriteSize}
                fontSize={currencyTextFontSize}
              />
            </Trans>
          }
          additionalContent={
            <>
              <GrowSlotLogSprite growSlot={growSlot} size={cropSpriteSizePx} />
              <PetLogSprite pet={pet} size={petSpriteSizePx} />
            </>
          }
        />
      );
    }

    // Plant Abilities
    case 'MoonKisser':
    case 'DawnKisser': {
      const { speciesId, growSlotsAffected, targetMutation, sourceMutation } =
        log.parameters;
      const { name: plantName, baseTileScale } =
        floraSpeciesDex[speciesId].plant;
      const tileRef =
        speciesId === 'MoonCelestial'
          ? TallPlantsTile.MoonCelestialPlantActive
          : TallPlantsTile.DawnCelestialPlantActive;
      const numAffected = growSlotsAffected.length;
      const scaledSize = plantSpriteSizePx * getNormalizedScale(baseTileScale);

      return (
        <ActivityLogTemplate
          timestamp={log.timestamp}
          bg={activityBg}
          text={
            <Trans>
              Your <Highlight>{plantName}</Highlight> replaced{' '}
              <MutationText mutationId={sourceMutation} isDark /> with the{' '}
              <MutationText mutationId={targetMutation} isDark /> mutation on{' '}
              <Highlight>{numAffected}</Highlight>{' '}
              {numAffected > 1 ? t`crops` : t`crop`}
            </Trans>
          }
          additionalContent={
            <>
              {growSlotsAffected.map((growSlot) => (
                <GrowSlotLogSprite
                  key={`${growSlot.species}-${growSlot.startTime}-${growSlot.targetScale}`}
                  growSlot={growSlot}
                  size={cropSpriteSizePx}
                />
              ))}
              <McFlex
                auto
                width={
                  skinnyPlantSprites.includes(tileRef)
                    ? // We do this so there's less empty space around the sprite
                      (plantSpriteSizePx * getNormalizedScale(baseTileScale)) /
                      1.5
                    : scaledSize
                }
                height={`${scaledSize}px`}
                position="relative"
              >
                <McFlex position="absolute" auto>
                  <Sprite
                    tileRef={tileRef}
                    width={`${scaledSize}px`}
                    height={`${scaledSize}px`}
                    isNormalizedScale
                  />
                </McFlex>
              </McFlex>
            </>
          }
        />
      );
    }
  }
};

export default ActivityLogDescription;
