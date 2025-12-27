import { Image, ImageAsset } from '@rive-app/canvas/rive_advanced.mjs';
import { decodeImage } from '@rive-app/react-canvas';
import { getCosmeticSrc } from '@/cosmetics/getCosmeticSrc';

const avatarImageCache: Record<string, Image> = {};

async function setAvatarImage(
  asset: ImageAsset,
  src: string | undefined,
  useAvatarUrlRoot = true
) {
  if (!src) return;

  let image = avatarImageCache[src];

  if (!image) {
    const url = useAvatarUrlRoot ? getCosmeticSrc(src) : src;
    if (!url) {
      console.error(`setAvatarImage: no URL for ${src}`);
      return;
    }

    const res = await fetch(url);
    if (!res.ok) {
      console.warn(
        `setAvatarImage: Failed to fetch avatar image: non-OK status ${res.status} ${res.statusText} for ${src} from ${url}`
      );
      return;
    }
    let arrayBuffer: ArrayBuffer;
    try {
      arrayBuffer = await res.arrayBuffer();
    } catch (error) {
      console.warn(
        `setAvatarImage: Failed to fetch avatar image: arrayBuffer() threw an error for ${src} from ${url}`,
        { originalError: error }
      );
      return;
    }
    if (arrayBuffer.byteLength === 0) {
      console.warn(`setAvatarImage: Empty arrayBuffer for ${src} from ${url}`);
      return;
    }
    try {
      image = await decodeImage(new Uint8Array(arrayBuffer));
    } catch (error) {
      console.warn(
        `setAvatarImage: Failed to decode avatar image: decodeImage() threw an error for ${src} from ${url}`,
        { originalError: error }
      );
      return;
    }
    avatarImageCache[src] = image;
  }

  try {
    asset.setRenderImage(image);
  } catch (error) {
    console.warn(`setAvatarImage: Failed to set render image for ${src}:`, {
      originalError: error,
    });
  }
}

// NOTE: We're not calling unref here because we want to keep the image in memory.

// From the example in the Rive docs:
// You could maintain a reference and update the image dynamically at any time.
// But be sure to call unref to release any references when no longer needed.
// This allows the engine to clean it up when it is not used by any more animations.
// image.unref();

export default setAvatarImage;
