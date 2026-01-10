import { Box, CloseButton, Divider, Text } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';
import { faunaAbilityIds } from '@/common/games/Quinoa/systems/fauna/faunaAbilitiesDex';
import {
  type SlotMachineId,
  slotMachineDex,
} from '@/common/games/Quinoa/systems/slotMachine/slotMachineDex';
import { playerStatsDex } from '@/common/games/Quinoa/systems/stats';
import {
  type PetAbilityStatId,
  petAbilitiesStatsDex,
} from '@/common/games/Quinoa/systems/stats/petAbilityStatsDex';
import {
  type PlantAbilityStatId,
  plantAbilitiesStatsDex,
  plantAbilityStatIds,
} from '@/common/games/Quinoa/systems/stats/plantAbilityStatsDex';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import McTooltip from '@/components/McTooltip/McTooltip';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { closeActiveModal } from '@/Quinoa/atoms/modalAtom';
import { myStatsAtom } from '@/Quinoa/atoms/myAtoms';
import { formatTime } from '@/utils/formatTime';
import InfoIcon from '../InfoIcon';
import QuinoaModal from './QuinoaModal';

interface StatRowProps {
  label: string;
  value: number;
  description?: string;
  formatAsTime?: boolean;
}

const StatRow: React.FC<StatRowProps> = ({
  label,
  value,
  description,
  formatAsTime = false,
}) => {
  return (
    <McFlex
      orient="space-between left"
      py={1.5}
      px={2}
      borderRadius="8px"
      _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
      transition="background 0.2s"
      minH="fit-content"
    >
      <McFlex col orient="top left" gap={0} flex="1" minW="0">
        <Text
          fontSize={{ base: '12px', md: '14px', lg: '16px' }}
          fontWeight="medium"
          color="MagicWhite"
        >
          {label}
        </Text>
        {description && (
          <Text
            fontSize={{ base: '12px', md: '14px', lg: '16px' }}
            color="rgba(255, 255, 255, 0.6)"
            wordBreak="break-word"
          >
            {description}
          </Text>
        )}
      </McFlex>
      <Text
        fontSize={{ base: '14px', md: '16px', lg: '18px' }}
        fontWeight="bold"
        color="Yellow.Light"
        minW="60px"
        textAlign="right"
        flexShrink={0}
      >
        {formatAsTime ? formatTime(value * 1000) : value.toLocaleString()}
      </Text>
    </McFlex>
  );
};

interface StatSectionProps {
  title: string;
  stats: Array<{
    label: string;
    value: number;
    description?: string;
    formatAsTime?: boolean;
  }>;
  emptyMessage?: string;
}

const StatSection: React.FC<StatSectionProps> = ({
  title,
  stats,
  emptyMessage,
}) => {
  const hasStats = stats.some((stat) => stat.value > 0);

  return (
    <McFlex col orient="top left" gap={1} minH="fit-content">
      <Text
        fontSize={{ base: '14px', md: '16px', lg: '18px' }}
        fontWeight="bold"
        color="Cyan.Light"
        mb={1}
      >
        {title}
      </Text>
      {!hasStats && emptyMessage ? (
        <Text
          fontSize={{ base: '12px', md: '14px', lg: '16px' }}
          color="rgba(255, 255, 255, 0.5)"
          fontStyle="italic"
          px={2}
        >
          {emptyMessage}
        </Text>
      ) : (
        stats
          .filter((stat) => stat.value > 0)
          .map((stat) => (
            <StatRow
              key={stat.label}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              formatAsTime={stat.formatAsTime}
            />
          ))
      )}
    </McFlex>
  );
};

