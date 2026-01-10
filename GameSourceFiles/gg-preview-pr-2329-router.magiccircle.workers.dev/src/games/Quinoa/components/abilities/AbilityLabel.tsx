import { Text } from '@chakra-ui/layout';
import McFlex from '@/components/McFlex/McFlex';

export interface AbilityLabelProps {
  label: React.ReactNode;
  calculatedValue: string;
  baseValue?: string;
  strength?: number;
  unit: React.ReactNode;
}

const AbilityLabel: React.FC<AbilityLabelProps> = ({
  label,
  calculatedValue,
  baseValue,
  strength,
  unit,
}) => {
  return (
    <McFlex auto>
      <Text fontSize={{ base: '11px', md: '13px' }}>
        {label}:{' '}
        <Text
          as="span"
          fontWeight="bold"
          fontSize={{ base: '11px', md: '13px' }}
        >
          {calculatedValue}
          {unit}
        </Text>{' '}
        {baseValue && strength && (
          <Text
            as="span"
            fontSize={{ base: '9px', md: '11px' }}
            color="Neutral.Grey"
          >
            (
            <Text
              as="span"
              fontStyle="italic"
              fontSize={{ base: '9px', md: '11px' }}
            >
              {baseValue}
            </Text>
            {unit} × STR {strength})
          </Text>
        )}
      </Text>
    </McFlex>
  );
};

export default AbilityLabel;
