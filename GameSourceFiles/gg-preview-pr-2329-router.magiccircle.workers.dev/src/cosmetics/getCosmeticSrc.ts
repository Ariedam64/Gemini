// April 18 2025: Because of @cloudflare/vite-plugin's limited support for
// worker asset bindings during runtime, we are using the "public" directory to
// serve assets, as this avoids needing to map between the asset path and its
// bundled (cache busting) URL.
// See: https://github.com/cloudflare/workers-sdk/issues/8992
// I have kept the below commented out so that one day we might return to a
// world where these assets ARE bundled (and deduplicated) for both the client
// and server.

import { BASE_URL } from '@/environment';

// const imageAssets: Record<string, string | undefined> = import.meta.glob(
//   './assets/items/*.png',
//   {
//     eager: true,
//     import: 'default',
//   }
// );
// export const getCosmeticSrc = (filename: string): string | undefined => {
//   return imageAssets[`./assets/items/${filename}`];
// };

export const getCosmeticSrc = (filename: string): string | undefined => {
  return BASE_URL + '/assets/cosmetic/' + filename;
};
