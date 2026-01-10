import {
  IconButton,
  IconButtonProps,
  ModalCloseButton,
} from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { X } from 'react-feather';

interface PresentableCloseButtonProps extends IconButtonProps {}
const PresentableCloseButton = (
  props: Omit<PresentableCloseButtonProps, 'aria-label'>
) => (
  <IconButton
    position="absolute"
    top="0"
    right="0"
    aria-label={t`Close`}
    icon={<X />}
    variant="blank"
    color="Neutral.TrueWhite"
    bg="transparent"
    outline="1px solid"
    outlineColor="Neutral.TrueWhite"
    p={1}
    borderRadius="full"
    as={ModalCloseButton}
    {...props}
  />
);

export default PresentableCloseButton;
