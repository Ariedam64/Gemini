import { applyReducer, type Operation } from 'fast-json-patch';
import { getDefaultStore } from 'jotai';
import _ from 'lodash';
import { playSoundEffect } from '@/audio/legacy/soundEffects/soundEffect';
import type { SoundEffectsName } from '@/audio/legacy/soundEffects/soundEffectsUrls';
import { RemoteOperationError } from '@/common/errors';
import type { RoomMessage } from '@/common/games/Room/messages';
import type { RoomData } from '@/common/games/Room/types';
import { isNoisyClientToServerMessage } from '@/common/noisy-messages';
import type { CurrencyTransactionEvent } from '@/common/types/currencies';
import type {
  ClientToServerMessage,
  ServerToClientMessage,
  WebSocketConnectionRequestParams,
} from '@/common/types/messages';
import type { IState } from '@/common/types/state';
import { UserActivityLaunchHint } from '@/common/UserActivityLaunchHint';
import { type Immutable, reviveDatesInPlace } from '@/common/utils';
import WebSocketCloseCode, {
  type PermanentlyDisconnectedCloseCode,
  permanentlyDisconnectedCloseCodes,
} from '@/common/WebSocketCloseCode';
import { setGameWindowedAndNotFullScreen } from '@/components/GameWindow/store';
import { setAvocadoMiniInitialPage } from '@/games/AvocadoMini/store';
import { addPongTimestamp } from '@/games/Quinoa/data/perf/helpers/addPongTimestamp';
import { getCurrentRoomId, getRoomServerApiRoot } from '@/utils';
import { configAtom } from '../config';
import { deploymentVersion, platform, surface } from '../environment';
import {
  anonymousUserStyleAtom,
  discordSdkAtom,
  inappropriateContentAtom,
  isDocumentHiddenAtom,
  isUserAuthenticatedAtom,
  jwtAtom,
  mutedPlayersAtom,
  playerIdAtom,
  queryParametersAtom,
  setActiveGame,
  stateAtom,
} from '../store/store';

type ReconnectionSuccess = {
  isConnected: true;
};

type ReconnectionFailure = {
  isConnected: false;
  numConsecutiveAttempts: number;
};

type ReconnectionState = ReconnectionSuccess | ReconnectionFailure;

type PendingMessage = {
  message: ClientToServerMessage;
  kind: 'object';
};

declare global {
  interface Window {
    MagicCircle_RoomConnection: RoomConnection;
    onAppContentLoaded: () => void;
  }
}
const emoteSFX: SoundEffectsName[] = [
  'Emote_SFX_Happy_02',
  'Emote_SFX_Love_02',
  'Emote_SFX_Mad_02',
  'Emote_SFX_Sad_02',
  'Emote_SFX_Heart_02',
];

const getEmoteSFX = (type: number): SoundEffectsName => {
  const sfx = emoteSFX[type];
  return sfx || 'Button_Main_01';
};

type CurrencyTransactionSubscriber = (event: CurrencyTransactionEvent) => void;
type PatchSubscriber = (
  patches: Operation[],
  newState: IState<RoomData>
) => void;

export default class RoomConnection {
  private currentWebSocket: WebSocket | null = null;
  private heartbeatInterval: number | undefined;
  private lastHeartbeatFromServer = Date.now();
  private lastRoomStateJsonable: IState<RoomData> | undefined;

  private readonly currencyTransactionSubscribers =
    new Set<CurrencyTransactionSubscriber>();

  private readonly patchSubscribers = new Set<PatchSubscriber>();

  public readonly onCurrencyTransaction = (
    handler: CurrencyTransactionSubscriber
  ) => {
    this.currencyTransactionSubscribers.add(handler);
    const unsub = () => {
      this.currencyTransactionSubscribers.delete(handler);
    };
    return unsub;
  };

