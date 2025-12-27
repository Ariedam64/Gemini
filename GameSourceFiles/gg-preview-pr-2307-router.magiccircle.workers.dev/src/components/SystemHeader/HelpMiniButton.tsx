import { QuestionIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import type { MouseEventHandler } from 'react';
import McTooltip from '@/components/McTooltip/McTooltip';

interface HelpMiniButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  color?: string;
  isOpen: boolean;
}

export default function HelpMiniButton({
  onClick,
  color,
  isOpen,
}: HelpMiniButtonProps) {
  const { t } = useLingui();

  return (
    <McTooltip label={t`How To Play`} placement="bottom" showOnDesktopOnly>
      <IconButton
        aria-label={t`How To Play`}
        icon={
          isOpen ? (
            <QuestionIcon color={color} boxSize="23px" />
          ) : (
            <QuestionOutlineIcon color={color} boxSize="23px" />
          )
        }
        variant="blank"
        px={1.5}
        onClick={onClick}
      />
    </McTooltip>
  );
}
