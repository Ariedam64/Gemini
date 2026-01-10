import { useSetSlapperContent } from '@/store/store';
import {
  fullSlapperAnimation,
  initSlapper,
  showSlapper,
  hideSlapper,
} from './slapperAnimations';

export const useSlapper = () => {
  const setSlapperContent = useSetSlapperContent();

  const slap = async (content: React.ReactNode) => {
    return new Promise<void>((resolve) => {
      setSlapperContent(content);
      // Timeout allows React to update content before animating
      setTimeout(async () => {
        await initSlapper();
        await fullSlapperAnimation();
        resolve();
      }, 0);
    });
  };

  const showSlap = async (content: React.ReactNode) => {
    return new Promise<void>((resolve) => {
      setSlapperContent(content);
      // Timeout allows React to update content before animating
      setTimeout(async () => {
        await initSlapper();
        await showSlapper();
        resolve();
      }, 0);
    });
  };

  const hideSlap = async () => {
    await hideSlapper();
  };

  return { slap, showSlap, hideSlap };
};
