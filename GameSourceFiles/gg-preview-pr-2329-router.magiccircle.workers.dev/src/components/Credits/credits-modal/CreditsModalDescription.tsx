import { Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';

export const CreditsModalDescription = () => {
  return (
    <Text
      fontSize="sm"
      textAlign="center"
      color="MagicWhite"
      lineHeight="1.4"
      fontWeight="500"
      pb={2}
    >
      <Trans>
        Donuts are our premium currency. They're also the only way we make money
        😅
      </Trans>
    </Text>
  );
};