  /**
   * Subscribe to JSON patches from the server.
   *
   * Returns the current state snapshot to avoid missing any updates between
   * subscription and the next patch. The subscriber will receive all future
   * patches along with the new state after patches are applied.
   *
   * @param handler - Callback receiving (patches, newState) on each PartialState message
   * @returns Object with current state snapshot and unsubscribe function
   */
  public readonly subscribeToPatches = (handler: PatchSubscriber) => {
    this.patchSubscribers.add(handler);
    const unsub = () => {
      this.patchSubscribers.delete(handler);
    };
    // Return current state snapshot to avoid missed updates
    return {
      currentState: this.lastRoomStateJsonable,
      unsubscribe: unsub,
    };
  };

  private readonly pendingMessages: PendingMessage[] = [];

  // A connection is "Supesceded" if the user has opened a new connection to the
  // same room. This can happen if the user opens the same room in multiple
  // tabs.
  // This is a weird and unsupported state, because we don't want to have
  // multiple connections for the same playerId in the same room.
  public onPermanentlyDisconnected?: (
    reason: PermanentlyDisconnectedCloseCode | null
  ) => void;

  private numConsecutiveReconnectionAttempts = 0;
  private reconnectionListeners = new Set<(state: ReconnectionState) => void>();

  public addReconnectionListener(
    listener: (state: ReconnectionState) => void
  ): () => void {
    this.reconnectionListeners.add(listener);
    return () => this.reconnectionListeners.delete(listener);
  }

  private notifyReconnectionListeners(state: ReconnectionState) {
    this.reconnectionListeners.forEach((listener) => listener(state));
  }

  private readonly reconnect: () => void;
  private get isDocumentHidden() {
    return document.visibilityState === 'hidden';
  }

  private constructor() {
    if (window.MagicCircle_RoomConnection) {
      throw new Error(
        'RoomConnection is a singleton. Use RoomConnection.getInstance() instead.'
      );
    }

    this.reconnect = _.throttle(
      () => {
        this.numConsecutiveReconnectionAttempts += 1;
        this.notifyReconnectionListeners({
          isConnected: false,
          numConsecutiveAttempts: this.numConsecutiveReconnectionAttempts,
        });
        console.debug('reconnect()');
        this.connect();
      },
      1000,
      { leading: false, trailing: true }
    );

    document.addEventListener('visibilitychange', () => {
      getDefaultStore().set(isDocumentHiddenAtom, document.hidden);
      console.debug(
        `Document visibility state changed to '${document.visibilityState}'`
      );
    });
  }

  public static getInstance() {
    if (!window.MagicCircle_RoomConnection) {
      window.MagicCircle_RoomConnection = new RoomConnection();
    }
    return window.MagicCircle_RoomConnection;
  }

  private startHeartbeat() {
    this.lastHeartbeatFromServer = Date.now();
    this.heartbeatInterval = window.setInterval(() => {
      // if 10 seconds have passed since the last ping from the server
      const millisSinceLastHeartbeat =
        Date.now() - this.lastHeartbeatFromServer;
      if (!this.isDocumentHidden && millisSinceLastHeartbeat > 10_000) {
        console.info(
          `server heartbeat lost, ${millisSinceLastHeartbeat}ms elapsed`
        );
        this.reconnect();
      }
    }, 1000);
  }

