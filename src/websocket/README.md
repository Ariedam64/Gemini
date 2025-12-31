# Gemini WebSocket - Network Layer

## Overview
Transports capture, protocol serialization, and middleware system for intercepting traffic.

## Structure
- `api.ts`: Formal API for all outgoing game actions.
- `connection.ts`: Handlers for capturing and wrapping the game's WebSocket.
- `middlewares/`: Outgoing message interception and modification.
- `handlers/`: Incoming message event listeners.

## Changelog
- **2024-12-31**: Improved `PartialState` parsing in WS Trace. Corrected coordinate extraction in move packets.
- **2024-12-10**: Initial transport capture and API mapping.

## TODO
- [ ] Implement automatic packet retry for transient network errors.
- [ ] Add schema validation for outgoing payloads to prevent accidental disconnects.
- [ ] Create a comprehensive replay system for network debugging.
