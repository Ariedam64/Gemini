import { Text, TextProps } from '@chakra-ui/layout';

const SlapperText: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text
      variant="textSlapper-default"
      color={'Blue.Magic'}
      maxW="90%"
      transform="rotate(-9deg)"
      style={{
        WebkitTextStroke: '2px white',
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export default SlapperText;
