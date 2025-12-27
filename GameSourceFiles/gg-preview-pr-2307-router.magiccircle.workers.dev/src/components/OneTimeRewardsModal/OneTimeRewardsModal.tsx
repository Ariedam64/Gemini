import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type {
  CurrencyTransactionEvent,
  CurrencyTransactionPurpose,
} from '@/common/types/currencies';
import { EmoteType } from '@/common/types/emote';
import type { OneTimeRewardPurpose } from '@/common/types/one-time-claimable-rewards';
import type Player from '@/common/types/player';
import AvatarPack from '@/components/Avatars/AvatarPack';
import { AvatarSetAnimation } from '@/components/Avatars/avatarRiveConstants';
import { useAnnounceCurrencyEvent } from '@/components/Currency/CurrencyTransactionEventAnnouncer';
import { useMagicToast } from '@/components/ui/MagicToast';
import { handleDiscordExternalLink } from '@/discord-sdk/utils';
import { isRunningInsideDiscord } from '@/environment';
import useIsSmallHeight from '@/hooks/useIsSmallHeight';
import {
  useIsOneTimeRewardsModalOpen,
  useSetIsOneTimeRewardsModalOpen,
} from '@/store/store';
import { post } from '@/utils';
import McFlex from '../McFlex/McFlex';
import BreadButton from '../Purchase/BreadButton';
import { useClaimedRewards, useRewardConfig } from './hooks';

type OneTimeRewardsModalProps = {};

