import { Box, Text } from '@chakra-ui/layout';
import McFlex, { type McFlexProps } from '@/components/McFlex/McFlex';
import { truncatePlayerName } from '@/utils/truncatePlayerName';
import StaticAvatar, { type StaticAvatarProps } from './StaticAvatar';

interface StaticAvatarTokenWithNameProps {
  staticAvatarProps: StaticAvatarProps;
  name: string;
  backgroundColor: string;
  containerProps?: McFlexProps;
}

const StaticAvatarTokenWithName: React.FC<StaticAvatarTokenWithNameProps> = ({
  staticAvatarProps,
  name,
  backgroundColor,
  containerProps,
}) => {
  return (
    <McFlex col w="40px" h="40px" {...containerProps}>
      <McFlex
        h="28px"
        w="28px"
        position="relative"
        background={backgroundColor}
        borderRadius="full"
        overflow="hidden"
      >
        <Box position="absolute" top={-3} h="65px" w="65px">
          <StaticAvatar {...staticAvatarProps} />
        </Box>
      </McFlex>
      <Text
        color="MagicWhite"
        fontWeight="bold"
        fontSize="9px"
        whiteSpace="nowrap"
      >
        {truncatePlayerName(name)}
      </Text>
    </McFlex>
  );
};

export default StaticAvatarTokenWithName;
