import { Text } from '@chakra-ui/layout';
import { playSoundEffect } from '@/audio/legacy/soundEffects/soundEffect';
import McFlex from '@/components/McFlex/McFlex';
import { useFormatDateText } from '@/utils/date';
import { NavigationArrow } from '../../games/AvocadoMini/NavigationArrow';

export interface DatePickerProps {
  currentDate: Date;
  dateToday: Date;
  onClickLeft: () => void;
  onClickRight: () => void;
  canGoLeft: boolean;
  canGoRight: boolean;
  onDoubleClick?: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  currentDate,
  dateToday,
  onClickLeft,
  onClickRight,
  canGoLeft,
  canGoRight,
  onDoubleClick,
}) => {
  const formatDateText = useFormatDateText();

  const onDoubleClickButton = () => {
    playSoundEffect('Button_Forward_01');
    onDoubleClick?.();
  };

  return (
    <McFlex autoW bg="MagicWhite" borderRadius="20px">
      <NavigationArrow
        direction="left"
        onClick={onClickLeft}
        isDisabled={!canGoLeft}
        isVisible={canGoLeft}
      />
      <McFlex
        w={{ base: '60px', sm: '70px' }}
        onDoubleClick={onDoubleClickButton}
        cursor="pointer"
      >
        <Text
          fontSize={{ base: '2xs', sm: 'xs' }}
          fontWeight="bold"
          color="MagicBlack"
          textTransform="uppercase"
        >
          {formatDateText(currentDate, dateToday)}
        </Text>
      </McFlex>
      <NavigationArrow
        direction="right"
        onClick={onClickRight}
        isDisabled={!canGoRight}
        isVisible={canGoRight}
      />
    </McFlex>
  );
};

export default DatePicker;
