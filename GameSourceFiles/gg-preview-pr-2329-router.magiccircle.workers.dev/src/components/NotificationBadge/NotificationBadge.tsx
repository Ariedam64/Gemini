import { CheckIcon } from '@chakra-ui/icons';
import { Circle, Text } from '@chakra-ui/react';

interface NotificationBadgeProps {
  numIncompleteTasks: number;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  numIncompleteTasks,
}) => {
  return (
    <Circle
      className="NotificationBadge"
      size={{ base: '16px', sm: '20px', md: '24px' }}
      bg={numIncompleteTasks === 0 ? 'Green.Magic' : 'Red.Magic'}
      position="absolute"
      top="-2px"
      right="-4px"
      zIndex={2}
      boxShadow="0px 3px 8px rgba(0, 0, 0, 0.4), 0px 1px 3px rgba(0, 0, 0, 0.3)"
    >
      {numIncompleteTasks === 0 ? (
        <CheckIcon
          boxSize={{ base: '12px', sm: '14px', md: '16px' }}
          color="white"
        />
      ) : (
        <Text
          fontSize={{ base: '12px', sm: '14px', md: '16px' }}
          fontWeight="800"
          color="white"
          letterSpacing="-0.5px"
        >
          {numIncompleteTasks > 3 ? '9+' : numIncompleteTasks}
        </Text>
      )}
    </Circle>
  );
};

export default NotificationBadge;
