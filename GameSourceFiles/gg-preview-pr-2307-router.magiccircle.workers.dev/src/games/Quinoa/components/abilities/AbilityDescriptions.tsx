import { Trans } from '@lingui/react/macro';
import type {
  FaunaAbilityBaseParameters,
  FaunaAbilityId,
} from '@/common/games/Quinoa/systems/fauna';
import {
  type FloraAbilityId,
  floraSpeciesDex,
} from '@/common/games/Quinoa/systems/flora';
import type { FloraAbilityBaseParameters } from '@/common/games/Quinoa/systems/flora/floraAbilitiesDex';
import { Currency } from '@/common/games/Quinoa/types';
import type { PetAbilityToastData } from '@/common/games/Quinoa/utils/pets';
import type { AbilityLabelProps } from '@/Quinoa/components/abilities/AbilityLabel';
import { formatTime } from '@/utils/formatTime';
import { getFormattedPercentage } from '../../utils/formatPercentage';
import CurrencyText from '../currency/CurrencyText';
import MutationText from '../MutationText';

export const getAbilityTriggerDescription = (
  name: string,
  abilityId: FaunaAbilityId | FloraAbilityId,
  data: PetAbilityToastData[FaunaAbilityId]
): React.ReactNode => {
  switch (abilityId) {
    case 'CoinFinderI':
    case 'CoinFinderII':
    case 'CoinFinderIII': {
      const { coinsFound } = data as PetAbilityToastData['CoinFinderI'];
      return (
        <Trans>
          {name} found{' '}
          <CurrencyText
            currency={Currency.Coins}
            amount={coinsFound}
            spriteSize="18px"
            color="MagicWhite"
          />
          !
        </Trans>
      );
    }
    case 'SeedFinderI':
    case 'SeedFinderII':
    case 'SeedFinderIII':
    case 'SeedFinderIV': {
      const { seedName } = data as PetAbilityToastData['SeedFinderI'];
      return (
        <Trans>
          {name} found 1 {seedName}!
        </Trans>
      );
    }
    case 'HungerRestore':
    case 'HungerRestoreII': {
      const { petName, hungerRestoreAmount } =
        data as PetAbilityToastData['HungerRestore'];
      const actualPetName =
        petName === 'itself' ? <Trans>itself</Trans> : petName;
      return (
        <Trans>
          {name} restored {hungerRestoreAmount.toLocaleString()} hunger to{' '}
          {actualPetName}!
        </Trans>
      );
    }
    case 'DoubleHarvest': {
      const { cropName } = data as PetAbilityToastData['DoubleHarvest'];
      return (
        <Trans>
          {name} harvested an extra {cropName}!
        </Trans>
      );
    }
    case 'DoubleHatch': {
      const { petName } = data as PetAbilityToastData['DoubleHatch'];
      return (
        <Trans>
          {name} hatched an extra {petName}!
        </Trans>
      );
    }
    case 'ProduceEater': {
      const { cropName, sellPrice } =
        data as PetAbilityToastData['ProduceEater'];
      return (
        <Trans>
          {name} ate your {cropName} for{' '}
          <CurrencyText
            currency={Currency.Coins}
            amount={sellPrice}
            spriteSize="18px"
            color="MagicWhite"
          />
          !
        </Trans>
      );
    }
    case 'PetHatchSizeBoost':
    case 'PetHatchSizeBoostII': {
      const { petName, strengthIncrease } =
        data as PetAbilityToastData['PetHatchSizeBoost'];
      return (
        <Trans>
          {name} boosted the Max Strength of {petName} by{' '}
          {strengthIncrease.toFixed(0)}!
        </Trans>
      );
    }
    case 'PetAgeBoost':
    case 'PetAgeBoostII': {
      const { petName, bonusXp } = data as PetAbilityToastData['PetAgeBoost'];
      return (
        <Trans>
          {name} boosted the XP of {petName} by{' '}
          {Math.round(bonusXp).toLocaleString()}!
        </Trans>
      );
    }
    case 'PetRefund':
    case 'PetRefundII': {
      const { eggName } = data as PetAbilityToastData['PetRefund'];
      return (
        <Trans>
          {name} refunded 1 {eggName}!
        </Trans>
      );
    }
    case 'ProduceRefund': {
      const { numCropsRefunded } = data as PetAbilityToastData['ProduceRefund'];
      return (
        <Trans>
          {name} refunded {numCropsRefunded} crops!
        </Trans>
      );
    }
    case 'SellBoostI':
    case 'SellBoostII':
    case 'SellBoostIII':
    case 'SellBoostIV': {
      const { bonusCoins } = data as PetAbilityToastData['SellBoostI'];
      return (
        <Trans>
          {name} gave a sale bonus of{' '}
          <CurrencyText
            currency={Currency.Coins}
            amount={bonusCoins}
            spriteSize="18px"
            color="MagicWhite"
          />
          !
        </Trans>
      );
    }
    case 'GoldGranter': {
      const { growSlot } = data as PetAbilityToastData['GoldGranter'];
      const { name: cropName } = floraSpeciesDex[growSlot.species].crop;
      return (
        <Trans>
          {name} made your {cropName} turn{' '}
          <MutationText mutationId="Gold" isDark />!
        </Trans>
      );
    }
    case 'RainbowGranter': {
      const { growSlot } = data as PetAbilityToastData['RainbowGranter'];
      const { name: cropName } = floraSpeciesDex[growSlot.species].crop;
      return (
        <Trans>
          {name} made your {cropName} turn{' '}
          <MutationText mutationId="Rainbow" isDark />!
        </Trans>
      );
    }
    case 'RainDance': {
      const { growSlot } = data as PetAbilityToastData['RainDance'];
      const { species, mutations } = growSlot;
      const { name: cropName } = floraSpeciesDex[species].crop;
      // If the crop is Frozen, we know that it was previously Chilled and
      // turned Frozen when gaining Wet from Rain Dance.
      if (mutations.includes('Frozen')) {
        return (
          <Trans>
            {name} made your <MutationText mutationId="Chilled" isDark />{' '}
            {cropName} turn <MutationText mutationId="Frozen" isDark />!
          </Trans>
        );
      }
      return (
        <Trans>
          {name} made your {cropName} turn{' '}
          <MutationText mutationId="Wet" isDark />!
        </Trans>
      );
    }
    case 'PetXpBoost':
    case 'PetXpBoostII': {
      const { bonusXp } = data as PetAbilityToastData['PetXpBoost'];
      return (
        <Trans>
          {name} boosted the XP of active pets by{' '}
          {Math.round(bonusXp).toLocaleString()}!
        </Trans>
      );
    }
    case 'EggGrowthBoost':
    case 'EggGrowthBoostII_NEW':
    case 'EggGrowthBoostII': {
      const { minutesReduced } = data as PetAbilityToastData['EggGrowthBoost'];
      return (
        <Trans>
          {name} sped up the growth of eggs by{' '}
          {formatTime(minutesReduced * 60 * 1000)}!
        </Trans>
      );
    }
    case 'PlantGrowthBoost':
    case 'PlantGrowthBoostII': {
      const { minutesReduced } =
        data as PetAbilityToastData['PlantGrowthBoost'];
      return (
        <Trans>
          {name} sped up the growth of plants by{' '}
          {formatTime(minutesReduced * 60 * 1000)}!
        </Trans>
      );
    }
    case 'ProduceScaleBoost':
    case 'ProduceScaleBoostII': {
      const { scaleIncreasePercentage } =
        data as PetAbilityToastData['ProduceScaleBoost'];
      return (
        <Trans>
          {name} boosted the size of garden crops by{' '}
          {scaleIncreasePercentage.toFixed(0)}%
        </Trans>
      );
    }
    case 'ProduceMutationBoost':
    case 'ProduceMutationBoostII':
    case 'PetMutationBoost':
    case 'PetMutationBoostII':
    case 'Copycat':
    case 'HungerBoost':
    case 'HungerBoostII':
    case 'MoonKisser':
    case 'DawnKisser':
      return;
    default:
      return;
  }
};

