// src/Websocket/commandSequence.ts
/**
 * Sequence numbering for the `QuinoaCommand` envelope.
 *
 * The game devs moved client-to-server gameplay actions into
 * `{scopePath, type: "QuinoaCommand", requestId, commandSequence, command}`,
 * which feeds the server's prediction/rollback system. The flat
 * `{scopePath, type, ...params}` form is still honoured but is being removed.
 *
 * `commandSequence` must be *contiguous*: a gap makes the server reject that
 * command with `invalid_sequence`, and every later command too, because the gap
 * never closes.
 *
 * The twist here, compared to a standalone client: we share the socket with the
 * game, which numbers its own commands from its own counter. If we simply took
 * numbers from a counter of our own, our first injected command would reuse a
 * number the game is about to send, and the whole stream would break.
 *
 * So we own the numbering of the *wire*, not of our own commands:
 * - the game's raw number `g` leaves as `g + drift`
 * - a command we inject takes the number right after the last one on the wire
 * - `drift` is simply how many commands we have injected since the last Welcome
 *
 * As long as we have injected nothing, `drift` is 0 and every game command
 * passes through byte for byte — an untouched game is the default.
 */

/** The game's counter, like ours, starts here before the first Welcome. */
const FIRST_SEQUENCE = 1;

/**
 * How many decisions to remember.
 *
 * Only enough to survive one message being seen twice on its way out; commands
 * are not sent in bursts anywhere near this size.
 */
const DECISION_CACHE_LIMIT = 128;

/** Last raw sequence the game used (or the Welcome seed, before it sent any). */
let lastRawSequence = FIRST_SEQUENCE - 1;

/** How many commands we have injected since the last Welcome. */
let injectedCount = 0;

/**
 * What was decided for a given envelope, by request id.
 *
 * The outgoing pipeline runs at two layers — `RoomConnection.sendMessage` and
 * `WebSocket.prototype.send` — so a message routed through the first is seen
 * again by the second. Deciding once per request id and replaying that decision
 * keeps a second pass from shifting the same command twice.
 *
 * `null` means "leave this one alone", which is what our own envelopes get:
 * they already carry their final number.
 */
const decisions = new Map<string, number | null>();

function remember(requestId: string, decision: number | null): number | null {
  decisions.set(requestId, decision);

  // Map keeps insertion order, so the first key is the oldest.
  if (decisions.size > DECISION_CACHE_LIMIT) {
    const oldest = decisions.keys().next().value;
    if (oldest !== undefined) decisions.delete(oldest);
  }

  return decision;
}

/** Seeds from `Welcome.executedCommandSequence`. Called on every Welcome. */
export function seedFromWelcome(executedCommandSequence: unknown): void {
  const seed = Number(executedCommandSequence);

  lastRawSequence = Number.isFinite(seed) ? seed : FIRST_SEQUENCE - 1;
  injectedCount = 0;
  decisions.clear();
}

/** Marks an envelope we built ourselves, so the wire rewriter leaves it alone. */
export function registerOurRequestId(requestId: string): void {
  remember(requestId, null);
}

/**
 * The number for a command we inject right now.
 *
 * It sits right after the last number that went out, so the game's next command
 * — which will be `lastRawSequence + 1` shifted by the new drift — lands right
 * after ours.
 */
export function nextInjectedSequence(): number {
  const sequence = lastRawSequence + injectedCount + 1;
  injectedCount += 1;
  return sequence;
}

/**
 * The number this envelope must carry on the wire, or `null` to leave it as is.
 *
 * Also records where the game's counter stands — drift or no drift, since our
 * next injection numbers itself from it. Skipping that while drift is 0 would
 * make the first injected command reuse a number the game has already spent.
 *
 * An envelope without a request id cannot be deduplicated across the two
 * outgoing layers, so it is left alone rather than risk a double shift. The
 * game always sends one: it is how the server keys `QuinoaCommandResult`.
 */
export function resolveSequence(requestId: unknown, rawSequence: unknown): number | null {
  if (typeof requestId !== "string" || requestId.length === 0) return null;

  const known = decisions.get(requestId);
  if (known !== undefined) return known;

  const raw = Number(rawSequence);
  if (!Number.isFinite(raw)) return remember(requestId, null);

  if (raw > lastRawSequence) lastRawSequence = raw;

  const shifted = raw + injectedCount;
  return remember(requestId, shifted === raw ? null : shifted);
}

/** Snapshot for debugging. */
export function getInfo(): { lastRawSequence: number; injectedCount: number } {
  return { lastRawSequence, injectedCount };
}
