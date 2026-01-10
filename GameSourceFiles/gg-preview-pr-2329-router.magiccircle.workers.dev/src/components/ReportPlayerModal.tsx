import { Heading, Text } from '@chakra-ui/layout';
import {
  Button,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { useState } from 'react';
import { X } from 'react-feather';
import type Player from '@/common/types/player';
import McFlex from '@/components/McFlex/McFlex';
import {
  useCloseReportPlayerModal,
  useIsReportPlayerModalOpen,
  useMutedPlayers,
  usePlayersMeFirst,
  useToggleMutedPlayer,
} from '@/store/store';
import ReportPlayerForm from './ReportPlayerForm';
import PlayerCard from './ui/PlayerCard';

type ReportPlayerModalProps = {};

const ReportPlayerModal: React.FC<ReportPlayerModalProps> = () => {
  const isOpen = useIsReportPlayerModalOpen();
  const players = usePlayersMeFirst().slice(1);
  const mutedPlayers = useMutedPlayers();
  const closeReportPlayerModal = useCloseReportPlayerModal();
  const toggleMutedPlayer = useToggleMutedPlayer();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const onClose = () => {
    closeReportPlayerModal();
  };

  const onCloseForm = () => {
    setSelectedPlayer(null);
  };

  const onSelectPlayer = (player: Player) => {
    setSelectedPlayer(player);
  };

  return (
    <>
      <ReportPlayerForm player={selectedPlayer} onClose={onCloseForm} />
      <Modal
        variant="ReportPlayerModal"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
        lockFocusAcrossFrames={false}
        // Important to NOT trap focus so we don't break any modals drawn on top
        // of this one, such as the SystemDrawer (especially the ProfileDrawer)
        trapFocus={false}
        // Important to not block scroll on mount so we can scroll any modals
        // that might be drawn on top of this one, such as the SystemDrawer
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <McFlex>
            <McFlex
              col
              autoH
              position="relative"
              bg="Neutral.White"
              borderRadius="10px"
              p="10px"
              pb="30px"
              gap="20px"
            >
              <IconButton
                position="absolute"
                top="10px"
                right="0"
                aria-label={t`Remove`}
                icon={<X />}
                variant="ghost"
                color="MagicBlack"
                onClick={onClose}
              />
              <Heading mb="20px" color="MagicBlack">
                <Trans>Report a Player</Trans>
              </Heading>
              {players.length === 0 && (
                <Text color="MagicBlack">
                  <Trans>There are no other players in the room.</Trans>
                </Text>
              )}

              {players.map((player) => (
                <PlayerCard
                  key={player.id}
                  playerOrId={player}
                  isGrayBackground={mutedPlayers.includes(player.id)}
                >
                  <McFlex gap="5px">
                    <Button
                      size="sm"
                      onClick={() => toggleMutedPlayer(player.id)}
                    >
                      {mutedPlayers.includes(player.id)
                        ? t`Unsilence`
                        : t`Silence`}
                    </Button>
                    <Button
                      variant="red"
                      size="sm"
                      onClick={() => onSelectPlayer(player)}
                    >
                      <Trans>Report</Trans>
                    </Button>
                  </McFlex>
                </PlayerCard>
              ))}
            </McFlex>
          </McFlex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportPlayerModal;