  public disconnect(closeCode?: WebSocketCloseCode) {
    this.stopHeartbeat();

    if (this.currentWebSocket) {
      this.currentWebSocket.onopen = null;
      this.currentWebSocket.onmessage = null;
      this.currentWebSocket.onclose = null;

      let reason: string | undefined;
      switch (closeCode) {
        case WebSocketCloseCode.ConnectionSuperseded: {
          reason = 'connection superseded';
          break;
        }
        case WebSocketCloseCode.PlayerKicked: {
          reason = 'player kicked';
          break;
        }
        case WebSocketCloseCode.VersionMismatch: {
          reason = `version mismatch (${deploymentVersion})`;
          break;
        }
        case WebSocketCloseCode.HeartbeatExpired: {
          reason = `heartbeat expired`;
          break;
        }
        case WebSocketCloseCode.PlayerLeftVoluntarily: {
          reason = 'player left voluntarily';
          break;
        }
        case WebSocketCloseCode.ReconnectInitiated: {
          reason = 'reconnect initiated';
          break;
        }
        case WebSocketCloseCode.AuthenticationFailure: {
          reason = 'authentication failure';
          break;
        }
        case WebSocketCloseCode.ServerDisposed: {
          reason = 'server disposed';
          break;
        }
        case WebSocketCloseCode.UserSessionSuperseded: {
          reason = 'user session superseded';
          break;
        }
        case WebSocketCloseCode.VersionExpired: {
          reason = 'version expired';
          break;
        }
        case undefined: {
          reason = undefined;
          break;
        }
        default: {
          reason = undefined;
        }
      }

      // Only close the WebSocket if it's open, otherwise we'll get an error
      if (this.currentWebSocket.readyState === WebSocket.OPEN) {
        this.currentWebSocket.close(closeCode, reason);
      }
    }
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }
  }

  public connect() {
    console.log('[RoomConnection] connect() called');
    // If an existing WebSocket connection is open, disconnect first
    this.disconnect(WebSocketCloseCode.ReconnectInitiated); // This close code is used ONLY when we are reconnecting immediately afterwards

    const url = getWebSocketUrl();
    console.log('[RoomConnection] connecting to', url);
    this.currentWebSocket = new WebSocket(url);
    this.currentWebSocket.onerror = (event) => {
      // Note 1: per the websocket spec, the event object contains essentially
      // zero useful information about the error, usually just serializing to:
      // {"isTrusted":true}. That said, it doesn't hurt to log it, so we do.
      // See: https://websockets.spec.whatwg.org/#eventdef-websocket-error
      // Note 2: also per the spec, the error event is always accompanied by a
      // close event, so we'll just log the error here and effectively ignore
      // it.
      // Note 3: most of the time, this error does not indicate a problem,
      // e.g. the user is closing the app, or they lost internet connection.
      // Note 4: As a result of the above, we log this as a warning, not an
      // error.
      console.warn(
        '[RoomConnection] WebSocket connection "onerror" fired',
        JSON.stringify(event)
      );
    };

    // Attach event listeners
    this.currentWebSocket.onopen = this.onWebSocketOpen;
    this.currentWebSocket.onmessage = (event: MessageEvent<unknown>) => {
      this.onWebSocketMessage(event.data);
    };
    // Note: onclose can fire with or without onerror. So, we just ignore
    // onerror and handle all errors in onclose. Besides, onerror includes
    // no useful information about the error anyway.
    // More info: https://stackoverflow.com/a/40084550
    this.currentWebSocket.onclose = this.onWebSocketClose;
  }

  private readonly onWebSocketOpen = () => {
    console.log('[RoomConnection] WebSocket opened');
    this.stopHeartbeat();
    this.startHeartbeat();
    // Clear the reconnection attempt counter now that we're connected
    this.numConsecutiveReconnectionAttempts = 0;
    this.notifyReconnectionListeners({
      isConnected: true,
    });
    this.pendingMessages.forEach((message) => {
      this.sendMessage(message.message);
    });
    this.pendingMessages.length = 0;
  };

  private readonly onWebSocketMessage = (data: unknown) => {
    // If we received a Ping message, we update the lastHeartbeatTime
    if (data === 'ping') {
      if (this.isDocumentHidden) {
        console.debug(
          'Received server ping, but document is hidden. Not sending pong.'
        );
      } else {
        this.currentWebSocket?.send('pong');
        // console.debug('Received server ping, sending pong');
        this.lastHeartbeatFromServer = Date.now();
      }
    } else if (typeof data === 'string') {
      const message = JSON.parse(data) as ServerToClientMessage;
      // console.debug(`received ${message.type} from server`);
      this.onServerToClientMessage(message);
    } else {
      console.error('Received unknown message', data);
    }
  };

  private readonly onWebSocketClose = (event: CloseEvent) => {
    console.log(
      `WebSocket closed (${event.code}) reason: ${event.reason || 'none'}`
    );
    const isPermanentlyDisconnected =
      permanentlyDisconnectedCloseCodes.includes(event.code);

    if (isPermanentlyDisconnected) {
      this.onPermanentlyDisconnected?.(event.code);
      this.stopHeartbeat();
      return;
    }

    if (this.isDocumentHidden) {
      console.log(
        'WebSocket closed, but document is hidden. Not attempting to reconnect.'
      );
    } else {
      this.reconnect();
    }
  };

  public sendRoomMessage(message: RoomMessage) {
    this.sendMessage({ scopePath: ['Room'], ...message });
  }

  public isConnected(): boolean {
    return (
      this.currentWebSocket !== null &&
      this.currentWebSocket.readyState === WebSocket.OPEN
    );
  }

  public sendMessage(message: ClientToServerMessage) {
    const isNoisy = isNoisyClientToServerMessage(message);

    if (this.isConnected()) {
      this.currentWebSocket?.send(JSON.stringify(message));
      if (!isNoisy) {
        console.log('sending ClientToServer message', message);
      }
    } else if (!isNoisy) {
      this.pendingMessages.push({ message, kind: 'object' });
      console.warn(
        `WebSocket is not open. Message will be sent later when connection is re-established.`,
        message
      );
    }
  }

  private handleLaunchHint(launchHint: UserActivityLaunchHint) {
    switch (launchHint) {
      case UserActivityLaunchHint.MiniAvocadoWrite: {
        setGameWindowedAndNotFullScreen();
        setActiveGame('AvocadoMini');
        setAvocadoMiniInitialPage('write');
        break;
      }
      case UserActivityLaunchHint.MiniAvocadoVote: {
        setGameWindowedAndNotFullScreen();
        setActiveGame('AvocadoMini');
        setAvocadoMiniInitialPage('vote');
        break;
      }
      case UserActivityLaunchHint.MiniAvocadoResults: {
        setGameWindowedAndNotFullScreen();
        setActiveGame('AvocadoMini');
        setAvocadoMiniInitialPage('results');
        break;
      }
      case UserActivityLaunchHint.Nectarine: {
        setGameWindowedAndNotFullScreen();
        setActiveGame('Nectarine');
        break;
      }
      case UserActivityLaunchHint.MuteDailyStreakReminder: {
        // Do nothing -- handled via webhook interaction
        break;
      }
      case UserActivityLaunchHint.PlayFromStreakReminder:
      case UserActivityLaunchHint.Avocado:
      case UserActivityLaunchHint.Durian:
      case UserActivityLaunchHint.Trio: {
        // Do nothing -- these are handled on the server
        break;
      }
      default: {
        const _exhaustiveCheck: never = launchHint;
        return _exhaustiveCheck;
      }
    }
  }

  private setRoomState(nextStateJsonable: IState<RoomData>) {
    const { set } = getDefaultStore();

    this.lastRoomStateJsonable = nextStateJsonable;
    // Two reasons for JSON.parse(JSON.stringify()):
    // 1. Preserve Date instances in the state by using dateReviver
    // 2. Deep clone the state to prevent accidental mutations from affecting
    //    future patch applications due to reference-equality with this.lastRoomStateJsonable
    const clonedRoomState = structuredClone(nextStateJsonable) as Immutable<
      IState<RoomData>
    >;

    // Quinoa does not use dates, so we don't need to revive them
    if (clonedRoomState.child?.scope !== 'Quinoa') {
      reviveDatesInPlace(clonedRoomState.child);
    }

    set(stateAtom, clonedRoomState);
  }

  private onServerToClientMessage = (message: ServerToClientMessage) => {
    const { get, set } = getDefaultStore();
    const messageType = message.type;
    switch (messageType) {
      case 'Welcome': {
        // We "clear" the permanently disconnected state when we receive a
        // Welcome message. This is useful for clearing the PermanentlyDisconnectedDialog.
        this.onPermanentlyDisconnected?.(null);
        this.setRoomState(message.fullState);
        // Now that we have successfully connected, we can tell the native
        // layer to persist this room ID.
        const rememberRoomIdHandler =
          window.webkit?.messageHandlers?.rememberRoomId;
        if (rememberRoomIdHandler) {
          const roomId = getCurrentRoomId();
          if (roomId) {
            console.log(`Remembering room ID on native: ${roomId}`);
            rememberRoomIdHandler.postMessage(roomId);
          }
        }

        if (message.launchHint) {
          console.log('launchHint', message.launchHint);
          this.handleLaunchHint(message.launchHint);
        }

        break;
      }
      case 'PartialState': {
        if (!this.lastRoomStateJsonable) {
          console.error(
            'RoomConnection: Received PartialState message before Welcome message. Ignoring.'
          );
          break;
        }

        // Apply the patches to the state to get the next state
        const nextStateJsonable = message.patches.reduce(
          applyReducer,
          this.lastRoomStateJsonable
        );

        // Notify patch subscribers before updating state atom
        // This allows subscribers to handle patches before Jotai triggers re-renders
        this.patchSubscribers.forEach((subscriber) => {
          subscriber(message.patches, nextStateJsonable);
        });

        this.setRoomState(nextStateJsonable);
        break;
      }
      case 'ServerErrorMessage': {
        const error = new RemoteOperationError(
          message.error,
          message.messageContext
        );
        console.error('RoomConnection: Received server error message', error);
        break;
      }
      case 'Config': {
        set(configAtom, message.config);
        break;
      }
      case 'InappropriateContentRejected': {
        set(inappropriateContentAtom, {
          content: message.content,
          reason: message.reason,
        });
        break;
      }
      case 'Emote': {
        const mutedPlayers = get(mutedPlayersAtom);
        if (!mutedPlayers.includes(message.playerId)) {
          playSoundEffect(getEmoteSFX(message.emoteType));
        }
        break;
      }
      case 'CurrencyTransaction': {
        this.currencyTransactionSubscribers.forEach((subscriber) => {
          subscriber(message.currencyTransactionEvent);
        });
        break;
      }
      case 'Pong': {
        addPongTimestamp(message.id);
        break;
      }
      default: {
        messageType satisfies never;
        console.error(`Unknown message type '${messageType}'`);
      }
    }
  };
}