export const getAbilityDescription = (
  abilityId: FaunaAbilityId | FloraAbilityId
): React.ReactNode => {
  switch (abilityId) {
    case 'MoonKisser': {
      return (
        <Trans>
          Chance to replace <MutationText mutationId="Ambershine" /> with{' '}
          <MutationText mutationId="Ambercharged" /> mutation on nearby crops
          during Amber Moon
        </Trans>
      );
    }
    case 'DawnKisser': {
      return (
        <Trans>
          Chance to replace <MutationText mutationId="Dawnlit" /> with{' '}
          <MutationText mutationId="Dawncharged" /> mutation on nearby crops
          during Dawn
        </Trans>
      );
    }
    case 'ProduceScaleBoost':
    case 'ProduceScaleBoostII':
      return <Trans>Chance to increase size of garden crops</Trans>;

    case 'ProduceEater':
      return <Trans>Chance to harvest and sell non-mutated crops</Trans>;

    case 'DoubleHarvest':
      return <Trans>Chance to harvest an extra crop</Trans>;

    case 'DoubleHatch':
      return <Trans>Chance to hatch an extra pet (fraternal siblings!)</Trans>;

    case 'SellBoostI':
    case 'SellBoostII':
    case 'SellBoostIII':
    case 'SellBoostIV':
      return <Trans>Chance to receive bonus coins when selling crops</Trans>;

    case 'ProduceRefund':
      return <Trans>Chance to get crops back when selling</Trans>;

    case 'PlantGrowthBoost':
    case 'PlantGrowthBoostII':
      return <Trans>Chance to reduce growth time of garden plants</Trans>;

    case 'ProduceMutationBoost':
    case 'ProduceMutationBoostII':
      return <Trans>Increases chance of garden crops gaining mutations</Trans>;

    case 'PetMutationBoost':
    case 'PetMutationBoostII':
      return <Trans>Increases chance of hatched pets gaining mutations</Trans>;

    case 'HungerRestore':
    case 'HungerRestoreII':
      return <Trans>Chance to restore hunger of an active pet</Trans>;

    case 'HungerBoost':
    case 'HungerBoostII':
      return <Trans>Reduces hunger depletion rate of active pets</Trans>;

    case 'PetRefund':
    case 'PetRefundII':
      return <Trans>Chance to receive pet back as an egg when sold</Trans>;

    case 'PetXpBoost':
    case 'PetXpBoostII':
      return <Trans>Chance to give XP to active pets</Trans>;

    case 'Copycat':
      return <Trans>Chance to copy ability of another active pet</Trans>;

    case 'CoinFinderI':
    case 'CoinFinderII':
    case 'CoinFinderIII':
      return <Trans>Chance to find coins in your garden</Trans>;

    case 'SeedFinderI':
      return <Trans>Chance to find common and uncommon seeds</Trans>;
    case 'SeedFinderII':
      return <Trans>Chance to find rare and legendary seeds</Trans>;
    case 'SeedFinderIII':
      return <Trans>Chance to find mythical seeds</Trans>;
    case 'SeedFinderIV':
      return <Trans>Chance to find divine and celestial seeds</Trans>;
    case 'PetHatchSizeBoost':
    case 'PetHatchSizeBoostII':
      return <Trans>Chance to increase maximum strength of hatched pets</Trans>;

    case 'PetAgeBoost':
    case 'PetAgeBoostII':
      return <Trans>Chance for hatched pet to start with bonus XP</Trans>;

    case 'EggGrowthBoost':
    case 'EggGrowthBoostII_NEW':
    case 'EggGrowthBoostII':
      return <Trans>Chance to reduce hatch time of garden eggs</Trans>;

    case 'GoldGranter':
      return (
        <>
          <Trans>Chance to grant</Trans> <MutationText mutationId="Gold" />{' '}
          <Trans>mutation to a garden crop</Trans>
        </>
      );

    case 'RainbowGranter':
      return (
        <>
          <Trans>Chance to grant</Trans> <MutationText mutationId="Rainbow" />{' '}
          <Trans>mutation to a garden crop</Trans>
        </>
      );

    case 'RainDance':
      return (
        <>
          <Trans>Chance to grant</Trans> <MutationText mutationId="Wet" />{' '}
          <Trans>mutation to a garden crop</Trans>
        </>
      );

    default:
      return null;
  }
};

