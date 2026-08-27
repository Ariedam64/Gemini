// src/Websocket/middlewares/commandSequence.ts

import { registerMiddleware } from "./base";
import { COMMAND_ENVELOPE_TYPE } from "../protocol";
import { resolveSequence } from "../commandSequence";

/**
 * Keeps `commandSequence` contiguous on a socket we share with the game.
 *
 * The server rejects a gap with `invalid_sequence` — and every later command
 * too, because the gap never closes. The game numbers its commands from its own
 * counter and knows nothing about the ones we inject, so each of ours would
 * collide with the number the game is about to use. We therefore renumber the
 * whole wire: a game command leaves shifted by however many commands we have
 * injected since the last Welcome.
 *
 * Our own envelopes already carry their final number and are recognised by
 * their request id, so they pass through untouched. So does every game command
 * while we have injected nothing at all — an untouched game is the default.
 *
 * This must be registered after every other middleware — see `bootstrap.ts`.
 */
registerMiddleware((message, ctx) => {
  if (!message || typeof message !== "object" || Array.isArray(message)) return;

  const envelope = message as { type?: unknown; requestId?: unknown; commandSequence?: unknown };
  if (envelope.type !== COMMAND_ENVELOPE_TYPE) return;

  const sequence = resolveSequence(envelope.requestId, envelope.commandSequence);
  if (sequence === null) return;

  // Already carries its final number: this is the second layer seeing a message
  // the first one has rewritten. Nothing to do, and no reason to re-serialise.
  if (sequence === envelope.commandSequence) return;

  if (ctx.debug) {
    console.log("[MW][CommandSequence] shift", envelope.commandSequence, "=>", sequence);
  }

  return { kind: "replace", message: { ...envelope, commandSequence: sequence } };
});
