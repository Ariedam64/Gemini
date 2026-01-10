import { CloseButton, Spinner, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { ShopItem } from '@/common/games/Quinoa/systems/shop';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { AuthenticationOptions } from '@/components/ui/authentication/AuthenticationOptions';
import useGuildSeedAvailability from '../hooks/useGuildSeedAvailability';
import InventorySprite from './InventorySprite';

interface GuildSeedAvailabilityModalContentProps {
  item: ShopItem;
  onClose: () => void;
}

const GuildSeedAvailabilityModalContent: React.FC<
  GuildSeedAvailabilityModalContentProps
> = ({ item, onClose }) => {
  const { data: guildSeedAvailability, isLoading } = useGuildSeedAvailability();

  const getItemData = () => {
    if (item.itemType === ItemType.Seed) {
      const { seed } = floraSpeciesDex[item.species];
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Seed,
        species: item.species,
        quantity: 1,
      };
      return {
        name: seed.name,
        inventoryItem,
      };
    }
    throw new Error('Only seed items are supported for guild availability');
  };
  const itemData = getItemData();
  // Find which guilds have this seed available
  const guildsWithSeed = guildSeedAvailability.filter(
    (guildInfo) =>
      item.itemType === ItemType.Seed &&
      guildInfo.availableSpeciesIds.includes(item.species)
  );

  return (
    <>
      <McGrid
        templateColumns="auto 1fr auto"
        alignItems="center"
        bg="Brown.Magic"
        p={3}
      >
        <InventorySprite
          item={itemData.inventoryItem}
          size="30px"
          canvasScale={2}
        />
        <Text fontWeight="bold" fontSize="lg" color="white" textAlign="center">
          <Trans>Server-Exclusive Seed</Trans>
        </Text>
        <CloseButton onClick={onClose} color="white" />
      </McGrid>
      <McFlex
        orient="top"
        auto
        col
        gap={4}
        py={4}
        px={{ base: 4, md: 6 }}
        overflowY="auto"
        maxH="50vh"
        sx={{
          '&::-webkit-scrollbar': {
            width: '4px',
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
        <Text fontSize="sm" textAlign="center" lineHeight="1.5">
          <Trans>
            <strong>{itemData.name}</strong> only spawns naturally in certain
            Discord servers and the iOS app. You can always purchase it with
            donuts.
          </Trans>
        </Text>
        <AuthenticationOptions showOpenInDiscordButton />
        {isLoading ? (
          <McFlex col gap={3} auto orient="center">
            <Spinner color="white" size="lg" />
            <Text fontSize="sm" textAlign="center">
              <Trans>Checking which servers {itemData.name} spawns in...</Trans>
            </Text>
          </McFlex>
        ) : (
          guildsWithSeed.length > 0 && (
            <McFlex col gap={3} auto>
              <Text fontSize="sm" textAlign="center">
                <Trans>
                  <strong>{itemData.name}</strong> can spawn in these servers:
                </Trans>
              </Text>
              <McFlex gap={2} auto flexWrap="wrap" justify="center">
                {guildsWithSeed.map((guildInfo) => (
                  <McFlex
                    key={guildInfo.guild.id}
                    px={3}
                    py={2}
                    bg="rgba(0, 0, 0, 0.3)"
                    borderRadius="20px"
                    gap={2}
                    auto
                    borderWidth="1px"
                    borderColor="rgba(255, 255, 255, 0.1)"
                  >
                    <McFlex
                      w="24px"
                      h="24px"
                      borderRadius="full"
                      bg="Neutral.DarkGrey"
                      orient="center"
                      flexShrink={0}
                    >
                      {guildInfo.guild.icon ? (
                        <img
                          src={`https://cdn.discordapp.com/icons/${guildInfo.guild.id}/${guildInfo.guild.icon}.png?size=64`}
                          alt=""
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <Text fontSize="sm" fontWeight="bold" color="white">
                          {guildInfo.guild.name.charAt(0).toUpperCase()}
                        </Text>
                      )}
                    </McFlex>
                    <Text fontSize="sm" fontWeight="semibold" color="white">
                      {guildInfo.guild.name}
                    </Text>
                  </McFlex>
                ))}
              </McFlex>
            </McFlex>
          )
        )}
      </McFlex>
    </>
  );
};

export default GuildSeedAvailabilityModalContent;
