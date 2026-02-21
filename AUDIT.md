# MG Admin Tools (Gemini-test) - Defensive Audit Notes

Date: 2026-02-10

This project is a **defensive diagnostics + moderation UI** for MagicGarden/MagicCircle rooms.

## What This Tool Can and Cannot See

### Cannot retrieve other players' IP addresses
- The in-browser surfaces used here are `window.MagicCircle_RoomConnection` welcome/patch state and room list endpoints.
- Browser JavaScript does not expose remote TCP peer addresses for WebSocket connections.
- There is no WebRTC/ICE peer connection in this tool, so there is no ICE-candidate leakage surface to exploit.

### Can retrieve (safe) operational details
- Room/game state exposed to the client via welcome + patch updates.
- Public room metadata (room id, player count, slot names preview) via the same mechanisms the game uses.
- Watcher snapshots by launching a separate headless browser instance (Puppeteer) that joins a room as a normal client, captures one state snapshot, and disconnects.

## Added Diagnostics (Safe-by-Default)

The `Diagnostics` tab is designed to help identify accidental exposures without collecting secrets.

- Storage inventory: lists `localStorage` and `sessionStorage` keys.
  - Values are **hidden by default**.
  - Optional "Reveal values (redacted)" mode masks likely secrets (JWT-like strings, long tokens).
- Window globals diff: captures a baseline list of `window` keys and shows keys added after baseline.
- Network destinations log:
  - Captures `fetch` and `XMLHttpRequest.open` destinations.
  - Stores **method + origin + pathname only** (drops query/hash) to avoid token leakage.
- WebSocket endpoint:
  - Attempts to display the room WebSocket URL endpoint if discoverable.
  - Does not attempt to inspect sockets/peers.

## Risk Notes (Responsible Disclosure)

This tool surfaces what the client already has access to. If you discover:
- Authentication tokens stored in `localStorage`,
- Excessively permissive globals on `window`,
- Internal endpoints reachable cross-origin,

Treat these as security findings and disclose responsibly:
- Minimize reproduction steps
- Avoid publishing credentials or private data
- Contact maintainers with details and impact assessment