export const getPlantAbilityLabelDetails = (
  baseParameter: FloraAbilityBaseParameters,
  value: number
): AbilityLabelProps | null => {
  switch (baseParameter) {
    case 'mutationChancePerMinute':
      return {
        label: <Trans>Chance per minute per crop</Trans>,
        calculatedValue: `${getFormattedPercentage(value)}`,
        unit: '%',
      };
    case 'tileRadius':
      return {
        label: <Trans>Tile radius</Trans>,
        calculatedValue: `${value}`,
        unit: '',
      };
    case 'targetMutation':
    case 'sourceMutation':
    case 'requiredWeather':
    case 'activationTileRef':
    default:
      return null;
  }
};

export const getPetAbilityLabelDetails = (
  baseParameter: FaunaAbilityBaseParameters,
  value: number,
  strengthScaleFactor: number,
  strength: number
): AbilityLabelProps | null => {
  const scaledValue = value * strengthScaleFactor;

  switch (baseParameter) {
    case 'scaleIncreasePercentage':
      return {
        label: <Trans>Size increase</Trans>,
        calculatedValue: `${getFormattedPercentage(scaledValue)}`,
        baseValue: `${getFormattedPercentage(value)}`,
        strength,
        unit: '%',
      };
    case 'cropSellPriceIncreasePercentage':
      return {
        label: <Trans>Sell price bonus</Trans>,
        calculatedValue: `${getFormattedPercentage(scaledValue)}`,
        baseValue: `${getFormattedPercentage(value)}`,
        strength,
        unit: '%',
      };
    case 'mutationChanceIncreasePercentage':
      return {
        label: <Trans>Chance increase</Trans>,
        calculatedValue: `${getFormattedPercentage(scaledValue)}`,
        baseValue: `${getFormattedPercentage(value)}`,
        strength,
        unit: '%',
      };
    case 'hungerRestorePercentage':
      return {
        label: <Trans>Hunger restore</Trans>,
        calculatedValue: `${getFormattedPercentage(scaledValue)}`,
        baseValue: `${getFormattedPercentage(value)}`,
        strength,
        unit: '%',
      };
    case 'hungerDepletionRateDecreasePercentage':
      return {
        label: <Trans>Depletion rate reduction</Trans>,
        calculatedValue: `${getFormattedPercentage(scaledValue)}`,
        baseValue: `${getFormattedPercentage(value)}`,
        strength,
        unit: '%',
      };
    case 'plantGrowthReductionMinutes':
      return {
        label: <Trans>Growth time reduction</Trans>,
        calculatedValue: `${scaledValue.toFixed(0)}`,
        baseValue: `${value.toFixed(0)}`,
        strength,
        unit: 'm',
      };
    case 'eggGrowthTimeReductionMinutes':
      return {
        label: <Trans>Hatch time reduction</Trans>,
        calculatedValue: `${scaledValue.toFixed(0)}`,
        baseValue: `${value.toFixed(0)}`,
        strength,
        unit: 'm',
      };
    case 'baseMaxCoinsFindable':
      return {
        label: <Trans>Coin range</Trans>,
        calculatedValue: `1 - ${Math.floor(scaledValue).toLocaleString()}`,
        baseValue: `1 - ${Math.floor(value).toLocaleString()}`,
        strength,
        unit: '',
      };
    case 'bonusXp':
      return {
        label: <Trans>Bonus XP</Trans>,
        calculatedValue: `${Math.floor(scaledValue).toLocaleString()}`,
        baseValue: `${Math.floor(value).toLocaleString()}`,
        strength,
        unit: '',
      };
    case 'maxStrengthIncreasePercentage':
      return {
        label: <Trans>Max Strength increase</Trans>,
        calculatedValue: `${getFormattedPercentage(scaledValue)}`,
        baseValue: `${getFormattedPercentage(value)}`,
        strength,
        unit: '%',
      };
    case 'grantedMutations':
    default:
      return null;
  }
};