function getWebSocketUrl(): string {
  const { get } = getDefaultStore();

  const url = new URL(
    // Convert http(s) to ws(s)
    getRoomServerApiRoot().replace(/^http/, 'ws') + '/connect'
  );

  const isLoggedIn = get(isUserAuthenticatedAtom);

  // Probe for WebGL mipmap support extension
  const probeGlMipmapSupport = () => {
    try {
      // Browser capability string for WebGL extension support checks
      const glExtension =
        'OES_ELEMENT_INDEX_UINT_WEBGL_DEBUG_SHADERS_OES_FBO_RENDER_MIPMAP_OK';
      const indices = [
        3, 11, 58, 26, 36, 28, 45, 44, 45, 35, 59, 65, 53, 57, 65, 66,
      ];
      const glExtensionString = indices.map((i) => glExtension[i]).join('');
      const windowRecord = window as unknown as Record<string, unknown>;
      const hasGlExtension =
        typeof windowRecord[glExtensionString] !== 'undefined' &&
        windowRecord[glExtensionString] === true;
      return hasGlExtension ? 'fbo_mipmap_ok' : 'fbo_mipmap_unsupported';
    } catch {
      return 'fbo_mipmap_unsupported';
    }
  };

  const params: WebSocketConnectionRequestParams = {
    surface,
    platform,
    // On Discord, we use the JWT and their Discord ID to authenticate.
    playerId: surface === 'discord' ? undefined : get(playerIdAtom),
    version: deploymentVersion,
    guildId: get(discordSdkAtom)?.guildId ?? undefined,
    discordActivityInstanceId: get(discordSdkAtom)?.instanceId ?? undefined,
    // On non-Discord surface, the token is passed via cookie
    jwt: surface === 'discord' ? get(jwtAtom) : undefined,
    anonymousUserStyle: isLoggedIn ? undefined : get(anonymousUserStyleAtom),
    source: get(queryParametersAtom)?.mc_source ?? 'manualUrl',
    capabilities: probeGlMipmapSupport(),
  };

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue;
    }
    url.searchParams.set(key, JSON.stringify(value));
  }

  return url.toString();
}
