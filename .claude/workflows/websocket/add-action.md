# Workflow: Add WebSocket Action

## Steps
1) Add the action in `src/websocket/api.ts` (public outgoing entrypoint)
2) Use enums/types from `protocol.ts` (no hardcoded strings)
3) Keep a simple façade (callers must not build low-level payloads)

## Quick check
- Action is typed and easy to call
