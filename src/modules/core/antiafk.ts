// src/modules/core/antiafk.ts
// MGAntiAfk - Prevents AFK detection by the game

const STOP_EVENTS = [
  "visibilitychange",
  "blur",
  "focus",
  "focusout",
  "pagehide",
  "freeze",
  "resume",
];

type EventListener = { type: string; handler: (e: Event) => void; target: Document | Window };

interface AntiAfkState {
  listeners: EventListener[];
  savedProps: {
    hidden: PropertyDescriptor | undefined;
    visibilityState: PropertyDescriptor | undefined;
    hasFocus: (() => boolean) | null;
  };
  audioCtx: AudioContext | null;
  oscillator: OscillatorNode | null;
  gainNode: GainNode | null;
  heartbeatInterval: number | null;
  isRunning: boolean;
}

const state: AntiAfkState = {
  listeners: [],
  savedProps: { hidden: undefined, visibilityState: undefined, hasFocus: null },
  audioCtx: null,
  oscillator: null,
  gainNode: null,
  heartbeatInterval: null,
  isRunning: false,
};

function swallowEvents() {
  const addListener = (target: Document | Window, type: string) => {
    const handler = (e: Event) => {
      e.stopImmediatePropagation();
      e.preventDefault?.();
    };
    target.addEventListener(type, handler, { capture: true });
    state.listeners.push({ type, handler, target });
  };

  for (const type of STOP_EVENTS) {
    addListener(document, type);
    addListener(window, type);
  }
}

function restoreEvents() {
  for (const { type, handler, target } of state.listeners) {
    try {
      target.removeEventListener(type, handler, { capture: true });
    } catch {}
  }
  state.listeners.length = 0;
}

function patchDocumentProps() {
  const proto = Object.getPrototypeOf(document);

  state.savedProps.hidden = Object.getOwnPropertyDescriptor(proto, "hidden");
  state.savedProps.visibilityState = Object.getOwnPropertyDescriptor(proto, "visibilityState");
  state.savedProps.hasFocus = document.hasFocus ? document.hasFocus.bind(document) : null;

  try {
    Object.defineProperty(proto, "hidden", {
      configurable: true,
      get: () => false,
    });
  } catch {}

  try {
    Object.defineProperty(proto, "visibilityState", {
      configurable: true,
      get: () => "visible",
    });
  } catch {}

  try {
    (document as unknown as { hasFocus: () => boolean }).hasFocus = () => true;
  } catch {}
}

function restoreDocumentProps() {
  const proto = Object.getPrototypeOf(document);

  try {
    if (state.savedProps.hidden) {
      Object.defineProperty(proto, "hidden", state.savedProps.hidden);
    }
  } catch {}

  try {
    if (state.savedProps.visibilityState) {
      Object.defineProperty(proto, "visibilityState", state.savedProps.visibilityState);
    }
  } catch {}

  try {
    if (state.savedProps.hasFocus) {
      (document as unknown as { hasFocus: () => boolean }).hasFocus = state.savedProps.hasFocus;
    }
  } catch {}
}

function resumeAudioIfSuspended() {
  if (state.audioCtx && state.audioCtx.state !== "running") {
    state.audioCtx.resume?.().catch(() => {});
  }
}

function startAudioKeepAlive() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    state.audioCtx = new AudioCtx({ latencyHint: "interactive" });
    state.gainNode = state.audioCtx.createGain();
    state.gainNode.gain.value = 0.00001;
    state.oscillator = state.audioCtx.createOscillator();
    state.oscillator.frequency.value = 1;
    state.oscillator.connect(state.gainNode).connect(state.audioCtx.destination);
    state.oscillator.start();

    document.addEventListener("visibilitychange", resumeAudioIfSuspended, { capture: true });
    window.addEventListener("focus", resumeAudioIfSuspended, { capture: true });
  } catch {
    stopAudioKeepAlive();
  }
}

function stopAudioKeepAlive() {
  try { state.oscillator?.stop(); } catch {}
  try { state.oscillator?.disconnect(); state.gainNode?.disconnect(); } catch {}
  try { state.audioCtx?.close?.(); } catch {}

  document.removeEventListener("visibilitychange", resumeAudioIfSuspended, { capture: true });
  window.removeEventListener("focus", resumeAudioIfSuspended, { capture: true });

  state.oscillator = null;
  state.gainNode = null;
  state.audioCtx = null;
}

function startHeartbeat() {
  const target = document.querySelector("canvas") as HTMLElement || document.body || document.documentElement;

  state.heartbeatInterval = window.setInterval(() => {
    try {
      target.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: 1, clientY: 1 }));
    } catch {}
  }, 25_000);
}

function stopHeartbeat() {
  if (state.heartbeatInterval !== null) {
    clearInterval(state.heartbeatInterval);
    state.heartbeatInterval = null;
  }
}

function start() {
  if (state.isRunning) return;
  state.isRunning = true;

  patchDocumentProps();
  swallowEvents();
  startAudioKeepAlive();
  startHeartbeat();
}

function stop() {
  if (!state.isRunning) return;
  state.isRunning = false;

  stopHeartbeat();
  stopAudioKeepAlive();
  restoreEvents();
  restoreDocumentProps();
}

function isRunning(): boolean {
  return state.isRunning;
}

export const MGAntiAfk = {
  start,
  stop,
  isRunning,
};
