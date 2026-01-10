import type Environment from '@/common/Environment';
import { playerCosmeticToUserStyle } from '@/common/resources/cosmetics/utils';
import McChakraProvider from '@/components/McChakraProvider';
import Scope from '@/components/Scope';
import '@/styles/index.css';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import * as Sentry from '@sentry/react';
import { isbot } from 'isbot';
import { getDefaultStore } from 'jotai';
import { posthog } from 'posthog-js';
import App from './App';
import { AuthenticationFailureDialog } from './connection/AuthenticationFailureDialog';
import ErrorFallback from './devtools/ErrorFallback';
import {
  deploymentVersion,
  environment,
  isHeadlessBrowser,
  isRunningInsideDiscord,
  platform,
  surface,
} from './environment';
import {
  isSupportedLocale,
  setLocaleFromOutsideReact,
  useLocaleEffects,
} from './localization';
import {
  anonymousUserStyleAtom,
  currentGameNameAtom,
  isHostAtom,
  isUserAuthenticatedAtom,
  playerAtom,
  playerIdAtom,
  roomSessionIdAtom,
} from './store/store';
import {
  useUnsupportedReason,
  useUnsupportedReasonEffects,
} from './unsupported-play/hooks';
import UnsupportedPlay from './unsupported-play/UnsupportedPlay';
import { getCurrentRoomId } from './utils';

// Clear console between HMR reloads
// Totally optional, feel free to remove
// https://github.com/vitejs/vite/discussions/3143
if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => console.clear());
}
if (window.__MAGICCIRCLE_IOS_LOCALE__) {
  const iosLocale = window.__MAGICCIRCLE_IOS_LOCALE__;
  const slicedLocale = iosLocale.slice(0, 2);
  if (isSupportedLocale(iosLocale)) {
    setLocaleFromOutsideReact(iosLocale);
  } else if (isSupportedLocale(slicedLocale)) {
    setLocaleFromOutsideReact(slicedLocale);
  }
}
const roomId = getCurrentRoomId();

const doesUserAgentLookLikeABot =
  isHeadlessBrowser || isbot(navigator.userAgent);

if (doesUserAgentLookLikeABot) {
  console.warn('User agent looks like a bot. Sentry will be disabled.');
}
const forceSentry = window.location.search.includes('forceSentry');
if (forceSentry) {
  console.warn(
    'Sentry is forced on via ?forceSentry — this should only be used for debugging Sentry issues in non-production environments, and those events/reports will be sent to our production Sentry project.'
  );
}
// Sentry is only intended to run in production
// Those build environment variables are are set in our GitHub Actions workflow
// and if they're not set, Sentry will silently be disabled
Sentry.init({
  dsn: 'https://30469ee95467485d96af791b5f669ab9@o4505315105243136.ingest.sentry.io/4505322901995520',
  release: import.meta.env.VITE_SENTRY_RELEASE,
  tunnel: '/sentry-tunnel',
  dist: 'client',
  debug: forceSentry,
  enabled:
    (environment === 'Production' || environment === 'Preview') &&
    !doesUserAgentLookLikeABot,
  environment: environment,
  // 04/2024: we use PostHog for session replays now.
  // Enabling replays via Sentry was increasing bundle size by
  // 150kB (uncompressed) and 44kB (compressed)
  // and also probably had a fairly runtime overhead particularly
  // with all the canvases that needed to be recorded.
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  ignoreErrors: [
    // This happens when the client cancels a request mid-flight, which happens
    // quite frequently if e.g. the app is closed while a request is in flight.
    // It's harmless, un-actionable, and very noisy, so we'll ignore it.
    'Failed to fetch',
  ],
  integrations: [
    Sentry.captureConsoleIntegration({
      levels: ['error'],
    }),
    posthog.sentryIntegration({
      projectId: environment === 'Production' ? 44408 : 61380,
      organization: 'magic-circle',
    }),
  ],
  initialScope: {
    tags: {
      roomId,
      deploymentVersion,
      platform,
      surface,
    },
  },
  beforeBreadcrumb(breadcrumb) {
    const urlsToIgnore = ['in.logs.betterstack.com', 'app.posthog.com'];
    const breadcrumbData = breadcrumb.data;
    const breadcrumbUrl =
      typeof breadcrumbData?.url === 'string' ? breadcrumbData.url : undefined;
    if (
      breadcrumbUrl &&
      urlsToIgnore.some((url) => breadcrumbUrl.includes(url))
    ) {
      return null;
    }
    return breadcrumb;
  },
});
const { sub, get, set } = getDefaultStore();

const POSTHOG_TOKENS: Partial<Record<Environment, string>> = {
  Production: 'phc_5NQnL0ALxa7n1xjFEeSAe3lMsL8gYu8c8F3RhgSiIkN',
  Preview: 'phc_UBgwDg2vemD5VeZEsdCMSS00LMfCRRea9YzQTvW8VHA',
  // Uncomment if you're developing posthog features and want to test sending
  // events to the preview posthog project. There is a similar config in the
  // server (RoomDurableObject.ts).
  // Local: 'phc_UBgwDg2vemD5VeZEsdCMSS00LMfCRRea9YzQTvW8VHA',
};

const posthogToken = POSTHOG_TOKENS[environment as Environment];

