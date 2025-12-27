import { Icon, IconButton, Text } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft } from 'react-feather';
import { playSfx } from '@/audio/useQuinoaAudio';
import {
  type FaunaSpeciesId,
  faunaSpeciesDex,
} from '@/common/games/Quinoa/systems/fauna';
import {
  type FloraSpeciesId,
  floraSpeciesDex,
} from '@/common/games/Quinoa/systems/flora';
import {
  cropJournalVariants,
  petJournalVariants,
} from '@/common/games/Quinoa/systems/journal';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { MotionBox } from '@/components/Motion';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { delay } from '@/utils/delay';
import { myCropJournalAtom, myPetJournalAtom } from '../../../atoms/myAtoms';
import SpeciesPageEntry from './SpeciesPageEntry';
import { newLogsToAnimateAtom } from './store';

interface SpeciesPageProps {
  speciesId: FloraSpeciesId | FaunaSpeciesId;
  onAnimationComplete: (speciesId: FloraSpeciesId | FaunaSpeciesId) => void;
  onBack: () => void;
}

const SpeciesPage: React.FC<SpeciesPageProps> = ({
  speciesId,
  onAnimationComplete,
  onBack,
}) => {
  const newLogs = useAtomValue(newLogsToAnimateAtom);
  const newVariantsToAnimate = useMemo(
    () => newLogs.find((log) => log.speciesId === speciesId)?.variants || [],
    [speciesId]
  );
  const isSmallScreen = useIsSmallScreen();
  const isCrop = speciesId in floraSpeciesDex;
  const variantList = isCrop ? cropJournalVariants : petJournalVariants;
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const variantRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    {}
  );
  const cropJournal = useAtomValue(myCropJournalAtom);
  const petJournal = useAtomValue(myPetJournalAtom);

  const [variantsWaitingForAnimation, setVariantsWaitingForAnimation] =
    useState<Set<string>>(new Set());

  variantList.forEach((variant) => {
    if (!variantRefs.current[variant]) {
      variantRefs.current[variant] = createRef<HTMLDivElement>();
    }
  });

  const animateNewVariants = async () => {
    if (newVariantsToAnimate.length === 0 || !scrollableContainerRef.current)
      return;
    setVariantsWaitingForAnimation(new Set(newVariantsToAnimate));

    for (const variant of newVariantsToAnimate) {
      const variantRef = variantRefs.current[variant];
      if (!variantRef?.current) continue;

      const container = scrollableContainerRef.current;
      const element = variantRef.current;

      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const offset = elementRect.top - containerRect.top;
      const newScrollTop =
        container.scrollTop +
        offset -
        containerRect.height / 2 +
        elementRect.height / 2;

      container.scrollTo({
        top: newScrollTop,
        behavior: 'smooth',
      });
      await delay(0.5);
      // Start the scale animation and reveal the variant
      const elementToAnimate = variantRef.current;
      // Remove this variant from waiting (reveals its content)
      setVariantsWaitingForAnimation((prev) => {
        const newSet = new Set(prev);
        newSet.delete(variant);
        return newSet;
      });
      elementToAnimate.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.2)' },
          { transform: 'scale(0.95)' },
          { transform: 'scale(1.05)' },
          { transform: 'scale(1)' },
        ],
        {
          duration: 600,
          easing: 'ease-in-out',
        }
      );
      playSfx('Journal_Stamped');
      await delay(0.5);
    }
  };

  useEffect(() => {
    if (newVariantsToAnimate.length === 0) {
      return;
    }
    const animate = async () => {
      await animateNewVariants();
      await delay(0.5);
      onAnimationComplete(speciesId);
    };
    void animate();
  }, [newVariantsToAnimate]);

  let displayName: string;
  let numVariantsLogged = 0;

  if (isCrop) {
    const { name } = floraSpeciesDex[speciesId as FloraSpeciesId].crop;
    const variantsLogged =
      cropJournal?.[speciesId as FloraSpeciesId]?.variantsLogged ?? [];
    numVariantsLogged = variantsLogged.length;
    displayName = numVariantsLogged > 0 ? name : '???';
  } else {
    const { name } = faunaSpeciesDex[speciesId as FaunaSpeciesId];
    const variantsLogged =
      petJournal?.[speciesId as FaunaSpeciesId]?.variantsLogged ?? [];
    numVariantsLogged = variantsLogged.length;
    displayName = numVariantsLogged > 0 ? name : '???';
  }

  return (
    <McFlex col orient="top">
      <McFlex col autoH py={2}>
        <McGrid templateColumns="30px 1fr 30px" alignItems="center" minH="24px">
          <IconButton
            variant="blank"
            onClick={onBack}
            color="MagicBlack"
            w="100%"
            icon={
              <Icon
                as={ArrowLeft}
                boxSize={isSmallScreen ? '18px' : '22px'}
                color="Brown.Dark"
              />
            }
            aria-label={t`Back`}
          />
          <Text
            fontSize={{ base: isSmallScreen ? '14px' : '20px', lg: '24px' }}
            fontWeight="bold"
            fontFamily="shrikhand"
            color="#4F6981"
            textAlign="center"
            textTransform="uppercase"
            lineHeight="1"
          >
            <Trans>{displayName}</Trans>
          </Text>
        </McGrid>
        <McFlex
          minH="4px"
          h="4px"
          bg="Brown.Pastel"
          borderRadius="full"
          opacity={0.5}
        />
        <McFlex autoH orient="right">
          <Text
            color="Brown.Light"
            fontWeight="bold"
            fontSize={isSmallScreen ? '10px' : '11px'}
          >
            <Trans>
              Collected {numVariantsLogged}/{variantList.length}
            </Trans>
          </Text>
        </McFlex>
      </McFlex>
      <McFlex
        ref={scrollableContainerRef}
        p={2}
        overflowY="auto"
        overflowX="hidden"
        orient="top"
        sx={{
          '&::-webkit-scrollbar': {
            width: '4px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(85, 48, 20, 0.2)', // More dark brown, less gray
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(110, 60, 24, 0.3)', // Slightly lighter/different dark brown for hover
            },
          },
        }}
      >
        <McGrid
          templateColumns={
            isSmallScreen
              ? 'repeat(auto-fit, minmax(80px, 1fr))'
              : 'repeat(auto-fit, minmax(130px, 1fr))'
          }
          gap={4}
          autoH
        >
          {variantList.map((variant) => (
            <MotionBox key={variant} ref={variantRefs.current[variant]}>
              <SpeciesPageEntry
                variant={variant}
                speciesId={speciesId}
                isWaitingForAnimation={variantsWaitingForAnimation.has(variant)}
              />
            </MotionBox>
          ))}
        </McGrid>
      </McFlex>
    </McFlex>
  );
};

export default SpeciesPage;
