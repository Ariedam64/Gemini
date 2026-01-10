import type { Surface } from '@/common/Environment';

export const deploymentVersion =
  import.meta.env.VITE_DEPLOYMENT_VERSION ?? 'unknown';
export const DiscordClientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
export const environment = import.meta.env.VITE_MC_ENVIRONMENT;

export const surface: Surface = (() => {
  if (window.__MAGICCIRCLE_IOS_WEBVIEW__) {
    return 'webview';
  } else if (window.location.hostname.includes('discord')) {
    return 'discord';
  } else {
    return 'web';
  }
})();

export const isRunningInsideDiscord = surface === 'discord';

export const isHeadlessBrowser = navigator.webdriver;

/**
 * The base public path for the application, as defined by Vite's `base`
 * configuration. This is used for constructing absolute URLs to assets, but
 * when possible, it is preferable to use vite's static asset handling instead,
 * which "bakes" the right URL into the bundle, along with cache-busting hashes etc.
 *
 * @remarks
 * - This value is not a fully qualified URL, but rather an absolute path like
 *   `/version/${version}` (note: without a trailing slash!).
 * - It is re-exported here to facilitate easier discovery and usage throughout
 *   the codebase.
 * - The value is injected at build time by Vite and reflects the `base` option
 *   set in `client/vite.config.ts`.
 * - For more details, see: https://vite.dev/guide/build.html#public-base-path
 *
 * @example
 * // If Vite is configured with base = '/version/moose'
 * console.log(BASE_URL); // '/version/moose'
 *
 * @see {@link https://vite.dev/guide/build.html#public-base-path}
 */
export const BASE_URL = import.meta.env.BASE_URL as `/version/${string}`;

function getIsDesktop() {
  const userAgent = window.navigator.userAgent;
  const mobileUserAgents = [
    'Android',
    'iPhone',
    'iPod',
    'Windows Phone',
    'webOS',
    'BlackBerry',
  ];
  if (mobileUserAgents.some((platform) => userAgent.includes(platform))) {
    return false;
  }
  // iPadOS >= 13 lies about being a desktop
  // See: https://stackoverflow.com/a/64559209
  const isDesktopMode_iPad =
    userAgent.includes('Macintosh') && navigator.maxTouchPoints > 2;

  if (isDesktopMode_iPad) {
    return false;
  }
  return true;
}

function getIsNonIOSMobile() {
  const userAgent = window.navigator.userAgent;
  const androidUserAgents = ['Android', 'BlackBerry', 'Windows Phone'];
  if (androidUserAgents.some((agent) => agent.includes(userAgent))) {
    return true;
  }
  return false;
}

export const isDesktopMode = getIsDesktop();
export const platform = isDesktopMode ? 'desktop' : 'mobile';
export const isNonIOSMobile = getIsNonIOSMobile();

const logItems = [
  ['Magic Circle', '👁️🟣👁️'],
  ['Version', deploymentVersion],
  ['Environment', environment],
  ['Surface', surface],
  ['Vite mode', import.meta.env.MODE],
  ['isRunningInsideDiscord', isRunningInsideDiscord],
  ['DiscordClientId', DiscordClientId],
  ['isHeadlessBrowser', isHeadlessBrowser],
];

console.log(
  logItems.map(([key, value]) => `%c${key}: %c${value}`).join('\n'),
  ...logItems.flatMap(() => ['font-weight: bold', 'font-weight: normal'])
);