const OneTimeRewardsModal: React.FC<OneTimeRewardsModalProps> = () => {
  const { t } = useLingui();
  const isSmallHeight = useIsSmallHeight();
  const { availableRewards, getConfigByPurpose } = useRewardConfig();
  const { claimedRewards, markRewardAsClaimed } = useClaimedRewards();
  const isOpen = useIsOneTimeRewardsModalOpen();
  const setIsOpen = useSetIsOneTimeRewardsModalOpen();
  const [processingRewards, setProcessingRewards] = useState<
    Set<CurrencyTransactionPurpose>
  >(new Set());
  const { sendToast } = useMagicToast();
  const announceCurrencyEvent = useAnnounceCurrencyEvent();
  // Avatar configuration for the visual effect
  const modalAvatars: { player: Player; animation?: AvatarSetAnimation }[] = [
    {
      player: {
        id: '1',
        name: 'Avatar 1',
        cosmetic: {
          avatar: [
            'Bottom_WizardRobe.png',
            'Mid_Sloth.png',
            'Top_PirateHat.png',
            'Expression_Pouty.png',
          ],
          color: 'Blue',
        },
        emoteData: {
          emoteType: EmoteType.Idle,
        },
        secondsRemainingUntilChatEnabled: 0,
        isConnected: true,
        discordAvatarUrl: null,
        databaseUserId: null,
        guildId: null,
      },
      animation: AvatarSetAnimation.Locked,
    },
    {
      player: {
        id: '2',
        name: 'Avatar 2',
        cosmetic: {
          avatar: [
            'Bottom_SpaceSuit.png',
            'Mid_Cat.png',
            'Top_Moon.png',
            'Expression_Bashful.png',
          ],
          color: 'Green',
        },
        emoteData: {
          emoteType: EmoteType.Idle,
        },
        secondsRemainingUntilChatEnabled: 0,
        isConnected: true,
        discordAvatarUrl: null,
        databaseUserId: null,
        guildId: null,
      },
      animation: AvatarSetAnimation.Locked,
    },
    {
      player: {
        id: '3',
        name: 'Avatar 3',
        cosmetic: {
          avatar: [
            'Bottom_Backpacking.png',
            'Mid_Penguin.png',
            'Top_CatBeanie.png',
            'Expression_Cute.png',
          ],
          color: 'Red',
        },
        emoteData: {
          emoteType: EmoteType.Idle,
        },
        secondsRemainingUntilChatEnabled: 0,
        isConnected: true,
        discordAvatarUrl: null,
        databaseUserId: null,
        guildId: null,
      },
      animation: AvatarSetAnimation.Locked,
    },
  ];

  const handleExternalLink = async (
    rewardPurpose: CurrencyTransactionPurpose
  ) => {
    const config = getConfigByPurpose(rewardPurpose as OneTimeRewardPurpose);

    if (!config) {
      console.error('No config found for reward purpose:', rewardPurpose);
      return;
    }

    if (config.url) {
      // Handle external URL
      if (isRunningInsideDiscord) {
        // Due to some bug in the discord sdk, opening links TO discord with the sdk will hang.
        // So we need to handle it differently.
        const isLinkToDiscord =
          config.url.includes('discord.gg') ||
          config.url.includes('discord.com');

        if (isLinkToDiscord) {
          // For Discord links, add a timeout and assume success after 3 seconds
          try {
            const timeoutPromise = new Promise<boolean>((resolve) => {
              setTimeout(() => resolve(true), 3000);
            });

            const linkPromise = handleDiscordExternalLink(config.url);

            // Race between the actual link opening and timeout
            const didOpen = await Promise.race([linkPromise, timeoutPromise]);
            return didOpen;
          } catch (error) {
            console.warn(
              'Discord link opening failed, proceeding anyway:',
              error
            );
            return true; // Assume success to allow reward claiming
          }
        } else {
          // Non-Discord links - use normal handling
          const didOpen = await handleDiscordExternalLink(config.url);
          return didOpen;
        }
      } else {
        window.open(config.url, '_blank');
        // Return true to indicate that the link was opened
        return true;
      }
    }
  };

  const handleClaimReward = async (
    rewardPurpose: CurrencyTransactionPurpose
  ) => {
    setProcessingRewards((prev) => new Set([...prev, rewardPurpose]));

    try {
      // Open external link first
      const didOpen = await handleExternalLink(rewardPurpose);
      if (!didOpen) {
        return;
      }

      const response = await post<{
        currencyTransactionEvent: CurrencyTransactionEvent;
      }>('/me/one-time-rewards/claim', { rewardPurpose });

      announceCurrencyEvent(response.currencyTransactionEvent);
      // Use the hook's method for optimistic update
      markRewardAsClaimed(rewardPurpose);
      sendToast({
        title: t`Reward claimed!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error claiming reward:', error);
      sendToast({
        title: t`Failed to claim reward`,
        description:
          error instanceof Error
            ? error.message
            : t`Something went wrong. Please try again.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setProcessingRewards((prev) => {
        const newSet = new Set(prev);
        newSet.delete(rewardPurpose);
        return newSet;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen
      onClose={() => setIsOpen(false)}
      lockFocusAcrossFrames={false}
      variant="Dialog"
      closeOnOverlayClick={true}
    >
      <ModalOverlay bg="ScrimDarkest">
        {/* Avatar pack positioned above the modal content */}
        <Box
          position="absolute"
          top={
            isSmallHeight
              ? 'calc(var(--sait) + 100px)'
              : `calc(var(--sait) + 170px)`
          }
          left="50%"
          transform="translateX(-50%)"
          h="200px"
        >
          <AvatarPack
            players={modalAvatars}
            size={isSmallHeight ? 'md' : 'lg'}
          />
        </Box>
      </ModalOverlay>
      <ModalContent
        bg="MagicBlack"
        maxW="500px"
        mt={isSmallHeight ? '100px' : '200px'}
      >
        <ModalCloseButton color="MagicWhite" />
        <McFlex col px={3} py={3} gap={4}>
          <McFlex col gap={2} textAlign="center">
            <Heading size="lg" color="MagicWhite">
              <Trans>Free Bread!</Trans>
            </Heading>
            <Text color="Neutral.LightGrey" fontSize="sm">
              <Trans>Each reward can only be claimed once.</Trans>
            </Text>
          </McFlex>
          <VStack spacing={2} width="100%">
            <AnimatePresence>
              {availableRewards
                .sort((a, b) => {
                  const aIsClaimed = claimedRewards.has(a.purpose);
                  const bIsClaimed = claimedRewards.has(b.purpose);

                  // Unclaimed rewards first
                  if (aIsClaimed && !bIsClaimed) return 1;
                  if (!aIsClaimed && bIsClaimed) return -1;
                  return 0;
                })
                .map((config) => {
                  const isAlreadyClaimed = claimedRewards.has(config.purpose);
                  const isProcessing = processingRewards.has(config.purpose);

                  return (
                    <motion.div
                      key={config.purpose}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      style={{ width: '100%' }}
                    >
                      <McFlex
                        justify="space-between"
                        align="center"
                        width="100%"
                        bg="rgba(255, 255, 255, 0.05)"
                        borderRadius="8px"
                        p={2}
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.1)"
                        cursor="pointer"
                        onClick={() => void handleExternalLink(config.purpose)}
                        _hover={{
                          bg: 'rgba(255, 255, 255, 0.1)',
                          borderColor: isAlreadyClaimed
                            ? 'Neutral.LightGrey'
                            : 'Purple.Light',
                          transform: 'translateY(-1px)',
                          '& .external-link-icon': {
                            opacity: 1,
                          },
                        }}
                        transition="all 0.2s ease"
                        position="relative"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            void handleExternalLink(config.purpose);
                          }
                        }}
                      >
                        <McFlex align="space-between" gap={2} flex={1}>
                          <Text
                            color="MagicWhite"
                            fontWeight="semibold"
                            fontSize="sm"
                            textAlign="left"
                          >
                            {config.label}
                          </Text>
                          <Icon
                            as={ExternalLinkIcon}
                            color="Neutral.LightGrey"
                            boxSize={3}
                            opacity={0}
                            transition="opacity 0.2s ease"
                            className="external-link-icon"
                          />
                        </McFlex>
                        {isAlreadyClaimed ? (
                          <Button
                            isDisabled
                            variant="solid"
                            bg="Neutral.LightGrey"
                            color="MagicBlack"
                            size="sm"
                            fontSize="xs"
                            px={4}
                            minW="80px"
                            _hover={{ bg: 'Neutral.LightGrey' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trans>Claimed!</Trans>
                          </Button>
                        ) : (
                          <BreadButton
                            amount={config.amount}
                            onClick={(e) => {
                              e.stopPropagation();
                              void handleClaimReward(config.purpose);
                            }}
                            isLoading={isProcessing}
                            size="sm"
                            fontSize="xs"
                            px={4}
                            minW="80px"
                            bg="Purple.Magic"
                            _hover={{ bg: 'Purple.Light' }}
                          />
                        )}
                      </McFlex>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </VStack>
        </McFlex>
      </ModalContent>
    </Modal>
  );
};

export default OneTimeRewardsModal;
