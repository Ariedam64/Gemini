import { CloseButton, Divider, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import Avatar from '@/components/Avatars/Avatar';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { unsortedLeaderboardAtom } from '@/Quinoa/atoms/allPlayerAtoms';
import { closeActiveModal } from '@/Quinoa/atoms/modalAtom';
import QuinoaCoinLabel from '@/Quinoa/components/currency/QuinoaCoinLabel';
import QuinoaModal from '@/Quinoa/components/modals/QuinoaModal';
import { truncatePlayerName } from '@/utils/truncatePlayerName';

type LeaderboardModalProps = {};

const LeaderboardModal: React.FC<LeaderboardModalProps> = () => {
  const unsortedLeaderboard = useAtomValue(unsortedLeaderboardAtom);

  const leaderboard = useMemo(() => {
    return [...unsortedLeaderboard].sort((a, b) => b.coinsCount - a.coinsCount);
  }, [unsortedLeaderboard]);

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
          gap={2}
          alignItems="center"
          p={2}
          bg="Teal.Dark"
        >
          <Text fontSize={{ base: '14px', md: '20px' }} fontWeight="bold">
            <Trans>Leaderboard (this room)</Trans>
          </Text>
          <CloseButton onClick={closeActiveModal} />
        </McGrid>
        <McFlex
          col
          orient="top"
          overflowY="auto"
          sx={{
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
              },
            },
          }}
        >
          {leaderboard.map((user, index) => (
            <McFlex key={user.playerId} col autoH>
              <McFlex orient="space-between center" px={3} h="80px">
                <McFlex orient="left center" gap={3} flex={1} overflow="hidden">
                  <Avatar playerOrId={user.playerId} size="xs" />
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    isTruncated
                    title={user.playerId}
                  >
                    {truncatePlayerName(user.name)}
                  </Text>
                </McFlex>
                <QuinoaCoinLabel amount={user.coinsCount} />
              </McFlex>
              {index < leaderboard.length - 1 && (
                <Divider borderColor="whiteAlpha.200" />
              )}
            </McFlex>
          ))}
        </McFlex>
      </McGrid>
    </QuinoaModal>
  );
};

export default LeaderboardModal;