if (posthogToken && !isHeadlessBrowser) {
  posthog.init(posthogToken, {
    api_host: isRunningInsideDiscord ? '/posthog' : 'https://app.posthog.com',
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    advanced_disable_feature_flags_on_first_load: true,
    advanced_disable_feature_flags: true,
    bootstrap: {
      // Use our PlayerID as the distinct ID for PostHog anonymous users
      distinctID: isRunningInsideDiscord ? undefined : get(playerIdAtom),
    },
    // NOTE: We are NOT actually disabling session recording.
    // We simply want to DEFER session recording until after the loading
    // animation, to avoid a very noticeable stutter while rreweb takes an
    // initial page snapshot.
    // NOTE 2: as of 07/2025, we are in fact intentionally disabling session
    // recording for perf.
    // See: `window.onAppContentLoaded`.
    disable_session_recording: true,
    session_recording: {
      // https://github.com/PostHog/posthog-js/blob/6da785b18c526f5008c2ec9f0bc98555ca784404/src/types.ts#L381
      captureCanvas: {
        // Even though we're reducing the canvas recording quality and FPS,
        // we still want to be extremely conservative with performance on
        // mobile, so we only record the canvas on desktop.
        // Besides, we render static (non-canvas/rive avatars) on mobile anyway,
        // so the impact of not recording canvas elements on mobile is lower
        recordCanvas: platform === 'desktop',
        canvasFps: 1,
        canvasQuality: '0', // 0 is the lowest quality, 1 is the highest
      },
      maskAllInputs: false,
    },
    loaded: () => {
      Sentry.setUser({
        // Use Posthog's distinct ID for Sentry user ID
        // This will be overridden by the player ID once the user connects to
        // the room, but errors can happen before that, and Sentry defaults to
        // using IP address as the user ID, which is not helpful given Discord's
        // proxy environment (everyone comes from the same Cloudflare proxy IP address!)
        id: posthog.get_distinct_id(),
      });
    },
    capture_exceptions: false,
    before_send: (event) => {
      // Apparently, Posthog still captures exceptions even though we've disabled it
      // in the settings, so we need to explicitly disable it here.
      if (event?.event === '$exception') {
        return null;
      }
      return event;
    },
  });
  posthog.register({
    platform,
    surface,
  });
}
// Keep current player info updated in our analytics tools
sub(playerAtom, () => {
  const player = get(playerAtom);
  // Sentry
  Sentry.setUser({
    id: player.id,
    username: player.name,
  });
  const isLoggedIn = get(isUserAuthenticatedAtom);
  // When not logged in, save the player's cosmetic to local storage
  if (!isLoggedIn) {
    try {
      const myUserStyle = playerCosmeticToUserStyle(player.cosmetic);
      set(anonymousUserStyleAtom, { ...myUserStyle, name: player.name });
    } catch (error) {
      console.error('Error setting anonymous user style', error);
    }
  }
});

sub(roomSessionIdAtom, () => {
  const roomSessionId = get(roomSessionIdAtom);
  Sentry.setTag('roomSessionId', roomSessionId);
});

sub(isHostAtom, () => {
  const isHost = get(isHostAtom);
  posthog.register_for_session({
    isHost,
  });
});

sub(currentGameNameAtom, () => {
  const gameName = get(currentGameNameAtom);

  posthog.register_for_session({
    currentGameName: gameName,
  });
  // Sentry
  Sentry.setTag('gameName', gameName);
});

const polyfillAppHeight100dvh = () => {
  const root = document.documentElement;
  const delayToCompensateForRotationChange = 150;

  const setAppHeight = () => {
    // Hack to work around 100vh not working properly on Safari
    // https://medium.com/quick-code/100vh-problem-with-ios-safari-92ab23c852a8
    root.style.setProperty(`--app-height`, `${window.innerHeight}px`);
  };
  const delayedSetAppHeight = () => {
    setTimeout(setAppHeight, delayToCompensateForRotationChange);
  };
  // immediately set the app height
  setAppHeight();
  // update the app height when the window is resized
  // Note that we do this on a delay, heuristically determined to be ~150ms
  // to ensure that the app height is correct after the browser has resized
  // We were getting modals stuck midway through the screen without this...
  window.addEventListener('resize', delayedSetAppHeight);
  // need this to handle rotation changes, otherwise when the device changes
  // orientation, the app height will be wrong because the resize event will
  // fire too early, causing us to measure the height before the browser has
  // resized the window
  window.addEventListener('orientationchange', setAppHeight);
};
if (!CSS.supports('height', '100dvh')) {
  polyfillAppHeight100dvh();
}

const Main: React.FC = () => {
  const unsupportedReason = useUnsupportedReason();

  useUnsupportedReasonEffects();
  useLocaleEffects();

  return (
    <I18nProvider i18n={i18n}>
      <Scope scope="Room">
        <McChakraProvider>
          {/* https://docs.sentry.io/platforms/javascript/guides/react/features/error-boundary/ */}
          <Sentry.ErrorBoundary
            fallback={(props) => (
              <ErrorFallback
                error={props.error}
                componentStack={props.componentStack}
                resetError={() => props.resetError()}
              />
            )}
            showDialog
          >
            {unsupportedReason ? (
              <UnsupportedPlay reason={unsupportedReason} />
            ) : (
              <>
                <App />
                <AuthenticationFailureDialog />
              </>
            )}
          </Sentry.ErrorBoundary>
        </McChakraProvider>
      </Scope>
    </I18nProvider>
  );
};

export default Main;
