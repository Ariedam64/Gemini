import type { TextProps } from '@chakra-ui/layout';
import { useSlapper } from '@/components/Slapper/hooks';
import SlapperText from './SlapperText';

export function useTextSlapper() {
  const { slap } = useSlapper();
  const slapText = async (content: string, props: TextProps = {}) => {
    await slap(<SlapperText {...props}>{content}</SlapperText>);
  };
  return { slapText };
}
