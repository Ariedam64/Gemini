import { Box, Button, IconButton } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { RotateCcw, RotateCw, SkipBack, SkipForward } from 'react-feather';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import { mySelectedItemRotationsAtom } from '@/Quinoa/atoms/myAtoms';
import { actionAtom } from '@/Quinoa/data/action/actionAtom';
import {
  flipDecorHorizontal,
  rotateDecorClockwise,
  rotateDecorCounterClockwise,
} from '@/Quinoa/utils/orientDecor';

const OrientDecorControls: React.FC = () => {
  const rotations = useAtomValue(mySelectedItemRotationsAtom);
  const action = useAtomValue(actionAtom);
  const { t } = useLingui();

  if (action !== 'placeDecor') {
    return null;
  }
  return (
    <McFlex gap={1} auto>
      {rotations && (
        <McTooltip
          label={t`Rotate counter-clockwise [shift+r]`}
          placement="left"
          showOnDesktopOnly
        >
          <IconButton
            aria-label={t`Rotate counter-clockwise`}
            icon={<RotateCcw size={16} />}
            onClick={rotateDecorCounterClockwise}
            size="sm"
            bg="rgba(0, 0, 0, 0.65)"
          />
        </McTooltip>
      )}
      <McTooltip
        label={t`Flip horizontal [t]`}
        placement="top"
        showOnDesktopOnly
      >
        <Button
          aria-label={t`Flip horizontal`}
          onClick={flipDecorHorizontal}
          size="sm"
          borderRadius="10px"
          w="45px"
          bg="rgba(0, 0, 0, 0.65)"
        >
          <Box mr="-3.3px">
            <SkipForward size={16} fill="white" color="white" />
          </Box>
          <Box ml="-3.3px">
            <SkipBack size={16} />
          </Box>
        </Button>
      </McTooltip>
      {rotations && (
        <McTooltip
          label={t`Rotate clockwise [r]`}
          placement="right"
          showOnDesktopOnly
        >
          <IconButton
            aria-label={t`Rotate clockwise`}
            icon={<RotateCw size={16} />}
            onClick={rotateDecorClockwise}
            size="sm"
            bg="rgba(0, 0, 0, 0.65)"
          />
        </McTooltip>
      )}
    </McFlex>
  );
};

export default OrientDecorControls;
