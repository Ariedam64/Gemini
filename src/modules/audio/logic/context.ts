// src/modules/audio/logic/context.ts
// Audio context management

import { state } from "../state";
import { pageWindow } from "../../../utils/windowContext";

const win = pageWindow ?? window;

// ─────────────────────────────────────────────────────────────────────────────
// Audio Context
// ─────────────────────────────────────────────────────────────────────────────

export async function ensureAudioContext(): Promise<AudioContext> {
  const existing = state.ctx;
  if (existing) return existing;

  const Ctx = (win as any).AudioContext || (win as any).webkitAudioContext;
  if (!Ctx) throw new Error("WebAudio not supported");

  const ctx = new Ctx();
  state.ctx = ctx;
  return ctx;
}

export async function resumeIfNeeded(): Promise<void> {
  if (!state.ctx) return;
  if (state.ctx.state === "suspended") {
    try {
      await state.ctx.resume();
    } catch {}
  }
}
