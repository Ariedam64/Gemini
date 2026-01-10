import { Heading, Text } from '@chakra-ui/layout';
import {
  Button,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { posthog } from 'posthog-js';
import { type ChangeEvent, useState } from 'react';
import { X } from 'react-feather';
import type Player from '@/common/types/player';
import McFlex from '@/components/McFlex/McFlex';
import { useCloseReportPlayerModal, usePlayerId } from '@/store/store';
import Avatar from './Avatars/Avatar';
import { useMagicToast } from './ui/MagicToast';

const MAX_COMMENT_LENGTH = 500;
const MAX_COMMENT_LENGTH_WARNING = 100;

interface ReportPlayerFormProps {
  player: Player | null;
  onClose: () => void;
}

const ReportPlayerForm: React.FC<ReportPlayerFormProps> = ({
  player,
  onClose,
}) => {
  const dropdownOptions = [
    { value: 'language', label: t`Inappropriate language` },
    { value: 'harassment', label: t`Harassment or bullying` },
    { value: 'cheating', label: t`Cheating or exploiting` },
    { value: 'username', label: t`Inappropriate username` },
    { value: 'spamming', label: t`Spamming the chat` },
    { value: 'other', label: t`Other` },
  ];

  const myId = usePlayerId();
  const [dropdownValue, setDropdownValue] = useState<string>('');
  const [comment, setComment] = useState('');
  const closeReportPlayerModal = useCloseReportPlayerModal();
  const { sendToast } = useMagicToast();

  const isOpen = !!player;

  const playerId = player?.id || '';
  const name = player?.name || 'Player';

  const onSubmit = () => {
    posthog.capture('UI_ReportPlayerConduct', {
      reporterId: myId,
      offenderId: playerId,
      reason: dropdownValue,
      comment,
    });
    sendToast({
      title: t`${name} has been reported`,
      description: t`Thank you for helping keep the community safe.`,
    });
    onClose();
    closeReportPlayerModal();
  };

  return (
    <Modal
      variant="ReportPlayerFormModal"
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
              <Trans>Reporting {name}</Trans>
            </Heading>
            <Avatar playerOrId={playerId} size="sm" shouldRenderStaticAvatar />
            <McFlex col orient="left" color="MagicBlack">
              <McFlex autoH orient="left">
                <Text size="md" fontWeight="bold" pl="5px">
                  <Trans>Reason</Trans>
                </Text>
                <Text size="md" fontWeight="bold" pl="5px" color="Red.Magic">
                  *
                </Text>
              </McFlex>
              <Select
                placeholder="Select"
                value={dropdownValue}
                onChange={(e) => {
                  setDropdownValue(e.currentTarget.value);
                }}
                borderRadius={10}
              >
                {dropdownOptions.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
              <Text size="md" fontWeight="bold" pl="5px" mt="20px">
                <Trans>Comment</Trans>
              </Text>
              <Textarea
                bg="MagicWhite"
                border="1px solid black"
                fontSize="md"
                fontWeight="normal"
                maxLength={MAX_COMMENT_LENGTH}
                value={comment}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setComment(e.target.value)
                }
              />
              <McFlex autoH orient="right">
                <Text
                  color={
                    comment.length <
                    MAX_COMMENT_LENGTH - MAX_COMMENT_LENGTH_WARNING
                      ? 'MagicBlack'
                      : 'Red.Magic'
                  }
                >
                  {comment.length}/{MAX_COMMENT_LENGTH}
                </Text>
              </McFlex>
            </McFlex>
            <Button isDisabled={dropdownValue === ''} onClick={onSubmit}>
              <Trans>Submit</Trans>
            </Button>
          </McFlex>
        </McFlex>
      </ModalContent>
    </Modal>
  );
};

export default ReportPlayerForm;
