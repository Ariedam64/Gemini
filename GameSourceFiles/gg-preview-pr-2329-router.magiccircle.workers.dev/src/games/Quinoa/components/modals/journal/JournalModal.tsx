import { Button, CloseButton, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import type { FaunaSpeciesId } from '@/common/games/Quinoa/systems/fauna';
import {
  type FloraSpeciesId,
  floraSpeciesDex,
} from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { MotionMcFlex } from '@/components/Motion';
import { BASE_URL } from '@/environment';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { closeActiveModal } from '@/Quinoa/atoms/modalAtom';
import FixedAspectRatioContainer from '../components/FixedAspectRatioContainer';
import QuinoaModal from '../QuinoaModal';
import OverviewPage from './OverviewPage';
import SpeciesPage from './SpeciesPage';
import {
  activeJournalTypeAtom,
  activeSpeciesIdAtom,
  newLogsToAnimateAtom,
} from './store';

const JournalModal: React.FC = () => {
  const activeJournalType = useAtomValue(activeJournalTypeAtom);
  const setActiveJournalType = useSetAtom(activeJournalTypeAtom);
  const activeSpeciesId = useAtomValue(activeSpeciesIdAtom);
  const setActiveSpeciesId = useSetAtom(activeSpeciesIdAtom);
  const [newLogs, setNewLogs] = useAtom(newLogsToAnimateAtom);
  const isSmallScreen = useIsSmallScreen();

  useEffect(() => {
    setActiveJournalType(ItemType.Produce);
    setActiveSpeciesId(null);
  }, []);

  useEffect(() => {
    if (newLogs.length <= 0) {
      return;
    }
    const nextLogToAnimate = newLogs[0];
    const isCrop = nextLogToAnimate.speciesId in floraSpeciesDex;
    setActiveJournalType(isCrop ? ItemType.Produce : ItemType.Pet);
    setActiveSpeciesId(nextLogToAnimate.speciesId);
  }, [newLogs]);

  const handleAnimationComplete = (
    speciesId: FloraSpeciesId | FaunaSpeciesId
  ) => {
    setNewLogs((prev) => prev.filter((log) => log.speciesId !== speciesId));
  };

  const closeModal = () => {
    if (newLogs.length > 0) {
      return;
    }
    closeActiveModal();
  };

  return (
    <QuinoaModal pb="10px">
      <FixedAspectRatioContainer
        aspectRatio={1165 / 1368}
        backgroundImage={`url(${BASE_URL}/assets/ui/GardenJournal.webp)`}
      >
        <McFlex position="absolute" top="4.5%" right="5.8%" auto>
          <CloseButton
            onClick={() => {
              closeModal();
            }}
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
        <McGrid templateRows="6.8% 1fr" pl="18%" pr="14%" pb="13%">
          <McFlex gap={2} orient="bottom left">
            <Button
              variant="blank"
              onClick={() => {
                if (newLogs.length > 0) {
                  return;
                }
                setActiveJournalType(ItemType.Produce);
                setActiveSpeciesId(null);
              }}
              h="60px"
            >
              <McFlex orient="bottom">
                <MotionMcFlex
                  initial={{ height: 'auto' }}
                  animate={{
                    height:
                      activeJournalType === ItemType.Produce ? '35px' : '20px',
                  }}
                  w={isSmallScreen ? '70px' : '100px'}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  borderTopRadius="10px"
                  bg="Green.Dark"
                  position="relative"
                  borderLeft="1px solid #4caf50"
                  borderRight="1px solid #4caf50"
                  borderTop="2px solid #5fd85c"
                  overflow="hidden"
                  orient="top"
                >
                  <Text
                    fontSize={isSmallScreen ? '12px' : '14px'}
                    fontWeight="bold"
                    position="relative"
                    zIndex={2}
                  >
                    <Trans>Crops</Trans>
                  </Text>
                </MotionMcFlex>
              </McFlex>
            </Button>
            <Button
              variant="blank"
              onClick={() => {
                if (newLogs.length > 0) {
                  return;
                }
                setActiveJournalType(ItemType.Pet);
                setActiveSpeciesId(null);
              }}
              h="60px"
            >
              <McFlex orient="bottom">
                <MotionMcFlex
                  initial={{ height: 'auto' }}
                  animate={{
                    height:
                      activeJournalType === ItemType.Pet ? '35px' : '20px',
                  }}
                  w={isSmallScreen ? '70px' : '100px'}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  borderTopRadius="10px"
                  bg="Purple.Dark"
                  position="relative"
                  borderLeft="1px solid #7c5dc9"
                  borderRight="1px solid #7c5dc9"
                  borderTop="2px solid #a18be6"
                  overflow="hidden"
                  orient="top"
                >
                  <Text
                    fontSize={isSmallScreen ? '12px' : '14px'}
                    fontWeight="bold"
                    position="relative"
                    zIndex={2}
                  >
                    <Trans>Pets</Trans>
                  </Text>
                </MotionMcFlex>
              </McFlex>
            </Button>
          </McFlex>
          <McFlex col overflow="hidden">
            {activeSpeciesId ? (
              <SpeciesPage
                speciesId={activeSpeciesId}
                onAnimationComplete={handleAnimationComplete}
                onBack={() => {
                  if (newLogs.length > 0) {
                    return;
                  }
                  playSfx('Journal_NextPage');
                  setActiveSpeciesId(null);
                }}
              />
            ) : (
              <OverviewPage
                journalType={activeJournalType}
                onSelectSpecies={(speciesId) => {
                  if (newLogs.length > 0) {
                    return;
                  }
                  playSfx('Journal_NextPage');
                  setActiveSpeciesId(speciesId);
                }}
              />
            )}
          </McFlex>
        </McGrid>
      </FixedAspectRatioContainer>
    </QuinoaModal>
  );
};

export default JournalModal;
