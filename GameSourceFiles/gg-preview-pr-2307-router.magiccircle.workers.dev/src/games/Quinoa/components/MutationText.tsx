import { Text, type TextProps } from '@chakra-ui/layout';
import {
  type MutationId,
  mutationsDex,
} from '@/common/games/Quinoa/systems/mutation';
import { mutationColors } from '@/Quinoa/constants/colors';

interface MutationTextProps extends TextProps {
  mutationId: MutationId;
  isCompact?: boolean;
  isDark?: boolean;
}
// Use darkened color on light backgrounds to improve contrast
const darkenColor = (color: string): string => {
  const rgbMatch = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
  if (!rgbMatch) {
    return 'rgba(0, 0, 0, 1)';
  }
  const r = parseInt(rgbMatch[1], 10);
  const g = parseInt(rgbMatch[2], 10);
  const b = parseInt(rgbMatch[3], 10);
  const darkR = Math.round(r * 0.8);
  const darkG = Math.round(g * 0.8);
  const darkB = Math.round(b * 0.8);

  return `rgba(${darkR}, ${darkG}, ${darkB}, 1)`;
};

const MutationText: React.FC<MutationTextProps> = ({
  mutationId,
  isCompact = false,
  isDark = false,
  ...props
}) => {
  const { name } = mutationsDex[mutationId];
  const color = mutationColors[mutationId];
  const formattedColor = isDark ? darkenColor(color) : color;
  const formattedName = isCompact ? name.slice(0, 1).toUpperCase() : name;
  // Rainbow uses gradient text
  if (mutationId === 'Rainbow') {
    return (
      <Text
        as="span"
        bgClip="text"
        fontWeight="bold"
        fontSize="inherit"
        bgGradient={color}
        {...props}
      >
        {formattedName}
      </Text>
    );
  }
  return (
    <Text
      as="span"
      fontWeight="bold"
      fontSize="inherit"
      color={formattedColor}
      {...props}
    >
      {formattedName}
    </Text>
  );
};

export default MutationText;
