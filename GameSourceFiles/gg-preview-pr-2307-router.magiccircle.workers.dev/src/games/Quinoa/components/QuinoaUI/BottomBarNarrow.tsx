import { Box } from '@chakra-ui/layout';
import { useAtomValue } from 'jotai';
import McFlex from '@/components/McFlex/McFlex';
import { myCoinsCountAtom } from '@/Quinoa/atoms/myAtoms';
import FriendBonusLabel from '../currency/FriendBonusLabel';
import QuinoaCoinLabel from '../currency/QuinoaCoinLabel';
import InventoryHotbar from './InventoryHotbar';

type BottomBarNarrowProps = {};

const BottomBarNarrow: React.FC<BottomBarNarrowProps> = () => {
  const myCoinsCount = useAtomValue(myCoinsCountAtom);

  return (
    <McFlex autoH col orient="left" px={2} py={1} gap={2}>
      <McFlex autoH>
        <McFlex orient="left" zIndex="AboveGameModal">
          <QuinoaCoinLabel
            amount={myCoinsCount}
            size="md"
            tooltipFontSize="20px"
          />
        </McFlex>
        <Box transform="translateY(2px)">
          <FriendBonusLabel />
        </Box>
      </McFlex>
      <InventoryHotbar />
    </McFlex>
  );
};

export default BottomBarNarrow;
