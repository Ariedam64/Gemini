import { forwardRef, Icon, IconProps } from '@chakra-ui/react';
import { Info } from 'react-feather';

export interface InfoIconProps extends IconProps {}

const InfoIcon = forwardRef((iconProps, ref) => {
  return <Icon ref={ref} as={Info} {...iconProps} />;
});

InfoIcon.displayName = 'InfoIcon';

export default InfoIcon;