const StatsModal: React.FC = () => {
  const isSmallScreen = useIsSmallScreen();
  const stats = useAtomValue(myStatsAtom);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLingui();

  if (!stats) {
    return null;
  }
  const plantingStats: Array<{
    label: string;
    value: number;
    description?: string;
  }> = [
    {
      label: playerStatsDex.numSeedsPlanted.name,
      value: stats.player.numSeedsPlanted ?? 0,
      description: playerStatsDex.numSeedsPlanted.description,
    },
    {
      label: playerStatsDex.numCropsHarvested.name,
      value: stats.player.numCropsHarvested ?? 0,
      description: playerStatsDex.numCropsHarvested.description,
    },
    {
      label: playerStatsDex.numPlantsPotted.name,
      value: stats.player.numPlantsPotted ?? 0,
      description: playerStatsDex.numPlantsPotted.description,
    },
    {
      label: playerStatsDex.numPlantsWatered.name,
      value: stats.player.numPlantsWatered ?? 0,
      description: playerStatsDex.numPlantsWatered.description,
    },
    {
      label: playerStatsDex.numPlantsDestroyed.name,
      value: stats.player.numPlantsDestroyed ?? 0,
      description: playerStatsDex.numPlantsDestroyed.description,
    },
  ];
  const petStats: Array<{
    label: string;
    value: number;
    description?: string;
  }> = [
    {
      label: playerStatsDex.numEggsHatched.name,
      value: stats.player.numEggsHatched ?? 0,
      description: playerStatsDex.numEggsHatched.description,
    },
    {
      label: playerStatsDex.numPetsSold.name,
      value: stats.player.numPetsSold ?? 0,
      description: playerStatsDex.numPetsSold.description,
    },
    {
      label: playerStatsDex.totalHungerReplenished.name,
      value: Math.round(stats.player.totalHungerReplenished ?? 0),
      description: playerStatsDex.totalHungerReplenished.description,
    },
  ];
  const decorStats: Array<{
    label: string;
    value: number;
    description?: string;
  }> = [
    {
      label: playerStatsDex.numDecorPurchased.name,
      value: stats.player.numDecorPurchased ?? 0,
      description: playerStatsDex.numDecorPurchased.description,
    },
    {
      label: playerStatsDex.numDecorDestroyed.name,
      value: stats.player.numDecorDestroyed ?? 0,
      description: playerStatsDex.numDecorDestroyed.description,
    },
  ];
  const economyStats: Array<{
    label: string;
    value: number;
    description?: string;
  }> = [
    {
      label: playerStatsDex.totalEarningsSellCrops.name,
      value: Math.round(stats.player.totalEarningsSellCrops ?? 0),
      description: playerStatsDex.totalEarningsSellCrops.description,
    },
    {
      label: playerStatsDex.totalEarningsSellPet.name,
      value: Math.round(stats.player.totalEarningsSellPet ?? 0),
      description: playerStatsDex.totalEarningsSellPet.description,
    },
  ];
  const timeSavedStats: Array<{
    label: string;
    value: number;
    description?: string;
    formatAsTime?: boolean;
  }> = [
    {
      label: playerStatsDex.secondsSavedWaterPlants.name,
      value: Math.round(stats.player.secondsSavedWaterPlants ?? 0),
      description: playerStatsDex.secondsSavedWaterPlants.description,
      formatAsTime: true,
    },
    {
      label: playerStatsDex.secondsSavedInstaGrowPlants.name,
      value: Math.round(stats.player.secondsSavedInstaGrowPlants ?? 0),
      description: playerStatsDex.secondsSavedInstaGrowPlants.description,
      formatAsTime: true,
    },
    {
      label: playerStatsDex.secondsSavedInstaGrowEggs.name,
      value: Math.round(stats.player.secondsSavedInstaGrowEggs ?? 0),
      description: playerStatsDex.secondsSavedInstaGrowEggs.description,
      formatAsTime: true,
    },
  ];
  const abilityTriggerStats: Array<{
    label: string;
    value: number;
  }> = [];
  const abilityExtendedStats: Array<{
    label: string;
    value: number;
    description?: string;
    formatAsTime?: boolean;
  }> = [];

  Object.entries(stats.petAbility).forEach(([statId, value]) => {
    const statInfo = petAbilitiesStatsDex[statId as PetAbilityStatId];
    if (
      !statInfo ||
      value <= 0 ||
      ('isHidden' in statInfo && statInfo.isHidden)
    ) {
      return;
    }
    if (faunaAbilityIds.some((abilityId) => abilityId === statId)) {
      abilityTriggerStats.push({
        label: statInfo.name,
        value,
      });
    } else {
      const formatAsTime =
        'formatAsTime' in statInfo ? statInfo.formatAsTime : false;

      abilityExtendedStats.push({
        label: statInfo.name,
        value: Math.round(value),
        description: statInfo.description,
        formatAsTime,
      });
    }
  });
  const plantAbilityTriggerStats: Array<{
    label: string;
    value: number;
  }> = [];
  const plantAbilityExtendedStats: Array<{
    label: string;
    value: number;
    description?: string;
  }> = [];

  Object.entries(stats.plantAbility).forEach(([statId, value]) => {
    const statInfo = plantAbilitiesStatsDex[statId as PlantAbilityStatId];
    if (!statInfo || value <= 0) {
      return;
    }
    if (plantAbilityStatIds.some((abilityId) => abilityId === statId)) {
      plantAbilityTriggerStats.push({
        label: statInfo.name,
        value,
      });
    } else {
      plantAbilityExtendedStats.push({
        label: statInfo.name,
        value: Math.round(value),
        description: statInfo.description,
      });
    }
  });
  const slotMachineStats: Array<{
    machineName: string;
    numPlays: number;
    prizes: Array<{ label: string; value: number }>;
  }> = [];

  Object.entries(stats.slotMachine).forEach(([machineId, machineStats]) => {
    const machineInfo = slotMachineDex[machineId as SlotMachineId];
    if (!machineInfo) {
      return;
    }
    const prizes: Array<{ label: string; value: number }> = [];
    machineInfo.prizes.forEach((prize, prizeIndex) => {
      const count = machineStats.prizesWon[prizeIndex];
      if (count && count > 0) {
        prizes.push({
          label: prize.name,
          value: count,
        });
      }
    });
    if (machineStats.numPlays > 0 || prizes.length > 0) {
      slotMachineStats.push({
        machineName: machineInfo.name,
        numPlays: machineStats.numPlays,
        prizes,
      });
    }
  });

  return (
    <QuinoaModal>
      <McGrid
        autoH
        maxH="100%"
        maxW="700px"
        templateRows="auto 1fr"
        bg="MagicBlack"
        borderRadius="15px"
        borderWidth="3px"
        borderColor="Brown.Dark"
        boxShadow="0 4px 10px rgba(0, 0, 0, 0.5)"
        overflow="hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <McGrid
          templateColumns="1fr auto"
          gap={isSmallScreen ? 1 : 2}
          alignItems="center"
          bg="Cyan.Dark"
          p={2}
        >
          <McFlex orient="left" gap={1}>
            <Text
              fontWeight="bold"
              fontSize={{ base: '16px', md: '18px', lg: '20px' }}
              lineHeight="1"
            >
              <Trans>Stats</Trans>
            </Text>
            <McTooltip
              label={t`Note: Stats collection began in late October 2025. Stats from before this date are not included.`}
              keepOpenOnDesktopClick
            >
              <InfoIcon mt="1px" boxSize={isSmallScreen ? '16px' : '20px'} />
            </McTooltip>
          </McFlex>
          <CloseButton onClick={closeActiveModal} />
        </McGrid>
        <Box
          ref={scrollableContainerRef}
          overflowY="auto"
          sx={{
            '&::-webkit-scrollbar': {
              width: '6px',
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '3px',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
              },
            },
          }}
        >
          <McFlex col orient="top" p={3} gap={3} autoH>
            <McFlex
              col
              orient="top left"
              gap={3}
              p={3}
              bg="rgba(0, 0, 0, 0.3)"
              borderRadius="12px"
            >
              <Text
                fontSize={{ base: '14px', md: '16px', lg: '18px' }}
                fontWeight="bold"
                color="Yellow.Light"
              >
                <Trans>Player Stats</Trans>
              </Text>
              <StatSection
                title={t`Plants`}
                stats={plantingStats}
                emptyMessage={t`Start planting seeds to track your progress.`}
              />
              <Divider borderColor="rgba(255, 255, 255, 0.1)" />
              <StatSection
                title={t`Pets`}
                stats={petStats}
                emptyMessage={t`Hatch eggs and raise pets to see stats here.`}
              />
              <Divider borderColor="rgba(255, 255, 255, 0.1)" />
              <StatSection
                title={t`Decor`}
                stats={decorStats}
                emptyMessage={t`Purchase decorations to see stats here.`}
              />
              <Divider borderColor="rgba(255, 255, 255, 0.1)" />
              <StatSection
                title={t`Economy`}
                stats={economyStats}
                emptyMessage={t`Sell crops and pets to see stats here.`}
              />
              <Divider borderColor="rgba(255, 255, 255, 0.1)" />
              <StatSection
                title={t`Time`}
                stats={timeSavedStats}
                emptyMessage={t`Water plants or insta-grow to see time saved here.`}
              />
            </McFlex>
            {(abilityTriggerStats.length > 0 ||
              abilityExtendedStats.length > 0) && (
              <McFlex
                col
                orient="top left"
                gap={3}
                p={3}
                bg="rgba(0, 0, 0, 0.3)"
                borderRadius="12px"
              >
                <Text
                  fontSize={{ base: '14px', md: '16px', lg: '18px' }}
                  fontWeight="bold"
                  color="Yellow.Light"
                >
                  <Trans>Pet Ability Stats</Trans>
                </Text>
                {abilityTriggerStats.length > 0 && (
                  <StatSection
                    title={t`Number of Triggers`}
                    stats={abilityTriggerStats}
                  />
                )}
                {abilityTriggerStats.length > 0 &&
                  abilityExtendedStats.length > 0 && (
                    <Divider borderColor="rgba(255, 255, 255, 0.1)" />
                  )}
                {abilityExtendedStats.length > 0 && (
                  <StatSection
                    title={t`Cumulative Impact`}
                    stats={abilityExtendedStats}
                  />
                )}
              </McFlex>
            )}
            {(plantAbilityTriggerStats.length > 0 ||
              plantAbilityExtendedStats.length > 0) && (
              <McFlex
                col
                orient="top left"
                gap={3}
                p={3}
                bg="rgba(0, 0, 0, 0.3)"
                borderRadius="12px"
              >
                <Text
                  fontSize={{ base: '14px', md: '16px', lg: '18px' }}
                  fontWeight="bold"
                  color="Yellow.Light"
                >
                  <Trans>Plant Ability Stats</Trans>
                </Text>
                {plantAbilityTriggerStats.length > 0 && (
                  <StatSection
                    title={t`Number of Triggers`}
                    stats={plantAbilityTriggerStats}
                  />
                )}
                {plantAbilityTriggerStats.length > 0 &&
                  plantAbilityExtendedStats.length > 0 && (
                    <Divider borderColor="rgba(255, 255, 255, 0.1)" />
                  )}
                {plantAbilityExtendedStats.length > 0 && (
                  <StatSection
                    title={t`Cumulative Totals`}
                    stats={plantAbilityExtendedStats}
                  />
                )}
              </McFlex>
            )}
            {slotMachineStats.length > 0 && (
              <McFlex
                col
                orient="top left"
                gap={3}
                p={3}
                bg="rgba(0, 0, 0, 0.3)"
                borderRadius="12px"
              >
                <Text
                  fontSize={{ base: '14px', md: '16px', lg: '18px' }}
                  fontWeight="bold"
                  color="Yellow.Light"
                >
                  <Trans>Prize Wheel Stats</Trans>
                </Text>

                {slotMachineStats.map((machine, index) => (
                  <McFlex
                    key={machine.machineName}
                    col
                    orient="top left"
                    gap={2}
                  >
                    <Text
                      fontSize={{ base: '14px', md: '16px', lg: '18px' }}
                      fontWeight="bold"
                      color="Cyan.Light"
                    >
                      {machine.machineName}
                    </Text>
                    <StatRow
                      label={t`Total Plays`}
                      value={machine.numPlays}
                      description={t`Number of times you've played`}
                    />
                    {machine.prizes.length > 0 && (
                      <>
                        <Text
                          fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                          fontWeight="semibold"
                          color="Cyan.Light"
                          mt={1}
                          px={2}
                        >
                          <Trans>Prizes Won</Trans>
                        </Text>
                        {machine.prizes.map((prize) => (
                          <StatRow
                            key={prize.label}
                            label={prize.label}
                            value={prize.value}
                          />
                        ))}
                      </>
                    )}
                    {index < slotMachineStats.length - 1 && (
                      <Divider borderColor="rgba(255, 255, 255, 0.1)" mt={1} />
                    )}
                  </McFlex>
                ))}
              </McFlex>
            )}
          </McFlex>
        </Box>
      </McGrid>
    </QuinoaModal>
  );
};

export default StatsModal;
