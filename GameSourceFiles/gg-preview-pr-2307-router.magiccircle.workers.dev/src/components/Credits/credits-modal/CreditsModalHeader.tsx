import { Box, Image, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import DonutIcon from '../../Currency/DonutIcon.webp';
import McFlex from '../../McFlex/McFlex';

export const CreditsModalHeader = () => {
  return (
    <McFlex orient="left" gap={1}>
      <Box height="48px" width="48px">
        <Image src={DonutIcon} alt="Donuts" boxSize="45px" />
      </Box>
      <Text
        fontSize="xl"
        fontWeight="bold"
        background="linear-gradient(180deg, #FFE296 23.12%, #DE1F87 72.14%)"
        backgroundClip="text"
        fontFamily="shrikhand"
      >
        <Trans>GET DONUTS</Trans>
      </Text>
    </McFlex>
  );
};
