import { Box } from '@chakra-ui/layout';
import { useAtomValue } from 'jotai';
import McFlex from '@/components/McFlex/McFlex';
import useIsSmallHeight from '@/hooks/useIsSmallHeight';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { myCoinsCountAtom } from '@/Quinoa/atoms/myAtoms';
import FriendBonusLabel from '../currency/FriendBonusLabel';
import QuinoaCoinLabel from '../currency/QuinoaCoinLabel';
import InventoryHotbar from './InventoryHotbar';

type BottomBarWideProps = {};

const BottomBarWide: React.FC<BottomBarWideProps> = () => {
  const myCoinsCount = useAtomValue(myCoinsCountAtom);
  const isSmallScreen = useIsSmallScreen();
  const isSmallHeight = useIsSmallHeight();

  return (
    <McFlex
      autoH
      px={2}
      pt={isSmallHeight ? 3 : 5}
      pb={1}
      gap={4}
      orient="left"
    >
      <McFlex auto col orient="left">
        <FriendBonusLabel />
        <Box zIndex="AboveGameModal">
          <QuinoaCoinLabel
            amount={myCoinsCount}
            size={isSmallScreen ? 'md' : 'xl'}
            tooltipFontSize="20px"
          />
        </Box>
      </McFlex>
      <InventoryHotbar />
    </McFlex>
  );
};

export default BottomBarWide;
