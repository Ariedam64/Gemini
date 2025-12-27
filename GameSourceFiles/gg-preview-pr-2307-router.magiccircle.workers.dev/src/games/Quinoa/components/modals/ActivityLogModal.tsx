import { Button, CloseButton, Text } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { useRef, useState } from 'react';
import { maxNumActivityLogs } from '@/common/games/Quinoa/constants';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import McTooltip from '@/components/McTooltip/McTooltip';
import { BASE_URL } from '@/environment';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { setActiveModal } from '@/Quinoa/atoms/modalAtom';
import { myActivityLogsAtom } from '@/Quinoa/atoms/myAtoms';
import ActivityLogDescription from '@/Quinoa/components/action/ActivityLogDescription';
import InfoIcon from '../InfoIcon';
import FixedAspectRatioContainer from './components/FixedAspectRatioContainer';
import QuinoaModal from './QuinoaModal';

const ActivityLogModal: React.FC = () => {
  const isSmallScreen = useIsSmallScreen();
  const activityLogs = useAtomValue(myActivityLogsAtom);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [showAllLogs, setShowAllLogs] = useState(false);

  const closeModal = () => {
    setActiveModal(null);
  };
  // Sort logs by timestamp descending (most recent first)
  const sortedLogs = [...activityLogs].sort(
    (a, b) => b.timestamp - a.timestamp
  );
  const logsToRender = showAllLogs ? sortedLogs : sortedLogs.slice(0, 10);
  const numAdditionalLogs = sortedLogs.length - logsToRender.length;

  return (
    <QuinoaModal pb="10px">
      <FixedAspectRatioContainer
        aspectRatio={1176 / 1372}
        backgroundImage={`url(${BASE_URL}/assets/ui/ActivityLog.webp)`}
      >
        <McFlex position="absolute" top="2.2%" right="5.5%" auto>
          <CloseButton
            onClick={closeModal}
            size={isSmallScreen ? 'sm' : 'md'}
            color="#fff"
            opacity={0.92}
            _hover={{
              opacity: 1,
            }}
            bg="linear-gradient(135deg, #e53935 60%, #b71c1c 100%)"
            borderRadius="full"
            border="1px solid #b71c1c"
            boxShadow="0 2px 6px rgba(180, 30, 30, 0.18)"
          />
        </McFlex>
        <McGrid
          pt="4%"
          pb="13.3%"
          pl="16%"
          pr="8.9%"
          templateRows="auto 1fr"
          overflow="hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <McFlex col pt={2} px={3} overflow="hidden">
            <McFlex auto gap={1} minH="24px" px={4}>
              <Text
                fontSize={{ base: isSmallScreen ? '14px' : '20px', lg: '24px' }}
                fontWeight="bold"
                fontFamily="shrikhand"
                color="#4F6981"
                textAlign="center"
                lineHeight="1"
              >
                <Trans>ACTIVITY LOG</Trans>
              </Text>
              <McTooltip
                label={t`Your most recent activity. The last ${maxNumActivityLogs} logs are saved.`}
                keepOpenOnDesktopClick
              >
                <InfoIcon
                  mb={0.5}
                  color="#4F6981"
                  boxSize={isSmallScreen ? '16px' : '20px'}
                />
              </McTooltip>
            </McFlex>
            <McFlex
              minH="4px"
              h="4px"
              bg="Brown.Pastel"
              borderRadius="full"
              opacity={0.5}
            />
          </McFlex>
          <McFlex
            orient="top"
            col
            autoH
            ref={scrollableContainerRef}
            overflowY="auto"
            overflowX="hidden"
            sx={{
              '&::-webkit-scrollbar': {
                width: '4px',
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(85, 48, 20, 0.35)',
                borderRadius: '3px',
                '&:hover': {
                  background: 'rgba(110, 60, 24, 0.5)',
                },
              },
            }}
            mb={3}
            pb={1}
            px={2}
          >
            <McFlex col orient="top" gap={1.5} autoH pt={2}>
              {sortedLogs.length === 0 ? (
                <McFlex
                  col
                  p={4}
                  bg="rgba(123, 90, 56, 0.18)"
                  borderRadius="8px"
                >
                  <Text
                    fontSize={{ base: '12px', md: '14px', lg: '18px' }}
                    color="Brown.Dark"
                    textAlign="center"
                  >
                    <Trans>No activity logged yet.</Trans>
                  </Text>
                </McFlex>
              ) : (
                <>
                  {logsToRender.map((log) => (
                    <ActivityLogDescription key={log.timestamp} log={log} />
                  ))}
                  {!showAllLogs && sortedLogs.length > 10 && (
                    <Button
                      onClick={() => setShowAllLogs(true)}
                      variant="blank"
                      color="Brown.Magic"
                      fontWeight="semibold"
                      bg="rgba(123, 90, 56, 0.18)"
                      borderRadius="8px"
                      fontSize={{ base: '11px', md: '13px', lg: '15px' }}
                      px={2}
                      py={isSmallScreen ? 1 : 2}
                    >
                      <Trans>Load {numAdditionalLogs} more</Trans>
                    </Button>
                  )}
                </>
              )}
            </McFlex>
          </McFlex>
        </McGrid>
      </FixedAspectRatioContainer>
    </QuinoaModal>
  );
};

export default ActivityLogModal;
