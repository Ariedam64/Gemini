import { keyframes } from '@chakra-ui/react';

const bannerSwimKeyframes = keyframes`
  from { background-position: 0px 0px; }
  to { background-position: -200px -200px; }
`;

const bannerSwimAnimation = `${bannerSwimKeyframes} 60s linear 0s infinite`;

export default bannerSwimAnimation;
