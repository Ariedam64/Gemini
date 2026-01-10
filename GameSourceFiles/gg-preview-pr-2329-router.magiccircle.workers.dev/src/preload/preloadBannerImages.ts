import { cosmeticColors } from '@/common/resources/cosmetic-colors';
import { getDecoration } from '../constants/decorations';

function preloadBannerImages() {
  cosmeticColors.forEach((name) => {
    const image = new Image();
    image.src = getDecoration(name).bannerImageSrc;
  });
}

export default preloadBannerImages;
