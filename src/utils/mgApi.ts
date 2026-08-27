// src/utils/mgApi.ts
// Endpoints of the MG API (mg-api.ariedam.fr).
//
// Every remote game-data and asset source the mod uses lives here, so a host
// change or an endpoint rename is a single edit rather than a search across
// modules. No logic, no requests — see `utils/http.ts` for those.

export const MG_API_ORIGIN = "https://mg-api.ariedam.fr";

export const MG_API = {
  /** All game data in one payload: plants, pets, items, decor, eggs, ... */
  data: `${MG_API_ORIGIN}/data`,

  /** Sprite atlas metadata, with anchors and source sizes. */
  spriteData: `${MG_API_ORIGIN}/assets/sprite-data?full=1`,

  /**
   * Full sprite catalog with ready-to-use PNG URLs.
   *
   * Broader than `spriteData`, which only covers what the atlas export knows
   * about — this one lists every sprite the game ships. Used to fill the gaps.
   */
  spriteCatalog: `${MG_API_ORIGIN}/assets/sprites`,

  /** Base for individual sprite PNGs: `${spritePng}/{category}/{name}.png`. */
  spritePng: `${MG_API_ORIGIN}/assets/sprites`,

  /** Player avatar cosmetics, with absolute versioned asset URLs. */
  cosmetics: `${MG_API_ORIGIN}/assets/cosmetics?full=1`,

  /** Rive files and the inventory of what is inside them. */
  rive: `${MG_API_ORIGIN}/assets/rive?full=1`,

  /**
   * Smallest response that carries `baseUrl`.
   *
   * No endpoint serves the game's versioned asset base on its own, so this
   * asks for a sprite page filtered down to nothing: 78 bytes, of which the
   * only field we want.
   */
  assetBaseUrl: `${MG_API_ORIGIN}/assets/sprite-data?cat=ui&flat=1`,
} as const;

/** URL of a single sprite PNG, pre-composed with its mutation layers. */
export function composedSpriteUrl(atlasKey: string, mutations: readonly string[]): string {
  const params = new URLSearchParams({ key: atlasKey });
  if (mutations.length > 0) params.set("mutations", mutations.join(","));
  return `${MG_API_ORIGIN}/assets/sprites/composed?${params.toString()}`;
}
