---
paths: src/websocket/**/*
---

# WebSocket rules

- `protocol.ts` contains ONLY types/constants (message types, close codes). No runtime logic.
- `connection.ts` is transport/capture ONLY (WS wrapping/interception). No domain logic.
- `api.ts` is the ONLY public place for outgoing actions. Other code must not send WS directly.

- Message types must never be hardcoded as strings.
  - Always use `ClientToServerMessageType` / `ServerToClientMessageType`.

- `middlewares/` and `handlers/` files must only register through their registration helpers
  (no direct execution on import).
- Middleware/handler functions must not throw (catch internally) and must be safe to run multiple times.

- Raw `ws.send()` is forbidden outside the transport layer.
